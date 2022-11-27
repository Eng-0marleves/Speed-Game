// ARRAY OF WORDS 
const Allwords = [
        "Hello",
        "Programming",
        "Code",
        "Javascript",
        "Town",
        "Country",
        "Testing",
        "Youtube",
        "Linkedin",
        "Twitter",
        "Github",
        "Leetcode",
        "Internet",
        "Python",
        "Scala",
        "Destructuring",
        "Paradigm",
        "Styling",
        "Cascade",
        "Documentation",
        "Coding",
        "Funny",
        "Working",
        "Dependencies",
        "Task",
        "Runner",
        "Roles",
        "Test",
        "Rust",
        "Playing"
];

// GENERATE ARRAYS
let easyWords = [];
let normalWords = [];
let hardWords = [];
let words = [];
for (i of Allwords) {
    if (i.length <= 6) {
        easyWords.push(i)
    }
    if (i.length <= 10 && i.length >6) {
        normalWords.push(i)
    }
    if (i.length >= 7) {
        hardWords.push(i)
    }
}


// LEVELS
const levels = {
    "Easy": 7,
    "Normal": 5,
    "Hard": 3,
}


// CATSH SELECTORS
let selector = document.querySelector(".levels"),
    lvlNameSpan = document.querySelector(".lvl"),
    secondsSpan = document.querySelector(".seconds"),
    startButton = document.querySelector(".start"), 
    theWord = document.querySelector(".the-word"),
    input = document.querySelector(".input"),
    upcomingWords = document.querySelector(".upcoming-words"),
    timeLeft = document.querySelector(".time span"),
    scoreGet = document.querySelector(".score .got"),
    scoreTotal = document.querySelector(".score .total"),
    finishMessage = document.querySelector(".finish");

// CHANGE SELECTOR
selector.addEventListener("change", () => {
    let selectorValue = selector.value;
    let defultLevelSeconds = levels[selectorValue];
    // SET ON PAGE 
    lvlNameSpan.innerText = selectorValue;
    secondsSpan.innerText = defultLevelSeconds;
    timeLeft.innerText = defultLevelSeconds;
})


// DISABLE PASTE IN INPUT
input.onpaste = function() {
    return false;
}


// START GAME
startButton.onclick = function() {
    // DEFULT START
    this.remove();
    selector.remove()
    input.focus();
    input.value = '';

    if (lvlNameSpan.innerHTML === "") {
        lvlNameSpan.innerText = "Normal";
        secondsSpan.innerHTML = levels[lvlNameSpan.innerText]
    }
    
    // DEFULT LEVEL
    let defultLevelName = lvlNameSpan.innerText;

    // CHECK ARRAY
    if (defultLevelName === "Easy") {
        words  = easyWords;
    } else if (defultLevelName === "Normal") {
        words  = normalWords;
    } else {
        words  = hardWords
    }
    scoreTotal.innerText = words.length
    
    // GENERATE WORDS
    geneWords()
    
    timeLeft.innerHTML = parseInt(timeLeft.innerHTML) + 3
}


// GENERATE WORDS
function geneWords() {
    // RANDOM WORDS
    let randomeWords = words[Math.floor(Math.random() * words.length)];
    // GET THE INDEX OF RANDOM WORDS
    let wordIndex = words.indexOf(randomeWords);
    // REMOVE WORD FROM ARRAY
    words.splice(wordIndex, 1);
    // SHOW RANDOM WORD
    theWord.innerHTML = randomeWords;   
    // EMPETY UPCOMING WORDS
    upcomingWords.innerHTML = "";
    // GENERATE WORDS
    for (let i of words) {
        let div = document.createElement("div");
        let txt = document.createTextNode(i)
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    // STARTT PLAY FUNCTION
    startPlay()
}


// START PLAY
function startPlay() {
    timeLeft.innerHTML = secondsSpan.innerHTML
    
    let start = setInterval(() => {
        timeLeft.innerHTML--;
        if (timeLeft.innerHTML === "0") {
            clearInterval(start);
            compareWords()
            
        }
    }, 1000) 
}


// COMPARE WORDS
function compareWords() {
    if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = '';
        scoreGet.innerHTML++;
        if (words.length > 0) {
            geneWords()
        }else {
            input.value = "Excellent";
            input.style.color = "crimson";
            input.style.fontWeight = "bold";
            input.setAttribute("type", "button")
            addDataToLocaLocalStorage();
        }
    } else {
        input.value = "Game Over";
        input.style.color = "crimson";
        input.style.fontWeight = "bold";
        input.setAttribute("type", "button");
        addDataToLocaLocalStorage();
    }
}


// ADD DATA TO LOCAL STORAGE
function addDataToLocaLocalStorage() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed) 
    window.localStorage.setItem("date", today)
    window.localStorage.setItem("score", scoreGet.innerHTML)
}
