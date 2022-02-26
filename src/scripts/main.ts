import {loadDatabase} from "./database.js";
import {Videos} from "./Videos.js";
import {NewModal} from "./newModal/NewModal.js";
import {Drag} from "./newModal/Drag.js";
import {FileInput} from "./newModal/FileInput.js";
import {NewVideo} from "./video/NewVideo.js";
import {UrlInput} from "./newModal/UrlInput.js";

const database = await loadDatabase();
const videos = new Videos(database);
const modal = new NewModal();
const newVideo = new NewVideo(modal, videos);
new Drag(modal, newVideo);
new FileInput(modal, newVideo);
new UrlInput(modal, newVideo);