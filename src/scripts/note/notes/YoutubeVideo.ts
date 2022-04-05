import Data from "../../common/Data.js";
import { Note } from "../Note.js";
import ByteBuffer from "../../common/ByteBuffer.js";
import {NoteType} from "../NoteType.js";

export class YoutubeVideo extends Note {
    id: string;

    constructor(buffer: ByteBuffer | string) {
        super(buffer)
        if (buffer instanceof ByteBuffer) {
            this.id = buffer.readString8();
        } else {
            if (buffer.startsWith("https://youtu.be/")) {
                this.id = buffer.substring(17, 11);
            } else if (buffer.startsWith("https://www.youtube.com/watch?v=")) {
                this.id = buffer.substring(32, 11);
            } else {
                throw new Error("url is not a valid youtube video url");
            }
        }
    }
    
    getEditor(data: Data<Note>): HTMLElement {
        return new YoutubeVideoEditor(this, data).element;
    }

    getThumbnail(): HTMLImageElement {
        let image = document.createElement("img");
        image.src = "https://i.ytimg.com/vi_webp/" + this.id + "/mqdefault.webp";
        return image;
    }

    getType(): NoteType {
        return NoteType.YOUTUBE_VIDEO;
    }

    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString8(this.id);
    }
}

class YoutubeVideoEditor {
    element: HTMLElement;
    constructor(note: YoutubeVideo, data: Data<Note>) {
        this.element = document.createElement("div");
    }
}

