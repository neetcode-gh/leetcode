## 1. Sorting

### Intuition

The weapon needs 1 minute to recharge after each shot. To maximize eliminations, we should prioritize monsters that will reach the city soonest. For each monster, we calculate the time it takes to arrive (`distance / speed`, rounded up). Sorting these arrival times lets us greedily eliminate monsters in order of urgency. If at any minute the earliest uneliminated monster has already arrived, the game ends.

### Algorithm

1. Compute `minReach[i] = ceil(dist[i] / speed[i])` for each monster.
2. Sort `minReach` in ascending order.
3. Iterate through the sorted array with index `minute`:
   - If `minute >= minReach[minute]`, the monster arrives before we can shoot it. Return the current count.
   - Otherwise, increment the elimination count.
4. Return the total count if all monsters are eliminated.

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

```csharp
public class Solution {
    public int EliminateMaximum(int[] dist, int[] speed) {
        int n = dist.Length;
        int[] minReach = new int[n];

        for (int i = 0; i < n; i++) {
            minReach[i] = (int)Math.Ceiling((double)dist[i] / speed[i]);
        }

        Array.Sort(minReach);

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

```go
func eliminateMaximum(dist []int, speed []int) int {
    n := len(dist)
    minReach := make([]int, n)

    for i := 0; i < n; i++ {
        minReach[i] = (dist[i] + speed[i] - 1) / speed[i]
    }

    sort.Ints(minReach)

    res := 0
    for minute := 0; minute < n; minute++ {
        if minute >= minReach[minute] {
            return res
        }
        res++
    }

    return res
}
```

```kotlin
class Solution {
    fun eliminateMaximum(dist: IntArray, speed: IntArray): Int {
        val n = dist.size
        val minReach = IntArray(n) { i ->
            (dist[i] + speed[i] - 1) / speed[i]
        }

        minReach.sort()

        var res = 0
        for (minute in 0 until n) {
            if (minute >= minReach[minute]) {
                return res
            }
            res++
        }

        return res
    }
}
```

```swift
class Solution {
    func eliminateMaximum(_ dist: [Int], _ speed: [Int]) -> Int {
        let n = dist.count
        var minReach = [Int](repeating: 0, count: n)

        for i in 0..<n {
            minReach[i] = (dist[i] + speed[i] - 1) / speed[i]
        }

        minReach.sort()

        var res = 0
        for minute in 0..<n {
            if minute >= minReach[minute] {
                return res
            }
            res += 1
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

## 2. Sorting (Overwriting Input Array)

### Intuition

This is the same approach as above, but we save space by reusing the input `dist` array to store arrival times instead of creating a new array. The logic remains identical: compute arrival times, sort, and check if we can eliminate each monster before it arrives.

### Algorithm

1. Overwrite `dist[i]` with `ceil(dist[i] / speed[i])`.
2. Sort `dist` in ascending order.
3. For each `minute` from `0` to `n - 1`:
   - If `minute >= dist[minute]`, return `minute`.
4. Return `n` if all monsters are eliminated.

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

### Intuition

Instead of sorting all arrival times upfront, we can use a min-heap to extract the minimum arrival time on demand. This still achieves the same goal of processing monsters in order of how soon they reach the city. We pop from the heap one at a time and check if the monster arrives before the current minute.

### Algorithm

1. Push `dist[i] / speed[i]` into a min-heap for each monster.
2. Initialize `res = 0` to count eliminations.
3. While the heap is non-empty:
   - Pop the smallest arrival time.
   - If `res >= arrival_time`, the monster has reached the city. Return `res`.
   - Otherwise, increment `res`.
4. Return `res` after all monsters are eliminated.

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
