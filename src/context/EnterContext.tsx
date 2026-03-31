'use client'

import { createContext, useContext, useState } from 'react'

type EnterContextType = {
    entered: boolean
    setEntered: (value: boolean) => void
}

const EnterContext = createContext<EnterContextType | null>(null)

export function EnterProvider({ children }: { children: React.ReactNode }) {
    const [entered, setEntered] = useState(false)

    return (
        <EnterContext.Provider value={{ entered, setEntered }}>
            {children}
        </EnterContext.Provider>
    )
}

export function useEnter() {
    const context = useContext(EnterContext)
    if (!context) throw new Error('useEnter must be used within an EnterProvider')
    return context
}