export const newModal = document.getElementById("newModal")!;

newModal.addEventListener("click", (e) => {
    if (e.target === newModal) {
        closeModal()
    }
});

export const urlInput = document.getElementById("urlInput") as HTMLInputElement;
export function closeModal() {
    newModal.style.display = "none";
    urlInput.blur();
    urlInput.value = "";
}

export function openModal() {
    newModal.style.display = "flex";
    urlInput.focus();
}

document.getElementById("newModalOpen")!.addEventListener("click", () => {
    openModal();
})