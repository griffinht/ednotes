import { Note } from "../Note.js"
import ByteBuffer from "../../common/ByteBuffer.js";
import { NoteType } from "../NoteType.js";
import Data from "../../common/Data.js";

export class TextNote extends Note {
    text: string;
    
    constructor(buffer?: ByteBuffer) {
        super(buffer);
        if (buffer) {
            this.text = buffer.readString16();
        } else {
            this.text = "Blank text note";
        }
    }
    
    getType(): NoteType {
        return NoteType.TEXT;
    }
    
    getEditor(note: Data<Note>): HTMLElement {
        return new TextNoteEditor(this, note).element;
    }
    
    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString16(this.text);
    }
}

class TextNoteEditor {
    element: HTMLTextAreaElement;
    
    constructor(note: TextNote, noteData: Data<Note>) {
        this.element = document.createElement("textarea") as HTMLTextAreaElement;
        this.element.value = note.text;
        this.element.style.resize = "none";
        this.element.addEventListener("change", () => {
            note.text = this.element.value;
            noteData.update()
                .catch((e) => window.alert(e));
        });
    }
}
