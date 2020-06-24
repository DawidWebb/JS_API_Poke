const loadBtn = document.querySelector(".container__btn");

const divSection = document.querySelector(".section");
const URL = "https://api.pokemontcg.io/v1/cards?page=2&pageSize=4";
let pokemons = null;
const pokemonsName = [];

fetch(URL)
  .then((res) => {
    if (res.status !== 200) {
      throw Error("I's not 200 response!");
    } else {
      return res.json();
    }
  })

  .then((json) => (pokemons = json.cards))
  .catch((err) => console.log(err));

showData = () => {
  pokemons.forEach((pokemon) => {
    const divInfo = document.createElement("div");
    divInfo.classList.add("section__info");
    const h3 = document.createElement("h3");
    divInfo.appendChild(h3);
    h3.textContent = `${pokemon.name}`;
    const img = document.createElement("img");
    divInfo.appendChild(img);
    img.src = `${pokemon.imageUrl}`;
    const p = document.createElement("p");
    divInfo.appendChild(p);
    p.textContent = `${pokemon.rarity}`;
    divSection.appendChild(divInfo);
    pokemonsName.push(pokemon.name);
  });
  console.log(pokemonsName);
};
loadCards = () => {
  showData();
};

loadBtn.addEventListener("click", loadCards);
