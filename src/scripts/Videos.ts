import {Note, Video} from "./video/Video.js";
import {Database} from "./database.js";

const footer = document.getElementsByTagName("footer")[0];
const nav = document.getElementsByTagName("nav")[0];

export class Videos {
    videos: Map<ArrayBuffer, Video> = new Map<ArrayBuffer, Video>();
    database: Database

    constructor(database: Database) {
        this.database = database;
        this.database
            .getVideos()
            .then((videos) => {
                console.log(videos)
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

        let div = document.createElement("div");
        div.addEventListener("click", () => {
            this.openVideo(video);
        });
        div.append(video.getThumbnail());
        {
            let title = document.createElement("h2");
            title.innerText = video.title;
            div.append(title);
        }
        nav.append(div);
    }

    openVideo(video: Video) {
        let main = document.createElement("main");
        {
            let header = document.createElement("header");
            {
                let button = document.createElement("button");
                button.innerText = "x";
                button.addEventListener("click", () => {
                    main.remove();
                    nav.style.display = "grid";
                })
                header.append(button);
            }
            main.append(header);
        }
        {
            main.append(video.getVideo())
        }
        {
            let section = document.createElement("section");
            video.notes.push(Note.create(0))
            video.notes.push(Note.create(1))
            video.notes.push(Note.create(2))
            video.notes.push(Note.create(3))
            for (let note of video.notes) {
                let element = document.createElement("input")
                element.type = "textarea"
                element.value = note.text;
                element.addEventListener("change", (e) => {
                    console.log("change")
                    note.text = element.value;
                });
                section.append(element);
            }
            {
                let button = document.createElement("button")
                button.innerText = "+";
                button.addEventListener("click", () => {
                    let time = video.getCurrentTime();
                    let index = 0;
                    for (let i = 0; i < video.notes.length; i++) {
                        if (video.notes[i].time < time) {
                            index = i + 1;
                        }
                    }
                    video.notes.splice(index, 0, Note.create(time))
                })
                section.append(button);
            }
            main.append(section);
        }
        document.body.insertBefore(main, footer);
        nav.style.display = "none";
    }
}