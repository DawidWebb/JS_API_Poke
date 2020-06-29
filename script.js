class App {
  constructor() {
    this.loadBtn = document.querySelector(".container__btn");
    this.loadBtn.addEventListener("click", this.loadData);
    this.divScreen = document.querySelector(".container__screen");
    this.divSection = document.querySelector(".section");
    this.aside = document.querySelector(".container__aside");
    this.input = document.querySelector(".head__serch-value");
    this.input.addEventListener("search", this.serchValue);
    this.form = document.querySelector("form");
    this.divSerch;
    this.pokemons = null;
    this.pokemonsName = [];
    this.page = null;
    this.active = false;
    this.checked = [];
  }

  //AJAX//
  takeData = () => {
    this.page++;
    this.URL = `https://api.pokemontcg.io/v1/cards?page=${this.page}&pageSize=4`;
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
    this.takeData();
    this.showScreen();
    setTimeout(this.removeScreen, 2000);
    setTimeout(this.showData, 2000);
    if (this.checked.length > 0) {
      this.aside.removeChild(this.divSerch);
      this.divSerch = null;
      this.checked = [];
    }
    this.active = false;

    console.log(this.pokemonsName);
  };

  //INPUT VALUE//

  serchValue = (e) => {
    this.pokemonsName.filter((pokemon) => {
      if (e.target.value === pokemon.name) {
        this.active = true;
        this.checked.push(1);
        this.divSerch = document.createElement("div");
        this.divSerch.classList.add("section__info");
        const h3 = document.createElement("h3");
        this.divSerch.appendChild(h3);
        h3.textContent = `${pokemon.name}`;
        const img = document.createElement("img");
        this.divSerch.appendChild(img);
        img.src = `${pokemon.img}`;
        const p = document.createElement("p");
        this.divSerch.appendChild(p);
        p.textContent = `Rarity: ${pokemon.rarity}`;
        this.aside.appendChild(this.divSerch);
        e.target.value = "";
      }
    });

    if (this.active === false) {
      this.showInfo(e);
    }
  };
  showInfo = (e) => {
    this.checked.push(1);
    this.divSerch = document.createElement("div");
    this.divSerch.classList.add("section__info");
    const h3 = document.createElement("h3");
    h3.textContent = "Nie ma takiego pokemona w twojej bazie.";
    h3.style.color = "brown";
    this.divSerch.appendChild(h3);
    this.aside.appendChild(this.divSerch);
    e.target.value = "";
  };
}
const app = new App();
