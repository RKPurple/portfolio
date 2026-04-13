import type { Variants } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const enterOverlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease } },
    exit:    { opacity: 0, transition: { duration: 0.5, ease } },
}

export const heroVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease, delay: 1.2 } },
}

export const appShellVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const reelSpinEasing: [number, number, number, number] = [0.05, 1, 0.2, 1]

/** Opacity crossfade when switching PictureFrame inner content (hero / projects / contact). */
export const pictureFrameCrossfade = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

/** Horizontal slide for the picture-frame column between home and projects/contact. */
export const cardSlideSpring = {
    type: 'spring' as const,
    stiffness: 95,
    damping: 24,
    mass: 1,
}
