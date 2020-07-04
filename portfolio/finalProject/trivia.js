import { getJSON } from "./utilities.js";
export default class trivia {
    constructor() {
        this.baseUrl =
          'https://opentdb.com/api.php?amount=10';
        // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
        this.triviaQuestions = [];
    }

    async getTriviaQuestions(category, type) {
        let url = this.baseUrl + type + category;
        console.log(url);
        this.triviaQuestions = await getJSON(url);
        return this.triviaQuestions;
    }
}