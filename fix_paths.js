import fs from 'fs';

let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace absolute src="/xxx" with relative src="./xxx", ignoring http URLs
code = code.replace(/src="\/([^"]+)"/g, 'src="./$1"');

// Replace inline tailwind bg-[url('/xxx')] with bg-[url('./xxx')]
code = code.replace(/url\('\/([^']+)'\)/g, "url('./$1')");

// For the brandsList array, paths are like '/3 M.svg'
code = code.replace(/'\/([^']+)'/g, "'./$1'");

fs.writeFileSync('src/App.jsx', code);
console.log('Fixed asset paths in App.jsx successfully.');
