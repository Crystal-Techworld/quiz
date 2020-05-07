const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


//To test the functionality of the functions
//console.log(question);
//console.log(choices);

//To declare some parameters that will be used in this quiz
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//To set all 5 questions
let questions = [
    {
        question: "To get a document with a specific class from HTML usng javascript, the code to use is?",
        choice1: "document.getElementById",
        choice2: "document.getElementByClassName",
        choice3: "document.getElementtByClassname",
        answer: 2
    }, 
    {
        question: "Who is the current president of Nigeria?",
        choice1: "Abba Kyari",
        choice2: "Boss Mustapha",
        choice3: "Muhammadu Buhari",
        answer: 3
    },
    {
        question: "What symbol is used to declare an object?",
        choice1: "Curly brackets { }",
        choice2: "Square brackets [ ]",
        choice3: "parentheses ( )",
        answer: 1
    },
    {
        question: "Who is the mentor in-charge of Javascript on HNG 7?",
        choice1: "Khris",
        choice2: "Xylus",
        choice3: "Jeff",
        answer: 3
    },
    {
        question: "What is the output of 2 + 5 + '' + 'HNG' ?",
        choice1: "25 HNG",
        choice2: "7 HNG",
        choice3: "7HNG",
        answer: 2
    },
    {
        question: "Who is Neymar, Messi, Ronaldo and Moses to you",
        choice1: "Player",
        choice2: "Footballer",
        choice3: "Clowns",
        answer: 2
    },
    {
        question: "Frontend Track includes the following except",
        choice1: "PHP",
        choice2: "Javascript",
        choice3: "CSS",
        answer: 1
    },
];

//Constants
const POINT_VALUE =  5;
const MAX_QUESTIONS = 5;

//function to start the quiz
startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    game.classList.remove("hidden");
    loader.classList.add("hidden");
    getNewQuestion();
};

//function to move to new question
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS)
    {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("end.html");
        //This will send user to the last page when user has answered 5 questions 
    }
    questionCounter++;
    //This will determine the progress bar
  progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;

  //this will update the progress bar as user continues the quiz
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
  
  //this shows the each question per page from question array
    const questionIndex = Math.floor(Math.random () * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
//This will show choices for each question
    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion ["choice" + number];
    });

//this code will separate out questions that has been used
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
//this will log choice chosen by the user
choices.forEach(choice => {
    choice.addEventListener("click", e => {
      if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply);

    //code line to increase point for each correct score
         if (classToApply === "correct") {
            incrementScore(POINT_VALUE);
       }

        selectedChoice.parentElement.classList.add(classToApply);
    //this section is to remove the class(correct/incorrect) almost immediately
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            //getNewQuestion(); if this is included, clicking an option will move to the next question
        }, 5000 );
      
    });
    
});
    
    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    };

    startQuiz();