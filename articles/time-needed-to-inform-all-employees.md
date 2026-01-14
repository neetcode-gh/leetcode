## 1. Depth First Search

### Intuition

The company structure forms a tree with the head of the company as the root. Each manager must inform their direct subordinates, who then inform their subordinates, and so on. The total time to inform everyone equals the longest path from the root to any leaf, where each edge weight is the manager's inform time.

We can traverse this tree using `dfs`, tracking the accumulated time as we go deeper. At each node, we add that manager's inform time before visiting their subordinates. The answer is the maximum time across all leaf nodes.

### Algorithm

1. Build an adjacency list representing the manager-subordinate relationships.
2. Start `dfs` from the head of the company.
3. For each node, recursively compute the time to inform all employees in its subtree.
4. The time at each node is `informTime[node]` plus the maximum time from all its children.
5. Return the maximum time found from the root.

::tabs-start

```python
class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        adj = [[] for _ in range(n)]
        for i in range(n):
            if i != headID:
                adj[manager[i]].append(i)

        def dfs(node):
            res = 0
            for child in adj[node]:
                res = max(res, informTime[node] + dfs(child))
            return res

        return dfs(headID)
```

```java
public class Solution {
    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int i = 0; i < n; i++) {
            if (i != headID) {
                adj[manager[i]].add(i);
            }
        }

        return dfs(headID, adj, informTime);
    }

    private int dfs(int node, List<Integer>[] adj, int[] informTime) {
        int res = 0;
        for (int child : adj[node]) {
            res = Math.max(res, informTime[node] + dfs(child, adj, informTime));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<vector<int>> adj(n);
        for (int i = 0; i < n; i++) {
            if (i != headID) {
                adj[manager[i]].push_back(i);
            }
        }
        return dfs(headID, adj, informTime);
    }

private:
    int dfs(int node, vector<vector<int>>& adj, vector<int>& informTime) {
        int res = 0;
        for (int child : adj[node]) {
            res = max(res, informTime[node] + dfs(child, adj, informTime));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} headID
     * @param {number[]} manager
     * @param {number[]} informTime
     * @return {number}
     */
    numOfMinutes(n, headID, manager, informTime) {
        const adj = Array.from({ length: n }, () => []);
        for (let i = 0; i < n; i++) {
            if (i !== headID) {
                adj[manager[i]].push(i);
            }
        }

        const dfs = (node) => {
            let res = 0;
            for (const child of adj[node]) {
                res = Math.max(res, informTime[node] + dfs(child));
            }
            return res;
        };

        return dfs(headID);
    }
}
```

```go
func numOfMinutes(n int, headID int, manager []int, informTime []int) int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for i := 0; i < n; i++ {
        if i != headID {
            adj[manager[i]] = append(adj[manager[i]], i)
        }
    }

    var dfs func(node int) int
    dfs = func(node int) int {
        res := 0
        for _, child := range adj[node] {
            res = max(res, informTime[node]+dfs(child))
        }
        return res
    }

    return dfs(headID)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun numOfMinutes(n: Int, headID: Int, manager: IntArray, informTime: IntArray): Int {
        val adj = Array(n) { mutableListOf<Int>() }
        for (i in 0 until n) {
            if (i != headID) {
                adj[manager[i]].add(i)
            }
        }

        fun dfs(node: Int): Int {
            var res = 0
            for (child in adj[node]) {
                res = maxOf(res, informTime[node] + dfs(child))
            }
            return res
        }

        return dfs(headID)
    }
}
```

```swift
class Solution {
    func numOfMinutes(_ n: Int, _ headID: Int, _ manager: [Int], _ informTime: [Int]) -> Int {
        var adj = [[Int]](repeating: [Int](), count: n)
        for i in 0..<n {
            if i != headID {
                adj[manager[i]].append(i)
            }
        }

        func dfs(_ node: Int) -> Int {
            var res = 0
            for child in adj[node] {
                res = max(res, informTime[node] + dfs(child))
            }
            return res
        }

        return dfs(headID)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Breadth First Search

### Intuition

Instead of using recursion, we can traverse the tree level by level using `bfs`. We process nodes in waves, tracking the time at which each employee receives the news. The maximum time across all employees gives us the answer.

Each node in the queue stores both the employee ID and the time at which they were informed. When we process a node, we inform all their direct reports, adding the manager's inform time to compute when each subordinate receives the news.

### Algorithm

1. Build an adjacency list from the manager array.
2. Initialize a queue with the head employee and time `0`.
3. Track the maximum time seen so far.
4. For each node dequeued, update the maximum time and enqueue all subordinates with their accumulated time.
5. A subordinate's time equals their manager's time plus the manager's inform time.
6. Return the maximum time after processing all employees.

::tabs-start

```python
class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        adj = defaultdict(list)
        for i in range(n):
            adj[manager[i]].append(i)

        q = deque([(headID, 0)])  # (id, time)
        res = 0

        while q:
            node, time = q.popleft()
            res = max(res, time)
            for emp in adj[node]:
                q.append((emp, time + informTime[node]))

        return res
```

```java
public class Solution {
    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        for (int i = 0; i < n; i++) {
            adj.computeIfAbsent(manager[i], k -> new ArrayList<>()).add(i);
        }

        Queue<int[]> queue = new LinkedList<>();
        queue.add(new int[]{headID, 0});
        int res = 0;

        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int id = curr[0], time = curr[1];
            res = Math.max(res, time);
            for (int emp : adj.getOrDefault(id, new ArrayList<>())) {
                queue.add(new int[]{emp, time + informTime[id]});
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        unordered_map<int, vector<int>> adj;
        for (int i = 0; i < n; ++i) {
            adj[manager[i]].push_back(i);
        }

        queue<pair<int, int>> q; // {id, time}
        q.push({headID, 0});
        int res = 0;

        while (!q.empty()) {
            auto [id, time] = q.front();
            q.pop();
            res = max(res, time);
            for (int emp : adj[id]) {
                q.push({emp, time + informTime[id]});
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} headID
     * @param {number[]} manager
     * @param {number[]} informTime
     * @return {number}
     */
    numOfMinutes(n, headID, manager, informTime) {
        const adj = new Map();
        for (let i = 0; i < n; i++) {
            if (!adj.has(manager[i])) adj.set(manager[i], []);
            adj.get(manager[i]).push(i);
        }

        const queue = new Queue([[headID, 0]]); // [id, time]
        let res = 0;

        while (!queue.isEmpty()) {
            const [id, time] = queue.pop();
            res = Math.max(res, time);
            if (adj.has(id)) {
                for (const emp of adj.get(id)) {
                    queue.push([emp, time + informTime[id]]);
                }
            }
        }

        return res;
    }
}
```

```go
func numOfMinutes(n int, headID int, manager []int, informTime []int) int {
    adj := make(map[int][]int)
    for i := 0; i < n; i++ {
        adj[manager[i]] = append(adj[manager[i]], i)
    }

    queue := [][2]int{{headID, 0}} // {id, time}
    res := 0

    for len(queue) > 0 {
        curr := queue[0]
        queue = queue[1:]
        id, time := curr[0], curr[1]
        if time > res {
            res = time
        }
        for _, emp := range adj[id] {
            queue = append(queue, [2]int{emp, time + informTime[id]})
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numOfMinutes(n: Int, headID: Int, manager: IntArray, informTime: IntArray): Int {
        val adj = mutableMapOf<Int, MutableList<Int>>()
        for (i in 0 until n) {
            adj.getOrPut(manager[i]) { mutableListOf() }.add(i)
        }

        val queue: Queue<Pair<Int, Int>> = LinkedList()
        queue.add(Pair(headID, 0))
        var res = 0

        while (queue.isNotEmpty()) {
            val (id, time) = queue.poll()
            res = maxOf(res, time)
            adj[id]?.forEach { emp ->
                queue.add(Pair(emp, time + informTime[id]))
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func numOfMinutes(_ n: Int, _ headID: Int, _ manager: [Int], _ informTime: [Int]) -> Int {
        var adj = [Int: [Int]]()
        for i in 0..<n {
            adj[manager[i], default: []].append(i)
        }

        var queue = [(headID, 0)] // (id, time)
        var res = 0

        while !queue.isEmpty {
            let (id, time) = queue.removeFirst()
            res = max(res, time)
            if let employees = adj[id] {
                for emp in employees {
                    queue.append((emp, time + informTime[id]))
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Topological Sort (Kahn's Algorithm)

### Intuition

We can reverse our thinking: instead of propagating time down from the root, we can compute times bottom-up starting from leaf employees. Leaf employees have an `indegree` of `0` (no one reports to them). They propagate their total time upward to their managers.

A manager's total time is the maximum among all their subordinates' times plus their own inform time. We process employees in topological order, from leaves toward the root. When all of a manager's subordinates have been processed, we can compute and propagate the manager's time.

### Algorithm

1. Compute the `indegree` of each employee (how many people report to them).
2. Initialize a queue with all leaf employees (`indegree = 0`).
3. For each employee processed, add their inform time to their accumulated time.
4. Propagate this time to their manager, taking the maximum if the manager has multiple subordinates.
5. Decrement the manager's `indegree`; if it becomes `0`, add them to the queue.
6. Return the time at the head of the company.

::tabs-start

```python
class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        indegree = [0] * n
        time = [0] * n

        for i in range(n):
            if manager[i] != -1:
                indegree[manager[i]] += 1

        queue = deque()
        for i in range(n):
            if indegree[i] == 0:
                queue.append(i)

        while queue:
            node = queue.popleft()
            time[node] += informTime[node]
            if manager[node] != -1:
                time[manager[node]] = max(time[manager[node]], time[node])
                indegree[manager[node]] -= 1
                if indegree[manager[node]] == 0:
                    queue.append(manager[node])

        return time[headID]
```

```java
public class Solution {
    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        int[] indegree = new int[n];
        int[] time = new int[n];

        for (int i = 0; i < n; i++) {
            if (manager[i] != -1) {
                indegree[manager[i]]++;
            }
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.add(i);
            }
        }

        while (!queue.isEmpty()) {
            int node = queue.poll();
            time[node] += informTime[node];
            if (manager[node] != -1) {
                time[manager[node]] = Math.max(time[manager[node]], time[node]);
                indegree[manager[node]]--;
                if (indegree[manager[node]] == 0) {
                    queue.add(manager[node]);
                }
            }
        }

        return time[headID];
    }
}
```

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<int> indegree(n, 0);
        vector<int> time(n, 0);

        for (int i = 0; i < n; ++i) {
            if (manager[i] != -1) {
                indegree[manager[i]]++;
            }
        }

        queue<int> queue;
        for (int i = 0; i < n; ++i) {
            if (indegree[i] == 0) {
                queue.push(i);
            }
        }

        while (!queue.empty()) {
            int node = queue.front();
            queue.pop();
            time[node] += informTime[node];
            if (manager[node] != -1) {
                time[manager[node]] = max(time[manager[node]], time[node]);
                indegree[manager[node]]--;
                if (indegree[manager[node]] == 0) {
                    queue.push(manager[node]);
                }
            }
        }

        return time[headID];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} headID
     * @param {number[]} manager
     * @param {number[]} informTime
     * @return {number}
     */
    numOfMinutes(n, headID, manager, informTime) {
        const indegree = Array(n).fill(0);
        const time = Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            if (manager[i] !== -1) {
                indegree[manager[i]]++;
            }
        }

        const queue = new Queue();
        for (let i = 0; i < n; i++) {
            if (indegree[i] === 0) {
                queue.push(i);
            }
        }

        while (!queue.isEmpty()) {
            const node = queue.pop();
            time[node] += informTime[node];
            if (manager[node] !== -1) {
                time[manager[node]] = Math.max(time[manager[node]], time[node]);
                indegree[manager[node]]--;
                if (indegree[manager[node]] === 0) {
                    queue.push(manager[node]);
                }
            }
        }

        return time[headID];
    }
}
```

```go
func numOfMinutes(n int, headID int, manager []int, informTime []int) int {
    indegree := make([]int, n)
    time := make([]int, n)

    for i := 0; i < n; i++ {
        if manager[i] != -1 {
            indegree[manager[i]]++
        }
    }

    queue := []int{}
    for i := 0; i < n; i++ {
        if indegree[i] == 0 {
            queue = append(queue, i)
        }
    }

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        time[node] += informTime[node]
        if manager[node] != -1 {
            if time[node] > time[manager[node]] {
                time[manager[node]] = time[node]
            }
            indegree[manager[node]]--
            if indegree[manager[node]] == 0 {
                queue = append(queue, manager[node])
            }
        }
    }

    return time[headID]
}
```

```kotlin
class Solution {
    fun numOfMinutes(n: Int, headID: Int, manager: IntArray, informTime: IntArray): Int {
        val indegree = IntArray(n)
        val time = IntArray(n)

        for (i in 0 until n) {
            if (manager[i] != -1) {
                indegree[manager[i]]++
            }
        }

        val queue: Queue<Int> = LinkedList()
        for (i in 0 until n) {
            if (indegree[i] == 0) {
                queue.add(i)
            }
        }

        while (queue.isNotEmpty()) {
            val node = queue.poll()
            time[node] += informTime[node]
            if (manager[node] != -1) {
                time[manager[node]] = maxOf(time[manager[node]], time[node])
                indegree[manager[node]]--
                if (indegree[manager[node]] == 0) {
                    queue.add(manager[node])
                }
            }
        }

        return time[headID]
    }
}
```

```swift
class Solution {
    func numOfMinutes(_ n: Int, _ headID: Int, _ manager: [Int], _ informTime: [Int]) -> Int {
        var indegree = [Int](repeating: 0, count: n)
        var time = [Int](repeating: 0, count: n)

        for i in 0..<n {
            if manager[i] != -1 {
                indegree[manager[i]] += 1
            }
        }

        var queue = [Int]()
        for i in 0..<n {
            if indegree[i] == 0 {
                queue.append(i)
            }
        }

        while !queue.isEmpty {
            let node = queue.removeFirst()
            time[node] += informTime[node]
            if manager[node] != -1 {
                time[manager[node]] = max(time[manager[node]], time[node])
                indegree[manager[node]] -= 1
                if indegree[manager[node]] == 0 {
                    queue.append(manager[node])
                }
            }
        }

        return time[headID]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Depth First Search (Optimal)

### Intuition

Instead of building an explicit adjacency list, we can traverse from each employee up to the root, caching results along the way. For any employee, their total inform time is their own inform time plus their manager's total inform time.

We use the manager array directly for traversal and cache computed results in the inform time array itself. Once an employee's path to root is computed, we mark their manager as `-1` to indicate completion. This approach uses path compression similar to Union-Find.

### Algorithm

1. For each employee, recursively compute their total time by following the manager chain to the root.
2. Base case: if an employee has no manager (`-1`), return their inform time.
3. Add the manager's total time to the current employee's inform time.
4. Mark the employee's manager as `-1` to cache the result and prevent recomputation.
5. Track the maximum inform time seen across all employees.
6. Return the maximum time.

::tabs-start

```python
class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        def dfs(node):
            if manager[node] != -1:
                informTime[node] += dfs(manager[node])
                manager[node] = -1
            return informTime[node]

        res = 0
        for node in range(n):
            res = max(res, dfs(node))
        return res
```

```java
public class Solution {
    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        int res = 0;
        for (int node = 0; node < n; node++) {
            res = Math.max(res, dfs(node, manager, informTime));
        }
        return res;
    }

    private int dfs(int node, int[] manager, int[] informTime) {
        if (manager[node] != -1) {
            informTime[node] += dfs(manager[node], manager, informTime);
            manager[node] = -1;
        }
        return informTime[node];
    }
}
```

```cpp
class Solution {
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        function<int(int)> dfs = [&](int node) {
            if (manager[node] != -1) {
                informTime[node] += dfs(manager[node]);
                manager[node] = -1;
            }
            return informTime[node];
        };

        int res = 0;
        for (int node = 0; node < n; ++node) {
            res = max(res, dfs(node));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} headID
     * @param {number[]} manager
     * @param {number[]} informTime
     * @return {number}
     */
    numOfMinutes(n, headID, manager, informTime) {
        const dfs = (node) => {
            if (manager[node] !== -1) {
                informTime[node] += dfs(manager[node]);
                manager[node] = -1;
            }
            return informTime[node];
        };

        let res = 0;
        for (let node = 0; node < n; node++) {
            res = Math.max(res, dfs(node));
        }
        return res;
    }
}
```

```go
func numOfMinutes(n int, headID int, manager []int, informTime []int) int {
    var dfs func(node int) int
    dfs = func(node int) int {
        if manager[node] != -1 {
            informTime[node] += dfs(manager[node])
            manager[node] = -1
        }
        return informTime[node]
    }

    res := 0
    for node := 0; node < n; node++ {
        if val := dfs(node); val > res {
            res = val
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun numOfMinutes(n: Int, headID: Int, manager: IntArray, informTime: IntArray): Int {
        fun dfs(node: Int): Int {
            if (manager[node] != -1) {
                informTime[node] += dfs(manager[node])
                manager[node] = -1
            }
            return informTime[node]
        }

        var res = 0
        for (node in 0 until n) {
            res = maxOf(res, dfs(node))
        }
        return res
    }
}
```

```swift
class Solution {
    func numOfMinutes(_ n: Int, _ headID: Int, _ manager: [Int], _ informTime: [Int]) -> Int {
        var manager = manager
        var informTime = informTime

        func dfs(_ node: Int) -> Int {
            if manager[node] != -1 {
                informTime[node] += dfs(manager[node])
                manager[node] = -1
            }
            return informTime[node]
        }

        var res = 0
        for node in 0..<n {
            res = max(res, dfs(node))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## Common Pitfalls

### Summing Instead of Taking Maximum Over Children

The total time is the longest path from root to any leaf, not the sum of all inform times. When a manager informs multiple subordinates, they are informed simultaneously. You should take the maximum time among all subtrees, not add them together. Using sum instead of max produces answers that are way too large.

### Forgetting That Leaf Nodes Have Zero Inform Time

Employees with no subordinates (leaf nodes) have `informTime[i] = 0`. When building the adjacency list or computing times, ensure you handle this correctly. Some solutions mistakenly add inform time even for leaves or skip leaves entirely, leading to incorrect results.

### Not Building the Adjacency List Correctly

The `manager` array gives parent pointers, but for DFS/BFS you need children pointers. A common mistake is iterating incorrectly when building the adjacency list or accidentally including the head in some manager's list. The head has `manager[headID] = -1`, so you must skip adding edges for the head node.
