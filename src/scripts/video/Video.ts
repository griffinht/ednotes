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
    
    rename(updateVideo: () => void) {
        let title = prompt("Rename to:", this.title);
        if (title && title !== this.title) {
            this.title = title;
            updateVideo();
        }
    }
    
    /* true if video was removed */
    async remove(removeVideo: () => void, confirm: boolean): Promise<boolean> {
        if (confirm && !window.confirm("Delete " + this.title + "?")) { return false; }
        await removeVideo();
        return true;
    }

    createThumbnailElement(openVideo: () => void, removeVideo: () => void, updateVideo: () => void): HTMLElement {
        let thumbnail = document.createElement("div");
        thumbnail.classList.add("card");
        thumbnail.tabIndex = 0;
        thumbnail.title = "Open (Enter)";
        thumbnail.addEventListener("click", () => {
            openVideo();
        })
        thumbnail.addEventListener("keypress", async (e) => {
            switch (e.key) {
                case "Enter":
                    openVideo();
                    break;
                case "Delete":
                    if (await this.remove(removeVideo, !e.ctrlKey)) { thumbnail.remove(); }
                    break;
                default:
                    return;
            }
            e.stopPropagation();
        })
        thumbnail.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "F2":
                    this.rename(updateVideo);
                default:
                    return;
            }
            e.stopPropagation();
        });
        thumbnail.append(this.getThumbnail());
        {
            let titleDiv = document.createElement("div");
            thumbnail.append(titleDiv);
            {
                let title = document.createElement("h2");
                titleDiv.append(title);
                title.innerText = this.title;
            }
            {
                let buttonDiv = document.createElement("div");
                titleDiv.append(buttonDiv);
                {
                    let renameButton = document.createElement("button");
                    buttonDiv.append(renameButton);
                    renameButton.tabIndex = -1;
                    renameButton.title = "Rename (F2)";
                    renameButton.innerText = "✎";
                    renameButton.classList.add("icon");
                    renameButton.addEventListener("click", async (e) => {
                        e.stopPropagation();
                        this.rename(updateVideo);
                    });
                }
                {
                    let deleteButton = document.createElement("button");
                    buttonDiv.append(deleteButton);
                    deleteButton.tabIndex = -1;
                    deleteButton.title = "Delete (Delete)";
                    deleteButton.innerText = "🗑";
                    deleteButton.classList.add("icon");
                    deleteButton.classList.add("danger");
                    deleteButton.addEventListener("click", async (e) => {
                        e.stopPropagation();
                        if (await this.remove(removeVideo, true)) { thumbnail.remove(); }
                    });
                }
            }
        }
        {
            let p = document.createElement("p");
            thumbnail.append(p);
            p.innerText = "a new note";
        }
        return thumbnail;
    }

    createElement(onclose: () => void): HTMLElement {
        function close() {
            main.remove();
            onclose();
        }
        let main = document.createElement("main");
        main.classList.add("item")

        main.addEventListener("keypress", (e) => {
            if (e.key === "Escape") {
                e.stopPropagation();
                main.remove();
                close();
            }
        });
        let listener = (e: KeyboardEvent) => {
            if (e.key !== "Escape") { return; }
            e.stopPropagation();
            close();
            document.removeEventListener("keyup", listener);
        };
        document.addEventListener("keyup", listener)
        {
            let header = document.createElement("header");
            {
                let button = document.createElement("button");
                button.innerText = "x";
                button.title = "Close (Escape)";
                button.addEventListener("click", () => close());
                header.append(button);
            }
            main.append(header);
        }
        {
            main.append(this.getVideo())
        }
        {
            let section = document.createElement("section");
            main.append(section);
            this.notes.push(Note.create(0))
            this.notes.push(Note.create(1))
            this.notes.push(Note.create(2))
            this.notes.push(Note.create(3))
            for (let note of this.notes) {
                let element = document.createElement("input")
                section.append(element);
                element.type = "textarea";
                element.value = note.text;
                element.addEventListener("change", () => {
                    console.log("change")
                    note.text = element.value;
                });
            }
            {
                let button = document.createElement("button")
                section.append(button);
                button.innerText = "+";
                button.addEventListener("click", () => {
                    let time = this.getCurrentTime();
                    let index = 0;
                    for (let i = 0; i < this.notes.length; i++) {
                        if (this.notes[i].time < time) {
                            index = i + 1;
                        }
                    }
                    this.notes.splice(index, 0, Note.create(time))
                })

            }
        }

        return main;
    }
}
