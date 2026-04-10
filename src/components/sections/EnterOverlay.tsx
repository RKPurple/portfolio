'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, usePresence } from 'framer-motion';
import { useIsLightModeFromHtml } from '@/context/ThemeContext';
import { caseImageSrc, caseKeySrc, CASE_IMAGE_CLASS } from '@/lib/caseAssets';

interface EnterOverlayProps {
    onEnter: () => void;
}

const HINTS = [
    "click the case to enter",
    "you have the key, tf are you waiting for",
    "it is 100% free",
    "you don't get shit for waiting",
];

/** Idle-only pulse; usePresence fades the glow out when the overlay exits on click → spin. */
function CaseGlow() {
    const [isPresent] = usePresence()

    const idlePulse = {
        opacity: [0.45, 0.68, 0.45],
        scale: [0.96, 1.03, 0.96],
    }
    const exitOff = { opacity: 0, scale: 1 }

    return (
        <motion.div
            aria-hidden
            className="absolute w-full h-full rounded-full bg-case-glow blur-3xl"
            initial={false}
            animate={!isPresent ? exitOff : idlePulse}
            transition={
                !isPresent
                    ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
            }
        />
    )
}

function EnterOverlay({ onEnter }: EnterOverlayProps) {
    /** False while AnimatePresence runs exit — layer must not block hits or hide cursor */
    const [isPresent] = usePresence()
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isHoveringCase, setIsHoveringCase] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [hintIndex, setHintIndex] = useState(0);
    const isLight = useIsLightModeFromHtml()
    const keySrc = caseKeySrc(isLight)
    const caseSrc = caseImageSrc(isLight)
    const shakeControls = useAnimation();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (!isHoveringCase) return;
        shakeControls.start({
            x: [0, -4, 4, -2, 2, -1, 1, 0],
            rotate: [0, -1, 1, -0.5, 0.5, 0],
            transition: { duration: 0.4, ease: "easeInOut" }
        });
    }, [isHoveringCase]);

    useEffect(() => {
        const timeout = setTimeout(() => setShowHint(true), 500);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!showHint) return;
        const current = HINTS[hintIndex % HINTS.length];
        let i = displayedText.length;
        let erasing = false;
        let timer: ReturnType<typeof setInterval>;

        const tick = () => {
            if (!erasing) {
                i++;
                setDisplayedText(current.slice(0, i));
                if (i >= current.length) {
                    erasing = true;
                    clearInterval(timer);
                    timer = setInterval(tick, 40);
                    // Pause on full phrase for 8s before erasing
                    clearInterval(timer);
                    setTimeout(() => {
                        timer = setInterval(tick, 40);
                    }, 5000);
                }
            } else {
                i--;
                setDisplayedText(current.slice(0, i));
                if (i <= 0) {
                    clearInterval(timer);
                    setHintIndex(prev => prev + 1);
                }
            }
        };

        timer = setInterval(tick, 50);
        return () => clearInterval(timer);
    }, [showHint, hintIndex]);

    return (
        <motion.div
            className={`fixed inset-0 z-[45] flex flex-col items-center justify-center gap-8 ${
                isPresent ? 'md:cursor-none' : 'pointer-events-none md:cursor-auto'
            }`}
            exit={{ opacity: 0, y: 80 }}
            transition={{
                type: 'spring', stiffness: 120, damping: 22, mass: 1,
                duration: 0.7,
                ease: [0.33, 1, 0.68, 1],
                opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
            }}
        >
            <>
                {/* Key cursor */}
                <img
                    key={keySrc}
                    src={keySrc}
                    alt=""
                    aria-hidden
                    suppressHydrationWarning
                    className="hidden md:block fixed pointer-events-none z-50 h-[4vw] w-auto"
                    style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-20%, -80%)' }}
                />
                {/* Hint text */}
                <p className="font-stratumno2 text-md md:text-lg text-enter-lettering tracking-widest uppercase">
                    {showHint ? displayedText : '\u00A0'}
                    {showHint && displayedText.length < HINTS[hintIndex % HINTS.length].length && <span className="animate-pulse">_</span>}
                </p>
            </>
            <div className="relative flex items-center justify-center">
                <CaseGlow />
                <button
                    type="button"
                    onClick={onEnter}
                    onMouseEnter={() => setIsHoveringCase(true)}
                    onMouseLeave={() => setIsHoveringCase(false)}
                    className={`relative transition-opacity hover:opacity-85 ${isHoveringCase ? 'cursor-none' : 'cursor-default'}`}
                >
                    <motion.div animate={shakeControls}>
                        <img
                            key={caseSrc}
                            src={caseSrc}
                            alt="Weapon case"
                            suppressHydrationWarning
                            className={CASE_IMAGE_CLASS}
                        />
                    </motion.div>
                </button>
            </div>
        </motion.div>
    )
}

export default EnterOverlay;
