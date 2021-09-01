# script to automate transpiling of jsx and scss
# uncomment lines as needed
# transpile react_dev.jsx into plain javascript and save in /client/react.js
#npx babel react_dev.jsx --out-file ../client/react.js
# transpile style_dev.scss into plain css and save in /client/style.css (omitting source map file creation)
npx sass --no-source-map style_dev.scss ../client/style.css