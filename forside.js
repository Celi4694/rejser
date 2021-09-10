// Eventlistener på knapper //
let forsideNav = document.querySelectorAll("nav button");
forsideNav.forEach((knap) => knap.addEventListener("click", gaaTilKontinent));

function gaaTilKontinent() {
    let kontinent = this.dataset.kontinent;
    console.log(kontinent)
    location.href = `destinationer.html?kontinent=${kontinent}`;
}

// Navigere videre til destinationsiden og tage data-attributen 'kontinent' med //


