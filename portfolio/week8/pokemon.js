let api = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";
function displayPokemonList(currentAPI) {
    fetch(currentAPI)
    .then(function(response) {
        if(response.ok) {
            return response;
        }
        throw Error(response.statusText);
    })
    .then(response => response.json())
    .then((data)=> {
        let pokemonList = document.createElement("div");
        pokemonList.innerHTML = "<h1>Pokemon Characters</h1>"
        pokemonList.id = "pokemonList";
        data.results.forEach(result => {
            let pokemon = document.createElement("div");
            pokemon.className = "pokemonName";
            pokemon.innerHTML = `<p>${result.name}</p>`
            pokemon.addEventListener("click", () => {
                document.getElementById("pokemonList").style.display = "none";
                displayCharacterInfo(result.url);
            })
            pokemonList.appendChild(pokemon)
        })
        let navigationButtons = document.createElement("div");
        let previous = document.createElement("button");
        let next = document.createElement("button");
        previous.innerHTML = "PREVIOUS";
        next.innerHTML = "NEXT"
        navigationButtons.id = "navigationButtons";
        previous.id = "previous";
        next.id = "next";
        previous.addEventListener("click", () =>{
            if (data.previous == "https://pokeapi.co/api/v2/pokemon?offset=836&limit=64"){
                data.previous = "https://pokeapi.co/api/v2/pokemon?offset=800&limit=100";
            }
            if (data.previous && (data.previous).includes("limit=100")){
                let element = document.getElementById("pokemonList")
                if(element){
                    document.body.removeChild(element)
                }
                displayPokemonList(data.previous);
            }
        });
        next.addEventListener("click", () =>{
            if (data.next){
                let element = document.getElementById("pokemonList")
                if(element){
                    document.body.removeChild(element)
                }
                displayPokemonList(data.next);
            }
        });
        navigationButtons.appendChild(previous);
        navigationButtons.appendChild(next);
        pokemonList.appendChild(navigationButtons);
        document.body.appendChild(pokemonList);
    })
    .catch(error => console.log("There was an error while getting characters!"));    
}

function displayCharacterInfo(URL) {
    fetch(URL)
    .then(function(response) {
        if(response.ok) {
            return response;
        }
        throw Error(response.statusText);
    })
    .then(response => response.json())
    .then(data => {
        let pokemonInfo = document.createElement("div");
        let singlePokemon = document.createElement("div");
        singlePokemon.id = "singlePokemon";
        pokemonInfo.id = "pokemonInfo";
        let backButton = document.createElement("button");
        backButton.innerHTML = "VIEW ALL POKEMON";
        backButton.addEventListener("click", () => {
            let element = document.getElementById("singlePokemon");
            element.parentElement.removeChild(element);
            document.getElementById("pokemonList").style.display = "block";
        });
        singlePokemon.appendChild(backButton);

        pokemonInfo.innerHTML += `<h2>${(data.name).toUpperCase()}</h2><h3>Abilities</h3>`;
        let abilities = document.createElement("ul");
        data.abilities.forEach(ability =>{
            abilities.innerHTML += `<li>${ability.ability.name}</li>`
        })
        pokemonInfo.appendChild(abilities);
        let hp = document.createElement("div");
        hp.innerHTML = `<h3>Experience</h3><p>${data.stats[0].base_stat} ${(data.stats[0].stat.name).toUpperCase()}</p>`
        pokemonInfo.appendChild(hp);
        let weight = document.createElement("div");
        weight.innerHTML = `<h3>Weight</h3><p>${data.weight * 0.0625} lbs</p>`;
        pokemonInfo.appendChild(weight);
        singlePokemon.appendChild(pokemonInfo);
        document.body.appendChild(singlePokemon);
    })
    .catch(error => console.log("There was an error in character display function"));
}
displayPokemonList(api);