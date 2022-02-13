import {NewModal} from "./NewModal.js";
import {NewVideo} from "../video/NewVideo.js";

export class Drag {
    constructor(modal: NewModal, newVideo: NewVideo) {
        document.addEventListener("dragenter", (e) => {
            console.log("enter");
            if (!e.dataTransfer) {
                return
            }
            for (let item of e.dataTransfer.items) {
                if (item.type === "text/uri-list" || item.kind === "file") {
                    e.preventDefault();
                    modal.openModal();
                }
            }
        })
        modal.element.addEventListener("dragover", (e) => {
            console.log("dragover")
            e.preventDefault();
        })
        modal.element.addEventListener("drop", async (e) => {
            if (!e.dataTransfer) {
                return
            }
            for (let file of e.dataTransfer.files) {
                await newVideo.openFile(file)
            }
            for (let item of e.dataTransfer.items) {
                if (item.type === "text/uri-list") {
                    let url = e.dataTransfer.getData(item.type);
                    await newVideo.openUrl(url)
                }
            }
            e.preventDefault();
        });
        modal.element.addEventListener("dragleave", () => {
            console.log("leave");
            modal.closeModal()
        })
        document.addEventListener("dragend", () => {
            console.log("end")
        })
        document.addEventListener("dragexit", () => {
            console.log("exit")
        })
    }
}
