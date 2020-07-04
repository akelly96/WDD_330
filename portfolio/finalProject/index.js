import triviaController from "./triviaController.js";
let controller = new triviaController(document.getElementById("triviaQuestions"));
controller.init(controller);
