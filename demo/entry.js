/**
 * Created by shupeng on 2016/9/23.
 */

var ft = require('../index.js')


var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// 1: Create a function that declares what the DOM should look like
function render(count)  {
    return h('div', {
        style: {
            textAlign: 'center',
            lineHeight: (100 + count) + 'px',
            border: '1px solid red',
            width: (100 + count) + 'px',
            height: (100 + count) + 'px'
        },
        namespace:'http://www.w3.org/1999/xhtml'
    }, [String(count)]);
}

// 2: Initialise the document
var count = 0;      // We need some app data. Here we just store a count.

var tree = render(count);               // We need an initial tree
console.log(tree)
var rootNode = createElement(tree);     // Create an initial root DOM node ...
console.log(rootNode)

document.body.appendChild(rootNode);    // ... and it should be in the document
console.log(rootNode)

// 3: Wire up the update logic
setTimeout(function () {
    count++;

    var newTree = render(count);
    console.log(newTree)
    var patches = diff(tree, newTree);
    console.log(patches)
    rootNode = patch(rootNode, patches);
    console.log(rootNode)
    tree = newTree;
}, 1000);