'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    return (
        <motion.button
            type="button"
            onClick={toggleTheme}
            className="font-nav text-sm uppercase tracking-widest text-link-color border border-current/40 rounded px-2 py-1 hover:opacity-80"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? 'Light' : 'Dark'}
        </motion.button>
    )
}
