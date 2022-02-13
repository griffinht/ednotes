import {openFile} from "../video/NewVideo.js";
import {closeModal} from "./NewModal.js";
import {addVideo, openVideo} from "../main.js";

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
fileInput.addEventListener("change", async () => {
    if (fileInput.files === null) {
        closeModal();
        return;
    }
    for (let file of fileInput.files) {
        //todo
        let video = await openFile(file);
        if (!video) {
            console.log("error")
            return
        }
        addVideo(video);
        closeModal();
        openVideo(video);
    }
    closeModal();
})