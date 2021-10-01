#!/bin/bash
# script for transpiling and bundling client resources

# transpile jsx and bundle javascript files into src folder
function buildJS {
    # transpile reactDev.jsx into plain javascript as react.js, also include vanilla js files in order to remove comments
    npx babel ./reactDev.jsx --out-file ./react.js
    npx babel ./utilityDev.js --out-file ./utility.js
    npx babel ./webClientDev.js --out-file ./client.js
    echo 'babel transpile complete'
    # bundle the multiple javascript files into one, and write into the client's wd(../src/bundle.js)
    echo 'bundling js modules...'
    npx webpack
    echo 'webpack module bundle complete'
    # remove intermediary transpiled javascript files
    echo 'cleaning up...'
    rm react.js
    rm utility.js
    rm client.js
}
# transpile styleDev.scss into plain css and save in src folder (omitting source map file creation and comments (compressed))
function buildCSS {
    npx sass --style=compressed --no-source-map styleDev.scss ../src/style.css
    echo 'sass transpile complete'
}

# command line options
# build js
if [ $1 == "-js" ]; then
    buildJS
# build css
elif [ $1 == "-css" ]; then
    buildCSS
# build js and css
elif [ $1 == "-all" ]; then
    buildJS
    buildCSS
# invalid option
else
    echo "invalid option: $1"
fi