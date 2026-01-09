## 1. Brute Force

### Intuition

The most straightforward approach is to check each person's arrival time against every flower's bloom period. A flower is visible to a person if the arrival time falls within the flower's start and end times (inclusive). We count all such flowers for each person.

### Algorithm

1. For each person in the `people` array, initialize a counter to zero.
2. For each flower, check if the person's arrival time is within the flower's bloom period (`start <= time <= end`).
3. If `yes`, increment the counter.
4. Store the count in the result array and return it.

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        res = []

        for time in people:
            cnt = 0
            for start, end in flowers:
                if start <= time <= end:
                    cnt += 1
            res.append(cnt)

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];

        for (int i = 0; i < m; i++) {
            int count = 0;
            for (int[] flower : flowers) {
                if (flower[0] <= people[i] && people[i] <= flower[1]) {
                    count++;
                }
            }
            res[i] = count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m);

        for (int i = 0; i < m; i++) {
            int count = 0;
            for (auto& flower : flowers) {
                if (flower[0] <= people[i] && people[i] <= flower[1]) {
                    count++;
                }
            }
            res[i] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        let res = new Array(people.length).fill(0);

        for (let i = 0; i < people.length; i++) {
            let count = 0;
            for (let [start, end] of flowers) {
                if (start <= people[i] && people[i] <= end) {
                    count++;
                }
            }
            res[i] = count;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.Length;
        int[] res = new int[m];

        for (int i = 0; i < m; i++) {
            int count = 0;
            foreach (var flower in flowers) {
                if (flower[0] <= people[i] && people[i] <= flower[1]) {
                    count++;
                }
            }
            res[i] = count;
        }

        return res;
    }
}
```

```go
func fullBloomFlowers(flowers [][]int, people []int) []int {
    m := len(people)
    res := make([]int, m)

    for i := 0; i < m; i++ {
        count := 0
        for _, flower := range flowers {
            if flower[0] <= people[i] && people[i] <= flower[1] {
                count++
            }
        }
        res[i] = count
    }

    return res
}
```

```kotlin
class Solution {
    fun fullBloomFlowers(flowers: Array<IntArray>, people: IntArray): IntArray {
        val m = people.size
        val res = IntArray(m)

        for (i in 0 until m) {
            var count = 0
            for (flower in flowers) {
                if (flower[0] <= people[i] && people[i] <= flower[1]) {
                    count++
                }
            }
            res[i] = count
        }

        return res
    }
}
```

```swift
class Solution {
    func fullBloomFlowers(_ flowers: [[Int]], _ people: [Int]) -> [Int] {
        let m = people.count
        var res = [Int](repeating: 0, count: m)

        for i in 0..<m {
            var count = 0
            for flower in flowers {
                if flower[0] <= people[i] && people[i] <= flower[1] {
                    count += 1
                }
            }
            res[i] = count
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m)$ for the output array.

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 2. Two Min-Heaps

### Intuition

Instead of checking every flower for every person, we can process people in sorted order of their arrival times. By using two min-heaps (one for start times, one for end times), we can efficiently track how many flowers have started blooming and how many have finished. The difference gives us the count of flowers currently in bloom.

### Algorithm

1. Sort people by arrival time while preserving their original indices.
2. Create two min-heaps: one containing all flower start times, another containing all flower end times.
3. For each person (in sorted order):
   - Pop all start times less than or equal to the person's arrival time and increment the `count`.
   - Pop all end times strictly less than the person's arrival time and decrement the `count`.
   - Record the current `count` for this person's original index.
4. Return the result array.

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        people = sorted((p, i) for i, p in enumerate(people))
        res = [0] * len(people)
        count = 0

        start = [f[0] for f in flowers]
        end = [f[1] for f in flowers]

        heapq.heapify(start)
        heapq.heapify(end)

        for p, i in people:
            while start and start[0] <= p:
                heapq.heappop(start)
                count += 1
            while end and end[0] < p:
                heapq.heappop(end)
                count -= 1
            res[i] = count

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];

        List<int[]> sortedPeople = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            sortedPeople.add(new int[]{people[i], i});
        }
        sortedPeople.sort(Comparator.comparingInt(a -> a[0]));

        PriorityQueue<Integer> startHeap = new PriorityQueue<>();
        PriorityQueue<Integer> endHeap = new PriorityQueue<>();
        for (int[] f : flowers) {
            startHeap.offer(f[0]);
            endHeap.offer(f[1]);
        }

        int count = 0;
        for (int[] person : sortedPeople) {
            int p = person[0], index = person[1];

            while (!startHeap.isEmpty() && startHeap.peek() <= p) {
                startHeap.poll();
                count++;
            }
            while (!endHeap.isEmpty() && endHeap.peek() < p) {
                endHeap.poll();
                count--;
            }

            res[index] = count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m);

        vector<pair<int, int>> sortedPeople;
        for (int i = 0; i < m; i++) {
            sortedPeople.push_back({people[i], i});
        }
        sort(sortedPeople.begin(), sortedPeople.end());

        priority_queue<int, vector<int>, greater<int>> startHeap, endHeap;
        for (const auto& f : flowers) {
            startHeap.push(f[0]);
            endHeap.push(f[1]);
        }

        int count = 0;
        for (const auto& person : sortedPeople) {
            int p = person.first, index = person.second;

            while (!startHeap.empty() && startHeap.top() <= p) {
                startHeap.pop();
                count++;
            }
            while (!endHeap.empty() && endHeap.top() < p) {
                endHeap.pop();
                count--;
            }

            res[index] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        const m = people.length;
        const res = new Array(m).fill(0);

        const sortedPeople = people.map((p, i) => [p, i]);
        sortedPeople.sort((a, b) => a[0] - b[0]);

        const startHeap = new MinPriorityQueue();
        const endHeap = new MinPriorityQueue();
        for (const [s, e] of flowers) {
            startHeap.enqueue(s);
            endHeap.enqueue(e);
        }

        let count = 0;
        for (const [p, index] of sortedPeople) {
            while (!startHeap.isEmpty() && startHeap.front() <= p) {
                startHeap.dequeue();
                count++;
            }
            while (!endHeap.isEmpty() && endHeap.front() < p) {
                endHeap.dequeue();
                count--;
            }
            res[index] = count;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.Length;
        int[] res = new int[m];

        var sortedPeople = new List<int[]>();
        for (int i = 0; i < m; i++) {
            sortedPeople.Add(new int[] { people[i], i });
        }
        sortedPeople.Sort((a, b) => a[0].CompareTo(b[0]));

        var startHeap = new PriorityQueue<int, int>();
        var endHeap = new PriorityQueue<int, int>();
        foreach (var f in flowers) {
            startHeap.Enqueue(f[0], f[0]);
            endHeap.Enqueue(f[1], f[1]);
        }

        int count = 0;
        foreach (var person in sortedPeople) {
            int p = person[0], index = person[1];

            while (startHeap.Count > 0 && startHeap.Peek() <= p) {
                startHeap.Dequeue();
                count++;
            }
            while (endHeap.Count > 0 && endHeap.Peek() < p) {
                endHeap.Dequeue();
                count--;
            }
            res[index] = count;
        }

        return res;
    }
}
```

```go
func fullBloomFlowers(flowers [][]int, people []int) []int {
    m := len(people)
    res := make([]int, m)

    sortedPeople := make([][2]int, m)
    for i, p := range people {
        sortedPeople[i] = [2]int{p, i}
    }
    sort.Slice(sortedPeople, func(i, j int) bool {
        return sortedPeople[i][0] < sortedPeople[j][0]
    })

    startHeap := &IntHeap{}
    endHeap := &IntHeap{}
    heap.Init(startHeap)
    heap.Init(endHeap)
    for _, f := range flowers {
        heap.Push(startHeap, f[0])
        heap.Push(endHeap, f[1])
    }

    count := 0
    for _, person := range sortedPeople {
        p, index := person[0], person[1]

        for startHeap.Len() > 0 && (*startHeap)[0] <= p {
            heap.Pop(startHeap)
            count++
        }
        for endHeap.Len() > 0 && (*endHeap)[0] < p {
            heap.Pop(endHeap)
            count--
        }
        res[index] = count
    }

    return res
}

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun fullBloomFlowers(flowers: Array<IntArray>, people: IntArray): IntArray {
        val m = people.size
        val res = IntArray(m)

        val sortedPeople = people.mapIndexed { i, p -> intArrayOf(p, i) }
            .sortedBy { it[0] }

        val startHeap = PriorityQueue<Int>()
        val endHeap = PriorityQueue<Int>()
        for (f in flowers) {
            startHeap.offer(f[0])
            endHeap.offer(f[1])
        }

        var count = 0
        for ((p, index) in sortedPeople) {
            while (startHeap.isNotEmpty() && startHeap.peek() <= p) {
                startHeap.poll()
                count++
            }
            while (endHeap.isNotEmpty() && endHeap.peek() < p) {
                endHeap.poll()
                count--
            }
            res[index] = count
        }

        return res
    }
}
```

```swift
class Solution {
    func fullBloomFlowers(_ flowers: [[Int]], _ people: [Int]) -> [Int] {
        let m = people.count
        var res = [Int](repeating: 0, count: m)

        var sortedPeople = people.enumerated().map { ($0.element, $0.offset) }
        sortedPeople.sort { $0.0 < $1.0 }

        var start = flowers.map { $0[0] }.sorted()
        var end = flowers.map { $0[1] }.sorted()

        var count = 0
        var si = 0, ei = 0
        for (p, index) in sortedPeople {
            while si < start.count && start[si] <= p {
                si += 1
                count += 1
            }
            while ei < end.count && end[ei] < p {
                ei += 1
                count -= 1
            }
            res[index] = count
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 3. Min-Heap

### Intuition

We can optimize the two-heap approach by sorting the flowers by start time and using only one heap for end times. As we process each person, we push end times of flowers that have started blooming onto the heap. Then we remove flowers that have finished blooming. The heap size represents the current bloom count.

### Algorithm

1. Sort people by arrival time while preserving their original indices.
2. Sort flowers by their start times.
3. Use a single min-heap to track end times of currently blooming flowers.
4. For each person (in sorted order):
   - Push the end times of all flowers with start time less than or equal to the person's arrival time.
   - Pop all end times strictly less than the person's arrival time (flowers that stopped blooming).
   - The heap size is the count of flowers currently in bloom for this person.
5. Return the result array.

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        people = sorted((p, i) for i, p in enumerate(people))
        res = [0] * len(people)
        flowers.sort()
        end = []

        j = 0
        for p, i in people:
            while j < len(flowers) and flowers[j][0] <= p:
                heapq.heappush(end, flowers[j][1])
                j += 1
            while end and end[0] < p:
                heapq.heappop(end)
            res[i] = len(end)

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];
        int[][] indexedPeople = new int[m][2];

        for (int i = 0; i < m; i++) {
            indexedPeople[i] = new int[]{people[i], i};
        }
        Arrays.sort(indexedPeople, Comparator.comparingInt(a -> a[0]));
        Arrays.sort(flowers, Comparator.comparingInt(a -> a[0]));

        PriorityQueue<Integer> endHeap = new PriorityQueue<>();
        int j = 0, n = flowers.length;

        for (int[] person : indexedPeople) {
            int p = person[0], index = person[1];

            while (j < n && flowers[j][0] <= p) {
                endHeap.offer(flowers[j][1]);
                j++;
            }
            while (!endHeap.isEmpty() && endHeap.peek() < p) {
                endHeap.poll();
            }
            res[index] = endHeap.size();
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m);
        vector<pair<int, int>> indexedPeople;

        for (int i = 0; i < m; i++) {
            indexedPeople.emplace_back(people[i], i);
        }
        sort(indexedPeople.begin(), indexedPeople.end());
        sort(flowers.begin(), flowers.end());

        priority_queue<int, vector<int>, greater<int>> endHeap;
        int j = 0, n = flowers.size();

        for (auto [p, index] : indexedPeople) {
            while (j < n && flowers[j][0] <= p) {
                endHeap.push(flowers[j][1]);
                j++;
            }
            while (!endHeap.empty() && endHeap.top() < p) {
                endHeap.pop();
            }
            res[index] = endHeap.size();
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        const m = people.length;
        const res = new Array(m).fill(0);
        const indexedPeople = people.map((p, i) => [p, i]);

        indexedPeople.sort((a, b) => a[0] - b[0]);
        flowers.sort((a, b) => a[0] - b[0]);

        const endHeap = new MinPriorityQueue();
        let j = 0,
            n = flowers.length;

        for (const [p, index] of indexedPeople) {
            while (j < n && flowers[j][0] <= p) {
                endHeap.enqueue(flowers[j][1]);
                j++;
            }
            while (!endHeap.isEmpty() && endHeap.front() < p) {
                endHeap.dequeue();
            }
            res[index] = endHeap.size();
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.Length;
        int[] res = new int[m];
        int[][] indexedPeople = new int[m][];

        for (int i = 0; i < m; i++) {
            indexedPeople[i] = new int[] { people[i], i };
        }
        Array.Sort(indexedPeople, (a, b) => a[0].CompareTo(b[0]));
        Array.Sort(flowers, (a, b) => a[0].CompareTo(b[0]));

        var endHeap = new PriorityQueue<int, int>();
        int j = 0, n = flowers.Length;

        foreach (var person in indexedPeople) {
            int p = person[0], index = person[1];

            while (j < n && flowers[j][0] <= p) {
                endHeap.Enqueue(flowers[j][1], flowers[j][1]);
                j++;
            }
            while (endHeap.Count > 0 && endHeap.Peek() < p) {
                endHeap.Dequeue();
            }
            res[index] = endHeap.Count;
        }
        return res;
    }
}
```

```go
func fullBloomFlowers(flowers [][]int, people []int) []int {
    m := len(people)
    res := make([]int, m)
    indexedPeople := make([][2]int, m)

    for i, p := range people {
        indexedPeople[i] = [2]int{p, i}
    }
    sort.Slice(indexedPeople, func(i, j int) bool {
        return indexedPeople[i][0] < indexedPeople[j][0]
    })
    sort.Slice(flowers, func(i, j int) bool {
        return flowers[i][0] < flowers[j][0]
    })

    endHeap := &IntHeap{}
    heap.Init(endHeap)
    j, n := 0, len(flowers)

    for _, person := range indexedPeople {
        p, index := person[0], person[1]

        for j < n && flowers[j][0] <= p {
            heap.Push(endHeap, flowers[j][1])
            j++
        }
        for endHeap.Len() > 0 && (*endHeap)[0] < p {
            heap.Pop(endHeap)
        }
        res[index] = endHeap.Len()
    }
    return res
}

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun fullBloomFlowers(flowers: Array<IntArray>, people: IntArray): IntArray {
        val m = people.size
        val res = IntArray(m)
        val indexedPeople = people.mapIndexed { i, p -> intArrayOf(p, i) }
            .sortedBy { it[0] }

        flowers.sortBy { it[0] }

        val endHeap = PriorityQueue<Int>()
        var j = 0
        val n = flowers.size

        for ((p, index) in indexedPeople) {
            while (j < n && flowers[j][0] <= p) {
                endHeap.offer(flowers[j][1])
                j++
            }
            while (endHeap.isNotEmpty() && endHeap.peek() < p) {
                endHeap.poll()
            }
            res[index] = endHeap.size
        }
        return res
    }
}
```

```swift
class Solution {
    func fullBloomFlowers(_ flowers: [[Int]], _ people: [Int]) -> [Int] {
        let m = people.count
        var res = [Int](repeating: 0, count: m)
        var indexedPeople = people.enumerated().map { ($0.element, $0.offset) }

        indexedPeople.sort { $0.0 < $1.0 }
        let sortedFlowers = flowers.sorted { $0[0] < $1[0] }

        var end = [Int]()
        var j = 0, n = sortedFlowers.count

        for (p, index) in indexedPeople {
            while j < n && sortedFlowers[j][0] <= p {
                insertSorted(&end, sortedFlowers[j][1])
                j += 1
            }
            while !end.isEmpty && end[0] < p {
                end.removeFirst()
            }
            res[index] = end.count
        }
        return res
    }

    private func insertSorted(_ arr: inout [Int], _ val: Int) {
        var lo = 0, hi = arr.count
        while lo < hi {
            let mid = (lo + hi) / 2
            if arr[mid] < val {
                lo = mid + 1
            } else {
                hi = mid
            }
        }
        arr.insert(val, at: lo)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 4. Sorting + Two Pointers

### Intuition

Rather than using heaps, we can separate the start and end times into two sorted arrays. By sorting people by arrival time and using two pointers to traverse the start and end arrays, we can efficiently count how many flowers have started minus how many have ended at each person's arrival time.

### Algorithm

1. Extract all start times into one array and all end times into another array. Sort both.
2. Sort people by arrival time while preserving their original indices.
3. Initialize two pointers `i` and `j` for start and end arrays, and a running `count`.
4. For each person (in sorted order):
   - Advance pointer `i` through all start times less than or equal to the person's time, incrementing `count`.
   - Advance pointer `j` through all end times strictly less than the person's time, decrementing `count`.
   - Record the `count` for this person's original index.
5. Return the result array.

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        start = sorted(f[0] for f in flowers)
        end = sorted(f[1] for f in flowers)

        res = [0] * len(people)
        peopleIndex = sorted((p, i) for i, p in enumerate(people))

        i = j = count = 0
        for p, index in peopleIndex:
            while i < len(start) and start[i] <= p:
                count += 1
                i += 1
            while j < len(end) and end[j] < p:
                count -= 1
                j += 1
            res[index] = count

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.length;
        int[] res = new int[m];
        List<Integer> start = new ArrayList<>(), end = new ArrayList<>();
        for (int[] f : flowers) {
            start.add(f[0]);
            end.add(f[1]);
        }

        Collections.sort(start);
        Collections.sort(end);

        int count = 0, i = 0, j = 0;
        List<int[]> peopleIndex = new ArrayList<>();
        for (int k = 0; k < m; k++) {
            peopleIndex.add(new int[]{people[k], k});
        }
        peopleIndex.sort(Comparator.comparingInt(a -> a[0]));

        for (int[] p : peopleIndex) {
            int time = p[0], index = p[1];

            while (i < start.size() && start.get(i) <= time) {
                count++;
                i++;
            }
            while (j < end.size() && end.get(j) < time) {
                count--;
                j++;
            }
            res[index] = count;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        int m = people.size();
        vector<int> res(m), start, end;
        for (auto& f : flowers) {
            start.push_back(f[0]);
            end.push_back(f[1]);
        }

        sort(start.begin(), start.end());
        sort(end.begin(), end.end());

        int count = 0, i = 0, j = 0;
        vector<pair<int, int>> peopleIndex;
        for (int k = 0; k < m; k++) {
            peopleIndex.emplace_back(people[k], k);
        }
        sort(peopleIndex.begin(), peopleIndex.end());

        for (auto& [p, index] : peopleIndex) {
            while (i < start.size() && start[i] <= p) {
                count++;
                i++;
            }
            while (j < end.size() && end[j] < p) {
                count--;
                j++;
            }
            res[index] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        const start = [],
            end = [];
        for (let f of flowers) {
            start.push(f[0]);
            end.push(f[1]);
        }

        start.sort((a, b) => a - b);
        end.sort((a, b) => a - b);

        let count = 0,
            i = 0,
            j = 0;
        const peopleIndex = people.map((p, idx) => [p, idx]);
        peopleIndex.sort((a, b) => a[0] - b[0]);

        const res = new Array(people.length);

        for (let [p, index] of peopleIndex) {
            while (i < start.length && start[i] <= p) {
                count++;
                i++;
            }
            while (j < end.length && end[j] < p) {
                count--;
                j++;
            }
            res[index] = count;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FullBloomFlowers(int[][] flowers, int[] people) {
        int m = people.Length;
        int[] res = new int[m];
        var start = new List<int>();
        var end = new List<int>();

        foreach (var f in flowers) {
            start.Add(f[0]);
            end.Add(f[1]);
        }

        start.Sort();
        end.Sort();

        int count = 0, i = 0, j = 0;
        var peopleIndex = new List<int[]>();
        for (int k = 0; k < m; k++) {
            peopleIndex.Add(new int[] { people[k], k });
        }
        peopleIndex.Sort((a, b) => a[0].CompareTo(b[0]));

        foreach (var p in peopleIndex) {
            int time = p[0], index = p[1];

            while (i < start.Count && start[i] <= time) {
                count++;
                i++;
            }
            while (j < end.Count && end[j] < time) {
                count--;
                j++;
            }
            res[index] = count;
        }

        return res;
    }
}
```

```go
func fullBloomFlowers(flowers [][]int, people []int) []int {
    m := len(people)
    res := make([]int, m)
    start := make([]int, len(flowers))
    end := make([]int, len(flowers))

    for i, f := range flowers {
        start[i] = f[0]
        end[i] = f[1]
    }

    sort.Ints(start)
    sort.Ints(end)

    count, i, j := 0, 0, 0
    peopleIndex := make([][2]int, m)
    for k := 0; k < m; k++ {
        peopleIndex[k] = [2]int{people[k], k}
    }
    sort.Slice(peopleIndex, func(a, b int) bool {
        return peopleIndex[a][0] < peopleIndex[b][0]
    })

    for _, p := range peopleIndex {
        time, index := p[0], p[1]

        for i < len(start) && start[i] <= time {
            count++
            i++
        }
        for j < len(end) && end[j] < time {
            count--
            j++
        }
        res[index] = count
    }

    return res
}
```

```kotlin
class Solution {
    fun fullBloomFlowers(flowers: Array<IntArray>, people: IntArray): IntArray {
        val m = people.size
        val res = IntArray(m)
        val start = flowers.map { it[0] }.sorted()
        val end = flowers.map { it[1] }.sorted()

        var count = 0
        var i = 0
        var j = 0
        val peopleIndex = people.mapIndexed { idx, p -> intArrayOf(p, idx) }
            .sortedBy { it[0] }

        for ((time, index) in peopleIndex) {
            while (i < start.size && start[i] <= time) {
                count++
                i++
            }
            while (j < end.size && end[j] < time) {
                count--
                j++
            }
            res[index] = count
        }

        return res
    }
}
```

```swift
class Solution {
    func fullBloomFlowers(_ flowers: [[Int]], _ people: [Int]) -> [Int] {
        let m = people.count
        var res = [Int](repeating: 0, count: m)
        let start = flowers.map { $0[0] }.sorted()
        let end = flowers.map { $0[1] }.sorted()

        var count = 0, i = 0, j = 0
        var peopleIndex = people.enumerated().map { ($0.element, $0.offset) }
        peopleIndex.sort { $0.0 < $1.0 }

        for (time, index) in peopleIndex {
            while i < start.count && start[i] <= time {
                count += 1
                i += 1
            }
            while j < end.count && end[j] < time {
                count -= 1
                j += 1
            }
            res[index] = count
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.

---

## 5. Line Sweep

### Intuition

The line sweep technique treats flower blooms as events on a timeline. Each flower creates two events: a `+1` at its start time and a `-1` at one past its end time. By processing these events in order alongside sorted queries, we maintain a running `count` of blooming flowers at any point in time.

### Algorithm

1. Create events for each flower: `(start, +1)` for blooming and `(end + 1, -1)` for wilting.
2. Sort all events by time.
3. Sort people by arrival time while preserving their original indices.
4. Use a pointer to traverse events. For each person:
   - Process all events with time less than or equal to the person's arrival time, updating the running `count`.
   - Record the `count` for this person's original index.
5. Return the result array.

::tabs-start

```python
class Solution:
    def fullBloomFlowers(self, flowers: List[List[int]], people: List[int]) -> List[int]:
        events = []
        for start, end in flowers:
            events.append((start, 1))
            events.append((end + 1, -1))

        events.sort()
        queries = sorted((p, i) for i, p in enumerate(people))
        res = [0] * len(people)

        count = j = 0
        for time, index in queries:
            while j < len(events) and events[j][0] <= time:
                count += events[j][1]
                j += 1
            res[index] = count

        return res
```

```java
public class Solution {
    public int[] fullBloomFlowers(int[][] flowers, int[] people) {
        List<int[]> events = new ArrayList<>();
        for (int[] f : flowers) {
            events.add(new int[]{f[0], 1});
            events.add(new int[]{f[1] + 1, -1});
        }

        Collections.sort(events, (a, b) -> a[0] - b[0]);
        int[][] queries = new int[people.length][2];
        for (int i = 0; i < people.length; i++) {
            queries[i] = new int[]{people[i], i};
        }
        Arrays.sort(queries, (a, b) -> Integer.compare(a[0], b[0]));

        int[] res = new int[people.length];
        int count = 0, j = 0;
        for (int[] query : queries) {
            int time = query[0], index = query[1];
            while (j < events.size() && events.get(j)[0] <= time) {
                count += events.get(j)[1];
                j++;
            }
            res[index] = count;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> fullBloomFlowers(vector<vector<int>>& flowers, vector<int>& people) {
        vector<pair<int, int>> events;
        for (auto& f : flowers) {
            events.emplace_back(f[0], 1);
            events.emplace_back(f[1] + 1, -1);
        }

        sort(events.begin(), events.end());
        vector<pair<int, int>> queries;
        for (int i = 0; i < people.size(); i++) {
            queries.emplace_back(people[i], i);
        }

        sort(queries.begin(), queries.end());
        vector<int> res(people.size());
        int count = 0, j = 0;

        for (auto& [time, index] : queries) {
            while (j < events.size() && events[j].first <= time) {
                count += events[j++].second;
            }
            res[index] = count;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} flowers
     * @param {number[]} people
     * @return {number[]}
     */
    fullBloomFlowers(flowers, people) {
        let events = [];
        for (let [start, end] of flowers) {
            events.push([start, 1]);
            events.push([end + 1, -1]);
        }

        events.sort((a, b) => a[0] - b[0]);
        let queries = people.map((p, i) => [p, i]).sort((a, b) => a[0] - b[0]);
        let res = new Array(people.length).fill(0);

        let count = 0,
            j = 0;
        for (let [time, index] of queries) {
            while (j < events.length && events[j][0] <= time) {
                count += events[j][1];
                j++;
            }
            res[index] = count;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FullBloomFlowers(int[][] flowers, int[] people) {
        var events = new List<int[]>();
        foreach (var f in flowers) {
            events.Add(new int[] { f[0], 1 });
            events.Add(new int[] { f[1] + 1, -1 });
        }

        events.Sort((a, b) => a[0].CompareTo(b[0]));
        int[][] queries = new int[people.Length][];
        for (int i = 0; i < people.Length; i++) {
            queries[i] = new int[] { people[i], i };
        }
        Array.Sort(queries, (a, b) => a[0].CompareTo(b[0]));

        int[] res = new int[people.Length];
        int count = 0, j = 0;
        foreach (var query in queries) {
            int time = query[0], index = query[1];
            while (j < events.Count && events[j][0] <= time) {
                count += events[j][1];
                j++;
            }
            res[index] = count;
        }
        return res;
    }
}
```

```go
func fullBloomFlowers(flowers [][]int, people []int) []int {
    events := make([][2]int, 0, len(flowers)*2)
    for _, f := range flowers {
        events = append(events, [2]int{f[0], 1})
        events = append(events, [2]int{f[1] + 1, -1})
    }

    sort.Slice(events, func(i, j int) bool {
        return events[i][0] < events[j][0]
    })

    queries := make([][2]int, len(people))
    for i, p := range people {
        queries[i] = [2]int{p, i}
    }
    sort.Slice(queries, func(i, j int) bool {
        return queries[i][0] < queries[j][0]
    })

    res := make([]int, len(people))
    count, j := 0, 0

    for _, query := range queries {
        time, index := query[0], query[1]
        for j < len(events) && events[j][0] <= time {
            count += events[j][1]
            j++
        }
        res[index] = count
    }

    return res
}
```

```kotlin
class Solution {
    fun fullBloomFlowers(flowers: Array<IntArray>, people: IntArray): IntArray {
        val events = mutableListOf<IntArray>()
        for (f in flowers) {
            events.add(intArrayOf(f[0], 1))
            events.add(intArrayOf(f[1] + 1, -1))
        }

        events.sortBy { it[0] }
        val queries = people.mapIndexed { i, p -> intArrayOf(p, i) }
            .sortedBy { it[0] }

        val res = IntArray(people.size)
        var count = 0
        var j = 0

        for ((time, index) in queries) {
            while (j < events.size && events[j][0] <= time) {
                count += events[j][1]
                j++
            }
            res[index] = count
        }

        return res
    }
}
```

```swift
class Solution {
    func fullBloomFlowers(_ flowers: [[Int]], _ people: [Int]) -> [Int] {
        var events = [(Int, Int)]()
        for f in flowers {
            events.append((f[0], 1))
            events.append((f[1] + 1, -1))
        }

        events.sort { $0.0 < $1.0 }
        var queries = people.enumerated().map { ($0.element, $0.offset) }
        queries.sort { $0.0 < $1.0 }

        var res = [Int](repeating: 0, count: people.count)
        var count = 0, j = 0

        for (time, index) in queries {
            while j < events.count && events[j].0 <= time {
                count += events[j].1
                j += 1
            }
            res[index] = count
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m \log m + n \log n)$
- Space complexity: $O(m + n)$

> Where $n$ is the size of the array $flowers$, and $m$ is the size of the array $people$.
