const allPokeContainer = document.querySelector('.poke-container')

const APIUrl = `https://pokeapi.co/api/v2/pokemon?limit=150`

const fetchPokemon = async () => {
  const getPokemon = await fetch(APIUrl)
  const response = await getPokemon.json()
  const data = response.results

  data.forEach((pokemon) => {
    fetchPokemonData(pokemon)
  })
}

function renderPokemon(pokeData) {
  let pokeContainer = document.createElement('div')
  let pokeName = document.createElement('h3')
  let pokeNumber = document.createElement('p')
  let pokeTypes = document.createElement('ul')

  createPokeImage(pokeData.id, pokeContainer)

  pokeName.textContent = pokeData.name
  pokeNumber.textContent = `#${pokeData.id}`

  createTypes(pokeData.types, pokeTypes)

  pokeContainer.append(pokeName, pokeNumber, pokeTypes)

  allPokeContainer.appendChild(pokeContainer)
}

function createTypes(types, ul) {
  types.forEach((type) => {
    let typeLi = document.createElement('li')
    typeLi.textContent = type['type']['name']

    ul.append(typeLi)
  })
}

function createPokeImage(pokeID, containerDiv) {
  let pokeImage = document.createElement('img')

  pokeImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`

  containerDiv.append(pokeImage)
}

async function fetchPokemonData(pokemon) {
  let url = pokemon.url
  const response = await fetch(url)
  const pokeData = await response.json()
  renderPokemon(pokeData)
}

fetchPokemon()
