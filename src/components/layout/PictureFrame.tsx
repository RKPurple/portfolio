'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import ContactForm from '@/components/contact/ContactForm'
import { pictureFrameCrossfade } from '@/lib/animations'

export type PictureFrameVariant = 'hero' | 'contact' | 'projects'

type Props = {
    rarityColor?: string
    children?: React.ReactNode
    variant?: PictureFrameVariant
}

const BORDER_REVEAL = {
    duration: 0.6,
    delay: 1.5,
    ease: pictureFrameCrossfade.ease,
} as const

function FrameBorder({
    rarityColor,
    borderSettled,
    onRevealComplete,
}: {
    rarityColor?: string
    borderSettled: boolean
    onRevealComplete: () => void
}) {
    const clip = rarityColor ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)'
    const borderStyle = {
        border: `4px solid ${rarityColor ?? 'transparent'}`,
        clipPath: clip,
    } as const

    if (borderSettled) {
        return (
            <div
                className="pointer-events-none absolute inset-0 z-10"
                style={borderStyle}
            />
        )
    }

    return (
        <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ border: borderStyle.border }}
            initial={{ clipPath: 'inset(0 100% 0 0)' }}
            animate={{ clipPath: clip }}
            transition={{
                duration: BORDER_REVEAL.duration,
                ease: BORDER_REVEAL.ease,
                delay: BORDER_REVEAL.delay,
            }}
            onAnimationComplete={onRevealComplete}
        />
    )
}

function VariantInner({
    variant,
    rarityColor,
    children,
}: {
    variant: PictureFrameVariant
    rarityColor?: string
    children?: React.ReactNode
}) {
    if (children) return children

    if (variant === 'hero') {
        return (
            <img
                src="/assets/portrait.jpg"
                alt="Rohan"
                className="h-full w-full object-cover"
            />
        )
    }
    if (variant === 'contact') {
        return <ContactForm rarityColor={rarityColor} />
    }
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-black/20 text-enter-lettering">
            <p className="font-nav text-lg uppercase tracking-widest opacity-80">Projects</p>
            <p className="mt-2 text-sm opacity-60">Coming soon</p>
        </div>
    )
}

/** Portrait fills parent height; width follows aspect ratio and shrinks with the column/window. */
export default function PictureFrame({ rarityColor, children, variant = 'hero' }: Props) {
    const [borderSettled, setBorderSettled] = useState(false)

    const onBorderRevealComplete = useCallback(() => {
        setBorderSettled(true)
    }, [])

    return (
        <div className="relative flex h-full max-h-full min-h-0 w-full max-w-full justify-center">
            <div className="relative h-full max-h-full min-h-0 w-auto max-w-full aspect-[3/4] overflow-hidden">
                <AnimatePresence initial={false} mode="sync">
                    <motion.div
                        key={variant}
                        className="absolute inset-0 flex min-h-0 min-w-0 flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={pictureFrameCrossfade}
                    >
                        <VariantInner variant={variant} rarityColor={rarityColor}>
                            {children}
                        </VariantInner>
                    </motion.div>
                </AnimatePresence>

                <FrameBorder
                    rarityColor={rarityColor}
                    borderSettled={borderSettled}
                    onRevealComplete={onBorderRevealComplete}
                />
            </div>
        </div>
    )
}
