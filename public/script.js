var currentWord = [];

//Listens for keypresses
document.addEventListener("keydown", (e) => {
     if(e.key == "Backspace") {
          currentWord.pop()
          return
     }
     else if(e.key == "Enter") {
          console.log(toWord(currentWord))
          document.getElementById("worded").innerText = toWord(currentWord)
          return
     }
     else if(currentWord.length >= 5) return
     else if(e.keyCode >= 65 && e.keyCode <= 90) {
          currentWord.push(e.key.toLocaleUpperCase())
     }
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
    accepted.indexOf(toWord(currentWord)) != -1 ? alert("Correct!") : alert("Incorrect!")
}
