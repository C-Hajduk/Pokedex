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

function generatePokemonModalTemplate(pokemonIndex, savedAttackData) {
    let selectedPokemon = allPkm[pokemonIndex];
    return `
        <div class="pokemon-header">
                <span class="pokemon-name">${selectedPokemon.name}</span>
                <div class="pokemon-hp-type">
                    <span class="pokemon-HP">HP ${selectedPokemon.stats[0].base_stat}</span>
                    <img src="./assets/logos/${selectedPokemon.types[0].type.name}.jpg" class="pokemon-type">
                </div>
            </div>

            <div class="pokemon-image-dialog">
                <img src="${selectedPokemon.sprites.other['official-artwork'].front_default}" alt="Pokemon">
            </div>

            <div class="pokemon-stats">
                <span>Nr.${selectedPokemon.id} ${selectedPokemon.name}</span>
                <div class="stat-item">
                    <span class="stat-label">Height: ${selectedPokemon.height}m</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Weight: ${selectedPokemon.weight}kg</span>
                </div>
            </div>

            <div id="attacksContainer" class="attacks-container">
                <div class="attack-item">
                    <div class="attack-name">${savedAttackData.attack1.name}</div>
                    <div class="attack-power">${savedAttackData.attack1.info}</div>
                </div>
                <div class="attack-item">
                    <div class="attack-name">${savedAttackData.attack2.name}</div>
                    <div class="attack-power">${savedAttackData.attack2.info}</div>
                </div>
            </div>        
    `
}