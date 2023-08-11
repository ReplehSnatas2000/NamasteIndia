const revsCard = document.querySelector("#reviews-card");
const revCard = document.querySelector("#review-card");
const mediaQuery = window.matchMedia('(max-width: 770px)');
if (mediaQuery.matches) {
    if (revCard && revsCard) {
        revsCard.removeAttribute("class");
        revCard.removeAttribute("class");
    }
}