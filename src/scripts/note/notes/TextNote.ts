import { Note } from "../Note.js"
import ByteBuffer from "../../common/ByteBuffer.js";
import { Video } from "../../video/Video.js";

export class TextNote extends Note {
    text: string;
    
    constructor(buffer: any) {
        super(buffer);
        if (buffer instanceof ByteBuffer) {
            this.text = buffer.readString16();
        } else {
            this.text = "Blank text note";
        }
    }
    
    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString16(this.text);
    }
}
