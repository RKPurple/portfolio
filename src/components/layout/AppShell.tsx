'use client'

import { usePhase } from '@/context/EnterContext'
import { appShellVariants } from '@/lib/animations'
import { motion } from 'framer-motion'
import SocialDock from '@/components/layout/SocialDock'

export default function AppShell() {
    const { phase } = usePhase()

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            variants={appShellVariants}
            initial="hidden"
            animate={phase === 'completed' ? 'visible' : 'hidden'}
        >
            {/* Hero position: social dock top-left */}
            <div className="absolute top-8 left-8 pointer-events-auto">
                <SocialDock />
            </div>
        </motion.div>
    )
}