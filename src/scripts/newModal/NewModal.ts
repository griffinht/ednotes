import {UrlInput} from "./UrlInput.js"

export class NewModal {
    static display = "flex";
    element: HTMLElement;
    form: HTMLElement;
    urlInput: UrlInput;

    constructor(element: HTMLElement, openElement: HTMLElement, onSubmitUrl: (url: string) => void) {
        this.element = element;
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) { //make sure click was the background and not an element within the modal
                this.closeModal();
                //todo e.preventDefault()?
            }
        });
        
        
        
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
        
        this.urlInput = new UrlInput(this.form);

        let submitButton = document.createElement("input");
        this.form.appendChild(submitButton);
        submitButton.type = "submit";
      
        
        
        this.element.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeModal();
                e.preventDefault();
            }
        });
        openElement.addEventListener("click", () => {
            this.openModal();
        })
    }
    
    isOpen() {
      return this.element.style.display === NewModal.display;
    }
    
    closeModal() {
        this.element.style.display = "none";
        this.urlInput.blur();
    }

    openModal() {
        this.element.style.display = NewModal.display;
        this.urlInput.focus();
    }
}
