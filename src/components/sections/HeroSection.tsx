'use client'

// HeroSection fills the content slot in ShellLayout's <section>.
// No spacers needed — ShellLayout's flex structure handles clearance
// from the PictureFrame aside automatically.
function HeroSection() {
    return (
        <div className="flex-1 flex flex-col justify-center gap-6 px-10 py-8">
            <h1 className="font-stratumno2 text-foreground text-5xl">ROHAN KALLUR</h1>
            <p className="text-foreground/60 text-lg max-w-md">
                Full-stack software engineer. Fill whatever text for the home page TBD.
            </p>
        </div>
    )
}

export default HeroSection
