class App {
  constructor() {
    this.loadBtn = document.querySelector(".section__btn");
    this.loadBtn.addEventListener("click", this.loadCards);
    this.API = "https://api.pokemontcg.io/v1/cards";
  }

  takeData = () => {
    fetch(this.API)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  showData = () => {
    console.log("OK");
  };
  loadCards = () => {
    this.takeData();
    this.showData();
  };
}
const app = new App();
