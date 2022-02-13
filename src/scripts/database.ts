import {Video} from "./video/Video.js";

export interface Database {
    getVideos(): Promise<Video[]>;
    updateVideo(id: ArrayBuffer, video: Video): Promise<void>;
    removeVideo(id: ArrayBuffer): Promise<void>;
}
class IndexedDatabase implements Database {
    database: IDBDatabase
    videoStore: IDBObjectStore

    constructor(database: IDBDatabase) {
        this.database = database;
        this.videoStore = this.database.createObjectStore("videoStore");
    }

    async getVideos(): Promise<Video[]> {
        return (await this.videoStore.getAll()).result as Video[];
    }

    async removeVideo(id: ArrayBuffer): Promise<void> {
        await this.videoStore.delete(id);
    }

    async updateVideo(id: ArrayBuffer, video: Video): Promise<void> {
        this.videoStore.put(video, id);
    }

}
export async function loadDatabase(): Promise<Database> {
    let database = await new Promise<IDBDatabase>((resolve, reject) => {
        let open = indexedDB.open("ednotes");
        open.addEventListener("error", (e) => {
            reject(e);
        });
        open.addEventListener("success", () => {
            resolve(open.result);
        });
    });
    return new IndexedDatabase(database);
}
