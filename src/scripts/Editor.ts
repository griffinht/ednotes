import {Note} from "./note/Note.js";
import Data from "./common/Data.js";

export class Editor {
    element: HTMLElement;
    note: HTMLElement | null = null;
    header: Header;
    
    constructor(element: HTMLElement, onClose: () => void) {
        this.element = element;
        this.header = new Header(onClose);
        this.element.append(this.header.element);
        document.addEventListener("keydown", (e) => {
            if (e.key !== "Escape") {
                return;
            }
            onClose();
        });
    }
    
    open(note: Data<Note>) {
        if (this.note !== null) {
            this.close();
        }
        this.element.style.display = "flex";
        this.note = note.data.getEditor(note);
        this.header.title.update(note.data.title);
        this.element.append(this.note);
    }
    
    close() {
        if (this.note === null) {
            return;
        }
        this.element.style.display = "none";
        this.note.remove();
        this.note = null;
    }
}
class Header {
    element: HTMLElement;
    title: Title;
    
    constructor(onSubmit: () => void) {
        this.element = document.createElement("header");
        this.title = new Title();
        this.element.append(this.title.element);
        this.element.append(closeButton(onSubmit));
    }
}
class Title {
    element: HTMLElement;
    
    constructor() {   
        this.element = document.createElement("h2");
    }
    
    update(title: string) {
        this.element.innerText = title;
    }
}

function closeButton(onSubmit: () => void): HTMLElement {
    let element = document.createElement("button");
    element.addEventListener("click", (e) => {
        e.preventDefault();
        onSubmit();
    });
    element.innerText = "x";
    element.classList.add("icon");
    return element;
}
/*
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
    // this.notes.push(Note.create(1))
    // this.notes.push(Note.create(2))
    // this.notes.push(Note.create(3))
    for (let note of this.notes) {
        let element = document.createElement("textarea")
        section.append(element);
        //element.type = "textarea";
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
            this.notes.splice(index, 0, Note.create(time));
        })

    }
}
*/
