function generatePokemonTemplate(index) {
    return `
        <div class="pokemon-card">
            <h2><span>#${allPkm[index].id}</span> ${allPkm[index].name}</h2>
            <img src="./assets/logos/${allPkm[index].types[0].type.name}.jpg">
            <div class="pokemon-image ${allPkm[index].types[0].type.name}" >
                <img src="${allPkm[index].sprites.other.showdown.front_default}" loading="lazy">
            </div>
        </div>
    `;
};

function generateFilterPokemonTemplate(indexFilter) {
    return `
        <div class="pokemon-card">
            <h2><span>#${filteredPokemons[indexFilter].id}</span> ${filteredPokemons[indexFilter].name}</h2>            
            <div class="pokemon-image">
                <img src="${filteredPokemons[indexFilter].sprites.other.showdown.front_default}" loading="lazy">
            </div>
        </div>
    `;
};