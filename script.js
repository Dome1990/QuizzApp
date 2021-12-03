
let currentQuestion = 0;

function init() {
    let question = questions[currentQuestion];

    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function checkAnswer(selected) {
    let selectedNumber = selected.substr(selected.length - 1);
    let righAnswerNumber = questions[currentQuestion]['right_answer'];

    if (selectedNumber == righAnswerNumber) {
        document.getElementById(selected).parentNode.classList.add('rightAnswer');
    }
    else {
        document.getElementById(selected).parentNode.classList.add('wrongAnswer');
        document.getElementById('answer_'+righAnswerNumber).parentNode.classList.add('rightAnswer');
    }
    init();
}