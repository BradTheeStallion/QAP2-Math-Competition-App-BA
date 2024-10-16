//Bradley Ayers
//QAP 2
//October 11-15, 2024

function getQuestion() {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, question, answer;

    switch (operator) {
        case '+':
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case '-':
            num1 = Math.floor(Math.random() * 50) + 26; // Ensure num1 is larger
            num2 = Math.floor(Math.random() * 25) + 1;
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case '*':
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            question = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        case '/':
            num2 = Math.floor(Math.random() * 12) + 1; // Divisor (1 to 12)
            answer = Math.floor(Math.random() * 12) + 2; // Quotient (2 to 12)
            num1 = num2 * answer; // Ensure integer division result
            question = `${num1} / ${num2}`;
            break;
    }

    return { question, answer };
}

function isCorrectAnswer(question, userAnswer) {
    const parts = question.split(' ');
    if (parts.length !== 3) {
        throw new Error("Invalid question format.");
    }

    const num1 = parseInt(parts[0], 10);
    const num2 = parseInt(parts[2], 10);
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
            correctAnswer = num1 / num2;
            break;
        default:
            throw new Error("Unsupported operator.");
    }

    return correctAnswer === userAnswer;
}

module.exports = {
    getQuestion,
    isCorrectAnswer
};