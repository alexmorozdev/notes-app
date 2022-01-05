import { notes } from "./data.js";
import { tableRender, createNote, actions } from "./function.js";

tableRender(notes, ".table-body");
document.querySelector(".create-note").onclick = createNote;

actions();
