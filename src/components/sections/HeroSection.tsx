'use client'

import { THEME_IMAGES } from '@/lib/data'
import { useIsLightModeFromHtml } from '@/context/ThemeContext'

type ExperienceCardProps = {
    title: string
    subtitle: string
    timeline: { start: string, end: string }
    image: { src: string; alt?: string }
    misc?: string
}

function ExperienceCard({ title, subtitle, timeline, image, misc }: ExperienceCardProps){
    return (
        <div className="relative flex flex-row items-center gap-5 overflow-hidden rounded-xl border border-item-pane/50 bg-item-pane/50 py-4 pl-5 pr-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
            <div
                className="absolute inset-y-0 left-0 w-1.5 bg-cs-purple"
                aria-hidden
            />
            <div className="flex shrink-0 flex-col items-center gap-1 pl-2.5">
                <span className="font-nav text-xs tabular-nums leading-none text-cs-purple">
                    {timeline.start}
                </span>
                <div className="h-11 w-px bg-gradient-to-b from-cs-purple via-cs-purple/40 to-transparent" />
                <span className="font-nav text-xs tabular-nums leading-none text-foreground/35">
                    {timeline.end}
                </span>
            </div>
            <div className="min-w-0 flex-1 space-y-1">
                <p className="font-nav text-base leading-snug text-cs-purple">
                    {title}
                </p>
                <p className="font-accent text-base text-foreground">{subtitle}</p>
                {misc != null && misc !== '' && (
                    <p className="font-accent text-sm text-foreground/55">{misc}</p>
                )}
            </div>
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg">
                <img
                    src={image.src}
                    alt={image.alt || title}
                    className="h-20 w-20 object-contain opacity-90"
                />
            </div>
        </div>
    )
}

// HeroSection fills the content slot in ShellLayout's <section>.
// No spacers needed — ShellLayout's flex structure handles clearance
// from the PictureFrame aside automatically.
function HeroSection() {
    const isLight = useIsLightModeFromHtml()
    const netkiImageSrc = isLight ? THEME_IMAGES.home.netki.light : THEME_IMAGES.home.netki.dark
    const stevensImageSrc = isLight ? THEME_IMAGES.home.stevens.light : THEME_IMAGES.home.stevens.dark
    return (
        <div className="flex-1 flex flex-col items-center gap-1 md:gap-4 w-full h-full">
            <h1 className="text-3xl md:text-5xl font-bold font-nav">Rohan Kallur</h1>
            <p className="text-lg text-ul md:text-2xl font-accent">Software Engineer</p>
            <div className="grid w-full max-w-5xl grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 md:items-start">
            <div className="flex min-w-0 max-w-prose flex-col gap-3 self-center md:self-start">
                <p className="w-full text-center font-accent md:text-lg hidden md:block">About Me</p>

                <div className="flex flex-col gap-1 md:gap-3 text-left">
                    <p className="font-accent text-sm md:text-base leading-relaxed text-foreground">
                        Hi, I'm Rohan — a versatile software engineer who recently graduated from
                        Stevens Institute of Technology.
                    </p>

                    <p className="font-accent text-sm leading-relaxed text-foreground/85">
                        I have hands on experience in a range of technologies and fields through school, internships, and personal projects:
                    </p>

                    <ul className="list-inside list-disc space-y-1.5 pl-0.5 font-accent text-sm leading-relaxed text-foreground/85 marker:text-cs-purple">
                    <li>DeFi / Smart Contract Development</li>
                    <li>AI R&D</li>
                    <li>Full-stack development</li>
                    </ul>

                    <p className="font-accent text-sm font-medium leading-relaxed text-foreground">
                        Open to full-time software engineering roles.
                    </p>
                </div>
                </div>
                <div className="flex min-w-0 flex-col gap-4">
                    <p className="w-full text-center font-accent text-lg">Education and Experience</p>
                    <div className="flex w-full flex-col gap-4">
                        <ExperienceCard
                            title="Stevens Institute of Technology"
                            subtitle="B.S. in Computer Science"
                            misc="Minor in Finance"
                            timeline={{ start: '2021', end: '2025' }}
                            image={{ src: stevensImageSrc }}
                        />
                        <ExperienceCard
                            title="Netki"
                            subtitle="Software Development Intern"
                            timeline={{ start: 'May 2024', end: 'Aug 2024' }}
                            image={{ src: netkiImageSrc }}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-1 flex-col justify-end items-center gap-1 md:gap-4 w-full'>
                <p className='font-accent text-lg'> Interests and Hobbies </p>
                <div className='flex flex-row items-center gap-4 font-accent text-sm md:text-lg'>
                    <span >Rocks</span>
                    <span >Basketball</span>
                    <span >Film</span>
                    <span >Photography</span>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
