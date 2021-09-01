# script to automate transpiling of jsx and scss
# uncomment lines as needed
# transpile react_dev.jsx into plain javascript and save in /client/react.js
npx babel ./react_dev.jsx --out-file ./react.js
echo 'babel transpile complete'
# bundle the multiple javascript files into one
npx webpack
# remove intermediary transpiled javascript file
rm react.js
# transpile style_dev.scss into plain css and save in /client/style.css (omitting source map file creation)
#npx sass --no-source-map style_dev.scss ../client/style.css
# start node web server for testing and change back to same directory as it started in
cd ..
node main.js
cd dev