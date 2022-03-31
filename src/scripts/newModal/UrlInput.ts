/*
            <div>
                <label>
                    <input id="urlInput" type="text" placeholder="enter url"/>
                </label>
                <input type="file" id="fileInput">
                <label for="fileInput">Select File</label>
                <button id="screenInput">Capture Screen</button>
            </div>
            */
export class UrlInput {
    element: HTMLInputElement;
    
    constructor(parent: HTMLElement, onSubmit: (value: string) => void) {
        this.element = document.createElement("input") as HTMLInputElement;
        parent.appendChild(this.element);
        this.element.addEventListener("keypress", async (e) => {
            if (e.key === "Enter") {
                onSubmit(this.element.value);
            }
        })
    }
    
    focus() {
        this.element.focus();
    }
    
    blur() {
        this.element.blur();
        this.element.value = "";
    }
}
