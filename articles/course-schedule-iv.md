## 1. Brute Force (DFS)

::tabs-start

```python
class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        adj = [[] for _ in range(numCourses)]
        for u, v in prerequisites:
            adj[u].append(v)

        def dfs(node, target):
            if node == target:
                return True
            for nei in adj[node]:
                if dfs(nei, target):
                    return True
            return False

        res = []
        for u, v in queries:
            res.append(dfs(u, v))
        return res
```

```java
public class Solution {
    private List<Integer>[] adj;

    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        adj = new ArrayList[numCourses];
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        for (int[] pre : prerequisites) adj[pre[0]].add(pre[1]);

        List<Boolean> res = new ArrayList<>();
        for (int[] query : queries) {
            res.add(dfs(query[0], query[1]));
        }
        return res;
    }

    private boolean dfs(int node, int target) {
        if (node == target) return true;
        for (int nei : adj[node]) {
            if (dfs(nei, target)) return true;
        }
        return false;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> adj;

public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        adj.assign(numCourses, vector<int>());
        for (auto& pre : prerequisites) {
            adj[pre[0]].push_back(pre[1]);
        }

        vector<bool> res;
        for (auto& query : queries) {
            res.push_back(dfs(query[0], query[1]));
        }
        return res;
    }

private:
    bool dfs(int node, int target) {
        if (node == target) return true;
        for (int nei : adj[node]) {
            if (dfs(nei, target)) return true;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @param {number[][]} queries
     * @return {boolean[]}
     */
    checkIfPrerequisite(numCourses, prerequisites, queries) {
        const adj = Array.from({ length: numCourses }, () => []);
        for (const [u, v] of prerequisites) {
            adj[u].push(v);
        }

        const dfs = (node, target) => {
            if (node === target) return true;
            for (const nei of adj[node]) {
                if (dfs(nei, target)) return true;
            }
            return false;
        };

        const res = [];
        for (const [u, v] of queries) {
            res.push(dfs(u, v));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<bool> CheckIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        List<int>[] adj = new List<int>[numCourses];
        for (int i = 0; i < numCourses; i++) {
            adj[i] = new List<int>();
        }

        foreach (var pre in prerequisites) {
            adj[pre[0]].Add(pre[1]);
        }

        bool Dfs(int node, int target) {
            if (node == target) return true;
            foreach (var nei in adj[node]) {
                if (Dfs(nei, target)) return true;
            }
            return false;
        }

        var res = new List<bool>();
        foreach (var q in queries) {
            res.Add(Dfs(q[0], q[1]));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((V + E) * m)$
- Space complexity: $O(V + E + m)$

> Where $m$ is the number of queries, $V$ is the number of courses, and $E$ is the number of prerequisites.

---

## 2. Depth First Search (Hash Set)

::tabs-start

```python
class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        adj = defaultdict(list)
        for prereq, crs in prerequisites:
            adj[crs].append(prereq)

        def dfs(crs):
            if crs not in prereqMap:
                prereqMap[crs] = set()
                for prereq in adj[crs]:
                    prereqMap[crs] |= dfs(prereq)
                prereqMap[crs].add(crs)
            return prereqMap[crs]

        prereqMap = {}
        for crs in range(numCourses):
            dfs(crs)

        res = []
        for u, v in queries:
            res.append(u in prereqMap[v])
        return res
```

```java
public class Solution {
    private List<Integer>[] adj;
    private Map<Integer, Set<Integer>> prereqMap;

    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        adj = new ArrayList[numCourses];
        prereqMap = new HashMap<>();
        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();
        for (int[] pre : prerequisites) adj[pre[1]].add(pre[0]);

        for (int crs = 0; crs < numCourses; crs++) dfs(crs);

        List<Boolean> res = new ArrayList<>();
        for (int[] query : queries) {
            res.add(prereqMap.get(query[1]).contains(query[0]));
        }
        return res;
    }

    private Set<Integer> dfs(int crs) {
        if (prereqMap.containsKey(crs)) return prereqMap.get(crs);
        Set<Integer> prereqs = new HashSet<>();
        for (int pre : adj[crs]) {
            prereqs.addAll(dfs(pre));
        }
        prereqs.add(crs);
        prereqMap.put(crs, prereqs);
        return prereqs;
    }
}
```

```cpp

class Solution {
    vector<vector<int>> adj;
    unordered_map<int, unordered_set<int>> prereqMap;

public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        adj.assign(numCourses, vector<int>());
        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
        }
        for (int crs = 0; crs < numCourses; crs++) {
            dfs(crs);
        }

        vector<bool> res;
        for (auto& query : queries) {
            res.push_back(prereqMap[query[1]].count(query[0]));
        }
        return res;
    }

private:
    unordered_set<int>& dfs(int crs) {
        if (prereqMap.count(crs)) {
            return prereqMap[crs];
        }
        prereqMap[crs] = unordered_set<int>();
        for (int pre : adj[crs]) {
            auto& cur = dfs(pre);
            prereqMap[crs].insert(cur.begin(), cur.end());
        }
        prereqMap[crs].insert(crs);
        return prereqMap[crs];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @param {number[][]} queries
     * @return {boolean[]}
     */
    checkIfPrerequisite(numCourses, prerequisites, queries) {
        const adj = Array.from({ length: numCourses }, () => []);
        const prereqMap = new Map();

        for (const [pre, crs] of prerequisites) {
            adj[crs].push(pre);
        }

        const dfs = (crs) => {
            if (prereqMap.has(crs)) {
                return prereqMap.get(crs);
            }
            const prereqs = new Set();
            for (const pre of adj[crs]) {
                for (const p of dfs(pre)) prereqs.add(p);
            }
            prereqs.add(crs);
            prereqMap.set(crs, prereqs);
            return prereqs;
        };

        for (let crs = 0; crs < numCourses; crs++) {
            dfs(crs);
        }
        return queries.map(([u, v]) => prereqMap.get(v).has(u));
    }
}
```

```csharp
public class Solution {
    public List<bool> CheckIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        Dictionary<int, List<int>> adj = new Dictionary<int, List<int>>();
        for (int i = 0; i < numCourses; i++) {
            adj[i] = new List<int>();
        }

        foreach (var pair in prerequisites) {
            int prereq = pair[0], crs = pair[1];
            adj[crs].Add(prereq);
        }

        Dictionary<int, HashSet<int>> prereqMap = new Dictionary<int, HashSet<int>>();

        HashSet<int> Dfs(int crs) {
            if (!prereqMap.ContainsKey(crs)) {
                prereqMap[crs] = new HashSet<int>();
                foreach (var prereq in adj[crs]) {
                    prereqMap[crs].UnionWith(Dfs(prereq));
                }
                prereqMap[crs].Add(crs);
            }
            return prereqMap[crs];
        }

        for (int crs = 0; crs < numCourses; crs++) {
            Dfs(crs);
        }

        List<bool> res = new List<bool>();
        foreach (var q in queries) {
            res.Add(prereqMap.ContainsKey(q[1]) && prereqMap[q[1]].Contains(q[0]));
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * (V + E) + m)$
- Space complexity: $O(V ^ 2 + E + m)$

> Where $m$ is the number of queries, $V$ is the number of courses, and $E$ is the number of prerequisites.

---

## 3. Depth First Search (Memoization)

::tabs-start

```python
class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        adj = [[] for _ in range(numCourses)]
        isPrereq = [[-1] * numCourses for _ in range(numCourses)]
        for prereq, crs in prerequisites:
            adj[crs].append(prereq)
            isPrereq[crs][prereq] = True

        def dfs(crs, prereq):
            if isPrereq[crs][prereq] != -1:
                return isPrereq[crs][prereq] == 1

            for pre in adj[crs]:
                if pre == prereq or dfs(pre, prereq):
                    isPrereq[crs][prereq] = 1
                    return True

            isPrereq[crs][prereq] = 0
            return False

        res = []
        for u, v in queries:
            res.append(dfs(v, u))
        return res
```

```java
public class Solution {
    private List<Integer>[] adj;
    private int[][] isPrereq;

    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        adj = new ArrayList[numCourses];
        isPrereq = new int[numCourses][numCourses];
        for (int i = 0; i < numCourses; i++) {
            adj[i] = new ArrayList<>();
            Arrays.fill(isPrereq[i], -1);
        }

        for (int[] pre : prerequisites) {
            adj[pre[1]].add(pre[0]);
            isPrereq[pre[1]][pre[0]] = 1;
        }

        List<Boolean> res = new ArrayList<>();
        for (int[] query : queries) {
            res.add(dfs(query[1], query[0]));
        }
        return res;
    }

    private boolean dfs(int crs, int prereq) {
        if (isPrereq[crs][prereq] != -1) {
            return isPrereq[crs][prereq] == 1;
        }
        for (int pre : adj[crs]) {
            if (pre == prereq || dfs(pre, prereq)) {
                isPrereq[crs][prereq] = 1;
                return true;
            }
        }
        isPrereq[crs][prereq] = 0;
        return false;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> adj;
    vector<vector<int>> isPrereq;

public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        adj.assign(numCourses, vector<int>());
        isPrereq.assign(numCourses, vector<int>(numCourses, -1));

        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            isPrereq[pre[1]][pre[0]] = 1;
        }

        vector<bool> res;
        for (auto& query : queries) {
            res.push_back(dfs(query[1], query[0]));
        }
        return res;
    }

private:
    bool dfs(int crs, int prereq) {
        if (isPrereq[crs][prereq] != -1) {
            return isPrereq[crs][prereq] == 1;
        }
        for (int pre : adj[crs]) {
            if (pre == prereq || dfs(pre, prereq)) {
                isPrereq[crs][prereq] = 1;
                return true;
            }
        }
        isPrereq[crs][prereq] = 0;
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @param {number[][]} queries
     * @return {boolean[]}
     */
    checkIfPrerequisite(numCourses, prerequisites, queries) {
        const adj = Array.from({ length: numCourses }, () => []);
        const isPrereq = Array.from({ length: numCourses }, () =>
            Array(numCourses).fill(-1),
        );
        for (const [prereq, crs] of prerequisites) {
            adj[crs].push(prereq);
            isPrereq[crs][prereq] = 1;
        }

        const dfs = (crs, prereq) => {
            if (isPrereq[crs][prereq] !== -1) {
                return isPrereq[crs][prereq] === 1;
            }
            for (const pre of adj[crs]) {
                if (pre === prereq || dfs(pre, prereq)) {
                    isPrereq[crs][prereq] = 1;
                    return true;
                }
            }
            isPrereq[crs][prereq] = 0;
            return false;
        };

        return queries.map(([u, v]) => dfs(v, u));
    }
}
```

```csharp
public class Solution {
    public List<bool> CheckIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        List<int>[] adj = new List<int>[numCourses];
        for (int i = 0; i < numCourses; i++) {
            adj[i] = new List<int>();
        }

        int[,] isPrereq = new int[numCourses, numCourses];
        for (int i = 0; i < numCourses; i++) {
            for (int j = 0; j < numCourses; j++) {
                isPrereq[i, j] = -1;
            }
        }

        foreach (var pair in prerequisites) {
            int prereq = pair[0], crs = pair[1];
            adj[crs].Add(prereq);
            isPrereq[crs, prereq] = 1;
        }

        bool Dfs(int crs, int prereq) {
            if (isPrereq[crs, prereq] != -1) {
                return isPrereq[crs, prereq] == 1;
            }

            foreach (int pre in adj[crs]) {
                if (pre == prereq || Dfs(pre, prereq)) {
                    isPrereq[crs, prereq] = 1;
                    return true;
                }
            }

            isPrereq[crs, prereq] = 0;
            return false;
        }

        List<bool> res = new List<bool>();
        foreach (var q in queries) {
            res.Add(Dfs(q[1], q[0]));
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * (V + E) + m)$
- Space complexity: $O(V ^ 2 + E + m)$

> Where $m$ is the number of queries, $V$ is the number of courses, and $E$ is the number of prerequisites.

---

## 4. Topological Sort (Kahn's Algorithm)

::tabs-start

```python
class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        adj = [set() for _ in range(numCourses)]
        indegree = [0] * numCourses
        isPrereq = [set() for _ in range(numCourses)]

        for pre, crs in prerequisites:
            adj[pre].add(crs)
            indegree[crs] += 1

        q = deque([i for i in range(numCourses) if indegree[i] == 0])

        while q:
            node = q.popleft()
            for neighbor in adj[node]:
                isPrereq[neighbor].add(node)
                isPrereq[neighbor].update(isPrereq[node])
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)

        return [u in isPrereq[v] for u, v in queries]
```

```java
public class Solution {
    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        List<Set<Integer>> adj = new ArrayList<>();
        List<Set<Integer>> isPrereq = new ArrayList<>();
        int[] indegree = new int[numCourses];
        for (int i = 0; i < numCourses; i++) {
            adj.add(new HashSet<>());
            isPrereq.add(new HashSet<>());
        }

        for (int[] pre : prerequisites) {
            adj.get(pre[0]).add(pre[1]);
            indegree[pre[1]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.offer(i);
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            for (int neighbor : adj.get(node)) {
                isPrereq.get(neighbor).add(node);
                isPrereq.get(neighbor).addAll(isPrereq.get(node));
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) q.offer(neighbor);
            }
        }

        List<Boolean> res = new ArrayList<>();
        for (int[] query : queries) {
            res.add(isPrereq.get(query[1]).contains(query[0]));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        vector<unordered_set<int>> adj(numCourses), isPrereq(numCourses);
        vector<int> indegree(numCourses, 0);

        for (auto& pre : prerequisites) {
            adj[pre[0]].insert(pre[1]);
            indegree[pre[1]]++;
        }

        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            for (int neighbor : adj[node]) {
                isPrereq[neighbor].insert(node);
                isPrereq[neighbor].insert(isPrereq[node].begin(), isPrereq[node].end());
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) q.push(neighbor);
            }
        }

        vector<bool> res;
        for (auto& query : queries) {
            res.push_back(isPrereq[query[1]].count(query[0]));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @param {number[][]} queries
     * @return {boolean[]}
     */
    checkIfPrerequisite(numCourses, prerequisites, queries) {
        const adj = Array.from({ length: numCourses }, () => new Set());
        const isPrereq = Array.from({ length: numCourses }, () => new Set());
        const indegree = Array(numCourses).fill(0);

        for (const [pre, crs] of prerequisites) {
            adj[pre].add(crs);
            indegree[crs]++;
        }

        const q = new Queue();
        for (let i = 0; i < numCourses; i++) {
            if (indegree[i] === 0) q.push(i);
        }

        while (!q.isEmpty()) {
            const node = q.pop();
            for (const neighbor of adj[node]) {
                isPrereq[neighbor].add(node);
                for (const it of isPrereq[node]) {
                    isPrereq[neighbor].add(it);
                }
                indegree[neighbor]--;
                if (indegree[neighbor] === 0) q.push(neighbor);
            }
        }

        return queries.map(([u, v]) => isPrereq[v].has(u));
    }
}
```

```csharp
public class Solution {
    public List<bool> CheckIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        List<HashSet<int>> adj = new List<HashSet<int>>();
        List<HashSet<int>> isPrereq = new List<HashSet<int>>();
        int[] indegree = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            adj.Add(new HashSet<int>());
            isPrereq.Add(new HashSet<int>());
        }

        foreach (var pair in prerequisites) {
            int pre = pair[0], crs = pair[1];
            adj[pre].Add(crs);
            indegree[crs]++;
        }

        Queue<int> q = new Queue<int>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                q.Enqueue(i);
            }
        }

        while (q.Count > 0) {
            int node = q.Dequeue();
            foreach (int neighbor in adj[node]) {
                isPrereq[neighbor].Add(node);
                foreach (int p in isPrereq[node]) {
                    isPrereq[neighbor].Add(p);
                }
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    q.Enqueue(neighbor);
                }
            }
        }

        List<bool> result = new List<bool>();
        foreach (var query in queries) {
            int u = query[0], v = query[1];
            result.Add(isPrereq[v].Contains(u));
        }

        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V * (V + E) + m)$
- Space complexity: $O(V ^ 2 + E + m)$

> Where $m$ is the number of queries, $V$ is the number of courses, and $E$ is the number of prerequisites.

---

## 5. Floyd Warshall Algorithm

::tabs-start

```python
class Solution:
    def checkIfPrerequisite(self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]) -> List[bool]:
        res = []
        adj = [[False] * numCourses for _ in range(numCourses)]

        for pre, crs in prerequisites:
            adj[pre][crs] = True

        for k in range(numCourses):
            for i in range(numCourses):
                for j in range(numCourses):
                    adj[i][j] = adj[i][j] or (adj[i][k] and adj[k][j])

        for u, v in queries:
            res.append(adj[u][v])

        return res
```

```java
public class Solution {
    public List<Boolean> checkIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        boolean[][] adj = new boolean[numCourses][numCourses];
        List<Boolean> res = new ArrayList<>();

        for (int[] pre : prerequisites) {
            adj[pre[0]][pre[1]] = true;
        }

        for (int k = 0; k < numCourses; k++) {
            for (int i = 0; i < numCourses; i++) {
                for (int j = 0; j < numCourses; j++) {
                    adj[i][j] = adj[i][j] || (adj[i][k] && adj[k][j]);
                }
            }
        }

        for (int[] q : queries) {
            res.add(adj[q[0]][q[1]]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<bool> checkIfPrerequisite(int numCourses, vector<vector<int>>& prerequisites, vector<vector<int>>& queries) {
        vector<vector<bool>> adj(numCourses, vector<bool>(numCourses, false));
        vector<bool> res;

        for (auto& pre : prerequisites) {
            adj[pre[0]][pre[1]] = true;
        }

        for (int k = 0; k < numCourses; k++) {
            for (int i = 0; i < numCourses; i++) {
                for (int j = 0; j < numCourses; j++) {
                    adj[i][j] = adj[i][j] || (adj[i][k] && adj[k][j]);
                }
            }
        }

        for (auto& q : queries) {
            res.push_back(adj[q[0]][q[1]]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @param {number[][]} queries
     * @return {boolean[]}
     */
    checkIfPrerequisite(numCourses, prerequisites, queries) {
        let adj = Array.from({ length: numCourses }, () =>
            Array(numCourses).fill(false),
        );
        let res = [];

        for (let [pre, crs] of prerequisites) {
            adj[pre][crs] = true;
        }

        for (let k = 0; k < numCourses; k++) {
            for (let i = 0; i < numCourses; i++) {
                for (let j = 0; j < numCourses; j++) {
                    adj[i][j] = adj[i][j] || (adj[i][k] && adj[k][j]);
                }
            }
        }

        for (let [u, v] of queries) {
            res.push(adj[u][v]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<bool> CheckIfPrerequisite(int numCourses, int[][] prerequisites, int[][] queries) {
        bool[,] adj = new bool[numCourses, numCourses];

        foreach (var pair in prerequisites) {
            int pre = pair[0], crs = pair[1];
            adj[pre, crs] = true;
        }

        for (int k = 0; k < numCourses; k++) {
            for (int i = 0; i < numCourses; i++) {
                for (int j = 0; j < numCourses; j++) {
                    adj[i, j] = adj[i, j] || (adj[i, k] && adj[k, j]);
                }
            }
        }

        List<bool> res = new List<bool>();
        foreach (var query in queries) {
            int u = query[0], v = query[1];
            res.Add(adj[u, v]);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V ^ 3 + E + m)$
- Space complexity: $O(V ^ 2 + E + m)$

> Where $m$ is the number of queries, $V$ is the number of courses, and $E$ is the number of prerequisites.
