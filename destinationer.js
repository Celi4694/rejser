let container;
let temp;

const url = "https://babushka-dd8a.restdb.io/rest/menu";

const options = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

document.addEventListener("DOMContentLoaded", start);
let mad;
let filter = "alle";

function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerMad));
  container = document.querySelector("section");
  temp = document.querySelector("template");
  hentdata();
}

function filtrerMad() {
  filter = this.dataset.retter;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  visMad();
  const header = document.querySelector("#alle_overskrift");
  header.textContent = this.textContent;
}

async function hentdata() {
  const response = await fetch(url, options);
  mad = await response.json();
  console.log(mad);
  visMad();
}

function visMad() {
  const dest = document.querySelector("#liste");
  const skabelon = document.querySelector("template").content;
  dest.innerHTML = "";
  //løb igennem array "Mad"
  console.log(mad);

  mad.forEach((enkeltMad) => {
    if (filter == enkeltMad.kategori || filter == "alle") {
      const klon = temp.cloneNode(true).content;

      klon.querySelector("img").src =
        "billeder/" + enkeltMad.billednavn + "-md.jpg";
      klon.querySelector("h2").textContent = enkeltMad.navn;
      klon.querySelector(".kortbeskrivelse").textContent =
        enkeltMad.kortbeskrivelse;
      klon.querySelector(".pris").innerHTML =
        "<b>Pris:<b>" + " " + enkeltMad.pris;

      klon
        .querySelector("article")
        .addEventListener("click", () => visPopUp(enkeltMad));

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
