export class UrlInput {
    element: HTMLInputElement;
    
    constructor(parent: HTMLElement, onSubmit: (value: string) => void) {
        this.element = document.createElement("input") as HTMLInputElement;
        this.element.type = "text";
        this.element.placeholder = "enter url";
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
