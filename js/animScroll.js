window.addEventListener("load", () => {
    const blocks = createBlocks();
    let params = createParams(blocks);

    animElements(blocks, params);

    window.addEventListener("scroll", () => animElements(blocks, params));
    window.addEventListener("resize", () => (params = createParams(blocks)));
});

const animElements = (blocks, params) => {
    animHeader(blocks);
    animRangeInvolvementWrapperPosition(blocks, params);
    animRangeAboutWrapperTranslateX(blocks, params);
    animRangeInvolvementContentTranslateY(blocks, params);
    animRangeCareerTitleScale(blocks, params);
    animRangeCareerContentOpacity(blocks, params);
    animRangeNewsLinkOpacity(blocks, params);
    animRangeTestimonialsSymbolTranslateY(blocks, params);
};

const animHeader = (blocks) => {
    scrollY > 0 ? blocks.header.classList.add("header--shifted") : blocks.header.classList.remove("header--shifted");
};

const animRangeInvolvementWrapperPosition = (blocks, params) => {
    blocks.involvementWrapper.style.transform = `translateY(${params.values.involvementWrapperTranslateY.min})`;
    if (checkRangePos(params.points.involvementWrapperPosition)) {
        blocks.involvementWrapper.style.position = "fixed";
    } else {
        blocks.involvementWrapper.style.position = "relative";
        if (scrollY > params.points.involvementWrapperPosition.start) {
            blocks.involvementWrapper.style.transform = `translateY(${params.values.involvementWrapperTranslateY.max}px)`;
        }
    }
};

const animRangeAboutWrapperTranslateX = (blocks, params) => {
    blocks.aboutWrapper.style.transform = `translateX(${calcValueParam(params.points.aboutWrapperTranslateX, params.values.aboutWrapperTranslateX, 0.5)}px)`;
    blocks.involvementSymbol.style.transform = `translate(-50%, ${calcValueParam(params.points.aboutWrapperTranslateX, params.values.involvementSymbolTranslate, 0.5)}%)`;
};

const animRangeInvolvementContentTranslateY = (blocks, params) => {
    blocks.involvementContent.style.transform = `translateY(${calcValueParam(params.points.involvementContentTranslateY, params.values.involvementContentTranslateY, 0.5)}px)`;
};

const animRangeCareerTitleScale = (blocks, params) => {
    blocks.careerTitle.style.transform = `scale(${calcValueParam(params.points.careerTitleScale, params.values.careerTitleScale, 0.5)})`;
    blocks.careerTitle.style.color = `rgb(${calcValueParam(params.points.careerTitleScale, params.values.careerTitleRed, 0.5)}, ${calcValueParam(params.points.careerTitleScale, params.values.careerTitleGreen, 0.5)}, ${calcValueParam(params.points.careerTitleScale, params.values.careerTitleBlue, 0.5)})`;
    blocks.involvementSymbolInner.style.transform = `scale(${calcValueParam(params.points.careerTitleScale, params.values.involvementSymbolScale, 0.5)})`;
    blocks.involvementSymbol.style.opacity = calcValueParam(params.points.careerTitleScale, params.values.involvementSymbolOpacity, 0.5);
};

const animRangeCareerContentOpacity = (blocks, params) => {
    blocks.careerInfo.style.opacity = calcValueParam(params.points.careerContentOpacity, params.values.universalOpacity, 0.5);
    blocks.careerDescription.style.opacity = calcValueParam(params.points.careerContentOpacity, params.values.universalOpacity, 0.5);
    blocks.careerLink.style.opacity = calcValueParam(params.points.careerContentOpacity, params.values.universalOpacity, 0.5);
    blocks.careerLink.style.transform = `translateY(${calcValueParam(params.points.careerContentOpacity, params.values.careerLinkTranslateY, 0.5)}%)`;
};

const animRangeNewsLinkOpacity = (blocks, params) => {
    blocks.newsLink.style.transform = `translateY(${calcValueParam(params.points.newsLinkOpacity, params.values.newsLinkTranslateY, 0.5)}%)`;
    blocks.newsLink.style.opacity = calcValueParam(params.points.newsLinkOpacity, params.values.universalOpacity, 0.5);
};

const animRangeTestimonialsSymbolTranslateY = (blocks, params) => {
    blocks.testimonialsSymbol.style.transform = `translateY(${calcValueParam(params.points.testimonialsSymbolTranslateY, params.values.testimonialsSymbolTranslateY, 0.5)}%)`;
    blocks.testimonialsSymbol.style.color = `rgba(${calcValueParam(params.points.testimonialsSymbolTranslateY, params.values.testimonialsSymbolRed, 0.5)}, ${calcValueParam(params.points.testimonialsSymbolTranslateY, params.values.testimonialsSymbolGreen, 0.5)}, ${calcValueParam(params.points.testimonialsSymbolTranslateY, params.values.testimonialsSymbolBlue, 0.5)}, ${calcValueParam(params.points.testimonialsSymbolTranslateY, params.values.testimonialsSymbolAlpha, 0.5)})`;
};

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    return rect.top + scrollTop;
};

const checkRangePos = (points) => {
    return points.start <= scrollY && scrollY <= points.end;
};

const calcValueParam = (points, values, pow = 1) => {
    const rangeScroll = points.end - points.start;
    const rangeValue = values.max - values.min;
    const relation = rangeValue / Math.pow(rangeScroll, pow);
    if (checkRangePos(points)) {
        return values.min + Math.pow((points.start - scrollY) * -1, pow) * relation;
    } else {
        return scrollY > points.start ? values.max : values.min;
    }
};

const createBlocks = () => {
    return {
        header: document.querySelector(".header"),
        involvement: document.querySelector(".involvement"),
        involvementWrapper: document.querySelector(".involvement__wrapper"),
        involvementSymbol: document.querySelector(".involvement__symbol"),
        involvementSymbolInner: document.querySelector(".involvement__symbol-inner"),
        involvementContent: document.querySelector(".involvement__content"),
        about: document.querySelector(".about"),
        aboutWrapper: document.querySelector(".about__wrapper"),
        career: document.querySelector(".career"),
        careerContainer: document.querySelector(".career__container"),
        careerWrapper: document.querySelector(".career__wrapper"),
        careerTitle: document.querySelector(".career__title"),
        careerInfo: document.querySelector(".career__info"),
        careerDescription: document.querySelector(".career__description"),
        careerLink: document.querySelector(".career__link"),
        news: document.querySelector(".news"),
        newsContainer: document.querySelector(".news__container"),
        newsHeader: document.querySelector(".news__header"),
        newsLink: document.querySelector(".news__link"),
        testimonials: document.querySelector(".testimonials"),
        testimonialsReviews: document.querySelector(".testimonials__reviews"),
        testimonialsSymbol: document.querySelector(".testimonials__symbol"),
    };
};

const createParams = (blocks) => {
    const involvementOffset = getOffset(blocks.involvement);
    const involvementRangeActive = blocks.involvement.offsetHeight - blocks.about.offsetHeight;
    const involvementInnerPoint = (num = 1) => involvementOffset + involvementRangeActive * num;
    return {
        points: {
            involvementWrapperPosition: {
                start: getOffset(blocks.involvement),
                end: involvementInnerPoint() - blocks.career.offsetHeight + window.innerHeight,
            },
            aboutWrapperTranslateX: {
                start: involvementInnerPoint(0.04),
                end: involvementInnerPoint(0.35),
            },
            involvementContentTranslateY: {
                start: involvementInnerPoint(0.35),
                end: involvementInnerPoint(0.66),
            },
            careerTitleScale: {
                start: involvementInnerPoint(0.7),
                end: involvementInnerPoint(0.8),
            },
            careerContentOpacity: {
                start: involvementInnerPoint(0.85),
                end: getOffset(blocks.involvement) + blocks.involvement.offsetHeight - blocks.about.offsetHeight - blocks.career.offsetHeight + window.innerHeight,
            },
            newsLinkOpacity: {
                start: getOffset(blocks.newsHeader) + blocks.newsHeader.offsetHeight - window.innerHeight,
                end: getOffset(blocks.news) - blocks.header.offsetHeight,
            },
            testimonialsSymbolTranslateY: {
                start: getOffset(blocks.testimonials) - window.innerHeight,
                end: getOffset(blocks.testimonialsReviews) + blocks.testimonialsReviews.offsetHeight - window.innerHeight,
            },
        },
        values: {
            involvementWrapperTranslateY: {
                min: 0,
                max: blocks.involvement.offsetHeight - blocks.about.offsetHeight - blocks.career.offsetHeight + window.innerHeight,
            },
            aboutWrapperTranslateX: {
                min: 0,
                max: 0 - blocks.aboutWrapper.offsetWidth + (blocks.aboutWrapper.parentElement.offsetWidth + window.innerWidth) / 2,
            },
            involvementSymbolTranslate: {
                min: -5 - blocks.aboutWrapper.offsetHeight / 2 / (blocks.involvementSymbol.offsetHeight * 0.01),
                max: -102.6 + blocks.aboutWrapper.offsetHeight / 2 / (blocks.involvementSymbol.offsetHeight * 0.01),
            },
            involvementContentTranslateY: {
                min: 0,
                max: 0 - blocks.about.offsetHeight,
            },
            involvementSymbolScale: {
                min: 1,
                max: window.innerWidth / (blocks.involvementSymbol.offsetWidth * 0.33),
            },
            careerTitleScale: {
                min: (blocks.careerWrapper.offsetWidth * 0.68) / blocks.careerTitle.offsetWidth,
                max: 1,
            },
            careerTitleRed: {
                min: 12,
                max: 255,
            },
            careerTitleGreen: {
                min: 39,
                max: 255,
            },
            careerTitleBlue: {
                min: 66,
                max: 255,
            },
            involvementSymbolOpacity: {
                min: 0.06,
                max: 1,
            },
            universalOpacity: {
                min: 0,
                max: 1,
            },
            careerLinkTranslateY: {
                min: (blocks.careerContainer.offsetWidth - 30) / 2.388,
                max: 0,
            },
            newsLinkTranslateY: {
                min: (30 - blocks.newsContainer.offsetWidth) / 2.388,
                max: 0,
            },
            testimonialsSymbolTranslateY: {
                min: 60,
                max: 0,
            },
            testimonialsSymbolRed: {
                min: 27,
                max: 2,
            },
            testimonialsSymbolGreen: {
                min: 117,
                max: 173,
            },
            testimonialsSymbolBlue: {
                min: 188,
                max: 35,
            },
            testimonialsSymbolAlpha: {
                min: 0.1,
                max: 1,
            },
        },
    };
};
