import ThemeToggle from '@/components/layout/ThemeToggle'

function HeroSection() {
    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-6 h-screen w-screen">
            <h1 className="font-stratumno2 text-foreground">THE GOAT RKPURPLE</h1>
            <ThemeToggle />
        </div>
    )
}

export default HeroSection