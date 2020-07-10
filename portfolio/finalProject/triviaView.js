export default class triviaView {
    constructor() {
        this.answers = [];
        this.question = document.querySelector("#question");
        this.answerSheet = document.querySelector("#answerSheet");
        this.submitted = false;
        this.selected = false;
        this.errors = document.querySelector("#errorDisplay");
        this.score = document.querySelector("#score");
        this.results = document.querySelector("#results");
    }

    async displayOptions(controller) {
        let category = document.querySelector("#category");
        let radio = document.querySelector("#radio");
        let changed = false;
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
        <option value="&category=31">Entertainment: Japanese Anime & Manga</option>;
        <option value="&category=32">Entertainment: Cartoon & Animations</option>`
        
        radio.innerHTML = `
        <input type="radio" name="type" value="" id="any" checked/>
        <label for="any">Any Type</label><br/>
        <input type="radio" name="type" value="&type=multiple" id="multiple"/>
        <label for="multiple">Multiple Choice</label><br/>
        <input type="radio" name="type" value="&type=boolean" id="boolean"/>
        <label for="boolean">True/False</label`;

        category.addEventListener("change", () => {
            let value = parseInt(category.value.substring(10));
            switch (value){
                case 10:
                case 13:
                case 16:
                case 25:
                case 26:
                case 29:
                case 30:
                    radio.innerHTML = `
                    <input type="radio" name="type" value="&type=multiple" id="multiple" checked/>
                    <label for="multiple">Multiple Choice</label><br/>
                    `
                    changed = true;
                    break;
                default:
                    if (changed) {
                        radio.innerHTML = `
                        <input type="radio" name="type" value="" id="any" checked/>
                        <label for="any">Any Type</label><br/>
                        <input type="radio" name="type" value="&type=multiple" id="multiple"/>
                        <label for="multiple">Multiple Choice</label><br/>
                        <input type="radio" name="type" value="&type=boolean" id="boolean"/>
                        <label for="boolean">True/False</label>
                        `
                        changed = false;
                    }
                    break;
            }
        });
        
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
        });
        document.getElementById("form").appendChild(selectButton);
    }
    async renderQuestions(triviaQuestion){
        this.answers = [];
        if (triviaQuestion.type != "boolean"){
            this.answers = [...triviaQuestion.incorrect_answers];
            this.answers.push(triviaQuestion.correct_answer);
            this.shuffleArray();
        } else {
            this.answers[0] = "True";
            this.answers[1] = "False";
        }
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
            const j = Math.floor(Math.random() * (i + 1));
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
    
    async setScore(correct) {
        this.score.innerHTML = `SCORE: ${correct} / 10`;
        this.score.style.display = "block";
    }

    async displayResults(parent, correct) {
        parent.style.display = "none";
        this.score.style.display = "none";
        
        let mainMenu = document.createElement("div");
        mainMenu.classList = "button";
        mainMenu.innerHTML = "<p class='buttonText'>MAIN MENU</p>";
        mainMenu.addEventListener("click", () => {
            this.results.innerHTML = "";
            document.querySelector("#form").style.display = "block";
        });

        let finalScore = document.createElement("div");
        finalScore.innerHTML = `
        <h2>FINAL SCORE</h2>
        <h3>${correct} / 10</h3>`;
        this.results.appendChild(finalScore);
        this.results.appendChild(mainMenu);
    }
 }