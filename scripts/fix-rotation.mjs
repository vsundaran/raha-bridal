/**
 * fix-rotation.mjs
 * Bakes EXIF orientation into pixel data for all images in src/assets.
 * Run once: node scripts/fix-rotation.mjs
 *
 * Why needed: vite-plugin-image-optimizer (sharp) strips EXIF metadata,
 * so images that relied on EXIF orientation to display correctly appear
 * rotated in the built output. This script applies the rotation to the
 * actual pixels and removes the EXIF tag so sharp has nothing to strip.
 */

import sharp from 'sharp'
import { readdir, rename, unlink } from 'fs/promises'
import { join, extname } from 'path'

const ASSET_DIRS = [
  'src/assets/model photo',
  'src/assets/mehndi',
  'src/assets/hairstyle',
  'src/assets/haircare',
  'src/assets/skin care',
  'src/assets/ranjani',
  'src/assets/saree prepleating',
]

const SUPPORTED = new Set(['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'])

let fixed = 0, skipped = 0, errors = 0

for (const dir of ASSET_DIRS) {
  let files
  try {
    files = await readdir(dir)
  } catch {
    console.log(`⚠️  Skipping missing dir: ${dir}`)
    continue
  }

  for (const file of files) {
    if (!SUPPORTED.has(extname(file))) continue

    const src  = join(dir, file)
    const tmp  = src + '.__tmp'

    try {
      const meta = await sharp(src).metadata()
      const orientation = meta.orientation ?? 1

      if (orientation === 1 || orientation === undefined) {
        // Already upright — no change needed
        skipped++
        continue
      }

      // .rotate() with no args applies EXIF orientation to pixels
      await sharp(src)
        .rotate()              // bake rotation into pixels
        .withMetadata({ orientation: 1 })  // clear orientation tag
        .toFile(tmp)

      await unlink(src)
      await rename(tmp, src)
      console.log(`✅  Fixed: ${src} (was orientation ${orientation})`)
      fixed++
    } catch (err) {
      console.error(`❌  Error: ${src} — ${err.message}`)
      // clean up tmp if it exists
      try { await unlink(tmp) } catch {}
      errors++
    }
  }
}

console.log(`\nDone. Fixed: ${fixed} | Already correct: ${skipped} | Errors: ${errors}`)
