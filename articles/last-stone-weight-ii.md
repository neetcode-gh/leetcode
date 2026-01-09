## 1. Recursion

### Intuition

The key insight is that smashing stones is equivalent to partitioning them into two groups and finding the minimum difference between their sums. When two stones collide, the result is the absolute difference of their weights. If we think of assigning a positive or negative sign to each stone, the final result is the absolute value of the sum. This transforms the problem into finding a subset with sum as close to half the total as possible.

### Algorithm

1. Compute the total sum of all stones and set a target of half this sum.
2. Use recursion to explore two choices for each stone: include it in the current subset or skip it.
3. If the running total reaches or exceeds the target, or we've processed all stones, return the absolute difference between the two groups.
4. Return the minimum result across all recursive paths.

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = (stoneSum + 1) // 2

        def dfs(i, total):
            if total >= target or i == len(stones):
                return abs(total - (stoneSum - total))
            return min(dfs(i + 1, total), dfs(i + 1, total + stones[i]))

        return dfs(0, 0)
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;

        return dfs(0, 0, stones, stoneSum, target);
    }

    private int dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.length) {
            return Math.abs(total - (stoneSum - total));
        }
        return Math.min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = (stoneSum + 1) / 2;
        return dfs(0, 0, stones, stoneSum, target);
    }

private:
    int dfs(int i, int total, const vector<int>& stones, int stoneSum, int target) {
        if (total >= target || i == stones.size()) {
            return abs(total - (stoneSum - total));
        }
        return min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.ceil(stoneSum / 2);

        const dfs = (i, total) => {
            if (total >= target || i === stones.length) {
                return Math.abs(total - (stoneSum - total));
            }
            return Math.min(dfs(i + 1, total), dfs(i + 1, total + stones[i]));
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;
        return Dfs(0, 0, stones, stoneSum, target);
    }

    private int Dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.Length) {
            return Math.Abs(total - (stoneSum - total));
        }

        return Math.Min(
            Dfs(i + 1, total, stones, stoneSum, target),
            Dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
    }
}
```

```go
func lastStoneWeightII(stones []int) int {
    stoneSum := 0
    for _, stone := range stones {
        stoneSum += stone
    }
    target := (stoneSum + 1) / 2

    var dfs func(i, total int) int
    dfs = func(i, total int) int {
        if total >= target || i == len(stones) {
            return abs(total - (stoneSum - total))
        }
        return min(dfs(i+1, total), dfs(i+1, total+stones[i]))
    }

    return dfs(0, 0)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
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
    fun lastStoneWeightII(stones: IntArray): Int {
        val stoneSum = stones.sum()
        val target = (stoneSum + 1) / 2

        fun dfs(i: Int, total: Int): Int {
            if (total >= target || i == stones.size) {
                return kotlin.math.abs(total - (stoneSum - total))
            }
            return minOf(dfs(i + 1, total), dfs(i + 1, total + stones[i]))
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func lastStoneWeightII(_ stones: [Int]) -> Int {
        let stoneSum = stones.reduce(0, +)
        let target = (stoneSum + 1) / 2

        func dfs(_ i: Int, _ total: Int) -> Int {
            if total >= target || i == stones.count {
                return abs(total - (stoneSum - total))
            }
            return min(dfs(i + 1, total), dfs(i + 1, total + stones[i]))
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(min(n, m))$ for recursion stack.

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recomputes the same subproblems many times. For example, reaching a total of `10` using stones at different indices might happen through multiple paths. By caching results based on the current index and running total, we avoid redundant work and speed up the solution significantly.

### Algorithm

1. Compute the total sum and `target` as in the recursive approach.
2. Create a memoization dictionary keyed by `(index, total)`.
3. Before recursing, check if the result is already cached. If so, return it.
4. Otherwise, compute the result by trying both choices (skip or include the stone), cache it, and return.

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = (stoneSum + 1) // 2
        dp = {}

        def dfs(i, total):
            if total >= target or i == len(stones):
                return abs(total - (stoneSum - total))
            if (i, total) in dp:
                return dp[(i, total)]

            dp[(i, total)] = min(dfs(i + 1, total), dfs(i + 1, total + stones[i]))
            return dp[(i, total)]

        return dfs(0, 0)
```

```java
public class Solution {
    private int[][] dp;

    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;
        dp = new int[stones.length][target + 1];
        for (int i = 0; i < stones.length; i++) {
            for (int j = 0; j <= target; j++) {
                dp[i][j] = -1;
            }
        }

        return dfs(0, 0, stones, stoneSum, target);
    }

    private int dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.length) {
            return Math.abs(total - (stoneSum - total));
        }
        if (dp[i][total] != -1) {
            return dp[i][total];
        }

        dp[i][total] = Math.min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
        return dp[i][total];
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = (stoneSum + 1) / 2;
        dp = vector<vector<int>>(stones.size(), vector<int>(target + 1, -1));
        return dfs(0, 0, stones, stoneSum, target);
    }

private:
    int dfs(int i, int total, const vector<int>& stones, int stoneSum, int target) {
        if (total >= target || i == stones.size()) {
            return abs(total - (stoneSum - total));
        }
        if (dp[i][total] != -1) {
            return dp[i][total];
        }

        dp[i][total] = min(
            dfs(i + 1, total, stones, stoneSum, target),
            dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );
        return dp[i][total];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.ceil(stoneSum / 2);
        const dp = Array.from({ length: stones.length }, () =>
            Array(target + 1).fill(-1),
        );

        const dfs = (i, total) => {
            if (total >= target || i === stones.length) {
                return Math.abs(total - (stoneSum - total));
            }
            if (dp[i][total] !== -1) {
                return dp[i][total];
            }

            dp[i][total] = Math.min(
                dfs(i + 1, total),
                dfs(i + 1, total + stones[i]),
            );
            return dp[i][total];
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    private int[][] dp;

    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = (stoneSum + 1) / 2;
        dp = new int[stones.Length][];
        for (int i = 0; i < stones.Length; i++) {
            dp[i] = new int[target + 1];
            for (int j = 0; j <= target; j++) {
                dp[i][j] = -1;
            }
        }

        return Dfs(0, 0, stones, stoneSum, target);
    }

    private int Dfs(int i, int total, int[] stones, int stoneSum, int target) {
        if (total >= target || i == stones.Length) {
            return Math.Abs(total - (stoneSum - total));
        }
        if (dp[i][total] != -1) {
            return dp[i][total];
        }

        dp[i][total] = Math.Min(
            Dfs(i + 1, total, stones, stoneSum, target),
            Dfs(i + 1, total + stones[i], stones, stoneSum, target)
        );

        return dp[i][total];
    }
}
```

```go
func lastStoneWeightII(stones []int) int {
    stoneSum := 0
    for _, stone := range stones {
        stoneSum += stone
    }
    target := (stoneSum + 1) / 2
    dp := make([][]int, len(stones))
    for i := range dp {
        dp[i] = make([]int, target+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, total int) int
    dfs = func(i, total int) int {
        if total >= target || i == len(stones) {
            return abs(total - (stoneSum - total))
        }
        if dp[i][total] != -1 {
            return dp[i][total]
        }
        dp[i][total] = min(dfs(i+1, total), dfs(i+1, total+stones[i]))
        return dp[i][total]
    }

    return dfs(0, 0)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
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
    fun lastStoneWeightII(stones: IntArray): Int {
        val stoneSum = stones.sum()
        val target = (stoneSum + 1) / 2
        val dp = Array(stones.size) { IntArray(target + 1) { -1 } }

        fun dfs(i: Int, total: Int): Int {
            if (total >= target || i == stones.size) {
                return kotlin.math.abs(total - (stoneSum - total))
            }
            if (dp[i][total] != -1) {
                return dp[i][total]
            }
            dp[i][total] = minOf(dfs(i + 1, total), dfs(i + 1, total + stones[i]))
            return dp[i][total]
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func lastStoneWeightII(_ stones: [Int]) -> Int {
        let stoneSum = stones.reduce(0, +)
        let target = (stoneSum + 1) / 2
        var dp = [[Int]](repeating: [Int](repeating: -1, count: target + 1), count: stones.count)

        func dfs(_ i: Int, _ total: Int) -> Int {
            if total >= target || i == stones.count {
                return abs(total - (stoneSum - total))
            }
            if dp[i][total] != -1 {
                return dp[i][total]
            }
            dp[i][total] = min(dfs(i + 1, total), dfs(i + 1, total + stones[i]))
            return dp[i][total]
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of working recursively from the first stone forward, we can build up solutions iteratively. We create a 2D table where `dp[i][t]` represents the maximum sum achievable using the first `i` stones without exceeding capacity `t`. This is essentially a 0/1 knapsack problem where we want to pack stones into a knapsack of capacity `target` to maximize the total weight.

### Algorithm

1. Initialize a 2D DP table of size `(n+1) x (target+1)` with zeros.
2. For each stone `i` from `1` to `n`:
   - For each possible capacity `t` from `0` to `target`:
     - If the stone fits (`t >= stones[i-1]`), take the maximum of skipping it or including it.
     - Otherwise, carry forward the previous result.
3. The answer is `stoneSum - 2 * dp[n][target]`.

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        n = len(stones)

        dp = [[0] * (target + 1) for _ in range(n + 1)]

        for i in range(1, n + 1):
            for t in range(target + 1):
                if t >= stones[i - 1]:
                    dp[i][t] = max(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1])
                else:
                    dp[i][t] = dp[i - 1][t]

        return stoneSum - 2 * dp[n][target]
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int n = stones.length;

        int[][] dp = new int[n + 1][target + 1];

        for (int i = 1; i <= n; i++) {
            for (int t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i][t] = Math.max(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1]);
                } else {
                    dp[i][t] = dp[i - 1][t];
                }
            }
        }

        return stoneSum - 2 * dp[n][target];
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;
        int n = stones.size();

        vector<vector<int>> dp(n + 1, vector<int>(target + 1, 0));

        for (int i = 1; i <= n; i++) {
            for (int t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i][t] = max(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1]);
                } else {
                    dp[i][t] = dp[i - 1][t];
                }
            }
        }

        return stoneSum - 2 * dp[n][target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.floor(stoneSum / 2);
        const n = stones.length;

        const dp = Array.from({ length: n + 1 }, () =>
            Array(target + 1).fill(0),
        );

        for (let i = 1; i <= n; i++) {
            for (let t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i][t] = Math.max(
                        dp[i - 1][t],
                        dp[i - 1][t - stones[i - 1]] + stones[i - 1],
                    );
                } else {
                    dp[i][t] = dp[i - 1][t];
                }
            }
        }

        return stoneSum - 2 * dp[n][target];
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int n = stones.Length;

        int[,] dp = new int[n + 1, target + 1];

        for (int i = 1; i <= n; i++) {
            for (int t = 0; t <= target; t++) {
                if (t >= stones[i - 1]) {
                    dp[i, t] = Math.Max(dp[i - 1, t], dp[i - 1, t - stones[i - 1]] + stones[i - 1]);
                } else {
                    dp[i, t] = dp[i - 1, t];
                }
            }
        }

        return stoneSum - 2 * dp[n, target];
    }
}
```

```go
func lastStoneWeightII(stones []int) int {
    stoneSum := 0
    for _, stone := range stones {
        stoneSum += stone
    }
    target := stoneSum / 2
    n := len(stones)

    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, target+1)
    }

    for i := 1; i <= n; i++ {
        for t := 0; t <= target; t++ {
            if t >= stones[i-1] {
                dp[i][t] = max(dp[i-1][t], dp[i-1][t-stones[i-1]]+stones[i-1])
            } else {
                dp[i][t] = dp[i-1][t]
            }
        }
    }

    return stoneSum - 2*dp[n][target]
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
    fun lastStoneWeightII(stones: IntArray): Int {
        val stoneSum = stones.sum()
        val target = stoneSum / 2
        val n = stones.size

        val dp = Array(n + 1) { IntArray(target + 1) }

        for (i in 1..n) {
            for (t in 0..target) {
                if (t >= stones[i - 1]) {
                    dp[i][t] = maxOf(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1])
                } else {
                    dp[i][t] = dp[i - 1][t]
                }
            }
        }

        return stoneSum - 2 * dp[n][target]
    }
}
```

```swift
class Solution {
    func lastStoneWeightII(_ stones: [Int]) -> Int {
        let stoneSum = stones.reduce(0, +)
        let target = stoneSum / 2
        let n = stones.count

        var dp = [[Int]](repeating: [Int](repeating: 0, count: target + 1), count: n + 1)

        for i in 1...n {
            for t in 0...target {
                if t >= stones[i - 1] {
                    dp[i][t] = max(dp[i - 1][t], dp[i - 1][t - stones[i - 1]] + stones[i - 1])
                } else {
                    dp[i][t] = dp[i - 1][t]
                }
            }
        }

        return stoneSum - 2 * dp[n][target]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Looking at the bottom-up solution, each row only depends on the previous row. This means we don't need to store the entire 2D table. A single 1D array is sufficient if we iterate through capacities in reverse order to avoid overwriting values we still need.

### Algorithm

1. Initialize a 1D DP array of size `target + 1` with zeros.
2. For each stone in the array:
   - Iterate `t` from `target` down to the stone's weight.
   - Update `dp[t]` as the maximum of keeping it or adding the stone.
3. Return `stoneSum - 2 * dp[target]`.

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        dp = [0] * (target + 1)

        for stone in stones:
            for t in range(target, stone - 1, -1):
                dp[t] = max(dp[t], dp[t - stone] + stone)

        return stoneSum - 2 * dp[target]
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int[] dp = new int[target + 1];

        for (int stone : stones) {
            for (int t = target; t >= stone; t--) {
                dp[t] = Math.max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;
        vector<int> dp(target + 1, 0);

        for (int stone : stones) {
            for (int t = target; t >= stone; t--) {
                dp[t] = max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.floor(stoneSum / 2);
        const dp = new Array(target + 1).fill(0);

        for (const stone of stones) {
            for (let t = target; t >= stone; t--) {
                dp[t] = Math.max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;
        int[] dp = new int[target + 1];

        foreach (int stone in stones) {
            for (int t = target; t >= stone; t--) {
                dp[t] = Math.Max(dp[t], dp[t - stone] + stone);
            }
        }

        return stoneSum - 2 * dp[target];
    }
}
```

```go
func lastStoneWeightII(stones []int) int {
    stoneSum := 0
    for _, stone := range stones {
        stoneSum += stone
    }
    target := stoneSum / 2
    dp := make([]int, target+1)

    for _, stone := range stones {
        for t := target; t >= stone; t-- {
            if dp[t-stone]+stone > dp[t] {
                dp[t] = dp[t-stone] + stone
            }
        }
    }

    return stoneSum - 2*dp[target]
}
```

```kotlin
class Solution {
    fun lastStoneWeightII(stones: IntArray): Int {
        val stoneSum = stones.sum()
        val target = stoneSum / 2
        val dp = IntArray(target + 1)

        for (stone in stones) {
            for (t in target downTo stone) {
                dp[t] = maxOf(dp[t], dp[t - stone] + stone)
            }
        }

        return stoneSum - 2 * dp[target]
    }
}
```

```swift
class Solution {
    func lastStoneWeightII(_ stones: [Int]) -> Int {
        let stoneSum = stones.reduce(0, +)
        let target = stoneSum / 2
        var dp = [Int](repeating: 0, count: target + 1)

        for stone in stones {
            for t in stride(from: target, through: stone, by: -1) {
                dp[t] = max(dp[t], dp[t - stone] + stone)
            }
        }

        return stoneSum - 2 * dp[target]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 5. Dynamic Programming (Hash Set)

### Intuition

Instead of tracking the maximum achievable sum at each capacity, we can simply track which sums are reachable. A hash set stores all possible subset sums. For each stone, we generate new reachable sums by adding the stone's weight to existing sums. The answer is the largest reachable sum that doesn't exceed `target`.

### Algorithm

1. Initialize a set containing only `0` (representing an empty subset).
2. For each stone:
   - Create a new set by adding the stone's weight to each existing value.
   - Merge it with the existing set.
   - If we reach exactly `target`, return `0` immediately.
3. Find the maximum value in the set and return `stoneSum - 2 * max`.

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        dp = {0}

        for stone in stones:
            new_dp = set(dp)
            for val in dp:
                if val + stone == target:
                    return stoneSum - 2 * target
                if val + stone < target:
                    new_dp.add(val + stone)
            dp = new_dp

        return stoneSum - 2 * max(dp)
```

```java
public class Solution {
    public int lastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        for (int stone : stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;

        Set<Integer> dp = new HashSet<>();
        dp.add(0);

        for (int stone : stones) {
            Set<Integer> newDp = new HashSet<>(dp);
            for (int val : dp) {
                if (val + stone == target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.add(val + stone);
                }
            }
            dp = newDp;
        }

        int maxVal = 0;
        for (int val : dp) {
            maxVal = Math.max(maxVal, val);
        }

        return stoneSum - 2 * maxVal;
    }
}
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;

        unordered_set<int> dp = {0};

        for (int& stone : stones) {
            unordered_set<int> newDp(dp);
            for (int val : dp) {
                if (val + stone == target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.insert(val + stone);
                }
            }
            dp = newDp;
        }

        int maxVal = 0;
        for (int val : dp) {
            maxVal = max(maxVal, val);
        }

        return stoneSum - 2 * maxVal;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} stones
     * @return {number}
     */
    lastStoneWeightII(stones) {
        const stoneSum = stones.reduce((a, b) => a + b, 0);
        const target = Math.floor(stoneSum / 2);

        let dp = new Set([0]);

        for (const stone of stones) {
            const newDp = new Set(dp);
            for (const val of dp) {
                if (val + stone === target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.add(val + stone);
                }
            }
            dp = newDp;
        }

        return stoneSum - 2 * Math.max(...dp);
    }
}
```

```csharp
public class Solution {
    public int LastStoneWeightII(int[] stones) {
        int stoneSum = 0;
        foreach (int stone in stones) {
            stoneSum += stone;
        }
        int target = stoneSum / 2;

        HashSet<int> dp = new HashSet<int>();
        dp.Add(0);

        foreach (int stone in stones) {
            HashSet<int> newDp = new HashSet<int>(dp);
            foreach (int val in dp) {
                if (val + stone == target) {
                    return stoneSum - 2 * target;
                }
                if (val + stone < target) {
                    newDp.Add(val + stone);
                }
            }
            dp = newDp;
        }

        int maxVal = 0;
        foreach (int val in dp) {
            maxVal = Math.Max(maxVal, val);
        }

        return stoneSum - 2 * maxVal;
    }
}
```

```go
func lastStoneWeightII(stones []int) int {
    stoneSum := 0
    for _, stone := range stones {
        stoneSum += stone
    }
    target := stoneSum / 2

    dp := make(map[int]bool)
    dp[0] = true

    for _, stone := range stones {
        newDp := make(map[int]bool)
        for val := range dp {
            newDp[val] = true
            if val+stone == target {
                return stoneSum - 2*target
            }
            if val+stone < target {
                newDp[val+stone] = true
            }
        }
        dp = newDp
    }

    maxVal := 0
    for val := range dp {
        if val > maxVal {
            maxVal = val
        }
    }

    return stoneSum - 2*maxVal
}
```

```kotlin
class Solution {
    fun lastStoneWeightII(stones: IntArray): Int {
        val stoneSum = stones.sum()
        val target = stoneSum / 2

        var dp = hashSetOf(0)

        for (stone in stones) {
            val newDp = HashSet(dp)
            for (v in dp) {
                if (v + stone == target) {
                    return stoneSum - 2 * target
                }
                if (v + stone < target) {
                    newDp.add(v + stone)
                }
            }
            dp = newDp
        }

        return stoneSum - 2 * (dp.maxOrNull() ?: 0)
    }
}
```

```swift
class Solution {
    func lastStoneWeightII(_ stones: [Int]) -> Int {
        let stoneSum = stones.reduce(0, +)
        let target = stoneSum / 2

        var dp: Set<Int> = [0]

        for stone in stones {
            var newDp = dp
            for val in dp {
                if val + stone == target {
                    return stoneSum - 2 * target
                }
                if val + stone < target {
                    newDp.insert(val + stone)
                }
            }
            dp = newDp
        }

        return stoneSum - 2 * (dp.max() ?? 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.

---

## 6. Dynamic Programming (Bitset)

### Intuition

A bitset can represent reachable sums more compactly than a hash set. Each bit position represents whether that sum is achievable. Shifting the bitset left by a stone's weight and OR-ing with the original efficiently computes all new reachable sums in a single operation.

### Algorithm

1. Initialize a bitset with only bit `0` set (sum `0` is reachable).
2. For each stone, left-shift the bitset by the stone's weight and OR it with itself.
3. Starting from `target` down to `0`, find the first set bit. This represents the largest achievable sum not exceeding `target`.
4. Return `stoneSum - 2 * t`.

::tabs-start

```python
class Solution:
    def lastStoneWeightII(self, stones: List[int]) -> int:
        stoneSum = sum(stones)
        target = stoneSum // 2
        dp = 1

        for stone in stones:
            dp |= dp << stone

        for t in range(target, -1, -1):
            if dp & (1 << t):
                return stoneSum - 2 * t
```

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stoneSum = accumulate(stones.begin(), stones.end(), 0);
        int target = stoneSum / 2;
        bitset<3001> dp;
        dp[0] = true;

        for (int stone : stones) {
            dp |= (dp << stone);
        }

        for (int t = target; t >= 0; --t) {
            if (dp[t]) {
                return stoneSum - 2 * t;
            }
        }
        return 0;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(m)$

> Where $n$ is the number of stones and $m$ is the sum of the weights of the stones.
