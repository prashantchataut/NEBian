const fs = require('fs');

const createIconSVG = (size) => {
  const radius = Math.round(size * 0.167);
  const fontSize = Math.round(size * 0.52);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${radius}" fill="#6750A4"/>
  <text x="50%" y="52%" dominant-baseline="central" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="${fontSize}" font-weight="700" fill="white">N</text>
</svg>`;
};

fs.writeFileSync('public/icons/icon-192.svg', createIconSVG(192));
fs.writeFileSync('public/icons/icon-512.svg', createIconSVG(512));
fs.writeFileSync('public/icons/icon-192.png', createIconSVG(192));
fs.writeFileSync('public/icons/icon-512.png', createIconSVG(512));

console.log('Icons created successfully');