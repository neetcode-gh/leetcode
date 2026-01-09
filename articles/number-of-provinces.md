## 1. Depth First Search

::tabs-start

```python
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        res = 0
        visited = [False] * n

        def dfs(node):
            visited[node] = True
            for nei in range(n):
                if isConnected[node][nei] and not visited[nei]:
                    dfs(nei)

        for i in range(n):
            if not visited[i]:
                dfs(i)
                res += 1

        return res
```

```java
public class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(i, isConnected, visited, n);
                res++;
            }
        }
        return res;
    }

    private void dfs(int node, int[][] isConnected, boolean[] visited, int n) {
        visited[node] = true;
        for (int nei = 0; nei < n; nei++) {
            if (isConnected[node][nei] == 1 && !visited[nei]) {
                dfs(nei, isConnected, visited, n);
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<bool> visited(n, false);
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(i, isConnected, visited, n);
                res++;
            }
        }
        return res;
    }

    void dfs(int node, vector<vector<int>>& isConnected, vector<bool>& visited, int n) {
        visited[node] = true;
        for (int nei = 0; nei < n; nei++) {
            if (isConnected[node][nei] == 1 && !visited[nei]) {
                dfs(nei, isConnected, visited, n);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} isConnected
     * @return {number}
     */
    findCircleNum(isConnected) {
        const n = isConnected.length;
        const visited = new Array(n).fill(false);
        let res = 0;

        const dfs = (node) => {
            visited[node] = true;
            for (let nei = 0; nei < n; nei++) {
                if (isConnected[node][nei] === 1 && !visited[nei]) {
                    dfs(nei);
                }
            }
        };

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(i);
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindCircleNum(int[][] isConnected) {
        int n = isConnected.Length;
        bool[] visited = new bool[n];
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                Dfs(i, isConnected, visited, n);
                res++;
            }
        }
        return res;
    }

    private void Dfs(int node, int[][] isConnected, bool[] visited, int n) {
        visited[node] = true;
        for (int nei = 0; nei < n; nei++) {
            if (isConnected[node][nei] == 1 && !visited[nei]) {
                Dfs(nei, isConnected, visited, n);
            }
        }
    }
}
```

```go
func findCircleNum(isConnected [][]int) int {
    n := len(isConnected)
    visited := make([]bool, n)
    res := 0

    var dfs func(node int)
    dfs = func(node int) {
        visited[node] = true
        for nei := 0; nei < n; nei++ {
            if isConnected[node][nei] == 1 && !visited[nei] {
                dfs(nei)
            }
        }
    }

    for i := 0; i < n; i++ {
        if !visited[i] {
            dfs(i)
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findCircleNum(isConnected: Array<IntArray>): Int {
        val n = isConnected.size
        val visited = BooleanArray(n)
        var res = 0

        fun dfs(node: Int) {
            visited[node] = true
            for (nei in 0 until n) {
                if (isConnected[node][nei] == 1 && !visited[nei]) {
                    dfs(nei)
                }
            }
        }

        for (i in 0 until n) {
            if (!visited[i]) {
                dfs(i)
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findCircleNum(_ isConnected: [[Int]]) -> Int {
        let n = isConnected.count
        var visited = [Bool](repeating: false, count: n)
        var res = 0

        func dfs(_ node: Int) {
            visited[node] = true
            for nei in 0..<n {
                if isConnected[node][nei] == 1 && !visited[nei] {
                    dfs(nei)
                }
            }
        }

        for i in 0..<n {
            if !visited[i] {
                dfs(i)
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Depth First Search (Modifying Input)

::tabs-start

```python
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        res = 0

        def dfs(node):
            isConnected[node][node] = 0
            for nei in range(n):
                if node != nei and isConnected[node][nei] and isConnected[nei][nei]:
                    dfs(nei)

        for i in range(n):
            if isConnected[i][i]:
                dfs(i)
                res += 1

        return res
```

```java
public class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (isConnected[i][i] == 1) {
                dfs(i, isConnected, n);
                res++;
            }
        }
        return res;
    }

    private void dfs(int node, int[][] isConnected, int n) {
        isConnected[node][node] = 0;
        for (int nei = 0; nei < n; nei++) {
            if (node != nei && isConnected[node][nei] == 1 && isConnected[nei][nei] == 1) {
                dfs(nei, isConnected, n);
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (isConnected[i][i] == 1) {
                dfs(i, isConnected, n);
                res++;
            }
        }
        return res;
    }

    void dfs(int node, vector<vector<int>>& isConnected, int n) {
        isConnected[node][node] = 0;
        for (int nei = 0; nei < n; nei++) {
            if (node != nei && isConnected[node][nei] == 1 && isConnected[nei][nei] == 1) {
                dfs(nei, isConnected, n);
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} isConnected
     * @return {number}
     */
    findCircleNum(isConnected) {
        const n = isConnected.length;
        let res = 0;

        const dfs = (node) => {
            isConnected[node][node] = 0;
            for (let nei = 0; nei < n; nei++) {
                if (node !== nei && isConnected[node][nei] === 1 && isConnected[nei][nei] === 1) {
                    dfs(nei);
                }
            }
        };

        for (let i = 0; i < n; i++) {
            if (isConnected[i][i] === 1) {
                dfs(i);
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindCircleNum(int[][] isConnected) {
        int n = isConnected.Length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (isConnected[i][i] == 1) {
                Dfs(i, isConnected, n);
                res++;
            }
        }

        return res;
    }

    private void Dfs(int node, int[][] isConnected, int n) {
        isConnected[node][node] = 0;
        for (int nei = 0; nei < n; nei++) {
            if (node != nei && isConnected[node][nei] == 1 && isConnected[nei][nei] == 1) {
                Dfs(nei, isConnected, n);
            }
        }
    }
}
```

```go
func findCircleNum(isConnected [][]int) int {
    n := len(isConnected)
    res := 0

    var dfs func(node int)
    dfs = func(node int) {
        isConnected[node][node] = 0
        for nei := 0; nei < n; nei++ {
            if node != nei && isConnected[node][nei] == 1 && isConnected[nei][nei] == 1 {
                dfs(nei)
            }
        }
    }

    for i := 0; i < n; i++ {
        if isConnected[i][i] == 1 {
            dfs(i)
            res++
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findCircleNum(isConnected: Array<IntArray>): Int {
        val n = isConnected.size
        var res = 0

        fun dfs(node: Int) {
            isConnected[node][node] = 0
            for (nei in 0 until n) {
                if (node != nei && isConnected[node][nei] == 1 && isConnected[nei][nei] == 1) {
                    dfs(nei)
                }
            }
        }

        for (i in 0 until n) {
            if (isConnected[i][i] == 1) {
                dfs(i)
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findCircleNum(_ isConnected: [[Int]]) -> Int {
        var isConnected = isConnected
        let n = isConnected.count
        var res = 0

        func dfs(_ node: Int) {
            isConnected[node][node] = 0
            for nei in 0..<n {
                if node != nei && isConnected[node][nei] == 1 && isConnected[nei][nei] == 1 {
                    dfs(nei)
                }
            }
        }

        for i in 0..<n {
            if isConnected[i][i] == 1 {
                dfs(i)
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$ for recursion stack.

---

## 3. Breadth First Search

::tabs-start

```python
class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        visited = [False] * n
        res = 0
        q = deque()

        for i in range(n):
            if not visited[i]:
                res += 1
                visited[i] = True
                q.append(i)
                while q:
                    node = q.popleft()
                    for nei in range(n):
                        if isConnected[node][nei] and not visited[nei]:
                            visited[nei] = True
                            q.append(nei)

        return res
```

```java
public class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        Queue<Integer> q = new LinkedList<>();
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                res++;
                visited[i] = true;
                q.add(i);
                while (!q.isEmpty()) {
                    int node = q.poll();
                    for (int nei = 0; nei < n; nei++) {
                        if (isConnected[node][nei] == 1 && !visited[nei]) {
                            visited[nei] = true;
                            q.add(nei);
                        }
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        vector<bool> visited(n, false);
        queue<int> q;
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                res++;
                visited[i] = true;
                q.push(i);
                while (!q.empty()) {
                    int node = q.front(); q.pop();
                    for (int nei = 0; nei < n; nei++) {
                        if (isConnected[node][nei] && !visited[nei]) {
                            visited[nei] = true;
                            q.push(nei);
                        }
                    }
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} isConnected
     * @return {number}
     */
    findCircleNum(isConnected) {
        const n = isConnected.length;
        const visited = new Array(n).fill(false);
        const q = new Queue();
        let res = 0;

        for (let i = 0; i < n; i++) {
            if (!visited[i]) {
                res++;
                visited[i] = true;
                q.enqueue(i);
                while (!q.isEmpty()) {
                    const node = q.dequeue();
                    for (let nei = 0; nei < n; nei++) {
                        if (isConnected[node][nei] && !visited[nei]) {
                            visited[nei] = true;
                            q.enqueue(nei);
                        }
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindCircleNum(int[][] isConnected) {
        int n = isConnected.Length;
        bool[] visited = new bool[n];
        Queue<int> q = new Queue<int>();
        int res = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                res++;
                visited[i] = true;
                q.Enqueue(i);
                while (q.Count > 0) {
                    int node = q.Dequeue();
                    for (int nei = 0; nei < n; nei++) {
                        if (isConnected[node][nei] == 1 && !visited[nei]) {
                            visited[nei] = true;
                            q.Enqueue(nei);
                        }
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func findCircleNum(isConnected [][]int) int {
    n := len(isConnected)
    visited := make([]bool, n)
    res := 0

    for i := 0; i < n; i++ {
        if !visited[i] {
            res++
            visited[i] = true
            q := []int{i}
            for len(q) > 0 {
                node := q[0]
                q = q[1:]
                for nei := 0; nei < n; nei++ {
                    if isConnected[node][nei] == 1 && !visited[nei] {
                        visited[nei] = true
                        q = append(q, nei)
                    }
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findCircleNum(isConnected: Array<IntArray>): Int {
        val n = isConnected.size
        val visited = BooleanArray(n)
        var res = 0

        for (i in 0 until n) {
            if (!visited[i]) {
                res++
                visited[i] = true
                val q = ArrayDeque<Int>()
                q.add(i)
                while (q.isNotEmpty()) {
                    val node = q.removeFirst()
                    for (nei in 0 until n) {
                        if (isConnected[node][nei] == 1 && !visited[nei]) {
                            visited[nei] = true
                            q.add(nei)
                        }
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findCircleNum(_ isConnected: [[Int]]) -> Int {
        let n = isConnected.count
        var visited = [Bool](repeating: false, count: n)
        var res = 0

        for i in 0..<n {
            if !visited[i] {
                res += 1
                visited[i] = true
                var q = [i]
                while !q.isEmpty {
                    let node = q.removeFirst()
                    for nei in 0..<n {
                        if isConnected[node][nei] == 1 && !visited[nei] {
                            visited[nei] = true
                            q.append(nei)
                        }
                    }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 4. Disjoint Set Union

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)
        self.components = n

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False

        self.components -= 1
        if self.Size[pu] >= self.Size[pv]:
            self.Size[pu] += self.Size[pv]
            self.Parent[pv] = pu
        else:
            self.Size[pv] += self.Size[pu]
            self.Parent[pu] = pv
        return True
    
    def numOfComps(self):
        return self.components

class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        dsu = DSU(n)

        for i in range(n):
            for j in range(n):
                if isConnected[i][j]:
                    dsu.union(i, j)
        
        return dsu.numOfComps()
```

```java
class DSU {
    int[] Parent, Size;
    int components;

    public DSU(int n) {
        Parent = new int[n];
        Size = new int[n];
        components = n;
        for (int i = 0; i < n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;

        components--;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }

    public int numOfComps() {
        return components;
    }
}

public class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        DSU dsu = new DSU(n);

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    dsu.union(i, j);
                }
            }
        }
        return dsu.numOfComps();
    }
}
```

```cpp
class DSU {
public:
    vector<int> Parent, Size;
    int components;

    DSU(int n) {
        Parent.resize(n);
        Size.assign(n, 1);
        components = n;
        for (int i = 0; i < n; ++i) Parent[i] = i;
    }

    int find(int node) {
        if (Parent[node] != node)
            Parent[node] = find(Parent[node]);
        return Parent[node];
    }

    bool unionSet(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;

        components--;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }

    int numOfComps() {
        return components;
    }
};

class Solution {
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size();
        DSU dsu(n);
        for (int i = 0; i < n; ++i)
            for (int j = 0; j < n; ++j)
                if (isConnected[i][j])
                    dsu.unionSet(i, j);
        return dsu.numOfComps();
    }
};
```

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array(n + 1).fill(0).map((_, i) => i);
        this.Size = Array(n + 1).fill(1);
        this.components = n;
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;

        this.components--;
        if (this.Size[pu] >= this.Size[pv]) {
            this.Size[pu] += this.Size[pv];
            this.Parent[pv] = pu;
        } else {
            this.Size[pv] += this.Size[pu];
            this.Parent[pu] = pv;
        }
        return true;
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
     numOfComps() {
        return this.components;
     }
}

class Solution {
    /**
     * @param {number[][]} isConnected
     * @return {number}
     */
    findCircleNum(isConnected) {
        const n = isConnected.length;
        const dsu = new DSU(n);

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (isConnected[i][j]) {
                    dsu.union(i, j);
                }
            }
        }
        return dsu.numOfComps();
    }
}
```

```csharp
public class DSU {
    private int[] Parent, Size;
    private int components;

    public DSU(int n) {
        Parent = new int[n];
        Size = new int[n];
        components = n;
        for (int i = 0; i < n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int Find(int node) {
        if (Parent[node] != node)
            Parent[node] = Find(Parent[node]);
        return Parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return false;

        components--;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }

    public int NumOfComps() {
        return components;
    }
}

public class Solution {
    public int FindCircleNum(int[][] isConnected) {
        int n = isConnected.Length;
        var dsu = new DSU(n);
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (isConnected[i][j] == 1)
                    dsu.Union(i, j);
        return dsu.NumOfComps();
    }
}
```

```go
type DSU struct {
    Parent     []int
    Size       []int
    components int
}

func NewDSU(n int) *DSU {
    dsu := &DSU{
        Parent:     make([]int, n),
        Size:       make([]int, n),
        components: n,
    }
    for i := 0; i < n; i++ {
        dsu.Parent[i] = i
        dsu.Size[i] = 1
    }
    return dsu
}

func (dsu *DSU) Find(node int) int {
    if dsu.Parent[node] != node {
        dsu.Parent[node] = dsu.Find(dsu.Parent[node])
    }
    return dsu.Parent[node]
}

func (dsu *DSU) Union(u, v int) bool {
    pu, pv := dsu.Find(u), dsu.Find(v)
    if pu == pv {
        return false
    }
    dsu.components--
    if dsu.Size[pu] >= dsu.Size[pv] {
        dsu.Size[pu] += dsu.Size[pv]
        dsu.Parent[pv] = pu
    } else {
        dsu.Size[pv] += dsu.Size[pu]
        dsu.Parent[pu] = pv
    }
    return true
}

func findCircleNum(isConnected [][]int) int {
    n := len(isConnected)
    dsu := NewDSU(n)
    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if isConnected[i][j] == 1 {
                dsu.Union(i, j)
            }
        }
    }
    return dsu.components
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n) { it }
    private val size = IntArray(n) { 1 }
    var components = n
        private set

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        val pu = find(u)
        val pv = find(v)
        if (pu == pv) return false

        components--
        if (size[pu] >= size[pv]) {
            size[pu] += size[pv]
            parent[pv] = pu
        } else {
            size[pv] += size[pu]
            parent[pu] = pv
        }
        return true
    }
}

class Solution {
    fun findCircleNum(isConnected: Array<IntArray>): Int {
        val n = isConnected.size
        val dsu = DSU(n)
        for (i in 0 until n) {
            for (j in 0 until n) {
                if (isConnected[i][j] == 1) {
                    dsu.union(i, j)
                }
            }
        }
        return dsu.components
    }
}
```

```swift
class DSU {
    private var parent: [Int]
    private var size: [Int]
    var components: Int

    init(_ n: Int) {
        parent = Array(0..<n)
        size = [Int](repeating: 1, count: n)
        components = n
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) -> Bool {
        let pu = find(u)
        let pv = find(v)
        if pu == pv { return false }

        components -= 1
        if size[pu] >= size[pv] {
            size[pu] += size[pv]
            parent[pv] = pu
        } else {
            size[pv] += size[pu]
            parent[pu] = pv
        }
        return true
    }
}

class Solution {
    func findCircleNum(_ isConnected: [[Int]]) -> Int {
        let n = isConnected.count
        let dsu = DSU(n)
        for i in 0..<n {
            for j in 0..<n {
                if isConnected[i][j] == 1 {
                    _ = dsu.union(i, j)
                }
            }
        }
        return dsu.components
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$