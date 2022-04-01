import { Note } from "../note/Note.js";

export interface Database {
    getNotes(): Promise<Map<ArrayBuffer, Note>>;
    putNote(id: ArrayBuffer, note: Note): Promise<void>;
    removeNote(id: ArrayBuffer): Promise<void>;
}

