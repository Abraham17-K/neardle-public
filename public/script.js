//TODO Fix so that if delete is pressed while coloring it doesn't mess up

const board = document.getElementById("board");
const rows = board.children
const colors = ["#68cf30",]
var currentDistance = [];
var currentWord = [];
var currentRow = 0;
var won = true;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const gradient = ['#130FB9', '#72cb1f', '#7bc701', '#84c300', '#8cbf00', '#94ba00', '#9bb600', '#a2b100', '#a9ac00', '#b0a700', '#b7a200', '#bd9c00', '#c39600', '#c99000', '#cf8a00', '#d58300', '#da7c00', '#e07500', '#e56d00', '#e96400', '#ee5b00', '#f25100', '#f64500', '#f93800', '#fc2500', '#ff0000']

const redEmoji = String.fromCodePoint(0x1F7E5)
const orangeEmoji = String.fromCodePoint(0x1F7E7)
const yellowEmoji = String.fromCodePoint(0x1F7E8)
const greenEmoji = String.fromCodePoint(0x1F7E9)
const blueEmoji = String.fromCodePoint(0x1F7E6)
const whiteEmoji = String.fromCodePoint(0x2B1C)

window.onload = function () {
     // makeDirections()
     makeSharePopup()
}
//Listens for keypresses
document.addEventListener("keydown", (e) => {
     if (e.key == "Escape") {
          closeDirections()
     }
     if (won === true) return
     if (e.key == "Backspace") {
          currentWord.pop()
          updateBoard();
     }
     else if (e.key == "Enter") {
          if (validateBoard() === true) {
               colorBoard()
          }

     }
     else if (currentWord.length >= 5) return
     else if (e.keyCode >= 65 && e.keyCode <= 90) {
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
     for (let i = 0; i < 5; i++) {
          let color = Math.abs(currentWord[i].charCodeAt() - solution.charCodeAt(i))
          rows[currentRow].children[i].style.backgroundColor = gradient[color]
          await sleep(300)
     }
     currentWord = []
     currentRow++
}

function validateBoard() {
     if (currentRow >= 6) {
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
     return answers[Math.floor(Date.now() / 86400000 % answers.length)]
}


async function colorKey(key) {
     key.style.backgroundColor = "#434242"
     sleep(1000)
     key.style.backgroundColor = "#5e5e5e"
}

function input(e, key) {
     colorKey(e);
     if (won === true) return
     if (key == "Backspace") {
          currentWord.pop()
          updateBoard();
     }
     else if (key == "Enter") {
          if (validateBoard() === true) {
               colorBoard()
          }
     }
     else if (currentWord.length >= 5) return
     else {
          key = key.toLocaleUpperCase()
          if (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) {
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
function closeShare() {
     const popup = document.getElementById("sharePopup")
     popup.classList.add("hidden")
}




function makeDirectionsRow() {
     const tiles = gameBoard.getElementByClass
}


function makeSharePopup() {
     const popup = document.getElementById("sharePopup")
     // popup.style.width = `${window.innerWidth * 0.84}px`
     // popup.style.height = `${window.innerHeight * 0.84}px`
     // popup.style.top = `${window.innerHeight * 0.08}px`
     // popup.style.left = `${window.innerWidth * 0.08}px`

     popup.classList.remove("hidden")
}


function shareGame() {
     if (detectMobile()) {

     } else {
          let firstTime = 1;
          let emojis = getEmojis()
          let message = ``
          if (won == true) {message = `Neardle ${currentRow} / 6\n`}
          else {message = `Neardle ? / 6\n`}
          for (let i = 0; i < 6; i++) {
               let row = ""
               for (let j = 0; j < 5; j++) {
                    let currentRow = emojis[i]
                    row += currentRow[j]
               }
               console.log(row)
               if (firstTime == 1) {
                    message.concat(row)
                    firstTime = 0
               } else {
                    message.concat("\n")
                    message.concat(row)
               }
          }
          console.log(message)
     }
}

function detectMobile() {
     const toMatch = [
         /Android/i,
         /webOS/i,
         /iPhone/i,
         /iPad/i,
         /iPod/i,
         /BlackBerry/i,
         /Windows Phone/i
     ];
     return false
     // return toMatch.some((toMatchItem) => {
     //     return navigator.userAgent.match(toMatchItem);
     // });
 }

//Returns board in capital leters in a 2d array
 function getBoard() { //TODO user later for sessions too
      if (currentRow == 0) return
      let boardArray = []
      for (let i = 0; i < currentRow; i++) {
           let row = []
          for (let j = 0; j < 5; j++) {
              row[j] = rows[i].children[j].innerText
          }
          boardArray.push(row)
      }
      return boardArray
 }

 function getBoardColors() { //TODO user later for sessions
     let board = getBoard()
     if (!board) return;
     let solution = getWord()
     let colorArray = []
     for (let i = 0; i < board.length; i++) {
          let colorRow = []
          for (let j = 0; j < 5; j++) {
               colorRow[j] = gradient[Math.abs(board[i][j].toLocaleLowerCase().charCodeAt() - solution.charCodeAt(j))]
          }
          colorArray.push(colorRow)
     }
     return colorArray
 }

 function expandArray(array) {
      for (let i = 0; i < 6; i++) {
           let row = []
           for (let j = 0; j < 5; j++) {
                if (array[i][j] == undefined) {
                     row[j] = " "
                }
           }
           array.push(row)
      }
      return array
 }

 function getEmojis() {
     if (!getBoard()) return
      let boardColors = expandArray(getBoardColors())
      var emojiArray = []
      for (let i = 0; i < 6; i++) {
          let rowArray = []
          for (let j = 0; j < 5; j++) {
               if (gradient.indexOf(boardColors[i][j]) == 0) {
                    rowArray[j] = blueEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 1 && gradient.indexOf(boardColors[i][j]) <= 7 ) {
                    rowArray[j] = greenEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 8 && gradient.indexOf(boardColors[i][j]) <= 12 ) {
                    rowArray[j] = yellowEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 13 && gradient.indexOf(boardColors[i][j]) <= 18 ) {
                    rowArray[j] = orangeEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 19 && gradient.indexOf(boardColors[i][j]) <= 26) {
                    rowArray[j] = redEmoji
               } else {
                    rowArray[j] = whiteEmoji
               }
          }
          emojiArray.push(rowArray)
      }
      console.log(emojiArray)
      return emojiArray
 }
