function generatePokemonTemplate(index) {
    return `
        <div class="pokemon-card">
            <h2>${allPkm[index].name}</h2>
            <div class="pokemon-image">
                <img src="${allPkm[index].sprites.other.showdown.front_default}">
            </div>
        </div>
    `;
};