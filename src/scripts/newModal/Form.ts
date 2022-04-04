import {UrlInput} from "./UrlInput.js";

/**
 * Creates a form.
 * When the form is submitted, form data will be passed to the onSubmit function.
 * The urlInput is focused when the form is opened.
 */
export class Form {
    element: HTMLElement;
    urlInput: UrlInput;
    
    constructor(
        onSubmit: (url: string) => void) {
        this.element = document.createElement("form");
        this.element.addEventListener("submit", (e) => { 
                e.preventDefault(); // prevent page reload 
                onSubmit(this.urlInput.getValue());
            });
        
        // form elements
        this.urlInput = new UrlInput();
        this.element.append(this.urlInput.element);
        this.element.append(submitButton());
    }
    
    blur() {
        this.urlInput.blur();
    }
    
    focus() {
        this.urlInput.focus();
    }
}

function submitButton(): HTMLElement {
    let element = document.createElement("input");
    element.type = "submit";
    return element;
}
