const saveForm = document.querySelector(".save-form");
const saveWord = document.querySelector(".save-word");
const wordInput = saveForm.querySelector(".save-word input:first-of-type");
const meaningInput = saveForm.querySelector(".save-word input:last-of-type");
const startBtn = document.querySelector(".start");

const wordList = document.querySelector(".word-list");

const answerForm = document.querySelector(".answer-form");
const problem = answerForm.querySelector("h6");
const answer = answerForm.querySelector("input");
const eachResult = answerForm.querySelector(".each-result span");
const currentScore = answerForm.querySelector(".current-score");
const totalScore = answerForm.querySelector(".total-score");
const answerBtn = answerForm.querySelector(".answer");
const finalResultForm = document.querySelector(".final-result-form");
const finalResult = finalResultForm.querySelector(".final-result");
const returnBtn = finalResultForm.querySelector("button");

const WORD_LIST_KEY = "wordList";


// words save
let savedWords = JSON.parse(localStorage.getItem(WORD_LIST_KEY));

function showWord(word) {
    const li = document.createElement("li");
    li.id = word.id;
    const span = document.createElement("span");
    span.innerText = `${word.spelling}: ${word.meaning}`;
    const btn = document.createElement("button");
    btn.innerHTML = "<i class=\"fas fa-trash-alt\"></i>";
    btn.addEventListener("click", (evt) => {
        const targetLi = evt.target.parentElement.parentElement;
        targetLi.remove();
        savedWords = savedWords.filter((elm) => elm.id !== parseInt(targetLi.id));
        localStorage.setItem(WORD_LIST_KEY, JSON.stringify(savedWords));
    });
    li.appendChild(span);
    li.appendChild(btn);
    wordList.appendChild(li);
}

function loadSavedWords() {
    savedWords.forEach((word) => showWord(word));
}

function deleteWord(id) {
    const targetLi = document.getElementById(id);
    if (targetLi !== null) {
        targetLi.remove();
        savedWords = savedWords.filter((elm) => elm.id !== parseInt(targetLi.id));
    } else {
        savedWords = savedWords.filter((elm) => elm.id !== parseInt(id));
    }
    localStorage.setItem(WORD_LIST_KEY, JSON.stringify(savedWords));
}

saveForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const inputWord = wordInput.value;
    const inputMeaning = meaningInput.value;
    const word = {
        id: Date.now(),
        spelling: inputWord,
        meaning: inputMeaning,
    }
    if (savedWords !== null && savedWords.find((elm) => elm.spelling === inputWord)) {
        if (window.confirm(`${inputWord} is already saved(${inputMeaning}). Do you want overwrite it?`)) {
            const id = savedWords.find((elm) => elm.spelling === inputWord).id;
            deleteWord(id);
            savedWords.push(word);
            localStorage.setItem(WORD_LIST_KEY, JSON.stringify(savedWords));
        }
    } else {
        savedWords.push(word);
        localStorage.setItem(WORD_LIST_KEY, JSON.stringify(savedWords));
    }

    showWord(word);

    wordInput.value = "";
    meaningInput.value = "";
})

// start
let remainWords = [];
let totalCount = 0;
const SPELLING = "spelling";
const MEANING = "meaning";
const problemTypes = [SPELLING, MEANING];
let selectedWord = "";
let currentType = "";

function printProblemScreen() {
    selectedWord = remainWords[Math.floor(Math.random() * remainWords.length)];
    currentType = problemTypes[Math.floor(Math.random() * problemTypes.length)]
    if (remainWords.length === 0) {
        answerForm.classList.add(HIDDEN_CLASS_NAME);
        finalResultForm.classList.remove(HIDDEN_CLASS_NAME);
        finalResult.innerText = `Congraturation. You complete memorizing mission. Your final score is ${currentScore.innerText}${totalScore.innerText}`;        
    } else {
        if (currentType === SPELLING) {
            problem.innerText = selectedWord.meaning;
        } else if (currentType === MEANING) {
            problem.innerText = selectedWord.spelling;
        }
    }
}

startBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (savedWords.length !== 0) {
        startBtn.classList.add(HIDDEN_CLASS_NAME);
        saveWord.classList.add(HIDDEN_CLASS_NAME);
        wordList.classList.add(HIDDEN_CLASS_NAME);
        answerForm.classList.remove(HIDDEN_CLASS_NAME);
        remainWords = savedWords;
        currentScore.innerText = "0";
        totalScore.innerText = `/ ${totalCount}`;
        printProblemScreen();
    } else {
        alert("There is no saved word. Please save words that you want to memorize.")
    }
})

answerBtn.addEventListener("click", (evt) => {
    if (answer.value === "") {
        alert("Please fill out the answer.");
        evt.preventDefault();
    } else {
        evt.preventDefault();
        if (remainWords.length === 0) {
            answerForm.classList.add(HIDDEN_CLASS_NAME);
            finalResultForm.classList.remove(HIDDEN_CLASS_NAME);
            finalResult.innerText = `Congraturation. You complete memorizing mission. Your final score is ${currentScore.innerText}${totalScore.innerText}`;
        } else {
            if ((currentType === SPELLING && answer.value === selectedWord.meaning)
            || (currentType === MEANING && answer.value === selectedWord.spelling)) {
                eachResult.innerText = "Correct";
                currentScore.innerText = parseInt(currentScore.innerText) + 1;
                totalCount += 1;
                totalScore.innerText = `/ ${totalCount}`;
            } else {
                eachResult.innerText = "Wrong";
                totalCount += 1;
                totalScore.innerText = `/ ${totalCount}`;
            }

            answer.value = "";
            remainWords = remainWords.filter((elm) => elm.id !== selectedWord.id);
        }
        printProblemScreen();
    }
})


if (savedWords !== null) {
    loadSavedWords();
} else {
    savedWords = [];
}