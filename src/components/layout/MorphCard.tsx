'use client'

import { motion } from 'framer-motion'
import { usePhase } from '@/context/EnterContext'
import type { SpecialCardType } from '@/lib/skinData'
import { useRef, useState, useLayoutEffect } from 'react'

type Props = {
    type: SpecialCardType
    heroTop: number
    heroLeft: number
    children: React.ReactNode
}

const SPRING = { type: 'spring', stiffness: 120, damping: 22, mass: 1 } as const
const FADE_DURATION = 0.15
const FADE_DELAY = 0.50

export default function MorphCard({ type, heroTop, heroLeft, children }: Props) {
    const { cardSlotRects } = usePhase()
    const rect = cardSlotRects?.[type]
    const contentRef = useRef<HTMLDivElement>(null)
    const [heroSize, setHeroSize] = useState<{ width: number, height: number } | null>(null)
    const [done, setDone] = useState(false)

    useLayoutEffect(() => {
        if (contentRef.current) {
            const { width, height } = contentRef.current.getBoundingClientRect()
            setHeroSize({ width, height })
        }
    }, [])

    return (
        <motion.div
            className={`absolute pointer-events-auto flex items-center justify-center ${!done ? 'overflow-hidden' : ''}`}
            style={{ top: heroTop, left: heroLeft }}
            initial={rect ? {
                x: rect.left - heroLeft,
                y: rect.top - heroTop,
                width: rect.width,
                height: rect.height,
                backgroundColor: '#3a3a3a',
            } : false}
            animate={{
                x: 0,
                y: 0,
                width: heroSize?.width,
                height: heroSize?.height,
                backgroundColor: 'rgba(0,0,0,0)',
            }}
            transition={{
                x: { ...SPRING, delay: 0.15 },
                y: { ...SPRING, delay: 0.15 },
                width: SPRING,
                height: SPRING,
                backgroundColor: { type: 'tween', duration: FADE_DURATION, ease: 'easeOut', delay: FADE_DELAY },
            }}
            onAnimationComplete={() => setDone(true)}
        >
            <div ref={contentRef}>
                {children}
            </div>
        </motion.div>
    )
}
