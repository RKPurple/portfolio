'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { STATIC_FALLBACK_SPECIAL_CARD_RARITIES, type SpecialCardType } from '@/lib/skinData'

type Phase = 'idle' | 'spinning' | 'completed'

type EnterContextType = {
    phase: Phase
    setPhase: (phase: Phase) => void
    winningCardType: SpecialCardType | null
    setWinningCardType: (type: SpecialCardType) => void
    specialCardsRarities: Record<SpecialCardType, string> | null
    setSpecialCardsRarities: (map: Record<SpecialCardType, string>) => void
    cardSlotRects: Partial<Record<SpecialCardType, DOMRect>> | null
    setCardSlotRects: (rects: Partial<Record<SpecialCardType, DOMRect>>) => void
}

const EnterContext = createContext<EnterContextType | null>(null)

function isNonHomePath(pathname: string | null): boolean {
    return Boolean(pathname && pathname !== '/')
}

export function EnterProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const startOnShellOnly = isNonHomePath(pathname)

    const [phase, setPhase] = useState<Phase>(() => (startOnShellOnly ? 'completed' : 'idle'))
    const [winningCardType, setWinningCardType] = useState<SpecialCardType | null>(null)
    const [specialCardsRarities, setSpecialCardsRarities] = useState<Record<SpecialCardType, string> | null>(() =>
        startOnShellOnly ? STATIC_FALLBACK_SPECIAL_CARD_RARITIES : null
    )
    const [cardSlotRects, setCardSlotRects] = useState<Partial<Record<SpecialCardType, DOMRect>> | null>(null)

    // Client navigations (e.g. / → /contact): show shell without requiring the home enter flow.
    useEffect(() => {
        if (!isNonHomePath(pathname)) return
        setPhase('completed')
        setSpecialCardsRarities(prev => prev ?? STATIC_FALLBACK_SPECIAL_CARD_RARITIES)
    }, [pathname])

    return (
        <EnterContext.Provider value={{
            phase, setPhase,
            winningCardType, setWinningCardType,
            specialCardsRarities, setSpecialCardsRarities,
            cardSlotRects, setCardSlotRects,
        }}>
            {children}
        </EnterContext.Provider>
    )
}

export function usePhase() {
    const context = useContext(EnterContext)
    if (!context) throw new Error('usePhase must be used within an EnterProvider')
    return context
}
