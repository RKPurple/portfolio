/** Weapon case + key art paths (light vs dark site mode). */

export function caseImageSrc(isLight: boolean): string {
    return isLight
        ? '/cases/dreams_nightmares_case.png'
        : '/cases/shattered_web_case.png'
}

export function caseKeySrc(isLight: boolean): string {
    return isLight
        ? '/cases/dreams_nightmares_key.png'
        : '/cases/shattered_web_key.png'
}

export const CASE_IMAGE_CLASS =
    'h-[60vw] sm:h-[45vw] md:h-[35vw] w-auto'
