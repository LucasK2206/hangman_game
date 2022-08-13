const userLetter = document.querySelector("#user-data");
const errorCode = document.querySelector("#error-code");
const availableLettersBox = document.querySelector("#availableLetters");
const usedLetters = document.querySelector("#usedLetters");
const gamePasswdBox = document.querySelector("#game__display--passwd");

const reg = new RegExp("^[a-z]*$");

let availableLettersAll = [];

const passwd = "ala ma kota";
const allLetters = "abcdefghijklmnopqrstuvwxyz";
const tabOfAllLetters = [...allLetters];


document.addEventListener("DOMContentLoaded", () => {
    initGame();

})
const initGame = function(){
    hashPasswd();
    addavailableLetters();
    getDataFromUser();

}

const getDataFromUser = function(){
    userLetter.addEventListener("change", (letter) => {
        let singleLetter = letter.target.value.toLowerCase();
        if(reg.test(singleLetter) == true && singleLetter !== "" && singleLetter !== " "){
            errorCode.textContent = "Podaj literę z przedziału A-Z, a-z";
            console.log(singleLetter);
            addavailableLetters(singleLetter);
        }else {
            singleLetter = "";
            console.log(errorCode);
            errorCode.textContent = " Błąd: Podaj literę z przedziału A-Z, a-z";
        }
    })
}
const addavailableLetters = function(singleLetter) {
    if(singleLetter){
        availableLettersAll.forEach((value, index) => {
            if(singleLetter === value){
                availableLettersAll.splice(index, 1);
                availableLettersBox.textContent = availableLettersAll.join(" ");
                usedLetters.textContent += value + " ";
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
    let passwd1 = "";
    [...passwd].forEach(letter => {
        if(letter !== " "){
            passwd1+= "-"
        }else {
            passwd1+=" ";
        }
    })

    gamePasswdBox.textContent = passwd1;
}