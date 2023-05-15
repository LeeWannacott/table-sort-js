cp public/table-sort.js npm/table-sort.js
cp public/table-sort.js browser-extensions/firefox/table-sort.js
cp public/table-sort.js browser-extensions/chrome/table-sort.js
cp README.md npm/README.md
cp LICENSE npm/LICENSE
cp Contributors.md npm/Contributors.md

# browser extensions need to change manifest version manually:
rm browser-extensions/firefox/table-sort-js.zip
rm browser-extensions/chrome/table-sort-js.zip
cd browser-extensions
echo "zipping browser extensions..."
cd chrome
zip -r -FS ./table-sort-js.zip * --exclude '*.git*'
cd ..
cd firefox
zip -r -FS ./table-sort-js.zip * --exclude '*.git*'
cd ..
cd ..
# Back in table-sort directory
echo "running prettier..."
npx prettier --write .
echo "deploying..."
npm run deploy
echo "running tests..."
npm run test
echo "Reminder: Update npm package to new version in npm/package.json and npm publish."
echo "Reminder: Update firefox browser extension manifest."
