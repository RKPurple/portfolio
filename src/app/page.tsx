'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { heroVariants } from '@/lib/animations'
import { usePhase } from '@/context/EnterContext'
import { useNav } from '@/context/NavContext'
import EnterOverlay from '@/components/sections/EnterOverlay'
import CaseSpinSection from '@/components/sections/CaseSpinSection'
import HeroSection from '@/components/sections/HeroSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function Page() {
  const { phase, setPhase } = usePhase()
  const { section } = useNav()

  return (
    <>
      <AnimatePresence>
        {phase === 'idle' && (
          <EnterOverlay key="enter" onEnter={() => setPhase('spinning')} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'spinning' && <CaseSpinSection key="spin" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'completed' && (
          <motion.div
            key={section}
            variants={heroVariants}
            initial="initial"
            animate="animate"
            className="flex min-h-0 flex-1 flex-col"
          >
            {section === 'home' && <HeroSection />}
            {section === 'projects' && <ProjectsSection />}
            {section === 'contact' && <ContactSection />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}