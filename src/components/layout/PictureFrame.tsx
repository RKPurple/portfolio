'use client'

import { motion } from 'framer-motion'

type Props = {
    rarityColor?: string
}

export default function PictureFrame({ rarityColor }: Props) {
    return (
        <div className="relative w-md h-md">
            <img src="/assets/portrait.jpg" alt="Rohan" className="w-full h-full object-cover" />
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
    )
}