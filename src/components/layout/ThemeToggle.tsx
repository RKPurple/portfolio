'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

function resolveColor(color: string): string {
    if (typeof window === 'undefined') return color
    if (!color.startsWith('var(')) return color
    const varName = color.slice(4, -1).trim()
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
}

type Props = {
    rarityColor?: string
}

const BORDER_PX = 4
const BORDER_ANIM = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
    delay: 1.5,
}

export default function ThemeToggle({ rarityColor }: Props) {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'
    const resolvedRarity = rarityColor ? resolveColor(rarityColor) : null

    return (
        <div className="relative inline-block">
            <motion.button
                type="button"
                onClick={toggleTheme}
                className={`font-theme-toggle relative z-10 flex items-center justify-center bg-theme-bg text-center text-theme-text text-base uppercase tracking-widest rounded px-4 py-2.5 hover:opacity-80 ${
                    resolvedRarity ? 'border-0' : 'border-4 border-theme-text/40'
                }`}
                whileHover={{ cursor: 'pointer' }}
                whileTap={{ scale: 0.97 }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {isDark ? 'Light' : 'Dark'}
            </motion.button>
            {resolvedRarity && (
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-20 rounded"
                    style={{ border: `${BORDER_PX}px solid ${resolvedRarity}` }}
                    initial={{ clipPath: 'inset(0 0 0 100%)' }}
                    animate={{ clipPath: 'inset(0 0 0 0)' }}
                    transition={BORDER_ANIM}
                />
            )}
        </div>
    )
}
