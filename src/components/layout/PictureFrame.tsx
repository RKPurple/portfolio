'use client'

import { motion } from 'framer-motion'

type Props = {
    rarityColor?: string
    children?: React.ReactNode
}

/** Portrait fills parent height; width follows aspect ratio and shrinks with the column/window. */
export default function PictureFrame({ rarityColor, children }: Props) {
    return (
        <div className="relative flex h-full max-h-full min-h-0 w-full max-w-full justify-center">
            <div className="relative h-full max-h-full min-h-0 w-auto max-w-full aspect-[3/4]">
                {children ?? (
                    <img
                        src="/assets/portrait.jpg"
                        alt="Rohan"
                        className="h-full w-full object-cover"
                    />
                )}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        border: `4px solid ${rarityColor ?? 'transparent'}`,
                        clipPath: 'inset(0 100% 0 0)',
                    }}
                    animate={{ clipPath: rarityColor ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
                />
            </div>
        </div>
    )
}