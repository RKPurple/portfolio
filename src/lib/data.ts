import type { IconType } from 'react-icons'
import { SiSolidity, SiWeb3Dotjs, SiDjango, SiGithubactions, SiGooglecloud, SiJirasoftware, SiVite, SiTypescript, SiFastapi, SiPostgresql, SiRender, SiResend } from "react-icons/si";
import { FaReact, FaPython, FaDocker } from "react-icons/fa";
import { RiTailwindCssLine, RiNextjsLine, RiFirebaseFill, RiVercelLine } from "react-icons/ri";
import { VscGithub } from "react-icons/vsc";
import { DiJavascript } from "react-icons/di";
import { TbBrandFramerMotion } from "react-icons/tb";
import React from "react";

interface TechStackDetails {
    id: string;
    icon: React.ReactElement;
    title: string;
}

const CUSTOM_TECH_ICON_CLASS = 'h-[1em] w-[1em] object-contain'
const CUSTOM_TECH_ICON_MASK_CLASS = 'inline-block h-[1em] w-[1em] align-[-0.125em] bg-current'

const customMaskIcon = (src: string) =>
    React.createElement('span', {
        className: CUSTOM_TECH_ICON_MASK_CLASS,
        style: {
            WebkitMaskImage: `url(${src})`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskImage: `url(${src})`,
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: 'contain',
        } as const,
        'aria-hidden': true,
    })

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
        href: '/#projects',
    },
    {
        id: 'contact',
        label: 'CONTACT',
        href: '/#contact',
    },
]

export const CONTACT_FORM = {
    labels: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
    },
    placeholders: {
        name: 'Your Name',
        email: 'you@example.com',
        message: 'I want to hire you!',
    },
    submit: 'Send',
    submitting: 'Sending...',
    success: 'Sent!',
    errorGeneric: 'Something went wrong, try again.',
} as const

export const TECH_STACK: TechStackDetails[] = [
    // Languages
    { id: "javascript", icon: React.createElement(DiJavascript), title: "JavaScript" },
    { id: "typescript", icon: React.createElement(SiTypescript), title: "TypeScript" },
    { id: "python", icon: React.createElement(FaPython), title: "Python" },
    { id: "solidity", icon: React.createElement(SiSolidity), title: "Solidity" },

    // Frontend Frameworks & Libraries
    { id: "react", icon: React.createElement(FaReact), title: "React" },
    { id: "nextjs", icon: React.createElement(RiNextjsLine), title: "Next.js" },
    { id: "tailwind", icon: React.createElement(RiTailwindCssLine), title: "Tailwind CSS" },
    { id: "vite", icon: React.createElement(SiVite), title: "Vite" },
    { id: 'framermotion', icon: React.createElement(TbBrandFramerMotion), title: "Framer Motion"},
    
    // Backend Frameworks & APIs
    { id: 'resend', icon: React.createElement(SiResend), title: "Resend API"},
    { id: "django", icon: React.createElement(SiDjango), title: "Django" },
    { id: "fastapi", icon: React.createElement(SiFastapi), title: "FastAPI" },
    { id: "web3", icon: React.createElement(SiWeb3Dotjs), title: "Web3.js" },
    { id: "playwright", icon: customMaskIcon("/icons/playwright_logo.png"), title: "Playwright" },

    // Databases
    { id: "postgresql", icon: React.createElement(SiPostgresql), title: "PostgreSQL" },
    { id: "firebase", icon: React.createElement(RiFirebaseFill), title: "Firebase" },

    // Infrastructure & DevOps
    { id: "docker", icon: React.createElement(FaDocker), title: "Docker" },
    { id: "googlecloud", icon: React.createElement(SiGooglecloud), title: "Google Cloud" },
    { id: "githubactions", icon: React.createElement(SiGithubactions), title: "GitHub Actions" },

    // Hosting & Deployment
    { id: "vercel", icon: React.createElement(RiVercelLine), title: "Vercel" },
    { id: "render", icon: React.createElement(SiRender), title: "Render" },
    { id: "githubhost", icon: React.createElement(VscGithub), title: "GitHub Hosting" },

    // Tools & Blockchain Dev
    { id: "remixide", icon: customMaskIcon("/icons/remix_logo.png"), title: "Remix IDE" },
    { id: "truffle", icon: customMaskIcon("/icons/truffle_logo.png"), title: "Truffle" },
    { id: "ganache", icon: customMaskIcon("/icons/ganache_logo.png"), title: "Ganache" },
    { id: "githubsc", icon: React.createElement(VscGithub), title: "GitHub Source Control" },
    { id: "jira", icon: React.createElement(SiJirasoftware), title: "Jira" },
];

export const CONTACT_HONEYPOT_FIELD = 'website' as const

export type ThemeAsset = {
    dark: string
    light: string
}

export const THEME_IMAGES = {
    contact: {
        dark: '/assets/mailman-dark.png',
        light: '/assets/mailman-light.png',
    },
    projects: {
        redraft: {
            dark: '/assets/rodman-dark.png',
            light: '/assets/rodman-light.png',
        },
        sentinel: {
            dark: '/assets/sentinel-dark.png',
            light: '/assets/sentinel-light.png',
        },
        portfolio: {
            dark: '/assets/portfolio-dark.png',
            light: '/assets/portfolio-light.png',
        },
    },
    home: {
        netki: {
            dark: '/assets/netki-dark.png',
            light: '/assets/netki-light.png',
        },
        stevens: {
            dark: '/assets/stevens-dark.png',
            light: '/assets/stevens-light.png',
        },
    }
}