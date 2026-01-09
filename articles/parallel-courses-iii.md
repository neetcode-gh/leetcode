## 1. Depth First Search

### Intuition

Each course has a duration, and we can take courses in parallel as long as prerequisites are satisfied. The minimum time to finish all courses equals the longest path in the dependency graph, where path length is the sum of course durations along that path.

For each course, we need to find the maximum time required to complete it and all its dependent courses. Using DFS with memoization, we compute the total time starting from each course by taking the maximum of all paths through its dependencies, plus the course's own duration.

### Algorithm

1. Build an adjacency list where each course points to its dependent courses.
2. Use a hash map to cache the maximum completion time starting from each course.
3. For each course, run DFS:
   - Return the cached value if already computed.
   - Recursively compute the maximum time through all dependent courses.
   - Add the current course's duration to get the total time from this course.
   - Cache and return the result.
4. Return the maximum value among all courses' completion times.

::tabs-start

```python
class Solution:
    def minimumTime(self, n: int, relations: list[list[int]], time: list[int]) -> int:
        adj = defaultdict(list)
        for src, dst in relations:
            adj[src].append(dst)

        max_time = {}

        def dfs(src):
            if src in max_time:
                return max_time[src]
            res = time[src - 1]
            for nei in adj[src]:
                res = max(res, time[src - 1] + dfs(nei))
            max_time[src] = res
            return res

        for i in range(1, n + 1):
            dfs(i)

        return max(max_time.values())
```

```java
public class Solution {
    private Map<Integer, Integer> maxTime;
    private List<Integer>[] adj;
    private int[] time;

    public int minimumTime(int n, int[][] relations, int[] time) {
        this.time = time;
        this.maxTime = new HashMap<>();
        this.adj = new ArrayList[n + 1];

        for (int i = 1; i <= n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] relation : relations) {
            adj[relation[0]].add(relation[1]);
        }

        for (int i = 1; i <= n; i++) {
            dfs(i);
        }

        return Collections.max(maxTime.values());
    }

    private int dfs(int src) {
        if (maxTime.containsKey(src)) {
            return maxTime.get(src);
        }

        int res = time[src - 1];
        for (int nei : adj[src]) {
            res = Math.max(res, time[src - 1] + dfs(nei));
        }
        maxTime.put(src, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    unordered_map<int, int> maxTime;
    vector<vector<int>> adj;
    vector<int> time;

    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
        this->time = time;
        adj.resize(n + 1);

        for (auto& relation : relations) {
            adj[relation[0]].push_back(relation[1]);
        }

        for (int i = 1; i <= n; i++) {
            dfs(i);
        }

        int res = 0;
        for (auto& [key, value] : maxTime) {
            res = max(res, value);
        }
        return res;
    }

private:
    int dfs(int src) {
        if (maxTime.count(src)) {
            return maxTime[src];
        }

        int res = time[src - 1];
        for (int nei : adj[src]) {
            res = max(res, time[src - 1] + dfs(nei));
        }
        maxTime[src] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} relations
     * @param {number[]} time
     * @return {number}
     */
    minimumTime(n, relations, time) {
        let adj = Array.from({ length: n + 1 }, () => []);
        let maxTime = new Map();

        for (let [src, dst] of relations) {
            adj[src].push(dst);
        }

        const dfs = (src) => {
            if (maxTime.has(src)) {
                return maxTime.get(src);
            }

            let res = time[src - 1];
            for (let nei of adj[src]) {
                res = Math.max(res, time[src - 1] + dfs(nei));
            }
            maxTime.set(src, res);
            return res;
        };

        for (let i = 1; i <= n; i++) {
            dfs(i);
        }

        return Math.max(...maxTime.values());
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> maxTime;
    private List<int>[] adj;
    private int[] time;

    public int MinimumTime(int n, int[][] relations, int[] time) {
        this.time = time;
        this.maxTime = new Dictionary<int, int>();
        this.adj = new List<int>[n + 1];

        for (int i = 1; i <= n; i++) {
            adj[i] = new List<int>();
        }
        foreach (var relation in relations) {
            adj[relation[0]].Add(relation[1]);
        }

        for (int i = 1; i <= n; i++) {
            Dfs(i);
        }

        return maxTime.Values.Max();
    }

    private int Dfs(int src) {
        if (maxTime.ContainsKey(src)) {
            return maxTime[src];
        }

        int res = time[src - 1];
        foreach (int nei in adj[src]) {
            res = Math.Max(res, time[src - 1] + Dfs(nei));
        }
        maxTime[src] = res;
        return res;
    }
}
```

```go
func minimumTime(n int, relations [][]int, time []int) int {
    adj := make([][]int, n+1)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, rel := range relations {
        adj[rel[0]] = append(adj[rel[0]], rel[1])
    }

    maxTime := make(map[int]int)

    var dfs func(src int) int
    dfs = func(src int) int {
        if val, ok := maxTime[src]; ok {
            return val
        }

        res := time[src-1]
        for _, nei := range adj[src] {
            if time[src-1]+dfs(nei) > res {
                res = time[src-1] + dfs(nei)
            }
        }
        maxTime[src] = res
        return res
    }

    for i := 1; i <= n; i++ {
        dfs(i)
    }

    result := 0
    for _, v := range maxTime {
        if v > result {
            result = v
        }
    }
    return result
}
```

```kotlin
class Solution {
    private lateinit var maxTime: MutableMap<Int, Int>
    private lateinit var adj: Array<MutableList<Int>>
    private lateinit var time: IntArray

    fun minimumTime(n: Int, relations: Array<IntArray>, time: IntArray): Int {
        this.time = time
        this.maxTime = mutableMapOf()
        this.adj = Array(n + 1) { mutableListOf() }

        for (relation in relations) {
            adj[relation[0]].add(relation[1])
        }

        for (i in 1..n) {
            dfs(i)
        }

        return maxTime.values.max()!!
    }

    private fun dfs(src: Int): Int {
        if (maxTime.containsKey(src)) {
            return maxTime[src]!!
        }

        var res = time[src - 1]
        for (nei in adj[src]) {
            res = maxOf(res, time[src - 1] + dfs(nei))
        }
        maxTime[src] = res
        return res
    }
}
```

```swift
class Solution {
    private var maxTime = [Int: Int]()
    private var adj = [[Int]]()
    private var time = [Int]()

    func minimumTime(_ n: Int, _ relations: [[Int]], _ time: [Int]) -> Int {
        self.time = time
        self.maxTime = [:]
        self.adj = Array(repeating: [Int](), count: n + 1)

        for relation in relations {
            adj[relation[0]].append(relation[1])
        }

        for i in 1...n {
            _ = dfs(i)
        }

        return maxTime.values.max()!
    }

    private func dfs(_ src: Int) -> Int {
        if let val = maxTime[src] {
            return val
        }

        var res = time[src - 1]
        for nei in adj[src] {
            res = max(res, time[src - 1] + dfs(nei))
        }
        maxTime[src] = res
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.

---

## 2. Iterative DFS

### Intuition

The recursive DFS can be converted to an iterative version using an explicit stack. This avoids potential stack overflow for deep recursion and gives more control over the traversal order.

We use a two-phase approach: first push a node onto the stack, then when we pop it again after processing its children, we compute its final value. A "processed" flag distinguishes between these two phases.

### Algorithm

1. Build an adjacency list for course dependencies.
2. Initialize arrays to track the maximum time for each course and whether each course is fully processed.
3. For each unvisited course, start an iterative DFS:
   - Push the course onto the stack.
   - When popping, if not processed, mark as processing and push back, then push all unvisited neighbors.
   - When popping a processed node, compute its max time as its duration plus the maximum of its neighbors' times.
4. Return the maximum completion time across all courses.

::tabs-start

```python
class Solution:
    def minimumTime(self, n: int, relations: list[list[int]], time: list[int]) -> int:
        adj = [[] for _ in range(n)]
        for src, dst in relations:
            adj[src - 1].append(dst - 1)

        maxTime = [-1] * n
        processed = [False] * n

        for i in range(n):
            if maxTime[i] == -1:
                stack = [i]
                while stack:
                    node = stack.pop()
                    if processed[node]:
                        best = 0
                        for nei in adj[node]:
                            best = max(best, maxTime[nei])
                        maxTime[node] = time[node] + best
                    else:
                        processed[node] = True
                        stack.append(node)
                        for nei in adj[node]:
                            if maxTime[nei] == -1:
                                stack.append(nei)
        return max(maxTime)
```

```java
public class Solution {
    public int minimumTime(int n, int[][] relations, int[] time) {
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] rel : relations) {
            adj[rel[0] - 1].add(rel[1] - 1);
        }

        int[] maxTime = new int[n];
        Arrays.fill(maxTime, -1);
        boolean[] processed = new boolean[n];

        for (int i = 0; i < n; i++) {
            if (maxTime[i] == -1) {
                Stack<Integer> stack = new Stack<>();
                stack.push(i);
                while (!stack.isEmpty()) {
                    int node = stack.pop();
                    if (processed[node]) {
                        int best = 0;
                        for (int nei : adj[node]) {
                            best = Math.max(best, maxTime[nei]);
                        }
                        maxTime[node] = time[node] + best;
                    } else {
                        processed[node] = true;
                        stack.push(node);
                        for (int nei : adj[node]) {
                            if (maxTime[nei] == -1) {
                                stack.push(nei);
                            }
                        }
                    }
                }
            }
        }
        return Arrays.stream(maxTime).max().getAsInt();
    }
}
```

```cpp
class Solution {
public:
    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
        vector<vector<int>> adj(n);
        for (auto& rel : relations) {
            adj[rel[0] - 1].push_back(rel[1] - 1);
        }

        vector<int> maxTime(n, -1);
        vector<bool> processed(n, false);

        for (int i = 0; i < n; i++) {
            if (maxTime[i] == -1) {
                stack<int> stk;
                stk.push(i);
                while (!stk.empty()) {
                    int node = stk.top(); stk.pop();
                    if (processed[node]) {
                        int best = 0;
                        for (int nei : adj[node]) {
                            best = max(best, maxTime[nei]);
                        }
                        maxTime[node] = time[node] + best;
                    } else {
                        processed[node] = true;
                        stk.push(node);
                        for (int nei : adj[node]) {
                            if (maxTime[nei] == -1) {
                                stk.push(nei);
                            }
                        }
                    }
                }
            }
        }
        return *max_element(maxTime.begin(), maxTime.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} relations
     * @param {number[]} time
     * @return {number}
     */
    minimumTime(n, relations, time) {
        let adj = Array.from({ length: n }, () => []);
        for (let [src, dst] of relations) {
            adj[src - 1].push(dst - 1);
        }

        let maxTime = Array(n).fill(-1);
        let processed = Array(n).fill(false);

        for (let i = 0; i < n; i++) {
            if (maxTime[i] === -1) {
                let stack = [i];
                while (stack.length > 0) {
                    let node = stack.pop();
                    if (processed[node]) {
                        let best = 0;
                        for (let nei of adj[node]) {
                            best = Math.max(best, maxTime[nei]);
                        }
                        maxTime[node] = time[node] + best;
                    } else {
                        processed[node] = true;
                        stack.push(node);
                        for (let nei of adj[node]) {
                            if (maxTime[nei] === -1) {
                                stack.push(nei);
                            }
                        }
                    }
                }
            }
        }
        return Math.max(...maxTime);
    }
}
```

```csharp
public class Solution {
    public int MinimumTime(int n, int[][] relations, int[] time) {
        List<int>[] adj = new List<int>[n];
        for (int i = 0; i < n; i++) adj[i] = new List<int>();
        foreach (var rel in relations) {
            adj[rel[0] - 1].Add(rel[1] - 1);
        }

        int[] maxTime = new int[n];
        Array.Fill(maxTime, -1);
        bool[] processed = new bool[n];

        for (int i = 0; i < n; i++) {
            if (maxTime[i] == -1) {
                Stack<int> stack = new Stack<int>();
                stack.Push(i);
                while (stack.Count > 0) {
                    int node = stack.Pop();
                    if (processed[node]) {
                        int best = 0;
                        foreach (int nei in adj[node]) {
                            best = Math.Max(best, maxTime[nei]);
                        }
                        maxTime[node] = time[node] + best;
                    } else {
                        processed[node] = true;
                        stack.Push(node);
                        foreach (int nei in adj[node]) {
                            if (maxTime[nei] == -1) {
                                stack.Push(nei);
                            }
                        }
                    }
                }
            }
        }
        return maxTime.Max();
    }
}
```

```go
func minimumTime(n int, relations [][]int, time []int) int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, rel := range relations {
        adj[rel[0]-1] = append(adj[rel[0]-1], rel[1]-1)
    }

    maxTime := make([]int, n)
    for i := range maxTime {
        maxTime[i] = -1
    }
    processed := make([]bool, n)

    for i := 0; i < n; i++ {
        if maxTime[i] == -1 {
            stack := []int{i}
            for len(stack) > 0 {
                node := stack[len(stack)-1]
                stack = stack[:len(stack)-1]
                if processed[node] {
                    best := 0
                    for _, nei := range adj[node] {
                        if maxTime[nei] > best {
                            best = maxTime[nei]
                        }
                    }
                    maxTime[node] = time[node] + best
                } else {
                    processed[node] = true
                    stack = append(stack, node)
                    for _, nei := range adj[node] {
                        if maxTime[nei] == -1 {
                            stack = append(stack, nei)
                        }
                    }
                }
            }
        }
    }

    result := 0
    for _, v := range maxTime {
        if v > result {
            result = v
        }
    }
    return result
}
```

```kotlin
class Solution {
    fun minimumTime(n: Int, relations: Array<IntArray>, time: IntArray): Int {
        val adj = Array(n) { mutableListOf<Int>() }
        for (rel in relations) {
            adj[rel[0] - 1].add(rel[1] - 1)
        }

        val maxTime = IntArray(n) { -1 }
        val processed = BooleanArray(n)

        for (i in 0 until n) {
            if (maxTime[i] == -1) {
                val stack = ArrayDeque<Int>()
                stack.addLast(i)
                while (stack.isNotEmpty()) {
                    val node = stack.removeLast()
                    if (processed[node]) {
                        var best = 0
                        for (nei in adj[node]) {
                            best = maxOf(best, maxTime[nei])
                        }
                        maxTime[node] = time[node] + best
                    } else {
                        processed[node] = true
                        stack.addLast(node)
                        for (nei in adj[node]) {
                            if (maxTime[nei] == -1) {
                                stack.addLast(nei)
                            }
                        }
                    }
                }
            }
        }
        return maxTime.max()!!
    }
}
```

```swift
class Solution {
    func minimumTime(_ n: Int, _ relations: [[Int]], _ time: [Int]) -> Int {
        var adj = [[Int]](repeating: [], count: n)
        for rel in relations {
            adj[rel[0] - 1].append(rel[1] - 1)
        }

        var maxTime = [Int](repeating: -1, count: n)
        var processed = [Bool](repeating: false, count: n)

        for i in 0..<n {
            if maxTime[i] == -1 {
                var stack = [i]
                while !stack.isEmpty {
                    let node = stack.removeLast()
                    if processed[node] {
                        var best = 0
                        for nei in adj[node] {
                            best = max(best, maxTime[nei])
                        }
                        maxTime[node] = time[node] + best
                    } else {
                        processed[node] = true
                        stack.append(node)
                        for nei in adj[node] {
                            if maxTime[nei] == -1 {
                                stack.append(nei)
                            }
                        }
                    }
                }
            }
        }
        return maxTime.max()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.

---

## 3. Topological Sort (Kahn's Algorithm)

### Intuition

Instead of working backwards from end nodes (DFS approach), we can work forwards from start nodes using topological sort. Kahn's algorithm processes nodes in dependency order, ensuring that when we process a course, all its prerequisites have already been processed.

For each course, we track the maximum time needed to reach it (including its own duration). When we process a course, we update all its dependents by propagating the maximum completion time. This naturally computes the longest weighted path through the graph.

### Algorithm

1. Build an adjacency list and compute in-degrees for all courses.
2. Initialize each course's max time to its own duration.
3. Add all courses with in-degree 0 to the queue.
4. Process courses in topological order:
   - For each dependent course, update its max time to be the maximum of its current value and the predecessor's time plus its own duration.
   - Decrement the in-degree and add to the queue when it reaches 0.
5. Return the maximum completion time across all courses.

::tabs-start

```python
class Solution:
    def minimumTime(self, n: int, relations: list[list[int]], time: list[int]) -> int:
        adj = [[] for _ in range(n)]
        indegree = [0] * n
        maxTime = time[:]

        for src, dst in relations:
            adj[src - 1].append(dst - 1)
            indegree[dst - 1] += 1

        queue = deque([i for i in range(n) if indegree[i] == 0])
        while queue:
            node = queue.popleft()
            for nei in adj[node]:
                maxTime[nei] = max(maxTime[nei], maxTime[node] + time[nei])
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    queue.append(nei)

        return max(maxTime)
```

```java
public class Solution {
    public int minimumTime(int n, int[][] relations, int[] time) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indegree = new int[n];
        int[] maxTime = Arrays.copyOf(time, n);

        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }

        for (int[] relation : relations) {
            int src = relation[0] - 1, dst = relation[1] - 1;
            adj.get(src).add(dst);
            indegree[dst]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.add(i);
            }
        }

        while (!queue.isEmpty()) {
            int node = queue.poll();
            for (int nei : adj.get(node)) {
                maxTime[nei] = Math.max(maxTime[nei], maxTime[node] + time[nei]);
                if (--indegree[nei] == 0) {
                    queue.add(nei);
                }
            }
        }

        return Arrays.stream(maxTime).max().getAsInt();
    }
}
```

```cpp
class Solution {
public:
    int minimumTime(int n, vector<vector<int>>& relations, vector<int>& time) {
        vector<vector<int>> adj(n);
        vector<int> indegree(n, 0);
        vector<int> maxTime(time.begin(), time.end());

        for (auto& relation : relations) {
            int src = relation[0] - 1, dst = relation[1] - 1;
            adj[src].push_back(dst);
            indegree[dst]++;
        }

        queue<int> queue;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.push(i);
            }
        }

        while (!queue.empty()) {
            int node = queue.front(); queue.pop();
            for (int nei : adj[node]) {
                maxTime[nei] = max(maxTime[nei], maxTime[node] + time[nei]);
                if (--indegree[nei] == 0) {
                    queue.push(nei);
                }
            }
        }

        return *max_element(maxTime.begin(), maxTime.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} relations
     * @param {number[]} time
     * @return {number}
     */
    minimumTime(n, relations, time) {
        let adj = Array.from({ length: n }, () => []);
        let indegree = Array(n).fill(0);
        let maxTime = [...time];

        for (let [src, dst] of relations) {
            adj[src - 1].push(dst - 1);
            indegree[dst - 1]++;
        }

        let queue = new Queue();
        for (let i = 0; i < n; i++) {
            if (indegree[i] === 0) {
                queue.push(i);
            }
        }

        while (!queue.isEmpty()) {
            let node = queue.pop();
            for (let nei of adj[node]) {
                maxTime[nei] = Math.max(
                    maxTime[nei],
                    maxTime[node] + time[nei],
                );
                if (--indegree[nei] === 0) {
                    queue.push(nei);
                }
            }
        }

        return Math.max(...maxTime);
    }
}
```

```csharp
public class Solution {
    public int MinimumTime(int n, int[][] relations, int[] time) {
        List<List<int>> adj = new List<List<int>>();
        int[] indegree = new int[n];
        int[] maxTime = (int[])time.Clone();

        for (int i = 0; i < n; i++) {
            adj.Add(new List<int>());
        }

        foreach (var relation in relations) {
            int src = relation[0] - 1, dst = relation[1] - 1;
            adj[src].Add(dst);
            indegree[dst]++;
        }

        Queue<int> queue = new Queue<int>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.Enqueue(i);
            }
        }

        while (queue.Count > 0) {
            int node = queue.Dequeue();
            foreach (int nei in adj[node]) {
                maxTime[nei] = Math.Max(maxTime[nei], maxTime[node] + time[nei]);
                if (--indegree[nei] == 0) {
                    queue.Enqueue(nei);
                }
            }
        }

        return maxTime.Max();
    }
}
```

```go
func minimumTime(n int, relations [][]int, time []int) int {
    adj := make([][]int, n)
    for i := range adj {
        adj[i] = []int{}
    }
    indegree := make([]int, n)
    maxTime := make([]int, n)
    copy(maxTime, time)

    for _, relation := range relations {
        src, dst := relation[0]-1, relation[1]-1
        adj[src] = append(adj[src], dst)
        indegree[dst]++
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
        for _, nei := range adj[node] {
            if maxTime[node]+time[nei] > maxTime[nei] {
                maxTime[nei] = maxTime[node] + time[nei]
            }
            indegree[nei]--
            if indegree[nei] == 0 {
                queue = append(queue, nei)
            }
        }
    }

    result := 0
    for _, v := range maxTime {
        if v > result {
            result = v
        }
    }
    return result
}
```

```kotlin
class Solution {
    fun minimumTime(n: Int, relations: Array<IntArray>, time: IntArray): Int {
        val adj = Array(n) { mutableListOf<Int>() }
        val indegree = IntArray(n)
        val maxTime = time.copyOf()

        for (relation in relations) {
            val src = relation[0] - 1
            val dst = relation[1] - 1
            adj[src].add(dst)
            indegree[dst]++
        }

        val queue = ArrayDeque<Int>()
        for (i in 0 until n) {
            if (indegree[i] == 0) {
                queue.addLast(i)
            }
        }

        while (queue.isNotEmpty()) {
            val node = queue.removeFirst()
            for (nei in adj[node]) {
                maxTime[nei] = maxOf(maxTime[nei], maxTime[node] + time[nei])
                if (--indegree[nei] == 0) {
                    queue.addLast(nei)
                }
            }
        }

        return maxTime.max()!!
    }
}
```

```swift
class Solution {
    func minimumTime(_ n: Int, _ relations: [[Int]], _ time: [Int]) -> Int {
        var adj = [[Int]](repeating: [], count: n)
        var indegree = [Int](repeating: 0, count: n)
        var maxTime = time

        for relation in relations {
            let src = relation[0] - 1, dst = relation[1] - 1
            adj[src].append(dst)
            indegree[dst] += 1
        }

        var queue = [Int]()
        for i in 0..<n {
            if indegree[i] == 0 {
                queue.append(i)
            }
        }

        var index = 0
        while index < queue.count {
            let node = queue[index]
            index += 1
            for nei in adj[node] {
                maxTime[nei] = max(maxTime[nei], maxTime[node] + time[nei])
                indegree[nei] -= 1
                if indegree[nei] == 0 {
                    queue.append(nei)
                }
            }
        }

        return maxTime.max()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.
