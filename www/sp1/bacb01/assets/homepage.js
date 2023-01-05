const header = document.querySelector("header");
const sectionOne = document.querySelector(".content-intro");

const sectionOneOptions = {
  rootMargin: "-350px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-scrolled");
    } else {
      header.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);

const sectionTwo = document.querySelector(".content");
const sectionTwoOptions = {
  rootMargin: "0px 0px 0px 0px"
};

const sectionTwoObserver = new IntersectionObserver(function(
  entries,
  sectionTwoObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.remove("nav-scrolled");
    } else {
      header.classList.add("nav-scrolled");
    }
  });
},
sectionTwoOptions);

sectionTwoObserver.observe(sectionTwo);