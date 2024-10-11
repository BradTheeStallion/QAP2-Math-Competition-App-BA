function getQuestion() {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question;
    let answer;

    switch (operator) {
        case '+':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            question = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            question = `${num1} / ${num2}`;
            answer = num2 === 0 ? 'undefined' : parseFloat((num1 / num2).toFixed(2));
            break;
    }

    return { question, answer };
}

function isCorrectAnswer(question, answer) {
    const parts = question.split(' ');
    const num1 = parseInt(parts[0]);
    const num2 = parseInt(parts[2]);
    const operator = parts[1];
    let correctAnswer;

    switch (operator) {
        case '+':
            correctAnswer = num1 + num2;
            break;
        case '-':
            correctAnswer = num1 - num2;
            break;
        case '*':
            correctAnswer = num1 * num2;
            break;
        case '/':
            correctAnswer = num2 === 0 ? 'undefined' : parseFloat((num1 / num2).toFixed(2));
            break;
    }

    return correctAnswer === answer;
}

module.exports = {
    getQuestion,
    isCorrectAnswer
}