export function getHasFilters(values, excludeKeys = []) {
  if (!values) return false

  return Object.entries(values).some(([key, val]) => {
    if (excludeKeys.includes(key)) return false

    if (val === null || val === undefined) return false
    if (typeof val === 'string' && val.trim() === '') return false

    return true
  })
}
