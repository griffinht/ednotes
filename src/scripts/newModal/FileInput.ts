import {NewModal} from "./NewModal.js";
import {NewVideo} from "../video/NewVideo.js";

export class FileInput {
    constructor(modal: NewModal, newVideo: NewVideo) {
        const fileInput = document.getElementById("fileInput") as HTMLInputElement;
        fileInput.addEventListener("change", async () => {
            if (fileInput.files === null) {
                modal.closeModal();
                return;
            }
            for (let file of fileInput.files) {
                await newVideo.openFile(file);
            }
            modal.openModal();
        })
    }

}

