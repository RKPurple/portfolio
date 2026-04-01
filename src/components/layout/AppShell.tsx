'use client'

import { usePhase } from '@/context/EnterContext'
import { appShellVariants } from '@/lib/animations'
import { motion } from 'framer-motion'

export default function AppShell() {
    const { phase } = usePhase()

    return (
        <motion.div
            className="w-screen h-[1vh] bg-red-500"
            variants={appShellVariants}
            initial="hidden"
            animate={phase === 'completed' ? "visible" : "hidden"}
            exit="hidden"
        >
            <div className="w-screen h-[1vh] bg-red-500" />
        </motion.div>
    )
}