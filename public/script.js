
Var word;

document.addEventListener('keydown', function(e) {
     console.log(e.key);
     if (word.length < 5) word += e.key;
     else word = e.key;
     document.getElementById('word').innerHTML = word;
});