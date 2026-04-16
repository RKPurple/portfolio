'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Redraft from '@/components/projects/Redraft'
import Sentinel from '@/components/projects/Sentinel'
import Portfolio from '@/components/projects/Portfolio'
import { type ProjectId, useNav } from '@/context/NavContext'

const PROJECTS: Array<{ id: ProjectId; title: string; import: ReactNode; url: string }> = [
    {
        id: 'redraft',
        title: 'Redraft Room',
        import: <Redraft/>,
        url: 'https://redraft-room.onrender.com'
    },
    {
        id: 'sentinel',
        title: 'DeFi Sentinel',
        import: <Sentinel/>,
        url: 'https://www.netki.com/'
    },
    {
        id: 'portfolio',
        title: 'Portfolio',
        import: <Portfolio/>,
        url: 'https://rohankallur.xyz'
    }
]

/** Main-column content for the projects section (frame aside shows PictureFrame projects variant). */
export default function ProjectsSection() {
    const { setActiveProjectId } = useNav()
    const [index, setIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    useEffect(() => {
        setActiveProjectId(PROJECTS[index].id)
    }, [index, setActiveProjectId])

    const prev = () => {
        setDirection(-1)
        setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length)
    }
    const next = () => {
        setDirection(1)
        setIndex((i) => (i + 1) % PROJECTS.length)
    }

    const current = PROJECTS[index]

    return (
        <div className="flex flex-1 flex-col items-center text-enter-lettering gap-5">
            <div className="flex flex-row items-center gap-4 text-2xl md:text-4xl font-nav text-link-color">
                <button onClick={prev} className='hover:opacity-70 hover:cursor-pointer'>←</button>
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.a
                        key={current.title}
                        href={current.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-nav text-link-color uppercase hover:underline"
                        custom={direction}
                        initial={(dir: number) => ({ opacity: 0, x: dir * 20 })}
                        animate={{ opacity: 1, x: 0 }}
                        exit={(dir: number) => ({ opacity: 0, x: dir * -20 })}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                        {current.title}
                    </motion.a>
                </AnimatePresence>
                <button onClick={next} className='hover:opacity-70 hover:cursor-pointer'>→</button>
            </div>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                    key={current.title}
                    className="flex flex-1 flex-col items-center gap-5 w-full"
                    custom={direction}
                    initial={(dir: number) => ({ opacity: 0, x: dir * 30 })}
                    animate={{ opacity: 1, x: 0 }}
                    exit={(dir: number) => ({ opacity: 0, x: dir * -30 })}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    {current.import}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}