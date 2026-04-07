'use client'

import { createContext, useContext, useState } from 'react'
import type { SpecialCardType } from '@/lib/skinData'

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

export function EnterProvider({ children }: { children: React.ReactNode }) {
    const [phase, setPhase] = useState<Phase>('idle')
    const [winningCardType, setWinningCardType] = useState<SpecialCardType | null>(null)
    const [specialCardsRarities, setSpecialCardsRarities] = useState<Record<SpecialCardType, string> | null>(null)
    const [cardSlotRects, setCardSlotRects] = useState<Partial<Record<SpecialCardType, DOMRect>> | null>(null)

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
