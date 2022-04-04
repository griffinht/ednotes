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
        new Thumbnail(
            this.element,
            note,
            () => this.openNote(note));
    }
}
