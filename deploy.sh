cp public/table-sort.js npm/table-sort.js
cp public/table-sort.js browser-extension/table-sort.js
cp README.md npm/README.md
cp LICENSE npm/LICENSE
cp Contributors.md npm/Contributors.md
cd browser-extension/
rm ./table-sort-js.zip
echo "zipping browser extension..."
zip -r -FS ./table-sort-js.zip * --exclude '*.git*'
cd ..
echo "running prettier..."
npx prettier --write .
echo "deploying..."
npm run deploy
echo "running tests..."
npm run test
echo "Reminder: Update npm package to new version in npm/package.json and npm publish."
echo "Reminder: Update firefox browser extension manifest."
