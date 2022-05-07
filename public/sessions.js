//TODO write a cookie permission request popup
const url = "http://localhost:3000"

function makeCookiePopup() {
    var cookiePopup = document.createElement("div");
    cookiePopup.id = "cookie-popup";
    cookiePopup.innerHTML = "<div id='cookie-popup-inner'><div id='cookie-popup-content'><p>This website uses cookies to ensure you get the best experience on our website. <a href='/privacy-policy.html'>Learn more</a></p><button id='cookie-popup-accept'>Accept</button></div></div>";
    document.body.appendChild(cookiePopup);
    document.getElementById("cookie-popup-accept").addEventListener("click", function () {
        document.getElementById("cookie-popup").style.display = "none";
    });
}


function sendSaveRequest(word1, word2, word3, word4, word5, word6) {
     fetch(`${url}/saveWords`, { method: 'POST', body: JSON.stringify({ word1: word1, word2: word2, word3: word3, word4: word4, word5: word5, word6: word6, sessionId: getCookie("sessionId") }), headers: { 'Content-Type': 'application/json' } })
}

async function getWords() {
     let words = await fetch(`${url}/getWords`, { method: 'GET' }).then(response => response.json(response))
     return words
}

function createSession() {
     fetch(`${url}/createSession`, { method: 'POST' , credentials: 'include'})
}

async function validateSession() {
     let response = await fetch(`${url}/validateSession`, { method: 'GET' }).then(response => response.json(response))
     return response
}