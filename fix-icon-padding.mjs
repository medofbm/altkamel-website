import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function padIcon() {
  const inputPath = 'public/images/logo/logo.png';
  const outputPath = 'assets/icon.png';
  const splashPath = 'assets/splash.png';

  console.log('Reading original logo...');
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original size: ${metadata.width}x${metadata.height}`);

  // We want to create a 1024x1024 image.
  // The logo should be placed in the center, scaled down to fit within roughly 60% of 1024 (so ~600px width max).
  
  // Calculate scale factor so max dimension is 600
  const maxDim = 600;
  const scale = Math.min(maxDim / metadata.width, maxDim / metadata.height);
  const newWidth = Math.round(metadata.width * scale);
  const newHeight = Math.round(metadata.height * scale);

  console.log(`Resizing logo to: ${newWidth}x${newHeight}`);

  const resizedLogoBuffer = await sharp(inputPath)
    .resize(newWidth, newHeight, { fit: 'contain' })
    .toBuffer();

  // Create a 1024x1024 transparent background and composite the logo in the center
  console.log('Generating padded icon for assets/icon.png ...');
  await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent
    }
  })
  .composite([
    { input: resizedLogoBuffer, gravity: 'center' }
  ])
  .png()
  .toFile(outputPath);

  // For the splash screen (assets/splash.png), we usually want an opaque background, e.g. white, 
  // or we can use a transparent background (2732x2732 is the recommended size).
  console.log('Generating padded splash for assets/splash.png ...');
  await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 } // White background for splash
    }
  })
  .composite([
    { input: resizedLogoBuffer, gravity: 'center' }
  ])
  .png()
  .toFile(splashPath);

  console.log('Done padding images!');
}

padIcon().catch(console.error);
