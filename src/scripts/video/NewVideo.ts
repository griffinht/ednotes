import {Video} from "./Video.js";
import {isYoutubeVideo, YoutubeVideo} from "./YoutubeVideo.js";
import {HTML5Video} from "./HTML5Video.js";

export async function openUrl(url: string): Promise<Video | null> {
    console.log("open", url)
    if (isYoutubeVideo(url)) {
        return new YoutubeVideo(url);
    } else {
        return new HTML5Video(url);
    }
    return null;
}

export async function openFile(file: File): Promise<Video | null> {
    console.log("file", file);
    for (let i = 0; i < 10000; i++) {}
    return null;
}
