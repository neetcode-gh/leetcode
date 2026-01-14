## 1. Brute Force (Simulation)

### Intuition

We simulate the process step by step. For each task, we advance `time` to when the task becomes available, mark all servers that have finished as available, then pick the best available server (lowest weight, then lowest index). If no server is free, we wait until the earliest one finishes. This direct simulation is easy to understand but slow due to repeated linear scans.

### Algorithm

1. Initialize arrays to track each server's availability status and finish time.
2. For each task at index `t`:
   - Set `time` to at least `t` (the task's arrival time).
   - Mark servers as available if their finish time is at or before current `time`.
   - If no servers are available, advance `time` to the earliest finish time and update availability.
   - Find the available server with the smallest weight (and smallest index for ties).
   - Assign the task to that server, mark it unavailable, and set its finish time.
3. Return the list of assigned server indices.

::tabs-start

```python
class Solution:
    def assignTasks(self, servers: List[int], tasks: List[int]) -> List[int]:
        n, m = len(servers), len(tasks)
        available = [True] * n
        finishTime = [0] * n
        res = []
        time = 0

        for t in range(m):
            time = max(time, t)

            for i in range(n):
                if finishTime[i] <= time:
                    available[i] = True

            if not any(available):
                time = min(finishTime)
                for i in range(n):
                    if finishTime[i] <= time:
                        available[i] = True

            minIdx = -1
            for i in range(n):
                if (available[i] and
                    (minIdx == -1 or servers[i] < servers[minIdx] or
                    (servers[i] == servers[minIdx] and i < minIdx))
                ):
                    minIdx = i

            res.append(minIdx)
            available[minIdx] = False
            finishTime[minIdx] = time + tasks[t]

        return res
```

```java
public class Solution {
    public int[] assignTasks(int[] servers, int[] tasks) {
        int n = servers.length, m = tasks.length;
        boolean[] available = new boolean[n];
        Arrays.fill(available, true);
        int[] finishTime = new int[n];
        int[] res = new int[m];
        int time = 0;

        for (int t = 0; t < m; t++) {
            time = Math.max(time, t);
            for (int i = 0; i < n; i++) {
                if (finishTime[i] <= time) {
                    available[i] = true;
                }
            }

            if (!anyAvailable(available)) {
                time = Arrays.stream(finishTime).min().getAsInt();
                for (int i = 0; i < n; i++) {
                    if (finishTime[i] <= time) {
                        available[i] = true;
                    }
                }
            }

            int minIdx = -1;
            for (int i = 0; i < n; i++) {
                if (available[i] && (minIdx == -1 || servers[i] < servers[minIdx] ||
                    (servers[i] == servers[minIdx] && i < minIdx))) {
                    minIdx = i;
                }
            }

            res[t] = minIdx;
            available[minIdx] = false;
            finishTime[minIdx] = time + tasks[t];
        }
        return res;
    }

    private boolean anyAvailable(boolean[] available) {
        for (boolean v : available) {
            if (v) return true;
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();
        vector<bool> available(n, true);
        vector<int> finishTime(n, 0), res(m);
        int time = 0;

        for (int t = 0; t < m; t++) {
            time = max(time, t);

            for (int i = 0; i < n; i++) {
                if (finishTime[i] <= time) {
                    available[i] = true;
                }
            }

            if (!any_of(available.begin(), available.end(), [](bool v) { return v; })) {
                time = *min_element(finishTime.begin(), finishTime.end());
                for (int i = 0; i < n; i++) {
                    if (finishTime[i] <= time) {
                        available[i] = true;
                    }
                }
            }

            int minIdx = -1;
            for (int i = 0; i < n; i++) {
                if (available[i] && (minIdx == -1 || servers[i] < servers[minIdx] ||
                    (servers[i] == servers[minIdx] && i < minIdx))) {
                    minIdx = i;
                }
            }

            res[t] = minIdx;
            available[minIdx] = false;
            finishTime[minIdx] = time + tasks[t];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} servers
     * @param {number[]} tasks
     * @return {number[]}
     */
    assignTasks(servers, tasks) {
        const n = servers.length,
            m = tasks.length;
        const available = Array(n).fill(true);
        const finishTime = Array(n).fill(0);
        const res = [];
        let time = 0;

        for (let t = 0; t < m; t++) {
            time = Math.max(time, t);

            for (let i = 0; i < n; i++) {
                if (finishTime[i] <= time) {
                    available[i] = true;
                }
            }

            if (!available.some((v) => v)) {
                time = Math.min(...finishTime);
                for (let i = 0; i < n; i++) {
                    if (finishTime[i] <= time) {
                        available[i] = true;
                    }
                }
            }

            let minIdx = -1;
            for (let i = 0; i < n; i++) {
                if (
                    available[i] &&
                    (minIdx === -1 ||
                        servers[i] < servers[minIdx] ||
                        (servers[i] === servers[minIdx] && i < minIdx))
                ) {
                    minIdx = i;
                }
            }

            res.push(minIdx);
            available[minIdx] = false;
            finishTime[minIdx] = time + tasks[t];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] AssignTasks(int[] servers, int[] tasks) {
        int n = servers.Length, m = tasks.Length;
        bool[] available = new bool[n];
        Array.Fill(available, true);
        int[] finishTime = new int[n];
        int[] res = new int[m];
        int time = 0;

        for (int t = 0; t < m; t++) {
            time = Math.Max(time, t);
            for (int i = 0; i < n; i++) {
                if (finishTime[i] <= time) {
                    available[i] = true;
                }
            }

            if (!Array.Exists(available, v => v)) {
                time = finishTime.Min();
                for (int i = 0; i < n; i++) {
                    if (finishTime[i] <= time) {
                        available[i] = true;
                    }
                }
            }

            int minIdx = -1;
            for (int i = 0; i < n; i++) {
                if (available[i] && (minIdx == -1 || servers[i] < servers[minIdx] ||
                    (servers[i] == servers[minIdx] && i < minIdx))) {
                    minIdx = i;
                }
            }

            res[t] = minIdx;
            available[minIdx] = false;
            finishTime[minIdx] = time + tasks[t];
        }
        return res;
    }
}
```

```go
func assignTasks(servers []int, tasks []int) []int {
    n, m := len(servers), len(tasks)
    available := make([]bool, n)
    for i := range available {
        available[i] = true
    }
    finishTime := make([]int, n)
    res := make([]int, m)
    time := 0

    for t := 0; t < m; t++ {
        if t > time {
            time = t
        }

        for i := 0; i < n; i++ {
            if finishTime[i] <= time {
                available[i] = true
            }
        }

        anyAvailable := false
        for _, v := range available {
            if v {
                anyAvailable = true
                break
            }
        }

        if !anyAvailable {
            minFinish := finishTime[0]
            for _, ft := range finishTime {
                if ft < minFinish {
                    minFinish = ft
                }
            }
            time = minFinish
            for i := 0; i < n; i++ {
                if finishTime[i] <= time {
                    available[i] = true
                }
            }
        }

        minIdx := -1
        for i := 0; i < n; i++ {
            if available[i] && (minIdx == -1 || servers[i] < servers[minIdx] ||
                (servers[i] == servers[minIdx] && i < minIdx)) {
                minIdx = i
            }
        }

        res[t] = minIdx
        available[minIdx] = false
        finishTime[minIdx] = time + tasks[t]
    }
    return res
}
```

```kotlin
class Solution {
    fun assignTasks(servers: IntArray, tasks: IntArray): IntArray {
        val n = servers.size
        val m = tasks.size
        val available = BooleanArray(n) { true }
        val finishTime = IntArray(n)
        val res = IntArray(m)
        var time = 0

        for (t in 0 until m) {
            time = maxOf(time, t)

            for (i in 0 until n) {
                if (finishTime[i] <= time) {
                    available[i] = true
                }
            }

            if (!available.any { it }) {
                time = finishTime.minOrNull()!!
                for (i in 0 until n) {
                    if (finishTime[i] <= time) {
                        available[i] = true
                    }
                }
            }

            var minIdx = -1
            for (i in 0 until n) {
                if (available[i] && (minIdx == -1 || servers[i] < servers[minIdx] ||
                    (servers[i] == servers[minIdx] && i < minIdx))) {
                    minIdx = i
                }
            }

            res[t] = minIdx
            available[minIdx] = false
            finishTime[minIdx] = time + tasks[t]
        }
        return res
    }
}
```

```swift
class Solution {
    func assignTasks(_ servers: [Int], _ tasks: [Int]) -> [Int] {
        let n = servers.count, m = tasks.count
        var available = [Bool](repeating: true, count: n)
        var finishTime = [Int](repeating: 0, count: n)
        var res = [Int](repeating: 0, count: m)
        var time = 0

        for t in 0..<m {
            time = max(time, t)

            for i in 0..<n {
                if finishTime[i] <= time {
                    available[i] = true
                }
            }

            if !available.contains(true) {
                time = finishTime.min()!
                for i in 0..<n {
                    if finishTime[i] <= time {
                        available[i] = true
                    }
                }
            }

            var minIdx = -1
            for i in 0..<n {
                if available[i] && (minIdx == -1 || servers[i] < servers[minIdx] ||
                    (servers[i] == servers[minIdx] && i < minIdx)) {
                    minIdx = i
                }
            }

            res[t] = minIdx
            available[minIdx] = false
            finishTime[minIdx] = time + tasks[t]
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output array.

> Where $m$ is the number of tasks and $n$ is the number of servers.

---

## 2. Two Min-Heaps - I

### Intuition

Using two heaps makes server selection efficient. One heap holds available servers ordered by (`weight`, `index`), and another holds unavailable servers ordered by their finish `time`. When processing a task, we move servers from unavailable to available if their `time` has passed, then pop the best server from the available heap.

### Algorithm

1. Create two heaps:
   - `available`: min-heap ordered by (`weight`, `index`) for free servers.
   - `unavailable`: min-heap ordered by finish `time` for busy servers.
2. Add all servers to `available`.
3. For each task at index `i`:
   - Set `time` to at least `i`.
   - If no server is available, advance `time` to the earliest finish `time` in `unavailable`.
   - Move all servers from `unavailable` whose finish `time` is at or before `time` to `available`.
   - Pop the best server from `available`, assign the task, and push it to `unavailable` with its new finish `time`.
4. Return the result array.

::tabs-start

```python
class Solution:
    def assignTasks(self, servers: List[int], tasks: List[int]) -> List[int]:
        res = [0] * len(tasks)
        available = [(servers[i], i) for i in range(len(servers))]
        heapq.heapify(available)
        unavailable = []

        t = 0
        for i in range(len(tasks)):
            t = max(t, i)

            if not available:
                t = unavailable[0][0]

            while unavailable and t >= unavailable[0][0]:
                timeFree, weight, index = heapq.heappop(unavailable)
                heapq.heappush(available, (weight, index))

            weight, index = heapq.heappop(available)
            res[i] = index
            heapq.heappush(unavailable, (t + tasks[i], weight, index))

        return res
```

```java
public class Solution {
    public int[] assignTasks(int[] servers, int[] tasks) {
        int n = servers.length, m = tasks.length;
        int[] res = new int[m];

        PriorityQueue<int[]> available = new PriorityQueue<>(
            (a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0])
        );
        PriorityQueue<int[]> unavailable = new PriorityQueue<>(
            Comparator.comparingInt(a -> a[0])
        );

        for (int i = 0; i < n; i++) {
            available.offer(new int[]{servers[i], i});
        }

        int time = 0;
        for (int i = 0; i < m; i++) {
            time = Math.max(time, i);

            if (available.isEmpty()) {
                time = unavailable.peek()[0];
            }

            while (!unavailable.isEmpty() && unavailable.peek()[0] <= time) {
                int[] server = unavailable.poll();
                available.offer(new int[]{server[1], server[2]});
            }

            int[] bestServer = available.poll();
            res[i] = bestServer[1];
            unavailable.offer(new int[]{time + tasks[i], bestServer[0], bestServer[1]});
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();
        vector<int> res(m);

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> available;
        priority_queue<vector<int>, vector<vector<int>>, greater<>> unavailable;

        for (int i = 0; i < n; i++) {
            available.emplace(servers[i], i);
        }

        int time = 0;
        for (int i = 0; i < m; i++) {
            time = max(time, i);

            if (available.empty()) {
                time = unavailable.top()[0];
            }

            while (!unavailable.empty() && unavailable.top()[0] <= time) {
                auto server = unavailable.top(); unavailable.pop();
                available.emplace(server[1], server[2]);
            }

            auto [weight, index] = available.top(); available.pop();
            res[i] = index;
            unavailable.push({time + tasks[i], weight, index});
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} servers
     * @param {number[]} tasks
     * @return {number[]}
     */
    assignTasks(servers, tasks) {
        const n = servers.length;
        const available = new PriorityQueue((a, b) =>
            a[0] === b[0] ? a[1] - b[1] : a[0] - b[0],
        );
        const unavailable = new PriorityQueue((a, b) => a[0] - b[0]);
        const res = new Array(tasks.length);

        for (let i = 0; i < n; i++) {
            available.enqueue([servers[i], i]);
        }

        let time = 0;
        for (let i = 0; i < tasks.length; i++) {
            time = Math.max(time, i);
            if (available.isEmpty()) {
                time = unavailable.front()[0];
            }
            while (!unavailable.isEmpty() && unavailable.front()[0] <= time) {
                const [timeFree, weight, index] = unavailable.dequeue();
                available.enqueue([weight, index]);
            }
            const [weight, index] = available.dequeue();
            res[i] = index;
            unavailable.enqueue([time + tasks[i], weight, index]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] AssignTasks(int[] servers, int[] tasks) {
        int n = servers.Length, m = tasks.Length;
        int[] res = new int[m];

        var available = new PriorityQueue<int[], int[]>(
            Comparer<int[]>.Create((a, b) => a[0] == b[0] ? a[1].CompareTo(b[1]) : a[0].CompareTo(b[0]))
        );
        var unavailable = new PriorityQueue<int[], int>(
            Comparer<int>.Create((a, b) => a.CompareTo(b))
        );

        for (int i = 0; i < n; i++) {
            available.Enqueue(new int[] { servers[i], i }, new int[] { servers[i], i });
        }

        int time = 0;
        for (int i = 0; i < m; i++) {
            time = Math.Max(time, i);

            if (available.Count == 0) {
                unavailable.TryPeek(out var peek, out var peekTime);
                time = peekTime;
            }

            while (unavailable.Count > 0) {
                unavailable.TryPeek(out var server, out var finishTime);
                if (finishTime > time) break;
                unavailable.Dequeue();
                available.Enqueue(new int[] { server[0], server[1] }, new int[] { server[0], server[1] });
            }

            available.TryDequeue(out var bestServer, out _);
            res[i] = bestServer[1];
            unavailable.Enqueue(new int[] { bestServer[0], bestServer[1] }, time + tasks[i]);
        }

        return res;
    }
}
```

```go
import (
    "container/heap"
)

type AvailableHeap [][]int
func (h AvailableHeap) Len() int { return len(h) }
func (h AvailableHeap) Less(i, j int) bool {
    if h[i][0] == h[j][0] {
        return h[i][1] < h[j][1]
    }
    return h[i][0] < h[j][0]
}
func (h AvailableHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *AvailableHeap) Push(x interface{}) { *h = append(*h, x.([]int)) }
func (h *AvailableHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0:n-1]
    return x
}

type UnavailableHeap [][]int
func (h UnavailableHeap) Len() int { return len(h) }
func (h UnavailableHeap) Less(i, j int) bool { return h[i][0] < h[j][0] }
func (h UnavailableHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *UnavailableHeap) Push(x interface{}) { *h = append(*h, x.([]int)) }
func (h *UnavailableHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0:n-1]
    return x
}

func assignTasks(servers []int, tasks []int) []int {
    n, m := len(servers), len(tasks)
    res := make([]int, m)

    available := &AvailableHeap{}
    unavailable := &UnavailableHeap{}
    heap.Init(available)
    heap.Init(unavailable)

    for i := 0; i < n; i++ {
        heap.Push(available, []int{servers[i], i})
    }

    time := 0
    for i := 0; i < m; i++ {
        if i > time {
            time = i
        }

        if available.Len() == 0 {
            time = (*unavailable)[0][0]
        }

        for unavailable.Len() > 0 && (*unavailable)[0][0] <= time {
            server := heap.Pop(unavailable).([]int)
            heap.Push(available, []int{server[1], server[2]})
        }

        best := heap.Pop(available).([]int)
        res[i] = best[1]
        heap.Push(unavailable, []int{time + tasks[i], best[0], best[1]})
    }

    return res
}
```

```kotlin
import java.util.PriorityQueue

class Solution {
    fun assignTasks(servers: IntArray, tasks: IntArray): IntArray {
        val n = servers.size
        val m = tasks.size
        val res = IntArray(m)

        val available = PriorityQueue<IntArray>(compareBy({ it[0] }, { it[1] }))
        val unavailable = PriorityQueue<IntArray>(compareBy { it[0] })

        for (i in 0 until n) {
            available.offer(intArrayOf(servers[i], i))
        }

        var time = 0
        for (i in 0 until m) {
            time = maxOf(time, i)

            if (available.isEmpty()) {
                time = unavailable.peek()[0]
            }

            while (unavailable.isNotEmpty() && unavailable.peek()[0] <= time) {
                val server = unavailable.poll()
                available.offer(intArrayOf(server[1], server[2]))
            }

            val bestServer = available.poll()
            res[i] = bestServer[1]
            unavailable.offer(intArrayOf(time + tasks[i], bestServer[0], bestServer[1]))
        }

        return res
    }
}
```

```swift
class Solution {
    func assignTasks(_ servers: [Int], _ tasks: [Int]) -> [Int] {
        let n = servers.count, m = tasks.count
        var res = [Int](repeating: 0, count: m)

        var available: [(weight: Int, index: Int)] = []
        var unavailable: [(time: Int, weight: Int, index: Int)] = []

        for i in 0..<n {
            available.append((servers[i], i))
        }
        available.sort { $0.weight == $1.weight ? $0.index < $1.index : $0.weight < $1.weight }

        var time = 0
        for i in 0..<m {
            time = max(time, i)

            if available.isEmpty {
                unavailable.sort { $0.time < $1.time }
                time = unavailable[0].time
            }

            unavailable.sort { $0.time < $1.time }
            while !unavailable.isEmpty && unavailable[0].time <= time {
                let server = unavailable.removeFirst()
                available.append((server.weight, server.index))
                available.sort { $0.weight == $1.weight ? $0.index < $1.index : $0.weight < $1.weight }
            }

            let best = available.removeFirst()
            res[i] = best.index
            unavailable.append((time + tasks[i], best.weight, best.index))
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + m) \log n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output array.

> Where $m$ is the number of tasks and $n$ is the number of servers.

---

## 3. Two Min-Heaps - II

### Intuition

This is a variation of the two-heap approach with slightly different state tracking. Instead of storing finish `time` separately, we embed the last known free `time` within the available heap entries. When transferring servers between heaps, we update this `time` accordingly. The logic remains the same: efficiently pick the best available server using heaps.

### Algorithm

1. Create two heaps:
   - `available`: min-heap storing (`weight`, `index`, `timeFree`) for available servers.
   - `unavailable`: min-heap storing (`timeFree`, `weight`, `index`) for busy servers.
2. Add all servers to `available` with initial `timeFree` of `0`.
3. For each task at index `i`:
   - Move servers from `unavailable` to `available` while their finish `time` is at or before `i`, or while `available` is empty (must wait for a server).
   - Pop the best server from `available`.
   - Assign the task and push the server to `unavailable` with updated finish `time`: `max(timeFree, i) + task duration`.
4. Return the result array.

::tabs-start

```python
class Solution:
    def assignTasks(self, servers: List[int], tasks: List[int]) -> List[int]:
        res = []
        available = [[weight, i, 0] for i, weight in enumerate(servers)]
        unavailable = []
        heapq.heapify(available)

        for i, task in enumerate(tasks):
            while unavailable and unavailable[0][0] <= i or not available:
                timeFree, weight, index = heapq.heappop(unavailable)
                heapq.heappush(available, [weight, index, timeFree])

            weight, index, timeFree = heapq.heappop(available)
            res.append(index)
            heapq.heappush(unavailable, [max(timeFree, i) + task, weight, index])

        return res
```

```java
public class Solution {
    public int[] assignTasks(int[] servers, int[] tasks) {
        int m = tasks.length, n = servers.length;
        int[] res = new int[m];

        PriorityQueue<int[]> available = new PriorityQueue<>((a, b) -> {
            if(a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if(a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });

        PriorityQueue<int[]> unavailable = new PriorityQueue<>((a, b) -> {
            if(a[0] != b[0]) return Integer.compare(a[0], b[0]);
            if(a[1] != b[1]) return Integer.compare(a[1], b[1]);
            return Integer.compare(a[2], b[2]);
        });

        for (int i = 0; i < n; i++) {
            available.offer(new int[]{servers[i], i, 0});
        }

        for (int i = 0; i < m; i++) {
            while ((!unavailable.isEmpty() && unavailable.peek()[0] <= i) ||
                    available.isEmpty()) {
                int[] server = unavailable.poll();
                available.offer(new int[]{server[1], server[2], server[0]});
            }
            int[] server = available.poll();
            res[i] = server[1];
            unavailable.offer(new int[]{
                Math.max(server[2], i) + tasks[i], server[0], server[1]}
            );
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> assignTasks(vector<int>& servers, vector<int>& tasks) {
        int n = servers.size(), m = tasks.size();
        vector<int> res(m);

        priority_queue<array<int, 3>, vector<array<int, 3>>, greater<>> available;
        priority_queue<array<int, 3>, vector<array<int, 3>>, greater<>> unavailable;

        for (int i = 0; i < n; ++i) {
            available.push({servers[i], i, 0});
        }

        for (int i = 0; i < m; ++i) {
            while (!unavailable.empty() && (unavailable.top()[0] <= i ||
                   available.empty())) {
                auto [timeFree, weight, index] = unavailable.top();
                unavailable.pop();
                available.push({weight, index, timeFree});
            }

            auto [weight, index, timeFree] = available.top();
            available.pop();
            res[i] = index;
            unavailable.push({max(timeFree, i) + tasks[i], weight, index});
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} servers
     * @param {number[]} tasks
     * @return {number[]}
     */
    assignTasks(servers, tasks) {
        const res = new Array(tasks.length);
        const available = new PriorityQueue((a, b) =>
            a[0] === b[0]
                ? a[1] === b[1]
                    ? a[2] - b[2]
                    : a[1] - b[1]
                : a[0] - b[0],
        );
        const unavailable = new PriorityQueue((a, b) =>
            a[0] === b[0]
                ? a[1] === b[1]
                    ? a[2] - b[2]
                    : a[1] - b[1]
                : a[0] - b[0],
        );

        for (let i = 0; i < servers.length; i++) {
            available.enqueue([servers[i], i, 0]);
        }

        for (let i = 0; i < tasks.length; i++) {
            while (
                (!unavailable.isEmpty() && unavailable.front()[0] <= i) ||
                available.isEmpty()
            ) {
                const [timeFree, weight, index] = unavailable.dequeue();
                available.enqueue([weight, index, timeFree]);
            }

            const [weight, index, timeFree] = available.dequeue();
            res[i] = index;
            unavailable.enqueue([
                Math.max(timeFree, i) + tasks[i],
                weight,
                index,
            ]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] AssignTasks(int[] servers, int[] tasks) {
        int m = tasks.Length, n = servers.Length;
        int[] res = new int[m];

        var available = new PriorityQueue<int[], int[]>(
            Comparer<int[]>.Create((a, b) => {
                if (a[0] != b[0]) return a[0].CompareTo(b[0]);
                if (a[1] != b[1]) return a[1].CompareTo(b[1]);
                return a[2].CompareTo(b[2]);
            })
        );

        var unavailable = new PriorityQueue<int[], int[]>(
            Comparer<int[]>.Create((a, b) => {
                if (a[0] != b[0]) return a[0].CompareTo(b[0]);
                if (a[1] != b[1]) return a[1].CompareTo(b[1]);
                return a[2].CompareTo(b[2]);
            })
        );

        for (int i = 0; i < n; i++) {
            var arr = new int[] { servers[i], i, 0 };
            available.Enqueue(arr, arr);
        }

        for (int i = 0; i < m; i++) {
            while ((unavailable.Count > 0 && unavailable.Peek()[0] <= i) || available.Count == 0) {
                var server = unavailable.Dequeue();
                var arr = new int[] { server[1], server[2], server[0] };
                available.Enqueue(arr, arr);
            }
            var best = available.Dequeue();
            res[i] = best[1];
            var newArr = new int[] { Math.Max(best[2], i) + tasks[i], best[0], best[1] };
            unavailable.Enqueue(newArr, newArr);
        }

        return res;
    }
}
```

```go
import "container/heap"

type ServerHeap [][]int
func (h ServerHeap) Len() int { return len(h) }
func (h ServerHeap) Less(i, j int) bool {
    if h[i][0] != h[j][0] { return h[i][0] < h[j][0] }
    if h[i][1] != h[j][1] { return h[i][1] < h[j][1] }
    return h[i][2] < h[j][2]
}
func (h ServerHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *ServerHeap) Push(x interface{}) { *h = append(*h, x.([]int)) }
func (h *ServerHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0:n-1]
    return x
}

func assignTasks(servers []int, tasks []int) []int {
    n, m := len(servers), len(tasks)
    res := make([]int, m)

    available := &ServerHeap{}
    unavailable := &ServerHeap{}
    heap.Init(available)
    heap.Init(unavailable)

    for i := 0; i < n; i++ {
        heap.Push(available, []int{servers[i], i, 0})
    }

    for i := 0; i < m; i++ {
        for (unavailable.Len() > 0 && (*unavailable)[0][0] <= i) || available.Len() == 0 {
            server := heap.Pop(unavailable).([]int)
            heap.Push(available, []int{server[1], server[2], server[0]})
        }

        best := heap.Pop(available).([]int)
        res[i] = best[1]
        timeFree := best[2]
        if i > timeFree {
            timeFree = i
        }
        heap.Push(unavailable, []int{timeFree + tasks[i], best[0], best[1]})
    }

    return res
}
```

```kotlin
import java.util.PriorityQueue

class Solution {
    fun assignTasks(servers: IntArray, tasks: IntArray): IntArray {
        val m = tasks.size
        val n = servers.size
        val res = IntArray(m)

        val available = PriorityQueue<IntArray>(compareBy({ it[0] }, { it[1] }, { it[2] }))
        val unavailable = PriorityQueue<IntArray>(compareBy({ it[0] }, { it[1] }, { it[2] }))

        for (i in 0 until n) {
            available.offer(intArrayOf(servers[i], i, 0))
        }

        for (i in 0 until m) {
            while ((unavailable.isNotEmpty() && unavailable.peek()[0] <= i) || available.isEmpty()) {
                val server = unavailable.poll()
                available.offer(intArrayOf(server[1], server[2], server[0]))
            }

            val best = available.poll()
            res[i] = best[1]
            unavailable.offer(intArrayOf(maxOf(best[2], i) + tasks[i], best[0], best[1]))
        }

        return res
    }
}
```

```swift
class Solution {
    func assignTasks(_ servers: [Int], _ tasks: [Int]) -> [Int] {
        let n = servers.count, m = tasks.count
        var res = [Int](repeating: 0, count: m)

        var available: [(weight: Int, index: Int, timeFree: Int)] = []
        var unavailable: [(timeFree: Int, weight: Int, index: Int)] = []

        for i in 0..<n {
            available.append((servers[i], i, 0))
        }
        available.sort {
            if $0.weight != $1.weight { return $0.weight < $1.weight }
            return $0.index < $1.index
        }

        for i in 0..<m {
            while (!unavailable.isEmpty && unavailable[0].timeFree <= i) || available.isEmpty {
                unavailable.sort { $0.timeFree < $1.timeFree }
                let server = unavailable.removeFirst()
                available.append((server.weight, server.index, server.timeFree))
                available.sort {
                    if $0.weight != $1.weight { return $0.weight < $1.weight }
                    return $0.index < $1.index
                }
            }

            let best = available.removeFirst()
            res[i] = best.index
            unavailable.append((max(best.timeFree, i) + tasks[i], best.weight, best.index))
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + m) \log n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output array.

> Where $m$ is the number of tasks and $n$ is the number of servers.

---

## Common Pitfalls

### Incorrect Heap Ordering for Server Selection

When no servers are available at time `t`, you must wait until the earliest server becomes free. A common mistake is not correctly ordering the unavailable heap by finish time, or forgetting to move **all** servers that become free at that time back to the available heap. Multiple servers might become available simultaneously.

### Not Advancing Time When All Servers Are Busy

If all servers are busy when a task arrives, you must jump time forward to when the next server becomes free. Forgetting this causes an infinite loop or incorrect assignments. The time should be set to `unavailable.peek().finishTime`, not incremented by 1.

### Wrong Tie-Breaking Logic in Priority Queue

The problem requires selecting the server with the smallest weight, and among ties, the smallest index. Implementing the comparator incorrectly (e.g., comparing indices before weights) leads to wrong server assignments. Ensure the primary comparison is on weight and secondary on index.
