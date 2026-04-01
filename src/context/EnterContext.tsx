'use client'

import { createContext, useContext, useState } from 'react'

type Phase = 'idle' | 'spinning' | 'completed'

type EnterContextType = {
    phase: Phase
    setPhase: (phase: Phase) => void
}

const EnterContext = createContext<EnterContextType | null>(null)

export function EnterProvider({ children }: { children: React.ReactNode }) {
    const [phase, setPhase] = useState<Phase>('idle')

    return (
        <EnterContext.Provider value={{ phase, setPhase }}>
            {children}
        </EnterContext.Provider>
    )
}

export function usePhase() {
    const context = useContext(EnterContext)
    if (!context) throw new Error('usePhase must be used within an EnterProvider')
    return context
}