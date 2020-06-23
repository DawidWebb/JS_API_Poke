const loadBtn = document.querySelector(".section__btn");

const divInfo = document.querySelector(".section__info");
const h1 = document.querySelector(".section__title");
const img = document.querySelector(".section__image");
const p = document.querySelector(".section__additionalInfo");
const URL = "https://api.pokemontcg.io/v1/cards?page=1";
let pokemons = null;

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
    h1.textContent = `${pokemon.name}`;
    img.src = `${pokemon.imageUrl}`;
    p.textContent = `Nr: ${pokemon.number} Hp:${pokemon.hp} Dostępność${pokemon.rarity}`;
  });
};
loadCards = () => {
  showData();
};

loadBtn.addEventListener("click", loadCards);
