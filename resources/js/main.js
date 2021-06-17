//=require jquery/dist/jquery.js
//=require popper.js/dist/umd/popper.js
//=require bootstrap/dist/js/bootstrap.bundle.js
//=require bootstrap-fileinput/js/fileinput.js
//=require bootstrap-fileinput/themes/fas/theme.js
//=require bootstrap-fileinput/js/locales/uz.js
//=require @fancyapps/fancybox/dist/jquery.fancybox.js
//=require imask/dist/imask.js
//=require ./jquery.richtext.js
//=require ./script.js
// require('bootstrap-fileinput/themes/fas/theme.js');

const elsPhoneMask = document.querySelectorAll(".phone-input-mask");
const phoneMask = {
  mask: "+{998} (00) 000-00-00",
  lazy: false,
  placeholderChar: "_",
};

elsPhoneMask?.forEach((el) => {
  IMask(el, phoneMask);
});

$(window).on("load", function () {
  $(".preloader").fadeOut();
});

jQuery(function () {
  $(".toast").toast();

  if ($(window).width() < 800) {
    $("body").addClass("sidebar--close");
  }

  $(".js-toggle-sidebar").on("click", () => {
    $("body").toggleClass("sidebar--close");
  });
  console.log($("#input-images").data("images"));
  $("#input-images").fileinput({
    showUpload: false,
    maxFileCount: $("#input-images").data("count") || 10,
    showCaption: false,
    showRemove: false,
    language: "uz",
    theme: "fas",
    dropZoneEnabled: true,
    allowedFileExtensions: ["jpg", "png", "svg", "jpeg", "webp"],
    initialPreview: $("#input-images").data("images") || [],
    initialPreviewAsData: true,
    browseClass: "btn btn-primary btn-block",
    //change this url
    deleteUrl: "https://httpbin.org/post",
    overwriteInitial: true,

    // ...($("#input-images").data("gallery") && {
    //   uploadUrl: "https://httpbin.org/post",
    // }),
  });

  $("#product-description").richText({
    fonts: false,
    fontColor: false,
    fontSize: true,

    // uploads
    imageUpload: false,
    fileUpload: false,

    // media
    videoEmbed: false,

    // link
    urls: true,

    // tables
    table: false,

    // code
    removeStyles: true,
    code: false,

    translations: {
      sameTab: "Joriy tabda",
      newTab: "Yangi tabda",
      title: "Sarlavha",
      linkText: "Matnga havola",
      url: "URL",
      size: "O'lcham",
      responsive: "Moslashuvchan",
      text: "Matn",
      openIn: "Ochish",
      align: "Tekislash",
      left: "Chap",
      center: "Markaz",
      right: "O'ng",
      add: "Qo'shish",
      pleaseEnterURL: "Havola kiriting",
      bold: "Qalin matn",
      italic: "Kursiv",
      underline: "Tag chiziqli",
      alignLeft: "Chapga tekislash",
      alignCenter: "Markazga tekislash",
      alignRight: "O'nga tekislash",
      addOrderedList: "Tartiblangan ro'yxat",
      addUnorderedList: "Tartiblanmagan ro'yxat",
      addHeading: "Sarlavha qo'shish",
      addFontSize: "Shrift o'lchami",
      addURL: "Havola qo'shish",
      removeStyles: "Remove styles",
      undo: "Orqaga",
      redo: "Oldinga",
      close: "Yopish",
    },
  });
});
