## 1. Cycle Detection (DFS)

::tabs-start

```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Map each course to its prerequisites
        preMap = {i: [] for i in range(numCourses)}
        for crs, pre in prerequisites:
            preMap[crs].append(pre)

        # Store all courses along the current DFS path
        visiting = set()

        def dfs(crs):
            if crs in visiting:
                # Cycle detected
                return False
            if preMap[crs] == []:
                return True

            visiting.add(crs)
            for pre in preMap[crs]:
                if not dfs(pre):
                    return False
            visiting.remove(crs)
            preMap[crs] = []
            return True

        for c in range(numCourses):
            if not dfs(c):
                return False
        return True
```

```java
public class Solution {
    // Map each course to its prerequisites
    private Map<Integer, List<Integer>> preMap = new HashMap<>();
    // Store all courses along the current DFS path
    private Set<Integer> visiting = new HashSet<>();

    public boolean canFinish(int numCourses, int[][] prerequisites) {
        for (int i = 0; i < numCourses; i++) {
            preMap.put(i, new ArrayList<>());
        }
        for (int[] prereq : prerequisites) {
            preMap.get(prereq[0]).add(prereq[1]);
        }

        for (int c = 0; c < numCourses; c++) {
            if (!dfs(c)) {
                return false;
            }
        }
        return true;
    }

    private boolean dfs(int crs) {
        if (visiting.contains(crs)) {
            // Cycle detected
            return false;
        }
        if (preMap.get(crs).isEmpty()) {
            return true;
        }

        visiting.add(crs);
        for (int pre : preMap.get(crs)) {
            if (!dfs(pre)) {
                return false;
            }
        }
        visiting.remove(crs);
        preMap.put(crs, new ArrayList<>());
        return true;
    }
}
```

```cpp
class Solution {
    // Map each course to its prerequisites
    unordered_map<int, vector<int>> preMap;
    // Store all courses along the current DFS path
    unordered_set<int> visiting;

public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        for (int i = 0; i < numCourses; i++) {
            preMap[i] = {};
        }
        for (const auto& prereq : prerequisites) {
            preMap[prereq[0]].push_back(prereq[1]);
        }

        for (int c = 0; c < numCourses; c++) {
            if (!dfs(c)) {
                return false;
            }
        }
        return true;
    }

    bool dfs(int crs) {
        if (visiting.count(crs)) {
            // Cycle detected
            return false;
        }
        if (preMap[crs].empty()) {
            return true;
        }

        visiting.insert(crs);
        for (int pre : preMap[crs]) {
            if (!dfs(pre)) {
                return false;
            }
        }
        visiting.erase(crs);
        preMap[crs].clear();
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {boolean}
     */
    canFinish(numCourses, prerequisites) {
        const preMap = new Map();
        for (let i = 0; i < numCourses; i++) {
            preMap.set(i, []);
        }
        for (let [crs, pre] of prerequisites) {
            preMap.get(crs).push(pre);
        }

        // Store all courses along the current DFS path
        const visiting = new Set();

        const dfs = (crs) => {
            if (visiting.has(crs)) {
                // Cycle detected
                return false;
            }
            if (preMap.get(crs).length === 0) {
                return true;
            }

            visiting.add(crs);
            for (let pre of preMap.get(crs)) {
                if (!dfs(pre)) {
                    return false;
                }
            }
            visiting.delete(crs);
            preMap.set(crs, []); 
            return true;
        }

        for (let c = 0; c < numCourses; c++) {
            if (!dfs(c)) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class Solution {
    // Map each course to its prerequisites
    private Dictionary<int, List<int>> preMap = new Dictionary<int, List<int>>();
    // Store all courses along the current DFS path
    private HashSet<int> visiting = new HashSet<int>();

    public bool CanFinish(int numCourses, int[][] prerequisites) {
        for (int i = 0; i < numCourses; i++) {
            preMap[i] = new List<int>();
        }
        foreach (var prereq in prerequisites) {
            preMap[prereq[0]].Add(prereq[1]);
        }

        for (int c = 0; c < numCourses; c++) {
            if (!Dfs(c)) {
                return false;
            }
        }
        return true;
    }

    private bool Dfs(int crs) {
        if (visiting.Contains(crs)) {
            // Cycle detected
            return false;
        }
        if (preMap[crs].Count == 0) {
            return true;
        }

        visiting.Add(crs);
        foreach (int pre in preMap[crs]) {
            if (!Dfs(pre)) {
                return false;
            }
        }
        visiting.Remove(crs);
        preMap[crs].Clear();
        return true;
    }
}
```

```go
func canFinish(numCourses int, prerequisites [][]int) bool {
    // Map each course to its prerequisites
    preMap := make(map[int][]int)
    for i := 0; i < numCourses; i++ {
        preMap[i] = []int{}
    }
    for _, prereq := range prerequisites {
        crs, pre := prereq[0], prereq[1]
        preMap[crs] = append(preMap[crs], pre)
    }

    // Store all courses along the current DFS path
    visiting := make(map[int]bool)

    var dfs func(int) bool
    dfs = func(crs int) bool {
        if visiting[crs] {
            // Cycle detected
            return false
        }
        if len(preMap[crs]) == 0 {
            return true
        }

        visiting[crs] = true
        for _, pre := range preMap[crs] {
            if !dfs(pre) {
                return false
            }
        }
        visiting[crs] = false
        preMap[crs] = []int{}
        return true
    }

    for c := 0; c < numCourses; c++ {
        if !dfs(c) {
            return false
        }
    }
    return true
}
```

```kotlin
class Solution {
    fun canFinish(numCourses: Int, prerequisites: Array<IntArray>): Boolean {
        // Map each course to its prerequisites
        val preMap = HashMap<Int, MutableList<Int>>()
        for (i in 0 until numCourses) {
            preMap[i] = mutableListOf()
        }
        for (prereq in prerequisites) {
            val (crs, pre) = prereq
            preMap[crs]!!.add(pre)
        }

        // Store all courses along the current DFS path
        val visiting = HashSet<Int>()

        fun dfs(crs: Int): Boolean {
            if (crs in visiting) {
                // Cycle detected
                return false
            }
            if (preMap[crs]!!.isEmpty()) {
                return true
            }

            visiting.add(crs)
            for (pre in preMap[crs]!!) {
                if (!dfs(pre)) {
                    return false
                }
            }
            visiting.remove(crs)
            preMap[crs] = mutableListOf()
            return true
        }

        for (c in 0 until numCourses) {
            if (!dfs(c)) {
                return false
            }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.

---

## 2. Topological Sort (Kahn's Algorithm)

::tabs-start

```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        indegree = [0] * numCourses
        adj = [[] for i in range(numCourses)]
        for src, dst in prerequisites:
            indegree[dst] += 1
            adj[src].append(dst)

        q = deque()
        for n in range(numCourses):
            if indegree[n] == 0:
                q.append(n)
        
        finish = 0
        while q:
            node = q.popleft()
            finish += 1
            for nei in adj[node]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    q.append(nei)
                
        return finish == numCourses
```

```java
public class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] pre : prerequisites) {
            indegree[pre[1]]++;
            adj.get(pre[0]).add(pre[1]);
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                q.add(i);
            }
        }

        int finish = 0;
        while (!q.isEmpty()) {
            int node = q.poll();
            finish++;
            for (int nei : adj.get(node)) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.add(nei);
                }
            }
        }

        return finish == numCourses;
    }
}
```

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> indegree(numCourses, 0);
        vector<vector<int>> adj(numCourses);
        
        for (auto& pre : prerequisites) {
            indegree[pre[1]]++;
            adj[pre[0]].push_back(pre[1]);
        }

        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        int finish = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            finish++;
            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.push(nei);
                }
            }
        }

        return finish == numCourses;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {boolean}
     */
    canFinish(numCourses, prerequisites) {
        let indegree = Array(numCourses).fill(0);
        let adj = Array.from({ length: numCourses }, () => []);
        for (let [src, dst] of prerequisites) {
            indegree[dst]++;
            adj[src].push(dst);
        }

        let q = new Queue();
        for (let i = 0; i < numCourses; i++) {
            if (indegree[i] === 0) {
                q.push(i);
            }
        }

        let finish = 0;
        while (!q.isEmpty()) {
            let node = q.pop();
            finish++;
            for (let nei of adj[node]) {
                indegree[nei]--;
                if (indegree[nei] === 0) {
                    q.push(nei);
                }
            }
        }

        return finish === numCourses;
    }
}
```

```csharp
public class Solution {
    public bool CanFinish(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        List<List<int>> adj = new List<List<int>>();
        for (int i = 0; i < numCourses; i++) {
            adj.Add(new List<int>());
        }
        foreach (var pre in prerequisites) {
            indegree[pre[1]]++;
            adj[pre[0]].Add(pre[1]);
        }

        Queue<int> q = new Queue<int>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                q.Enqueue(i);
            }
        }

        int finish = 0;
        while (q.Count > 0) {
            int node = q.Dequeue();
            finish++;
            foreach (var nei in adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.Enqueue(nei);
                }
            }
        }

        return finish == numCourses;
    }
}
```

```go
func canFinish(numCourses int, prerequisites [][]int) bool {
    indegree := make([]int, numCourses)
    adj := make([][]int, numCourses)
    for i := 0; i < numCourses; i++ {
        adj[i] = []int{}
    }

    for _, prereq := range prerequisites {
        src, dst := prereq[0], prereq[1]
        indegree[dst]++
        adj[src] = append(adj[src], dst)
    }

    q := []int{}
    for n := 0; n < numCourses; n++ {
        if indegree[n] == 0 {
            q = append(q, n)
        }
    }

    finish := 0
    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        finish++
        for _, nei := range adj[node] {
            indegree[nei]--
            if indegree[nei] == 0 {
                q = append(q, nei)
            }
        }
    }

    return finish == numCourses
}
```

```kotlin
class Solution {
    fun canFinish(numCourses: Int, prerequisites: Array<IntArray>): Boolean {
        val indegree = IntArray(numCourses) { 0 }
        val adj = Array(numCourses) { mutableListOf<Int>() }
        
        for (prereq in prerequisites) {
            val (src, dst) = prereq
            indegree[dst]++
            adj[src].add(dst)
        }

        val q: Queue<Int> = LinkedList()
        for (n in 0 until numCourses) {
            if (indegree[n] == 0) {
                q.add(n)
            }
        }

        var finish = 0
        while (q.isNotEmpty()) {
            val node = q.poll()
            finish++
            for (nei in adj[node]) {
                indegree[nei]--
                if (indegree[nei] == 0) {
                    q.add(nei)
                }
            }
        }

        return finish == numCourses
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.