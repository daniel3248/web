let playerName = "";  // Variable para almacenar el nombre del jugador
let currentQuestionIndex = 0;
let score = 0;
const requiredScore = 20;  // Puntuación mínima para pasar al siguiente nivel
let currentLevel = 1;  // Variable para controlar el nivel actual

// Preguntas y respuestas del nivel 1
const quizDataLevel1 = [
    {
        question: "My brother is ___ than me.",
        options: ["tall", "taller", "tallest"],
        correct: "taller"
    },
    {
        question: "This book is ___ than the previous one.",
        options: ["interesting", "more interesting", "most interesting"],
        correct: "more interesting"
    },
    {
        question: "This project is ___ than our last one.",
        options: ["challenging", "more challenging", "most challenging"],
        correct: "more challenging"
    },
    {
        question: "The river is ___ today than yesterday.",
        options: ["calm", "calmer", "calmest"],
        correct: "calmer"
    }
];

// Preguntas y respuestas del nivel 2
const quizDataLevel2 = [
    {
        question: "He is the ___ player on the team.",
        options: ["talented", "talentedest", "most talented"],
        correct: "most talented"
    },
    {
        question: "This is the ___ interesting book I ve ever read.",
        options: ["more", "most interesting", "most"],
        correct: "most interesting"
    },
    {
        question: "This restaurant serves the ___ pizza in town.",
        options: ["tastiest", "tastier", "tasty"],
        correct: "tastiest"
    },
    {
        question: "This book is _ than the last one.",
        options: ["more interesting", "most interesting", "interesting"],
        correct: "most interesting"
    }
];

// Preguntas y respuestas del nivel 3
const quizDataLevel3 = [
    {
        question: "This test was ___ (bad) than the previous one.",
        options: ["badder", "worse", "worst"],
        correct: "worse"
    },
    {
        question: "My sister is ___ (good) at math than I am.",
        options: ["gooder", "better", "best"],
        correct: "better"
    },
    {
        question: "The new school is ___ (far) from my house than the old one.",
        options: ["farther", "farthest", "more far"],
        correct: "farther"
    },
    {
        question: "Of all the students, Sarah is the _ in mathematics.",
        options: ["better", "best", "gooder"],
        correct: "best"
    }
];

// Función para el inicio de sesión con nombre
function login(event) {
    event.preventDefault();  // Evitar que el formulario recargue la página
    playerName = document.getElementById("playerName").value;

    if (playerName.trim() !== "") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("intro-container").style.display = "block";
        document.getElementById("playerDisplayName").textContent = playerName;
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// Función para comenzar el quiz
function startQuiz() {
    document.getElementById("intro-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
    updateScore();
}

// Función para mostrar la pregunta actual
function showQuestion() {
    let quizData;
    if (currentLevel === 1) quizData = quizDataLevel1;
    else if (currentLevel === 2) quizData = quizDataLevel2;
    else if (currentLevel === 3) quizData = quizDataLevel3;

    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Limpiar opciones anteriores

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(option, button); // Pasar el botón a la función
        optionsContainer.appendChild(button);
    });
}

// Función para seleccionar respuesta
function selectAnswer(selectedOption, button) {
    let quizData;
    if (currentLevel === 1) quizData = quizDataLevel1;
    else if (currentLevel === 2) quizData = quizDataLevel2;
    else if (currentLevel === 3) quizData = quizDataLevel3;

    const currentQuestion = quizData[currentQuestionIndex];

    // Determinar si la respuesta es correcta
    if (selectedOption === currentQuestion.correct) {
        score += 10; // Incrementar la puntuación si la respuesta es correcta
        button.classList.add("correct"); // Añadir clase de correcto
    } else {
        button.classList.add("incorrect"); // Añadir clase de incorrecto
    }

    // Deshabilitar todas las opciones después de seleccionar una
    const options = document.getElementById("options").children;
    for (let opt of options) {
        opt.disabled = true; // Deshabilitar los botones
    }

    currentQuestionIndex++; // Avanzar a la siguiente pregunta

    // Esperar un momento antes de mostrar la siguiente pregunta
    setTimeout(() => {
        if (currentQuestionIndex < quizData.length) {
            showQuestion(); // Mostrar la siguiente pregunta
            updateScore(); // Actualizar la puntuación
        } else {
            endLevel(); // Terminar el nivel
        }
    }, 1000); // Espera 1 segundo
}

// Función para actualizar la puntuación en la interfaz
function updateScore() {
    document.getElementById("score").textContent = `Score: ${score}`;
}

// Función para finalizar el nivel
function endLevel() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("level-end-container").style.display = "block";

    const endMessage = score >= requiredScore
        ? `${playerName}, you passed level ${currentLevel}!`
        : `${playerName}, you didn't pass level ${currentLevel}.`;

    document.getElementById("end-message").textContent = endMessage;

    if (score >= requiredScore) {
        document.getElementById("next-level-btn").style.display = "block"; // Mostrar botón para siguiente nivel
    } else {
        document.getElementById("retry-btn").style.display = "block"; // Mostrar botón para repetir el nivel
    }
}

// Función para ir al siguiente nivel
function goToNextLevel() {
    score = 0; // Reiniciar la puntuación
    currentQuestionIndex = 0; // Reiniciar la pregunta
    document.getElementById("level-end-container").style.display = "none"; // Ocultar fin de nivel

    if (currentLevel === 1) {
        document.getElementById("level-intro-container-2").style.display = "block"; // Mostrar introducción del nivel 2
    } else if (currentLevel === 2) {
        document.getElementById("level-intro-container-3").style.display = "block"; // Mostrar introducción del nivel 3
    }
}

// Función para iniciar el nivel 2
function startLevelTwo() {
    currentLevel = 2;
    document.getElementById("level-intro-container-2").style.display = "none"; // Ocultar introducción del nivel 2
    startQuiz(); // Iniciar el quiz del nivel 2
}

// Función para iniciar el nivel 3
function startLevelThree() {
    currentLevel = 3;
    document.getElementById("level-intro-container-3").style.display = "none"; // Ocultar introducción del nivel 3
    startQuiz(); // Iniciar el quiz del nivel 3
}

// Función para reiniciar el nivel
function retryLevel() {
    score = 0; // Reiniciar la puntuación
    currentQuestionIndex = 0; // Reiniciar la pregunta
    document.getElementById("level-end-container").style.display = "none"; // Ocultar fin de nivel
    startQuiz(); // Reiniciar el quiz
}
// Función para mostrar el mensaje de felicitaciones al completar el juego
function showCongratulations() {
    document.getElementById("level-end-container").style.display = "none"; // Ocultar pantalla de finalización de nivel
    document.getElementById("congratulations-container").style.display = "block"; // Mostrar pantalla de felicitaciones
    document.getElementById("player-name").textContent = playerName; // Mostrar nombre del jugador
}

// Modificar endLevel para manejar el final del juego en el nivel 3
function endLevel() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("level-end-container").style.display = "block";

    const endMessage = score >= requiredScore
        ? `${playerName}, you passed level ${currentLevel}!`
        : `${playerName}, you didn't pass level ${currentLevel}.`;

    document.getElementById("end-message").textContent = endMessage;

    if (score >= requiredScore) {
        if (currentLevel === 3) {
            showCongratulations(); // Mostrar pantalla de felicitaciones si es el nivel 3
        } else {
            document.getElementById("next-level-btn").style.display = "block"; // Mostrar botón para siguiente nivel
        }
    } else {
        document.getElementById("retry-btn").style.display = "block"; // Mostrar botón para repetir el nivel
    }
}

function restartGame() {
    // Reiniciar variables
    score = 0;
    currentLevel = 1;
    currentQuestionIndex = 0;
    playerName = "";
    
    // Ocultar pantallas y mostrar la pantalla de ingreso de nombre
    document.getElementById("congratulations-container").style.display = "none";
    document.getElementById("login-container").style.display = "block";
    document.getElementById("playerName").value = ""; // Limpiar el campo de nombre
}
