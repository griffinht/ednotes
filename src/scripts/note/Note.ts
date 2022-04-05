import ByteBuffer from "../common/ByteBuffer.js";
import {NoteType} from "./NoteType.js";
import Data from "../common/Data.js";

export abstract class Note {
    created: Date;
    title: string;
    
    protected constructor(buffer: any) {
        if (buffer instanceof ByteBuffer) { 
            this.created = new Date(buffer.readUint32());
            this.title = buffer.readString8();
        } else {
            this.created = new Date();
            this.title = "New note";
        }
    }
    
    abstract getType(): NoteType;
    
    abstract getEditor(data: Data<Note>): HTMLElement;
    
    serialize(buffer: ByteBuffer) {
        buffer.writeUint8(this.getType());
        buffer.writeUint32(this.created.getTime());
        buffer.writeString8(this.title);
    }
}
