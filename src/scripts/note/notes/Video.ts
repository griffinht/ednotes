import Data from "../../common/Data.js";
import { Note } from "../Note.js";
import ByteBuffer from "../../common/ByteBuffer.js";
import {NoteType} from "../NoteType.js";

/*
https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm
*/

export class Video extends Note {
    src: string;

    constructor(buffer: ByteBuffer | string) {
        super(buffer)
        if (buffer instanceof ByteBuffer) {
            this.src = buffer.readString8();
        } else {
            this.src = buffer;
        }
    }
    
    getEditor(data: Data<Note>): HTMLElement {
        return new Editor(this, data).element;
    }

    getThumbnail(): HTMLElement {
        let element = document.createElement("video") as HTMLVideoElement;
        element.src = this.src;
        return element;
    }

    getType(): NoteType {
        return NoteType.VIDEO;
    }

    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString8(this.src);
    }
}

class Editor {
    element: HTMLElement;
    
    constructor(video: Video, data: Data<Note>) {
        this.element = document.createElement("div");
        let player = new Player(video.src);
        this.element.append(player.element);    
    }
}

class Player {
    element: HTMLVideoElement;

    constructor(src: string) {
        this.element = document.createElement("video") as HTMLVideoElement;
        this.element.src = src;
    }
}
