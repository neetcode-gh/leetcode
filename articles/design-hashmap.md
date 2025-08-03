## 1. Array

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(1000000)$ since the key is in the range $[0, 1000000]$.

---

## 2. Linked List

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac{n}{k})$ for each function call.
- Space complexity: $O(k + m)$

> Where $n$ is the number of keys, $k$ is the size of the map ($1000$) and $m$ is the number of unique keys.
