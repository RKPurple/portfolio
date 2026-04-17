'use client'

import { animate, LayoutGroup, motion, useMotionValue } from 'framer-motion'
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
import { useIsMdUp } from '@/hooks/useMediaQuery'

// Sections where the PictureFrame aside sits on the RIGHT instead of the left.
const REVERSED_SECTIONS = new Set<PortfolioSection>(['projects', 'contact'])

/** Horizontal gap between the sliding card column and the page content (px). */
const CARD_CONTENT_GAP = 24

/** Skip spring when already at target — avoids a second nudge after ResizeObserver reflows. */
const SLIDE_X_SNAP_EPS = 0.75

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
    isDesktop: boolean
}

/**
 * md+: absolute column + horizontal slide. < md: position driven by flex order on parent
 * (section top / picture bottom for non-home); no translate-Y here.
 */
function SlidingPictureAside({
    containerRef,
    reversed,
    section,
    rarityColor,
    onContentInsetChange,
    isDesktop,
}: SlidingAsideProps) {
    const cardTrackRef = useRef<HTMLDivElement>(null)
    const slideX = useMotionValue(0)
    const hasSnappedSlideOnce = useRef(false)
    const prevDesktop = useRef(isDesktop)
    const [morphDone, setMorphDone] = useState(false)

    useLayoutEffect(() => {
        if (prevDesktop.current !== isDesktop) {
            prevDesktop.current = isDesktop
            hasSnappedSlideOnce.current = false
            slideX.set(0)
        }
        if (!morphDone) return
        const main = containerRef.current
        const card = cardTrackRef.current
        if (!main || !card) return

        const applySlide = () => {
            if (!isDesktop) {
                slideX.set(0)
                onContentInsetChange(0)
                return
            }

            const innerW = main.clientWidth
            const cardW = card.getBoundingClientRect().width
            const maxX = Math.max(0, innerW - cardW)
            const target = reversed ? maxX : 0

            onContentInsetChange(Math.round(cardW + CARD_CONTENT_GAP))

            if (!hasSnappedSlideOnce.current) {
                slideX.set(target)
                hasSnappedSlideOnce.current = true
            } else {
                const current = slideX.get()
                if (Math.abs(current - target) <= SLIDE_X_SNAP_EPS) {
                    slideX.set(target)
                } else {
                    animate(slideX, target, cardSlideSpring)
                }
            }
        }

        applySlide()
        const ro = new ResizeObserver(applySlide)
        ro.observe(main)
        ro.observe(card)
        return () => ro.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- slideX is a stable MotionValue
    }, [containerRef, morphDone, onContentInsetChange, reversed, section, isDesktop])

    return (
        <motion.div
            ref={cardTrackRef}
            className="relative flex w-full shrink-0 justify-center md:pointer-events-none md:h-full md:min-h-0 md:w-full md:max-w-full"
            style={{ x: slideX }}
        >
            <MorphCard
                type="pictureframe"
                delay={0.5}
                enableLayout={false}
                className="h-auto w-full min-h-0 max-w-full justify-center md:h-full md:max-h-full md:self-stretch"
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
    isDesktop: boolean
}

/** Theme toggle: horizontal slide on md+; centered in footer on mobile. */
function SlidingFooterAside({
    containerRef,
    reversed,
    rarityColor,
    isDesktop,
}: SlidingFooterProps) {
    const cardTrackRef = useRef<HTMLDivElement>(null)
    const slideX = useMotionValue(0)
    const hasSnappedSlideOnce = useRef(false)
    const prevDesktop = useRef(isDesktop)
    /** False until entry FLIP finishes — then we use left+translate like SlidingPictureAside. */
    const [entryMorphDone, setEntryMorphDone] = useState(false)

    useLayoutEffect(() => {
        if (prevDesktop.current !== isDesktop) {
            prevDesktop.current = isDesktop
            hasSnappedSlideOnce.current = false
            slideX.set(0)
        }
        const track = containerRef.current
        const card = cardTrackRef.current
        if (!track || !card) return

        const applySlide = () => {
            if (!isDesktop) {
                slideX.set(0)
                return
            }
            // Entry morph: keep translate at 0. Anchor right (home) or left (contact) in CSS so
            // MorphCard FLIP measures the real hero edge — same motion from reel as before.
            if (!entryMorphDone) {
                slideX.set(0)
                return
            }

            const innerW = track.clientWidth
            const cardW = card.getBoundingClientRect().width
            const maxX = Math.max(0, innerW - cardW)
            const target = reversed ? 0 : maxX

            if (!hasSnappedSlideOnce.current) {
                slideX.set(target)
                hasSnappedSlideOnce.current = true
            } else {
                const current = slideX.get()
                if (Math.abs(current - target) <= SLIDE_X_SNAP_EPS) {
                    slideX.set(target)
                } else {
                    animate(slideX, target, cardSlideSpring)
                }
            }
        }

        applySlide()
        const ro = new ResizeObserver(applySlide)
        ro.observe(track)
        ro.observe(card)
        return () => ro.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- slideX is a stable MotionValue
    }, [containerRef, reversed, isDesktop, entryMorphDone])

    const desktopEntryMorph = isDesktop && !entryMorphDone
    const anchorRightDuringEntryMorph = desktopEntryMorph && !reversed
    const anchorLeftDuringEntryMorph = desktopEntryMorph && reversed

    const trackClassName = [
        'relative z-10 flex w-full justify-center md:w-max',
        anchorRightDuringEntryMorph && 'md:absolute md:right-0 md:left-auto md:top-0',
        anchorLeftDuringEntryMorph && 'md:absolute md:left-0 md:top-0',
        entryMorphDone && isDesktop && 'md:absolute md:left-0 md:top-0',
        entryMorphDone && isDesktop && (reversed ? 'md:justify-start' : 'md:justify-end'),
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <motion.div ref={cardTrackRef} className={trackClassName} style={{ x: slideX }}>
            <MorphCard
                type="themebutton"
                delay={0.75}
                enableLayout={false}
                className="self-end"
                onMorphComplete={() => setEntryMorphDone(true)}
            >
                <ThemeToggle rarityColor={rarityColor} />
            </MorphCard>
        </motion.div>
    )
}

export default function ShellLayout({ children }: Props) {
    const { phase, specialCardsRarities } = usePhase()
    const { section } = useNav()
    const isDesktop = useIsMdUp()

    const completed = phase === 'completed'
    const reversed = completed && REVERSED_SECTIONS.has(section)
    const themeToggleReversed = completed && section === 'contact'

    const mainRef = useRef<HTMLDivElement>(null)
    const footerTrackRef = useRef<HTMLDivElement>(null)
    const [contentInset, setContentInset] = useState(0)

    return (
        <div className="h-screen w-screen flex flex-col overflow-hidden">

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

            <main className="relative flex min-h-0 flex-1 flex-col overflow-y-auto pt-8 md:overflow-hidden">
                <LayoutGroup>
                    <div
                        ref={mainRef}
                        className="relative mx-4 flex min-h-0 min-w-0 flex-1 flex-col gap-6 md:mx-8 md:gap-0"
                    >
                        {completed && (
                            <motion.div
                                layout={!isDesktop}
                                transition={cardSlideSpring}
                                className={`relative z-20 w-full shrink-0 md:pointer-events-none md:absolute md:inset-y-0 md:left-0 md:z-20 md:flex md:w-max md:max-w-full md:items-stretch ${
                                    !isDesktop && section === 'home'
                                        ? 'order-1'
                                        : !isDesktop
                                          ? 'order-2'
                                          : ''
                                }`}
                            >
                                <SlidingPictureAside
                                    containerRef={mainRef}
                                    reversed={reversed}
                                    section={section}
                                    rarityColor={specialCardsRarities?.pictureframe}
                                    onContentInsetChange={setContentInset}
                                    isDesktop={isDesktop}
                                />
                            </motion.div>
                        )}

                        <section
                            className={`relative z-0 flex min-h-0 min-w-0 flex-1 flex-col self-stretch transition-[padding] duration-0 md:order-none ${
                                !isDesktop && section === 'home'
                                    ? 'order-2'
                                    : !isDesktop
                                      ? 'order-1'
                                      : ''
                            }`}
                            style={{
                                paddingLeft:
                                    isDesktop &&
                                    completed &&
                                    !reversed &&
                                    contentInset > 0
                                        ? contentInset
                                        : undefined,
                                paddingRight:
                                    isDesktop &&
                                    completed &&
                                    reversed &&
                                    contentInset > 0
                                        ? contentInset
                                        : undefined,
                            }}
                        >
                            {children}
                        </section>
                    </div>
                </LayoutGroup>
            </main>

            <footer className="shrink-0 px-4 md:px-8 md:pb-8">
                <div ref={footerTrackRef} className="relative min-h-[3rem] w-full">
                    {completed && (
                        <SlidingFooterAside
                            containerRef={footerTrackRef}
                            reversed={themeToggleReversed}
                            rarityColor={specialCardsRarities?.themebutton}
                            isDesktop={isDesktop}
                        />
                    )}
                </div>
            </footer>

        </div>
    )
}
