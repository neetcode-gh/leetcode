## 1. Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.

---

## 2. Iterative DFS

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.

---

## 3. Topological Sort (Kahn's Algorithm)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V + E)$
- Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.
