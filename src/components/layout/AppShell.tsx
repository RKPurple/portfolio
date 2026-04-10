'use client'

import { usePhase } from '@/context/EnterContext'
import { usePathname } from 'next/navigation'
import MorphCard from '@/components/layout/MorphCard'
import SocialDock from '@/components/layout/SocialDock'
import PictureFrame from '@/components/layout/PictureFrame'
import NavDock from '@/components/layout/NavDock'
import ThemeToggle from '@/components/layout/ThemeToggle'

// Main-area flex class per route — controls where PictureFrame lands
const MAIN_JUSTIFY: Record<string, string> = {
    '/':         'justify-start',
    '/projects': 'justify-end',
    '/contact':  'justify-center',
}

export default function AppShell() {
    const { phase, specialCardsRarities } = usePhase()
    const pathname = usePathname()

    if (phase !== 'completed') return null

    const mainJustify = MAIN_JUSTIFY[pathname] ?? 'justify-start'

    return (
        <div className="fixed inset-0 pointer-events-none z-50 flex flex-col">

            {/* Header row — SocialDock left, NavDock right */}
            <header className="flex items-center justify-between px-8 pt-8">
                <MorphCard type="socialdock">
                    <SocialDock rarityColor={specialCardsRarities?.socialdock} />
                </MorphCard>
                <MorphCard type="nav">
                    <NavDock rarityColor={specialCardsRarities?.nav} />
                </MorphCard>
            </header>

            {/* Main area — PictureFrame anchors here, position shifts per route */}
            <main className={`flex-1 flex items-start px-8 pt-8 ${mainJustify}`}>
                <MorphCard type="pictureframe">
                    <PictureFrame rarityColor={specialCardsRarities?.pictureframe} />
                </MorphCard>
            </main>

            {/* Footer row — ThemeToggle right */}
            <footer className="flex justify-end px-8 pb-8">
                <MorphCard type="themebutton">
                    <ThemeToggle rarityColor={specialCardsRarities?.themebutton} />
                </MorphCard>
            </footer>

        </div>
    )
}
