import {loadDatabase} from "./database/databases/IndexedDatabase.js";
import {NewModal} from "./newModal/NewModal.js";
import {Browser} from "./Browser.js";
import {Editor} from "./Editor.js";



import {TextNote} from "./note/notes/TextNote.js";

const database = await loadDatabase();
const editor = new Editor(document.getElementsByClassName("viewer")[0] as HTMLElement);
const browser = new Browser(
    database,
    editor,
    document.getElementsByClassName("browser")[0] as HTMLElement,
    document.getElementsByTagName("footer")[0]);



const modal = new NewModal(
    document.getElementById("newModal")!, 
    document.getElementById("newModalOpenButton")!,
    async () => {
        let note = new TextNote();
        browser.add(note);
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




