import ByteBuffer from "../common/ByteBuffer.js";
import {VideoType} from "./VideoType.js";
import {Videos} from "../Videos.js";

export class Note {
    time: number
    text: string;

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
        object.text = "";
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

    createElement(videos: Videos, id: ArrayBuffer): HTMLElement {
        let div = document.createElement("div");
        div.tabIndex = 0;
        div.addEventListener("click", () => {
            videos.openVideo(this);
        })
        div.addEventListener("keypress", async (e) => {
            console.log(e)
            switch (e.key) {
                case "Enter":
                    videos.openVideo(this);
                    break;
                case "Delete":
                    await videos.removeVideo(id, e.ctrlKey);
                    div.remove();
                    break;
                default:
                    return;
            }
            e.stopPropagation();
        })
        div.append(this.getThumbnail());
        {
            let title = document.createElement("h2");
            title.innerText = this.title;
            div.append(title);
        }
        {
            let deleteButton = document.createElement("button");
            deleteButton.tabIndex = -1;
            deleteButton.innerText = "x";
            deleteButton.addEventListener("click", async (e) => {
                e.stopPropagation();
                await videos.removeVideo(id, false);
                div.remove();
            })
            div.append(deleteButton);
        }
        return div;
    }
}