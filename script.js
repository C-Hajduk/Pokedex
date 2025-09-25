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
let startValue = 1;


/* ==============================================
                Content Cards
================================================= */

async function loadPkm() {
   
    for (let index = startValue; index < startValue +9; index++) {
        let response = await fetch("https://pokeapi.co/api/v2/pokemon/" + index);
        let responseAsJson = await response.json();
        allPkm.push(responseAsJson);
        
    }
    console.log(allPkm);
    showPokemon();
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

/* ==============================================
                SCAN Button
================================================= */

/* ==============================================
                RESET Button
================================================= */

/* ==============================================
                Dialog Cards
================================================= */

/* ==============================================
                close Dialog
================================================= */

/* ==============================================
                Load More Pokemon
================================================= */

