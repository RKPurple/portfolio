import { sendContactEmail, validateContactPayload } from '@/lib/email'

/** Must match the honeypot field name on ContactForm. */
const HONEYPOT_KEY = 'website'

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (json === null || typeof json !== 'object') {
    return Response.json({ error: 'Invalid body' }, { status: 400 })
  }

  const body = json as Record<string, unknown>

  const hp = body[HONEYPOT_KEY]
  if (typeof hp === 'string' && hp.trim() !== '') {
    return Response.json({ ok: true }, { status: 200 })
  }

  const parsed = validateContactPayload(json)
  if (!parsed.ok) {
    return Response.json({ error: parsed.error }, { status: 400 })
  }

  try {
    await sendContactEmail(parsed.value)
  } catch (e) {
    const code =
      e && typeof e === 'object' && 'code' in e
        ? String((e as { code?: string }).code)
        : ''
    if (code === 'MISSING_EMAIL_CONFIG') {
      console.error('[contact] Missing RESEND_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL')
      return Response.json({ error: 'Email is not configured' }, { status: 503 })
    }
    console.error('[contact] send failed', e)
    return Response.json({ error: 'Could not send message' }, { status: 500 })
  }

  return Response.json({ ok: true }, { status: 200 })
}