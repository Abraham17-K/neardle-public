var board = document.getElementById("board");
var currentWord = [];
var currentRow = 0;
var rows = board.children
var currentDistance = [];
var correct = "#68cf30"
var colors = []
// console.log(Math.abs('a'.charCodeAt(0)-'c'.charCodeAt(0)))

//Listens for keypresses
document.addEventListener("keydown", (e) => {
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
     console.log(currentWord)
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
     console.log(currentWord.length)
     if (currentWord.length == 5 && checkWord()) {
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