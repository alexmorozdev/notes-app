import { notes, icons, cat } from "./data.js";
import {
  notesTableRender,
  statusTableRender,
  archivedTableRender,
} from "./render_functions.js";

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
        dates = content.match(regExp).join(", ");
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
    notesTableRender(notes, ".table-body");
    statusTableRender(notes);
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
      if (elem.classList.contains("note-unarchive")) {
        unArchiveNote(event);
      }
      if (elem.classList.contains("note-delete")) {
        deleteNote(event);
      }
      if (elem.classList.contains("delete-all")) {
        deleteAllNotes();
      }
      if (elem.classList.contains("delete-all-archived")) {
        deleteAllArchivedNotes();
      }
      if (elem.classList.contains("archive-all")) {
        archiveAllNotes();
      }
      if (elem.classList.contains("unarchive-all")) {
        unArchiveAllNotes();
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
            notes[i].dates = data.content.value.match(regExp).join(", ");
          }
          data.category.value = "";
          data.name.value = "";
          data.content.value = "";
          document.querySelector(".edit-note").classList.add("hide");
          notesTableRender(notes, ".table-body");
          statusTableRender(notes);
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
  notesTableRender(notes, ".table-body");
  statusTableRender(notes);
  archivedTableRender(notes);
  actions();
}

function unArchiveNote(event) {
  let noteId = event.path[2].id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].created == noteId) {
      notes[i].status = "active";
    }
  }
  notesTableRender(notes, ".table-body");
  statusTableRender(notes);
  archivedTableRender(notes);
  actions();
}

function deleteNote(event) {
  let noteId = event.path[2].id;
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].created == noteId) {
      notes.splice(i, 1);
      notesTableRender(notes, ".table-body");
      statusTableRender(notes);
      archivedTableRender(notes);
      actions();
    }
  }
}

function deleteAllNotes() {
  notes.splice(0, notes.length);
  notesTableRender(notes, ".table-body");
  statusTableRender(notes);
  actions();
}

function deleteAllArchivedNotes() {
  notes.filter((elem, index) => {
    if (elem.status == "archive") {
      notes.splice(index, 1);
    }
  });
  notesTableRender(notes, ".table-body");
  statusTableRender(notes);
  archivedTableRender(notes);
  actions();
}

function archiveAllNotes() {
  notes.forEach((elem) => (elem.status = "archive"));
  notesTableRender(notes, ".table-body");
  statusTableRender(notes);
  archivedTableRender(notes);
  actions();
}

function unArchiveAllNotes() {
  notes.forEach((elem) => (elem.status = "active"));
  notesTableRender(notes, ".table-body");
  statusTableRender(notes);
  archivedTableRender(notes);
  actions();
}
