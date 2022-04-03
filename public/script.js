const board = document.getElementById("board");
const rows = board.children
const correct = "#68cf30"
const colors = []
var currentDistance = [];
var currentWord = [];
var currentRow = 0;
var won = false;
// console.log(Math.abs('a'.charCodeAt(0)-'c'.charCodeAt(0)))

//Listens for keypresses
document.addEventListener("keydown", (e) => {
     if(won == true) return
     if(e.key == "Backspace") {
          currentWord.pop()
          updateBoard();
     }
     else if(e.key == "Enter") {
          validateBoard()
          colorBoard()
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

function colorBoard() {
     let slots = rows[currentRow].children
     for(let i = 0; i < currentWord.length; i++) {

     }
}

function validateBoard() {
     if (currentWord.length == 5 && checkWord()) {
          if (checkSolution()) return
          currentWord = []
          currentRow++
     } else if (currentWord.length < 5) {
          alert("Word is too short");
          return;
     } else {
          alert("Word is not in the dictionary");
          return;
     }   
}

//TODO fix for cookies
function checkSolution() {
     let solution = getWord()
     if (toWord() == solution) {
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