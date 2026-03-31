'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { enterOverlayVariants, heroVariants } from '@/lib/animations'
import { useEnter } from '@/context/EnterContext'
import EnterOverlay from '@/components/sections/EnterOverlay'
import HeroSection from '@/components/sections/HeroSection'

export default function Page() {
  const { entered, setEntered } = useEnter()

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <motion.div key="enter" variants={enterOverlayVariants} initial="initial" animate="animate" exit="exit">
          <EnterOverlay onEnter={() => setEntered(true)} />
        </motion.div>
      ) : (
        <motion.div key="hero" variants={heroVariants} initial="initial" animate="animate">
          <HeroSection />
        </motion.div>
      )}
    </AnimatePresence>
  )
}