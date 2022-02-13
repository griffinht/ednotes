import {openFile, openUrl} from "../video/NewVideo.js";

const newModal = document.getElementById("newModal")!;

newModal.addEventListener("click", (e) => {
    if (e.target === newModal) {
        closeModal()
    }
});

function closeModal() {
    urlInput.blur();
    newModal.style.display = "none";
    urlInput.value = "";
}

function openModal() {
    newModal.style.display = "flex";
    urlInput.focus();
}

document.getElementById("newModalOpen")!.addEventListener("click", () => {
    openModal();
})

const urlInput = document.getElementById("urlInput") as HTMLInputElement;
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


document.getElementById("screenInput")!.addEventListener("click", (e) => {
    console.log("capture", e)
})