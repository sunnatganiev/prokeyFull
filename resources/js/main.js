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
//=require './functions.js
// require('bootstrap-fileinput/themes/fas/theme.js');

const elsPhoneMask = document.querySelectorAll(".phone-input-mask");
const phoneMask = {
  mask: "+{998} (00) 000-00-00",
  lazy: true,
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
  $('[data-toggle="tooltip"]').tooltip();

  elToastWrapper.on("click", ".close", function () {
    $(this).parent().parent().remove();
  });

  $(".custom-file-input").on("change", function (e) {
    var fileName = e.target.files[0].name;
    $(this).next().text(fileName);
  });

  if ($(window).width() < 800) {
    $("body").addClass("sidebar--close");
  }

  $(".js-toggle-sidebar").on("click", () => {
    $("body").toggleClass("sidebar--close");
  });
  const dataImages = $(".file-loading input").data("images");
  const images = dataImages && dataImages.split(",");
  const imgConfig =
    dataImages && dataImages.split(",").map((x) => ({ key: x }));
  const fileInputOptions = {
    showUpload: false,
    maxFileCount: $("#input-images").data("count") || 10,
    showCaption: false,
    showRemove: false,
    language: "uz",
    theme: "fas",
    dropZoneEnabled: true,
    allowedFileExtensions: ["jpg", "png", "svg", "jpeg", "webp"],
    initialPreview: images || [],
    initialPreviewConfig: imgConfig || [],

    initialPreviewAsData: true,
    browseClass: "btn btn-primary btn-block",
    deleteUrl: "/api/v1/gallery/delete",
    //change this url
    overwriteInitial: false,
  };
  $("#input-news-images").fileinput({
    ...fileInputOptions,
    initialPreviewShowDelete: false,
  });
  $("#input-feedback-images").fileinput({
    ...fileInputOptions,
    initialPreviewShowDelete: false,
  });
  $("#input-banner-images").fileinput({
    ...fileInputOptions,
    initialPreviewShowDelete: false,
  });
  $("#input-gallery-images")
    .fileinput(fileInputOptions)
    .on("fileloaded", function (e, file) {
      const formData = new FormData();
      formData.append("image", file);
      $.ajax({
        url: "/api/v1/gallery/add",
        method: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: (res) => {
          if (res?.file) {
            toast.success("Yuklandi!");
          }
        },
        error: (err) => console.log(err),
      });
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
