## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ for each function call.
- Space complexity: $O(n)$

---

## 2. Boolean Array

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(1000000)$ since the key is in the range $[0, 1000000]$.

---

## 3. Linked List

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac{n}{k})$ for each function call.
- Space complexity: $O(k + m)$

> Where $n$ is the number of keys, $k$ is the size of the set ($10000$) and $m$ is the number of unique keys.

---

## 4. Binary Search Tree

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log (\frac{n}{k}))$ in average case, $O(\frac{n}{k})$ in worst case for each function call.
- Space complexity: $O(k + m)$

> Where $n$ is the number of keys, $k$ is the size of the set ($10000$) and $m$ is the number of unique keys.

---

## 5. Bit Manipulation

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ for each function call.
- Space complexity: $O(k)$

> Where $k$ is the size of the set $(31251)$.
