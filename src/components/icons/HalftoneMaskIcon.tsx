type Props = {
    src: string
    size?: number
    className?: string
}

/** Raster/halftone art masked so `color` on an ancestor drives the fill via `currentColor`. */
export default function HalftoneMaskIcon({ src, size = 35, className }: Props) {
    return (
        <span
            className={`inline-block shrink-0 ${className ?? ''}`}
            style={{
                width: size,
                height: size,
                backgroundColor: 'currentColor',
                maskImage: `url(${src})`,
                WebkitMaskImage: `url(${src})`,
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'center',
                WebkitMaskPosition: 'center',
            }}
            aria-hidden
        />
    )
}
