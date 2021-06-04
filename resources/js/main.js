//=require jquery/dist/jquery.js
//=require popper.js/dist/umd/popper.js
//=require bootstrap/dist/js/bootstrap.bundle.js
//=require imask/dist/imask.js
//=require ./all.js
//=require ./script.js

const elsPhoneMask = document.querySelectorAll(".phone-input-mask");
const phoneMask = {
  mask: "+{998} (00) 000-00-00",
  lazy: false,
  placeholderChar: "_",
};

elsPhoneMask?.forEach((el) => {
  IMask(el, phoneMask);
});

jQuery(function () {
  if ($(window).width() < 800) {
    $("body").addClass("sidebar--close");
  }

  $(".js-toggle-sidebar").on("click", () => {
    $("body").toggleClass("sidebar--close");
  });
});
