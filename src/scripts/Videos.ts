import {Video} from "./video/Video.js";
import {Database} from "./database.js";

const footer = document.getElementsByTagName("footer")[0];
const element = document.getElementsByClassName("browser")[0];

export class Videos {
    videos: Map<ArrayBuffer, Video> = new Map<ArrayBuffer, Video>();
    database: Database

    constructor(database: Database) {
        this.database = database;
        this.database
            .getVideos()
            .then((videos: Map<ArrayBuffer, Video>) => {
                for (let [id, video] of videos.entries()) {
                    this._addVideo(id, video)
                }
            });
    }

    addVideo(video: Video) {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        this._addVideo(id, video);
        this.database.putVideo(id, video).then();
    }
    _addVideo(id: ArrayBuffer, video: Video) {
        this.videos.set(id, video);
        element.append(video.createThumbnailElement(this, id));
    }

    openVideo(video: Video) {
        document.body.insertBefore(video.createElement(() => { element.style.display = "grid"; }), footer);
        element.style.display = "none";
    }

    async removeVideo(id: ArrayBuffer) {
        this.videos.delete(id);
        await this.database.removeVideo(id);
    }
}
