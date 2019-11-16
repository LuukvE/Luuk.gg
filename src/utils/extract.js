const fs = require('fs');
const logos = require('./logos');

Object.keys(logos).map(id => {
    fs.writeFile(`${id}.png`, logos[id].replace(/^data:image\/png;base64,/, ''), 'base64', function(err) {
        if(err) console.log(err);
    });
});