'use client'

import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/data'

function resolveColor(color: string): string {
    if (typeof window === 'undefined') return color
    if (!color.startsWith('var(')) return color
    const varName = color.slice(4, -1).trim()
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

export default function SocialDock() {
    return (
        <motion.div
            layoutId="social-dock"
            className="flex flex-row items-center gap-4"
        >
            {SOCIAL_LINKS.filter(link => link.enabled).map(link => {
                const Icon = link.icon
                return (
                    <motion.a
                        key={link.id}
                        href={link.href}
                        target={link.id === 'email' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                        whileHover={{ scale: 1.5, color: resolveColor(link.hoverColor) }}
                        transition={{ 
                            scale: { type: 'spring', stiffness: 400, damping: 20 },
                            color: { type: 'tween', duration: 0.15, ease: 'easeInOut' }
                        }}
                    >
                        <Icon size={30} />
                    </motion.a>
                )
            })}
        </motion.div>
    )
}
