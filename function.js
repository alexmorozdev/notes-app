import { notes, icons, cat } from "./data.js";

function dateFromUnixTime(time) {
  return new Date(time).toLocaleDateString("us-EN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function tableRender(arr, selector) {
  const tableBody = document.querySelector(selector);

  const activeIdeaCount = document.querySelector(".active-idea");
  const archiveIdeaCount = document.querySelector(".archive-idea");
  const activeTaskCount = document.querySelector(".active-task");
  const archiveTaskCount = document.querySelector(".archive-task");
  const activeThoughtCount = document.querySelector(".active-thought");
  const archiveThoughtCount = document.querySelector(".archive-thought");
  let activeNotesArray = arr.filter((elem) => elem.status == "active");
  let archiveNotesArray = arr.filter((elem) => elem.status == "archive");
  activeIdeaCount.innerHTML = activeNotesArray.filter(
    (elem) => elem.category == "Idea"
  ).length;
  archiveIdeaCount.innerHTML = archiveNotesArray.filter(
    (elem) => elem.category == "Idea"
  ).length;
  activeTaskCount.innerHTML = activeNotesArray.filter(
    (elem) => elem.category == "Task"
  ).length;
  archiveTaskCount.innerHTML = archiveNotesArray.filter(
    (elem) => elem.category == "Task"
  ).length;
  activeThoughtCount.innerHTML = activeNotesArray.filter(
    (elem) => elem.category == "Random thought"
  ).length;
  archiveThoughtCount.innerHTML = archiveNotesArray.filter(
    (elem) => elem.category == "Random thought"
  ).length;

  let arrayOfTableRows = activeNotesArray.map(
    (item) => `<tr id=${item.created}>
      <td>${item.icon}</td>
      <td>${item.name}</td>
      <td>${dateFromUnixTime(+item.created)}</td>
      <td>${item.category}</td>
      <td>${item.content}</td>
      <td>${item.dates}</td>
      <td class="icon note-edit"><i class="fas fa-edit"></i></td>
      <td class="icon note-archive"><i class="fas fa-archive"></i></td>
      <td class="icon note-delete"><i class="fas fa-trash"></td>
    </tr>`
  );
  let out = "";
  for (let i = 0; i < arrayOfTableRows.length; i++) {
    out += arrayOfTableRows[i];
  }
  return (tableBody.innerHTML = out);
}

export function createNote() {
  document.querySelector(".add-note").classList.remove("hide");
  document.querySelector(".edit-note").classList.add("hide");
  document
    .querySelector(".add-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      let data = event.target.elements;
      let icon = icons[data.category.value];
      let category = cat[data.category.value];
      let name = data.name.value;
      let content = data.content.value;
      const regExp =
        /(0?[1-9]|[12][0-9]|3[01])[\/.\/](0?[1-9]|1[012])[\/.\/]([0-2]\d{3}|\d{2})/gm;
      let dates = "";
      if (content.match(regExp)) {
        dates = content.match(regExp);
      }
      let time = Date.now();
      let status = "active";
      addNote(icon, name, time, category, content, dates, status);
      data.category.value = "";
      data.name.value = "";
      data.content.value = "";
      document.querySelector(".add-note").classList.add("hide");
    });
}

function addNote(icon, name, created, category, content, dates, status) {
  if (category) {
    let newNote = {
      icon: icon,
      name: name,
      created: created,
      category: category,
      content: content,
      dates: dates,
      status: status,
    };
    notes.push(newNote);
    tableRender(notes, ".table-body");
    actions();
  }
}

export function actions() {
  document.querySelectorAll(".icon").forEach((elem) =>
    elem.addEventListener("click", function (event) {
      if (elem.classList.contains("note-edit")) {
        editNote(event);
      }
      if (elem.classList.contains("note-archive")) {
        archiveNote(event);
      }
      if (elem.classList.contains("note-delete")) {
        deleteNote(event);
      }
      if (elem.classList.contains("delete-all")) {
        deleteAllNotes();
      }
      if (elem.classList.contains("archive-all")) {
        archiveAllNotes();
      }
    })
  );
}

function editNote(event) {
  document.querySelector(".edit-note").classList.remove("hide");
  document.querySelector(".add-note").classList.add("hide");
  let editCategory = document.querySelector("#edit-category");
  let editName = document.querySelector("#edit-name");
  let editContent = document.querySelector("#edit-content");
  let noteId = event.path[2].id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].created == noteId) {
      editCategory.children[0].textContent = notes[i].category;
      editName.value = notes[i].name;
      editContent.value = notes[i].content;
      document
        .querySelector(".edit-form")
        .addEventListener("submit", function (event) {
          event.preventDefault();
          let data = event.target.elements;
          notes[i].icon = icons[data.category.value];
          notes[i].category = cat[data.category.value];
          notes[i].name = data.name.value;
          notes[i].content = data.content.value;
          const regExp =
            /(0?[1-9]|[12][0-9]|3[01])[\/.\/](0?[1-9]|1[012])[\/.\/]([0-2]\d{3}|\d{2})/gm;
          if (data.content.value.match(regExp)) {
            notes[i].dates = data.content.value.match(regExp);
          }
          data.category.value = "";
          data.name.value = "";
          data.content.value = "";
          document.querySelector(".edit-note").classList.add("hide");
          tableRender(notes, ".table-body");
          actions();
        });
    }
  }
}

function archiveNote(event) {
  let noteId = event.path[2].id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].created == noteId) {
      notes[i].status = "archive";
    }
  }
  tableRender(notes, ".table-body");
  actions();
}

function deleteNote(event) {
  let noteId = event.path[2].id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].created == noteId) {
      notes.splice(i, 1);
      tableRender(notes, ".table-body");
      actions();
    }
  }
}

function deleteAllNotes() {
  notes.splice(0, notes.length);
  tableRender(notes, ".table-body");
  actions();
}

function archiveAllNotes() {
  notes.forEach((elem) => (elem.status = "archive"));
  tableRender(notes, ".table-body");
  actions();
}
