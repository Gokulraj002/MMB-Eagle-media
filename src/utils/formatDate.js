// "2026-10-10" -> "OCT 10, 2026"
export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`)
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .toUpperCase()
}
