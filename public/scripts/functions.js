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
