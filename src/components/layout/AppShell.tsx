'use client'

import { usePhase } from '@/context/EnterContext'
import MorphCard from '@/components/layout/MorphCard'
import SocialDock from '@/components/layout/SocialDock'
import PictureFrame from '@/components/layout/PictureFrame'
import NavDock from '@/components/layout/NavDock'
import ThemeToggle from '@/components/layout/ThemeToggle'

export default function AppShell() {
    const { phase, specialCardsRarities } = usePhase()

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {phase === 'completed' && (
                <>
                <MorphCard type="socialdock" heroTop={32} heroLeft={32}>
                    <SocialDock rarityColor={specialCardsRarities?.socialdock} />
                </MorphCard>
                <MorphCard type="pictureframe" heroTop={100} heroLeft={32}>
                    <PictureFrame rarityColor={specialCardsRarities?.pictureframe} />
                </MorphCard>
                <MorphCard type="nav" heroTop={32} heroLeft={window.innerWidth - 350}>
                    <NavDock rarityColor={specialCardsRarities?.nav} />
                </MorphCard>
                <MorphCard type="themebutton" heroTop={window.innerHeight - 50} heroLeft={window.innerWidth - 100}>
                    <ThemeToggle rarityColor={specialCardsRarities?.themebutton} />
                </MorphCard>
                </>
            )}
        </div>
    )
}
