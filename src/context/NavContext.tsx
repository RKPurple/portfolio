'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react'

/** Align with `NAV_LINKS` ids in `lib/data.ts`. */
export type PortfolioSection = 'home' | 'projects' | 'contact'
export type ProjectId = 'redraft' | 'sentinel'

const KNOWN = new Set<PortfolioSection>(['home', 'projects', 'contact'])

export function parseSectionFromHash(hash: string): PortfolioSection {
    const raw = hash.replace(/^#/, '').toLowerCase()
    if (raw === '' || raw === 'home') return 'home'
    if (KNOWN.has(raw as PortfolioSection)) return raw as PortfolioSection
    return 'home'
}

/** Safe on the server; use for effects / one-off reads. */
export function getSectionFromLocation(): PortfolioSection {
    if (typeof window === 'undefined') return 'home'
    return parseSectionFromHash(window.location.hash)
}

export function isNonHomeSection(section: PortfolioSection): boolean {
    return section !== 'home'
}

type NavContextValue = {
    section: PortfolioSection
    goToSection: (next: PortfolioSection) => void
    activeProjectId: ProjectId
    setActiveProjectId: (next: ProjectId) => void
}

const NavContext = createContext<NavContextValue | null>(null)

export function NavProvider({ children }: { children: React.ReactNode }) {
    const [section, setSection] = useState<PortfolioSection>('home')
    const [activeProjectId, setActiveProjectId] = useState<ProjectId>('redraft')

    useLayoutEffect(() => {
        setSection(getSectionFromLocation())
    }, [])

    useEffect(() => {
        const onHashChange = () => setSection(getSectionFromLocation())
        window.addEventListener('hashchange', onHashChange)
        return () => window.removeEventListener('hashchange', onHashChange)
    }, [])

    const goToSection = useCallback((next: PortfolioSection) => {
        if (next === 'home') {
            if (window.location.hash) {
                window.history.replaceState(
                    null,
                    '',
                    window.location.pathname + window.location.search
                )
            }
            setSection('home')
            return
        }
        window.location.hash = next
        setSection(next)
    }, [])

    return (
        <NavContext.Provider
            value={{ section, goToSection, activeProjectId, setActiveProjectId }}
        >
            {children}
        </NavContext.Provider>
    )
}

export function useNav() {
    const ctx = useContext(NavContext)
    if (!ctx) throw new Error('useNav must be used within NavProvider')
    return ctx
}