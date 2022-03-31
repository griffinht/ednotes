/**
 * Represents a text input which takes a url value.
 */
export class UrlInput {
    element: HTMLInputElement;
    
    constructor(parent: HTMLElement) {
        this.element = document.createElement("input") as HTMLInputElement;
        this.element.type = "text";
        this.element.placeholder = "enter url";
        parent.appendChild(this.element);
    }
    
    getValue(): string {
        return this.element.value;
    }
    
    focus() {
        this.element.focus();
    }
    
    blur() {
        this.element.blur();
        this.element.value = "";
    }
}
