//Bradley Ayers
//QAP 2
//October 11-15, 2024

const express = require('express');
const app = express();
const port = 3000;
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');

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

    if (isNaN(userAnswer)) {
        return res.render('quiz', {
            question: currentQuestion.question,
            streak,
            error: "Please enter a valid number for the answer."
        });
    }

    if (isCorrectAnswer(currentQuestion.question, userAnswer)) {
        streak++;
        res.render('result', { 
            correct: true, 
            streak, 
            question: currentQuestion.question, 
            userAnswer, 
            correctAnswer: currentQuestion.answer 
        });
    } else {
        if (streak > 0) {
            const dateAchieved = new Date();
            const formattedDate = dateAchieved.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            leaderboard.push({ score: streak, date: formattedDate });
            
            leaderboard.sort((a, b) => b.score - a.score);
            leaderboard = leaderboard.slice(0, 10);
        }

        res.render('result', { 
            correct: false, 
            streak, 
            question: currentQuestion.question, 
            userAnswer, 
            correctAnswer: currentQuestion.answer 
        });
        
        streak = 0;
    }
    
    currentQuestion = getQuestion();
});

app.get('/leaderboard', (req, res) => {
    res.render('leaderboard', { leaderboard });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});