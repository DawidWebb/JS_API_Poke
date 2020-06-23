class App {
  constructor() {
    this.loadBtn = document.querySelector(".section__btn");
    this.loadBtn.addEventListener("click", this.loadCards);
    this.divInfo = document.querySelector(".section__info");
    this.h1 = document.querySelector(".section__title");
    this.img = document.querySelector(".section__image");
    this.p = document.querySelector(".section__additionalInfo");
    this.API = "https://api.pokemontcg.io/v1/cards";
    this.pokemons =[]
  }

  takeData = () => {
    fetch(this.API)
      .then((res) => res.json())
      .then((data)=>this.pokemons.push(data))
    
  };

  showData = () => {
    const pokemons = [...this.pokemons]
    const {id, name, hp, imageUrl} = pokemons[0].cards[0]
    this.h1.textContent = `Nazwa: ${name}`;
    this.img.src = `${imageUrl}`;
    // this.p.textContent = `HP: ${hp}`
    

  };
  loadCards = () => {
    this.takeData();
    this.showData();
    
  };
}
const app = new App();
