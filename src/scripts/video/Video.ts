import ByteBuffer from "../common/ByteBuffer.js";
import {VideoType} from "./VideoType.js";

export class Note {
    time: number
    text: string = "";

    constructor(buffer: ByteBuffer) {
        this.time = buffer.readFloat32();
        this.text = buffer.readString8();
    }

    serialize(buffer: ByteBuffer) {
        buffer.writeFloat32(this.time);
        buffer.writeString8(this.text);
    }

    static create(time: number): Note {
        let object = Object.create(this.prototype);
        object.time = time;
        return object;
    }
}
export abstract class Video {
    title: string;
    notes: Note[] = [];

    protected constructor(buffer: ByteBuffer) {
        this.title = buffer.readString8();
        let length = buffer.readUint8();
        for (let i = 0; i < length; i++) {
            this.notes.push(new Note(buffer));
        }
    }

    abstract getThumbnail(): HTMLElement;
    abstract getVideo(): HTMLElement;
    abstract getCurrentTime(): number;
    abstract getType(): VideoType;

    serialize(buffer: ByteBuffer) {
        buffer.writeUint8(this.getType());
        buffer.writeString8(this.title)
        buffer.writeUint8(this.notes.length)
        for (let note of this.notes) {
            note.serialize(buffer);
        }
    }
}