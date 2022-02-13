import {YoutubeVideo} from "./video/YoutubeVideo.js";
import {openVideo, Video} from "./video/Video.js";
import "./NewModal.js";

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


const videos = [];
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo(""));
videos.push(new YoutubeVideo("dlIQWp1YPkw"));
const nav = document.getElementsByTagName("nav")[0];
for (let video of videos) {
    let div = document.createElement("div");
    div.addEventListener("click", () => {
        openVideo(document.body, footer, nav, video);
    });
    div.append(video.getThumbnail());
    {
        let title = document.createElement("h2");
        title.innerText = video.title;
        div.append(video.title);
    }
    nav.append(div);
}