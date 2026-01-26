## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting** - Sorting events or intervals by start/end points
- **Min-Heap (Priority Queue)** - Efficiently tracking and removing minimum elements
- **Line Sweep / Difference Array** - Processing interval changes as discrete events

---

## 1. Brute Force

### Intuition

At each pickup location, we need to know how many passengers are currently in the car. We can sort trips by their start location and for each trip, check all previous trips that have not yet dropped off their passengers. If the total exceeds capacity at any point, carpooling is not possible.

### Algorithm

1. Sort all trips by their pickup location (start time).
2. For each trip at index `i`:
   - Start with the number of passengers from the current trip.
   - Check all previous trips (`j` < `i`) and add their passengers if their drop-off location is after the current pickup location.
   - If the total passengers exceed capacity, return `false`.
3. If all trips pass the capacity check, return `true`.

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

```go
func carPooling(trips [][]int, capacity int) bool {
    sort.Slice(trips, func(i, j int) bool {
        return trips[i][1] < trips[j][1]
    })

    for i := 0; i < len(trips); i++ {
        curPass := trips[i][0]
        for j := 0; j < i; j++ {
            if trips[j][2] > trips[i][1] {
                curPass += trips[j][0]
            }
        }
        if curPass > capacity {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun carPooling(trips: Array<IntArray>, capacity: Int): Boolean {
        trips.sortBy { it[1] }

        for (i in trips.indices) {
            var curPass = trips[i][0]
            for (j in 0 until i) {
                if (trips[j][2] > trips[i][1]) {
                    curPass += trips[j][0]
                }
            }
            if (curPass > capacity) {
                return false
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func carPooling(_ trips: [[Int]], _ capacity: Int) -> Bool {
        let sortedTrips = trips.sorted { $0[1] < $1[1] }

        for i in 0..<sortedTrips.count {
            var curPass = sortedTrips[i][0]
            for j in 0..<i {
                if sortedTrips[j][2] > sortedTrips[i][1] {
                    curPass += sortedTrips[j][0]
                }
            }
            if curPass > capacity {
                return false
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Min-Heap

### Intuition

When we process trips in order of pickup time, we only care about trips whose passengers are still in the car. A min-heap ordered by drop-off time lets us efficiently remove all trips whose passengers have already been dropped off before the current pickup. This way, we maintain a running count of current passengers.

### Algorithm

1. Sort trips by their pickup location.
2. Use a min-heap to track active trips, ordered by their drop-off location.
3. For each trip:
   - Pop all trips from the heap whose drop-off location is at or before the current pickup, subtracting their passengers from the count.
   - Add the current trip's passengers to the count.
   - If the count exceeds capacity, return `false`.
   - Push the current trip (drop-off time, passenger count) onto the heap.
4. Return `true` if all trips are processed without exceeding capacity.

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

```go
func carPooling(trips [][]int, capacity int) bool {
    sort.Slice(trips, func(i, j int) bool {
        return trips[i][1] < trips[j][1]
    })

    h := &MinHeap{}
    heap.Init(h)
    curPass := 0

    for _, trip := range trips {
        numPass, start, end := trip[0], trip[1], trip[2]

        for h.Len() > 0 && (*h)[0][0] <= start {
            curPass -= heap.Pop(h).([2]int)[1]
        }

        curPass += numPass
        if curPass > capacity {
            return false
        }

        heap.Push(h, [2]int{end, numPass})
    }

    return true
}

type MinHeap [][2]int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i][0] < h[j][0] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.([2]int)) }
func (h *MinHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun carPooling(trips: Array<IntArray>, capacity: Int): Boolean {
        trips.sortBy { it[1] }

        val minHeap = PriorityQueue<IntArray>(compareBy { it[0] })
        var curPass = 0

        for (trip in trips) {
            val (numPass, start, end) = trip

            while (minHeap.isNotEmpty() && minHeap.peek()[0] <= start) {
                curPass -= minHeap.poll()[1]
            }

            curPass += numPass
            if (curPass > capacity) {
                return false
            }

            minHeap.offer(intArrayOf(end, numPass))
        }

        return true
    }
}
```

```swift
class Solution {
    func carPooling(_ trips: [[Int]], _ capacity: Int) -> Bool {
        let sortedTrips = trips.sorted { $0[1] < $1[1] }

        var minHeap = Heap<(Int, Int)>(comparator: { $0.0 < $1.0 })
        var curPass = 0

        for trip in sortedTrips {
            let numPass = trip[0], start = trip[1], end = trip[2]

            while let top = minHeap.peek(), top.0 <= start {
                curPass -= minHeap.remove()!.1
            }

            curPass += numPass
            if curPass > capacity {
                return false
            }

            minHeap.insert((end, numPass))
        }

        return true
    }
}

struct Heap<T> {
    var elements: [T] = []
    let comparator: (T, T) -> Bool

    init(comparator: @escaping (T, T) -> Bool) {
        self.comparator = comparator
    }

    var isEmpty: Bool { elements.isEmpty }

    func peek() -> T? { elements.first }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && comparator(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1
            let right = 2 * parent + 2
            var candidate = parent
            if left < elements.count && comparator(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && comparator(elements[right], elements[candidate]) {
                candidate = right
            }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Line Sweep - I

### Intuition

Think of each trip as two events: passengers getting on at the start and passengers getting off at the end. By treating pickups as positive changes and drop-offs as negative changes, we can process all events in sorted order. At any point, if the cumulative passenger count exceeds capacity, the answer is false.

### Algorithm

1. Create a list of events: (location, +passengers) for pickups and (location, -passengers) for drop-offs.
2. Sort events by location. If two events have the same location, process drop-offs (negative) before pickups to handle edge cases correctly.
3. Iterate through events, maintaining a running passenger count.
4. If the count ever exceeds capacity, return `false`.
5. Return `true` after processing all events.

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

```go
func carPooling(trips [][]int, capacity int) bool {
    points := make([][2]int, 0, len(trips)*2)
    for _, trip := range trips {
        passengers, start, end := trip[0], trip[1], trip[2]
        points = append(points, [2]int{start, passengers})
        points = append(points, [2]int{end, -passengers})
    }

    sort.Slice(points, func(i, j int) bool {
        if points[i][0] == points[j][0] {
            return points[i][1] < points[j][1]
        }
        return points[i][0] < points[j][0]
    })

    curPass := 0
    for _, point := range points {
        curPass += point[1]
        if curPass > capacity {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun carPooling(trips: Array<IntArray>, capacity: Int): Boolean {
        val points = mutableListOf<IntArray>()
        for (trip in trips) {
            val (passengers, start, end) = trip
            points.add(intArrayOf(start, passengers))
            points.add(intArrayOf(end, -passengers))
        }

        points.sortWith { a, b ->
            if (a[0] == b[0]) a[1] - b[1] else a[0] - b[0]
        }

        var curPass = 0
        for (point in points) {
            curPass += point[1]
            if (curPass > capacity) {
                return false
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func carPooling(_ trips: [[Int]], _ capacity: Int) -> Bool {
        var points = [(Int, Int)]()
        for trip in trips {
            let passengers = trip[0], start = trip[1], end = trip[2]
            points.append((start, passengers))
            points.append((end, -passengers))
        }

        points.sort { a, b in
            if a.0 == b.0 { return a.1 < b.1 }
            return a.0 < b.0
        }

        var curPass = 0
        for point in points {
            curPass += point.1
            if curPass > capacity {
                return false
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Line Sweep - II

### Intuition

Instead of sorting events, we can use an array where each index represents a location on the route. We record passenger changes at each location: add passengers at pickup points and subtract at drop-off points. A single pass through this array gives us the passenger count at each location.

### Algorithm

1. Find the range of locations (leftmost pickup to rightmost drop-off).
2. Create an array of size (range + 1) initialized to zero.
3. For each trip, add passengers at the pickup index and subtract at the drop-off index.
4. Iterate through the array, accumulating the passenger count.
5. If the count ever exceeds capacity, return `false`. Otherwise, return `true`.

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

```go
func carPooling(trips [][]int, capacity int) bool {
    L, R := math.MaxInt32, math.MinInt32
    for _, trip := range trips {
        start, end := trip[1], trip[2]
        if start < L {
            L = start
        }
        if end > R {
            R = end
        }
    }

    N := R - L + 1
    passChange := make([]int, N+1)
    for _, trip := range trips {
        passengers, start, end := trip[0], trip[1], trip[2]
        passChange[start-L] += passengers
        passChange[end-L] -= passengers
    }

    curPass := 0
    for _, change := range passChange {
        curPass += change
        if curPass > capacity {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun carPooling(trips: Array<IntArray>, capacity: Int): Boolean {
        var L = Int.MAX_VALUE
        var R = Int.MIN_VALUE
        for (trip in trips) {
            val start = trip[1]
            val end = trip[2]
            L = minOf(L, start)
            R = maxOf(R, end)
        }

        val N = R - L + 1
        val passChange = IntArray(N + 1)
        for (trip in trips) {
            val passengers = trip[0]
            val start = trip[1]
            val end = trip[2]
            passChange[start - L] += passengers
            passChange[end - L] -= passengers
        }

        var curPass = 0
        for (change in passChange) {
            curPass += change
            if (curPass > capacity) {
                return false
            }
        }

        return true
    }
}
```

```swift
class Solution {
    func carPooling(_ trips: [[Int]], _ capacity: Int) -> Bool {
        var L = Int.max
        var R = Int.min
        for trip in trips {
            let start = trip[1], end = trip[2]
            L = min(L, start)
            R = max(R, end)
        }

        let N = R - L + 1
        var passChange = [Int](repeating: 0, count: N + 1)
        for trip in trips {
            let passengers = trip[0], start = trip[1], end = trip[2]
            passChange[start - L] += passengers
            passChange[end - L] -= passengers
        }

        var curPass = 0
        for change in passChange {
            curPass += change
            if curPass > capacity {
                return false
            }
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + N)$
- Space complexity: $O(N)$

> Where $n$ is the size of the array $trips$ and $N$ is the difference between the rightmost location and the leftmost location.

---

## Common Pitfalls

### Not Processing Drop-offs Before Pickups at Same Location
When a passenger is dropped off and another is picked up at the same location, the drop-off must happen first. Failing to sort events so that drop-offs (negative values) come before pickups at the same location causes false capacity violations.
```python
# Wrong: no tiebreaker for same location
points.sort(key=lambda x: x[0])
# Correct: drop-offs (negative) before pickups at same location
points.sort(key=lambda x: (x[0], x[1]))
```

### Checking Passengers Still in Car at Drop-off Location
Passengers are dropped off at the `end` location and are not in the car during that location. A common mistake is including passengers who should have already exited, leading to overcounting.
```python
# Wrong: includes passengers still at drop-off
if trips[j][2] >= trips[i][1]:
# Correct: only count if drop-off is strictly after pickup
if trips[j][2] > trips[i][1]:
```

### Off-by-One Error in Difference Array Index
When using a difference array, failing to account for the offset between actual locations and array indices causes incorrect passenger counts. This is especially problematic when locations do not start at zero.
```python
# Wrong: assumes locations start at 0
passChange[start] += passengers
passChange[end] -= passengers
# Correct: adjust for minimum location offset
passChange[start - L] += passengers
passChange[end - L] -= passengers
```