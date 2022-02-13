import "./Modal.js";

const newModal = document.getElementById("newModal")!;
document.getElementById("newModalOpen")!.addEventListener("click", () => {
    newModal.style.display = "flex";
})