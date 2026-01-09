## 1. Depth First Search

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
