## 1. Breadth First Search (Stops as Nodes)

::tabs-start

```python
class Solution:
    def numBusesToDestination(self, routes: List[List[int]], source: int, target: int) -> int:
        if source == target:
            return 0
        
        n = len(routes)
        stops = defaultdict(list)
        for bus in range(n):
            for stop in routes[bus]:
                stops[stop].append(bus)
        
        seen_bus = set()
        seen_stop = set([source])
        res = 0
        q = deque([source])
        while q:
            for _ in range(len(q)):
                stop = q.popleft()
                if stop == target:
                    return res
                for bus in stops[stop]:
                    if bus in seen_bus:
                        continue
                    seen_bus.add(bus)
                    for nxtStop in routes[bus]:
                        if nxtStop in seen_stop:
                            continue
                        seen_stop.add(nxtStop)
                        q.append(nxtStop)
            res += 1
        
        return -1
```

```java
public class Solution {
    public int numBusesToDestination(int[][] routes, int source, int target) {
        if (source == target) return 0;
        int n = routes.length;
        Map<Integer, List<Integer>> stops = new HashMap<>();
        for (int bus = 0; bus < n; bus++) {
            for (int stop : routes[bus]) {
                stops.computeIfAbsent(stop, k -> new ArrayList<>()).add(bus);
            }
        }

        Set<Integer> seenBus = new HashSet<>();
        Set<Integer> seenStop = new HashSet<>();
        seenStop.add(source);
        Queue<Integer> q = new LinkedList<>();
        q.add(source);
        int res = 0;

        while (!q.isEmpty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                int stop = q.poll();
                if (stop == target) return res;
                for (int bus : stops.getOrDefault(stop, new ArrayList<>())) {
                    if (seenBus.contains(bus)) continue;
                    seenBus.add(bus);
                    for (int nxtStop : routes[bus]) {
                        if (seenStop.contains(nxtStop)) continue;
                        seenStop.add(nxtStop);
                        q.add(nxtStop);
                    }
                }
            }
            res++;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {
        if (source == target) return 0;
        int n = routes.size();
        unordered_map<int, vector<int>> stops;
        for (int bus = 0; bus < n; bus++) {
            for (int stop : routes[bus]) {
                stops[stop].push_back(bus);
            }
        }

        unordered_set<int> seenBus;
        unordered_set<int> seenStop;
        seenStop.insert(source);
        queue<int> q;
        q.push(source);
        int res = 0;

        while (!q.empty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                int stop = q.front(); q.pop();
                if (stop == target) return res;
                for (int bus : stops[stop]) {
                    if (seenBus.count(bus)) continue;
                    seenBus.insert(bus);
                    for (int nxtStop : routes[bus]) {
                        if (seenStop.count(nxtStop)) continue;
                        seenStop.insert(nxtStop);
                        q.push(nxtStop);
                    }
                }
            }
            res++;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} routes
     * @param {number} source
     * @param {number} target
     * @return {number}
     */
    numBusesToDestination(routes, source, target) {
        if (source === target) return 0;
        let n = routes.length;
        let stops = new Map();
        for (let bus = 0; bus < n; bus++) {
            for (let stop of routes[bus]) {
                if (!stops.has(stop)) stops.set(stop, []);
                stops.get(stop).push(bus);
            }
        }

        let seenBus = new Set();
        let seenStop = new Set([source]);
        let q = new Queue([source]);
        let res = 0;

        while (!q.isEmpty()) {
            let size = q.size();
            for (let k = 0; k < size; k++) {
                let stop = q.pop();
                if (stop === target) return res;
                for (let bus of (stops.get(stop) || [])) {
                    if (seenBus.has(bus)) continue;
                    seenBus.add(bus);
                    for (let nxtStop of routes[bus]) {
                        if (seenStop.has(nxtStop)) continue;
                        seenStop.add(nxtStop);
                        q.push(nxtStop);
                    }
                }
            }
            res++;
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int NumBusesToDestination(int[][] routes, int source, int target) {
        if (source == target) return 0;
        int n = routes.Length;
        var stops = new Dictionary<int, List<int>>();
        for (int bus = 0; bus < n; bus++) {
            foreach (int stop in routes[bus]) {
                if (!stops.ContainsKey(stop)) stops[stop] = new List<int>();
                stops[stop].Add(bus);
            }
        }

        var seenBus = new HashSet<int>();
        var seenStop = new HashSet<int> { source };
        Queue<int> q = new Queue<int>();
        q.Enqueue(source);
        int res = 0;

        while (q.Count > 0) {
            int size = q.Count;
            for (int k = 0; k < size; k++) {
                int stop = q.Dequeue();
                if (stop == target) return res;
                foreach (int bus in stops.GetValueOrDefault(stop, new List<int>())) {
                    if (seenBus.Contains(bus)) continue;
                    seenBus.Add(bus);
                    foreach (int nxtStop in routes[bus]) {
                        if (seenStop.Contains(nxtStop)) continue;
                        seenStop.Add(nxtStop);
                        q.Enqueue(nxtStop);
                    }
                }
            }
            res++;
        }
        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(n * m)$

> Where $n$ is the number of routes and $m$ is the maximum number of stops per bus route.

---

## 2. Breadth First Search (Routes as Nodes)

::tabs-start

```python
class Solution:
    def numBusesToDestination(self, routes: List[List[int]], source: int, target: int) -> int:
        if source == target:
            return 0

        n = len(routes)
        adjList = [[] for _ in range(n)]
        stopToRoutes = defaultdict(list)
        for bus, route in enumerate(routes):
            for stop in route:
                stopToRoutes[stop].append(bus)

        if target not in stopToRoutes or source not in stopToRoutes:
            return -1

        hasEdge = [[False] * n for _ in range(n)]
        for buses in stopToRoutes.values():
            for i in range(len(buses)):
                for j in range(i + 1, len(buses)):
                    if hasEdge[buses[i]][buses[j]]:
                        continue
                    hasEdge[buses[i]][buses[j]] = True
                    hasEdge[buses[j]][buses[i]] = True
                    adjList[buses[i]].append(buses[j])
                    adjList[buses[j]].append(buses[i])

        q = deque([node for node in stopToRoutes[source]])
        res = 1
        while q:
            for _ in range(len(q)):
                node = q.popleft()
                if node in stopToRoutes[target]:
                    return res
                while adjList[node]:
                    nxtBus = adjList[node].pop()
                    if adjList[nxtBus]:
                        q.append(nxtBus)
            res += 1

        return -1
```

```java
class Solution {
    public int numBusesToDestination(int[][] routes, int source, int target) {
        if (source == target) return 0;

        int n = routes.length;
        List<List<Integer>> adjList = new ArrayList<>();
        for (int i = 0; i < n; i++) adjList.add(new ArrayList<>());
        Map<Integer, List<Integer>> stopToRoutes = new HashMap<>();

        for (int bus = 0; bus < n; bus++) {
            for (int stop : routes[bus]) {
                stopToRoutes.computeIfAbsent(stop, k -> new ArrayList<>()).add(bus);
            }
        }

        if (!stopToRoutes.containsKey(source) || !stopToRoutes.containsKey(target)) {
            return -1;
        }

        boolean[][] hasEdge = new boolean[n][n];
        for (List<Integer> buses : stopToRoutes.values()) {
            for (int i = 0; i < buses.size(); i++) {
                for (int j = i + 1; j < buses.size(); j++) {
                    int b1 = buses.get(i), b2 = buses.get(j);
                    if (!hasEdge[b1][b2]) {
                        hasEdge[b1][b2] = true;
                        hasEdge[b2][b1] = true;
                        adjList.get(b1).add(b2);
                        adjList.get(b2).add(b1);
                    }
                }
            }
        }

        Queue<Integer> q = new LinkedList<>();
        for (int bus : stopToRoutes.get(source)) q.add(bus);

        int res = 1;
        while (!q.isEmpty()) {
            for (int k = q.size(); k >= 1; k--) {
                int node = q.poll();
                if (stopToRoutes.get(target).contains(node)) return res;
                while (!adjList.get(node).isEmpty()) {
                    int nxtBus = adjList.get(node).remove(adjList.get(node).size() - 1);
                    if (!adjList.get(nxtBus).isEmpty()) {
                        q.add(nxtBus);
                    }
                }
            }
            res++;
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int numBusesToDestination(vector<vector<int>>& routes, int source, int target) {
        if (source == target) return 0;

        int n = routes.size();
        vector<vector<int>> adjList(n);
        unordered_map<int, vector<int>> stopToRoutes;
        for (int bus = 0; bus < n; bus++) {
            for (int stop : routes[bus]) {
                stopToRoutes[stop].push_back(bus);
            }
        }

        if (!stopToRoutes.count(source) || !stopToRoutes.count(target)) return -1;

        vector<vector<bool>> hasEdge(n, vector<bool>(n, false));
        for (auto& [stop, buses] : stopToRoutes) {
            for (int i = 0; i < (int)buses.size(); i++) {
                for (int j = i + 1; j < (int)buses.size(); j++) {
                    int b1 = buses[i], b2 = buses[j];
                    if (!hasEdge[b1][b2]) {
                        hasEdge[b1][b2] = hasEdge[b2][b1] = true;
                        adjList[b1].push_back(b2);
                        adjList[b2].push_back(b1);
                    }
                }
            }
        }

        queue<int> q;
        for (int bus : stopToRoutes[source]) q.push(bus);

        int res = 1;
        while (!q.empty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                int node = q.front(); q.pop();
                if (find(stopToRoutes[target].begin(), stopToRoutes[target].end(), node) != stopToRoutes[target].end()) {
                    return res;
                }
                while (!adjList[node].empty()) {
                    int nxtBus = adjList[node].back();
                    adjList[node].pop_back();
                    if (!adjList[nxtBus].empty()) {
                        q.push(nxtBus);
                    }
                }
            }
            res++;
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} routes
     * @param {number} source
     * @param {number} target
     * @return {number}
     */
    numBusesToDestination(routes, source, target) {
        if (source === target) return 0;

        const n = routes.length;
        const adjList = Array.from({ length: n }, () => []);
        const stopToRoutes = new Map();
        for (let bus = 0; bus < n; bus++) {
            for (let stop of routes[bus]) {
                if (!stopToRoutes.has(stop)) stopToRoutes.set(stop, []);
                stopToRoutes.get(stop).push(bus);
            }
        }

        if (!stopToRoutes.has(source) || !stopToRoutes.has(target)) return -1;

        const hasEdge = Array.from({ length: n }, () => Array(n).fill(false));
        for (let buses of stopToRoutes.values()) {
            for (let i = 0; i < buses.length; i++) {
                for (let j = i + 1; j < buses.length; j++) {
                    if (!hasEdge[buses[i]][buses[j]]) {
                        hasEdge[buses[i]][buses[j]] = true;
                        hasEdge[buses[j]][buses[i]] = true;
                        adjList[buses[i]].push(buses[j]);
                        adjList[buses[j]].push(buses[i]);
                    }
                }
            }
        }

        const q = new Queue(stopToRoutes.get(source));
        let res = 1;
        while (!q.isEmpty()) {
            for (let k = q.size(); k >= 1; k--) {
                const node = q.pop();
                if (stopToRoutes.get(target).includes(node)) return res;
                while (adjList[node].length > 0) {
                    const nxtBus = adjList[node].pop();
                    if (adjList[nxtBus].length > 0) {
                        q.push(nxtBus);
                    }
                }
            }
            res++;
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int NumBusesToDestination(int[][] routes, int source, int target) {
        if (source == target) return 0;

        int n = routes.Length;
        var adjList = new List<int>[n];
        for (int i = 0; i < n; i++) adjList[i] = new List<int>();
        var stopToRoutes = new Dictionary<int, List<int>>();
        for (int bus = 0; bus < n; bus++) {
            foreach (int stop in routes[bus]) {
                if (!stopToRoutes.ContainsKey(stop)) stopToRoutes[stop] = new List<int>();
                stopToRoutes[stop].Add(bus);
            }
        }

        if (!stopToRoutes.ContainsKey(target) || !stopToRoutes.ContainsKey(source)) {
            return -1;
        }

        bool[,] hasEdge = new bool[n, n];
        foreach (var buses in stopToRoutes.Values) {
            for (int i = 0; i < buses.Count; i++) {
                for (int j = i + 1; j < buses.Count; j++) {
                    if (hasEdge[buses[i], buses[j]]) continue;
                    hasEdge[buses[i], buses[j]] = true;
                    hasEdge[buses[j], buses[i]] = true;
                    adjList[buses[i]].Add(buses[j]);
                    adjList[buses[j]].Add(buses[i]);
                }
            }
        }

        var q = new Queue<int>();
        foreach (int node in stopToRoutes[source]) q.Enqueue(node);

        int res = 1;
        while (q.Count > 0) {
            int size = q.Count;
            while (size-- > 0) {
                int node = q.Dequeue();
                if (stopToRoutes[target].Contains(node)) return res;
                while (adjList[node].Count > 0) {
                    int nxtBus = adjList[node][adjList[node].Count - 1];
                    adjList[node].RemoveAt(adjList[node].Count - 1);
                    if (adjList[nxtBus].Count > 0) q.Enqueue(nxtBus);
                }
            }
            res++;
        }

        return -1;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 + n * m)$
* Space complexity: $O(n ^ 2 + n * m)$

> Where $n$ is the number of routes and $m$ is the maximum number of stops per bus route.