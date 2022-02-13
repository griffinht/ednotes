import {Video} from "./Video.js";

export class HTML5Video extends Video {
    title: string;
    video: HTMLVideoElement;

    constructor(video: HTMLVideoElement) {
        super();
        this.video = video;
        this.title = video.src.substring(video.src.lastIndexOf("/") + 1, video.src.length);
    }

    getThumbnail(): HTMLElement {
        let video = document.createElement("video")
        video.src = this.video.src;
        return video;
    }

    getVideo(): HTMLElement {
        return this.video;
    }

    getCurrentTime(): number {
        return this.video.currentTime;
    }
}
export function loadVideo(src: string): Promise<HTML5Video> {
    let video = document.createElement("video");
    video.controls = true;
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

    return new Promise<HTML5Video>((resolve, reject) => {
        video.addEventListener("loadedmetadata", (e) => {
            console.log("loadedmetadata", e);
            resolve(new HTML5Video(video));
        })
        video.addEventListener("error", (e) => {
            reject(e)
        })
    })
}