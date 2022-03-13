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

    createThumbnailElement(videos:
                               {
                                   openVideo: (video: Video) => void,
                                   removeVideo: (id: ArrayBuffer) => void
                               },
                           id: ArrayBuffer): HTMLElement {
        let thumbnail = document.createElement("div");
        thumbnail.classList.add("thumbnail");
        thumbnail.tabIndex = 0;
        thumbnail.title = "Open (Enter)";
        thumbnail.addEventListener("click", () => {
            videos.openVideo(this);
        })
        thumbnail.addEventListener("keypress", async (e) => {
            console.log(e)
            switch (e.key) {
                case "Enter":
                    videos.openVideo(this);
                    break;
                case "Delete":
                    if (!e.ctrlKey && confirmRemoveVideo()) { return; }
                    await videos.removeVideo(id);
                    thumbnail.remove();
                    break;
                default:
                    return;
            }
            e.stopPropagation();
        })
        thumbnail.append(this.getThumbnail());
        {
          let div = document.createElement("div");
          thumbnail.append(div);
          {
              let title = document.createElement("h2");
              div.append(title);
              title.innerText = this.title; 
          }
          {
              let deleteButton = document.createElement("button");
              div.append(deleteButton);
              deleteButton.tabIndex = -1;
              deleteButton.title = "Delete (Delete)";
              deleteButton.innerText = "x";
              deleteButton.addEventListener("click", async (e) => {
                  e.stopPropagation();
                  if (confirmRemoveVideo()) { return; }
                  await videos.removeVideo(id);
                  div.remove();
              })
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
            console.log(e.key)
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

/**
 * @return true if video should be removed
 */
function confirmRemoveVideo(): boolean {
   return !window.confirm("Delete video?");
}
