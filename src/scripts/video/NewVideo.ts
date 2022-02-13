import {isYoutubeVideo, YoutubeVideo} from "./YoutubeVideo.js";
import {loadVideo} from "./HTML5Video.js";
import {closeModal} from "../newModal/NewModal.js";
import {addVideo, openVideo} from "../main.js";

export async function openUrl(url: string): Promise<void> {
    let video;
    try {
        if (isYoutubeVideo(url)) {
            video = new YoutubeVideo(url);
        } else {
            video = await loadVideo(url);
        }
    } catch (e) {
        alert("Error opening " + url)
        return;
    }
    addVideo(video);
    closeModal();
    openVideo(video);
    console.log("open", url)
}

export async function openFile(file: File): Promise<void> {
    //todo
    let video;
    try {
        video = await loadVideo("file");
    } catch (e) {
        alert("Error opening " + file)
        return;
    }
    addVideo(video);
    closeModal();
    openVideo(video);
}
