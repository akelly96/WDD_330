let api = "https://swapi.dev/api/films";
fetch(api)
.then( function(response) {
    if(response.ok) {
        return response;
    }
    throw Error(response.statusText);
})
.then(response => response.json())
.then(function(data) {
    console.log("test")
    let movies = document.createElement("div");
    movies.id = "movies";
    let heading = document.createElement("h1");
    heading.innerHTML = "Star Wars Movies"
    let subHeading = document.createElement("h3");
    subHeading.innerHTML = "Select a movie to view its characters";
    movies.appendChild(heading);
    movies.appendChild(subHeading);
    data.results.forEach(result => {
        let movieTitle = document.createElement("div");
        movieTitle.className = "movieTitles";
        movieTitle.innerHTML = `<p>${result.title}</p>`;
        movieTitle.addEventListener("click", () => {
            document.getElementById("movies").style.display = "none";
            getCharacters(result.characters, result.title)
            
        })
        movies.appendChild(movieTitle);
    })
    document.body.appendChild(movies);
})
.catch(error => console.log("Film Error!"))

function getCharacters(characters, title) {
    let characterList = document.createElement("div");
    characterList.id = "characterList";
    let backButton = document.createElement("button");
    backButton.innerHTML = "GO BACK TO MOVIES";
    backButton.addEventListener("click", () => {
        var element = document.getElementById("characterList")
        element.parentElement.removeChild(element);
        document.getElementById("movies").style.display = "block";
    });
    characterList.appendChild(backButton);
    let heading = document.createElement("h1");
    heading.innerHTML = `Characters From '${title}'`;
    let subHeading = document.createElement("h3");
    subHeading.innerHTML = "Select a character for more details";
    characterList.appendChild(heading);
    characterList.appendChild(subHeading);
    characters.forEach(character => {
        character = character.replace(/http/g, "https");
        fetch(character)
        .then( function(response) {
            if(response.ok) {
                return response;
            }
            throw Error(response.statusText);
        })
        .then(response => response.json())
        .then(function(data){
            var character = document.createElement("div");
            character.className = "characters" 
            character.addEventListener("click", () => {
                document.getElementById("characterList").style.display = "none";
                displayCharacterInfo(data);
            })
            character.innerHTML = `<p>${data.name}</p>`;
            characterList.appendChild(character);
            document.body.appendChild(characterList);
        })
        .catch(error => console.log("Character Error!"))
    })
}

function displayCharacterInfo(character) {
    let singleCharacter = document.createElement("div");
    singleCharacter.id = "singleCharacter";
    let characterInfo = document.createElement("div");
    characterInfo.id = "characterInfo";                    
    let backButton = document.createElement("button");
    backButton.innerHTML = "GO BACK TO CHARACTERS";
    backButton.addEventListener("click", () => {
        var element = document.getElementById("singleCharacter")
        element.parentElement.removeChild(element);
        document.getElementById("characterList").style.display = "block";
    });
    singleCharacter.appendChild(backButton);
    characterInfo.innerHTML = `
        <h1>${character.name}</h1>
        <p>Gender: ${character.gender}</p>
        <p>Birth Year: ${character.birth_year}</p>
        <p>Height: ${Math.floor(character.height / 30)}' ${character.height % 12}"</p>
        <p>Eye Color: ${character.eye_color}</p>
        <p>Hair Color: ${character.hair_color}
    `;
    singleCharacter.appendChild(characterInfo);
    document.body.appendChild(singleCharacter);
}