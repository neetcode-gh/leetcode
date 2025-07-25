## 1. Sorting

::tabs-start

```python
class Solution:
    def eliminateMaximum(self, dist: List[int], speed: List[int]) -> int:
        minReach = [math.ceil(d / s) for d, s in zip(dist, speed)]
        minReach.sort()

        res = 0
        for minute in range(len(minReach)):
            if minute >= minReach[minute]:
                return res
            res += 1

        return res
```

```java
public class Solution {
    public int eliminateMaximum(int[] dist, int[] speed) {
        int n = dist.length;
        int[] minReach = new int[n];

        for (int i = 0; i < n; i++) {
            minReach[i] = (int) Math.ceil((double) dist[i] / speed[i]);
        }

        Arrays.sort(minReach);

        int res = 0;
        for (int minute = 0; minute < n; minute++) {
            if (minute >= minReach[minute]) {
                return res;
            }
            res++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int eliminateMaximum(vector<int>& dist, vector<int>& speed) {
        int n = dist.size();
        vector<int> minReach(n);

        for (int i = 0; i < n; i++) {
            minReach[i] = ceil((double)dist[i] / speed[i]);
        }

        sort(minReach.begin(), minReach.end());

        int res = 0;
        for (int minute = 0; minute < n; minute++) {
            if (minute >= minReach[minute]) {
                return res;
            }
            res++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} dist
     * @param {number[]} speed
     * @return {number}
     */
    eliminateMaximum(dist, speed) {
        let n = dist.length;
        let minReach = new Array(n);

        for (let i = 0; i < n; i++) {
            minReach[i] = Math.ceil(dist[i] / speed[i]);
        }

        minReach.sort((a, b) => a - b);

        let res = 0;
        for (let minute = 0; minute < n; minute++) {
            if (minute >= minReach[minute]) {
                return res;
            }
            res++;
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

## 2. Sorting (Overwrting Input Array)

::tabs-start

```python
class Solution:
    def eliminateMaximum(self, dist: List[int], speed: List[int]) -> int:
        for i in range(len(dist)):
            dist[i] = math.ceil(dist[i] / speed[i])

        dist.sort()
        for minute in range(len(dist)):
            if minute >= dist[minute]:
                return minute

        return len(dist)
```

```java
public class Solution {
    public int eliminateMaximum(int[] dist, int[] speed) {
        int n = dist.length;
        for (int i = 0; i < n; i++) {
            dist[i] = (int) Math.ceil((double) dist[i] / speed[i]);
        }

        Arrays.sort(dist);
        for (int minute = 0; minute < n; minute++) {
            if (minute >= dist[minute]) {
                return minute;
            }
        }

        return n;
    }
}
```

```cpp
class Solution {
public:
    int eliminateMaximum(vector<int>& dist, vector<int>& speed) {
        int n = dist.size();
        for (int i = 0; i < n; i++) {
            dist[i] = ceil((double)dist[i] / speed[i]);
        }

        sort(dist.begin(), dist.end());
        for (int minute = 0; minute < n; minute++) {
            if (minute >= dist[minute]) {
                return minute;
            }
        }

        return n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} dist
     * @param {number[]} speed
     * @return {number}
     */
    eliminateMaximum(dist, speed) {
        let n = dist.length;
        for (let i = 0; i < n; i++) {
            dist[i] = Math.ceil(dist[i] / speed[i]);
        }

        dist.sort((a, b) => a - b);
        for (let minute = 0; minute < n; minute++) {
            if (minute >= dist[minute]) {
                return minute;
            }
        }

        return n;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Min-Heap

::tabs-start

```python
class Solution:
    def eliminateMaximum(self, dist: List[int], speed: List[int]) -> int:
        minHeap = []
        for i in range(len(dist)):
            heapq.heappush(minHeap, dist[i] / speed[i])

        res = 0
        while minHeap:
            if res >= heapq.heappop(minHeap):
                return res
            res += 1

        return res
```

```java
public class Solution {
    public int eliminateMaximum(int[] dist, int[] speed) {
        PriorityQueue<Double> minHeap = new PriorityQueue<>();
        for (int i = 0; i < dist.length; i++) {
            minHeap.add((double) dist[i] / speed[i]);
        }

        int res = 0;
        while (!minHeap.isEmpty()) {
            if (res >= minHeap.poll()) {
                return res;
            }
            res++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int eliminateMaximum(vector<int>& dist, vector<int>& speed) {
        priority_queue<double, vector<double>, greater<double>> minHeap;
        for (int i = 0; i < dist.size(); i++) {
            minHeap.push((double)dist[i] / speed[i]);
        }

        int res = 0;
        while (!minHeap.empty()) {
            if (res >= minHeap.top()) {
                return res;
            }
            minHeap.pop();
            res++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} dist
     * @param {number[]} speed
     * @return {number}
     */
    eliminateMaximum(dist, speed) {
        const minHeap = new MinPriorityQueue();
        for (let i = 0; i < dist.length; i++) {
            minHeap.enqueue(dist[i] / speed[i]);
        }

        let res = 0;
        while (!minHeap.isEmpty()) {
            if (res >= minHeap.dequeue().element) {
                return res;
            }
            res++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
