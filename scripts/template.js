function generatePokemonTemplate(index) {
    return `
        <div class="pokemon-card">
            <div class="header-card-wrapper">
                <h2><span>#${allPkm[index].id}</span> ${allPkm[index].name}</h2>
                <img src="./assets/logos/${allPkm[index].types[0].type.name}.jpg">
            </div>
            <div onclick="openDialog(${[index]})" class="pokemon-image ${allPkm[index].types[0].type.name}" >
                <img src="${allPkm[index].sprites.other.showdown.front_default}" loading="lazy">
            </div>
        </div>
    `;
};

function generateFilterPokemonTemplate(indexFilter) {
    return `
        <div class="pokemon-card">
            <div class="header-card-wrapper">
                <h2><span>#${filteredPokemons[indexFilter].id}</span> ${filteredPokemons[indexFilter].name}</h2>
                <img src="./assets/logos/${filteredPokemons[indexFilter].types[0].type.name}.jpg">
            </div>          
            <div class="pokemon-image ${filteredPokemons[indexFilter].types[0].type.name}">
                <img src="${filteredPokemons[indexFilter].sprites.other.showdown.front_default}" loading="lazy">
            </div>
        </div>
    `;
};

function generatePokemonModalTemplate(pokemon) {
    return `
        <div class="pokemon-header">
                <span id="pokemonName" class="pokemon-name">Pikachu</span>
                <div class="pokemon-hp-type">
                    <span id="pokemonHP">50 HP</span>
                    <span id="pokemonType" class="type-badge">ELECTRIC</span>
                </div>
            </div>

            <div class="pokemon-image-dialog">
                <img id="pokemonImg" src="" alt="Pokemon">
            </div>

            <div class="pokemon-stats">
                <div class="stat-item">
                    <span id="pokemonLength" class="stat-label">Length:</span>
                </div>
                <div class="stat-item">
                    <span id="pokemonWeight" class="stat-label">Weight:</span>
                </div>
            </div>

            <div class="attacks-container">
                <div class="attack-item">
                    <div id="attack1" class="attack-name">Attack 1</div>
                    <div id="attackPower" class="attack-power">-</div>
                </div>
                <div class="attack-item">
                    <div id="attack2" class="attack-name">Attack 2</div>
                    <div id="attackPower" class="attack-power">-</div>
                </div>
            </div>        
    `
}