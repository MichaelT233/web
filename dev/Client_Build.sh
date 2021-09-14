#!/bin/bash
# script for transpiling and bundling client resources

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
# transpile style_dev.scss into plain css and save in /client/style.css (omitting source map file creation and comments (compressed))
function build_css {
    npx sass --style=compressed --no-source-map style_dev.scss ../src/style.css
    echo 'sass transpile complete'
}

read -p "enter 1 to build js, enter 2 to build css, enter 3 to do both: " response
# build js
if [ "$response" == "1" ]; then
    build_js
# build css
elif [ "$response" == "2" ]; then
    build_css
# build js and css
elif [ "$response" == "3" ]; then
    build_js
    build_css
# invalid respose
else
    echo "invalid input"
fi