import sharp from 'sharp';
import fs from 'fs';

const basePath = '/Users/oguzaliyigit/blog-sitem';
const svgPath = '/Users/oguzaliyigit/Downloads/B Vector Icon.svg';

const svgBuffer = fs.readFileSync(svgPath);

// Create directories if they don't exist
[
  `${basePath}/public/images`,
  `${basePath}/public/images/logo`,
  `${basePath}/public/images/og`,
].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function generateLogos() {
  // Header logo — 2× retina yüksekliği (80px), genişlik orantılı
  // Header logo — kare ikon, 2× retina (56×56)
  await sharp(svgBuffer)
    .png()
    .resize(56, 56, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(`${basePath}/public/images/logo/b-icon.png`);
  console.log('✅ Created: public/images/logo/b-icon.png');

  // Favicon 256×256 — logo kare içinde, saydam arka plan
  await sharp(svgBuffer)
    .png()
    .resize(256, 256, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toFile(`${basePath}/app/icon.png`);
  console.log('✅ Created: app/icon.png');

  // Apple icon 180×180 — beyaz arka plan (iOS ihtiyacı)
  await sharp(svgBuffer)
    .png()
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toFile(`${basePath}/app/apple-icon.png`);
  console.log('✅ Created: app/apple-icon.png');

  // OG image 1200×630 — logo beyaz zemin üzerinde ortalanmış
  const logoPng = await sharp(svgBuffer)
    .png()
    .resize(400, 400, { fit: 'inside' })
    .toBuffer();

  const { width: logoW, height: logoH } = await sharp(logoPng).metadata();
  const left = Math.round((1200 - logoW) / 2);
  const top = Math.round((630 - logoH) / 2);

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: logoPng, left, top }])
    .png()
    .toFile(`${basePath}/public/images/og/default.png`);
  console.log('✅ Created: public/images/og/default.png');

  console.log('\n✨ Tüm logo dosyaları oluşturuldu!');
}

generateLogos().catch(console.error);
