#!/bin/bash
# script for transpiling and bundling client resources

# transpile jsx and bundle javascript files into src folder
function build_js {
    # transpile react_dev.jsx into plain javascript as react.js, also include vanilla js files in order to remove comments
    npx babel ./react_dev.jsx --out-file ./react.js
    npx babel ./utility_dev.js --out-file ./utility.js
    echo 'babel transpile complete'
    # bundle the multiple javascript files into one, and write into the client's wd(../src/bundle.js)
    echo 'bundling js modules...'
    npx webpack
    echo 'webpack module bundle complete'
    # remove intermediary transpiled javascript files
    echo 'cleaning up...'
    rm react.js
    rm utility.js
}
# transpile style_dev.scss into plain css and save in src folder (omitting source map file creation and comments (compressed))
function build_css {
    npx sass --style=compressed --no-source-map style_dev.scss ../src/style.css
    echo 'sass transpile complete'
}

# command line options
# build js
if [ $1 == "-js" ]; then
    build_js
# build css
elif [ $1 == "-css" ]; then
    build_css
# build js and css
elif [ $1 == "-all" ]; then
    build_js
    build_css
# invalid option
else
    echo "invalid option: $1"
fi