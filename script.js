const wordPairs = [
    ["алма", "яблоко"],
    ["юл", "дорога"],
    ["чәчәк", "цветок"],
    ["жиләк", "ягода"],
    ["әфлисун", "апельсин"]
];

let currentPair = null;
let isTatarToRussian = true; // Начинаем с перевода с татарского на русский
let correctAnswersCount = 0; // Счетчик правильных ответов
const totalRounds = 10; // Общее количество раундов

function getRandomPair() {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    return wordPairs[randomIndex];
}

function displayWord(word) {
    const wordDiv = document.getElementById("word");
    wordDiv.textContent = word;
}

function displayMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
}

function updateScore() {
    const scoreDiv = document.getElementById("score");
    scoreDiv.textContent = `Правильных ответов: ${correctAnswersCount}/${totalRounds}`;
}

function handleRedButton() {
    if (currentPair) {
        if (isTatarToRussian) {
            displayWord(currentPair[1]); // Показываем русское слово
        } else {
            displayWord(currentPair[0]); // Показываем татарское слово
        }
        setTimeout(() => {
            startNewRound();
        }, 3000);
    }
}

function handleGreenButton() {
    const userInput = document.getElementById("input").value.trim();
    if (currentPair) {
        if (isTatarToRussian) {
            if (userInput.toLowerCase() === currentPair[1].toLowerCase()) {
                correctAnswersCount++;
                displayMessage("Правильно!");
                updateScore();
                setTimeout(() => {
                    displayMessage("");
                    if (correctAnswersCount >= totalRounds) {
                        endGame();
                    } else {
                        isTatarToRussian = !isTatarToRussian;
                        startNewRound();
                    }
                }, 1000);
            } else {
                displayMessage(`Неправильно! (${currentPair[1]})`);
                setTimeout(() => {
                    displayMessage("");
                    isTatarToRussian = !isTatarToRussian;
                    startNewRound();
                }, 1000);
            }
        } else {
            if (userInput.toLowerCase() === currentPair[0].toLowerCase()) {
                correctAnswersCount++;
                displayMessage("Правильно!");
                updateScore();
                setTimeout(() => {
                    displayMessage("");
                    if (correctAnswersCount >= totalRounds) {
                        endGame();
                    } else {
                        isTatarToRussian = !isTatarToRussian;
                        startNewRound();
                    }
                }, 1000);
            } else {
                displayMessage(`Неправильно! (${currentPair[0]})`);
                setTimeout(() => {
                    displayMessage("");
                    isTatarToRussian = !isTatarToRussian;
                    startNewRound();
                }, 1000);
            }
        }
    }
}

function startNewRound() {
    currentPair = getRandomPair();
    if (isTatarToRussian) {
        displayWord(currentPair[0]); // Показываем татарское слово
    } else {
        displayWord(currentPair[1]); // Показываем русское слово
    }
    document.getElementById("input").value = '';
    displayMessage("");
}

function endGame() {
    displayMessage("Поздравляем! Вы правильно ответили на 10 вопросов!");
    displayWord('');
    document.getElementById("input").value = '';
    document.getElementById("input").disabled = true;
    document.querySelector('.green-button').disabled = true;
    document.querySelector('.red-button').disabled = true;
}

// Начать первый раунд
startNewRound();
