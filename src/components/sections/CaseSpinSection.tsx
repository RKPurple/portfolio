'use client'

import { useEffect, useRef, useMemo, useState } from 'react'
import { motion, useAnimate } from 'framer-motion'
import { usePhase } from '@/context/EnterContext'
import { reelSpinEasing } from '@/lib/animations'
import { type Card, type RarityId, FILLER_SKINS, SPECIAL_CARDS, RARITY_COLORS } from '@/lib/skinData'

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

export default function CaseSpinSection() {
    const { setPhase, setWinningCardType } = usePhase()
    const [scope, animate] = useAnimate()
    const viewportRef = useRef<HTMLDivElement>(null)
    const cards = useMemo(() => generateCards(), [])
    const [cardWidth, setCardWidth] = useState(200)

    useEffect(() => {
        const viewportWidth = viewportRef.current?.offsetWidth ?? window.innerWidth
        const CARD_WIDTH = Math.min(200, Math.floor(viewportWidth * 0.22))
        setCardWidth(CARD_WIDTH)
        const cardStep = CARD_WIDTH + CARD_GAP
        const finalX = -(WINNING_CARD * cardStep + CARD_WIDTH / 2 - viewportWidth / 2)

        animate(scope.current, { x: finalX }, { duration: SPIN_DURATION, ease: reelSpinEasing })
            .then(() => {
                setWinningCardType(cards[WINNING_CARD].type!)
                setTimeout(() => setPhase('completed'), 800)
            })
    }, [])

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
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
                        {cards.map((card, i) => (
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
                                {/* Rarity gradient */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-5 md:h-10"
                                    style={{ background: `linear-gradient(to top, color-mix(in srgb, ${RARITY_COLORS[card.rarity]} 60%, transparent), transparent)` }}
                                />
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-2"
                                    style={{ backgroundColor: RARITY_COLORS[card.rarity] }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
