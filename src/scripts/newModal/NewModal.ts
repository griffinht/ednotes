import {UrlInput} from "./UrlInput.js"

export class NewModal {
    static display = "flex";
    element: HTMLElement;
    urlInput: UrlInput;

    constructor(element: HTMLElement, openElement: HTMLElement, onSubmitUrl: (url: string) => void) {
        this.element = element;
        this.urlInput = new UrlInput(element, onSubmitUrl);
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
