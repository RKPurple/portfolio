'use client'

import { animate, motion, useMotionValue } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { usePhase } from '@/context/EnterContext'
import type { PortfolioSection } from '@/context/NavContext'
import { useNav } from '@/context/NavContext'
import MorphCard from '@/components/layout/MorphCard'
import SocialDock from '@/components/layout/SocialDock'
import PictureFrame, { PictureFrameVariant } from '@/components/layout/PictureFrame'
import NavDock from '@/components/layout/NavDock'
import ThemeToggle from '@/components/layout/ThemeToggle'
import { cardSlideSpring } from '@/lib/animations'

// Sections where the PictureFrame aside sits on the RIGHT instead of the left.
const REVERSED_SECTIONS = new Set<PortfolioSection>(['projects', 'contact'])

/** Horizontal gap between the sliding card column and the page content (px). */
const CARD_CONTENT_GAP = 24

type Props = { children: React.ReactNode }

const PICTURE_FRAME_VARIANTS: Record<PortfolioSection, PictureFrameVariant> = {
    home: 'hero',
    projects: 'projects',
    contact: 'contact',
}

type SlidingAsideProps = {
    containerRef: React.RefObject<HTMLDivElement | null>
    reversed: boolean
    section: PortfolioSection
    rarityColor?: string
    onContentInsetChange: (px: number) => void
}

/**
 * Absolutely positioned picture column; parent supplies the inset track ref for width.
 * Mount only after entry (`completed`) so state resets without a reset effect.
 */
function SlidingPictureAside({
    containerRef,
    reversed,
    section,
    rarityColor,
    onContentInsetChange,
}: SlidingAsideProps) {
    const cardTrackRef = useRef<HTMLDivElement>(null)
    const slideX = useMotionValue(0)
    const hasSnappedSlideOnce = useRef(false)
    const [morphDone, setMorphDone] = useState(false)

    useLayoutEffect(() => {
        if (!morphDone) return
        const main = containerRef.current
        const card = cardTrackRef.current
        if (!main || !card) return

        const applySlide = () => {
            const innerW = main.clientWidth
            const cardW = card.getBoundingClientRect().width
            const maxX = Math.max(0, innerW - cardW)
            const target = reversed ? maxX : 0

            onContentInsetChange(Math.round(cardW + CARD_CONTENT_GAP))

            if (!hasSnappedSlideOnce.current) {
                slideX.set(target)
                hasSnappedSlideOnce.current = true
            } else {
                animate(slideX, target, cardSlideSpring)
            }
        }

        applySlide()
        const ro = new ResizeObserver(applySlide)
        ro.observe(main)
        ro.observe(card)
        return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- slideX is a stable MotionValue
    }, [containerRef, morphDone, onContentInsetChange, reversed, section])

    return (
        <motion.div
            ref={cardTrackRef}
            className="absolute top-0 bottom-0 left-0 z-10 flex max-h-full min-h-0"
            style={{ x: slideX }}
        >
            <MorphCard
                type="pictureframe"
                delay={0.5}
                enableLayout={false}
                className="h-full max-h-full min-h-0 self-stretch"
                onMorphComplete={() => setMorphDone(true)}
            >
                <PictureFrame
                    variant={PICTURE_FRAME_VARIANTS[section]}
                    rarityColor={rarityColor}
                />
            </MorphCard>
        </motion.div>
    )
}

type SlidingFooterProps = {
    containerRef: React.RefObject<HTMLDivElement | null>
    reversed: boolean
    rarityColor?: string
}

/** Theme toggle slides opposite the picture frame: right on hero, left on contact/projects. */
function SlidingFooterAside({ containerRef, reversed, rarityColor }: SlidingFooterProps) {
    const cardTrackRef = useRef<HTMLDivElement>(null)
    const slideX = useMotionValue(0)
    const hasSnappedSlideOnce = useRef(false)
    const [morphDone, setMorphDone] = useState(false)

    useLayoutEffect(() => {
        if (!morphDone) return
        const track = containerRef.current
        const card = cardTrackRef.current
        if (!track || !card) return

        const applySlide = () => {
            const innerW = track.clientWidth
            const cardW = card.getBoundingClientRect().width
            const maxX = Math.max(0, innerW - cardW)
            const target = reversed ? 0 : maxX

            if (!hasSnappedSlideOnce.current) {
                slideX.set(target)
                hasSnappedSlideOnce.current = true
            } else {
                animate(slideX, target, cardSlideSpring)
            }
        }

        applySlide()
        const ro = new ResizeObserver(applySlide)
        ro.observe(track)
        ro.observe(card)
        return () => ro.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- slideX is a stable MotionValue
    }, [containerRef, morphDone, reversed])

    return (
        <motion.div
            ref={cardTrackRef}
            className="absolute left-0 top-0 z-10 flex w-max max-w-full min-w-[12rem]"
            style={{ x: slideX }}
        >
            <MorphCard
                type="themebutton"
                delay={0.75}
                enableLayout={false}
                className="self-start"
                onMorphComplete={() => setMorphDone(true)}
            >
                <ThemeToggle rarityColor={rarityColor} />
            </MorphCard>
        </motion.div>
    )
}

export default function ShellLayout({ children }: Props) {
    const { phase, specialCardsRarities } = usePhase()
    const { section } = useNav()

    const completed = phase === 'completed'
    const reversed = completed && REVERSED_SECTIONS.has(section)

    const mainRef = useRef<HTMLDivElement>(null)
    const footerTrackRef = useRef<HTMLDivElement>(null)
    const [contentInset, setContentInset] = useState(0)

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">

            {/* ── Header: SocialDock left | NavDock right ─────────────────── */}
            <header className="shrink-0 flex items-end md:items-center justify-between px-4 md:px-8 pt-4 md:pt-8">
                {completed && (
                    <>
                        <MorphCard type="socialdock" delay={0}>
                            <SocialDock rarityColor={specialCardsRarities?.socialdock} />
                        </MorphCard>
                        <MorphCard type="nav" delay={0.25}>
                            <NavDock rarityColor={specialCardsRarities?.nav} />
                        </MorphCard>
                    </>
                )}
            </header>

            {/* ── Main: inset track; picture slides on transform x ─────────── */}
            <main className="relative flex min-h-0 flex-1 flex-col pt-8">
                <div
                    ref={mainRef}
                    className="relative mx-8 flex min-h-0 min-w-0 flex-1 flex-col"
                >
                    {completed && (
                        <SlidingPictureAside
                            containerRef={mainRef}
                            reversed={reversed}
                            section={section}
                            rarityColor={specialCardsRarities?.pictureframe}
                            onContentInsetChange={setContentInset}
                        />
                    )}

                    <section
                        className="flex min-h-0 min-w-0 flex-1 flex-col self-stretch transition-[padding] duration-0"
                        style={{
                            paddingLeft:
                                completed && !reversed && contentInset > 0
                                    ? contentInset
                                    : undefined,
                            paddingRight:
                                completed && reversed && contentInset > 0
                                    ? contentInset
                                    : undefined,
                        }}
                    >
                        {children}
                    </section>
                </div>
            </main>

            {/* ── Footer: ThemeToggle slides — right (hero) / left (contact & projects) ─ */}
            <footer className="shrink-0 px-8 pb-8">
                <div ref={footerTrackRef} className="relative min-h-[3rem] w-full">
                    {completed && (
                        <SlidingFooterAside
                            containerRef={footerTrackRef}
                            reversed={reversed}
                            rarityColor={specialCardsRarities?.themebutton}
                        />
                    )}
                </div>
            </footer>

        </div>
    )
}
