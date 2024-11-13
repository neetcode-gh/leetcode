## 1. Min Heap

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 2. Sweep Line Algorithm

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
        let prev = 0, res = 0;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Two Pointers

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
        const start = intervals.map(i => i.start).sort((a, b) => a - b);
        const end = intervals.map(i => i.end).sort((a, b) => a - b);
        
        let res = 0, count = 0, s = 0, e = 0;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 4. Greedy

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
        
        time.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
        
        let res = 0, count = 0;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$