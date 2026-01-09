## 1. Breadth-First Search (Kahn's Algorithm)

::tabs-start

```python
class Solution:
    def minimumSemesters(self, N: int, relations: List[List[int]]) -> int:
        graph = {i: [] for i in range(1, N + 1)}
        in_count = {i: 0 for i in range(1, N + 1)}  # or in-degree
        for start_node, end_node in relations:
            graph[start_node].append(end_node)
            in_count[end_node] += 1

        queue = []
        # we use list here since we are not
        # popping from the front in this code
        for node in graph:
            if in_count[node] == 0:
                queue.append(node)

        step = 0
        studied_count = 0
        # start learning with BFS
        while queue:
            # start new semester
            step += 1
            next_queue = []
            for node in queue:
                studied_count += 1
                end_nodes = graph[node]
                for end_node in end_nodes:
                    in_count[end_node] -= 1
                    # if all prerequisite courses learned
                    if in_count[end_node] == 0:
                        next_queue.append(end_node)
            queue = next_queue

        return step if studied_count == N else -1
```

```java
class Solution {
    public int minimumSemesters(int N, int[][] relations) {
        int[] inCount = new int[N + 1]; // or indegree
        List<List<Integer>> graph = new ArrayList<>(N + 1);
        for (int i = 0; i < N + 1; ++i) {
            graph.add(new ArrayList<Integer>());
        }

        for (int[] relation : relations) {
            graph.get(relation[0]).add(relation[1]);
            inCount[relation[1]]++;
        }

        int step = 0;
        int studiedCount = 0;
        List<Integer> bfsQueue = new ArrayList<>();
        for (int node = 1; node < N + 1; node++) {
            if (inCount[node] == 0) {
                bfsQueue.add(node);
            }
        }

        // start learning with BFS
        while (!bfsQueue.isEmpty()) {
            // start new semester
            step++;
            List<Integer> nextQueue = new ArrayList<>();
            for (int node : bfsQueue) {
                studiedCount++;
                for (int endNode : graph.get(node)) {
                    inCount[endNode]--;
                    // if all prerequisite courses learned
                    if (inCount[endNode] == 0) {
                        nextQueue.add(endNode);
                    }
                }
            }
            bfsQueue = nextQueue;
        }

        // check if learn all courses
        return studiedCount == N ? step : -1;
    }
}
```

```cpp
class Solution {
public:
    int minimumSemesters(int N, vector<vector<int>>& relations) {
        vector<int> inCount(N + 1, 0);  // or indegree
        vector<vector<int>> graph(N + 1);
        for (auto& relation : relations) {
            graph[relation[0]].push_back(relation[1]);
            inCount[relation[1]]++;
        }

        int step = 0;
        int studiedCount = 0;
        vector<int> bfsQueue;
        for (int node = 1; node < N + 1; node++) {
            if (inCount[node] == 0) {
                bfsQueue.push_back(node);
            }
        }
        
        // start learning with BFS
        while (!bfsQueue.empty()) {
            // start new semester
            step++;
            vector<int> nextQueue;
            for (auto& node : bfsQueue) {
                studiedCount++;
                for (auto& endNode : graph[node]) {
                    inCount[endNode]--;
                    // if all prerequisite courses learned
                    if (inCount[endNode] == 0) {
                        nextQueue.push_back(endNode);
                    }
                }
            }
            bfsQueue = nextQueue;
        }

        // check if learn all courses
        return studiedCount == N ? step : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} relations
     * @return {number}
     */
    minimumSemesters(n, relations) {
        const graph = {};
        const inCount = {}; // or in-degree

        for (let i = 1; i <= n; i++) {
            graph[i] = [];
            inCount[i] = 0;
        }

        for (const [startNode, endNode] of relations) {
            graph[startNode].push(endNode);
            inCount[endNode]++;
        }

        let queue = [];
        // we use list here since we are not
        // popping from the front in this code
        for (let node = 1; node <= n; node++) {
            if (inCount[node] === 0) {
                queue.push(node);
            }
        }

        let step = 0;
        let studiedCount = 0;
        // start learning with BFS
        while (queue.length > 0) {
            // start new semester
            step++;
            const nextQueue = [];

            for (const node of queue) {
                studiedCount++;
                const endNodes = graph[node];

                for (const endNode of endNodes) {
                    inCount[endNode]--;
                    // if all prerequisite courses learned
                    if (inCount[endNode] === 0) {
                        nextQueue.push(endNode);
                    }
                }
            }

            queue = nextQueue;
        }

        return studiedCount === n ? step : -1;
    }
}
```

```csharp
public class Solution {
    public int MinimumSemesters(int N, int[][] relations) {
        int[] inCount = new int[N + 1];
        List<List<int>> graph = new List<List<int>>();
        for (int i = 0; i <= N; i++) {
            graph.Add(new List<int>());
        }

        foreach (var relation in relations) {
            graph[relation[0]].Add(relation[1]);
            inCount[relation[1]]++;
        }

        int step = 0;
        int studiedCount = 0;
        List<int> bfsQueue = new List<int>();
        for (int node = 1; node <= N; node++) {
            if (inCount[node] == 0) {
                bfsQueue.Add(node);
            }
        }

        while (bfsQueue.Count > 0) {
            step++;
            List<int> nextQueue = new List<int>();
            foreach (int node in bfsQueue) {
                studiedCount++;
                foreach (int endNode in graph[node]) {
                    inCount[endNode]--;
                    if (inCount[endNode] == 0) {
                        nextQueue.Add(endNode);
                    }
                }
            }
            bfsQueue = nextQueue;
        }

        return studiedCount == N ? step : -1;
    }
}
```

```go
func minimumSemesters(n int, relations [][]int) int {
    graph := make([][]int, n+1)
    inCount := make([]int, n+1)
    for i := range graph {
        graph[i] = []int{}
    }

    for _, relation := range relations {
        graph[relation[0]] = append(graph[relation[0]], relation[1])
        inCount[relation[1]]++
    }

    step := 0
    studiedCount := 0
    queue := []int{}
    for node := 1; node <= n; node++ {
        if inCount[node] == 0 {
            queue = append(queue, node)
        }
    }

    for len(queue) > 0 {
        step++
        nextQueue := []int{}
        for _, node := range queue {
            studiedCount++
            for _, endNode := range graph[node] {
                inCount[endNode]--
                if inCount[endNode] == 0 {
                    nextQueue = append(nextQueue, endNode)
                }
            }
        }
        queue = nextQueue
    }

    if studiedCount == n {
        return step
    }
    return -1
}
```

```kotlin
class Solution {
    fun minimumSemesters(n: Int, relations: Array<IntArray>): Int {
        val graph = Array(n + 1) { mutableListOf<Int>() }
        val inCount = IntArray(n + 1)

        for (relation in relations) {
            graph[relation[0]].add(relation[1])
            inCount[relation[1]]++
        }

        var step = 0
        var studiedCount = 0
        var queue = mutableListOf<Int>()
        for (node in 1..n) {
            if (inCount[node] == 0) {
                queue.add(node)
            }
        }

        while (queue.isNotEmpty()) {
            step++
            val nextQueue = mutableListOf<Int>()
            for (node in queue) {
                studiedCount++
                for (endNode in graph[node]) {
                    inCount[endNode]--
                    if (inCount[endNode] == 0) {
                        nextQueue.add(endNode)
                    }
                }
            }
            queue = nextQueue
        }

        return if (studiedCount == n) step else -1
    }
}
```

```swift
class Solution {
    func minimumSemesters(_ n: Int, _ relations: [[Int]]) -> Int {
        var graph = [[Int]](repeating: [], count: n + 1)
        var inCount = [Int](repeating: 0, count: n + 1)

        for relation in relations {
            graph[relation[0]].append(relation[1])
            inCount[relation[1]] += 1
        }

        var step = 0
        var studiedCount = 0
        var queue = [Int]()
        for node in 1...n {
            if inCount[node] == 0 {
                queue.append(node)
            }
        }

        while !queue.isEmpty {
            step += 1
            var nextQueue = [Int]()
            for node in queue {
                studiedCount += 1
                for endNode in graph[node] {
                    inCount[endNode] -= 1
                    if inCount[endNode] == 0 {
                        nextQueue.append(endNode)
                    }
                }
            }
            queue = nextQueue
        }

        return studiedCount == n ? step : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N + E)$
- Space complexity: $O(N + E)$

>  Where $E$ is the length of `relations` and $N$ is the number of courses.

---

## 2. Depth-First Search: Check for Cycles + Find Longest Path

::tabs-start

```python
class Solution:
    def minimumSemesters(self, N: int, relations: List[List[int]]) -> int:
        graph = {i: [] for i in range(1, N + 1)}
        for start_node, end_node in relations:
            graph[start_node].append(end_node)

        # check if the graph contains a cycle
        visited = {}

        def dfs_check_cycle(node: int) -> bool:
            # return True if graph has a cycle
            if node in visited:
                return visited[node]
            else:
                # mark as visiting
                visited[node] = -1
            for end_node in graph[node]:
                if dfs_check_cycle(end_node):
                    # we meet a cycle!
                    return True
            # mark as visited
            visited[node] = False
            return False

        # if has cycle, return -1
        for node in graph.keys():
            if dfs_check_cycle(node):
                return -1

        # if no cycle, return the longest path
        visited_length = {}

        def dfs_max_path(node: int) -> int:
            # return the longest path (inclusive)
            if node in visited_length:
                return visited_length[node]
            max_length = 1
            for end_node in graph[node]:
                length = dfs_max_path(end_node)
                max_length = max(length+1, max_length)
            # store it
            visited_length[node] = max_length
            return max_length

        return max(dfs_max_path(node)for node in graph.keys())
```

```java
class Solution {
    public int minimumSemesters(int N, int[][] relations) {
        List<List<Integer>> graph = new ArrayList<>(N + 1);
        for (int i = 0; i < N + 1; ++i) {
            graph.add(new ArrayList<Integer>());
        }
        for (int[] relation : relations) {
            graph.get(relation[0]).add(relation[1]);
        }
        // check if the graph contains a cycle
        int[] visited = new int[N + 1];
        for (int node = 1; node < N + 1; node++) {
            // if has cycle, return -1
            if (dfsCheckCycle(node, graph, visited) == -1) {
                return -1;
            }
        }

        // if no cycle, return the longest path
        int[] visitedLength = new int[N + 1];
        int maxLength = 1;
        for (int node = 1; node < N + 1; node++) {
            int length = dfsMaxPath(node, graph, visitedLength);
            maxLength = Math.max(length, maxLength);
        }
        return maxLength;
    }

    private int dfsCheckCycle(int node, List<List<Integer>> graph, int[] visited) {
        // return -1 if has a cycle
        // return 1 if does not have any cycle
        if (visited[node] != 0) {
            return visited[node];
        } else {
            // mark as visiting
            visited[node] = -1;
        }
        for (int endNode : graph.get(node)) {
            if (dfsCheckCycle(endNode, graph, visited) == -1) {
                // we meet a cycle!
                return -1;
            }
        }
        // mark as visited
        visited[node] = 1;
        return 1;
    }

    private int dfsMaxPath(int node, List<List<Integer>> graph, int[] visitedLength) {
        // return the longest path (inclusive)
        if (visitedLength[node] != 0) {
            return visitedLength[node];
        }
        int maxLength = 1;
        for (int endNode : graph.get(node)) {
            int length = dfsMaxPath(endNode, graph, visitedLength);
            maxLength = Math.max(length + 1, maxLength);
        }
        // store it
        visitedLength[node] = maxLength;
        return maxLength;
    }
}
```

```cpp
class Solution {
public:
    int minimumSemesters(int N, vector<vector<int>>& relations) {
        vector<vector<int>> graph(N + 1);
        for (auto& relation : relations) {
            graph[relation[0]].push_back(relation[1]);
        }
        // check if the graph contains a cycle
        vector<int> visited(N + 1, 0);
        for (int node = 1; node < N + 1; node++) {
            // if has cycle, return -1
            if (dfsCheckCycle(node, graph, visited) == -1) {
                return -1;
            }
        }

        // if no cycle, return the longest path
        vector<int> visitedLength(N + 1, 0);
        int maxLength = 1;
        for (int node = 1; node < N + 1; node++) {
            int length = dfsMaxPath(node, graph, visitedLength);
            maxLength = max(length, maxLength);
        }
        return maxLength;
    }

private:
    int dfsCheckCycle(int node, vector<vector<int>>& graph,
                      vector<int>& visited) {
        // return -1 if has a cycle
        // return 1 if does not have any cycle
        if (visited[node] != 0) {
            return visited[node];
        } else {
            // mark as visiting
            visited[node] = -1;
        }
        for (auto& endNode : graph[node]) {
            if (dfsCheckCycle(endNode, graph, visited) == -1) {
                // we meet a cycle!
                return -1;
            }
        }
        // mark as visited
        visited[node] = 1;
        return 1;
    }

    int dfsMaxPath(int node, vector<vector<int>>& graph,
                   vector<int>& visitedLength) {
        // return the longest path (inclusive)
        if (visitedLength[node] != 0) {
            return visitedLength[node];
        }
        int maxLength = 1;
        for (auto& endNode : graph[node]) {
            int length = dfsMaxPath(endNode, graph, visitedLength);
            maxLength = max(length + 1, maxLength);
        }
        // store it
        visitedLength[node] = maxLength;
        return maxLength;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} relations
     * @return {number}
     */
    minimumSemesters(n, relations) {
        const graph = {};
        for (let i = 1; i <= n; i++) {
            graph[i] = [];
        }
        for (const [startNode, endNode] of relations) {
            graph[startNode].push(endNode);
        }

        const visited = {};

        const dfsCheckCycle = (node) => {
            if (visited[node] !== undefined) {
                return visited[node];
            }
            visited[node] = -1;
            for (const endNode of graph[node]) {
                if (dfsCheckCycle(endNode) === -1) {
                    return -1;
                }
            }
            visited[node] = 1;
            return 1;
        };

        for (let node = 1; node <= n; node++) {
            if (dfsCheckCycle(node) === -1) {
                return -1;
            }
        }

        const visitedLength = {};

        const dfsMaxPath = (node) => {
            if (visitedLength[node] !== undefined) {
                return visitedLength[node];
            }
            let maxLength = 1;
            for (const endNode of graph[node]) {
                const length = dfsMaxPath(endNode);
                maxLength = Math.max(length + 1, maxLength);
            }
            visitedLength[node] = maxLength;
            return maxLength;
        };

        let maxLength = 1;
        for (let node = 1; node <= n; node++) {
            const length = dfsMaxPath(node);
            maxLength = Math.max(length, maxLength);
        }
        return maxLength;
    }
}
```

```csharp
public class Solution {
    public int MinimumSemesters(int N, int[][] relations) {
        List<List<int>> graph = new List<List<int>>();
        for (int i = 0; i <= N; i++) {
            graph.Add(new List<int>());
        }
        foreach (var relation in relations) {
            graph[relation[0]].Add(relation[1]);
        }

        int[] visited = new int[N + 1];
        for (int node = 1; node <= N; node++) {
            if (DfsCheckCycle(node, graph, visited) == -1) {
                return -1;
            }
        }

        int[] visitedLength = new int[N + 1];
        int maxLength = 1;
        for (int node = 1; node <= N; node++) {
            int length = DfsMaxPath(node, graph, visitedLength);
            maxLength = Math.Max(length, maxLength);
        }
        return maxLength;
    }

    private int DfsCheckCycle(int node, List<List<int>> graph, int[] visited) {
        if (visited[node] != 0) {
            return visited[node];
        }
        visited[node] = -1;
        foreach (int endNode in graph[node]) {
            if (DfsCheckCycle(endNode, graph, visited) == -1) {
                return -1;
            }
        }
        visited[node] = 1;
        return 1;
    }

    private int DfsMaxPath(int node, List<List<int>> graph, int[] visitedLength) {
        if (visitedLength[node] != 0) {
            return visitedLength[node];
        }
        int maxLength = 1;
        foreach (int endNode in graph[node]) {
            int length = DfsMaxPath(endNode, graph, visitedLength);
            maxLength = Math.Max(length + 1, maxLength);
        }
        visitedLength[node] = maxLength;
        return maxLength;
    }
}
```

```go
func minimumSemesters(n int, relations [][]int) int {
    graph := make([][]int, n+1)
    for i := range graph {
        graph[i] = []int{}
    }
    for _, relation := range relations {
        graph[relation[0]] = append(graph[relation[0]], relation[1])
    }

    visited := make([]int, n+1)

    var dfsCheckCycle func(node int) int
    dfsCheckCycle = func(node int) int {
        if visited[node] != 0 {
            return visited[node]
        }
        visited[node] = -1
        for _, endNode := range graph[node] {
            if dfsCheckCycle(endNode) == -1 {
                return -1
            }
        }
        visited[node] = 1
        return 1
    }

    for node := 1; node <= n; node++ {
        if dfsCheckCycle(node) == -1 {
            return -1
        }
    }

    visitedLength := make([]int, n+1)

    var dfsMaxPath func(node int) int
    dfsMaxPath = func(node int) int {
        if visitedLength[node] != 0 {
            return visitedLength[node]
        }
        maxLength := 1
        for _, endNode := range graph[node] {
            length := dfsMaxPath(endNode)
            if length+1 > maxLength {
                maxLength = length + 1
            }
        }
        visitedLength[node] = maxLength
        return maxLength
    }

    maxLength := 1
    for node := 1; node <= n; node++ {
        length := dfsMaxPath(node)
        if length > maxLength {
            maxLength = length
        }
    }
    return maxLength
}
```

```kotlin
class Solution {
    fun minimumSemesters(n: Int, relations: Array<IntArray>): Int {
        val graph = Array(n + 1) { mutableListOf<Int>() }
        for (relation in relations) {
            graph[relation[0]].add(relation[1])
        }

        val visited = IntArray(n + 1)

        fun dfsCheckCycle(node: Int): Int {
            if (visited[node] != 0) {
                return visited[node]
            }
            visited[node] = -1
            for (endNode in graph[node]) {
                if (dfsCheckCycle(endNode) == -1) {
                    return -1
                }
            }
            visited[node] = 1
            return 1
        }

        for (node in 1..n) {
            if (dfsCheckCycle(node) == -1) {
                return -1
            }
        }

        val visitedLength = IntArray(n + 1)

        fun dfsMaxPath(node: Int): Int {
            if (visitedLength[node] != 0) {
                return visitedLength[node]
            }
            var maxLength = 1
            for (endNode in graph[node]) {
                val length = dfsMaxPath(endNode)
                maxLength = maxOf(length + 1, maxLength)
            }
            visitedLength[node] = maxLength
            return maxLength
        }

        var maxLength = 1
        for (node in 1..n) {
            val length = dfsMaxPath(node)
            maxLength = maxOf(length, maxLength)
        }
        return maxLength
    }
}
```

```swift
class Solution {
    func minimumSemesters(_ n: Int, _ relations: [[Int]]) -> Int {
        var graph = [[Int]](repeating: [], count: n + 1)
        for relation in relations {
            graph[relation[0]].append(relation[1])
        }

        var visited = [Int](repeating: 0, count: n + 1)

        func dfsCheckCycle(_ node: Int) -> Int {
            if visited[node] != 0 {
                return visited[node]
            }
            visited[node] = -1
            for endNode in graph[node] {
                if dfsCheckCycle(endNode) == -1 {
                    return -1
                }
            }
            visited[node] = 1
            return 1
        }

        for node in 1...n {
            if dfsCheckCycle(node) == -1 {
                return -1
            }
        }

        var visitedLength = [Int](repeating: 0, count: n + 1)

        func dfsMaxPath(_ node: Int) -> Int {
            if visitedLength[node] != 0 {
                return visitedLength[node]
            }
            var maxLength = 1
            for endNode in graph[node] {
                let length = dfsMaxPath(endNode)
                maxLength = max(length + 1, maxLength)
            }
            visitedLength[node] = maxLength
            return maxLength
        }

        var maxLength = 1
        for node in 1...n {
            let length = dfsMaxPath(node)
            maxLength = max(length, maxLength)
        }
        return maxLength
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N + E)$
- Space complexity: $O(N + E)$

>  Where $E$ is the length of `relations` and $N$ is the number of courses.

---

## 3. Depth-First Search: Combine

::tabs-start

```python
class Solution:
    def minimumSemesters(self, N: int, relations: List[List[int]]) -> int:
        graph = {i: [] for i in range(1, N + 1)}
        for start_node, end_node in relations:
            graph[start_node].append(end_node)

        visited = {}

        def dfs(node: int) -> int:
            # return the longest path (inclusive)
            if node in visited:
                return visited[node]
            else:
                # mark as visiting
                visited[node] = -1

            max_length = 1
            for end_node in graph[node]:
                length = dfs(end_node)
                # we meet a cycle!
                if length == -1:
                    return -1
                else:
                    max_length = max(length+1, max_length)
            # mark as visited
            visited[node] = max_length
            return max_length

        max_length = -1
        for node in graph.keys():
            length = dfs(node)
            # we meet a cycle!
            if length == -1:
                return -1
            else:
                max_length = max(length, max_length)
        return max_length
```

```java
class Solution {
    public int minimumSemesters(int N, int[][] relations) {
        List<List<Integer>> graph = new ArrayList<>(N + 1);
        for (int i = 0; i < N + 1; ++i) {
            graph.add(new ArrayList<Integer>());
        }
        for (int[] relation : relations) {
            graph.get(relation[0]).add(relation[1]);
        }
        int[] visited = new int[N + 1];

        int maxLength = 1;
        for (int node = 1; node < N + 1; node++) {
            int length = dfs(node, graph, visited);
            // we meet a cycle!
            if (length == -1) {
                return -1;
            }
            maxLength = Math.max(length, maxLength);
        }
        return maxLength;
    }

    private int dfs(int node, List<List<Integer>> graph, int[] visited) {
        // return the longest path (inclusive)
        if (visited[node] != 0) {
            return visited[node];
        } else {
            // mark as visiting
            visited[node] = -1;
        }
        int maxLength = 1;
        for (int endNode : graph.get(node)) {
            int length = dfs(endNode, graph, visited);
            // we meet a cycle!
            if (length == -1) {
                return -1;
            }
            maxLength = Math.max(length + 1, maxLength);
        }
        // mark as visited
        visited[node] = maxLength;
        return maxLength;
    }
}
```

```cpp
class Solution {
public:
    int minimumSemesters(int N, vector<vector<int>>& relations) {
        vector<vector<int>> graph(N + 1);
        for (auto& relation : relations) {
            graph[relation[0]].push_back(relation[1]);
        }

        vector<int> visited(N + 1, 0);
        int maxLength = 1;
        for (int node = 1; node < N + 1; node++) {
            int length = dfs(node, graph, visited);
            // we meet a cycle!
            if (length == -1) {
                return -1;
            }
            maxLength = max(length, maxLength);
        }
        return maxLength;
    }

private:
    int dfs(int node, vector<vector<int>>& graph, vector<int>& visited) {
        // return the longest path (inclusive)
        if (visited[node] != 0) {
            return visited[node];
        } else {
            // mark as visiting
            visited[node] = -1;
        }
        int maxLength = 1;
        for (auto& endNode : graph[node]) {
            int length = dfs(endNode, graph, visited);
            // we meet a cycle!
            if (length == -1) {
                return -1;
            }
            maxLength = max(length + 1, maxLength);
        }
        // mark as visited
        visited[node] = maxLength;
        return maxLength;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} relations
     * @return {number}
     */
    minimumSemesters(n, relations) {
        const graph = {};
        for (let i = 1; i <= n; i++) {
            graph[i] = [];
        }
        for (const [startNode, endNode] of relations) {
            graph[startNode].push(endNode);
        }

        const visited = {};

        const dfs = (node) => {
            if (visited[node] !== undefined) {
                return visited[node];
            }
            visited[node] = -1;
            let maxLength = 1;
            for (const endNode of graph[node]) {
                const length = dfs(endNode);
                if (length === -1) {
                    return -1;
                }
                maxLength = Math.max(length + 1, maxLength);
            }
            visited[node] = maxLength;
            return maxLength;
        };

        let maxLength = -1;
        for (let node = 1; node <= n; node++) {
            const length = dfs(node);
            if (length === -1) {
                return -1;
            }
            maxLength = Math.max(length, maxLength);
        }
        return maxLength;
    }
}
```

```csharp
public class Solution {
    public int MinimumSemesters(int N, int[][] relations) {
        List<List<int>> graph = new List<List<int>>();
        for (int i = 0; i <= N; i++) {
            graph.Add(new List<int>());
        }
        foreach (var relation in relations) {
            graph[relation[0]].Add(relation[1]);
        }

        int[] visited = new int[N + 1];
        int maxLength = 1;
        for (int node = 1; node <= N; node++) {
            int length = Dfs(node, graph, visited);
            if (length == -1) {
                return -1;
            }
            maxLength = Math.Max(length, maxLength);
        }
        return maxLength;
    }

    private int Dfs(int node, List<List<int>> graph, int[] visited) {
        if (visited[node] != 0) {
            return visited[node];
        }
        visited[node] = -1;
        int maxLength = 1;
        foreach (int endNode in graph[node]) {
            int length = Dfs(endNode, graph, visited);
            if (length == -1) {
                return -1;
            }
            maxLength = Math.Max(length + 1, maxLength);
        }
        visited[node] = maxLength;
        return maxLength;
    }
}
```

```go
func minimumSemesters(n int, relations [][]int) int {
    graph := make([][]int, n+1)
    for i := range graph {
        graph[i] = []int{}
    }
    for _, relation := range relations {
        graph[relation[0]] = append(graph[relation[0]], relation[1])
    }

    visited := make([]int, n+1)

    var dfs func(node int) int
    dfs = func(node int) int {
        if visited[node] != 0 {
            return visited[node]
        }
        visited[node] = -1
        maxLength := 1
        for _, endNode := range graph[node] {
            length := dfs(endNode)
            if length == -1 {
                return -1
            }
            if length+1 > maxLength {
                maxLength = length + 1
            }
        }
        visited[node] = maxLength
        return maxLength
    }

    maxLength := -1
    for node := 1; node <= n; node++ {
        length := dfs(node)
        if length == -1 {
            return -1
        }
        if length > maxLength {
            maxLength = length
        }
    }
    return maxLength
}
```

```kotlin
class Solution {
    fun minimumSemesters(n: Int, relations: Array<IntArray>): Int {
        val graph = Array(n + 1) { mutableListOf<Int>() }
        for (relation in relations) {
            graph[relation[0]].add(relation[1])
        }

        val visited = IntArray(n + 1)

        fun dfs(node: Int): Int {
            if (visited[node] != 0) {
                return visited[node]
            }
            visited[node] = -1
            var maxLength = 1
            for (endNode in graph[node]) {
                val length = dfs(endNode)
                if (length == -1) {
                    return -1
                }
                maxLength = maxOf(length + 1, maxLength)
            }
            visited[node] = maxLength
            return maxLength
        }

        var maxLength = -1
        for (node in 1..n) {
            val length = dfs(node)
            if (length == -1) {
                return -1
            }
            maxLength = maxOf(length, maxLength)
        }
        return maxLength
    }
}
```

```swift
class Solution {
    func minimumSemesters(_ n: Int, _ relations: [[Int]]) -> Int {
        var graph = [[Int]](repeating: [], count: n + 1)
        for relation in relations {
            graph[relation[0]].append(relation[1])
        }

        var visited = [Int](repeating: 0, count: n + 1)

        func dfs(_ node: Int) -> Int {
            if visited[node] != 0 {
                return visited[node]
            }
            visited[node] = -1
            var maxLength = 1
            for endNode in graph[node] {
                let length = dfs(endNode)
                if length == -1 {
                    return -1
                }
                maxLength = max(length + 1, maxLength)
            }
            visited[node] = maxLength
            return maxLength
        }

        var maxLength = -1
        for node in 1...n {
            let length = dfs(node)
            if length == -1 {
                return -1
            }
            maxLength = max(length, maxLength)
        }
        return maxLength
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N + E)$
- Space complexity: $O(N + E)$

>  Where $E$ is the length of `relations` and $N$ is the number of courses.
