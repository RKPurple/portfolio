'use client'

import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/data'

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
                        className="text-white/60 hover:text-white transition-colors"
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        <Icon size={20} />
                    </motion.a>
                )
            })}
        </motion.div>
    )
}
