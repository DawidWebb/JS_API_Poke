const loadBtn = document.querySelector(".container__btn");
const divScreen = document.querySelector(".container__screen")
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

  showScreen=()=>{
   divScreen.classList.add("active")
  }
  removeScreen=()=>{
    divScreen.classList.remove("active")
  }

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
    p.textContent = `Rarity: ${pokemon.rarity}`;
    divSection.appendChild(divInfo);
    pokemonsName.push(pokemon.name);
  });
  
};
loadData=()=>{
  showScreen();
  setTimeout(removeScreen, 2000)
  setTimeout(showData, 2000)
  console.log(pokemonsName);
  
}

loadBtn.addEventListener("click", loadData);
