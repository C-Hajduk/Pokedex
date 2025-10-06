let searchInputRef = document.getElementById("searchInput");
let searchBtnRef = document.getElementById("searchBtn");
let resetBtnRef = document.getElementById("resetBtn");
let pokemonCounterRef = document.getElementById("pokemonCounter");
let loadingRef = document.getElementById("loading");
let errorMessageRef = document.getElementById("errorMessage");
let pokemonGridRef = document.getElementById("pokemonGrid");
let loadMoreBtnRef = document.getElementById("loadMoreBtn");
let scrollContainerRef = document.getElementById("scrollContainer");
let pokemonModalRef = document.getElementById("pokemonModal");
let modalDialogRef = document.getElementById("modalDialog");
let attacksContainerRef = document.getElementById("attacksContainer")

let allPkm = [];
let filteredPokemons = [];
let startValue = 1;
let maxPokemonToLoad = 15;
let currentPokemonIndex = 0;

/* ==============================================
                Content Cards
================================================= */

async function loadPkm() {
    showLoading(); // Pokeball erscheint

    await new Promise(resolve => setTimeout(resolve, 2000));

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
 searchBtnRef.addEventListener("click", function () { // klicker anhängen
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

 async function openDialog(pokemonIndex) {
    currentPokemonIndex = pokemonIndex;
    // Zeige das Modal-Fenster
    pokemonModalRef.showModal();
    // Hole das Pokemon aus unserer Liste
    let selectedPokemon = allPkm[pokemonIndex];

    // Erstelle einen eindeutigen Schlüssel für dieses Pokemon
    let storageKey = "pokemon_" + selectedPokemon.id;

    // Prüfe: Gibt es gespeicherte Attacken für dieses Pokemon?
    let savedAttackData = JSON.parse(localStorage.getItem(storageKey));

  // 4. Wenn nicht gespeichert → neue Attacken auswählen und laden
    if (!savedAttackData) {
    savedAttackData = { attack1: {}, attack2: {} };

    // Zufällige Attacken-Positionen im Array bestimmen
    let randomIndex1 = Math.floor(Math.random() * selectedPokemon.moves.length);
    let randomIndex2 = Math.floor(Math.random() * selectedPokemon.moves.length);

    // Attacke 1 laden
    let response1 = await fetch(selectedPokemon.moves[randomIndex1].move.url);
    let moveData1 = await response1.json();
    savedAttackData.attack1.name = moveData1.name;
    savedAttackData.attack1.info = moveData1.power || getMoveDescription(moveData1);

    // Attacke 2 laden
    let response2 = await fetch(selectedPokemon.moves[randomIndex2].move.url);
    let moveData2 = await response2.json();
    savedAttackData.attack2.name = moveData2.name;
    savedAttackData.attack2.info = moveData2.power || getMoveDescription(moveData2);

    // Attacken im localStorage speichern
    localStorage.setItem(storageKey, JSON.stringify(savedAttackData));
  }

  // 5. Attacken und Pokémon im Dialog anzeigen
  modalDialogRef.innerHTML = generatePokemonModalTemplate(pokemonIndex, savedAttackData);
  modalDialogRef.className = ""
  modalDialogRef.classList.add("modal-dialog")
  modalDialogRef.classList.add(selectedPokemon.types[0].type.name)

  // 6. Falls man außerhalb des Fensters klickt → schließen
  pokemonModalRef.onclick = function (event) {
    if (event.target === pokemonModalRef) {
      closePokemonModal();
    }
  };
}

// Kleine Hilfsfunktion für Beschreibungstext
function getMoveDescription(moveData) {
  let englishEntry = moveData.flavor_text_entries.find(entry => entry.language.name === "en");
  return englishEntry ? englishEntry.flavor_text : "No description available";
}

/* ==============================================
            next Pokemon Button Dialog
================================================= */

function nextPokemon() {
    currentPokemonIndex++;
    if(currentPokemonIndex >= allPkm.length) {
        currentPokemonIndex = 0;
    }
    openDialog(currentPokemonIndex);
}


/* ==============================================
            next Pokemon Button Dialog
================================================= */

function previousPokemon() {
    currentPokemonIndex--;
    if(currentPokemonIndex < 0) {
        currentPokemonIndex = allPkm.length - 1;
    }
    openDialog(currentPokemonIndex);
}

/* ==============================================
                close Dialog
================================================= */

function closePokemonModal() {
    pokemonModalRef.close();

    modalDialogRef.innerHTML = "";
  }

/* ==============================================
    Loading Spinning anzeigen
================================================= */

function showLoading() {
    loadingRef.style.display = "flex";
    errorMessageRef.style.display = "none";

    pokemonGridRef.classList.add("hidden"); // Verstecke das Pokemon Grid
    
    setTimeout(() => { // nach 50ms (Animationsdauer) wirklich verstecken
        pokemonCounterRef.style.display = "none";
        scrollContainerRef.style.overflow = "clip";
    }, 50);   

    loadMoreBtnRef.disabled = true; // Deaktiviere den Load More Button
}

/* ==============================================
    Loading Spinning verstecken
================================================= */

function hideLoading() {
    loadingRef.style.display = "none";

    pokemonGridRef.style.display = "grid"; // Zeige das Pokemon Grid wieder
    
    setTimeout(() => {
        pokemonGridRef.classList.remove("hidden"); // Aktiviere den Load More Button
    }, 50);
    
    scrollContainerRef.style.overflow = "auto";
    pokemonCounterRef.style.display = "block";

    loadMoreBtnRef.disabled = false;
}