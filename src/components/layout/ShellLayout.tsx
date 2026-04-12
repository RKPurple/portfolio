'use client'

import { usePhase } from '@/context/EnterContext'
import { usePathname } from 'next/navigation'
import MorphCard from '@/components/layout/MorphCard'
import SocialDock from '@/components/layout/SocialDock'
import PictureFrame from '@/components/layout/PictureFrame'
import NavDock from '@/components/layout/NavDock'
import ThemeToggle from '@/components/layout/ThemeToggle'

// Routes where the PictureFrame aside sits on the RIGHT instead of the left.
// Add new routes here as pages are built — everything else defaults to left.
const REVERSED_ROUTES = new Set(['/projects', '/contact'])

type Props = { children: React.ReactNode }

export default function ShellLayout({ children }: Props) {
    const { phase, specialCardsRarities } = usePhase()
    const pathname = usePathname()

    const completed = phase === 'completed'
    // Only flip the row direction when we're showing the shell
    const reversed = completed && REVERSED_ROUTES.has(pathname)

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

            {/* ── Main: PictureFrame aside + page content ──────────────────── */}
            {/* flex-row-reverse on listed routes moves the aside to the right. */}
            {/* Framer's layout prop on MorphCard springs between sides on nav. */}
            <main className={`flex-1 flex ${reversed ? 'flex-row-reverse' : 'flex-row'} items-stretch px-8 pt-8 min-h-0`}>
                {completed && (
                    <MorphCard type="pictureframe" delay={0.5} className="shrink-0 self-stretch h-full min-h-0">
                        <PictureFrame rarityColor={specialCardsRarities?.pictureframe} />
                    </MorphCard>
                )}

                {/* Page content slot — always present so {children} stays
                    in the same tree position across phase changes, preserving
                    AnimatePresence exit animations for EnterOverlay/CaseSpinSection */}
                <section className="flex-1 min-w-0 flex flex-col self-stretch">
                    {children}
                </section>
            </main>

            {/* ── Footer: ThemeToggle right ─────────────────────────────────── */}
            <footer className="shrink-0 flex justify-end px-8 pb-8">
                {completed && (
                    <MorphCard type="themebutton" delay={0.75}>
                        <ThemeToggle rarityColor={specialCardsRarities?.themebutton} />
                    </MorphCard>
                )}
            </footer>

        </div>
    )
}
