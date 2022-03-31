import {UrlInput} from "./UrlInput.js";
import {Drag} from "./Drag.js";

export class NewModal {
    static display = "flex";
    element: HTMLElement;
    form: HTMLElement;
    urlInput: UrlInput;

    constructor(element: HTMLElement, openElement: HTMLElement, onSubmitUrl: (url: string) => void) {
        this.element = element;
        
        // external openElement
        openElement.addEventListener("click", () => {
            this.openModal();
        })
        
        // modal
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) { //make sure click was the background and not an element within the modal
                this.closeModal();
                //todo e.preventDefault()?
            }
        });
        this.element.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeModal();
                e.preventDefault();
            }
        });
        
        // form
        this.form = document.createElement("form");
        this.element.appendChild(this.form);
        this.form.addEventListener("submit", (e) => { 
            console.log("submitted");
            let url = this.urlInput.getValue();
            if (url !== "") {
                console.log("create new with url " + url);
            } else {
                console.log("create new text note");
            }
            e.preventDefault(); // prevent page reload
        });
        
        // form elements
        this.urlInput = new UrlInput(this.form);
        {
            // submit button
            let submitButton = document.createElement("input");
            this.form.appendChild(submitButton);
            submitButton.type = "submit";
        }
        new Drag(
            this.element, 
            () => this.openModal(), 
            () => this.closeModal(), 
            (uri: string) => { console.log(uri); }, 
            (file: File) => { console.log(file); }
        );
    }
    
    isOpen() {
      return this.element.style.display === NewModal.display;
    }
    
    closeModal() {
        this.element.style.display = "none";
        this.urlInput.blur();
    }

    /**
     * @return true if the modal was opened, or false if the modal was already opened
     */
    openModal(): boolean {
        if (this.isOpen()) {
            return false;
        }
        this.element.style.display = NewModal.display;
        this.urlInput.focus();
        return true;
    }
}
