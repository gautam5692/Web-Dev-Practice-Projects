// input field
const input = document.getElementById("input");

for (let i = 0; i <= 9; i++) {
  document.getElementById(i).addEventListener("click", () => {
    input.value += i;
  });
}

function operator(userInput) {
  if (["+", "-", "*", "/"].includes(input.value.slice(-1))) {
    input.value = input.value.slice(0, -1) + userInput;
  } else {
    input.value += userInput;
  }
}

function calculate() {
  if (/[a-zA-Z]/.test(input.value)) {
    input.value = "Invalid";
    return;
  }
  input.value = eval(input.value);
}

function del() {
  input.value = input.value.slice(0, -1);
}

function clr() {
  input.value = null;
}
