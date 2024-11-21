## 1. Linear Search

::tabs-start

```python
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        n = len(intervals)
        i = 0
        res = []

        while i < n and intervals[i][1] < newInterval[0]:
            res.append(intervals[i])
            i += 1

        while i < n and newInterval[1] >= intervals[i][0]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1
        res.append(newInterval)

        while i < n:
            res.append(intervals[i])
            i += 1

        return res
```

```java
public class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        int n = intervals.length, i = 0;
        List<int[]> res = new ArrayList<>();

        while (i < n && intervals[i][1] < newInterval[0]) {
            res.add(intervals[i]);
            i++;
        }

        while (i < n && newInterval[1] >= intervals[i][0]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);

        while (i < n) {
            res.add(intervals[i]);
            i++;
        }

        return res.toArray(new int[res.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        int n = intervals.size(), i = 0;
        vector<vector<int>> res;

        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i]);
            i++;
        }

        while (i < n && newInterval[1] >= intervals[i][0]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);

        while (i < n) {
            res.push_back(intervals[i]);
            i++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        let n = intervals.length,
        i = 0,
        res = [];

        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push(intervals[i]);
            i++;
        }

        while (i < n && newInterval[1] >= intervals[i][0]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push(newInterval);

        while (i < n) {
            res.push(intervals[i]);
            i++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] Insert(int[][] intervals, int[] newInterval) {
        var result = new List<int[]>();
        
        for(var i = 0; i < intervals.Length; i++) {
            if(newInterval[1] < intervals[i][0]) {
                result.Add(newInterval);
                result.AddRange(
                    intervals.AsEnumerable().Skip(i).ToArray());
                
                return result.ToArray();
            }
            else if(newInterval[0] > intervals[i][1]) {
                result.Add(intervals[i]);
            } else {
                newInterval[0] = Math.Min(intervals[i][0], newInterval[0]);
                newInterval[1] = Math.Max(intervals[i][1], newInterval[1]);
            }
        }
        
        result.Add(newInterval);
        
        return result.ToArray();
    }
}
```

```go
func insert(intervals [][]int, newInterval []int) [][]int {
    n := len(intervals)
    i := 0
    var res [][]int

    for i < n && intervals[i][1] < newInterval[0] {
        res = append(res, intervals[i])
        i++
    }

    for i < n && newInterval[1] >= intervals[i][0] {
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i++
    }
    res = append(res, newInterval)

    for i < n {
        res = append(res, intervals[i])
        i++
    }

    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun insert(intervals: Array<IntArray>, newInterval: IntArray): Array<IntArray> {
        val res = mutableListOf<IntArray>()
        var i = 0
        val n = intervals.size

        while (i < n && intervals[i][1] < newInterval[0]) {
            res.add(intervals[i])
            i++
        }

        var newStart = newInterval[0]
        var newEnd = newInterval[1]
        while (i < n && newEnd >= intervals[i][0]) {
            newStart = minOf(newStart, intervals[i][0])
            newEnd = maxOf(newEnd, intervals[i][1])
            i++
        }
        res.add(intArrayOf(newStart, newEnd))

        while (i < n) {
            res.add(intervals[i])
            i++
        }

        return res.toTypedArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        if not intervals:
            return [newInterval]

        n = len(intervals)
        target = newInterval[0]
        left, right = 0, n - 1

        while left <= right:
            mid = (left + right) // 2
            if intervals[mid][0] < target:
                left = mid + 1
            else:
                right = mid - 1

        intervals.insert(left, newInterval)

        res = []
        for interval in intervals:
            if not res or res[-1][1] < interval[0]:
                res.append(interval)
            else:
                res[-1][1] = max(res[-1][1], interval[1])
        return res
```

```java
public class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        if (intervals.length == 0) {
            return new int[][] { newInterval };
        }

        int n = intervals.length;
        int target = newInterval[0];
        int left = 0, right = n - 1;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        List<int[]> result = new ArrayList<>();
        for (int i = 0; i < left; i++) {
            result.add(intervals[i]);
        }
        result.add(newInterval);
        for (int i = left; i < n; i++) {
            result.add(intervals[i]);
        }

        List<int[]> merged = new ArrayList<>();
        for (int[] interval : result) {
            if (merged.isEmpty() ||
                merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                merged.get(merged.size() - 1)[1] = Math.max(
                    merged.get(merged.size() - 1)[1],
                    interval[1]
                );
            }
        }

        return merged.toArray(new int[0][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        if (intervals.empty()) {
            return {newInterval};
        }

        int n = intervals.size();
        int target = newInterval[0];
        int left = 0, right = n - 1;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        intervals.insert(intervals.begin() + left, newInterval);

        vector<vector<int>> res;
        for (const auto& interval : intervals) {
            if (res.empty() || res.back()[1] < interval[0]) {
                res.push_back(interval);
            } else {
                res.back()[1] = max(res.back()[1], interval[1]);
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
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        if (intervals.length === 0) {
            return [newInterval];
        }

        let n = intervals.length;
        let target = newInterval[0];
        let left = 0,
            right = n - 1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        intervals.splice(left, 0, newInterval);

        let res = [];
        for (let interval of intervals) {
            if (res.length === 0 || 
                res[res.length - 1][1] < interval[0]) {
                res.push(interval);
            } else {
                res[res.length - 1][1] = Math.max(
                    res[res.length - 1][1],
                    interval[1],
                );
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] Insert(int[][] intervals, int[] newInterval) {
        if (intervals.Length == 0) {
            return new int[][] { newInterval };
        }

        int n = intervals.Length;
        int target = newInterval[0];
        int left = 0, right = n - 1;

        while (left <= right) {
            int mid = (left + right) / 2;
            if (intervals[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        List<int[]> result = new List<int[]>();
        for (int i = 0; i < left; i++) {
            result.Add(intervals[i]);
        }

        result.Add(newInterval);
        for (int i = left; i < n; i++) {
            result.Add(intervals[i]);
        }

        List<int[]> merged = new List<int[]>();
        foreach (int[] interval in result) {
            if (merged.Count == 0 ||
                merged[merged.Count - 1][1] < interval[0]) {
                merged.Add(interval);
            } else {
                merged[merged.Count - 1][1] =
                    Math.Max(merged[merged.Count - 1][1], interval[1]);
            }
        }

        return merged.ToArray();
    }
}
```

```go
func insert(intervals [][]int, newInterval []int) [][]int {
    if len(intervals) == 0 {
        return [][]int{newInterval}
    }

    n := len(intervals)
    target := newInterval[0]
    left, right := 0, n-1

    for left <= right {
        mid := (left + right) / 2
        if intervals[mid][0] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    intervals = append(intervals[:left], append(
                [][]int{newInterval}, intervals[left:]...)...)

    var res [][]int
    for _, interval := range intervals {
        if len(res) == 0 || res[len(res)-1][1] < interval[0] {
            res = append(res, interval)
        } else {
            res[len(res)-1][1] = max(res[len(res)-1][1], interval[1])
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun insert(intervals: Array<IntArray>, newInterval: IntArray): Array<IntArray> {
        if (intervals.isEmpty()) {
            return arrayOf(newInterval)
        }

        var left = 0
        var right = intervals.size - 1
        val target = newInterval[0]

        while (left <= right) {
            val mid = (left + right) / 2
            if (intervals[mid][0] < target) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }

        val result = intervals.toMutableList()
        result.add(left, newInterval)

        val res = mutableListOf<IntArray>()
        for (interval in result) {
            if (res.isEmpty() || res.last()[1] < interval[0]) {
                res.add(interval)
            } else {
                res[res.size - 1][1] = maxOf(res.last()[1], interval[1])
            }
        }
        return res.toTypedArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 3. Greedy

::tabs-start

```python
class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        res = []

        for i in range(len(intervals)):
            if newInterval[1] < intervals[i][0]:
                res.append(newInterval)
                return res + intervals[i:]
            elif newInterval[0] > intervals[i][1]:
                res.append(intervals[i])
            else:
                newInterval = [
                    min(newInterval[0], intervals[i][0]),
                    max(newInterval[1], intervals[i][1]),
                ]
        res.append(newInterval)
        return res
```

```java
public class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        for (int[] interval : intervals) {
            if (newInterval == null || interval[1] < newInterval[0]) {
                res.add(interval);
            } else if (interval[0] > newInterval[1]) {
                res.add(newInterval);
                res.add(interval);
                newInterval = null;
            } else {
                newInterval[0] = Math.min(interval[0], newInterval[0]);
                newInterval[1] = Math.max(interval[1], newInterval[1]);
            }
        }
        if (newInterval != null) res.add(newInterval);
        return res.toArray(new int[res.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int newStart = newInterval[0];
        int newEnd = newInterval[1];
        int n = intervals.size();
        for (int i = 0; i < n; i++) {
            if (intervals[i][0] > newEnd) {
                res.push_back(newInterval);
                copy(intervals.begin() + i, intervals.end(), back_inserter(ans));
                return ans;
            } else if (intervals[i][1] < newStart) {
                res.push_back(intervals[i]);
            } else {
                newInterval[0] = min(newInterval[0], intervals[i][0]);
                newInterval[1] = max(newInterval[1], intervals[i][1]);
            }
        }
        res.push_back(newInterval);
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @param {number[]} newInterval
     * @return {number[][]}
     */
    insert(intervals, newInterval) {
        const res = [];
        for (const interval of intervals) {
            if (newInterval === null || interval[1] < newInterval[0]) {
                res.push(interval);
            } else if (interval[0] > newInterval[1]) {
                res.push(newInterval);
                res.push(interval);
                newInterval = null;
            } else {
                newInterval[0] = Math.min(interval[0], newInterval[0]);
                newInterval[1] = Math.max(interval[1], newInterval[1]);
            }
        }
        if (newInterval !== null) res.push(newInterval);
        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] Insert(int[][] intervals, int[] newInterval) {
        var result = new List<int[]>();
        
        for(var i = 0; i < intervals.Length; i++) {
            if(newInterval[1] < intervals[i][0]) {
                result.Add(newInterval);
                result.AddRange(intervals.AsEnumerable().Skip(i).ToArray());
                return result.ToArray();
            } else if(newInterval[0] > intervals[i][1]) {
                result.Add(intervals[i]);
            } else {
                newInterval[0] = Math.Min(intervals[i][0], newInterval[0]);
                newInterval[1] = Math.Max(intervals[i][1], newInterval[1]);
            }
        }
        
        result.Add(newInterval);
        return result.ToArray();
    }
}
```

```go
func insert(intervals [][]int, newInterval []int) [][]int {
    var res [][]int

    for i := 0; i < len(intervals); i++ {
        if newInterval[1] < intervals[i][0] {
            res = append(res, newInterval)
            return append(res, intervals[i:]...)
        } else if newInterval[0] > intervals[i][1] {
            res = append(res, intervals[i])
        } else {
            newInterval = []int{
                min(newInterval[0], intervals[i][0]),
                max(newInterval[1], intervals[i][1]),
            }
        }
    }
    res = append(res, newInterval)
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun insert(intervals: Array<IntArray>, newInterval: IntArray): Array<IntArray> {
        val res = mutableListOf<IntArray>()

        for (interval in intervals) {
            if (newInterval[1] < interval[0]) {
                res.add(newInterval)
                return (res + 
                        intervals.sliceArray(
                            intervals.indexOf(interval) until intervals.size
                        )).toTypedArray()
            } else if (newInterval[0] > interval[1]) {
                res.add(interval)
            } else {
                newInterval[0] = minOf(newInterval[0], interval[0])
                newInterval[1] = maxOf(newInterval[1], interval[1])
            }
        }
        res.add(newInterval)
        return res.toTypedArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$