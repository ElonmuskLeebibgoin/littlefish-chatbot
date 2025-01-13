const sharp = require('sharp');
const path = require('path');

const SOURCE_IMAGE = './public/images/纯Logo.png';
const ICONS_DIR = './public/icons';

async function generateIcons() {
    // Generate 192x192 icons
    await sharp(SOURCE_IMAGE)
        .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile(path.join(ICONS_DIR, 'icon-192x192.png'));

    // Generate 192x192 maskable icon (with padding for safe area)
    await sharp(SOURCE_IMAGE)
        .resize(144, 144) // Smaller size to account for safe area
        .extend({
            top: 24,
            bottom: 24,
            left: 24,
            right: 24,
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .toFile(path.join(ICONS_DIR, 'icon-192x192-maskable.png'));

    // Generate 512x512 icon
    await sharp(SOURCE_IMAGE)
        .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile(path.join(ICONS_DIR, 'icon-512x512.png'));

    // Generate favicon.ico (16x16)
    await sharp(SOURCE_IMAGE)
        .resize(16, 16)
        .toFile(path.join(ICONS_DIR, 'favicon.ico'));

    // Generate Apple touch icon (180x180)
    await sharp(SOURCE_IMAGE)
        .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));

    console.log('All icons generated successfully!');
}

generateIcons().catch(console.error); 