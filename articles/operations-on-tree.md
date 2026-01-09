## 1. Depth First Search

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
