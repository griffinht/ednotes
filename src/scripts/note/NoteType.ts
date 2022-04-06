import ByteBuffer from "../common/ByteBuffer.js";
import {Note} from "./Note.js";
import {TextNote} from "./notes/TextNote.js";
import {Video} from "./notes/Video.js";

export enum NoteType {
    TEXT,
    VIDEO,
}

export function deserialize(buffer: ByteBuffer): Note {
    switch (buffer.readUint8()) {
        case NoteType.TEXT:
            return new TextNote(buffer);
        case NoteType.VIDEO:
            return new Video(buffer);
        default:
            throw new Error("unknown note type");
    }
}
