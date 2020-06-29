import Trivia from "./trivia.js";
import TriviaView from "./triviaView.js";
export default class triviaController {
    constructor(parent) {
        this.parentElement = parent;
        this.trivia = new Trivia();
        this.triviaView = new TriviaView();
    }

    async init(category) {
        this.getTriviaQuestionsByCategory(category);
    }

    async getTriviaQuestionsByCategory(category){
        let triviaQuestions = await this.trivia.getTriviaQuestions(category);
        this.setQuestion(triviaQuestions[0])
    }

    async setQuestion(triviaQuestion) {
        
    }
}