## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps / Frequency Counting** - Required to count occurrences of each element in the array
- **Recursion** - The base approach explores all possible deletion choices recursively
- **Dynamic Programming (Memoization)** - Used to optimize the recursive solution by caching subproblem results
- **Basic Math (Ceiling Division)** - The greedy solution relies on understanding ceiling division for optimal grouping

---

## 1. Recursion

### Intuition

We can only delete elements in groups of 2 or 3, and all elements in a group must be identical. This means we need to count the frequency of each element and figure out how to reduce each frequency to zero using the minimum number of deletions.

For any `count`, we try both options: subtract 2 or subtract 3, and recursively solve for the remaining `count`. If we reach exactly `0`, we are done. If we go negative, that path is invalid. The `min` of both branches gives us the answer.

### Algorithm

1. Count the frequency of each element in the array.
2. For each unique element's `count`, use recursion to find the minimum operations:
   - Base case: if `count` is `0`, return `0`. If `count` is negative, return infinity.
   - Try both `dfs(count - 2)` and `dfs(count - 3)`, take the `min`, and add `1`.
3. If any `count` returns infinity, return `-1` (impossible to empty).
4. Sum up the minimum operations for all frequencies.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        def dfs(cur):
            if cur < 0:
                return float('inf')
            if cur == 0:
                return 0

            ops = min(dfs(cur - 2), dfs(cur - 3))
            return 1 + ops

        count = Counter(nums)
        res = 0
        for num, cnt in count.items():
            op = dfs(cnt)
            if op == float("inf"):
                return -1
            res += op

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int res = 0;
        for (int cnt : count.values()) {
            int op = dfs(cnt);
            if (op == Integer.MAX_VALUE) {
                return -1;
            }
            res += op;
        }

        return res;
    }

    private int dfs(int cur) {
        if (cur < 0) {
            return Integer.MAX_VALUE;
        }
        if (cur == 0) {
            return 0;
        }

        int ops = Math.min(dfs(cur - 2), dfs(cur - 3));
        return ops == Integer.MAX_VALUE ? ops : 1 + ops;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            int op = dfs(cnt);
            if (op == INT_MAX) {
                return -1;
            }
            res += op;
        }

        return res;
    }

private:
    int dfs(int cur) {
        if (cur < 0) {
            return INT_MAX;
        }
        if (cur == 0) {
            return 0;
        }

        int ops = min(dfs(cur - 2), dfs(cur - 3));
        return ops == INT_MAX ? ops : 1 + ops;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const dfs = (cur) => {
            if (cur < 0) {
                return Infinity;
            }
            if (cur === 0) {
                return 0;
            }

            const ops = Math.min(dfs(cur - 2), dfs(cur - 3));
            return isFinite(ops) ? 1 + ops : ops;
        };

        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = 0;
        for (const cnt of count.values()) {
            const op = dfs(cnt);
            if (op === Infinity) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }

        int Dfs(int cur) {
            if (cur < 0) return int.MaxValue;
            if (cur == 0) return 0;

            int ops = Math.Min(Dfs(cur - 2), Dfs(cur - 3));
            if (ops == int.MaxValue) return int.MaxValue;
            return 1 + ops;
        }

        int res = 0;
        foreach (var kvp in count) {
            int op = Dfs(kvp.Value);
            if (op == int.MaxValue) return -1;
            res += op;
        }

        return res;
    }
}
```

```go
func minOperations(nums []int) int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    var dfs func(cur int) int
    dfs = func(cur int) int {
        if cur < 0 {
            return 1 << 30
        }
        if cur == 0 {
            return 0
        }

        ops := min(dfs(cur-2), dfs(cur-3))
        if ops == 1<<30 {
            return ops
        }
        return 1 + ops
    }

    res := 0
    for _, cnt := range count {
        op := dfs(cnt)
        if op == 1<<30 {
            return -1
        }
        res += op
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
    fun minOperations(nums: IntArray): Int {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        fun dfs(cur: Int): Int {
            if (cur < 0) return Int.MAX_VALUE
            if (cur == 0) return 0

            val ops = minOf(dfs(cur - 2), dfs(cur - 3))
            return if (ops == Int.MAX_VALUE) ops else 1 + ops
        }

        var res = 0
        for (cnt in count.values) {
            val op = dfs(cnt)
            if (op == Int.MAX_VALUE) return -1
            res += op
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        func dfs(_ cur: Int) -> Int {
            if cur < 0 {
                return Int.max
            }
            if cur == 0 {
                return 0
            }

            let ops = min(dfs(cur - 2), dfs(cur - 3))
            return ops == Int.max ? ops : 1 + ops
        }

        var res = 0
        for cnt in count.values {
            let op = dfs(cnt)
            if op == Int.max {
                return -1
            }
            res += op
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the average frequency of the array elements.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution has overlapping subproblems. When computing the minimum operations for a `count`, we may revisit the same `count` multiple times. By caching results, we avoid redundant computation and make the solution efficient.

### Algorithm

1. Count the frequency of each element.
2. Use memoization (`cache`) to cache results for each `count` value.
3. For each `count`, if it equals `2` or `3`, return `1` (one operation suffices).
4. Otherwise, recursively compute `min(dfs(count - 2), dfs(count - 3)) + 1` and cache it.
5. Sum the results for all frequencies. Return `-1` if any frequency is impossible.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        cache = {}

        def dfs(num):
            if num < 0:
                return float("inf")
            if num in [2, 3]:
                return 1
            if num in cache:
                return cache[num]

            res = min(dfs(num - 2), dfs(num - 3))
            cache[num] = res + 1
            return cache[num]

        count = Counter(nums)
        res = 0
        for num, cnt in count.items():
            op = dfs(cnt)
            if op == float("inf"):
                return -1
            res += op

        return res
```

```java
public class Solution {
    private Map<Integer, Integer> cache;

    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        cache = new HashMap<>();
        int res = 0;
        for (int cnt : count.values()) {
            int op = dfs(cnt);
            if (op == Integer.MAX_VALUE) {
                return -1;
            }
            res += op;
        }

        return res;
    }

    private int dfs(int cur) {
        if (cur < 0) {
            return Integer.MAX_VALUE;
        }
        if (cur == 2 || cur == 3) {
            return 1;
        }
        if (cache.containsKey(cur)) {
            return cache.get(cur);
        }

        int res = Math.min(dfs(cur - 2), dfs(cur - 3));
        cache.put(cur, res == Integer.MAX_VALUE ? res : res + 1);
        return cache.get(cur);
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> cache;
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            int op = dfs(cnt);
            if (op == INT_MAX) {
                return -1;
            }
            res += op;
        }

        return res;
    }

private:
    int dfs(int cur) {
        if (cur < 0) {
            return INT_MAX;
        }
        if (cur == 2 || cur == 3) {
            return 1;
        }
        if (cache.count(cur)) {
            return cache[cur];
        }

        int res = min(dfs(cur - 2), dfs(cur - 3));
        cache[cur] = res == INT_MAX ? res : res + 1;
        return cache[cur];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const cache = new Map();
        const dfs = (cur) => {
            if (cur < 0) {
                return Infinity;
            }
            if (cur === 2 || cur === 3) {
                return 1;
            }
            if (cache.has(cur)) {
                return cache.get(cur);
            }

            const res = Math.min(dfs(cur - 2), dfs(cur - 3));
            cache.set(cur, isFinite(res) ? 1 + res : res);
            return cache.get(cur);
        };

        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = 0;
        for (const cnt of count.values()) {
            const op = dfs(cnt);
            if (!isFinite(op)) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }

        Dictionary<int, int> cache = new Dictionary<int, int>();

        int Dfs(int num) {
            if (num < 0) return int.MaxValue;
            if (num == 2 || num == 3) return 1;
            if (cache.ContainsKey(num)) return cache[num];

            int res = Math.Min(Dfs(num - 2), Dfs(num - 3));
            if (res == int.MaxValue) {
                cache[num] = int.MaxValue;
            } else {
                cache[num] = res + 1;
            }
            return cache[num];
        }

        int resTotal = 0;
        foreach (var kvp in count) {
            int op = Dfs(kvp.Value);
            if (op == int.MaxValue) return -1;
            resTotal += op;
        }

        return resTotal;
    }
}
```

```go
func minOperations(nums []int) int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    cache := make(map[int]int)

    var dfs func(num int) int
    dfs = func(num int) int {
        if num < 0 {
            return 1 << 30
        }
        if num == 2 || num == 3 {
            return 1
        }
        if val, ok := cache[num]; ok {
            return val
        }

        res := min(dfs(num-2), dfs(num-3))
        if res == 1<<30 {
            cache[num] = res
        } else {
            cache[num] = res + 1
        }
        return cache[num]
    }

    resTotal := 0
    for _, cnt := range count {
        op := dfs(cnt)
        if op == 1<<30 {
            return -1
        }
        resTotal += op
    }

    return resTotal
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
    fun minOperations(nums: IntArray): Int {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val cache = HashMap<Int, Int>()

        fun dfs(num: Int): Int {
            if (num < 0) return Int.MAX_VALUE
            if (num == 2 || num == 3) return 1
            if (cache.containsKey(num)) return cache[num]!!

            val res = minOf(dfs(num - 2), dfs(num - 3))
            cache[num] = if (res == Int.MAX_VALUE) res else res + 1
            return cache[num]!!
        }

        var resTotal = 0
        for (cnt in count.values) {
            val op = dfs(cnt)
            if (op == Int.MAX_VALUE) return -1
            resTotal += op
        }

        return resTotal
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        var cache = [Int: Int]()

        func dfs(_ num: Int) -> Int {
            if num < 0 {
                return Int.max
            }
            if num == 2 || num == 3 {
                return 1
            }
            if let cached = cache[num] {
                return cached
            }

            let res = min(dfs(num - 2), dfs(num - 3))
            cache[num] = res == Int.max ? res : res + 1
            return cache[num]!
        }

        var resTotal = 0
        for cnt in count.values {
            let op = dfs(cnt)
            if op == Int.max {
                return -1
            }
            resTotal += op
        }

        return resTotal
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the average frequency of the array elements.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of solving recursively from larger counts down to zero, we can build up solutions from smaller counts. We precompute the minimum operations for all counts from 0 up to the maximum frequency, using the recurrence relation derived earlier.

### Algorithm

1. Count the frequency of each element and find the `maxf` (maximum frequency).
2. Create an array `minOps` where `minOps[i]` stores the minimum operations to reduce `count` `i` to zero.
3. Set `minOps[0] = 0` and `minOps[1] = infinity` (`count` of `1` is impossible).
4. For each `count` from `2` to `maxf`, compute `minOps[i] = min(minOps[i-2], minOps[i-3]) + 1`.
5. Look up each element's frequency in `minOps` and sum the results. Return `-1` if any is infinity.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        count = Counter(nums)
        maxf = max(count.values())
        minOps = [0] * (maxf + 1)
        minOps[1] = float("inf")

        for i in range(2, maxf + 1):
            minOps[i] = minOps[i - 2]
            if i - 3 >= 0:
                minOps[i] = min(minOps[i], minOps[i - 3])
            if minOps[i] != float("inf"):
                minOps[i] += 1

        res = 0
        for num, cnt in count.items():
            op = minOps[cnt]
            if op == float("inf"):
                return -1
            res += op

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int maxf = count.values().stream().max(Integer::compare).orElse(0);
        int[] minOps = new int[maxf + 1];
        minOps[1] = Integer.MAX_VALUE;

        for (int i = 2; i <= maxf; i++) {
            minOps[i] = minOps[i - 2];
            if (i - 3 >= 0) {
                minOps[i] = Math.min(minOps[i], minOps[i - 3]);
            }
            if (minOps[i] != Integer.MAX_VALUE) {
                minOps[i] += 1;
            }
        }

        int res = 0;
        for (int cnt : count.values()) {
            int op = minOps[cnt];
            if (op == Integer.MAX_VALUE) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int maxf = 0;
        for (auto& [num, freq] : count) {
            maxf = max(maxf, freq);
        }

        vector<int> minOps(maxf + 1, 0);
        minOps[1] = INT_MAX;

        for (int i = 2; i <= maxf; i++) {
            minOps[i] = minOps[i - 2];
            if (i - 3 >= 0) {
                minOps[i] = min(minOps[i], minOps[i - 3]);
            }
            if (minOps[i] != INT_MAX) {
                minOps[i] += 1;
            }
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            int op = minOps[cnt];
            if (op == INT_MAX) {
                return -1;
            }
            res += op;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        const maxf = Math.max(...count.values());
        const minOps = Array(maxf + 1).fill(0);
        minOps[1] = Infinity;

        for (let i = 2; i <= maxf; i++) {
            minOps[i] = minOps[i - 2];
            if (i - 3 >= 0) {
                minOps[i] = Math.min(minOps[i], minOps[i - 3]);
            }
            if (minOps[i] !== Infinity) {
                minOps[i] += 1;
            }
        }

        let res = 0;
        for (const cnt of count.values()) {
            const op = minOps[cnt];
            if (op === Infinity) {
                return -1;
            }
            res += op;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }

        int maxf = count.Values.Max();
        int[] minOps = new int[maxf + 1];
        for (int i = 0; i <= maxf; i++) minOps[i] = 0;
        minOps[1] = int.MaxValue;

        for (int i = 2; i <= maxf; i++) {
            minOps[i] = minOps[i - 2];
            if (i - 3 >= 0)
                minOps[i] = Math.Min(minOps[i], minOps[i - 3]);
            if (minOps[i] != int.MaxValue)
                minOps[i] += 1;
        }

        int res = 0;
        foreach (var kvp in count) {
            int op = minOps[kvp.Value];
            if (op == int.MaxValue) return -1;
            res += op;
        }

        return res;
    }
}
```

```go
func minOperations(nums []int) int {
    count := make(map[int]int)
    maxf := 0
    for _, num := range nums {
        count[num]++
        if count[num] > maxf {
            maxf = count[num]
        }
    }

    minOps := make([]int, maxf+1)
    minOps[1] = 1 << 30

    for i := 2; i <= maxf; i++ {
        minOps[i] = minOps[i-2]
        if i-3 >= 0 {
            minOps[i] = min(minOps[i], minOps[i-3])
        }
        if minOps[i] != 1<<30 {
            minOps[i]++
        }
    }

    res := 0
    for _, cnt := range count {
        op := minOps[cnt]
        if op == 1<<30 {
            return -1
        }
        res += op
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
    fun minOperations(nums: IntArray): Int {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        val maxf = count.values.maxOrNull() ?: 0
        val minOps = IntArray(maxf + 1)
        minOps[1] = Int.MAX_VALUE

        for (i in 2..maxf) {
            minOps[i] = minOps[i - 2]
            if (i - 3 >= 0) {
                minOps[i] = minOf(minOps[i], minOps[i - 3])
            }
            if (minOps[i] != Int.MAX_VALUE) {
                minOps[i]++
            }
        }

        var res = 0
        for (cnt in count.values) {
            val op = minOps[cnt]
            if (op == Int.MAX_VALUE) return -1
            res += op
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        let maxf = count.values.max() ?? 0
        var minOps = [Int](repeating: 0, count: maxf + 1)
        if maxf >= 1 {
            minOps[1] = Int.max
        }

        for i in 2...maxf {
            minOps[i] = minOps[i - 2]
            if i - 3 >= 0 {
                minOps[i] = min(minOps[i], minOps[i - 3])
            }
            if minOps[i] != Int.max {
                minOps[i] += 1
            }
        }

        var res = 0
        for cnt in count.values {
            let op = minOps[cnt]
            if op == Int.max {
                return -1
            }
            res += op
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the size of the array $nums$ and $m$ is the average frequency of the array elements.

---

## 4. Greedy

### Intuition

There is a mathematical pattern: for any `count` greater than `1`, the minimum operations is the ceiling of `count / 3`. This works because we prioritize groups of `3`, and any remainder can be handled by converting some `3`s to `2`s. For example, `count = 4` uses two `2`s, `count = 5` uses one `2` and one `3`.

The only impossible case is when `count` equals `1`, since we need at least `2` identical elements to perform any deletion.

### Algorithm

1. Count the frequency of each element.
2. For each frequency:
   - If it equals `1`, return `-1` (impossible).
   - Otherwise, add `ceil(count / 3)` to the `res`.
3. Return the total operations.

::tabs-start

```python
class Solution:
    def minOperations(self, nums: List[int]) -> int:
        count = Counter(nums)
        res = 0

        for num, cnt in count.items():
            if cnt == 1:
                return -1
            res += math.ceil(cnt / 3)

        return res
```

```java
public class Solution {
    public int minOperations(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        int res = 0;
        for (int cnt : count.values()) {
            if (cnt == 1) {
                return -1;
            }
            res += (cnt + 2) / 3;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minOperations(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        int res = 0;
        for (auto& [num, cnt] : count) {
            if (cnt == 1) {
                return -1;
            }
            res += (cnt + 2) / 3;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minOperations(nums) {
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        let res = 0;
        for (const cnt of count.values()) {
            if (cnt === 1) {
                return -1;
            }
            res += Math.ceil(cnt / 3);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinOperations(int[] nums) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        foreach (int num in nums) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }

        int res = 0;
        foreach (var kvp in count) {
            int cnt = kvp.Value;
            if (cnt == 1) return -1;
            res += (int)Math.Ceiling(cnt / 3.0);
        }

        return res;
    }
}
```

```go
func minOperations(nums []int) int {
    count := make(map[int]int)
    for _, num := range nums {
        count[num]++
    }

    res := 0
    for _, cnt := range count {
        if cnt == 1 {
            return -1
        }
        res += (cnt + 2) / 3
    }

    return res
}
```

```kotlin
class Solution {
    fun minOperations(nums: IntArray): Int {
        val count = HashMap<Int, Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        var res = 0
        for (cnt in count.values) {
            if (cnt == 1) return -1
            res += (cnt + 2) / 3
        }

        return res
    }
}
```

```swift
class Solution {
    func minOperations(_ nums: [Int]) -> Int {
        var count = [Int: Int]()
        for num in nums {
            count[num, default: 0] += 1
        }

        var res = 0
        for cnt in count.values {
            if cnt == 1 {
                return -1
            }
            res += (cnt + 2) / 3
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Forgetting the Impossible Case

When an element appears exactly once, it is impossible to delete it since the minimum group size is 2. Failing to check for frequencies of 1 and return -1 will produce incorrect results for inputs that cannot be emptied.

### Using Division Instead of Ceiling

The greedy solution requires ceiling division (`ceil(count / 3)`), not floor division. Using `count / 3` will undercount operations for counts like 4, 5, 7, or 8 where remainders require additional groups.

### Integer Overflow When Adding One

In some languages, when using the formula `(count + 2) / 3` for ceiling division, adding 2 to a very large count could cause overflow. While unlikely given typical constraints, be aware of this when working with custom large inputs.