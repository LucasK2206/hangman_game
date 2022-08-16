import { passwordObj } from './passwordsObj.js'

const userLetter = document.querySelector(".user-letter");
const errorCode = document.querySelector(".error-code");
const availableLettersBox = document.querySelector(".available-letters");
const usedLetters = document.querySelector(".used-letters");
const gamePasswdBox = document.querySelector(".game__display--passwd");
const gameBoardContent = document.querySelector(".chance-left");
const gameOver = document.querySelector(".game-over");
const endScreenDisp = document.querySelector(".game-passwd-disp");
const endScreenPasswd = document.querySelector(".game-result");
const resetGameBtn = document.querySelector(".reset-game");

const reg = new RegExp("^[a-z]*$");

let availableLettersAll = [];
let numberOfChances = 5;
let passwd = "";
let passwdCopy = [];
const allLetters = "abcdefghijklmnopqrstuvwxyz";
const tabOfAllLetters = [...allLetters];


document.addEventListener("DOMContentLoaded", () => {
    initGame();
})
const initGame = function(){
    drawPassword();
    hashPasswd();
    addavailableLetters();
    getDataFromUser();
    resetGame();
}
const drawPassword = function() {
    gameBoardContent.innerText = numberOfChances;
    let minNbOfPasswds = 1;
    let maxNbOfPasswds = Object.keys(passwordObj)[Object.keys(passwordObj).length-1];
    console.log(maxNbOfPasswds)
    let passwordNumber = Math.floor(Math.random()*(maxNbOfPasswds - minNbOfPasswds) + minNbOfPasswds);
    passwd = passwordObj[passwordNumber];
    passwd = passwd.toLowerCase();

}

const getDataFromUser = function(){
    userLetter.addEventListener("input", (letter) => {
        let singleUserLetter = letter.target.value.toLowerCase();
        if(reg.test(singleUserLetter) == true && singleUserLetter !== "" && singleUserLetter !== " "){
            errorCode.textContent = "Podaj literę z przedziału A-Z, a-z";
            addavailableLetters(singleUserLetter);

        }else {
            errorCode.textContent = " Błąd: Podaj literę z przedziału A-Z, a-z";
        }
        letter.target.value = "";
        userLetter.placeholder = `${singleUserLetter}`;
    })
}
const addavailableLetters = function(singleUserLetter) {
    if(singleUserLetter){
        availableLettersAll.forEach((value, index) => {
            if(singleUserLetter === value){
                availableLettersAll.splice(index, 1);
                availableLettersBox.textContent = availableLettersAll.join(" ");
                usedLetters.textContent += value + " ";
                checkLetterInPasswd(singleUserLetter);
            }
        })
    }
    else {
        tabOfAllLetters.forEach( availableLetter => {
            availableLettersAll.push(availableLetter);

            availableLettersBox.textContent = availableLettersAll.join(" ");
        })
    }
}
const hashPasswd = function() {
    [...passwd].forEach(letter => {
        if(letter !== " "){
            passwdCopy.push("-");
        }else {
            passwdCopy.push(" ");
        }
    })
    gamePasswdBox.textContent = passwdCopy.join("");
}
const checkLetterInPasswd = function(singleUserLetter) {
    let passwdCopyCheacker = [...passwdCopy];

    [...passwd].forEach((letter, index) => {
        if(letter === singleUserLetter){
            passwdCopy[index] = letter;
        }
    })
    if(passwdCopyCheacker.join("") === passwdCopy.join("")){
        numberOfChances--;
        gameBoardContent.innerText = numberOfChances;
    }
    console.log(numberOfChances);

    gamePasswdBox.textContent = passwdCopy.join("");
    passwordComplianceChecker();
}

const passwordComplianceChecker = function() {
    if(passwd.trim() === passwdCopy.join("").trim()){
        console.log("Wygrana!");
        gameOver.classList.toggle("game-disabled");
        endScreenDisp.textContent = "Wygrana! hasło to:";
        endScreenPasswd.textContent = passwd;

    } else if(numberOfChances === 0){
        console.log("Przegrana");
        endScreenDisp.textContent = "Przegrana :/ hasło to:"
        endScreenPasswd.textContent = passwd;
        gameOver.classList.toggle("game-disabled");
    }
}
const resetGame = function() {
    resetGameBtn.addEventListener("click", () => {
        location.reload();
    })
}