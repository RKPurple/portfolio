'use client'

/** Main-column copy for contact; the form lives in PictureFrame on this section. */
export default function ContactSection() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center text-enter-lettering">
            <p className="font-nav text-lg uppercase tracking-widest opacity-80">Get in touch</p>
            <p className="mt-2 max-w-md text-center text-sm opacity-60">
                Use the form in the frame — or reach me via the social links above.
            </p>
        </div>
    )
}
