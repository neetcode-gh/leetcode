## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Graph Representation** - Understanding how to build an adjacency list from problem constraints
- **Depth-First Search (DFS)** - Used to traverse the directed graph and count reachable bombs
- **Breadth-First Search (BFS)** - Alternative traversal method for exploring the chain reaction level by level
- **Euclidean Distance** - Understanding how to calculate distance between points and compare with radius

---

## 1. Depth First Search

### Intuition
When a bomb detonates, it triggers other bombs within its blast radius. This creates a chain reaction that can be modeled as a directed graph. Bomb A has an edge to bomb B if B is within A's blast radius. Note that this relationship is not symmetric since bombs have different radii. To find the maximum detonation, we try detonating each bomb and use DFS to count how many bombs explode in the chain reaction.

### Algorithm
1. Build an adjacency list representing which bombs can trigger which other bombs. For each pair of bombs, check if the distance between them is within the first bomb's radius (bomb A triggers B if distance squared <= radius of A squared).
2. For each bomb as a starting point, run a `dfs` to count all reachable bombs.
3. In the `dfs`, use a visited set to track which bombs have already detonated and recursively visit all bombs that can be triggered.
4. Return the maximum count found across all starting bombs.

::tabs-start

```python
class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        adj = [[] for _ in range(len(bombs))]

        for i in range(len(bombs)):
            x1, y1, r1 = bombs[i]
            for j in range(i + 1, len(bombs)):
                x2, y2, r2 = bombs[j]
                d = (x1 - x2) ** 2 + (y1 - y2) ** 2

                if d <= r1 ** 2:
                    adj[i].append(j)
                if d <= r2 ** 2:
                    adj[j].append(i)

        def dfs(i, visit):
            if i in visit:
                return 0
            visit.add(i)
            for nei in adj[i]:
                dfs(nei, visit)
            return len(visit)

        res = 0
        for i in range(len(bombs)):
            res = max(res, dfs(i, set()))
        return res
```

```java
public class Solution {
    public int maximumDetonation(int[][] bombs) {
        int n = bombs.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (long) (x1 - x2) * (x1 - x2) + (long) (y1 - y2) * (y1 - y2);

                if (d <= (long) r1 * r1) {
                    adj[i].add(j);
                }
                if (d <= (long) r2 * r2) {
                    adj[j].add(i);
                }
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = Math.max(res, dfs(i, new HashSet<>(), adj));
        }
        return res;
    }

    private int dfs(int i, Set<Integer> visit, List<Integer>[] adj) {
        if (!visit.add(i)) return 0;
        for (int nei : adj[i]) {
            dfs(nei, visit, adj);
        }
        return visit.size();
    }
}
```

```cpp
class Solution {
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int n = bombs.size();
        vector<vector<int>> adj(n);

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long long x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
                long long x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long long d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

                if (d <= r1 * r1) {
                    adj[i].push_back(j);
                }
                if (d <= r2 * r2) {
                    adj[j].push_back(i);
                }
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            unordered_set<int> visit;
            res = max(res, dfs(i, visit, adj));
        }
        return res;
    }

private:
    int dfs(int i, unordered_set<int>& visit, vector<vector<int>>& adj) {
        if (!visit.insert(i).second) return 0;
        for (int nei : adj[i]) {
            dfs(nei, visit, adj);
        }
        return visit.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} bombs
     * @return {number}
     */
    maximumDetonation(bombs) {
        let n = bombs.length;
        let adj = Array.from({ length: n }, () => []);

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                let [x1, y1, r1] = bombs[i];
                let [x2, y2, r2] = bombs[j];
                let d = (x1 - x2) ** 2 + (y1 - y2) ** 2;

                if (d <= r1 ** 2) adj[i].push(j);
                if (d <= r2 ** 2) adj[j].push(i);
            }
        }

        const dfs = (i, visit) => {
            if (visit.has(i)) return 0;
            visit.add(i);
            for (let nei of adj[i]) {
                dfs(nei, visit);
            }
            return visit.size;
        };

        let res = 0;
        for (let i = 0; i < n; i++) {
            res = Math.max(res, dfs(i, new Set()));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaximumDetonation(int[][] bombs) {
        int n = bombs.Length;
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                long x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
                long x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

                if (d <= r1 * r1) adj[i].Add(j);
                if (d <= r2 * r2) adj[j].Add(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res = Math.Max(res, Dfs(i, new HashSet<int>(), adj));
        }
        return res;
    }

    private int Dfs(int i, HashSet<int> visit, List<int>[] adj) {
        if (!visit.Add(i)) return 0;
        foreach (int nei in adj[i]) {
            Dfs(nei, visit, adj);
        }
        return visit.Count;
    }
}
```

```go
func maximumDetonation(bombs [][]int) int {
    n := len(bombs)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }

    for i := 0; i < n; i++ {
        x1, y1, r1 := int64(bombs[i][0]), int64(bombs[i][1]), int64(bombs[i][2])
        for j := i + 1; j < n; j++ {
            x2, y2, r2 := int64(bombs[j][0]), int64(bombs[j][1]), int64(bombs[j][2])
            d := (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)

            if d <= r1*r1 {
                adj[i] = append(adj[i], j)
            }
            if d <= r2*r2 {
                adj[j] = append(adj[j], i)
            }
        }
    }

    var dfs func(i int, visit map[int]bool) int
    dfs = func(i int, visit map[int]bool) int {
        if visit[i] {
            return 0
        }
        visit[i] = true
        for _, nei := range adj[i] {
            dfs(nei, visit)
        }
        return len(visit)
    }

    res := 0
    for i := 0; i < n; i++ {
        visit := make(map[int]bool)
        if count := dfs(i, visit); count > res {
            res = count
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maximumDetonation(bombs: Array<IntArray>): Int {
        val n = bombs.size
        val adj = Array(n) { mutableListOf<Int>() }

        for (i in 0 until n) {
            val (x1, y1, r1) = bombs[i].map { it.toLong() }
            for (j in i + 1 until n) {
                val (x2, y2, r2) = bombs[j].map { it.toLong() }
                val d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)

                if (d <= r1 * r1) adj[i].add(j)
                if (d <= r2 * r2) adj[j].add(i)
            }
        }

        fun dfs(i: Int, visit: MutableSet<Int>): Int {
            if (!visit.add(i)) return 0
            for (nei in adj[i]) {
                dfs(nei, visit)
            }
            return visit.size
        }

        var res = 0
        for (i in 0 until n) {
            res = maxOf(res, dfs(i, mutableSetOf()))
        }
        return res
    }
}
```

```swift
class Solution {
    func maximumDetonation(_ bombs: [[Int]]) -> Int {
        let n = bombs.count
        var adj = [[Int]](repeating: [], count: n)

        for i in 0..<n {
            let x1 = Int64(bombs[i][0]), y1 = Int64(bombs[i][1]), r1 = Int64(bombs[i][2])
            for j in (i + 1)..<n {
                let x2 = Int64(bombs[j][0]), y2 = Int64(bombs[j][1]), r2 = Int64(bombs[j][2])
                let d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)

                if d <= r1 * r1 { adj[i].append(j) }
                if d <= r2 * r2 { adj[j].append(i) }
            }
        }

        func dfs(_ i: Int, _ visit: inout Set<Int>) -> Int {
            if visit.contains(i) { return 0 }
            visit.insert(i)
            for nei in adj[i] {
                _ = dfs(nei, &visit)
            }
            return visit.count
        }

        var res = 0
        for i in 0..<n {
            var visit = Set<Int>()
            res = max(res, dfs(i, &visit))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 2. Breadth First Search

### Intuition
The chain reaction of bomb detonations can also be explored level by level using BFS. Starting from an initial bomb, we explore all bombs it directly triggers, then all bombs those trigger, and so on. This approach naturally models the wave-like spread of explosions.

### Algorithm
1. Build the same adjacency list as in the `dfs` approach, where an edge from A to B means bomb A can trigger bomb B.
2. For each bomb as a starting point, initialize a queue with that bomb and a `visit` array.
3. Process bombs from the queue: for each bomb, add all unvisited bombs it can trigger to the queue and mark them visited.
4. Count the total number of visited bombs and track the maximum across all starting points.

::tabs-start

```python
class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        n = len(bombs)
        adj = [[] for _ in range(n)]

        for i in range(n):
            x1, y1, r1 = bombs[i]
            for j in range(i + 1, n):
                x2, y2, r2 = bombs[j]
                d = (x1 - x2) ** 2 + (y1 - y2) ** 2

                if d <= r1 ** 2:
                    adj[i].append(j)
                if d <= r2 ** 2:
                    adj[j].append(i)

        res = 0
        for i in range(n):
            q = deque([i])
            visit = [False] * n
            visit[i] = True
            count = 1
            while q:
                node = q.popleft()
                for nei in adj[node]:
                    if not visit[nei]:
                        visit[nei] = True
                        count += 1
                        q.append(nei)
            res = max(res, count)
        return res
```

```java
public class Solution {
    public int maximumDetonation(int[][] bombs) {
        int n = bombs.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (long) (x1 - x2) * (x1 - x2) + (long) (y1 - y2) * (y1 - y2);

                if (d <= (long) r1 * r1) adj[i].add(j);
                if (d <= (long) r2 * r2) adj[j].add(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            Queue<Integer> q = new LinkedList<>();
            boolean[] visit = new boolean[n];
            q.offer(i);
            visit[i] = true;
            int count = 1;

            while (!q.isEmpty()) {
                int node = q.poll();
                for (int nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        q.offer(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int n = bombs.size();
        vector<vector<int>> adj(n);

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long long d = (x1 - x2) * 1LL * (x1 - x2) + (y1 - y2) * 1LL * (y1 - y2);

                if (d <= (long long) r1 * r1) adj[i].push_back(j);
                if (d <= (long long) r2 * r2) adj[j].push_back(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            queue<int> q;
            vector<bool> visit(n, false);
            q.push(i);
            visit[i] = true;
            int count = 1;

            while (!q.empty()) {
                int node = q.front();q.pop();
                for (int& nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        q.push(nei);
                    }
                }
            }
            res = max(res, count);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} bombs
     * @return {number}
     */
    maximumDetonation(bombs) {
        let n = bombs.length;
        let adj = Array.from({ length: n }, () => []);

        for (let i = 0; i < n; i++) {
            let [x1, y1, r1] = bombs[i];
            for (let j = i + 1; j < n; j++) {
                let [x2, y2, r2] = bombs[j];
                let d = (x1 - x2) ** 2 + (y1 - y2) ** 2;

                if (d <= r1 ** 2) adj[i].push(j);
                if (d <= r2 ** 2) adj[j].push(i);
            }
        }

        let res = 0;
        for (let i = 0; i < n; i++) {
            let q = new Queue([i]);
            let visit = new Array(n).fill(false);
            visit[i] = true;
            let count = 1;

            while (!q.isEmpty()) {
                let node = q.pop();
                for (let nei of adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        q.push(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaximumDetonation(int[][] bombs) {
        int n = bombs.Length;
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        for (int i = 0; i < n; i++) {
            long x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                long x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

                if (d <= r1 * r1) adj[i].Add(j);
                if (d <= r2 * r2) adj[j].Add(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            Queue<int> q = new Queue<int>();
            bool[] visit = new bool[n];
            q.Enqueue(i);
            visit[i] = true;
            int count = 1;

            while (q.Count > 0) {
                int node = q.Dequeue();
                foreach (int nei in adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        q.Enqueue(nei);
                    }
                }
            }
            res = Math.Max(res, count);
        }
        return res;
    }
}
```

```go
func maximumDetonation(bombs [][]int) int {
    n := len(bombs)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }

    for i := 0; i < n; i++ {
        x1, y1, r1 := int64(bombs[i][0]), int64(bombs[i][1]), int64(bombs[i][2])
        for j := i + 1; j < n; j++ {
            x2, y2, r2 := int64(bombs[j][0]), int64(bombs[j][1]), int64(bombs[j][2])
            d := (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)

            if d <= r1*r1 {
                adj[i] = append(adj[i], j)
            }
            if d <= r2*r2 {
                adj[j] = append(adj[j], i)
            }
        }
    }

    res := 0
    for i := 0; i < n; i++ {
        q := []int{i}
        visit := make([]bool, n)
        visit[i] = true
        count := 1

        for len(q) > 0 {
            node := q[0]
            q = q[1:]
            for _, nei := range adj[node] {
                if !visit[nei] {
                    visit[nei] = true
                    count++
                    q = append(q, nei)
                }
            }
        }
        if count > res {
            res = count
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maximumDetonation(bombs: Array<IntArray>): Int {
        val n = bombs.size
        val adj = Array(n) { mutableListOf<Int>() }

        for (i in 0 until n) {
            val (x1, y1, r1) = bombs[i].map { it.toLong() }
            for (j in i + 1 until n) {
                val (x2, y2, r2) = bombs[j].map { it.toLong() }
                val d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)

                if (d <= r1 * r1) adj[i].add(j)
                if (d <= r2 * r2) adj[j].add(i)
            }
        }

        var res = 0
        for (i in 0 until n) {
            val q = ArrayDeque<Int>()
            val visit = BooleanArray(n)
            q.add(i)
            visit[i] = true
            var count = 1

            while (q.isNotEmpty()) {
                val node = q.removeFirst()
                for (nei in adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true
                        count++
                        q.add(nei)
                    }
                }
            }
            res = maxOf(res, count)
        }
        return res
    }
}
```

```swift
class Solution {
    func maximumDetonation(_ bombs: [[Int]]) -> Int {
        let n = bombs.count
        var adj = [[Int]](repeating: [], count: n)

        for i in 0..<n {
            let x1 = Int64(bombs[i][0]), y1 = Int64(bombs[i][1]), r1 = Int64(bombs[i][2])
            for j in (i + 1)..<n {
                let x2 = Int64(bombs[j][0]), y2 = Int64(bombs[j][1]), r2 = Int64(bombs[j][2])
                let d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)

                if d <= r1 * r1 { adj[i].append(j) }
                if d <= r2 * r2 { adj[j].append(i) }
            }
        }

        var res = 0
        for i in 0..<n {
            var q = [i]
            var visit = [Bool](repeating: false, count: n)
            visit[i] = true
            var count = 1
            var front = 0

            while front < q.count {
                let node = q[front]
                front += 1
                for nei in adj[node] {
                    if !visit[nei] {
                        visit[nei] = true
                        count += 1
                        q.append(nei)
                    }
                }
            }
            res = max(res, count)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## 3. Iterative DFS

### Intuition
This is the same approach as recursive DFS but uses an explicit stack instead of the call stack. This avoids potential stack overflow issues for very large inputs and can be more efficient in some languages due to reduced function call overhead.

### Algorithm
1. Build the adjacency list the same way as before.
2. For each bomb as a starting point, initialize a stack with that bomb and a `visit` array.
3. Pop bombs from the stack: for each bomb, push all unvisited neighbors onto the stack and mark them visited.
4. Count all visited bombs and track the maximum across all starting points.

::tabs-start

```python
class Solution:
    def maximumDetonation(self, bombs: list[list[int]]) -> int:
        n = len(bombs)
        adj = [[] for _ in range(n)]

        for i in range(n):
            x1, y1, r1 = bombs[i]
            for j in range(i + 1, n):
                x2, y2, r2 = bombs[j]
                d = (x1 - x2) ** 2 + (y1 - y2) ** 2

                if d <= r1 ** 2:
                    adj[i].append(j)
                if d <= r2 ** 2:
                    adj[j].append(i)

        res = 0
        for i in range(n):
            stack = [i]
            visit = [False] * n
            visit[i] = True
            count = 1

            while stack:
                node = stack.pop()
                for nei in adj[node]:
                    if not visit[nei]:
                        visit[nei] = True
                        count += 1
                        stack.append(nei)
            res = max(res, count)
        return res
```

```java
public class Solution {
    public int maximumDetonation(int[][] bombs) {
        int n = bombs.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (long) (x1 - x2) * (x1 - x2) + (long) (y1 - y2) * (y1 - y2);

                if (d <= (long) r1 * r1) adj[i].add(j);
                if (d <= (long) r2 * r2) adj[j].add(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            Stack<Integer> stack = new Stack<>();
            boolean[] visit = new boolean[n];
            stack.push(i);
            visit[i] = true;
            int count = 1;

            while (!stack.isEmpty()) {
                int node = stack.pop();
                for (int nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        stack.push(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumDetonation(vector<vector<int>>& bombs) {
        int n = bombs.size();
        vector<vector<int>> adj(n);

        for (int i = 0; i < n; i++) {
            int x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                int x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long long d = (long long)(x1 - x2) * (x1 - x2) + (long long)(y1 - y2) * (y1 - y2);

                if (d <= (long long) r1 * r1) adj[i].push_back(j);
                if (d <= (long long) r2 * r2) adj[j].push_back(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            stack<int> stk;
            vector<bool> visit(n, false);
            stk.push(i);
            visit[i] = true;
            int count = 1;

            while (!stk.empty()) {
                int node = stk.top();stk.pop();
                for (int& nei : adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        stk.push(nei);
                    }
                }
            }
            res = max(res, count);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} bombs
     * @return {number}
     */
    maximumDetonation(bombs) {
        let n = bombs.length;
        let adj = Array.from({ length: n }, () => []);

        for (let i = 0; i < n; i++) {
            let [x1, y1, r1] = bombs[i];
            for (let j = i + 1; j < n; j++) {
                let [x2, y2, r2] = bombs[j];
                let d = (x1 - x2) ** 2 + (y1 - y2) ** 2;

                if (d <= r1 ** 2) adj[i].push(j);
                if (d <= r2 ** 2) adj[j].push(i);
            }
        }

        let res = 0;
        for (let i = 0; i < n; i++) {
            let stack = [i];
            let visit = new Array(n).fill(false);
            visit[i] = true;
            let count = 1;

            while (stack.length) {
                let node = stack.pop();
                for (let nei of adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        stack.push(nei);
                    }
                }
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaximumDetonation(int[][] bombs) {
        int n = bombs.Length;
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new List<int>();
        }

        for (int i = 0; i < n; i++) {
            long x1 = bombs[i][0], y1 = bombs[i][1], r1 = bombs[i][2];
            for (int j = i + 1; j < n; j++) {
                long x2 = bombs[j][0], y2 = bombs[j][1], r2 = bombs[j][2];
                long d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

                if (d <= r1 * r1) adj[i].Add(j);
                if (d <= r2 * r2) adj[j].Add(i);
            }
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            Stack<int> stack = new Stack<int>();
            bool[] visit = new bool[n];
            stack.Push(i);
            visit[i] = true;
            int count = 1;

            while (stack.Count > 0) {
                int node = stack.Pop();
                foreach (int nei in adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true;
                        count++;
                        stack.Push(nei);
                    }
                }
            }
            res = Math.Max(res, count);
        }
        return res;
    }
}
```

```go
func maximumDetonation(bombs [][]int) int {
    n := len(bombs)
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }

    for i := 0; i < n; i++ {
        x1, y1, r1 := int64(bombs[i][0]), int64(bombs[i][1]), int64(bombs[i][2])
        for j := i + 1; j < n; j++ {
            x2, y2, r2 := int64(bombs[j][0]), int64(bombs[j][1]), int64(bombs[j][2])
            d := (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)

            if d <= r1*r1 {
                adj[i] = append(adj[i], j)
            }
            if d <= r2*r2 {
                adj[j] = append(adj[j], i)
            }
        }
    }

    res := 0
    for i := 0; i < n; i++ {
        stack := []int{i}
        visit := make([]bool, n)
        visit[i] = true
        count := 1

        for len(stack) > 0 {
            node := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            for _, nei := range adj[node] {
                if !visit[nei] {
                    visit[nei] = true
                    count++
                    stack = append(stack, nei)
                }
            }
        }
        if count > res {
            res = count
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maximumDetonation(bombs: Array<IntArray>): Int {
        val n = bombs.size
        val adj = Array(n) { mutableListOf<Int>() }

        for (i in 0 until n) {
            val (x1, y1, r1) = bombs[i].map { it.toLong() }
            for (j in i + 1 until n) {
                val (x2, y2, r2) = bombs[j].map { it.toLong() }
                val d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)

                if (d <= r1 * r1) adj[i].add(j)
                if (d <= r2 * r2) adj[j].add(i)
            }
        }

        var res = 0
        for (i in 0 until n) {
            val stack = ArrayDeque<Int>()
            val visit = BooleanArray(n)
            stack.add(i)
            visit[i] = true
            var count = 1

            while (stack.isNotEmpty()) {
                val node = stack.removeLast()
                for (nei in adj[node]) {
                    if (!visit[nei]) {
                        visit[nei] = true
                        count++
                        stack.add(nei)
                    }
                }
            }
            res = maxOf(res, count)
        }
        return res
    }
}
```

```swift
class Solution {
    func maximumDetonation(_ bombs: [[Int]]) -> Int {
        let n = bombs.count
        var adj = [[Int]](repeating: [], count: n)

        for i in 0..<n {
            let x1 = Int64(bombs[i][0]), y1 = Int64(bombs[i][1]), r1 = Int64(bombs[i][2])
            for j in (i + 1)..<n {
                let x2 = Int64(bombs[j][0]), y2 = Int64(bombs[j][1]), r2 = Int64(bombs[j][2])
                let d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)

                if d <= r1 * r1 { adj[i].append(j) }
                if d <= r2 * r2 { adj[j].append(i) }
            }
        }

        var res = 0
        for i in 0..<n {
            var stack = [i]
            var visit = [Bool](repeating: false, count: n)
            visit[i] = true
            var count = 1

            while !stack.isEmpty {
                let node = stack.removeLast()
                for nei in adj[node] {
                    if !visit[nei] {
                        visit[nei] = true
                        count += 1
                        stack.append(nei)
                    }
                }
            }
            res = max(res, count)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n ^ 2)$

---

## Common Pitfalls

### Treating the Graph as Undirected

A common mistake is assuming that if bomb A can trigger bomb B, then B can also trigger A. This is incorrect because bombs have different radii. The graph is directed: an edge from A to B exists only if B is within A's blast radius.

```python
# Wrong: Adding bidirectional edges unconditionally
if d <= r1 ** 2:
    adj[i].append(j)
    adj[j].append(i)  # Incorrect!

# Correct: Check each direction separately
if d <= r1 ** 2:
    adj[i].append(j)
if d <= r2 ** 2:
    adj[j].append(i)
```

### Integer Overflow When Computing Distance

When calculating the squared distance between bombs, the intermediate values can overflow 32-bit integers. Coordinates can be up to 10^5 and squaring the difference can exceed `INT_MAX`. Always use 64-bit integers for distance calculations.

```java
// Wrong: Overflow possible
int d = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);

// Correct: Cast to long before multiplication
long d = (long)(x1 - x2) * (x1 - x2) + (long)(y1 - y2) * (y1 - y2);
```

### Using Square Root for Distance Comparison

Computing the actual Euclidean distance using `sqrt()` introduces floating-point precision errors. Instead, compare squared distances directly to avoid precision issues.

```python
# Wrong: Floating-point precision issues
import math
if math.sqrt((x1-x2)**2 + (y1-y2)**2) <= r1:
    adj[i].append(j)

# Correct: Compare squared values
if (x1-x2)**2 + (y1-y2)**2 <= r1**2:
    adj[i].append(j)
```