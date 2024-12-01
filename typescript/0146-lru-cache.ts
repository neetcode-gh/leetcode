/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

type CacheNode = {
    value: number,
    key: number | null,
    next: CacheNode | null,
    prev: CacheNode | null,
};

class LRUCache {
    private size: number;
    private capacity: number;
    private data: Map<number, CacheNode>;
    private head: CacheNode;
    private tail: CacheNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.size = 0;

        this.data = new Map();
        // Initialize dummy nodes for convenience
        this.head = { value: 0 } as CacheNode;
        this.tail = { value: 0 } as CacheNode;

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: number): number {
        const node = this.data.get(key);
        if (!node) return -1;

        node.prev.next = node.next;
        node.next.prev = node.prev;

        node.next = this.head.next;
        node.prev = this.head;

        this.head.next.prev = node;
        this.head.next = node;
        
        return node.value;
    }

    put(key: number, value: number): void {
        let node = this.data.get(key);
        if (!node) {
          this.size++;
          node = { value, key } as CacheNode;
          this.data.set(key, node);
        } else {
          node.value = value;
          node.prev.next = node.next;
          node.next.prev = node.prev;
        }

        node.next = this.head.next;
        node.prev = this.head;

        this.head.next.prev = node;
        this.head.next = node;

        if (this.size > this.capacity) {
          this.evict();
        }
    }

    private evict() {
        this.size--;

        const node = this.tail.prev;

        node.prev.next = node.next;
        node.next.prev = node.prev;

        node.prev = null;
        node.next = null;

        this.data.delete(node.key);
    }
}
