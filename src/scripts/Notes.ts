import { Note } from "./note/Note.js";
import { Database } from "./database/Database.js";
import { Browser } from "./Browser.js";
import { Editor } from "./Editor.js";
import Data from "./common/Data.js";

export class Notes {
    database: Database;
    browser: Browser;
    editor: Editor;
    
    constructor(database: Database, editor: HTMLElement, browser: HTMLElement) {
        this.database = database;
        this.editor = new Editor(editor);
        this.browser = new Browser(
            browser,
            (note: Data<Note>) => this.editor.open(note.data));
        this.database
            .getNotes()
            .then((notes: Map<ArrayBuffer, Note>) => {
                for (let [id, note] of notes.entries()) {
                    this.browser.add(new Data<Note>(
                        note,
                        () => this.database.putNote(id, note),
                        () => this.database.removeNote(id)));
                }
            })
            .catch(() => {
                alert("failed to load notes from db");
            });
    }
    
    /**
     * Add note to database and browser
     */
    async add(n: Note): Promise<void> {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        let note: Data<Note> = new Data<Note>(
            n,
            () => this.database.putNote(id, n),
            () => this.database.removeNote(id));
        await note.update();
        this.browser.add(note);
        this.editor.open(note.data); 
    }
}
