import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiOutlineDocumentText, HiOutlineMail } from 'react-icons/hi'
import type { IconType } from 'react-icons'

export type SocialLink = {
    id: string
    label: string
    href: string
    icon: IconType
    hoverColor: string
    enabled: boolean
}

export const SOCIAL_LINKS: SocialLink[] = [
    {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/RKPurple',
        icon: FaGithub,
        hoverColor: 'var(--social-dock-github)',
        enabled: true,
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/rohankallur',
        icon: FaLinkedin,
        hoverColor: 'var(--social-dock-linkedin)',
        enabled: true,
    },
    {
        id: 'resume',
        label: 'Resume',
        href: '/assets/resume.pdf',
        icon: HiOutlineDocumentText,
        hoverColor: 'var(--social-dock-resume)',
        enabled: true,
    },
    {
        id: 'email',
        label: 'Email',
        href: 'mailto:placeholder@email.com',
        icon: HiOutlineMail,
        hoverColor: 'var(--social-dock-email)',
        enabled: false, // flip to true when contact section is decided
    },
]
