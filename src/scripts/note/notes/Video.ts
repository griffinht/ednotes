import Data from "../../common/Data.js";
import { Note } from "../Note.js";
import ByteBuffer from "../../common/ByteBuffer.js";
import {NoteType} from "../NoteType.js";

/*

https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm

*/

class VideoNote {
    time: number
    contents: string
    
    constructor(buffer: ByteBuffer | number) {
        if (buffer instanceof ByteBuffer) {
            this.time = buffer.readUint32();
            this.contents = buffer.readString16();
        } else {
            this.time = buffer;
            this.contents = "";
        }
    }
    
    serialize(buffer: ByteBuffer) {
        buffer.writeUint32(this.time);
        buffer.writeString16(this.contents);
    }
}

export class Video extends Note {
    src: string;
    videoNotes: VideoNote[];

    constructor(buffer: ByteBuffer | string) {
        super(buffer)
        if (buffer instanceof ByteBuffer) {
            this.src = buffer.readString8();
            this.videoNotes = [];
            let length = buffer.readUint8();
            for (let i = 0; i < length; i++) {
                this.videoNotes.push(new VideoNote(buffer));
            }
        } else {
            this.src = buffer;
            this.videoNotes = [];
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
        buffer.writeUint8(this.videoNotes.length);
        for (let videoNote of this.videoNotes) {
            videoNote.serialize(buffer);
        }
    }
}

class Editor {
    element: HTMLElement;
    
    constructor(video: Video, data: Data<Note>) {
        this.element = document.createElement("div");
        let player = new Player(video.src);
        this.element.append(player.element);
        let videoNotes = new VideoNotes(video, data);  
        player.element.addEventListener("timeupdate", (e) => {
            videoNotes.update(e.timeStamp);
        });
    }
}

class VideoNotes {
    element: HTMLElement;
    data: Data<Note>;
    video: Video;
    
    constructor(video: Video, data: Data<Note>) {
        this.data = data;
        this.video = video;
        this.element = document.createElement("div");
        
    }
    
    update(time: number) {
        let videoNote = null;
        for (let i = this.video.videoNotes.length - 1; i >= 0; i--) {
            if (this.video.videoNotes[i].time < time) {
                videoNote = this.video.videoNotes[i];
            }
        }
        if (videoNote === null) {
            return;
        }
        console.log(videoNote);
    }
}

class Player {
    element: HTMLVideoElement;

    constructor(src: string) {
        this.element = document.createElement("video") as HTMLVideoElement;
        this.element.src = src;
        this.element.controls = true;
    }
}
