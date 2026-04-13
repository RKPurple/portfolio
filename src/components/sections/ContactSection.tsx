'use client'

/** Main-column copy for contact; the form lives in PictureFrame on this section. */
export default function ContactSection() {
    return (
        <div className="flex flex-1 flex-col items-center h-full w-full p-4">
            <h1 className="font-nav text-5xl uppercase tracking-widest">Contact Me</h1>
            <p className="text-center text-md font-accent">I'm open to new opportunities so feel free to reach out to me via email or LinkedIn!</p>
            <div className="grid grid-cols-2 gap-4 p-6">
                <p className="font-nav text-lg">Email: </p>
                <a href="mailto:rkallur135@gmail.com" className="font-nav text-xl underline">rkallur135@gmail.com</a>
                <p className="font-nav text-lg">Location: </p>
                <p className="font-nav text-xl">Colonia, NJ</p>
            </div>
            <img src="/assets/mailman.png" alt="" className="w-full h-full object-cover" />
        </div>
    )
}
