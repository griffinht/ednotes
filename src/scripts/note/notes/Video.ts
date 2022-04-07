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
    editorEditor: EditorEditor;
    
    constructor(video: Video, data: Data<Note>) {
        this.element = document.createElement("div");
        this.element.classList.add("videoEditor");
        
        let container = document.createElement("div");
        this.element.append(container);
        
        let player = new Player(video.src);
        container.append(player.element);
        
        let timeline = new Timeline(
            video.videoNotes, 
            () => {
                let videoNote = new VideoNote(player.element.currentTime);
                let index = getIndex(video.videoNotes, videoNote.currentTime);
                video.videoNotes.splice(index, 0, videoNote);
                data.update();
                return [ videoNote, index ];
            },
            this);
        container.append(timeline.element);  
        
        this.editorEditor = new EditorEditor(data);
        this.element.append(this.editorEditor.element);
        
        
        player.element.addEventListener("timeupdate", (e) => {
            let index = getIndex(video.videoNotes, player.element.currentTime);
            if (index >= video.videoNotes.length || video.videoNotes[index] === this.editorEditor.videoNote) {
                return;
            }
            this.open(video.videoNotes[index]);
        });
    }
    
    open(videoNote: VideoNote) {
        this.editorEditor.open(videoNote);
    }
}

class EditorEditor {
    element: HTMLTextAreaElement;
    videoNote: VideoNote | null = null;
    data: Data<Note>;
    
    constructor(data: Data<Note>) {
        this.data = data;
        this.element = document.createElement("textarea") as HTMLTextAreaElement;
        this.element.addEventListener("change", () => this.save());
    }
    
    open(videoNote: VideoNote) {
        this.save();
        this.videoNote = videoNote;
        this.element.value = this.videoNote.contents;
    }
    
    save() {
        if (this.videoNote === null) { return; }
        if (this.videoNote.contents === this.element.value) { return; }
 
        this.videoNote.contents = this.element.value;
        this.data.update();
    }
}

class Timeline {
    element: HTMLElement;
    
    constructor(
        videoNoteArray: VideoNote[],
        add: () => [ VideoNote, number ],
        editor: Editor) {
        this.element = document.createElement("div");
        this.element.classList.add("timeline");
        let videoNotes = new VideoNotes(videoNoteArray, editor);
        this.element.append(videoNotes.element);
        this.element.append(button(() => {
            let result = add();
            videoNotes.add(result[0], result[1]);
        }));
    }
}

function getIndex(videoNotes: VideoNote[], currentTime: number): number {
    for (let i = 0; i < videoNotes.length; i++) {
        if (currentTime < videoNotes[i].currentTime) {
            return i;
        }
    }
    return videoNotes.length;
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
    editor: Editor;
    
    constructor(videoNotes: VideoNote[], editor: Editor) {
        this.editor = editor;
        this.element = document.createElement("div");
        for (let videoNote of videoNotes) {
            this.add(videoNote);
        }
    }
    
    add(videoNote: VideoNote, index?: number) {
        let element = thumbnail(videoNote, () => {
                this.editor.open(videoNote);
            });
        if (index !== undefined) {
            console.log(index);
            this.element.insertBefore(element, this.element.children.item(index));
        } else {
            this.element.append(element);
        }
    }
}

function thumbnail(videoNote: VideoNote, onClick: () => void): HTMLElement {
    let element = document.createElement("div");
    element.append(title(videoNote.currentTime));
    element.addEventListener("click", onClick);
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
