import {Video} from "./Video.js";

export class HTML5Video implements Video {
    title: string = "test";
    video: HTMLVideoElement;

    constructor(video: HTMLVideoElement) {
        this.video = video;
    }

    getThumbnail(): HTMLCanvasElement {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            console.log("ctx is null");
            return canvas;
        }
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        return canvas;
    }

    getVideo(): HTMLElement {
        return this.video;
    }

}
export function loadVideo(src: string): Promise<HTML5Video> {
    let video = document.createElement("video");
    video.src = src;
    video.addEventListener("suspend", (e) => {
        console.log("suspend", e);
    })
    video.addEventListener("loadeddata", (e) => {
        console.log("loadeddata", e);
    })
    video.addEventListener("progress", (e) => {
        console.log("progress", e);
    })
    video.addEventListener("stalled", (e) => {
        console.log("stalled", e);
    })
    video.addEventListener("canplay", (e) => {
        console.log("canplay", e);
    })
    return new Promise<HTML5Video>((resolve) => {
        video.addEventListener("loadedmetadata", (e) => {
            console.log("loadedmetadata", e);
            resolve(new HTML5Video(video));
        })
    })
}