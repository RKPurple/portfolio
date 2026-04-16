'use client'

import { THEME_IMAGES } from '@/lib/data'
import { useIsLightModeFromHtml } from '@/context/ThemeContext'

/** Main-column copy for contact; the form lives in PictureFrame on this section. */
export default function ContactSection() {
    const isLight = useIsLightModeFromHtml()
    const imageSrc = isLight ? THEME_IMAGES.contact.light : THEME_IMAGES.contact.dark
    return (
        <div className="flex flex-1 flex-col items-center h-full w-full md:p-4">
            <h1 className="font-nav text-3xl md:text-5xl uppercase tracking-widest">Contact Me</h1>
            <p className="text-center text-xs md:text-md font-accent">I'm open to new opportunities so feel free to reach out to me via email or LinkedIn!</p>
            {/* Desktop */}
            <div className="md:grid md:grid-cols-2 gap-2 md:gap-4 p-2 md:p-6 hidden">
                <p className="font-nav text-lg">Email:</p>
                <a href="mailto:rkallur135@gmail.com" rel="noopener noreferrer" className="font-nav text-xl underline">rkallur135@gmail.com</a>
                <p className="font-nav text-lg">Location:</p>
                <p className="font-nav text-xl">Colonia, NJ</p>
            </div>
            {/* Mobile */}
            <div className='flex flex-1 flex-col items-center gap-2 p-2 md:hidden'>
                <div className='flex flex-row items-center gap-2'>
                    <p className="font-nav text-md">Email:</p>
                    <a href="mailto:rkallur135@gmail.com" rel="noopener noreferrer" className="font-nav text-md underline">rkallur135@gmail.com</a>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <p className="font-nav text-md">Location:</p>
                    <p className="font-nav text-md">Colonia, NJ</p>
                </div>
            </div>
            <img src={imageSrc} alt="Contact" className="w-full h-full object-cover"/>
        </div>
    )
}
