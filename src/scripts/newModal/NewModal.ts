import {Form} from "./Form.js";
import drag from "./drag.js";

export class NewModal {
    static display = "flex";
    element: HTMLElement;
    form: Form;

    constructor(
        element: HTMLElement, 
        openElement: HTMLElement, 
        onSubmit: () => Promise<void>, 
        onSubmitUrl: (url: string) => Promise<void>, 
        onSubmitFile: (file: File) => Promise<void>) {
        this.element = element;
        
        // external openElement
        openElement.addEventListener("click", () => {
            this.openModal();
        })
        
        // modal
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) { // make sure click was the background and not an element within the modal
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
        this.form = new Form(
            async (url: string) => {
                if (url !== "") {
                    try {
                        await onSubmitUrl(url);
                    } catch (e) {
                        alert(e);
                        return;
                    }
                    this.closeModal();
                } else {
                    try {
                        await onSubmit();
                    } catch (e) {
                        alert(e);
                        return;
                    }
                    this.closeModal();
                }
            });
        this.element.append(this.form.element);

        // drag
        drag(
            this.element,
            () => this.openModal(),
            () => this.closeModal(),
            async (url: string) => { 
                try {
                    await onSubmitUrl(url);
                } catch (e) {
                    alert(e);
                    return;
                }
                this.closeModal();
            },
            async (file: File) => {
                try {
                    await onSubmitFile(file)
                } catch (e) {
                    alert(e);
                    return;     
                }
                this.closeModal();
            }
        );
        // kb shortcut
        document.addEventListener("keypress", (e) => {
          if (e.code === "Slash" && this.openModal()) {
            e.preventDefault(); 
          }
        });
    }
    
    isOpen() {
      return this.element.style.display === NewModal.display;
    }
    
    /**
     * Make the modal visible and focus on the form.
     * @return true if the modal was opened, or false if the modal was already opened
     */
    openModal(): boolean {
        if (this.isOpen()) {
            return false;
        }
        this.element.style.display = NewModal.display;
        this.form.focus();
        return true;
    }
    
    /**
     * Make the modal invisibile and blur on the form
     */
    closeModal() {
        this.element.style.display = "none";
        this.form.blur();
    }
}
