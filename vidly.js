const express = require('express');
const routes = require('./routes');
const port = process.env.port || 3000;
const app = express();

app
.use(express.json())
.use('/', routes)

.listen(port, err => {
    if (err) return console.log(`Error: ${err}`);
    console.log(`Listening on port ${port}...`);

});


