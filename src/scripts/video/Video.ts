export interface Video {
    title: string;
    getThumbnail(): HTMLImageElement;
    getVideo(): HTMLElement;
}