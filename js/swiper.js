document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".news__swiper", {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 15,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            // when window width is >= 587px
            587: {
                spaceBetween: 50,
            },
            // when window width is >= 902px
            902: {
                slidesPerView: 3,
                spaceBetween: 50,
            },
        },
    });

    new Swiper(".testimonials__swiper", {
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        slidesPerView: 1,
    });
});
