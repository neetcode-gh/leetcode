## 1. Dynamic Programming (Top-Down)

### Intuition

This problem is essentially finding the longest chain of envelopes where each envelope strictly contains the previous one. If we sort envelopes by width, we only need to find the longest increasing subsequence (LIS) of heights. The trick is to sort by width ascending, but when widths are equal, sort by height descending. This prevents envelopes with the same width from being part of the same chain, since we need strictly greater dimensions for both.

### Algorithm

1. Sort envelopes by width ascending. For equal widths, sort by height descending.
2. Extract the heights into an array.
3. Use memoized recursion to compute LIS on the heights:
   - For each index `i`, recursively find the longest subsequence starting from `i`.
   - Check all indices `j > i` where `heights[j] > heights[i]`, taking the maximum.
4. Return the maximum LIS value across all starting positions.

::tabs-start

```python
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        n = len(envelopes)
        envelopes.sort(key=lambda x: (x[0], -x[1]))

        def lis(nums):
            n = len(nums)
            memo = [-1] * n

            def dfs(i):
                if memo[i] != -1:
                    return memo[i]

                LIS = 1
                for j in range(i + 1, n):
                    if nums[i] < nums[j]:
                        LIS = max(LIS, 1 + dfs(j))

                memo[i] = LIS
                return LIS

            return max(dfs(i) for i in range(n))

        return lis([e[1] for e in envelopes])
```

```java
public class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        int n = envelopes.length;
        if (n == 0) return 0;
        Arrays.sort(envelopes, (a, b) ->
            a[0] != b[0]
                ? Integer.compare(a[0], b[0])
                : Integer.compare(b[1], a[1])
        );

        int[] heights = new int[n];
        for (int i = 0; i < n; i++) {
            heights[i] = envelopes[i][1];
        }

        int[] memo = new int[n];
        Arrays.fill(memo, -1);
        int result = 0;
        for (int i = 0; i < n; i++) {
            result = Math.max(result, dfs(heights, i, memo));
        }
        return result;
    }

    private int dfs(int[] nums, int i, int[] memo) {
        if (memo[i] != -1) return memo[i];
        int lis = 1;
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] < nums[j]) {
                lis = Math.max(lis, 1 + dfs(nums, j, memo));
            }
        }
        memo[i] = lis;
        return lis;
    }
}
```

```cpp
class Solution {
    vector<int> nums, memo;
    int n;

    int dfs(int i) {
        if (memo[i] != -1) return memo[i];
        int lis = 1;
        for (int j = i + 1; j < n; j++) {
            if (nums[i] < nums[j]) {
                lis = max(lis, 1 + dfs(j));
            }
        }
        return memo[i] = lis;
    }

public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        n = envelopes.size();
        sort(envelopes.begin(), envelopes.end(), [](auto &a, auto &b) {
            if (a[0] != b[0]) return a[0] < b[0];
            return a[1] > b[1];
        });
        nums.resize(n);
        for (int i = 0; i < n; i++) nums[i] = envelopes[i][1];
        memo.assign(n, -1);

        int result = 0;
        for (int i = 0; i < n; i++) {
            result = max(result, dfs(i));
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} envelopes
     * @return {number}
     */
    maxEnvelopes(envelopes) {
        const n = envelopes.length;
        envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
        const nums = envelopes.map((e) => e[1]);
        const memo = new Array(n).fill(-1);

        const dfs = (i) => {
            if (memo[i] !== -1) return memo[i];
            let lis = 1;
            for (let j = i + 1; j < n; j++) {
                if (nums[i] < nums[j]) {
                    lis = Math.max(lis, 1 + dfs(j));
                }
            }
            memo[i] = lis;
            return lis;
        };

        let result = 0;
        for (let i = 0; i < n; i++) {
            result = Math.max(result, dfs(i));
        }
        return result;
    }
}
```

```csharp
public class Solution {
    public int MaxEnvelopes(int[][] envelopes) {
        int n = envelopes.Length;
        Array.Sort(envelopes, (a, b) =>
            a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]
        );

        int[] nums = envelopes.Select(e => e[1]).ToArray();
        int[] memo = Enumerable.Repeat(-1, n).ToArray();

        int dfs(int i) {
            if (memo[i] != -1) return memo[i];
            int lis = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[i] < nums[j]) {
                    lis = Math.Max(lis, 1 + dfs(j));
                }
            }
            memo[i] = lis;
            return lis;
        }

        int result = 0;
        for (int i = 0; i < n; i++) {
            result = Math.Max(result, dfs(i));
        }
        return result;
    }
}
```

```go
func maxEnvelopes(envelopes [][]int) int {
    n := len(envelopes)
    if n == 0 {
        return 0
    }
    sort.Slice(envelopes, func(i, j int) bool {
        if envelopes[i][0] != envelopes[j][0] {
            return envelopes[i][0] < envelopes[j][0]
        }
        return envelopes[i][1] > envelopes[j][1]
    })

    nums := make([]int, n)
    for i := 0; i < n; i++ {
        nums[i] = envelopes[i][1]
    }
    memo := make([]int, n)
    for i := range memo {
        memo[i] = -1
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if memo[i] != -1 {
            return memo[i]
        }
        lis := 1
        for j := i + 1; j < n; j++ {
            if nums[i] < nums[j] {
                lis = max(lis, 1+dfs(j))
            }
        }
        memo[i] = lis
        return lis
    }

    result := 0
    for i := 0; i < n; i++ {
        result = max(result, dfs(i))
    }
    return result
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
    fun maxEnvelopes(envelopes: Array<IntArray>): Int {
        val n = envelopes.size
        if (n == 0) return 0
        envelopes.sortWith(compareBy({ it[0] }, { -it[1] }))

        val nums = envelopes.map { it[1] }.toIntArray()
        val memo = IntArray(n) { -1 }

        fun dfs(i: Int): Int {
            if (memo[i] != -1) return memo[i]
            var lis = 1
            for (j in i + 1 until n) {
                if (nums[i] < nums[j]) {
                    lis = maxOf(lis, 1 + dfs(j))
                }
            }
            memo[i] = lis
            return lis
        }

        var result = 0
        for (i in 0 until n) {
            result = maxOf(result, dfs(i))
        }
        return result
    }
}
```

```swift
class Solution {
    func maxEnvelopes(_ envelopes: [[Int]]) -> Int {
        let n = envelopes.count
        if n == 0 { return 0 }
        let sorted = envelopes.sorted {
            if $0[0] != $1[0] { return $0[0] < $1[0] }
            return $0[1] > $1[1]
        }

        let nums = sorted.map { $0[1] }
        var memo = [Int](repeating: -1, count: n)

        func dfs(_ i: Int) -> Int {
            if memo[i] != -1 { return memo[i] }
            var lis = 1
            for j in (i + 1)..<n {
                if nums[i] < nums[j] {
                    lis = max(lis, 1 + dfs(j))
                }
            }
            memo[i] = lis
            return lis
        }

        var result = 0
        for i in 0..<n {
            result = max(result, dfs(i))
        }
        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

### Intuition

Instead of using recursion, we can build the solution iteratively from right to left. For each position, we compute the length of the longest increasing subsequence starting from that position by looking at all valid successors. This bottom-up approach avoids the overhead of recursion and explicitly fills a DP table.

### Algorithm

1. Sort envelopes by width ascending, height descending for equal widths.
2. Extract heights into an array.
3. Create a DP array where `LIS[i]` represents the longest increasing subsequence starting at index `i`.
4. Iterate from right to left:
   - For each index `i`, check all `j > i` where `heights[j] > heights[i]`.
   - Update `LIS[i] = max(LIS[i], 1 + LIS[j])`.
5. Return the maximum value in the LIS array.

::tabs-start

```python
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        n = len(envelopes)
        envelopes.sort(key=lambda x: (x[0], -x[1]))

        def lis(nums):
            LIS = [1] * n

            for i in range(n - 1, -1, -1):
                for j in range(i + 1, n):
                    if nums[i] < nums[j]:
                        LIS[i] = max(LIS[i], 1 + LIS[j])
            return max(LIS)

        return lis([e[1] for e in envelopes])
```

```java
public class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        int n = envelopes.length;
        Arrays.sort(envelopes, (a, b) ->
            a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]
        );
        int[] heights = new int[n];
        for (int i = 0; i < n; i++) heights[i] = envelopes[i][1];
        int[] LIS = new int[n];
        Arrays.fill(LIS, 1);
        int ans = 0;
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i + 1; j < n; j++) {
                if (heights[i] < heights[j]) {
                    LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
                }
            }
            ans = Math.max(ans, LIS[i]);
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        int n = envelopes.size();
        sort(envelopes.begin(), envelopes.end(),
             [](const vector<int>& a, const vector<int>& b) {
                 if (a[0] != b[0]) return a[0] < b[0];
                 return a[1] > b[1];
             });
        vector<int> heights(n);
        for (int i = 0; i < n; ++i) heights[i] = envelopes[i][1];
        vector<int> LIS(n, 1);
        int ans = 0;
        for (int i = n - 1; i >= 0; --i) {
            for (int j = i + 1; j < n; ++j) {
                if (heights[i] < heights[j]) {
                    LIS[i] = max(LIS[i], 1 + LIS[j]);
                }
            }
            ans = max(ans, LIS[i]);
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} envelopes
     * @return {number}
     */
    maxEnvelopes(envelopes) {
        envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
        const heights = envelopes.map((e) => e[1]);
        const n = heights.length;
        if (n === 0) return 0;
        const LIS = new Array(n).fill(1);
        let ans = 0;
        for (let i = n - 1; i >= 0; i--) {
            for (let j = i + 1; j < n; j++) {
                if (heights[i] < heights[j]) {
                    LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
                }
            }
            ans = Math.max(ans, LIS[i]);
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    public int MaxEnvelopes(int[][] envelopes) {
        int n = envelopes.Length;
        Array.Sort(envelopes, (a, b) =>
            a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]
        );
        int[] heights = new int[n];
        for (int i = 0; i < n; i++) heights[i] = envelopes[i][1];
        int[] LIS = new int[n];
        for (int i = 0; i < n; i++) LIS[i] = 1;
        int ans = 0;
        for (int i = n - 1; i >= 0; i--) {
            for (int j = i + 1; j < n; j++) {
                if (heights[i] < heights[j]) {
                    LIS[i] = Math.Max(LIS[i], 1 + LIS[j]);
                }
            }
            ans = Math.Max(ans, LIS[i]);
        }
        return ans;
    }
}
```

```go
func maxEnvelopes(envelopes [][]int) int {
    n := len(envelopes)
    sort.Slice(envelopes, func(i, j int) bool {
        if envelopes[i][0] != envelopes[j][0] {
            return envelopes[i][0] < envelopes[j][0]
        }
        return envelopes[i][1] > envelopes[j][1]
    })

    heights := make([]int, n)
    for i := 0; i < n; i++ {
        heights[i] = envelopes[i][1]
    }
    LIS := make([]int, n)
    for i := range LIS {
        LIS[i] = 1
    }
    ans := 0
    for i := n - 1; i >= 0; i-- {
        for j := i + 1; j < n; j++ {
            if heights[i] < heights[j] {
                if 1+LIS[j] > LIS[i] {
                    LIS[i] = 1 + LIS[j]
                }
            }
        }
        if LIS[i] > ans {
            ans = LIS[i]
        }
    }
    return ans
}
```

```kotlin
class Solution {
    fun maxEnvelopes(envelopes: Array<IntArray>): Int {
        val n = envelopes.size
        envelopes.sortWith(compareBy({ it[0] }, { -it[1] }))

        val heights = IntArray(n) { envelopes[it][1] }
        val LIS = IntArray(n) { 1 }
        var ans = 0
        for (i in n - 1 downTo 0) {
            for (j in i + 1 until n) {
                if (heights[i] < heights[j]) {
                    LIS[i] = maxOf(LIS[i], 1 + LIS[j])
                }
            }
            ans = maxOf(ans, LIS[i])
        }
        return ans
    }
}
```

```swift
class Solution {
    func maxEnvelopes(_ envelopes: [[Int]]) -> Int {
        let n = envelopes.count
        let sorted = envelopes.sorted {
            if $0[0] != $1[0] { return $0[0] < $1[0] }
            return $0[1] > $1[1]
        }

        let heights = sorted.map { $0[1] }
        var LIS = [Int](repeating: 1, count: n)
        var ans = 0
        for i in stride(from: n - 1, through: 0, by: -1) {
            for j in (i + 1)..<n {
                if heights[i] < heights[j] {
                    LIS[i] = max(LIS[i], 1 + LIS[j])
                }
            }
            ans = max(ans, LIS[i])
        }
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming + Binary Search

### Intuition

The standard LIS problem can be solved in O(n log n) using binary search. We maintain a list where each position stores the smallest ending value of all increasing subsequences of that length. For each new element, we either extend the longest subsequence or replace an existing ending value to allow for potentially longer subsequences later. Binary search finds the correct position efficiently.

### Algorithm

1. Sort envelopes by width ascending, height descending for equal widths.
2. Extract heights into an array.
3. Initialize an empty list `dp` that will store the smallest tail values for subsequences of each length.
4. For each height:
   - If it's larger than the last element in `dp`, append it (extends the longest subsequence).
   - Otherwise, use binary search to find the first element in `dp` that is greater than or equal to the current height, and replace it.
5. The length of `dp` is the answer.

::tabs-start

```python
class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        envelopes.sort(key=lambda x: (x[0], -x[1]))

        def lis(nums):
            dp = []
            dp.append(nums[0])

            LIS = 1
            for i in range(1, len(nums)):
                if dp[-1] < nums[i]:
                    dp.append(nums[i])
                    LIS += 1
                    continue

                idx = bisect_left(dp, nums[i])
                dp[idx] = nums[i]

            return LIS

        return lis([e[1] for e in envelopes])
```

```java
public class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        int n = envelopes.length;
        Arrays.sort(envelopes, (a, b) ->
            a[0] != b[0]
                ? Integer.compare(a[0], b[0])
                : Integer.compare(b[1], a[1])
        );

        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = envelopes[i][1];
        }

        List<Integer> dp = new ArrayList<>();
        dp.add(nums[0]);

        int LIS = 1;
        for (int i = 1; i < n; i++) {
            if (dp.get(dp.size() - 1) < nums[i]) {
                dp.add(nums[i]);
                LIS++;
                continue;
            }

            int idx = Collections.binarySearch(dp, nums[i]);
            if (idx < 0) idx = -idx - 1;
            dp.set(idx, nums[i]);
        }

        return LIS;
    }
}
```

```cpp
class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        int n = envelopes.size();
        vector<int> nums(n);
        sort(envelopes.begin(), envelopes.end(), [](auto &a, auto &b) {
            if (a[0] != b[0]) return a[0] < b[0];
            return a[1] > b[1];
        });
        for (int i = 0; i < n; i++) nums[i] = envelopes[i][1];

        vector<int> dp;
        dp.push_back(nums[0]);

        int LIS = 1;
        for (int i = 1; i < n; i++) {
            if (dp.back() < nums[i]) {
                dp.push_back(nums[i]);
                LIS++;
                continue;
            }

            int idx = lower_bound(dp.begin(),
                                  dp.end(), nums[i]) - dp.begin();
            dp[idx] = nums[i];
        }

        return LIS;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} envelopes
     * @return {number}
     */
    maxEnvelopes(envelopes) {
        const n = envelopes.length;
        envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
        const nums = envelopes.map((e) => e[1]);
        const dp = [];
        dp.push(nums[0]);

        let LIS = 1;
        for (let i = 1; i < n; i++) {
            if (dp[dp.length - 1] < nums[i]) {
                dp.push(nums[i]);
                LIS++;
                continue;
            }

            let left = 0,
                right = dp.length - 1;
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (dp[mid] < nums[i]) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            dp[left] = nums[i];
        }

        return LIS;
    }
}
```

```csharp
public class Solution {
    public int MaxEnvelopes(int[][] envelopes) {
        int n = envelopes.Length;
        Array.Sort(envelopes, (a, b) =>
            a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]
        );

        int[] nums = envelopes.Select(e => e[1]).ToArray();

        List<int> dp = new List<int>();
        dp.Add(nums[0]);

        int LIS = 1;
        for (int i = 1; i < n; i++) {
            if (dp[dp.Count - 1] < nums[i]) {
                dp.Add(nums[i]);
                LIS++;
                continue;
            }

            int idx = dp.BinarySearch(nums[i]);
            if (idx < 0) idx = ~idx;
            dp[idx] = nums[i];
        }

        return LIS;
    }
}
```

```go
func maxEnvelopes(envelopes [][]int) int {
    n := len(envelopes)
    sort.Slice(envelopes, func(i, j int) bool {
        if envelopes[i][0] != envelopes[j][0] {
            return envelopes[i][0] < envelopes[j][0]
        }
        return envelopes[i][1] > envelopes[j][1]
    })

    nums := make([]int, n)
    for i := 0; i < n; i++ {
        nums[i] = envelopes[i][1]
    }

    dp := []int{nums[0]}
    LIS := 1

    for i := 1; i < n; i++ {
        if dp[len(dp)-1] < nums[i] {
            dp = append(dp, nums[i])
            LIS++
            continue
        }

        idx := sort.SearchInts(dp, nums[i])
        dp[idx] = nums[i]
    }

    return LIS
}
```

```kotlin
class Solution {
    fun maxEnvelopes(envelopes: Array<IntArray>): Int {
        val n = envelopes.size
        envelopes.sortWith(compareBy({ it[0] }, { -it[1] }))

        val nums = envelopes.map { it[1] }
        val dp = mutableListOf(nums[0])
        var LIS = 1

        for (i in 1 until n) {
            if (dp.last() < nums[i]) {
                dp.add(nums[i])
                LIS++
                continue
            }

            var idx = dp.binarySearch(nums[i])
            if (idx < 0) idx = -(idx + 1)
            dp[idx] = nums[i]
        }

        return LIS
    }
}
```

```swift
class Solution {
    func maxEnvelopes(_ envelopes: [[Int]]) -> Int {
        let n = envelopes.count
        let sorted = envelopes.sorted {
            if $0[0] != $1[0] { return $0[0] < $1[0] }
            return $0[1] > $1[1]
        }

        let nums = sorted.map { $0[1] }
        var dp = [nums[0]]
        var LIS = 1

        for i in 1..<n {
            if dp.last! < nums[i] {
                dp.append(nums[i])
                LIS += 1
                continue
            }

            var left = 0, right = dp.count - 1
            while left < right {
                let mid = (left + right) / 2
                if dp[mid] < nums[i] {
                    left = mid + 1
                } else {
                    right = mid
                }
            }
            dp[left] = nums[i]
        }

        return LIS
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Segment Tree

### Intuition

A segment tree can efficiently answer range maximum queries, which helps compute LIS. For each height, we query the maximum LIS length among all smaller heights, add one, and update the tree with this new value. Coordinate compression reduces the height values to a manageable range. This approach achieves the same O(n log n) complexity as binary search but offers a different perspective using range queries.

### Algorithm

1. Sort envelopes by width ascending, height descending for equal widths.
2. Extract and compress heights to consecutive integers starting from 0.
3. Build a segment tree that supports range maximum queries and point updates.
4. For each compressed height `h`:
   - Query the maximum LIS value in the range `[0, h - 1]`.
   - The current LIS ending at `h` is `query result + 1`.
   - Update the segment tree at position `h` with this value.
5. Return the maximum LIS value found.

::tabs-start

```python
class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.tree = [0] * (2 * self.n)

    def update(self, i, val):
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = max(self.tree[j << 1], self.tree[j << 1 | 1])
            j >>= 1

    def query(self, l, r):
        if l > r:
            return 0
        res = float('-inf')
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l >>= 1
            r >>= 1
        return res

class Solution:
    def maxEnvelopes(self, envelopes: List[List[int]]) -> int:
        n = len(envelopes)
        envelopes.sort(key=lambda x: (x[0], -x[1]))

        def lis(nums):
            def compress(arr):
                sortedArr = sorted(set(arr))
                order = []
                for num in arr:
                    order.append(bisect_left(sortedArr, num))
                return order

            nums = compress(nums)
            n = len(nums)
            segTree = SegmentTree(n)

            LIS = 0
            for num in nums:
                curLIS = segTree.query(0, num - 1) + 1
                segTree.update(num, curLIS)
                LIS = max(LIS, curLIS)
            return LIS

        return lis([e[1] for e in envelopes])
```

```java
class SegmentTree {
    int n;
    int[] tree;

    public SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        tree = new int[2 * n];
    }

    void update(int i, int val) {
        tree[n + i] = val;
        int j = (n + i) >> 1;
        while (j >= 1) {
            tree[j] = Math.max(tree[j << 1], tree[j << 1 | 1]);
            j >>= 1;
        }
    }

    int query(int l, int r) {
        if (l > r) {
            return 0;
        }
        int res = Integer.MIN_VALUE;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) != 0) {
                res = Math.max(res, tree[l]);
                l++;
            }
            if ((r & 1) != 0) {
                r--;
                res = Math.max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int lis(int[] nums) {
        int[] sortedArr = Arrays.stream(nums).distinct().sorted().toArray();
        int[] order = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            order[i] = Arrays.binarySearch(sortedArr, nums[i]);
        }
        int n = sortedArr.length;
        SegmentTree segTree = new SegmentTree(n);

        int LIS = 0;
        for (int num : order) {
            int curLIS = segTree.query(0, num - 1) + 1;
            segTree.update(num, curLIS);
            LIS = Math.max(LIS, curLIS);
        }
        return LIS;
    }

    public int maxEnvelopes(int[][] envelopes) {
        int n = envelopes.length;
        Arrays.sort(envelopes, (a, b) ->
            a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]
        );

        int[] heights = new int[n];
        for (int i = 0; i < n; i++) heights[i] = envelopes[i][1];
        return lis(heights);
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;

    SegmentTree(int N) {
        n = N;
        while (n & (n - 1)) {
            n++;
        }
        tree.resize(2 * n);
    }

    void update(int i, int val) {
        tree[n + i] = val;
        int j = (n + i) >> 1;
        while (j >= 1) {
            tree[j] = max(tree[j << 1], tree[j << 1 | 1]);
            j >>= 1;
        }
    }

    int query(int l, int r) {
        if (l > r) {
            return 0;
        }
        int res = INT_MIN;
        l += n;
        r += n + 1;
        while (l < r) {
            if (l & 1) {
                res = max(res, tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
};

class Solution {
    int lis(vector<int>& nums) {
        vector<int> sortedArr = nums;
        sort(sortedArr.begin(), sortedArr.end());
        sortedArr.erase(unique(sortedArr.begin(),
                        sortedArr.end()), sortedArr.end());

        vector<int> order(nums.size());
        for (int i = 0; i < nums.size(); i++) {
            order[i] = lower_bound(sortedArr.begin(), sortedArr.end(),
                                   nums[i]) - sortedArr.begin();
        }

        int n = sortedArr.size();
        SegmentTree segTree(n);

        int LIS = 0;
        for (int num : order) {
            int curLIS = segTree.query(0, num - 1) + 1;
            segTree.update(num, curLIS);
            LIS = max(LIS, curLIS);
        }
        return LIS;
    }

public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        int n = envelopes.size();
        sort(envelopes.begin(), envelopes.end(),
             [](const vector<int>& a, const vector<int>& b) {
                 if (a[0] != b[0]) return a[0] < b[0];
                 return a[1] > b[1];
             });
        vector<int> heights(n);
        for (int i = 0; i < n; ++i) heights[i] = envelopes[i][1];
        return lis(heights);
    }
};
```

```javascript
class SegmentTree {
    constructor(N, a) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.tree = new Array(2 * this.n).fill(0);
    }

    /**
     * @param {number} i
     * @param {number} val
     */
    update(i, val) {
        this.tree[this.n + i] = val;
        let j = (this.n + i) >> 1;
        while (j >= 1) {
            this.tree[j] = Math.max(this.tree[j << 1], this.tree[(j << 1) | 1]);
            j >>= 1;
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        if (l > r) {
            return 0;
        }
        let res = -Infinity;
        l += this.n;
        r += this.n + 1;
        while (l < r) {
            if (l & 1) {
                res = Math.max(res, this.tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = Math.max(res, this.tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

class Solution {
    /**
     * @param {number[][]} envelopes
     * @return {number}
     */
    maxEnvelopes(envelopes) {
        envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
        const heights = envelopes.map((e) => e[1]);

        const lis = (nums) => {
            const sortedArr = Array.from(new Set(nums)).sort((a, b) => a - b);
            const map = new Map();

            sortedArr.forEach((num, index) => {
                map.set(num, index);
            });

            const order = nums.map((num) => map.get(num));
            const n = sortedArr.length;
            const segTree = new SegmentTree(n, order);

            let LIS = 0;
            for (const num of order) {
                const curLIS = segTree.query(0, num - 1) + 1;
                segTree.update(num, curLIS);
                LIS = Math.max(LIS, curLIS);
            }
            return LIS;
        };
        return lis(heights);
    }
}
```

```csharp
public class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        n = N;
        tree = new int[2 * n];
        Array.Fill(tree, 0);
    }

    public void Update(int i, int val) {
        tree[n + i] = val;
        int j = (n + i) >> 1;
        while (j >= 1) {
            tree[j] = Math.Max(tree[2 * j], tree[2 * j + 1]);
            j >>= 1;
        }
    }

    public int Query(int l, int r) {
        if (l > r) {
            return 0;
        }
        int res = int.MinValue;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) {
                res = Math.Max(res, tree[l]);
                l++;
            }
            if ((r & 1) == 1) {
                r--;
                res = Math.Max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int Lis(int[] nums) {
        var sortedArr = nums.Distinct().OrderBy(x => x).ToArray();
        var map = new Dictionary<int, int>();

        for (int i = 0; i < sortedArr.Length; i++) {
            map[sortedArr[i]] = i;
        }

        int n = sortedArr.Length;
        var segTree = new SegmentTree(n);

        int LIS = 0;
        foreach (var num in nums) {
            int compressedIndex = map[num];
            int curLIS = segTree.Query(0, compressedIndex - 1) + 1;
            segTree.Update(compressedIndex, curLIS);
            LIS = Math.Max(LIS, curLIS);
        }
        return LIS;
    }

    public int MaxEnvelopes(int[][] envelopes) {
        int n = envelopes.Length;
        Array.Sort(envelopes, (a, b) =>
            a[0] != b[0] ? a[0] - b[0] : b[1] - a[1]
        );
        int[] heights = new int[n];
        for (int i = 0; i < n; i++) heights[i] = envelopes[i][1];
        return Lis(heights);
    }
}
```

```go
type SegmentTree struct {
    n    int
    tree []int
}

func NewSegmentTree(N int) *SegmentTree {
    n := N
    for n&(n-1) != 0 {
        n++
    }
    return &SegmentTree{
        n:    n,
        tree: make([]int, 2*n),
    }
}

func (st *SegmentTree) Update(i, val int) {
    st.tree[st.n+i] = val
    j := (st.n + i) >> 1
    for j >= 1 {
        st.tree[j] = max(st.tree[j<<1], st.tree[j<<1|1])
        j >>= 1
    }
}

func (st *SegmentTree) Query(l, r int) int {
    if l > r {
        return 0
    }
    res := math.MinInt32
    l += st.n
    r += st.n + 1
    for l < r {
        if l&1 == 1 {
            res = max(res, st.tree[l])
            l++
        }
        if r&1 == 1 {
            r--
            res = max(res, st.tree[r])
        }
        l >>= 1
        r >>= 1
    }
    return res
}

func maxEnvelopes(envelopes [][]int) int {
    n := len(envelopes)
    sort.Slice(envelopes, func(i, j int) bool {
        if envelopes[i][0] != envelopes[j][0] {
            return envelopes[i][0] < envelopes[j][0]
        }
        return envelopes[i][1] > envelopes[j][1]
    })

    heights := make([]int, n)
    for i := 0; i < n; i++ {
        heights[i] = envelopes[i][1]
    }

    sortedSet := make(map[int]bool)
    for _, h := range heights {
        sortedSet[h] = true
    }
    sortedArr := make([]int, 0, len(sortedSet))
    for h := range sortedSet {
        sortedArr = append(sortedArr, h)
    }
    sort.Ints(sortedArr)

    indexMap := make(map[int]int)
    for i, h := range sortedArr {
        indexMap[h] = i
    }

    segTree := NewSegmentTree(len(sortedArr))
    LIS := 0
    for _, h := range heights {
        idx := indexMap[h]
        curLIS := segTree.Query(0, idx-1) + 1
        segTree.Update(idx, curLIS)
        LIS = max(LIS, curLIS)
    }
    return LIS
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class SegmentTree(N: Int) {
    private var n: Int = N
    private val tree: IntArray

    init {
        while (n and (n - 1) != 0) n++
        tree = IntArray(2 * n)
    }

    fun update(i: Int, value: Int) {
        tree[n + i] = value
        var j = (n + i) shr 1
        while (j >= 1) {
            tree[j] = maxOf(tree[j shl 1], tree[j shl 1 or 1])
            j = j shr 1
        }
    }

    fun query(l: Int, r: Int): Int {
        if (l > r) return 0
        var res = Int.MIN_VALUE
        var left = l + n
        var right = r + n + 1
        while (left < right) {
            if (left and 1 == 1) {
                res = maxOf(res, tree[left])
                left++
            }
            if (right and 1 == 1) {
                right--
                res = maxOf(res, tree[right])
            }
            left = left shr 1
            right = right shr 1
        }
        return res
    }
}

class Solution {
    fun maxEnvelopes(envelopes: Array<IntArray>): Int {
        val n = envelopes.size
        envelopes.sortWith(compareBy({ it[0] }, { -it[1] }))

        val heights = envelopes.map { it[1] }
        val sortedArr = heights.toSet().sorted()
        val indexMap = sortedArr.withIndex().associate { it.value to it.index }

        val segTree = SegmentTree(sortedArr.size)
        var LIS = 0
        for (h in heights) {
            val idx = indexMap[h]!!
            val curLIS = segTree.query(0, idx - 1) + 1
            segTree.update(idx, curLIS)
            LIS = maxOf(LIS, curLIS)
        }
        return LIS
    }
}
```

```swift
class SegmentTree {
    private var n: Int
    private var tree: [Int]

    init(_ N: Int) {
        n = N
        while n & (n - 1) != 0 {
            n += 1
        }
        tree = [Int](repeating: 0, count: 2 * n)
    }

    func update(_ i: Int, _ val: Int) {
        tree[n + i] = val
        var j = (n + i) >> 1
        while j >= 1 {
            tree[j] = max(tree[j << 1], tree[j << 1 | 1])
            j >>= 1
        }
    }

    func query(_ l: Int, _ r: Int) -> Int {
        if l > r { return 0 }
        var res = Int.min
        var left = l + n
        var right = r + n + 1
        while left < right {
            if left & 1 == 1 {
                res = max(res, tree[left])
                left += 1
            }
            if right & 1 == 1 {
                right -= 1
                res = max(res, tree[right])
            }
            left >>= 1
            right >>= 1
        }
        return res
    }
}

class Solution {
    func maxEnvelopes(_ envelopes: [[Int]]) -> Int {
        let n = envelopes.count
        let sorted = envelopes.sorted {
            if $0[0] != $1[0] { return $0[0] < $1[0] }
            return $0[1] > $1[1]
        }

        let heights = sorted.map { $0[1] }
        let sortedArr = Array(Set(heights)).sorted()
        var indexMap = [Int: Int]()
        for (i, h) in sortedArr.enumerated() {
            indexMap[h] = i
        }

        let segTree = SegmentTree(sortedArr.count)
        var LIS = 0
        for h in heights {
            let idx = indexMap[h]!
            let curLIS = segTree.query(0, idx - 1) + 1
            segTree.update(idx, curLIS)
            LIS = max(LIS, curLIS)
        }
        return LIS
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
