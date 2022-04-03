import { Note } from "./note/Note.js";

/**
 * Represents a thumbnail element of a note
 */
export default class Thumbnail {
    element: HTMLElement;
    
    constructor(
        parent: HTMLElement,
        note: Note,
        openNote: () => void,
        removeNote: () => boolean,
        updateNote: () => boolean) {
        let thumbnail = document.createElement("div");
        this.element = thumbnail;
        parent.appendChild(thumbnail);
        thumbnail.classList.add("card");
        thumbnail.tabIndex = 0;
        thumbnail.title = "Open (Enter)";
        thumbnail.addEventListener("click", openNote);
        
        let remove = async (e: { shiftKey: boolean }) => {
            if ((e.shiftKey || window.confirm("Remove \"" + note.title +  "\"?"))) {
                if (await removeNote()) {
                    thumbnail.remove();
                } else {
                    console.error("error removing");
                }
            }
            return;
        };
        
        let rename = async () => {
            let title = window.prompt("New title: ");
            if (title) {
                note.title = title;
                if (!await updateNote()) {
                    console.error("error updating");
                }
            }
        };

        thumbnail.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "F2":
                    rename();
                    break;
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
                    renameButton.addEventListener("click", (e) => {
                        e.stopPropagation();
                        rename();
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
