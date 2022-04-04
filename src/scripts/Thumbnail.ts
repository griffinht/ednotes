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
        
        //thumbnail.append(this.getThumbnail());
        thumbnail.append(new TitleContainer(note, this).element);
        {
            let p = document.createElement("p");
            thumbnail.append(p);
            p.innerText = "a new note";
        }
    }
    
    
}

class TitleContainer {
    element: HTMLElement;
    
    constructor(
        note: Data<Note>,
        thumbnail: Thumbnail) {
        this.element = document.createElement("div");
        
        let titleHeading = new TitleHeading(note, thumbnail);
        this.element.append(titleHeading.element);
        
        this.element.append(new TitleButtonContainer(note, titleHeading, thumbnail).element);
    }
}
class TitleHeading {
    element: HTMLElement;
    note: Data<Note>;
    
    constructor(note: Data<Note>, thumbnail: Thumbnail) {
        this.note = note;
        this.element = document.createElement("h2");
        this.element.innerText = this.note.data.title;
    }
}
class TitleButtonContainer {
    element: HTMLElement;
    
    constructor(note: Data<Note>, titleHeading: TitleHeading, thumbnail: Thumbnail) {
        this.element = document.createElement("div");
        this.element.append(new RenameButton(titleHeading, note, thumbnail).element);
        this.element.append(new DeleteButton(note, thumbnail).element);
    }
}

class RenameButton {
    element: HTMLElement;
    titleHeading: TitleHeading;
    note: Data<Note>;
    
    constructor(titleHeading: TitleHeading, note: Data<Note>, thumbnail: Thumbnail) {
        this.titleHeading = titleHeading;
        this.note = note;
        this.element = document.createElement("button");
        this.element.tabIndex = -1;
        this.element.title = "Rename (F2)";
        this.element.innerText = "✎";
        this.element.classList.add("icon");
        this.element.addEventListener("click", (e) => {
            e.stopPropagation();
            this.rename();
        });
        thumbnail.element.addEventListener("keydown", (e) => {
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
            this.titleHeading.element.innerText = this.note.data.title;
        }
    }
}

class DeleteButton {
    element: HTMLElement;
    thumbnail: Thumbnail
    note: Data<Note>
    
    constructor(note: Data<Note>, thumbnail: Thumbnail) {
        this.note = note;
        this.thumbnail = thumbnail;
        this.element = document.createElement("button");
        this.element.tabIndex = -1;
        this.element.title = "Delete (Delete)";
        this.element.innerText = "🗑";
        this.element.classList.add("icon");
        this.element.classList.add("danger");
        this.element.addEventListener("click", (e) => {
            e.stopPropagation();
            this.remove(e);
        });
        thumbnail.element.addEventListener("keydown", (e) => {
            if (e.key !== "Delete") {
                return;
            }
            e.stopPropagation();
            this.remove(e);
        });
    }
    
    async remove(e: { shiftKey: boolean }) {
        if (!e.shiftKey && !window.confirm("Remove \"" + this.note.data.title +  "\"?")) {
            return;
        }

        try {
            await this.note.remove();
        } catch (e) {
            console.error(e, "error removing");
            return;
        }
        this.thumbnail.element.remove();
    }
}