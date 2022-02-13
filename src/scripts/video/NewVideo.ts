import {isYoutubeVideo, YoutubeVideo} from "./YoutubeVideo.js";
import {loadVideo} from "./HTML5Video.js";
import {NewModal} from "../newModal/NewModal.js";
import {Videos} from "../Videos.js";

export class NewVideo {
    modal: NewModal
    videos: Videos

    constructor(modal: NewModal, videos: Videos) {
        this.modal = modal;
        this.videos = videos;
    }

    async openUrl(url: string): Promise<void> {
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
        this.videos.addVideo(video);
        this.modal.closeModal();
        this.videos.openVideo(video);
        console.log("open", url)
    }

    async openFile(file: File): Promise<void> {
        //todo
        let video;
        try {
            video = await loadVideo("file");
        } catch (e) {
            alert("Error opening " + file)
            return;
        }
        this.videos.addVideo(video);
        this.modal.closeModal();
        this.videos.openVideo(video);
    }
}

