const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/tasicpangea6@outlook.com'

export function sendToFormSubmit(data: Record<string, unknown>): Promise<Response> {
  return fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}
