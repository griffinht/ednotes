export interface Video {
    title: string;
    getThumbnail(): HTMLElement;
    getVideo(): HTMLElement;
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
        let div = document.createElement("div");
        div.innerText = "video" + video.title;
        main.append(div);
    }
    {
        let section = document.createElement("section");
        for (let i = 0; i < 5; i++) {
            let div = document.createElement("div");
            div.innerText = "section div";
            section.append(div)
        }
        main.append(section);
    }
    parent.insertBefore(main, child);
    hide.style.display = "none";
}