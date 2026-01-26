## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting** - Required to process meetings in order by start time
- **Min Heap / Priority Queue** - Used to efficiently track the earliest ending meeting room
- **Intervals** - Understanding how to detect and handle overlapping time intervals
- **Sweep Line Algorithm** - Alternative approach using event processing on a timeline
- **Two Pointers** - Used in the approach that separates start and end times

---

## 1. Min Heap

### Intuition

We want to find the **minimum number of meeting rooms** required so that no meetings overlap.

A useful way to think about this is:
- each meeting needs a room from its start time to its end time
- if a meeting starts **after or at the same time** another meeting ends, they can share the **same room**
- otherwise, we need a **new room**

To efficiently track room availability, we use a **min heap**:
- the heap stores the **end times** of meetings currently occupying rooms
- the smallest end time is always at the top, representing the room that frees up the earliest

As we process meetings in order of start time:
- if the earliest-ending meeting finishes before the current one starts, we can reuse that room
- otherwise, we must allocate a new room

The maximum size the heap reaches is the number of rooms needed.

### Algorithm

1. Sort all meetings by their start time.
2. Initialize an empty min heap `min_heap` to store meeting end times.
3. Iterate through each meeting in sorted order:
4. If the heap is not empty and the earliest end time (`min_heap[0]`) is less than or equal to the current meeting’s start:
   - pop the top of the heap (reuse that room)
5. Push the current meeting’s end time into the heap (occupy a room).
6. After processing all meetings:
   - the size of the heap represents the minimum number of rooms required
7. Return the size of the heap.

::tabs-start

```python
"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    def minMeetingRooms(self, intervals: List[Interval]) -> int:
        intervals.sort(key=lambda x: x.start)
        min_heap = []

        for interval in intervals:
            if min_heap and min_heap[0] <= interval.start:
                heapq.heappop(min_heap)
            heapq.heappush(min_heap, interval.end)

        return len(min_heap)
```

```java
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int minMeetingRooms(List<Interval> intervals) {
        intervals.sort((a, b) -> a.start - b.start);
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (Interval interval : intervals) {
            if (!minHeap.isEmpty() && minHeap.peek() <= interval.start) {
                minHeap.poll();
            }
            minHeap.offer(interval.end);
        }
        return minHeap.size();
    }
}
```

```cpp
/**
 * Definition of Interval:
 * class Interval {
 * public:
 *     int start, end;
 *     Interval(int start, int end) {
 *         this->start = start;
 *         this->end = end;
 *     }
 * }
 */

class Solution {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a.start < b.start;
        });
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (const auto& interval : intervals) {
            if (!minHeap.empty() && minHeap.top() <= interval.start) {
                minHeap.pop();
            }
            minHeap.push(interval.end);
        }
        return minHeap.size();
    }
};
```

```javascript
/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        intervals.sort((a, b) => a.start - b.start);
        const minHeap = new MinPriorityQueue();
        for (const interval of intervals) {
            if (!minHeap.isEmpty() && minHeap.front() <= interval.start) {
                minHeap.pop();
            }
            minHeap.push(interval.end);
        }
        return minHeap.size();
    }
}
```

```csharp
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int MinMeetingRooms(List<Interval> intervals) {
        intervals.Sort((a, b) => a.start.CompareTo(b.start));
        var minHeap = new PriorityQueue<int, int>();

        foreach (var interval in intervals) {
            if (minHeap.Count > 0 && minHeap.Peek() <= interval.start) {
                minHeap.Dequeue();
            }
            minHeap.Enqueue(interval.end, interval.end);
        }

        return minHeap.Count;
    }
}
```

```go
/**
 * Definition of Interval:
 * type Interval struct {
 *    start int
 *    end   int
 * }
 */

func minMeetingRooms(intervals []Interval) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i].start < intervals[j].start
    })

    pq := priorityqueue.NewWith(utils.IntComparator)

    for _, interval := range intervals {
        if pq.Size() > 0 {
            if top, _ := pq.Peek(); top.(int) <= interval.start {
                pq.Dequeue()
            }
        }
        pq.Enqueue(interval.end)
    }

    return pq.Size()
}
```

```kotlin
/**
 * Definition of Interval:
 * class Interval(var start: Int, var end: Int) {}
 */

class Solution {
    fun minMeetingRooms(intervals: List<Interval>): Int {
        intervals.sortBy { it.start }

        val minHeap = PriorityQueue<Int>()
        for (interval in intervals) {
            if (minHeap.isNotEmpty() && minHeap.peek() <= interval.start) {
                minHeap.poll()
            }
            minHeap.add(interval.end)
        }

        return minHeap.size
    }
}
```

```swift
/**
 * Definition of Interval:
 * class Interval {
 *     var start: Int
 *     var end: Int
 *     init(start: Int, end: Int) {
 *         self.start = start
 *         self.end = end
 *     }
 * }
 */

class Solution {
    func minMeetingRooms(_ intervals: [Interval]) -> Int {
        let sortedIntervals = intervals.sorted { $0.start < $1.start }
        var minHeap = Heap<Int>()
        for interval in sortedIntervals {
            if !minHeap.isEmpty, let earliest = minHeap.min!, earliest <= interval.start {
                minHeap.removeMin()
            }
            minHeap.insert(interval.end)
        }
        return minHeap.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Sweep Line Algorithm

### Intuition

We want to find the **minimum number of meeting rooms** needed so that no meetings overlap.

Instead of assigning rooms directly, we can look at the problem as a **timeline**:
- every meeting **starts** at a certain time
- every meeting **ends** at a certain time

At any point in time, the number of rooms required is simply:
> the number of meetings happening at that moment

The sweep line technique helps us track how this number changes over time by processing all start and end events in order.

### Algorithm

1. Create a map `mp` to record changes in the number of active meetings:
   - for each meeting:
     - increment `mp[start]` (a meeting starts)
     - decrement `mp[end]` (a meeting ends)
2. Initialize:
   - `prev` = `0` to track the number of ongoing meetings
   - `res` = `0` to store the maximum number of simultaneous meetings
3. Iterate through all time points in `mp` in **sorted order**:
4. At each time `i`:
   - update the current number of meetings:
     - `prev` += `mp[i]`
   - update the answer:
     - `res` = `max(res, prev)`
5. After processing all events, return `res`.

::tabs-start

```python
"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    def minMeetingRooms(self, intervals: List[Interval]) -> int:
        mp = defaultdict(int)
        for i in intervals:
            mp[i.start] += 1
            mp[i.end] -= 1
        prev = 0
        res = 0
        for i in sorted(mp.keys()):
            prev += mp[i]
            res = max(res, prev)
        return res
```

```java
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int minMeetingRooms(List<Interval> intervals) {
        TreeMap<Integer, Integer> mp = new TreeMap<>();
        for (Interval i : intervals) {
            mp.put(i.start, mp.getOrDefault(i.start, 0) + 1);
            mp.put(i.end, mp.getOrDefault(i.end, 0) - 1);
        }
        int prev = 0;
        int res = 0;
        for (int key : mp.keySet()) {
            prev += mp.get(key);
            res = Math.max(res, prev);
        }
        return res;
    }
}
```

```cpp
/**
 * Definition of Interval:
 * class Interval {
 * public:
 *     int start, end;
 *     Interval(int start, int end) {
 *         this->start = start;
 *         this->end = end;
 *     }
 * }
 */

class Solution {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        map<int, int> mp;
        for (auto& i : intervals) {
            mp[i.start]++;
            mp[i.end]--;
        }
        int prev = 0, res = 0;
        for (auto& [key, value] : mp) {
            prev += value;
            res = max(res, prev);
        }
        return res;
    }
};
```

```javascript
/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        const mp = new Map();
        for (const i of intervals) {
            mp.set(i.start, (mp.get(i.start) || 0) + 1);
            mp.set(i.end, (mp.get(i.end) || 0) - 1);
        }
        const sortedKeys = Array.from(mp.keys()).sort((a, b) => a - b);
        let prev = 0,
            res = 0;
        for (const key of sortedKeys) {
            prev += mp.get(key);
            res = Math.max(res, prev);
        }
        return res;
    }
}
```

```csharp
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int MinMeetingRooms(List<Interval> intervals) {
        var mp = new SortedDictionary<int, int>();
        foreach (var i in intervals) {
            if (!mp.ContainsKey(i.start)) mp[i.start] = 0;
            if (!mp.ContainsKey(i.end)) mp[i.end] = 0;
            mp[i.start]++;
            mp[i.end]--;
        }
        int prev = 0, res = 0;
        foreach (var kvp in mp) {
            prev += kvp.Value;
            res = Math.Max(res, prev);
        }
        return res;
    }
}
```

```go
/**
 * Definition of Interval:
 * type Interval struct {
 *    start int
 *    end   int
 * }
 */

func minMeetingRooms(intervals []Interval) int {
    mp := make(map[int]int)
    for _, i := range intervals {
        mp[i.start]++
        mp[i.end]--
    }

    keys := make([]int, 0, len(mp))
    for k := range mp {
        keys = append(keys, k)
    }
    sort.Ints(keys)

    prev := 0
    res := 0
    for _, k := range keys {
        prev += mp[k]
        if prev > res {
            res = prev
        }
    }
    return res
}
```

```kotlin
/**
 * Definition of Interval:
 * class Interval(var start: Int, var end: Int) {}
 */

class Solution {
    fun minMeetingRooms(intervals: List<Interval>): Int {
        val mp = HashMap<Int, Int>()
        for (i in intervals) {
            mp[i.start] = mp.getOrDefault(i.start, 0) + 1
            mp[i.end] = mp.getOrDefault(i.end, 0) - 1
        }

        val keys = mp.keys.sorted()
        var prev = 0
        var res = 0
        for (k in keys) {
            prev += mp[k]!!
            res = maxOf(res, prev)
        }
        return res
    }
}
```

```swift
/**
 * Definition of Interval:
 * class Interval {
 *     var start: Int
 *     var end: Int
 *     init(start: Int, end: Int) {
 *         self.start = start
 *         self.end = end
 *     }
 * }
 */

class Solution {
    func minMeetingRooms(_ intervals: [Interval]) -> Int {
        var mp = [Int: Int]()
        for interval in intervals {
            mp[interval.start, default: 0] += 1
            mp[interval.end, default: 0] -= 1
        }
        var prev = 0
        var res = 0
        for key in mp.keys.sorted() {
            prev += mp[key]!
            res = max(res, prev)
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

## 3. Two Pointers

### Intuition

We want to find the **minimum number of meeting rooms** required so that no meetings overlap.

Instead of tracking whole intervals, we can separate the problem into two simpler timelines:
- one list of **all start times**
- one list of **all end times**

If we process these timelines in order:
- whenever a meeting **starts before another one ends**, we need a **new room**
- whenever a meeting **ends before or at the same time another starts**, a room becomes **free**

By moving two pointers over the sorted start and end times, we can track how many meetings are happening at the same time.

The maximum number of simultaneous meetings at any moment is exactly the number of rooms we need.

### Algorithm

1. Create two arrays:
   - `start` → all meeting start times, sorted
   - `end` → all meeting end times, sorted
2. Initialize:
   - `s` = `0` → pointer for start times
   - `e` = `0` → pointer for end times
   - `count` = `0` → current number of ongoing meetings
   - `res` = `0` → maximum number of rooms needed
3. While there are still meetings to process (`s` < number of meetings):
4. If `start[s]` < `end[e]`:
   - a new meeting starts before the earliest one ends
   - increment `count` (need one more room)
   - move `s` forward
5. Else:
   - a meeting has ended
   - decrement `count` (a room is freed)
   - move `e` forward
6. Update `res` = `max(res, count)` after each step.
7. Return `res`.

::tabs-start

```python
"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    def minMeetingRooms(self, intervals: List[Interval]) -> int:
        start = sorted([i.start for i in intervals])
        end = sorted([i.end for i in intervals])

        res = count = 0
        s = e = 0
        while s < len(intervals):
            if start[s] < end[e]:
                s += 1
                count += 1
            else:
                e += 1
                count -= 1
            res = max(res, count)
        return res
```

```java
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int minMeetingRooms(List<Interval> intervals) {
        int n = intervals.size();
        int[] start = new int[n];
        int[] end = new int[n];

        for (int i = 0; i < n; i++) {
            start[i] = intervals.get(i).start;
            end[i] = intervals.get(i).end;
        }

        Arrays.sort(start);
        Arrays.sort(end);

        int res = 0, count = 0, s = 0, e = 0;
        while (s < n) {
            if (start[s] < end[e]) {
                s++;
                count++;
            } else {
                e++;
                count--;
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```cpp
/**
 * Definition of Interval:
 * class Interval {
 * public:
 *     int start, end;
 *     Interval(int start, int end) {
 *         this->start = start;
 *         this->end = end;
 *     }
 * }
 */

class Solution {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        vector<int> start, end;

        for (const auto& i : intervals) {
            start.push_back(i.start);
            end.push_back(i.end);
        }

        sort(start.begin(), start.end());
        sort(end.begin(), end.end());

        int res = 0, count = 0, s = 0, e = 0;
        while (s < intervals.size()) {
            if (start[s] < end[e]) {
                s++;
                count++;
            } else {
                e++;
                count--;
            }
            res = max(res, count);
        }
        return res;
    }
};
```

```javascript
/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        const start = intervals.map((i) => i.start).sort((a, b) => a - b);
        const end = intervals.map((i) => i.end).sort((a, b) => a - b);

        let res = 0,
            count = 0,
            s = 0,
            e = 0;
        while (s < intervals.length) {
            if (start[s] < end[e]) {
                s++;
                count++;
            } else {
                e++;
                count--;
            }
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```csharp
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int MinMeetingRooms(List<Interval> intervals) {
        int n = intervals.Count;
        int[] start = new int[n];
        int[] end = new int[n];

        for (int i = 0; i < n; i++) {
            start[i] = intervals[i].start;
            end[i] = intervals[i].end;
        }

        Array.Sort(start);
        Array.Sort(end);

        int res = 0, count = 0, s = 0, e = 0;
        while (s < n) {
            if (start[s] < end[e]) {
                s++;
                count++;
            } else {
                e++;
                count--;
            }
            res = Math.Max(res, count);
        }
        return res;
    }
}
```

```go
/**
 * Definition of Interval:
 * type Interval struct {
 *    start int
 *    end   int
 * }
 */

func minMeetingRooms(intervals []Interval) int {
    start := make([]int, len(intervals))
    end := make([]int, len(intervals))

    for i, interval := range intervals {
        start[i] = interval.start
        end[i] = interval.end
    }

    sort.Ints(start)
    sort.Ints(end)

    res, count := 0, 0
    s, e := 0, 0

    for s < len(intervals) {
        if start[s] < end[e] {
            s++
            count++
        } else {
            e++
            count--
        }
        if count > res {
            res = count
        }
    }

    return res
}
```

```kotlin
/**
 * Definition of Interval:
 * class Interval(var start: Int, var end: Int) {}
 */

class Solution {
    fun minMeetingRooms(intervals: List<Interval>): Int {
        val start = intervals.map { it.start }.sorted()
        val end = intervals.map { it.end }.sorted()

        var res = 0
        var count = 0
        var s = 0
        var e = 0

        while (s < intervals.size) {
            if (start[s] < end[e]) {
                s++
                count++
            } else {
                e++
                count--
            }
            res = maxOf(res, count)
        }

        return res
    }
}
```

```swift
/**
 * Definition of Interval:
 * class Interval {
 *     var start: Int
 *     var end: Int
 *     init(start: Int, end: Int) {
 *         self.start = start
 *         self.end = end
 *     }
 * }
 */

class Solution {
    func minMeetingRooms(_ intervals: [Interval]) -> Int {
        let starts = intervals.map { $0.start }.sorted()
        let ends = intervals.map { $0.end }.sorted()

        var res = 0, count = 0, s = 0, e = 0
        while s < intervals.count {
            if starts[s] < ends[e] {
                count += 1
                s += 1
            } else {
                count -= 1
                e += 1
            }
            res = max(res, count)
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

## 4. Greedy

### Intuition

We want to find the **minimum number of meeting rooms** required so that no meetings overlap.

Instead of thinking in terms of rooms directly, we can think in terms of **events on a timeline**:
- when a meeting **starts**, we need **one more room**
- when a meeting **ends**, one room is **freed**

So the problem reduces to:
> What is the **maximum number of meetings happening at the same time**?

If we track how the number of active meetings changes over time, the maximum value we ever reach is exactly the number of rooms we need.

This greedy approach works by:
- converting each meeting into two events (start and end)
- sorting all events by time
- sweeping from left to right while counting active meetings

### Algorithm

1. Create an empty list `time` to store events.
2. For each meeting interval:
   - add `(start, +1)` → meeting starts (need a room)
   - add `(end, -1)` → meeting ends (free a room)
3. Sort `time`:
   - primarily by time
   - secondarily by event type so that **end events (`-1`) are processed before start events (`+1`) at the same time**
4. Initialize:
   - `count` = `0` → current number of ongoing meetings
   - `res` = `0` → maximum number of rooms needed
5. Traverse the sorted `time` list:
   - add the event value (`+1` or `-1`) to `count`
   - update `res` = `max(res, count)`
6. After processing all events, return `res`.

::tabs-start

```python
"""
Definition of Interval:
class Interval(object):
    def __init__(self, start, end):
        self.start = start
        self.end = end
"""

class Solution:
    def minMeetingRooms(self, intervals: List[Interval]) -> int:
        time = []
        for i in intervals:
            time.append((i.start, 1))
            time.append((i.end, -1))

        time.sort(key=lambda x: (x[0], x[1]))

        res = count = 0
        for t in time:
            count += t[1]
            res = max(res, count)
        return res
```

```java
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int minMeetingRooms(List<Interval> intervals) {
        List<int[]> time = new ArrayList<>();
        for (Interval i : intervals) {
            time.add(new int[] { i.start, 1 });
            time.add(new int[] { i.end, -1 });
        }

        time.sort((a, b) -> a[0] == b[0] ? a[1] - b[1] : a[0] - b[0]);

        int res = 0, count = 0;
        for (int[] t : time) {
            count += t[1];
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```cpp
/**
 * Definition of Interval:
 * class Interval {
 * public:
 *     int start, end;
 *     Interval(int start, int end) {
 *         this->start = start;
 *         this->end = end;
 *     }
 * }
 */

class Solution {
public:
    int minMeetingRooms(vector<Interval>& intervals) {
        vector<pair<int, int>> time;
        for (const auto& i : intervals) {
            time.push_back({i.start, 1});
            time.push_back({i.end, -1});
        }

        sort(time.begin(), time.end(), [](auto& a, auto& b) {
            return a.first == b.first ? a.second < b.second : a.first < b.first;
        });

        int res = 0, count = 0;
        for (const auto& t : time) {
            count += t.second;
            res = max(res, count);
        }
        return res;
    }
};
```

```javascript
/**
 * Definition of Interval:
 * class Interval {
 *   constructor(start, end) {
 *     this.start = start;
 *     this.end = end;
 *   }
 * }
 */

class Solution {
    /**
     * @param {Interval[]} intervals
     * @returns {number}
     */
    minMeetingRooms(intervals) {
        const time = [];
        for (const i of intervals) {
            time.push([i.start, 1]);
            time.push([i.end, -1]);
        }

        time.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

        let res = 0,
            count = 0;
        for (const t of time) {
            count += t[1];
            res = Math.max(res, count);
        }
        return res;
    }
}
```

```csharp
/**
 * Definition of Interval:
 * public class Interval {
 *     public int start, end;
 *     public Interval(int start, int end) {
 *         this.start = start;
 *         this.end = end;
 *     }
 * }
 */

public class Solution {
    public int MinMeetingRooms(List<Interval> intervals) {
        List<int[]> time = new List<int[]>();
        foreach (var i in intervals) {
            time.Add(new int[] { i.start, 1 });
            time.Add(new int[] { i.end, -1 });
        }

        time.Sort((a, b) => a[0] == b[0] ?
            a[1].CompareTo(b[1]) : a[0].CompareTo(b[0]
        ));

        int res = 0, count = 0;
        foreach (var t in time) {
            count += t[1];
            res = Math.Max(res, count);
        }
        return res;
    }
}
```

```go
/**
 * Definition of Interval:
 * type Interval struct {
 *    start int
 *    end   int
 * }
 */

func minMeetingRooms(intervals []Interval) int {
	var time [][]int
	for _, i := range intervals {
		time = append(time, []int{i.start, 1})
		time = append(time, []int{i.end, -1})
	}

	sort.Slice(time, func(i, j int) bool {
		if time[i][0] == time[j][0] {
			return time[i][1] < time[j][1]
		}
		return time[i][0] < time[j][0]
	})

	res, count := 0, 0
	for _, t := range time {
		count += t[1]
		if count > res {
			res = count
		}
	}
	return res
}
```

```kotlin
/**
 * Definition of Interval:
 * class Interval(var start: Int, var end: Int) {}
 */

class Solution {
    fun minMeetingRooms(intervals: Array<IntArray>): Int {
        val time = mutableListOf<Pair<Int, Int>>()

        for (i in intervals) {
            time.add(Pair(i.start, 1))
            time.add(Pair(i.end, -1))
        }

        time.sortWith(compareBy<Pair<Int, Int>> { it.first }
            .thenBy { it.second })

        var res = 0
        var count = 0

        for (t in time) {
            count += t.second
            res = maxOf(res, count)
        }

        return res
    }
}
```

```swift
/**
 * Definition of Interval:
 * class Interval {
 *     var start: Int
 *     var end: Int
 *     init(start: Int, end: Int) {
 *         self.start = start
 *         self.end = end
 *     }
 * }
 */

class Solution {
    func minMeetingRooms(_ intervals: [Interval]) -> Int {
        var times = [(Int, Int)]()
        for interval in intervals {
            times.append((interval.start, 1))
            times.append((interval.end, -1))
        }

        times.sort {
            if $0.0 != $1.0 {
                return $0.0 < $1.0
            } else {
                return $0.1 < $1.1
            }
        }

        var count = 0
        var res = 0
        for t in times {
            count += t.1
            res = max(res, count)
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

## Common Pitfalls

### Using the Wrong Comparison for Room Reuse

When checking if a room can be reused, the condition should be `earliest_end_time <= current_start`, not `<`. A meeting ending at time `t` allows a room to be reused by a meeting starting at time `t`.

### Forgetting to Sort Meetings Before Processing

The min heap and two pointer approaches only work correctly when meetings are sorted by start time. Without sorting, you cannot determine the correct order of room allocation.

### Returning the Max Heap Size Instead of Tracking It

The heap size changes throughout processing. You need to track the maximum size the heap reaches during iteration, or simply return the final heap size if you only pop when reusing rooms.
