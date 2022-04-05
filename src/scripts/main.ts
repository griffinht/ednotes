import {loadDatabase} from "./database/databases/IndexedDatabase.js";
import {NewModal} from "./newModal/NewModal.js";
import { Notes } from "./Notes.js";



import {TextNote} from "./note/notes/TextNote.js";

const database = await loadDatabase();
const notes = new Notes(
    database, 
    document.getElementsByClassName("editor")[0] as HTMLElement, 
    document.getElementsByClassName("browser")[0] as HTMLElement,
    document.getElementsByTagName("header")[0] as HTMLElement);

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

