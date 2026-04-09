'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePhase } from '@/context/EnterContext';
import { useIsLightModeFromHtml } from '@/context/ThemeContext';

interface EnterOverlayProps {
    onEnter: () => void;
}

const HINTS = [
    "click the case to enter",
    "you have the key, tf are you waiting for",
    "it is 100% free",
    "you don't get shit for waiting",
];

function EnterOverlay({ onEnter }: EnterOverlayProps) {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isHoveringCase, setIsHoveringCase] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    const [hintIndex, setHintIndex] = useState(0);
    const { phase } = usePhase()
    const isLight = useIsLightModeFromHtml()
    const isBackground = phase === 'spinning'
    const keySrc = isLight ? '/cases/dreams_nightmares_key.png' : '/cases/shattered_web_key.png'
    const caseSrc = isLight ? '/cases/dreams_nightmares_case.png' : '/cases/shattered_web_case.png'
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
            className="flex flex-col items-center justify-center h-screen gap-8 md:cursor-none"
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
        >
            {!isBackground && (
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
            )}
            <div className="relative flex items-center justify-center">
                {/* Purple glow behind case */}
                <motion.div
                    className="absolute w-full h-full rounded-full bg-case-glow blur-3xl"
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.05, 0.9] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <button
                    onClick={onEnter}
                    disabled={isBackground}
                    onMouseEnter={() => setIsHoveringCase(true)}
                    onMouseLeave={() => setIsHoveringCase(false)}
                    className={`relative transition-opacity hover:opacity-85 ${isHoveringCase ? 'cursor-none' : 'cursor-default'} ${isBackground ? 'opacity-15 pointer-events-none' : 'hover:opacity-86'}`}
                >
                    <motion.div animate={shakeControls}>
                        <img
                            key={caseSrc}
                            src={caseSrc}
                            alt="Weapon case"
                            suppressHydrationWarning
                            className="h-[60vw] sm: h-[45vw] md:h-[35vw] w-auto"
                        />
                    </motion.div>
                </button>
            </div>
        </motion.div>
    )
}

export default EnterOverlay;