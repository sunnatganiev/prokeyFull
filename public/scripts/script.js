try {
  const header = document.querySelector(".tayoq");
  const nav = document.querySelector("#main-nav");

  const navHeight = nav.getBoundingClientRect().height;

  // $("body").css(`margin-top`, `${navHeight}px`);
  $(".navigation__nav").css(`top`, `${navHeight}px`);

  // console.log(navHeight)

  const stickyNav = function (entries) {
    const [entry] = entries;
    // console.log(entry)

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  };
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });

  headerObserver.observe(header);

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

  // Slider
  // const slider = function () {
  //   const slides = document.querySelectorAll('.kar');
  //   const btnLeft = document.querySelector('.slider__btn--left');
  //   const btnRight = document.querySelector('.slider__btn--right');

  //   const dotContainer = document.querySelector('.dots');

  //   let curSlide = 0;
  //   const maxSlide = slides.length;

  //   const slider = document.querySelector('.karusel');
  //   const createDots = function () {
  //     slides.forEach(function (_, i) {
  //       dotContainer.insertAdjacentHTML(
  //         'beforeend',
  //         `<button class="dots__dot" data-slide="${i}">${i + 1}</button>`
  //       );
  //     });
  //   };

  //   // createDots();

  //   const activateDot = function (slide) {
  //     document
  //       .querySelectorAll('.dots__dot')
  //       .forEach((dot) => dot.classList.remove('dots__dot--active'));

  //     document
  //       .querySelector(`.dots__dot[data-slide="${slide}"]`)
  //       .classList.add('dots__dot--active');
  //   };
  //   // activateDot(0);

  //   const goToSlide = function (slide) {
  //     slides.forEach(
  //       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  //     );
  //   };

  //   // goToSlide(0);

  //   // Next slide
  //   const nextSlide = function () {
  //     if (curSlide === maxSlide - 1) {
  //       curSlide = 0;
  //     } else {
  //       curSlide++;
  //     }

  //     goToSlide(curSlide);
  //     activateDot(curSlide);
  //   };

  //   const prevSlide = function () {
  //     if (curSlide === 0) {
  //       curSlide = maxSlide - 1;
  //     } else {
  //       curSlide--;
  //     }
  //     goToSlide(curSlide);
  //     activateDot(curSlide);
  //   };

  //   // const init = function () {
  //   //   goToSlide(0);
  //   //   createDots();
  //   //   activateDot(0);
  //   // };

  //   // init();

  //   // Event handlers
  //   btnRight.addEventListener('click', nextSlide);
  //   btnLeft.addEventListener('click', prevSlide);

  //   document.addEventListener('keydown', function (e) {
  //     // console.log(e);

  //     if (e.key === 'ArrowLeft') prevSlide();
  //     e.key === 'ArrowRight' && nextSlide();
  //   });

  //   dotContainer.addEventListener('click', function (e) {
  //     if (e.target.classList.contains('dots__dot')) {
  //       // console.log('DOT');
  //       const { slide } = e.target.dataset;
  //       goToSlide(slide);
  //       activateDot(slide);
  //     }
  //   });
  // };

  // slider();
} catch (err) {
  console.log(err);
}
