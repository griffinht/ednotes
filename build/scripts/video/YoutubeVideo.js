import { Video } from "./Video.js";
import { VideoType } from "./VideoType.js";
export class YoutubeVideo extends Video {
    id;
    constructor(buffer) {
        super(buffer);
        this.id = buffer.readString8();
    }
    getThumbnail() {
        let image = document.createElement("img");
        image.src = "https://i.ytimg.com/vi_webp/" + this.id + "/mqdefault.webp";
        return image;
    }
    getVideo() {
        let div = document.createElement("div");
        div.innerText = "video";
        return div;
    }
    getCurrentTime() {
        return 0;
    }
    getType() {
        return VideoType.YOUTUBE_VIDEO;
    }
    serialize(buffer) {
        super.serialize(buffer);
        buffer.writeString8(this.id);
    }
    static create(url) {
        let object = Object.create(this.prototype);
        object.id = "dlIQWp1YPkw";
        object.title = "ur mom";
        object.notes = [];
        return object;
    }
}
export function isYoutubeVideo(url) {
    return url.startsWith("https://www.youtube.com") || url.startsWith("https://youtu.be/");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWW91dHViZVZpZGVvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NjcmlwdHMvdmlkZW8vWW91dHViZVZpZGVvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFFakMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXpDLE1BQU0sT0FBTyxZQUFhLFNBQVEsS0FBSztJQUNuQyxFQUFFLENBQVM7SUFFWCxZQUFZLE1BQWtCO1FBQzFCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNiLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxLQUFLLENBQUMsR0FBRyxHQUFHLDhCQUE4QixHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsaUJBQWlCLENBQUM7UUFDekUsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELFFBQVE7UUFDSixJQUFJLEdBQUcsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELGNBQWM7UUFDVixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxTQUFTLENBQUMsYUFBYSxDQUFDO0lBQ25DLENBQUM7SUFFRCxTQUFTLENBQUMsTUFBa0I7UUFDeEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFXO1FBQ3JCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsYUFBYSxDQUFDO1FBQzFCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7Q0FDSjtBQUVELE1BQU0sVUFBVSxjQUFjLENBQUMsR0FBVztJQUN0QyxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDM0YsQ0FBQyJ9