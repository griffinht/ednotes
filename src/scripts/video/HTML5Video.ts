import {Video} from "./Video.js";

export class HTML5Video implements Video {
    title: string = "test";
    video: HTMLVideoElement;

    constructor(src: string) {
        let video = document.createElement("video");
        video.src = src;
        video.addEventListener("load", (e) => {
            console.log("load", e);
        })
        this.video = video;
    }

    getThumbnail(): HTMLImageElement {
        return new Image()
    }

    getVideo(): HTMLElement {
        return this.video;
    }

}