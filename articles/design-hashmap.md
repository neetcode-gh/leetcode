## 1. Array

### Intuition
Since keys are constrained to the range [0, 1000000], we can use direct addressing. We allocate an array where the index represents the key and the value at that index is the stored value. We use -1 to indicate that a key is not present. This gives O(1) time for all operations at the cost of fixed memory usage regardless of how many keys are actually stored.

### Algorithm
1. Initialize an array of size `1000001` with all values set to `-1`.
2. For `put(key, value)`: Set `map[key] = value`.
3. For `get(key)`: Return `map[key]` (returns `-1` if the key was never set or was removed).
4. For `remove(key)`: Set `map[key] = -1`.

::tabs-start

```python
class MyHashMap:

    def __init__(self):
        self.map = [-1] * 1000001

    def put(self, key: int, value: int) -> None:
        self.map[key] = value

    def get(self, key: int) -> int:
        return self.map[key]

    def remove(self, key: int) -> None:
        self.map[key] = -1
```

```java
public class MyHashMap {
    private int[] map;

    public MyHashMap() {
        map = new int[1000001];
        Arrays.fill(map, -1);
    }

    public void put(int key, int value) {
        map[key] = value;
    }

    public int get(int key) {
        return map[key];
    }

    public void remove(int key) {
        map[key] = -1;
    }
}
```

```cpp
class MyHashMap {
private:
    vector<int> map;

public:
    MyHashMap() : map(1000001, -1) {}

    void put(int key, int value) {
        map[key] = value;
    }

    int get(int key) {
        return map[key];
    }

    void remove(int key) {
        map[key] = -1;
    }
};
```

```javascript
class MyHashMap {
    constructor() {
        this.map = new Array(1000001).fill(-1);
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        this.map[key] = value;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        return this.map[key];
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        this.map[key] = -1;
    }
}
```

```csharp
public class MyHashMap {
    private int[] map;

    public MyHashMap() {
        map = new int[1000001];
        for (int i = 0; i < map.Length; i++) {
            map[i] = -1;
        }
    }

    public void Put(int key, int value) {
        map[key] = value;
    }

    public int Get(int key) {
        return map[key];
    }

    public void Remove(int key) {
        map[key] = -1;
    }
}
```

```go
type MyHashMap struct {
    data []int
}

func Constructor() MyHashMap {
    data := make([]int, 1000001)
    for i := range data {
        data[i] = -1
    }
    return MyHashMap{data: data}
}

func (this *MyHashMap) Put(key int, value int) {
    this.data[key] = value
}

func (this *MyHashMap) Get(key int) int {
    return this.data[key]
}

func (this *MyHashMap) Remove(key int) {
    this.data[key] = -1
}
```

```kotlin
class MyHashMap() {
    private val map = IntArray(1000001) { -1 }

    fun put(key: Int, value: Int) {
        map[key] = value
    }

    fun get(key: Int): Int {
        return map[key]
    }

    fun remove(key: Int) {
        map[key] = -1
    }
}
```

```swift
class MyHashMap {
    private var map: [Int]

    init() {
        map = [Int](repeating: -1, count: 1000001)
    }

    func put(_ key: Int, _ value: Int) {
        map[key] = value
    }

    func get(_ key: Int) -> Int {
        return map[key]
    }

    func remove(_ key: Int) {
        map[key] = -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(1000000)$ since the key is in the range $[0, 1000000]$.

---

## 2. Linked List

### Intuition
To reduce memory usage, we use a hash table with separate chaining. We create an array of buckets (smaller than the key range) and use a hash function (key modulo bucket count) to determine which bucket a key belongs to. Each bucket is a linked list that stores key-value pairs. This handles collisions by chaining multiple entries in the same bucket.

### Algorithm
1. Initialize an array of `1000` buckets, each containing a dummy head node for a linked list.
2. Define `hash(key)` as `key % 1000`.
3. For `put(key, value)`: Traverse the linked list at `hash(key)`. If a node with the matching key exists, update its value. Otherwise, append a new node with the key-value pair.
4. For `get(key)`: Traverse the linked list at `hash(key)`. If a node with the matching key is found, return its value. Otherwise, return `-1`.
5. For `remove(key)`: Traverse the linked list at `hash(key)`. If a node with the matching key is found, remove it by updating the previous node's `next` pointer.

::tabs-start

```python
class ListNode:
    def __init__(self, key = -1, val = -1, next = None):
        self.key = key
        self.val = val
        self.next = next

class MyHashMap:

    def __init__(self):
        self.map = [ListNode() for _ in range(1000)]

    def hash(self, key: int) -> int:
        return key % len(self.map)

    def put(self, key: int, value: int) -> None:
        cur = self.map[self.hash(key)]
        while cur.next:
            if cur.next.key == key:
                cur.next.val = value
                return
            cur = cur.next
        cur.next = ListNode(key, value)

    def get(self, key: int) -> int:
        cur = self.map[self.hash(key)].next
        while cur:
            if cur.key == key:
                return cur.val
            cur = cur.next
        return -1

    def remove(self, key: int) -> None:
        cur = self.map[self.hash(key)]
        while cur.next:
            if cur.next.key == key:
                cur.next = cur.next.next
                return
            cur = cur.next
```

```java
class ListNode {
    int key, val;
    ListNode next;

    public ListNode(int key, int val, ListNode next) {
        this.key = key;
        this.val = val;
        this.next = next;
    }

    public ListNode() {
        this(-1, -1, null);
    }
}

public class MyHashMap {
    private ListNode[] map;

    public MyHashMap() {
        map = new ListNode[1000];
        for (int i = 0; i < 1000; i++) {
            map[i] = new ListNode();
        }
    }

    private int hash(int key) {
        return key % map.length;
    }

    public void put(int key, int value) {
        ListNode cur = map[hash(key)];
        while (cur.next != null) {
            if (cur.next.key == key) {
                cur.next.val = value;
                return;
            }
            cur = cur.next;
        }
        cur.next = new ListNode(key, value, null);
    }

    public int get(int key) {
        ListNode cur = map[hash(key)].next;
        while (cur != null) {
            if (cur.key == key) {
                return cur.val;
            }
            cur = cur.next;
        }
        return -1;
    }

    public void remove(int key) {
        ListNode cur = map[hash(key)];
        while (cur.next != null) {
            if (cur.next.key == key) {
                cur.next = cur.next.next;
                return;
            }
            cur = cur.next;
        }
    }
}
```

```cpp
class MyHashMap {
private:
    struct ListNode {
        int key, val;
        ListNode* next;

        ListNode(int key = -1, int val = -1, ListNode* next = nullptr)
            : key(key), val(val), next(next) {}
    };

    vector<ListNode*> map;
    int hash(int key) {
        return key % map.size();
    }

public:
    MyHashMap() {
        map.resize(1000);
        for (auto& bucket : map) {
            bucket = new ListNode(0);
        }
    }

    void put(int key, int value) {
        ListNode* cur = map[hash(key)];
        while (cur->next) {
            if (cur->next->key == key) {
                cur->next->val = value;
                return;
            }
            cur = cur->next;
        }
        cur->next = new ListNode(key, value);
    }

    int get(int key) {
        ListNode* cur = map[hash(key)]->next;
        while (cur) {
            if (cur->key == key) {
                return cur->val;
            }
            cur = cur->next;
        }
        return -1;
    }

    void remove(int key) {
        ListNode* cur = map[hash(key)];
        while (cur->next) {
            if (cur->next->key == key) {
                ListNode* tmp = cur->next;
                cur->next = cur->next->next;
                delete tmp;
                return;
            }
            cur = cur->next;
        }
    }
};
```

```javascript
class ListNode {
    /**
     * @param {number} key
     * @param {number} val
     * @param {ListNode} next
     */
    constructor(key = -1, val = -1, next = null) {
        this.key = key;
        this.val = val;
        this.next = next;
    }
}

class MyHashMap {
    constructor() {
        this.map = Array.from({ length: 1000 }, () => new ListNode());
    }

    /**
     * @param {number} key
     * @return {number}
     */
    hash(key) {
        return key % this.map.length;
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        let cur = this.map[this.hash(key)];
        while (cur.next) {
            if (cur.next.key === key) {
                cur.next.val = value;
                return;
            }
            cur = cur.next;
        }
        cur.next = new ListNode(key, value);
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        let cur = this.map[this.hash(key)].next;
        while (cur) {
            if (cur.key === key) {
                return cur.val;
            }
            cur = cur.next;
        }
        return -1;
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        let cur = this.map[this.hash(key)];
        while (cur.next) {
            if (cur.next.key === key) {
                cur.next = cur.next.next;
                return;
            }
            cur = cur.next;
        }
    }
}
```

```csharp
public class ListNode {
    public int key;
    public int val;
    public ListNode next;

    public ListNode(int key = -1, int val = -1, ListNode next = null) {
        this.key = key;
        this.val = val;
        this.next = next;
    }
}

public class MyHashMap {
    private ListNode[] map;

    public MyHashMap() {
        map = new ListNode[1000];
        for (int i = 0; i < map.Length; i++) {
            map[i] = new ListNode();
        }
    }

    private int Hash(int key) {
        return key % map.Length;
    }

    public void Put(int key, int value) {
        ListNode cur = map[Hash(key)];
        while (cur.next != null) {
            if (cur.next.key == key) {
                cur.next.val = value;
                return;
            }
            cur = cur.next;
        }
        cur.next = new ListNode(key, value);
    }

    public int Get(int key) {
        ListNode cur = map[Hash(key)].next;
        while (cur != null) {
            if (cur.key == key) {
                return cur.val;
            }
            cur = cur.next;
        }
        return -1;
    }

    public void Remove(int key) {
        ListNode cur = map[Hash(key)];
        while (cur.next != null) {
            if (cur.next.key == key) {
                cur.next = cur.next.next;
                return;
            }
            cur = cur.next;
        }
    }
}
```

```go
type ListNode struct {
    key, val int
    next     *ListNode
}

type MyHashMap struct {
    data []*ListNode
}

func Constructor() MyHashMap {
    data := make([]*ListNode, 1000)
    for i := range data {
        data[i] = &ListNode{key: -1, val: -1}
    }
    return MyHashMap{data: data}
}

func (this *MyHashMap) hash(key int) int {
    return key % len(this.data)
}

func (this *MyHashMap) Put(key int, value int) {
    cur := this.data[this.hash(key)]
    for cur.next != nil {
        if cur.next.key == key {
            cur.next.val = value
            return
        }
        cur = cur.next
    }
    cur.next = &ListNode{key: key, val: value}
}

func (this *MyHashMap) Get(key int) int {
    cur := this.data[this.hash(key)].next
    for cur != nil {
        if cur.key == key {
            return cur.val
        }
        cur = cur.next
    }
    return -1
}

func (this *MyHashMap) Remove(key int) {
    cur := this.data[this.hash(key)]
    for cur.next != nil {
        if cur.next.key == key {
            cur.next = cur.next.next
            return
        }
        cur = cur.next
    }
}
```

```kotlin
class ListNode(var key: Int = -1, var `val`: Int = -1, var next: ListNode? = null)

class MyHashMap() {
    private val map = Array(1000) { ListNode() }

    private fun hash(key: Int): Int = key % map.size

    fun put(key: Int, value: Int) {
        var cur = map[hash(key)]
        while (cur.next != null) {
            if (cur.next!!.key == key) {
                cur.next!!.`val` = value
                return
            }
            cur = cur.next!!
        }
        cur.next = ListNode(key, value)
    }

    fun get(key: Int): Int {
        var cur = map[hash(key)].next
        while (cur != null) {
            if (cur.key == key) {
                return cur.`val`
            }
            cur = cur.next
        }
        return -1
    }

    fun remove(key: Int) {
        var cur = map[hash(key)]
        while (cur.next != null) {
            if (cur.next!!.key == key) {
                cur.next = cur.next!!.next
                return
            }
            cur = cur.next!!
        }
    }
}
```

```swift
class ListNode {
    var key: Int
    var val: Int
    var next: ListNode?

    init(_ key: Int = -1, _ val: Int = -1, _ next: ListNode? = nil) {
        self.key = key
        self.val = val
        self.next = next
    }
}

class MyHashMap {
    private var map: [ListNode]

    init() {
        map = (0..<1000).map { _ in ListNode() }
    }

    private func hash(_ key: Int) -> Int {
        return key % map.count
    }

    func put(_ key: Int, _ value: Int) {
        var cur = map[hash(key)]
        while cur.next != nil {
            if cur.next!.key == key {
                cur.next!.val = value
                return
            }
            cur = cur.next!
        }
        cur.next = ListNode(key, value)
    }

    func get(_ key: Int) -> Int {
        var cur = map[hash(key)].next
        while cur != nil {
            if cur!.key == key {
                return cur!.val
            }
            cur = cur!.next
        }
        return -1
    }

    func remove(_ key: Int) {
        var cur = map[hash(key)]
        while cur.next != nil {
            if cur.next!.key == key {
                cur.next = cur.next!.next
                return
            }
            cur = cur.next!
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac{n}{k})$ for each function call.
- Space complexity: $O(k + m)$

> Where $n$ is the number of keys, $k$ is the size of the map ($1000$) and $m$ is the number of unique keys.
