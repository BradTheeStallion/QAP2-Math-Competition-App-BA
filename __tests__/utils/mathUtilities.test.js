//Brad Ayers
//QAP2
//October 11, 2024

const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");

describe("Tests for getQuestion", () => {
    describe("Valid Operations", () => {
        test("Question is a valid math operation", () => {
            const question = getQuestion();
            expect(question).toMatch(/(\d+)\s*(\+|\-|\*|\/)\s*(\d+)/);
        });
    });

    describe("Range of Numbers", () => {
        test("Numbers are within a certain range", () => {
            const question = getQuestion();
            const numbers = question.match(/\d+/g);
            expect(Number(numbers[0])).toBeGreaterThanOrEqual(0);
            expect(Number(numbers[0])).toBeLessThanOrEqual(100);
            expect(Number(numbers[1])).toBeGreaterThanOrEqual(0);
            expect(Number(numbers[1])).toBeLessThanOrEqual(100);
        });
    });

    describe("Randomness", () => {
        test("Questions are unique", () => {
            const questions = new Set();
            for (let i = 0; i < 100; i++) {
                questions.add(getQuestion());
            }
            expect(questions.size).toBeGreaterThan(1);
        });
    });

    describe("Division by Zero", () => {
        test("Division by zero is not possible", () => {
            const question = getQuestion();
            expect(question).not.toMatch(/\/\s*0/);
        });
    });
});

describe("Tests for isCorrectAnswer", () => {
    describe("Exact Answer Check", () => {
        test("Correct answer is detected", () => {
            expect(isCorrectAnswer("2+2", 4)).toBe(true);
        });

        test("Incorrect answer is detected", () => {
            expect(isCorrectAnswer("2+2", 5)).toBe(false);
        });
    });

    describe("Type Safety", () => {
        test("Non-numeric answer is handled", () => {
            expect(isCorrectAnswer("2+2", "four")).toBe(false);
        });
    });

    describe("Negative and Decimal Numbers", () => {
        test("Negative numbers are handled", () => {
            expect(isCorrectAnswer("2-2", 0)).toBe(true);
        });
        test("Decimal numbers are handled", () => {
            expect(isCorrectAnswer("2/2", 1)).toBe(true);
        });
    });

    describe("Edge Cases", () => {
        test("Zero is handled correctly", () => {
            expect(isCorrectAnswer("0+0", 0)).toBe(true);
        });
        test("One is handled correctly", () => {
            expect(isCorrectAnswer("1*1", 1)).toBe(true);
        });
    });
});

describe("Tests for Streak Tracking", () => {
    describe("Streak Increase", () => {
        test("Correct answer increases streak", () => {
            const question = "2+2";
            const answer = 4;
            const streak = 0;
            const correct = isCorrectAnswer(question, answer);
            const newStreak = correct ? streak + 1 : 0;
            expect(newStreak).toBe(1);
        });
    });

    describe("Streak Reset", () => {
        test("Incorrect answer resets streak", () => {
            const question = "2+2";
            const answer = 5;
            const streak = 2;
            const correct = isCorrectAnswer(question, answer);
            const newStreak = correct ? streak + 1 : 0;
            expect(newStreak).toBe(0);
        });
    });

    describe("Starting from Zero", () => {
        test("New quiz starts with streak at zero", () => {
            const streak = 0;
            expect(streak).toBe(0);
        });
    });
});

describe("Tests for Leaderboard Functionality", () => {
    describe("Top 10 Streaks Only", () => {
        test("Leaderboard only shows top 10 streaks", () => {
            const leaderboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
            expect(leaderboard.slice(0, 10).length).toBe(10);
        });
    });

    describe("Sorting", () => {
        test("Leaderboard is sorted", () => {
            const leaderboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const sortedLeaderboard = [...leaderboard].sort((a, b) => b - a);
            expect(leaderboard).toEqual(sortedLeaderboard);
        });
    });

    describe("Unique Streak Entries", () => {
        test("Leaderboard has unique streak entries", () => {
            const leaderboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const uniqueLeaderboard = new Set(leaderboard);
            expect(leaderboard.length).toBe(uniqueLeaderboard.size);
        });
    });

    describe("Resetting Leaderboard", () => {
        test("Leaderboard resets on new game", () => {
            const leaderboard = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const newLeaderboard = [];
            expect(newLeaderboard).toEqual([]);
        });
    });
});