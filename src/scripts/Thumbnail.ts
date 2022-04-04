import { Note } from "./note/Note.js";
import Data from "./common/Data.js";

/**
 * Represents a thumbnail element of a note
 */
export default class Thumbnail {
    element: HTMLElement;
    
    constructor(
        parent: HTMLElement,
        note: Data<Note>,
        openNote: () => void) {
        let thumbnail = document.createElement("div");
        this.element = thumbnail;
        parent.appendChild(thumbnail);
        thumbnail.classList.add("card");
        thumbnail.tabIndex = 0;
        thumbnail.title = "Open (Enter)";
        thumbnail.addEventListener("click", openNote);
        
        let remove = async (e: { shiftKey: boolean }) => {
            if (!e.shiftKey && !window.confirm("Remove \"" + note.data.title +  "\"?")) {
                return;
            }

            try {
                await note.remove();
            } catch (e) {
                console.error(e, "error removing");
                return;
            }
            thumbnail.remove();
        };
        


        thumbnail.addEventListener("keydown", (e) => {
            switch (e.key) {
               case "Enter":
                    openNote();
                    break;
                case "Delete":
                    remove(e);
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
            
            let title = new Title(note, thumbnail);
            titleDiv.append(title.element);
            
            
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
                    renameButton.addEventListener("click", (e) => {
                        e.stopPropagation();
                        title.rename();
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
                    deleteButton.addEventListener("click", (e) => {
                        e.stopPropagation();
                        remove(e);
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

class Title {
    element: HTMLElement;
    note: Data<Note>;
    
    constructor(note: Data<Note>, keyboardInputElement: HTMLElement) {
        this.note = note;
        this.element = document.createElement("h2");
        this.element.innerText = this.note.data.title;
        keyboardInputElement.addEventListener("keydown", (e) => {
            if (e.key !== "F2") {
                return;
            }
            e.stopPropagation();
            this.rename();
        });
    }

    /**
     * Prompt user for new name, then set and update the underlying note
     */
    rename() {
        let title = window.prompt("Rename", this.note.data.title);
        if (title) {
            this.note.data.title = title;
            try {
                this.note.update();
            } catch (e) {
                console.error(e, "error updating");
                return;
            }
            this.element.innerText = this.note.data.title;
        }
    }
}
