export class Drag {
    constructor(parent: HTMLElement, onDragStart: () => void, onDragEnd: () => void, onDragUri: (uri: string) => void, onDragFile: (file: File) => void) {
        document.addEventListener("dragenter", (e) => {
            console.log("enter");
            if (!e.dataTransfer) {
                return
            }
            for (let item of e.dataTransfer.items) {
                if (item.type === "text/uri-list" || item.kind === "file") {
                    e.preventDefault();
                    onDragStart();
                }
            }
        })
        parent.addEventListener("dragover", (e) => {
            console.log("dragover")
            e.preventDefault();
        })
        parent.addEventListener("drop", async (e) => {
            if (!e.dataTransfer) {
                return
            }
            for (let file of e.dataTransfer.files) {
                onDragFile(file);
            }
            for (let item of e.dataTransfer.items) {
                if (item.type === "text/uri-list") {
                    onDragUri(e.dataTransfer.getData(item.type));
                }
            }
            e.preventDefault();
        });
        parent.addEventListener("dragleave", () => {
            console.log("leave");
            onDragEnd();
        })
        document.addEventListener("dragend", () => {
            console.log("end")
        })
        document.addEventListener("dragexit", () => {
            console.log("exit")
        })
    }
}
