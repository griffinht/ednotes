import { isYoutubeVideo, YoutubeVideo } from "./YoutubeVideo.js";
import { loadVideo } from "./HTML5Video.js";
export class NewVideo {
    modal;
    videos;
    constructor(modal, videos) {
        this.modal = modal;
        this.videos = videos;
    }
    async openUrl(url) {
        let video;
        try {
            if (isYoutubeVideo(url)) {
                video = YoutubeVideo.create(url);
            }
            else {
                video = await loadVideo(url);
            }
        }
        catch (e) {
            alert("Error opening " + url);
            return;
        }
        this.videos.addVideo(video);
        this.modal.closeModal();
        this.videos.openVideo(video);
        console.log("open", url);
    }
    async openFile(file) {
        //todo
        let video;
        try {
            video = await loadVideo("file");
        }
        catch (e) {
            alert("Error opening " + file);
            return;
        }
        this.videos.addVideo(video);
        this.modal.closeModal();
        this.videos.openVideo(video);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV3VmlkZW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2NyaXB0cy92aWRlby9OZXdWaWRlby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFFLFlBQVksRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQy9ELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUkxQyxNQUFNLE9BQU8sUUFBUTtJQUNqQixLQUFLLENBQVU7SUFDZixNQUFNLENBQVE7SUFFZCxZQUFZLEtBQWUsRUFBRSxNQUFjO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVc7UUFDckIsSUFBSSxLQUFLLENBQUM7UUFDVixJQUFJO1lBQ0EsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BDO2lCQUFNO2dCQUNILEtBQUssR0FBRyxNQUFNLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixLQUFLLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLENBQUE7WUFDN0IsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFVO1FBQ3JCLE1BQU07UUFDTixJQUFJLEtBQUssQ0FBQztRQUNWLElBQUk7WUFDQSxLQUFLLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQTtZQUM5QixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7Q0FDSiJ9