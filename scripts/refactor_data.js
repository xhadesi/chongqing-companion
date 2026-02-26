const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'guideData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Replace interfaces
content = content.replace(/image: string;/g, 'images: string[];');

// Replace data entries: image: "/path/to/img.jpg", -> images: ["/path/to/img.jpg"],
// We use a regex that matches `image: "..."` or `image: '...'`
content = content.replace(/image:\s*([\"'][^\"']+[\"']),/g, 'images: [$1],');

fs.writeFileSync(filePath, content);
console.log('Successfully updated guideData.ts');
