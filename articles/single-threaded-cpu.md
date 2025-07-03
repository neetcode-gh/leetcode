## 1. Two Min-Heaps

::tabs-start

```python
class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        available = []
        pending = []
        for i, (enqueueTime, processTime) in enumerate(tasks):
            heapq.heappush(pending, (enqueueTime, processTime, i))

        time = 0
        res = []
        while pending or available:
            while pending and pending[0][0] <= time:
                enqueueTime, processTime, i = heapq.heappop(pending)
                heapq.heappush(available, (processTime, i))

            if not available:
                time = pending[0][0]
                continue

            processTime, i = heapq.heappop(available)
            time += processTime
            res.append(i)

        return res
```

```java
public class Solution {
    public int[] getOrder(int[][] tasks) {
        PriorityQueue<int[]> available = new PriorityQueue<>((a, b) ->
            a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0])
        );
        PriorityQueue<int[]> pending = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));

        int n = tasks.length;
        for (int i = 0; i < n; i++) {
            pending.offer(new int[]{tasks[i][0], tasks[i][1], i});
        }

        long time = 0;
        int idx = 0;
        int[] res = new int[n];
        while (!pending.isEmpty() || !available.isEmpty()) {
            while (!pending.isEmpty() && pending.peek()[0] <= time) {
                int[] task = pending.poll();
                available.offer(new int[]{task[1], task[2]});
            }

            if (available.isEmpty()) {
                time = pending.peek()[0];
                continue;
            }

            int[] task = available.poll();
            time += task[0];
            res[idx++] = task[1];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> available;
        priority_queue<array<int, 3>, vector<array<int, 3>>, greater<>> pending;

        int n = tasks.size();
        for (int i = 0; i < n; ++i) {
            pending.push({tasks[i][0], tasks[i][1], i});
        }

        vector<int> res;
        long long time = 0;
        while (!pending.empty() || !available.empty()) {
            while (!pending.empty() && pending.top()[0] <= time) {
                auto [enqueueTime, processTime, index] = pending.top();
                pending.pop();
                available.push({processTime, index});
            }

            if (available.empty()) {
                time = pending.top()[0];
                continue;
            }

            auto [processTime, index] = available.top();
            available.pop();
            time += processTime;
            res.push_back(index);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} tasks
     * @return {number[]}
     */
    getOrder(tasks) {
        const available = new PriorityQueue((a, b) =>
            a[0] === b[0] ? a[1] - b[1] : a[0] - b[0],
        );
        const pending = new PriorityQueue((a, b) => a[0] - b[0]);

        tasks.forEach(([enqueueTime, processTime], i) => {
            pending.enqueue([enqueueTime, processTime, i]);
        });

        let time = 0;
        const res = [];
        while (!pending.isEmpty() || !available.isEmpty()) {
            while (!pending.isEmpty() && pending.front()[0] <= time) {
                const [enqueueTime, processTime, i] = pending.dequeue();
                available.enqueue([processTime, i]);
            }

            if (available.isEmpty()) {
                time = pending.front()[0];
                continue;
            }

            const [processTime, i] = available.dequeue();
            time += processTime;
            res.push(i);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetOrder(int[][] tasks) {
        var available = new PriorityQueue<(int procTime, int index), (int procTime, int index)>();
        var pending = new PriorityQueue<(int startTime, int procTime, int index), int>();

        int n = tasks.Length;
        for (int i = 0; i < n; i++) {
            pending.Enqueue((tasks[i][0], tasks[i][1], i), tasks[i][0]);
        }

        long time = 0;
        int[] res = new int[n];
        int idx = 0;

        while (pending.Count > 0 || available.Count > 0) {
            while (pending.Count > 0 && pending.Peek().startTime <= time) {
                var task = pending.Dequeue();
                available.Enqueue((task.procTime, task.index), (task.procTime, task.index));
            }

            if (available.Count == 0) {
                time = pending.Peek().startTime;
                continue;
            }

            var next = available.Dequeue();
            time += next.procTime;
            res[idx++] = next.index;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Sorting + Min-Heap

::tabs-start

```python
class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        for i, t in enumerate(tasks):
            t.append(i)
        tasks.sort(key=lambda t: t[0])

        res, minHeap = [], []
        i, time = 0, tasks[0][0]

        while minHeap or i < len(tasks):
            while i < len(tasks) and time >= tasks[i][0]:
                heapq.heappush(minHeap, [tasks[i][1], tasks[i][2]])
                i += 1
            if not minHeap:
                time = tasks[i][0]
            else:
                procTime, index = heapq.heappop(minHeap)
                time += procTime
                res.append(index)
        return res
```

```java
public class Solution {
    public int[] getOrder(int[][] tasks) {
        int n = tasks.length;
        for (int i = 0; i < n; i++) {
            tasks[i] = new int[] {tasks[i][0], tasks[i][1], i};
        }
        Arrays.sort(tasks, Comparator.comparingInt(t -> t[0]));

        int[] res = new int[n];
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) ->
            a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0])
        );

        int i = 0, idx = 0;
        long time = tasks[0][0];
        while (!minHeap.isEmpty() || i < n) {
            while (i < n && time >= tasks[i][0]) {
                minHeap.offer(new int[]{tasks[i][1], tasks[i][2]});
                i++;
            }
            if (minHeap.isEmpty()) {
                time = tasks[i][0];
            } else {
                int[] task = minHeap.poll();
                time += task[0];
                res[idx++] = task[1];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        int n = tasks.size();
        for (int i = 0; i < n; ++i) {
            tasks[i].push_back(i);
        }
        sort(tasks.begin(), tasks.end());

        vector<int> res;
        priority_queue<array<int, 2>, vector<array<int, 2>>, greater<>> minHeap;

        int i = 0;
        long long time = tasks[0][0];
        while (!minHeap.empty() || i < n) {
            while (i < n && time >= tasks[i][0]) {
                minHeap.push({tasks[i][1], tasks[i][2]});
                i++;
            }
            if (minHeap.empty()) {
                time = tasks[i][0];
            } else {
                auto [procTime, index] = minHeap.top();
                minHeap.pop();
                time += procTime;
                res.push_back(index);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} tasks
     * @return {number[]}
     */
    getOrder(tasks) {
        const n = tasks.length;
        tasks = tasks.map((t, i) => [...t, i]);
        tasks.sort((a, b) => a[0] - b[0]);

        const res = [];
        const minHeap = new PriorityQueue((a, b) =>
            a[0] === b[0] ? a[1] - b[1] : a[0] - b[0],
        );

        let i = 0,
            time = tasks[0][0];
        while (minHeap.size() || i < n) {
            while (i < n && time >= tasks[i][0]) {
                minHeap.enqueue([tasks[i][1], tasks[i][2]]);
                i++;
            }
            if (minHeap.isEmpty()) {
                time = tasks[i][0];
            } else {
                const [procTime, index] = minHeap.dequeue();
                time += procTime;
                res.push(index);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetOrder(int[][] tasks) {
        int n = tasks.Length;
        int i = 0;
        for (; i < n; i++) {
            tasks[i] = new int[] { tasks[i][0], tasks[i][1], i }; // {enqueueTime, processingTime, index}
        }

        Array.Sort(tasks, (a, b) => a[0].CompareTo(b[0])); // sort by enqueueTime

        int[] res = new int[n];
        var minHeap = new PriorityQueue<(int procTime, int index), (int procTime, int index)>();

        int idx = 0;
        i = 0;
        long time = tasks[0][0];

        while (minHeap.Count > 0 || i < n) {
            while (i < n && tasks[i][0] <= time) {
                minHeap.Enqueue((tasks[i][1], tasks[i][2]), (tasks[i][1], tasks[i][2]));
                i++;
            }

            if (minHeap.Count == 0) {
                time = tasks[i][0];
            } else {
                var task = minHeap.Dequeue();
                time += task.procTime;
                res[idx++] = task.index;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Sorting + Min-Heap (Optimal)

::tabs-start

```python
class Solution:
    def getOrder(self, tasks: List[List[int]]) -> List[int]:
        n = len(tasks)
        indices = list(range(n))
        indices.sort(key=lambda i: (tasks[i][0], i))

        class Task:
            def __init__(self, idx):
                self.idx = idx

            def __lt__(self, other):
                if tasks[self.idx][1] != tasks[other.idx][1]:
                    return tasks[self.idx][1] < tasks[other.idx][1]
                return self.idx < other.idx

        minHeap = []
        res = []
        time = i = 0
        while minHeap or i < n:
            while i < n and tasks[indices[i]][0] <= time:
                heapq.heappush(minHeap, Task(indices[i]))
                i += 1

            if not minHeap:
                time = tasks[indices[i]][0]
            else:
                next_task = heapq.heappop(minHeap)
                time += tasks[next_task.idx][1]
                res.append(next_task.idx)

        return res
```

```java
public class Solution {
    public int[] getOrder(int[][] tasks) {
        int n = tasks.length;
        Integer[] indices = new Integer[n];
        for (int i = 0; i < n; i++) {
            indices[i] = i;
        }

        Arrays.sort(indices, (a, b) ->
            tasks[a][0] != tasks[b][0] ? tasks[a][0] - tasks[b][0] : a - b
        );

        PriorityQueue<Integer> minHeap = new PriorityQueue<>((a, b) ->
            tasks[a][1] != tasks[b][1] ? tasks[a][1] - tasks[b][1] : a - b
        );

        int[] result = new int[n];
        long time = 0;
        int i = 0, resIndex = 0;
        while (!minHeap.isEmpty() || i < n) {
            while (i < n && tasks[indices[i]][0] <= time) {
                minHeap.offer(indices[i]);
                i++;
            }

            if (minHeap.isEmpty()) {
                time = tasks[indices[i]][0];
            } else {
                int nextIndex = minHeap.poll();
                time += tasks[nextIndex][1];
                result[resIndex++] = nextIndex;
            }
        }

        return result;
    }
}
```

```cpp
// C++ Solution
class Solution {
public:
    vector<int> getOrder(vector<vector<int>>& tasks) {
        int n = tasks.size();
        vector<int> indices(n);
        iota(indices.begin(), indices.end(), 0);

        sort(indices.begin(), indices.end(), [&](int a, int b) {
            return tasks[a][0] < tasks[b][0] ||
                   (tasks[a][0] == tasks[b][0] && a < b);
        });

        auto comp = [&](int a, int b) {
            return tasks[a][1] > tasks[b][1] ||
                   (tasks[a][1] == tasks[b][1] && a > b);
        };
        priority_queue<int, vector<int>, decltype(comp)> minHeap(comp);

        vector<int> result;
        long long time = 0;
        int i = 0;

        while (!minHeap.empty() || i < n) {
            while (i < n && tasks[indices[i]][0] <= time) {
                minHeap.push(indices[i]);
                i++;
            }

            if (minHeap.empty()) {
                time = tasks[indices[i]][0];
            } else {
                int nextIndex = minHeap.top();
                minHeap.pop();
                time += tasks[nextIndex][1];
                result.push_back(nextIndex);
            }
        }

        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} tasks
     * @return {number[]}
     */
    getOrder(tasks) {
        const n = tasks.length;
        const indices = Array.from({ length: n }, (_, i) => i);
        indices.sort((a, b) => {
            if (tasks[a][0] !== tasks[b][0]) {
                return tasks[a][0] - tasks[b][0];
            }
            return a - b;
        });

        const minHeap = new PriorityQueue((a, b) => {
            if (tasks[a][1] !== tasks[b][1]) {
                return tasks[a][1] - tasks[b][1];
            }
            return a - b;
        });

        const res = [];
        let time = 0;
        let i = 0;

        while (!minHeap.isEmpty() || i < n) {
            while (i < n && tasks[indices[i]][0] <= time) {
                minHeap.enqueue(indices[i]);
                i++;
            }

            if (minHeap.size() === 0) {
                time = tasks[indices[i]][0];
            } else {
                const nextIndex = minHeap.dequeue();
                time += tasks[nextIndex][1];
                res.push(nextIndex);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetOrder(int[][] tasks) {
        int n = tasks.Length;
        int[] indices = new int[n];
        int i = 0;
        for (; i < n; i++) {
            indices[i] = i;
        }

        Array.Sort(indices, (a, b) =>
            tasks[a][0] != tasks[b][0] ? tasks[a][0].CompareTo(tasks[b][0]) : a.CompareTo(b)
        );

        var minHeap = new PriorityQueue<int, (int procTime, int index)>();

        int[] result = new int[n];
        long time = 0;
        int resIndex = 0;
        i = 0;

        while (minHeap.Count > 0 || i < n) {
            while (i < n && tasks[indices[i]][0] <= time) {
                int idx = indices[i];
                minHeap.Enqueue(idx, (tasks[idx][1], idx));
                i++;
            }

            if (minHeap.Count == 0) {
                time = tasks[indices[i]][0];
            } else {
                int nextIndex = minHeap.Dequeue();
                time += tasks[nextIndex][1];
                result[resIndex++] = nextIndex;
            }
        }

        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
