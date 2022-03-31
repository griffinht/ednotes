import {Note} from "./note/Note.js";

export class Viewer {
    element: HTMLElement;
    note: Note | null = null;
    
    constructor(element: HTMLElement) {
        this.element = element;
    }
    
    open(note: Note) {
        if (this.note === null) {
            close();
        }
        this.note = note;
        console.log("open note " + note);
    }
    
    close() {
        if (this.note === null) {
            console.warn7("tried to close when there is no note to close");
        }
        this.note = null;
    }
}
