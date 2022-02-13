for (let element of document.getElementsByClassName("modal")) {
    let modal = element as HTMLElement;
    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });
}
