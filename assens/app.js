// Dom Elements

var imageFilm = document.querySelector("#imageFilm");
var domWrongLetters = document.querySelector("#domWrongLetters");
var calculate = document.querySelector("#calculate");
var textSecond = document.querySelector(".textSecond");
var lose = document.querySelector(".lose");
var win = document.querySelector(".win");
var same = document.querySelector(".same");

// Variables
var filmList = ["babys day out", "beethoven", "childs play", "ghostbusters", "home alone", "jumanji", "mask", "matrix", "pokemon", "police academy", "problem child", "titanic"]
var trueLetter = [];
var wrongLetter = [];
var selectWord = randomNameFilm()
var count = 10

// Random word
function randomNameFilm() {
    var word = Math.floor(Math.random() * filmList.length)

    return filmList[word]
}

// Displays the entered letters on the screen
function printtrueLetter() {

    
    textSecond.innerHTML = `
    ${selectWord.split('').map(letter => `
    <div class = "letter">
    ${trueLetter.includes(letter) ? letter: " "}
    </div>`).join('')}`
    
    imageFilm.src = `./assens/img/${selectWord}.jpg`
    
    var word = textSecond.innerText.replace(/\n/g, "");
    
    
    if (word === selectWord) {
        win.style.opacity = 1
        setTimeout(function () {
            win.style.opacity = 0
        }, 2000)
    }
    
}

// Print wrong letters
function updateWrongLetters() {

    var longWrongLetter = wrongLetter.length
    if (longWrongLetter > 0) {
        domWrongLetters.innerHTML = `Wrong Letters : ` + wrongLetter
        if (count >= 1) {
            calculate.innerHTML = (count -= 1)
        }
    }
        if (count === 0) {
            lose.style.opacity = 1

            setTimeout(function () {
             lose.style.opacity = 0   
            }, 2000)
            
            setTimeout(function () {
                window.location.reload()
            }, 3500)

    } 
    
    
    
}

// Same letter warning
function sameLetters() {
    same.style.opacity = 1

    setTimeout(function () {
     same.style.opacity = 0
        }, 2000)
    
}


window.addEventListener("keydown", function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        var letter = e.key
        if (selectWord.includes(letter)) {
            if (!trueLetter.includes(letter)) {
                trueLetter.push(letter)
                printtrueLetter()
            } else {
                sameLetters()
            }
        } else {
            if (!wrongLetter.includes(letter)) {
                wrongLetter.push(letter)   
                updateWrongLetters()
            }
        }
    }
})

printtrueLetter()
