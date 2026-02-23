import fs from 'node:fs';
import path from 'node:path';

const repoBase = '/recipe-box';
const filePath = path.join(process.cwd(), 'dist', '404.html');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Recipe Box</title>
    <script>
      const repoBase = '${repoBase}';
      const path = window.location.pathname.replace(repoBase, '');
      window.location.href = repoBase + '/' + path + window.location.search + window.location.hash;
    </script>
  </head>
  <body></body>
</html>`;

await fs.promises.writeFile(filePath, htmlContent);
console.log('404.html SPA redirect created!');