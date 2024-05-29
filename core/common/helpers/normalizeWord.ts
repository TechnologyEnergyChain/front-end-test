export function normalizeWord(string: string): string {
  return (
    string
      .toLowerCase()
      .normalize('NFD')
      // Remove all diacritic, except the tilde from ñ
      .replace(/(?![\u0303])[\u0300-\u036f]/g, '')
      .normalize('NFC')
  )
}
