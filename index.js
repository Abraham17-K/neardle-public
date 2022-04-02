//Express Server
const express = require('express');
const app = express();
const port = 3000;

app.use("/bootstrap", express.static(__dirname + '/node_modules/bootstrap/dist'));

//Express Static
app.use(express.static('public'));

app.get('/', (req, res) => {
     res.sendFile(__dirname + '/public/index');
});

//Express Listen
app.listen(port, () => {
     console.log(`Neardle running on http://localhost:${port}`)
})