import {loadDatabase} from "./database.js";
import {Videos} from "./Videos.js";
import {NewModal} from "./newModal/NewModal.js";
import {Drag} from "./newModal/Drag.js";
import {FileInput} from "./newModal/FileInput.js";
import {NewVideo} from "./video/NewVideo.js";
import {UrlInput} from "./newModal/UrlInput.js";
import {Notes} from "./note/Notes.js";
import {Viewer} from "./Viewer.js";

const database = await loadDatabase();
const notes = new Notes(database, document.getElementsByClassName("browser")[0] as HTMLElement, document.getElementsByTagName("footer")[0]);
const modal = new NewModal(document.getElementById("newModal")!, document.getElementById("urlInput") as HTMLInputElement);
const viewer = new Viewer(document.getElementsByClassName("viewer")[0] as HTMLElement);
/*
const newVideo = new NewVideo(modal, videos);
new Drag(modal, newVideo);
new FileInput(modal, newVideo);
new UrlInput(modal, newVideo);*/
