## 1. Depth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n)$
- Space complexity: $O(m + n)$

> Where $m$ is the number of meetings and $n$ is the number of people.

---

## 2. Breadth First Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n)$
- Space complexity: $O(m + n)$

> Where $m$ is the number of meetings and $n$ is the number of people.

---

## 3. Iterative DFS

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n)$
- Space complexity: $O(m + n)$

> Where $m$ is the number of meetings and $n$ is the number of people.

---

## 4. Disjoint Set Union

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + (m * α(n)))$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space depending on the sorting algorithm.

> Where $m$ is the number of meetings and $n$ is the number of people.
