import {Database} from "../database.js";
import {Note} from "./Note.js";

export class Notes {
    videos: Map<ArrayBuffer, Note> = new Map<ArrayBuffer, Note>();
    database: Database
    element: HTMLElement
    before: Element

    constructor(database: Database, element: HTMLElement, before: Element) {
        this.database = database;
        this.database
            .getNotes()
            .then((notes: Map<ArrayBuffer, Note>) => {
                for (let [id, note] of notes.entries()) {
                    //this._addNote(id, video)
                }
            });
        this.element = element;
        this.before = before;
    }

    addNote(note: Note) {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        //this._addNote(id, note);
        this.database.putNote(id, note).then();
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
