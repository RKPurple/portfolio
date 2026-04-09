import type { IconType } from 'react-icons'

export type SocialLink = {
    id: string
    label: string
    href: string
    /** Public URL under `/public`, e.g. `/icons/github_halftone.svg` */
    maskSrc: string
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
        maskSrc: '/icons/github_halftone.svg',
        hoverColor: 'var(--social-dock-github)',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/rohankallur',
        maskSrc: '/icons/linkedin_halftone.svg',
        hoverColor: 'var(--social-dock-linkedin)',
    },
    {
        id: 'resume',
        label: 'Resume',
        href: '/assets/resume.pdf',
        maskSrc: '/icons/resume_halftone.svg',
        hoverColor: 'var(--social-dock-resume)',
    },
    // {
    //     id: 'email',
    //     label: 'Email',
    //     href: 'mailto:placeholder@email.com',
    //     maskSrc: '/icons/email_halftone.svg',
    //     hoverColor: 'var(--social-dock-email)',
    // },
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
        href: '/contacts',
    }
]