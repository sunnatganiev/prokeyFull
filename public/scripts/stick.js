"use strict";

const header = document.querySelector(".tayoq");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight)

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry)

  if (!entry.isIntersecting) {
    nav.classList.add("sticky", "top");
  } else nav.classList.remove("sticky", "top");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
