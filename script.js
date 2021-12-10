let questionSection = 0;
let currentQuestion = 0;
let finishedQuestions = 0;
let audio_success = new Audio('audio/success.mp3');
let audio_fail = new Audio('audio/fail.mp3')
let myAnswers = [];         //store the answers for the lastQuestion() function
let score = 0;

function init() {
    let question = questions[questionSection][currentQuestion];
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('totalNumberOfQuestions').innerHTML = questions[questionSection].length;
    document.getElementById('selectedCat' + questionSection).style.backgroundColor = 'white';
    for (let i = 1; i <= 4; i++) {
        document.getElementById('answer_' + i).innerHTML = question['answer_' + i];
    };
}

function checkAnswer(selected) {
    myAnswers.push(selected);
    let selectedNumber = selected.substr(selected.length - 1);
    let righAnswerNumber = questions[questionSection][currentQuestion]['right_answer'];
    if (rightAnswer(selectedNumber, righAnswerNumber)) {
        markRightAnswer(selected, selectedNumber);
    }
    else {
        markWrongAnswer(selected, selectedNumber, righAnswerNumber);
    };
    if (anotherQuestionAvailable()) {
        enableNextQuestionBtn();
    };
    finishedQuestions++;
    updateProgressbar();
    enableLastQuestionBtn();
    disableButtons();
    showEndscreenBtn();
}

function rightAnswer(selectedNumber, righAnswerNumber) {
    return selectedNumber == righAnswerNumber;
}

function markRightAnswer(selected, selectedNumber) {
    document.getElementById(selected).parentNode.classList.add('rightAnswer');
    document.getElementById('answerLetter' + selectedNumber).classList.add('btn-success');
    score++;
    audio_success.play();
}

function markWrongAnswer(selected, selectedNumber, righAnswerNumber) {
    document.getElementById(selected).parentNode.classList.add('wrongAnswer');
    document.getElementById('answerLetter' + selectedNumber).classList.add('btn-danger');
    document.getElementById('answer_' + righAnswerNumber).parentNode.classList.add('rightAnswer');
    document.getElementById('answerLetter' + righAnswerNumber).classList.add('btn-success');
    audio_fail.play();
}

function anotherQuestionAvailable(){
    return currentQuestion != questions[questionSection].length - 1;
}

function loadMyAnswers(selected) {
    let selectedNumber = selected.substr(selected.length - 1);
    let righAnswerNumber = questions[questionSection][currentQuestion]['right_answer'];
    if (selectedNumber == righAnswerNumber) {
        document.getElementById(selected).parentNode.classList.add('rightAnswer');
        document.getElementById('answerLetter' + selectedNumber).classList.add('btn-success');
    }
    else {
        document.getElementById(selected).parentNode.classList.add('wrongAnswer');
        document.getElementById('answerLetter' + selectedNumber).classList.add('btn-danger');
        document.getElementById('answer_' + righAnswerNumber).parentNode.classList.add('rightAnswer');
        document.getElementById('answerLetter' + righAnswerNumber).classList.add('btn-success');
    };
    disableButtons();
}

function changeCategory(i) {
    questionSection = i;
    for (let i = 0; i < questions.length; i++) {
        document.getElementById('selectedCat' + i).style.backgroundColor = 'transparent';
    }
    restart();
}

function restart() {
    currentQuestion = 0;
    finishedQuestions = 0;
    myAnswers = [];
    score = 0;

    updateProgressbar();
    hideEndscreen();
    enableButtons();
    init();
}

function showEndscreenBtn() {
    if (finishedQuestions == questions[questionSection].length) {
        document.getElementById('endscreenBtn').style.display = 'unset';
    }
}

function showEndscreen() {
    document.getElementById('quizArea').classList.remove('d-flex');
    document.getElementById('endscreen').style.display = 'flex';
    document.getElementById('quizArea').style.display = 'none';
    document.getElementById('tropy').style.display = 'unset';
    showScore();
}

function hideEndscreen() {
    document.getElementById('quizArea').classList.add('d-flex');
    document.getElementById('endscreen').style.display = 'none';
    document.getElementById('quizArea').style.display = 'unset';
    document.getElementById('tropy').style.display = 'none';
    document.getElementById('endscreenBtn').style.display = 'none';
}

function disableButtons() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('answer_' + i).parentNode.disabled = true;
    }
}

function enableButtons() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('answer_' + i).parentNode.disabled = false;
        document.getElementById('answer_' + i).parentNode.classList.remove('rightAnswer');
        document.getElementById('answerLetter' + i).classList.remove('btn-success');
        document.getElementById('answer_' + i).parentNode.classList.remove('wrongAnswer');
        document.getElementById('answerLetter' + i).classList.remove('btn-danger');
    }
}

function enableLastQuestionBtn() {
    document.getElementById('lastQuestion').disabled = false;
}

function enableNextQuestionBtn() {
    document.getElementById('nextQuestion').disabled = false;
}

function disableNextQuestionBtn() {
    if (checkForlastQuestion()) {
        document.getElementById('nextQuestion').disabled = true;
    };
}

function checkForlastQuestion(){
    return currentQuestion == finishedQuestions || currentQuestion == questions[questionSection].length - 1;
}

function nextQuestion() {
    if (moreQuestionsAvailable()) {  
    currentQuestion++;
        enableButtons();
        init();
        loadMyAnswers(myAnswers[currentQuestion]);
    }
    else {
        currentQuestion++;
        init();
        enableButtons();
    };
}

function moreQuestionsAvailable(){
    return currentQuestion < questions[questionSection].length - 1 && currentQuestion < finishedQuestions - 1;
}

// onclick funktion that shows the previous question
function lastQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        enableButtons();
        init();
        loadMyAnswers(myAnswers[currentQuestion]);
    };
}

function showScore() {
    document.getElementById('score').innerHTML = `
    <b>  ${score}/${questions[questionSection].length}</b>
    `
}

function updateProgressbar() {
    let progress = Math.round((finishedQuestions) / questions[questionSection].length * 100) + `%`;
    document.getElementById('progressBar').style = `width: ${progress};`;
    document.getElementById('progressBar').innerHTML = progress;
}