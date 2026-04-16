'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import ContactForm from '@/components/contact/ContactForm'
import { pictureFrameCrossfade } from '@/lib/animations'
import { type ProjectId, useNav } from '@/context/NavContext'

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
    activeProjectId,
}: {
    variant: PictureFrameVariant
    rarityColor?: string
    children?: React.ReactNode
    activeProjectId: ProjectId
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

    if (variant === 'projects') {
        const projectMedia =
          activeProjectId === 'sentinel'
            ? {
                href: 'https://www.netki.com/',
                poster: '/projects/redrafter.png',
                webm: '/projects/sentinel.webm',
                mp4: '/projects/sentinel.mp4',
                label: 'DeFi Sentinel Demo Recording',
              }
            : {
                href: 'https://redraft-room.onrender.com',
                poster: '/projects/redrafter.png',
                webm: '/projects/redrafter-demo.webm',
                mp4: '/projects/redrafter-demo.mp4',
                label: 'Redrafter Demo Recording',
              }
        return (
          <a href={projectMedia.href} target="_blank" rel="noopener noreferrer">
            <video
              className="h-full w-full object-cover scale-110"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={projectMedia.poster}
              aria-label={projectMedia.label}
            >
              <source src={projectMedia.webm} type="video/webm" />
              <source src={projectMedia.mp4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </a>
        )
      }

    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-black/20 text-enter-lettering">
            <p className="font-nav text-lg uppercase tracking-widest opacity-80">Projects</p>
            <p className="mt-2 text-sm opacity-60">Coming soon</p>
        </div>
    )
}

const frameShellClass = (variant: PictureFrameVariant) => {
    if (variant === 'hero') {
        // Mobile: width-driven aspect box (parent is often h-auto). md+: fill MorphCard column.
        return 'relative aspect-[4/3] md:aspect-[3/4] w-full max-w-full overflow-hidden md:h-full md:max-h-full md:min-h-0 md:w-auto'
    }
    if (variant === 'projects') {
        // Lock 16:9 so height cap also caps width (~3/4 of old 60vh tall frame); stays balanced.
        return 'relative mx-auto aspect-video w-full max-w-[min(100%,calc(45vh*16/9))] overflow-hidden'
    }
    return 'relative aspect-[5/4] w-full max-w-full overflow-hidden md:h-full md:max-h-full md:min-h-0 md:w-auto'
}

/** Portrait fills parent height; width follows aspect ratio and shrinks with the column/window. */
export default function PictureFrame({ rarityColor, children, variant = 'hero' }: Props) {
    const [borderSettled, setBorderSettled] = useState(false)
    const fillShell = variant !== 'projects'
    const projectsVariant = variant === 'projects'
    const { activeProjectId } = useNav()

    const onBorderRevealComplete = useCallback(() => {
        setBorderSettled(true)
    }, [])

    return (
        <div
            className={
                projectsVariant
                    ? 'relative flex h-auto w-full max-w-full items-start justify-center md:h-full md:max-h-full md:min-h-0 md:items-center'
                    : 'relative flex h-auto w-full max-w-full justify-center md:h-full md:max-h-full md:min-h-0'
            }
        >
            <motion.div className={frameShellClass(variant)}>
                <AnimatePresence initial={false} mode="sync">
                    <motion.div
                        key={variant === 'projects' ? `${variant}-${activeProjectId}` : variant}
                        className={
                            fillShell
                                ? 'absolute inset-0 flex min-h-0 min-w-0 flex-col'
                                : 'relative flex min-h-0 min-w-0 flex-col'
                        }
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={pictureFrameCrossfade}
                    >
                        <VariantInner variant={variant} rarityColor={rarityColor} activeProjectId={activeProjectId}>
                            {children}
                        </VariantInner>
                    </motion.div>
                </AnimatePresence>

                <FrameBorder
                    rarityColor={rarityColor}
                    borderSettled={borderSettled}
                    onRevealComplete={onBorderRevealComplete}
                />
            </motion.div>
        </div>
    )
}
