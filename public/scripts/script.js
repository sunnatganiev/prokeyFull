try {
  const nav = $("#main-nav");

  const navHeight = nav.height();

  $(".navigation__nav").css(`top`, `${navHeight}px`);

  $("body").css(`margin-top`, `${navHeight}px`);

  $(window).on("scroll", () => {
    nav.toggleClass("sticky", window.scrollY > 0);
    if (window.scrollY > 0) {
      $("body").css(`margin-top`, `${0}px`);
    } else {
      $("body").css(`margin-top`, `${navHeight}px`);
    }
  });

  const allSections = document.querySelectorAll(".section");

  const revealSection = function (entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");

    headerObserver.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach(function (section) {
    if (window.innerWidth > 1700) {
      sectionObserver.observe(section);
    } else {
      section.classList.remove("section--hidden");
    }
  });
} catch (err) {
  console.log(err);
}
