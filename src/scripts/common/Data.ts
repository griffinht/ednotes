export default class Data<T> {
    data: T
    update: () => Promise<void>;
    remove: () => Promise<void>;
    
    constructor(
        data: T,
        update: () => Promise<void>,
        remove: () => Promise<void>) {
        this.data = data;
        this.update = update;
        this.remove = remove;
    }
}
