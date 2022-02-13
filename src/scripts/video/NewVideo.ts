export async function openUrl(url: string) {
    console.log("open", url)
    for (let i = 0; i < 10000; i++) {}
}

export async function openFile(file: File) {
    console.log("file", file);
    for (let i = 0; i < 10000; i++) {}
}
