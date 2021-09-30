const poke_container = document.getElementById('poke-container');
const pokemon_count = 151;
const colors = {
    fire: '#ea7a3c',
    grass: '#71c558',
    electric: '#e5c531',
    water: '#539ae2',
    ground: '#cc9f4f',
    rock: '#b2a061',
    fairy: '#e397d1',
    poison: '#b468b7',
    bug: '#94bc4a',
    dragon: '#6a7baf',
    psychic: '#e5709b',
    flying: '#7da6de',
    fighting: '#cb5f48',
    normal: '#aab09f'
}

const main_types = Object.keys(colors);

const fetchAllPokemon = async () => {
    for(let i = 1; i <= pokemon_count; i++){
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    console.log(pokemon.types);
    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchAllPokemon();