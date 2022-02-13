
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
