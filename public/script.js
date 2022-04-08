const board = document.getElementById("board");
const rows = board.children
const colors = ["#68cf30", ]
var currentDistance = [];
var currentWord = [];
var currentRow = 0;
var won = true;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const gradient = ['#130FB9', '#72cb1f', '#7bc701', '#84c300', '#8cbf00', '#94ba00', '#9bb600', '#a2b100', '#a9ac00', '#b0a700', '#b7a200', '#bd9c00', '#c39600', '#c99000', '#cf8a00', '#d58300', '#da7c00', '#e07500', '#e56d00', '#e96400', '#ee5b00', '#f25100', '#f64500', '#f93800', '#fc2500', '#ff0000']

window.onload = function() {
     makeDirections()
}
//Listens for keypresses
document.addEventListener("keydown", (e) => {
      if(e.key == "Escape") {
          closeDirections()
     }
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

async function colorBoard() {
     let solution = getWord()
     let slots = rows[currentRow].children
     for(let i = 0; i < 5; i++) {
          let color = Math.abs(currentWord[i].charCodeAt()-solution.charCodeAt(i))
          rows[currentRow].children[i].style.backgroundColor = gradient[color]
          console.log(gradient[color])
          await sleep(300)
     }
     currentWord = []
     currentRow++
}

function validateBoard() {
     if(currentRow >= 6) {
          makePopup("Cry about it", 1000)
          won = true
          return
     } else if (currentWord.length == 5 && checkWord()) {
          if (checkSolution()) return true
          return true
     } else if (currentWord.length < 5) {
          makePopup("Word is too short", 1000);
          return false;
     } else {
          makePopup("Word is not in the dictionary", 1000);
          return false;
     }   
}

//TODO fix for cookies
function checkSolution() {
     let solution = getWord()
     if (toWord() == solution) {
          makePopup("You got it!", 1000)
          won = true
          return true
     } else {
          return false;
     }
}

function getWord() {
     return answers[Math.floor(Date.now()/86400000 % answers.length)]
}


async function colorKey(key) {
     key.style.backgroundColor = "#434242"
     sleep(1000)
     key.style.backgroundColor = "#5e5e5e"
}

function input(e, key) {
     console.log(e)
     colorKey(e);
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

//TODO make it so there can only be one popup at a time
async function makePopup(text, time) {
     const body = document.getElementById("body");
     const popup = document.createElement("h1");
     popup.classList.add("popup")
     const popupText = document.createTextNode(text);
     popup.appendChild(popupText)
     popup.style.visibility = "hidden"
     body.appendChild(popup)
     const width = popup.clientWidth
     const height = popup.clientHeight

     //TODO sub for margins, you idiot
     popup.style.width = `${width + 60}px`
     popup.style.height = `${height + 30}px`
     
     popup.style.lineHeight = `${height + 30}px`
     popup.style.bottom = `${window.innerHeight * 0.75}px`
     popup.style.left = `${(window.innerWidth / 2) - popup.clientWidth / 2}px`
     popup.style.visibility = "visible"

     await sleep(time)
     popup.style.visibility = "hidden"
     popup.remove()
}

function makeDirections() {
     const popup = document.getElementById("directionPopup")
     popup.style.width = `${window.innerWidth * 0.84}px`
     popup.style.height = `${window.innerHeight * 0.84}px`
     popup.style.top = `${window.innerHeight * 0.08}px`
     popup.style.left = `${window.innerWidth * 0.08}px`

     popup.classList.remove("hidden")

}

function closeDirections() {
     const game = document.getElementById("gameBoard")
     const popup = document.getElementById("directionPopup")
     popup.classList.add("hidden")
     game.classList.remove("hidden")
     won = false;
}




function makeDirectionsRow() {
     const tiles = gameBoard.getElementByClass
}