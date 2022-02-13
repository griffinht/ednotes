import {openVideo as _openVideo, Video} from "./video/Video.js";
import "./newModal/Drag.js";
import "./newModal/FileInput.js";
import "./newModal/ScreenInput.js";
import "./newModal/UrlInput.js";

const footer = document.getElementsByTagName("footer")[0];

const nav = document.getElementsByTagName("nav")[0];
export function addVideo(video: Video) {
    let div = document.createElement("div");
    div.addEventListener("click", () => {
        openVideo(video);
    });
    div.append(video.getThumbnail());
    {
        let title = document.createElement("h2");
        title.innerText = video.title;
        div.append(title);
    }
    nav.append(div);
}
export function openVideo(video: Video) {
    _openVideo(document.body, footer, nav, video);
}