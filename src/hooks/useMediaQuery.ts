'use client'

import { useSyncExternalStore } from 'react'

/** Matches Tailwind `md` (min-width: 768px). SSR: false until hydrated. */
export function useIsMdUp() {
    return useSyncExternalStore(
        onChange => {
            const mq = window.matchMedia('(min-width: 768px)')
            mq.addEventListener('change', onChange)
            return () => mq.removeEventListener('change', onChange)
        },
        () => window.matchMedia('(min-width: 768px)').matches,
        () => false
    )
}
