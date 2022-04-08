//Express Server
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs')

//Express Static
app.use(express.static('public'));

app.get('/', (req, res) => {
     res.sendFile(__dirname + '/public/index');
});

app.use('/css', express.static(__dirname + 'node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + 'node_modules/bootstrap/dist/js'))
app.use('/js', express.static(__dirname + 'node_modules/jquery/dist'))

//Express Listen
app.listen(port, () => {
     console.log(`Neardle running on http://localhost:${port}`)
})