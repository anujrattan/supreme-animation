const fs = require('fs');
const path = require('path');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('getCdnUrl')) {
    const importStr = 'import { getCdnUrl } from "../lib/constants";\n';
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLine = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLine + 1) + importStr + content.slice(endOfLine + 1);
    } else {
      content = importStr + content;
    }
  }

  // Regex to match literal paths: "/portfolio/...mp4"
  // And replace them with getCdnUrl("/portfolio/...mp4")
  const regex = /"(\/portfolio\/[^\"]+\.mp4)"/g;
  content = content.replace(regex, 'getCdnUrl("$1")');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + filePath);
}

updateFile(path.join(__dirname, '../src/components/Portfolio.tsx'));
updateFile(path.join(__dirname, '../src/content/subcategories.ts'));
