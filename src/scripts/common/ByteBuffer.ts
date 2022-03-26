/**
 * The ByteBuffer class encapsulates a buffer which can be modified with read/write methods.
 * This is useful for serializing/deserializing data.
 * A ByteBuffer can be thought of as a stream, which can be consumed either by reading or writing data.
 * When writing data, the underlying buffer will be automatically expanded if it fills up.
 */
export default class ByteBuffer {
    position: number;
    view: DataView;

    /**
     * Constructs a new ByteBuffer instance with an existing buffer to use as the underlying buffer.
     * If no existing buffer is provided, a new one will be generated.
     *
     * @param buffer The existing buffer to use with the new ByteBuffer instance
     */
    constructor(buffer?: ArrayBufferLike) {
        this.position = 0;
        if (buffer === undefined) {
            buffer = new ArrayBuffer(0);
        }
        this.view = new DataView(buffer);
    }

    /**
     * Creates a new ByteBuffer instance with a new underlying buffer of a certain size.
     * This can be used to reduce the number of dyamic resize operations performed on the buffer when writing data.
     *
     * @param size The size of the new buffer to create
     */
    static create(size?: number): ByteBuffer {
        if (size === undefined) {
            size = 0;
        }
        return new ByteBuffer(new ArrayBuffer(size));
    }


    /**
     * @returns Whether the buffer has more data to read
     */
    hasNext() {
        return this.position < this.view.byteLength;
    }

    /**
     * @returns The underlying buffer
     */
    getBuffer() {
        if (this.view.byteLength > this.position) {
            return this.view.buffer.slice(0, this.position);
        } else {
            return this.view.buffer;
        }
    }


    /**
     * Checks if the buffer needs to be expanded before more data is written.
     * If the buffer needs to be expanded, then an entirely new larger array will be created, and the original data will be copied over.
     * This makes this operation potentially expensive.
     * Should be called each time before data is written to the buffer, to prevent the data from overflowing the buffer.
     *
     * @param extraLength The additional length the buffer should hold. This will be added to the current position.
     *
     */
    private checkResize(extraLength: number) {
        let targetLength = this.position + extraLength;
        if (targetLength > this.view.byteLength) {
            let buffer = new ArrayBuffer(targetLength);
            new Uint8Array(buffer).set(new Uint8Array(this.view.buffer));
            this.view = new DataView(buffer);
        }
    }

    readString8() {
        let length = this.readUint8();
        this.position += length;
        return new TextDecoder().decode(this.view.buffer.slice(this.position - length, this.position));
    }

    readString16() {
        let length = this.readUint16();
        this.position += length;
        return new TextDecoder().decode(this.view.buffer.slice(this.position - length, this.position));
    }

    readString32() {
        let length = this.readUint32();
        this.position += length;
        return new TextDecoder().decode(this.view.buffer.slice(this.position - length, this.position));
    }

    //todo b64 operations are probably broken
    readBase64_8() {
        return btoa(this.readString8());
    }

    readBase64_16() {
        return btoa(this.readString8());
    }

    readBase64_32() {
        return btoa(this.readString8());
    }

    readBoolean() {
        return this.readUint8() == 1;
    }

    readInt8() {
        let value = this.view.getInt8(this.position);
        this.position += 1;
        return value;
    }

    readUint8() {
        let value = this.view.getUint8(this.position);
        this.position += 1;
        return value;
    }

    readInt16() {
        let value = this.view.getInt16(this.position);
        this.position += 2;
        return value;
    }

    readUint16() {
        let value = this.view.getUint16(this.position);
        this.position += 2;
        return value;
    }

    readInt32() {
        let value = this.view.getInt32(this.position);
        this.position += 4;
        return value;
    }

    readUint32() {
        let value = this.view.getUint32(this.position);
        this.position += 4;
        return value;
    }

    readBigInt64() {
        let value = this.view.getBigInt64(this.position);
        this.position += 8;
        return value;
    }

    readBigUInt64() {
        let value = this.view.getBigUint64(this.position);
        this.position += 8;
        return value;
    }

    readFloat32() {
        let value = this.view.getFloat32(this.position);
        this.position += 4;
        return value;
    }

    readFloat64() {
        let value = this.view.getFloat64(this.position);
        this.position += 8;
        return value;
    }



    writeString8(value: string) {
        this.writeUint8(value.length);
        let buffer = new TextEncoder().encode(value);
        this.checkResize(buffer.length);
        new Uint8Array(this.view.buffer).set(new Uint8Array(buffer), this.position);
        this.position += buffer.length;
    }

    writeString16(value: string) {
        this.writeUint16(value.length);
        let buffer = new TextEncoder().encode(value);
        this.checkResize(buffer.length);
        new Uint8Array(this.view.buffer).set(new Uint8Array(buffer), this.position);
        this.position += buffer.length;
    }

    writeString32(value: string) {
        this.writeUint32(value.length);
        let buffer = new TextEncoder().encode(value);
        this.checkResize(buffer.length);
        new Uint8Array(this.view.buffer).set(new Uint8Array(buffer), this.position);
        this.position += buffer.length;
    }

    writeBase64_8(value: string) {
        this.writeString8(atob(value));
    }

    writeBase64_16(value: string) {
        this.writeString16(atob(value));
    }

    writeBase64_32(value: string) {
        this.writeString32(atob(value));
    }

    writeBoolean(value: boolean) {
        this.writeUint8(value ? 1 : 0);
    }

    writeInt8(value: number) {
        this.checkResize(1);
        this.view.setInt8(this.position, value);
        this.position += 1;
    }

    writeUint8(value: number) {
        this.checkResize(1);
        this.view.setUint8(this.position, value);
        this.position += 1;
    }

    writeInt16(value: number) {
        this.checkResize(2);
        this.view.setInt16(this.position, value);
        this.position += 2;
    }

    writeUint16(value: number) {
        this.checkResize(2);
        this.view.setUint16(this.position, value);
        this.position += 2;
    }

    writeInt32(value: number) {
        this.checkResize(4);
        this.view.setInt32(this.position, value);
        this.position += 4;
    }

    writeUint32(value: number) {
        this.checkResize(4);
        this.view.setUint32(this.position, value);
        this.position += 4;
    }

    writeBigInt64(value: bigint) {
        this.checkResize(8);
        this.view.setBigInt64(this.position, value);
        this.position += 8;
    }

    writeBigUInt64(value: bigint) {
        this.checkResize(8);
        this.view.setBigUint64(this.position, value);
        this.position += 8;
    }

    writeFloat32(value: number) {
        this.checkResize(4);
        this.view.setFloat32(this.position, value);
        this.position += 4;
    }

    writeFloat64(value: number) {
        this.checkResize(1);
        this.view.setFloat64(this.position, value);
        this.position += 8;
    }
}
