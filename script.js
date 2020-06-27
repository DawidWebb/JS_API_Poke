class App {
  constructor() {
    this.loadBtn = document.querySelector(".container__btn");
    this.loadBtn.addEventListener("click", this.loadData);
    this.divScreen = document.querySelector(".container__screen");
    this.divSection = document.querySelector(".section");
    this.aside = document.querySelector(".container__aside");
    this.input = document.querySelector(".head__serch-value");
    this.input.addEventListener("input", this.serchValue);
    this.form = document.querySelector("form");
    this.URL = "https://api.pokemontcg.io/v1/cards?page=2&pageSize=4";
    this.pokemons = null;
    this.pokemonsName = [];
    this.takeData();
  }
  //AJAX//
  takeData = () => {
    fetch(this.URL)
      .then((res) => {
        if (res.status !== 200) {
          throw Error("I's not 200 response!");
        } else {
          return res.json();
        }
      })
      .then((json) => (this.pokemons = json.cards))
      .catch((err) => console.log(err));
  };

  //LOADER//
  showScreen = () => {
    this.divScreen.classList.add("active");
  };
  removeScreen = () => {
    this.divScreen.classList.remove("active");
  };

  //SHOW POKEMON CARDS//
  showData = () => {
    this.pokemons.forEach((pokemon) => {
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
      this.divSection.appendChild(divInfo);
      this.pokemonsName.push({
        name: pokemon.name,
        img: pokemon.imageUrl,
        rarity: pokemon.rarity,
      });
    });
  };

  //CLICK BUTTON//
  loadData = () => {
    this.showScreen();
    setTimeout(this.removeScreen, 2000);
    setTimeout(this.showData, 2000);
  };

  //INPUT VALUE//
  serchValue = (e) => {
    this.pokemonsName.filter((pokemon) => {
      if (e.target.value === pokemon.name) {
        const divInfo = document.createElement("div");
        divInfo.classList.add("section__info");
        const h3 = document.createElement("h3");
        divInfo.appendChild(h3);
        h3.textContent = `${pokemon.name}`;
        const img = document.createElement("img");
        divInfo.appendChild(img);
        img.src = `${pokemon.img}`;
        const p = document.createElement("p");
        divInfo.appendChild(p);
        p.textContent = `Rarity: ${pokemon.rarity}`;
        this.aside.appendChild(divInfo);
      }
    });
  };
}

const app = new App();
