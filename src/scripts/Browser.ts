import {Note} from "./note/Note.js";
import Thumbnail from "./Thumbnail.js";

export class Browser {
    element: HTMLElement;
    openNote: (note: Note) => void;

    constructor(
        element: HTMLElement,
        openNote: (note: Note) => void) {
        this.element = element;
        this.openNote = openNote;
    }
    
    add(note: Note) {
        new Thumbnail(this.element, note, () => this.openNote(note), () => { return true; });
    }
}
