const fs = require('fs');
const zlib = require('zlib');

const logoPath = 'c:/Users/onurk/OneDrive/Desktop/web projelerim/konakv2-main/src/components/fotos/logo.png';

function checkColors() {
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
    
    // Sample a few pixels: corners and center
    let ptr = 0;
    const samples = [];
    for (let y = 0; y < ihdr.height; y++) {
      const filterType = decompressed[ptr++];
      for (let x = 0; x < ihdr.width; x++) {
        const r = decompressed[ptr];
        const g = decompressed[ptr + 1];
        const b = decompressed[ptr + 2];
        const a = decompressed[ptr + 3];
        
        // Sample corners and center
        if ((x === 0 && y === 0) || 
            (x === ihdr.width - 1 && y === 0) || 
            (x === 0 && y === ihdr.height - 1) || 
            (x === ihdr.width - 1 && y === ihdr.height - 1) ||
            (x === Math.floor(ihdr.width / 2) && y === Math.floor(ihdr.height / 2))) {
          samples.push({ x, y, r, g, b, a });
        }
        ptr += 4;
      }
    }

    console.log('Sampled pixels:');
    samples.forEach(s => {
      console.log(`Pixel at (${s.x}, ${s.y}): RGB(${s.r}, ${s.g}, ${s.b})`);
    });
  } catch (err) {
    console.error('Error:', err);
  }
}

checkColors();
