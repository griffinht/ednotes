import {Video} from "./Video.js";
import ByteBuffer from "../common/ByteBuffer.js";
import {VideoType} from "./VideoType.js";

export class YoutubeVideo extends Video {
    id: string;

    constructor(buffer: ByteBuffer) {
        super(buffer)
        this.id = buffer.readString8();
    }

    getThumbnail(): HTMLImageElement {
        let image = document.createElement("img");
        image.src = "https://i.ytimg.com/vi_webp/" + this.id + "/mqdefault.webp";
        return image;
    }

    getVideo(): HTMLElement {
        let div  = document.createElement("div");
        div.innerText = "video";
        return div;
    }

    getCurrentTime(): number {
        return 0;
    }

    getType(): VideoType {
        return VideoType.YOUTUBE_VIDEO;
    }

    serialize(buffer: ByteBuffer) {
        super.serialize(buffer);
        buffer.writeString8(this.id);
    }

    static create(url: string): YoutubeVideo {
        let object = Object.create(this.prototype);
        object.id = "dlIQWp1YPkw";
        object.title = "ur mom";
        return object;
    }
}

export function isYoutubeVideo(url: string) {
    return url.startsWith("https://www.youtube.com") || url.startsWith("https://youtu.be/")
}