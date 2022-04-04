import {Note} from "./note/Note.js";
import Thumbnail from "./Thumbnail.js";

export class Browser {
    element: HTMLElement;
    openNote: (note: Note) => void;
    removeNote: (id: ArrayBuffer) => Promise<void>;
    updateNote: (id: ArrayBuffer, note: Note) => Promise<void>;

    constructor(
        element: HTMLElement,
        openNote: (note: Note) => void,
        removeNote: (id: ArrayBuffer) => Promise<void>,
        updateNote: (id: ArrayBuffer, note: Note) => Promise<void>) {
        this.element = element;
        this.openNote = openNote;
        this.removeNote = removeNote;
        this.updateNote = updateNote;
    }
    
    add(id: ArrayBuffer, note: Note) {
        new Thumbnail(
            this.element,
            note,
            () => this.openNote(note),
            () => this.removeNote(id),
            () => this.updateNote(id, note));
    }
}
