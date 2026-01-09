## 1. Dynamic Programming (Top-Down)

### Intuition

A divisible subset has a special property: if we sort the numbers, then for any pair in the subset, the larger number must be divisible by the smaller one. This means if we sort the array and pick elements in order, we only need to check divisibility with the most recently picked element. We can use recursion with memoization to try including or skipping each number.

### Algorithm

1. Sort the array in ascending order.
2. Define a recursive function `dfs(i, prevIndex)` that returns the largest divisible subset starting from index `i`, where `prevIndex` is the index of the last included element (or -1 if none).
3. At each index:
   - Option 1: Skip the current number.
   - Option 2: If no previous element exists or the current number is divisible by the previous one, include it and recurse.
4. Memoize results based on `(i, prevIndex)` to avoid recomputation.
5. Return the larger of the two options.

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        cache = {}  # (i, prevIndex) -> List

        def dfs(i, prevIndex):
            if i == len(nums):
                return []
            if (i, prevIndex) in cache:
                return cache[(i, prevIndex)]

            res = dfs(i + 1, prevIndex)  # Skip nums[i]
            if prevIndex == -1 or nums[i] % nums[prevIndex] == 0:
                tmp = [nums[i]] + dfs(i + 1, i)  # Include nums[i]
                res = tmp if len(tmp) > len(res) else res

            cache[(i, prevIndex)] = res
            return res

        return dfs(0, -1)
```

```java
public class Solution {
    private List<Integer>[][] cache;

    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        cache = new ArrayList[n][n + 1];
        return dfs(0, -1, nums);
    }

    private List<Integer> dfs(int i, int prevIndex, int[] nums) {
        if (i == nums.length) return new ArrayList<>();
        if (cache[i][prevIndex + 1] != null) return cache[i][prevIndex + 1];

        List<Integer> res = dfs(i + 1, prevIndex, nums);

        if (prevIndex == -1 || nums[i] % nums[prevIndex] == 0) {
            List<Integer> tmp = new ArrayList<>();
            tmp.add(nums[i]);
            tmp.addAll(dfs(i + 1, i, nums));
            if (tmp.size() > res.size()) res = tmp;
        }

        cache[i][prevIndex + 1] = res;
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<vector<int>>> cache;

public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        cache = vector<vector<vector<int>>>(n, vector<vector<int>>(n + 1));
        return dfs(0, -1, nums);
    }

    vector<int> dfs(int i, int prevIndex, vector<int>& nums) {
        if (i == nums.size()) return {};
        if (!cache[i][prevIndex + 1].empty()) return cache[i][prevIndex + 1];

        vector<int> res = dfs(i + 1, prevIndex, nums);

        if (prevIndex == -1 || nums[i] % nums[prevIndex] == 0) {
            vector<int> tmp = {nums[i]};
            vector<int> next = dfs(i + 1, i, nums);
            tmp.insert(tmp.end(), next.begin(), next.end());
            if (tmp.size() > res.size()) res = tmp;
        }

        return cache[i][prevIndex + 1] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        const cache = new Map();

        const dfs = (i, prevIndex) => {
            if (i === nums.length) return [];

            let key = `${i},${prevIndex}`;
            if (cache.has(key)) return cache.get(key);

            let res = dfs(i + 1, prevIndex);
            if (prevIndex === -1 || nums[i] % nums[prevIndex] === 0) {
                let tmp = [nums[i], ...dfs(i + 1, i)];
                if (tmp.length > res.length) res = tmp;
            }

            cache.set(key, res);
            return res;
        };

        return dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    private List<int>[][] cache;
    private int[] nums;

    public List<int> LargestDivisibleSubset(int[] nums) {
        Array.Sort(nums);
        this.nums = nums;
        int n = nums.Length;
        cache = new List<int>[n + 1][];
        for (int i = 0; i <= n; i++) {
            cache[i] = new List<int>[n + 1];
        }
        return Dfs(0, -1);
    }

    private List<int> Dfs(int i, int prevIndex) {
        if (i == nums.Length) return new List<int>();
        if (cache[i][prevIndex + 1] != null) return cache[i][prevIndex + 1];

        List<int> res = Dfs(i + 1, prevIndex);
        if (prevIndex == -1 || nums[i] % nums[prevIndex] == 0) {
            List<int> tmp = new List<int> { nums[i] };
            tmp.AddRange(Dfs(i + 1, i));
            if (tmp.Count > res.Count) res = tmp;
        }

        cache[i][prevIndex + 1] = res;
        return res;
    }
}
```

```go
func largestDivisibleSubset(nums []int) []int {
    sort.Ints(nums)
    n := len(nums)
    cache := make([][][]int, n)
    for i := range cache {
        cache[i] = make([][]int, n+1)
    }

    var dfs func(i, prevIndex int) []int
    dfs = func(i, prevIndex int) []int {
        if i == n {
            return []int{}
        }
        if cache[i][prevIndex+1] != nil {
            return cache[i][prevIndex+1]
        }

        res := dfs(i+1, prevIndex)
        if prevIndex == -1 || nums[i]%nums[prevIndex] == 0 {
            tmp := append([]int{nums[i]}, dfs(i+1, i)...)
            if len(tmp) > len(res) {
                res = tmp
            }
        }

        cache[i][prevIndex+1] = res
        return res
    }

    return dfs(0, -1)
}
```

```kotlin
class Solution {
    private lateinit var cache: Array<Array<List<Int>?>>
    private lateinit var nums: IntArray

    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        nums.sort()
        this.nums = nums
        val n = nums.size
        cache = Array(n) { arrayOfNulls<List<Int>>(n + 1) }
        return dfs(0, -1)
    }

    private fun dfs(i: Int, prevIndex: Int): List<Int> {
        if (i == nums.size) return emptyList()
        cache[i][prevIndex + 1]?.let { return it }

        var res = dfs(i + 1, prevIndex)
        if (prevIndex == -1 || nums[i] % nums[prevIndex] == 0) {
            val tmp = listOf(nums[i]) + dfs(i + 1, i)
            if (tmp.size > res.size) res = tmp
        }

        cache[i][prevIndex + 1] = res
        return res
    }
}
```

```swift
class Solution {
    func largestDivisibleSubset(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        let n = nums.count
        var cache = [[Int]?](repeating: nil, count: n * (n + 1))

        func dfs(_ i: Int, _ prevIndex: Int) -> [Int] {
            if i == n { return [] }
            let key = i * (n + 1) + (prevIndex + 1)
            if let cached = cache[key] { return cached }

            var res = dfs(i + 1, prevIndex)
            if prevIndex == -1 || nums[i] % nums[prevIndex] == 0 {
                let tmp = [nums[i]] + dfs(i + 1, i)
                if tmp.count > res.count { res = tmp }
            }

            cache[key] = res
            return res
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming (Top-Down) Space Optimized

### Intuition

We can simplify the state by observing that we only need to track the starting index, not the previous index. For each starting position, we find the longest divisible subset that begins there. When building the subset from index `i`, we look at all later indices `j` where `nums[j]` is divisible by `nums[i]` and take the best result.

### Algorithm

1. Sort the array in ascending order.
2. Define `dfs(i)` that returns the largest divisible subset starting at index `i`.
3. At each index `i`:
   - Initialize the result with just `nums[i]`.
   - For each later index `j` where `nums[j] % nums[i] == 0`, recursively get the subset starting at `j`.
   - Prepend `nums[i]` to the best result and keep the longest.
4. Memoize results for each starting index.
5. Try all starting positions and return the longest subset found.

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        cache = {}

        def dfs(i):
            if i in cache:
                return cache[i]

            res = [nums[i]]
            for j in range(i + 1, len(nums)):
                if nums[j] % nums[i] == 0:
                    tmp = [nums[i]] + dfs(j)
                    if len(tmp) > len(res):
                        res = tmp

            cache[i] = res
            return res

        res = []
        for i in range(len(nums)):
            tmp = dfs(i)
            if len(tmp) > len(res):
                res = tmp
        return res
```

```java
public class Solution {
    private List<Integer>[] cache;

    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        cache = new ArrayList[n];

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            List<Integer> tmp = dfs(i, nums);
            if (tmp.size() > res.size()) {
                res = tmp;
            }
        }
        return res;
    }

    private List<Integer> dfs(int i, int[] nums) {
        if (cache[i] != null) return cache[i];

        List<Integer> res = new ArrayList<>();
        res.add(nums[i]);
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] % nums[i] == 0) {
                List<Integer> tmp = new ArrayList<>();
                tmp.add(nums[i]);
                tmp.addAll(dfs(j, nums));

                if (tmp.size() > res.size()) {
                    res = tmp;
                }
            }
        }
        return cache[i] = res;
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> cache;

public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        cache.resize(n, vector<int>());

        vector<int> res;
        for (int i = 0; i < n; i++) {
            vector<int> tmp = dfs(i, nums);
            if (tmp.size() > res.size()) {
                res = tmp;
            }
        }
        return res;
    }

    vector<int> dfs(int i, vector<int>& nums) {
        if (!cache[i].empty()) return cache[i];

        vector<int> res = {nums[i]};
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[j] % nums[i] == 0) {
                vector<int> tmp = {nums[i]};
                vector<int> next = dfs(j, nums);
                tmp.insert(tmp.end(), next.begin(), next.end());

                if (tmp.size() > res.size()) {
                    res = tmp;
                }
            }
        }
        return cache[i] = res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        const cache = new Array(n).fill(null);

        const dfs = (i) => {
            if (cache[i] !== null) return cache[i];

            let res = [nums[i]];
            for (let j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] === 0) {
                    let tmp = [nums[i], ...dfs(j)];
                    if (tmp.length > res.length) {
                        res = tmp;
                    }
                }
            }
            return (cache[i] = res);
        };

        let res = [];
        for (let i = 0; i < n; i++) {
            let tmp = dfs(i);
            if (tmp.length > res.length) {
                res = tmp;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, List<int>> cache;
    private int[] nums;

    public List<int> LargestDivisibleSubset(int[] nums) {
        Array.Sort(nums);
        this.nums = nums;
        cache = new Dictionary<int, List<int>>();
        List<int> res = new List<int>();

        for (int i = 0; i < nums.Length; i++) {
            List<int> tmp = Dfs(i);
            if (tmp.Count > res.Count) {
                res = tmp;
            }
        }
        return res;
    }

    private List<int> Dfs(int i) {
        if (cache.ContainsKey(i)) return cache[i];

        List<int> res = new List<int> { nums[i] };
        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[j] % nums[i] == 0) {
                List<int> tmp = new List<int> { nums[i] };
                tmp.AddRange(Dfs(j));
                if (tmp.Count > res.Count) {
                    res = tmp;
                }
            }
        }

        cache[i] = res;
        return res;
    }
}
```

```go
func largestDivisibleSubset(nums []int) []int {
    sort.Ints(nums)
    n := len(nums)
    cache := make([][]int, n)

    var dfs func(i int) []int
    dfs = func(i int) []int {
        if cache[i] != nil {
            return cache[i]
        }

        res := []int{nums[i]}
        for j := i + 1; j < n; j++ {
            if nums[j]%nums[i] == 0 {
                tmp := append([]int{nums[i]}, dfs(j)...)
                if len(tmp) > len(res) {
                    res = tmp
                }
            }
        }

        cache[i] = res
        return res
    }

    res := []int{}
    for i := 0; i < n; i++ {
        tmp := dfs(i)
        if len(tmp) > len(res) {
            res = tmp
        }
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var cache: Array<List<Int>?>
    private lateinit var nums: IntArray

    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        nums.sort()
        this.nums = nums
        cache = arrayOfNulls(nums.size)

        var res = emptyList<Int>()
        for (i in nums.indices) {
            val tmp = dfs(i)
            if (tmp.size > res.size) {
                res = tmp
            }
        }
        return res
    }

    private fun dfs(i: Int): List<Int> {
        cache[i]?.let { return it }

        var res = listOf(nums[i])
        for (j in i + 1 until nums.size) {
            if (nums[j] % nums[i] == 0) {
                val tmp = listOf(nums[i]) + dfs(j)
                if (tmp.size > res.size) {
                    res = tmp
                }
            }
        }

        cache[i] = res
        return res
    }
}
```

```swift
class Solution {
    func largestDivisibleSubset(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        let n = nums.count
        var cache = [[Int]?](repeating: nil, count: n)

        func dfs(_ i: Int) -> [Int] {
            if let cached = cache[i] { return cached }

            var res = [nums[i]]
            for j in (i + 1)..<n {
                if nums[j] % nums[i] == 0 {
                    let tmp = [nums[i]] + dfs(j)
                    if tmp.count > res.count {
                        res = tmp
                    }
                }
            }

            cache[i] = res
            return res
        }

        var res = [Int]()
        for i in 0..<n {
            let tmp = dfs(i)
            if tmp.count > res.count {
                res = tmp
            }
        }
        return res
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

We can convert the top-down approach to bottom-up. Processing from right to left, for each index we compute the longest divisible subset starting from that position. At each step, we check all later indices for valid extensions and build upon the precomputed results.

### Algorithm

1. Sort the array in ascending order.
2. Create a DP array where `dp[i]` stores the longest divisible subset starting at index `i`.
3. Initialize each `dp[i]` with just the element at that index.
4. Iterate from right to left:
   - For each later index `j`, if `nums[j] % nums[i] == 0`, check if prepending `nums[i]` to `dp[j]` gives a longer subset.
   - Update `dp[i]` with the longest result.
   - Track the overall longest subset found.
5. Return the longest subset.

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        dp = [[num] for num in nums]  # dp[i] = longest start at i
        res = []
        for i in range(len(nums) - 1, -1, -1):
            for j in range(i + 1, len(nums)):
                if nums[j] % nums[i] == 0:
                    tmp = [nums[i]] + dp[j]
                    dp[i] = tmp if len(tmp) > len(dp[i]) else dp[i]
            res = dp[i] if len(dp[i]) > len(res) else res
        return res
```

```java
public class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        List<Integer>[] dp = new ArrayList[n];
        List<Integer> res = new ArrayList<>();

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = new ArrayList<>();
            dp[i].add(nums[i]);

            for (int j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] == 0) {
                    List<Integer> tmp = new ArrayList<>();
                    tmp.add(nums[i]);
                    tmp.addAll(dp[j]);

                    if (tmp.size() > dp[i].size()) {
                        dp[i] = tmp;
                    }
                }
            }
            if (dp[i].size() > res.size()) {
                res = dp[i];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<vector<int>> dp(n);
        vector<int> res;

        for (int i = n - 1; i >= 0; i--) {
            dp[i].push_back(nums[i]);

            for (int j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] == 0) {
                    vector<int> tmp = dp[j];
                    tmp.insert(tmp.begin(), nums[i]);

                    if (tmp.size() > dp[i].size()) {
                        dp[i] = tmp;
                    }
                }
            }
            if (dp[i].size() > res.size()) {
                res = dp[i];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        const n = nums.length;
        const dp = new Array(n).fill(0).map(() => []);
        let res = [];

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = [nums[i]];

            for (let j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] === 0) {
                    let tmp = [nums[i], ...dp[j]];

                    if (tmp.length > dp[i].length) {
                        dp[i] = tmp;
                    }
                }
            }
            if (dp[i].length > res.length) {
                res = dp[i];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> LargestDivisibleSubset(int[] nums) {
        Array.Sort(nums);
        List<List<int>> dp = new List<List<int>>();
        foreach (int num in nums) {
            dp.Add(new List<int> { num });
        }

        List<int> res = new List<int>();
        for (int i = nums.Length - 1; i >= 0; i--) {
            for (int j = i + 1; j < nums.Length; j++) {
                if (nums[j] % nums[i] == 0) {
                    List<int> tmp = new List<int> { nums[i] };
                    tmp.AddRange(dp[j]);
                    if (tmp.Count > dp[i].Count) dp[i] = tmp;
                }
            }
            if (dp[i].Count > res.Count) res = dp[i];
        }

        return res;
    }
}
```

```go
func largestDivisibleSubset(nums []int) []int {
    sort.Ints(nums)
    n := len(nums)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = []int{nums[i]}
    }

    res := []int{}
    for i := n - 1; i >= 0; i-- {
        for j := i + 1; j < n; j++ {
            if nums[j]%nums[i] == 0 {
                tmp := append([]int{nums[i]}, dp[j]...)
                if len(tmp) > len(dp[i]) {
                    dp[i] = tmp
                }
            }
        }
        if len(dp[i]) > len(res) {
            res = dp[i]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        nums.sort()
        val n = nums.size
        val dp = Array(n) { mutableListOf(nums[it]) }

        var res = emptyList<Int>()
        for (i in n - 1 downTo 0) {
            for (j in i + 1 until n) {
                if (nums[j] % nums[i] == 0) {
                    val tmp = listOf(nums[i]) + dp[j]
                    if (tmp.size > dp[i].size) {
                        dp[i] = tmp.toMutableList()
                    }
                }
            }
            if (dp[i].size > res.size) {
                res = dp[i]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func largestDivisibleSubset(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        let n = nums.count
        var dp = nums.map { [$0] }

        var res = [Int]()
        for i in stride(from: n - 1, through: 0, by: -1) {
            for j in (i + 1)..<n {
                if nums[j] % nums[i] == 0 {
                    let tmp = [nums[i]] + dp[j]
                    if tmp.count > dp[i].count {
                        dp[i] = tmp
                    }
                }
            }
            if dp[i].count > res.count {
                res = dp[i]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Top-Down) + Tracing

### Intuition

Instead of storing entire subsets in the DP table (which uses extra memory), we can store just two values per index: the length of the longest subset starting there, and the next index in that subset. After computing all lengths, we trace through the indices to reconstruct the actual subset.

### Algorithm

1. Sort the array in ascending order.
2. Create a DP array where `dp[i] = [maxLen, nextIndex]`.
3. Define `dfs(i)` that returns the length of the longest subset starting at index `i`:
   - For each later index `j` where `nums[j] % nums[i] == 0`, compute the length via `dfs(j) + 1`.
   - Track which `j` gave the best length for tracing.
4. Find the starting index with the maximum length.
5. Reconstruct the subset by following the `nextIndex` pointers.

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        n = len(nums)
        dp = [[-1, -1] for _ in range(n)]  # dp[i] = [maxLen, prevIdx]

        def dfs(i):
            if dp[i][0] != -1:
                return dp[i][0]

            dp[i][0] = 1
            for j in range(i + 1, n):
                if nums[j] % nums[i] == 0:
                    length = dfs(j) + 1
                    if length > dp[i][0]:
                        dp[i][0] = length
                        dp[i][1] = j

            return dp[i][0]

        max_len, start_index = 1, 0
        for i in range(n):
            if dfs(i) > max_len:
                max_len = dfs(i)
                start_index = i

        subset = []
        while start_index != -1:
            subset.append(nums[start_index])
            start_index = dp[start_index][1]

        return subset
```

```java
public class Solution {
    private int[][] dp;

    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        dp = new int[n][2];
        for (int i = 0; i < n; i++) {
            dp[i][0] = -1;
            dp[i][1] = -1;
        }

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, nums) > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        List<Integer> subset = new ArrayList<>();
        while (startIndex != -1) {
            subset.add(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }

    private int dfs(int i, int[] nums) {
        if (dp[i][0] != -1) return dp[i][0];

        dp[i][0] = 1;
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] % nums[i] == 0) {
                int length = dfs(j, nums) + 1;
                if (length > dp[i][0]) {
                    dp[i][0] = length;
                    dp[i][1] = j;
                }
            }
        }
        return dp[i][0];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        dp.assign(n, vector<int>(2, -1));

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            if (dfs(i, nums) > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        vector<int> subset;
        while (startIndex != -1) {
            subset.push_back(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }

private:
    int dfs(int i, vector<int>& nums) {
        if (dp[i][0] != -1) return dp[i][0];

        dp[i][0] = 1;
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[j] % nums[i] == 0) {
                int length = dfs(j, nums) + 1;
                if (length > dp[i][0]) {
                    dp[i][0] = length;
                    dp[i][1] = j;
                }
            }
        }
        return dp[i][0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        let n = nums.length;
        let dp = Array.from({ length: n }, () => [-1, -1]); // dp[i] = [maxLen, prevIdx]

        const dfs = (i) => {
            if (dp[i][0] !== -1) return dp[i][0];

            dp[i][0] = 1;
            for (let j = i + 1; j < n; j++) {
                if (nums[j] % nums[i] === 0) {
                    let length = dfs(j) + 1;
                    if (length > dp[i][0]) {
                        dp[i][0] = length;
                        dp[i][1] = j;
                    }
                }
            }
            return dp[i][0];
        };

        let maxLen = 1,
            startIndex = 0;
        for (let i = 0; i < n; i++) {
            if (dfs(i) > maxLen) {
                maxLen = dfs(i);
                startIndex = i;
            }
        }

        let subset = [];
        while (startIndex !== -1) {
            subset.push(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
}
```

```csharp
public class Solution {
    private int[][] dp;
    private int[] nums;
    private int n;

    public List<int> LargestDivisibleSubset(int[] nums) {
        Array.Sort(nums);
        this.nums = nums;
        n = nums.Length;
        dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[] { -1, -1 };
        }

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            if (Dfs(i) > maxLen) {
                maxLen = Dfs(i);
                startIndex = i;
            }
        }

        List<int> subset = new List<int>();
        while (startIndex != -1) {
            subset.Add(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }

        return subset;
    }

    private int Dfs(int i) {
        if (dp[i][0] != -1) return dp[i][0];

        dp[i][0] = 1;
        for (int j = i + 1; j < n; j++) {
            if (nums[j] % nums[i] == 0) {
                int length = Dfs(j) + 1;
                if (length > dp[i][0]) {
                    dp[i][0] = length;
                    dp[i][1] = j;
                }
            }
        }

        return dp[i][0];
    }
}
```

```go
func largestDivisibleSubset(nums []int) []int {
    sort.Ints(nums)
    n := len(nums)
    dp := make([][2]int, n)
    for i := range dp {
        dp[i] = [2]int{-1, -1}
    }

    var dfs func(i int) int
    dfs = func(i int) int {
        if dp[i][0] != -1 {
            return dp[i][0]
        }

        dp[i][0] = 1
        for j := i + 1; j < n; j++ {
            if nums[j]%nums[i] == 0 {
                length := dfs(j) + 1
                if length > dp[i][0] {
                    dp[i][0] = length
                    dp[i][1] = j
                }
            }
        }
        return dp[i][0]
    }

    maxLen, startIndex := 1, 0
    for i := 0; i < n; i++ {
        if dfs(i) > maxLen {
            maxLen = dfs(i)
            startIndex = i
        }
    }

    subset := []int{}
    for startIndex != -1 {
        subset = append(subset, nums[startIndex])
        startIndex = dp[startIndex][1]
    }

    return subset
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>
    private lateinit var nums: IntArray
    private var n = 0

    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        nums.sort()
        this.nums = nums
        n = nums.size
        dp = Array(n) { intArrayOf(-1, -1) }

        var maxLen = 1
        var startIndex = 0
        for (i in 0 until n) {
            if (dfs(i) > maxLen) {
                maxLen = dfs(i)
                startIndex = i
            }
        }

        val subset = mutableListOf<Int>()
        var idx = startIndex
        while (idx != -1) {
            subset.add(nums[idx])
            idx = dp[idx][1]
        }

        return subset
    }

    private fun dfs(i: Int): Int {
        if (dp[i][0] != -1) return dp[i][0]

        dp[i][0] = 1
        for (j in i + 1 until n) {
            if (nums[j] % nums[i] == 0) {
                val length = dfs(j) + 1
                if (length > dp[i][0]) {
                    dp[i][0] = length
                    dp[i][1] = j
                }
            }
        }

        return dp[i][0]
    }
}
```

```swift
class Solution {
    func largestDivisibleSubset(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        let n = nums.count
        var dp = [[Int]](repeating: [-1, -1], count: n)

        func dfs(_ i: Int) -> Int {
            if dp[i][0] != -1 { return dp[i][0] }

            dp[i][0] = 1
            for j in (i + 1)..<n {
                if nums[j] % nums[i] == 0 {
                    let length = dfs(j) + 1
                    if length > dp[i][0] {
                        dp[i][0] = length
                        dp[i][1] = j
                    }
                }
            }
            return dp[i][0]
        }

        var maxLen = 1
        var startIndex = 0
        for i in 0..<n {
            if dfs(i) > maxLen {
                maxLen = dfs(i)
                startIndex = i
            }
        }

        var subset = [Int]()
        var idx = startIndex
        while idx != -1 {
            subset.append(nums[idx])
            idx = dp[idx][1]
        }

        return subset
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Dynamic Programming (Bottom-Up) + Tracing

### Intuition

This is the iterative version of the tracing approach. We process indices from left to right, looking backward for valid predecessors. For each position, we store the length of the longest subset ending there and a pointer to the previous index. This is similar to the classic Longest Increasing Subsequence pattern.

### Algorithm

1. Sort the array in ascending order.
2. Create a DP array where `dp[i] = [maxLen, prevIndex]`, initialized with length 1 and no predecessor.
3. For each index `i`, check all earlier indices `j`:
   - If `nums[i] % nums[j] == 0` and extending from `j` gives a longer subset, update `dp[i]`.
   - Track the index with the overall maximum length.
4. Reconstruct the subset by following the `prevIndex` pointers backward from the best ending index.

::tabs-start

```python
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        nums.sort()
        n = len(nums)
        dp = [[1, -1] for _ in range(n)]  # dp[i] = [maxLen, prevIdx]

        max_len, start_index = 1, 0

        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0 and dp[j][0] + 1 > dp[i][0]:
                    dp[i][0] = dp[j][0] + 1
                    dp[i][1] = j

            if dp[i][0] > max_len:
                max_len = dp[i][0]
                start_index = i

        subset = []
        while start_index != -1:
            subset.append(nums[start_index])
            start_index = dp[start_index][1]
        return subset
```

```java
public class Solution {
    public List<Integer> largestDivisibleSubset(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int[][] dp = new int[n][2]; // dp[i] = {maxLen, prevIdx}

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            dp[i][0] = 1;
            dp[i][1] = -1;
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = j;
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        List<Integer> subset = new ArrayList<>();
        while (startIndex != -1) {
            subset.add(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
}
```

```cpp
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(2, -1)); // dp[i] = {maxLen, prevIdx}

        int maxLen = 1, startIndex = 0;
        for (int i = 0; i < n; i++) {
            dp[i][0] = 1;
            dp[i][1] = -1;
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = j;
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        vector<int> subset;
        while (startIndex != -1) {
            subset.push_back(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    largestDivisibleSubset(nums) {
        nums.sort((a, b) => a - b);
        let n = nums.length;
        let dp = Array.from({ length: n }, () => [1, -1]); // dp[i] = [maxLen, prevIdx]

        let maxLen = 1,
            startIndex = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[i] % nums[j] === 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = j;
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        let subset = [];
        while (startIndex !== -1) {
            subset.push(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }
        return subset;
    }
}
```

```csharp
public class Solution {
    public List<int> LargestDivisibleSubset(int[] nums) {
        Array.Sort(nums);
        int n = nums.Length;
        int[][] dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[] { 1, -1 };
        }

        int maxLen = 1, startIndex = 0;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] % nums[j] == 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1;
                    dp[i][1] = j;
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0];
                startIndex = i;
            }
        }

        List<int> subset = new List<int>();
        while (startIndex != -1) {
            subset.Add(nums[startIndex]);
            startIndex = dp[startIndex][1];
        }

        return subset;
    }
}
```

```go
func largestDivisibleSubset(nums []int) []int {
    sort.Ints(nums)
    n := len(nums)
    dp := make([][2]int, n)
    for i := range dp {
        dp[i] = [2]int{1, -1}
    }

    maxLen, startIndex := 1, 0

    for i := 0; i < n; i++ {
        for j := 0; j < i; j++ {
            if nums[i]%nums[j] == 0 && dp[j][0]+1 > dp[i][0] {
                dp[i][0] = dp[j][0] + 1
                dp[i][1] = j
            }
        }

        if dp[i][0] > maxLen {
            maxLen = dp[i][0]
            startIndex = i
        }
    }

    subset := []int{}
    for startIndex != -1 {
        subset = append(subset, nums[startIndex])
        startIndex = dp[startIndex][1]
    }

    return subset
}
```

```kotlin
class Solution {
    fun largestDivisibleSubset(nums: IntArray): List<Int> {
        nums.sort()
        val n = nums.size
        val dp = Array(n) { intArrayOf(1, -1) }

        var maxLen = 1
        var startIndex = 0

        for (i in 0 until n) {
            for (j in 0 until i) {
                if (nums[i] % nums[j] == 0 && dp[j][0] + 1 > dp[i][0]) {
                    dp[i][0] = dp[j][0] + 1
                    dp[i][1] = j
                }
            }

            if (dp[i][0] > maxLen) {
                maxLen = dp[i][0]
                startIndex = i
            }
        }

        val subset = mutableListOf<Int>()
        var idx = startIndex
        while (idx != -1) {
            subset.add(nums[idx])
            idx = dp[idx][1]
        }

        return subset
    }
}
```

```swift
class Solution {
    func largestDivisibleSubset(_ nums: [Int]) -> [Int] {
        var nums = nums.sorted()
        let n = nums.count
        var dp = [[Int]](repeating: [1, -1], count: n)

        var maxLen = 1
        var startIndex = 0

        for i in 0..<n {
            for j in 0..<i {
                if nums[i] % nums[j] == 0 && dp[j][0] + 1 > dp[i][0] {
                    dp[i][0] = dp[j][0] + 1
                    dp[i][1] = j
                }
            }

            if dp[i][0] > maxLen {
                maxLen = dp[i][0]
                startIndex = i
            }
        }

        var subset = [Int]()
        var idx = startIndex
        while idx != -1 {
            subset.append(nums[idx])
            idx = dp[idx][1]
        }

        return subset
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$
