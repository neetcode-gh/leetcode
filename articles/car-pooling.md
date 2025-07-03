## 1. Brute Force

::tabs-start

```python
class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        trips.sort(key=lambda x: x[1])

        for i in range(len(trips)):
            curPass = trips[i][0]
            for j in range(i):
                if trips[j][2] > trips[i][1]:
                    curPass += trips[j][0]
            if curPass > capacity:
                return False

        return True
```

```java
public class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        Arrays.sort(trips, (a, b) -> Integer.compare(a[1], b[1]));

        for (int i = 0; i < trips.length; i++) {
            int curPass = trips[i][0];
            for (int j = 0; j < i; j++) {
                if (trips[j][2] > trips[i][1]) {
                    curPass += trips[j][0];
                }
            }
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        sort(trips.begin(), trips.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        for (int i = 0; i < trips.size(); i++) {
            int curPass = trips[i][0];
            for (int j = 0; j < i; j++) {
                if (trips[j][2] > trips[i][1]) {
                    curPass += trips[j][0];
                }
            }
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} trips
     * @param {number} capacity
     * @return {boolean}
     */
    carPooling(trips, capacity) {
        trips.sort((a, b) => a[1] - b[1]);

        for (let i = 0; i < trips.length; i++) {
            let curPass = trips[i][0];
            for (let j = 0; j < i; j++) {
                if (trips[j][2] > trips[i][1]) {
                    curPass += trips[j][0];
                }
            }
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool CarPooling(int[][] trips, int capacity) {
        Array.Sort(trips, (a, b) => a[1].CompareTo(b[1]));

        for (int i = 0; i < trips.Length; i++) {
            int curPass = trips[i][0];
            for (int j = 0; j < i; j++) {
                if (trips[j][2] > trips[i][1]) {
                    curPass += trips[j][0];
                }
            }
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Min-Heap

::tabs-start

```python
class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        trips.sort(key=lambda t: t[1])

        minHeap = []  # pair of [end, numPassengers]
        curPass = 0

        for numPass, start, end in trips:
            while minHeap and minHeap[0][0] <= start:
                curPass -= heapq.heappop(minHeap)[1]

            curPass += numPass
            if curPass > capacity:
                return False

            heapq.heappush(minHeap, [end, numPass])

        return True
```

```java
public class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        Arrays.sort(trips, Comparator.comparingInt(a -> a[1]));

        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0])); // [end, numPassengers]
        int curPass = 0;

        for (int[] trip : trips) {
            int numPass = trip[0], start = trip[1], end = trip[2];

            while (!minHeap.isEmpty() && minHeap.peek()[0] <= start) {
                curPass -= minHeap.poll()[1];
            }

            curPass += numPass;
            if (curPass > capacity) {
                return false;
            }

            minHeap.offer(new int[]{end, numPass});
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        sort(trips.begin(), trips.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minHeap; // [end, numPassengers]
        int curPass = 0;

        for (const auto& trip : trips) {
            int numPass = trip[0], start = trip[1], end = trip[2];

            while (!minHeap.empty() && minHeap.top().first <= start) {
                curPass -= minHeap.top().second;
                minHeap.pop();
            }

            curPass += numPass;
            if (curPass > capacity) {
                return false;
            }

            minHeap.emplace(end, numPass);
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} trips
     * @param {number} capacity
     * @return {boolean}
     */
    carPooling(trips, capacity) {
        trips.sort((a, b) => a[1] - b[1]);

        const minHeap = new MinPriorityQueue((x) => x[0]); // [end, numPassengers]
        let curPass = 0;

        for (const [numPass, start, end] of trips) {
            while (!minHeap.isEmpty() && minHeap.front()[0] <= start) {
                curPass -= minHeap.dequeue()[1];
            }

            curPass += numPass;
            if (curPass > capacity) {
                return false;
            }

            minHeap.enqueue([end, numPass]);
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool CarPooling(int[][] trips, int capacity) {
        Array.Sort(trips, (a, b) => a[1].CompareTo(b[1]));

        var minHeap = new PriorityQueue<int[], int>();
        int curPass = 0;

        foreach (var trip in trips) {
            int numPass = trip[0];
            int start = trip[1];
            int end = trip[2];

            while (minHeap.Count > 0 && minHeap.Peek()[0] <= start) {
                curPass -= minHeap.Dequeue()[1];
            }

            curPass += numPass;
            if (curPass > capacity) {
                return false;
            }

            minHeap.Enqueue(new int[] { end, numPass }, end);
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Line Sweep - I

::tabs-start

```python
class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        points = []
        for passengers, start, end in trips:
            points.append([start, passengers])
            points.append([end, -passengers])

        points.sort()
        curPass = 0
        for point, passengers in points:
            curPass += passengers
            if curPass > capacity:
                return False

        return True
```

```java
public class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        List<int[]> points = new ArrayList<>();
        for (int[] trip : trips) {
            int passengers = trip[0], start = trip[1], end = trip[2];
            points.add(new int[]{start, passengers});
            points.add(new int[]{end, -passengers});
        }

        points.sort((a, b) -> a[0] == b[0] ? Integer.compare(a[1], b[1]) : Integer.compare(a[0], b[0]));

        int curPass = 0;
        for (int[] point : points) {
            curPass += point[1];
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        vector<pair<int, int>> points;
        for (const auto& trip : trips) {
            int passengers = trip[0], start = trip[1], end = trip[2];
            points.emplace_back(start, passengers);
            points.emplace_back(end, -passengers);
        }

        sort(points.begin(), points.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            return a.first == b.first ? a.second < b.second : a.first < b.first;
        });

        int curPass = 0;
        for (const auto& point : points) {
            curPass += point.second;
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} trips
     * @param {number} capacity
     * @return {boolean}
     */
    carPooling(trips, capacity) {
        const points = [];
        for (const [passengers, start, end] of trips) {
            points.push([start, passengers]);
            points.push([end, -passengers]);
        }

        points.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

        let curPass = 0;
        for (const [point, passengers] of points) {
            curPass += passengers;
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool CarPooling(int[][] trips, int capacity) {
        List<int[]> points = new List<int[]>();

        foreach (var trip in trips) {
            int passengers = trip[0];
            int start = trip[1];
            int end = trip[2];

            points.Add(new int[] { start, passengers });
            points.Add(new int[] { end, -passengers });
        }

        points.Sort((a, b) => {
            if (a[0] == b[0]) return a[1] - b[1];
            return a[0] - b[0];
        });

        int curPass = 0;
        foreach (var point in points) {
            curPass += point[1];
            if (curPass > capacity) return false;
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Line Sweep - II

::tabs-start

```python
class Solution:
    def carPooling(self, trips: List[List[int]], capacity: int) -> bool:
        L, R = float("inf"), float("-inf")
        for _, start, end in trips:
            L = min(L, start)
            R = max(R, end)

        N = R - L + 1
        passChange = [0] * (N + 1)
        for passengers, start, end in trips:
            passChange[start - L] += passengers
            passChange[end - L] -= passengers

        curPass = 0
        for change in passChange:
            curPass += change
            if curPass > capacity:
                return False

        return True
```

```java
public class Solution {
    public boolean carPooling(int[][] trips, int capacity) {
        int L = Integer.MAX_VALUE, R = Integer.MIN_VALUE;
        for (int[] trip : trips) {
            L = Math.min(L, trip[1]);
            R = Math.max(R, trip[2]);
        }

        int N = R - L + 1;
        int[] passChange = new int[N + 1];
        for (int[] trip : trips) {
            passChange[trip[1] - L] += trip[0];
            passChange[trip[2] - L] -= trip[0];
        }

        int curPass = 0;
        for (int change : passChange) {
            curPass += change;
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        int L = INT_MAX, R = INT_MIN;
        for (const auto& trip : trips) {
            L = min(L, trip[1]);
            R = max(R, trip[2]);
        }

        int N = R - L + 1;
        vector<int> passChange(N + 1, 0);
        for (const auto& trip : trips) {
            passChange[trip[1] - L] += trip[0];
            passChange[trip[2] - L] -= trip[0];
        }

        int curPass = 0;
        for (int change : passChange) {
            curPass += change;
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} trips
     * @param {number} capacity
     * @return {boolean}
     */
    carPooling(trips, capacity) {
        let L = Infinity,
            R = -Infinity;
        for (const [passengers, start, end] of trips) {
            L = Math.min(L, start);
            R = Math.max(R, end);
        }

        const N = R - L + 1;
        const passChange = Array(N + 1).fill(0);
        for (const [passengers, start, end] of trips) {
            passChange[start - L] += passengers;
            passChange[end - L] -= passengers;
        }

        let curPass = 0;
        for (const change of passChange) {
            curPass += change;
            if (curPass > capacity) {
                return false;
            }
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool CarPooling(int[][] trips, int capacity) {
        int L = int.MaxValue, R = int.MinValue;

        foreach (var trip in trips) {
            int start = trip[1], end = trip[2];
            L = Math.Min(L, start);
            R = Math.Max(R, end);
        }

        int N = R - L + 1;
        int[] passChange = new int[N + 1];

        foreach (var trip in trips) {
            int passengers = trip[0];
            int start = trip[1];
            int end = trip[2];

            passChange[start - L] += passengers;
            passChange[end - L] -= passengers;
        }

        int curPass = 0;
        foreach (int change in passChange) {
            curPass += change;
            if (curPass > capacity) return false;
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + N)$
- Space complexity: $O(N)$

> Where $n$ is the size of the array $trips$ and $N$ is the difference between the rightmost location and the leftmost location.
