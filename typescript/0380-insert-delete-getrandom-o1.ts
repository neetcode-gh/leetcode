class RandomizedSet {
    map: { [key: number]: number };
    arr: number[];

    constructor() {
        this.map = {};
        this.arr = [];
    }

    insert(val: number): boolean {
        let res = !this.map.hasOwnProperty(val);
        if (res) {
            this.map[val] = this.arr.length;
            this.arr.push(val);
        }
        return res;
    }

    remove(val: number): boolean {
        let res = this.map.hasOwnProperty(val);
        if (res) {
            let idx = this.map[val];
            let lastVal = this.arr.at(-1);
            this.arr[idx] = lastVal;
            this.arr.pop();
            this.map[lastVal] = idx;
            delete this.map[val];
        }
        return res;
    }

    getRandom(): number {
        return this.arr[Math.floor(Math.random() * this.arr.length)];
    }
}
