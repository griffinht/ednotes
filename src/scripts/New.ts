
const newModal = document.getElementById("newModal")!;

newModal.addEventListener("click", (e) => {
    if (e.target === newModal) {
        close()
    }
});

function close() {
    urlInput.blur();
    newModal.style.display = "none";
    urlInput.value = "";
}

function open() {
    newModal.style.display = "flex";
    urlInput.focus();
}

document.getElementById("newModalOpen")!.addEventListener("click", () => {
    open();
})

const urlInput = document.getElementById("urlInput") as HTMLInputElement;
urlInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        console.log(urlInput.value);
        close();
    }
})
urlInput.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        close();
    }
})

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
fileInput.addEventListener("change", () => {
    if (fileInput.files === null) {
        close();
        return;
    }
    for (let file of fileInput.files) {
        console.log(file)
    }
    close();
})