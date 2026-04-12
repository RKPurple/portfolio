'use client'

// HeroSection fills the content slot in ShellLayout's <section>.
// No spacers needed — ShellLayout's flex structure handles clearance
// from the PictureFrame aside automatically.
function HeroSection() {
    return (
        <div className="flex-1 flex flex-col items-center">
            <h1 className="text-xl font-bold justify-center items-center">Rohan Kallur</h1>
        </div>
    )
}

export default HeroSection
