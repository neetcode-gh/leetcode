## 1. Breadth First Search (Stops as Nodes)

### Intuition

This is a shortest path problem where we want to find the minimum number of buses needed to travel from a source stop to a target stop. We can model this as a graph problem where stops are nodes, and we use BFS to find the shortest path in terms of bus transfers.

The key insight is that when we board a bus, we can reach all stops on that route. So from any stop, we can transition to all other stops on any bus that serves that stop. We count bus transfers (not individual stops) to measure distance.

### Algorithm

1. If `source` equals `target`, return `0` (no bus needed).
2. Build a mapping from each stop to the list of bus routes that serve it.
3. Initialize BFS from the source stop, tracking visited stops and visited buses.
4. For each level of BFS (representing one bus ride):
   - For each stop at the current level, check all buses that serve this stop.
   - For each unvisited bus, add all its stops to the next BFS level.
   - Mark buses and stops as visited to avoid revisiting.
5. If we reach the target stop, return the number of bus rides taken.
6. If BFS completes without finding the target, return `-1`.

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

```go
func numBusesToDestination(routes [][]int, source int, target int) int {
    if source == target {
        return 0
    }

    n := len(routes)
    stops := make(map[int][]int)
    for bus := 0; bus < n; bus++ {
        for _, stop := range routes[bus] {
            stops[stop] = append(stops[stop], bus)
        }
    }

    seenBus := make(map[int]bool)
    seenStop := make(map[int]bool)
    seenStop[source] = true
    q := []int{source}
    res := 0

    for len(q) > 0 {
        size := len(q)
        for k := 0; k < size; k++ {
            stop := q[0]
            q = q[1:]
            if stop == target {
                return res
            }
            for _, bus := range stops[stop] {
                if seenBus[bus] {
                    continue
                }
                seenBus[bus] = true
                for _, nxtStop := range routes[bus] {
                    if seenStop[nxtStop] {
                        continue
                    }
                    seenStop[nxtStop] = true
                    q = append(q, nxtStop)
                }
            }
        }
        res++
    }
    return -1
}
```

```kotlin
class Solution {
    fun numBusesToDestination(routes: Array<IntArray>, source: Int, target: Int): Int {
        if (source == target) return 0

        val n = routes.size
        val stops = mutableMapOf<Int, MutableList<Int>>()
        for (bus in 0 until n) {
            for (stop in routes[bus]) {
                stops.getOrPut(stop) { mutableListOf() }.add(bus)
            }
        }

        val seenBus = mutableSetOf<Int>()
        val seenStop = mutableSetOf(source)
        val q = ArrayDeque<Int>()
        q.add(source)
        var res = 0

        while (q.isNotEmpty()) {
            repeat(q.size) {
                val stop = q.removeFirst()
                if (stop == target) return res
                for (bus in stops.getOrDefault(stop, mutableListOf())) {
                    if (bus in seenBus) continue
                    seenBus.add(bus)
                    for (nxtStop in routes[bus]) {
                        if (nxtStop in seenStop) continue
                        seenStop.add(nxtStop)
                        q.add(nxtStop)
                    }
                }
            }
            res++
        }
        return -1
    }
}
```

```swift
class Solution {
    func numBusesToDestination(_ routes: [[Int]], _ source: Int, _ target: Int) -> Int {
        if source == target { return 0 }

        let n = routes.count
        var stops = [Int: [Int]]()
        for bus in 0..<n {
            for stop in routes[bus] {
                stops[stop, default: []].append(bus)
            }
        }

        var seenBus = Set<Int>()
        var seenStop = Set<Int>([source])
        var queue = [source]
        var res = 0

        while !queue.isEmpty {
            var nextQueue = [Int]()
            for stop in queue {
                if stop == target { return res }
                for bus in stops[stop, default: []] {
                    if seenBus.contains(bus) { continue }
                    seenBus.insert(bus)
                    for nxtStop in routes[bus] {
                        if seenStop.contains(nxtStop) { continue }
                        seenStop.insert(nxtStop)
                        nextQueue.append(nxtStop)
                    }
                }
            }
            queue = nextQueue
            res += 1
        }
        return -1
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

### Intuition

Instead of treating stops as nodes, we can treat bus routes as nodes. Two routes are connected if they share at least one common stop (you can transfer between them). This transforms the problem into finding the shortest path between any route containing the source stop and any route containing the target stop.

This approach can be more efficient when there are many stops but fewer routes, as we traverse through routes rather than individual stops.

### Algorithm

1. If `source` equals `target`, return `0`.
2. Build a mapping from each stop to the list of routes serving it.
3. Build an adjacency list between routes: two routes are neighbors if they share a stop.
4. Start BFS from all routes that contain the source stop.
5. For each level of BFS:
   - Check if the current route contains the target stop; if so, return the current distance.
   - Add all neighboring routes (connected via shared stops) to the queue.
6. If BFS completes without finding a route containing the target, return `-1`.

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

```go
func numBusesToDestination(routes [][]int, source int, target int) int {
    if source == target {
        return 0
    }

    n := len(routes)
    adjList := make([][]int, n)
    for i := range adjList {
        adjList[i] = []int{}
    }
    stopToRoutes := make(map[int][]int)
    for bus := 0; bus < n; bus++ {
        for _, stop := range routes[bus] {
            stopToRoutes[stop] = append(stopToRoutes[stop], bus)
        }
    }

    if _, ok := stopToRoutes[source]; !ok {
        return -1
    }
    if _, ok := stopToRoutes[target]; !ok {
        return -1
    }

    hasEdge := make([][]bool, n)
    for i := range hasEdge {
        hasEdge[i] = make([]bool, n)
    }
    for _, buses := range stopToRoutes {
        for i := 0; i < len(buses); i++ {
            for j := i + 1; j < len(buses); j++ {
                if !hasEdge[buses[i]][buses[j]] {
                    hasEdge[buses[i]][buses[j]] = true
                    hasEdge[buses[j]][buses[i]] = true
                    adjList[buses[i]] = append(adjList[buses[i]], buses[j])
                    adjList[buses[j]] = append(adjList[buses[j]], buses[i])
                }
            }
        }
    }

    q := append([]int{}, stopToRoutes[source]...)
    res := 1
    for len(q) > 0 {
        size := len(q)
        for k := 0; k < size; k++ {
            node := q[0]
            q = q[1:]
            for _, t := range stopToRoutes[target] {
                if node == t {
                    return res
                }
            }
            for len(adjList[node]) > 0 {
                nxtBus := adjList[node][len(adjList[node])-1]
                adjList[node] = adjList[node][:len(adjList[node])-1]
                if len(adjList[nxtBus]) > 0 {
                    q = append(q, nxtBus)
                }
            }
        }
        res++
    }
    return -1
}
```

```kotlin
class Solution {
    fun numBusesToDestination(routes: Array<IntArray>, source: Int, target: Int): Int {
        if (source == target) return 0

        val n = routes.size
        val adjList = Array(n) { mutableListOf<Int>() }
        val stopToRoutes = mutableMapOf<Int, MutableList<Int>>()
        for (bus in 0 until n) {
            for (stop in routes[bus]) {
                stopToRoutes.getOrPut(stop) { mutableListOf() }.add(bus)
            }
        }

        if (source !in stopToRoutes || target !in stopToRoutes) return -1

        val hasEdge = Array(n) { BooleanArray(n) }
        for (buses in stopToRoutes.values) {
            for (i in buses.indices) {
                for (j in i + 1 until buses.size) {
                    if (!hasEdge[buses[i]][buses[j]]) {
                        hasEdge[buses[i]][buses[j]] = true
                        hasEdge[buses[j]][buses[i]] = true
                        adjList[buses[i]].add(buses[j])
                        adjList[buses[j]].add(buses[i])
                    }
                }
            }
        }

        val q = ArrayDeque<Int>()
        for (node in stopToRoutes[source]!!) q.add(node)
        var res = 1

        while (q.isNotEmpty()) {
            repeat(q.size) {
                val node = q.removeFirst()
                if (node in stopToRoutes[target]!!) return res
                while (adjList[node].isNotEmpty()) {
                    val nxtBus = adjList[node].removeLast()
                    if (adjList[nxtBus].isNotEmpty()) {
                        q.add(nxtBus)
                    }
                }
            }
            res++
        }
        return -1
    }
}
```

```swift
class Solution {
    func numBusesToDestination(_ routes: [[Int]], _ source: Int, _ target: Int) -> Int {
        if source == target { return 0 }

        let n = routes.count
        var adjList = [[Int]](repeating: [], count: n)
        var stopToRoutes = [Int: [Int]]()
        for bus in 0..<n {
            for stop in routes[bus] {
                stopToRoutes[stop, default: []].append(bus)
            }
        }

        guard stopToRoutes[source] != nil, stopToRoutes[target] != nil else { return -1 }

        var hasEdge = [[Bool]](repeating: [Bool](repeating: false, count: n), count: n)
        for buses in stopToRoutes.values {
            for i in 0..<buses.count {
                for j in (i + 1)..<buses.count {
                    if !hasEdge[buses[i]][buses[j]] {
                        hasEdge[buses[i]][buses[j]] = true
                        hasEdge[buses[j]][buses[i]] = true
                        adjList[buses[i]].append(buses[j])
                        adjList[buses[j]].append(buses[i])
                    }
                }
            }
        }

        var queue = stopToRoutes[source]!
        var res = 1

        while !queue.isEmpty {
            var nextQueue = [Int]()
            for node in queue {
                if stopToRoutes[target]!.contains(node) { return res }
                while !adjList[node].isEmpty {
                    let nxtBus = adjList[node].removeLast()
                    if !adjList[nxtBus].isEmpty {
                        nextQueue.append(nxtBus)
                    }
                }
            }
            queue = nextQueue
            res += 1
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 + n * m)$
* Space complexity: $O(n ^ 2 + n * m)$

> Where $n$ is the number of routes and $m$ is the maximum number of stops per bus route.