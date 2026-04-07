'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { enterOverlayVariants, heroVariants } from '@/lib/animations'
import { usePhase } from '@/context/EnterContext'
import EnterOverlay from '@/components/sections/EnterOverlay'
import CaseSpinSection from '@/components/sections/CaseSpinSection'
import HeroSection from '@/components/sections/HeroSection'

export default function Page() {
  const { phase, setPhase } = usePhase()

  return (
    <>
      {/* Enter Overlay */}
      <AnimatePresence>
        {(phase === 'idle' || phase === 'spinning') && (
          <EnterOverlay key="enter" onEnter={() => setPhase('spinning')} />
        )}
      </AnimatePresence>

      {/* Case Spin Section */}
      <AnimatePresence>
        {phase === 'spinning' && <CaseSpinSection key="spin" />}
      </AnimatePresence>

      {/* Hero Section */}
      <AnimatePresence>
        {phase === 'completed' && (
          <motion.div key="hero" variants={heroVariants} initial="initial" animate="animate">
            <HeroSection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}