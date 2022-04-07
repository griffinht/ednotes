import Data from "../../common/Data.js";
import { Note } from "../Note.js";
import ByteBuffer from "../../common/ByteBuffer.js";
import {NoteType} from "../NoteType.js";

/*

https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm

*/

class VideoNote {
    currentTime: number
    contents: string
    
    constructor(buffer: ByteBuffer | number) {
        if (buffer instanceof ByteBuffer) {
            this.currentTime = buffer.readFloat32();
            this.contents = buffer.readString16();
        } else {
            this.currentTime = buffer;
            this.contents = "";
        }
    }
    
    serialize(buffer: ByteBuffer) {
        buffer.writeFloat32(this.currentTime);
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
            this.videoNotes = [new VideoNote(0)];
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
        this.element.append(new Timeline(video, data, player).element);  
        /*
        player.element.addEventListener("timeupdate", (e) => {
            videoNotes.update(e.timeStamp);
        });*/
    }
}

class Timeline {
    element: HTMLElement;
    videoNotes: VideoNotes;
    player: Player;
    
    constructor(video: Video, data: Data<Note>, player: Player) {
        this.player = player;
        this.element = document.createElement("div");
        this.element.classList.add("timeline");
        this.videoNotes = new VideoNotes();
        this.element.append(this.videoNotes.element);
        this.element.append(button(() => {
            let videoNote = new VideoNote(player.element.currentTime);
            video.videoNotes.push(videoNote);
            this.videoNotes.add(videoNote);
            console.log("add to timeline", this);
        }));
    }
}

function button(onClick: () => void): HTMLElement {
    let element = document.createElement("button");
    element.innerText = "+";
    element.classList.add("icon");
    element.addEventListener("click", onClick);
    return element;
}

class VideoNotes {
    element: HTMLElement;
    
    constructor() {
        this.element = document.createElement("div");
    }
    
    add(videoNote: VideoNote) {
        this.element.append(thumbnail(videoNote));
    }

    /*
        let videoNote = null;
        for (let i = this.video.videoNotes.length - 1; i >= 0; i--) {
            if (this.video.videoNotes[i].time < time) {
                videoNote = this.video.videoNotes[i];
            }
        }
        if (videoNote === null) {
            return;
        }
        console.log(videoNote);*/

}

function thumbnail(videoNote: VideoNote): HTMLElement {
    let element = document.createElement("div");
    element.append(title(videoNote.currentTime));
    return element;
}

function title(currenttime: number): HTMLElement {
    let element = document.createElement("h2");
    element.innerText = "" + currenttime;
    return element;
}

class Player {
    element: HTMLVideoElement;

    constructor(src: string) {
        this.element = document.createElement("video") as HTMLVideoElement;
        this.element.src = src;
        this.element.controls = true;
    }
}
