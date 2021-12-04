
let currentQuestion = 0;
let finishedQuestions = 0;

function init() {
    let question = questions[currentQuestion];
    document.getElementById('question').innerHTML = question['question'];
    for (let i = 1; i <= 4; i++) {
        document.getElementById('answer_' + i).innerHTML = question['answer_' + i];
    };
}

function checkAnswer(selected) {
    let selectedNumber = selected.substr(selected.length - 1);
    let righAnswerNumber = questions[currentQuestion]['right_answer'];
    if (selectedNumber == righAnswerNumber) {
        document.getElementById(selected).parentNode.classList.add('rightAnswer');
    }
    else {
        document.getElementById(selected).parentNode.classList.add('wrongAnswer');
        document.getElementById('answerLetter' + selectedNumber).classList.add('btn-danger');
        document.getElementById('answer_' + righAnswerNumber).parentNode.classList.add('rightAnswer');
        document.getElementById('answerLetter' + righAnswerNumber).classList.add('btn-success');
    };
    finishedQuestions++;
    init();
    enableLastQuestionBtn();
    enableNextQuestionBtn();
    disableButtons();
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
    if (currentQuestion == finishedQuestions) {
        document.getElementById('nextQuestion').disabled = true;
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        init();
        enableButtons();
    };
}

function lastQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        init();
    };
}