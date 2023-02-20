cp public/table-sort.js npm/table-sort.js
cp README.md npm/README.md
cp LICENSE npm/LICENSE
cp Contributors.md npm/Contributors.md
npx prettier --write .
npm run deploy
npm run test
echo "Reminder: Update npm package to new version in npm/package.json and npm publish"
