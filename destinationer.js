// Her definerer vi de globale variabler, som vores data skal ligge i
let container;
let temp;
// Her definerer vi konstanten url som et link fra restdb og adgangsnøglen til vores dataset
const url = "https://storbydata-7e97.restdb.io/rest/data";
const options = {
  headers: {
    "x-apikey": "6139bf1643cedb6d1f97eeb1",
  },
};
// Lige så snart, at DOM'en er loadet, kalder vi funktionen start
document.addEventListener("DOMContentLoaded", start);
// Her definerer vi en tom, global variabel byer
let byer;
// Her definerer vi variablen filtrer, som tager fat i data attributen alle i data land og data kontinent
let filtrer = "alle";
// Her siger vi, at vores popup skal være skjult fra start
document.querySelector("#popup").style.display = "none";
// Her definerer vi en global variabel kontinent
let kontinent;

// Funktionen start
function start() {
  // Her opretter vi konstanten urlparams, som hjælper til at hente dataen fra forsiden til destinationssiden
  const urlParams = new URLSearchParams(window.location.search);
  // Her giver vi variablen en værdi
  kontinent = urlParams.get("kontinent");
  // Her definerer vi en tom variabel json
  let json;

  // Her siger vi, at h1'eren på destinationssiden, skal ændres alt efter hvilket kontinent, der er trykket på.
  const header = document.querySelector("#kontinent_overskrift");
  // toUpperCase betyder, at ordet skal være i blokbogstaver
  header.textContent = kontinent.toUpperCase();

  // Her laver vi konstanten filtrerKnapper og tager fat (med querySelectorAll) i ALLE knapperne i navigationen
  const filtrerKnapper = document.querySelectorAll("nav button");
  // Her looper vi konstanten filtrerKnapper og tilføjer en eventListener der lytter på hvornår
  // der er tilføjet "click", og sender videre til funktionen filtrerByer
  filtrerKnapper.forEach((knap) => knap.addEventListener("click", filtrerByer));
  // Den tomme variabel container, som vi har defineret globalt længere oppe, tilføjer vi nu "section" (fra html) til
  container = document.querySelector("section");
  // Den tomme variabel temp, som vi har defineret globalt længere oppe, tilføjer vi nu "template" (fra html) til
  temp = document.querySelector("template");
  // Her kalder vi funktionerne filtrerNav og hentdata
  filtrerNav();
  hentdata();
}



// Her starter filtrerNav
function filtrerNav() {
  // Her laver vi konstanten knapper og tager fat (med querySelectorAll) i ALLE knapperne i navigationen
  const knapper = document.querySelectorAll("nav button");
  // For hver knap i navigationen, hvis datasættet kontinent i html er lig med datasættet kontinent i json, skal den lave display inline
  // ellers, skal den lave display none, hvilket betyder, at vi skjuler alle lande, der ikke er indenfor kontinentet
  knapper.forEach((knap) => {
    if (knap.dataset.kontinent == kontinent) {
      knap.style.display = "inline";
    } else {
      knap.style.display = "none";
    }
    // Vi skriver en if sætning her, for at fjerne click funktionen filtrerByer fra alle-knappen
    if (knap.dataset.kontinent == "alle") {
      knap.removeEventListener("click", filtrerByer);

      // for så at tilføje en click funktion visKontinentByer til at filtrere byer indenfor kontinentet.
      knap.addEventListener("click", visKontinentByer);

      // Så fjerner vi display none som vi satte på længere oppe på alle knapperne, der ikke matcher datasættet kontinent
      knap.style.display = "inline";
    }
  });
}



// Vi starter fuktionen filtrerByer
function filtrerByer() {
  // Her tager vi fat i datasettet land, for at filtrere byerne indenfor hvert land
  filtrer = this.dataset.land;
  // Her fjerner vi klassen valgt, så den ikke er der med det samme, for så at tiljøje den, når der bliver trykket på den.
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  // Her kalder vi funktionen visByer
  visByer();
}



// Her starter funktionen hentdata
async function hentdata() {
  // Her henter vi url og api-key, fra de globale variabler, som vi har defineret længere oppe
  const response = await fetch(url, options);
  // variablen byer bliver nu til det, som konstanten response henter ned
  byer = await response.json();
  // Her kalder vi funktionen visKontinentByer
  visKontinentByer();
}


// Ligesom i filtrerByer funktionen fjerner vi her klassen valgt på vores alle-knap (som ikke er en del
// af funktionen filtrerByer længere), så den ikke er der med det samme, for så at tiljøje den, når der bliver trykket på den.
document.querySelector(".valgt").addEventListener("click", klasse);
function klasse() {
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
}


// Her starter funktionen visKontinentByer
function visKontinentByer() {
  // Den tomme variabel dest, som vi har defineret globalt længere oppe, tilføjer vi nu "liste" (fra html) til
  const dest = document.querySelector("#liste");
  // Her siger vi, at dest (som vi har tilføjet sektionen "liste" til længere oppe, skal tømmes for indhold)
  dest.innerHTML = "";

  //løb igennem array "byer"
  byer.forEach((enkleByer) => {
    //Hvis byerne er lig med byerne indenfor kontinentet, skal de vises
    if (kontinent == enkleByer.Kontinent) {
      // Her laver vi en konstant der hedder klon, som indeholder templaten der skal puttes content i
      const klon = temp.cloneNode(true).content;

      // Her kloner vi det content, som querySelectoren vælger, som også er defineret i html
      klon.querySelector("img").src = "billeder/" + enkleByer.Billede + ".webp";
      klon.querySelector("h2").textContent = enkleByer.By;

      // Her kloner vi querySelectoren, så hver gang vi trykker på article, lytter den efter click
      klon
        .querySelector("article")
        .addEventListener("click", () => visPopUp(enkleByer));

      // Her tilføjer vi et childelement (det data vi har klonet i konstanten klon)
      // til konstanten dest (#liste), og opretter et child element for hver linje
      // data, vores child element har
      dest.appendChild(klon);
    }
  });
}


// Her starter funktionen visByer
function visByer() {
  // Den tomme variabel dest, som vi har defineret globalt længere oppe, tilføjer vi nu "liste" (fra html) til
  const dest = document.querySelector("#liste");

  // Her siger vi, at dest (som vi har tilføjet sektionen "liste" til længere oppe, skal tømmes for indhold)
  dest.innerHTML = "";

  //løb igennem array "byer"
  byer.forEach((enkleByer) => {
    //Hvis byerne er lig med byerne indenfor landet, skal de vises
    if (filtrer == enkleByer.Land) {
      // Her laver vi en konstant der hedder klon, som indeholder templaten der skal puttes content i
      const klon = temp.cloneNode(true).content;

      // Her kloner vi det content, som querySelectoren vælger, som også er defineret i html
      klon.querySelector("img").src = "billeder/" + enkleByer.Billede + ".webp";
      klon.querySelector("h2").textContent = enkleByer.By;

      // Her kloner vi querySelectoren, så hver gang vi trykker på article, lytter den efter click
      klon
        .querySelector("article")
        .addEventListener("click", () => visPopUp(enkleByer));

      // Her tilføjer vi et childelement (det data vi har klonet i konstanten klon)
      // til konstanten dest (#liste), og opretter et child element for hver linje
      // data, vores child element har
      dest.appendChild(klon);
    }
  });
}

// Her siger vi, at #popup button skal lytte efter "click" og efter gå til funktionen "lukPopup"
document.querySelector("#popup button").addEventListener("click", lukPopup);

// Her starter funktionen lukPopup
function lukPopup() {
  // Her siger vi, at når der trykkes på popup botton, skal display være none
  document.querySelector("#popup").style.display = "none";
}

// Her starter funktionen visPopup
function visPopUp(popUp) {
  // Her laver vi en konstant, der hedder popup, som viser #popup
  const popup = document.querySelector("#popup");
  // Her siger vi, at display skal være block, for at få popupen frem igen
  popup.style.display = "block";

  // Her definerer vi, hvad det er der skal vises i popupvinduet, ved at tage fat i det fra artiklen i html
  popup.querySelector("img").src = "billeder/" + popUp.Billede + ".webp";
  popup.querySelector("h2").textContent = popUp.By;
  popup.querySelector(".Tagline").textContent = popUp.Tagline;
  popup.querySelector(".Information").textContent = popUp.Information;
  popup.querySelector(".Rejselaengde").innerHTML =
    "<b>We recommend:<b>" + " " + popUp.Rejselaengde;

  // // Sitet synkroniserer med data fra json database
  // async function hentData() {
  //   // Her henter vi url og api-key, fra de globale variabler, som vi har defineret længere oppe
  //   const result = await fetch(url + kontinent, options);
  //   // variablen byer bliver nu til det, som konstanten response henter ned
  //   land = await result.json();
  //   // Her kalder vi funktionen visLand
  //   visLand();
  //   console.log(visLand);
  // }


  // Her bliver vi ført tilbage til den foregående side, ved hjælp af browserens tilbageknap
  document.querySelector("button").addEventListener("click", () => {
    window.history.back();
  });
}

hentdata();
