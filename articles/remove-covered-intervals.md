## 1. Brute Force

### Intuition

An interval is "covered" if another interval completely contains it. We check every pair of intervals to see if one covers the other. For interval `i` to be covered by interval `j`, we need `j`'s start to be at or before `i`'s start, and `j`'s end to be at or after `i`'s end. We count how many intervals are not covered by any other.

### Algorithm

1. Start with the total count of intervals.
2. For each interval `i`, check all other intervals `j`.
3. If interval `j` covers interval `i` (starts earlier or equal, ends later or equal), decrement the count and move to the next interval.
4. Return the remaining count of uncovered intervals.

::tabs-start

```python
class Solution:
    def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
        n = len(intervals)
        res = n

        for i in range(n):
            for j in range(n):
                if (i != j and intervals[j][0] <= intervals[i][0] and
                    intervals[j][1] >= intervals[i][1]
                ):
                    res -= 1
                    break

        return res
```

```java
public class Solution {
    public int removeCoveredIntervals(int[][] intervals) {
        int n = intervals.length;
        int res = n;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j && intervals[j][0] <= intervals[i][0] &&
                    intervals[j][1] >= intervals[i][1]) {
                    res--;
                    break;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int removeCoveredIntervals(vector<vector<int>>& intervals) {
        int n = intervals.size();
        int res = n;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j && intervals[j][0] <= intervals[i][0] &&
                    intervals[j][1] >= intervals[i][1]) {
                    res--;
                    break;
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    removeCoveredIntervals(intervals) {
        let n = intervals.length;
        let res = n;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (
                    i !== j &&
                    intervals[j][0] <= intervals[i][0] &&
                    intervals[j][1] >= intervals[i][1]
                ) {
                    res--;
                    break;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int RemoveCoveredIntervals(int[][] intervals) {
        int n = intervals.Length;
        int res = n;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i != j && intervals[j][0] <= intervals[i][0] &&
                    intervals[j][1] >= intervals[i][1]) {
                    res--;
                    break;
                }
            }
        }
        return res;
    }
}
```

```go
func removeCoveredIntervals(intervals [][]int) int {
    n := len(intervals)
    res := n

    for i := 0; i < n; i++ {
        for j := 0; j < n; j++ {
            if i != j && intervals[j][0] <= intervals[i][0] &&
                intervals[j][1] >= intervals[i][1] {
                res--
                break
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun removeCoveredIntervals(intervals: Array<IntArray>): Int {
        val n = intervals.size
        var res = n

        for (i in 0 until n) {
            for (j in 0 until n) {
                if (i != j && intervals[j][0] <= intervals[i][0] &&
                    intervals[j][1] >= intervals[i][1]) {
                    res--
                    break
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func removeCoveredIntervals(_ intervals: [[Int]]) -> Int {
        let n = intervals.count
        var res = n

        for i in 0..<n {
            for j in 0..<n {
                if i != j && intervals[j][0] <= intervals[i][0] &&
                    intervals[j][1] >= intervals[i][1] {
                    res -= 1
                    break
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Sorting - I

### Intuition

Sorting helps us process intervals in an order where we can easily detect covered intervals. By sorting by start time (ascending) and then by end time (descending), intervals that share the same start will have the longest one first. This means when we encounter a new interval, we only need to check if it's covered by the most recent "dominant" interval we've seen.

### Algorithm

1. Sort intervals by start time ascending, and by end time descending for ties.
2. Track the previous interval's boundaries.
3. For each interval, if it's completely contained within the previous interval's boundaries, skip it.
4. Otherwise, count it as uncovered and update the tracked boundaries.
5. Return the count of uncovered intervals.

::tabs-start

```python
class Solution:
    def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: (x[0], -x[1]))
        res = 1
        prevL, prevR = intervals[0][0], intervals[0][1]
        for l, r in intervals:
            if prevL <= l and prevR >= r:
                continue
            res += 1
            prevL, prevR = l, r

        return res
```

```java
public class Solution {
    public int removeCoveredIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) ->
            a[0] == b[0] ? Integer.compare(b[1], a[1]) : Integer.compare(a[0], b[0])
        );
        int res = 1, prevL = intervals[0][0], prevR = intervals[0][1];
        for (int[] interval : intervals) {
            int l = interval[0], r = interval[1];
            if (prevL <= l && prevR >= r) {
                continue;
            }
            res++;
            prevL = l;
            prevR = r;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int removeCoveredIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
            return a[0] == b[0] ? b[1] < a[1] : a[0] < b[0];
        });

        int res = 1, prevL = intervals[0][0], prevR = intervals[0][1];
        for (const auto& interval : intervals) {
            int l = interval[0], r = interval[1];
            if (prevL <= l && prevR >= r) {
                continue;
            }
            res++;
            prevL = l;
            prevR = r;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    removeCoveredIntervals(intervals) {
        intervals.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));
        let res = 1,
            [prevL, prevR] = intervals[0];
        for (const [l, r] of intervals) {
            if (prevL <= l && prevR >= r) {
                continue;
            }
            res++;
            prevL = l;
            prevR = r;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int RemoveCoveredIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) =>
            a[0] == b[0] ? b[1].CompareTo(a[1]) : a[0].CompareTo(b[0])
        );
        int res = 1, prevL = intervals[0][0], prevR = intervals[0][1];
        foreach (var interval in intervals) {
            int l = interval[0], r = interval[1];
            if (prevL <= l && prevR >= r) {
                continue;
            }
            res++;
            prevL = l;
            prevR = r;
        }
        return res;
    }
}
```

```go
func removeCoveredIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        if intervals[i][0] == intervals[j][0] {
            return intervals[i][1] > intervals[j][1]
        }
        return intervals[i][0] < intervals[j][0]
    })

    res := 1
    prevL, prevR := intervals[0][0], intervals[0][1]
    for _, interval := range intervals {
        l, r := interval[0], interval[1]
        if prevL <= l && prevR >= r {
            continue
        }
        res++
        prevL, prevR = l, r
    }
    return res
}
```

```kotlin
class Solution {
    fun removeCoveredIntervals(intervals: Array<IntArray>): Int {
        intervals.sortWith(compareBy({ it[0] }, { -it[1] }))
        var res = 1
        var prevL = intervals[0][0]
        var prevR = intervals[0][1]
        for ((l, r) in intervals) {
            if (prevL <= l && prevR >= r) {
                continue
            }
            res++
            prevL = l
            prevR = r
        }
        return res
    }
}
```

```swift
class Solution {
    func removeCoveredIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals.sorted {
            $0[0] == $1[0] ? $0[1] > $1[1] : $0[0] < $1[0]
        }
        var res = 1
        var prevL = intervals[0][0], prevR = intervals[0][1]
        for interval in intervals {
            let l = interval[0], r = interval[1]
            if prevL <= l && prevR >= r {
                continue
            }
            res += 1
            prevL = l
            prevR = r
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Sorting - II

### Intuition

With a simpler sort by start time only, we track the maximum end point seen so far. An interval is covered if both its start is greater than or equal to a previous start AND its end is within the maximum end we've tracked. By keeping the maximum end updated, we efficiently determine coverage in a single pass.

### Algorithm

1. Sort intervals by start time.
2. Track the start and maximum end of the current "dominant" interval.
3. For each interval, check if it extends beyond the current coverage (new start strictly greater AND new end strictly greater).
4. If so, it's a new uncovered interval. Update the tracked start and increment the count.
5. Always update the maximum end seen.
6. Return the count.

::tabs-start

```python
class Solution:
    def removeCoveredIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        res, start, end = 1, intervals[0][0], intervals[0][1]

        for l, r in intervals:
            if start < l and end < r:
                start = l
                res += 1
            end = max(end, r)

        return res
```

```java
public class Solution {
    public int removeCoveredIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        int res = 1, start = intervals[0][0], end = intervals[0][1];

        for (int[] interval : intervals) {
            int l = interval[0], r = interval[1];
            if (start < l && end < r) {
                start = l;
                res++;
            }
            end = Math.max(end, r);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int removeCoveredIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        int res = 1, start = intervals[0][0], end = intervals[0][1];

        for (const auto& interval : intervals) {
            int l = interval[0], r = interval[1];
            if (start < l && end < r) {
                start = l;
                res++;
            }
            end = max(end, r);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    removeCoveredIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        let res = 1,
            start = intervals[0][0],
            end = intervals[0][1];

        for (const [l, r] of intervals) {
            if (start < l && end < r) {
                start = l;
                res++;
            }
            end = Math.max(end, r);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int RemoveCoveredIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        int res = 1, start = intervals[0][0], end = intervals[0][1];

        foreach (var interval in intervals) {
            int l = interval[0], r = interval[1];
            if (start < l && end < r) {
                start = l;
                res++;
            }
            end = Math.Max(end, r);
        }
        return res;
    }
}
```

```go
func removeCoveredIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    res := 1
    start, end := intervals[0][0], intervals[0][1]
    for _, interval := range intervals {
        l, r := interval[0], interval[1]
        if start < l && end < r {
            start = l
            res++
        }
        if r > end {
            end = r
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun removeCoveredIntervals(intervals: Array<IntArray>): Int {
        intervals.sortBy { it[0] }
        var res = 1
        var start = intervals[0][0]
        var end = intervals[0][1]

        for ((l, r) in intervals) {
            if (start < l && end < r) {
                start = l
                res++
            }
            end = maxOf(end, r)
        }
        return res
    }
}
```

```swift
class Solution {
    func removeCoveredIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals.sorted { $0[0] < $1[0] }
        var res = 1
        var start = intervals[0][0], end = intervals[0][1]

        for interval in intervals {
            let l = interval[0], r = interval[1]
            if start < l && end < r {
                start = l
                res += 1
            }
            end = max(end, r)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
