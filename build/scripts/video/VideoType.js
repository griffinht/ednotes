import { HTML5Video } from "./HTML5Video.js";
import { YoutubeVideo } from "./YoutubeVideo.js";
export var VideoType;
(function (VideoType) {
    VideoType[VideoType["HTML5_VIDEO"] = 0] = "HTML5_VIDEO";
    VideoType[VideoType["YOUTUBE_VIDEO"] = 1] = "YOUTUBE_VIDEO";
})(VideoType || (VideoType = {}));
export function deserialize(buffer) {
    switch (buffer.readUint8()) {
        case VideoType.HTML5_VIDEO:
            return new HTML5Video(buffer);
        case VideoType.YOUTUBE_VIDEO:
            return new YoutubeVideo(buffer);
        default:
            throw new Error("unknown type");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlkZW9UeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NjcmlwdHMvdmlkZW8vVmlkZW9UeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFFL0MsTUFBTSxDQUFOLElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQix1REFBVyxDQUFBO0lBQ1gsMkRBQWEsQ0FBQTtBQUNqQixDQUFDLEVBSFcsU0FBUyxLQUFULFNBQVMsUUFHcEI7QUFFRCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQWtCO0lBQzFDLFFBQVEsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hCLEtBQUssU0FBUyxDQUFDLFdBQVc7WUFDdEIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNqQyxLQUFLLFNBQVMsQ0FBQyxhQUFhO1lBQ3hCLE9BQU8sSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkM7WUFDSSxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0tBQ3ZDO0FBQ0wsQ0FBQyJ9