import {Note, Video} from "./video/Video.js";
import {Database} from "./database.js";

const footer = document.getElementsByTagName("footer")[0];
const nav = document.getElementsByTagName("nav")[0];

export class Videos {
    videos: Video[];

    constructor(database: Database) {
        this.videos = [];
        database
            .getVideos()
            .then((videos) => {
                for (let video of videos) {
                    this.addVideo(video);
                }
            });
    }

    addVideo(video: Video) {
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
            video.notes.push(new Note(0))
            video.notes.push(new Note(1))
            video.notes.push(new Note(2))
            video.notes.push(new Note(3))
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
                    video.notes.splice(index, 0, new Note(time))
                })
                section.append(button);
            }
            main.append(section);
        }
        document.body.insertBefore(main, footer);
        nav.style.display = "none";
    }
}