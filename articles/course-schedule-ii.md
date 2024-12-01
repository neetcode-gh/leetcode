## 1. Cycle Detection (DFS)

::tabs-start

```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        prereq = {c: [] for c in range(numCourses)}
        for crs, pre in prerequisites:
            prereq[crs].append(pre)

        output = []
        visit, cycle = set(), set()

        def dfs(crs):
            if crs in cycle:
                return False
            if crs in visit:
                return True

            cycle.add(crs)
            for pre in prereq[crs]:
                if dfs(pre) == False:
                    return False
            cycle.remove(crs)
            visit.add(crs)
            output.append(crs)
            return True

        for c in range(numCourses):
            if dfs(c) == False:
                return []
        return output
```

```java
public class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        Map<Integer, List<Integer>> prereq = new HashMap<>();
        for (int[] pair : prerequisites) {
            prereq.computeIfAbsent(pair[0], 
                k -> new ArrayList<>()).add(pair[1]);
        }

        List<Integer> output = new ArrayList<>();
        Set<Integer> visit = new HashSet<>();
        Set<Integer> cycle = new HashSet<>();

        for (int course = 0; course < numCourses; course++) {
            if (!dfs(course, prereq, visit, cycle, output)) {
                return new int[0];
            }
        }

        int[] result = new int[numCourses];
        for (int i = 0; i < numCourses; i++) {
            result[i] = output.get(i);
        }
        return result;
    }

    private boolean dfs(int course, Map<Integer, List<Integer>> prereq,
                        Set<Integer> visit, Set<Integer> cycle, 
                        List<Integer> output) {

        if (cycle.contains(course)) {
            return false;
        }
        if (visit.contains(course)) {
            return true;
        }

        cycle.add(course);
        for (int pre : prereq.getOrDefault(course, 
                                           Collections.emptyList())) {
            if (!dfs(pre, prereq, visit, cycle, output)) {
                return false;
            }
        }
        cycle.remove(course);
        visit.add(course);
        output.add(course);
        return true;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        unordered_map<int, vector<int>> prereq;
        for (const auto& pair : prerequisites) {
            prereq[pair[0]].push_back(pair[1]);
        }

        vector<int> output;
        unordered_set<int> visit;
        unordered_set<int> cycle;

        for (int course = 0; course < numCourses; course++) {
            if (!dfs(course, prereq, visit, cycle, output)) {
                return {};
            }
        }

        return output;
    }

private:
    bool dfs(int course, const unordered_map<int, vector<int>>& prereq,
             unordered_set<int>& visit, unordered_set<int>& cycle, 
             vector<int>& output) {
                
        if (cycle.count(course)) {
            return false;
        }
        if (visit.count(course)) {
            return true;
        }

        cycle.insert(course);
        if (prereq.count(course)) {
            for (int pre : prereq.at(course)) {
                if (!dfs(pre, prereq, visit, cycle, output)) {
                    return false;
                }
            }
        }
        cycle.erase(course);
        visit.insert(course);
        output.push_back(course);
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {number[]}
     */
    findOrder(numCourses, prerequisites) {
        const prereq = new Map();
        for (const [course, pre] of prerequisites) {
            if (!prereq.has(course)) {
                prereq.set(course, []);
            }
            prereq.get(course).push(pre);
        }

        const output = [];
        const visit = new Set();
        const cycle = new Set();

        for (let c = 0; c < numCourses; c++) {
            if (!this.dfs(c, prereq, visit, cycle, output)) {
                return [];
            }
        }

        return output;
    }

    /**
     * @param {number} course
     * @param {Map} prereq
     * @param {Set} visit
     * @param {Set} cycle
     * @param {number[]} output
     * @return {boolean}
     */
    dfs(course, prereq, visit, cycle, output) {
        if (cycle.has(course)) {
            return false;
        }
        if (visit.has(course)) {
            return true;
        }

        cycle.add(course);
        for (const pre of prereq.get(course) || []) {
            if (!this.dfs(pre, prereq, visit, cycle, output)) {
                return false;
            }
        }
        cycle.delete(course);
        visit.add(course);
        output.push(course);
        return true;
    }
}
```

```csharp
public class Solution {
    public int[] FindOrder(int numCourses, int[][] prerequisites) {
        Dictionary<int, List<int>> prereq = new Dictionary<int, List<int>>();
        foreach (var pair in prerequisites) {
            if (!prereq.ContainsKey(pair[0])) {
                prereq[pair[0]] = new List<int>();
            }
            prereq[pair[0]].Add(pair[1]);
        }

        List<int> output = new List<int>();
        HashSet<int> visit = new HashSet<int>();
        HashSet<int> cycle = new HashSet<int>();

        for (int course = 0; course < numCourses; course++) {
            if (!Dfs(course, prereq, visit, cycle, output)) {
                return new int[0];
            }
        }

        return output.ToArray();
    }

    private bool Dfs(int course, Dictionary<int, List<int>> prereq,
                     HashSet<int> visit, HashSet<int> cycle, 
                     List<int> output) {
                        
        if (cycle.Contains(course)) {
            return false;
        }
        if (visit.Contains(course)) {
            return true;
        }

        cycle.Add(course);
        if (prereq.ContainsKey(course)) {
            foreach (int pre in prereq[course]) {
                if (!Dfs(pre, prereq, visit, cycle, output)) {
                    return false;
                }
            }
        }
        cycle.Remove(course);
        visit.Add(course);
        output.Add(course);
        return true;
    }
}
```

```go
func findOrder(numCourses int, prerequisites [][]int) []int {
    prereq := make(map[int][]int)
    for i := 0; i < numCourses; i++ {
        prereq[i] = []int{}
    }
    for _, pair := range prerequisites {
        crs, pre := pair[0], pair[1]
        prereq[crs] = append(prereq[crs], pre)
    }

    output := []int{}
    visit := make(map[int]bool)
    cycle := make(map[int]bool)

    var dfs func(int) bool
    dfs = func(crs int) bool {
        if cycle[crs] {
            return false
        }
        if visit[crs] {
            return true
        }

        cycle[crs] = true
        for _, pre := range prereq[crs] {
            if !dfs(pre) {
                return false
            }
        }
        cycle[crs] = false
        visit[crs] = true
        output = append(output, crs)
        return true
    }

    for i := 0; i < numCourses; i++ {
        if !dfs(i) {
            return []int{}
        }
    }
    
    return output
}
```

```kotlin
class Solution {
    fun findOrder(numCourses: Int, prerequisites: Array<IntArray>): IntArray {
        val prereq = HashMap<Int, MutableList<Int>>()
        for (i in 0 until numCourses) {
            prereq[i] = mutableListOf()
        }
        for (pair in prerequisites) {
            val (crs, pre) = pair
            prereq[crs]?.add(pre)
        }

        val output = mutableListOf<Int>()
        val visit = HashSet<Int>()
        val cycle = HashSet<Int>()

        fun dfs(crs: Int): Boolean {
            if (crs in cycle) return false
            if (crs in visit) return true

            cycle.add(crs)
            for (pre in prereq[crs]!!) {
                if (!dfs(pre)) return false
            }
            cycle.remove(crs)
            visit.add(crs)
            output.add(crs)
            return true
        }

        for (i in 0 until numCourses) {
            if (!dfs(i)) return intArrayOf()
        }

        return output.toIntArray()
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
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        indegree = [0] * numCourses
        adj = [[] for i in range(numCourses)]
        for src, dst in prerequisites:
            indegree[dst] += 1
            adj[src].append(dst)

        q = deque()
        for n in range(numCourses):
            if indegree[n] == 0:
                q.append(n)
        
        finish, output = 0, []
        while q:
            node = q.popleft()
            output.append(node)
            finish += 1
            for nei in adj[node]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    q.append(nei)
        
        if finish != numCourses:
            return []
        return output[::-1]
```

```java
public class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
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
        int[] output = new int[numCourses];
        while (!q.isEmpty()) {
            int node = q.poll();
            output[numCourses - finish - 1] = node;
            finish++;
            for (int nei : adj.get(node)) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.add(nei);
                }
            }
        }
        
        if (finish != numCourses) {
            return new int[0];
        }
        return output;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
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
        vector<int> output(numCourses);
        while (!q.empty()) {
            int node = q.front();q.pop();
            output[numCourses - finish - 1] = node;
            finish++;
            for (int nei : adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.push(nei);
                }
            }
        }

        if (finish != numCourses) {
            return {};
        }
        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {number[]}
     */
    findOrder(numCourses, prerequisites) {
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
        let output = Array(numCourses);
        while (!q.isEmpty()) {
            let node = q.pop();
            output[numCourses - finish - 1] = node;
            finish++;
            for (let nei of adj[node]) {
                indegree[nei]--;
                if (indegree[nei] === 0) {
                    q.push(nei);
                }
            }
        }

        if (finish !== numCourses) {
            return [];
        }
        return output;
    }
}
```

```csharp
public class Solution {
    public int[] FindOrder(int numCourses, int[][] prerequisites) {
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
        int[] output = new int[numCourses];
        while (q.Count > 0) {
            int node = q.Dequeue();
            output[numCourses - finish - 1] = node;
            finish++;
            foreach (var nei in adj[node]) {
                indegree[nei]--;
                if (indegree[nei] == 0) {
                    q.Enqueue(nei);
                }
            }
        }

        if (finish != numCourses) {
            return new int[0];
        }
        return output;
    }
}
```

```go
func findOrder(numCourses int, prerequisites [][]int) []int {
    indegree := make([]int, numCourses)
    adj := make([][]int, numCourses)
    for _, pair := range prerequisites {
        src, dst := pair[0], pair[1]
        indegree[dst]++
        adj[src] = append(adj[src], dst)
    }

    q := []int{}
    for i := 0; i < numCourses; i++ {
        if indegree[i] == 0 {
            q = append(q, i)
        }
    }

    output := []int{}
    finish := 0
    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        output = append(output, node)
        finish++
        for _, nei := range adj[node] {
            indegree[nei]--
            if indegree[nei] == 0 {
                q = append(q, nei)
            }
        }
    }

    if finish != numCourses {
        return []int{}
    }

    for i, j := 0, len(output)-1; i < j; i, j = i+1, j-1 {
        output[i], output[j] = output[j], output[i]
    }
    return output
}
```

```kotlin
class Solution {
    fun findOrder(numCourses: Int, prerequisites: Array<IntArray>): IntArray {
        val indegree = IntArray(numCourses)
        val adj = Array(numCourses) { mutableListOf<Int>() }
        
        for (pair in prerequisites) {
            val (src, dst) = pair
            indegree[dst]++
            adj[src].add(dst)
        }

        val q = ArrayDeque<Int>()
        for (i in 0 until numCourses) {
            if (indegree[i] == 0) q.add(i)
        }

        val output = mutableListOf<Int>()
        var finish = 0
        while (q.isNotEmpty()) {
            val node = q.removeFirst()
            output.add(node)
            finish++
            for (nei in adj[node]) {
                indegree[nei]--
                if (indegree[nei] == 0) {
                    q.add(nei)
                }
            }
        }

        if (finish != numCourses) return intArrayOf()

        output.reverse()
        return output.toIntArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.

---

## 3. Topological Sort (DFS)

::tabs-start

```python
class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        adj = [[] for i in range(numCourses)]
        indegree = [0] * numCourses
        for nxt, pre in prerequisites:
            indegree[nxt] += 1
            adj[pre].append(nxt)
        
        output = []

        def dfs(node):
            output.append(node)
            indegree[node] -= 1
            for nei in adj[node]:
                indegree[nei] -= 1
                if indegree[nei] == 0:
                    dfs(nei)
        
        for i in range(numCourses):
            if indegree[i] == 0:
                dfs(i)
        
        return output if len(output) == numCourses else []
```

```java
public class Solution {
    private List<Integer> output = new ArrayList<>();
    private int[] indegree;
    private List<List<Integer>> adj;
    
    private void dfs(int node) {
        output.add(node);
        indegree[node]--;
        for (int nei : adj.get(node)) {
            indegree[nei]--;
            if (indegree[nei] == 0) {
                dfs(nei);
            }
        }
    }

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adj.add(new ArrayList<>());
        }
        indegree = new int[numCourses];
        for (int[] pre : prerequisites) {
            indegree[pre[0]]++;
            adj.get(pre[1]).add(pre[0]);
        }

        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                dfs(i);
            }
        }

        if (output.size() != numCourses) return new int[0];
        int[] res = new int[output.size()];
        for (int i = 0; i < output.size(); i++) {
            res[i] = output.get(i);
        }
        return res;
    }
}
```

```cpp
class Solution {
    vector<int> output;
    vector<int> indegree;
    vector<vector<int>> adj;
    
    void dfs(int node) {
        output.push_back(node);
        indegree[node]--;
        for (int nei : adj[node]) {
            indegree[nei]--;
            if (indegree[nei] == 0) {
                dfs(nei);
            }
        }
    }

public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        adj = vector<vector<int>>(numCourses);
        indegree = vector<int>(numCourses, 0);
        for (auto& pre : prerequisites) {
            indegree[pre[0]]++;
            adj[pre[1]].push_back(pre[0]);
        }

        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                dfs(i);
            }
        }

        if (output.size() != numCourses) return {};
        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numCourses
     * @param {number[][]} prerequisites
     * @return {number[]}
     */
    findOrder(numCourses, prerequisites) {
        let adj = Array.from({ length: numCourses }, () => []);
        let indegree = Array(numCourses).fill(0);
        
        for (let [nxt, pre] of prerequisites) {
            indegree[nxt]++;
            adj[pre].push(nxt);
        }

        let output = [];

        const dfs = (node) => {
            output.push(node);
            indegree[node]--;
            for (let nei of adj[node]) {
                indegree[nei]--;
                if (indegree[nei] === 0) {
                    dfs(nei);
                }
            }
        };

        for (let i = 0; i < numCourses; i++) {
            if (indegree[i] === 0) {
                dfs(i);
            }
        }

        return output.length === numCourses ? output : [];
    }
}
```

```csharp
public class Solution {
    private List<int> output = new List<int>();
    private int[] indegree;
    private List<List<int>> adj;

    private void Dfs(int node) {
        output.Add(node);
        indegree[node]--;
        foreach (var nei in adj[node]) {
            indegree[nei]--;
            if (indegree[nei] == 0) {
                Dfs(nei);
            }
        }
    }

    public int[] FindOrder(int numCourses, int[][] prerequisites) {
        adj = new List<List<int>>();
        for (int i = 0; i < numCourses; i++) {
            adj.Add(new List<int>());
        }
        indegree = new int[numCourses];
        foreach (var pre in prerequisites) {
            indegree[pre[0]]++;
            adj[pre[1]].Add(pre[0]);
        }

        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                Dfs(i);
            }
        }

        if (output.Count != numCourses) return new int[0];
        return output.ToArray();
    }
}
```

```go
func findOrder(numCourses int, prerequisites [][]int) []int {
    adj := make([][]int, numCourses)
    indegree := make([]int, numCourses)
    for _, pair := range prerequisites {
        nxt, pre := pair[0], pair[1]
        indegree[nxt]++
        adj[pre] = append(adj[pre], nxt)
    }

    output := []int{}

    var dfs func(int)
    dfs = func(node int) {
        output = append(output, node)
        indegree[node]--
        for _, nei := range adj[node] {
            indegree[nei]--
            if indegree[nei] == 0 {
                dfs(nei)
            }
        }
    }

    for i := 0; i < numCourses; i++ {
        if indegree[i] == 0 {
            dfs(i)
        }
    }

    if len(output) == numCourses {
        return output
    }
    return []int{}
}
```

```kotlin
class Solution {
    fun findOrder(numCourses: Int, prerequisites: Array<IntArray>): IntArray {
        val adj = Array(numCourses) { mutableListOf<Int>() }
        val indegree = IntArray(numCourses)
        for ((nxt, pre) in prerequisites) {
            indegree[nxt]++
            adj[pre].add(nxt)
        }

        val output = mutableListOf<Int>()

        fun dfs(node: Int) {
            output.add(node)
            indegree[node]--
            for (nei in adj[node]) {
                indegree[nei]--
                if (indegree[nei] == 0) {
                    dfs(nei)
                }
            }
        }

        for (i in 0 until numCourses) {
            if (indegree[i] == 0) {
                dfs(i)
            }
        }

        return if (output.size == numCourses) output.toIntArray() else intArrayOf()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(V + E)$
* Space complexity: $O(V + E)$

> Where $V$ is the number of courses and $E$ is the number of prerequisites.