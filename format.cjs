const fs = require('fs');
const css = fs.readFileSync('reference.css', 'utf8');

let formatted = css
  .replace(/\{/g, ' {\n  ')
  .replace(/\}/g, '\n}\n\n')
  .replace(/;/g, ';\n  ')
  .replace(/\/\*/g, '\n/*')
  .replace(/\*\//g, '*/\n');

fs.writeFileSync('unminified_ref.css', formatted);
console.log('Done!');
