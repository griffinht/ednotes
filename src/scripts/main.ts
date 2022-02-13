import {YoutubeVideo} from "./video/YoutubeVideo.js";
import {Video} from "./video/Video.js";

/*const fileUpload = document.getElementById("fileUpload") as HTMLInputElement;
fileUpload.addEventListener("change", (e) => {
    let target = e.target as HTMLInputElement;
    if (target.files != null) {
        for (let file of target.files) {
            console.log(file);
            let fileReader = new FileReader();
            fileReader.addEventListener("load", (e) => {
                if (e.target != null) {
                    console.log(e.target);
                    if (e.target.result instanceof ArrayBuffer) {
                        console.log(e.target.result);
                    }
                }
            })
            fileReader.readAsArrayBuffer(file);
        }
    }
})*/
const footer = document.getElementsByTagName("footer")[0];
function openVideo(parent: HTMLElement, child: HTMLElement, video: Video) {
    let main = document.createElement("main");
    {
        let header = document.createElement("header");
        {
            let button = document.createElement("button");
            button.innerText = "x";
            button.addEventListener("click", () => {
                main.remove();
                nav.style.display = "flex";
            })
            header.append(button);
        }
        main.append(header);
    }
    {
        let div = document.createElement("div");
        div.innerText = "video" + video.title;
        main.append(div);
    }
    {
        let section = document.createElement("section");
        for (let i = 0; i < 5; i++) {
            let div = document.createElement("div");
            div.innerText = "section div";
            section.append(div)
        }
        main.append(section);
    }
    parent.insertBefore(main, child);
    nav.style.display = "none";
}

const videos = [];
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo("dlIQWp1YPkw"));
const nav = document.getElementsByTagName("nav")[0];
for (let video of videos) {
    let div = document.createElement("div");
    div.addEventListener("click", () => {
        openVideo(document.body, footer, video);
    });
    div.append(video.getThumbnail());
    {
        let title = document.createElement("h2");
        title.innerText = video.title;
        div.append(video.title);
    }
    nav.append(div);
}