import type { Variants } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const enterOverlayVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease } },
    exit:    { opacity: 0, transition: { duration: 0.5, ease } },
}

export const heroVariants: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const appShellVariants: Variants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease } },
}

export const reelSpinEasing: [number, number, number, number] = [0.05, 1, 0.2, 1]
