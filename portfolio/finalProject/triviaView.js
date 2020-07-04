export default class triviaView {
    constructor() {
        this.answers = [];
        this.question = document.querySelector("#question");
        this.answerSheet = document.querySelector("#answerSheet");
        this.submitted = false;
        this.selected = false;
        this.errors = document.querySelector("#errorDisplay");
    }

    async displayOptions(controller) {
        let category = document.querySelector("#category");
        category.innerHTML =`
        <option value="" default>Any Category</option>
        <option value="&category=9">General Knowledge</option>
        <option value="&category=10">Entertainment: Books</option>
        <option value="&category=11">Entertainment: Film</option>
        <option value="&category=12">Entertainment: Music</option>
        <option value="&category=13">Entertainment: Musicals & Theatres</option>
        <option value="&category=14">Entertainment: Television</option>
        <option value="&category=15">Entertainment: Video Games</option>
        <option value="&category=16">Entertainment: Board Games</option>
        <option value="&category=17">Science & Nature</option>
        <option value="&category=18">Science: Computers</option>
        <option value="&category=19">Science: Mathematics</option>
        <option value="&category=20">Mythology</option>
        <option value="&category=21">Sports</option>
        <option value="&category=22">Geography</option>
        <option value="&category=23">History</option>
        <option value="&category=24">Politics</option>
        <option value="&category=25">Art</option>
        <option value="&category=26">Celebrities</option>
        <option value="&category=27">Animals</option>
        <option value="&category=28">Vehicles</option>
        <option value="&category=29">Entertainment: Comics</option>
        <option value="&category=30">Science Gadgets</option>
        <option value="&category=31">Entertainment: Japanese Anime & Manga</option>
        <option value="&category=32">Entertainment: Cartoon & Animations</option>`
        let selectButton = document.createElement("div");
        selectButton.innerHTML = "START QUIZ";
        selectButton.className = "button";
        selectButton.addEventListener("click", () => {
            document.getElementById("form").style.display = "none";
            let category = document.getElementById("category").value;
            let typeList = document.getElementsByName("type");
            let checkedType;
            for (let type of typeList){
                if (type.checked){
                    checkedType = type.value;
                }
            }
            controller.startGame(category, checkedType);
        })
        document.getElementById("form").appendChild(selectButton);
    }
    async renderQuestions(triviaQuestion){
        this.answers = [...triviaQuestion.incorrect_answers];
        this.answers.push(triviaQuestion.correct_answer);
        this.shuffleArray();
        this.question.innerHTML = `${triviaQuestion.question}`;
        this.answerSheet.innerHTML = "";
        this.answers.forEach(answer => {
            let section = document.createElement("div");
            section.className = "answers";
            section.innerHTML = `${answer}`;
            section.addEventListener("click", (event) =>{
                if (!this.submitted) {
                    let selected = document.getElementsByClassName("selected");
                    if (selected.length > 0){
                        selected[0].className = "answers";
                    }
                    section.className = "selected";
                    this.selected = true;
                    this.errors.innerHTML = "";
                }
            });
            this.answerSheet.appendChild(section);
        });
    }

    async shuffleArray(){
        let length = this.answers.length - 1;
        for(let i = length; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.answers[i];
            this.answers[i] = this.answers[j];
            this.answers[j] = temp;
        }
    }

    async setSubmitted(submitted) {
        this.submitted = submitted;
        if (this.submitted) {
            let answered = document.getElementsByClassName("answers");
            let length = answered.length;
            for (let i = 0; i < length; i++) {
                answered[0].className = "answered";
            }
        }
    }

    async setSelected(selected) {
        this.selected = selected;
    }
    
    async getSelected() {
        return this.selected;
    }

    async displayError(error) {
        this.errors.innerHTML = error;
    }
 }