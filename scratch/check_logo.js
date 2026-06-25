const fs = require('fs');
const path = require('path');

const logoPath = 'c:/Users/onurk/OneDrive/Desktop/web projelerim/konakv2-main/src/components/fotos/logo.png';

function inspectPng() {
  try {
    const buffer = fs.readFileSync(logoPath);
    console.log('File size:', buffer.length, 'bytes');
    
    // Check PNG signature
    if (buffer.readUInt32BE(0) !== 0x89504E47 || buffer.readUInt32BE(4) !== 0x0D0A1A0A) {
      console.log('Not a valid PNG file');
      return;
    }
    
    // Read IHDR chunk
    let offset = 8;
    const chunkLength = buffer.readUInt32BE(offset);
    const chunkType = buffer.toString('ascii', offset + 4, offset + 8);
    
    if (chunkType === 'IHDR') {
      const width = buffer.readUInt32BE(offset + 8);
      const height = buffer.readUInt32BE(offset + 12);
      const bitDepth = buffer[offset + 16];
      const colorType = buffer[offset + 17];
      
      console.log('Width:', width);
      console.log('Height:', height);
      console.log('Bit depth:', bitDepth);
      console.log('Color type:', colorType);
      
      const colorTypes = {
        0: 'Grayscale',
        2: 'Truecolor (RGB)',
        3: 'Indexed Color',
        4: 'Grayscale with Alpha',
        6: 'Truecolor with Alpha (RGBA)'
      };
      
      console.log('Color type description:', colorTypes[colorType] || 'Unknown');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

inspectPng();
