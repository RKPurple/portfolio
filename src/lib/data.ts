import type { IconType } from 'react-icons'

export type SocialLink = {
    id: string
    label: string
    href: string
    /** Public URL under `/public` — dark theme (e.g. `html.dark`) */
    maskSrcDark: string
    /** Public URL under `/public` — light theme (e.g. `html.light`) */
    maskSrcLight: string
    hoverColor: string
}

export type NavLink = {
    id: string
    label: string
    href: string
    icon?: IconType
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/RKPurple',
        maskSrcDark: '/icons/github_dark.svg',
        maskSrcLight: '/icons/github_light.svg',
        hoverColor: 'var(--social-dock-github)',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/rohankallur',
        maskSrcDark: '/icons/linkedin_dark.svg',
        maskSrcLight: '/icons/linkedin_light.svg',
        hoverColor: 'var(--social-dock-linkedin)',
    },
    {
        id: 'resume',
        label: 'Resume',
        href: '/assets/resume.pdf',
        maskSrcDark: '/icons/resume_dark.svg',
        maskSrcLight: '/icons/resume_light.svg',
        hoverColor: 'var(--social-dock-resume)',
    },
]

export const NAV_LINKS: NavLink[] = [
    {
        id: 'home',
        label: 'HOME',
        href: '/',
    },
    {
        id: 'projects',
        label: 'PROJECTS',
        href: '/projects',
    },
    {
        id: 'contact',
        label: 'CONTACT',
        href: '/contact',
    }
]