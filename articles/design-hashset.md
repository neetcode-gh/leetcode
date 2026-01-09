## 1. Brute Force

### Intuition
The simplest implementation uses a dynamic array to store all keys. For each operation, we search through the array linearly. This works correctly but is inefficient since every operation requires scanning potentially all stored elements.

### Algorithm
1. Initialize an empty array `data`.
2. For `add(key)`: If the key is not already in the array, append it.
3. For `remove(key)`: If the key exists in the array, remove it.
4. For `contains(key)`: Return true if the key exists in the array.

::tabs-start

```python
class MyHashSet:

    def __init__(self):
        self.data = []

    def add(self, key: int) -> None:
        if key not in self.data:
            self.data.append(key)

    def remove(self, key: int) -> None:
        if key in self.data:
            self.data.remove(key)

    def contains(self, key: int) -> bool:
        return key in self.data
```

```java
public class MyHashSet {
    private List<Integer> data;

    public MyHashSet() {
        data = new ArrayList<>();
    }

    public void add(int key) {
        if (!data.contains(key)) {
            data.add(key);
        }
    }

    public void remove(int key) {
        data.remove(Integer.valueOf(key));
    }

    public boolean contains(int key) {
        return data.contains(key);
    }
}
```

```cpp
class MyHashSet {
private:
    vector<int> data;
public:
    MyHashSet() {}

    void add(int key) {
        if (find(data.begin(), data.end(), key) == data.end()) {
            data.push_back(key);
        }
    }

    void remove(int key) {
        auto it = find(data.begin(), data.end(), key);
        if (it != data.end()) {
            data.erase(it);
        }
    }

    bool contains(int key) {
        return find(data.begin(), data.end(), key) != data.end();
    }
};
```

```javascript
class MyHashSet {
    constructor() {
        this.data = [];
    }

    /**
     * @param {number} key
     * @return {void}
     */
    add(key) {
        if (!this.data.includes(key)) {
            this.data.push(key);
        }
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        const index = this.data.indexOf(key);
        if (index !== -1) {
            this.data.splice(index, 1);
        }
    }

    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key) {
        return this.data.includes(key);
    }
}
```

```csharp
public class MyHashSet {
    private List<int> data;

    public MyHashSet() {
        data = new List<int>();
    }

    public void Add(int key) {
        if (!data.Contains(key)) {
            data.Add(key);
        }
    }

    public void Remove(int key) {
        if (data.Contains(key)) {
            data.Remove(key);
        }
    }

    public bool Contains(int key) {
        return data.Contains(key);
    }
}
```

```go
type MyHashSet struct {
    data []int
}

func Constructor() MyHashSet {
    return MyHashSet{data: []int{}}
}

func (this *MyHashSet) Add(key int) {
    if !this.Contains(key) {
        this.data = append(this.data, key)
    }
}

func (this *MyHashSet) Remove(key int) {
    for i, v := range this.data {
        if v == key {
            this.data = append(this.data[:i], this.data[i+1:]...)
            return
        }
    }
}

func (this *MyHashSet) Contains(key int) bool {
    for _, v := range this.data {
        if v == key {
            return true
        }
    }
    return false
}
```

```kotlin
class MyHashSet() {
    private val data = mutableListOf<Int>()

    fun add(key: Int) {
        if (!contains(key)) {
            data.add(key)
        }
    }

    fun remove(key: Int) {
        data.remove(key)
    }

    fun contains(key: Int): Boolean {
        return data.contains(key)
    }
}
```

```swift
class MyHashSet {
    private var data: [Int]

    init() {
        data = []
    }

    func add(_ key: Int) {
        if !contains(key) {
            data.append(key)
        }
    }

    func remove(_ key: Int) {
        if let index = data.firstIndex(of: key) {
            data.remove(at: index)
        }
    }

    func contains(_ key: Int) -> Bool {
        return data.contains(key)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ for each function call.
- Space complexity: $O(n)$

---

## 2. Boolean Array

### Intuition
Since keys are constrained to [0, 1000000], we can use direct addressing with a boolean array. The index represents the key, and the boolean value indicates presence. This provides O(1) operations but uses fixed memory regardless of how many keys are stored.

### Algorithm
1. Initialize a boolean array of size 1000001, all set to false.
2. For `add(key)`: Set `data[key] = true`.
3. For `remove(key)`: Set `data[key] = false`.
4. For `contains(key)`: Return `data[key]`.

::tabs-start

```python
class MyHashSet:

    def __init__(self):
        self.data = [False] * 1000001

    def add(self, key: int) -> None:
        self.data[key] = True

    def remove(self, key: int) -> None:
        self.data[key] = False

    def contains(self, key: int) -> bool:
        return self.data[key]
```

```java
public class MyHashSet {
    private boolean[] data;

    public MyHashSet() {
        data = new boolean[1000001];
    }

    public void add(int key) {
        data[key] = true;
    }

    public void remove(int key) {
        data[key] = false;
    }

    public boolean contains(int key) {
        return data[key];
    }
}
```

```cpp
class MyHashSet {
private:
    vector<bool> data;
public:
    MyHashSet() : data(1000001, false) {}

    void add(int key) {
        data[key] = true;
    }

    void remove(int key) {
        data[key] = false;
    }

    bool contains(int key) {
        return data[key];
    }
};
```

```javascript
class MyHashSet {
    constructor() {
        this.data = new Array(1000001).fill(false);
    }

    /**
     * @param {number} key
     * @return {void}
     */
    add(key) {
        this.data[key] = true;
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        this.data[key] = false;
    }

    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key) {
        return this.data[key];
    }
}
```

```csharp
public class MyHashSet {
    private bool[] data;

    public MyHashSet() {
        data = new bool[1000001];
    }

    public void Add(int key) {
        data[key] = true;
    }

    public void Remove(int key) {
        data[key] = false;
    }

    public bool Contains(int key) {
        return data[key];
    }
}
```

```go
type MyHashSet struct {
    data []bool
}

func Constructor() MyHashSet {
    return MyHashSet{data: make([]bool, 1000001)}
}

func (this *MyHashSet) Add(key int) {
    this.data[key] = true
}

func (this *MyHashSet) Remove(key int) {
    this.data[key] = false
}

func (this *MyHashSet) Contains(key int) bool {
    return this.data[key]
}
```

```kotlin
class MyHashSet() {
    private val data = BooleanArray(1000001)

    fun add(key: Int) {
        data[key] = true
    }

    fun remove(key: Int) {
        data[key] = false
    }

    fun contains(key: Int): Boolean {
        return data[key]
    }
}
```

```swift
class MyHashSet {
    private var data: [Bool]

    init() {
        data = [Bool](repeating: false, count: 1000001)
    }

    func add(_ key: Int) {
        data[key] = true
    }

    func remove(_ key: Int) {
        data[key] = false
    }

    func contains(_ key: Int) -> Bool {
        return data[key]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(1000000)$ since the key is in the range $[0, 1000000]$.

---

## 3. Linked List

### Intuition
To reduce memory while handling collisions, we use separate chaining. An array of buckets stores linked lists, and keys are assigned to buckets using a hash function. Each operation traverses only the linked list in the relevant bucket, making average-case operations faster than the brute force approach.

### Algorithm
1. Initialize an array of 10000 buckets, each with a dummy head node.
2. Define `hash(key)` as `key % 10000`.
3. For `add(key)`: Traverse the list at `hash(key)`. If the key already exists, return. Otherwise, append a new node with the key.
4. For `remove(key)`: Traverse the list at `hash(key)`. If a node with the matching key is found, remove it by updating the previous node's next pointer.
5. For `contains(key)`: Traverse the list at `hash(key)`. Return true if the key is found, false otherwise.

::tabs-start

```python
class ListNode:
    def __init__(self, key: int):
        self.key = key
        self.next = None

class MyHashSet:

    def __init__(self):
        self.set = [ListNode(0) for _ in range(10**4)]

    def add(self, key: int) -> None:
        cur = self.set[key % len(self.set)]
        while cur.next:
            if cur.next.key == key:
                return
            cur = cur.next
        cur.next = ListNode(key)

    def remove(self, key: int) -> None:
        cur = self.set[key % len(self.set)]
        while cur.next:
            if cur.next.key == key:
                cur.next = cur.next.next
                return
            cur = cur.next

    def contains(self, key: int) -> bool:
        cur = self.set[key % len(self.set)]
        while cur.next:
            if cur.next.key == key:
                return True
            cur = cur.next
        return False
```

```java
public class MyHashSet {

    private static class ListNode {
        int key;
        ListNode next;

        ListNode(int key) {
            this.key = key;
        }
    }

    private final ListNode[] set;

    public MyHashSet() {
        set = new ListNode[10000];
        for (int i = 0; i < set.length; i++) {
            set[i] = new ListNode(0);
        }
    }

    public void add(int key) {
        ListNode cur = set[key % set.length];
        while (cur.next != null) {
            if (cur.next.key == key) {
                return;
            }
            cur = cur.next;
        }
        cur.next = new ListNode(key);
    }

    public void remove(int key) {
        ListNode cur = set[key % set.length];
        while (cur.next != null) {
            if (cur.next.key == key) {
                cur.next = cur.next.next;
                return;
            }
            cur = cur.next;
        }
    }

    public boolean contains(int key) {
        ListNode cur = set[key % set.length];
        while (cur.next != null) {
            if (cur.next.key == key) {
                return true;
            }
            cur = cur.next;
        }
        return false;
    }
}
```

```cpp
class MyHashSet {
private:
    struct ListNode {
        int key;
        ListNode* next;
        ListNode(int k) : key(k), next(nullptr) {}
    };

    vector<ListNode*> set;

    int hash(int key) {
        return key % set.size();
    }

public:
    MyHashSet() {
        set.resize(10000);
        for (auto& bucket : set) {
            bucket = new ListNode(0);
        }
    }

    void add(int key) {
        ListNode* cur = set[hash(key)];
        while (cur->next) {
            if (cur->next->key == key) {
                return;
            }
            cur = cur->next;
        }
        cur->next = new ListNode(key);
    }

    void remove(int key) {
        ListNode* cur = set[hash(key)];
        while (cur->next) {
            if (cur->next->key == key) {
                ListNode* temp = cur->next;
                cur->next = temp->next;
                delete temp;
                return;
            }
            cur = cur->next;
        }
    }

    bool contains(int key) {
        ListNode* cur = set[hash(key)];
        while (cur->next) {
            if (cur->next->key == key) {
                return true;
            }
            cur = cur->next;
        }
        return false;
    }
};
```

```javascript
class ListNode {
    /**
     * @param {number} key
     */
    constructor(key) {
        this.key = key;
        this.next = null;
    }
}

class MyHashSet {
    constructor() {
        this.set = Array.from({ length: 10000 }, () => new ListNode(0));
    }

    /**
     * @param {number} key
     * @return {number}
     */
    hash(key) {
        return key % this.set.length;
    }

    /**
     * @param {number} key
     * @return {void}
     */
    add(key) {
        let cur = this.set[this.hash(key)];
        while (cur.next) {
            if (cur.next.key === key) {
                return;
            }
            cur = cur.next;
        }
        cur.next = new ListNode(key);
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        let cur = this.set[this.hash(key)];
        while (cur.next) {
            if (cur.next.key === key) {
                cur.next = cur.next.next;
                return;
            }
            cur = cur.next;
        }
    }

    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key) {
        let cur = this.set[this.hash(key)];
        while (cur.next) {
            if (cur.next.key === key) {
                return true;
            }
            cur = cur.next;
        }
        return false;
    }
}
```

```csharp
public class ListNode {
    public int Key;
    public ListNode Next;

    public ListNode(int key) {
        Key = key;
        Next = null;
    }
}

public class MyHashSet {
    private ListNode[] set;

    public MyHashSet() {
        set = new ListNode[10000];
        for (int i = 0; i < set.Length; i++) {
            set[i] = new ListNode(0); // Dummy head
        }
    }

    public void Add(int key) {
        ListNode cur = set[key % set.Length];
        while (cur.Next != null) {
            if (cur.Next.Key == key) return;
            cur = cur.Next;
        }
        cur.Next = new ListNode(key);
    }

    public void Remove(int key) {
        ListNode cur = set[key % set.Length];
        while (cur.Next != null) {
            if (cur.Next.Key == key) {
                cur.Next = cur.Next.Next;
                return;
            }
            cur = cur.Next;
        }
    }

    public bool Contains(int key) {
        ListNode cur = set[key % set.Length];
        while (cur.Next != null) {
            if (cur.Next.Key == key) return true;
            cur = cur.Next;
        }
        return false;
    }
}
```

```go
type ListNode struct {
    key  int
    next *ListNode
}

type MyHashSet struct {
    set []*ListNode
}

func Constructor() MyHashSet {
    set := make([]*ListNode, 10000)
    for i := range set {
        set[i] = &ListNode{key: 0}
    }
    return MyHashSet{set: set}
}

func (this *MyHashSet) hash(key int) int {
    return key % len(this.set)
}

func (this *MyHashSet) Add(key int) {
    cur := this.set[this.hash(key)]
    for cur.next != nil {
        if cur.next.key == key {
            return
        }
        cur = cur.next
    }
    cur.next = &ListNode{key: key}
}

func (this *MyHashSet) Remove(key int) {
    cur := this.set[this.hash(key)]
    for cur.next != nil {
        if cur.next.key == key {
            cur.next = cur.next.next
            return
        }
        cur = cur.next
    }
}

func (this *MyHashSet) Contains(key int) bool {
    cur := this.set[this.hash(key)]
    for cur.next != nil {
        if cur.next.key == key {
            return true
        }
        cur = cur.next
    }
    return false
}
```

```kotlin
class ListNode(var key: Int, var next: ListNode? = null)

class MyHashSet() {
    private val set = Array(10000) { ListNode(0) }

    private fun hash(key: Int): Int = key % set.size

    fun add(key: Int) {
        var cur = set[hash(key)]
        while (cur.next != null) {
            if (cur.next!!.key == key) return
            cur = cur.next!!
        }
        cur.next = ListNode(key)
    }

    fun remove(key: Int) {
        var cur = set[hash(key)]
        while (cur.next != null) {
            if (cur.next!!.key == key) {
                cur.next = cur.next!!.next
                return
            }
            cur = cur.next!!
        }
    }

    fun contains(key: Int): Boolean {
        var cur = set[hash(key)]
        while (cur.next != null) {
            if (cur.next!!.key == key) return true
            cur = cur.next!!
        }
        return false
    }
}
```

```swift
class ListNode {
    var key: Int
    var next: ListNode?

    init(_ key: Int) {
        self.key = key
        self.next = nil
    }
}

class MyHashSet {
    private var set: [ListNode]

    init() {
        set = (0..<10000).map { _ in ListNode(0) }
    }

    private func hash(_ key: Int) -> Int {
        return key % set.count
    }

    func add(_ key: Int) {
        var cur = set[hash(key)]
        while cur.next != nil {
            if cur.next!.key == key {
                return
            }
            cur = cur.next!
        }
        cur.next = ListNode(key)
    }

    func remove(_ key: Int) {
        var cur = set[hash(key)]
        while cur.next != nil {
            if cur.next!.key == key {
                cur.next = cur.next!.next
                return
            }
            cur = cur.next!
        }
    }

    func contains(_ key: Int) -> Bool {
        var cur = set[hash(key)]
        while cur.next != nil {
            if cur.next!.key == key {
                return true
            }
            cur = cur.next!
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac{n}{k})$ for each function call.
- Space complexity: $O(k + m)$

> Where $n$ is the number of keys, $k$ is the size of the set ($10000$) and $m$ is the number of unique keys.

---

## 4. Binary Search Tree

### Intuition
Instead of linked lists for collision handling, we can use binary search trees (BSTs) in each bucket. This improves the worst-case time complexity from O(n/k) to O(log(n/k)) for each bucket, since BST operations are logarithmic in the number of nodes. The tradeoff is slightly more complex implementation.

### Algorithm
1. Initialize an array of 10000 buckets, each containing an empty BST.
2. Define `hash(key)` as `key % 10000`.
3. For `add(key)`: If the key is not already in the BST at `hash(key)`, insert it using standard BST insertion.
4. For `remove(key)`: Delete the key from the BST at `hash(key)` using standard BST deletion (finding in-order successor when needed).
5. For `contains(key)`: Search the BST at `hash(key)` and return true if the key is found.

::tabs-start

```python
class TreeNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, root, key):
        if not root:
            return TreeNode(key)
        if key < root.key:
            root.left = self.insert(root.left, key)
        elif key > root.key:
            root.right = self.insert(root.right, key)
        return root

    def delete(self, root, key):
        if not root:
            return None
        if key < root.key:
            root.left = self.delete(root.left, key)
        elif key > root.key:
            root.right = self.delete(root.right, key)
        else:
            if not root.left:
                return root.right
            if not root.right:
                return root.left
            temp = self.minValueNode(root.right)
            root.key = temp.key
            root.right = self.delete(root.right, temp.key)
        return root

    def minValueNode(self, root):
        while root.left:
            root = root.left
        return root

    def search(self, root, key):
        if not root:
            return False
        if key == root.key:
            return True
        elif key < root.key:
            return self.search(root.left, key)
        else:
            return self.search(root.right, key)

    def add(self, key):
        self.root = self.insert(self.root, key)

    def remove(self, key):
        self.root = self.delete(self.root, key)

    def contains(self, key):
        return self.search(self.root, key)

class MyHashSet:
    def __init__(self):
        self.size = 10000
        self.buckets = [BST() for _ in range(self.size)]

    def _hash(self, key):
        return key % self.size

    def add(self, key: int) -> None:
        idx = self._hash(key)
        if not self.contains(key):
            self.buckets[idx].add(key)

    def remove(self, key: int) -> None:
        idx = self._hash(key)
        self.buckets[idx].remove(key)

    def contains(self, key: int) -> bool:
        idx = self._hash(key)
        return self.buckets[idx].contains(key)
```

```java
class TreeNode {
    int key;
    TreeNode left, right;

    TreeNode(int key) {
        this.key = key;
    }
}

class BST {
    private TreeNode root;

    private TreeNode insert(TreeNode node, int key) {
        if (node == null) return new TreeNode(key);
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        return node;
    }

    private TreeNode delete(TreeNode node, int key) {
        if (node == null) return null;
        if (key < node.key) node.left = delete(node.left, key);
        else if (key > node.key) node.right = delete(node.right, key);
        else {
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;
            TreeNode temp = minValueNode(node.right);
            node.key = temp.key;
            node.right = delete(node.right, temp.key);
        }
        return node;
    }

    private TreeNode minValueNode(TreeNode node) {
        while (node.left != null) node = node.left;
        return node;
    }

    private boolean search(TreeNode node, int key) {
        if (node == null) return false;
        if (key == node.key) return true;
        return key < node.key ? search(node.left, key) : search(node.right, key);
    }

    public void add(int key) {
        root = insert(root, key);
    }

    public void remove(int key) {
        root = delete(root, key);
    }

    public boolean contains(int key) {
        return search(root, key);
    }
}

public class MyHashSet {
    private final int size = 10000;
    private BST[] buckets;

    public MyHashSet() {
        buckets = new BST[size];
        for (int i = 0; i < size; i++) {
            buckets[i] = new BST();
        }
    }

    private int hash(int key) {
        return key % size;
    }

    public void add(int key) {
        int idx = hash(key);
        if (!buckets[idx].contains(key)) {
            buckets[idx].add(key);
        }
    }

    public void remove(int key) {
        int idx = hash(key);
        buckets[idx].remove(key);
    }

    public boolean contains(int key) {
        int idx = hash(key);
        return buckets[idx].contains(key);
    }
}
```

```cpp
class BST {
private:
    struct TreeNode {
        int key;
        TreeNode* left;
        TreeNode* right;
        TreeNode(int k) : key(k), left(nullptr), right(nullptr) {}
    };

    TreeNode* insert(TreeNode* root, int key) {
        if (!root) return new TreeNode(key);
        if (key < root->key)
            root->left = insert(root->left, key);
        else if (key > root->key)
            root->right = insert(root->right, key);
        return root;
    }

    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        if (key < root->key)
            root->left = deleteNode(root->left, key);
        else if (key > root->key)
            root->right = deleteNode(root->right, key);
        else {
            if (!root->left) {
                TreeNode* temp = root->right;
                delete root;
                return temp;
            }
            if (!root->right) {
                TreeNode* temp = root->left;
                delete root;
                return temp;
            }
            TreeNode* temp = minValueNode(root->right);
            root->key = temp->key;
            root->right = deleteNode(root->right, temp->key);
        }
        return root;
    }

    TreeNode* minValueNode(TreeNode* root) {
        while (root->left) root = root->left;
        return root;
    }

    bool search(TreeNode* root, int key) {
        if (!root) return false;
        if (key == root->key) return true;
        return key < root->key ? search(root->left, key) : search(root->right, key);
    }

    TreeNode* root;

public:
    BST() : root(nullptr) {}

    void add(int key) {
        root = insert(root, key);
    }

    void remove(int key) {
        root = deleteNode(root, key);
    }

    bool contains(int key) {
        return search(root, key);
    }
};

class MyHashSet {
private:
    const int size = 10000;
    vector<BST> buckets;

    int hash(int key) {
        return key % size;
    }

public:
    MyHashSet() : buckets(size) {}

    void add(int key) {
        int idx = hash(key);
        if (!contains(key)) {
            buckets[idx].add(key);
        }
    }

    void remove(int key) {
        int idx = hash(key);
        buckets[idx].remove(key);
    }

    bool contains(int key) {
        int idx = hash(key);
        return buckets[idx].contains(key);
    }
};
```

```javascript
class TreeNode {
    /**
     * @param {number} key
     */
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    /**
     * @param {number} key
     * @return {void}
     */
    add(key) {
        this.root = this._insert(this.root, key);
    }

    /**
     * @param {TreeNode} node
     * @param {number} key
     * @return {TreeNode}
     */
    _insert(node, key) {
        if (!node) return new TreeNode(key);
        if (key < node.key) node.left = this._insert(node.left, key);
        else if (key > node.key) node.right = this._insert(node.right, key);
        return node;
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        this.root = this._deleteNode(this.root, key);
    }

    /**
     * @param {TreeNode} node
     * @param {number} key
     * @return {TreeNode}
     */
    _deleteNode(node, key) {
        if (!node) return null;
        if (key < node.key) node.left = this._deleteNode(node.left, key);
        else if (key > node.key) node.right = this._deleteNode(node.right, key);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            let minNode = this._minValueNode(node.right);
            node.key = minNode.key;
            node.right = this._deleteNode(node.right, minNode.key);
        }
        return node;
    }

    /**
     * @param {TreeNode} node
     * @return {TreeNode}
     */
    _minValueNode(node) {
        while (node.left) node = node.left;
        return node;
    }

    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key) {
        return this._search(this.root, key);
    }

    /**
     * @param {TreeNode} node
     * @param {number} key
     * @return {boolean}
     */
    _search(node, key) {
        if (!node) return false;
        if (key === node.key) return true;
        if (key < node.key) return this._search(node.left, key);
        return this._search(node.right, key);
    }
}

class MyHashSet {
    constructor() {
        this.size = 10000;
        this.buckets = Array.from({ length: this.size }, () => new BST());
    }

    _hash(key) {
        return key % this.size;
    }

    /**
     * @param {number} key
     * @return {void}
     */
    add(key) {
        const idx = this._hash(key);
        if (!this.buckets[idx].contains(key)) {
            this.buckets[idx].add(key);
        }
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        const idx = this._hash(key);
        this.buckets[idx].remove(key);
    }

    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key) {
        const idx = this._hash(key);
        return this.buckets[idx].contains(key);
    }
}
```

```csharp
public class TreeNode {
    public int Key;
    public TreeNode Left;
    public TreeNode Right;

    public TreeNode(int key) {
        Key = key;
        Left = null;
        Right = null;
    }
}

public class BST {
    public TreeNode Root;

    public TreeNode Insert(TreeNode root, int key) {
        if (root == null) return new TreeNode(key);
        if (key < root.Key)
            root.Left = Insert(root.Left, key);
        else if (key > root.Key)
            root.Right = Insert(root.Right, key);
        return root;
    }

    public TreeNode Delete(TreeNode root, int key) {
        if (root == null) return null;
        if (key < root.Key)
            root.Left = Delete(root.Left, key);
        else if (key > root.Key)
            root.Right = Delete(root.Right, key);
        else {
            if (root.Left == null) return root.Right;
            if (root.Right == null) return root.Left;
            TreeNode temp = MinValueNode(root.Right);
            root.Key = temp.Key;
            root.Right = Delete(root.Right, temp.Key);
        }
        return root;
    }

    private TreeNode MinValueNode(TreeNode root) {
        while (root.Left != null)
            root = root.Left;
        return root;
    }

    public bool Search(TreeNode root, int key) {
        if (root == null) return false;
        if (key == root.Key) return true;
        if (key < root.Key) return Search(root.Left, key);
        return Search(root.Right, key);
    }

    public void Add(int key) {
        Root = Insert(Root, key);
    }

    public void Remove(int key) {
        Root = Delete(Root, key);
    }

    public bool Contains(int key) {
        return Search(Root, key);
    }
}

public class MyHashSet {
    private const int Size = 10000;
    private BST[] buckets;

    public MyHashSet() {
        buckets = new BST[Size];
        for (int i = 0; i < Size; i++) {
            buckets[i] = new BST();
        }
    }

    private int Hash(int key) {
        return key % Size;
    }

    public void Add(int key) {
        int idx = Hash(key);
        if (!Contains(key)) {
            buckets[idx].Add(key);
        }
    }

    public void Remove(int key) {
        int idx = Hash(key);
        buckets[idx].Remove(key);
    }

    public bool Contains(int key) {
        int idx = Hash(key);
        return buckets[idx].Contains(key);
    }
}
```

```go
type TreeNode struct {
    key   int
    left  *TreeNode
    right *TreeNode
}

type BST struct {
    root *TreeNode
}

func (b *BST) insert(node *TreeNode, key int) *TreeNode {
    if node == nil {
        return &TreeNode{key: key}
    }
    if key < node.key {
        node.left = b.insert(node.left, key)
    } else if key > node.key {
        node.right = b.insert(node.right, key)
    }
    return node
}

func (b *BST) deleteNode(node *TreeNode, key int) *TreeNode {
    if node == nil {
        return nil
    }
    if key < node.key {
        node.left = b.deleteNode(node.left, key)
    } else if key > node.key {
        node.right = b.deleteNode(node.right, key)
    } else {
        if node.left == nil {
            return node.right
        }
        if node.right == nil {
            return node.left
        }
        minNode := b.minValueNode(node.right)
        node.key = minNode.key
        node.right = b.deleteNode(node.right, minNode.key)
    }
    return node
}

func (b *BST) minValueNode(node *TreeNode) *TreeNode {
    for node.left != nil {
        node = node.left
    }
    return node
}

func (b *BST) search(node *TreeNode, key int) bool {
    if node == nil {
        return false
    }
    if key == node.key {
        return true
    }
    if key < node.key {
        return b.search(node.left, key)
    }
    return b.search(node.right, key)
}

func (b *BST) Add(key int) {
    b.root = b.insert(b.root, key)
}

func (b *BST) Remove(key int) {
    b.root = b.deleteNode(b.root, key)
}

func (b *BST) Contains(key int) bool {
    return b.search(b.root, key)
}

type MyHashSet struct {
    size    int
    buckets []*BST
}

func Constructor() MyHashSet {
    size := 10000
    buckets := make([]*BST, size)
    for i := range buckets {
        buckets[i] = &BST{}
    }
    return MyHashSet{size: size, buckets: buckets}
}

func (this *MyHashSet) hash(key int) int {
    return key % this.size
}

func (this *MyHashSet) Add(key int) {
    idx := this.hash(key)
    if !this.Contains(key) {
        this.buckets[idx].Add(key)
    }
}

func (this *MyHashSet) Remove(key int) {
    idx := this.hash(key)
    this.buckets[idx].Remove(key)
}

func (this *MyHashSet) Contains(key int) bool {
    idx := this.hash(key)
    return this.buckets[idx].Contains(key)
}
```

```kotlin
class TreeNode(var key: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class BST {
    var root: TreeNode? = null

    private fun insert(node: TreeNode?, key: Int): TreeNode {
        if (node == null) return TreeNode(key)
        if (key < node.key) node.left = insert(node.left, key)
        else if (key > node.key) node.right = insert(node.right, key)
        return node
    }

    private fun delete(node: TreeNode?, key: Int): TreeNode? {
        if (node == null) return null
        if (key < node.key) node.left = delete(node.left, key)
        else if (key > node.key) node.right = delete(node.right, key)
        else {
            if (node.left == null) return node.right
            if (node.right == null) return node.left
            val minNode = minValueNode(node.right!!)
            node.key = minNode.key
            node.right = delete(node.right, minNode.key)
        }
        return node
    }

    private fun minValueNode(node: TreeNode): TreeNode {
        var cur = node
        while (cur.left != null) cur = cur.left!!
        return cur
    }

    private fun search(node: TreeNode?, key: Int): Boolean {
        if (node == null) return false
        if (key == node.key) return true
        return if (key < node.key) search(node.left, key) else search(node.right, key)
    }

    fun add(key: Int) { root = insert(root, key) }
    fun remove(key: Int) { root = delete(root, key) }
    fun contains(key: Int): Boolean = search(root, key)
}

class MyHashSet() {
    private val size = 10000
    private val buckets = Array(size) { BST() }

    private fun hash(key: Int): Int = key % size

    fun add(key: Int) {
        val idx = hash(key)
        if (!contains(key)) buckets[idx].add(key)
    }

    fun remove(key: Int) {
        buckets[hash(key)].remove(key)
    }

    fun contains(key: Int): Boolean {
        return buckets[hash(key)].contains(key)
    }
}
```

```swift
class TreeNode {
    var key: Int
    var left: TreeNode?
    var right: TreeNode?
    init(_ key: Int) { self.key = key }
}

class BST {
    var root: TreeNode?

    func insert(_ node: TreeNode?, _ key: Int) -> TreeNode {
        guard let node = node else { return TreeNode(key) }
        if key < node.key { node.left = insert(node.left, key) }
        else if key > node.key { node.right = insert(node.right, key) }
        return node
    }

    func delete(_ node: TreeNode?, _ key: Int) -> TreeNode? {
        guard let node = node else { return nil }
        if key < node.key { node.left = delete(node.left, key) }
        else if key > node.key { node.right = delete(node.right, key) }
        else {
            if node.left == nil { return node.right }
            if node.right == nil { return node.left }
            let minNode = minValueNode(node.right!)
            node.key = minNode.key
            node.right = delete(node.right, minNode.key)
        }
        return node
    }

    func minValueNode(_ node: TreeNode) -> TreeNode {
        var cur = node
        while cur.left != nil { cur = cur.left! }
        return cur
    }

    func search(_ node: TreeNode?, _ key: Int) -> Bool {
        guard let node = node else { return false }
        if key == node.key { return true }
        return key < node.key ? search(node.left, key) : search(node.right, key)
    }

    func add(_ key: Int) { root = insert(root, key) }
    func remove(_ key: Int) { root = delete(root, key) }
    func contains(_ key: Int) -> Bool { return search(root, key) }
}

class MyHashSet {
    private let size = 10000
    private var buckets: [BST]

    init() {
        buckets = (0..<size).map { _ in BST() }
    }

    private func hash(_ key: Int) -> Int { return key % size }

    func add(_ key: Int) {
        let idx = hash(key)
        if !contains(key) { buckets[idx].add(key) }
    }

    func remove(_ key: Int) {
        buckets[hash(key)].remove(key)
    }

    func contains(_ key: Int) -> Bool {
        return buckets[hash(key)].contains(key)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log (\frac{n}{k}))$ in average case, $O(\frac{n}{k})$ in worst case for each function call.
- Space complexity: $O(k + m)$

> Where $n$ is the number of keys, $k$ is the size of the set ($10000$) and $m$ is the number of unique keys.

---

## 5. Bit Manipulation

### Intuition
We can compress the boolean array approach by using individual bits instead of booleans. Each integer stores 32 bits, so we need only about 31251 integers to cover 1000000+ keys. We use bit operations to set, clear, and check individual bits. This reduces memory usage by a factor of 32 compared to a boolean array.

### Algorithm
1. Initialize an integer array of size 31251 (since 31251 * 32 = 1000032 covers all keys).
2. Define `getMask(key)` as `1 << (key % 32)` to create a bitmask for the key's position within its integer.
3. For `add(key)`: Set the bit using `set[key / 32] |= getMask(key)`.
4. For `remove(key)`: If the key exists, toggle the bit using `set[key / 32] ^= getMask(key)`.
5. For `contains(key)`: Return true if `set[key / 32] & getMask(key)` is non-zero.

::tabs-start

```python
class MyHashSet:

    def __init__(self):
        # key is in the range [1, 1000000]
        # 31251 * 32 = 1000032
        self.set = [0] * 31251

    def add(self, key: int) -> None:
        self.set[key // 32] |= self.getMask(key)

    def remove(self, key: int) -> None:
        if self.contains(key):
            self.set[key // 32] ^= self.getMask(key)

    def contains(self, key: int) -> bool:
        return self.set[key // 32] & self.getMask(key) != 0

    def getMask(self, key: int) -> int:
        return 1 << (key % 32)
```

```java
public class MyHashSet {
    private int[] set;

    public MyHashSet() {
        // key is in the range [1, 1000000]
        // 31251 * 32 = 1000032
        set = new int[31251];
    }

    public void add(int key) {
        set[key / 32] |= getMask(key);
    }

    public void remove(int key) {
        if (contains(key)) {
            set[key / 32] ^= getMask(key);
        }
    }

    public boolean contains(int key) {
        return (set[key / 32] & getMask(key)) != 0;
    }

    private int getMask(int key) {
        return 1 << (key % 32);
    }
}
```

```cpp
class MyHashSet {
private:
    int set[31251];

    int getMask(int key) {
        return 1 << (key % 32);
    }

public:
    MyHashSet() {
        // key is in the range [1, 1000000]
        // 31251 * 32 = 1000032
        memset(set, 0, sizeof(set));
    }

    void add(int key) {
        set[key / 32] |= getMask(key);
    }

    void remove(int key) {
        if (contains(key)) {
            set[key / 32] ^= getMask(key);
        }
    }

    bool contains(int key) {
        return (set[key / 32] & getMask(key)) != 0;
    }
};
```

```javascript
class MyHashSet {
    constructor() {
        // key is in the range [1, 1000000]
        // 31251 * 32 = 1000032
        this.set = new Array(31251).fill(0);
    }

    /**
     * @param {number} key
     * @return {void}
     */
    add(key) {
        this.set[Math.floor(key / 32)] |= this.getMask(key);
    }

    /**
     * @param {number} key
     * @return {void}
     */
    remove(key) {
        if (this.contains(key)) {
            this.set[Math.floor(key / 32)] ^= this.getMask(key);
        }
    }

    /**
     * @param {number} key
     * @return {boolean}
     */
    contains(key) {
        return (this.set[Math.floor(key / 32)] & this.getMask(key)) !== 0;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    getMask(key) {
        return 1 << key % 32;
    }
}
```

```csharp
public class MyHashSet {
    private int[] set;

    public MyHashSet() {
        // key is in the range [1, 1000000]
        // 31251 * 32 = 1000032
        set = new int[31251];
    }

    public void Add(int key) {
        set[key / 32] |= GetMask(key);
    }

    public void Remove(int key) {
        if (Contains(key)) {
            set[key / 32] ^= GetMask(key);
        }
    }

    public bool Contains(int key) {
        return (set[key / 32] & GetMask(key)) != 0;
    }

    private int GetMask(int key) {
        return 1 << (key % 32);
    }
}
```

```go
type MyHashSet struct {
    set []int
}

func Constructor() MyHashSet {
    // key is in the range [1, 1000000]
    // 31251 * 32 = 1000032
    return MyHashSet{set: make([]int, 31251)}
}

func (this *MyHashSet) getMask(key int) int {
    return 1 << (key % 32)
}

func (this *MyHashSet) Add(key int) {
    this.set[key/32] |= this.getMask(key)
}

func (this *MyHashSet) Remove(key int) {
    if this.Contains(key) {
        this.set[key/32] ^= this.getMask(key)
    }
}

func (this *MyHashSet) Contains(key int) bool {
    return (this.set[key/32] & this.getMask(key)) != 0
}
```

```kotlin
class MyHashSet() {
    // key is in the range [1, 1000000]
    // 31251 * 32 = 1000032
    private val set = IntArray(31251)

    private fun getMask(key: Int): Int = 1 shl (key % 32)

    fun add(key: Int) {
        set[key / 32] = set[key / 32] or getMask(key)
    }

    fun remove(key: Int) {
        if (contains(key)) {
            set[key / 32] = set[key / 32] xor getMask(key)
        }
    }

    fun contains(key: Int): Boolean {
        return (set[key / 32] and getMask(key)) != 0
    }
}
```

```swift
class MyHashSet {
    // key is in the range [1, 1000000]
    // 31251 * 32 = 1000032
    private var set: [Int]

    init() {
        set = [Int](repeating: 0, count: 31251)
    }

    private func getMask(_ key: Int) -> Int {
        return 1 << (key % 32)
    }

    func add(_ key: Int) {
        set[key / 32] |= getMask(key)
    }

    func remove(_ key: Int) {
        if contains(key) {
            set[key / 32] ^= getMask(key)
        }
    }

    func contains(_ key: Int) -> Bool {
        return (set[key / 32] & getMask(key)) != 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(k)$

> Where $k$ is the size of the set $(31251)$.
