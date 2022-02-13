
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
urlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        console.log(urlInput.value);
        closeModal();
    }
})
urlInput.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
})

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
fileInput.addEventListener("change", () => {
    if (fileInput.files === null) {
        closeModal();
        return;
    }
    for (let file of fileInput.files) {
        console.log(file)
    }
    closeModal();
})


const nav = document.getElementsByTagName("nav")[0]
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
newModal.addEventListener("drop", (e) => {
    if (!e.dataTransfer) {
        return
    }
    for (let file of e.dataTransfer.files) {
        console.log(file)
    }
    for (let item of e.dataTransfer.items) {
        if (item.type === "text/uri-list") {
            console.log(e.dataTransfer.getData(item.type))
        }
    }
    e.preventDefault();
});
newModal.addEventListener("dragleave", (e) => {
    console.log("leave");
    closeModal()
})
document.addEventListener("dragend", (e) => {
    console.log("end")
})
document.addEventListener("dragexit", (e) => {
    console.log("exit")
})


document.getElementById("screenInput")!.addEventListener("click", (e) => {
    console.log("capture")
})

async function openUrl(url: string) {
    console.log("open", url)
    for (let i = 0; i < 10000; i++) {}
}