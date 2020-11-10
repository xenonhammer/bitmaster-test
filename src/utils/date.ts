export function getFormatTime(): string {
  const now = new Date()
  return `
  ${now.getFullYear()}
  ${now.getMonth() + 1 < 10 ? '0' + now.getMonth() : now.getMonth() + 1}
  ${now.getDate() + 1 < 10 ? '0' + now.getDate() : now.getDate() + 1}
  ${now.getHours()}
  ${now.getMinutes()}
  ${now.getSeconds()}
`
}