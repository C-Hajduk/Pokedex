function generatePokemonTemplate(index) {
    return `
        <div class="pokemon-card">
            <div class="header-card-wrapper">
                <h2><span>#${allPkm[index].id}</span> ${allPkm[index].name}</h2>
                <img src="./assets/logos/${allPkm[index].types[0].type.name}.jpg">
            </div>
            <div class="pokemon-image ${allPkm[index].types[0].type.name}" >
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

function generatePokemonModalTemplate() {
    return `
            
    `
}