import {loadDatabase} from "./database.js";
import {NewModal} from "./newModal/NewModal.js";
import {Notes} from "./note/Notes.js";
import {Viewer} from "./Viewer.js";

const database = await loadDatabase();
const notes = new Notes(database, document.getElementsByClassName("browser")[0] as HTMLElement, document.getElementsByTagName("footer")[0]);



const modal = new NewModal(
    document.getElementById("newModal")!, 
    document.getElementById("newModalOpenButton")!,
    async () => {
        console.log("submit");
        return true;
    },
    async (url: string) => {
        console.log(url);
        return true;
    },
    async (file: File) => {
        console.log(file);
        return true;
    });
document.addEventListener("keypress", (e) => {
  if (e.code === "Slash" && modal.openModal()) {
    e.preventDefault(); 
  }
});



const viewer = new Viewer(document.getElementsByClassName("viewer")[0] as HTMLElement);

