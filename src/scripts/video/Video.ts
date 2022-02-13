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
        video.notes.push(new Note(0))
        video.notes.push(new Note(1))
        video.notes.push(new Note(2))
        video.notes.push(new Note(3))
        for (let note of video.notes) {
            let element = document.createElement("input")
            element.type = "textarea"
            element.value = note.text;
            element.addEventListener("change", (e) => {
                console.log("change")
                note.text = element.value;
            });
            section.append(element);
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
                video.notes.splice(index, 0, new Note(time))
            })
            section.append(button);
        }
        main.append(section);
    }
    parent.insertBefore(main, child);
    hide.style.display = "none";
}