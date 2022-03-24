import { Note } from "Note.js"

export class TextNote extends Note {
    text: string;
    
    constructor(buffer: ByteBuffer) {
        super(buffer);
        this.text = buffer.readString64();
    }
    
    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString64(this.text);
    }
}
