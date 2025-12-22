## 1. Recursion

### Intuition

This problem asks us to count how many different ways we can assign a `+` or `-` sign to each number so that the final sum equals the target.

At every index, we have **two independent choices**:
- add the current number to the total
- subtract the current number from the total

Using recursion, we try all possible sign assignments.  
The recursive function represents:  
**“How many ways can we reach the target starting from index `i` with the current sum `total`?”**

When all numbers are processed, we simply check whether the accumulated sum equals the target.

---

### Algorithm

1. Define a recursive function `backtrack(i, total)`:
   - `i` is the current index in the array
   - `total` is the sum formed so far
2. If `i` reaches the end of the array:
   - Return `1` if `total` equals the target
   - Otherwise, return `0`
3. For the current index:
   - Recurse by adding the current number to `total`
   - Recurse by subtracting the current number from `total`
4. Add the results of both recursive calls
5. Start the recursion from index `0` with an initial sum of `0`
6. Return the final count of valid ways

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:

        def backtrack(i, total):
            if i ==len(nums):
                return  total == target

            return (backtrack(i + 1, total + nums[i]) +
                    backtrack(i + 1, total - nums[i]))

        return backtrack(0, 0)
```

```java
public class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        return backtrack(0, 0, nums, target);
    }

    private int backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.length) {
            return total == target ? 1 : 0;
        }
        return backtrack(i + 1, total + nums[i], nums, target) +
               backtrack(i + 1, total - nums[i], nums, target);
    }
}
```

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        return backtrack(0, 0, nums, target);
    }

    int backtrack(int i, int total, vector<int>& nums, int target) {
        if (i == nums.size()) {
            return total == target;
        }
        return backtrack(i + 1, total + nums[i], nums, target) +
               backtrack(i + 1, total - nums[i], nums, target);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    findTargetSumWays(nums, target) {
        const backtrack = (i, total) => {
            if (i === nums.length) {
                return total === target ? 1 : 0;
            }
            return (
                backtrack(i + 1, total + nums[i]) +
                backtrack(i + 1, total - nums[i])
            );
        };

        return backtrack(0, 0);
    }
}
```

```csharp
public class Solution {
    public int FindTargetSumWays(int[] nums, int target) {
        return Backtrack(0, 0, nums, target);
    }

    private int Backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.Length) {
            return total == target ? 1 : 0;
        }
        return Backtrack(i + 1, total + nums[i], nums, target) +
               Backtrack(i + 1, total - nums[i], nums, target);
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    var backtrack func(i int, total int) int
    backtrack = func(i int, total int) int {
        if i == len(nums) {
            if total == target {
                return 1
            }
            return 0
        }
        return backtrack(i+1, total+nums[i]) + backtrack(i+1, total-nums[i])
    }

    return backtrack(0, 0)
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        fun backtrack(i: Int, total: Int): Int {
            if (i == nums.size) {
                return if (total == target) 1 else 0
            }
            return backtrack(i + 1, total + nums[i]) +
                   backtrack(i + 1, total - nums[i])
        }

        return backtrack(0, 0)
    }
}
```

```swift
class Solution {
    func findTargetSumWays(_ nums: [Int], _ target: Int) -> Int {
        func backtrack(_ i: Int, _ total: Int) -> Int {
            if i == nums.count {
                return total == target ? 1 : 0
            }
            return backtrack(i + 1, total + nums[i]) + backtrack(i + 1, total - nums[i])
        }
        return backtrack(0, 0)
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

This problem asks us to count the number of ways to assign a `+` or `-` sign to each number so that the final sum equals the target.

The recursive solution tries all possible sign combinations, but many subproblems repeat. To avoid recomputing the same states, we use **top-down dynamic programming (memoization)**.

Each state is uniquely defined by:
- the current index `i`
- the current accumulated sum `total`

The recursive function answers the question:  
**“How many ways can we reach the target starting from index `i` with the current sum `total`?”**

By caching results for each state, we significantly improve efficiency.

---

### Algorithm

1. Create a memoization map `dp` where:
   - the key is `(i, total)`
   - the value is the number of ways to reach the target from that state
2. Define a recursive function `backtrack(i, total)`:
   - `i` represents the current index in the array
   - `total` represents the sum formed so far
3. If `i` reaches the end of the array:
   - Return `1` if `total` equals the target
   - Otherwise, return `0`
4. If the current state `(i, total)` is already in `dp`:
   - Return the stored value to avoid recomputation
5. Compute the result by exploring both choices:
   - Add the current number to `total`
   - Subtract the current number from `total`
6. Store the computed result in `dp[(i, total)]`
7. Start the recursion from index `0` with an initial sum of `0`
8. Return the final result

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp = {}  # (index, total) -> # of ways

        def backtrack(i, total):
            if i == len(nums):
                return 1 if total == target else 0
            if (i, total) in dp:
                return dp[(i, total)]

            dp[(i, total)] = (backtrack(i + 1, total + nums[i]) +
                              backtrack(i + 1, total - nums[i]))
            return dp[(i, total)]

        return backtrack(0, 0)
```

```java
public class Solution {
    private int[][] dp;
    private int totalSum;

    public int findTargetSumWays(int[] nums, int target) {
        totalSum = 0;
        for (int num : nums) totalSum += num;
        dp = new int[nums.length][2 * totalSum + 1];
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < 2 * totalSum + 1; j++) {
                dp[i][j] = Integer.MIN_VALUE;
            }
        }
        return backtrack(0, 0, nums, target);
    }

    private int backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.length) {
            return total == target ? 1 : 0;
        }
        if (dp[i][total + totalSum] != Integer.MIN_VALUE) {
            return dp[i][total + totalSum];
        }
        dp[i][total + totalSum] = backtrack(i + 1, total + nums[i], nums, target) +
                                  backtrack(i + 1, total - nums[i], nums, target);
        return dp[i][total + totalSum];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;
    int totalSum;

public:
    int findTargetSumWays(vector<int>& nums, int target) {
        totalSum = accumulate(nums.begin(), nums.end(), 0);
        dp = vector<vector<int>>(nums.size(), vector<int>(2 * totalSum + 1, INT_MIN));
        return backtrack(0, 0, nums, target);
    }

    int backtrack(int i, int total, vector<int>& nums, int target) {
        if (i == nums.size()) {
            return total == target;
        }
        if (dp[i][total + totalSum] != INT_MIN) {
            return dp[i][total + totalSum];
        }
        dp[i][total + totalSum] = backtrack(i + 1, total + nums[i], nums, target) +
                                  backtrack(i + 1, total - nums[i], nums, target);
        return dp[i][total + totalSum];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    findTargetSumWays(nums, target) {
        const NEG_INF = Number.MIN_SAFE_INTEGER;
        const totalSum = nums.reduce((a, b) => a + b, 0);
        const dp = Array.from({ length: nums.length }, () =>
            Array(2 * totalSum + 1).fill(NEG_INF),
        );

        const backtrack = (i, total) => {
            if (i === nums.length) {
                return total === target ? 1 : 0;
            }
            if (dp[i][total + totalSum] !== NEG_INF) {
                return dp[i][total + totalSum];
            }
            dp[i][total + totalSum] =
                backtrack(i + 1, total + nums[i]) +
                backtrack(i + 1, total - nums[i]);
            return dp[i][total + totalSum];
        };

        return backtrack(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[,] dp;
    private int totalSum;

    public int FindTargetSumWays(int[] nums, int target) {
        totalSum = 0;
        foreach (var num in nums) totalSum += num;
        dp = new int[nums.Length, 2 * totalSum + 1];
        for (int i = 0; i < nums.Length; i++) {
            for (int j = 0; j < 2 * totalSum + 1; j++) {
                dp[i, j] = int.MinValue;
            }
        }
        return Backtrack(0, 0, nums, target);
    }

    private int Backtrack(int i, int total, int[] nums, int target) {
        if (i == nums.Length) {
            return total == target ? 1 : 0;
        }

        if (dp[i, total + totalSum] != int.MinValue) {
            return dp[i, total + totalSum];
        }

        dp[i, total + totalSum] = Backtrack(i + 1, total + nums[i], nums, target) +
                                  Backtrack(i + 1, total - nums[i], nums, target);
        return dp[i, total + totalSum];
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    totalSum := 0
    for _, num := range nums {
        totalSum += num
    }

    dp := make([][]int, len(nums))
    for i := range dp {
        dp[i] = make([]int, 2*totalSum+1)
        for j := range dp[i] {
            dp[i][j] = math.MinInt32
        }
    }

    var backtrack func(i, total int) int
    backtrack = func(i, total int) int {
        if i == len(nums) {
            if total == target {
                return 1
            }
            return 0
        }

        if dp[i][total+totalSum] != math.MinInt32 {
            return dp[i][total+totalSum]
        }

        dp[i][total+totalSum] = (backtrack(i+1, total+nums[i]) +
                                 backtrack(i+1, total-nums[i]))
        return dp[i][total+totalSum]
    }

    return backtrack(0, 0)
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        var totalSum = nums.sum()
        var dp = Array(nums.size) { IntArray(2 * totalSum + 1) { Int.MIN_VALUE } }

        fun backtrack(i: Int, total: Int): Int {
            if (i == nums.size) {
                return if (total == target) 1 else 0
            }
            if (dp[i][total + totalSum] != Int.MIN_VALUE) {
                return dp[i][total + totalSum]
            }
            dp[i][total + totalSum] = backtrack(i + 1, total + nums[i]) +
                                      backtrack(i + 1, total - nums[i])
            return dp[i][total + totalSum]
        }

        return backtrack(0, 0)
    }
}
```

```swift
class Solution {
    func findTargetSumWays(_ nums: [Int], _ target: Int) -> Int {
        let totalSum = nums.reduce(0, +)
        var dp = Array(repeating: Array(repeating: Int.min, count: 2 * totalSum + 1), count: nums.count)

        func backtrack(_ i: Int, _ total: Int) -> Int {
            if i == nums.count {
                return total == target ? 1 : 0
            }
            if dp[i][total + totalSum] != Int.min {
                return dp[i][total + totalSum]
            }
            dp[i][total + totalSum] = backtrack(i + 1, total + nums[i]) +
                                      backtrack(i + 1, total - nums[i])
            return dp[i][total + totalSum]
        }

        return backtrack(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the array $nums$ and $m$ is the sum of all the elements in the array.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

We need to count how many ways we can assign a `+` or `-` sign to each number so that the final sum equals the target.

Instead of using recursion, we can solve this using **bottom-up dynamic programming**, where we build solutions step by step as we process each number.

At each position, we keep track of:
- all possible sums we can form
- how many ways each sum can be formed

As we move forward, each existing sum can branch into two new sums by adding or subtracting the current number.

---

### Algorithm

1. Let `n` be the length of the input array.
2. Create a list of maps `dp` of size `n + 1`:
   - `dp[i]` stores how many ways each sum can be formed using the first `i` numbers
3. Initialize the base case:
   - `dp[0][0] = 1` since there is exactly one way to form sum `0` using no numbers
4. Iterate through the numbers from index `0` to `n - 1`:
5. For each existing `(sum, count)` in `dp[i]`:
   - Add the current number → update `dp[i + 1][sum + nums[i]]`
   - Subtract the current number → update `dp[i + 1][sum - nums[i]]`
6. After processing all numbers, `dp[n][target]` gives the number of valid ways
7. Return `dp[n][target]`

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        n = len(nums)
        dp = [defaultdict(int) for _ in range(n + 1)]
        dp[0][0] = 1

        for i in range(n):
            for total, count in dp[i].items():
                dp[i + 1][total + nums[i]] += count
                dp[i + 1][total - nums[i]] += count

        return dp[n][target]
```

```java
public class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int n = nums.length;
        Map<Integer, Integer>[] dp = new HashMap[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new HashMap<>();
        }
        dp[0].put(0, 1);

        for (int i = 0; i < n; i++) {
            for (Map.Entry<Integer, Integer> entry : dp[i].entrySet()) {
                int total = entry.getKey();
                int count = entry.getValue();
                dp[i + 1].put(total + nums[i],
                          dp[i + 1].getOrDefault(total + nums[i], 0) + count);
                dp[i + 1].put(total - nums[i],
                          dp[i + 1].getOrDefault(total - nums[i], 0) + count);
            }
        }
        return dp[n].getOrDefault(target, 0);
    }
}
```

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int n = nums.size();
        vector<unordered_map<int, int>> dp(n + 1);
        dp[0][0] = 1;

        for (int i = 0; i < n; i++) {
            for (auto &p : dp[i]) {
                dp[i + 1][p.first + nums[i]] += p.second;
                dp[i + 1][p.first - nums[i]] += p.second;
            }
        }
        return dp[n][target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    findTargetSumWays(nums, target) {
        const n = nums.length;
        let dp = Array.from({ length: n + 1 }, () => ({}));
        dp[0][0] = 1;

        for (let i = 0; i < n; i++) {
            for (let total in dp[i]) {
                total = Number(total);
                let count = dp[i][total];
                dp[i + 1][total + nums[i]] =
                    (dp[i + 1][total + nums[i]] || 0) + count;
                dp[i + 1][total - nums[i]] =
                    (dp[i + 1][total - nums[i]] || 0) + count;
            }
        }
        return dp[n][target] || 0;
    }
}
```

```csharp
public class Solution {
    public int FindTargetSumWays(int[] nums, int S) {
        int n = nums.Length;
        Dictionary<int, int>[] dp = new Dictionary<int, int>[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = new Dictionary<int, int>();
        }
        dp[0][0] = 1;

        for (int i = 0; i < n; i++) {
            foreach (var entry in dp[i]) {
                int total = entry.Key;
                int count = entry.Value;
                if (!dp[i + 1].ContainsKey(total + nums[i])) {
                    dp[i + 1][total + nums[i]] = 0;
                }
                dp[i + 1][total + nums[i]] += count;

                if (!dp[i + 1].ContainsKey(total - nums[i])) {
                    dp[i + 1][total - nums[i]] = 0;
                }
                dp[i + 1][total - nums[i]] += count;
            }
        }
        return dp[n].ContainsKey(S) ? dp[n][S] : 0;
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    n := len(nums)
    dp := make([]map[int]int, n+1)

    for i := 0; i <= n; i++ {
        dp[i] = make(map[int]int)
    }

    dp[0][0] = 1

    for i := 0; i < n; i++ {
        for total, count := range dp[i] {
            dp[i+1][total+nums[i]] += count
            dp[i+1][total-nums[i]] += count
        }
    }

    return dp[n][target]
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        val n = nums.size
        val dp = Array(n + 1) { mutableMapOf<Int, Int>() }

        dp[0][0] = 1

        for (i in 0 until n) {
            for ((total, count) in dp[i]) {
                dp[i + 1][total + nums[i]] = dp[i + 1].getOrDefault(total + nums[i], 0) + count
                dp[i + 1][total - nums[i]] = dp[i + 1].getOrDefault(total - nums[i], 0) + count
            }
        }

        return dp[n][target] ?: 0
    }
}
```

```swift
class Solution {
    func findTargetSumWays(_ nums: [Int], _ target: Int) -> Int {
        let n = nums.count
        var dp = Array(repeating: [Int: Int](), count: n + 1)
        dp[0][0] = 1

        for i in 0..<n {
            for (total, count) in dp[i] {
                dp[i + 1][total + nums[i], default: 0] += count
                dp[i + 1][total - nums[i], default: 0] += count
            }
        }
        return dp[n][target, default: 0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the length of the array $nums$ and $m$ is the sum of all the elements in the array.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

We want to count the number of ways to assign `+` and `-` signs to the numbers so that their final sum equals the target.

In the bottom-up DP approach, we used a separate data structure for each index. However, at each step, the new states depend **only on the previous step**, not on all earlier steps.

This means we can **reuse a single data structure** to keep track of all possible sums and how many ways each sum can be formed, updating it as we process each number.

---

### Algorithm

1. Create a map `dp` where:
   - the key represents a possible sum
   - the value represents the number of ways to form that sum
2. Initialize `dp[0] = 1` since there is exactly one way to reach sum `0` before using any numbers
3. For each number in the array:
   - Create a new map `next_dp` to store updated sums
4. For every `(total, count)` in `dp`:
   - Add the current number → update `next_dp[total + num]`
   - Subtract the current number → update `next_dp[total - num]`
5. Replace `dp` with `next_dp` after processing the current number
6. After all numbers are processed, `dp[target]` gives the number of valid ways
7. Return `dp[target]`

::tabs-start

```python
class Solution:
    def findTargetSumWays(self, nums: List[int], target: int) -> int:
        dp = defaultdict(int)
        dp[0] = 1

        for num in nums:
            next_dp = defaultdict(int)
            for total, count in dp.items():
                next_dp[total + num] += count
                next_dp[total - num] += count
            dp = next_dp

        return dp[target]
```

```java
public class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(0, 1);

        for (int num : nums) {
            Map<Integer, Integer> nextDp = new HashMap<>();
            for (Map.Entry<Integer, Integer> entry : dp.entrySet()) {
                int total = entry.getKey();
                int count = entry.getValue();
                nextDp.put(total + num,
                           nextDp.getOrDefault(total + num, 0) + count);
                nextDp.put(total - num,
                           nextDp.getOrDefault(total - num, 0) + count);
            }
            dp = nextDp;
        }
        return dp.getOrDefault(target, 0);
    }
}
```

```cpp
class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        unordered_map<int, int> dp;
        dp[0] = 1;

        for (int num : nums) {
            unordered_map<int, int> nextDp;
            for (auto& entry : dp) {
                int total = entry.first;
                int count = entry.second;
                nextDp[total + num] += count;
                nextDp[total - num] += count;
            }
            dp = nextDp;
        }
        return dp[target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    findTargetSumWays(nums, target) {
        let dp = new Map();
        dp.set(0, 1);

        for (let num of nums) {
            let nextDp = new Map();
            for (let [total, count] of dp) {
                nextDp.set(total + num, (nextDp.get(total + num) || 0) + count);
                nextDp.set(total - num, (nextDp.get(total - num) || 0) + count);
            }
            dp = nextDp;
        }
        return dp.get(target) || 0;
    }
}
```

```csharp
public class Solution {
    public int FindTargetSumWays(int[] nums, int target) {
        Dictionary<int, int> dp = new Dictionary<int, int>();
        dp[0] = 1;

        foreach (int num in nums) {
            Dictionary<int, int> nextDp = new Dictionary<int, int>();
            foreach (var entry in dp) {
                int total = entry.Key;
                int count = entry.Value;

                if (!nextDp.ContainsKey(total + num)) {
                    nextDp[total + num] = 0;
                }
                nextDp[total + num] += count;

                if (!nextDp.ContainsKey(total - num)) {
                    nextDp[total - num] = 0;
                }
                nextDp[total - num] += count;
            }
            dp = nextDp;
        }
        return dp.ContainsKey(target) ? dp[target] : 0;
    }
}
```

```go
func findTargetSumWays(nums []int, target int) int {
    dp := make(map[int]int)
    dp[0] = 1

    for _, num := range nums {
        nextDp := make(map[int]int)
        for total, count := range dp {
            nextDp[total+num] += count
            nextDp[total-num] += count
        }
        dp = nextDp
    }

    return dp[target]
}
```

```kotlin
class Solution {
    fun findTargetSumWays(nums: IntArray, target: Int): Int {
        val dp = mutableMapOf(0 to 1)

        for (num in nums) {
            val nextDp = mutableMapOf<Int, Int>()
            for ((total, count) in dp) {
                nextDp[total + num] = nextDp.getOrDefault(total + num, 0) + count
                nextDp[total - num] = nextDp.getOrDefault(total - num, 0) + count
            }
            dp.clear()
            dp.putAll(nextDp)
        }

        return dp[target] ?: 0
    }
}
```

```swift
class Solution {
    func findTargetSumWays(_ nums: [Int], _ target: Int) -> Int {
        var dp = [0: 1]

        for num in nums {
            var nextDp = [Int: Int]()
            for (total, count) in dp {
                nextDp[total + num, default: 0] += count
                nextDp[total - num, default: 0] += count
            }
            dp = nextDp
        }
        return dp[target, default: 0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the array $nums$ and $m$ is the sum of all the elements in the array.
