import fontData from '../importable-fonts/Standard.js';
var figlet = require('../lib/node-figlet');

figlet.parseFont('Standard', fontData);

figlet.text('Boo!', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});