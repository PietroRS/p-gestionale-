import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const srcDir = path.join(process.cwd(), 'public', 'images', 'wrs')
if (!fs.existsSync(srcDir)) {
  console.error('Source directory not found:', srcDir)
  process.exit(1)
}

const targets = [1920, 1280, 1024]
const quality = 80

async function processFile(file) {
  const filePath = path.join(srcDir, file)
  const ext = path.extname(file).toLowerCase()
  const base = file.replace(/\.[^/.]+$/, '')

  try {
    const img = sharp(filePath)
    const meta = await img.metadata()
    const width = meta.width || 0

    // generate webp version
    const webpPath = path.join(srcDir, `${base}.webp`)
    if (!fs.existsSync(webpPath)) {
      await img.webp({ quality }).toFile(webpPath)
      console.log('Created', webpPath)
    }

    // generate @2x if original width >= 2x target (and not already present)
    if (width >= 800) {
      const twoXPath = path.join(srcDir, `${base}@2x${ext}`)
      if (!fs.existsSync(twoXPath)) {
        await img.resize(Math.floor(Math.min(width, 2 * (meta.width || width)))).toFile(twoXPath)
        console.log('Created', twoXPath)
      }
      const twoXWebp = path.join(srcDir, `${base}@2x.webp`)
      if (!fs.existsSync(twoXWebp)) {
        await img.resize(Math.floor(Math.min(width, 2 * (meta.width || width)))).webp({ quality }).toFile(twoXWebp)
        console.log('Created', twoXWebp)
      }
    }

    // generate width-based variants
    for (const t of targets) {
      if (width > t) {
        const wName = `${base}-${t}w${ext}`
        const wPath = path.join(srcDir, wName)
        if (!fs.existsSync(wPath)) {
          await img.resize(t).toFile(wPath)
          console.log('Created', wPath)
        }

        const wWebp = path.join(srcDir, `${base}-${t}w.webp`)
        if (!fs.existsSync(wWebp)) {
          await img.resize(t).webp({ quality }).toFile(wWebp)
          console.log('Created', wWebp)
        }
      }
    }
  } catch (err) {
    console.error('Error processing', file, err)
  }
}

async function run() {
  const files = fs.readdirSync(srcDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
  for (const f of files) {
    if (f.includes('@2x') || /-\d+w\./.test(f)) continue // skip generated
    await processFile(f)
  }
}

run().then(() => console.log('Done')).catch((e) => { console.error(e); process.exit(1) })

// write a JS module with the list of files for the app to import
;(async function writeIndex() {
  try {
    const files = fs.readdirSync(srcDir).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    const urls = files.map((f) => `/images/wrs/${f}`)
    const outDir = path.join(process.cwd(), 'src', 'data')
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
    const outFile = path.join(outDir, 'wrs-images.js')
    const content = `export default ${JSON.stringify(urls, null, 2)}\n`
    fs.writeFileSync(outFile, content, 'utf8')
    console.log('Wrote', outFile)
  } catch (e) {
    console.error('Error writing index', e)
  }
})()
