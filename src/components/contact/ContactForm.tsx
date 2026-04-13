'use client'

import { useState, type FormEvent } from 'react'
import { CONTACT_FIELD_LIMITS } from '@/lib/email'
import { CONTACT_FORM, CONTACT_HONEYPOT_FIELD } from '@/lib/data'

type Props = {
    /** Rarity accent for the submit button; falls back to CS purple. */
    rarityColor?: string
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm({ rarityColor }: Props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [honeypot, setHoneypot] = useState('')
    const [state, setState] = useState<SubmitState>('idle')
    const [errorText, setErrorText] = useState<string | null>(null)

    const accent = rarityColor ?? 'var(--cs-purple)'
    const disabled = state === 'sending' || state === 'success'

    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        setErrorText(null)
        setState('sending')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    [CONTACT_HONEYPOT_FIELD]: honeypot,
                }),
            })

            const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }

            if (res.ok && data.ok) {
                setState('success')
                setName('')
                setEmail('')
                setMessage('')
                return
            }

            setState('error')
            setErrorText(typeof data.error === 'string' ? data.error : CONTACT_FORM.errorGeneric)
        } catch {
            setState('error')
            setErrorText(CONTACT_FORM.errorGeneric)
        }
    }

    return (
        <form
            onSubmit={onSubmit}
            className="flex h-full min-h-0 w-full flex-col gap-4 p-1 text-enter-lettering"
            noValidate
        >
            <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium opacity-90">
                    {CONTACT_FORM.labels.name}
                </label>
                <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={CONTACT_FIELD_LIMITS.name}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={CONTACT_FORM.placeholders.name}
                    disabled={disabled}
                    required
                    className="rounded-md border border-item-pane bg-background/80 px-3 py-2 text-sm text-enter-lettering placeholder:text-enter-lettering/45 outline-none focus-visible:ring-2 focus-visible:ring-cs-purple/50 disabled:opacity-60"
                    aria-invalid={state === 'error' ? true : undefined}
                />
            </div>

            <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium opacity-90">
                    {CONTACT_FORM.labels.email}
                </label>
                <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={CONTACT_FIELD_LIMITS.email}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={CONTACT_FORM.placeholders.email}
                    disabled={disabled}
                    required
                    className="rounded-md border border-item-pane bg-background/80 px-3 py-2 text-sm text-enter-lettering placeholder:text-enter-lettering/45 outline-none focus-visible:ring-2 focus-visible:ring-cs-purple/50 disabled:opacity-60"
                    aria-invalid={state === 'error' ? true : undefined}
                />
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-sm font-medium opacity-90">
                    {CONTACT_FORM.labels.message}
                </label>
                <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    maxLength={CONTACT_FIELD_LIMITS.message}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder={CONTACT_FORM.placeholders.message}
                    disabled={disabled}
                    required
                    className="min-h-[120px] flex-1 resize-y rounded-md border border-item-pane bg-background/80 px-3 py-2 text-sm text-enter-lettering placeholder:text-enter-lettering/45 outline-none focus-visible:ring-2 focus-visible:ring-cs-purple/50 disabled:opacity-60"
                    aria-invalid={state === 'error' ? true : undefined}
                />
            </div>

            <input
                type="text"
                name={CONTACT_HONEYPOT_FIELD}
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-0 w-0 opacity-0"
            />

            {errorText && (
                <p className="text-sm text-cs-red" role="alert">
                    {errorText}
                </p>
            )}
            {state === 'success' && (
                <p className="text-sm text-enter-lettering/90" role="status">
                    {CONTACT_FORM.success}
                </p>
            )}

            <div className="pt-1">
                <button
                    type="submit"
                    disabled={disabled}
                    className="rounded-md px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: accent }}
                >
                    {state === 'sending' ? CONTACT_FORM.submitting : CONTACT_FORM.submit}
                </button>
            </div>
        </form>
    )
}