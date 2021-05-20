let btnAdd = document.querySelector("#add");
let btnSubtract = document.querySelector("#subtract");
let input = document.querySelector("#requested_goods_input_amount");

btnAdd.addEventListener("click", () => {
  input.value = parseInt(input.value) + 1;
});

btnSubtract.addEventListener("click", () => {
  input.value = parseInt(input.value) - 1;
});
