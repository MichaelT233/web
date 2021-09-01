# script to automate transpiling of jsx and scss
# uncomment lines as needed
# transpile react_dev.jsx into plain javascript and save in /client/react.js
npx babel ./react_dev.jsx --out-file ./react.js
echo 'babel transpile complete'
# transpile style_dev.scss into plain css and save in /client/style.css (omitting source map file creation)
#npx sass --no-source-map style_dev.scss ../client/style.css
npx webpack
cd ..
node main.js
cd dev