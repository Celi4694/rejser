// Eventlistener på knapper //

// Her laver vi en variabel for knapperne i navigationen med kontinenterne på forsiden
let forsideNav = document.querySelectorAll("nav button");
// For hver knap i forside navigationen, tilføjer vi en eventlistener "click" og siger, at den skal gå til funktionen gaaTilKontinent
forsideNav.forEach((knap) => knap.addEventListener("click", gaaTilKontinent));

// Navigere videre til destinationsiden og tage data-attributen 'kontinent' med. This tager fat i attributen //
function gaaTilKontinent() {
  let kontinent = this.dataset.kontinent;
  // Her linker vi til destinationssiden og sender verdien af data-attributen med
  location.href = `destinationer.html?kontinent=${kontinent}`;
}
