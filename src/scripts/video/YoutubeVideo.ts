import {Video} from "Video.js";

export class YoutubeVideo implements Video {
    id: string;
    title: string = "ur mom";

    constructor(url: String) {
        this.id = "dlIQWp1YPkw";
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
}

export function isYoutubeVideo(url: string) {
    return url.startsWith("https://www.youtube.com") || url.startsWith("https://youtu.be/")
}