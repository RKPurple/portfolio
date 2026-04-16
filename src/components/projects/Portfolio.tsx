'use client'

import { TECH_STACK, THEME_IMAGES } from '@/lib/data'
import { useIsLightModeFromHtml } from '@/context/ThemeContext'

const STACK = [
    'nextjs',
    'react',
    'typescript',
    'tailwind',
    'framermotion',
    'vercel',
    'resend',
]

export default function Portfolio() {
    const isLight = useIsLightModeFromHtml()
    const imageSrc = isLight ? THEME_IMAGES.projects.portfolio.light : THEME_IMAGES.projects.portfolio.dark
    return (
        <>
            <div className='flex flex-row gap-2'>
                <button onClick={() => window.open('https://github.com/RKPurple/portfolio', '_blank')} className="text-lg md:text-2xl font-nav text-link-color border-3 border-cs-purple px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-cs-purple hover:text-white hover:cursor-pointer">
                    Github Repo
                </button>
                <button onClick={() => window.open('https://rk-purple.vercel.app', '_blank')} className="text-lg md:text-2xl font-nav text-link-color border-3 border-cs-purple px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-cs-purple hover:text-white hover:cursor-pointer">
                    Old Portfolio
                </button>
            </div>
            <div className="w-full self-start text-left">
                <p className="text-lg md:text-2xl font-nav text-link-color underline">Project Overview</p>
                <p className="text-sm md:text-md font-accent text-link-color">
                    Portfolio website to showcase my projects and experiences. Built to be visually unique and representative of my creativity.
                </p>
            </div>
            <div className="w-full self-start text-left">
                <p className="text-lg md:text-2xl font-nav text-link-color underline">Tech Used</p>
                <div className="mt-2 flex flex-row flex-wrap items-center gap-x-2 md:gap-x-4 gap-y-1 md:gap-y-2">
                    {STACK.map((tech: string) => (
                        <div key={tech} className="flex flex-row items-center gap-2 font-accent text-md">
                            {TECH_STACK.find((t) => t.id === tech)?.icon}
                            <p>{TECH_STACK.find((t) => t.id === tech)?.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full mt-auto">
                <img src={imageSrc} alt="Portfolio" className="w-auto object-contain bg-transparent" />
            </div>
        </>
    )
}