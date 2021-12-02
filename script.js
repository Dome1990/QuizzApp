function init (){
    let question = questions[0]['question'];
    let answer_1 = questions[0]['answer_1'];
    let answer_2 = questions[0]['answer_2'];
    let answer_3 = questions[0]['answer_3'];
    let answer_4 = questions[0]['answer_4'];

    document.getElementById('question').innerHTML = question;
    document.getElementById('answer_1').innerHTML = answer_1;
    document.getElementById('answer_2').innerHTML = answer_2;
    document.getElementById('answer_3').innerHTML = answer_3;
    document.getElementById('answer_4').innerHTML = answer_4;
}