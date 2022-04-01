import {Note} from "./note/Note.js";

/**
 * Represents a thumbnail element of a note
 */
class Thumbnail {
    element: HTMLElement;
    
    constructor(
        //editor: Editor,
        parent: HTMLElement,
        note: Note) {
        //this.editor = editor;
        this.note = note;
        let thumbnail = document.createElement("div");
        this.element = thumbnail;
        parent.appendChild(thumbnail);
        thumbnail.classList.add("card");
        thumbnail.tabIndex = 0;
        thumbnail.title = "Open (Enter)";
        thumbnail.addEventListener("click", () => {
            //this.editor.open(note);
        })
        thumbnail.addEventListener("keypress", async (e) => {
            switch (e.key) {
                case "Enter":
                    open();
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
    }
    
    remove() {
        this.element.remove();
    }
}

export class Browser {
    element: HTMLElement;

    constructor(
        element: HTMLElement) {
        this.element = element;
    }
    
    add(note: Note) {
        new Thumbnail(this.element, note);
    }
}
