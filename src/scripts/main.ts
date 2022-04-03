import {loadDatabase} from "./database/databases/IndexedDatabase.js";
import {NewModal} from "./newModal/NewModal.js";
import {Browser} from "./Browser.js";
import {Editor} from "./Editor.js";
import { Notes } from "./Notes.js";



import {TextNote} from "./note/notes/TextNote.js";

const database = await loadDatabase();
const editor = new Editor(document.getElementsByClassName("viewer")[0] as HTMLElement);
const browser = new Browser(
    document.getElementsByClassName("browser")[0] as HTMLElement,
    editor);
const notes = new Notes(database, browser, editor);


const modal = new NewModal(
    document.getElementById("newModal")!, 
    document.getElementById("newModalOpenButton")!,
    async () => {
        notes.add(new TextNote());
        return true;
    },
    async (url: string) => {
        return true;
    },
    async (file: File) => {
        return true;
    });
document.addEventListener("keypress", (e) => {
  if (e.code === "Slash" && modal.openModal()) {
    e.preventDefault(); 
  }
});




