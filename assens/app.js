// Dom Elements

var imageFilm = document.querySelector("#imageFilm");
var domWrongLetters = document.querySelector("#domWrongLetters");
var calculate = document.querySelector("#calculate");
var textSecond = document.querySelector(".textSecond");
var lose = document.querySelector(".lose");
var win = document.querySelector(".win");
var same = document.querySelector(".same");

// Variables
var filmList = ["beethoven", "ghostbusters", "jumanji", "mask", "matrix", "pokemon","titanic"]
var trueLetter = [];
var wrongLetter = [];
var selectWord = randomNameFilm()
var count = 10

// Random word
function randomNameFilm() {
    var word = Math.floor(Math.random() * filmList.length )
    

    return filmList[word]
}


function removeItem(str) {
    
    filmList = filmList.filter(item => item !== str)
}

// End game
function endGame() {
        win.style.opacity = 1
    }

// Displays the entered letters on the screen
function printtrueLetter() {

    if (!filmList.length) {
        endGame()
        return
    }

    textSecond.innerHTML = `
    ${selectWord?.split('').map(letter => `
    <div class = "letter">
    ${trueLetter.includes(letter) ? letter: " "}
    </div>`).join('')}`
    
    imageFilm.src = `./assens/img/${selectWord}.jpg`
    
    var word = textSecond.innerText.replace(/\n/g, "");

    checkWin(word)
    
}

// Check User
function checkWin(word) {
    if (word == selectWord) {
        removeItem(selectWord)
        trueLetter.length = 0
        domWrongLetters.innerHTML = " "
        calculate.innerHTML = 10
        setTimeout(function () {
            selectWord = randomNameFilm();
            printtrueLetter()
        }, 1500)
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