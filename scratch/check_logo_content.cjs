const fs = require('fs');
const zlib = require('zlib');

const logoPath = 'c:/Users/onurk/OneDrive/Desktop/web projelerim/konakv2-main/src/components/fotos/logo.png';

function checkLogoContent() {
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

    const compressed = Buffer.concat(idatBuffers);
    const decompressed = zlib.inflateSync(compressed);
    
    let nonWhiteCount = 0;
    let sumR = 0, sumG = 0, sumB = 0;
    let minR = 255, minG = 255, minB = 255;
    
    let ptr = 0;
    for (let y = 0; y < ihdr.height; y++) {
      const filterType = decompressed[ptr++];
      for (let x = 0; x < ihdr.width; x++) {
        const r = decompressed[ptr];
        const g = decompressed[ptr + 1];
        const b = decompressed[ptr + 2];
        
        // If not white
        if (r < 240 || g < 240 || b < 240) {
          nonWhiteCount++;
          sumR += r;
          sumG += g;
          sumB += b;
          if (r < minR) minR = r;
          if (g < minG) minG = g;
          if (b < minB) minB = b;
        }
        ptr += 4;
      }
    }

    console.log('Total pixels:', ihdr.width * ihdr.height);
    console.log('Non-white pixels (logo content):', nonWhiteCount);
    if (nonWhiteCount > 0) {
      console.log('Average color of logo content: RGB(', Math.round(sumR/nonWhiteCount), Math.round(sumG/nonWhiteCount), Math.round(sumB/nonWhiteCount), ')');
      console.log('Minimum color channel values (darkest point): RGB(', minR, minG, minB, ')');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

checkLogoContent();
