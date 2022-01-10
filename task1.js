import { notes } from "./data.js";
import { createNote, actions } from "./functions.js";
import {
  notesTableRender,
  statusTableRender,
  archivedTableRender,
} from "./render_functions.js";

notesTableRender(notes, ".table-body");

statusTableRender(notes);

archivedTableRender(notes);

document.querySelector(".create-note").onclick = createNote;

actions();
