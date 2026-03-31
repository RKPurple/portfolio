'use client'

import { useEnter } from '@/context/EnterContext'
import { appShellVariants } from '@/lib/animations'
import { motion } from 'framer-motion'

export default function AppShell() {
    const { entered } = useEnter()

    return (
        <motion.div
            className="w-screen h-[1vh] bg-red-500"
            variants={appShellVariants}
            initial="hidden"
            animate={entered ? "visible" : "hidden"}
            exit="hidden"
        >
            <div className="w-screen h-[1vh] bg-red-500" />
        </motion.div>
    )
}