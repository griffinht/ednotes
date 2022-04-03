import {Note} from "./note/Note.js";


/**
 * Represents a thumbnail element of a note
 */
class Thumbnail {
    element: HTMLElement;
    
    constructor(
        parent: HTMLElement,
        note: Note,
        openNote: () => void,
        removeNote: () => boolean) {
        let thumbnail = document.createElement("div");
        this.element = thumbnail;
        parent.appendChild(thumbnail);
        thumbnail.classList.add("card");
        thumbnail.tabIndex = 0;
        thumbnail.title = "Open (Enter)";
        thumbnail.addEventListener("click", openNote);
        
        let confirmRemove = (e: { shiftKey: boolean }) => {
            return e.shiftKey || window.confirm("Remove \"" + note.title +  "\"?");
        }

        thumbnail.addEventListener("keydown", async (e) => {
            switch (e.key) {
                case "F2":
                    //this.rename(updateVideo);
               case "Enter":
                    openNote();
                    break;
                case "Delete":
                    if (confirmRemove(e) && await removeNote()) { 
                        thumbnail.remove(); 
                    }
                    break;
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
                        if (confirmRemove(e) && await removeNote()) { 
                            thumbnail.remove(); 
                        }
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
    openNote: (note: Note) => void;

    constructor(
        element: HTMLElement,
        openNote: (note: Note) => void) {
        this.element = element;
        this.openNote = openNote;
    }
    
    add(note: Note) {
        new Thumbnail(this.element, note, () => this.openNote(note), () => { return true; });
    }
}
