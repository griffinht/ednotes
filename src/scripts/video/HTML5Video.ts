import {Video} from "./Video.js";
import ByteBuffer from "../common/ByteBuffer.js";
import {VideoType} from "./VideoType.js";

export class HTML5Video extends Video {
    video: HTMLVideoElement;

    constructor(buffer: ByteBuffer) {
        super(buffer)
        this.video = document.createElement("video")
        this.video.src = buffer.readString8();
        this.video.controls = true;
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

    getType(): VideoType {
        return VideoType.HTML5_VIDEO;
    }

    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString8(this.video.src);
    }

    static create(video: HTMLVideoElement) {
        let object = Object.create(this.prototype);
        object.video = video;
        object.notes = [];
        object.title = video.src.substring(video.src.lastIndexOf("/") + 1, video.src.length);
        return object;
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
            resolve(HTML5Video.create(video));
        })
        video.addEventListener("error", (e) => {
            reject(e)
        })
    })
}