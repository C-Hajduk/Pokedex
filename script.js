/* ==============================================
                Variablen definieren
================================================= */

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

/* ==============================================
                Daten Variablen
================================================= */

let allPkm = []; // Ein leeres Array (Liste), wo ALLE geladenen Pokemon gespeichert werden
let filteredPokemons = []; // Ein leeres Array für gefilterte Pokemon (wenn man nach etwas sucht)
let startValue = 1;// Die Nummer des ersten Pokemon, das wir laden wollen // Beim Start ist das Pokemon #1
let maxPokemonToLoad = 15; // Wie viele Pokemon auf einmal geladen werden sollen // Immer 15 Stück pro "Ladung"
let currentPokemonIndex = 0; // Speichert, welches Pokemon gerade im Popup-Fenster angezeigt wird

/* ==============================================
                FUNKTION: loadPkm()
================================================= */

async function loadPkm() { // "async" bedeutet: Diese Funktion wartet auf Dinge (z.B. Internet-Antworten)
    showLoading(); // Zeigt den Ladebildschirm (Pokeball-Animation) an

    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 Sekunden warten, während der Pokéball pulsiert

    let endValue = startValue + maxPokemonToLoad; // Berechne bis zu welcher Nummer wir laden
   
    // Lade Pokemon eins nach dem anderen
    for (let index = startValue; index < endValue; index++) {  // Hole Daten von der Pokemon-API 
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let responseAsJson = await response.json(); // Wandelt die Antwort in ein nutzbares JavaScript-Objekt um
        allPkm.push(responseAsJson); // Fügt das neue Pokemon zur allPkm-Liste hinzu
    }
    
    startValue = endValue; // Aktualisiere die Start-Nummer für das nächste Mal

    hideLoading(); // Pokeball verschwindet
    showPokemon(); // Zeige alle Pokemon auf dem Bildschirm
    updateCounter(); // Aktualisiere den Counter
};

/* ==============================================
            FUNKTION: filterPkm()
================================================= */

// Zeigt nur die Pokemon, die zur Suche passen
async function filterPkm() {
    for (let indexFilter = startValue; indexFilter < startValue; indexFilter++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + indexFilter);
        let responseAsJson = await response.json();
        filteredPokemons.push(responseAsJson);   
    }
};

/* ==============================================
            FUNKTION: showPokemon()
================================================= */
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
    
    let isNumber = /^\d+$/.test(searchValue); // true, wenn nur Ziffern enthalten sind

    if (!isNumber && searchValue.length < 3) {
        errorMessageRef.innerHTML = `<p>Bitte mindestens 3 Buchstaben eingeben!</p>`;
        errorMessageRef.style.display = "block";
        pokemonGridRef.innerHTML = ""; // Grid leeren
        return; // Abbrechen, Suche nicht ausführen
    }    
    
    // suche in allPkm nach Pokémon mit genau gleichem Namen oder ID
    filteredPokemons = allPkm.filter(pokemon => { // durchsuche die geladene Pokémon-Liste
        return pokemon.name.includes(searchValue)  || // wahr, wenn der Name (klein geschrieben) genau übereinstimmt
        pokemon.id.toString() == searchValue   // oder wahr, wenn die ID als Text gleich ist   
    });
        pokemonGridRef.innerHTML = ""; // leere das Grid, damit zuerst nichts angezeigt wird (wir zeigen dann nur Treffer)
    // Mindestlänge prüfen
// wenn ich den namen oder ID eingebe, dann zeige pokemon
    if (filteredPokemons.length > 0) { //prüft: hat der Benutzer überhaupt etwas geschrieben?               
        for (let indexFilter = 0; indexFilter < filteredPokemons.length; indexFilter++) {
        pokemonGridRef.innerHTML += generateFilterPokemonTemplate(indexFilter); // Code, der ausgeführt wird, wenn die Bedingung wahr ist
        errorMessageRef.style.display = "none";
    } 

    }else { 
        errorMessageRef.innerHTML = `<p>ERROR: POKEMON NOT FOUND IN DATABASE!</p>`; // setze Text der Fehlermeldung
        errorMessageRef.style.display = "block"; // zeige die Fehlermeldung an
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
                FUNKTION: openDialog()
================================================= */

 async function openDialog(pokemonIndex) { // "pokemonIndex" ist die Position des Pokemon in der Liste
    currentPokemonIndex = pokemonIndex; // Speichert, welches Pokemon gerade angezeigt wird // Das brauchen wir für die Vor/Zurück-Buttons
    pokemonModalRef.showModal(); // Öffnet das Popup-Fenster

    let selectedPokemon = allPkm[pokemonIndex]; // Holt das Pokemon aus der Liste

    let storageKey = "pokemon_" + selectedPokemon.id; // Erstelle einen eindeutigen Schlüssel für dieses Pokemon

    let savedAttackData = JSON.parse(localStorage.getItem(storageKey)); // Prüfe: Gibt es gespeicherte Attacken für dieses Pokemon?

    if (!savedAttackData) { // Wenn nicht gespeichert → neue Attacken auswählen und laden
    savedAttackData = { attack1: {}, attack2: {} }; // Erstellt ein neues Objekt für zwei Attacken

    // Zufällige Attacken-Positionen im Array bestimmen
    let randomIndex1 = Math.floor(Math.random() * selectedPokemon.moves.length); // "Math.floor()" rundet nach unten zur nächsten ganzen Zahl
    let randomIndex2 = Math.floor(Math.random() * selectedPokemon.moves.length); // "Math.random()" gibt eine Zufallszahl zwischen 0 und 1

    // Attacke 1 laden
    let response1 = await fetch(selectedPokemon.moves[randomIndex1].move.url); // Holt Details zur ersten Attacke von der API
    let moveData1 = await response1.json(); // Wandelt die Antwort in ein nutzbares Objekt um
    savedAttackData.attack1.name = moveData1.name; // Speichert den Namen der Attacke
    savedAttackData.attack1.info = moveData1.power || getMoveDescription(moveData1); // Speichert die Stärke der Attacke ODER eine Beschreibung // "||" bedeutet: Wenn power existiert, nimm das, sonst nimm die Beschreibung

    // Attacke 2 laden
    let response2 = await fetch(selectedPokemon.moves[randomIndex2].move.url);
    let moveData2 = await response2.json();
    savedAttackData.attack2.name = moveData2.name;
    savedAttackData.attack2.info = moveData2.power || getMoveDescription(moveData2);

    // Attacken im localStorage speichern
    localStorage.setItem(storageKey, JSON.stringify(savedAttackData));
  }

  // Attacken und Pokémon im Dialog anzeigen
  modalDialogRef.innerHTML = generatePokemonModalTemplate(pokemonIndex, savedAttackData);
  modalDialogRef.className = "" // Löscht alle CSS-Klassen vom Modal
  modalDialogRef.classList.add("modal-dialog") // Fügt die Grund-Klasse hinzu
  modalDialogRef.classList.add(selectedPokemon.types[0].type.name)  // Fügt die Typ-Klasse hinzu (z.B. "fire" für Feuer-Pokemon)

  // Falls man außerhalb des Fensters klickt → schließen
  pokemonModalRef.onclick = function (event) {
    if (event.target === pokemonModalRef) {
      closePokemonModal();
    }
  };
}

/* ==============================================
        HILFSFUNKTION: getMoveDescription()
================================================= */
// Holt eine englische Beschreibung für eine Attacke

function getMoveDescription(moveData) { // "moveData" ist das Attacken-Objekt von der API
  let englishEntry = moveData.flavor_text_entries.find(entry => entry.language.name === "en");
    // Sucht nach einer englischen Beschreibung
    // "find()" durchsucht die Liste und gibt das erste passende Element zurück
    // "entry.language.name === "en"" prüft, ob es eine englische Beschreibung ist
  return englishEntry ? englishEntry.flavor_text : "No description available";
    // Gibt die Beschreibung zurück, wenn vorhanden
    // "?" ist der ternäre Operator: "Bedingung ? Wert wenn wahr : Wert wenn falsch"
    // Wenn englishEntry existiert → gibt flavor_text zurück
    // Wenn nicht → gibt "No description available" zurück
}

/* ==============================================
            next Pokemon Button Dialog
================================================= */

function nextPokemon() {
    currentPokemonIndex++;
    if(currentPokemonIndex >= allPkm.length) { // Prüft: Sind wir am Ende der Liste?
        currentPokemonIndex = 0;  // Springt zurück zum ersten Pokemon // Das macht eine Endlos-Schleife durch alle Pokemon
    }
    openDialog(currentPokemonIndex); // Öffnet das Popup mit dem neuen Pokemon
}

/* ==============================================
            next Pokemon Button Dialog
================================================= */

function previousPokemon() {
    currentPokemonIndex--;
    if(currentPokemonIndex < 0) { // Prüft: Sind wir vor dem ersten Pokemon?
        currentPokemonIndex = allPkm.length - 1; // Springt zum letzten Pokemon // "- 1" weil der Index bei 0 startet
    }
    openDialog(currentPokemonIndex);
}

/* ==============================================
                close Dialog
================================================= */

function closePokemonModal() {
    pokemonModalRef.close(); // Schließt das <dialog>-Element // "close()" ist eine eingebaute Funktion

    modalDialogRef.innerHTML = ""; // Löscht den Inhalt des Popups  // Das spart Speicher und verhindert Probleme
  }

/* ==============================================
    Loading Spinning anzeigen
================================================= */

function showLoading() {
    loadingRef.style.display = "flex";
    // Macht den Ladebildschirm sichtbar
    // "flex" ist ein CSS-Layout-Modus
    errorMessageRef.style.display = "none";
    // Versteckt Fehlermeldungen

    pokemonGridRef.classList.add("hidden");
    // Fügt die CSS-Klasse "hidden" hinzu
    // Das versteckt das Pokemon-Grid mit einer Animation
    
    setTimeout(() => { // nach 50ms (Animationsdauer) wirklich verstecken
        pokemonCounterRef.style.display = "none"; // Versteckt den Counter
        scrollContainerRef.style.overflow = "clip"; 
        // Verhindert Scrollen während des Ladens 
        // "overflow: clip" schneidet überstehendem Inhalt ab
    }, 50);   

    loadMoreBtnRef.disabled = true; // Deaktiviere den Load More Button
}

/* ==============================================
    Loading Spinning verstecken
================================================= */

function hideLoading() {
    loadingRef.style.display = "none";

    pokemonGridRef.style.display = "grid"; // Zeige das Pokemon Grid wieder
    
    setTimeout(() => { // Wartet 50 Millisekunden für die Animation
        pokemonGridRef.classList.remove("hidden"); 
        // Entfernt die "hidden"-Klasse
        // Das aktiviert die Einblend-Animation
    }, 50);
    
    scrollContainerRef.style.overflow = "auto"; // Erlaubt wieder Scrollen // "auto" zeigt Scrollbars, wenn nötig
    pokemonCounterRef.style.display = "block"; // Zeigt den Counter wieder an

    loadMoreBtnRef.disabled = false;
    // Aktiviert den "LOAD MORE"-Button wieder
}