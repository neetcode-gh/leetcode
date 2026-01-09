## 1. Two Min-Heaps

### Intuition

A single-threaded CPU processes one task at a time. At any moment, we need to know which tasks are available (enqueue time has passed) and pick the one with the shortest processing time. A min-heap efficiently gives us the task with minimum processing time among available tasks. We use two heaps: one for pending tasks (sorted by enqueue time) and one for available tasks (sorted by processing time, then by index).

### Algorithm

1. Store all tasks with their original indices in a min-heap ordered by enqueue time.
2. Initialize the current time and an empty result list.
3. While there are pending or available tasks:
   - Move all tasks from the pending heap to the available heap if their enqueue time has been reached.
   - If no tasks are available, jump the current time to the next pending task's enqueue time.
   - Otherwise, pop the task with the shortest processing time from the available heap, add its index to the result, and advance time by its processing duration.
4. Return the result list.

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

```go
func getOrder(tasks [][]int) []int {
    n := len(tasks)
    type task struct {
        enqueueTime, processTime, index int
    }

    pending := make([]task, n)
    for i := 0; i < n; i++ {
        pending[i] = task{tasks[i][0], tasks[i][1], i}
    }
    sort.Slice(pending, func(i, j int) bool {
        return pending[i].enqueueTime < pending[j].enqueueTime
    })

    available := &minHeap{}
    heap.Init(available)

    res := make([]int, 0, n)
    time := 0
    i := 0

    for available.Len() > 0 || i < n {
        for i < n && pending[i].enqueueTime <= time {
            heap.Push(available, [2]int{pending[i].processTime, pending[i].index})
            i++
        }

        if available.Len() == 0 {
            time = pending[i].enqueueTime
            continue
        }

        next := heap.Pop(available).([2]int)
        time += next[0]
        res = append(res, next[1])
    }

    return res
}

type minHeap [][2]int

func (h minHeap) Len() int { return len(h) }
func (h minHeap) Less(i, j int) bool {
    if h[i][0] != h[j][0] {
        return h[i][0] < h[j][0]
    }
    return h[i][1] < h[j][1]
}
func (h minHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *minHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun getOrder(tasks: Array<IntArray>): IntArray {
        val n = tasks.size
        data class Task(val enqueueTime: Int, val processTime: Int, val index: Int)

        val pending = PriorityQueue<Task>(compareBy { it.enqueueTime })
        for (i in 0 until n) {
            pending.add(Task(tasks[i][0], tasks[i][1], i))
        }

        val available = PriorityQueue<IntArray>(compareBy({ it[0] }, { it[1] }))

        val res = IntArray(n)
        var time = 0L
        var idx = 0

        while (pending.isNotEmpty() || available.isNotEmpty()) {
            while (pending.isNotEmpty() && pending.peek().enqueueTime <= time) {
                val task = pending.poll()
                available.add(intArrayOf(task.processTime, task.index))
            }

            if (available.isEmpty()) {
                time = pending.peek().enqueueTime.toLong()
                continue
            }

            val next = available.poll()
            time += next[0]
            res[idx++] = next[1]
        }

        return res
    }
}
```

```swift
class Solution {
    func getOrder(_ tasks: [[Int]]) -> [Int] {
        let n = tasks.count
        var taskList = [(enqueueTime: Int, processTime: Int, index: Int)]()
        for i in 0..<n {
            taskList.append((tasks[i][0], tasks[i][1], i))
        }
        taskList.sort { $0.enqueueTime < $1.enqueueTime }

        var available = [(processTime: Int, index: Int)]()
        var res = [Int]()
        var time = 0
        var i = 0

        while !available.isEmpty || i < n {
            while i < n && taskList[i].enqueueTime <= time {
                available.append((taskList[i].processTime, taskList[i].index))
                i += 1
            }
            available.sort { $0.processTime == $1.processTime ? $0.index < $1.index : $0.processTime < $1.processTime }

            if available.isEmpty {
                time = taskList[i].enqueueTime
                continue
            }

            let next = available.removeFirst()
            time += next.processTime
            res.append(next.index)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Sorting + Min-Heap

### Intuition

Instead of using two heaps, we can sort the tasks by enqueue time first. This allows us to iterate through tasks in order and add them to the available heap as they become ready. We only need one heap for available tasks, simplifying the implementation while maintaining the same logic.

### Algorithm

1. Attach the original index to each task and sort all tasks by enqueue time.
2. Initialize the current time to the first task's enqueue time and an empty min-heap for available tasks.
3. Use an index `i` to track which tasks have been considered.
4. While tasks remain or the heap is not empty:
   - Add all tasks with enqueue time at or before the current time to the heap.
   - If the heap is empty, jump time to the next task's enqueue time.
   - Otherwise, pop the task with the shortest processing time, update time, and record the index.
5. Return the result.

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

```go
func getOrder(tasks [][]int) []int {
    n := len(tasks)
    for i := 0; i < n; i++ {
        tasks[i] = append(tasks[i], i)
    }
    sort.Slice(tasks, func(i, j int) bool {
        return tasks[i][0] < tasks[j][0]
    })

    minHeap := &minHeap2{}
    heap.Init(minHeap)

    res := make([]int, 0, n)
    i := 0
    time := tasks[0][0]

    for minHeap.Len() > 0 || i < n {
        for i < n && time >= tasks[i][0] {
            heap.Push(minHeap, [2]int{tasks[i][1], tasks[i][2]})
            i++
        }
        if minHeap.Len() == 0 {
            time = tasks[i][0]
        } else {
            task := heap.Pop(minHeap).([2]int)
            time += task[0]
            res = append(res, task[1])
        }
    }
    return res
}

type minHeap2 [][2]int

func (h minHeap2) Len() int { return len(h) }
func (h minHeap2) Less(i, j int) bool {
    if h[i][0] != h[j][0] {
        return h[i][0] < h[j][0]
    }
    return h[i][1] < h[j][1]
}
func (h minHeap2) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *minHeap2) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *minHeap2) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun getOrder(tasks: Array<IntArray>): IntArray {
        val n = tasks.size
        val tasksWithIndex = tasks.mapIndexed { i, t -> intArrayOf(t[0], t[1], i) }
            .sortedBy { it[0] }

        val minHeap = PriorityQueue<IntArray>(compareBy({ it[0] }, { it[1] }))

        val res = IntArray(n)
        var i = 0
        var idx = 0
        var time = tasksWithIndex[0][0].toLong()

        while (minHeap.isNotEmpty() || i < n) {
            while (i < n && time >= tasksWithIndex[i][0]) {
                minHeap.add(intArrayOf(tasksWithIndex[i][1], tasksWithIndex[i][2]))
                i++
            }
            if (minHeap.isEmpty()) {
                time = tasksWithIndex[i][0].toLong()
            } else {
                val task = minHeap.poll()
                time += task[0]
                res[idx++] = task[1]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func getOrder(_ tasks: [[Int]]) -> [Int] {
        let n = tasks.count
        var tasksWithIndex = tasks.enumerated().map { (idx, t) in [t[0], t[1], idx] }
        tasksWithIndex.sort { $0[0] < $1[0] }

        var minHeap = [(Int, Int)]()
        var res = [Int]()
        var i = 0
        var time = tasksWithIndex[0][0]

        while !minHeap.isEmpty || i < n {
            while i < n && time >= tasksWithIndex[i][0] {
                minHeap.append((tasksWithIndex[i][1], tasksWithIndex[i][2]))
                i += 1
            }
            minHeap.sort { $0.0 == $1.0 ? $0.1 < $1.1 : $0.0 < $1.0 }

            if minHeap.isEmpty {
                time = tasksWithIndex[i][0]
            } else {
                let task = minHeap.removeFirst()
                time += task.0
                res.append(task.1)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Sorting + Min-Heap (Optimal)

### Intuition

This solution optimizes memory by not modifying the original tasks array. Instead of copying task data, we sort an array of indices by enqueue time. The heap stores only indices and uses the original tasks array for comparisons. This approach is more memory efficient while maintaining the same time complexity.

### Algorithm

1. Create an array of indices `[0, 1, 2, ..., n-1]` and sort it based on the tasks' enqueue times.
2. Initialize time to 0, and create a min-heap that compares indices by their task's processing time (then by index for ties).
3. Iterate through sorted indices:
   - Push indices of tasks that have become available onto the heap.
   - If the heap is empty and tasks remain, jump time forward.
   - Otherwise, pop the best task, update time, and record the result.
4. Return the execution order.

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

```go
func getOrder(tasks [][]int) []int {
    n := len(tasks)
    indices := make([]int, n)
    for i := 0; i < n; i++ {
        indices[i] = i
    }

    sort.Slice(indices, func(i, j int) bool {
        if tasks[indices[i]][0] != tasks[indices[j]][0] {
            return tasks[indices[i]][0] < tasks[indices[j]][0]
        }
        return indices[i] < indices[j]
    })

    minHeap := &minHeap3{tasks: tasks}
    heap.Init(minHeap)

    result := make([]int, 0, n)
    time := 0
    i := 0

    for minHeap.Len() > 0 || i < n {
        for i < n && tasks[indices[i]][0] <= time {
            heap.Push(minHeap, indices[i])
            i++
        }

        if minHeap.Len() == 0 {
            time = tasks[indices[i]][0]
        } else {
            nextIndex := heap.Pop(minHeap).(int)
            time += tasks[nextIndex][1]
            result = append(result, nextIndex)
        }
    }

    return result
}

type minHeap3 struct {
    tasks [][]int
    data  []int
}

func (h minHeap3) Len() int { return len(h.data) }
func (h minHeap3) Less(i, j int) bool {
    a, b := h.data[i], h.data[j]
    if h.tasks[a][1] != h.tasks[b][1] {
        return h.tasks[a][1] < h.tasks[b][1]
    }
    return a < b
}
func (h minHeap3) Swap(i, j int)       { h.data[i], h.data[j] = h.data[j], h.data[i] }
func (h *minHeap3) Push(x interface{}) { h.data = append(h.data, x.(int)) }
func (h *minHeap3) Pop() interface{} {
    old := h.data
    n := len(old)
    x := old[n-1]
    h.data = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun getOrder(tasks: Array<IntArray>): IntArray {
        val n = tasks.size
        val indices = IntArray(n) { it }
        indices.sortWith(compareBy({ tasks[it][0] }, { it }))

        val minHeap = PriorityQueue<Int>(compareBy({ tasks[it][1] }, { it }))

        val result = IntArray(n)
        var time = 0L
        var i = 0
        var resIndex = 0

        while (minHeap.isNotEmpty() || i < n) {
            while (i < n && tasks[indices[i]][0] <= time) {
                minHeap.add(indices[i])
                i++
            }

            if (minHeap.isEmpty()) {
                time = tasks[indices[i]][0].toLong()
            } else {
                val nextIndex = minHeap.poll()
                time += tasks[nextIndex][1]
                result[resIndex++] = nextIndex
            }
        }

        return result
    }
}
```

```swift
class Solution {
    func getOrder(_ tasks: [[Int]]) -> [Int] {
        let n = tasks.count
        var indices = Array(0..<n)
        indices.sort { tasks[$0][0] < tasks[$1][0] || (tasks[$0][0] == tasks[$1][0] && $0 < $1) }

        var minHeap = [Int]()
        var result = [Int]()
        var time = 0
        var i = 0

        while !minHeap.isEmpty || i < n {
            while i < n && tasks[indices[i]][0] <= time {
                minHeap.append(indices[i])
                i += 1
            }
            minHeap.sort { tasks[$0][1] < tasks[$1][1] || (tasks[$0][1] == tasks[$1][1] && $0 < $1) }

            if minHeap.isEmpty {
                time = tasks[indices[i]][0]
            } else {
                let nextIndex = minHeap.removeFirst()
                time += tasks[nextIndex][1]
                result.append(nextIndex)
            }
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
