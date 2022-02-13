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

export function openVideo(parent: HTMLElement, child: HTMLElement, hide: HTMLElement, video: Video) {
    let main = document.createElement("main");
    {
        let header = document.createElement("header");
        {
            let button = document.createElement("button");
            button.innerText = "x";
            button.addEventListener("click", () => {
                main.remove();
                hide.style.display = "grid";
            })
            header.append(button);
        }
        main.append(header);
    }
    {
        main.append(video.getVideo())
    }
    {
        let section = document.createElement("section");
        for (let i = 0; i < 5; i++) {
            let div = document.createElement("div");
            div.innerText = "section div";
            section.append(div)
        }
        {
            let button = document.createElement("button")
            button.innerText = "+";
            button.addEventListener("click", () => {
                let time = video.getCurrentTime();
                let index = 0;
                for (let i = 0; i < video.notes.length; i++) {
                    if (video.notes[i].time < time) {
                        index = i + 1;
                    }
                }
                console.log("fgsdlo", index, time, video.notes);
                video.notes.splice(index, 0, new Note(time))
            })
            section.append(button);
        }
        main.append(section);
    }
    parent.insertBefore(main, child);
    hide.style.display = "none";
}