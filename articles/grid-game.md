## 1. Brute Force

### Intuition

Robot 1 must go right along row `0`, drop down to row `1` at some column, then continue right. After Robot 1 collects its points (setting those cells to `0`), Robot 2 follows optimally. Robot 1 wants to minimize Robot 2's maximum possible score. We try every possible column where Robot 1 drops down and simulate Robot 2's best response.

### Algorithm

1. For each column `i` where Robot 1 drops down:
   - Calculate the points Robot 1 collects along the top row until column `i`, then the bottom row from column `i` onward.
   - Simulate Robot 2's optimal path through the remaining grid (top row after `i`, bottom row before `i`).
   - Track Robot 2's maximum score for this configuration.
2. Return the minimum of Robot 2's maximum scores across all choices of `i`.

::tabs-start

```python
class Solution:
    def gridGame(self, grid: List[List[int]]) -> int:
        cols = len(grid[0])
        res = float('inf')

        top1 = 0
        for i in range(cols):
            top1 += grid[0][i]
            bottom1 = 0
            for j in range(i, cols):
                bottom1 += grid[1][j]

            top2 = robot2 = 0
            for j in range(cols):
                if j > i:
                    top2 += grid[0][j]

                bottom2 = 0
                for k in range(j, i):
                    bottom2 += grid[1][k]
                robot2 = max(robot2, top2 + bottom2)

            res = min(res, robot2)

        return res
```

```java
public class Solution {
    public long gridGame(int[][] grid) {
        int cols = grid[0].length;
        long res = Long.MAX_VALUE;

        long top1 = 0;
        for (int i = 0; i < cols; i++) {
            top1 += grid[0][i];
            long bottom1 = 0;
            for (int j = i; j < cols; j++) {
                bottom1 += grid[1][j];
            }

            long top2 = 0, robot2 = 0;
            for (int j = 0; j < cols; j++) {
                if (j > i) {
                    top2 += grid[0][j];
                }

                long bottom2 = 0;
                for (int k = j; k < i; k++) {
                    bottom2 += grid[1][k];
                }
                robot2 = Math.max(robot2, top2 + bottom2);
            }

            res = Math.min(res, robot2);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long gridGame(vector<vector<int>>& grid) {
        int cols = grid[0].size();
        long long res = LLONG_MAX;

        long long top1 = 0;
        for (int i = 0; i < cols; i++) {
            top1 += grid[0][i];
            long long bottom1 = 0;
            for (int j = i; j < cols; j++) {
                bottom1 += grid[1][j];
            }

            long long top2 = 0, robot2 = 0;
            for (int j = 0; j < cols; j++) {
                if (j > i) {
                    top2 += grid[0][j];
                }

                long long bottom2 = 0;
                for (int k = j; k < i; k++) {
                    bottom2 += grid[1][k];
                }
                robot2 = max(robot2, top2 + bottom2);
            }

            res = min(res, robot2);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    gridGame(grid) {
        let cols = grid[0].length;
        let res = Infinity;

        let top1 = 0;
        for (let i = 0; i < cols; i++) {
            top1 += grid[0][i];
            let bottom1 = 0;
            for (let j = i; j < cols; j++) {
                bottom1 += grid[1][j];
            }

            let top2 = 0,
                robot2 = 0;
            for (let j = 0; j < cols; j++) {
                if (j > i) {
                    top2 += grid[0][j];
                }

                let bottom2 = 0;
                for (let k = j; k < i; k++) {
                    bottom2 += grid[1][k];
                }
                robot2 = Math.max(robot2, top2 + bottom2);
            }

            res = Math.min(res, robot2);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long GridGame(int[][] grid) {
        int cols = grid[0].Length;
        long res = long.MaxValue;

        long top1 = 0;
        for (int i = 0; i < cols; i++) {
            top1 += grid[0][i];
            long bottom1 = 0;
            for (int j = i; j < cols; j++) {
                bottom1 += grid[1][j];
            }

            long top2 = 0, robot2 = 0;
            for (int j = 0; j < cols; j++) {
                if (j > i) {
                    top2 += grid[0][j];
                }

                long bottom2 = 0;
                for (int k = j; k < i; k++) {
                    bottom2 += grid[1][k];
                }
                robot2 = Math.Max(robot2, top2 + bottom2);
            }

            res = Math.Min(res, robot2);
        }

        return res;
    }
}
```

```go
func gridGame(grid [][]int) int64 {
    cols := len(grid[0])
    res := int64(math.MaxInt64)

    top1 := int64(0)
    for i := 0; i < cols; i++ {
        top1 += int64(grid[0][i])
        bottom1 := int64(0)
        for j := i; j < cols; j++ {
            bottom1 += int64(grid[1][j])
        }

        top2 := int64(0)
        robot2 := int64(0)
        for j := 0; j < cols; j++ {
            if j > i {
                top2 += int64(grid[0][j])
            }

            bottom2 := int64(0)
            for k := j; k < i; k++ {
                bottom2 += int64(grid[1][k])
            }
            if top2+bottom2 > robot2 {
                robot2 = top2 + bottom2
            }
        }

        if robot2 < res {
            res = robot2
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun gridGame(grid: Array<IntArray>): Long {
        val cols = grid[0].size
        var res = Long.MAX_VALUE

        var top1 = 0L
        for (i in 0 until cols) {
            top1 += grid[0][i]
            var bottom1 = 0L
            for (j in i until cols) {
                bottom1 += grid[1][j]
            }

            var top2 = 0L
            var robot2 = 0L
            for (j in 0 until cols) {
                if (j > i) {
                    top2 += grid[0][j]
                }

                var bottom2 = 0L
                for (k in j until i) {
                    bottom2 += grid[1][k]
                }
                robot2 = maxOf(robot2, top2 + bottom2)
            }

            res = minOf(res, robot2)
        }

        return res
    }
}
```

```swift
class Solution {
    func gridGame(_ grid: [[Int]]) -> Int {
        let cols = grid[0].count
        var res = Int.max

        var top1 = 0
        for i in 0..<cols {
            top1 += grid[0][i]
            var bottom1 = 0
            for j in i..<cols {
                bottom1 += grid[1][j]
            }

            var top2 = 0
            var robot2 = 0
            for j in 0..<cols {
                if j > i {
                    top2 += grid[0][j]
                }

                var bottom2 = 0
                for k in j..<i {
                    bottom2 += grid[1][k]
                }
                robot2 = max(robot2, top2 + bottom2)
            }

            res = min(res, robot2)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(1)$

---

## 2. Prefix Sum

### Intuition

After Robot 1 drops at column `i`, Robot 2 can only collect from two disjoint regions: the top row after column `i`, or the bottom row before column `i`. Robot 2 will choose whichever region has more points. Using prefix sums, we can compute these region totals in O(1) per column.

### Algorithm

1. Build prefix sums for both rows.
2. For each column `i` where Robot 1 drops:
   - `top = preRow1[N-1] - preRow1[i]` (sum of top row after column `i`).
   - `bottom = preRow2[i-1]` if `i > 0`, else `0` (sum of bottom row before column `i`).
   - Robot 2's score is `max(top, bottom)`.
3. Return the minimum of these scores across all `i`.

::tabs-start

```python
class Solution:
    def gridGame(self, grid: List[List[int]]) -> int:
        N = len(grid[0])
        preRow1, preRow2 = grid[0].copy(), grid[1].copy()

        for i in range(1, N):
            preRow1[i] += preRow1[i - 1]
            preRow2[i] += preRow2[i - 1]

        res = float("inf")
        for i in range(N):
            top = preRow1[-1] - preRow1[i]
            bottom = preRow2[i - 1] if i > 0 else 0
            secondRobot = max(top, bottom)
            res = min(res, secondRobot)
        return res
```

```java
class Solution {
    public long gridGame(int[][] grid) {
        int N = grid[0].length;
        long[] preRow1 = new long[N];
        long[] preRow2 = new long[N];
        for (int i = 0; i < N; i++) {
            preRow1[i] = (long)grid[0][i];
            preRow2[i] = (long)grid[1][i];
        }

        for (int i = 1; i < N; i++) {
            preRow1[i] += preRow1[i - 1];
            preRow2[i] += preRow2[i - 1];
        }

        long res = Long.MAX_VALUE;
        for (int i = 0; i < N; i++) {
            long top = preRow1[N - 1] - preRow1[i];
            long bottom = i > 0 ? preRow2[i - 1] : 0;
            long secondRobot = Math.max(top, bottom);
            res = Math.min(res, secondRobot);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long gridGame(vector<vector<int>>& grid) {
        int N = grid[0].size();
        vector<long long> preRow1, preRow2;
        for (int i = 0; i < N; i++) {
            preRow1.push_back((long)grid[0][i]);
            preRow2.push_back((long)grid[1][i]);
        }

        for (int i = 1; i < N; i++) {
            preRow1[i] += preRow1[i - 1];
            preRow2[i] += preRow2[i - 1];
        }

        long long res = LLONG_MAX;
        for (int i = 0; i < N; i++) {
            long long top = preRow1[N - 1] - preRow1[i];
            long long bottom = i > 0 ? preRow2[i - 1] : 0;
            long long secondRobot = max(top, bottom);
            res = min(res, secondRobot);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    gridGame(grid) {
        const N = grid[0].length;
        const preRow1 = [...grid[0]];
        const preRow2 = [...grid[1]];

        for (let i = 1; i < N; i++) {
            preRow1[i] += preRow1[i - 1];
            preRow2[i] += preRow2[i - 1];
        }

        let res = Infinity;
        for (let i = 0; i < N; i++) {
            const top = preRow1[N - 1] - preRow1[i];
            const bottom = i > 0 ? preRow2[i - 1] : 0;
            const secondRobot = Math.max(top, bottom);
            res = Math.min(res, secondRobot);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long GridGame(int[][] grid) {
        int N = grid[0].Length;
        long[] preRow1 = new long[N];
        long[] preRow2 = new long[N];
        for (int i = 0; i < N; i++) {
            preRow1[i] = grid[0][i];
            preRow2[i] = grid[1][i];
        }

        for (int i = 1; i < N; i++) {
            preRow1[i] += preRow1[i - 1];
            preRow2[i] += preRow2[i - 1];
        }

        long res = long.MaxValue;
        for (int i = 0; i < N; i++) {
            long top = preRow1[N - 1] - preRow1[i];
            long bottom = i > 0 ? preRow2[i - 1] : 0;
            long secondRobot = Math.Max(top, bottom);
            res = Math.Min(res, secondRobot);
        }
        return res;
    }
}
```

```go
func gridGame(grid [][]int) int64 {
    N := len(grid[0])
    preRow1 := make([]int64, N)
    preRow2 := make([]int64, N)
    for i := 0; i < N; i++ {
        preRow1[i] = int64(grid[0][i])
        preRow2[i] = int64(grid[1][i])
    }

    for i := 1; i < N; i++ {
        preRow1[i] += preRow1[i-1]
        preRow2[i] += preRow2[i-1]
    }

    res := int64(math.MaxInt64)
    for i := 0; i < N; i++ {
        top := preRow1[N-1] - preRow1[i]
        bottom := int64(0)
        if i > 0 {
            bottom = preRow2[i-1]
        }
        secondRobot := top
        if bottom > secondRobot {
            secondRobot = bottom
        }
        if secondRobot < res {
            res = secondRobot
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun gridGame(grid: Array<IntArray>): Long {
        val N = grid[0].size
        val preRow1 = LongArray(N) { grid[0][it].toLong() }
        val preRow2 = LongArray(N) { grid[1][it].toLong() }

        for (i in 1 until N) {
            preRow1[i] += preRow1[i - 1]
            preRow2[i] += preRow2[i - 1]
        }

        var res = Long.MAX_VALUE
        for (i in 0 until N) {
            val top = preRow1[N - 1] - preRow1[i]
            val bottom = if (i > 0) preRow2[i - 1] else 0L
            val secondRobot = maxOf(top, bottom)
            res = minOf(res, secondRobot)
        }
        return res
    }
}
```

```swift
class Solution {
    func gridGame(_ grid: [[Int]]) -> Int {
        let N = grid[0].count
        var preRow1 = grid[0]
        var preRow2 = grid[1]

        for i in 1..<N {
            preRow1[i] += preRow1[i - 1]
            preRow2[i] += preRow2[i - 1]
        }

        var res = Int.max
        for i in 0..<N {
            let top = preRow1[N - 1] - preRow1[i]
            let bottom = i > 0 ? preRow2[i - 1] : 0
            let secondRobot = max(top, bottom)
            res = min(res, secondRobot)
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

## 3. Prefix Sum (Space Optimized)

### Intuition

We can avoid storing prefix arrays by maintaining running sums. Start with `topSum` as the total of the top row and `bottomSum` as `0`. As we iterate, subtract from `topSum` (simulating Robot 1 taking cells from the top) and add to `bottomSum` (accumulating what Robot 2 could take from below).

### Algorithm

1. Initialize `topSum` as the sum of the entire top row, and `bottomSum` as `0`.
2. For each column `i`:
   - Subtract `grid[0][i]` from `topSum` (Robot 1 takes this cell).
   - Compute Robot 2's best score as `max(topSum, bottomSum)`.
   - Update the result with the minimum seen so far.
   - Add `grid[1][i]` to `bottomSum` (this cell is now unavailable to Robot 2).
3. Return the minimum result.

::tabs-start

```python
class Solution:
    def gridGame(self, grid: List[List[int]]) -> int:
        res = float("inf")
        topSum = sum(grid[0])
        bottomSum = 0

        for i in range(len(grid[0])):
            topSum -= grid[0][i]
            res = min(res, max(topSum, bottomSum))
            bottomSum += grid[1][i]

        return res
```

```java
public class Solution {
    public long gridGame(int[][] grid) {
        long res = Long.MAX_VALUE;
        long topSum = 0, bottomSum = 0;

        for (int i = 0; i < grid[0].length; i++) {
            topSum += grid[0][i];
        }

        for (int i = 0; i < grid[0].length; i++) {
            topSum -= grid[0][i];
            res = Math.min(res, Math.max(topSum, bottomSum));
            bottomSum += grid[1][i];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long gridGame(vector<vector<int>>& grid) {
        long long res = LLONG_MAX;
        long long topSum = accumulate(grid[0].begin(), grid[0].end(), 0LL);
        long long bottomSum = 0;

        for (int i = 0; i < grid[0].size(); i++) {
            topSum -= grid[0][i];
            res = min(res, max(topSum, bottomSum));
            bottomSum += grid[1][i];
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    gridGame(grid) {
        let res = Infinity;
        let topSum = grid[0].reduce((a, b) => a + b, 0);
        let bottomSum = 0;

        for (let i = 0; i < grid[0].length; i++) {
            topSum -= grid[0][i];
            res = Math.min(res, Math.max(topSum, bottomSum));
            bottomSum += grid[1][i];
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
