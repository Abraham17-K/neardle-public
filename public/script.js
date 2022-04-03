const board = document.getElementById("board");
const rows = board.children
const colors = ["#68cf30", ]
var currentDistance = [];
var currentWord = [];
var currentRow = 0;
var won = false;
const gradient = ['#130FB9', '#72cb1f', '#7bc701', '#84c300', '#8cbf00', '#94ba00', '#9bb600', '#a2b100', '#a9ac00', '#b0a700', '#b7a200', '#bd9c00', '#c39600', '#c99000', '#cf8a00', '#d58300', '#da7c00', '#e07500', '#e56d00', '#e96400', '#ee5b00', '#f25100', '#f64500', '#f93800', '#fc2500', '#ff0000']
//Listens for keypresses
document.addEventListener("keydown", (e) => {
     if(won === true) return
     if(e.key == "Backspace") {
          currentWord.pop()
          updateBoard();
     }
     else if(e.key == "Enter") {
          if (validateBoard() === true) {
               colorBoard()
          }

     }
     else if(currentWord.length >= 5) return
     else if(e.keyCode >= 65 && e.keyCode <= 90) {
          currentWord.push(e.key.toLocaleLowerCase())
     }
     updateBoard()
});


//Converts the array of currentWord to a string
function toWord() {
     let word = ""
     for (var i = 0; i < currentWord.length; i++) {
          word += currentWord[i];
     }
     return word
}

function checkWord() {
     let word = toWord(currentWord)
     return (accepted.includes(word) || answers.includes(word))
}

function updateBoard() {
     let slots = rows[currentRow].children
     for (var i = 0; i < slots.length; i++) {
          if (currentWord[i] != undefined) {
               slots[i].innerText = currentWord[i].toLocaleUpperCase() 
          } else {
               slots[i].innerText = ""
          }
     }
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function colorBoard() {
     let solution = getWord()
     let slots = rows[currentRow].children
     for(let i = 0; i < 5; i++) {
          let color = Math.abs(currentWord[i].charCodeAt()-solution.charCodeAt(i))
          rows[currentRow].children[i].style.backgroundColor = gradient[color]
          await sleep(300)
     }
     currentWord = []
     currentRow++
}

function validateBoard() {
     if(currentRow >= 6) {
          alert("Cry about it")
          won = true
          return
     } else if (currentWord.length == 5 && checkWord()) {
          if (checkSolution()) return true
          return true
     } else if (currentWord.length < 5) {
          alert("Word is too short");
          return false;
     } else {
          alert("Word is not in the dictionary");
          return false;
     }   
}

//TODO fix for cookies
function checkSolution() {
     let solution = getWord()
     if (toWord() == solution) {
     //if (toWord() == "better") {
          alert("You got it!") //TODO add something better later
          won = true
          return true
     } else {
          return false;
     }
}

function getWord() {
     return answers[Math.floor(Date.now()/86400000 % answers.length)]
}

function makeCookie(maxAge, won, currentRow, row1, row1Color, row2, row2Color, row3, row3Color, row4, row4Color, row5, row5Color, row6, row6Color) {
     
}

function input(key) {
     if(won === true) return
     if(key == "Backspace") {
          currentWord.pop()
          updateBoard();
     }
     else if(key == "Enter") {
          if (validateBoard() === true) {
               colorBoard()
          }
     }
     else if(currentWord.length >= 5) return
     else {
          key = key.toLocaleUpperCase()
          if(key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) {
               currentWord.push(key.toLocaleLowerCase())
          }
     }
     updateBoard()
}