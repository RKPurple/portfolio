// Hero page content. The left column is intentionally blank — the
// PictureFrame from AppShell occupies that visual space as a fixed overlay.
function HeroSection() {
    return (
        <div className="h-screen w-screen flex flex-row">
            {/* Left column — visual space reserved for the AppShell PictureFrame.
                Width = px-8 padding (32px) + w-md frame (448px) + 24px gap = 504px */}
            <div className="w-[504px] shrink-0" />

            {/* Right column — actual hero content */}
            <div className="flex-1 flex flex-col justify-center gap-6 pr-16">
                <h1 className="font-stratumno2 text-foreground text-5xl">ROHAN KALLUR</h1>
                <p className="text-foreground/60 text-lg max-w-md">
                    Full-stack software engineer. Fill whatever text for the home page TBD.
                </p>
            </div>
        </div>
    )
}

export default HeroSection
