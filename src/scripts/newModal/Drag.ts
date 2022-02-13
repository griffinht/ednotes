import {openFile, openUrl} from "../video/NewVideo.js";
import {closeModal, newModal, openModal} from "./NewModal.js";

document.addEventListener("dragenter", (e) => {
    console.log("enter");
    if (!e.dataTransfer) {
        return
    }
    for (let item of e.dataTransfer.items) {
        if (item.type === "text/uri-list" || item.kind === "file") {
            e.preventDefault();
            openModal();
        }
    }
})
newModal.addEventListener("dragover", (e) => {
    console.log("dragover")
    e.preventDefault();
})
newModal.addEventListener("drop", async (e) => {
    if (!e.dataTransfer) {
        return
    }
    for (let file of e.dataTransfer.files) {
        //todo
        await openFile(file);
        //done
    }
    for (let item of e.dataTransfer.items) {
        if (item.type === "text/uri-list") {
            let url = e.dataTransfer.getData(item.type);
            //todo
            await openUrl(url)
            //done
        }
    }
    e.preventDefault();
});
newModal.addEventListener("dragleave", () => {
    console.log("leave");
    closeModal()
})
document.addEventListener("dragend", () => {
    console.log("end")
})
document.addEventListener("dragexit", () => {
    console.log("exit")
})
