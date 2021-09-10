// Eventlistener på knapper //
let forsideNav = document.querySelectorAll("nav button");
forsideNav.forEach((knap) => knap.addEventListener("click", gaaTilKontinent));

// Navigere videre til destinationsiden og tage data-attributen 'kontinent' med //
function gaaTilKontinent() {
  let kontinent = this.dataset.kontinent;
  location.href = `destinationer.html?kontinent=${kontinent}`;
}
