//Express Server
const express = require('express');
const app = express();
const port = 3000;

//Express Static
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
     // res.send(wordList.accept[Math.floor(Math.random() * words.length)])
     res.render(__dirname + '/public/index');
});

//Express Listen
app.listen(port, () => {
     console.log(`Neardle running on http://localhost:${port}`)
})

app.post("/getWord", (req, res) => {
     
})
