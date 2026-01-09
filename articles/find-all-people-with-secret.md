## 1. Depth First Search

### Intuition

The secret spreads through meetings in chronological order. At each point in time, all meetings happening simultaneously form a graph where people can share secrets with each other. If anyone in a connected group already knows the secret, everyone in that group learns it by the end of that time slot. We process meetings time by time, using DFS to propagate the secret through connected components.

### Algorithm

1. Initialize a set `secrets` containing person `0` and `firstPerson`.
2. Group all meetings by their time into an adjacency list for each time slot.
3. Process times in sorted order:
   - For each time, build a graph of people meeting at that time.
   - For each person who already knows the secret, run DFS to spread it to all connected people.
4. Return the list of all people who know the secret.

::tabs-start

```python
class Solution:
    def findAllPeople(self, n: int, meetings: list[list[int]], firstPerson: int) -> list[int]:
        secrets = set([0, firstPerson])  # People with secret
        time_map = {}  # time -> adjacency list meetings

        for src, dst, t in meetings:
            if t not in time_map:
                time_map[t] = defaultdict(list)
            time_map[t][src].append(dst)
            time_map[t][dst].append(src)

        def dfs(src, adj):
            if src in visit:
                return
            visit.add(src)
            secrets.add(src)
            for nei in adj[src]:
                dfs(nei, adj)

        for t in sorted(time_map.keys()):
            visit = set()
            for src in time_map[t]:
                if src in secrets:
                    dfs(src, time_map[t])

        return list(secrets)
```

```java
public class Solution {
    private Set<Integer> secrets, visit;

    public List<Integer> findAllPeople(int n, int[][] meetings, int firstPerson) {
        secrets = new HashSet<>();
        visit = new HashSet<>();
        secrets.add(0);
        secrets.add(firstPerson);
        Map<Integer, Map<Integer, List<Integer>>> time_map = new HashMap<>();

        for (int[] meet : meetings) {
            int src = meet[0], dst = meet[1], t = meet[2];
            time_map.putIfAbsent(t, new HashMap<>());
            time_map.get(t).putIfAbsent(src, new ArrayList<>());
            time_map.get(t).putIfAbsent(dst, new ArrayList<>());
            time_map.get(t).get(src).add(dst);
            time_map.get(t).get(dst).add(src);
        }

        List<Integer> timeKeys = new ArrayList<>(time_map.keySet());
        Collections.sort(timeKeys);
        for (int t : timeKeys) {
            visit = new HashSet<>();
            for (int src : time_map.get(t).keySet()) {
                if (secrets.contains(src)) {
                    dfs(src, time_map.get(t));
                }
            }
        }
        return new ArrayList<>(secrets);
    }

    private void dfs(int src, Map<Integer, List<Integer>> adj) {
        if (!visit.add(src)) return;
        secrets.add(src);
        for (int nei : adj.getOrDefault(src, new ArrayList<>())) {
            dfs(nei, adj);
        }
    }
}
```

```cpp
class Solution {
public:
    unordered_set<int> secrets, visit;

    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        secrets = {0, firstPerson};
        unordered_map<int, unordered_map<int, vector<int>>> time_map;

        for (auto& meet : meetings) {
            int src = meet[0], dst = meet[1], t = meet[2];
            time_map[t][src].push_back(dst);
            time_map[t][dst].push_back(src);
        }

        vector<int> timeKeys;
        for (auto& [t, _] : time_map) {
            timeKeys.push_back(t);
        }
        sort(timeKeys.begin(), timeKeys.end());

        for (int& t : timeKeys) {
            visit.clear();
            for (auto& [src, _] : time_map[t]) {
                if (secrets.count(src)) {
                    dfs(src, time_map[t]);
                }
            }
        }

        return vector<int>(secrets.begin(), secrets.end());
    }

private:
    void dfs(int src, unordered_map<int, vector<int>>& adj) {
        if (!visit.insert(src).second) return;
        secrets.insert(src);
        for (int& nei : adj[src]) {
            dfs(nei, adj);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} meetings
     * @param {number} firstPerson
     * @return {number[]}
     */
    findAllPeople(n, meetings, firstPerson) {
        const secrets = new Set([0, firstPerson]);
        let visit = new Set();
        let time_map = new Map();

        for (let [src, dst, t] of meetings) {
            if (!time_map.has(t)) time_map.set(t, new Map());
            if (!time_map.get(t).has(src)) time_map.get(t).set(src, []);
            if (!time_map.get(t).has(dst)) time_map.get(t).set(dst, []);
            time_map.get(t).get(src).push(dst);
            time_map.get(t).get(dst).push(src);
        }
        const dfs = (src, adj) => {
            if (visit.has(src)) return;
            visit.add(src);
            secrets.add(src);
            for (let nei of adj.get(src) || []) {
                dfs(nei, adj);
            }
        };

        let timeKeys = [...time_map.keys()].sort((a, b) => a - b);
        for (let t of timeKeys) {
            visit.clear();
            for (let src of time_map.get(t).keys()) {
                if (secrets.has(src)) {
                    dfs(src, time_map.get(t));
                }
            }
        }

        return [...secrets];
    }
}
```

```csharp
public class Solution {
    private HashSet<int> secrets, visit;

    public IList<int> FindAllPeople(int n, int[][] meetings, int firstPerson) {
        secrets = new HashSet<int> { 0, firstPerson };
        visit = new HashSet<int>();
        var time_map = new Dictionary<int, Dictionary<int, List<int>>>();

        foreach (var meet in meetings) {
            int src = meet[0], dst = meet[1], t = meet[2];
            if (!time_map.ContainsKey(t)) time_map[t] = new Dictionary<int, List<int>>();
            if (!time_map[t].ContainsKey(src)) time_map[t][src] = new List<int>();
            if (!time_map[t].ContainsKey(dst)) time_map[t][dst] = new List<int>();
            time_map[t][src].Add(dst);
            time_map[t][dst].Add(src);
        }

        var timeKeys = time_map.Keys.ToList();
        timeKeys.Sort();
        foreach (int t in timeKeys) {
            visit = new HashSet<int>();
            foreach (int src in time_map[t].Keys) {
                if (secrets.Contains(src)) {
                    Dfs(src, time_map[t]);
                }
            }
        }
        return secrets.ToList();
    }

    private void Dfs(int src, Dictionary<int, List<int>> adj) {
        if (!visit.Add(src)) return;
        secrets.Add(src);
        if (adj.ContainsKey(src)) {
            foreach (int nei in adj[src]) {
                Dfs(nei, adj);
            }
        }
    }
}
```

```go
func findAllPeople(n int, meetings [][]int, firstPerson int) []int {
    secrets := make(map[int]bool)
    secrets[0] = true
    secrets[firstPerson] = true
    timeMap := make(map[int]map[int][]int)

    for _, meet := range meetings {
        src, dst, t := meet[0], meet[1], meet[2]
        if timeMap[t] == nil {
            timeMap[t] = make(map[int][]int)
        }
        timeMap[t][src] = append(timeMap[t][src], dst)
        timeMap[t][dst] = append(timeMap[t][dst], src)
    }

    times := make([]int, 0, len(timeMap))
    for t := range timeMap {
        times = append(times, t)
    }
    sort.Ints(times)

    for _, t := range times {
        visit := make(map[int]bool)
        var dfs func(src int, adj map[int][]int)
        dfs = func(src int, adj map[int][]int) {
            if visit[src] {
                return
            }
            visit[src] = true
            secrets[src] = true
            for _, nei := range adj[src] {
                dfs(nei, adj)
            }
        }

        for src := range timeMap[t] {
            if secrets[src] {
                dfs(src, timeMap[t])
            }
        }
    }

    result := []int{}
    for person := range secrets {
        result = append(result, person)
    }
    return result
}
```

```kotlin
class Solution {
    private val secrets = HashSet<Int>()
    private var visit = HashSet<Int>()

    fun findAllPeople(n: Int, meetings: Array<IntArray>, firstPerson: Int): List<Int> {
        secrets.add(0)
        secrets.add(firstPerson)
        val timeMap = HashMap<Int, HashMap<Int, MutableList<Int>>>()

        for (meet in meetings) {
            val (src, dst, t) = Triple(meet[0], meet[1], meet[2])
            timeMap.getOrPut(t) { HashMap() }
            timeMap[t]!!.getOrPut(src) { mutableListOf() }.add(dst)
            timeMap[t]!!.getOrPut(dst) { mutableListOf() }.add(src)
        }

        val timeKeys = timeMap.keys.sorted()
        for (t in timeKeys) {
            visit = HashSet()
            for (src in timeMap[t]!!.keys) {
                if (src in secrets) {
                    dfs(src, timeMap[t]!!)
                }
            }
        }
        return secrets.toList()
    }

    private fun dfs(src: Int, adj: HashMap<Int, MutableList<Int>>) {
        if (!visit.add(src)) return
        secrets.add(src)
        for (nei in adj[src] ?: emptyList()) {
            dfs(nei, adj)
        }
    }
}
```

```swift
class Solution {
    func findAllPeople(_ n: Int, _ meetings: [[Int]], _ firstPerson: Int) -> [Int] {
        var secrets = Set([0, firstPerson])
        var timeMap = [Int: [Int: [Int]]]()

        for meet in meetings {
            let src = meet[0], dst = meet[1], t = meet[2]
            if timeMap[t] == nil {
                timeMap[t] = [:]
            }
            timeMap[t]![src, default: []].append(dst)
            timeMap[t]![dst, default: []].append(src)
        }

        func dfs(_ src: Int, _ adj: [Int: [Int]], _ visit: inout Set<Int>) {
            if visit.contains(src) { return }
            visit.insert(src)
            secrets.insert(src)
            for nei in adj[src] ?? [] {
                dfs(nei, adj, &visit)
            }
        }

        for t in timeMap.keys.sorted() {
            var visit = Set<Int>()
            for src in timeMap[t]!.keys {
                if secrets.contains(src) {
                    dfs(src, timeMap[t]!, &visit)
                }
            }
        }

        return Array(secrets)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n)$
- Space complexity: $O(m + n)$

> Where $m$ is the number of meetings and $n$ is the number of people.

---

## 2. Breadth First Search

### Intuition

This is the same concept as the DFS approach, but we use BFS instead to propagate the secret. At each time slot, we start BFS from all people who already know the secret and explore their meeting connections level by level. Both approaches achieve the same result with similar complexity.

### Algorithm

1. Initialize a set `secrets` containing person `0` and `firstPerson`.
2. Group meetings by time into adjacency lists.
3. Process times in sorted order:
   - Initialize a queue with all secret-holders who have meetings at this time.
   - Perform BFS: for each person dequeued, add all their meeting partners to the queue and mark them as knowing the secret.
4. Return the list of all people who know the secret.

::tabs-start

```python
class Solution:
    def findAllPeople(self, n: int, meetings: list[list[int]], firstPerson: int) -> list[int]:
        secrets = set([0, firstPerson])  # People with secret
        time_map = {}  # time -> adjacency list meetings

        for src, dst, t in meetings:
            if t not in time_map:
                time_map[t] = defaultdict(list)
            time_map[t][src].append(dst)
            time_map[t][dst].append(src)

        for t in sorted(time_map.keys()):
            visit = set()
            q = deque()

            for src in time_map[t]:
                if src in secrets:
                    q.append(src)
                    visit.add(src)

            while q:
                node = q.popleft()
                secrets.add(node)
                for nei in time_map[t][node]:
                    if nei not in visit:
                        visit.add(nei)
                        q.append(nei)

        return list(secrets)
```

```java
public class Solution {
    public List<Integer> findAllPeople(int n, int[][] meetings, int firstPerson) {
        Set<Integer> secrets = new HashSet<>();
        secrets.add(0);
        secrets.add(firstPerson);
        TreeMap<Integer, Map<Integer, List<Integer>>> time_map = new TreeMap<>();

        for (int[] meet : meetings) {
            int src = meet[0], dst = meet[1], t = meet[2];
            time_map.putIfAbsent(t, new HashMap<>());
            time_map.get(t).putIfAbsent(src, new ArrayList<>());
            time_map.get(t).putIfAbsent(dst, new ArrayList<>());
            time_map.get(t).get(src).add(dst);
            time_map.get(t).get(dst).add(src);
        }

        for (int t : time_map.keySet()) {
            Set<Integer> visit = new HashSet<>();
            Queue<Integer> q = new LinkedList<>();

            for (int src : time_map.get(t).keySet()) {
                if (secrets.contains(src)) {
                    q.offer(src);
                    visit.add(src);
                }
            }

            while (!q.isEmpty()) {
                int node = q.poll();
                secrets.add(node);
                for (int nei : time_map.get(t).get(node)) {
                    if (!visit.contains(nei)) {
                        visit.add(nei);
                        q.offer(nei);
                    }
                }
            }
        }

        return new ArrayList<>(secrets);
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        unordered_set<int> secrets = {0, firstPerson};
        map<int, unordered_map<int, vector<int>>> time_map;

        for (auto& meet : meetings) {
            int src = meet[0], dst = meet[1], t = meet[2];
            time_map[t][src].push_back(dst);
            time_map[t][dst].push_back(src);
        }

        for (auto& [t, adj] : time_map) {
            unordered_set<int> visit;
            queue<int> q;

            for (auto& [src, _] : adj) {
                if (secrets.count(src)) {
                    q.push(src);
                    visit.insert(src);
                }
            }

            while (!q.empty()) {
                int node = q.front();
                q.pop();
                secrets.insert(node);
                for (int nei : adj[node]) {
                    if (!visit.count(nei)) {
                        visit.insert(nei);
                        q.push(nei);
                    }
                }
            }
        }

        return vector<int>(secrets.begin(), secrets.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} meetings
     * @param {number} firstPerson
     * @return {number[]}
     */
    findAllPeople(n, meetings, firstPerson) {
        const secrets = new Set([0, firstPerson]);
        const time_map = new Map();

        for (let [src, dst, t] of meetings) {
            if (!time_map.has(t)) time_map.set(t, new Map());
            if (!time_map.get(t).has(src)) time_map.get(t).set(src, []);
            if (!time_map.get(t).has(dst)) time_map.get(t).set(dst, []);
            time_map.get(t).get(src).push(dst);
            time_map.get(t).get(dst).push(src);
        }

        for (let t of [...time_map.keys()].sort((a, b) => a - b)) {
            let visit = new Set();
            const q = new Queue();

            for (let src of time_map.get(t).keys()) {
                if (secrets.has(src)) {
                    q.push(src);
                    visit.add(src);
                }
            }

            while (!q.isEmpty()) {
                let node = q.pop();
                secrets.add(node);
                for (let nei of time_map.get(t).get(node)) {
                    if (!visit.has(nei)) {
                        visit.add(nei);
                        q.push(nei);
                    }
                }
            }
        }

        return [...secrets];
    }
}
```

```csharp
public class Solution {
    public IList<int> FindAllPeople(int n, int[][] meetings, int firstPerson) {
        var secrets = new HashSet<int> { 0, firstPerson };
        var time_map = new SortedDictionary<int, Dictionary<int, List<int>>>();

        foreach (var meet in meetings) {
            int src = meet[0], dst = meet[1], t = meet[2];
            if (!time_map.ContainsKey(t)) time_map[t] = new Dictionary<int, List<int>>();
            if (!time_map[t].ContainsKey(src)) time_map[t][src] = new List<int>();
            if (!time_map[t].ContainsKey(dst)) time_map[t][dst] = new List<int>();
            time_map[t][src].Add(dst);
            time_map[t][dst].Add(src);
        }

        foreach (int t in time_map.Keys) {
            var visit = new HashSet<int>();
            var q = new Queue<int>();

            foreach (int src in time_map[t].Keys) {
                if (secrets.Contains(src)) {
                    q.Enqueue(src);
                    visit.Add(src);
                }
            }

            while (q.Count > 0) {
                int node = q.Dequeue();
                secrets.Add(node);
                foreach (int nei in time_map[t][node]) {
                    if (!visit.Contains(nei)) {
                        visit.Add(nei);
                        q.Enqueue(nei);
                    }
                }
            }
        }

        return secrets.ToList();
    }
}
```

```go
func findAllPeople(n int, meetings [][]int, firstPerson int) []int {
    secrets := make(map[int]bool)
    secrets[0] = true
    secrets[firstPerson] = true
    timeMap := make(map[int]map[int][]int)

    for _, meet := range meetings {
        src, dst, t := meet[0], meet[1], meet[2]
        if timeMap[t] == nil {
            timeMap[t] = make(map[int][]int)
        }
        timeMap[t][src] = append(timeMap[t][src], dst)
        timeMap[t][dst] = append(timeMap[t][dst], src)
    }

    times := make([]int, 0, len(timeMap))
    for t := range timeMap {
        times = append(times, t)
    }
    sort.Ints(times)

    for _, t := range times {
        visit := make(map[int]bool)
        q := []int{}

        for src := range timeMap[t] {
            if secrets[src] {
                q = append(q, src)
                visit[src] = true
            }
        }

        for len(q) > 0 {
            node := q[0]
            q = q[1:]
            secrets[node] = true
            for _, nei := range timeMap[t][node] {
                if !visit[nei] {
                    visit[nei] = true
                    q = append(q, nei)
                }
            }
        }
    }

    result := []int{}
    for person := range secrets {
        result = append(result, person)
    }
    return result
}
```

```kotlin
class Solution {
    fun findAllPeople(n: Int, meetings: Array<IntArray>, firstPerson: Int): List<Int> {
        val secrets = HashSet<Int>()
        secrets.add(0)
        secrets.add(firstPerson)
        val timeMap = TreeMap<Int, HashMap<Int, MutableList<Int>>>()

        for (meet in meetings) {
            val (src, dst, t) = Triple(meet[0], meet[1], meet[2])
            timeMap.getOrPut(t) { HashMap() }
            timeMap[t]!!.getOrPut(src) { mutableListOf() }.add(dst)
            timeMap[t]!!.getOrPut(dst) { mutableListOf() }.add(src)
        }

        for (t in timeMap.keys) {
            val visit = HashSet<Int>()
            val q: Queue<Int> = LinkedList()

            for (src in timeMap[t]!!.keys) {
                if (src in secrets) {
                    q.offer(src)
                    visit.add(src)
                }
            }

            while (q.isNotEmpty()) {
                val node = q.poll()
                secrets.add(node)
                for (nei in timeMap[t]!![node] ?: emptyList()) {
                    if (nei !in visit) {
                        visit.add(nei)
                        q.offer(nei)
                    }
                }
            }
        }

        return secrets.toList()
    }
}
```

```swift
class Solution {
    func findAllPeople(_ n: Int, _ meetings: [[Int]], _ firstPerson: Int) -> [Int] {
        var secrets = Set([0, firstPerson])
        var timeMap = [Int: [Int: [Int]]]()

        for meet in meetings {
            let src = meet[0], dst = meet[1], t = meet[2]
            if timeMap[t] == nil {
                timeMap[t] = [:]
            }
            timeMap[t]![src, default: []].append(dst)
            timeMap[t]![dst, default: []].append(src)
        }

        for t in timeMap.keys.sorted() {
            var visit = Set<Int>()
            var q = [Int]()

            for src in timeMap[t]!.keys {
                if secrets.contains(src) {
                    q.append(src)
                    visit.insert(src)
                }
            }

            while !q.isEmpty {
                let node = q.removeFirst()
                secrets.insert(node)
                for nei in timeMap[t]![node] ?? [] {
                    if !visit.contains(nei) {
                        visit.insert(nei)
                        q.append(nei)
                    }
                }
            }
        }

        return Array(secrets)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n)$
- Space complexity: $O(m + n)$

> Where $m$ is the number of meetings and $n$ is the number of people.

---

## 3. Iterative DFS

### Intuition

Instead of using recursion for DFS, we can use an explicit stack. This approach sorts all meetings by time first, then processes groups of meetings with the same timestamp together. For each group, we build an adjacency list and use a stack-based DFS starting from all current secret-holders.

### Algorithm

1. Sort meetings by time.
2. Initialize a boolean array `secrets` where only positions `0` and `firstPerson` are `true`.
3. Process meetings in groups by time:
   - Build an adjacency list for meetings at the current time.
   - Collect all people in this time group who already know the secret.
   - Use iterative DFS (stack) to spread the secret to all reachable people.
4. Return all indices where `secrets[i]` is `true`.

::tabs-start

```python
class Solution:
    def findAllPeople(self, n: int, meetings: list[list[int]], firstPerson: int) -> list[int]:
        meetings.sort(key=lambda x: x[2])  # Sort by time
        secrets = [False] * n
        secrets[0] = secrets[firstPerson] = True

        for _, group in groupby(meetings, key=lambda x: x[2]):
            adj = defaultdict(list)
            visited = set()

            for u, v, _ in group:
                adj[u].append(v)
                adj[v].append(u)
                if secrets[u]:
                    visited.add(u)
                if secrets[v]:
                    visited.add(v)

            stack = list(visited)
            while stack:
                node = stack.pop()
                for nei in adj[node]:
                    if nei not in visited:
                        visited.add(nei)
                        stack.append(nei)
                        secrets[nei] = True

        return [i for i in range(n) if secrets[i]]
```

```java
public class Solution {
    public List<Integer> findAllPeople(int n, int[][] meetings, int firstPerson) {
        Arrays.sort(meetings, Comparator.comparingInt(a -> a[2]));
        boolean[] secrets = new boolean[n];
        secrets[0] = secrets[firstPerson] = true;

        int i = 0, m = meetings.length;
        while (i < m) {
            int time = meetings[i][2];
            Map<Integer, List<Integer>> adj = new HashMap<>();
            Set<Integer> visited = new HashSet<>();

            while (i < m && meetings[i][2] == time) {
                int u = meetings[i][0], v = meetings[i][1];
                adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
                adj.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
                if (secrets[u]) visited.add(u);
                if (secrets[v]) visited.add(v);
                i++;
            }

            Stack<Integer> stack = new Stack<>();
            stack.addAll(visited);
            while (!stack.isEmpty()) {
                int node = stack.pop();
                for (int nei : adj.getOrDefault(node, Collections.emptyList())) {
                    if (!visited.contains(nei)) {
                        visited.add(nei);
                        stack.push(nei);
                        secrets[nei] = true;
                    }
                }
            }
        }

        List<Integer> res = new ArrayList<>();
        for (int j = 0; j < n; j++) {
            if (secrets[j]) res.add(j);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        sort(meetings.begin(), meetings.end(), [](auto& a, auto& b) {
            return a[2] < b[2];
        });

        vector<bool> secrets(n, false);
        secrets[0] = secrets[firstPerson] = true;

        int i = 0, m = meetings.size();
        while (i < m) {
            int time = meetings[i][2];
            unordered_map<int, vector<int>> adj;
            unordered_set<int> visited;

            while (i < m && meetings[i][2] == time) {
                int u = meetings[i][0], v = meetings[i][1];
                adj[u].push_back(v);
                adj[v].push_back(u);
                if (secrets[u]) visited.insert(u);
                if (secrets[v]) visited.insert(v);
                i++;
            }

            stack<int> stack(visited.begin(), visited.end());
            while (!stack.empty()) {
                int node = stack.top(); stack.pop();
                for (int& nei : adj[node]) {
                    if (!visited.count(nei)) {
                        visited.insert(nei);
                        stack.push(nei);
                        secrets[nei] = true;
                    }
                }
            }
        }

        vector<int> res;
        for (int j = 0; j < n; j++) {
            if (secrets[j]) res.push_back(j);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[][]} meetings
     * @param {number} firstPerson
     * @return {number[]}
     */
    findAllPeople(n, meetings, firstPerson) {
        meetings.sort((a, b) => a[2] - b[2]);
        const secrets = new Array(n).fill(false);
        secrets[0] = secrets[firstPerson] = true;

        let i = 0,
            m = meetings.length;
        while (i < m) {
            const time = meetings[i][2];
            const adj = new Map();
            const visited = new Set();

            while (i < m && meetings[i][2] === time) {
                const [u, v] = meetings[i];
                if (!adj.has(u)) adj.set(u, []);
                if (!adj.has(v)) adj.set(v, []);
                adj.get(u).push(v);
                adj.get(v).push(u);
                if (secrets[u]) visited.add(u);
                if (secrets[v]) visited.add(v);
                i++;
            }

            const stack = [...visited];
            while (stack.length) {
                const node = stack.pop();
                for (const nei of adj.get(node) || []) {
                    if (!visited.has(nei)) {
                        visited.add(nei);
                        stack.push(nei);
                        secrets[nei] = true;
                    }
                }
            }
        }

        let res = [];
        for (let i = 0; i < n; i++) {
            if (secrets[i]) res.push(i);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindAllPeople(int n, int[][] meetings, int firstPerson) {
        Array.Sort(meetings, (a, b) => a[2].CompareTo(b[2]));
        bool[] secrets = new bool[n];
        secrets[0] = secrets[firstPerson] = true;

        int i = 0, m = meetings.Length;
        while (i < m) {
            int time = meetings[i][2];
            var adj = new Dictionary<int, List<int>>();
            var visited = new HashSet<int>();

            while (i < m && meetings[i][2] == time) {
                int u = meetings[i][0], v = meetings[i][1];
                if (!adj.ContainsKey(u)) adj[u] = new List<int>();
                if (!adj.ContainsKey(v)) adj[v] = new List<int>();
                adj[u].Add(v);
                adj[v].Add(u);
                if (secrets[u]) visited.Add(u);
                if (secrets[v]) visited.Add(v);
                i++;
            }

            var stack = new Stack<int>(visited);
            while (stack.Count > 0) {
                int node = stack.Pop();
                if (adj.ContainsKey(node)) {
                    foreach (int nei in adj[node]) {
                        if (!visited.Contains(nei)) {
                            visited.Add(nei);
                            stack.Push(nei);
                            secrets[nei] = true;
                        }
                    }
                }
            }
        }

        var res = new List<int>();
        for (int j = 0; j < n; j++) {
            if (secrets[j]) res.Add(j);
        }
        return res;
    }
}
```

```go
func findAllPeople(n int, meetings [][]int, firstPerson int) []int {
    sort.Slice(meetings, func(i, j int) bool {
        return meetings[i][2] < meetings[j][2]
    })

    secrets := make([]bool, n)
    secrets[0] = true
    secrets[firstPerson] = true

    i, m := 0, len(meetings)
    for i < m {
        time := meetings[i][2]
        adj := make(map[int][]int)
        visited := make(map[int]bool)

        for i < m && meetings[i][2] == time {
            u, v := meetings[i][0], meetings[i][1]
            adj[u] = append(adj[u], v)
            adj[v] = append(adj[v], u)
            if secrets[u] {
                visited[u] = true
            }
            if secrets[v] {
                visited[v] = true
            }
            i++
        }

        stack := []int{}
        for node := range visited {
            stack = append(stack, node)
        }

        for len(stack) > 0 {
            node := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            for _, nei := range adj[node] {
                if !visited[nei] {
                    visited[nei] = true
                    stack = append(stack, nei)
                    secrets[nei] = true
                }
            }
        }
    }

    res := []int{}
    for j := 0; j < n; j++ {
        if secrets[j] {
            res = append(res, j)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findAllPeople(n: Int, meetings: Array<IntArray>, firstPerson: Int): List<Int> {
        meetings.sortBy { it[2] }
        val secrets = BooleanArray(n)
        secrets[0] = true
        secrets[firstPerson] = true

        var i = 0
        val m = meetings.size
        while (i < m) {
            val time = meetings[i][2]
            val adj = HashMap<Int, MutableList<Int>>()
            val visited = HashSet<Int>()

            while (i < m && meetings[i][2] == time) {
                val u = meetings[i][0]
                val v = meetings[i][1]
                adj.getOrPut(u) { mutableListOf() }.add(v)
                adj.getOrPut(v) { mutableListOf() }.add(u)
                if (secrets[u]) visited.add(u)
                if (secrets[v]) visited.add(v)
                i++
            }

            val stack = ArrayDeque(visited)
            while (stack.isNotEmpty()) {
                val node = stack.removeLast()
                for (nei in adj[node] ?: emptyList()) {
                    if (nei !in visited) {
                        visited.add(nei)
                        stack.addLast(nei)
                        secrets[nei] = true
                    }
                }
            }
        }

        return (0 until n).filter { secrets[it] }
    }
}
```

```swift
class Solution {
    func findAllPeople(_ n: Int, _ meetings: [[Int]], _ firstPerson: Int) -> [Int] {
        let sortedMeetings = meetings.sorted { $0[2] < $1[2] }
        var secrets = [Bool](repeating: false, count: n)
        secrets[0] = true
        secrets[firstPerson] = true

        var i = 0
        let m = sortedMeetings.count
        while i < m {
            let time = sortedMeetings[i][2]
            var adj = [Int: [Int]]()
            var visited = Set<Int>()

            while i < m && sortedMeetings[i][2] == time {
                let u = sortedMeetings[i][0]
                let v = sortedMeetings[i][1]
                adj[u, default: []].append(v)
                adj[v, default: []].append(u)
                if secrets[u] { visited.insert(u) }
                if secrets[v] { visited.insert(v) }
                i += 1
            }

            var stack = Array(visited)
            while !stack.isEmpty {
                let node = stack.removeLast()
                for nei in adj[node] ?? [] {
                    if !visited.contains(nei) {
                        visited.insert(nei)
                        stack.append(nei)
                        secrets[nei] = true
                    }
                }
            }
        }

        return (0..<n).filter { secrets[$0] }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n)$
- Space complexity: $O(m + n)$

> Where $m$ is the number of meetings and $n$ is the number of people.

---

## 4. Disjoint Set Union

### Intuition

We can model the secret-sharing as a union-find problem. People who meet at the same time are temporarily connected. If any person in a connected component knows the secret (i.e., is connected to person `0`), everyone in that component learns it. The key insight is that after processing each time slot, we must reset people who did not get connected to person `0`, since the secret only spreads within a time slot.

### Algorithm

1. Sort meetings by time.
2. Initialize a DSU structure. Union person `0` and `firstPerson`.
3. Process meetings in groups by time:
   - Union all pairs of people meeting at this time.
   - Track all people involved in meetings at this time.
   - After all unions for this time, reset any person not connected to person `0` (they do not know the secret yet).
4. Return all people who are in the same component as person `0`.

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu, pv = self.find(u), self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] < self.Size[pv]:
            pu, pv = pv, pu
        self.Size[pu] += self.Size[pv]
        self.Parent[pv] = pu
        return True

    def reset(self, node):
        self.Parent[node] = node
        self.Size[node] = 1

class Solution:
    def findAllPeople(self, n: int, meetings: list[list[int]], firstPerson: int) -> list[int]:
        meetings.sort(key=lambda x: x[2])  # Sort by time
        dsu = DSU(n)
        dsu.union(0, firstPerson)

        for _, group in groupby(meetings, key=lambda x: x[2]):
            group_nodes = set()
            for u, v, _ in group:
                dsu.union(u, v)
                group_nodes.add(u)
                group_nodes.add(v)

            for node in group_nodes:
                if dsu.find(node) != dsu.find(0):
                    dsu.reset(node)

        return [i for i in range(n) if dsu.find(i) == dsu.find(0)]
```

```java
class DSU {
    int[] Parent, Size;

    DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    void union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return;
        if (Size[pu] < Size[pv]) {
            int temp = pu;
            pu = pv;
            pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
    }

    void reset(int node) {
        Parent[node] = node;
        Size[node] = 1;
    }
}

public class Solution {
    public List<Integer> findAllPeople(int n, int[][] meetings, int firstPerson) {
        Arrays.sort(meetings, Comparator.comparingInt(a -> a[2]));
        DSU dsu = new DSU(n);
        dsu.union(0, firstPerson);

        for (int i = 0; i < meetings.length; ) {
            int time = meetings[i][2];
            Set<Integer> group = new HashSet<>();

            for (; i < meetings.length && meetings[i][2] == time; i++) {
                int u = meetings[i][0], v = meetings[i][1];
                dsu.union(u, v);
                group.add(u);
                group.add(v);
            }

            for (int node : group) {
                if (dsu.find(node) != dsu.find(0)) {
                    dsu.reset(node);
                }
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (dsu.find(i) == dsu.find(0)) result.add(i);
        }
        return result;
    }
}
```

```cpp
class DSU {
public:
    vector<int> Parent, Size;

    DSU(int n) {
        Parent.resize(n + 1);
        Size.resize(n + 1, 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    void unionSets(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return;
        if (Size[pu] < Size[pv]) swap(pu, pv);
        Size[pu] += Size[pv];
        Parent[pv] = pu;
    }

    void reset(int node) {
        Parent[node] = node;
        Size[node] = 1;
    }
};

class Solution {
public:
    vector<int> findAllPeople(int n, vector<vector<int>>& meetings, int firstPerson) {
        sort(meetings.begin(), meetings.end(), [](auto &a, auto &b) {
            return a[2] < b[2];
        });
        DSU dsu(n);
        dsu.unionSets(0, firstPerson);

        for (int i = 0; i < meetings.size(); ) {
            int time = meetings[i][2];
            unordered_set<int> group;

            for (; i < meetings.size() && meetings[i][2] == time; i++) {
                int u = meetings[i][0], v = meetings[i][1];
                dsu.unionSets(u, v);
                group.insert(u);
                group.insert(v);
            }

            for (int node : group) {
                if (dsu.find(node) != dsu.find(0)) {
                    dsu.reset(node);
                }
            }
        }

        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (dsu.find(i) == dsu.find(0)) result.push_back(i);
        }
        return result;
    }
};
```

```javascript
class DSU {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] >= this.Size[pv]) {
            this.Size[pu] += this.Size[pv];
            this.Parent[pv] = pu;
        } else {
            this.Size[pv] += this.Size[pu];
            this.Parent[pu] = pv;
        }
        return true;
    }

    /**
     * @param {number} node
     * @return {void}
     */
    reset(node) {
        this.Parent[node] = node;
        this.Size[node] = 1;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[][]} meetings
     * @param {number} firstPerson
     * @return {number[]}
     */
    findAllPeople(n, meetings, firstPerson) {
        meetings.sort((a, b) => a[2] - b[2]);
        let dsu = new DSU(n);
        dsu.union(0, firstPerson);

        for (let i = 0; i < meetings.length; ) {
            let time = meetings[i][2];
            let group = new Set();

            for (; i < meetings.length && meetings[i][2] === time; i++) {
                let [u, v] = meetings[i];
                dsu.union(u, v);
                group.add(u);
                group.add(v);
            }

            group.forEach((node) => {
                if (dsu.find(node) !== dsu.find(0)) {
                    dsu.reset(node);
                }
            });
        }

        return [...Array(n).keys()].filter((i) => dsu.find(i) === dsu.find(0));
    }
}
```

```csharp
public class DSU {
    public int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int Find(int node) {
        if (Parent[node] != node) {
            Parent[node] = Find(Parent[node]);
        }
        return Parent[node];
    }

    public void Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return;
        if (Size[pu] < Size[pv]) {
            int temp = pu; pu = pv; pv = temp;
        }
        Size[pu] += Size[pv];
        Parent[pv] = pu;
    }

    public void Reset(int node) {
        Parent[node] = node;
        Size[node] = 1;
    }
}

public class Solution {
    public IList<int> FindAllPeople(int n, int[][] meetings, int firstPerson) {
        Array.Sort(meetings, (a, b) => a[2].CompareTo(b[2]));
        DSU dsu = new DSU(n);
        dsu.Union(0, firstPerson);

        for (int i = 0; i < meetings.Length; ) {
            int time = meetings[i][2];
            var group = new HashSet<int>();

            for (; i < meetings.Length && meetings[i][2] == time; i++) {
                int u = meetings[i][0], v = meetings[i][1];
                dsu.Union(u, v);
                group.Add(u);
                group.Add(v);
            }

            foreach (int node in group) {
                if (dsu.Find(node) != dsu.Find(0)) {
                    dsu.Reset(node);
                }
            }
        }

        var result = new List<int>();
        for (int i = 0; i < n; i++) {
            if (dsu.Find(i) == dsu.Find(0)) result.Add(i);
        }
        return result;
    }
}
```

```go
type DSU struct {
    Parent []int
    Size   []int
}

func NewDSU(n int) *DSU {
    parent := make([]int, n+1)
    size := make([]int, n+1)
    for i := 0; i <= n; i++ {
        parent[i] = i
        size[i] = 1
    }
    return &DSU{Parent: parent, Size: size}
}

func (d *DSU) Find(node int) int {
    if d.Parent[node] != node {
        d.Parent[node] = d.Find(d.Parent[node])
    }
    return d.Parent[node]
}

func (d *DSU) Union(u, v int) {
    pu, pv := d.Find(u), d.Find(v)
    if pu == pv {
        return
    }
    if d.Size[pu] < d.Size[pv] {
        pu, pv = pv, pu
    }
    d.Size[pu] += d.Size[pv]
    d.Parent[pv] = pu
}

func (d *DSU) Reset(node int) {
    d.Parent[node] = node
    d.Size[node] = 1
}

func findAllPeople(n int, meetings [][]int, firstPerson int) []int {
    sort.Slice(meetings, func(i, j int) bool {
        return meetings[i][2] < meetings[j][2]
    })

    dsu := NewDSU(n)
    dsu.Union(0, firstPerson)

    i := 0
    for i < len(meetings) {
        time := meetings[i][2]
        group := make(map[int]bool)

        for i < len(meetings) && meetings[i][2] == time {
            u, v := meetings[i][0], meetings[i][1]
            dsu.Union(u, v)
            group[u] = true
            group[v] = true
            i++
        }

        for node := range group {
            if dsu.Find(node) != dsu.Find(0) {
                dsu.Reset(node)
            }
        }
    }

    result := []int{}
    for j := 0; j < n; j++ {
        if dsu.Find(j) == dsu.Find(0) {
            result = append(result, j)
        }
    }
    return result
}
```

```kotlin
class DSU(n: Int) {
    val parent = IntArray(n + 1) { it }
    val size = IntArray(n + 1) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int) {
        var pu = find(u)
        var pv = find(v)
        if (pu == pv) return
        if (size[pu] < size[pv]) {
            val temp = pu; pu = pv; pv = temp
        }
        size[pu] += size[pv]
        parent[pv] = pu
    }

    fun reset(node: Int) {
        parent[node] = node
        size[node] = 1
    }
}

class Solution {
    fun findAllPeople(n: Int, meetings: Array<IntArray>, firstPerson: Int): List<Int> {
        meetings.sortBy { it[2] }
        val dsu = DSU(n)
        dsu.union(0, firstPerson)

        var i = 0
        while (i < meetings.size) {
            val time = meetings[i][2]
            val group = HashSet<Int>()

            while (i < meetings.size && meetings[i][2] == time) {
                val u = meetings[i][0]
                val v = meetings[i][1]
                dsu.union(u, v)
                group.add(u)
                group.add(v)
                i++
            }

            for (node in group) {
                if (dsu.find(node) != dsu.find(0)) {
                    dsu.reset(node)
                }
            }
        }

        return (0 until n).filter { dsu.find(it) == dsu.find(0) }
    }
}
```

```swift
class DSU {
    var parent: [Int]
    var size: [Int]

    init(_ n: Int) {
        parent = Array(0...n)
        size = [Int](repeating: 1, count: n + 1)
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ u: Int, _ v: Int) {
        var pu = find(u)
        var pv = find(v)
        if pu == pv { return }
        if size[pu] < size[pv] {
            swap(&pu, &pv)
        }
        size[pu] += size[pv]
        parent[pv] = pu
    }

    func reset(_ node: Int) {
        parent[node] = node
        size[node] = 1
    }
}

class Solution {
    func findAllPeople(_ n: Int, _ meetings: [[Int]], _ firstPerson: Int) -> [Int] {
        let sortedMeetings = meetings.sorted { $0[2] < $1[2] }
        let dsu = DSU(n)
        dsu.union(0, firstPerson)

        var i = 0
        while i < sortedMeetings.count {
            let time = sortedMeetings[i][2]
            var group = Set<Int>()

            while i < sortedMeetings.count && sortedMeetings[i][2] == time {
                let u = sortedMeetings[i][0]
                let v = sortedMeetings[i][1]
                dsu.union(u, v)
                group.insert(u)
                group.insert(v)
                i += 1
            }

            for node in group {
                if dsu.find(node) != dsu.find(0) {
                    dsu.reset(node)
                }
            }
        }

        return (0..<n).filter { dsu.find($0) == dsu.find(0) }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + (m * α(n)))$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space depending on the sorting algorithm.

> Where $m$ is the number of meetings and $n$ is the number of people.
