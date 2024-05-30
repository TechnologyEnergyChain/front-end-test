export type Dependencies = 'GamePloc' | 'GuessPloc'

export class Container {
    private readonly dependencies: Map<Dependencies, any> = new Map<Dependencies, any>()
    private static _instance: Container

    private constructor() {
    }


    static get instance(): Container {
        if (!Container._instance) {
            Container._instance = new Container()
        }
        return Container._instance
    }

    public bind(key: Dependencies, value: any) {
        if (this.dependencies.has(key)) {
            return
        }
        this.dependencies.set(key, value)
    }

    get<T>(key: Dependencies): T {
        return this.dependencies.get(key)
    }
}
