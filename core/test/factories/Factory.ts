export abstract class Factory<T> {
    // data: any

    abstract create(extra?: object): T

    times(times: number, extra?: object): T[] {
        return new Array(times).fill(null).map(() => (this.create(extra)))
    }
}