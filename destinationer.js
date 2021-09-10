let container;
let temp;
const url = "https://storbydata-7e97.restdb.io/rest/data";
const options = {
  headers: {
    "x-apikey": "6139bf1643cedb6d1f97eeb1",
  },
};

document.addEventListener("DOMContentLoaded", start);
let byer;
let filtrer = "alle";
document.querySelector("#popup").style.display = "none";

function start() {
  const filtrerKnapper = document.querySelectorAll("nav button");
  filtrerKnapper.forEach((knap) => knap.addEventListener("click", filtrerByer));
  container = document.querySelector("section");
  temp = document.querySelector("template");
  hentdata();
}

function filtrerByer() {
  filtrer = this.dataset.byer;
  console.log(filtrer);
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  visByer();
  const header = document.querySelector("#alle_overskrift");
  header.textContent = this.textContent;
}

async function hentdata() {
  const response = await fetch(url, options);
  byer = await response.json();
  console.log(byer);
  visByer();
}

function visByer() {
  const dest = document.querySelector("#liste");
  const skabelon = document.querySelector("template").content;
  dest.innerHTML = "";
  //løb igennem array "byer"
  console.log(byer);

  byer.forEach((enkleByer) => {
    if (filtrer == enkleByer.Land || filtrer == "alle") {
      const klon = temp.cloneNode(true).content;

      klon.querySelector("img").src = "billeder/" + enkleByer.Billede + ".jpg";
      klon.querySelector("h2").textContent = enkleByer.By;

      klon
        .querySelector("article")
        .addEventListener("click", () => visPopUp(enkleByer));

      dest.appendChild(klon);
    }
  });
}

document.querySelector("#popup button").addEventListener("click", lukPopup);

function lukPopup() {
  document.querySelector("#popup").style.display = "none";
}

function visPopUp(popUp) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";

  popup.querySelector("img").src = "billeder/" + popUp.Billede + ".jpg";

  popup.querySelector("h2").textContent = popUp.By;

  popup.querySelector(".Tagline").textContent = popUp.Tagline;

  popup.querySelector(".Information").textContent = popUp.Information;

  popup.querySelector(".Rejselaengde").innerHTML =
    "<b>We recommend:<b>" + " " + popUp.Rejselaengde;

  console.log(popUp);






  

  // Oprettes en tom constant, fordi så har jeg en generel som gælder i alle functions nedenfor i scriptet //
  const urlParams = new URLSearchParams(window.location.search);
  const kontinent = urlParams.get("kontinent");
  let json;
  console.log(kontinent);

  // Sitet synkroniserer med data fra json database
  async function hentData() { 
      const result = await fetch(url+kontinent, options);
      land = await result.json();
      console.log(land);
      visLand();
      }

  function visLand() {
      document.querySelector(".navn").textContent = person.fornavn;
      document.querySelector("img").src = "faces/" + person.billede;
      document.querySelector(".email").textContent = person.email;
      document.querySelector(".hobby").textContent ="Hobby: " + person.hobby;
  }   
  
  document.querySelector("button").addEventListener("click",() => {window.history.back()});






}

hentdata();
