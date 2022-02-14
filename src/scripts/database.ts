import {Video} from "./video/Video.js";
import ByteBuffer from "./common/ByteBuffer.js";
import {deserialize} from "./video/VideoType.js";

export interface Database {
    getVideos(): Promise<any>;
    putVideo(id: ArrayBuffer, video: Video): Promise<void>;
    removeVideo(id: ArrayBuffer): Promise<void>;
}
class IndexedDatabase implements Database {
    database: IDBDatabase

    constructor(database: IDBDatabase) {
        this.database = database;
    }

    async getVideos(): Promise<Map<ArrayBuffer, Video>> {
        let request = this.database.transaction("videos", "readwrite").objectStore("videos").openCursor();
        return new Promise((resolve, reject) => {
            let map = new Map();
            request.addEventListener("success", (e) => {
                let cursor = request.result;
                if (!cursor) {
                    resolve(map)
                    return;
                }
                if (cursor.primaryKey && cursor.value) {
                    map.set(cursor.primaryKey, deserialize(new ByteBuffer(cursor.value)));
                }
                cursor.continue();
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

    async putVideo(id: ArrayBuffer, video: Video): Promise<void> {
        let buffer = new ByteBuffer();
        video.serialize(buffer)
        let request = this.database.transaction("videos", "readwrite").objectStore("videos").put(buffer.getBuffer(), id);
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
        //indexedDB.deleteDatabase("ednotes");
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
