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
let maxPokemonToLoad = 15;
// let typeOfKind = [];


/* ==============================================
                Content Cards
================================================= */

async function loadPkm() {
    showLoading(); // Pokeball erscheint

    let endValue = startValue + maxPokemonToLoad; // Berechne bis zu welcher Nummer wir laden
   
    // Lade Pokemon eins nach dem anderen
    for (let index = startValue; index < endValue; index++) {  // Hole Daten von der Pokemon-API 
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let responseAsJson = await response.json();
        allPkm.push(responseAsJson); // Füge das Pokemon zu unserer Liste hinzu
    }
    
    startValue = endValue; // Aktualisiere die Start-Nummer für das nächste Mal

    hideLoading(); // Pokeball verschwindet
    showPokemon(); // Zeige alle Pokemon auf dem Bildschirm
    updateCounter(); // Aktualisiere den Counter
};

// Zeigt nur die Pokemon, die zur Suche passen
async function filterPkm() {
    for (let indexFilter = startValue; indexFilter < startValue; indexFilter++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + indexFilter);
        let responseAsJson = await response.json();
        filteredPokemons.push(responseAsJson);   
    }
};

// Diese Funktion zeigt alle geladenen Pokemon im Grid
function showPokemon() {
    pokemonGridRef.innerHTML = ""; // Leere zuerst das Grid (alte Karten entfernen)

    for (let index = 0; index < allPkm.length; index++) { // Gehe durch alle Pokemon in der Liste
        pokemonGridRef.innerHTML += generatePokemonTemplate(index); // Erstelle eine Karte für jedes Pokemon und füge sie hinzu
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
                Counter aktualisieren
================================================= */
// Zeigt an, wie viele Pokemon geladen wurden
function updateCounter() {
    let number = allPkm.length;
    pokemonCounterRef.innerHTML += `<span>POKEMON LOADED: ${number} / 1302</span>`
}

/* ==============================================
                Load More Pokemon
================================================= */

loadMoreBtnRef.addEventListener("click", function () {
    pokemonCounterRef.innerHTML = ""
    loadPkm();
})

/* ==============================================
                Dialog Cards
================================================= */

/* function openDialog(index) {
    allPkm = index;
    pokemonModalRef.showModal();
} */

/* ==============================================
                close Dialog
================================================= */


/* ==============================================
    Loading Spinning anzeigen und verstecken
================================================= */

function showLoading() {
    loadingRef.style.display = "block";
    errorMessageRef.style.display = "none";

    // Verstecke das Pokemon Grid
    pokemonGridRef.classList.add("hidden");
    // Deaktiviere den Load More Button
    loadMoreBtnRef.disabled = true;
}

function hideLoading() {
    loadingRef.style.display = "none";

    // Zeige das Pokemon Grid wieder
    pokemonGridRef.classList.remove("hidden");
    // Aktiviere den Load More Button
    loadMoreBtnRef.disabled = false;
}







