import {Video} from "./video/Video.js";
import {Database} from "./database.js";

export class Videos {
    videos: Map<ArrayBuffer, Video> = new Map<ArrayBuffer, Video>();
    database: Database
    element: HTMLElement
    before: Element

    constructor(database: Database, element: HTMLElement, before: Element) {
        this.database = database;
        this.database
            .getVideos()
            .then((videos: Map<ArrayBuffer, Video>) => {
                for (let [id, video] of videos.entries()) {
                    this._addVideo(id, video)
                }
            });
        this.element = element;
        this.before = before;
    }

    addVideo(video: Video) {
        let id = new Uint8Array(4)
        window.crypto.getRandomValues(id);
        this._addVideo(id, video);
        this.database.putVideo(id, video).then();
    }
    _addVideo(id: ArrayBuffer, video: Video) {
        this.videos.set(id, video);
        this.element.append(video.createThumbnailElement(
            () => this.openVideo(video), 
            () => this.removeVideo(id), 
            () => this.updateVideo(id, video)
        ));
    }

    openVideo(video: Video) {
        document.body.insertBefore(video.createElement(() => { this.element.style.display = "grid"; }), this.before);
        this.element.style.display = "none";
    }

    async removeVideo(id: ArrayBuffer) {
        this.videos.delete(id);
        await this.database.removeVideo(id);
    }
    
    async updateVideo(id: ArrayBuffer, video: Video) {
        await this.database.putVideo(id, video);
    }
}
