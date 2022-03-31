export class Drag {
    constructor(parent: HTMLElement, onDragEnter: () => void, onDragLeave: () => void, onDragUri: (uri: string) => void, onDragFile: (file: File) => void) {
        document.addEventListener("dragenter", (e) => {
            console.log("enter");
            if (!e.dataTransfer) {
                return
            }
            for (let item of e.dataTransfer.items) {
                if (item.type === "text/uri-list" || item.kind === "file") {
                    e.preventDefault();
                    onDragEnter();
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
            e.preventDefault();
            
            for (let file of e.dataTransfer.files) {
                onDragFile(file);
            }
            for (let item of e.dataTransfer.items) {
                if (item.type === "text/uri-list") {
                    onDragUri(e.dataTransfer.getData(item.type));
                }
            }
        });
        parent.addEventListener("dragleave", () => {
            console.log("leave");
            onDragLeave();
        })
        document.addEventListener("dragend", () => {
            console.log("end")
        })
        document.addEventListener("dragexit", () => {
            console.log("exit")
        })
    }
}
