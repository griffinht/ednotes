export class NewModal {
    static display = "flex";
    element: HTMLElement;
    urlInput: HTMLInputElement

    constructor(element: HTMLElement, urlInput: HTMLInputElement) {
        this.element = element;
        this.urlInput = urlInput;
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
        document.getElementById("newModalOpenButton")!.addEventListener("click", () => {
            this.openModal();
        })
    }
    
    isOpen() {
      return this.element.style.display === NewModal.display;
    }
    
    closeModal() {
        this.element.style.display = "none";
        this.urlInput.blur();
        this.urlInput.value = "";
    }

    openModal() {
        this.element.style.display = NewModal.display;
        this.urlInput.focus();
    }
}
