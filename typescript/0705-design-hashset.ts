class _ListNode { // ListNode has a confict
    key: number;
    next: _ListNode | undefined;

    constructor(key: number) {
        this.key = key;
    }
}

class MyHashSet {
    readonly ARRAY_LENGTH = Math.pow(10, 4);
    set = new Array<_ListNode>(this.ARRAY_LENGTH);

    constructor() {
        for (let i = 0; i < this.ARRAY_LENGTH; i++)
            this.set[i] = new _ListNode(0);
    }

    add(key: number): void {
        let cur = this.set[key % this.set.length];
        
        while (cur.next) {
            if (cur.next.key === key)
                return;

            cur = cur.next;
        }

        cur.next = new _ListNode(key);
    }

    remove(key: number): void {
        let cur = this.set[key % this.set.length];
        
        while (cur.next) {
            if (cur.next.key === key) {
                cur.next = cur.next.next;
                return;
            }

            cur = cur.next;
        }
    }

    contains(key: number): boolean {
        let cur = this.set[key % this.set.length];
        
        while (cur.next) {
            if (cur.next.key === key)
                return true;

            cur = cur.next;
        }

        return false;
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
