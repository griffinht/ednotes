import { Note } from "../../note/Note.js";
import { Database } from "../Database.js";
import ByteBuffer from "../../common/ByteBuffer.js";
import { deserialize } from "../../note/NoteType.js";

function promisify(request: IDBRequest): Promise<void> {
    return new Promise((resolve, reject) => {
            request.addEventListener("success", () => {
                resolve()
            });
            request.addEventListener("error", (e) => {
                reject(e)
            })
        });
}

class IndexedDatabase implements Database {
    database: IDBDatabase

    constructor(database: IDBDatabase) {
        this.database = database;
    }

    async getNotes(): Promise<Map<ArrayBuffer, Note>> {
        let request = this.database.transaction("notes", "readwrite").objectStore("notes").openCursor();
        return new Promise((resolve, reject) => {
            let map = new Map();
            request.addEventListener("success", (e) => {
                let cursor = request.result;
                if (!cursor) {
                    resolve(map)
                    return;
                }
                if (cursor.primaryKey && cursor.value) {
                    let note;
                    try {
                        note = deserialize(new ByteBuffer(cursor.value));
                    } catch (e) {
                        reject(e);
                    }
                    map.set(cursor.primaryKey, note);
                }
                cursor.continue();
            });
            request.addEventListener("error", (e) => {
                reject(e)
            })
        });
    }

    async removeNote(id: ArrayBuffer): Promise<void> {
        let request = this.database.transaction("notes", "readwrite").objectStore("notes").delete(id);
        await promisify(request);
    }

    async putNote(id: ArrayBuffer, note: Note): Promise<void> {
        let buffer = new ByteBuffer();
        note.serialize(buffer)
        let request = this.database.transaction("notes", "readwrite").objectStore("notes").put(buffer.getBuffer(), id);
        await promisify(request);
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
            database.createObjectStore("notes");
        })
        open.addEventListener("success", () => {
            resolve(open.result);
        });
    });
    return new IndexedDatabase(database);
}
