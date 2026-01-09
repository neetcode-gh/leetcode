## 1. Recursion

### Intuition

We want to remove the minimum number of intervals so that the remaining intervals **do not overlap**.

A helpful way to think about this is:
- instead of directly counting removals, we can try to keep as many non-overlapping intervals as possible
- if we know the maximum number of intervals we can keep without overlap, then:
  - `minimum removals = total intervals - maximum kept`

To make decisions, we sort the intervals by start time and use recursion to explore two choices at each interval:
1. **Skip** the current interval
2. **Take** the current interval (only if it does not overlap with the previously taken interval)

The recursive function represents:
**"What is the maximum number of non-overlapping intervals we can keep starting from index `i`, given that the last chosen interval is `prev`?"**

### Algorithm

1. Sort the intervals by their start time.
2. Define a recursive function `dfs(i, prev)`:
   - `i` is the current interval index
   - `prev` is the index of the last chosen interval (`-1` if none chosen yet)
3. Base case:
   - If `i` reaches the end of the list, return `0` (no more intervals to take)
4. Option 1: Skip the current interval:
   - `res = dfs(i + 1, prev)`
5. Option 2: Take the current interval (only if it doesn't overlap):
   - If `prev == -1` or `intervals[prev][1] <= intervals[i][0]`:
     - `res = max(res, 1 + dfs(i + 1, i))`
6. Return `res`, the maximum number of intervals we can keep from this state.
7. Compute `kept = dfs(0, -1)`
8. Return `len(intervals) - kept` as the minimum number of intervals to remove.

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()

        def dfs(i, prev):
            if i == len(intervals):
                return 0
            res = dfs(i + 1, prev)
            if prev == -1 or intervals[prev][1] <= intervals[i][0]:
                res = max(res, 1 + dfs(i + 1, i))
            return res

        return len(intervals) - dfs(0, -1)
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        return intervals.length - dfs(intervals, 0, -1);
    }

    private int dfs(int[][] intervals, int i, int prev) {
        if (i == intervals.length) return 0;
        int res = dfs(intervals, i + 1, prev);
        if (prev == -1 || intervals[prev][1] <= intervals[i][0]) {
            res = Math.max(res, 1 + dfs(intervals, i + 1, i));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        return intervals.size() - dfs(intervals, 0, -1);
    }

private:
    int dfs(const vector<vector<int>>& intervals, int i, int prev) {
        if (i == intervals.size()) return 0;
        int res = dfs(intervals, i + 1, prev);
        if (prev == -1 || intervals[prev][1] <= intervals[i][0]) {
            res = max(res, 1 + dfs(intervals, i + 1, i));
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
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);

        const dfs = (i, prev) => {
            if (i === intervals.length) return 0;
            let res = dfs(i + 1, prev);
            if (prev === -1 || intervals[prev][1] <= intervals[i][0]) {
                res = Math.max(res, 1 + dfs(i + 1, i));
            }
            return res;
        };

        return intervals.length - dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        return intervals.Length - Dfs(intervals, 0, -1);
    }

    private int Dfs(int[][] intervals, int i, int prev) {
        if (i == intervals.Length) return 0;
        int res = Dfs(intervals, i + 1, prev);
        if (prev == -1 || intervals[prev][1] <= intervals[i][0]) {
            res = Math.Max(res, 1 + Dfs(intervals, i + 1, i));
        }
        return res;
    }
}
```

```go
func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    var dfs func(i, prev int) int
    dfs = func(i, prev int) int {
        if i == len(intervals) {
            return 0
        }
        res := dfs(i+1, prev)
        if prev == -1 || intervals[prev][1] <= intervals[i][0] {
            res = max(res, 1+dfs(i+1, i))
        }
        return res
    }

    return len(intervals) - dfs(0, -1)
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
    fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
        intervals.sortBy { it[0] }

        fun dfs(i: Int, prev: Int): Int {
            if (i == intervals.size) {
                return 0
            }
            var res = dfs(i + 1, prev)
            if (prev == -1 || intervals[prev][1] <= intervals[i][0]) {
                res = maxOf(res, 1 + dfs(i + 1, i))
            }
            return res
        }

        return intervals.size - dfs(0, -1)
    }
}
```

```swift
class Solution {
    func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals
        intervals.sort { $0[0] < $1[0] }

        func dfs(_ i: Int, _ prev: Int) -> Int {
            if i == intervals.count {
                return 0
            }
            var res = dfs(i + 1, prev)
            if prev == -1 || intervals[prev][1] <= intervals[i][0] {
                res = max(res, 1 + dfs(i + 1, i))
            }
            return res
        }

        return intervals.count - dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

We want to remove the minimum number of intervals so that the remaining intervals **do not overlap**.

A common trick is to flip the problem:
- instead of counting removals directly, find the **maximum number of non-overlapping intervals** we can keep
- then:
  - `minimum removals = total intervals - maximum kept`

This solution sorts intervals by **end time**. After that, for any interval `i`, the next interval we choose must start **at or after** `intervals[i][1]`.

We define a DP state that answers:
**"If we choose interval `i` as part of our set, what is the maximum number of non-overlapping intervals we can take starting from `i`?"**

The result for an index depends on future indices, and many states repeat, so we use memoization.

### Algorithm

1. Sort the intervals by their end time.
2. Let `n` be the number of intervals.
3. Use a memo map `memo` to store results for each index `i`.
4. Define a recursive function `dfs(i)`:
   - returns the maximum number of non-overlapping intervals we can take
     starting with interval `i` included
5. If `i` is already in `memo`, return the stored value.
6. Initialize `res = 1` because we are taking interval `i`.
7. Try to extend the chain by choosing a next interval `j` where `j > i`:
   - only valid if `intervals[i][1] <= intervals[j][0]`
   - if valid, update:
     - `res = max(res, 1 + dfs(j))`
8. Store `res` in `memo[i]` and return it.
9. The maximum kept intervals is computed as `dfs(0)`.
10. Return `n - dfs(0)` as the minimum number of intervals to remove.

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key = lambda x: x[1])
        n = len(intervals)
        memo = {}

        def dfs(i):
            if i in memo:
                return memo[i]

            res = 1
            for j in range(i + 1, n):
                if intervals[i][1] <= intervals[j][0]:
                    res = max(res, 1 + dfs(j))
            memo[i] = res
            return res

        return n - dfs(0)
```

```java
public class Solution {
    private int[] memo;

    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int n = intervals.length;
        memo = new int[n];
        Arrays.fill(memo, -1);

        int maxNonOverlapping = dfs(intervals, 0);
        return n - maxNonOverlapping;
    }

    private int dfs(int[][] intervals, int i) {
        if (i >= intervals.length) return 0;
        if (memo[i] != -1) return memo[i];

        int res = 1;
        for (int j = i + 1; j < intervals.length; j++) {
            if (intervals[i][1] <= intervals[j][0]) {
                res = Math.max(res, 1 + dfs(intervals, j));
            }
        }
        memo[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int n = intervals.size();
        vector<int> memo(n, -1);

        int maxNonOverlapping = dfs(intervals, 0, memo);
        return n - maxNonOverlapping;
    }

private:
    int dfs(const vector<vector<int>>& intervals, int i, vector<int>& memo) {
        if (i >= intervals.size()) return 0;
        if (memo[i] != -1) return memo[i];

        int res = 1;
        for (int j = i + 1; j < intervals.size(); j++) {
            if (intervals[i][1] <= intervals[j][0]) {
                res = max(res, 1 + dfs(intervals, j, memo));
            }
        }
        memo[i] = res;
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
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        let memo = new Array(n).fill(-1);

        const dfs = (i) => {
            if (i >= n) return 0;
            if (memo[i] !== -1) return memo[i];

            let res = 1;
            for (let j = i + 1; j < n; j++) {
                if (intervals[i][1] <= intervals[j][0]) {
                    res = Math.max(res, 1 + dfs(j));
                }
            }
            memo[i] = res;
            return res;
        };

        const maxNonOverlapping = dfs(0);
        return n - maxNonOverlapping;
    }
}
```

```csharp
public class Solution {
    private int[] memo;

    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int n = intervals.Length;
        memo = new int[n];
        Array.Fill(memo, -1);

        int maxNonOverlapping = Dfs(intervals, 0);
        return n - maxNonOverlapping;
    }

    private int Dfs(int[][] intervals, int i) {
        if (i >= intervals.Length) return 0;
        if (memo[i] != -1) return memo[i];

        int res = 1;
        for (int j = i + 1; j < intervals.Length; j++) {
            if (intervals[i][1] <= intervals[j][0]) {
                res = Math.Max(res, 1 + Dfs(intervals, j));
            }
        }
        memo[i] = res;
        return res;
    }
}
```

```go
func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })
    n := len(intervals)
    memo := make([]int, n)

    var dfs func(i int) int
    dfs = func(i int) int {
        if memo[i] != 0 {
            return memo[i]
        }

        res := 1
        for j := i + 1; j < n; j++ {
            if intervals[i][1] <= intervals[j][0] {
                res = max(res, 1+dfs(j))
            }
        }
        memo[i] = res
        return res
    }

    return n - dfs(0)
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
    fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
        intervals.sortBy { it[1] }
        val n = intervals.size
        val memo = IntArray(n)

        fun dfs(i: Int): Int {
            if (memo[i] != 0) {
                return memo[i]
            }

            var res = 1
            for (j in i + 1 until n) {
                if (intervals[i][1] <= intervals[j][0]) {
                    res = maxOf(res, 1 + dfs(j))
                }
            }
            memo[i] = res
            return res
        }

        return n - dfs(0)
    }
}
```

```swift
class Solution {
    func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals
        intervals.sort { $0[1] < $1[1] }
        let n = intervals.count
        var memo = [Int: Int]()

        func dfs(_ i: Int) -> Int {
            if let result = memo[i] {
                return result
            }

            var res = 1
            for j in i + 1..<n {
                if intervals[i][1] <= intervals[j][0] {
                    res = max(res, 1 + dfs(j))
                }
            }
            memo[i] = res
            return res
        }

        return n - dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We want to remove the minimum number of intervals so that the remaining intervals **do not overlap**.

A useful trick is to instead find the **maximum number of non-overlapping intervals** we can keep.
Once we know that:
- `minimum removals = total intervals - maximum kept`

After sorting intervals by **end time**, we can build a DP array where:
- `dp[i]` = the maximum number of non-overlapping intervals we can keep **ending at interval `i`** (meaning interval `i` is included)

To compute `dp[i]`, we look at all earlier intervals `j < i`:
- if interval `j` ends before interval `i` starts, they can both be kept
- so we can extend the chain: `1 + dp[j]`

### Algorithm

1. Sort the intervals by their end time.
2. Let `n` be the number of intervals.
3. Create an array `dp` of size `n`.
4. For each interval index `i` from `0` to `n - 1`:
   - Start with `dp[i] = 1` (we can always keep interval `i` alone)
   - For every earlier interval `j` from `0` to `i - 1`:
     - If `intervals[j][1] <= intervals[i][0]`:
       - update `dp[i] = max(dp[i], 1 + dp[j])`
5. After filling `dp`, the maximum number of non-overlapping intervals we can keep is:
   - `max_non_overlapping = max(dp)`
6. Return the minimum removals:
   - `n - max_non_overlapping`

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        n = len(intervals)
        dp = [0] * n

        for i in range(n):
            dp[i] = 1
            for j in range(i):
                if intervals[j][1] <= intervals[i][0]:
                    dp[i] = max(dp[i], 1 + dp[j])

        max_non_overlapping = max(dp)
        return n - max_non_overlapping
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int n = intervals.length;
        int[] dp = new int[n];

        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = Math.max(dp[i], 1 + dp[j]);
                }
            }
        }

        int maxNonOverlapping = Arrays.stream(dp).max().getAsInt();
        return n - maxNonOverlapping;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int n = intervals.size();
        vector<int> dp(n, 0);

        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = max(dp[i], 1 + dp[j]);
                }
            }
        }

        int maxNonOverlapping = *max_element(dp.begin(), dp.end());
        return n - maxNonOverlapping;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        const dp = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            dp[i] = 1;
            for (let j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = Math.max(dp[i], 1 + dp[j]);
                }
            }
        }

        const maxNonOverlapping = Math.max(...dp);
        return n - maxNonOverlapping;
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int n = intervals.Length;
        int[] dp = new int[n];

        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = Math.Max(dp[i], 1 + dp[j]);
                }
            }
        }

        int maxNonOverlapping = 0;
        foreach (var count in dp) {
            maxNonOverlapping = Math.Max(maxNonOverlapping, count);
        }
        return n - maxNonOverlapping;
    }
}
```

```go
func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })

    n := len(intervals)
    dp := make([]int, n)

    for i := 0; i < n; i++ {
        dp[i] = 1
        for j := 0; j < i; j++ {
            if intervals[j][1] <= intervals[i][0] {
                dp[i] = max(dp[i], 1+dp[j])
            }
        }
    }

    maxNonOverlapping := dp[0]
    for i := 1; i < n; i++ {
        maxNonOverlapping = max(maxNonOverlapping, dp[i])
    }

    return n - maxNonOverlapping
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
    fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
        intervals.sortBy { it[1] }
        val n = intervals.size
        val dp = IntArray(n)

        for (i in 0 until n) {
            dp[i] = 1
            for (j in 0 until i) {
                if (intervals[j][1] <= intervals[i][0]) {
                    dp[i] = maxOf(dp[i], 1 + dp[j])
                }
            }
        }

        val maxNonOverlapping = dp.maxOrNull() ?: 0
        return n - maxNonOverlapping
    }
}
```

```swift
class Solution {
    func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals
        intervals.sort { $0[1] < $1[1] }
        let n = intervals.count
        var dp = [Int](repeating: 0, count: n)

        for i in 0..<n {
            dp[i] = 1
            for j in 0..<i {
                if intervals[j][1] <= intervals[i][0] {
                    dp[i] = max(dp[i], 1 + dp[j])
                }
            }
        }

        let maxNonOverlapping = dp.max() ?? 0
        return n - maxNonOverlapping
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Binary Search)

### Intuition

We want to remove the minimum number of intervals so that the remaining intervals **do not overlap**.

A common trick is to flip the goal:
- instead of counting removals directly, find the **maximum number of non-overlapping intervals** we can keep
- then:
  - `minimum removals = total intervals - maximum kept`

After sorting intervals by **end time**, consider interval `i`:
- we have two choices:
  1. **skip** interval `i` → keep the best answer up to `i - 1`
  2. **take** interval `i` → then we must take it after the last interval that ends
     before `intervals[i][0]`

The slow part is finding that "previous compatible interval".
Because the intervals are sorted by end time, we can find it using **binary search**.

We maintain:
- `dp[i]` = maximum number of non-overlapping intervals we can keep using intervals `0..i`

### Algorithm

1. Sort the intervals by their end time.
2. Create a DP array `dp` of size `n`:
   - `dp[i]` stores the maximum number of non-overlapping intervals we can keep
     among the first `i + 1` intervals
3. Set `dp[0] = 1` since we can always keep the first interval.
4. For each interval `i` from `1` to `n - 1`:
5. Use binary search to find `idx`:
   - the first position in `[0, i)` where `intervals[pos][1] > intervals[i][0]`
   - so `idx - 1` is the last interval that **does not overlap** with interval `i`
6. Update `dp[i]`:
   - If no compatible interval exists (`idx == 0`):
     - we can only take interval `i` alone, so compare with skipping:
       - `dp[i] = dp[i - 1]`
   - Otherwise:
     - Option 1: skip interval `i` → `dp[i - 1]`
     - Option 2: take interval `i` → `1 + dp[idx - 1]`
     - `dp[i] = max(dp[i - 1], 1 + dp[idx - 1])`
7. After filling DP, the maximum kept is `dp[n - 1]`.
8. Return `n - dp[n - 1]` as the minimum number of intervals to remove.

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        n = len(intervals)
        dp = [0] * n
        dp[0] = 1

        def bs(r, target):
            l = 0
            while l < r:
                m = (l + r) >> 1
                if intervals[m][1] <= target:
                    l = m + 1
                else:
                    r = m
            return l

        for i in range(1, n):
            idx = bs(i, intervals[i][0])
            if idx == 0:
                dp[i] = dp[i - 1]
            else:
                dp[i] = max(dp[i - 1], 1 + dp[idx - 1])
        return n - dp[n - 1]
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int n = intervals.length;
        int[] dp = new int[n];
        dp[0] = 1;

        for (int i = 1; i < n; i++) {
            int idx = bs(i, intervals[i][0], intervals);
            if (idx == 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = Math.max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }

    private int bs(int r, int target, int[][] intervals) {
        int l = 0;
        while (l < r) {
            int m = (l + r) >> 1;
            if (intervals[m][1] <= target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int n = intervals.size();
        vector<int> dp(n);
        dp[0] = 1;

        for (int i = 1; i < n; i++) {
            int idx = bs(i, intervals[i][0], intervals);
            if (idx == 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }

    int bs(int r, int target, vector<vector<int>>& intervals) {
        int l = 0;
        while (l < r) {
            int m = (l + r) >> 1;
            if (intervals[m][1] <= target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        const dp = new Array(n).fill(0);
        dp[0] = 1;

        const bs = (r, target) => {
            let l = 0;
            while (l < r) {
                const m = (l + r) >> 1;
                if (intervals[m][1] <= target) {
                    l = m + 1;
                } else {
                    r = m;
                }
            }
            return l;
        };

        for (let i = 1; i < n; i++) {
            const idx = bs(i, intervals[i][0]);
            if (idx === 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = Math.max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int n = intervals.Length;
        int[] dp = new int[n];
        dp[0] = 1;

        for (int i = 1; i < n; i++) {
            int idx = Bs(i, intervals[i][0], intervals);
            if (idx == 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = Math.Max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }

    private int Bs(int r, int target, int[][] intervals) {
        int l = 0;
        while (l < r) {
            int m = (l + r) >> 1;
            if (intervals[m][1] <= target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    }
}
```

```go
func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })

    n := len(intervals)
    dp := make([]int, n)
    dp[0] = 1

    var bs func(r, target int) int
    bs = func(r, target int) int {
        l := 0
        for l < r {
            m := (l + r) >> 1
            if intervals[m][1] <= target {
                l = m + 1
            } else {
                r = m
            }
        }
        return l
    }

    for i := 1; i < n; i++ {
        idx := bs(i, intervals[i][0])
        if idx == 0 {
            dp[i] = dp[i-1]
        } else {
            dp[i] = max(dp[i-1], 1+dp[idx-1])
        }
    }

    return n - dp[n-1]
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
    fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
        intervals.sortBy { it[1] }
        val n = intervals.size
        val dp = IntArray(n)
        dp[0] = 1

        fun bs(r: Int, target: Int): Int {
            var l = 0
            var r = r
            while (l < r) {
                val m = (l + r) / 2
                if (intervals[m][1] <= target) {
                    l = m + 1
                } else {
                    r = m
                }
            }
            return l
        }

        for (i in 1 until n) {
            val idx = bs(i, intervals[i][0])
            dp[i] = if (idx == 0) dp[i - 1] else maxOf(dp[i - 1], 1 + dp[idx - 1])
        }

        return n - dp[n - 1]
    }
}
```

```swift
class Solution {
    func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals
        intervals.sort { $0[1] < $1[1] }
        let n = intervals.count
        var dp = [Int](repeating: 0, count: n)
        dp[0] = 1

        func bs(_ r: Int, _ target: Int) -> Int {
            var l = 0
            var r = r
            while l < r {
                let m = (l + r) >> 1
                if intervals[m][1] <= target {
                    l = m + 1
                } else {
                    r = m
                }
            }
            return l
        }

        for i in 1..<n {
            let idx = bs(i, intervals[i][0])
            if idx == 0 {
                dp[i] = dp[i - 1]
            } else {
                dp[i] = max(dp[i - 1], 1 + dp[idx - 1])
            }
        }
        return n - dp[n - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 5. Greedy (Sort By Start)

### Intuition

We want to remove the **minimum number of intervals** so that the remaining intervals **do not overlap**.

A greedy strategy works well here. After sorting intervals by their **start time**, we process them from left to right and always keep the interval that ends **earlier** when an overlap occurs.

Why this works:
- When two intervals overlap, keeping the one with the **smaller end time** leaves more room for future intervals
- Removing the interval with the larger end is always a worse choice, because it blocks more upcoming intervals

So instead of choosing which interval to keep globally, we make a **local greedy decision** whenever an overlap happens.

### Algorithm

1. Sort the intervals by their start time.
2. Initialize:
   - `prevEnd` as the end of the first interval
   - `res = 0` to count how many intervals we remove
3. Iterate through the remaining intervals one by one:
4. For each interval `(start, end)`:
   - If `start >= prevEnd`:
     - There is no overlap
     - Update `prevEnd = end`
   - Else (overlap exists):
     - We must remove one interval
     - Increment `res`
     - Keep the interval with the **smaller end**:
       - `prevEnd = min(end, prevEnd)`
5. After processing all intervals, return `res`

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        res = 0
        prevEnd = intervals[0][1]

        for start, end in intervals[1:]:
            if start >= prevEnd:
                prevEnd = end
            else:
                res += 1
                prevEnd = min(end, prevEnd)
        return res
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = Math.min(end, prevEnd);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = min(end, prevEnd);
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
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        let res = 0;
        let prevEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start = intervals[i][0];
            const end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = Math.min(end, prevEnd);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.Length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = Math.Min(end, prevEnd);
            }
        }
        return res;
    }
}
```

```go
func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    res := 0
    prevEnd := intervals[0][1]

    for _, interval := range intervals[1:] {
        start, end := interval[0], interval[1]
        if start >= prevEnd {
            prevEnd = end
        } else {
            res++
            prevEnd = min(end, prevEnd)
        }
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
        intervals.sortBy { it[0] }

        var res = 0
        var prevEnd = intervals[0][1]

        for (i in 1 until intervals.size) {
            val (start, end) = intervals[i]
            if (start >= prevEnd) {
                prevEnd = end
            } else {
                res++
                prevEnd = minOf(end, prevEnd)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals
        intervals.sort { $0[0] < $1[0] }

        var res = 0
        var prevEnd = intervals[0][1]

        for i in 1..<intervals.count {
            let start = intervals[i][0]
            let end = intervals[i][1]
            if start >= prevEnd {
                prevEnd = end
            } else {
                res += 1
                prevEnd = min(end, prevEnd)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 6. Greedy (Sort By End)

### Intuition

We want to remove the **minimum number of intervals** so that the remaining intervals **do not overlap**.

A very clean greedy idea is to always **keep the interval that ends earliest**.
Why? Because an interval that ends earlier leaves more room for future intervals, reducing the chance of overlap later.

So instead of deciding which intervals to remove directly, we:
- sort all intervals by their **end time**
- walk through them from left to right
- keep track of the end of the last interval we decided to keep

Whenever we see an overlap:
- we **remove the current interval**
- because it ends later than the one we already kept (due to sorting)

This greedy choice is optimal and ensures the maximum number of intervals are kept.

### Algorithm

1. Sort all intervals by their end time.
2. Initialize:
   - `prevEnd` as the end of the first interval
   - `res = 0` to count how many intervals we remove
3. Iterate through the intervals starting from the second one:
4. For each interval `(start, end)`:
   - If `start < prevEnd`:
     - The interval overlaps with the previous one
     - Remove this interval → increment `res`
   - Else:
     - No overlap
     - Update `prevEnd = end`
5. After processing all intervals, return `res`

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key = lambda pair: pair[1])
        prevEnd = intervals[0][1]
        res = 0

        for i in range(1, len(intervals)):
            if prevEnd > intervals[i][0]:
                res += 1
            else:
                prevEnd = intervals[i][1]


        return res
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
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
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        let res = 0;
        let prevEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start = intervals[i][0];
            const end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.Length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
}
```

```go
func eraseOverlapIntervals(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })

    prevEnd := intervals[0][1]
    res := 0

    for i := 1; i < len(intervals); i++ {
        if prevEnd > intervals[i][0] {
            res++
        } else {
            prevEnd = intervals[i][1]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun eraseOverlapIntervals(intervals: Array<IntArray>): Int {
        intervals.sortBy { it[1] }

        var prevEnd = intervals[0][1]
        var res = 0

        for (i in 1 until intervals.size) {
            if (prevEnd > intervals[i][0]) {
                res++
            } else {
                prevEnd = intervals[i][1]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func eraseOverlapIntervals(_ intervals: [[Int]]) -> Int {
        var intervals = intervals
        intervals.sort { $0[1] < $1[1] }

        var prevEnd = intervals[0][1]
        var res = 0

        for i in 1..<intervals.count {
            if prevEnd > intervals[i][0] {
                res += 1
            } else {
                prevEnd = intervals[i][1]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
