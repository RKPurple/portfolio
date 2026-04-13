'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { getSectionFromLocation, isNonHomeSection, useNav } from '@/context/NavContext'
import { STATIC_FALLBACK_SPECIAL_CARD_RARITIES, type SpecialCardType } from '@/lib/skinData'

type Phase = 'idle' | 'spinning' | 'completed'

type EnterContextType = {
    phase: Phase
    setPhase: (phase: Phase) => void
    winningCardType: SpecialCardType | null
    setWinningCardType: (type: SpecialCardType) => void
    specialCardsRarities: Record<SpecialCardType, string> | null
    setSpecialCardsRarities: (map: Record<SpecialCardType, string> | null) => void
    cardSlotRects: Partial<Record<SpecialCardType, DOMRect>> | null
    setCardSlotRects: (rects: Partial<Record<SpecialCardType, DOMRect>>) => void
}

const EnterContext = createContext<EnterContextType | null>(null)

export function EnterProvider({ children }: { children: React.ReactNode }) {
    const { section } = useNav()

    const [phase, setPhase] = useState<Phase>('idle')
    const [winningCardType, setWinningCardType] = useState<SpecialCardType | null>(null)
    const [specialCardsRarities, setSpecialCardsRarities] = useState<Record<
        SpecialCardType,
        string
    > | null>(null)
    const [cardSlotRects, setCardSlotRects] = useState<Partial<Record<SpecialCardType, DOMRect>> | null>(
        null
    )

    // First paint on a deep link (e.g. /#contact): skip enter + ensure fallback rarities.
    useLayoutEffect(() => {
        if (isNonHomeSection(getSectionFromLocation())) {
            setPhase('completed')
            setSpecialCardsRarities(prev => prev ?? STATIC_FALLBACK_SPECIAL_CARD_RARITIES)
        }
    }, [])

    // Hash-driven section changes (in-app nav, back/forward).
    useEffect(() => {
        if (!isNonHomeSection(section)) return
        setPhase('completed')
        setSpecialCardsRarities(prev => prev ?? STATIC_FALLBACK_SPECIAL_CARD_RARITIES)
    }, [section])

    return (
        <EnterContext.Provider
            value={{
                phase,
                setPhase,
                winningCardType,
                setWinningCardType,
                specialCardsRarities,
                setSpecialCardsRarities,
                cardSlotRects,
                setCardSlotRects,
            }}
        >
            {children}
        </EnterContext.Provider>
    )
}

export function usePhase() {
    const context = useContext(EnterContext)
    if (!context) throw new Error('usePhase must be used within EnterProvider')
    return context
}