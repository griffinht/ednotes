import {openUrl} from "../video/NewVideo.js";
import {closeModal, urlInput} from "./NewModal.js";
import {addVideo, openVideo} from "../main.js";

urlInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        let video = await openUrl(urlInput.value);
        if (!video) {
            console.log("error")
            return
        }
        addVideo(video);
        closeModal();
        openVideo(video);
    }
})
urlInput.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
})