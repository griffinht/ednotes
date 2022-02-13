import {Video} from "./Video.js";
import {isYoutubeVideo, YoutubeVideo} from "./YoutubeVideo.js";
import {loadVideo} from "./HTML5Video.js";

export async function openUrl(url: string): Promise<Video | null> {
    console.log("open", url)
    if (isYoutubeVideo(url)) {
        return new YoutubeVideo(url);
    } else {
        return loadVideo(url);
    }
    return null;
}

export async function openFile(file: File): Promise<Video | null> {
    console.log("file", file);
    return await loadVideo("url");
}
