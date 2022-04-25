//TODO Fix so that if delete is pressed while coloring it doesn't mess up

const board = document.getElementById("board");
const rows = board.children
var currentDistance = [];
var currentWord = [];
var currentRow = 0;
var won = true;
var coloring = false;
const sleep = ms => new Promise(r => setTimeout(r, ms));
const gradient = ['#130FB9', '#72cb1f', '#7bc701', '#84c300', '#8cbf00', '#94ba00', '#9bb600', '#a2b100', '#a9ac00', '#b0a700', '#b7a200', '#bd9c00', '#c39600', '#c99000', '#cf8a00', '#d58300', '#da7c00', '#e07500', '#e56d00', '#e96400', '#ee5b00', '#f25100', '#f64500', '#f93800', '#fc2500', '#ff0000']

const redEmoji = String.fromCodePoint(0x1F7E5)
const orangeEmoji = String.fromCodePoint(0x1F7E7)
const yellowEmoji = String.fromCodePoint(0x1F7E8)
const greenEmoji = String.fromCodePoint(0x1F7E9)
const blueEmoji = String.fromCodePoint(0x1F7E6)
const whiteEmoji = String.fromCodePoint(0x2B1C)

window.onload = function () {
     makeDirections()
}
//Listens for keypresses
document.addEventListener("keydown", (e) => {
     if (coloring === true) return
     if (e.key == "Escape") {
          if ((document.getElementById("sharePopup").classList.contains("hidden")) === true) {
               closeDirections()
          } else {
               closeShare()
          }
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
     let word = toWord()
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
     coloring = true
     let solution = getWord()
     for (let i = 0; i < 5; i++) {
          let color = Math.abs(currentWord[i].charCodeAt(0) - solution.charCodeAt(i))
          rows[currentRow].children[i].style.backgroundColor = gradient[color]
          await sleep(300)
     }
     if (previousWord != getWord()) {
          clearBoard()
     }
     currentRow++
     currentWord = []
     coloring = false
}

function validateBoard() {
     if (currentWord.length == 5 && checkWord()) {
          if (checkSolution()) return true
          return true
     } else if (currentWord.length < 5) {
          makePopup("Word is too short", 1000)
          return false
     } else {
          makePopup("Word is not in the dictionary", 1000)
          return false
     }
}

function checkSolution() {
     let solution = getWord()
     if (toWord() == solution) {
          makePopup("You got it!", 1000)
          won = true
          makeSharePopup(true)
          return true
     } else {
          if (currentRow >= 5) {
               makePopup(`The word was ${getWord()}. Cry about it.`, 1000)
               won = true
               makeSharePopup(true)
               return false
          }
          return false
     }
}

function clearBoard() {
     makePopup(`The word was ${previousWord}. Now the puzzle has switched to today's!`, 3000)
     for (var i = 0; i < 6; i++) {
          for (let j = 0; j < 5; j++) {
               rows[i].children[j].style.backgroundColor = "transparent"
               rows[i].children[j].innerText = ""
          }
     }
     currentRow = 1
     previousWord = getWord()
}
var previousWord = getWord()
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


//TODO redo later with CSS so less sloppy
var notificationShowing = 0;
async function makePopup(text, time) {
     if (notificationShowing == 0) {
          notificationShowing = 1
          const body = document.getElementById("body")
          const popup = document.createElement("h1")
          popup.classList.add("popup")
          const popupText = document.createTextNode(text)
          popup.appendChild(popupText)
          popup.style.visibility = "hidden"
          body.appendChild(popup)
          const width = popup.clientWidth
          const height = popup.clientHeight
          popup.style.paddingTop = `${15}px`
          popup.style.paddingBottom = `${15}px`
          popup.style.top = `${window.innerHeight * 0.1}px`
          popup.style.left = `${(window.innerWidth / 2) - popup.clientWidth / 2}px`
          popup.style.visibility = "visible"

          await sleep(time)
          popup.style.visibility = "hidden"
          popup.remove()
     }
     notificationShowing = 0
}

function makeDirections() {
     const popup = document.getElementById("directionPopup")
     let gameTiles = document.getElementsByClassName("directions-tile")
     popup.classList.remove("hidden")
     for (let i = 0; i < 5; i++) {
          gameTiles[i].style.height = gameTiles[i].style.width
     }
}

function closeDirections() {
     const game = document.getElementById("gameBoard")
     const popup = document.getElementById("directionPopup")
     popup.classList.add("hidden")
     game.classList.remove("hidden")
     won = false;
}
function closeShare() {
     const board = document.getElementById("gameBoard")
     const popup = document.getElementById("sharePopup")
     const smallButton = document.getElementById("share-body")
     popup.classList.add("hidden")
     smallButton.classList.remove("hidden")
     board.classList.remove("hidden")
}

async function makeSharePopup(delay) {
     if (delay) {
          await sleep(1500)
     }
     const shareButtonBody = document.getElementById("share-body")
     const popup = document.getElementById("sharePopup")
     const gameBoard = document.getElementById("gameBoard")

     shareButtonBody.classList.add("hidden")
     gameBoard.classList.add("hidden")
     popup.classList.remove("hidden")
}

async function shareGame() {
     await sleep(1000)
     let message = ""
     let emojiFinal = getEmojis(true)
     if (won == true) {
          message = `Neardle - ${currentRow} / 6\n`
     } else {
          message = `Neardle - ${Math.floor(Date.now() / 86400000 % answers.length)} - ${currentRow} / 6\n`
     }
     message += emojiFinal
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          results.innerText = message
          const shareMessage = {
               title: "Neardle",
               text: `${message}`
          }
          navigator.share(shareMessage)
     } else {
          navigator.clipboard.writeText(message).then(() => {
               makePopup("Copied to clipboard!", 1000)
               results.innerText = message
          }, (err) => {
               makePopup("Failed to copy to clipboard.", 1000)
               throw err
          });
     }
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

function getEmojis(rendered) {
     let redEmoji = "🟥"
     let orangeEmoji = "🟧"
     let yellowEmoji = "🟨"
     let greenEmoji = "🟩"
     let blueEmoji = "🟦"
     let whiteEmoji = "⬜"
     if (!rendered) {
          redEmoji = "0x1F7E5"
          orangeEmoji = "0x1F7E7"
          yellowEmoji = "0x1F7E8"
          greenEmoji = "0x1F7E9"
          blueEmoji = "0x1F7E6"
          whiteEmoji = "0x2B1C"
     }
     if (!getBoard()) return
     let boardColors = getBoardColors()
     var emojiArray = ""
     for (let i = 0; i < boardColors.length; i++) {
          let rowArray = []
          for (let j = 0; j < 5; j++) {
               if (gradient.indexOf(boardColors[i][j]) == 0) {
                    rowArray += blueEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 1 && gradient.indexOf(boardColors[i][j]) <= 7) {
                    rowArray += greenEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 8 && gradient.indexOf(boardColors[i][j]) <= 12) {
                    rowArray += yellowEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 13 && gradient.indexOf(boardColors[i][j]) <= 18) {
                    rowArray += orangeEmoji
               } else if (gradient.indexOf(boardColors[i][j]) >= 19 && gradient.indexOf(boardColors[i][j]) <= 26) {
                    rowArray += redEmoji
               } else {
                    rowArray += whiteEmoji
               }
          }
          emojiArray += rowArray
          emojiArray += "\n"
     }
     return emojiArray
}