class MyHashMap {
    private cache: Map<number, number>;

    constructor() {
        this.cache = new Map<number, number>();
    }

    put(key: number, value: number): void {
        this.cache.set(key, value);
    }

    get(key: number): number {
        const value = this.cache.get(key);
        return value !== undefined ? value : -1;
    }

    remove(key: number): void {
        this.cache.delete(key);
    }
}
