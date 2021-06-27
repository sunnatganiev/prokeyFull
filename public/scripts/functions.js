const elToastWrapper = $("#toast-wrapper");

function getToast(msg, type) {
  return `<div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="min-width: 300px;">
  <div class="toast-header justify-content-between">
    <div style="width: 20px;height: 20px;" class="rounded bg-${type} mr-2"></div>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      &times;
    </button>
  </div>
  <div class="toast-body">
    <strong>${msg}</strong>
  </div>
</div>`;
}
const toast = {
  success(msg) {
    elToastWrapper.append(getToast(msg, "success"));
  },
};

const richTextOptions = {
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
};
