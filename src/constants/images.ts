// Vite glob imports — eager loads all images from each folder as module URLs
// Images with special chars in filenames (spaces, parens) are handled automatically

const _modelRaw = import.meta.glob('../assets/model photo/*', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const _hairstyleRaw = import.meta.glob('../assets/hairstyle/*', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const _mehndiRaw = import.meta.glob('../assets/mehndi/*', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const _ranjaniRaw = import.meta.glob('../assets/ranjani/*', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const _sareeRaw = import.meta.glob('../assets/saree prepleating/*', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const _skincareRaw = import.meta.glob('../assets/skin care/*', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const _haircareRaw = import.meta.glob('../assets/haircare/*', {
  eager: true, query: '?url', import: 'default',
}) as Record<string, string>

const sortedValues = (raw: Record<string, string>) =>
  Object.entries(raw).sort(([a], [b]) => a.localeCompare(b)).map(([, v]) => v)

export const modelPhotos = sortedValues(_modelRaw)
export const hairstylePhotos = sortedValues(_hairstyleRaw)
export const mehndiPhotos = sortedValues(_mehndiRaw)
export const ranjaniPhotos = sortedValues(_ranjaniRaw)
export const sareePhotos = sortedValues(_sareeRaw)
export const skincarePhotos = sortedValues(_skincareRaw)
export const haircarePhotos = sortedValues(_haircareRaw)
