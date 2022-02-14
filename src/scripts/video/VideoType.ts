import ByteBuffer from "../common/ByteBuffer.js";
import {Video} from "./Video.js";
import {HTML5Video} from "./HTML5Video.js";

export enum VideoType {
    HTML5_VIDEO,
    YOUTUBE_VIDEO
}

export function deserialize(buffer: ByteBuffer): Video {
    switch (buffer.readUint8()) {
        case VideoType.HTML5_VIDEO:
            return new HTML5Video(buffer)
        case VideoType.YOUTUBE_VIDEO:
            return new HTML5Video(buffer)
        default:
            throw new Error("unknown type");
    }
}