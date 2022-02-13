import {openUrl} from "../video/NewVideo.js";
import {closeModal, urlInput} from "./NewModal.js";

urlInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
        await openUrl(urlInput.value);
        closeModal();
    }
})
urlInput.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
})