import sharp from 'sharp'
import { readdir } from 'fs/promises'
import { join, extname } from 'path'

const DIRS = ['src/assets/model photo', 'src/assets/ranjani']
const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'])

for (const dir of DIRS) {
  const files = await readdir(dir)
  for (const file of files) {
    if (!SUPPORTED.has(extname(file))) continue
    const meta = await sharp(join(dir, file)).metadata()
    if (meta.orientation && meta.orientation !== 1) {
      console.log(`⚠️  orientation ${meta.orientation}: ${join(dir, file)}`)
    }
  }
}
console.log('Done checking.')
