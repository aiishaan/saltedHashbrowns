const questions = [
    {
        question: "Which of the following is considered a strong password?",
        answers:[
            {test: "password123", correct: false},
            {test: "P@ssw0rd", correct: true},
            {test: "abcde", correct: false},
            {test: "qwerty", correct: false},
        ]
    },
    {
        question: "What is a key characteristic of a strong password?",
        answers:[
            {test: "Short length", correct: false},
            {test: "Easily guessable patterns", correct: false},
            {test: "Complex combination of letters, numbers, and symbols", correct: true},
            {test: "Using common dictionary words", correct: false},
        ]
    },
    {
        question: "What is the primary purpose of password hashing?",
        answers:[
            {test: "To make passwords more memorable", correct: false},
            {test: "To encrypt passwords for secure storage", correct: true},
            {test: "To make passwords case-sensitive", correct: false},
            {test: "To compress password data", correct: false},
        ]
    },
    {
        question: "Which of the following is a commonly used hashing algorithm?",
        answers:[
            {test: "MD5", correct: true},
            {test: "ROT13", correct: false},
            {test: "Base64", correct: false},
            {test: " XOR", correct: false},
        ]
    },
    {
        question: "What is the main difference between hashing and encryption?",
        answers:[
            {test: "Hashing is reversible, while encryption is not", correct: false},
            {test: "Hashing is one-way, while encryption is two-way", correct: true},
            {test: "Hashing and encryption are the same thing", correct: false},
            {test: "Encryption is only used for passwords", correct: false},
        ]
    },
    {
        question: "What is a brute force attack in the context of password security?",
        answers:[
            {test: "Decrypting passwords using advanced algorithms", correct: false},
            {test: "Attempting every possible password combination until the correct one is found", correct: true},
            {test: "Sending phishing emails to trick users into revealing their passwords", correct: false},
            {test: "Stealing passwords from a company's database", correct: false},
        ]
    },
    {
        question: "What is the added benefit of using multi-factor authentication (MFA) along with a strong password?",
        answers:[
            {test: "Reduces the need for password complexity", correct: false},
            {test: "Increases the convenience of logging in", correct: false},
            {test: "Provides an additional layer of security", correct: true},
            {test: "Allows for shorter passwords", correct: false},
        ]
    },
    {
        question: "How do phishing attacks typically compromise passwords?",
        answers:[
            {test: "By physically stealing the user's computer", correct: false},
            {test: "By tricking users into willingly disclosing their passwords", correct: true},
            {test: "By guessing passwords based on user behaviour", correct: false},
            {test: "By using malware to automatically capture passwords", correct: false},
        ]
    },
    {
        question: "What is the purpose of adding a 'salt' to a password before hashing?",
        answers:[
            {test: "To encrypt the password", correct: false},
            {test: "To make the hashing process faster", correct: false},
            {test: "To add uniqueness to each password, even if the original passwords are the same", correct: true},
            {test: "To compress the password data", correct: false},
        ]
    },
    {
        question: "What is the concept of 'bits of entropy' in the context of passwords?",
        answers:[
            {test: "It is a measure of password strength" , correct: true},
            {test: "It is the amount of memory required to store a password", correct: false},
            {test: "It is the speed of encrypting a password", correct: false},
            {test: "It is the maximum bit-length a password can have", correct: false},
        ]
    }

];
const headerElement = document.getElementById("question-header");
const questionElement = document.getElementById("question-text");
const answerButtons = document.getElementsByClassName("button");
const nextButton = document.getElementById("next-button");

let currentQuestionIndex = 0;
let score = 0;
var percentile;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    for(i = 0; i < answerButtons.length; i++){
        answerButtons[i].style.visibility = "visible";
    }
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    headerElement.innerHTML = `Question ${questionNo}`;
    questionElement.innerHTML = currentQuestion.question;

    for(i = 0; i < answerButtons.length; i++){
        answerButtons[i].innerHTML = currentQuestion.answers[i].test;
        answerButtons[i].dataset.correct = currentQuestion.answers[i].correct;
        answerButtons[i].addEventListener("click", selectAnswer);
    }
}
function resetState(){
    nextButton.style.display = "none"
    for(i = 0; i < answerButtons.length; i++){
        answerButtons[i].classList.remove("correct");
        answerButtons[i].classList.remove("incorrect");
        answerButtons[i].disabled = false;
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    for(i = 0; i < answerButtons.length; i++){
        if(answerButtons[i].dataset.correct === "true"){
            answerButtons[i].classList.add("correct");
        }
        answerButtons[i].disabled = true;
    }
    nextButton.style.display = "block";
    
}

async function showScore(){
    resetState();
    for(i = 0; i < answerButtons.length; i++){
        answerButtons[i].style.visibility = "hidden";
    }
    headerElement.innerHTML = "Results";
    questionElement.innerHTML = "Loading results..."
    let percentile = await compareScores();
    let average = await averageScores();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!\n
    This is better than ${percentile.toFixed(2)}% of people!
    The average score is ${average.toFixed(2)}!`;

    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

async function sendScore() {
    spreadSheetUrl = "https://docs.google.com/spreadsheets/d/1tcvUqYn6unzBnMs4B2bnjkTJAlLvaaD1AFF-Z3Ila-M/edit#gid=0"
    sheetApiKey = "AIzaSyA2GgNg9oz--cLP8UOrLK8lheyv39uDHrg"

    fetch("https://script.google.com/macros/s/AKfycbyTCm1fFJVrjx5YxlF0xvXURV27NQtVG3BaSbGcJ_11_sgi9SdbQsBEk3ZQfvOHRp_M6A/exec", {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify({score: score})
    })
        .then(response => response.json())
        // Debugging purposes cause it wasn't working
        .catch(error => console.error('Error', error))
    
}

async function fetchScores() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbyTCm1fFJVrjx5YxlF0xvXURV27NQtVG3BaSbGcJ_11_sgi9SdbQsBEk3ZQfvOHRp_M6A/exec");
        return await response.json();
    } catch (error) {
        return console.error('Error, error');
    }
}

async function compareScores() {
    let rawScores = await fetchScores();
    let scores = rawScores.map(Number);
    let totalNumberOfScores = scores.length;
    let worseScoresThanCurrent = scores.filter(s => s < score).length;
    return (worseScoresThanCurrent / totalNumberOfScores) * 100;
}

async function averageScores() {
    let rawScores = await fetchScores();
    let scores = rawScores.map(Number);
    let totalNumberOfScores = scores.length;
    let totalSum = scores.reduce((sum, s) => sum + s, 0);
    return totalSum / totalNumberOfScores;
}


async function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        await sendScore();
        await showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();



