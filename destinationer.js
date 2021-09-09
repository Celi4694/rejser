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
let filter = "alle";

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerByer));
  container = document.querySelector("section");
  temp = document.querySelector("template");
  hentdata();
}

function filtrerByer() {
  filter = this.dataset.byer;
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
    if (filter == enkleByer.kategori || filter == "alle") {
      const klon = temp.cloneNode(true).content;

      klon.querySelector("img").src = "billeder/" + enkleByer.Billede;
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

  popup.querySelector("img").src = "billeder/" + popUp.Billede;

  popup.querySelector("h2").textContent = popUp.By;

  popup.querySelector(".Tagline").textContent = popUp.Tagline;

  popup.querySelector(".Information").textContent = popUp.Information;

  popup.querySelector(".Rejselaengde").innerHTML =
    "<b>Rejselaengde:<b>" + " " + popUp.Rejselaengde;

  console.log(popUp);
}

hentdata();
