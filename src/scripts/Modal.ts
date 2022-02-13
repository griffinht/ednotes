for (let element of document.getElementsByClassName("modal")) {
    let modal = element as HTMLElement;
    let elements = modal.getElementsByTagName("button");
    if (elements.length > 0) {
        elements[0].addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
}
