let container;
let temp;

const url = "https://storbydata-7e97.restdb.io/rest/data";

const options = {
  headers: {
    "x-apikey": "118943779643e66518f3c8ae59e4c4f339bcc",
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

      klon.querySelector("img").src =
        "billeder/" + enkleByer.billednavn + "-md.jpg";
      klon.querySelector("h2").textContent = enkleByer.navn;
      klon.querySelector(".kortbeskrivelse").textContent =
        enkleByer.kortbeskrivelse;
      klon.querySelector(".pris").innerHTML =
        "<b>Pris:<b>" + " " + enkleByer.pris;

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

  popup.querySelector("img").src = "billeder/" + popUp.billednavn + "-md.jpg";

  popup.querySelector("h2").textContent = popUp.navn;

  popup.querySelector(".langbeskrivelse").textContent = popUp.langbeskrivelse;

  popup.querySelector(".oprindelsesregion").textContent =
    "Oprindelsesregion: " + popUp.oprindelsesregion;

  popup.querySelector(".pris").innerHTML = "<b>Pris:<b>" + " " + popUp.pris;

  console.log(popUp);
}

hentdata();
