// variables declared
const btnscroll = document.querySelector(".btnlink__scroll");
const header = document.querySelector(".header");
const navLink = document.querySelectorAll(".nav-link");
const navLinksArea = document.querySelector(".nav-links");
const operationsTab = document.querySelectorAll(".operations__tab");
const operationsTabArea = document.querySelector(".operations__tab-container");
const operationsContentArea = document.querySelector(".operations__content");
const operationContent = document.querySelectorAll(".operations__content");
const mainNavArea = document.querySelector(".nav");
const slides = document.querySelectorAll(".slide");
const sliderbtnLeft = document.querySelector(".slider__btn--left");
const sliderbtnRight = document.querySelector(".slider__btn--right");
const nav = document.querySelector("#nav");
const sections = document.querySelectorAll(".section");
const featureImg = document.querySelectorAll(".features__img");
let cardslide = 0;
let options = {
  root: null,
  threshold: 0.2,
};

// function area
featureImg.forEach((val) => {
  val.setAttribute("style", "filter: blur(5px)");
});
// hiding section
sections.forEach((val) => val.classList.add("section--hidden"));
let cookiesfun = function () {
  // creating div element
  // append the message and classname
  let cookieMessage = document.createElement("div");
  cookieMessage.innerHTML = ` <p> please accept the cookies for more user experience </p>
  <button class=" btn cookie-btn btn--show-modal"> Got It </button>  `;
  cookieMessage.classList.add("cookie-message");
  header.append(cookieMessage);
  // adding event to
  // adding event listener for cookie message
  let cookieCloseBtn = document.querySelector(".cookie-btn");
  cookieCloseBtn.addEventListener("click", () => {
    cookieMessage.setAttribute("style", "opacity:0;");
  });
};
// nav link scroll option

let NavDelegate = function (e) {
  //prevent default  , where the target is clicked then shouldmatch the strategy
  // strategy check
  e.preventDefault();
  let targetArea = e.target;
  if (!targetArea.classList.contains("nav-link")) return;
  //else
  let id = document.querySelector(targetArea.getAttribute("href"));
  id.scrollIntoView({ behavior: "smooth" });
};

// // learn more scroll event

btnscroll.addEventListener("click", (e) => {
  // prevent default selecting the id which need to be smooth scrolled
  e.preventDefault();
  let id = document.querySelector("#section--1");
  id.scrollIntoView({ behavior: "smooth" });
});

// operations area delegated function
let operationsAreadelegate = function (e) {
  // strategy whether the target is operations tab or the closest one
  let clicked = e.target.closest(".operations__tab");
  // checking strategy
  if (!clicked) return;
  // if its true : then
  // remove the class --active
  operationsTab.forEach((val) =>
    val.classList.remove("operations__tab--active")
  );
  // then add the opertaion tab active class
  clicked.classList.add("operations__tab--active");
  // operation content area setting to active
  let clickedData = clicked.getAttribute("data-tab");
  // removing class from all operation content
  operationContent.forEach((val) => {
    val.classList.remove("operations__content--active");
  });
  // adding class active to operation content
  let activeOperation = document.querySelector(
    `.operations__content--${clickedData}`
  );
  activeOperation.classList.add("operations__content--active");
};
let navOpacityfun = function (e) {
  let clicked = e.target;
  // checking stratgy the mouse over is link anchor
  if (!clicked.classList.contains("nav-link")) return;
  // else other than the target nav everything should have the opactity 0.3
  let allLinks = mainNavArea.querySelectorAll(".nav-link");
  let logo = mainNavArea.querySelector(".final-logo");
  allLinks.forEach((val) => {
    // opacity is reduced accordingly
    if (val !== clicked) val.style.opacity = `${this}`;
  });
  // reducing opacity of logo too
  logo.style.opacity = `${this}`;
};
// sliders getting the transalate
let slidersPosition = function (cardslide) {
  slides.forEach((val, ind) => {
    val.setAttribute(
      "style",
      `transform:translateX(${(ind - cardslide) * 100}%);`
    );
  });
};
// right slide fun
let cardSlideRight = function () {
  // the no should increment , and the card should slide upto the length of the card
  cardslide++;
  if (cardslide === slides.length) cardslide = 0;
  slidersPosition(cardslide);
};
// left slide fun
let cardSlideLeft = function () {
  cardslide--;
  if (cardslide === -1) cardslide = slides.length - 1;
  slidersPosition(cardslide);
};
// nav bar turns sticky ontime
const navbarObserve = function () {
  const observer = new IntersectionObserver(function (entry, observed) {
    const [en] = entry;
    if (!en.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  }, options);
  observer.observe(header);
};
let sectionPop = function () {
  // observers each section
  let observer2 = new IntersectionObserver(function (entry, observed) {
    // destructure it
    const [en] = entry;
    // if intersect then
    if (en.isIntersecting) {
      let h = en.target.classList.remove("section--hidden");
      observer2.unobserve(en.target);
    }
  }, options);
  sections.forEach((val) => observer2.observe(val));
};
const lazyload = function () {
  let observer3 = new IntersectionObserver(
    function (entry, observed) {
      // destructure it
      const [en] = entry;
      console.log(en);
      if (!en.isIntersecting) return;
      en.target.setAttribute("style", "filter:0;");
    },
    {
      root: null,
      threshold: 1,
    }
  );
  featureImg.forEach((val) => observer3.observe(val));
};

// function calls
cookiesfun();
// nav link click event without the foreach
navLinksArea.addEventListener("click", NavDelegate);
// tabbed component event handler
operationsTabArea.addEventListener("click", operationsAreadelegate);
// on mouuse over event on nav
navLinksArea.addEventListener("mouseover", navOpacityfun.bind(0.4));
navLinksArea.addEventListener("mouseout", navOpacityfun.bind(1));
slidersPosition(cardslide);
// event listen for button right and left in sliders
sliderbtnRight.addEventListener("click", cardSlideRight);
sliderbtnLeft.addEventListener("click", cardSlideLeft);

// observer api
navbarObserve();
sectionPop();
lazyload();
