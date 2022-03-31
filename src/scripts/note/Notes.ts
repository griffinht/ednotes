import {Database} from "../database.js";
import {Note} from "./Note.js";

export class Notes {
    notes: Map<ArrayBuffer, Note> = new Map<ArrayBuffer, Note>();
    database: Database
    element: HTMLElement
    before: Element

    constructor(database: Database, element: HTMLElement, before: Element) {
        this.database = database;
        this.database
            .getNotes()
            .then((notes: Map<ArrayBuffer, Note>) => {
                for (let [id, note] of notes.entries()) {
                    this._add(id, note)
                }
            });
        this.element = element;
        this.before = before;
    }

    add(note: Note) {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        this.database.putNote(id, note).then();
    }
    
    _add(id: ArrayBuffer, note: Note) {
        this.notes.set(id, note);
        this.element.appendChild(note.thumbnail);
    }
/*
    openVideo(video: Video) {
        document.body.insertBefore(video.createElement(() => { this.element.style.display = "grid"; }), this.before);
        this.element.style.display = "none";
    }

    async removeVideo(id: ArrayBuffer) {
        this.videos.delete(id);
        await this.database.removeVideo(id);
    }
    
    async updateVideo(id: ArrayBuffer, video: Video) {
        await this.database.putVideo(id, video);
    }
*/
}
