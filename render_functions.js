import { actions } from "./functions.js";

function dateFromUnixTime(time) {
  return new Date(time).toLocaleDateString("us-EN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function notesTableRender(arr, selector) {
  const tableBody = document.querySelector(selector);
  let activeNotesArray = arr.filter((elem) => elem.status == "active");
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

export function statusTableRender(arr) {
  const activeIdeaCount = document.querySelector(".active-idea");
  const archiveIdeaCount = document.querySelector(".archived-idea");
  const activeTaskCount = document.querySelector(".active-task");
  const archiveTaskCount = document.querySelector(".archived-task");
  const activeThoughtCount = document.querySelector(".active-thought");
  const archiveThoughtCount = document.querySelector(".archived-thought");
  let activeNotesArray = arr.filter((elem) => elem.status == "active");
  let archiveNotesArray = arr.filter((elem) => elem.status == "archive");

  activeTaskCount.innerHTML = activeNotesArray.filter(
    (elem) => elem.category == "Task"
  ).length;
  archiveTaskCount.innerHTML = archiveNotesArray.filter(
    (elem) => elem.category == "Task"
  ).length;

  activeIdeaCount.innerHTML = activeNotesArray.filter(
    (elem) => elem.category == "Idea"
  ).length;
  archiveIdeaCount.innerHTML = archiveNotesArray.filter(
    (elem) => elem.category == "Idea"
  ).length;

  activeThoughtCount.innerHTML = activeNotesArray.filter(
    (elem) => elem.category == "Random thought"
  ).length;
  archiveThoughtCount.innerHTML = archiveNotesArray.filter(
    (elem) => elem.category == "Random thought"
  ).length;
}

export function archivedTableRender(arr) {
  const tableBody = document.querySelector(".archived-table-body");
  let archiveNotesArray = arr.filter((elem) => elem.status == "archive");
  if (archiveNotesArray.length == 0) {
    document.querySelector(".archived-notes").classList.add("hide");
  } else {
    document.querySelector(".archived-notes").classList.remove("hide");
  }
  let arrayOfTableRows = archiveNotesArray.map(
    (item) => `<tr id=${item.created}>
          <td>${item.icon}</td>
          <td>${item.name}</td>
          <td>${item.category}</td>
          <td class="icon note-edit"><i class="fas fa-edit"></i></td>
          <td class="icon note-unarchive"><i class="fas fa-archive"></i></td>
          <td class="icon note-delete"><i class="fas fa-trash"></td>
        </tr>`
  );
  let out = "";
  for (let i = 0; i < arrayOfTableRows.length; i++) {
    out += arrayOfTableRows[i];
  }
  tableBody.innerHTML = out;
  actions();
}
