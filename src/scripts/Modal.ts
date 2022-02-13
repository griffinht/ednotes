for (let element of document.getElementsByClassName("modal")) {
    let modal = element as HTMLElement;
    modal.addEventListener("click", (e) => {
        if (e.target !== modal) {
            return;
        }
        modal.style.display = "none";
    }, true);
}
