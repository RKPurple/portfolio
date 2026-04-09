import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineDocumentText, HiOutlineMail } from 'react-icons/hi'
import type { IconType } from 'react-icons'

export type SocialLink = {
    id: string
    label: string
    href: string
    icon: IconType
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
        icon: FaGithub,
        hoverColor: 'var(--social-dock-github)',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/rohankallur',
        icon: FaLinkedin,
        hoverColor: 'var(--social-dock-linkedin)',
    },
    {
        id: 'resume',
        label: 'Resume',
        href: '/assets/resume.pdf',
        icon: HiOutlineDocumentText,
        hoverColor: 'var(--social-dock-resume)',
    },
    // {
    //     id: 'email',
    //     label: 'Email',
    //     href: 'mailto:placeholder@email.com',
    //     icon: HiOutlineMail,
    //     hoverColor: 'var(--social-dock-email)',
    //     enabled: false, // flip to true when contact section is decided
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