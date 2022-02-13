import {openFile} from "../video/NewVideo.js";
import {closeModal} from "./NewModal.js";

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
fileInput.addEventListener("change", async () => {
    if (fileInput.files === null) {
        closeModal();
        return;
    }
    for (let file of fileInput.files) {
        //todo
        await openFile(file);
        //done
    }
    closeModal();
})