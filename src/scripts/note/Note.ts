import ByteBuffer from "../common/ByteBuffer.js";

export abstract class Note {
    created: Date;
    title: string;
    
    protected constructor(buffer: ByteBuffer) {
        this.created = new Date(buffer.readUint32());
        this.title = buffer.readString8();
    }
    
    serialize(buffer: ByteBuffer) {
        buffer.writeUint32(this.created.getTime());
        buffer.writeString8(this.title);
    }
}
