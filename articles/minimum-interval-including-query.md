## 1. Brute Force

::tabs-start

```python
class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        n = len(intervals)
        res = []
        for q in queries:
            cur = -1
            for l, r in intervals:
                if l <= q <= r:
                    if cur == -1 or (r - l + 1) < cur:
                        cur = r - l + 1
            res.append(cur)
        return res
```

```java
public class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        int[] res = new int[queries.length];
        int idx = 0;
        for (int q : queries) {
            int cur = -1;
            for (int[] interval : intervals) {
                int l = interval[0], r = interval[1];
                if (l <= q && q <= r) {
                    if (cur == -1 || (r - l + 1) < cur) {
                        cur = r - l + 1;
                    }
                }
            }
            res[idx++] = cur;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        vector<int> res;
        for (int q : queries) {
            int cur = -1;
            for (auto& interval : intervals) {
                int l = interval[0], r = interval[1];
                if (l <= q && q <= r) {
                    if (cur == -1 || (r - l + 1) < cur) {
                        cur = r - l + 1;
                    }
                }
            }
            res.push_back(cur);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} queries
     * @return {number[]}
     */
    minInterval(intervals, queries) {
        const res = [];
        for (const q of queries) {
            let cur = -1;
            for (const [l, r] of intervals) {
                if (l <= q && q <= r) {
                    if (cur === -1 || (r - l + 1) < cur) {
                        cur = r - l + 1;
                    }
                }
            }
            res.push(cur);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] MinInterval(int[][] intervals, int[] queries) {
        int[] res = new int[queries.Length];
        int idx = 0;
        foreach (int q in queries) {
            int cur = -1;
            foreach (var interval in intervals) {
                int l = interval[0], r = interval[1];
                if (l <= q && q <= r) {
                    if (cur == -1 || (r - l + 1) < cur) {
                        cur = r - l + 1;
                    }
                }
            }
            res[idx++] = cur;
        }
        return res;
    }
}
```

```go
func minInterval(intervals [][]int, queries []int) []int {
    res := make([]int, len(queries))
    for i, q := range queries {
        cur := -1
        for _, interval := range intervals {
            l, r := interval[0], interval[1]
            if l <= q && q <= r {
                if cur == -1 || (r - l + 1) < cur {
                    cur = r - l + 1
                }
            }
        }
        res[i] = cur
    }
    return res
}
```

```kotlin
class Solution {
    fun minInterval(intervals: Array<IntArray>, queries: IntArray): IntArray {
        val res = IntArray(queries.size)
        for ((i, q) in queries.withIndex()) {
            var cur = -1
            for (interval in intervals) {
                val l = interval[0]
                val r = interval[1]
                if (l <= q && q <= r) {
                    if (cur == -1 || (r - l + 1) < cur) {
                        cur = r - l + 1
                    }
                }
            }
            res[i] = cur
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the length of the array $queries$ and $n$ is the length of the array $intervals$.

---

## 2. Sweep Line Algorithm

::tabs-start

```python
class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        events = []
        # Create events for intervals
        for idx, (start, end) in enumerate(intervals):
            events.append((start, 0, end - start + 1, idx))    
            events.append((end, 2, end - start + 1, idx))      
        
        # Create events for queries
        for i, q in enumerate(queries):
            events.append((q, 1, i))
        
        # Sort by time and type (end before query)
        events.sort(key=lambda x: (x[0], x[1]))
        
        # Min heap storing [size, index]
        sizes = []  
        ans = [-1] * len(queries)
        inactive = [False] * len(intervals)
        
        for time, type, *rest in events:
            if type == 0:  # Interval start
                interval_size, idx = rest
                heapq.heappush(sizes, (interval_size, idx))
            elif type == 2: #Interval end
                idx = rest[1]
                inactive[idx] = True
            else: # Query
                query_idx = rest[0]
                while sizes and inactive[sizes[0][1]]:
                    heapq.heappop(sizes)
                if sizes:
                    ans[query_idx] = sizes[0][0]
        
        return ans
```

```java
public class Solution {
   public int[] minInterval(int[][] intervals, int[] queries) {
       List<int[]> events = new ArrayList<>();
       for (int i = 0; i < intervals.length; i++) {
           events.add(new int[]{intervals[i][0], 0, intervals[i][1] - intervals[i][0] + 1, i});
           events.add(new int[]{intervals[i][1], 2, intervals[i][1] - intervals[i][0] + 1, i}); 
       }
       
       for (int i = 0; i < queries.length; i++) {
           events.add(new int[]{queries[i], 1, i});
       }
       
       // Sort by time and type (end before query)
       events.sort((a, b) -> a[0] != b[0] ? 
                  Integer.compare(a[0], b[0]) : 
                  Integer.compare(a[1], b[1]));
       
       int[] ans = new int[queries.length];
       Arrays.fill(ans, -1);
       
       // Min heap storing [size, index]
       PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
       boolean[] inactive = new boolean[intervals.length];
       
       for (int[] event : events) {
           if (event[1] == 0) { // Interval start
               pq.offer(new int[]{event[2], event[3]});
           } 
           else if (event[1] == 2) { // Interval end
               inactive[event[3]] = true;
           } 
           else { // Query
               while (!pq.isEmpty() && inactive[pq.peek()[1]]) {
                   pq.poll();
               }
               if (!pq.isEmpty()) {
                   ans[event[2]] = pq.peek()[0];
               }
           }
       }
       
       return ans;
   }
}
```

```cpp
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        vector<vector<int>> events;
        // Create events for intervals
        for (int i = 0; i < intervals.size(); i++) {
            events.push_back({intervals[i][0], 0, intervals[i][1] - intervals[i][0] + 1, i});
            events.push_back({intervals[i][1], 2, intervals[i][1] - intervals[i][0] + 1, i});
        }
        
        // Create events for queries
        for (int i = 0; i < queries.size(); i++) {
            events.push_back({queries[i], 1, i});
        }
        
        // Sort by time and type (end before query)
        sort(events.begin(), events.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] == b[0] ? a[1] < b[1] : a[0] < b[0];
        });
        
        vector<int> ans(queries.size(), -1);
        // Min heap storing [size, index]
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        vector<bool> inactive(intervals.size(), false);
        
        for (const auto& event : events) {
            if (event[1] == 0) { // Interval start
                pq.push({event[2], event[3]});
            } else if (event[1] == 2) { // Interval end
                inactive[event[3]] = true;
            } else { // Query
                int queryIdx = event[2];
                while (!pq.empty() && inactive[pq.top().second]) {
                    pq.pop();
                }
                if (!pq.empty()) {
                    ans[queryIdx] = pq.top().first;
                }
            }
        }
        
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} queries
     * @return {number[]}
     */
    minInterval(intervals, queries) {
        let events = [];
        // Create events for intervals
        for (let i = 0; i < intervals.length; i++) {
            const [start, end] = intervals[i];
            events.push([start, 0, end - start + 1, i]);
            events.push([end, 2, end - start + 1, i]);
        }

        // Create events for queries
        queries.forEach((q, i) => {
            events.push([q, 1, i]);
        });
        // Sort by time and type (end before query)
        events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

        const ans = Array(queries.length).fill(-1);
        // Min heap storing [size, index]
        const pq = new PriorityQueue((a, b) => a[0] - b[0]);
        const inactive = Array(intervals.length).fill(false);

        for (const [time, type, ...rest] of events) {
            if (type === 0) { // Interval start
                pq.push([rest[0], rest[1]]);
            } else if (type === 2) { // Interval end
                inactive[rest[1]] = true;
            } else { // Query
                while (!pq.isEmpty() && inactive[pq.front()[1]]) {
                    pq.pop();
                }
                if (!pq.isEmpty()) {
                    ans[rest[0]] = pq.front()[0];
                }
            }
        }
        
        return ans;
    }
}
```

```csharp
public class Solution {
    public int[] MinInterval(int[][] intervals, int[] queries) {
        var events = new List<int[]>();
        // Create events for intervals
        for (int i = 0; i < intervals.Length; i++) {
            events.Add(new int[] { intervals[i][0], 0, intervals[i][1] - intervals[i][0] + 1, i });
            events.Add(new int[] { intervals[i][1], 2, intervals[i][1] - intervals[i][0] + 1, i });
        }
        
        // Create events for queries
        for (int i = 0; i < queries.Length; i++) {
            events.Add(new int[] { queries[i], 1, i });
        }
        // Sort by time and type (end before query)
        events.Sort((a, b) => a[0] == b[0] ? a[1].CompareTo(b[1]) : a[0].CompareTo(b[0]));
        
        int[] ans = new int[queries.Length];
        Array.Fill(ans, -1);
        // Min heap storing [size, index]
        var pq = new PriorityQueue<(int size, int idx), int>();
        var inactive = new bool[intervals.Length];
        
        foreach (var e in events) {
            if (e[1] == 0) { // Interval start
                pq.Enqueue((e[2], e[3]), e[2]);
            } else if (e[1] == 2) { // Interval end
                inactive[e[3]] = true;
            } else {
                int queryIdx = e[2];
                while (pq.Count > 0 && inactive[pq.Peek().idx]) {
                    pq.Dequeue();
                }
                if (pq.Count > 0) {
                    ans[queryIdx] = pq.Peek().size;
                }
            }
        }
        
        return ans;
    }
}
```

```go
type Event struct {
	time int
	typ  int // 0: interval start, 1: query, 2: interval end
	val  int // interval size or query index
	idx  int // interval index
}

func minInterval(intervals [][]int, queries []int) []int {
	events := []Event{}
	
	// Create events for intervals
	for idx, interval := range intervals {
		start, end := interval[0], interval[1]
		size := end - start + 1
		events = append(events, Event{start, 0, size, idx})
		events = append(events, Event{end, 2, size, idx})
	}
	
	// Create events for queries
	for i, q := range queries {
		events = append(events, Event{q, 1, i, -1})
	}
	
	// Sort events by time and type
	sort.Slice(events, func(i, j int) bool {
		if events[i].time == events[j].time {
			return events[i].typ < events[j].typ
		}
		return events[i].time < events[j].time
	})

	// Priority queue to store intervals with the smallest size on top
	sizes := priorityqueue.NewWith(func(a, b interface{}) int {
		return utils.IntComparator(a.([]int)[0], b.([]int)[0])
	})
	ans := make([]int, len(queries))
	for i := range ans {
		ans[i] = -1
	}
	inactive := make([]bool, len(intervals))
	
	for _, event := range events {
		switch event.typ {
		case 0: // Interval start
			sizes.Enqueue([]int{event.val, event.idx})
		case 2: // Interval end
			inactive[event.idx] = true
		case 1: // Query
			queryIdx := event.val
			for !sizes.Empty() {
				top, _ := sizes.Peek()
				if inactive[top.([]int)[1]] {
					sizes.Dequeue()
				} else {
					break
				}
			}
			if !sizes.Empty() {
				top, _ := sizes.Peek()
				ans[queryIdx] = top.([]int)[0]
			}
		}
	}
	return ans
}
```

```kotlin
data class Event(val time: Int, val type: Int, val sizeOrQueryIndex: Int, val idx: Int)

class Solution {
    fun minInterval(intervals: Array<IntArray>, queries: IntArray): IntArray {
        val events = mutableListOf<Event>()
        
        // Create events for intervals
        for ((idx, interval) in intervals.withIndex()) {
            val (start, end) = interval
            val size = end - start + 1
            events.add(Event(start, 0, size, idx))
            events.add(Event(end, 2, size, idx))
        }
        
        // Create events for queries
        for ((i, q) in queries.withIndex()) {
            events.add(Event(q, 1, i, -1))
        }
        
        // Sort events by time and type
        events.sortWith(compareBy({ it.time }, { it.type }))
        
        val sizes = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })
        val ans = IntArray(queries.size) { -1 }
        val inactive = BooleanArray(intervals.size)
        
        for (event in events) {
            when (event.type) {
                0 -> { // Interval start
                    sizes.add(Pair(event.sizeOrQueryIndex, event.idx))
                }
                2 -> { // Interval end
                    inactive[event.idx] = true
                }
                1 -> { // Query
                    val queryIdx = event.sizeOrQueryIndex
                    while (sizes.isNotEmpty() && inactive[sizes.peek().second]) {
                        sizes.poll()
                    }
                    if (sizes.isNotEmpty()) {
                        ans[queryIdx] = sizes.peek().first
                    }
                }
            }
        }
        
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((n + m) \log (n + m))$
* Space complexity: $O(n + m)$

> Where $m$ is the length of the array $queries$ and $n$ is the length of the array $intervals$.

---

## 3. Min Heap

::tabs-start

```python
class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        intervals.sort()
        minHeap = []
        res = {}
        i = 0
        for q in sorted(queries):
            while i < len(intervals) and intervals[i][0] <= q:
                l, r = intervals[i]
                heapq.heappush(minHeap, (r - l + 1, r))
                i += 1

            while minHeap and minHeap[0][1] < q:
                heapq.heappop(minHeap)
            res[q] = minHeap[0][0] if minHeap else -1
        return [res[q] for q in queries]
```

```java
public class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        Map<Integer, Integer> res = new HashMap<>();
        int i = 0;
        for (int q : Arrays.stream(queries).sorted().toArray()) {
            while (i < intervals.length && intervals[i][0] <= q) {
                int l = intervals[i][0];
                int r = intervals[i][1];
                minHeap.offer(new int[]{r - l + 1, r});
                i++;
            }

            while (!minHeap.isEmpty() && minHeap.peek()[1] < q) {
                minHeap.poll();
            }
            res.put(q, minHeap.isEmpty() ? -1 : minHeap.peek()[0]);
        }
        int[] result = new int[queries.length];
        for (int j = 0; j < queries.length; j++) {
            result[j] = res.get(queries[j]);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        // Sort intervals based on the start value
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[0] < b[0];
        });

        vector<int> sortedQueries = queries;
        sort(sortedQueries.begin(), sortedQueries.end());
        map<int, int> res;

        auto cmp = [](const vector<int>& a, const vector<int>& b) {
            return a[0] > b[0] || (a[0] == b[0] && a[1] > b[1]);
        };
        priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> minHeap(cmp);

        int i = 0;
        for (int q : sortedQueries) {
            while (i < intervals.size() && intervals[i][0] <= q) {
                int l = intervals[i][0];
                int r = intervals[i][1];
                minHeap.push({r - l + 1, r});
                i++;
            }

            while (!minHeap.empty() && minHeap.top()[1] < q) {
                minHeap.pop();
            }

            res[q] = minHeap.empty() ? -1 : minHeap.top()[0];
        }

        vector<int> result(queries.size());
        for (int j = 0; j < queries.size(); j++) {
            result[j] = res[queries[j]];
        }
        return result;
    }
};
```

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} queries
     * @return {number[]}
     */
    minInterval(intervals, queries) {
        intervals.sort((a, b) => a[0] - b[0]);
        const minHeap = new MinPriorityQueue(entry => entry[0]);
        const res = {};
        let i = 0;

        const sortedQueries = [...queries].sort((a, b) => a - b);

        for (const q of sortedQueries) {
            while (i < intervals.length && intervals[i][0] <= q) {
                const [l, r] = intervals[i];
                minHeap.enqueue([r - l + 1, r]);
                i += 1;
            }

            while (!minHeap.isEmpty() && minHeap.front()[1] < q) {
                minHeap.dequeue();
            }

            res[q] = !minHeap.isEmpty() ? minHeap.front()[0] : -1;
        }

        return queries.map(q => res[q]);
    }
}
```

```csharp
public class Solution {
    public int[] MinInterval(int[][] intervals, int[] queries) {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));

        var minHeap = new PriorityQueue<(int Size, int End), int>();
        var res = new Dictionary<int, int>();
        int i = 0;

        int[] sortedQueries = queries.OrderBy(q => q).ToArray();
        foreach (int q in sortedQueries) {
            while (i < intervals.Length && intervals[i][0] <= q) {
                int l = intervals[i][0];
                int r = intervals[i][1];
                minHeap.Enqueue((r - l + 1, r), r - l + 1);
                i++;
            }

            while (minHeap.Count > 0 && minHeap.Peek().End < q) {
                minHeap.Dequeue();
            }

            res[q] = minHeap.Count == 0 ? -1 : minHeap.Peek().Size;
        }

        int[] result = new int[queries.Length];
        for (int j = 0; j < queries.Length; j++) {
            result[j] = res[queries[j]];
        }

        return result;
    }
}
```

```go
func minInterval(intervals [][]int, queries []int) []int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    
    queriesWithIdx := make([][2]int, len(queries))
    for i, q := range queries {
        queriesWithIdx[i] = [2]int{q, i}
    }
    sort.Slice(queriesWithIdx, func(i, j int) bool {
        return queriesWithIdx[i][0] < queriesWithIdx[j][0]
    })
    
    comparator := func(a, b interface{}) int {
        pair1 := a.([2]int)
        pair2 := b.([2]int)
        if pair1[0] != pair2[0] {
            if pair1[0] < pair2[0] {
                return -1
            }
            return 1
        }
        return 0
    }
    
    pq := priorityqueue.NewWith(comparator)
    res := make([]int, len(queries))
    i := 0
    
    for _, qPair := range queriesWithIdx {
        q, originalIdx := qPair[0], qPair[1]
        
        for i < len(intervals) && intervals[i][0] <= q {
            size := intervals[i][1] - intervals[i][0] + 1
            pq.Enqueue([2]int{size, intervals[i][1]})
            i++
        }
        
        for !pq.Empty() {
            if top, _ := pq.Peek(); top.([2]int)[1] < q {
                pq.Dequeue()
            } else {
                break
            }
        }
        
        if !pq.Empty() {
            if top, _ := pq.Peek(); true {
                res[originalIdx] = top.([2]int)[0]
            }
        } else {
            res[originalIdx] = -1
        }
    }
    
    return res
}
```

```kotlin
class Solution {
    fun minInterval(intervals: Array<IntArray>, queries: IntArray): IntArray {
        intervals.sortBy { it[0] }
        
        val queriesWithIndex = queries.withIndex()
            .map { it.value to it.index }
            .sortedBy { it.first }
            
        val minHeap = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })
        val result = IntArray(queries.size)
        var i = 0
        
        for ((q, originalIdx) in queriesWithIndex) {
            while (i < intervals.size && intervals[i][0] <= q) {
                val size = intervals[i][1] - intervals[i][0] + 1
                minHeap.offer(size to intervals[i][1])
                i++
            }
            
            while (minHeap.isNotEmpty() && minHeap.peek().second < q) {
                minHeap.poll()
            }
            
            result[originalIdx] = if (minHeap.isNotEmpty()) minHeap.peek().first else -1
        }
        
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n + m \log m)$
* Space complexity: $O(n + m)$

> Where $m$ is the length of the array $queries$ and $n$ is the length of the array $intervals$.

---

## 4. Min Segment Tree (Lazy Propagation)

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        self.tree = [float('inf')] * (4 * N)
        self.lazy = [float('inf')] * (4 * N)

    def propagate(self, treeidx, lo, hi):
        if self.lazy[treeidx] != float('inf'):
            self.tree[treeidx] = min(self.tree[treeidx], self.lazy[treeidx])
            if lo != hi:
                self.lazy[2 * treeidx + 1] = min(self.lazy[2 * treeidx + 1], self.lazy[treeidx])
                self.lazy[2 * treeidx + 2] = min(self.lazy[2 * treeidx + 2], self.lazy[treeidx])
            self.lazy[treeidx] = float('inf')

    def update(self, treeidx, lo, hi, left, right, val):
        self.propagate(treeidx, lo, hi)
        if lo > right or hi < left:
            return
        if lo >= left and hi <= right:
            self.lazy[treeidx] = min(self.lazy[treeidx], val)
            self.propagate(treeidx, lo, hi)
            return
        mid = (lo + hi) // 2
        self.update(2 * treeidx + 1, lo, mid, left, right, val)
        self.update(2 * treeidx + 2, mid + 1, hi, left, right, val)
        self.tree[treeidx] = min(self.tree[2 * treeidx + 1], self.tree[2 * treeidx + 2])

    def query(self, treeidx, lo, hi, idx):
        self.propagate(treeidx, lo, hi)
        if lo == hi:
            return self.tree[treeidx]
        mid = (lo + hi) // 2
        if idx <= mid:
            return self.query(2 * treeidx + 1, lo, mid, idx)
        else:
            return self.query(2 * treeidx + 2, mid + 1, hi, idx)

    def update_range(self, left, right, val):
        self.update(0, 0, self.n - 1, left, right, val)

    def query_point(self, idx):
        return self.query(0, 0, self.n - 1, idx)

class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        points = []
        for interval in intervals:
            points.append(interval[0])
            points.append(interval[1])
        for q in queries:
            points.append(q)

        # Compress the coordinates
        points = sorted(set(points))
        compress = {points[i]: i for i in range(len(points))}

        # Lazy Segment Tree
        segTree = SegmentTree(len(points))

        for interval in intervals:
            start = compress[interval[0]]
            end = compress[interval[1]]
            length = interval[1] - interval[0] + 1
            segTree.update_range(start, end, length)

        ans = []
        for q in queries:
            idx = compress[q]
            
            # query for minSize
            res = segTree.query_point(idx)
            ans.append(res if res != float('inf') else -1)
        return ans
```

```java
public class SegmentTree {
    int n;
    int[] tree;
    int[] lazy;

    SegmentTree(int N) {
        this.n = N;
        tree = new int[4 * N];
        lazy = new int[4 * N];
        Arrays.fill(tree, Integer.MAX_VALUE);
        Arrays.fill(lazy, Integer.MAX_VALUE);
    }

    void propagate(int treeidx, int lo, int hi) {
        if (lazy[treeidx] != Integer.MAX_VALUE) {
            tree[treeidx] = Math.min(tree[treeidx], lazy[treeidx]);
            if (lo != hi) {
                lazy[2 * treeidx + 1] = Math.min(lazy[2 * treeidx + 1], lazy[treeidx]);
                lazy[2 * treeidx + 2] = Math.min(lazy[2 * treeidx + 2], lazy[treeidx]);
            }
            lazy[treeidx] = Integer.MAX_VALUE;
        }
    }

    void update(int treeidx, int lo, int hi, int left, int right, int val) {
        propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            lazy[treeidx] = Math.min(lazy[treeidx], val);
            propagate(treeidx, lo, hi);
            return;
        }
        int mid = (lo + hi) / 2;
        update(2 * treeidx + 1, lo, mid, left, right, val);
        update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        tree[treeidx] = Math.min(tree[2 * treeidx + 1], tree[2 * treeidx + 2]);
    }

    int query(int treeidx, int lo, int hi, int idx) {
        propagate(treeidx, lo, hi);
        if (lo == hi) return tree[treeidx];
        int mid = (lo + hi) / 2;
        if (idx <= mid) return query(2 * treeidx + 1, lo, mid, idx);
        else return query(2 * treeidx + 2, mid + 1, hi, idx);
    }

    void update(int left, int right, int val) {
        update(0, 0, n - 1, left, right, val);
    }

    int query(int idx) {
        return query(0, 0, n - 1, idx);
    }
}

public class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        List<Integer> points = new ArrayList<>();
        for (int[] interval : intervals) {
            points.add(interval[0]);
            points.add(interval[1]);
        }
        for (int q : queries) {
            points.add(q);
        }
        points = new ArrayList<>(new HashSet<>(points));
        Collections.sort(points);

        // Compress the points to indices
        Map<Integer, Integer> compress = new HashMap<>();
        for (int i = 0; i < points.size(); i++) {
            compress.put(points.get(i), i);
        }

        // Create the segment tree
        SegmentTree segTree = new SegmentTree(points.size());

        // Update the segment tree with intervals
        for (int[] interval : intervals) {
            int start = compress.get(interval[0]);
            int end = compress.get(interval[1]);
            int length = interval[1] - interval[0] + 1;
            segTree.update(start, end, length);
        }

        // Query the segment tree for each query
        int[] ans = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            int idx = compress.get(queries[i]);
            int res = segTree.query(idx);
            ans[i] = (res == Integer.MAX_VALUE) ? -1 : res;
        }

        return ans;
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;
    vector<int> lazy;

    SegmentTree(int N) {
        this->n = N;
        tree.assign(4 * N, INT_MAX);
        lazy.assign(4 * N, INT_MAX);
    }

    void propagate(int treeidx, int lo, int hi) {
        if (lazy[treeidx] != INT_MAX) {
            tree[treeidx] = min(tree[treeidx], lazy[treeidx]);
            if (lo != hi) {
                lazy[2 * treeidx + 1] = min(lazy[2 * treeidx + 1], lazy[treeidx]);
                lazy[2 * treeidx + 2] = min(lazy[2 * treeidx + 2], lazy[treeidx]);
            }
            lazy[treeidx] = INT_MAX;
        }
    }

    void update(int treeidx, int lo, int hi, int left, int right, int val) {
        propagate(treeidx, lo, hi);
        
        if (lo > right || hi < left) return;

        if (lo >= left && hi <= right) {
            lazy[treeidx] = min(lazy[treeidx], val);
            propagate(treeidx, lo, hi);
            return;
        }

        int mid = (lo + hi) / 2;
        update(2 * treeidx + 1, lo, mid, left, right, val);
        update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        
        tree[treeidx] = min(tree[2 * treeidx + 1], tree[2 * treeidx + 2]);
    }

    int query(int treeidx, int lo, int hi, int idx) {
        propagate(treeidx, lo, hi);
        if (lo == hi) return tree[treeidx];
        
        int mid = (lo + hi) / 2;
        if (idx <= mid) return query(2 * treeidx + 1, lo, mid, idx);
        else return query(2 * treeidx + 2, mid + 1, hi, idx);
    }

    void update(int left, int right, int val) {
        update(0, 0, n - 1, left, right, val);
    }

    int query(int idx) {
        return query(0, 0, n - 1, idx);
    }
};

class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        vector<int> points;

        for (const auto& interval : intervals) {
            points.push_back(interval[0]);
            points.push_back(interval[1]);
        }
        for (int q : queries) {
            points.push_back(q);
        }

        sort(points.begin(), points.end());
        points.erase(unique(points.begin(), points.end()), points.end());

        // compress the coordinates
        unordered_map<int, int> compress;
        for (int i = 0; i < points.size(); ++i) {
            compress[points[i]] = i;
        }

        SegmentTree segTree(points.size());

        for (const auto& interval : intervals) {
            int start = compress[interval[0]];
            int end = compress[interval[1]];
            int len = interval[1] - interval[0] + 1;
            segTree.update(start, end, len);
        }

        vector<int> ans;
        for (int q : queries) {
            int idx = compress[q];
            int res = segTree.query(idx);
            ans.push_back(res == INT_MAX ? -1 : res);
        }

        return ans;
    }
};
```

```javascript
class SegmentTree {
    constructor(N) {
        this.n = N;
        this.tree = new Array(4 * N).fill(Infinity);
        this.lazy = new Array(4 * N).fill(Infinity);
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @return {void}
     */
    propagate(treeidx, lo, hi) {
        if (this.lazy[treeidx] !== Infinity) {
            this.tree[treeidx] = Math.min(this.tree[treeidx], this.lazy[treeidx]);
            if (lo !== hi) {
                this.lazy[2 * treeidx + 1] = Math.min(this.lazy[2 * treeidx + 1], this.lazy[treeidx]);
                this.lazy[2 * treeidx + 2] = Math.min(this.lazy[2 * treeidx + 2], this.lazy[treeidx]);
            }
            this.lazy[treeidx] = Infinity;
        }
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @param {number} left
     * @param {number} right
     * @param {number} val
     * @return {void}
     */
    update(treeidx, lo, hi, left, right, val) {
        this.propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            this.lazy[treeidx] = Math.min(this.lazy[treeidx], val);
            this.propagate(treeidx, lo, hi);
            return;
        }
        const mid = Math.floor((lo + hi) / 2);
        this.update(2 * treeidx + 1, lo, mid, left, right, val);
        this.update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        this.tree[treeidx] = Math.min(this.tree[2 * treeidx + 1], this.tree[2 * treeidx + 2]);
    }

    /**
     * @param {number} treeidx
     * @param {number} lo
     * @param {number} hi
     * @param {number} idx
     * @return {number}
     */
    query(treeidx, lo, hi, idx) {
        this.propagate(treeidx, lo, hi);
        if (lo === hi) return this.tree[treeidx];
        const mid = Math.floor((lo + hi) / 2);
        if (idx <= mid) return this.query(2 * treeidx + 1, lo, mid, idx);
        else return this.query(2 * treeidx + 2, mid + 1, hi, idx);
    }

    /**
     * @param {number} left
     * @param {number} right
     * @param {number} val
     * @return {number}
     */
    updateRange(left, right, val) {
        this.update(0, 0, this.n - 1, left, right, val);
    }

    /**
     * @param {number} idx
     * @return {number}
     */
    queryPoint(idx) {
        return this.query(0, 0, this.n - 1, idx);
    }
}

class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} queries
     * @return {number[]}
     */
    minInterval(intervals, queries) {
        const points = [];
        for (const interval of intervals) {
            points.push(interval[0]);
            points.push(interval[1]);
        }
        for (const q of queries) {
            points.push(q);
        }
        const uniquePoints = [...new Set(points)].sort((a, b) => a - b);
        const compress = new Map();
        uniquePoints.forEach((point, idx) => {
            compress.set(point, idx);
        });
        const segTree = new SegmentTree(uniquePoints.length);
        for (const interval of intervals) {
            const start = compress.get(interval[0]);
            const end = compress.get(interval[1]);
            const length = interval[1] - interval[0] + 1;
            segTree.updateRange(start, end, length);
        }
        const ans = [];
        for (const q of queries) {
            const idx = compress.get(q);
            const res = segTree.queryPoint(idx);
            ans.push(res === Infinity ? -1 : res);
        }
        return ans;
    }
}
```

```csharp
public class SegmentTree {
    public int n;
    public int[] tree;
    public int[] lazy;

    public SegmentTree(int N) {
        this.n = N;
        tree = new int[4 * N];
        lazy = new int[4 * N];
        Array.Fill(tree, int.MaxValue);
        Array.Fill(lazy, int.MaxValue);
    }

    public void Propagate(int treeidx, int lo, int hi) {
        if (lazy[treeidx] != int.MaxValue) {
            tree[treeidx] = Math.Min(tree[treeidx], lazy[treeidx]);
            if (lo != hi) {
                lazy[2 * treeidx + 1] = Math.Min(lazy[2 * treeidx + 1], lazy[treeidx]);
                lazy[2 * treeidx + 2] = Math.Min(lazy[2 * treeidx + 2], lazy[treeidx]);
            }
            lazy[treeidx] = int.MaxValue;
        }
    }

    public void Update(int treeidx, int lo, int hi, int left, int right, int val) {
        Propagate(treeidx, lo, hi);
        if (lo > right || hi < left) return;
        if (lo >= left && hi <= right) {
            lazy[treeidx] = Math.Min(lazy[treeidx], val);
            Propagate(treeidx, lo, hi);
            return;
        }
        int mid = (lo + hi) / 2;
        Update(2 * treeidx + 1, lo, mid, left, right, val);
        Update(2 * treeidx + 2, mid + 1, hi, left, right, val);
        tree[treeidx] = Math.Min(tree[2 * treeidx + 1], tree[2 * treeidx + 2]);
    }

    public int Query(int treeidx, int lo, int hi, int idx) {
        Propagate(treeidx, lo, hi);
        if (lo == hi) return tree[treeidx];
        int mid = (lo + hi) / 2;
        if (idx <= mid) return Query(2 * treeidx + 1, lo, mid, idx);
        else return Query(2 * treeidx + 2, mid + 1, hi, idx);
    }

    public void Update(int left, int right, int val) {
        Update(0, 0, n - 1, left, right, val);
    }

    public int Query(int idx) {
        return Query(0, 0, n - 1, idx);
    }
}

public class Solution {
    public int[] MinInterval(int[][] intervals, int[] queries) {
        List<int> points = new List<int>();
        foreach (var interval in intervals) {
            points.Add(interval[0]);
            points.Add(interval[1]);
        }
        foreach (var q in queries) {
            points.Add(q);
        }
        points.Sort();
        points = new List<int>(new HashSet<int>(points));
        Dictionary<int, int> compress = new Dictionary<int, int>();
        for (int i = 0; i < points.Count; i++) {
            compress[points[i]] = i;
        }
        SegmentTree segTree = new SegmentTree(points.Count);
        foreach (var interval in intervals) {
            int start = compress[interval[0]];
            int end = compress[interval[1]];
            int length = interval[1] - interval[0] + 1;
            segTree.Update(start, end, length);
        }
        int[] ans = new int[queries.Length];
        for (int i = 0; i < queries.Length; i++) {
            int idx = compress[queries[i]];
            int res = segTree.Query(idx);
            ans[i] = (res == int.MaxValue) ? -1 : res;
        }
        return ans;
    }
}
```

```go
type SegmentTree struct {
    n    int
    tree []int
    lazy []int
}

func NewSegmentTree(n int) *SegmentTree {
    tree := make([]int, 4*n)
    lazy := make([]int, 4*n)
    for i := range tree {
        tree[i] = math.MaxInt32
        lazy[i] = math.MaxInt32
    }
    return &SegmentTree{n: n, tree: tree, lazy: lazy}
}

func (st *SegmentTree) propagate(treeIdx, lo, hi int) {
    if st.lazy[treeIdx] != math.MaxInt32 {
        st.tree[treeIdx] = min(st.tree[treeIdx], st.lazy[treeIdx])
        if lo != hi {
            st.lazy[2*treeIdx+1] = min(st.lazy[2*treeIdx+1], st.lazy[treeIdx])
            st.lazy[2*treeIdx+2] = min(st.lazy[2*treeIdx+2], st.lazy[treeIdx])
        }
        st.lazy[treeIdx] = math.MaxInt32
    }
}

func (st *SegmentTree) updateRange(treeIdx, lo, hi, left, right, val int) {
    st.propagate(treeIdx, lo, hi)
    if lo > right || hi < left {
        return
    }
    if lo >= left && hi <= right {
        st.lazy[treeIdx] = min(st.lazy[treeIdx], val)
        st.propagate(treeIdx, lo, hi)
        return
    }
    mid := (lo + hi) / 2
    st.updateRange(2*treeIdx+1, lo, mid, left, right, val)
    st.updateRange(2*treeIdx+2, mid+1, hi, left, right, val)
    st.tree[treeIdx] = min(st.tree[2*treeIdx+1], st.tree[2*treeIdx+2])
}

func (st *SegmentTree) queryPoint(treeIdx, lo, hi, idx int) int {
    st.propagate(treeIdx, lo, hi)
    if lo == hi {
        return st.tree[treeIdx]
    }
    mid := (lo + hi) / 2
    if idx <= mid {
        return st.queryPoint(2*treeIdx+1, lo, mid, idx)
    }
    return st.queryPoint(2*treeIdx+2, mid+1, hi, idx)
}

func (st *SegmentTree) Update(left, right, val int) {
    st.updateRange(0, 0, st.n-1, left, right, val)
}

func (st *SegmentTree) Query(idx int) int {
    return st.queryPoint(0, 0, st.n-1, idx)
}

func minInterval(intervals [][]int, queries []int) []int {
    points := make(map[int]bool)
    for _, interval := range intervals {
        points[interval[0]] = true
        points[interval[1]] = true
    }
    for _, q := range queries {
        points[q] = true
    }
    
    pointsList := make([]int, 0, len(points))
    for point := range points {
        pointsList = append(pointsList, point)
    }
    sort.Ints(pointsList)
    
    compress := make(map[int]int)
    for i, point := range pointsList {
        compress[point] = i
    }
    
    segTree := NewSegmentTree(len(pointsList))
    
    for _, interval := range intervals {
        start := compress[interval[0]]
        end := compress[interval[1]]
        length := interval[1] - interval[0] + 1
        segTree.Update(start, end, length)
    }
    
    ans := make([]int, len(queries))
    for i, q := range queries {
        idx := compress[q]
        res := segTree.Query(idx)
        if res == math.MaxInt32 {
            ans[i] = -1
        } else {
            ans[i] = res
        }
    }
    
    return ans
}
```

```kotlin
class SegmentTree(private val n: Int) {
    private val tree = IntArray(4 * n) { Int.MAX_VALUE }
    private val lazy = IntArray(4 * n) { Int.MAX_VALUE }
    
    private fun propagate(treeIdx: Int, lo: Int, hi: Int) {
        if (lazy[treeIdx] != Int.MAX_VALUE) {
            tree[treeIdx] = minOf(tree[treeIdx], lazy[treeIdx])
            if (lo != hi) {
                lazy[2 * treeIdx + 1] = minOf(lazy[2 * treeIdx + 1], lazy[treeIdx])
                lazy[2 * treeIdx + 2] = minOf(lazy[2 * treeIdx + 2], lazy[treeIdx])
            }
            lazy[treeIdx] = Int.MAX_VALUE
        }
    }
    
    private fun updateRange(treeIdx: Int, lo: Int, hi: Int, left: Int, right: Int, value: Int) {
        propagate(treeIdx, lo, hi)
        if (lo > right || hi < left) return
        if (lo >= left && hi <= right) {
            lazy[treeIdx] = minOf(lazy[treeIdx], value)
            propagate(treeIdx, lo, hi)
            return
        }
        val mid = (lo + hi) / 2
        updateRange(2 * treeIdx + 1, lo, mid, left, right, value)
        updateRange(2 * treeIdx + 2, mid + 1, hi, left, right, value)
        tree[treeIdx] = minOf(tree[2 * treeIdx + 1], tree[2 * treeIdx + 2])
    }
    
    private fun queryPoint(treeIdx: Int, lo: Int, hi: Int, idx: Int): Int {
        propagate(treeIdx, lo, hi)
        if (lo == hi) return tree[treeIdx]
        val mid = (lo + hi) / 2
        return if (idx <= mid) {
            queryPoint(2 * treeIdx + 1, lo, mid, idx)
        } else {
            queryPoint(2 * treeIdx + 2, mid + 1, hi, idx)
        }
    }
    
    fun update(left: Int, right: Int, value: Int) {
        updateRange(0, 0, n - 1, left, right, value)
    }
    
    fun query(idx: Int): Int {
        return queryPoint(0, 0, n - 1, idx)
    }
}

class Solution {
    fun minInterval(intervals: Array<IntArray>, queries: IntArray): IntArray {
        val points = mutableSetOf<Int>()
        intervals.forEach { interval ->
            points.add(interval[0])
            points.add(interval[1])
        }
        queries.forEach { points.add(it) }
        
        val pointsList = points.sorted()
        val compress = pointsList.withIndex().associate { it.value to it.index }
        
        val segTree = SegmentTree(pointsList.size)
        
        intervals.forEach { interval ->
            val start = compress[interval[0]]!!
            val end = compress[interval[1]]!!
            val length = interval[1] - interval[0] + 1
            segTree.update(start, end, length)
        }
        
        return queries.map { q ->
            val idx = compress[q]!!
            val res = segTree.query(idx)
            if (res == Int.MAX_VALUE) -1 else res
        }.toIntArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O((n + m)\log k)$
* Space complexity: $O(k)$

> Where $m$ is the length of the array $queries$, $n$ is the length of the array $intervals$ and $k$ is the number of unique points.