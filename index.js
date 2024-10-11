const express = require('express');
const app = express();
const port = 3000;
const { getQuestion, isCorrectAnswer } = require('./mathUtilities');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let currentQuestion = null;
let streak = 0;
let leaderboard = [];

app.get('/', (req, res) => {
    res.render('index', { streak, leaderboard });
});

app.get('/quiz', (req, res) => {
    currentQuestion = getQuestion();
    res.render('quiz', { question: currentQuestion.question, streak });
});

app.post('/quiz', (req, res) => {
    const { answer } = req.body;
    const userAnswer = parseFloat(answer);

    if (isCorrectAnswer(currentQuestion.question, userAnswer)) {
        streak++;
        if (streak > Math.min(...leaderboard, 0)) {
            leaderboard.push(streak);
            leaderboard.sort((a, b) => b - a);
            leaderboard = leaderboard.slice(0, 10);
        }
        res.redirect('/quiz');
    } else {
        leaderboard.push(streak);
        leaderboard.sort((a, b) => b - a);
        leaderboard = leaderboard.slice(0, 10);
        streak = 0;
        res.redirect('/');
    }
});

app.get('/leaderboards', (req, res) => {
    res.render('leaderboards', { leaderboard });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});