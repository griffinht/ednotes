export class Note {
    time: number
    text: string = "";

    constructor(time: number) {
        this.time = time;
    }
}
export abstract class Video {
    abstract title: string;
    notes: Note[] = [];

    abstract getThumbnail(): HTMLElement;
    abstract getVideo(): HTMLElement;
    abstract getCurrentTime(): number;
}