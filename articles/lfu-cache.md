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

To achieve O(1) operations, we need fast access to both the least frequent element and the least recently used element within each frequency group. We use a hash map from frequency to a doubly linked list. Each linked list maintains insertion order, so the head is the least recently used. We also track the current minimum frequency to quickly find which list to evict from.

### Algorithm

1. Maintain three maps: `valMap` (key to value), `countMap` (key to frequency), and `listMap` (frequency to doubly linked list of keys).
2. Track `lfuCount`, the current minimum frequency in the cache.
3. For `get(key)`: if the key exists, move it from its current frequency list to the next frequency list, update the frequency, and adjust `lfuCount` if needed.
4. For `put(key, value)`: if the key exists, update its value and treat it like a `get` operation. If inserting a new key and at capacity, pop the leftmost (oldest) element from the `lfuCount` list.
5. Insert the new key into frequency-1 list and set `lfuCount` to `1`.

::tabs-start

```python
class ListNode:

    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class LinkedList:

    def __init__(self):
        self.left = ListNode(0)
        self.right = ListNode(0, self.left)
        self.left.next = self.right
        self.map = {}

    def length(self):
        return len(self.map)

    def pushRight(self, val):
        node = ListNode(val, self.right.prev, self.right)
        self.map[val] = node
        self.right.prev = node
        node.prev.next = node

    def pop(self, val):
        if val in self.map:
            node = self.map[val]
            next, prev = node.next, node.prev
            next.prev = prev
            prev.next = next
            self.map.pop(val, None)

    def popLeft(self):
        res = self.left.next.val
        self.pop(self.left.next.val)
        return res

    def update(self, val):
        self.pop(val)
        self.pushRight(val)

class LFUCache:

    def __init__(self, capacity: int):
        self.cap = capacity
        self.lfuCnt = 0
        self.valMap = {} # Map key -> val
        self.countMap = defaultdict(int) # Map key -> count
        # Map count of key -> linkedlist
        self.listMap = defaultdict(LinkedList)

    def counter(self, key):
        cnt = self.countMap[key]
        self.countMap[key] += 1
        self.listMap[cnt].pop(key)
        self.listMap[cnt + 1].pushRight(key)

        if cnt == self.lfuCnt and self.listMap[cnt].length() == 0:
            self.lfuCnt += 1


    def get(self, key: int) -> int:
        if key not in self.valMap:
            return -1
        self.counter(key)
        return self.valMap[key]

    def put(self, key: int, value: int) -> None:
        if self.cap == 0:
            return

        if key not in self.valMap and len(self.valMap) == self.cap:
            res = self.listMap[self.lfuCnt].popLeft()
            self.valMap.pop(res)
            self.countMap.pop(res)

        self.valMap[key] = value
        self.counter(key)
        self.lfuCnt = min(self.lfuCnt, self.countMap[key])
```

```java
class ListNode {
    int val;
    ListNode prev, next;

    ListNode(int val) {
        this.val = val;
    }

    ListNode(int val, ListNode prev, ListNode next) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    private ListNode left, right;
    private Map<Integer, ListNode> map;

    DoublyLinkedList() {
        this.left = new ListNode(0);
        this.right = new ListNode(0, this.left, null);
        this.left.next = this.right;
        this.map = new HashMap<>();
    }

    public int length() {
        return map.size();
    }

    public void pushRight(int val) {
        ListNode node = new ListNode(val, this.right.prev, this.right);
        this.map.put(val, node);
        this.right.prev.next = node;
        this.right.prev = node;
    }

    public void pop(int val) {
        if (this.map.containsKey(val)) {
            ListNode node = this.map.get(val);
            ListNode prev = node.prev, next = node.next;
            prev.next = next;
            next.prev = prev;
            this.map.remove(val);
        }
    }

    public int popLeft() {
        int res = this.left.next.val;
        pop(res);
        return res;
    }

    public void update(int val) {
        pop(val);
        pushRight(val);
    }
}

public class LFUCache {
    private int capacity;
    private int lfuCount;
    private Map<Integer, Integer> valMap;
    private Map<Integer, Integer> countMap;
    private Map<Integer, DoublyLinkedList> listMap;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        this.lfuCount = 0;
        this.valMap = new HashMap<>();
        this.countMap = new HashMap<>();
        this.listMap = new HashMap<>();
    }

    private void counter(int key) {
        int count = countMap.get(key);
        countMap.put(key, count + 1);
        listMap.putIfAbsent(count, new DoublyLinkedList());
        listMap.get(count).pop(key);

        listMap.putIfAbsent(count + 1, new DoublyLinkedList());
        listMap.get(count + 1).pushRight(key);

        if (count == lfuCount && listMap.get(count).length() == 0) {
            lfuCount++;
        }
    }

    public int get(int key) {
        if (!valMap.containsKey(key)) {
            return -1;
        }
        counter(key);
        return valMap.get(key);
    }

    public void put(int key, int value) {
        if (capacity == 0) {
            return;
        }

        if (!valMap.containsKey(key) && valMap.size() == capacity) {
            int toRemove = listMap.get(lfuCount).popLeft();
            valMap.remove(toRemove);
            countMap.remove(toRemove);
        }

        valMap.put(key, value);
        countMap.putIfAbsent(key, 0);
        counter(key);
        lfuCount = Math.min(lfuCount, countMap.get(key));
    }
}
```

```cpp
class LFUCache {
    struct ListNode {
        int val;
        ListNode* prev;
        ListNode* next;

        ListNode(int val) : val(val), prev(nullptr), next(nullptr) {}
        ListNode(int val, ListNode* prev, ListNode* next) : val(val), prev(prev), next(next) {}
    };

    struct LinkedList {
        ListNode* left;
        ListNode* right;
        unordered_map<int, ListNode*> map;

        LinkedList() {
            left = new ListNode(0);
            right = new ListNode(0);
            left->next = right;
            right->prev = left;
        }

        ~LinkedList() {
            while (left->next != right) {
                ListNode* temp = left->next;
                left->next = temp->next;
                delete temp;
            }
            delete left;
            delete right;
        }

        int length() {
            return map.size();
        }

        void pushRight(int val) {
            ListNode* node = new ListNode(val, right->prev, right);
            map[val] = node;
            right->prev->next = node;
            right->prev = node;
        }

        void pop(int val) {
            if (map.find(val) != map.end()) {
                ListNode* node = map[val];
                ListNode* prev = node->prev;
                ListNode* next = node->next;
                prev->next = next;
                next->prev = prev;
                map.erase(val);
                delete node;
            }
        }

        int popLeft() {
            int res = left->next->val;
            pop(res);
            return res;
        }

        void update(int val) {
            pop(val);
            pushRight(val);
        }
    };

    int capacity;
    int lfuCount;
    unordered_map<int, int> valMap; // Map key -> value
    unordered_map<int, int> countMap; // Map key -> count
    unordered_map<int, LinkedList*> listMap; // Map count -> linked list

    void counter(int key) {
        int count = countMap[key];
        countMap[key] = count + 1;

        listMap[count]->pop(key);

        if (!listMap.count(count + 1)) {
            listMap[count + 1] = new LinkedList();
        }
        listMap[count + 1]->pushRight(key);

        if (count == lfuCount && listMap[count]->length() == 0) {
            lfuCount++;
        }
    }

public:
    LFUCache(int capacity) : capacity(capacity), lfuCount(0) {
        listMap[0] = new LinkedList();
    }

    ~LFUCache() {
        for (auto& pair : listMap) {
            delete pair.second;
        }
    }

    int get(int key) {
        if (valMap.find(key) == valMap.end()) {
            return -1;
        }
        counter(key);
        return valMap[key];
    }

    void put(int key, int value) {
        if (capacity == 0) {
            return;
        }

        if (valMap.find(key) == valMap.end() && valMap.size() == capacity) {
            int toRemove = listMap[lfuCount]->popLeft();
            valMap.erase(toRemove);
            countMap.erase(toRemove);
        }

        valMap[key] = value;
        if (countMap.find(key) == countMap.end()) {
            countMap[key] = 0;
            listMap[0]->pushRight(key);
            lfuCount = 0;
        }
        counter(key);
    }
};
```

```javascript
class ListNode {
    /**
     * @param {number} val
     * @param {ListNode} prev
     * @param {ListNode} next
     */
    constructor(val, prev = null, next = null) {
        this.val = val;
        this.prev = prev;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.left = new ListNode(0);
        this.right = new ListNode(0);
        this.left.next = this.right;
        this.right.prev = this.left;
        this.map = new Map();
    }

    /**
     * @return {number}
     */
    length() {
        return this.map.size;
    }

    /**
     * @param {number} val
     */
    pushRight(val) {
        const node = new ListNode(val, this.right.prev, this.right);
        this.map.set(val, node);
        this.right.prev.next = node;
        this.right.prev = node;
    }

    /**
     * @param {number} val
     */
    pop(val) {
        if (this.map.has(val)) {
            const node = this.map.get(val);
            const prev = node.prev;
            const next = node.next;
            prev.next = next;
            next.prev = prev;
            this.map.delete(val);
        }
    }

    /**
     * @return {number}
     */
    popLeft() {
        const res = this.left.next.val;
        this.pop(res);
        return res;
    }

    /**
     * @param {number} val
     */
    update(val) {
        this.pop(val);
        this.pushRight(val);
    }
}

class LFUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;
        this.lfuCount = 0;
        this.valMap = new Map();
        this.countMap = new Map();
        this.listMap = new Map();
        this.listMap.set(0, new LinkedList());
    }

    /**
     * @param {number} key
     */
    counter(key) {
        const count = this.countMap.get(key);
        this.countMap.set(key, count + 1);

        this.listMap.get(count).pop(key);

        if (!this.listMap.has(count + 1)) {
            this.listMap.set(count + 1, new LinkedList());
        }
        this.listMap.get(count + 1).pushRight(key);

        if (count === this.lfuCount && this.listMap.get(count).length() === 0) {
            this.lfuCount++;
        }
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.valMap.has(key)) {
            return -1;
        }
        this.counter(key);
        return this.valMap.get(key);
    }

    /**
     * @param {number} key
     * @param {number} value
     */
    put(key, value) {
        if (this.capacity === 0) return;

        if (!this.valMap.has(key) && this.valMap.size === this.capacity) {
            const toRemove = this.listMap.get(this.lfuCount).popLeft();
            this.valMap.delete(toRemove);
            this.countMap.delete(toRemove);
        }

        this.valMap.set(key, value);
        if (!this.countMap.has(key)) {
            this.countMap.set(key, 0);
            this.listMap.get(0).pushRight(key);
            this.lfuCount = 0;
        }
        this.counter(key);
    }
}
```

```csharp
public class ListNode {
    public int Val;
    public ListNode Prev, Next;

    public ListNode(int val) {
        Val = val;
    }

    public ListNode(int val, ListNode prev, ListNode next) {
        Val = val;
        Prev = prev;
        Next = next;
    }
}

public class DoublyLinkedList {
    private ListNode left, right;
    private Dictionary<int, ListNode> map;

    public DoublyLinkedList() {
        left = new ListNode(0);
        right = new ListNode(0, left, null);
        left.Next = right;
        map = new Dictionary<int, ListNode>();
    }

    public int Length() {
        return map.Count;
    }

    public void PushRight(int val) {
        var node = new ListNode(val, right.Prev, right);
        map[val] = node;
        right.Prev.Next = node;
        right.Prev = node;
    }

    public void Pop(int val) {
        if (map.ContainsKey(val)) {
            var node = map[val];
            var prev = node.Prev;
            var next = node.Next;
            prev.Next = next;
            next.Prev = prev;
            map.Remove(val);
        }
    }

    public int PopLeft() {
        int res = left.Next.Val;
        Pop(res);
        return res;
    }
}

public class LFUCache {
    private int capacity;
    private int lfuCount;
    private Dictionary<int, int> valMap;
    private Dictionary<int, int> countMap;
    private Dictionary<int, DoublyLinkedList> listMap;

    public LFUCache(int capacity) {
        this.capacity = capacity;
        lfuCount = 0;
        valMap = new Dictionary<int, int>();
        countMap = new Dictionary<int, int>();
        listMap = new Dictionary<int, DoublyLinkedList>();
    }

    private void Counter(int key) {
        int count = countMap[key];
        countMap[key] = count + 1;

        if (!listMap.ContainsKey(count)) {
            listMap[count] = new DoublyLinkedList();
        }
        listMap[count].Pop(key);

        if (!listMap.ContainsKey(count + 1)) {
            listMap[count + 1] = new DoublyLinkedList();
        }
        listMap[count + 1].PushRight(key);

        if (count == lfuCount && listMap[count].Length() == 0) {
            lfuCount++;
        }
    }

    public int Get(int key) {
        if (!valMap.ContainsKey(key)) {
            return -1;
        }
        Counter(key);
        return valMap[key];
    }

    public void Put(int key, int value) {
        if (capacity == 0) return;

        if (!valMap.ContainsKey(key) && valMap.Count == capacity) {
            int toRemove = listMap[lfuCount].PopLeft();
            valMap.Remove(toRemove);
            countMap.Remove(toRemove);
        }

        valMap[key] = value;
        if (!countMap.ContainsKey(key)) {
            countMap[key] = 0;
        }
        Counter(key);
        lfuCount = Math.Min(lfuCount, countMap[key]);
    }
}
```

```go
type ListNode struct {
    val  int
    prev *ListNode
    next *ListNode
}

type LinkedList struct {
    left  *ListNode
    right *ListNode
    mp    map[int]*ListNode
}

func NewLinkedList() *LinkedList {
    left := &ListNode{val: 0}
    right := &ListNode{val: 0, prev: left}
    left.next = right
    return &LinkedList{
        left:  left,
        right: right,
        mp:    make(map[int]*ListNode),
    }
}

func (ll *LinkedList) length() int {
    return len(ll.mp)
}

func (ll *LinkedList) pushRight(val int) {
    node := &ListNode{val: val, prev: ll.right.prev, next: ll.right}
    ll.mp[val] = node
    ll.right.prev.next = node
    ll.right.prev = node
}

func (ll *LinkedList) pop(val int) {
    if node, exists := ll.mp[val]; exists {
        prev, next := node.prev, node.next
        prev.next = next
        next.prev = prev
        delete(ll.mp, val)
    }
}

func (ll *LinkedList) popLeft() int {
    res := ll.left.next.val
    ll.pop(res)
    return res
}

type LFUCache struct {
    capacity int
    lfuCount int
    valMap   map[int]int
    countMap map[int]int
    listMap  map[int]*LinkedList
}

func Constructor(capacity int) LFUCache {
    listMap := make(map[int]*LinkedList)
    listMap[0] = NewLinkedList()
    return LFUCache{
        capacity: capacity,
        lfuCount: 0,
        valMap:   make(map[int]int),
        countMap: make(map[int]int),
        listMap:  listMap,
    }
}

func (this *LFUCache) counter(key int) {
    count := this.countMap[key]
    this.countMap[key] = count + 1

    if _, exists := this.listMap[count]; !exists {
        this.listMap[count] = NewLinkedList()
    }
    this.listMap[count].pop(key)

    if _, exists := this.listMap[count+1]; !exists {
        this.listMap[count+1] = NewLinkedList()
    }
    this.listMap[count+1].pushRight(key)

    if count == this.lfuCount && this.listMap[count].length() == 0 {
        this.lfuCount++
    }
}

func (this *LFUCache) Get(key int) int {
    if _, exists := this.valMap[key]; !exists {
        return -1
    }
    this.counter(key)
    return this.valMap[key]
}

func (this *LFUCache) Put(key int, value int) {
    if this.capacity == 0 {
        return
    }

    if _, exists := this.valMap[key]; !exists && len(this.valMap) == this.capacity {
        toRemove := this.listMap[this.lfuCount].popLeft()
        delete(this.valMap, toRemove)
        delete(this.countMap, toRemove)
    }

    this.valMap[key] = value
    if _, exists := this.countMap[key]; !exists {
        this.countMap[key] = 0
        this.listMap[0].pushRight(key)
        this.lfuCount = 0
    }
    this.counter(key)
}
```

```kotlin
class ListNode(var `val`: Int) {
    var prev: ListNode? = null
    var next: ListNode? = null

    constructor(`val`: Int, prev: ListNode?, next: ListNode?) : this(`val`) {
        this.prev = prev
        this.next = next
    }
}

class DoublyLinkedList {
    private val left = ListNode(0)
    private val right = ListNode(0, left, null)
    private val map = HashMap<Int, ListNode>()

    init {
        left.next = right
    }

    fun length(): Int = map.size

    fun pushRight(`val`: Int) {
        val node = ListNode(`val`, right.prev, right)
        map[`val`] = node
        right.prev?.next = node
        right.prev = node
    }

    fun pop(`val`: Int) {
        map[`val`]?.let { node ->
            val prev = node.prev
            val next = node.next
            prev?.next = next
            next?.prev = prev
            map.remove(`val`)
        }
    }

    fun popLeft(): Int {
        val res = left.next!!.`val`
        pop(res)
        return res
    }
}

class LFUCache(private val capacity: Int) {
    private var lfuCount = 0
    private val valMap = HashMap<Int, Int>()
    private val countMap = HashMap<Int, Int>()
    private val listMap = HashMap<Int, DoublyLinkedList>()

    init {
        listMap[0] = DoublyLinkedList()
    }

    private fun counter(key: Int) {
        val count = countMap[key]!!
        countMap[key] = count + 1

        listMap.getOrPut(count) { DoublyLinkedList() }.pop(key)
        listMap.getOrPut(count + 1) { DoublyLinkedList() }.pushRight(key)

        if (count == lfuCount && listMap[count]!!.length() == 0) {
            lfuCount++
        }
    }

    fun get(key: Int): Int {
        if (!valMap.containsKey(key)) {
            return -1
        }
        counter(key)
        return valMap[key]!!
    }

    fun put(key: Int, value: Int) {
        if (capacity == 0) return

        if (!valMap.containsKey(key) && valMap.size == capacity) {
            val toRemove = listMap[lfuCount]!!.popLeft()
            valMap.remove(toRemove)
            countMap.remove(toRemove)
        }

        valMap[key] = value
        if (!countMap.containsKey(key)) {
            countMap[key] = 0
            listMap[0]!!.pushRight(key)
            lfuCount = 0
        }
        counter(key)
    }
}
```

```swift
class ListNode {
    var val: Int
    var prev: ListNode?
    var next: ListNode?

    init(_ val: Int, _ prev: ListNode? = nil, _ next: ListNode? = nil) {
        self.val = val
        self.prev = prev
        self.next = next
    }
}

class LinkedList {
    private var left: ListNode
    private var right: ListNode
    private var map: [Int: ListNode]

    init() {
        left = ListNode(0)
        right = ListNode(0, left, nil)
        left.next = right
        map = [:]
    }

    func length() -> Int {
        return map.count
    }

    func pushRight(_ val: Int) {
        let node = ListNode(val, right.prev, right)
        map[val] = node
        right.prev?.next = node
        right.prev = node
    }

    func pop(_ val: Int) {
        if let node = map[val] {
            let prev = node.prev
            let next = node.next
            prev?.next = next
            next?.prev = prev
            map.removeValue(forKey: val)
        }
    }

    func popLeft() -> Int {
        let res = left.next!.val
        pop(res)
        return res
    }
}

class LFUCache {
    private var capacity: Int
    private var lfuCount: Int
    private var valMap: [Int: Int]
    private var countMap: [Int: Int]
    private var listMap: [Int: LinkedList]

    init(_ capacity: Int) {
        self.capacity = capacity
        self.lfuCount = 0
        self.valMap = [:]
        self.countMap = [:]
        self.listMap = [0: LinkedList()]
    }

    private func counter(_ key: Int) {
        let count = countMap[key]!
        countMap[key] = count + 1

        if listMap[count] == nil {
            listMap[count] = LinkedList()
        }
        listMap[count]!.pop(key)

        if listMap[count + 1] == nil {
            listMap[count + 1] = LinkedList()
        }
        listMap[count + 1]!.pushRight(key)

        if count == lfuCount && listMap[count]!.length() == 0 {
            lfuCount += 1
        }
    }

    func get(_ key: Int) -> Int {
        guard let value = valMap[key] else {
            return -1
        }
        counter(key)
        return value
    }

    func put(_ key: Int, _ value: Int) {
        if capacity == 0 { return }

        if valMap[key] == nil && valMap.count == capacity {
            let toRemove = listMap[lfuCount]!.popLeft()
            valMap.removeValue(forKey: toRemove)
            countMap.removeValue(forKey: toRemove)
        }

        valMap[key] = value
        if countMap[key] == nil {
            countMap[key] = 0
            listMap[0]!.pushRight(key)
            lfuCount = 0
        }
        counter(key)
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

### Forgetting to Update Minimum Frequency After Eviction

When inserting a new key after eviction, the minimum frequency must be reset to 1 (since the new key starts with frequency 1). Failing to update `lfuCount` causes subsequent evictions to look in the wrong frequency bucket, potentially evicting recently accessed items or causing errors.

### Not Incrementing Frequency on Both Get and Put

Both `get()` and `put()` (when updating an existing key) should increment the frequency. A common mistake is only incrementing on `get()`, which causes keys that are repeatedly updated but never retrieved to have artificially low frequencies and get evicted prematurely.

### Incorrect LRU Tie-Breaking Within Same Frequency

When multiple keys share the same minimum frequency, the least recently used among them should be evicted. This requires maintaining insertion order within each frequency bucket. Using a regular set or unordered structure loses this ordering and leads to incorrect evictions.

### Not Handling Zero Capacity Edge Case

When the cache capacity is 0, all `put()` operations should be no-ops since nothing can be stored. Forgetting this check causes attempts to evict from an empty cache, leading to errors or incorrect behavior.

### Failing to Move Keys Between Frequency Lists

When a key's frequency increases, it must be removed from its current frequency list and added to the next frequency list. Forgetting to remove it from the old list causes the key to appear in multiple frequency buckets, corrupting the data structure and causing incorrect evictions.