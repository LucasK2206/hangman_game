const userLetter = document.querySelector("#user-data");
const errorCode = document.querySelector("#error-code");
const availableLettersBox = document.querySelector("#availableLetters");
const usedLetters = document.querySelector("#usedLetters");

const reg = new RegExp("^[a-z]*$");

let str = "";
const allLetters = "abcdefghijklmnopqrstuvwxyz";
const tabOfAllLetters = [...allLetters];


document.addEventListener("DOMContentLoaded", () => {
    initGame();

})
const initGame = function(){
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
            singleLetter = "";
        }else {
            singleLetter = "";
            console.log(errorCode);
            errorCode.textContent = " Błąd: Podaj literę z przedziału A-Z, a-z";
        }
    })
}
const addavailableLetters = function(singleLetter) {
    if(singleLetter){

    }
    else {
        tabOfAllLetters.forEach( availableLetter => {
            str+=availableLetter + " ";
            availableLettersBox.textContent = str;
            return str;
        }
    })
}