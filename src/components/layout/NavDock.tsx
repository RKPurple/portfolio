'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '@/lib/data'
import type { PortfolioSection } from '@/context/NavContext'
import { useNav } from '@/context/NavContext'

type Props = {
    rarityColor?: string
}

export default function NavDock({ rarityColor }: Props) {
    const { section, goToSection } = useNav()
    return (
        <nav className="flex flex-row items-center gap-2 md:gap-5 font-nav text-md md:text-xl text-link-color">
            {NAV_LINKS.map(link => {
                const isActive = section === link.id
                return (
                    <motion.div
                        key={link.id}
                        className="flex flex-col gap-0.5"
                        whileHover={{ y: -4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        <Link
                            href={link.href}
                            scroll={false}
                            onClick={e => {
                                e.preventDefault()
                                goToSection(link.id as PortfolioSection)
                            }}
                        >
                            {link.label}
                        </Link>
                        <motion.div
                            className="h-1"
                            style={{ backgroundColor: rarityColor ?? 'transparent', transformOrigin: 'left' }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isActive && rarityColor ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </motion.div>
                )
            })}
        </nav>
    )
}