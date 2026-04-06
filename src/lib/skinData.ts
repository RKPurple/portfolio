export type SpecialCardType = 'nameplate' | 'socialdock' | 'nav'

export type RarityId = 'blue' | 'purple' | 'pink' | 'red' | 'gold'

export const RARITY_COLORS: Record<RarityId, string> = {
  blue:   'var(--cs-blue)',
  purple: 'var(--cs-purple)',
  pink:   'var(--cs-pink)',
  red:    'var(--cs-red)',
  gold:   'var(--cs-gold)',
}

export type Card = {
  rarity?: RarityId
  image?: string
  type?: SpecialCardType
}

export const FILLER_SKINS: Record<RarityId, string[]> = {
  blue:   ['/spinItems/blue_1.webp'],
  purple: ['/spinItems/blue_1.webp'],
  pink:   ['/spinItems/blue_1.webp'],
  red:    ['/spinItems/blue_1.webp'],
  gold:   ['/spinItems/blue_1.webp'],
}

export const SPECIAL_CARDS: Card[] = [
  { type: 'nameplate',  image: '/Email_Logo.png' },
  { type: 'socialdock'},
  { type: 'nav',        image: '/LinkedIn_Logo.png' },
]