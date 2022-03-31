import { Note } from "../Note.js"
import ByteBuffer from "../../common/ByteBuffer.js";
import { Video } from "../../video/Video.js";
import { NoteType } from "../NoteType.js";

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
    
    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString16(this.text);
    }
}
