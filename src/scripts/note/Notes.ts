import {Database} from "../database.js";
import {Note} from "./Note.js";

export class Notes {
    notes: Map<ArrayBuffer, Note> = new Map<ArrayBuffer, Note>();
    database: Database
    element: HTMLElement
    before: Element

    constructor(database: Database, element: HTMLElement, before: Element) {
        this.database = database;
        this.database
            .getNotes()
            .then((notes: Map<ArrayBuffer, Note>) => {
                for (let [id, note] of notes.entries()) {
                    this._add(id, note)
                }
            });
        this.element = element;
        this.before = before;
    }

    add(note: Note) {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        this.database.putNote(id, note).then();
    }
    
    _add(id: ArrayBuffer, note: Note) {
        this.notes.set(id, note);
        this.element.appendChild(createThumbnail(note));
    }
/*
    openVideo(video: Video) {
        document.body.insertBefore(video.createElement(() => { this.element.style.display = "grid"; }), this.before);
        this.element.style.display = "none";
    }

    async removeVideo(id: ArrayBuffer) {
        this.videos.delete(id);
        await this.database.removeVideo(id);
    }
    
    async updateVideo(id: ArrayBuffer, video: Video) {
        await this.database.putVideo(id, video);
    }
*/
}

function createThumbnail(note: Note): HTMLElement {
    let thumbnail = document.createElement("div");
    thumbnail.classList.add("card");
    thumbnail.tabIndex = 0;
    thumbnail.title = "Open (Enter)";
    thumbnail.addEventListener("click", () => {
        //openVideo();
    })
    thumbnail.addEventListener("keypress", async (e) => {
        switch (e.key) {
            case "Enter":
                //openVideo();
                break;
            case "Delete":
                //if (await this.remove(removeVideo, !e.ctrlKey)) { thumbnail.remove(); }
                break;
            default:
                return;
        }
        e.stopPropagation();
    })
    thumbnail.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "F2":
                //this.rename(updateVideo);
            default:
                return;
        }
        e.stopPropagation();
    });
    //thumbnail.append(this.getThumbnail());
    {
        let titleDiv = document.createElement("div");
        thumbnail.append(titleDiv);
        {
            let title = document.createElement("h2");
            titleDiv.append(title);
            title.innerText = note.title;
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
                    //this.rename(updateVideo);
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
                    //if (await this.remove(removeVideo, true)) { thumbnail.remove(); }
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
