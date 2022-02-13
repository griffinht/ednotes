import {Video} from "./video/Video.js";

export interface Database {
    getVideos(): Promise<Video[]>;
    updateVideo(id: ArrayBuffer, video: Video): Promise<void>;
    removeVideo(id: ArrayBuffer): Promise<void>;
}
class IndexedDatabase implements Database {
    database: IDBDatabase

    constructor(database: IDBDatabase) {
        this.database = database;
    }

    async getVideos(): Promise<Video[]> {
        let request = this.database.transaction("videos", "readwrite").objectStore("videos").getAll();
        return new Promise((resolve, reject) => {
            request.addEventListener("success", () => {
                resolve(request.result as Video[])
            });
            request.addEventListener("error", (e) => {
                reject(e)
            })
        });
    }

    async removeVideo(id: ArrayBuffer): Promise<void> {
        let request = this.database.transaction("videos", "readwrite").objectStore("videos").delete(id);
        return new Promise((resolve, reject) => {
            request.addEventListener("success", () => {
                resolve()
            });
            request.addEventListener("error", (e) => {
                reject(e)
            })
        });
    }

    async updateVideo(id: ArrayBuffer, video: Video): Promise<void> {
        let request = this.database.transaction("videos", "readwrite").objectStore("videos").put(video, id);
        return new Promise((resolve, reject) => {
            request.addEventListener("success", () => {
                resolve()
            });
            request.addEventListener("error", (e) => {
                reject(e)
            })
        });
    }

}
export async function loadDatabase(): Promise<Database> {
    let database = await new Promise<IDBDatabase>((resolve, reject) => {
        indexedDB.deleteDatabase("ednotes");
        let open = indexedDB.open("ednotes");
        open.addEventListener("error", (e) => {
            reject(e);
        });
        open.addEventListener("upgradeneeded", () => {
            let database = open.result;
            database.createObjectStore("videos");
        })
        open.addEventListener("success", () => {
            resolve(open.result);
        });
    });
    return new IndexedDatabase(database);
}
