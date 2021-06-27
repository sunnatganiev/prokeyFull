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
  //translations request
  $(".js-save-string").on("click", function (evt) {
    const btn = $(this);
    const btnHtml = `<i class="fas fa-check-square"></i>`;
    const dataKey = btn.data("key");
    console.log(dataKey);
    const newValue = btn.parent().parent().find(".form-control").val();

    $.ajax({
      url: "/api/v1/translations/static/edit",
      method: "PUT",
      data: { key: dataKey, value: newValue },
      beforeSend: () => {
        btn.html(`<div class="spinner-border" role="status"></div>`);
      },
      success: (res) => {
        btn.html(btnHtml);
      },
      error: (err) => {
        btn.html(btnHtml);
      },
    });
  });

  $(".js-product-translate").on("click", function (evt) {
    const btn = $(this);
    const btnHtml = `<i class="fas fa-check-square"></i>`;
    const id = btn.data("id");
    const name = btn.parent().parent().find("input").val();
    const description = btn.parent().parent().find("textarea").val();

    $.ajax({
      url: "/api/v1/translations/field/product",
      method: "PUT",
      data: { id, name, description },
      beforeSend: () => {
        btn.html(`<div class="spinner-border" role="status"></div>`);
      },
      success: (res) => {
        btn.html(btnHtml);
      },
      error: (err) => {
        btn.html(btnHtml);
      },
    });
  });

  $(".js-news-translate").on("click", function (evt) {
    const btn = $(this);
    const btnHtml = `<i class="fas fa-check-square"></i>`;
    const id = btn.data("id");
    const title = btn.parent().parent().find(".js-title").val();
    const shortDescription = btn
      .parent()
      .parent()
      .find(".js-short-description")
      .val();
    const description = btn.parent().parent().find(".js-description").val();

    $.ajax({
      url: "/api/v1/translations/field/news",
      method: "PUT",
      data: { id, title, shortDescription, description },
      beforeSend: () => {
        btn.html(`<div class="spinner-border" role="status"></div>`);
      },
      success: (res) => {
        btn.html(btnHtml);
      },
      error: (err) => {
        btn.html(btnHtml);
      },
    });
  });

  $(".js-banners-translate").on("click", function (evt) {
    const btn = $(this);
    const btnHtml = `<i class="fas fa-check-square"></i>`;
    const id = btn.data("id");
    const title = btn.parent().parent().find(".js-title").val();
    const description = btn.parent().parent().find(".js-description").val();

    $.ajax({
      url: "/api/v1/translations/field/banner",
      method: "PUT",
      data: { id, title, description },
      beforeSend: () => {
        btn.html(`<div class="spinner-border" role="status"></div>`);
      },
      success: (res) => {
        btn.html(btnHtml);
      },
      error: (err) => {
        btn.html(btnHtml);
      },
    });
  });

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
  $("#input-product-images").fileinput({
    ...fileInputOptions,
    initialPreviewShowDelete: false,
    overwriteInitial: true,
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

  $("#product-description").richText(richTextOptions);
  for (let i = 0; i < +$("#rich-texts").data("count"); i++) {
    $(`#textarea-${i}`).richText(richTextOptions);
  }
});
