const fs = require('fs');
const zlib = require('zlib');

const logoPath = 'c:/Users/onurk/OneDrive/Desktop/web projelerim/konakv2-main/src/components/fotos/logo.png';

function checkTransparency() {
  try {
    const buffer = fs.readFileSync(logoPath);
    let offset = 8;
    let idatBuffers = [];
    let ihdr = {};

    while (offset < buffer.length) {
      const length = buffer.readUInt32BE(offset);
      const type = buffer.toString('ascii', offset + 4, offset + 8);
      
      if (type === 'IHDR') {
        ihdr.width = buffer.readUInt32BE(offset + 8);
        ihdr.height = buffer.readUInt32BE(offset + 12);
        ihdr.colorType = buffer[offset + 17];
      } else if (type === 'IDAT') {
        idatBuffers.push(buffer.slice(offset + 8, offset + 8 + length));
      } else if (type === 'IEND') {
        break;
      }
      offset += 12 + length;
    }

    if (ihdr.colorType !== 6) {
      console.log('Not RGBA, color type:', ihdr.colorType);
      return;
    }

    const compressed = Buffer.concat(idatBuffers);
    const decompressed = zlib.inflateSync(compressed);
    
    // Width * height * 4 channels + height bytes for scanline filters
    console.log('Decompressed size:', decompressed.length);
    console.log('Expected size:', ihdr.width * ihdr.height * 4 + ihdr.height);
    
    let hasTransparency = false;
    let nonOpaqueCount = 0;
    let totalPixels = ihdr.width * ihdr.height;

    // Scan the decompressed data
    let ptr = 0;
    for (let y = 0; y < ihdr.height; y++) {
      const filterType = decompressed[ptr++];
      // Each pixel is 4 bytes: R, G, B, A
      for (let x = 0; x < ihdr.width; x++) {
        const a = decompressed[ptr + 3];
        if (a < 255) {
          hasTransparency = true;
          nonOpaqueCount++;
        }
        ptr += 4;
      }
    }

    console.log('Has transparency:', hasTransparency);
    console.log('Non-opaque pixels:', nonOpaqueCount, 'out of', totalPixels, `(${((nonOpaqueCount / totalPixels) * 100).toFixed(2)}%)`);
  } catch (err) {
    console.error('Error:', err);
  }
}

checkTransparency();
