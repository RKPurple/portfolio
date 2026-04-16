'use client'

import { TECH_STACK, THEME_IMAGES } from '@/lib/data'
import { useIsLightModeFromHtml } from '@/context/ThemeContext'

const STACK = [
    'react',
    'vite',
    'python',
    'typescript',
    'postgresql',
    'fastapi',
    'render',
    'playwright',
]

export default function Redraft() {
    const isLight = useIsLightModeFromHtml()
    const imageSrc = isLight ? THEME_IMAGES.projects.redraft.light : THEME_IMAGES.projects.redraft.dark
    return (
        <>
            <button onClick={() => window.open('https://github.com/RKPurple/redrafter', '_blank')} className="text-lg md:text-2xl font-nav text-link-color border-3 border-cs-purple px-2 md:px-4 py-1 md:py-2 rounded-md hover:bg-cs-purple hover:text-white hover:cursor-pointer">
                Github Repo
            </button>
            <div className="w-full self-start text-left">
                <p className="text-lg md:text-2xl font-nav text-link-color underline">Project Overview</p>
                <p className="text-sm md:text-md font-accent text-link-color">
                    Redraft Room is a personal project I built that allows users to interactively redraft historical NBA draft classes.
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
                <img src={imageSrc} alt="Dennis Rodman" className="w-auto object-contain bg-transparent" />
            </div>
        </>
    )
}