let searchInputRef = document.getElementById("searchInput");
let searchBtnRef = document.getElementById("searchBtn");
let resetBtnRef = document.getElementById("resetBtn");
let pokemonCounterRef = document.getElementById("pokemonCounter");
let loadingRef = document.getElementById("loading");
let errorMessageRef = document.getElementById("errorMessage");
let pokemonGridRef = document.getElementById("pokemonGrid");
let loadMoreBtnRef = document.getElementById("loadMoreBtn");
let pokemonModalRef = document.getElementById("pokemonModal");
let modalTitleRef = document.getElementById("modalTitle");
let modalInfoRef = document.getElementById("modalInfo");

let allPkm = [];
let filteredPokemons = [];
let startValue = 1;


/* ==============================================
                Content Cards
================================================= */

async function loadPkm() {
   
    for (let index = startValue; index < startValue +20; index++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let responseAsJson = await response.json();
        allPkm.push(responseAsJson); 
    }
    showPokemon();
};

async function filterPkm() {
    for (let indexFilter = startValue; indexFilter < startValue; indexFilter++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + indexFilter);
        let responseAsJson = await response.json();
        filteredPokemons.push(responseAsJson);   
    }
};

function showPokemon() {
    pokemonGridRef.innerHTML = "";

    for (let index = 0; index < allPkm.length; index++) {
        pokemonGridRef.innerHTML += generatePokemonTemplate(index);
    }        
};

/* ==============================================
    Input Feld kann nach ID und Namen suchen
================================================= */


// Such-Button: wenn man auf SCAN klickt, läuft die folgende Funktion
 searchBtnRef.addEventListener("click", function () { // klick-hörer anhängen
    let searchValue = searchInputRef.value.toLowerCase(); // hol den Text aus dem Input, entferne Leerzeichen und mach alles klein

    // suche in allPkm nach Pokémon mit genau gleichem Namen oder ID
    filteredPokemons = allPkm.filter(pokemon => { // durchsuche die geladene Pokémon-Liste
        return pokemon.name.includes(searchValue)  || // wahr, wenn der Name (klein geschrieben) genau übereinstimmt
        pokemon.id.toString() == searchValue   // oder wahr, wenn die ID als Text gleich ist   
    });
        pokemonGridRef.innerHTML = ""; // leere das Grid, damit zuerst nichts angezeigt wird (wir zeigen dann nur Treffer)

// wenn ich den namen oder ID eingebe, dann zeige pokemon
    if (filteredPokemons.length > 0) { //prüft: hat der Benutzer überhaupt etwas geschrieben?               
        for (let indexFilter = 0; indexFilter < filteredPokemons.length; indexFilter++) {
        pokemonGridRef.innerHTML += generateFilterPokemonTemplate(indexFilter); // Code, der ausgeführt wird, wenn die Bedingung wahr ist
        } 

    }else {
        errorMessageRef.innerHTML += `<p>ERROR: POKEMON NOT FOUND IN DATABASE!</p>`; // setze Text der Fehlermeldung
        errorMessageRef.style.display = "block" // zeige die Fehlermeldung an
    }
 });

/* ==============================================
                RESET Button
================================================= */
// RESET-Button: leert das Suchfeld und zeigt wieder alle bereits geladenen Pokémon
resetBtnRef.addEventListener("click", function () {
  searchInputRef.value = ""; // Input-Feld leer machen
  errorMessageRef.style.display = "none" // Fehlermeldung verbergen
  errorMessageRef.innerHTML = "" // Fehlermeldung wieder leeren

  showPokemon(); // alle geladenen Pokémon wieder anzeigen
});

/* ==============================================
                Dialog Cards
================================================= */

/* ==============================================
                close Dialog
================================================= */

/* ==============================================
                Load More Pokemon
================================================= */

