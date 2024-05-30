export abstract class Factory<T> {
    // data: any

    abstract create(extra?: {}): T

    times(times: number, extra?: {}): T[] {
        return new Array(times).fill(null).map(() => (this.create(extra)));
    }
}