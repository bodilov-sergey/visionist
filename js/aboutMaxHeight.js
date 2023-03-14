document.addEventListener("DOMContentLoaded", () => {
    correctionHeight();
    window.addEventListener("resize", correctionHeight);
});

const correctionHeight = () => {
    const relationWindow = window.innerHeight / window.innerWidth;
    const relationHeight = window.innerHeight / 1000;
    const aboutItemsFirst = document.querySelector(".about__item--first");
    const aboutItemsLast = document.querySelector(".about__item--last");
    if (window.innerHeight < 860 && relationWindow < 0.86) {
        aboutItemsFirst.style.transform = `scale(${relationHeight})`;
        aboutItemsLast.style.transform = `scale(${relationHeight})`;
        aboutItemsFirst.style.transformOrigin = `${50 - 50 * relationWindow}% ${50 * relationHeight}%`;
        aboutItemsLast.style.transformOrigin = `${40 + 40 * relationWindow}% ${50 * relationHeight}%`;
    } else {
        aboutItemsFirst.style.transform = `scale(1)`;
        aboutItemsLast.style.transform = `scale(1)`;
    }
};
