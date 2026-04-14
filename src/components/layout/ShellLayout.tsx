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
import { useIsMdUp } from '@/hooks/useMediaQuery'

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
    isDesktop: boolean
}

/**
 * md+: absolute column + horizontal slide. < md: in-flow block on top of the section (flex-col stack).
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
                animate(slideX, target, cardSlideSpring)
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
            className="relative flex w-full shrink-0 justify-center md:h-full md:min-h-0 md:w-full md:max-w-full"
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
    const [morphDone, setMorphDone] = useState(false)

    useLayoutEffect(() => {
        if (prevDesktop.current !== isDesktop) {
            prevDesktop.current = isDesktop
            hasSnappedSlideOnce.current = false
            slideX.set(0)
        }
        if (!morphDone) return
        const track = containerRef.current
        const card = cardTrackRef.current
        if (!track || !card) return

        const applySlide = () => {
            if (!isDesktop) {
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
                animate(slideX, target, cardSlideSpring)
            }
        }

        applySlide()
        const ro = new ResizeObserver(applySlide)
        ro.observe(track)
        ro.observe(card)
        return () => ro.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps -- slideX is a stable MotionValue
    }, [containerRef, morphDone, reversed, isDesktop])

    return (
        <motion.div
            ref={cardTrackRef}
            className="relative z-10 flex w-full justify-center md:absolute md:left-0 md:top-0 md:w-max md:min-w-[12rem] md:justify-start"
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
    const isDesktop = useIsMdUp()

    const completed = phase === 'completed'
    const reversed = completed && REVERSED_SECTIONS.has(section)

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
                <div
                    ref={mainRef}
                    className="relative mx-4 flex min-h-0 min-w-0 flex-1 flex-col gap-6 md:mx-8 md:gap-0"
                >
                    {completed && (
                        <div className="order-1 w-full shrink-0 md:absolute md:inset-y-0 md:left-0 md:z-10 md:flex md:w-max md:max-w-full md:items-stretch">
                            <SlidingPictureAside
                                containerRef={mainRef}
                                reversed={reversed}
                                section={section}
                                rarityColor={specialCardsRarities?.pictureframe}
                                onContentInsetChange={setContentInset}
                                isDesktop={isDesktop}
                            />
                        </div>
                    )}

                    <section
                        className="order-2 relative z-0 flex min-h-0 min-w-0 flex-1 flex-col self-stretch transition-[padding] duration-0 md:order-none"
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
            </main>

            <footer className="shrink-0 px-8 pb-8">
                <div ref={footerTrackRef} className="relative min-h-[3rem] w-full">
                    {completed && (
                        <SlidingFooterAside
                            containerRef={footerTrackRef}
                            reversed={reversed}
                            rarityColor={specialCardsRarities?.themebutton}
                            isDesktop={isDesktop}
                        />
                    )}
                </div>
            </footer>

        </div>
    )
}
