import { passwordObj } from './passwordsObj.js'

const userLetter = document.querySelector("#user-letter");
const errorCode = document.querySelector("#error-code");
const availableLettersBox = document.querySelector("#availableLetters");
const usedLetters = document.querySelector("#usedLetters");
const gamePasswdBox = document.querySelector("#game__display--passwd");

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
}
const drawPassword = function() {
    let minNbOfPasswds = 1;
    let maxNbOfPasswds = Object.keys(passwordObj)[Object.keys(passwordObj).length-1];
    console.log(maxNbOfPasswds)
    let passwordNumber = Math.floor(Math.random()*(maxNbOfPasswds - minNbOfPasswds) + minNbOfPasswds);
    passwd = passwordObj[passwordNumber];
    passwd = passwd.toLowerCase();

}

const getDataFromUser = function(){
    userLetter.addEventListener("change", (letter) => {
        let singleUserLetter = letter.target.value.toLowerCase();
        if(reg.test(singleUserLetter) == true && singleUserLetter !== "" && singleUserLetter !== " "){
            errorCode.textContent = "Podaj literę z przedziału A-Z, a-z";
            addavailableLetters(singleUserLetter);

        }else {
            errorCode.textContent = " Błąd: Podaj literę z przedziału A-Z, a-z";
        }
        letter.target.value = "";
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
    }
    console.log(numberOfChances);

    gamePasswdBox.textContent = passwdCopy.join("");
    passwordComplianceChecker();
}

const passwordComplianceChecker = function() {
    if(passwd.trim() === passwdCopy.join("").trim()){
        console.log("Wygrana!");
    } else if(numberOfChances === 0){
        console.log("Przegrana")
    }
}