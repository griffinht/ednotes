import ByteBuffer from "../common/ByteBuffer.js";
import {Note} from "./Note.js";
import {TextNote} from "./notes/TextNote.js";

export enum NoteType {
    TEXT,
}

export function deserialize(buffer: ByteBuffer): Note {
    switch (buffer.readUint8()) {
        case NoteType.TEXT:
            return new TextNote(buffer)
        default:
            throw new Error("unknown note type");
    }
}
