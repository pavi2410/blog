export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })
}