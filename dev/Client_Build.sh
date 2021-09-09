#!/bin/bash
# script to automate transpiling of jsx and scss
# comment/uncomment lines as needed
# transpile react_dev.jsx into plain javascript as react.js
#npx babel ./react_dev.jsx --out-file ./react.js
#npx babel ./utility_dev.js --out-file ./utility.js
#echo 'babel transpile complete'
# bundle the multiple javascript files into one (../src/bundle.js)
#npx webpack
# remove intermediary transpiled javascript files
#rm react.js
#rm utility.js
#echo 'webpack module bundle complete'
# transpile style_dev.scss into plain css and save in /client/style.css (omitting source map file creation and comments (compressed))
npx sass --style=compressed --no-source-map style_dev.scss ../src/style.css
echo 'sass transpile complete'