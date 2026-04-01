export const enterOverlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const heroVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const appShellVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const reelSpinEasing = [0.05, 1, 0.2, 1]