'use client'

import {
    createContext,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

const ThemeContext = createContext<{
    theme: Theme
    setTheme: (t: Theme) => void
    toggleTheme: () => void
} | null>(null)

function readThemeFromDocument(): Theme {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(readThemeFromDocument)

    // After hydration, align React state with <html class> set by the inline layout script
    // (SSR/hydration can leave state as the server default while the document is already correct).
    useLayoutEffect(() => {
        setThemeState(readThemeFromDocument())
    }, [])

    const setTheme = useCallback((t: Theme) => {
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(t)
        try {
            localStorage.setItem(STORAGE_KEY, t)
        } catch {
            /* ignore */
        }
        setThemeState(t)
    }, [])

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }, [theme, setTheme])

    const value = useMemo(
        () => ({ theme, setTheme, toggleTheme }),
        [theme, setTheme, toggleTheme],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
