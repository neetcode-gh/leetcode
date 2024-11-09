## 1. Sorting

::tabs-start

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda pair: pair[0])
        output = [intervals[0]]

        for start, end in intervals:
            lastEnd = output[-1][1]

            if start <= lastEnd:
                output[-1][1] = max(lastEnd, end)
            else:
                output.append([start, end])
        return output
```

```java
public class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> output = new ArrayList<>();
        output.add(intervals[0]);

        for (int[] interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            int lastEnd = output.get(output.size() - 1)[1];

            if (start <= lastEnd) {
                output.get(output.size() - 1)[1] = Math.max(lastEnd, end);
            } else {
                output.add(new int[]{start, end});
            }
        }
        return output.toArray(new int[output.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> output;
        output.push_back(intervals[0]);

        for (auto& interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            int lastEnd = output.back()[1];

            if (start <= lastEnd) {
                output.back()[1] = max(lastEnd, end);
            } else {
                output.push_back({start, end});
            }
        }
        return output;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        const output = [];
        output.push(intervals[0]);

        for (const interval of intervals) {
            const start = interval[0];
            const end = interval[1];
            const lastEnd = output[output.length - 1][1];

            if (start <= lastEnd) {
                output[output.length - 1][1] = Math.max(lastEnd, end);
            } else {
                output.push([start, end]);
            }
        }
        return output;
    }
}
```

```csharp
public class Solution {
    public int[][] Merge(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        List<int[]> output = new List<int[]>();
        output.Add(intervals[0]);

        foreach (int[] interval in intervals) {
            int start = interval[0];
            int end = interval[1];
            int lastEnd = output[output.Count - 1][1];

            if (start <= lastEnd) {
                output[output.Count - 1][1] = Math.Max(lastEnd, end);
            } else {
                output.Add(new int[]{start, end});
            }
        }
        return output.ToArray();
    }
}
```

```go
func merge(intervals [][]int) [][]int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    output := [][]int{intervals[0]}

    for _, interval := range intervals[1:] {
        start, end := interval[0], interval[1]
        lastEnd := output[len(output)-1][1]

        if start <= lastEnd {
            output[len(output)-1][1] = max(lastEnd, end)
        } else {
            output = append(output, []int{start, end})
        }
    }
    return output
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
    fun merge(intervals: Array<IntArray>): Array<IntArray> {
        intervals.sortBy { it[0] }
        val output = mutableListOf(intervals[0])

        for (interval in intervals.slice(1 until intervals.size)) {
            val (start, end) = interval
            val lastEnd = output.last()[1]

            if (start <= lastEnd) {
                output[output.size - 1][1] = maxOf(lastEnd, end)
            } else {
                output.add(interval)
            }
        }
        return output.toTypedArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Sweep Line Algorithm

::tabs-start

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        mp = defaultdict(int)
        for start, end in intervals:
            mp[start] += 1
            mp[end] -= 1

        res = []
        interval = []
        have = 0
        for i in sorted(mp):
            if not interval:
                interval.append(i)
            have += mp[i]
            if have == 0:
                interval.append(i)
                res.append(interval)
                interval = []
        return res
```

```java
public class Solution {
    public int[][] merge(int[][] intervals) {
        TreeMap<Integer, Integer> map = new TreeMap<>();
        
        for (int[] interval : intervals) {
            map.put(interval[0], map.getOrDefault(interval[0], 0) + 1);
            map.put(interval[1], map.getOrDefault(interval[1], 0) - 1);
        }
        
        List<int[]> res = new ArrayList<>();
        int have = 0;
        int[] interval = new int[2];
        
        for (int point : map.keySet()) {
            if (have == 0) interval[0] = point;
            have += map.get(point);
            if (have == 0) {
                interval[1] = point;
                res.add(new int[] {interval[0], interval[1]});
            }
        }
        
        return res.toArray(new int[res.size()][]);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        map<int, int> mp;
        for (const auto& interval : intervals) {
            mp[interval[0]]++;
            mp[interval[1]]--;
        }

        vector<vector<int>> res;
        vector<int> interval;
        int have = 0;
        for (const auto& [i, count] : mp) {
            if (interval.empty()) {
                interval.push_back(i);
            }
            have += count;
            if (have == 0) {
                interval.push_back(i);
                res.push_back(interval);
                interval.clear();
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
     * @return {number[][]}
     */
    merge(intervals) {
        const mp = new Map();
        for (const [start, end] of intervals) {
            mp.set(start, (mp.get(start) || 0) + 1);
            mp.set(end, (mp.get(end) || 0) - 1);
        }

        const sortedKeys = Array.from(mp.keys()).sort((a, b) => a - b);
        const res = [];
        let interval = [];
        let have = 0;

        for (const i of sortedKeys) {
            if (interval.length === 0) {
                interval.push(i);
            }
            have += mp.get(i);
            if (have === 0) {
                interval.push(i);
                res.push(interval);
                interval = [];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] Merge(int[][] intervals) {
        var mp = new SortedDictionary<int, int>();
        foreach (var point in intervals) {
            if (!mp.ContainsKey(point[0])) mp[point[0]] = 0;
            if (!mp.ContainsKey(point[1])) mp[point[1]] = 0;
            mp[point[0]]++;
            mp[point[1]]--;
        }

        var res = new List<int[]>();
        var interval = new int[2];
        int have = 0;
        foreach (var kvp in mp) {
            if (have == 0) interval[0] = kvp.Key;
            have += kvp.Value;
            if (have == 0) {
                interval[1] = kvp.Key;
                res.Add(new int[] { interval[0], interval[1] });
            }
        }
        return res.ToArray();
    }
}
```

```go

func merge(intervals [][]int) [][]int {
    mp := make(map[int]int)
    for _, interval := range intervals {
        start, end := interval[0], interval[1]
        mp[start]++
        mp[end]--
    }

    res := [][]int{}
    interval := []int{}
    have := 0
    keys := make([]int, 0, len(mp))
    for key := range mp {
        keys = append(keys, key)
    }
    sort.Ints(keys)

    for _, i := range keys {
        if len(interval) == 0 {
            interval = append(interval, i)
        }
        have += mp[i]
        if have == 0 {
            interval = append(interval, i)
            res = append(res, append([]int{}, interval...))
            interval = []int{}
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun merge(intervals: Array<IntArray>): Array<IntArray> {
        val mp = TreeMap<Int, Int>()
        for (interval in intervals) {
            val (start, end) = interval
            mp[start] = mp.getOrDefault(start, 0) + 1
            mp[end] = mp.getOrDefault(end, 0) - 1
        }

        val res = mutableListOf<IntArray>()
        var interval = mutableListOf<Int>()
        var have = 0

        for (i in mp.keys) {
            if (interval.isEmpty()) {
                interval.add(i)
            }
            have += mp[i]!!
            if (have == 0) {
                interval.add(i)
                res.add(interval.toIntArray())
                interval = mutableListOf()
            }
        }
        return res.toTypedArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Greedy

::tabs-start

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        max_val = max(interval[0] for interval in intervals)
        
        mp = [0] * (max_val + 1)
        for start, end in intervals:
            mp[start] = max(end + 1, mp[start])

        res = []
        have = -1
        interval_start = -1
        for i in range(len(mp)):
            if mp[i] != 0:
                if interval_start == -1:
                    interval_start = i
                have = max(mp[i] - 1, have)
            if have == i:
                res.append([interval_start, have])
                have = -1
                interval_start = -1

        if interval_start != -1:
            res.append([interval_start, have])

        return res
```

```java
public class Solution {
    public int[][] merge(int[][] intervals) {
        int max = 0;
        for (int i = 0; i < intervals.length; i++) {
            max = Math.max(intervals[i][0], max);
        }

        int[] mp = new int[max + 1];
        for (int i = 0; i < intervals.length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            mp[start] = Math.max(end + 1, mp[start]);
        }

        int r = 0;
        int have = -1;
        int intervalStart = -1;
        for (int i = 0; i < mp.length; i++) {
            if (mp[i] != 0) {
                if (intervalStart == -1) intervalStart = i;
                have = Math.max(mp[i] - 1, have);
            }
            if (have == i) {
                intervals[r++] = new int[] { intervalStart, have };
                have = -1;
                intervalStart = -1;
            }
        }

        if (intervalStart != -1) {
            intervals[r++] = new int[] { intervalStart, have };
        }
        if (intervals.length == r) {
            return intervals;
        }

        int[][] res = new int[r][];
        for (int i = 0; i < r; i++) {
            res[i] = intervals[i];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        int max_val = 0;
        for (const auto& interval : intervals) {
            max_val = max(interval[0], max_val);
        }

        vector<int> mp(max_val + 1, 0);
        for (const auto& interval : intervals) {
            int start = interval[0];
            int end = interval[1];
            mp[start] = max(end + 1, mp[start]);
        }

        vector<vector<int>> res;
        int have = -1;
        int intervalStart = -1;
        for (int i = 0; i < mp.size(); i++) {
            if (mp[i] != 0) {
                if (intervalStart == -1) intervalStart = i;
                have = max(mp[i] - 1, have);
            }
            if (have == i) {
                res.push_back({intervalStart, have});
                have = -1;
                intervalStart = -1;
            }
        }

        if (intervalStart != -1) {
            res.push_back({intervalStart, have});
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number[][]}
     */
    merge(intervals) {
        let max = 0;
        for (let i = 0; i < intervals.length; i++) {
            max = Math.max(intervals[i][0], max);
        }

        let mp = new Array(max + 1).fill(0);
        for (let i = 0; i < intervals.length; i++) {
            let start = intervals[i][0];
            let end = intervals[i][1];
            mp[start] = Math.max(end + 1, mp[start]);
        }

        let res = [];
        let have = -1;
        let intervalStart = -1;
        for (let i = 0; i < mp.length; i++) {
            if (mp[i] !== 0) {
                if (intervalStart === -1) intervalStart = i;
                have = Math.max(mp[i] - 1, have);
            }
            if (have === i) {
                res.push([intervalStart, have]);
                have = -1;
                intervalStart = -1;
            }
        }

        if (intervalStart !== -1) {
            res.push([intervalStart, have]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] Merge(int[][] intervals) {
        int max = 0;
        for (int i = 0; i < intervals.Length; i++) {
            max = Math.Max(intervals[i][0], max);
        }

        int[] mp = new int[max + 1];
        for (int i = 0; i < intervals.Length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            mp[start] = Math.Max(end + 1, mp[start]);
        }

        var res = new List<int[]>();
        int have = -1;
        int intervalStart = -1;
        for (int i = 0; i < mp.Length; i++) {
            if (mp[i] != 0) {
                if (intervalStart == -1) intervalStart = i;
                have = Math.Max(mp[i] - 1, have);
            }
            if (have == i) {
                res.Add(new int[] { intervalStart, have });
                have = -1;
                intervalStart = -1;
            }
        }

        if (intervalStart != -1) {
            res.Add(new int[] { intervalStart, have });
        }

        return res.ToArray();
    }
}
```

```go
func merge(intervals [][]int) [][]int {
    maxVal := math.MinInt
    for _, interval := range intervals {
        maxVal = max(maxVal, interval[0])
    }

    mp := make([]int, maxVal+1)
    for _, interval := range intervals {
        start, end := interval[0], interval[1]
        mp[start] = max(mp[start], end+1)
    }

    res := [][]int{}
    have := -1
    intervalStart := -1
    for i := 0; i < len(mp); i++ {
        if mp[i] != 0 {
            if intervalStart == -1 {
                intervalStart = i
            }
            have = max(mp[i]-1, have)
        }
        if have == i {
            res = append(res, []int{intervalStart, have})
            have = -1
            intervalStart = -1
        }
    }

    if intervalStart != -1 {
        res = append(res, []int{intervalStart, have})
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
    fun merge(intervals: Array<IntArray>): Array<IntArray> {
        var maxVal = Int.MIN_VALUE
        for (interval in intervals) {
            maxVal = maxOf(maxVal, interval[0])
        }

        val mp = IntArray(maxVal + 1)
        for (interval in intervals) {
            val (start, end) = interval
            mp[start] = maxOf(mp[start], end + 1)
        }

        val res = mutableListOf<IntArray>()
        var have = -1
        var intervalStart = -1
        for (i in mp.indices) {
            if (mp[i] != 0) {
                if (intervalStart == -1) {
                    intervalStart = i
                }
                have = maxOf(mp[i] - 1, have)
            }
            if (have == i) {
                res.add(intArrayOf(intervalStart, have))
                have = -1
                intervalStart = -1
            }
        }

        if (intervalStart != -1) {
            res.add(intArrayOf(intervalStart, have))
        }

        return res.toTypedArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n + m)$
* Space complexity: $O(n)$

> Where $n$ is the length of the array and $m$ is the maximum start value among all the intervals.