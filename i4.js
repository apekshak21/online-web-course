// Smooth Scroll Function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Define an object for quiz questions for each lesson
const quizQuestions = {
    html: [
        
        {
            question: "Which of the following is the correct HTML element for inserting a line break?",
            options: ["<lb>", "<break>", "<line>", "<br>"],
            correctAnswer: "<br>"
          },
          {
            question: "Which is not a list tags?",
            options: ["<li>", "<hr>", "<ol>", "<ul>"],
            correctAnswer: "<hr>"
          },
          {
            question: "Which attribute is used to specify the destination of a link in the <a> tag?",
            options: ["href", "url", "src", "link"],
            correctAnswer: "href"
          },
          {
              question: "Which HTML attribute is used to define the background color of a webpage?",
              options: ["style", "background", "bgcolor", "color"],
              correctAnswer: "bgcolor"
            },
            {
              question: "Which of the following tags is used to create a table in HTML?",
              options: ["<thead>", "<tbody>", "<table>", "<tr>"],
              correctAnswer: "<table>"
            },
      
        // Add more HTML questions here
    ],
    css: [
        {
            question: "Which property is used to change the text color of an element?",
            options: ["font-color", "color", "text-color", "foreground"],
            correctAnswer: "color"
        },
        {
            question: "What is the default value of the position property in CSS?",
            options: ["relative", "absolute", "fixed", "static"],
            correctAnswer: "static"
        },
        {
            question: "Which property is used to control the spacing between the elements? ",
            options: ["margin", "padding", "spacing", "border"],
            correctAnswer: "margin"
        },
        {
            question: "Which of the following units is relative to the font size of the element?",
            options: ["px", "em", "pt", "cm"],
            correctAnswer: "em"
        },
        {
            question: "How do you apply a style to all <p> elements in a CSS file?",
            options: ["p{..}", "all p{..}", ".p{..}", "#p{..}"],
            correctAnswer: "p{..}"
        },
       
        // Add more CSS questions here
    ],
    js: [
        {
            question: "Which of the following is a primitive data type in JavaScript?",
            options: ["Function", "String", "Array", "Object"],
            correctAnswer: "String>"
        },
        {
            question: "What will the output of console.log(false == '0'); be?",
            options: ["True", "false", "undefined", "NaN"],
            correctAnswer: "True"
        },
        {
            question: "Which method is used to remove the last element from an array in JavaScript?",
            options: ["delete()", "slice()", "pop()", "shift()"],
            correctAnswer: "pop()"
        },
        {
            question: "Which of the following is used to handle exceptions in JavaScript?",
            options: ["if/else", "switch/case", "try/catch", "for/while"],
            correctAnswer: "try/catch"
        },
        {
            question: "Which statement is used to stop a loop in JavaScript?",
            options: ["return", "exit", "stop", "break"],
            correctAnswer: "break"
        },
        // Add more JavaScript questions here
    ]
};

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let currentLesson;

// Function to start the quiz
function startQuiz(lesson) {
    currentLesson = lesson;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;

    document.getElementById("quiz-title").innerText = `Quiz for ${lesson.toUpperCase()}`;
    document.getElementById("quiz-container").style.display = "block";
    document.getElementById("start-button").style.display = "block";
    document.getElementById("next-button").style.display = "none";
    document.getElementById("start-button").innerText = "Start Quiz";
    document.getElementById("timer").textContent = timeLeft;

    // Smoothly scroll to quiz section
    document.querySelector('#section2').scrollIntoView({ behavior: 'smooth' });

    document.getElementById("start-button").onclick = function () {
        this.style.display = "none";
        displayQuestion();
        startTimer();
    };
}

// Function to display a question and its options
function displayQuestion() {
    const currentQuestion = quizQuestions[currentLesson][currentQuestionIndex];
    const questionText = document.getElementById("question-text");
    const answerButtons = document.getElementById("answer-buttons");

    // Clear previous question and answer options
    questionText.innerHTML = "";
    answerButtons.innerHTML = "";

    // Display the current question
    questionText.innerHTML = currentQuestion.question;

    // Create answer buttons for each option
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("answer-button");
        answerButtons.appendChild(button);

        // Add click event listener to check the answer
        button.addEventListener("click", function () {
            checkAnswer(option);
        });
    });

    document.getElementById("next-button").style.display = "none";
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentLesson][currentQuestionIndex];

    // Check if the selected answer is correct
    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
    }

    // Move to the next question or end the quiz if all questions are answered
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions[currentLesson].length) {
        document.getElementById("next-button").style.display = "block";
        document.getElementById("next-button").onclick = displayQuestion;
    } else {
        endQuiz();
    }
}

// Function to start the timer
function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;

        // Update the timer text
        document.getElementById("timer").textContent = timeLeft;

        // End the quiz if time runs out
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// Function to end the quiz
function endQuiz() {
    // Stop the timer
    clearInterval(timerInterval);

    // Calculate the score percentage
    const scorePercentage = (score / quizQuestions[currentLesson].length) * 100;

    // Display the final score
    const questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = `
        <h3>Quiz Completed!</h3>
        <h4>Your Score: ${score} out of ${quizQuestions[currentLesson].length}</h4>
        <h4>Score Percentage: ${scorePercentage}%</h4>
    `;
    document.getElementById("next-button").style.display = "none";
}
