import { Note } from "Note.js"
import ByteBuffer from "../common/ByteBuffer.js";

export class TextNote extends Note {
    text: string;
    
    constructor(buffer: ByteBuffer) {
        super(buffer);
        this.text = buffer.readString16();
    }
    
    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString16(this.text);
    }
    
    static create() {
        let object = Object.create(this.prototype);
        object.created = Date.now();
        object.title = "Blank text note";
        return object;
    }
}
