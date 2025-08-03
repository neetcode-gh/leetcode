## 1. Brute Force (Simulation)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output array.

> Where $m$ is the number of tasks and $n$ is the number of servers.

---

## 2. Two Min-Heaps - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + m) \log n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output array.

> Where $m$ is the number of tasks and $n$ is the number of servers.

---

## 3. Two Min-Heaps - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n + m) \log n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(m)$ space for the output array.

> Where $m$ is the number of tasks and $n$ is the number of servers.
