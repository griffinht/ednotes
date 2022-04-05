import ByteBuffer from "../common/ByteBuffer.js";
import {Note} from "./Note.js";
import {TextNote} from "./notes/TextNote.js";
import {YoutubeVideo} from "./notes/YoutubeVideo.js";

export enum NoteType {
    TEXT,
    YOUTUBE_VIDEO,
}

export function deserialize(buffer: ByteBuffer): Note {
    switch (buffer.readUint8()) {
        case NoteType.TEXT:
            return new TextNote(buffer)
        case NoteType.YOUTUBE_VIDEO:
            return new YoutubeVideo(buffer);
        default:
            throw new Error("unknown note type");
    }
}
