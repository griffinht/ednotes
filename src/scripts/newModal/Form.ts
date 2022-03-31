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
        parent: HTMLElement,
        onSubmit: (url: string) => void) {
        this.element = document.createElement("form");
        parent.appendChild(this.element);
        this.element.addEventListener("submit", (e) => { 
                e.preventDefault(); // prevent page reload 
                onSubmit(this.urlInput.getValue());
            });
        
        // form elements
        this.urlInput = new UrlInput(this.element);
        {
            // submit button
            let submitButton = document.createElement("input");
            this.element.appendChild(submitButton);
            submitButton.type = "submit";
        }
    }
    
    blur() {
        this.urlInput.blur();
    }
    
    focus() {
        this.urlInput.focus();
    }
}
