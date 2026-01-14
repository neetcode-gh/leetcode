## 1. Depth First Search

### Intuition

We need to simulate a locking system on a tree structure. The key insight is that `lock` and `unlock` are simple O(1) operations since they only check and modify a single node. The `upgrade` operation is more complex: it requires checking all ancestors (no locks allowed) and all descendants (at least one lock required, then unlock all).

For the ancestor check, we traverse up the parent chain. For the descendant check and unlock, we use `dfs` to visit all nodes in the subtree, counting and clearing any locks.

### Algorithm

1. **Initialization**: Build a child adjacency list from the parent array and create a locked array to track which user (if any) has locked each node.
2. **lock(num, user)**: If the node is unlocked (`locked[num] == 0`), set `locked[num] = user` and return `true`. Otherwise return `false`.
3. **unlock(num, user)**: If `locked[num]` equals `user`, set it to `0` and return `true`. Otherwise return `false`.
4. **upgrade(num, user)**:
   - Walk up the parent chain from `num`. If any ancestor is locked, return `false`.
   - Run `dfs` on the subtree rooted at `num`: count locked descendants and unlock them.
   - If at least one descendant was locked, lock `num` with `user` and return `true`. Otherwise return `false`.

::tabs-start

```python
class LockingTree:

    def __init__(self, parent: List[int]):
        self.parent = parent
        self.child = [[] for _ in range(len(parent))]
        self.locked = [0] * len(parent)
        for node in range(1, len(parent)):
            self.child[parent[node]].append(node)

    def lock(self, num: int, user: int) -> bool:
        if self.locked[num]:
            return False
        self.locked[num] = user
        return True

    def unlock(self, num: int, user: int) -> bool:
        if self.locked[num] != user:
            return False
        self.locked[num] = 0
        return True

    def upgrade(self, num: int, user: int) -> bool:
        node = num
        while node != -1:
            if self.locked[node]:
                return False
            node = self.parent[node]

        def dfs(node):
            lockedCount = 0
            if self.locked[node]:
                lockedCount += 1
                self.locked[node] = 0

            for nei in self.child[node]:
                lockedCount += dfs(nei)
            return lockedCount

        if dfs(num) > 0:
            self.locked[num] = user
            return True
        return False
```

```java
public class LockingTree {
    private int[] parent;
    private List<Integer>[] child;
    private int[] locked;

    public LockingTree(int[] parent) {
        this.parent = parent;
        int n = parent.length;
        child = new ArrayList[n];
        locked = new int[n];

        for (int i = 0; i < n; i++) {
            child[i] = new ArrayList<>();
        }
        for (int node = 1; node < n; node++) {
            child[parent[node]].add(node);
        }
    }

    public boolean lock(int num, int user) {
        if (locked[num] != 0) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    public boolean unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    public boolean upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node] != 0) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = dfs(num);
        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }

    private int dfs(int node) {
        int lockedCount = 0;
        if (locked[node] != 0) {
            lockedCount++;
            locked[node] = 0;
        }
        for (int nei : child[node]) {
            lockedCount += dfs(nei);
        }
        return lockedCount;
    }
}
```

```cpp
class LockingTree {
private:
    vector<int> parent;
    vector<vector<int>> child;
    vector<int> locked;

public:
    LockingTree(vector<int>& parent) : parent(parent), locked(parent.size()) {
        int n = parent.size();
        child.resize(n);
        for (int node = 1; node < n; node++) {
            child[parent[node]].push_back(node);
        }
    }

    bool lock(int num, int user) {
        if (locked[num]) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    bool unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    bool upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node]) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = dfs(num);
        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }

private:
    int dfs(int node) {
        int lockedCount = 0;
        if (locked[node]) {
            lockedCount++;
            locked[node] = 0;
        }
        for (int& nei : child[node]) {
            lockedCount += dfs(nei);
        }
        return lockedCount;
    }
};
```

```javascript
class LockingTree {
    /**
     * @constructor
     * @param {number[]} parent
     */
    constructor(parent) {
        this.parent = parent;
        this.child = Array.from({ length: parent.length }, () => []);
        this.locked = new Array(parent.length).fill(0);

        for (let node = 1; node < parent.length; node++) {
            this.child[parent[node]].push(node);
        }
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    lock(num, user) {
        if (this.locked[num] !== 0) {
            return false;
        }
        this.locked[num] = user;
        return true;
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    unlock(num, user) {
        if (this.locked[num] !== user) {
            return false;
        }
        this.locked[num] = 0;
        return true;
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    upgrade(num, user) {
        let node = num;
        while (node !== -1) {
            if (this.locked[node] !== 0) {
                return false;
            }
            node = this.parent[node];
        }

        const dfs = (node) => {
            let lockedCount = 0;
            if (this.locked[node] !== 0) {
                lockedCount++;
                this.locked[node] = 0;
            }
            for (let nei of this.child[node]) {
                lockedCount += dfs(nei);
            }
            return lockedCount;
        };

        if (dfs(num) > 0) {
            this.locked[num] = user;
            return true;
        }
        return false;
    }
}
```

```csharp
public class LockingTree {
    private int[] parent;
    private List<int>[] child;
    private int[] locked;

    public LockingTree(int[] parent) {
        this.parent = parent;
        int n = parent.Length;
        child = new List<int>[n];
        locked = new int[n];

        for (int i = 0; i < n; i++) {
            child[i] = new List<int>();
        }
        for (int node = 1; node < n; node++) {
            child[parent[node]].Add(node);
        }
    }

    public bool Lock(int num, int user) {
        if (locked[num] != 0) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    public bool Unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    public bool Upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node] != 0) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = Dfs(num);
        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }

    private int Dfs(int node) {
        int lockedCount = 0;
        if (locked[node] != 0) {
            lockedCount++;
            locked[node] = 0;
        }
        foreach (int nei in child[node]) {
            lockedCount += Dfs(nei);
        }
        return lockedCount;
    }
}
```

```go
type LockingTree struct {
    parent []int
    child  [][]int
    locked []int
}

func Constructor(parent []int) LockingTree {
    n := len(parent)
    child := make([][]int, n)
    for i := range child {
        child[i] = []int{}
    }
    for node := 1; node < n; node++ {
        child[parent[node]] = append(child[parent[node]], node)
    }
    return LockingTree{
        parent: parent,
        child:  child,
        locked: make([]int, n),
    }
}

func (this *LockingTree) Lock(num int, user int) bool {
    if this.locked[num] != 0 {
        return false
    }
    this.locked[num] = user
    return true
}

func (this *LockingTree) Unlock(num int, user int) bool {
    if this.locked[num] != user {
        return false
    }
    this.locked[num] = 0
    return true
}

func (this *LockingTree) Upgrade(num int, user int) bool {
    node := num
    for node != -1 {
        if this.locked[node] != 0 {
            return false
        }
        node = this.parent[node]
    }

    var dfs func(node int) int
    dfs = func(node int) int {
        lockedCount := 0
        if this.locked[node] != 0 {
            lockedCount++
            this.locked[node] = 0
        }
        for _, nei := range this.child[node] {
            lockedCount += dfs(nei)
        }
        return lockedCount
    }

    if dfs(num) > 0 {
        this.locked[num] = user
        return true
    }
    return false
}
```

```kotlin
class LockingTree(private val parent: IntArray) {
    private val child: Array<MutableList<Int>> = Array(parent.size) { mutableListOf() }
    private val locked = IntArray(parent.size)

    init {
        for (node in 1 until parent.size) {
            child[parent[node]].add(node)
        }
    }

    fun lock(num: Int, user: Int): Boolean {
        if (locked[num] != 0) {
            return false
        }
        locked[num] = user
        return true
    }

    fun unlock(num: Int, user: Int): Boolean {
        if (locked[num] != user) {
            return false
        }
        locked[num] = 0
        return true
    }

    fun upgrade(num: Int, user: Int): Boolean {
        var node = num
        while (node != -1) {
            if (locked[node] != 0) {
                return false
            }
            node = parent[node]
        }

        val lockedCount = dfs(num)
        if (lockedCount > 0) {
            locked[num] = user
            return true
        }
        return false
    }

    private fun dfs(node: Int): Int {
        var lockedCount = 0
        if (locked[node] != 0) {
            lockedCount++
            locked[node] = 0
        }
        for (nei in child[node]) {
            lockedCount += dfs(nei)
        }
        return lockedCount
    }
}
```

```swift
class LockingTree {
    private var parent: [Int]
    private var child: [[Int]]
    private var locked: [Int]

    init(_ parent: [Int]) {
        self.parent = parent
        let n = parent.count
        self.child = Array(repeating: [Int](), count: n)
        self.locked = Array(repeating: 0, count: n)

        for node in 1..<n {
            self.child[parent[node]].append(node)
        }
    }

    func lock(_ num: Int, _ user: Int) -> Bool {
        if locked[num] != 0 {
            return false
        }
        locked[num] = user
        return true
    }

    func unlock(_ num: Int, _ user: Int) -> Bool {
        if locked[num] != user {
            return false
        }
        locked[num] = 0
        return true
    }

    func upgrade(_ num: Int, _ user: Int) -> Bool {
        var node = num
        while node != -1 {
            if locked[node] != 0 {
                return false
            }
            node = parent[node]
        }

        func dfs(_ node: Int) -> Int {
            var lockedCount = 0
            if locked[node] != 0 {
                lockedCount += 1
                locked[node] = 0
            }
            for nei in child[node] {
                lockedCount += dfs(nei)
            }
            return lockedCount
        }

        if dfs(num) > 0 {
            locked[num] = user
            return true
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $lock()$ and $unlock()$ function call.
    - $O(n)$ time for each $upgrade()$ function call.
- Space complexity: $O(n)$

---

## 2. Breadth First Search

### Intuition

This solution replaces the recursive `dfs` for the descendant traversal with an iterative BFS using a queue. The logic remains identical: `lock` and `unlock` are O(1) operations, while `upgrade` requires ancestor and descendant checks.

BFS processes nodes level by level, which can be more cache-friendly in some cases and avoids potential stack overflow issues with very deep trees.

### Algorithm

1. **Initialization**: Same as `dfs`, build child lists and initialize the locked array.
2. **lock** and **unlock**: Same O(1) checks and updates.
3. **upgrade(num, user)**:
   - Check ancestors by walking up the parent chain.
   - Use a queue to traverse all descendants, counting and unlocking any locked nodes.
   - If `lockedCount > 0`, lock `num` for `user` and return `true`.

::tabs-start

```python
class LockingTree:

    def __init__(self, parent: List[int]):
        self.parent = parent
        self.child = [[] for _ in range(len(parent))]
        self.locked = [0] * len(parent)
        for node in range(1, len(parent)):
            self.child[parent[node]].append(node)

    def lock(self, num: int, user: int) -> bool:
        if self.locked[num]:
            return False
        self.locked[num] = user
        return True

    def unlock(self, num: int, user: int) -> bool:
        if self.locked[num] != user:
            return False
        self.locked[num] = 0
        return True

    def upgrade(self, num: int, user: int) -> bool:
        node = num
        while node != -1:
            if self.locked[node]:
                return False
            node = self.parent[node]

        lockedCount, q = 0, deque([num])
        while q:
            node = q.popleft()
            if self.locked[node]:
                self.locked[node] = 0
                lockedCount += 1
            q.extend(self.child[node])

        if lockedCount:
            self.locked[num] = user
            return True
        return False
```

```java
public class LockingTree {
    private int[] parent;
    private List<Integer>[] child;
    private int[] locked;

    public LockingTree(int[] parent) {
        this.parent = parent;
        int n = parent.length;
        child = new ArrayList[n];
        locked = new int[n];

        for (int i = 0; i < n; i++) {
            child[i] = new ArrayList<>();
        }
        for (int node = 1; node < n; node++) {
            child[parent[node]].add(node);
        }
    }

    public boolean lock(int num, int user) {
        if (locked[num] != 0) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    public boolean unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    public boolean upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node] != 0) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = 0;
        Queue<Integer> q = new LinkedList<>();
        q.offer(num);

        while (!q.isEmpty()) {
            node = q.poll();
            if (locked[node] != 0) {
                locked[node] = 0;
                lockedCount++;
            }
            q.addAll(child[node]);
        }

        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }
}
```

```cpp
class LockingTree {
private:
    vector<int> parent;
    vector<vector<int>> child;
    vector<int> locked;

public:
    LockingTree(vector<int>& parent) : parent(parent), locked(parent.size()) {
        int n = parent.size();
        child.resize(n);
        for (int node = 1; node < n; node++) {
            child[parent[node]].push_back(node);
        }
    }

    bool lock(int num, int user) {
        if (locked[num]) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    bool unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    bool upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node]) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = 0;
        queue<int> q;
        q.push(num);

        while (!q.empty()) {
            node = q.front(); q.pop();
            if (locked[node]) {
                locked[node] = 0;
                lockedCount++;
            }
            for (int nei : child[node]) {
                q.push(nei);
            }
        }

        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }
};
```

```javascript
class LockingTree {
    /**
     * @constructor
     * @param {number[]} parent
     */
    constructor(parent) {
        this.parent = parent;
        this.child = Array.from({ length: parent.length }, () => []);
        this.locked = new Array(parent.length).fill(0);

        for (let node = 1; node < parent.length; node++) {
            this.child[parent[node]].push(node);
        }
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    lock(num, user) {
        if (this.locked[num] !== 0) {
            return false;
        }
        this.locked[num] = user;
        return true;
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    unlock(num, user) {
        if (this.locked[num] !== user) {
            return false;
        }
        this.locked[num] = 0;
        return true;
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    upgrade(num, user) {
        let node = num;
        while (node !== -1) {
            if (this.locked[node] !== 0) {
                return false;
            }
            node = this.parent[node];
        }

        let lockedCount = 0;
        const q = new Queue([num]);

        while (!q.isEmpty()) {
            node = q.pop();
            if (this.locked[node]) {
                this.locked[node] = 0;
                lockedCount++;
            }
            for (let nei of this.child[node]) {
                q.push(nei);
            }
        }

        if (lockedCount > 0) {
            this.locked[num] = user;
            return true;
        }
        return false;
    }
}
```

```csharp
public class LockingTree {
    private int[] parent;
    private List<int>[] child;
    private int[] locked;

    public LockingTree(int[] parent) {
        this.parent = parent;
        int n = parent.Length;
        child = new List<int>[n];
        locked = new int[n];

        for (int i = 0; i < n; i++) {
            child[i] = new List<int>();
        }
        for (int node = 1; node < n; node++) {
            child[parent[node]].Add(node);
        }
    }

    public bool Lock(int num, int user) {
        if (locked[num] != 0) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    public bool Unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    public bool Upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node] != 0) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = 0;
        Queue<int> q = new Queue<int>();
        q.Enqueue(num);

        while (q.Count > 0) {
            node = q.Dequeue();
            if (locked[node] != 0) {
                locked[node] = 0;
                lockedCount++;
            }
            foreach (int nei in child[node]) {
                q.Enqueue(nei);
            }
        }

        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }
}
```

```go
type LockingTree struct {
    parent []int
    child  [][]int
    locked []int
}

func Constructor(parent []int) LockingTree {
    n := len(parent)
    child := make([][]int, n)
    for i := range child {
        child[i] = []int{}
    }
    for node := 1; node < n; node++ {
        child[parent[node]] = append(child[parent[node]], node)
    }
    return LockingTree{
        parent: parent,
        child:  child,
        locked: make([]int, n),
    }
}

func (this *LockingTree) Lock(num int, user int) bool {
    if this.locked[num] != 0 {
        return false
    }
    this.locked[num] = user
    return true
}

func (this *LockingTree) Unlock(num int, user int) bool {
    if this.locked[num] != user {
        return false
    }
    this.locked[num] = 0
    return true
}

func (this *LockingTree) Upgrade(num int, user int) bool {
    node := num
    for node != -1 {
        if this.locked[node] != 0 {
            return false
        }
        node = this.parent[node]
    }

    lockedCount := 0
    q := []int{num}

    for len(q) > 0 {
        node = q[0]
        q = q[1:]
        if this.locked[node] != 0 {
            this.locked[node] = 0
            lockedCount++
        }
        q = append(q, this.child[node]...)
    }

    if lockedCount > 0 {
        this.locked[num] = user
        return true
    }
    return false
}
```

```kotlin
class LockingTree(private val parent: IntArray) {
    private val child: Array<MutableList<Int>> = Array(parent.size) { mutableListOf() }
    private val locked = IntArray(parent.size)

    init {
        for (node in 1 until parent.size) {
            child[parent[node]].add(node)
        }
    }

    fun lock(num: Int, user: Int): Boolean {
        if (locked[num] != 0) {
            return false
        }
        locked[num] = user
        return true
    }

    fun unlock(num: Int, user: Int): Boolean {
        if (locked[num] != user) {
            return false
        }
        locked[num] = 0
        return true
    }

    fun upgrade(num: Int, user: Int): Boolean {
        var node = num
        while (node != -1) {
            if (locked[node] != 0) {
                return false
            }
            node = parent[node]
        }

        var lockedCount = 0
        val q = ArrayDeque<Int>()
        q.add(num)

        while (q.isNotEmpty()) {
            node = q.removeFirst()
            if (locked[node] != 0) {
                locked[node] = 0
                lockedCount++
            }
            q.addAll(child[node])
        }

        if (lockedCount > 0) {
            locked[num] = user
            return true
        }
        return false
    }
}
```

```swift
class LockingTree {
    private var parent: [Int]
    private var child: [[Int]]
    private var locked: [Int]

    init(_ parent: [Int]) {
        self.parent = parent
        let n = parent.count
        self.child = Array(repeating: [Int](), count: n)
        self.locked = Array(repeating: 0, count: n)

        for node in 1..<n {
            self.child[parent[node]].append(node)
        }
    }

    func lock(_ num: Int, _ user: Int) -> Bool {
        if locked[num] != 0 {
            return false
        }
        locked[num] = user
        return true
    }

    func unlock(_ num: Int, _ user: Int) -> Bool {
        if locked[num] != user {
            return false
        }
        locked[num] = 0
        return true
    }

    func upgrade(_ num: Int, _ user: Int) -> Bool {
        var node = num
        while node != -1 {
            if locked[node] != 0 {
                return false
            }
            node = parent[node]
        }

        var lockedCount = 0
        var q = [num]

        while !q.isEmpty {
            node = q.removeFirst()
            if locked[node] != 0 {
                locked[node] = 0
                lockedCount += 1
            }
            q.append(contentsOf: child[node])
        }

        if lockedCount > 0 {
            locked[num] = user
            return true
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $lock()$ and $unlock()$ function call.
    - $O(n)$ time for each $upgrade()$ function call.
- Space complexity: $O(n)$

---

## 3. Iterative DFS

### Intuition

This approach converts the recursive `dfs` into an iterative version using an explicit stack. This is useful when you want to avoid recursion overhead or potential stack overflow on very large trees, while maintaining the depth-first traversal order.

The core logic for all three operations remains unchanged from the recursive `dfs` solution.

### Algorithm

1. **Initialization**: Build child adjacency lists and initialize the locked array.
2. **lock** and **unlock**: Same O(1) checks.
3. **upgrade(num, user)**:
   - Traverse ancestors to ensure none are locked.
   - Use a stack to perform iterative `dfs` on descendants.
   - Pop nodes, check if locked, unlock if so, and push children.
   - If any descendants were locked, lock `num` and return `true`.

::tabs-start

```python
class LockingTree:

    def __init__(self, parent: List[int]):
        self.parent = parent
        self.child = [[] for _ in range(len(parent))]
        self.locked = [0] * len(parent)
        for node in range(1, len(parent)):
            self.child[parent[node]].append(node)

    def lock(self, num: int, user: int) -> bool:
        if self.locked[num]:
            return False
        self.locked[num] = user
        return True

    def unlock(self, num: int, user: int) -> bool:
        if self.locked[num] != user:
            return False
        self.locked[num] = 0
        return True

    def upgrade(self, num: int, user: int) -> bool:
        node = num
        while node != -1:
            if self.locked[node]:
                return False
            node = self.parent[node]

        lockedCount, stack = 0, [num]
        while stack:
            node = stack.pop()
            if self.locked[node]:
                self.locked[node] = 0
                lockedCount += 1
            stack.extend(self.child[node])

        if lockedCount:
            self.locked[num] = user
            return True
        return False
```

```java
public class LockingTree {
    private int[] parent;
    private List<Integer>[] child;
    private int[] locked;

    public LockingTree(int[] parent) {
        this.parent = parent;
        int n = parent.length;
        child = new ArrayList[n];
        locked = new int[n];

        for (int i = 0; i < n; i++) {
            child[i] = new ArrayList<>();
        }
        for (int node = 1; node < n; node++) {
            child[parent[node]].add(node);
        }
    }

    public boolean lock(int num, int user) {
        if (locked[num] != 0) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    public boolean unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    public boolean upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node] != 0) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = 0;
        Stack<Integer> stack = new Stack<>();
        stack.push(num);

        while (!stack.isEmpty()) {
            node = stack.pop();
            if (locked[node] != 0) {
                locked[node] = 0;
                lockedCount++;
            }
            for (int nei : child[node]) {
                stack.push(nei);
            }
        }

        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }
}
```

```cpp
class LockingTree {
private:
    vector<int> parent;
    vector<vector<int>> child;
    vector<int> locked;

public:
    LockingTree(vector<int>& parent) : parent(parent), locked(parent.size()) {
        int n = parent.size();
        child.resize(n);
        for (int node = 1; node < n; node++) {
            child[parent[node]].push_back(node);
        }
    }

    bool lock(int num, int user) {
        if (locked[num]) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    bool unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    bool upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node]) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = 0;
        stack<int> stk;
        stk.push(num);

        while (!stk.empty()) {
            node = stk.top(); stk.pop();
            if (locked[node]) {
                locked[node] = 0;
                lockedCount++;
            }
            for (int& nei : child[node]) {
                stk.push(nei);
            }
        }

        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }
};
```

```javascript
class LockingTree {
    /**
     * @constructor
     * @param {number[]} parent
     */
    constructor(parent) {
        this.parent = parent;
        this.child = Array.from({ length: parent.length }, () => []);
        this.locked = new Array(parent.length).fill(0);

        for (let node = 1; node < parent.length; node++) {
            this.child[parent[node]].push(node);
        }
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    lock(num, user) {
        if (this.locked[num] !== 0) {
            return false;
        }
        this.locked[num] = user;
        return true;
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    unlock(num, user) {
        if (this.locked[num] !== user) {
            return false;
        }
        this.locked[num] = 0;
        return true;
    }

    /**
     * @param {number} num
     * @param {number} user
     * @return {boolean}
     */
    upgrade(num, user) {
        let node = num;
        while (node !== -1) {
            if (this.locked[node] !== 0) {
                return false;
            }
            node = this.parent[node];
        }

        let lockedCount = 0;
        let stack = [num];

        while (stack.length) {
            node = stack.pop();
            if (this.locked[node]) {
                this.locked[node] = 0;
                lockedCount++;
            }
            stack.push(...this.child[node]);
        }

        if (lockedCount > 0) {
            this.locked[num] = user;
            return true;
        }
        return false;
    }
}
```

```csharp
public class LockingTree {
    private int[] parent;
    private List<int>[] child;
    private int[] locked;

    public LockingTree(int[] parent) {
        this.parent = parent;
        int n = parent.Length;
        child = new List<int>[n];
        locked = new int[n];

        for (int i = 0; i < n; i++) {
            child[i] = new List<int>();
        }
        for (int node = 1; node < n; node++) {
            child[parent[node]].Add(node);
        }
    }

    public bool Lock(int num, int user) {
        if (locked[num] != 0) {
            return false;
        }
        locked[num] = user;
        return true;
    }

    public bool Unlock(int num, int user) {
        if (locked[num] != user) {
            return false;
        }
        locked[num] = 0;
        return true;
    }

    public bool Upgrade(int num, int user) {
        int node = num;
        while (node != -1) {
            if (locked[node] != 0) {
                return false;
            }
            node = parent[node];
        }

        int lockedCount = 0;
        Stack<int> stack = new Stack<int>();
        stack.Push(num);

        while (stack.Count > 0) {
            node = stack.Pop();
            if (locked[node] != 0) {
                locked[node] = 0;
                lockedCount++;
            }
            foreach (int nei in child[node]) {
                stack.Push(nei);
            }
        }

        if (lockedCount > 0) {
            locked[num] = user;
            return true;
        }
        return false;
    }
}
```

```go
type LockingTree struct {
    parent []int
    child  [][]int
    locked []int
}

func Constructor(parent []int) LockingTree {
    n := len(parent)
    child := make([][]int, n)
    for i := range child {
        child[i] = []int{}
    }
    for node := 1; node < n; node++ {
        child[parent[node]] = append(child[parent[node]], node)
    }
    return LockingTree{
        parent: parent,
        child:  child,
        locked: make([]int, n),
    }
}

func (this *LockingTree) Lock(num int, user int) bool {
    if this.locked[num] != 0 {
        return false
    }
    this.locked[num] = user
    return true
}

func (this *LockingTree) Unlock(num int, user int) bool {
    if this.locked[num] != user {
        return false
    }
    this.locked[num] = 0
    return true
}

func (this *LockingTree) Upgrade(num int, user int) bool {
    node := num
    for node != -1 {
        if this.locked[node] != 0 {
            return false
        }
        node = this.parent[node]
    }

    lockedCount := 0
    stack := []int{num}

    for len(stack) > 0 {
        node = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        if this.locked[node] != 0 {
            this.locked[node] = 0
            lockedCount++
        }
        stack = append(stack, this.child[node]...)
    }

    if lockedCount > 0 {
        this.locked[num] = user
        return true
    }
    return false
}
```

```kotlin
class LockingTree(private val parent: IntArray) {
    private val child: Array<MutableList<Int>> = Array(parent.size) { mutableListOf() }
    private val locked = IntArray(parent.size)

    init {
        for (node in 1 until parent.size) {
            child[parent[node]].add(node)
        }
    }

    fun lock(num: Int, user: Int): Boolean {
        if (locked[num] != 0) {
            return false
        }
        locked[num] = user
        return true
    }

    fun unlock(num: Int, user: Int): Boolean {
        if (locked[num] != user) {
            return false
        }
        locked[num] = 0
        return true
    }

    fun upgrade(num: Int, user: Int): Boolean {
        var node = num
        while (node != -1) {
            if (locked[node] != 0) {
                return false
            }
            node = parent[node]
        }

        var lockedCount = 0
        val stack = ArrayDeque<Int>()
        stack.add(num)

        while (stack.isNotEmpty()) {
            node = stack.removeLast()
            if (locked[node] != 0) {
                locked[node] = 0
                lockedCount++
            }
            stack.addAll(child[node])
        }

        if (lockedCount > 0) {
            locked[num] = user
            return true
        }
        return false
    }
}
```

```swift
class LockingTree {
    private var parent: [Int]
    private var child: [[Int]]
    private var locked: [Int]

    init(_ parent: [Int]) {
        self.parent = parent
        let n = parent.count
        self.child = Array(repeating: [Int](), count: n)
        self.locked = Array(repeating: 0, count: n)

        for node in 1..<n {
            self.child[parent[node]].append(node)
        }
    }

    func lock(_ num: Int, _ user: Int) -> Bool {
        if locked[num] != 0 {
            return false
        }
        locked[num] = user
        return true
    }

    func unlock(_ num: Int, _ user: Int) -> Bool {
        if locked[num] != user {
            return false
        }
        locked[num] = 0
        return true
    }

    func upgrade(_ num: Int, _ user: Int) -> Bool {
        var node = num
        while node != -1 {
            if locked[node] != 0 {
                return false
            }
            node = parent[node]
        }

        var lockedCount = 0
        var stack = [num]

        while !stack.isEmpty {
            node = stack.removeLast()
            if locked[node] != 0 {
                locked[node] = 0
                lockedCount += 1
            }
            stack.append(contentsOf: child[node])
        }

        if lockedCount > 0 {
            locked[num] = user
            return true
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ time for initialization.
    - $O(1)$ time for each $lock()$ and $unlock()$ function call.
    - $O(n)$ time for each $upgrade()$ function call.
- Space complexity: $O(n)$

---

## Common Pitfalls

### Not Checking All Ancestors for Upgrade

The upgrade operation requires that no ancestor of the node is locked. Checking only the immediate parent is insufficient. You must traverse the entire path from the node to the root, verifying each ancestor is unlocked before proceeding.

### Forgetting to Unlock Descendants Before Locking

When upgrade succeeds, all locked descendants must be unlocked before locking the current node. Some solutions lock the node first, which means when traversing descendants, the node itself gets incorrectly counted or unlocked. Process descendants completely before modifying the current node.

### Returning True When No Descendants Are Locked

The upgrade operation requires at least one locked descendant. Even if all other conditions are met (node unlocked, ancestors unlocked), if no descendant is locked, the operation must return `false`. Always verify the locked descendant count is greater than zero before returning success.
