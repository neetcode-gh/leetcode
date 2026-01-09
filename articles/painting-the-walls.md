## 1. Recursion

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:

        def dfs(i, remain):
            if remain <= 0:
                return 0
            if i == len(cost):
                return float("inf")

            paint = cost[i] + dfs(i + 1, remain - 1 - time[i])
            skip = dfs(i + 1, remain)
            return min(paint, skip)

        return dfs(0, len(cost))
```

```java
public class Solution {
    public int paintWalls(int[] cost, int[] time) {
        return dfs(cost, time, 0, cost.length);
    }

    private int dfs(int[] cost, int[] time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.length) {
            return Integer.MAX_VALUE;
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != Integer.MAX_VALUE) paint += cost[i];
        int skip = dfs(cost, time, i + 1, remain);
        return Math.min(paint, skip);
    }
}
```

```cpp
class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        return dfs(cost, time, 0, cost.size());
    }

private:
    int dfs(vector<int>& cost, vector<int>& time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.size()) {
            return INT_MAX;
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != INT_MAX) paint += cost[i];

        int skip = dfs(cost, time, i + 1, remain);
        return min(paint, skip);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const dfs = (i, remain) => {
            if (remain <= 0) {
                return 0;
            }
            if (i === cost.length) {
                return Infinity;
            }

            const paint = cost[i] + dfs(i + 1, remain - 1 - time[i]);
            const skip = dfs(i + 1, remain);
            return Math.min(paint, skip);
        };

        return dfs(0, cost.length);
    }
}
```

```csharp
public class Solution {
    public int PaintWalls(int[] cost, int[] time) {
        return Dfs(cost, time, 0, cost.Length);
    }

    private int Dfs(int[] cost, int[] time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.Length) {
            return int.MaxValue;
        }

        int paint = Dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != int.MaxValue) paint += cost[i];
        int skip = Dfs(cost, time, i + 1, remain);
        return Math.Min(paint, skip);
    }
}
```

```go
func paintWalls(cost []int, time []int) int {
    var dfs func(i, remain int) int
    dfs = func(i, remain int) int {
        if remain <= 0 {
            return 0
        }
        if i == len(cost) {
            return math.MaxInt32
        }

        paint := dfs(i+1, remain-1-time[i])
        if paint != math.MaxInt32 {
            paint += cost[i]
        }
        skip := dfs(i+1, remain)
        return min(paint, skip)
    }

    return dfs(0, len(cost))
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
    fun paintWalls(cost: IntArray, time: IntArray): Int {
        fun dfs(i: Int, remain: Int): Int {
            if (remain <= 0) return 0
            if (i == cost.size) return Int.MAX_VALUE

            var paint = dfs(i + 1, remain - 1 - time[i])
            if (paint != Int.MAX_VALUE) paint += cost[i]
            val skip = dfs(i + 1, remain)
            return minOf(paint, skip)
        }

        return dfs(0, cost.size)
    }
}
```

```swift
class Solution {
    func paintWalls(_ cost: [Int], _ time: [Int]) -> Int {
        func dfs(_ i: Int, _ remain: Int) -> Int {
            if remain <= 0 {
                return 0
            }
            if i == cost.count {
                return Int.max
            }

            var paint = dfs(i + 1, remain - 1 - time[i])
            if paint != Int.max {
                paint += cost[i]
            }
            let skip = dfs(i + 1, remain)
            return min(paint, skip)
        }

        return dfs(0, cost.count)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        dp = {}

        def dfs(i, remain):
            if remain <= 0:
                return 0
            if i == len(cost):
                return float("inf")
            if (i, remain) in dp:
                return dp[(i, remain)]

            paint = cost[i] + dfs(i + 1, remain - 1 - time[i])
            skip = dfs(i + 1, remain)
            dp[(i, remain)] = min(paint, skip)
            return dp[(i, remain)]

        return dfs(0, len(cost))
```

```java
public class Solution {
    private int[][] dp;

    public int paintWalls(int[] cost, int[] time) {
        dp = new int[cost.length][cost.length + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        return dfs(cost, time, 0, cost.length);
    }

    private int dfs(int[] cost, int[] time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.length) {
            return Integer.MAX_VALUE;
        }
        if (dp[i][remain] != -1) {
            return dp[i][remain];
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != Integer.MAX_VALUE) paint += cost[i];

        int skip = dfs(cost, time, i + 1, remain);
        return dp[i][remain] = Math.min(paint, skip);
    }
}
```

```cpp
class Solution {
    vector<vector<int>> dp;

public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        dp.assign(cost.size(), vector<int>(cost.size() + 1, -1));
        return dfs(cost, time, 0, cost.size());
    }

private:
    int dfs(vector<int>& cost, vector<int>& time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.size()) {
            return INT_MAX;
        }
        if (dp[i][remain] != -1) {
            return dp[i][remain];
        }

        int paint = dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != INT_MAX) paint += cost[i];

        int skip = dfs(cost, time, i + 1, remain);
        return dp[i][remain] = min(paint, skip);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const n = cost.length;
        const dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));
        const dfs = (i, remain) => {
            if (remain <= 0) {
                return 0;
            }
            if (i === n) {
                return Infinity;
            }
            if (dp[i][remain] !== -1) {
                return dp[i][remain];
            }

            const paint = cost[i] + dfs(i + 1, remain - 1 - time[i]);
            const skip = dfs(i + 1, remain);
            return (dp[i][remain] = Math.min(paint, skip));
        };

        return dfs(0, cost.length);
    }
}
```

```csharp
public class Solution {
    private int[][] dp;

    public int PaintWalls(int[] cost, int[] time) {
        dp = new int[cost.Length][];
        for (int i = 0; i < cost.Length; i++) {
            dp[i] = new int[cost.Length + 1];
            Array.Fill(dp[i], -1);
        }
        return Dfs(cost, time, 0, cost.Length);
    }

    private int Dfs(int[] cost, int[] time, int i, int remain) {
        if (remain <= 0) {
            return 0;
        }
        if (i == cost.Length) {
            return int.MaxValue;
        }
        if (dp[i][remain] != -1) {
            return dp[i][remain];
        }

        int paint = Dfs(cost, time, i + 1, remain - 1 - time[i]);
        if (paint != int.MaxValue) paint += cost[i];

        int skip = Dfs(cost, time, i + 1, remain);
        return dp[i][remain] = Math.Min(paint, skip);
    }
}
```

```go
func paintWalls(cost []int, time []int) int {
    n := len(cost)
    dp := make([][]int, n)
    for i := range dp {
        dp[i] = make([]int, n+1)
        for j := range dp[i] {
            dp[i][j] = -1
        }
    }

    var dfs func(i, remain int) int
    dfs = func(i, remain int) int {
        if remain <= 0 {
            return 0
        }
        if i == n {
            return math.MaxInt32
        }
        if dp[i][remain] != -1 {
            return dp[i][remain]
        }

        paint := dfs(i+1, remain-1-time[i])
        if paint != math.MaxInt32 {
            paint += cost[i]
        }

        skip := dfs(i+1, remain)
        dp[i][remain] = min(paint, skip)
        return dp[i][remain]
    }

    return dfs(0, n)
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
    fun paintWalls(cost: IntArray, time: IntArray): Int {
        val n = cost.size
        val dp = Array(n) { IntArray(n + 1) { -1 } }

        fun dfs(i: Int, remain: Int): Int {
            if (remain <= 0) return 0
            if (i == n) return Int.MAX_VALUE
            if (dp[i][remain] != -1) return dp[i][remain]

            var paint = dfs(i + 1, remain - 1 - time[i])
            if (paint != Int.MAX_VALUE) paint += cost[i]

            val skip = dfs(i + 1, remain)
            dp[i][remain] = minOf(paint, skip)
            return dp[i][remain]
        }

        return dfs(0, n)
    }
}
```

```swift
class Solution {
    func paintWalls(_ cost: [Int], _ time: [Int]) -> Int {
        let n = cost.count
        var dp = [[Int]](repeating: [Int](repeating: -1, count: n + 1), count: n)

        func dfs(_ i: Int, _ remain: Int) -> Int {
            if remain <= 0 {
                return 0
            }
            if i == n {
                return Int.max
            }
            if dp[i][remain] != -1 {
                return dp[i][remain]
            }

            var paint = dfs(i + 1, remain - 1 - time[i])
            if paint != Int.max {
                paint += cost[i]
            }

            let skip = dfs(i + 1, remain)
            dp[i][remain] = min(paint, skip)
            return dp[i][remain]
        }

        return dfs(0, n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        n = len(cost)
        dp = [[0] * (n + 2) for _ in range(n + 1)]
        for remain in range(1, n + 1):
            dp[n][remain] = float("inf")

        for i in range(n - 1, -1, -1):
            for remain in range(1, n + 1):
                paint = cost[i] + dp[i + 1][max(remain - 1 - time[i], 0)]
                skip = dp[i + 1][remain]
                dp[i][remain] = min(paint, skip)

        return dp[0][n]
```

```java
public class Solution {
    public int paintWalls(int[] cost, int[] time) {
        int n = cost.length;
        int[][] dp = new int[n + 1][n + 2];
        for (int remain = 1; remain <= n; remain++) {
            dp[n][remain] = Integer.MAX_VALUE;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remain = 1; remain <= n; remain++) {
                int paint = dp[i + 1][Math.max(remain - 1 - time[i], 0)];
                if (paint != Integer.MAX_VALUE) paint += cost[i];

                int skip = dp[i + 1][remain];
                dp[i][remain] = Math.min(paint, skip);
            }
        }

        return dp[0][n];
    }
}
```

```cpp
class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        int n = cost.size();
        vector<vector<int>> dp(n + 1, vector<int>(n + 2, 0));

        for (int remain = 1; remain <= n; remain++) {
            dp[n][remain] = INT_MAX;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remain = 1; remain <= n; remain++) {
                int paint = dp[i + 1][max(remain - 1 - time[i], 0)];
                if (paint !=  INT_MAX) paint += cost[i];

                int skip = dp[i + 1][remain];
                dp[i][remain] = min(paint, skip);
            }
        }

        return dp[0][n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const n = cost.length;
        const dp = Array.from({ length: n + 1 }, () => Array(n + 2).fill(0));

        for (let remain = 1; remain <= n; remain++) {
            dp[n][remain] = Infinity;
        }

        for (let i = n - 1; i >= 0; i--) {
            for (let remain = 1; remain <= n; remain++) {
                const paint =
                    cost[i] + dp[i + 1][Math.max(remain - 1 - time[i], 0)];
                const skip = dp[i + 1][remain];
                dp[i][remain] = Math.min(paint, skip);
            }
        }

        return dp[0][n];
    }
}
```

```csharp
public class Solution {
    public int PaintWalls(int[] cost, int[] time) {
        int n = cost.Length;
        int[][] dp = new int[n + 1][];
        for (int i = 0; i <= n; i++) {
            dp[i] = new int[n + 2];
        }
        for (int remain = 1; remain <= n; remain++) {
            dp[n][remain] = int.MaxValue;
        }

        for (int i = n - 1; i >= 0; i--) {
            for (int remain = 1; remain <= n; remain++) {
                int paint = dp[i + 1][Math.Max(remain - 1 - time[i], 0)];
                if (paint != int.MaxValue) paint += cost[i];

                int skip = dp[i + 1][remain];
                dp[i][remain] = Math.Min(paint, skip);
            }
        }

        return dp[0][n];
    }
}
```

```go
func paintWalls(cost []int, time []int) int {
    n := len(cost)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, n+2)
    }

    for remain := 1; remain <= n; remain++ {
        dp[n][remain] = math.MaxInt32
    }

    for i := n - 1; i >= 0; i-- {
        for remain := 1; remain <= n; remain++ {
            paint := dp[i+1][max(remain-1-time[i], 0)]
            if paint != math.MaxInt32 {
                paint += cost[i]
            }

            skip := dp[i+1][remain]
            dp[i][remain] = min(paint, skip)
        }
    }

    return dp[0][n]
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
    fun paintWalls(cost: IntArray, time: IntArray): Int {
        val n = cost.size
        val dp = Array(n + 1) { IntArray(n + 2) }
        for (remain in 1..n) {
            dp[n][remain] = Int.MAX_VALUE
        }

        for (i in n - 1 downTo 0) {
            for (remain in 1..n) {
                var paint = dp[i + 1][maxOf(remain - 1 - time[i], 0)]
                if (paint != Int.MAX_VALUE) paint += cost[i]

                val skip = dp[i + 1][remain]
                dp[i][remain] = minOf(paint, skip)
            }
        }

        return dp[0][n]
    }
}
```

```swift
class Solution {
    func paintWalls(_ cost: [Int], _ time: [Int]) -> Int {
        let n = cost.count
        var dp = [[Int]](repeating: [Int](repeating: 0, count: n + 2), count: n + 1)

        for remain in 1...n {
            dp[n][remain] = Int.max
        }

        for i in stride(from: n - 1, through: 0, by: -1) {
            for remain in 1...n {
                var paint = dp[i + 1][max(remain - 1 - time[i], 0)]
                if paint != Int.max {
                    paint += cost[i]
                }

                let skip = dp[i + 1][remain]
                dp[i][remain] = min(paint, skip)
            }
        }

        return dp[0][n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Dynamic Programming (Space Optimized)

::tabs-start

```python
class Solution:
    def paintWalls(self, cost: List[int], time: List[int]) -> int:
        n = len(cost)
        dp = [float("inf")] * (n + 2)
        dp[0] = 0

        for i in range(n):
            for remain in range(n, 0, -1):
                paint = cost[i] + dp[max(remain - 1 - time[i], 0)]
                dp[remain] = min(paint, dp[remain])

        return dp[n]
```

```java
public class Solution {
    public int paintWalls(int[] cost, int[] time) {
        int n = cost.length;
        int[] dp = new int[n + 2];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;

        for (int i = 0; i < n; i++) {
            for (int remain = n; remain > 0; remain--) {
                int paint = dp[Math.max(remain - 1 - time[i], 0)];
                if (paint != Integer.MAX_VALUE) paint += cost[i];
                dp[remain] = Math.min(paint, dp[remain]);
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int paintWalls(vector<int>& cost, vector<int>& time) {
        int n = cost.size();
        vector<int> dp(n + 2, INT_MAX);
        dp[0] = 0;

        for (int i = 0; i < n; i++) {
            for (int remain = n; remain > 0; remain--) {
                int paint = dp[max(remain - 1 - time[i], 0)];
                if (paint != INT_MAX) paint += cost[i];
                dp[remain] = min(paint, dp[remain]);
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} cost
     * @param {number[]} time
     * @return {number}
     */
    paintWalls(cost, time) {
        const n = cost.length;
        const dp = Array(n + 2).fill(Infinity);
        dp[0] = 0;

        for (let i = 0; i < n; i++) {
            for (let remain = n; remain > 0; remain--) {
                const paint = cost[i] + dp[Math.max(remain - 1 - time[i], 0)];
                dp[remain] = Math.min(paint, dp[remain]);
            }
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int PaintWalls(int[] cost, int[] time) {
        int n = cost.Length;
        int[] dp = new int[n + 2];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;

        for (int i = 0; i < n; i++) {
            for (int remain = n; remain > 0; remain--) {
                int paint = dp[Math.Max(remain - 1 - time[i], 0)];
                if (paint != int.MaxValue) paint += cost[i];
                dp[remain] = Math.Min(paint, dp[remain]);
            }
        }

        return dp[n];
    }
}
```

```go
func paintWalls(cost []int, time []int) int {
    n := len(cost)
    dp := make([]int, n+2)
    for i := range dp {
        dp[i] = math.MaxInt32
    }
    dp[0] = 0

    for i := 0; i < n; i++ {
        for remain := n; remain > 0; remain-- {
            paint := dp[max(remain-1-time[i], 0)]
            if paint != math.MaxInt32 {
                paint += cost[i]
            }
            dp[remain] = min(paint, dp[remain])
        }
    }

    return dp[n]
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
    fun paintWalls(cost: IntArray, time: IntArray): Int {
        val n = cost.size
        val dp = IntArray(n + 2) { Int.MAX_VALUE }
        dp[0] = 0

        for (i in 0 until n) {
            for (remain in n downTo 1) {
                var paint = dp[maxOf(remain - 1 - time[i], 0)]
                if (paint != Int.MAX_VALUE) paint += cost[i]
                dp[remain] = minOf(paint, dp[remain])
            }
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func paintWalls(_ cost: [Int], _ time: [Int]) -> Int {
        let n = cost.count
        var dp = [Int](repeating: Int.max, count: n + 2)
        dp[0] = 0

        for i in 0..<n {
            for remain in stride(from: n, through: 1, by: -1) {
                var paint = dp[max(remain - 1 - time[i], 0)]
                if paint != Int.max {
                    paint += cost[i]
                }
                dp[remain] = min(paint, dp[remain])
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
