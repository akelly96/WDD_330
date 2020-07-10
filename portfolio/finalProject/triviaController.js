import Trivia from "./trivia.js";
import TriviaView from "./triviaView.js";
export default class triviaController {
    constructor(parent) {
        this.parentElement = parent;
        this.trivia = new Trivia();
        this.triviaView = new TriviaView();
        this.triviaQuestions = [];
        this.questionTracker = 0;
        this.selected = false;
        this.correct = 0;
        this.buttonsCreated = false;
    }

    async init(controller) {
        this.triviaView.displayOptions(controller);
    }

    async startGame(category, type) {
        let loading = document.getElementById("loading");
        loading.innerHTML = "LOADING...";
        await this.getTriviaQuestionsByCategory(category, type);
        if (this.triviaQuestions) {
            await this.triviaView.setScore(this.correct);
            this.parentElement.style.display = "block";
            if (!this.buttonsCreated){
                this.addButtons();
                this.buttonsCreated = true;
            } else {
                document.getElementById("submitAnswer").style.display = "inline-block";
            }
        }
        loading.innerHTML = "";
    }

    async getTriviaQuestionsByCategory(category, type){
        this.triviaQuestions = await this.trivia.getTriviaQuestions(category, type);
        if (this.triviaQuestions){
            this.triviaView.renderQuestions(this.triviaQuestions.results[this.questionTracker]);
        }
    }
    
    async addButtons() {
        let submitButton = document.createElement("div");
        submitButton.id = "submitAnswer";
        submitButton.classList = "button";
        submitButton.innerHTML = "<p class='buttonText'>SUBMIT ANSWER</p>";

        let nextButton = document.createElement("div");
        nextButton.classList = "button";
        nextButton.innerHTML = "<p class='buttonText'>NEXT QUESTION</p>";
        nextButton.style.display = "none";

        
        let resultsButton = document.createElement("div");
        resultsButton.classList = "button";
        resultsButton.innerHTML = "<p class='buttonText'>VIEW RESULTS</p>";
        resultsButton.style.display = "none";

        submitButton.addEventListener("click", async () => {
            this.selected = await this.triviaView.getSelected();
            if (this.questionTracker < 10 && this.selected){
                submitButton.style.display = "none";
                let correct_answer = document.createElement("div");
                correct_answer.innerHTML = `${this.triviaQuestions.results[this.questionTracker].correct_answer}`;
                let selected = document.querySelector(".selected");
                if (selected.innerHTML === correct_answer.innerHTML) {
                    selected.className = "correct";
                    this.correct++; 
                } else {
                    selected.className = "incorrect";
                    let answers = document.getElementsByClassName("answers");
                    for (let answer of answers) {
                        if (answer.innerHTML == correct_answer.innerHTML) {
                            answer.className = "correct";
                        }
                    }
                }
                this.questionTracker++;
                this.triviaView.setSubmitted(true);
                this.triviaView.setScore(this.correct);
            } else if (!this.selected) {
                let error = "Please select an answer!"
                this.triviaView.displayError(error)
            }

            if (this.questionTracker < 10 && this.selected) {
                nextButton.style.display = "inline-block";
            } else if (this.selected) {
                resultsButton.style.display = "inline-block";
            }
        });

        nextButton.addEventListener("click", () => {
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
            this.triviaView.renderQuestions(this.triviaQuestions.results[this.questionTracker]);
            this.triviaView.setSubmitted(false);
            this.triviaView.setSelected(false);
        });

        resultsButton.addEventListener("click", () => {
            this.triviaView.displayResults(this.parentElement, this.correct);
            resultsButton.style.display = "none";
            this.resetGame();
        })

        this.parentElement.appendChild(submitButton);
        this.parentElement.appendChild(nextButton);
        this.parentElement.appendChild(resultsButton);
    }

    async resetGame() {
        this.triviaQuestions = [];
        this.questionTracker = 0;
        this.selected = false;
        this.correct = 0;
        this.triviaView.setSubmitted(false);
        this.triviaView.setSelected(false);
    }
}