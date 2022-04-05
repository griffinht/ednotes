import {Note} from "./note/Note.js";
import Thumbnail from "./Thumbnail.js";
import Data from "./common/Data.js";

export class Browser {
    element: HTMLElement;
    openNote: (note: Data<Note>) => void;

    constructor(
        element: HTMLElement,
        openNote: (note: Data<Note>) => void) {
        this.element = element;
        this.openNote = openNote;
    }
    
    add(note: Data<Note>) {
        this.element.append(new Thumbnail(note, () => this.openNote(note)).element);
    }
    
    open() {
        this.element.style.display = "grid";
    }
    
    close() {
        this.element.style.display = "none";
    }
}
