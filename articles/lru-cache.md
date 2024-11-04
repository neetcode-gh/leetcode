## 1. Brute Force

::tabs-start

```python
class LRUCache:

    def __init__(self, capacity: int):
        self.cache = []
        self.capacity = capacity

    def get(self, key: int) -> int:
        for i in range(len(self.cache)):
            if self.cache[i][0] == key:
                tmp = self.cache.pop(i)
                self.cache.append(tmp)
                return tmp[1]
        return -1

    def put(self, key: int, value: int) -> None:
        for i in range(len(self.cache)):
            if self.cache[i][0] == key:
                tmp = self.cache.pop(i)
                tmp[1] = value
                self.cache.append(tmp)
                return

        if self.capacity == len(self.cache):
            self.cache.pop(0)
            
        self.cache.append([key, value])
```

```java
public class LRUCache {

    private ArrayList<int[]> cache;
    private int capacity;

    public LRUCache(int capacity) {
        this.cache = new ArrayList<>();
        this.capacity = capacity;
    }

    public int get(int key) {
        for (int i = 0; i < cache.size(); i++) {
            if (cache.get(i)[0] == key) {
                int[] tmp = cache.remove(i);
                cache.add(tmp);
                return tmp[1];
            }
        }
        return -1;
    }

    public void put(int key, int value) {
        for (int i = 0; i < cache.size(); i++) {
            if (cache.get(i)[0] == key) {
                int[] tmp = cache.remove(i);
                tmp[1] = value;
                cache.add(tmp);
                return;
            }
        }

        if (capacity == cache.size()) {
            cache.remove(0);
        }

        cache.add(new int[]{key, value});
    }
}
```

```cpp
class LRUCache {
private:
    vector<pair<int, int>> cache;
    int capacity;

public:
    LRUCache(int capacity) {
        this->capacity = capacity;
    }
    
    int get(int key) {
        for (int i = 0; i < cache.size(); i++) {
            if (cache[i].first == key) {
                pair<int, int> tmp = cache[i];
                cache.erase(cache.begin() + i);
                cache.push_back(tmp);
                return tmp.second;
            }
        }
        return -1;
    }
    
    void put(int key, int value) {
        for (int i = 0; i < cache.size(); i++) {
            if (cache[i].first == key) {
                cache.erase(cache.begin() + i);
                cache.push_back({key, value});
                return;
            }
        }

        if (cache.size() == capacity) {
            cache.erase(cache.begin());
        }

        cache.push_back({key, value});
    }
};
```

```javascript
class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.cache = [];
        this.capacity = capacity;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === key) {
                let tmp = this.cache.splice(i, 1)[0];
                this.cache.push(tmp);
                return tmp[1];
            }
        }
        return -1;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === key) {
                this.cache.splice(i, 1);
                this.cache.push([key, value]);
                return;
            }
        }

        if (this.cache.length === this.capacity) {
            this.cache.shift();
        }

        this.cache.push([key, value]);
    }
}
```

```csharp
public class LRUCache {
    private List<KeyValuePair<int, int>> cache;
    private int capacity;

    public LRUCache(int capacity) {
        this.cache = new List<KeyValuePair<int, int>>();
        this.capacity = capacity;
    }
    
    public int Get(int key) {
        for (int i = 0; i < cache.Count; i++) {
            if (cache[i].Key == key) {
                var tmp = cache[i];
                cache.RemoveAt(i);
                cache.Add(tmp);
                return tmp.Value;
            }
        }
        return -1;
    }
    
    public void Put(int key, int value) {
        for (int i = 0; i < cache.Count; i++) {
            if (cache[i].Key == key) {
                cache.RemoveAt(i);
                cache.Add(new KeyValuePair<int, int>(key, value));
                return;
            }
        }

        if (cache.Count == capacity) {
            cache.RemoveAt(0);
        }

        cache.Add(new KeyValuePair<int, int>(key, value));
    }
}
```

```go
type LRUCache struct {
    cache    [][2]int
    capacity int
}

func Constructor(capacity int) LRUCache {
    return LRUCache{
        cache:    make([][2]int, 0),
        capacity: capacity,
    }
}

func (this *LRUCache) Get(key int) int {
    for i := range this.cache {
        if this.cache[i][0] == key {
            tmp := this.cache[i]
            this.cache = append(this.cache[:i], this.cache[i+1:]...)
            this.cache = append(this.cache, tmp)
            return tmp[1]
        }
    }
    return -1
}

func (this *LRUCache) Put(key int, value int) {
    for i := range this.cache {
        if this.cache[i][0] == key {
            tmp := this.cache[i]
            this.cache = append(this.cache[:i], this.cache[i+1:]...)
            tmp[1] = value
            this.cache = append(this.cache, tmp)
            return
        }
    }
    
    if len(this.cache) == this.capacity {
        this.cache = this.cache[1:]
    }
    
    this.cache = append(this.cache, [2]int{key, value})
}
```

```kotlin
class LRUCache(capacity: Int) {
    private val capacity = capacity
    private val cache = mutableListOf<Pair<Int, Int>>()
    
    fun get(key: Int): Int {
        for (i in cache.indices) {
            if (cache[i].first == key) {
                val tmp = cache.removeAt(i)
                cache.add(tmp)
                return tmp.second
            }
        }
        return -1
    }
    
    fun put(key: Int, value: Int) {
        for (i in cache.indices) {
            if (cache[i].first == key) {
                cache.removeAt(i)
                cache.add(Pair(key, value))
                return
            }
        }
        
        if (cache.size == capacity) {
            cache.removeAt(0)
        }
        
        cache.add(Pair(key, value))
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for each $put()$ and $get()$ operation.
* Space complexity: $O(n)$

---

## 2. Doubly Linked List

::tabs-start

```python
class Node:
    def __init__(self, key, val):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}  # map key to node

        self.left, self.right = Node(0, 0), Node(0, 0)
        self.left.next, self.right.prev = self.right, self.left

    def remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev

    def insert(self, node):
        prev, nxt = self.right.prev, self.right
        prev.next = nxt.prev = node
        node.next, node.prev = nxt, prev

    def get(self, key: int) -> int:
        if key in self.cache:
            self.remove(self.cache[key])
            self.insert(self.cache[key])
            return self.cache[key].val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.remove(self.cache[key])
        self.cache[key] = Node(key, value)
        self.insert(self.cache[key])

        if len(self.cache) > self.cap:
            lru = self.left.next
            self.remove(lru)
            del self.cache[lru.key]
```

```java
public class Node {
    int key;
    int val;
    Node prev;
    Node next;

    public Node(int key, int val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

public class LRUCache {
    
    private int cap;
    private HashMap<Integer, Node> cache;
    private Node left;
    private Node right;

    public LRUCache(int capacity) {
        this.cap = capacity;
        this.cache = new HashMap<>();
        this.left = new Node(0, 0);
        this.right = new Node(0, 0);
        this.left.next = this.right;
        this.right.prev = this.left;
    }

    private void remove(Node node) {
        Node prev = node.prev;
        Node nxt = node.next;
        prev.next = nxt;
        nxt.prev = prev;
    }

    private void insert(Node node) {
        Node prev = this.right.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.right;
        this.right.prev = node;
    }

    public int get(int key) {
        if (cache.containsKey(key)) {
            Node node = cache.get(key);
            remove(node);
            insert(node);
            return node.val;
        }
        return -1;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            remove(cache.get(key));
        }
        Node newNode = new Node(key, value);
        cache.put(key, newNode);
        insert(newNode);

        if (cache.size() > cap) {
            Node lru = this.left.next;
            remove(lru);
            cache.remove(lru.key);
        }
    }
}
```

```cpp
class Node {
public:
    int key;
    int val;
    Node* prev;
    Node* next;

    Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
};

class LRUCache {
private:
    int cap;
    unordered_map<int, Node*> cache;
    Node* left;
    Node* right;

    void remove(Node* node) {
        Node* prev = node->prev;
        Node* nxt = node->next;
        prev->next = nxt;
        nxt->prev = prev;
    }

    void insert(Node* node) {
        Node* prev = right->prev;
        prev->next = node;
        node->prev = prev;
        node->next = right;
        right->prev = node;
    }

public:
    LRUCache(int capacity) {
        cap = capacity;
        cache.clear();
        left = new Node(0, 0);
        right = new Node(0, 0);
        left->next = right;
        right->prev = left;
    }

    int get(int key) {
        if (cache.find(key) != cache.end()) {
            Node* node = cache[key];
            remove(node);
            insert(node);
            return node->val;
        }
        return -1;
    }

    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            remove(cache[key]);
        }
        Node* newNode = new Node(key, value);
        cache[key] = newNode;
        insert(newNode);

        if (cache.size() > cap) {
            Node* lru = left->next;
            remove(lru);
            cache.erase(lru->key);
            delete lru;
        }
    }
};
```

```javascript
class Node {
    /**
     * @param {number} key
     * @param {number} val
     */
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.cap = capacity;
        this.cache = new Map();
        this.left = new Node(0, 0);
        this.right = new Node(0, 0);
        this.left.next = this.right;
        this.right.prev = this.left;
    }

    /**
     * @param {Node} node
     */
    remove(node) {
        const prev = node.prev;
        const nxt = node.next;
        prev.next = nxt;
        nxt.prev = prev;
    }

    /**
     * @param {Node} node
     */
    insert(node) {
        const prev = this.right.prev;
        prev.next = node;
        node.prev = prev;
        node.next = this.right;
        this.right.prev = node;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key);
            this.remove(node);
            this.insert(node);
            return node.val;
        }
        return -1;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            this.remove(this.cache.get(key));
        }
        const newNode = new Node(key, value);
        this.cache.set(key, newNode);
        this.insert(newNode);

        if (this.cache.size > this.cap) {
            const lru = this.left.next;
            this.remove(lru);
            this.cache.delete(lru.key);
        }
    }
}
```

```csharp
public class Node {
    public int Key { get; set; }
    public int Val { get; set; }
    public Node Prev { get; set; }
    public Node Next { get; set; }

    public Node(int key, int val) {
        Key = key;
        Val = val;
        Prev = null;
        Next = null;
    }
}

public class LRUCache {
    
    private int cap;
    private Dictionary<int, Node> cache;
    private Node left;
    private Node right;

    public LRUCache(int capacity) {
        cap = capacity;
        cache = new Dictionary<int, Node>();
        left = new Node(0, 0);
        right = new Node(0, 0);
        left.Next = right;
        right.Prev = left;
    }

    private void Remove(Node node) {
        Node prev = node.Prev;
        Node nxt = node.Next;
        prev.Next = nxt;
        nxt.Prev = prev;
    }

    private void Insert(Node node) {
        Node prev = right.Prev;
        prev.Next = node;
        node.Prev = prev;
        node.Next = right;
        right.Prev = node;
    }

    public int Get(int key) {
        if (cache.ContainsKey(key)) {
            Node node = cache[key];
            Remove(node);
            Insert(node);
            return node.Val;
        }
        return -1;
    }

    public void Put(int key, int value) {
        if (cache.ContainsKey(key)) {
            Remove(cache[key]);
        }
        Node newNode = new Node(key, value);
        cache[key] = newNode;
        Insert(newNode);

        if (cache.Count > cap) {
            Node lru = left.Next;
            Remove(lru);
            cache.Remove(lru.Key);
        }
    }
}
```

```go
type Node struct {
    key, val   int
    prev, next *Node
}

type LRUCache struct {
    cap        int
    cache      map[int]*Node
    left,right *Node
}

func Constructor(capacity int) LRUCache {
    lru := LRUCache{
        cap:   capacity,
        cache: make(map[int]*Node),
        left:  &Node{},
        right: &Node{},
    }
    lru.left.next = lru.right
    lru.right.prev = lru.left
    return lru
}

func (this *LRUCache) remove(node *Node) {
    prev, next := node.prev, node.next
    prev.next = next
    next.prev = prev
}

func (this *LRUCache) insert(node *Node) {
    prev, next := this.right.prev, this.right
    prev.next = node
    next.prev = node
    node.next = next
    node.prev = prev
}

func (this *LRUCache) Get(key int) int {
    if node, ok := this.cache[key]; ok {
        this.remove(node)
        this.insert(node)
        return node.val
    }
    return -1
}

func (this *LRUCache) Put(key int, value int) {
    if node, ok := this.cache[key]; ok {
        this.remove(node)
        delete(this.cache, key)
    }
    
    node := &Node{key: key, val: value}
    this.cache[key] = node
    this.insert(node)
    
    if len(this.cache) > this.cap {
        lru := this.left.next
        this.remove(lru)
        delete(this.cache, lru.key)
    }
}
```

```kotlin
class LRUCache(capacity: Int) {
    private val capacity = capacity
    private class Node(
        val key: Int,
        var value: Int,
        var prev: Node? = null,
        var next: Node? = null
    )
    
    private val cache = mutableMapOf<Int, Node>()
    private val left = Node(0, 0)
    private val right = Node(0, 0)
    
    init {
        left.next = right
        right.prev = left
    }
    
    private fun remove(node: Node) {
        val prev = node.prev
        val next = node.next
        prev?.next = next
        next?.prev = prev
    }
    
    private fun insert(node: Node) {
        val prev = right.prev
        val next = right
        prev?.next = node
        next.prev = node
        node.next = next
        node.prev = prev
    }
    
    fun get(key: Int): Int {
        return cache[key]?.let { node ->
            remove(node)
            insert(node)
            node.value
        } ?: -1
    }
    
    fun put(key: Int, value: Int) {
        cache[key]?.let { node ->
            remove(node)
            cache.remove(key)
        }
        
        val node = Node(key, value)
        cache[key] = node
        insert(node)
        
        if (cache.size > capacity) {
            left.next?.let { lru ->
                remove(lru)
                cache.remove(lru.key)
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for each $put()$ and $get()$ operation.
* Space complexity: $O(n)$

---

## 3. Built-In Data Structure

::tabs-start

```python
class LRUCache:

    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.cap = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value

        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)
```

```java
public class LRUCache {
    private final Map<Integer, Integer> cache;
    private final int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > LRUCache.this.capacity;
            }
        };
    }

    public int get(int key) {
        return cache.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        cache.put(key, value);
    }
}
```

```cpp
class LRUCache {
private:
    unordered_map<int, pair<int, list<int>::iterator>> cache;
    list<int> order;
    int capacity;

public:
    LRUCache(int capacity) {
        this->capacity = capacity;
    }
    
    int get(int key) {
        if (cache.find(key) == cache.end()) return -1;
        order.erase(cache[key].second);
        order.push_back(key);
        cache[key].second = --order.end();
        return cache[key].first;
    }
    
    void put(int key, int value) {
        if (cache.find(key) != cache.end()) {
            order.erase(cache[key].second);
        } else if (cache.size() == capacity) {
            int lru = order.front();
            order.pop_front();
            cache.erase(lru);
        }
        order.push_back(key);
        cache[key] = {value, --order.end()};
    }
};
```

```javascript
class LRUCache {
    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size === this.capacity) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}
```

```csharp
public class LRUCache {
    private Dictionary<int, LinkedListNode<(int key, int value)>> cache;
    private LinkedList<(int key, int value)> order;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new Dictionary<int, LinkedListNode<(int key, int value)>>();
        this.order = new LinkedList<(int key, int value)>();
    }

    public int Get(int key) {
        if (!cache.ContainsKey(key)) return -1;
        var node = cache[key];
        order.Remove(node);
        order.AddLast(node);
        return node.Value.value;
    }

    public void Put(int key, int value) {
        if (cache.ContainsKey(key)) {
            var node = cache[key];
            order.Remove(node);
            node.Value = (key, value);
            order.AddLast(node);
        } else {
            if (cache.Count == capacity) {
                var lru = order.First.Value;
                order.RemoveFirst();
                cache.Remove(lru.key);
            }
            var newNode = new LinkedListNode<(int key, int value)>((key, value));
            order.AddLast(newNode);
            cache[key] = newNode;
        }
    }
}
```

```go
type LRUCache struct {
    capacity int
    keys     []int
    values   map[int]int
}

func Constructor(capacity int) LRUCache {
    return LRUCache{
        capacity: capacity,
        keys:     make([]int, 0, capacity),
        values:   make(map[int]int),
    }
}

func (this *LRUCache) Get(key int) int {
    if val, exists := this.values[key]; exists {
        for i := range this.keys {
            if this.keys[i] == key {
                this.keys = append(this.keys[:i], this.keys[i+1:]...)
                break
            }
        }
        this.keys = append(this.keys, key)
        return val
    }
    return -1
}

func (this *LRUCache) Put(key int, value int) {
    if _, exists := this.values[key]; exists {
        for i := range this.keys {
            if this.keys[i] == key {
                this.keys = append(this.keys[:i], this.keys[i+1:]...)
                break
            }
        }
    } else {
        if len(this.keys) >= this.capacity {
            delete(this.values, this.keys[0])
            this.keys = this.keys[1:]
        }
    }
    this.values[key] = value
    this.keys = append(this.keys, key)
}
```

```kotlin
class LRUCache(capacity: Int) {
    private val capacity = capacity
    private val cache = object : LinkedHashMap<Int, Int>(capacity, 0.75f, true) {
        override fun removeEldestEntry(eldest: MutableMap.MutableEntry<Int, Int>): Boolean {
            return size > capacity
        }
    }
    
    fun get(key: Int): Int {
        return cache.getOrDefault(key, -1)
    }
    
    fun put(key: Int, value: Int) {
        cache[key] = value
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for each $put()$ and $get()$ operation.
* Space complexity: $O(n)$