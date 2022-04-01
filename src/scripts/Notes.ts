import { Note } from "./note/Note.js";
import { Database } from "./database/Database.js";
import { Browser } from "./Browser.js";
import { Editor } from "./Editor.js";

export class Notes {
    database: Database;
    browser: Browser;
    editor: Editor;
    items: Map<ArrayBuffer, Note> = new Map<ArrayBuffer, Note>();
    
    constructor(database: Database, browser: Browser, editor: Editor) {
        this.database = database;
        this.browser = browser;
        this.editor = editor;
        this.database
            .getNotes()
            .then((notes: Map<ArrayBuffer, Note> | null) => {
                if (notes === null) {
                    alert("failed to load notes from db");
                    return;
                }
                for (let [id, note] of notes.entries()) {
                    this.browser.add(note)
                }
            });
    }
    
    /**
     * Add note to database and browser
     */
    async add(note: Note) {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        if (!(await this.database.putNote(id, note))) {
            return false;
        }
        this.browser.add(note);
        this.editor.open(note);
        return true;
    }
}
