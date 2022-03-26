export class NewModal {
    static display = "flex";
    element: HTMLElement;
    urlInput: HTMLInputElement

    constructor(element: HTMLElement, urlInput: HTMLInputElement) {
        this.element = element;
        this.urlInput = urlInput;
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) {
                this.closeModal();
            }
        });
        document.getElementById("newModalOpenButton")!.addEventListener("click", () => {
            this.openModal();
        })
        document.addEventListener("keypress", (e) => {
          if (e.code === "Slash" && !this.isOpen()) {
           this.openModal();
           e.preventDefault(); 
          }
        });
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
