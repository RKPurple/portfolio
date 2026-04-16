export type SpecialCardType = 'themebutton' | 'socialdock' | 'nav' | 'pictureframe'

export type RarityId = 'blue' | 'purple' | 'pink' | 'red' | 'gold'

export const RARITY_COLORS: Record<RarityId, string> = {
  blue:   'var(--cs-blue)',
  purple: 'var(--cs-purple)',
  pink:   'var(--cs-pink)',
  red:    'var(--cs-red)',
  gold:   'var(--cs-gold)',
}

/** Deterministic accents when the user lands on a non-home route without completing the case spin (avoids SSR/client random mismatch). */
export const STATIC_FALLBACK_SPECIAL_CARD_RARITIES: Record<SpecialCardType, string> = {
  pictureframe: RARITY_COLORS.purple,
  socialdock: RARITY_COLORS.blue,
  nav: RARITY_COLORS.pink,
  themebutton: RARITY_COLORS.gold,
}

export type Card = {
  rarity?: RarityId
  image?: string
  type?: SpecialCardType
}

export const FILLER_SKINS: Record<RarityId, string[]> = {
  blue:   ['/spinItems/blue_1.webp', '/spinItems/blue_2.webp', '/spinItems/blue_3.webp', '/spinItems/blue_4.webp', '/spinItems/blue_5.webp', '/spinItems/blue_6.webp', '/spinItems/blue_7.webp'],
  purple: ['/spinItems/purple_1.webp', '/spinItems/purple_2.webp', '/spinItems/purple_3.webp', '/spinItems/purple_4.webp', '/spinItems/purple_5.webp'],
  pink:   ['/spinItems/pink_1.webp', '/spinItems/pink_2.webp', '/spinItems/pink_3.webp'],
  red:    ['/spinItems/red_1.webp', '/spinItems/red_2.webp'],
  gold:   ['/spinItems/gold_1.webp'],
}

export const SPECIAL_CARDS: Card[] = [
  { type: 'pictureframe' },
  { type: 'socialdock'},
  { type: 'nav'},
  { type: 'themebutton'},
]