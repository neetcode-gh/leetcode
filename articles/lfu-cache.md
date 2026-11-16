## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Hash Maps** - O(1) key-value lookups for storing cache entries
- **Doubly Linked Lists** - O(1) insertion and deletion for maintaining element order
- **LRU Cache Concept** - Understanding eviction based on recency (this problem extends it with frequency)
- **Cache Design Patterns** - Combining multiple data structures for efficient operations

---

## 1. Brute Force

### Intuition

An LFU (Least Frequently Used) cache evicts the element that has been accessed the fewest times. When there's a tie in frequency, we evict the least recently used among them. The simplest approach stores each key's value, frequency, and a timestamp. On eviction, we scan all entries to find the one with the minimum frequency (and earliest timestamp for ties).

### Algorithm

1. Store each cache entry as `[value, frequency, timestamp]` in a hash map.
2. For `get(key)`: if the key exists, increment its frequency, update its timestamp, and return the value. Otherwise return `-1`.
3. For `put(key, value)`: if the key exists, update its value, increment frequency, and update timestamp.
4. If inserting a new key and the cache is full, scan all entries to find the one with the lowest frequency. Among entries with the same frequency, pick the one with the smallest timestamp. Remove it.
5. Insert the new key with frequency `1` and the current timestamp.

::tabs-start

```python
class LFUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> [value, frequency, timestamp]
        self.timestamp = 0

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        self.cache[key][1] += 1
        self.timestamp += 1
        self.cache[key][2] = self.timestamp
        return self.cache[key][0]

    def put(self, key: int, value: int) -> None:
        if self.capacity <= 0:
            return

        self.timestamp += 1
        if key in self.cache:
            self.cache[key][0] = value
            self.cache[key][1] += 1
            self.cache[key][2] = self.timestamp
            return

        if len(self.cache) >= self.capacity:
            min_freq = float('inf')
            min_timestamp = float('inf')
            lfu_key = None

            for k, (_, freq, ts) in self.cache.items():
                if freq < min_freq or (freq == min_freq and ts < min_timestamp):
                    min_freq = freq
                    min_timestamp = ts
                    lfu_key = k
            if lfu_key is not None:
                del self.cache[lfu_key]

        self.cache[key] = [value, 1, self.timestamp]
```

```java
class Node {
    int value, freq, timestamp;

    Node(int value, int freq, int timestamp) {
        this.value = value;
        this.freq = freq;
        this.timestamp = timestamp;
    }
}

public class LFUCache {

    private int capacity, timestamp;
    private Map<Integer, Node> cache;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.timestamp = 0;
        this.cache = new HashMap<>();
    }

    public int get(int key) {
        if (!cache.containsKey(key)) return -1;

        Node node = cache.get(key);
        node.freq++;
        node.timestamp = ++timestamp;
        return node.value;
    }

    public void put(int key, int value) {
        if (capacity <= 0) return;

        timestamp++;
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            node.value = value;
            node.freq++;
            node.timestamp = timestamp;
            return;
        }

        if (cache.size() >= capacity) {
            int minFreq = Integer.MAX_VALUE, minTimestamp = Integer.MAX_VALUE, lfuKey = -1;

            for (Map.Entry<Integer, Node> entry : cache.entrySet()) {
                Node node = entry.getValue();
                if (node.freq < minFreq || (node.freq == minFreq && node.timestamp < minTimestamp)) {
                    minFreq = node.freq;
                    minTimestamp = node.timestamp;
                    lfuKey = entry.getKey();
                }
            }

            cache.remove(lfuKey);
        }

        cache.put(key, new Node(value, 1, timestamp));
    }
}
```

```cpp
class LFUCache {
    struct Node {
        int value, freq, timestamp;
        Node(int v, int f, int t) : value(v), freq(f), timestamp(t) {}
    };

    int capacity, timestamp;
    unordered_map<int, Node*> cache;

public:
    LFUCache(int capacity) : capacity(capacity), timestamp(0) {}

    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;

        cache[key]->freq++;
        cache[key]->timestamp = ++timestamp;
        return cache[key]->value;
    }

    void put(int key, int value) {
        if (capacity <= 0) return;

        timestamp++;
        if (cache.find(key) != cache.end()) {
            cache[key]->value = value;
            cache[key]->freq++;
            cache[key]->timestamp = timestamp;
            return;
        }

        if (cache.size() >= capacity) {
            int minFreq = INT_MAX, minTimestamp = INT_MAX, lfuKey = -1;

            for (const auto& [k, node] : cache) {
                if (node->freq < minFreq || (node->freq == minFreq && node->timestamp < minTimestamp)) {
                    minFreq = node->freq;
                    minTimestamp = node->timestamp;
                    lfuKey = k;
                }
            }
            delete cache[lfuKey];
            cache.erase(lfuKey);
        }

        cache[key] = new Node(value, 1, timestamp);
    }
};
```

```javascript
class LFUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.timestamp = 0;
        this.cache = new Map();
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) return -1;

        const node = this.cache.get(key);
        node.freq++;
        node.timestamp = ++this.timestamp;
        return node.value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.capacity <= 0) return;

        this.timestamp++;
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            node.value = value;
            node.freq++;
            node.timestamp = this.timestamp;
            return;
        }

        if (this.cache.size >= this.capacity) {
            let minFreq = Infinity,
                minTimestamp = Infinity,
                lfuKey = null;

            for (const [k, node] of this.cache.entries()) {
                if (
                    node.freq < minFreq ||
                    (node.freq === minFreq && node.timestamp < minTimestamp)
                ) {
                    minFreq = node.freq;
                    minTimestamp = node.timestamp;
                    lfuKey = k;
                }
            }

            if (lfuKey !== null) this.cache.delete(lfuKey);
        }

        this.cache.set(key, { value, freq: 1, timestamp: this.timestamp });
    }
}
```

```csharp
public class Node {
    public int Value;
    public int Freq;
    public int Timestamp;

    public Node(int value, int freq, int timestamp) {
        this.Value = value;
        this.Freq = freq;
        this.Timestamp = timestamp;
    }
}

public class LFUCache {
    private int capacity;
    private int timestamp;
    private Dictionary<int, Node> cache;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.timestamp = 0;
        this.cache = new Dictionary<int, Node>();
    }

    public int Get(int key) {
        if (!cache.ContainsKey(key)) return -1;

        Node node = cache[key];
        node.Freq++;
        node.Timestamp = ++timestamp;
        return node.Value;
    }

    public void Put(int key, int value) {
        if (capacity <= 0) return;

        timestamp++;
        if (cache.ContainsKey(key)) {
            Node node = cache[key];
            node.Value = value;
            node.Freq++;
            node.Timestamp = timestamp;
            return;
        }

        if (cache.Count >= capacity) {
            int minFreq = int.MaxValue;
            int minTimestamp = int.MaxValue;
            int lfuKey = -1;

            foreach (var entry in cache) {
                Node node = entry.Value;
                if (node.Freq < minFreq || (node.Freq == minFreq && node.Timestamp < minTimestamp)) {
                    minFreq = node.Freq;
                    minTimestamp = node.Timestamp;
                    lfuKey = entry.Key;
                }
            }

            if (lfuKey != -1) {
                cache.Remove(lfuKey);
            }
        }

        cache[key] = new Node(value, 1, timestamp);
    }
}
```

```go
type Node struct {
    value     int
    freq      int
    timestamp int
}

type LFUCache struct {
    capacity  int
    timestamp int
    cache     map[int]*Node
}

func Constructor(capacity int) LFUCache {
    return LFUCache{
        capacity:  capacity,
        timestamp: 0,
        cache:     make(map[int]*Node),
    }
}

func (this *LFUCache) Get(key int) int {
    if node, exists := this.cache[key]; exists {
        node.freq++
        this.timestamp++
        node.timestamp = this.timestamp
        return node.value
    }
    return -1
}

func (this *LFUCache) Put(key int, value int) {
    if this.capacity <= 0 {
        return
    }

    this.timestamp++
    if node, exists := this.cache[key]; exists {
        node.value = value
        node.freq++
        node.timestamp = this.timestamp
        return
    }

    if len(this.cache) >= this.capacity {
        minFreq := math.MaxInt32
        minTimestamp := math.MaxInt32
        lfuKey := -1

        for k, node := range this.cache {
            if node.freq < minFreq || (node.freq == minFreq && node.timestamp < minTimestamp) {
                minFreq = node.freq
                minTimestamp = node.timestamp
                lfuKey = k
            }
        }

        if lfuKey != -1 {
            delete(this.cache, lfuKey)
        }
    }

    this.cache[key] = &Node{value: value, freq: 1, timestamp: this.timestamp}
}
```

```kotlin
class Node(var value: Int, var freq: Int, var timestamp: Int)

class LFUCache(private val capacity: Int) {
    private var timestamp = 0
    private val cache = HashMap<Int, Node>()

    fun get(key: Int): Int {
        val node = cache[key] ?: return -1
        node.freq++
        node.timestamp = ++timestamp
        return node.value
    }

    fun put(key: Int, value: Int) {
        if (capacity <= 0) return

        timestamp++
        cache[key]?.let { node ->
            node.value = value
            node.freq++
            node.timestamp = timestamp
            return
        }

        if (cache.size >= capacity) {
            var minFreq = Int.MAX_VALUE
            var minTimestamp = Int.MAX_VALUE
            var lfuKey: Int? = null

            for ((k, node) in cache) {
                if (node.freq < minFreq || (node.freq == minFreq && node.timestamp < minTimestamp)) {
                    minFreq = node.freq
                    minTimestamp = node.timestamp
                    lfuKey = k
                }
            }

            lfuKey?.let { cache.remove(it) }
        }

        cache[key] = Node(value, 1, timestamp)
    }
}
```

```swift
class Node {
    var value: Int
    var freq: Int
    var timestamp: Int

    init(_ value: Int, _ freq: Int, _ timestamp: Int) {
        self.value = value
        self.freq = freq
        self.timestamp = timestamp
    }
}

class LFUCache {
    private var capacity: Int
    private var timestamp: Int
    private var cache: [Int: Node]

    init(_ capacity: Int) {
        self.capacity = capacity
        self.timestamp = 0
        self.cache = [:]
    }

    func get(_ key: Int) -> Int {
        guard let node = cache[key] else { return -1 }

        node.freq += 1
        timestamp += 1
        node.timestamp = timestamp
        return node.value
    }

    func put(_ key: Int, _ value: Int) {
        if capacity <= 0 { return }

        timestamp += 1
        if let node = cache[key] {
            node.value = value
            node.freq += 1
            node.timestamp = timestamp
            return
        }

        if cache.count >= capacity {
            var minFreq = Int.max
            var minTimestamp = Int.max
            var lfuKey: Int? = nil

            for (k, node) in cache {
                if node.freq < minFreq || (node.freq == minFreq && node.timestamp < minTimestamp) {
                    minFreq = node.freq
                    minTimestamp = node.timestamp
                    lfuKey = k
                }
            }

            if let key = lfuKey {
                cache.removeValue(forKey: key)
            }
        }

        cache[key] = Node(value, 1, timestamp)
    }
}
```

```rust
struct LFUCache {
    capacity: usize,
    timestamp: i32,
    cache: HashMap<i32, (i32, i32, i32)>, // key -> (value, freq, timestamp)
}

impl LFUCache {
    fn new(capacity: i32) -> Self {
        LFUCache {
            capacity: capacity as usize,
            timestamp: 0,
            cache: HashMap::new(),
        }
    }

    fn get(&mut self, key: i32) -> i32 {
        if let Some(entry) = self.cache.get_mut(&key) {
            entry.1 += 1;
            self.timestamp += 1;
            entry.2 = self.timestamp;
            entry.0
        } else {
            -1
        }
    }

    fn put(&mut self, key: i32, value: i32) {
        if self.capacity == 0 {
            return;
        }

        self.timestamp += 1;
        if let Some(entry) = self.cache.get_mut(&key) {
            entry.0 = value;
            entry.1 += 1;
            entry.2 = self.timestamp;
            return;
        }

        if self.cache.len() >= self.capacity {
            let mut min_freq = i32::MAX;
            let mut min_ts = i32::MAX;
            let mut lfu_key = -1;

            for (&k, &(_, freq, ts)) in &self.cache {
                if freq < min_freq || (freq == min_freq && ts < min_ts) {
                    min_freq = freq;
                    min_ts = ts;
                    lfu_key = k;
                }
            }

            self.cache.remove(&lfu_key);
        }

        self.cache.insert(key, (value, 1, self.timestamp));
    }
}
```

```typescript
interface CacheNode {
    value: number;
    freq: number;
    timestamp: number;
}

class LFUCache {
    private capacity: number;
    private timestamp: number;
    private cache: Map<number, CacheNode>;

    /**
     * @param {number} capacity
     */
    constructor(capacity: number) {
        this.capacity = capacity;
        this.timestamp = 0;
        this.cache = new Map();
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key: number): number {
        if (!this.cache.has(key)) return -1;

        const node = this.cache.get(key)!;
        node.freq++;
        node.timestamp = ++this.timestamp;
        return node.value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key: number, value: number): void {
        if (this.capacity <= 0) return;

        this.timestamp++;
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            node.value = value;
            node.freq++;
            node.timestamp = this.timestamp;
            return;
        }

        if (this.cache.size >= this.capacity) {
            let minFreq = Infinity,
                minTimestamp = Infinity,
                lfuKey: number | null = null;

            for (const [k, node] of this.cache.entries()) {
                if (
                    node.freq < minFreq ||
                    (node.freq === minFreq && node.timestamp < minTimestamp)
                ) {
                    minFreq = node.freq;
                    minTimestamp = node.timestamp;
                    lfuKey = k;
                }
            }

            if (lfuKey !== null) this.cache.delete(lfuKey);
        }

        this.cache.set(key, { value, freq: 1, timestamp: this.timestamp });
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $get()$ function call.
    - $O(n)$ time for each $put()$ function call.
- Space complexity: $O(n)$

---

## 2. Doubly Linked List

### Intuition

To achieve O(1) operations, we need fast access to a key's current node and to the least recently used node inside each frequency group. We use a hash map from frequency to a doubly linked list of cache nodes, and a separate key-to-node map for direct access. Each linked list maintains recency order within one frequency bucket, so the head is the eviction candidate for ties. We also track the current minimum frequency to quickly find which list to evict from.

### Algorithm

1. Maintain a `nodeMap` (or equivalent key-to-node lookup) and a `listMap` (frequency to doubly linked list of nodes).
2. Track `lfuCount`, the current minimum frequency in the cache.
3. For `get(key)`: if the key exists, move it from its current frequency list to the next frequency list, update the frequency, and adjust `lfuCount` if needed.
4. For `put(key, value)`: if the key exists, update its value and treat it like a `get` operation. If inserting a new key and at capacity, pop the leftmost (oldest) element from the `lfuCount` list.
5. Insert the new key into frequency-1 list and set `lfuCount` to `1`.

::tabs-start

```python
class ListNode:

    def __init__(self, key, val):
        self.key = key
        self.val = val
        self.freq = 1
        self.prev = None
        self.next = None

class LinkedList:

    def __init__(self):
        self.left = ListNode(0, 0)
        self.right = ListNode(0, 0)
        self.left.next = self.right
        self.right.prev = self.left
        self.size = 0

    def length(self):
        return self.size

    def pushRight(self, node):
        prev = self.right.prev
        prev.next = node
        node.prev = prev
        node.next = self.right
        self.right.prev = node
        self.size += 1

    def pop(self, node):
        prev, next = node.prev, node.next
        prev.next = next
        next.prev = prev
        node.prev = None
        node.next = None
        self.size -= 1

    def popLeft(self):
        if self.length() == 0:
            return None
        node = self.left.next
        self.pop(node)
        return node

class LFUCache:

    def __init__(self, capacity: int):
        self.cap = capacity
        self.lfuCnt = 0
        self.nodeMap = {} # Map key -> node
        # Map frequency -> linkedlist of nodes
        self.listMap = defaultdict(LinkedList)

    def counter(self, node):
        cnt = node.freq
        self.listMap[cnt].pop(node)

        if cnt == self.lfuCnt and self.listMap[cnt].length() == 0:
            self.lfuCnt += 1

        node.freq += 1
        self.listMap[node.freq].pushRight(node)


    def get(self, key: int) -> int:
        if key not in self.nodeMap:
            return -1
        node = self.nodeMap[key]
        self.counter(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if self.cap == 0:
            return

        if key in self.nodeMap:
            node = self.nodeMap[key]
            node.val = value
            self.counter(node)
            return

        if len(self.nodeMap) == self.cap:
            node = self.listMap[self.lfuCnt].popLeft()
            self.nodeMap.pop(node.key)

        node = ListNode(key, value)
        self.nodeMap[key] = node
        self.listMap[1].pushRight(node)
        self.lfuCnt = 1
```

```java
class ListNode {
    int key, val, freq;
    ListNode prev, next;

    ListNode(int key, int val) {
        this.key = key;
        this.val = val;
        this.freq = 1;
    }
}

class DoublyLinkedList {
    private ListNode left, right;
    private int size;

    DoublyLinkedList() {
        this.left = new ListNode(0, 0);
        this.right = new ListNode(0, 0);
        this.left.next = this.right;
        this.right.prev = this.left;
        this.size = 0;
    }

    public int length() {
        return size;
    }

    public void pushRight(ListNode node) {
        ListNode prev = this.right.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.right;
        this.right.prev = node;
        size++;
    }

    public void pop(ListNode node) {
        ListNode prev = node.prev, next = node.next;
        prev.next = next;
        next.prev = prev;
        node.prev = null;
        node.next = null;
        size--;
    }

    public ListNode popLeft() {
        ListNode node = this.left.next;
        pop(node);
        return node;
    }
}

public class LFUCache {
    private int capacity;
    private int lfuCount;
    private Map<Integer, ListNode> nodeMap;
    private Map<Integer, DoublyLinkedList> listMap;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.lfuCount = 0;
        this.nodeMap = new HashMap<>();
        this.listMap = new HashMap<>();
    }

    private void counter(ListNode node) {
        int count = node.freq;
        listMap.get(count).pop(node);

        if (count == lfuCount && listMap.get(count).length() == 0) {
            lfuCount++;
        }

        node.freq++;
        listMap.putIfAbsent(node.freq, new DoublyLinkedList());
        listMap.get(node.freq).pushRight(node);
    }

    public int get(int key) {
        if (!nodeMap.containsKey(key)) {
            return -1;
        }
        ListNode node = nodeMap.get(key);
        counter(node);
        return node.val;
    }

    public void put(int key, int value) {
        if (capacity == 0) {
            return;
        }

        if (nodeMap.containsKey(key)) {
            ListNode node = nodeMap.get(key);
            node.val = value;
            counter(node);
            return;
        }

        if (nodeMap.size() == capacity) {
            ListNode toRemove = listMap.get(lfuCount).popLeft();
            nodeMap.remove(toRemove.key);
        }

        ListNode node = new ListNode(key, value);
        nodeMap.put(key, node);
        listMap.putIfAbsent(1, new DoublyLinkedList());
        listMap.get(1).pushRight(node);
        lfuCount = 1;
    }
}
```

```cpp
class LFUCache {
    struct ListNode {
        int key;
        int val;
        int freq;
        ListNode* prev;
        ListNode* next;

        ListNode(int key, int val) : key(key), val(val), freq(1), prev(nullptr), next(nullptr) {}
    };

    struct LinkedList {
        ListNode* left;
        ListNode* right;
        int size;

        LinkedList() {
            left = new ListNode(0, 0);
            right = new ListNode(0, 0);
            left->next = right;
            right->prev = left;
            size = 0;
        }

        ~LinkedList() {
            delete left;
            delete right;
        }

        int length() {
            return size;
        }

        void pushRight(ListNode* node) {
            ListNode* prev = right->prev;
            prev->next = node;
            node->prev = prev;
            node->next = right;
            right->prev = node;
            size++;
        }

        void pop(ListNode* node) {
            ListNode* prev = node->prev;
            ListNode* next = node->next;
            prev->next = next;
            next->prev = prev;
            node->prev = nullptr;
            node->next = nullptr;
            size--;
        }

        ListNode* popLeft() {
            ListNode* node = left->next;
            pop(node);
            return node;
        }
    };

    int capacity;
    int lfuCount;
    unordered_map<int, ListNode*> nodeMap; // Map key -> node
    unordered_map<int, LinkedList*> listMap; // Map frequency -> linked list

    void counter(ListNode* node) {
        int count = node->freq;
        listMap[count]->pop(node);

        if (count == lfuCount && listMap[count]->length() == 0) {
            lfuCount++;
        }

        node->freq++;
        if (!listMap.count(node->freq)) {
            listMap[node->freq] = new LinkedList();
        }
        listMap[node->freq]->pushRight(node);
    }

public:
    LFUCache(int capacity) : capacity(capacity), lfuCount(0) {}

    ~LFUCache() {
        for (auto& pair : nodeMap) {
            delete pair.second;
        }
        for (auto& pair : listMap) {
            delete pair.second;
        }
    }

    int get(int key) {
        if (nodeMap.find(key) == nodeMap.end()) {
            return -1;
        }
        ListNode* node = nodeMap[key];
        counter(node);
        return node->val;
    }

    void put(int key, int value) {
        if (capacity == 0) {
            return;
        }

        if (nodeMap.find(key) != nodeMap.end()) {
            ListNode* node = nodeMap[key];
            node->val = value;
            counter(node);
            return;
        }

        if (nodeMap.size() == capacity) {
            ListNode* toRemove = listMap[lfuCount]->popLeft();
            nodeMap.erase(toRemove->key);
            delete toRemove;
        }

        ListNode* node = new ListNode(key, value);
        nodeMap[key] = node;
        if (!listMap.count(1)) {
            listMap[1] = new LinkedList();
        }
        listMap[1]->pushRight(node);
        lfuCount = 1;
    }
};
```

```javascript
class ListNode {
    /**
     * @param {number} key
     * @param {number} val
     */
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.freq = 1;
        this.prev = null;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.left = new ListNode(0, 0);
        this.right = new ListNode(0, 0);
        this.left.next = this.right;
        this.right.prev = this.left;
        this.size = 0;
    }

    /**
     * @return {number}
     */
    length() {
        return this.size;
    }

    /**
     * @param {ListNode} node
     */
    pushRight(node) {
        const prev = this.right.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.right;
        this.right.prev = node;
        this.size++;
    }

    /**
     * @param {ListNode} node
     */
    pop(node) {
        const prev = node.prev;
        const next = node.next;
        prev.next = next;
        next.prev = prev;
        node.prev = null;
        node.next = null;
        this.size--;
    }

    /**
     * @return {ListNode}
     */
    popLeft() {
        const node = this.left.next;
        this.pop(node);
        return node;
    }
}

class LFUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.lfuCount = 0;
        this.nodeMap = new Map();
        this.listMap = new Map();
    }

    /**
     * @param {ListNode} node
     */
    counter(node) {
        const count = node.freq;
        this.listMap.get(count).pop(node);

        if (count === this.lfuCount && this.listMap.get(count).length() === 0) {
            this.lfuCount++;
        }

        node.freq++;
        if (!this.listMap.has(node.freq)) {
            this.listMap.set(node.freq, new LinkedList());
        }
        this.listMap.get(node.freq).pushRight(node);
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.nodeMap.has(key)) {
            return -1;
        }
        const node = this.nodeMap.get(key);
        this.counter(node);
        return node.val;
    }

    /**
     * @param {number} key
     * @param {number} value
     */
    put(key, value) {
        if (this.capacity === 0) return;

        if (this.nodeMap.has(key)) {
            const node = this.nodeMap.get(key);
            node.val = value;
            this.counter(node);
            return;
        }

        if (this.nodeMap.size === this.capacity) {
            const toRemove = this.listMap.get(this.lfuCount).popLeft();
            this.nodeMap.delete(toRemove.key);
        }

        const node = new ListNode(key, value);
        this.nodeMap.set(key, node);
        if (!this.listMap.has(1)) {
            this.listMap.set(1, new LinkedList());
        }
        this.listMap.get(1).pushRight(node);
        this.lfuCount = 1;
    }
}
```

```csharp
public class ListNode {
    public int Key;
    public int Val;
    public int Freq;
    public ListNode Prev, Next;

    public ListNode(int key, int val) {
        Key = key;
        Val = val;
        Freq = 1;
    }
}

public class DoublyLinkedList {
    private ListNode left, right;
    private int size;

    public DoublyLinkedList() {
        left = new ListNode(0, 0);
        right = new ListNode(0, 0);
        left.Next = right;
        right.Prev = left;
        size = 0;
    }

    public int Length() {
        return size;
    }

    public void PushRight(ListNode node) {
        var prev = right.Prev;
        prev.Next = node;
        node.Prev = prev;
        node.Next = right;
        right.Prev = node;
        size++;
    }

    public void Pop(ListNode node) {
        var prev = node.Prev;
        var next = node.Next;
        prev.Next = next;
        next.Prev = prev;
        node.Prev = null;
        node.Next = null;
        size--;
    }

    public ListNode PopLeft() {
        var node = left.Next;
        Pop(node);
        return node;
    }
}

public class LFUCache {
    private int capacity;
    private int lfuCount;
    private Dictionary<int, ListNode> nodeMap;
    private Dictionary<int, DoublyLinkedList> listMap;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        lfuCount = 0;
        nodeMap = new Dictionary<int, ListNode>();
        listMap = new Dictionary<int, DoublyLinkedList>();
    }

    private void Counter(ListNode node) {
        int count = node.Freq;
        listMap[count].Pop(node);

        if (count == lfuCount && listMap[count].Length() == 0) {
            lfuCount++;
        }

        node.Freq++;
        if (!listMap.ContainsKey(node.Freq)) {
            listMap[node.Freq] = new DoublyLinkedList();
        }
        listMap[node.Freq].PushRight(node);
    }

    public int Get(int key) {
        if (!nodeMap.ContainsKey(key)) {
            return -1;
        }
        var node = nodeMap[key];
        Counter(node);
        return node.Val;
    }

    public void Put(int key, int value) {
        if (capacity == 0) return;

        if (nodeMap.ContainsKey(key)) {
            var node = nodeMap[key];
            node.Val = value;
            Counter(node);
            return;
        }

        if (nodeMap.Count == capacity) {
            var toRemove = listMap[lfuCount].PopLeft();
            nodeMap.Remove(toRemove.Key);
        }

        var newNode = new ListNode(key, value);
        nodeMap[key] = newNode;
        if (!listMap.ContainsKey(1)) {
            listMap[1] = new DoublyLinkedList();
        }
        listMap[1].PushRight(newNode);
        lfuCount = 1;
    }
}
```

```go
type ListNode struct {
    key  int
    val  int
    freq int
    prev *ListNode
    next *ListNode
}

type LinkedList struct {
    left  *ListNode
    right *ListNode
    size  int
}

func NewLinkedList() *LinkedList {
    left := &ListNode{}
    right := &ListNode{}
    left.next = right
    right.prev = left
    return &LinkedList{
        left:  left,
        right: right,
    }
}

func (ll *LinkedList) length() int {
    return ll.size
}

func (ll *LinkedList) pushRight(node *ListNode) {
    prev := ll.right.prev
    prev.next = node
    node.prev = prev
    node.next = ll.right
    ll.right.prev = node
    ll.size++
}

func (ll *LinkedList) pop(node *ListNode) {
    prev, next := node.prev, node.next
    prev.next = next
    next.prev = prev
    node.prev = nil
    node.next = nil
    ll.size--
}

func (ll *LinkedList) popLeft() *ListNode {
    node := ll.left.next
    ll.pop(node)
    return node
}

type LFUCache struct {
    capacity int
    lfuCount int
    nodeMap  map[int]*ListNode
    listMap  map[int]*LinkedList
}

func Constructor(capacity int) LFUCache {
    return LFUCache{
        capacity: capacity,
        lfuCount: 0,
        nodeMap:  make(map[int]*ListNode),
        listMap:  make(map[int]*LinkedList),
    }
}

func (this *LFUCache) counter(node *ListNode) {
    count := node.freq
    this.listMap[count].pop(node)

    if count == this.lfuCount && this.listMap[count].length() == 0 {
        this.lfuCount++
    }

    node.freq++
    if _, exists := this.listMap[node.freq]; !exists {
        this.listMap[node.freq] = NewLinkedList()
    }
    this.listMap[node.freq].pushRight(node)
}

func (this *LFUCache) Get(key int) int {
    node, exists := this.nodeMap[key]
    if !exists {
        return -1
    }
    this.counter(node)
    return node.val
}

func (this *LFUCache) Put(key int, value int) {
    if this.capacity == 0 {
        return
    }

    if node, exists := this.nodeMap[key]; exists {
        node.val = value
        this.counter(node)
        return
    }

    if len(this.nodeMap) == this.capacity {
        toRemove := this.listMap[this.lfuCount].popLeft()
        delete(this.nodeMap, toRemove.key)
    }

    node := &ListNode{key: key, val: value, freq: 1}
    this.nodeMap[key] = node
    if _, exists := this.listMap[1]; !exists {
        this.listMap[1] = NewLinkedList()
    }
    this.listMap[1].pushRight(node)
    this.lfuCount = 1
}
```

```kotlin
class ListNode(val key: Int, var value: Int) {
    var freq = 1
    var prev: ListNode? = null
    var next: ListNode? = null
}

class DoublyLinkedList {
    private val left = ListNode(0, 0)
    private val right = ListNode(0, 0)
    private var size = 0

    init {
        left.next = right
        right.prev = left
    }

    fun length(): Int = size

    fun pushRight(node: ListNode) {
        val prev = right.prev
        prev?.next = node
        node.prev = prev
        node.next = right
        right.prev = node
        size++
    }

    fun pop(node: ListNode) {
        val prev = node.prev
        val next = node.next
        prev?.next = next
        next?.prev = prev
        node.prev = null
        node.next = null
        size--
    }

    fun popLeft(): ListNode {
        val node = left.next!!
        pop(node)
        return node
    }
}

class LFUCache(private val capacity: Int) {
    private var lfuCount = 0
    private val nodeMap = HashMap<Int, ListNode>()
    private val listMap = HashMap<Int, DoublyLinkedList>()

    private fun counter(node: ListNode) {
        val count = node.freq
        listMap[count]!!.pop(node)

        if (count == lfuCount && listMap[count]!!.length() == 0) {
            lfuCount++
        }

        node.freq++
        listMap.getOrPut(node.freq) { DoublyLinkedList() }.pushRight(node)
    }

    fun get(key: Int): Int {
        val node = nodeMap[key] ?: return -1
        counter(node)
        return node.value
    }

    fun put(key: Int, value: Int) {
        if (capacity == 0) return

        if (nodeMap.containsKey(key)) {
            val node = nodeMap[key]!!
            node.value = value
            counter(node)
            return
        }

        if (nodeMap.size == capacity) {
            val toRemove = listMap[lfuCount]!!.popLeft()
            nodeMap.remove(toRemove.key)
        }

        val node = ListNode(key, value)
        nodeMap[key] = node
        listMap.getOrPut(1) { DoublyLinkedList() }.pushRight(node)
        lfuCount = 1
    }
}
```

```swift
class ListNode {
    var key: Int
    var val: Int
    var freq: Int
    var prev: ListNode?
    var next: ListNode?

    init(_ key: Int, _ val: Int) {
        self.key = key
        self.val = val
        self.freq = 1
    }
}

class LinkedList {
    private var left: ListNode
    private var right: ListNode
    private var size: Int

    init() {
        left = ListNode(0, 0)
        right = ListNode(0, 0)
        left.next = right
        right.prev = left
        size = 0
    }

    func length() -> Int {
        return size
    }

    func pushRight(_ node: ListNode) {
        let prev = right.prev
        prev?.next = node
        node.prev = prev
        node.next = right
        right.prev = node
        size += 1
    }

    func pop(_ node: ListNode) {
        let prev = node.prev
        let next = node.next
        prev?.next = next
        next?.prev = prev
        node.prev = nil
        node.next = nil
        size -= 1
    }

    func popLeft() -> ListNode {
        let node = left.next!
        pop(node)
        return node
    }
}

class LFUCache {
    private var capacity: Int
    private var lfuCount: Int
    private var nodeMap: [Int: ListNode]
    private var listMap: [Int: LinkedList]

    init(_ capacity: Int) {
        self.capacity = capacity
        self.lfuCount = 0
        self.nodeMap = [:]
        self.listMap = [:]
    }

    private func counter(_ node: ListNode) {
        let count = node.freq
        listMap[count]!.pop(node)

        if count == lfuCount && listMap[count]!.length() == 0 {
            lfuCount += 1
        }

        node.freq += 1
        if listMap[node.freq] == nil {
            listMap[node.freq] = LinkedList()
        }
        listMap[node.freq]!.pushRight(node)
    }

    func get(_ key: Int) -> Int {
        guard let node = nodeMap[key] else {
            return -1
        }
        counter(node)
        return node.val
    }

    func put(_ key: Int, _ value: Int) {
        if capacity == 0 { return }

        if let node = nodeMap[key] {
            node.val = value
            counter(node)
            return
        }

        if nodeMap.count == capacity {
            let toRemove = listMap[lfuCount]!.popLeft()
            nodeMap.removeValue(forKey: toRemove.key)
        }

        let node = ListNode(key, value)
        nodeMap[key] = node
        if listMap[1] == nil {
            listMap[1] = LinkedList()
        }
        listMap[1]!.pushRight(node)
        lfuCount = 1
    }
}
```

```rust
struct DLNode {
    key: i32,
    val: i32,
    freq: i32,
    prev: usize,
    next: usize,
}

struct DoublyLinkedList {
    left: usize,
    right: usize,
    size: usize,
}

struct LFUCache {
    capacity: usize,
    lfu_count: i32,
    next_id: usize,
    nodes: HashMap<usize, DLNode>,
    node_map: HashMap<i32, usize>,
    list_map: HashMap<i32, DoublyLinkedList>,
}

impl LFUCache {
    fn new(capacity: i32) -> Self {
        LFUCache {
            capacity: capacity as usize,
            lfu_count: 0,
            next_id: 0,
            nodes: HashMap::new(),
            node_map: HashMap::new(),
            list_map: HashMap::new(),
        }
    }

    fn make_list(&mut self) -> DoublyLinkedList {
        let left = self.next_id;
        self.next_id += 1;
        let right = self.next_id;
        self.next_id += 1;

        self.nodes.insert(left, DLNode { key: 0, val: 0, freq: 0, prev: left, next: right });
        self.nodes.insert(right, DLNode { key: 0, val: 0, freq: 0, prev: left, next: right });

        DoublyLinkedList { left, right, size: 0 }
    }

    fn ensure_list(&mut self, freq: i32) {
        if !self.list_map.contains_key(&freq) {
            let list = self.make_list();
            self.list_map.insert(freq, list);
        }
    }

    fn push_right(&mut self, freq: i32, idx: usize) {
        self.ensure_list(freq);
        let right = self.list_map.get(&freq).unwrap().right;
        let prev = self.nodes.get(&right).unwrap().prev;

        self.nodes.get_mut(&prev).unwrap().next = idx;
        {
            let node = self.nodes.get_mut(&idx).unwrap();
            node.prev = prev;
            node.next = right;
        }
        self.nodes.get_mut(&right).unwrap().prev = idx;
        self.list_map.get_mut(&freq).unwrap().size += 1;
    }

    fn pop(&mut self, freq: i32, idx: usize) {
        let (prev, next) = {
            let node = self.nodes.get(&idx).unwrap();
            (node.prev, node.next)
        };

        self.nodes.get_mut(&prev).unwrap().next = next;
        self.nodes.get_mut(&next).unwrap().prev = prev;
        {
            let node = self.nodes.get_mut(&idx).unwrap();
            node.prev = idx;
            node.next = idx;
        }
        self.list_map.get_mut(&freq).unwrap().size -= 1;
    }

    fn pop_left(&mut self, freq: i32) -> usize {
        let left = self.list_map.get(&freq).unwrap().left;
        let idx = self.nodes.get(&left).unwrap().next;
        self.pop(freq, idx);
        idx
    }

    fn counter(&mut self, key: i32) {
        let idx = *self.node_map.get(&key).unwrap();
        let count = self.nodes.get(&idx).unwrap().freq;
        self.pop(count, idx);

        if count == self.lfu_count && self.list_map.get(&count).unwrap().size == 0 {
            self.lfu_count += 1;
        }

        self.nodes.get_mut(&idx).unwrap().freq += 1;
        let next_freq = self.nodes.get(&idx).unwrap().freq;
        self.push_right(next_freq, idx);
    }

    fn get(&mut self, key: i32) -> i32 {
        if !self.node_map.contains_key(&key) {
            return -1;
        }
        self.counter(key);
        let idx = *self.node_map.get(&key).unwrap();
        self.nodes.get(&idx).unwrap().val
    }

    fn put(&mut self, key: i32, value: i32) {
        if self.capacity == 0 {
            return;
        }

        if let Some(&idx) = self.node_map.get(&key) {
            self.nodes.get_mut(&idx).unwrap().val = value;
            self.counter(key);
            return;
        }

        if self.node_map.len() == self.capacity {
            let idx = self.pop_left(self.lfu_count);
            let old_key = self.nodes.get(&idx).unwrap().key;
            self.node_map.remove(&old_key);
            self.nodes.remove(&idx);
        }

        let idx = self.next_id;
        self.next_id += 1;
        self.nodes.insert(idx, DLNode { key, val: value, freq: 1, prev: idx, next: idx });
        self.node_map.insert(key, idx);
        self.push_right(1, idx);
        self.lfu_count = 1;
    }
}
```

```typescript
class ListNode {
    key: number;
    val: number;
    freq: number;
    prev: ListNode | null;
    next: ListNode | null;

    /**
     * @param {number} key
     * @param {number} val
     */
    constructor(key: number, val: number) {
        this.key = key;
        this.val = val;
        this.freq = 1;
        this.prev = null;
        this.next = null;
    }
}

class LinkedList {
    left: ListNode;
    right: ListNode;
    size: number;

    constructor() {
        this.left = new ListNode(0, 0);
        this.right = new ListNode(0, 0);
        this.left.next = this.right;
        this.right.prev = this.left;
        this.size = 0;
    }

    /**
     * @return {number}
     */
    length(): number {
        return this.size;
    }

    /**
     * @param {ListNode} node
     */
    pushRight(node: ListNode): void {
        const prev = this.right.prev!;
        prev.next = node;
        node.prev = prev;
        node.next = this.right;
        this.right.prev = node;
        this.size++;
    }

    /**
     * @param {ListNode} node
     */
    pop(node: ListNode): void {
        const prev = node.prev!;
        const next = node.next!;
        prev.next = next;
        next.prev = prev;
        node.prev = null;
        node.next = null;
        this.size--;
    }

    /**
     * @return {ListNode}
     */
    popLeft(): ListNode {
        const node = this.left.next!;
        this.pop(node);
        return node;
    }
}

class LFUCache {
    private capacity: number;
    private lfuCount: number;
    private nodeMap: Map<number, ListNode>;
    private listMap: Map<number, LinkedList>;

    /**
     * @param {number} capacity
     */
    constructor(capacity: number) {
        this.capacity = capacity;
        this.lfuCount = 0;
        this.nodeMap = new Map();
        this.listMap = new Map();
    }

    /**
     * @param {ListNode} node
     */
    counter(node: ListNode): void {
        const count = node.freq;
        this.listMap.get(count)!.pop(node);

        if (count === this.lfuCount && this.listMap.get(count)!.length() === 0) {
            this.lfuCount++;
        }

        node.freq++;
        if (!this.listMap.has(node.freq)) {
            this.listMap.set(node.freq, new LinkedList());
        }
        this.listMap.get(node.freq)!.pushRight(node);
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key: number): number {
        if (!this.nodeMap.has(key)) {
            return -1;
        }
        const node = this.nodeMap.get(key)!;
        this.counter(node);
        return node.val;
    }

    /**
     * @param {number} key
     * @param {number} value
     */
    put(key: number, value: number): void {
        if (this.capacity === 0) return;

        if (this.nodeMap.has(key)) {
            const node = this.nodeMap.get(key)!;
            node.val = value;
            this.counter(node);
            return;
        }

        if (this.nodeMap.size === this.capacity) {
            const toRemove = this.listMap.get(this.lfuCount)!.popLeft();
            this.nodeMap.delete(toRemove.key);
        }

        const node = new ListNode(key, value);
        this.nodeMap.set(key, node);
        if (!this.listMap.has(1)) {
            this.listMap.set(1, new LinkedList());
        }
        this.listMap.get(1)!.pushRight(node);
        this.lfuCount = 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $get()$ and $put()$ function calls.
- Space complexity: $O(n)$

---

## Common Pitfalls

### Not Resetting Minimum Frequency on New Insertions

When inserting a new key, the minimum frequency tracker must reflect that the new key starts at frequency 1. Failing to update `lfuCount` causes subsequent evictions to look in the wrong frequency bucket, potentially evicting the wrong item or causing errors.

### Not Incrementing Frequency on Both Get and Put

Both `get()` and `put()` (when updating an existing key) should increment the frequency. A common mistake is only incrementing on `get()`, which causes keys that are repeatedly updated but never retrieved to have artificially low frequencies and get evicted prematurely.

### Incorrect LRU Tie-Breaking Within Same Frequency

When multiple keys share the same minimum frequency, the least recently used among them should be evicted. This requires maintaining insertion order within each frequency bucket. Using a regular set or unordered structure loses this ordering and leads to incorrect evictions.

### Not Handling Zero Capacity Edge Case

When the cache capacity is 0, all `put()` operations should be no-ops since nothing can be stored. Forgetting this check causes attempts to evict from an empty cache, leading to errors or incorrect behavior.

### Failing to Move Nodes Between Frequency Lists

When a key's frequency increases, its node must be removed from the current frequency list and added to the next one. Forgetting to remove it from the old list causes the same entry to appear in multiple frequency buckets, corrupting the data structure and causing incorrect evictions.
