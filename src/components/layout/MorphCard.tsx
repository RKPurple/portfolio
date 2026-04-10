'use client'

import { motion, useMotionValue, animate } from 'framer-motion'
import { usePhase } from '@/context/EnterContext'
import type { SpecialCardType } from '@/lib/skinData'
import { useRef, useState, useLayoutEffect } from 'react'

type Props = {
    type: SpecialCardType
    children: React.ReactNode
    className?: string
    /** Base delay (seconds) before this card's FLIP animation starts. Use to stagger cards. */
    delay?: number
}

const SPRING = { type: 'spring', stiffness: 120, damping: 22, mass: 1 } as const
const FADE_DURATION = 0.35
const FADE_DELAY = 0.50

export default function MorphCard({ type, children, className, delay = 0 }: Props) {
    const { cardSlotRects } = usePhase()
    const reelRect = cardSlotRects?.[type]
    const ref = useRef<HTMLDivElement>(null)
    const [done, setDone] = useState(false)
    // Hide until measured — prevents a single-frame flash at the layout position
    const [visible, setVisible] = useState(!reelRect)

    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const scaleX = useMotionValue(1)
    const scaleY = useMotionValue(1)
    const bgColor = useMotionValue('rgba(0,0,0,0)')

    useLayoutEffect(() => {
        if (!ref.current || !reelRect) {
            // No reel data (e.g. hot reload) — just show in place immediately
            setVisible(true)
            setDone(true)
            return
        }

        const selfRect = ref.current.getBoundingClientRect()

        // FLIP: Invert — push element visually to the reel slot position
        x.set(reelRect.left - selfRect.left)
        y.set(reelRect.top - selfRect.top)
        scaleX.set(reelRect.width / selfRect.width)
        scaleY.set(reelRect.height / selfRect.height)
        bgColor.set('#3a3a3a')

        setVisible(true)

        // FLIP: Play — spring back to natural layout position.
        // All delays are offset by the per-card `delay` prop for staggering.
        let cancelled = false
        const controls = [
            animate(x, 0, { ...SPRING, delay: delay + 0.15 }),
            animate(y, 0, { ...SPRING, delay: delay + 0.15 }),
            animate(scaleX, 1, { ...SPRING, delay }),
            animate(scaleY, 1, { ...SPRING, delay }),
            animate(bgColor, 'rgba(0,0,0,0)', {
                type: 'tween',
                duration: FADE_DURATION,
                ease: 'easeOut',
                delay: delay + FADE_DELAY,
            }),
        ]

        // Mark done when the last animation (background fade) completes
        controls[controls.length - 1].then(() => {
            if (!cancelled) setDone(true)
        })

        return () => {
            cancelled = true
            controls.forEach(c => c.stop())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <motion.div
            ref={ref}
            // Only enable layout animations after the entry morph is done,
            // so route-change repositions spring smoothly without interfering
            // with the initial FLIP
            layout={done}
            transition={{ layout: SPRING }}
            className={`pointer-events-auto ${!done ? 'overflow-hidden' : ''} ${className ?? ''}`}
            style={{
                x, y, scaleX, scaleY,
                backgroundColor: bgColor,
                transformOrigin: 'top left',
                visibility: visible ? 'visible' : 'hidden',
            }}
        >
            {children}
        </motion.div>
    )
}
