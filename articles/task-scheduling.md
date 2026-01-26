## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps / Frequency Counting** - Used to count occurrences of each task type
- **Greedy Algorithms** - The optimal solution prioritizes the most frequent tasks first
- **Heap / Priority Queue** - The efficient solution uses a max-heap to always select the highest-frequency task
- **Queue Data Structure** - Used to track tasks in cooldown before they can be re-executed

---

## 1. Brute Force

### Intuition

We simulate the CPU one time unit at a time.
At every step, we look at all remaining tasks and pick:

- A task that **is not in the cooldown** (not executed in the last `n` time units),
- Among those, the one with the **highest remaining count**.

If no such task is available, the CPU **idles** for that time unit.
We repeat this until all tasks are finished.
This is a direct, brute-force simulation: very easy to understand, but not efficient.

### Algorithm

1. Count how many times each task appears (e.g., using an array of size 26 or a map).
2. Build a list/array of pairs: `(remaining_count, task_id)` for all tasks with count > 0.
3. Maintain:
   - `time` = 0 (total time elapsed),
   - A list/array `processed` storing, for each time unit, **which task** was executed (or an indicator like `-1` for idle).
4. While there are still tasks left in the list:
   1. Set `best_task_index = -1`.
   2. For each task in the list:
      - Check if this task was **not executed in any of the last `n` time units**
        (i.e., its `task_id` does not appear in `processed[max(0, time − n) .. time − 1]`).
      - If it is allowed and either:
        - `best_task_index == -1`, or
        - its `remaining_count` is **greater** than the current best's `remaining_count`,
        then update `best_task_index` to this task.
   3. Increase `time` by 1 (we are filling one time unit).
   4. If `best_task_index != -1`:
      - Execute that task in this time unit:
        - Decrease its `remaining_count` by 1.
        - If its `remaining_count` becomes 0, remove it from the list.
        - Append its `task_id` to `processed`.
     Otherwise:
      - No valid task can be executed (all are in cooldown), so:
        - Append an idle marker (e.g., `-1`) to `processed`.
5. When the list of tasks becomes empty, return `time` as the total minimum time required.

::tabs-start

```python
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        count = [0] * 26
        for task in tasks:
            count[ord(task) - ord('A')] += 1

        arr = []
        for i in range(26):
            if count[i] > 0:
                arr.append([count[i], i])

        time = 0
        processed = []
        while arr:
            maxi = -1
            for i in range(len(arr)):
                if all(processed[j] != arr[i][1] for j in range(max(0, time - n), time)):
                    if maxi == -1 or arr[maxi][0] < arr[i][0]:
                        maxi = i

            time += 1
            cur = -1
            if maxi != -1:
                cur = arr[maxi][1]
                arr[maxi][0] -= 1
                if arr[maxi][0] == 0:
                    arr.pop(maxi)
            processed.append(cur)
        return time
```

```java
public class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        for (char task : tasks) {
            count[task - 'A']++;
        }

        List<int[]> arr = new ArrayList<>();
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                arr.add(new int[]{count[i], i});
            }
        }

        int time = 0;
        List<Integer> processed = new ArrayList<>();
        while (!arr.isEmpty()) {
            int maxi = -1;
            for (int i = 0; i < arr.size(); i++) {
                boolean ok = true;
                for (int j = Math.max(0, time - n); j < time; j++) {
                    if (j < processed.size() && processed.get(j) == arr.get(i)[1]) {
                        ok = false;
                        break;
                    }
                }
                if (!ok) continue;
                if (maxi == -1 || arr.get(maxi)[0] < arr.get(i)[0]) {
                    maxi = i;
                }
            }

            time++;
            int cur = -1;
            if (maxi != -1) {
                cur = arr.get(maxi)[1];
                arr.get(maxi)[0]--;
                if (arr.get(maxi)[0] == 0) {
                    arr.remove(maxi);
                }
            }
            processed.add(cur);
        }
        return time;
    }
}
```

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> count(26, 0);
        for (char task : tasks) {
            count[task - 'A']++;
        }

        vector<pair<int, int>> arr;
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                arr.emplace_back(count[i], i);
            }
        }

        int time = 0;
        vector<int> processed;
        while (!arr.empty()) {
            int maxi = -1;
            for (int i = 0; i < arr.size(); i++) {
                bool ok = true;
                for (int j = max(0, time - n); j < time; j++) {
                    if (j < processed.size() && processed[j] == arr[i].second) {
                        ok = false;
                        break;
                    }
                }
                if (!ok) continue;
                if (maxi == -1 || arr[maxi].first < arr[i].first) {
                    maxi = i;
                }
            }

            time++;
            int cur = -1;
            if (maxi != -1) {
                cur = arr[maxi].second;
                arr[maxi].first--;
                if (arr[maxi].first == 0) {
                    arr.erase(arr.begin() + maxi);
                }
            }
            processed.push_back(cur);
        }
        return time;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        const count = new Array(26).fill(0);
        for (const task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        const arr = [];
        for (let i = 0; i < 26; i++) {
            if (count[i] > 0) {
                arr.push([count[i], i]);
            }
        }

        let time = 0;
        const processed = [];
        while (arr.length > 0) {
            let maxi = -1;
            for (let i = 0; i < arr.length; i++) {
                let ok = true;
                for (let j = Math.max(0, time - n); j < time; j++) {
                    if (j < processed.length && processed[j] === arr[i][1]) {
                        ok = false;
                        break;
                    }
                }
                if (!ok) continue;
                if (maxi === -1 || arr[maxi][0] < arr[i][0]) {
                    maxi = i;
                }
            }

            time++;
            let cur = -1;
            if (maxi !== -1) {
                cur = arr[maxi][1];
                arr[maxi][0]--;
                if (arr[maxi][0] === 0) {
                    arr.splice(maxi, 1);
                }
            }
            processed.push(cur);
        }
        return time;
    }
}
```

```csharp
public class Solution {
    public int LeastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        foreach (char task in tasks) {
            count[task - 'A']++;
        }

        List<int[]> arr = new List<int[]>();
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                arr.Add(new int[] { count[i], i });
            }
        }

        int time = 0;
        List<int> processed = new List<int>();
        while (arr.Count > 0) {
            int maxi = -1;
            for (int i = 0; i < arr.Count; i++) {
                bool ok = true;
                for (int j = Math.Max(0, time - n); j < time; j++) {
                    if (j < processed.Count && processed[j] == arr[i][1]) {
                        ok = false;
                        break;
                    }
                }
                if (!ok) continue;
                if (maxi == -1 || arr[maxi][0] < arr[i][0]) {
                    maxi = i;
                }
            }

            time++;
            int cur = -1;
            if (maxi != -1) {
                cur = arr[maxi][1];
                arr[maxi][0]--;
                if (arr[maxi][0] == 0) {
                    arr.RemoveAt(maxi);
                }
            }
            processed.Add(cur);
        }
        return time;
    }
}
```

```go
func leastInterval(tasks []byte, n int) int {
	count := make([]int, 26)
	for _, task := range tasks {
		count[task-'A']++
	}

	arr := [][]int{}
	for i := 0; i < 26; i++ {
		if count[i] > 0 {
			arr = append(arr, []int{count[i], i})
		}
	}

	time := 0
	processed := []int{}
	for len(arr) > 0 {
		maxi := -1
		for i := 0; i < len(arr); i++ {
			canProcess := true
			for j := max(0, time-n); j < time && canProcess; j++ {
				if processed[j] == arr[i][1] {
					canProcess = false
				}
			}
			if canProcess && (maxi == -1 || arr[maxi][0] < arr[i][0]) {
				maxi = i
			}
		}

		time++
		cur := -1
		if maxi != -1 {
			cur = arr[maxi][1]
			arr[maxi][0]--
			if arr[maxi][0] == 0 {
				arr = append(arr[:maxi], arr[maxi+1:]...)
			}
		}
		processed = append(processed, cur)
	}
	return time
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```

```kotlin
class Solution {
    fun leastInterval(tasks: CharArray, n: Int): Int {
        val count = IntArray(26)
        for (task in tasks) {
            count[task - 'A']++
        }

        val arr = mutableListOf<Pair<Int, Int>>()
        for (i in 0..25) {
            if (count[i] > 0) {
                arr.add(Pair(count[i], i))
            }
        }

        var time = 0
        val processed = mutableListOf<Int>()
        while (arr.isNotEmpty()) {
            var maxi = -1
            for (i in arr.indices) {
                val canProcess = (maxOf(0, time - n) until time).all { processed[it] != arr[i].second }
                if (canProcess && (maxi == -1 || arr[maxi].first < arr[i].first)) {
                    maxi = i
                }
            }

            time++
            var cur = -1
            if (maxi != -1) {
                cur = arr[maxi].second
                arr[maxi] = Pair(arr[maxi].first - 1, arr[maxi].second)
                if (arr[maxi].first == 0) {
                    arr.removeAt(maxi)
                }
            }
            processed.add(cur)
        }
        return time
    }
}
```

```swift
class Solution {
    func leastInterval(_ tasks: [Character], _ n: Int) -> Int {
        var count = [Int](repeating: 0, count: 26)
        for task in tasks {
            count[Int(task.asciiValue! - Character("A").asciiValue!)] += 1
        }

        var arr = [(Int, Int)]()
        for i in 0..<26 {
            if count[i] > 0 {
                arr.append((count[i], i))
            }
        }

        var time = 0
        var processed = [Int]()

        while !arr.isEmpty {
            var maxi = -1
            for i in 0..<arr.count {
                if processed[max(0, time - n)..<time].allSatisfy({ $0 != arr[i].1 }) {
                    if maxi == -1 || arr[maxi].0 < arr[i].0 {
                        maxi = i
                    }
                }
            }

            time += 1
            var cur = -1
            if maxi != -1 {
                cur = arr[maxi].1
                arr[maxi].0 -= 1
                if arr[maxi].0 == 0 {
                    arr.remove(at: maxi)
                }
            }
            processed.append(cur)
        }
        return time
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(t * n)$
- Space complexity: $O(t)$

> Where $t$ is the time to process given tasks and $n$ is the cooldown time.

---

## 2. Max-Heap

### Intuition

We always want to run the task that still has the **most remaining occurrences**, because those are the hardest to fit into the schedule (they need more slots with cooldown gaps).  

So we:

- Keep a **max-heap** of tasks by their remaining count (most frequent on top).
- At each time unit, we take the **most frequent available task** and run it.
- After running a task, it goes into a **cooldown queue** with the time when it will be available again (current time + `n`).
- When a task’s cooldown finishes, we push it back into the heap so it can be scheduled again.
- If the heap is empty but some tasks are still in cooldown, we can **jump the current time forward** to the next time when a task becomes available.

This way we always use the CPU as efficiently as possible while respecting the cooldown.

### Algorithm

1. Count how many times each task appears.
2. Build a **max-heap** where each entry is "remaining count" of a task (the higher the count, the higher its priority).
3. Create an empty **queue** (FIFO) to store pairs: `(remaining_count_after_running, next_available_time)`.
4. Set `time = 0`.
5. While the heap is not empty **or** the cooldown queue is not empty:
   1. Increment `time` by 1.
   2. If the heap is **not** empty:
      - Pop the task with the largest remaining count.
      - "Run" it once: `remaining_count -= 1`.
      - If `remaining_count > 0`, push `(remaining_count, time + n)` into the cooldown queue (it can be used again after `n` units).
   3. Check the front of the cooldown queue:
      - While the task at the front has `next_available_time == time`,
        remove it from the queue and push its `remaining_count` back into the max-heap.
   4. (Optional optimization)
      - If the heap is empty **and** the cooldown queue is not empty:
        - Let `next_time` be the `next_available_time` of the front element in the cooldown queue.
        - Set `time = next_time` (fast-forward), then process step 3 again for that time.
6. When both the heap and cooldown queue are empty, return `time` as the minimum time required to finish all tasks.

::tabs-start

```python
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        count = Counter(tasks)
        maxHeap = [-cnt for cnt in count.values()]
        heapq.heapify(maxHeap)

        time = 0
        q = deque()  # pairs of [-cnt, idleTime]
        while maxHeap or q:
            time += 1

            if not maxHeap:
                time = q[0][1]
            else:
                cnt = 1 + heapq.heappop(maxHeap)
                if cnt:
                    q.append([cnt, time + n])
            if q and q[0][1] == time:
                heapq.heappush(maxHeap, q.popleft()[0])
        return time
```

```java
public class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        for (char task : tasks) {
            count[task - 'A']++;
        }

        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int cnt : count) {
            if (cnt > 0) {
                maxHeap.add(cnt);
            }
        }

        int time = 0;
        Queue<int[]> q = new LinkedList<>();
        while (!maxHeap.isEmpty() || !q.isEmpty()) {
            time++;

            if (maxHeap.isEmpty()) {
                time = q.peek()[1];
            } else {
                int cnt = maxHeap.poll() - 1;
                if (cnt > 0) {
                    q.add(new int[]{cnt, time + n});
                }
            }

            if (!q.isEmpty() && q.peek()[1] == time) {
                maxHeap.add(q.poll()[0]);
            }
        }

        return time;
    }
}
```

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> count(26, 0);
        for (char task : tasks) {
            count[task - 'A']++;
        }

        priority_queue<int> maxHeap;
        for (int cnt : count) {
            if (cnt > 0) {
                maxHeap.push(cnt);
            }
        }

        int time = 0;
        queue<pair<int, int>> q;
        while (!maxHeap.empty() || !q.empty()) {
            time++;

            if (maxHeap.empty()) {
                time = q.front().second;
            } else {
                int cnt = maxHeap.top() - 1;
                maxHeap.pop();
                if (cnt > 0) {
                    q.push({cnt, time + n});
                }
            }

            if (!q.empty() && q.front().second == time) {
                maxHeap.push(q.front().first);
                q.pop();
            }
        }

        return time;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        let count = new Array(26).fill(0);
        for (let task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        let maxHeap = new MaxPriorityQueue();
        for (let i = 0; i < 26; i++) {
            if (count[i] > 0) maxHeap.push(count[i]);
        }

        let time = 0;
        let q = new Queue();

        while (maxHeap.size() > 0 || q.size() > 0) {
            time++;

            if (maxHeap.size() > 0) {
                let cnt = maxHeap.pop() - 1;
                if (cnt !== 0) {
                    q.push([cnt, time + n]);
                }
            }

            if (q.size() > 0 && q.front()[1] === time) {
                maxHeap.push(q.pop()[0]);
            }
        }

        return time;
    }
}
```

```csharp
public class Solution {
    public int LeastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        foreach (var task in tasks) {
            count[task - 'A']++;
        }

        var maxHeap = new PriorityQueue<int, int>();
        for (int i = 0; i < 26; i++) {
            if (count[i] > 0) {
                maxHeap.Enqueue(count[i], -count[i]);
            }
        }

        int time = 0;
        Queue<int[]> queue = new Queue<int[]>();
        while (maxHeap.Count > 0 || queue.Count > 0) {
            if (queue.Count > 0 && time >= queue.Peek()[1]) {
                int[] temp = queue.Dequeue();
                maxHeap.Enqueue(temp[0], -temp[0]);
            }
            if (maxHeap.Count > 0) {
                int cnt = maxHeap.Dequeue() - 1;
                if (cnt > 0) {
                    queue.Enqueue(new int[] { cnt, time + n + 1 });
                }
            }
            time++;
        }
        return time;
    }
}
```

```go
func leastInterval(tasks []byte, n int) int {
    count := make(map[byte]int)
    for _, task := range tasks {
        count[task]++
    }

    maxHeap := priorityqueue.NewWith(func(a, b interface{}) int {
        return b.(int) - a.(int)
    })
    for _, cnt := range count {
        maxHeap.Enqueue(cnt)
    }

    time := 0
    q := make([][2]int, 0)

    for maxHeap.Size() > 0 || len(q) > 0 {
        time++

        if maxHeap.Size() == 0 {
            time = q[0][1]
        } else {
            cnt, _ := maxHeap.Dequeue()
            cnt = cnt.(int) - 1
            if cnt.(int) > 0 {
                q = append(q, [2]int{cnt.(int), time + n})
            }
        }

        if len(q) > 0 && q[0][1] == time {
            maxHeap.Enqueue(q[0][0])
            q = q[1:]
        }
    }

    return time
}
```

```kotlin
class Solution {
    fun leastInterval(tasks: CharArray, n: Int): Int {
        val count = IntArray(26)
        for (task in tasks) {
            count[task - 'A']++
        }

        val maxHeap = PriorityQueue<Int>(compareBy { it * -1 })
        for (cnt in count) {
            if (cnt > 0) {
                maxHeap.offer(cnt)
            }
        }

        var time = 0
        val q = ArrayDeque<Pair<Int, Int>>()

        while (maxHeap.isNotEmpty() || q.isNotEmpty()) {
            time++

            if (maxHeap.isEmpty()) {
                time = q.first().second
            } else {
                val cnt = 1 + maxHeap.poll() * -1
                if (cnt != 0) {
                    q.addLast(Pair(cnt * -1, time + n))
                }
            }

            if (q.isNotEmpty() && q.first().second == time) {
                maxHeap.offer(q.removeFirst().first)
            }
        }
        return time
    }
}
```

```swift
class Solution {
    func leastInterval(_ tasks: [Character], _ n: Int) -> Int {
        var count = [Character: Int]()
        for task in tasks {
            count[task, default: 0] += 1
        }

        var maxHeap = Heap<Int>(Array(count.values))
        var time = 0
        var queue = Deque<(Int, Int)>()

        while !maxHeap.isEmpty || !queue.isEmpty {
            time += 1
            if maxHeap.isEmpty {
                time = queue.first!.1
            } else {
                let cnt = maxHeap.popMax()! - 1
                if cnt > 0 {
                    queue.append((cnt, time + n))
                }
            }
            if let front = queue.first, front.1 == time {
                maxHeap.insert(front.0)
                queue.removeFirst()
            }
        }

        return time
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $m$ is the number of tasks.

---

## 3. Greedy

### Intuition

Instead of simulating the whole schedule, we can think in terms of **slots**:

- Let `maxf` be the **maximum frequency** of any task (e.g., if `A` appears 5 times, `B` 3 times, then `maxf = 5`).
- Imagine placing all copies of the most frequent task in a row:

  `A _ _ A _ _ A _ _ A _ _ A`

- There are `maxf - 1` **gaps** between these most frequent tasks.
- Each gap must be at least size `n` to satisfy the cooldown.
- So initial **idle slots needed** = `(maxf - 1) * n`.

Now, we try to **fill these idle slots** using other tasks:

- For each other task with count `c`, it can fill up to `min(c, maxf - 1)` of these gaps (because there are only `maxf - 1` gaps).
- Subtract this filled amount from the idle slots.
- After considering all tasks, if `idle` is still positive, we must add those idle slots to the total time.
- If `idle` becomes zero or negative, it means all gaps are already filled (or over-filled) by tasks, so no extra idle time is needed.

Finally:

- Total time = `len(tasks)` (each task takes 1 unit) + `max(0, idle)` (extra gaps we couldn’t fill).

### Algorithm

1. Count how many times each task appears (frequency array or map).
2. Find `maxf` = maximum frequency among all tasks.
3. Compute initial idle slots: `idle = (maxf - 1) * n`.
4. For each other task with count `c`:
   - Decrease `idle` by `min(maxf - 1, c)` (this task helps fill gaps).
5. If `idle` is still positive, total time = `len(tasks) + idle`.
6. If `idle` is zero or negative, total time = `len(tasks)` (no extra idle time needed).
7. Return this total time.

::tabs-start

```python
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        count = [0] * 26
        for task in tasks:
            count[ord(task) - ord('A')] += 1

        count.sort()
        maxf = count[25]
        idle = (maxf - 1) * n

        for i in range(24, -1, -1):
            idle -= min(maxf - 1, count[i])
        return max(0, idle) + len(tasks)
```

```java
public class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        for (char task : tasks) {
            count[task - 'A']++;
        }

        Arrays.sort(count);
        int maxf = count[25];
        int idle = (maxf - 1) * n;

        for (int i = 24; i >= 0; i--) {
            idle -= Math.min(maxf - 1, count[i]);
        }
        return Math.max(0, idle) + tasks.length;
    }
}
```

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> count(26, 0);
        for (char task : tasks) {
            count[task - 'A']++;
        }

        sort(count.begin(), count.end());
        int maxf = count[25];
        int idle = (maxf - 1) * n;

        for (int i = 24; i >= 0; i--) {
            idle -= min(maxf - 1, count[i]);
        }
        return max(0, idle) + tasks.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        const count = new Array(26).fill(0);
        for (const task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        count.sort((a, b) => a - b);
        const maxf = count[25];
        let idle = (maxf - 1) * n;

        for (let i = 24; i >= 0; i--) {
            idle -= Math.min(maxf - 1, count[i]);
        }
        return Math.max(0, idle) + tasks.length;
    }
}
```

```csharp
public class Solution {
    public int LeastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        foreach (char task in tasks) {
            count[task - 'A']++;
        }

        Array.Sort(count);
        int maxf = count[25];
        int idle = (maxf - 1) * n;

        for (int i = 24; i >= 0; i--) {
            idle -= Math.Min(maxf - 1, count[i]);
        }
        return Math.Max(0, idle) + tasks.Length;
    }
}
```

```go
func leastInterval(tasks []byte, n int) int {
    count := make([]int, 26)
    for _, task := range tasks {
        count[task-'A']++
    }

    sort.Ints(count)
    maxf := count[25]
    idle := (maxf - 1) * n

    for i := 24; i >= 0; i-- {
        idle -= min(maxf-1, count[i])
    }

    return max(0, idle) + len(tasks)
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun leastInterval(tasks: CharArray, n: Int): Int {
        val count = IntArray(26)
        for (task in tasks) {
            count[task - 'A']++
        }

        count.sort()
        val maxf = count[25]
        var idle = (maxf - 1) * n

        for (i in 24 downTo 0) {
            idle -= min(maxf - 1, count[i])
        }

        return max(0, idle) + tasks.size
    }
}
```

```swift
class Solution {
    func leastInterval(_ tasks: [Character], _ n: Int) -> Int {
        var count = [Int](repeating: 0, count: 26)
        for task in tasks {
            count[Int(task.asciiValue! - Character("A").asciiValue!)] += 1
        }

        count.sort()
        let maxf = count[25]
        var idle = (maxf - 1) * n

        for i in stride(from: 24, through: 0, by: -1) {
            idle -= min(maxf - 1, count[i])
        }

        return max(0, idle) + tasks.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $m$ is the number of tasks.

---

## 4. Math

### Intuition

The task with the highest frequency determines the minimum needed structure of the schedule.
If a task appears `maxf` times, these copies must be at least `n` units apart.
This creates `(maxf - 1)` "gaps", and each gap must have a length of `(n + 1)` slots (the task itself + n cooldowns).

If multiple tasks share this maximum frequency (`maxCount` tasks), they all occupy the final row of the structure.

So the minimal time required to schedule all tasks without violating cooldown rules is: `time = (maxf - 1) * (n + 1) + maxCount`

However, if the number of tasks is larger than this calculated time, then simply performing all tasks takes longer.
Thus, the actual answer must be: `max(len(tasks), time)`

### Algorithm

1. Count how many times each task appears.
2. Find `maxf` = the highest task frequency.
3. Count how many tasks have this highest frequency → `maxCount`.
4. Compute: `time = (maxf - 1) * (n + 1) + maxCount`
5. Return: `max(len(tasks), time)`

::tabs-start

```python
class Solution:
    def leastInterval(self, tasks: List[str], n: int) -> int:
        count = [0] * 26
        for task in tasks:
            count[ord(task) - ord('A')] += 1

        maxf = max(count)
        maxCount = 0
        for i in count:
            maxCount += 1 if i == maxf else 0

        time = (maxf - 1) * (n + 1) + maxCount
        return max(len(tasks), time)
```

```java
public class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        for (char task : tasks) {
            count[task - 'A']++;
        }

        int maxf = Arrays.stream(count).max().getAsInt();
        int maxCount = 0;
        for (int i : count) {
            if (i == maxf) {
                maxCount++;
            }
        }

        int time = (maxf - 1) * (n + 1) + maxCount;
        return Math.max(tasks.length, time);
    }
}
```

```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> count(26, 0);
        for (char task : tasks) {
            count[task - 'A']++;
        }

        int maxf = *max_element(count.begin(), count.end());
        int maxCount = 0;
        for (int i : count) {
            if (i == maxf) {
                maxCount++;
            }
        }

        int time = (maxf - 1) * (n + 1) + maxCount;
        return max((int)tasks.size(), time);
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} tasks
     * @param {number} n
     * @return {number}
     */
    leastInterval(tasks, n) {
        const count = new Array(26).fill(0);
        for (const task of tasks) {
            count[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
        }

        const maxf = Math.max(...count);
        let maxCount = 0;
        for (const i of count) {
            if (i === maxf) {
                maxCount++;
            }
        }

        const time = (maxf - 1) * (n + 1) + maxCount;
        return Math.max(tasks.length, time);
    }
}
```

```csharp
public class Solution {
    public int LeastInterval(char[] tasks, int n) {
        int[] count = new int[26];
        foreach (char task in tasks) {
            count[task - 'A']++;
        }

        int maxf = count.Max();
        int maxCount = 0;
        foreach (int i in count) {
            if (i == maxf) {
                maxCount++;
            }
        }

        int time = (maxf - 1) * (n + 1) + maxCount;
        return Math.Max(tasks.Length, time);
    }
}
```

```go
func leastInterval(tasks []byte, n int) int {
    count := make([]int, 26)
    for _, task := range tasks {
        count[task-'A']++
    }

    maxf := 0
    for _, cnt := range count {
        if cnt > maxf {
            maxf = cnt
        }
    }

    maxCount := 0
    for _, cnt := range count {
        if cnt == maxf {
            maxCount++
        }
    }

    time := (maxf - 1) * (n + 1) + maxCount
    if len(tasks) > time {
        return len(tasks)
    }
    return time
}
```

```kotlin
class Solution {
    fun leastInterval(tasks: CharArray, n: Int): Int {
        val count = IntArray(26)
        for (task in tasks) {
            count[task - 'A']++
        }

        val maxf = count.maxOrNull() ?: 0
        var maxCount = 0
        for (cnt in count) {
            if (cnt == maxf) {
                maxCount++
            }
        }

        val time = (maxf - 1) * (n + 1) + maxCount
        return max(tasks.size, time)
    }
}
```

```swift
class Solution {
    func leastInterval(_ tasks: [Character], _ n: Int) -> Int {
        var count = [Int](repeating: 0, count: 26)
        for task in tasks {
            count[Int(task.asciiValue! - Character("A").asciiValue!)] += 1
        }

        let maxf = count.max()!
        var maxCount = 0
        for i in count {
            if i == maxf {
                maxCount += 1
            }
        }

        let time = (maxf - 1) * (n + 1) + maxCount
        return max(tasks.count, time)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $m$ is the number of tasks.

---

## Common Pitfalls

### Not Prioritizing the Most Frequent Task

A greedy approach must always pick the task with the highest remaining count that is not in cooldown. Picking tasks arbitrarily or in the order they appear leads to suboptimal schedules with more idle time than necessary.

### Incorrect Cooldown Tracking

When using a heap with a cooldown queue, the task should become available at time `current_time + n`, not `current_time + n + 1`. Off-by-one errors in cooldown calculations are common and result in either too many idle slots or cooldown violations.

### Forgetting to Count Tasks with Maximum Frequency

In the math-based solution, you must count how many tasks share the maximum frequency (`maxCount`). Using just `1` instead of `maxCount` in the formula `(maxf - 1) * (n + 1) + maxCount` underestimates the required time when multiple tasks have the same highest frequency.
