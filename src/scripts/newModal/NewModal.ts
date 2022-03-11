export class NewModal {
    element: HTMLElement;
    urlInput: HTMLInputElement

    constructor() {
        this.element = document.getElementById("newModal")!;
        this.urlInput = document.getElementById("urlInput") as HTMLInputElement;
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) {
                this.closeModal();
            }
        });
        document.getElementById("newModalOpen")!.addEventListener("click", () => {
            this.openModal();
        })
        document.addEventListener("keypress", (e) => {
          if (e.code === "Slash") {
           this.openModal();
           e.preventDefault(); 
          }
        });
    }
    closeModal() {
        this.element.style.display = "none";
        this.urlInput.blur();
        this.urlInput.value = "";
    }

    openModal() {
        this.element.style.display = "flex";
        this.urlInput.focus();
    }
}
