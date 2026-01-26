## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Recursion** - Breaking problems into smaller subproblems and combining results
- **Dynamic Programming** - Memoization (top-down) and tabulation (bottom-up) techniques
- **Mathematical Reasoning** - Understanding why certain factors (like 3) maximize products

---

## 1. Recursion (Brute Force)

### Intuition

To maximize the product, we can try all possible ways to split the integer. For each number, we consider breaking it into two parts and recursively computing the best product for each part. The key insight is that a subpart can either be broken further or kept as is, except for the original number which must be broken at least once.

### Algorithm

1. Define a recursive function `dfs(num)` that returns the maximum product obtainable from `num`.
2. Base case: if `num == 1`, return `1`.
3. If `num` equals the original input `n`, initialize result to `0` (must break). Otherwise, `num` itself is a valid option.
4. Try all splits `i` from `1` to `num - 1`, computing `dfs(i) * dfs(num - i)` and keeping the maximum.
5. Return the maximum product found.

::tabs-start

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        def dfs(num):
            if num == 1:
                return 1
            res = 0 if num == n else num
            for i in range(1, num):
                val = dfs(i) * dfs(num - i)
                res = max(res, val)
            return res
        return dfs(n)
```

```java
public class Solution {
    public int integerBreak(int n) {
        return dfs(n, n);
    }

    private int dfs(int num, int original) {
        if (num == 1) return 1;

        int res = (num == original) ? 0 : num;
        for (int i = 1; i < num; i++) {
            int val = dfs(i, original) * dfs(num - i, original);
            res = Math.max(res, val);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int integerBreak(int n) {
        return dfs(n, n);
    }

private:
    int dfs(int num, int original) {
        if (num == 1) return 1;

        int res = (num == original) ? 0 : num;
        for (int i = 1; i < num; i++) {
            int val = dfs(i, original) * dfs(num - i, original);
            res = max(res, val);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    integerBreak(n) {
        const dfs = (num) => {
            if (num === 1) return 1;

            let res = num === n ? 0 : num;
            for (let i = 1; i < num; i++) {
                const val = dfs(i) * dfs(num - i);
                res = Math.max(res, val);
            }
            return res;
        };

        return dfs(n, n);
    }
}
```

```csharp
public class Solution {
    private int n;

    public int IntegerBreak(int n) {
        this.n = n;

        int Dfs(int num) {
            if (num == 1) return 1;
            int res = num == n ? 0 : num;
            for (int i = 1; i < num; i++) {
                int val = Dfs(i) * Dfs(num - i);
                res = Math.Max(res, val);
            }
            return res;
        }

        return Dfs(n);
    }
}
```

```go
func integerBreak(n int) int {
    var dfs func(num, original int) int
    dfs = func(num, original int) int {
        if num == 1 {
            return 1
        }
        res := num
        if num == original {
            res = 0
        }
        for i := 1; i < num; i++ {
            val := dfs(i, original) * dfs(num-i, original)
            if val > res {
                res = val
            }
        }
        return res
    }
    return dfs(n, n)
}
```

```kotlin
class Solution {
    fun integerBreak(n: Int): Int {
        fun dfs(num: Int, original: Int): Int {
            if (num == 1) return 1
            var res = if (num == original) 0 else num
            for (i in 1 until num) {
                val value = dfs(i, original) * dfs(num - i, original)
                res = maxOf(res, value)
            }
            return res
        }
        return dfs(n, n)
    }
}
```

```swift
class Solution {
    func integerBreak(_ n: Int) -> Int {
        func dfs(_ num: Int, _ original: Int) -> Int {
            if num == 1 { return 1 }
            var res = num == original ? 0 : num
            for i in 1..<num {
                let val = dfs(i, original) * dfs(num - i, original)
                res = max(res, val)
            }
            return res
        }
        return dfs(n, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Recursion

### Intuition

Instead of trying all pairs of splits, we can think of this as a bounded knapsack problem where we repeatedly subtract values from the number. We pick a value `i` (from 1 to n-1) and multiply it with the optimal product of the remaining. By allowing repeated use of the same value, we explore all combinations more efficiently.

### Algorithm

1. Define `dfs(num, i)` where `num` is the remaining value and `i` is the maximum allowed factor.
2. Base case: if `num` or `i` is `0`, return `1`.
3. If `i > num`, reduce `i` to `num`.
4. Choose between:
   - Using factor `i`: multiply `i * dfs(num - i, i)`.
   - Skipping factor `i`: call `dfs(num, i - 1)`.
5. Return the maximum of these two choices.

::tabs-start

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        def dfs(num, i):
            if min(num, i) == 0:
                return 1

            if i > num:
                return dfs(num, num)

            return max(i * dfs(num - i, i), dfs(num, i - 1))

        return dfs(n, n - 1)
```

```java
public class Solution {
    public int integerBreak(int n) {
        return dfs(n, n - 1);
    }

    private int dfs(int num, int i) {
        if (Math.min(num, i) == 0) {
            return 1;
        }

        if (i > num) {
            return dfs(num, num);
        }

        return Math.max(i * dfs(num - i, i), dfs(num, i - 1));
    }
}
```

```cpp
class Solution {
public:
    int integerBreak(int n) {
        return dfs(n, n - 1);
    }

private:
    int dfs(int num, int i) {
        if (min(num, i) == 0) {
            return 1;
        }

        if (i > num) {
            return dfs(num, num);
        }

        return max(i * dfs(num - i, i), dfs(num, i - 1));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    integerBreak(n) {
        const dfs = (num, i) => {
            if (Math.min(num, i) === 0) {
                return 1;
            }

            if (i > num) {
                return dfs(num, num);
            }

            return Math.max(i * dfs(num - i, i), dfs(num, i - 1));
        };

        return dfs(n, n - 1);
    }
}
```

```csharp
public class Solution {
    public int IntegerBreak(int n) {
        int Dfs(int num, int i) {
            if (Math.Min(num, i) == 0) {
                return 1;
            }

            if (i > num) {
                return Dfs(num, num);
            }

            return Math.Max(i * Dfs(num - i, i), Dfs(num, i - 1));
        }

        return Dfs(n, n - 1);
    }
}
```

```go
func integerBreak(n int) int {
    var dfs func(num, i int) int
    dfs = func(num, i int) int {
        if min(num, i) == 0 {
            return 1
        }
        if i > num {
            return dfs(num, num)
        }
        return max(i*dfs(num-i, i), dfs(num, i-1))
    }
    return dfs(n, n-1)
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
    fun integerBreak(n: Int): Int {
        fun dfs(num: Int, i: Int): Int {
            if (minOf(num, i) == 0) return 1
            if (i > num) return dfs(num, num)
            return maxOf(i * dfs(num - i, i), dfs(num, i - 1))
        }
        return dfs(n, n - 1)
    }
}
```

```swift
class Solution {
    func integerBreak(_ n: Int) -> Int {
        func dfs(_ num: Int, _ i: Int) -> Int {
            if min(num, i) == 0 { return 1 }
            if i > num { return dfs(num, num) }
            return max(i * dfs(num - i, i), dfs(num, i - 1))
        }
        return dfs(n, n - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Dynamic Programming (Top-Down) - I

### Intuition

The brute force recursion recalculates the same subproblems many times. By storing the results in a memoization table, we avoid redundant work. Each unique value of `num` is computed only once, then reused.

### Algorithm

1. Create a hash map `dp` with base case `dp[1] = 1`.
2. Define `dfs(num)`:
   - If `num` is already in `dp`, return the cached value.
   - Initialize `dp[num]` to `0` if `num == n`, else to `num`.
   - For each split point `i` from `1` to `num - 1`, update `dp[num]` with `max(dp[num], dfs(i) * dfs(num - i))`.
   - Return `dp[num]`.
3. Call `dfs(n)` and return the result.

::tabs-start

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        dp = {1: 1}

        def dfs(num):
            if num in dp:
                return dp[num]

            dp[num] = 0 if num == n else num
            for i in range(1, num):
                val = dfs(i) * dfs(num - i)
                dp[num] = max(dp[num], val)
            return dp[num]

        return dfs(n)
```

```java
public class Solution {
    private Map<Integer, Integer> dp;

    public int integerBreak(int n) {
        dp = new HashMap<>();
        dp.put(1, 1);
        return dfs(n, n);
    }

    private int dfs(int num, int n) {
        if (dp.containsKey(num)) {
            return dp.get(num);
        }

        int res = (num == n) ? 0 : num;
        for (int i = 1; i < num; i++) {
            int val = dfs(i, n) * dfs(num - i, n);
            res = Math.max(res, val);
        }

        dp.put(num, res);
        return res;
    }
}
```

```cpp
class Solution {
    unordered_map<int, int> dp;

public:
    int integerBreak(int n) {
        dp[1] = 1;
        return dfs(n, n);
    }

private:
    int dfs(int num, int n) {
        if (dp.find(num) != dp.end()) {
            return dp[num];
        }

        int res = (num == n) ? 0 : num;
        for (int i = 1; i < num; i++) {
            int val = dfs(i, n) * dfs(num - i, n);
            res = max(res, val);
        }

        dp[num] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    integerBreak(n) {
        const dp = new Map();
        dp.set(1, 1);

        const dfs = (num) => {
            if (dp.has(num)) {
                return dp.get(num);
            }

            let res = num === n ? 0 : num;
            for (let i = 1; i < num; i++) {
                const val = dfs(i) * dfs(num - i);
                res = Math.max(res, val);
            }

            dp.set(num, res);
            return res;
        };

        return dfs(n);
    }
}
```

```csharp
public class Solution {
    public int IntegerBreak(int n) {
        Dictionary<int, int> dp = new Dictionary<int, int>();
        dp[1] = 1;

        int Dfs(int num) {
            if (dp.ContainsKey(num)) {
                return dp[num];
            }

            dp[num] = (num == n) ? 0 : num;
            for (int i = 1; i < num; i++) {
                int val = Dfs(i) * Dfs(num - i);
                dp[num] = Math.Max(dp[num], val);
            }

            return dp[num];
        }

        return Dfs(n);
    }
}
```

```go
func integerBreak(n int) int {
    dp := map[int]int{1: 1}

    var dfs func(num int) int
    dfs = func(num int) int {
        if val, ok := dp[num]; ok {
            return val
        }

        res := num
        if num == n {
            res = 0
        }
        for i := 1; i < num; i++ {
            val := dfs(i) * dfs(num-i)
            if val > res {
                res = val
            }
        }
        dp[num] = res
        return res
    }

    return dfs(n)
}
```

```kotlin
class Solution {
    fun integerBreak(n: Int): Int {
        val dp = mutableMapOf(1 to 1)

        fun dfs(num: Int): Int {
            if (dp.containsKey(num)) return dp[num]!!

            var res = if (num == n) 0 else num
            for (i in 1 until num) {
                val value = dfs(i) * dfs(num - i)
                res = maxOf(res, value)
            }
            dp[num] = res
            return res
        }

        return dfs(n)
    }
}
```

```swift
class Solution {
    func integerBreak(_ n: Int) -> Int {
        var dp: [Int: Int] = [1: 1]

        func dfs(_ num: Int) -> Int {
            if let val = dp[num] {
                return val
            }

            var res = num == n ? 0 : num
            for i in 1..<num {
                let val = dfs(i) * dfs(num - i)
                res = max(res, val)
            }
            dp[num] = res
            return res
        }

        return dfs(n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Top-Down) - II

### Intuition

This memoizes the bounded knapsack formulation. We cache results based on both the remaining sum and the current maximum factor being considered. This avoids recomputing identical states across different recursion paths.

### Algorithm

1. Create a 2D memo table `dp[num][i]` initialized to `-1`.
2. Define `dfs(num, i)`:
   - If `min(num, i) == 0`, return `1`.
   - If `dp[num][i]` is cached, return it.
   - If `i > num`, set `dp[num][i] = dfs(num, num)`.
   - Otherwise, set `dp[num][i] = max(i * dfs(num - i, i), dfs(num, i - 1))`.
   - Return `dp[num][i]`.
3. Call `dfs(n, n - 1)` and return the result.

::tabs-start

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        dp = {}
        def dfs(num, i):
            if min(num, i) == 0:
                return 1
            if (num, i) in dp:
                return dp[(num, i)]
            if i > num:
                dp[(num, i)] = dfs(num, num)
                return dp[(num, i)]

            dp[(num, i)] = max(i * dfs(num - i, i), dfs(num, i - 1))
            return dp[(num, i)]

        return dfs(n, n - 1)
```

```java
public class Solution {
    private int[][] dp;

    public int integerBreak(int n) {
        dp = new int[n + 1][n];
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j < n; j++) {
                dp[i][j] = -1;
            }
        }
        return dfs(n, n - 1);
    }

    private int dfs(int num, int i) {
        if (Math.min(num, i) == 0) {
            return 1;
        }
        if (dp[num][i] != -1) {
            return dp[num][i];
        }
        if (i > num) {
            dp[num][i] = dfs(num, num);
            return dp[num][i];
        }
        dp[num][i] = Math.max(i * dfs(num - i, i), dfs(num, i - 1));
        return dp[num][i];
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    int integerBreak(int n) {
        dp.assign(n + 1, vector<int>(n, -1));
        return dfs(n, n - 1);
    }

private:
    int dfs(int num, int i) {
        if (min(num, i) == 0) {
            return 1;
        }
        if (dp[num][i] != -1) {
            return dp[num][i];
        }
        if (i > num) {
            dp[num][i] = dfs(num, num);
            return dp[num][i];
        }
        dp[num][i] = max(i * dfs(num - i, i), dfs(num, i - 1));
        return dp[num][i];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    integerBreak(n) {
        const dp = Array.from({ length: n + 1 }, () => Array(n).fill(-1));

        const dfs = (num, i) => {
            if (Math.min(num, i) === 0) {
                return 1;
            }
            if (dp[num][i] !== -1) {
                return dp[num][i];
            }
            if (i > num) {
                dp[num][i] = dfs(num, num);
                return dp[num][i];
            }
            dp[num][i] = Math.max(i * dfs(num - i, i), dfs(num, i - 1));
            return dp[num][i];
        };

        return dfs(n, n - 1);
    }
}
```

```csharp
public class Solution {
    public int IntegerBreak(int n) {
        Dictionary<(int, int), int> dp = new Dictionary<(int, int), int>();

        int Dfs(int num, int i) {
            if (Math.Min(num, i) == 0) return 1;

            if (dp.ContainsKey((num, i))) return dp[(num, i)];

            if (i > num) {
                dp[(num, i)] = Dfs(num, num);
                return dp[(num, i)];
            }

            dp[(num, i)] = Math.Max(i * Dfs(num - i, i), Dfs(num, i - 1));
            return dp[(num, i)];
        }

        return Dfs(n, n - 1);
    }
}
```

```go
func integerBreak(n int) int {
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, n)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(num, i int) int
    dfs = func(num, i int) int {
        if min(num, i) == 0 {
            return 1
        }
        if dp[num][i] != -1 {
            return dp[num][i]
        }
        if i > num {
            dp[num][i] = dfs(num, num)
            return dp[num][i]
        }
        dp[num][i] = max(i*dfs(num-i, i), dfs(num, i-1))
        return dp[num][i]
    }

    return dfs(n, n-1)
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
    fun integerBreak(n: Int): Int {
        val dp = Array(n + 1) { IntArray(n) { -1 } }

        fun dfs(num: Int, i: Int): Int {
            if (minOf(num, i) == 0) return 1
            if (dp[num][i] != -1) return dp[num][i]
            if (i > num) {
                dp[num][i] = dfs(num, num)
                return dp[num][i]
            }
            dp[num][i] = maxOf(i * dfs(num - i, i), dfs(num, i - 1))
            return dp[num][i]
        }

        return dfs(n, n - 1)
    }
}
```

```swift
class Solution {
    func integerBreak(_ n: Int) -> Int {
        var dp = [[Int]](repeating: [Int](repeating: -1, count: n), count: n + 1)

        func dfs(_ num: Int, _ i: Int) -> Int {
            if min(num, i) == 0 { return 1 }
            if dp[num][i] != -1 { return dp[num][i] }
            if i > num {
                dp[num][i] = dfs(num, num)
                return dp[num][i]
            }
            dp[num][i] = max(i * dfs(num - i, i), dfs(num, i - 1))
            return dp[num][i]
        }

        return dfs(n, n - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 5. Dynamic Programming (Bottom-Up)

### Intuition

We can solve this iteratively by building up solutions from smaller numbers. For each number from 2 to n, we compute the best product by trying all ways to split it and combining previously computed results.

### Algorithm

1. Create an array `dp` of size `n + 1` with `dp[1] = 1`.
2. For each `num` from `2` to `n`:
   - Initialize `dp[num]` to `num` (or `0` if `num == n`).
   - For each `i` from `1` to `num - 1`, update `dp[num] = max(dp[num], dp[i] * dp[num - i])`.
3. Return `dp[n]`.

::tabs-start

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        dp = [0] * (n + 1)
        dp[1] = 1

        for num in range(2, n + 1):
            dp[num] = 0 if num == n else num
            for i in range(1, num):
                dp[num] = max(dp[num], dp[i] * dp[num - i])

        return dp[n]
```

```java
public class Solution {
    public int integerBreak(int n) {
        int[] dp = new int[n + 1];
        dp[1] = 1;

        for (int num = 2; num <= n; num++) {
            dp[num] = (num == n) ? 0 : num;
            for (int i = 1; i < num; i++) {
                dp[num] = Math.max(dp[num], dp[i] * dp[num - i]);
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int integerBreak(int n) {
        vector<int> dp(n + 1, 0);
        dp[1] = 1;

        for (int num = 2; num <= n; num++) {
            dp[num] = (num == n) ? 0 : num;
            for (int i = 1; i < num; i++) {
                dp[num] = max(dp[num], dp[i] * dp[num - i]);
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    integerBreak(n) {
        const dp = new Array(n + 1).fill(0);
        dp[1] = 1;

        for (let num = 2; num <= n; num++) {
            dp[num] = num === n ? 0 : num;
            for (let i = 1; i < num; i++) {
                dp[num] = Math.max(dp[num], dp[i] * dp[num - i]);
            }
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int IntegerBreak(int n) {
        int[] dp = new int[n + 1];
        dp[1] = 1;

        for (int num = 2; num <= n; num++) {
            dp[num] = num == n ? 0 : num;
            for (int i = 1; i < num; i++) {
                dp[num] = Math.Max(dp[num], dp[i] * dp[num - i]);
            }
        }

        return dp[n];
    }
}
```

```go
func integerBreak(n int) int {
    dp := make([]int, n+1)
    dp[1] = 1

    for num := 2; num <= n; num++ {
        if num == n {
            dp[num] = 0
        } else {
            dp[num] = num
        }
        for i := 1; i < num; i++ {
            if dp[i]*dp[num-i] > dp[num] {
                dp[num] = dp[i] * dp[num-i]
            }
        }
    }

    return dp[n]
}
```

```kotlin
class Solution {
    fun integerBreak(n: Int): Int {
        val dp = IntArray(n + 1)
        dp[1] = 1

        for (num in 2..n) {
            dp[num] = if (num == n) 0 else num
            for (i in 1 until num) {
                dp[num] = maxOf(dp[num], dp[i] * dp[num - i])
            }
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func integerBreak(_ n: Int) -> Int {
        var dp = [Int](repeating: 0, count: n + 1)
        dp[1] = 1

        for num in 2...n {
            dp[num] = num == n ? 0 : num
            for i in 1..<num {
                dp[num] = max(dp[num], dp[i] * dp[num - i])
            }
        }

        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 6. Math

### Intuition

A mathematical analysis reveals that the optimal strategy is to break the number into as many 3s as possible. This is because 3 maximizes the product per unit. We avoid leaving a remainder of 1 since `3 + 1 = 4` and `2 * 2 > 3 * 1`. For small values (`n <= 3`), we handle them as special cases.

### Algorithm

1. If `n <= 3`, return `n - 1` (since we must break at least once).
2. Repeatedly subtract `3` from `n` and multiply the result by `3`, until `n <= 4`.
3. Multiply the final remainder (which will be `2`, `3`, or `4`) into the result.
4. Return the result.

::tabs-start

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        if n <= 3:
            return n - 1

        res = 1
        while n > 4:
            res *= 3
            n -= 3
        return res * n
```

```java
public class Solution {
    public int integerBreak(int n) {
        if (n <= 3) return n - 1;

        int res = 1;
        while (n > 4) {
            res *= 3;
            n -= 3;
        }
        return res * n;
    }
}
```

```cpp
class Solution {
public:
    int integerBreak(int n) {
        if (n <= 3) return n - 1;

        int res = 1;
        while (n > 4) {
            res *= 3;
            n -= 3;
        }
        return res * n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    integerBreak(n) {
        if (n <= 3) return n - 1;

        let res = 1;
        while (n > 4) {
            res *= 3;
            n -= 3;
        }
        return res * n;
    }
}
```

```csharp
public class Solution {
    public int IntegerBreak(int n) {
        if (n <= 3) {
            return n - 1;
        }

        int res = 1;
        while (n > 4) {
            res *= 3;
            n -= 3;
        }

        return res * n;
    }
}
```

```go
func integerBreak(n int) int {
    if n <= 3 {
        return n - 1
    }

    res := 1
    for n > 4 {
        res *= 3
        n -= 3
    }
    return res * n
}
```

```kotlin
class Solution {
    fun integerBreak(n: Int): Int {
        if (n <= 3) return n - 1

        var res = 1
        var num = n
        while (num > 4) {
            res *= 3
            num -= 3
        }
        return res * num
    }
}
```

```swift
class Solution {
    func integerBreak(_ n: Int) -> Int {
        if n <= 3 { return n - 1 }

        var res = 1
        var num = n
        while num > 4 {
            res *= 3
            num -= 3
        }
        return res * num
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 7. Math (Optimal)

### Intuition

We can compute the result directly using the count of 3s. If `n % 3 == 0`, the answer is `3^(n/3)`. If `n % 3 == 1`, we should use one fewer 3 and multiply by `4` instead (since `2 * 2 > 3 * 1`). If `n % 3 == 2`, we multiply the power of 3 by `2`.

### Algorithm

1. If `n <= 3`, return `n - 1`.
2. Compute `res = 3^(n / 3)`.
3. If `n % 3 == 1`, return `(res / 3) * 4`.
4. If `n % 3 == 0`, return `res`.
5. Otherwise, return `res * 2`.

::tabs-start

```python
class Solution:
    def integerBreak(self, n: int) -> int:
        if n <= 3:
            return n - 1

        res = 3 ** (n // 3)
        if n % 3 == 1:
            return (res // 3) * 4

        return res * max(1, (n % 3))
```

```java
public class Solution {
    public int integerBreak(int n) {
        if (n <= 3) {
            return n - 1;
        }

        int res = (int) Math.pow(3, n / 3);
        if (n % 3 == 1) {
            return (res / 3) * 4;
        }

        return res * Math.max(1, n % 3);
    }
}
```

```cpp
class Solution {
public:
    int integerBreak(int n) {
        if (n <= 3) {
            return n - 1;
        }

        int res = pow(3, n / 3);
        if (n % 3 == 1) {
            return (res / 3) * 4;
        }

        return res * max(1, n % 3);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    integerBreak(n) {
        if (n <= 3) {
            return n - 1;
        }

        let res = Math.pow(3, Math.floor(n / 3));
        if (n % 3 === 1) {
            return Math.floor(res / 3) * 4;
        }

        return res * Math.max(1, n % 3);
    }
}
```

```csharp
public class Solution {
    public int IntegerBreak(int n) {
        if (n <= 3) {
            return n - 1;
        }

        int res = (int)Math.Pow(3, n / 3);

        if (n % 3 == 1) {
            return (res / 3) * 4;
        }

        return res * Math.Max(1, n % 3);
    }
}
```

```go
func integerBreak(n int) int {
    if n <= 3 {
        return n - 1
    }

    res := 1
    for i := 0; i < n/3; i++ {
        res *= 3
    }

    if n%3 == 1 {
        return (res / 3) * 4
    }

    if n%3 == 0 {
        return res
    }
    return res * (n % 3)
}
```

```kotlin
class Solution {
    fun integerBreak(n: Int): Int {
        if (n <= 3) return n - 1

        var res = 1
        repeat(n / 3) { res *= 3 }

        return when (n % 3) {
            1 -> (res / 3) * 4
            0 -> res
            else -> res * (n % 3)
        }
    }
}
```

```swift
class Solution {
    func integerBreak(_ n: Int) -> Int {
        if n <= 3 { return n - 1 }

        var res = 1
        for _ in 0..<(n / 3) {
            res *= 3
        }

        if n % 3 == 1 {
            return (res / 3) * 4
        }

        return res * max(1, n % 3)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Forgetting the Original Number Must Be Broken

A common mistake is allowing the original input `n` to remain unbroken. The problem requires at least one split, so returning `n` itself is invalid. For example, `integerBreak(4)` must return `4` (from `2 * 2`), not `4` unchanged. Ensure your base case or initialization forces at least one break for the original number while still allowing subproblems to use values directly.

### Mishandling Small Values of n

The cases `n = 2` and `n = 3` are special because breaking them actually produces a smaller product than keeping them whole (for subproblems). For `n = 2`, breaking gives `1 * 1 = 1` but we must return `1` since we must break. For `n = 3`, breaking gives at best `1 * 2 = 2`. Many solutions fail by not treating these edge cases differently from the general recursive case.

### Using Factors of 1 or Factors Greater Than 4

Breaking off a factor of 1 never helps since `1 * (n-1) < n`. Similarly, keeping any factor greater than 4 is suboptimal because it can always be split into smaller factors with a larger product. For example, `5` should be split into `2 + 3` giving `6` rather than kept as `5`. The optimal solution primarily uses factors of 2 and 3.
