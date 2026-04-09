'use client'

import { motion } from 'framer-motion'
import HalftoneMaskIcon from '@/components/icons/HalftoneMaskIcon'
import { SOCIAL_LINKS } from '@/lib/data'

function resolveColor(color: string): string {
    if (typeof window === 'undefined') return color
    if (!color.startsWith('var(')) return color
    const varName = color.slice(4, -1).trim()
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

type Props = {
    rarityColor?: string
}

export default function SocialDock({ rarityColor }: Props) {
    return (
        <div className="flex flex-col gap-3 text-link-color">
            <div className="flex flex-row items-center gap-3">
                {SOCIAL_LINKS.map(link => (
                    <motion.a
                        key={link.id}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        style={{ color: 'var(--link-color)'}}
                        whileHover={{ scale: 1.5, color: resolveColor(link.hoverColor) }}
                        transition={{
                            scale: { type: 'spring', stiffness: 400, damping: 20 },
                            color: { type: 'tween', duration: 0.15, ease: 'easeInOut' }
                        }}
                    >
                        <HalftoneMaskIcon src={link.maskSrc} size={45} />
                    </motion.a>
                ))}
            </div>
            {rarityColor && (
                <motion.div
                    className="h-1"
                    style={{ backgroundColor: rarityColor, transformOrigin: 'left' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
                />
            )}
        </div>
    )
}
