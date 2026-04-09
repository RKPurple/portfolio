'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { motion, useAnimate, usePresence } from 'framer-motion'
import { usePhase } from '@/context/EnterContext'
import { reelSpinEasing } from '@/lib/animations'
import { type Card, type RarityId, FILLER_SKINS, SPECIAL_CARDS, RARITY_COLORS, type SpecialCardType } from '@/lib/skinData'
import { SOCIAL_LINKS, NAV_LINKS } from '@/lib/data'

const CARD_GAP = 8
const CARD_COUNT = 60
const WINNING_CARD = 52
const SPIN_DURATION = 8 // seconds

function weightedRandom(): RarityId {
    const roll = Math.random() * 100
    if (roll < 79.92) return 'blue'
    if (roll < 95.9)  return 'purple'
    if (roll < 99.1)  return 'pink'
    if (roll < 99.74) return 'red'
    return 'gold'
}

function generateCards(): (Card & { rarity: RarityId })[] {
    const shuffled = [...SPECIAL_CARDS].sort(() => Math.random() - 0.5)
    const specialStart = WINNING_CARD - Math.floor(shuffled.length / 2)

    return Array.from({ length: CARD_COUNT }, (_, i) => {
        const si = i - specialStart
        const rarity = weightedRandom()
        if (si >= 0 && si < shuffled.length) return { ...shuffled[si], rarity }
        const pool = FILLER_SKINS[rarity]
        return { rarity, image: pool[Math.floor(Math.random() * pool.length)] }
    })
}

// Static card content per special card type
function SpecialCardContent({ type, iconSize, image }: { type: SpecialCardType, iconSize: number, image?: string }) {
    if (type === 'socialdock') {
        return (
            <div className="flex flex-row items-center gap-3">
                {SOCIAL_LINKS.map(link => {
                    const Icon = link.icon
                    return <Icon key={link.id} size={iconSize} color="rgba(242,240,239,1)" />
                })}
            </div>
        )
    }
    if (type === 'pictureframe') {
        return (
            <img src="/assets/portrait.jpg" alt="Rohan" className="w-full h-full object-cover" />
        )
    }
    if (type === 'nav') {
        return (
            <div className="flex flex-col items-start gap-1">
                {NAV_LINKS.map(link => (
                    <span
                        key={link.id}
                        className='text-md text-enter-lettering'
                    >
                        {link.label}
                    </span>
                ))}
            </div>
        )
    }
    // nameplate and nav fall back to image
    if (image) {
        return (
            <img
                src={image}
                alt=""
                aria-hidden
                className="w-full h-full object-contain p-2"
            />
        )
    }
    return null
}

export default function CaseSpinSection() {
    const { setPhase, setWinningCardType, setSpecialCardsRarities, setCardSlotRects } = usePhase()
    const [isPresent] = usePresence()
    const [scope, animate] = useAnimate()
    const viewportRef = useRef<HTMLDivElement>(null)
    const slotRefs = useRef(new Map<SpecialCardType, HTMLDivElement>())
    const cards = useMemo(() => generateCards(), [])
    const [cardWidth, setCardWidth] = useState(200)
    const [cardHeight, setCardHeight] = useState(160)

    useEffect(() => {
        const viewportWidth = viewportRef.current?.offsetWidth ?? window.innerWidth
        const CARD_WIDTH = Math.min(200, Math.floor(viewportWidth * 0.22))
        const CARD_HEIGHT = viewportWidth > 768 ? 160 : 80
        setCardWidth(CARD_WIDTH)
        setCardHeight(CARD_HEIGHT)
        const cardStep = CARD_WIDTH + CARD_GAP
        const finalX = -(WINNING_CARD * cardStep + CARD_WIDTH / 2 - viewportWidth / 2)

        animate(scope.current, { x: finalX }, { duration: SPIN_DURATION, ease: reelSpinEasing })
            .then(() => {
                const rarityMap = Object.fromEntries(
                    cards
                        .filter(c => c.type)
                        .map(c => [c.type!, RARITY_COLORS[c.rarity]])
                ) as Record<SpecialCardType, string>

                // Measure all special card slot positions
                const rects: Partial<Record<SpecialCardType, DOMRect>> = {}
                slotRefs.current.forEach((el, type) => {
                    rects[type] = el.getBoundingClientRect()
                })

                setCardSlotRects(rects)
                setSpecialCardsRarities(rarityMap)
                setWinningCardType(cards[WINNING_CARD].type!)
                setTimeout(() => setPhase('completed'), 800)
            })
    }, [])

    const cardIconSize = Math.floor(Math.min(cardWidth, cardHeight) * 0.30)

    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
        >
            {/* Flash */}
            <motion.div
                className="absolute inset-0 bg-white/50 pointer-events-none z-10"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.05 }}
            />
            {/* Reel area */}
            <div className="relative w-full md:w-[65%] flex items-center">
                {/* Center line */}
                <div className="absolute left-1/2 top-0 h-20 md:h-40 w-0.5 z-50 pointer-events-none" style={{ backgroundColor: 'var(--cs-gold)' }} />
                {/* Viewport */}
                <div ref={viewportRef} className="overflow-hidden w-full">
                    {/* Reel */}
                    <div ref={scope} className="flex" style={{ gap: CARD_GAP }}>
                        {cards.map((card, i) => {
                            const rarityColor = RARITY_COLORS[card.rarity]

                            if (card.type) {
                                return (
                                    <div
                                        key={i}
                                        ref={el => { if (el) slotRefs.current.set(card.type!, el) }}
                                        className="relative flex-shrink-0 bg-[#3a3a3a] flex items-center justify-center overflow-hidden"
                                        style={{ width: cardWidth, height: cardHeight, opacity: isPresent ? 1 : 0 }}
                                    >
                                        <SpecialCardContent
                                            type={card.type}
                                            iconSize={cardIconSize}
                                            image={card.image}
                                        />
                                        {/* Rarity gradient */}
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-5 md:h-10 pointer-events-none"
                                            style={{ background: `linear-gradient(to top, color-mix(in srgb, ${rarityColor} 60%, transparent), transparent)` }}
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
                                            style={{ backgroundColor: rarityColor }}
                                        />
                                    </div>
                                )
                            }

                            return (
                                <div
                                    key={i}
                                    className="relative flex-shrink-0 bg-[#3a3a3a] h-20 md:h-40"
                                    style={{ width: cardWidth }}
                                >
                                    <img
                                        src={card.image}
                                        alt=""
                                        aria-hidden
                                        className="absolute inset-0 w-full h-full object-contain p-2"
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-5 md:h-10"
                                        style={{ background: `linear-gradient(to top, color-mix(in srgb, ${rarityColor} 60%, transparent), transparent)` }}
                                    />
                                    <div
                                        className="absolute bottom-0 left-0 right-0 h-2"
                                        style={{ backgroundColor: rarityColor }}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
