import triviaController from "./triviaController.js";
let controller = new triviaController(document.getElementById("triviaQuestions"));
let selectButton = document.createElement("button");
selectButton.innerHTML = "START QUIZ";
selectButton.addEventListener("click", () => {
    document.getElementById("form").style.display = "none";
    let category = document.getElementById("category").value;
    controller.init(category);
})
document.getElementById("form").appendChild(selectButton);