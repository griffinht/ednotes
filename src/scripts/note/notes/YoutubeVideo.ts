import Data from "../../common/Data.js";
import { Note } from "../Note.js";
import ByteBuffer from "../../common/ByteBuffer.js";
import {NoteType} from "../NoteType.js";

export class YoutubeVideo extends Note {
    id: string;

    constructor(buffer: ByteBuffer) {
        super(buffer)
        this.id = buffer.readString8();
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

export function isYoutubeVideo(url: string) {
    return url.startsWith("https://www.youtube.com") || url.startsWith("https://youtu.be/")
}

class YoutubeVideoEditor {
    element: HTMLElement;
    constructor(note: YoutubeVideo, data: Data<Note>) {
        this.element = document.createElement("div");
    }
}

