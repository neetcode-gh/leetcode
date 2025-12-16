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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N + E)$
- Space complexity: $O(N + E)$

>  Where $E$ is the length of `relations` and $N$ is the number of courses.
