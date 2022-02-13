import {NewModal} from "./NewModal.js";
import {NewVideo} from "../video/NewVideo.js";

export class UrlInput {
    constructor(modal: NewModal, newVideo: NewVideo) {
        modal.urlInput.addEventListener("keypress", async (e) => {
            if (e.key === "Enter") {
                await newVideo.openUrl(modal.urlInput.value);
            }
        })
        modal.urlInput.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                modal.closeModal();
            }
        })
    }

}
