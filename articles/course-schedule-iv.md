## 1. Brute Force (DFS)

### Intuition
To check if course A is a prerequisite of course B, we need to determine if there is a path from A to B in the prerequisite graph. A depth-first search starting from A can explore all courses reachable from A. If we reach B during this traversal, then A is indeed a prerequisite of B.

### Algorithm
1. Build an adjacency list from the prerequisites, where each course points to its direct successors.
2. For each query `(u, v)`, run a DFS starting from `u`.
3. In the DFS, if we reach `v`, return `true`.
4. Otherwise, recursively explore all neighbors and return `true` if any path reaches `v`.
5. If no path is found, return `false`.

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

```go
func checkIfPrerequisite(numCourses int, prerequisites [][]int, queries [][]int) []bool {
    adj := make([][]int, numCourses)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, pre := range prerequisites {
        adj[pre[0]] = append(adj[pre[0]], pre[1])
    }

    var dfs func(node, target int) bool
    dfs = func(node, target int) bool {
        if node == target {
            return true
        }
        for _, nei := range adj[node] {
            if dfs(nei, target) {
                return true
            }
        }
        return false
    }

    res := make([]bool, len(queries))
    for i, q := range queries {
        res[i] = dfs(q[0], q[1])
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>

    fun checkIfPrerequisite(numCourses: Int, prerequisites: Array<IntArray>, queries: Array<IntArray>): List<Boolean> {
        adj = Array(numCourses) { mutableListOf() }
        for (pre in prerequisites) {
            adj[pre[0]].add(pre[1])
        }

        return queries.map { dfs(it[0], it[1]) }
    }

    private fun dfs(node: Int, target: Int): Boolean {
        if (node == target) return true
        for (nei in adj[node]) {
            if (dfs(nei, target)) return true
        }
        return false
    }
}
```

```swift
class Solution {
    private var adj = [[Int]]()

    func checkIfPrerequisite(_ numCourses: Int, _ prerequisites: [[Int]], _ queries: [[Int]]) -> [Bool] {
        adj = Array(repeating: [Int](), count: numCourses)
        for pre in prerequisites {
            adj[pre[0]].append(pre[1])
        }

        func dfs(_ node: Int, _ target: Int) -> Bool {
            if node == target { return true }
            for nei in adj[node] {
                if dfs(nei, target) { return true }
            }
            return false
        }

        return queries.map { dfs($0[0], $0[1]) }
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

### Intuition
Instead of running DFS for every query, we can precompute all prerequisites for each course. For each course, we use DFS to find all courses that are prerequisites (directly or indirectly) and store them in a set. Then answering any query becomes a simple set lookup.

### Algorithm
1. Build an adjacency list where each course points to its direct prerequisites.
2. For each course, run DFS to collect all reachable prerequisites into a set.
3. Cache these sets to avoid recomputation.
4. Each course's prerequisite set includes itself and all prerequisites of its direct prerequisites.
5. For each query `(u, v)`, check if `u` is in the prerequisite set of `v`.

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

```go
func checkIfPrerequisite(numCourses int, prerequisites [][]int, queries [][]int) []bool {
    adj := make([][]int, numCourses)
    for i := range adj {
        adj[i] = []int{}
    }
    for _, pre := range prerequisites {
        prereq, crs := pre[0], pre[1]
        adj[crs] = append(adj[crs], prereq)
    }

    prereqMap := make(map[int]map[int]bool)

    var dfs func(crs int) map[int]bool
    dfs = func(crs int) map[int]bool {
        if _, exists := prereqMap[crs]; !exists {
            prereqMap[crs] = make(map[int]bool)
            for _, prereq := range adj[crs] {
                for p := range dfs(prereq) {
                    prereqMap[crs][p] = true
                }
            }
            prereqMap[crs][crs] = true
        }
        return prereqMap[crs]
    }

    for crs := 0; crs < numCourses; crs++ {
        dfs(crs)
    }

    res := make([]bool, len(queries))
    for i, q := range queries {
        res[i] = prereqMap[q[1]][q[0]]
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private lateinit var prereqMap: MutableMap<Int, MutableSet<Int>>

    fun checkIfPrerequisite(numCourses: Int, prerequisites: Array<IntArray>, queries: Array<IntArray>): List<Boolean> {
        adj = Array(numCourses) { mutableListOf() }
        prereqMap = mutableMapOf()

        for (pre in prerequisites) {
            adj[pre[1]].add(pre[0])
        }

        for (crs in 0 until numCourses) {
            dfs(crs)
        }

        return queries.map { prereqMap[it[1]]?.contains(it[0]) ?: false }
    }

    private fun dfs(crs: Int): MutableSet<Int> {
        if (crs !in prereqMap) {
            prereqMap[crs] = mutableSetOf()
            for (prereq in adj[crs]) {
                prereqMap[crs]!!.addAll(dfs(prereq))
            }
            prereqMap[crs]!!.add(crs)
        }
        return prereqMap[crs]!!
    }
}
```

```swift
class Solution {
    private var adj = [[Int]]()
    private var prereqMap = [Int: Set<Int>]()

    func checkIfPrerequisite(_ numCourses: Int, _ prerequisites: [[Int]], _ queries: [[Int]]) -> [Bool] {
        adj = Array(repeating: [Int](), count: numCourses)
        prereqMap = [:]

        for pre in prerequisites {
            adj[pre[1]].append(pre[0])
        }

        for crs in 0..<numCourses {
            _ = dfs(crs)
        }

        return queries.map { prereqMap[$0[1]]?.contains($0[0]) ?? false }
    }

    private func dfs(_ crs: Int) -> Set<Int> {
        if prereqMap[crs] == nil {
            var prereqs = Set<Int>()
            for prereq in adj[crs] {
                prereqs.formUnion(dfs(prereq))
            }
            prereqs.insert(crs)
            prereqMap[crs] = prereqs
        }
        return prereqMap[crs]!
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

### Intuition
We can optimize by memoizing the result for each pair of courses. When checking if course `A` is a prerequisite of course `B`, we store the result so that future queries for the same pair can be answered instantly. This avoids redundant graph traversals for repeated or similar queries.

### Algorithm
1. Build an adjacency list where each course points to its direct prerequisites.
2. Create a 2D memoization array initialized to `-1` (unknown).
3. For each query `(u, v)`, run DFS to check if `u` is a prerequisite of `v`.
4. During DFS, if the result for `(course, prereq)` is already computed, return it.
5. Otherwise, check all direct prerequisites. If any of them is the target or leads to the target, mark and return `true`.
6. If no path exists, mark and return `false`.

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

```go
func checkIfPrerequisite(numCourses int, prerequisites [][]int, queries [][]int) []bool {
    adj := make([][]int, numCourses)
    for i := range adj {
        adj[i] = []int{}
    }

    isPrereq := make([][]int, numCourses)
    for i := range isPrereq {
        isPrereq[i] = make([]int, numCourses)
        for j := range isPrereq[i] {
            isPrereq[i][j] = -1
        }
    }

    for _, pre := range prerequisites {
        prereq, crs := pre[0], pre[1]
        adj[crs] = append(adj[crs], prereq)
        isPrereq[crs][prereq] = 1
    }

    var dfs func(crs, prereq int) bool
    dfs = func(crs, prereq int) bool {
        if isPrereq[crs][prereq] != -1 {
            return isPrereq[crs][prereq] == 1
        }
        for _, pre := range adj[crs] {
            if pre == prereq || dfs(pre, prereq) {
                isPrereq[crs][prereq] = 1
                return true
            }
        }
        isPrereq[crs][prereq] = 0
        return false
    }

    res := make([]bool, len(queries))
    for i, q := range queries {
        res[i] = dfs(q[1], q[0])
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var adj: Array<MutableList<Int>>
    private lateinit var isPrereq: Array<IntArray>

    fun checkIfPrerequisite(numCourses: Int, prerequisites: Array<IntArray>, queries: Array<IntArray>): List<Boolean> {
        adj = Array(numCourses) { mutableListOf() }
        isPrereq = Array(numCourses) { IntArray(numCourses) { -1 } }

        for (pre in prerequisites) {
            adj[pre[1]].add(pre[0])
            isPrereq[pre[1]][pre[0]] = 1
        }

        return queries.map { dfs(it[1], it[0]) }
    }

    private fun dfs(crs: Int, prereq: Int): Boolean {
        if (isPrereq[crs][prereq] != -1) {
            return isPrereq[crs][prereq] == 1
        }
        for (pre in adj[crs]) {
            if (pre == prereq || dfs(pre, prereq)) {
                isPrereq[crs][prereq] = 1
                return true
            }
        }
        isPrereq[crs][prereq] = 0
        return false
    }
}
```

```swift
class Solution {
    private var adj = [[Int]]()
    private var isPrereq = [[Int]]()

    func checkIfPrerequisite(_ numCourses: Int, _ prerequisites: [[Int]], _ queries: [[Int]]) -> [Bool] {
        adj = Array(repeating: [Int](), count: numCourses)
        isPrereq = Array(repeating: Array(repeating: -1, count: numCourses), count: numCourses)

        for pre in prerequisites {
            let prereq = pre[0], crs = pre[1]
            adj[crs].append(prereq)
            isPrereq[crs][prereq] = 1
        }

        func dfs(_ crs: Int, _ prereq: Int) -> Bool {
            if isPrereq[crs][prereq] != -1 {
                return isPrereq[crs][prereq] == 1
            }
            for pre in adj[crs] {
                if pre == prereq || dfs(pre, prereq) {
                    isPrereq[crs][prereq] = 1
                    return true
                }
            }
            isPrereq[crs][prereq] = 0
            return false
        }

        return queries.map { dfs($0[1], $0[0]) }
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

### Intuition
Using topological sort, we process courses in an order where all prerequisites of a course are processed before the course itself. When we process a course, we propagate all its prerequisites to its successors. This way, each course accumulates the complete set of all courses that must be taken before it.

### Algorithm
1. Build an adjacency list and compute the `indegree` for each course.
2. Initialize a queue with all courses having `indegree` `0`.
3. For each course processed:
   - For each successor, add the current course and all its prerequisites to the successor's prerequisite set.
   - Decrement the successor's `indegree` and add to queue if it becomes `0`.
4. After processing all courses, each course has a complete set of its prerequisites.
5. For each query `(u, v)`, check if `u` is in the prerequisite set of `v`.

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

```go
func checkIfPrerequisite(numCourses int, prerequisites [][]int, queries [][]int) []bool {
    adj := make([]map[int]bool, numCourses)
    isPrereq := make([]map[int]bool, numCourses)
    indegree := make([]int, numCourses)

    for i := 0; i < numCourses; i++ {
        adj[i] = make(map[int]bool)
        isPrereq[i] = make(map[int]bool)
    }

    for _, pre := range prerequisites {
        adj[pre[0]][pre[1]] = true
        indegree[pre[1]]++
    }

    q := []int{}
    for i := 0; i < numCourses; i++ {
        if indegree[i] == 0 {
            q = append(q, i)
        }
    }

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        for neighbor := range adj[node] {
            isPrereq[neighbor][node] = true
            for p := range isPrereq[node] {
                isPrereq[neighbor][p] = true
            }
            indegree[neighbor]--
            if indegree[neighbor] == 0 {
                q = append(q, neighbor)
            }
        }
    }

    res := make([]bool, len(queries))
    for i, query := range queries {
        res[i] = isPrereq[query[1]][query[0]]
    }
    return res
}
```

```kotlin
class Solution {
    fun checkIfPrerequisite(numCourses: Int, prerequisites: Array<IntArray>, queries: Array<IntArray>): List<Boolean> {
        val adj = Array(numCourses) { mutableSetOf<Int>() }
        val isPrereq = Array(numCourses) { mutableSetOf<Int>() }
        val indegree = IntArray(numCourses)

        for (pre in prerequisites) {
            adj[pre[0]].add(pre[1])
            indegree[pre[1]]++
        }

        val q = ArrayDeque<Int>()
        for (i in 0 until numCourses) {
            if (indegree[i] == 0) q.add(i)
        }

        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            for (neighbor in adj[node]) {
                isPrereq[neighbor].add(node)
                isPrereq[neighbor].addAll(isPrereq[node])
                indegree[neighbor]--
                if (indegree[neighbor] == 0) {
                    q.add(neighbor)
                }
            }
        }

        return queries.map { isPrereq[it[1]].contains(it[0]) }
    }
}
```

```swift
class Solution {
    func checkIfPrerequisite(_ numCourses: Int, _ prerequisites: [[Int]], _ queries: [[Int]]) -> [Bool] {
        var adj = Array(repeating: Set<Int>(), count: numCourses)
        var isPrereq = Array(repeating: Set<Int>(), count: numCourses)
        var indegree = Array(repeating: 0, count: numCourses)

        for pre in prerequisites {
            adj[pre[0]].insert(pre[1])
            indegree[pre[1]] += 1
        }

        var queue = [Int]()
        for i in 0..<numCourses {
            if indegree[i] == 0 {
                queue.append(i)
            }
        }

        while !queue.isEmpty {
            let node = queue.removeFirst()
            for neighbor in adj[node] {
                isPrereq[neighbor].insert(node)
                isPrereq[neighbor].formUnion(isPrereq[node])
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0 {
                    queue.append(neighbor)
                }
            }
        }

        return queries.map { isPrereq[$0[1]].contains($0[0]) }
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

### Intuition
The Floyd-Warshall algorithm finds all-pairs reachability in a graph. We can adapt it to find transitive closure: if there is a path from `A` to `B` through any intermediate course `K`, then `A` is a prerequisite of `B`. After running the algorithm, we have direct `O(1)` lookup for any pair.

### Algorithm
1. Create a 2D boolean matrix initialized to `false`.
2. Mark direct prerequisites as `true` in the matrix.
3. For each intermediate course `k`, iterate through all pairs `(i, j)`.
4. If there is a path from `i` to `k` and from `k` to `j`, mark the path from `i` to `j` as `true`.
5. For each query `(u, v)`, simply return the value at `matrix[u][v]`.

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

```go
func checkIfPrerequisite(numCourses int, prerequisites [][]int, queries [][]int) []bool {
    adj := make([][]bool, numCourses)
    for i := range adj {
        adj[i] = make([]bool, numCourses)
    }

    for _, pre := range prerequisites {
        adj[pre[0]][pre[1]] = true
    }

    for k := 0; k < numCourses; k++ {
        for i := 0; i < numCourses; i++ {
            for j := 0; j < numCourses; j++ {
                adj[i][j] = adj[i][j] || (adj[i][k] && adj[k][j])
            }
        }
    }

    res := make([]bool, len(queries))
    for i, q := range queries {
        res[i] = adj[q[0]][q[1]]
    }
    return res
}
```

```kotlin
class Solution {
    fun checkIfPrerequisite(numCourses: Int, prerequisites: Array<IntArray>, queries: Array<IntArray>): List<Boolean> {
        val adj = Array(numCourses) { BooleanArray(numCourses) }

        for (pre in prerequisites) {
            adj[pre[0]][pre[1]] = true
        }

        for (k in 0 until numCourses) {
            for (i in 0 until numCourses) {
                for (j in 0 until numCourses) {
                    adj[i][j] = adj[i][j] || (adj[i][k] && adj[k][j])
                }
            }
        }

        return queries.map { adj[it[0]][it[1]] }
    }
}
```

```swift
class Solution {
    func checkIfPrerequisite(_ numCourses: Int, _ prerequisites: [[Int]], _ queries: [[Int]]) -> [Bool] {
        var adj = Array(repeating: Array(repeating: false, count: numCourses), count: numCourses)

        for pre in prerequisites {
            adj[pre[0]][pre[1]] = true
        }

        for k in 0..<numCourses {
            for i in 0..<numCourses {
                for j in 0..<numCourses {
                    adj[i][j] = adj[i][j] || (adj[i][k] && adj[k][j])
                }
            }
        }

        return queries.map { adj[$0[0]][$0[1]] }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(V ^ 3 + E + m)$
- Space complexity: $O(V ^ 2 + E + m)$

> Where $m$ is the number of queries, $V$ is the number of courses, and $E$ is the number of prerequisites.

---

## Common Pitfalls

### Confusing Edge Direction

A common mistake is building the graph with edges pointing in the wrong direction. The prerequisite `[a, b]` means course `a` must be taken before course `b`, so `a -> b`. Reversing this leads to incorrect reachability results.

```python
# Wrong: edge points from course to prerequisite
for pre, crs in prerequisites:
    adj[crs].append(pre)  # Incorrect for "is a prerequisite of" queries

# Correct: edge points from prerequisite to course
for pre, crs in prerequisites:
    adj[pre].append(crs)  # Now adj[u] contains courses that u is a prerequisite of
```

### Rerunning DFS for Every Query Without Memoization

Running a fresh DFS for each query without caching results leads to repeated work. With many queries, this causes TLE. Always memoize visited pairs or precompute the full transitive closure.

```python
# Inefficient: no memoization
def dfs(node, target):
    if node == target:
        return True
    for nei in adj[node]:
        if dfs(nei, target):
            return True
    return False

# Each query starts from scratch - O(V+E) per query
```

### Not Handling Disconnected Nodes

Courses with no prerequisites and no dependents are still valid nodes. Forgetting to initialize them in your adjacency list or prerequisite map causes KeyError or incorrect results when they appear in queries.
