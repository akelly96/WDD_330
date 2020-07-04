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
    }

    async init(controller) {
        this.triviaView.displayOptions(controller);
    }

    async startGame(category, type) {
        let loading = document.getElementById("loading");
        loading.innerHTML = "LOADING...";
        await this.getTriviaQuestionsByCategory(category, type);
        this.parentElement.style.display = "block";
        loading.innerHTML = "";
        this.addButtons();
    }

    async getTriviaQuestionsByCategory(category, type){
        this.triviaQuestions = await this.trivia.getTriviaQuestions(category, type);
        this.triviaView.renderQuestions(this.triviaQuestions.results[this.questionTracker], this.parentElement);
    }
    
    async addButtons() {
        let submitButton = document.createElement("div");
        submitButton.classList = "button";
        submitButton.innerHTML = "<p class='buttonText'>SUBMIT ANSWER</p>"

        let nextButton = document.createElement("div");
        nextButton.classList = "button";
        nextButton.innerHTML = "<p class='buttonText'>NEXT QUESTION</p>";
        nextButton.style.display = "none";

        submitButton.addEventListener("click", async () => {
            this.selected = await this.triviaView.getSelected();
            if (this.questionTracker < 10 && this.selected){
                submitButton.style.display = "none";
                nextButton.style.display = "inline-block";
                let correct_answer = document.createElement("div");
                correct_answer.innerHTML = `${this.triviaQuestions.results[this.questionTracker].correct_answer}`;
                let selected = document.querySelector(".selected");
                if (selected.innerHTML === correct_answer.innerHTML) {
                    selected.className = "correct"; 
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
            } else if (!this.selected) {
                let error = "Please select an answer!"
                this.triviaView.displayError(error)
            } else {

            }
        });

        nextButton.addEventListener("click", () => {
            nextButton.style.display = "none";
            if (this.questionTracker < 10) {
                submitButton.style.display = "inline-block";
                this.triviaView.renderQuestions(this.triviaQuestions.results[this.questionTracker], this.parentElement);
            } else {

            }
            this.triviaView.setSubmitted(false);
            this.triviaView.setSelected(false);
        });

        this.parentElement.appendChild(submitButton);
        this.parentElement.appendChild(nextButton);
    }
}