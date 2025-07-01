// user inputs constants
const input_todoDes = document.getElementById("todo-des");
const input_todoDate = document.getElementById("todo-date");
const addTodoBtn = document.getElementById("add-todo");
const todoListDiv = document.getElementById("todo-list");

window.addEventListener("DOMContentLoaded", () => {
  input_todoDes.focus();
  const savedTodos = JSON.parse(localStorage.getItem("Todo List")) || [];
  savedTodos.forEach((item) => {
    displayTodoList(item.des, item.date);
  });
});

function saveTodo() {
  const todo = [];
  document.querySelectorAll(".list-todo-div").forEach((item) => {
    todo.push({
      des: item.querySelector(".list-todo-des").value,
      date: item.querySelector(".list-todo-date").value,
      id: item.dataset.id,
    });
  });
  localStorage.setItem("Todo List", JSON.stringify(todo));
}

addTodoBtn.addEventListener("click", () => {
  if (!checkInput()) return;

  displayTodoList(input_todoDes.value, input_todoDate.value);
  saveTodo();
  input_todoDes.value = "";
  input_todoDate.value = "";
  todoListDiv.scrollTo({ top: todoListDiv.scrollHeight, behavior: "smooth" });
});

function checkInput() {
  const lastElem = document.body.lastElementChild;
  if (input_todoDes.value.trim() == "") {
    const errPara = document.createElement("p");
    errPara.classList.add("err-para");
    errPara.textContent = "Please enter atleast the todo!";
    errPara.classList.add("animated-in");
    errPara.addEventListener("animationend", () => {
      errPara.classList.remove("animated-in");
    });

    if (!lastElem || !lastElem.classList.contains("err-para")) {
      document.body.appendChild(errPara);
    }

    setTimeout(() => {
      errPara.classList.add("animated-out");
      errPara.addEventListener(
        "animationend",
        () => {
          document.body.removeChild(errPara);
        },
        { once: true }
      );
    }, 1000);
    input_todoDes.focus();
    return false;
  }
  return true;
}

function displayTodoList(taskDes, taskDate, listId = Date.now().toString()) {
  input_todoDes.focus();

  const list_todoDiv = document.createElement("div");
  list_todoDiv.classList.add("list-todo-div");
  list_todoDiv.dataset.id = listId;

  const list_todoDesDate_container = document.createElement("div");
  list_todoDesDate_container.classList.add("list-tododesdate-container");

  const list_todoDes = document.createElement("input");
  list_todoDes.type = "text";
  list_todoDes.readOnly = true;
  list_todoDes.classList.add("list-todo-des");
  list_todoDes.classList.add("no-focus");

  const list_todoDate = document.createElement("input");
  list_todoDate.type = "date";
  list_todoDate.readOnly = true;
  list_todoDate.classList.add("list-todo-date");
  list_todoDate.classList.add("no-focus");

  const list_todoBtnsDiv = document.createElement("div");
  list_todoBtnsDiv.classList.add("list-todobtns-div");

  const list_todoEditBtn = document.createElement("button");
  list_todoEditBtn.classList.add("edit-btn");
  const list_todoDelBtn = document.createElement("button");
  list_todoDelBtn.classList.add("del-btn");

  list_todoDes.value = taskDes;
  list_todoDate.value = taskDate;

  list_todoEditBtn.textContent = "Edit";
  list_todoEditBtn.addEventListener("click", () => {
    edit(list_todoDes, list_todoDate, list_todoEditBtn, list_todoBtnsDiv);
  });
  list_todoDelBtn.textContent = "Del";
  list_todoDelBtn.addEventListener("click", () => {
    del(list_todoDiv);
  });

  list_todoDesDate_container.appendChild(list_todoDes);
  list_todoDesDate_container.appendChild(list_todoDate);

  list_todoBtnsDiv.appendChild(list_todoEditBtn);
  list_todoBtnsDiv.appendChild(list_todoDelBtn);

  list_todoDiv.appendChild(list_todoDesDate_container);
  list_todoDiv.appendChild(list_todoBtnsDiv);
  todoListDiv.appendChild(list_todoDiv);
}

function edit(list_todoDes, list_todoDate, list_todoEditBtn, list_todoBtnsDiv) {
  list_todoDes.readOnly = false;
  list_todoDes.focus();
  list_todoDes.classList.remove("no-focus");

  list_todoDate.readOnly = false;
  list_todoDate.classList.remove("no-focus");

  const list_todoSaveBtn = document.createElement("button");
  list_todoSaveBtn.textContent = "Save";
  list_todoSaveBtn.classList.add("save-btn");
  list_todoSaveBtn.addEventListener("click", () => {
    save(list_todoDes, list_todoDate, list_todoSaveBtn, list_todoBtnsDiv);
  });

  list_todoBtnsDiv.replaceChild(list_todoSaveBtn, list_todoEditBtn);
}

function save(list_todoDes, list_todoDate, list_todoSaveBtn, list_todoBtnsDiv) {
  list_todoDes.readOnly = true;
  list_todoDate.readOnly = true;

  const list_todoEditBtn = document.createElement("button");
  list_todoEditBtn.textContent = "Edit";
  list_todoEditBtn.classList.add("edit-btn");
  list_todoEditBtn.addEventListener("click", () => {
    edit(list_todoDes, list_todoDate, list_todoEditBtn, list_todoBtnsDiv);
  });

  list_todoBtnsDiv.replaceChild(list_todoEditBtn, list_todoSaveBtn);
  saveTodo();
}

function del(list_todoDiv) {
  const confirmDelDiv = document.createElement("div");
  confirmDelDiv.classList.add("confirm-del-div");
  confirmDelDiv.classList.add("animated-in");
  confirmDelDiv.addEventListener("animationend", () => {
    confirmDelDiv.classList.remove("animated-in");
  });

  const confirmDelTxt = document.createElement("p");
  confirmDelTxt.textContent = "Are you sure your want to delete the todo?";

  const confirmBtnDiv = document.createElement("div");
  confirmBtnDiv.classList.add("confirm-btn-div");

  const confirmYesBtn = document.createElement("button");
  confirmYesBtn.classList.add("confirm-yes-btn");
  confirmYesBtn.textContent = "YES";

  const confirmNoBtn = document.createElement("button");
  confirmNoBtn.classList.add("confirm-no-btn");
  confirmNoBtn.textContent = "NO";

  confirmBtnDiv.appendChild(confirmYesBtn);
  confirmBtnDiv.appendChild(confirmNoBtn);

  const fragment = document.createDocumentFragment();
  fragment.appendChild(confirmDelTxt);
  fragment.appendChild(confirmBtnDiv);

  confirmDelDiv.appendChild(fragment);

  document.body.appendChild(confirmDelDiv);

  confirmYesBtn.addEventListener("click", () => {
    confirmDelDiv.classList.add("animated-out");
    confirmDelDiv.addEventListener(
      "animationend",
      () => {
        confirmDelDiv.remove();
        list_todoDiv.remove();
        saveTodo();
      },
      { once: true }
    );
  });

  confirmNoBtn.addEventListener("click", () => {
    confirmDelDiv.classList.add("animated-out");
    confirmDelDiv.addEventListener(
      "animationend",
      () => {
        confirmDelDiv.remove();
      },
      { once: true }
    );
  });
}
