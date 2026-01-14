## 1. Recursion

### Intuition

Each glass receives champagne from the two glasses directly above it (its "parents"). When a glass overflows, half of the excess spills to each child below. We can recursively compute how much champagne flows into any glass by summing the overflow from its two parent glasses. The base case is the top glass, which receives all the poured champagne.

### Algorithm

1. Define a recursive function that returns the total champagne flowing into glass (`row`, `glass`).
2. Base case: if we are out of bounds, return `0`. If at position (0, 0), return the total poured amount.
3. For any other glass, compute the overflow from the left parent (`row`-1, `glass`-1) and right parent (`row`-1, `glass`).
4. Each parent contributes half of its excess (amount - 1) if positive.
5. The final answer is the minimum of 1 and the computed flow for the queried glass.

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        def rec(row, glass):
            if row < 0 or glass < 0 or glass > row:
                return 0

            if row == 0 and glass == 0:
                return poured

            left_parent = max(0, rec(row - 1, glass - 1) - 1)
            right_parent = max(0, rec(row - 1, glass) - 1)

            return (left_parent + right_parent) / 2

        return min(1, rec(query_row, query_glass))
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        return Math.min(1, rec(poured, query_row, query_glass));
    }

    private double rec(int poured, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (row == 0 && glass == 0) {
            return poured;
        }

        double leftParent = Math.max(0, rec(poured, row - 1, glass - 1) - 1);
        double rightParent = Math.max(0, rec(poured, row - 1, glass) - 1);

        return (leftParent + rightParent) / 2;
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        return min(1.0, rec(poured, query_row, query_glass));
    }

private:
    double rec(int poured, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (row == 0 && glass == 0) {
            return poured;
        }

        double leftParent = max(0.0, rec(poured, row - 1, glass - 1) - 1);
        double rightParent = max(0.0, rec(poured, row - 1, glass) - 1);

        return (leftParent + rightParent) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        const rec = (row, glass) => {
            if (row < 0 || glass < 0 || glass > row) {
                return 0;
            }

            if (row === 0 && glass === 0) {
                return poured;
            }

            const leftParent = Math.max(0, rec(row - 1, glass - 1) - 1);
            const rightParent = Math.max(0, rec(row - 1, glass) - 1);

            return (leftParent + rightParent) / 2;
        };

        return Math.min(1, rec(query_row, query_glass));
    }
}
```

```csharp
public class Solution {
    public double ChampagneTower(int poured, int query_row, int query_glass) {
        return Math.Min(1, Rec(poured, query_row, query_glass));
    }

    private double Rec(int poured, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (row == 0 && glass == 0) {
            return poured;
        }

        double leftParent = Math.Max(0, Rec(poured, row - 1, glass - 1) - 1);
        double rightParent = Math.Max(0, Rec(poured, row - 1, glass) - 1);

        return (leftParent + rightParent) / 2;
    }
}
```

```go
func champagneTower(poured int, query_row int, query_glass int) float64 {
    var rec func(row, glass int) float64
    rec = func(row, glass int) float64 {
        if row < 0 || glass < 0 || glass > row {
            return 0
        }

        if row == 0 && glass == 0 {
            return float64(poured)
        }

        leftParent := math.Max(0, rec(row-1, glass-1)-1)
        rightParent := math.Max(0, rec(row-1, glass)-1)

        return (leftParent + rightParent) / 2
    }

    return math.Min(1, rec(query_row, query_glass))
}
```

```kotlin
class Solution {
    fun champagneTower(poured: Int, query_row: Int, query_glass: Int): Double {
        fun rec(row: Int, glass: Int): Double {
            if (row < 0 || glass < 0 || glass > row) {
                return 0.0
            }

            if (row == 0 && glass == 0) {
                return poured.toDouble()
            }

            val leftParent = maxOf(0.0, rec(row - 1, glass - 1) - 1)
            val rightParent = maxOf(0.0, rec(row - 1, glass) - 1)

            return (leftParent + rightParent) / 2
        }

        return minOf(1.0, rec(query_row, query_glass))
    }
}
```

```swift
class Solution {
    func champagneTower(_ poured: Int, _ query_row: Int, _ query_glass: Int) -> Double {
        func rec(_ row: Int, _ glass: Int) -> Double {
            if row < 0 || glass < 0 || glass > row {
                return 0
            }

            if row == 0 && glass == 0 {
                return Double(poured)
            }

            let leftParent = max(0, rec(row - 1, glass - 1) - 1)
            let rightParent = max(0, rec(row - 1, glass) - 1)

            return (leftParent + rightParent) / 2
        }

        return min(1, rec(query_row, query_glass))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the given $queryRow$.

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The recursive solution recalculates the same glasses many times. By storing computed values in a memoization table, we avoid redundant work. Each glass only needs to be computed once since its inflow depends only on the glasses above it.

### Algorithm

1. Create a memo table to store the champagne flow for each (`row`, `glass`) position.
2. Initialize `memo[0][0]` with the poured amount.
3. Use the same recursive logic as before, but check the memo before computing.
4. Store computed results in the memo table before returning.
5. Return min(1, `memo[query_row][query_glass]`).

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        memo = { (0, 0) : poured }

        def rec(row, glass):
            if row < 0 or glass < 0 or glass > row:
                return 0
            if (row, glass) in memo:
                return memo[(row, glass)]

            left_parent = max(0, rec(row - 1, glass - 1) - 1)
            right_parent = max(0, rec(row - 1, glass) - 1)

            memo[(row, glass)] = (left_parent + right_parent) / 2
            return memo[(row, glass)]

        return min(1, rec(query_row, query_glass))
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[][] memo = new double[query_row + 5][];
        for (int i = 0; i < query_row + 5; i++) {
            memo[i] = new double[i + 1];
            Arrays.fill(memo[i], -1);
        }
        memo[0][0] = poured;

        return Math.min(1, rec(memo, query_row, query_glass));
    }

    private double rec(double[][] memo, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (memo[row][glass] != -1) {
            return memo[row][glass];
        }

        double leftParent = Math.max(0, rec(memo, row - 1, glass - 1) - 1);
        double rightParent = Math.max(0, rec(memo, row - 1, glass) - 1);

        memo[row][glass] = (leftParent + rightParent) / 2;
        return memo[row][glass];
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> memo(query_row + 5);
        for (int i = 0; i <= query_row + 4; i++) {
            memo[i].resize(i + 1, -1);
        }

        memo[0][0] = poured;
        return min(1.0, rec(memo, query_row, query_glass));
    }

private:
    double rec(vector<vector<double>>& memo, int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (memo[row][glass] != -1) {
            return memo[row][glass];
        }

        double leftParent = max(0.0, rec(memo, row - 1, glass - 1) - 1);
        double rightParent = max(0.0, rec(memo, row - 1, glass) - 1);

        memo[row][glass] = (leftParent + rightParent) / 2;
        return memo[row][glass];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        const memo = Array.from({ length: query_row + 5 }, (_, i) =>
            Array(i + 1).fill(-1),
        );
        memo[0][0] = poured;

        const rec = (row, glass) => {
            if (row < 0 || glass < 0 || glass > row) {
                return 0;
            }

            if (memo[row][glass] != -1) {
                return memo[row][glass];
            }

            const leftParent = Math.max(0, rec(row - 1, glass - 1) - 1);
            const rightParent = Math.max(0, rec(row - 1, glass) - 1);

            memo[row][glass] = (leftParent + rightParent) / 2;
            return memo[row][glass];
        };

        return Math.min(1, rec(query_row, query_glass));
    }
}
```

```csharp
public class Solution {
    private double[][] memo;

    public double ChampagneTower(int poured, int query_row, int query_glass) {
        memo = new double[query_row + 5][];
        for (int i = 0; i < query_row + 5; i++) {
            memo[i] = new double[i + 1];
            Array.Fill(memo[i], -1);
        }
        memo[0][0] = poured;

        return Math.Min(1, Rec(query_row, query_glass));
    }

    private double Rec(int row, int glass) {
        if (row < 0 || glass < 0 || glass > row) {
            return 0;
        }

        if (memo[row][glass] != -1) {
            return memo[row][glass];
        }

        double leftParent = Math.Max(0, Rec(row - 1, glass - 1) - 1);
        double rightParent = Math.Max(0, Rec(row - 1, glass) - 1);

        memo[row][glass] = (leftParent + rightParent) / 2;
        return memo[row][glass];
    }
}
```

```go
func champagneTower(poured int, query_row int, query_glass int) float64 {
    memo := make([][]float64, query_row+5)
    for i := 0; i <= query_row+4; i++ {
        memo[i] = make([]float64, i+1)
        for j := range memo[i] {
            memo[i][j] = -1
        }
    }
    memo[0][0] = float64(poured)

    var rec func(row, glass int) float64
    rec = func(row, glass int) float64 {
        if row < 0 || glass < 0 || glass > row {
            return 0
        }

        if memo[row][glass] != -1 {
            return memo[row][glass]
        }

        leftParent := math.Max(0, rec(row-1, glass-1)-1)
        rightParent := math.Max(0, rec(row-1, glass)-1)

        memo[row][glass] = (leftParent + rightParent) / 2
        return memo[row][glass]
    }

    return math.Min(1, rec(query_row, query_glass))
}
```

```kotlin
class Solution {
    fun champagneTower(poured: Int, query_row: Int, query_glass: Int): Double {
        val memo = Array(query_row + 5) { i -> DoubleArray(i + 1) { -1.0 } }
        memo[0][0] = poured.toDouble()

        fun rec(row: Int, glass: Int): Double {
            if (row < 0 || glass < 0 || glass > row) {
                return 0.0
            }

            if (memo[row][glass] != -1.0) {
                return memo[row][glass]
            }

            val leftParent = maxOf(0.0, rec(row - 1, glass - 1) - 1)
            val rightParent = maxOf(0.0, rec(row - 1, glass) - 1)

            memo[row][glass] = (leftParent + rightParent) / 2
            return memo[row][glass]
        }

        return minOf(1.0, rec(query_row, query_glass))
    }
}
```

```swift
class Solution {
    func champagneTower(_ poured: Int, _ query_row: Int, _ query_glass: Int) -> Double {
        var memo = [[Double]]()
        for i in 0..<(query_row + 5) {
            memo.append([Double](repeating: -1, count: i + 1))
        }
        memo[0][0] = Double(poured)

        func rec(_ row: Int, _ glass: Int) -> Double {
            if row < 0 || glass < 0 || glass > row {
                return 0
            }

            if memo[row][glass] != -1 {
                return memo[row][glass]
            }

            let leftParent = max(0, rec(row - 1, glass - 1) - 1)
            let rightParent = max(0, rec(row - 1, glass) - 1)

            memo[row][glass] = (leftParent + rightParent) / 2
            return memo[row][glass]
        }

        return min(1, rec(query_row, query_glass))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of working backwards from the query position, we can simulate the pouring process from top to bottom. We track how much champagne flows into each glass. When a glass overflows (has more than 1 unit), we distribute the excess equally to the two glasses below it.

### Algorithm

1. Create a 2D array where `dp[row][glass]` represents the total flow into that glass.
2. Set `dp[0][0]` = poured.
3. For each row from 0 to `query_row` - 1:
   - For each glass in that row, if the flow exceeds 1, compute the excess.
   - Add half the excess to each of the two glasses below.
4. Return min(1, `dp[query_row][query_glass]`).

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        dp = [[0] * (i + 1) for i in range(query_row + 5)]
        dp[0][0] += poured

        for row in range(min(99, query_row + 1)):
            for glass in range(row + 1):
                excess = (dp[row][glass] - 1.0) / 2.0
                if excess > 0:
                    dp[row + 1][glass] += excess
                    dp[row + 1][glass + 1] += excess

        return min(1.0, dp[query_row][query_glass])
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[][] dp = new double[query_row + 5][];
        for (int i = 0; i < query_row + 5; i++) {
            dp[i] = new double[i + 1];
        }

        dp[0][0] += poured;

        for (int row = 0; row < Math.min(99, query_row + 1); row++) {
            for (int glass = 0; glass <= row; glass++) {
                double excess = (dp[row][glass] - 1.0) / 2.0;
                if (excess > 0) {
                    dp[row + 1][glass] += excess;
                    dp[row + 1][glass + 1] += excess;
                }
            }
        }

        return Math.min(1.0, dp[query_row][query_glass]);
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<vector<double>> dp(query_row + 5);
        for (int i = 0; i <= query_row + 4; i++) {
            dp[i].resize(i + 1, 0);
        }

        dp[0][0] += poured;

        for (int row = 0; row < min(99, query_row + 1); row++) {
            for (int glass = 0; glass <= row; glass++) {
                double excess = (dp[row][glass] - 1.0) / 2.0;
                if (excess > 0) {
                    dp[row + 1][glass] += excess;
                    dp[row + 1][glass + 1] += excess;
                }
            }
        }

        return min(1.0, dp[query_row][query_glass]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        const dp = Array.from({ length: query_row + 5 }, (_, i) =>
            Array(i + 1).fill(0),
        );
        dp[0][0] += poured;

        for (let row = 0; row < Math.min(99, query_row + 1); row++) {
            for (let glass = 0; glass <= row; glass++) {
                const excess = (dp[row][glass] - 1.0) / 2.0;
                if (excess > 0) {
                    dp[row + 1][glass] += excess;
                    dp[row + 1][glass + 1] += excess;
                }
            }
        }

        return Math.min(1.0, dp[query_row][query_glass]);
    }
}
```

```csharp
public class Solution {
    public double ChampagneTower(int poured, int query_row, int query_glass) {
        double[][] dp = new double[query_row + 5][];
        for (int i = 0; i < query_row + 5; i++) {
            dp[i] = new double[i + 1];
        }

        dp[0][0] = poured;

        for (int row = 0; row < Math.Min(99, query_row + 1); row++) {
            for (int glass = 0; glass <= row; glass++) {
                double excess = (dp[row][glass] - 1.0) / 2.0;
                if (excess > 0) {
                    dp[row + 1][glass] += excess;
                    dp[row + 1][glass + 1] += excess;
                }
            }
        }

        return Math.Min(1.0, dp[query_row][query_glass]);
    }
}
```

```go
func champagneTower(poured int, query_row int, query_glass int) float64 {
    dp := make([][]float64, query_row+5)
    for i := 0; i <= query_row+4; i++ {
        dp[i] = make([]float64, i+1)
    }

    dp[0][0] = float64(poured)

    limit := 99
    if query_row+1 < limit {
        limit = query_row + 1
    }
    for row := 0; row < limit; row++ {
        for glass := 0; glass <= row; glass++ {
            excess := (dp[row][glass] - 1.0) / 2.0
            if excess > 0 {
                dp[row+1][glass] += excess
                dp[row+1][glass+1] += excess
            }
        }
    }

    if dp[query_row][query_glass] < 1.0 {
        return dp[query_row][query_glass]
    }
    return 1.0
}
```

```kotlin
class Solution {
    fun champagneTower(poured: Int, query_row: Int, query_glass: Int): Double {
        val dp = Array(query_row + 5) { i -> DoubleArray(i + 1) }
        dp[0][0] = poured.toDouble()

        for (row in 0 until minOf(99, query_row + 1)) {
            for (glass in 0..row) {
                val excess = (dp[row][glass] - 1.0) / 2.0
                if (excess > 0) {
                    dp[row + 1][glass] += excess
                    dp[row + 1][glass + 1] += excess
                }
            }
        }

        return minOf(1.0, dp[query_row][query_glass])
    }
}
```

```swift
class Solution {
    func champagneTower(_ poured: Int, _ query_row: Int, _ query_glass: Int) -> Double {
        var dp = [[Double]]()
        for i in 0..<(query_row + 5) {
            dp.append([Double](repeating: 0, count: i + 1))
        }

        dp[0][0] = Double(poured)

        for row in 0..<min(99, query_row + 1) {
            for glass in 0...row {
                let excess = (dp[row][glass] - 1.0) / 2.0
                if excess > 0 {
                    dp[row + 1][glass] += excess
                    dp[row + 1][glass + 1] += excess
                }
            }
        }

        return min(1.0, dp[query_row][query_glass])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.

---

## 4. Dynamic Programming (Space Optimized)

### Intuition

Since each row only depends on the row directly above it, we do not need to store the entire 2D table. We can use two 1D arrays: one for the previous row and one for the current row being computed. After processing each row, the current row becomes the previous row for the next iteration.

### Algorithm

1. Initialize `prev_row` with the poured amount at index 0.
2. For each row from 1 to `query_row`:
   - Create a new `cur_row` array of appropriate size.
   - For each glass in the previous row, if it overflows, distribute half the excess to `cur_row[i]` and `cur_row[i+1]`.
   - Set `prev_row` = `cur_row` for the next iteration.
3. Return min(1, `prev_row[query_glass]`).

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        prev_row = [poured]  # Flow

        for row in range(1, query_row + 1):
            cur_row = [0] * (row + 1)
            for i in range(row):
                extra = prev_row[i] - 1
                if extra > 0:
                    cur_row[i] += 0.5 * extra
                    cur_row[i + 1] += 0.5 * extra
            prev_row = cur_row

        return min(1, prev_row[query_glass])
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[] prev_row = new double[] { poured };  // Flow

        for (int row = 1; row <= query_row; row++) {
            double[] cur_row = new double[row + 1];
            for (int i = 0; i < row; i++) {
                double extra = prev_row[i] - 1;
                if (extra > 0) {
                    cur_row[i] += 0.5 * extra;
                    cur_row[i + 1] += 0.5 * extra;
                }
            }
            prev_row = cur_row;
        }

        return Math.min(1.0, prev_row[query_glass]);
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<double> prev_row = {double(poured)};  // Flow

        for (int row = 1; row <= query_row; row++) {
            vector<double> cur_row(row + 1, 0);
            for (int i = 0; i < row; i++) {
                double extra = prev_row[i] - 1;
                if (extra > 0) {
                    cur_row[i] += 0.5 * extra;
                    cur_row[i + 1] += 0.5 * extra;
                }
            }
            prev_row = cur_row;
        }

        return min(1.0, prev_row[query_glass]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        let prev_row = [poured]; // Flow

        for (let row = 1; row <= query_row; row++) {
            let cur_row = new Array(row + 1).fill(0);
            for (let i = 0; i < row; i++) {
                let extra = prev_row[i] - 1;
                if (extra > 0) {
                    cur_row[i] += 0.5 * extra;
                    cur_row[i + 1] += 0.5 * extra;
                }
            }
            prev_row = cur_row;
        }

        return Math.min(1, prev_row[query_glass]);
    }
}
```

```csharp
public class Solution {
    public double ChampagneTower(int poured, int query_row, int query_glass) {
        double[] prev_row = new double[] { poured };

        for (int row = 1; row <= query_row; row++) {
            double[] cur_row = new double[row + 1];
            for (int i = 0; i < row; i++) {
                double extra = prev_row[i] - 1;
                if (extra > 0) {
                    cur_row[i] += 0.5 * extra;
                    cur_row[i + 1] += 0.5 * extra;
                }
            }
            prev_row = cur_row;
        }

        return Math.Min(1.0, prev_row[query_glass]);
    }
}
```

```go
func champagneTower(poured int, query_row int, query_glass int) float64 {
    prevRow := []float64{float64(poured)}

    for row := 1; row <= query_row; row++ {
        curRow := make([]float64, row+1)
        for i := 0; i < row; i++ {
            extra := prevRow[i] - 1
            if extra > 0 {
                curRow[i] += 0.5 * extra
                curRow[i+1] += 0.5 * extra
            }
        }
        prevRow = curRow
    }

    if prevRow[query_glass] < 1.0 {
        return prevRow[query_glass]
    }
    return 1.0
}
```

```kotlin
class Solution {
    fun champagneTower(poured: Int, query_row: Int, query_glass: Int): Double {
        var prevRow = doubleArrayOf(poured.toDouble())

        for (row in 1..query_row) {
            val curRow = DoubleArray(row + 1)
            for (i in 0 until row) {
                val extra = prevRow[i] - 1
                if (extra > 0) {
                    curRow[i] += 0.5 * extra
                    curRow[i + 1] += 0.5 * extra
                }
            }
            prevRow = curRow
        }

        return minOf(1.0, prevRow[query_glass])
    }
}
```

```swift
class Solution {
    func champagneTower(_ poured: Int, _ query_row: Int, _ query_glass: Int) -> Double {
        var prevRow = [Double(poured)]

        for row in 1...query_row {
            var curRow = [Double](repeating: 0, count: row + 1)
            for i in 0..<row {
                let extra = prevRow[i] - 1
                if extra > 0 {
                    curRow[i] += 0.5 * extra
                    curRow[i + 1] += 0.5 * extra
                }
            }
            prevRow = curRow
        }

        return min(1, prevRow[query_glass])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.

---

## 5. Dynamic Programming (Optimal)

### Intuition

We can further optimize by using a single 1D array, processing from right to left within each row. This ensures we do not overwrite values we still need. Each position updates itself with half its excess, while contributing the other half to the next position.

### Algorithm

1. Create a single array `dp` of size (`query_row` + 1), initialized with poured at index 0.
2. For each row from 1 to `query_row`:
   - Iterate from right to left (from index `row`-1 down to 0).
   - If `dp[i]` > 1, set `dp[i]` = 0.5 * (`dp[i]` - 1) and add the same to `dp[i+1]`.
   - If `dp[i]` <= 1, set `dp[i]` = 0 (it does not overflow).
3. Return min(1, `dp[query_glass]`).

::tabs-start

```python
class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        dp = [poured] + [0] * query_row

        for row in range(1, query_row + 1):
            for i in range(row - 1, -1, -1):
                extra = dp[i] - 1
                if extra > 0:
                    dp[i] = 0.5 * extra
                    dp[i + 1] += 0.5 * extra
                else:
                    dp[i] = 0

        return min(1, dp[query_glass])
```

```java
public class Solution {
    public double champagneTower(int poured, int query_row, int query_glass) {
        double[] dp = new double[query_row + 1];
        dp[0] = poured;

        for (int row = 1; row <= query_row; row++) {
            for (int i = row - 1; i >= 0; i--) {
                double extra = dp[i] - 1;
                if (extra > 0) {
                    dp[i] = 0.5 * extra;
                    dp[i + 1] += 0.5 * extra;
                } else {
                    dp[i] = 0;
                }
            }
        }

        return Math.min(1, dp[query_glass]);
    }
}
```

```cpp
class Solution {
public:
    double champagneTower(int poured, int query_row, int query_glass) {
        vector<double> dp(query_row + 1, 0);
        dp[0] = poured;

        for (int row = 1; row <= query_row; row++) {
            for (int i = row - 1; i >= 0; i--) {
                double extra = dp[i] - 1;
                if (extra > 0) {
                    dp[i] = 0.5 * extra;
                    dp[i + 1] += 0.5 * extra;
                } else {
                    dp[i] = 0;
                }
            }
        }

        return min(1.0, dp[query_glass]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} poured
     * @param {number} query_row
     * @param {number} query_glass
     * @return {number}
     */
    champagneTower(poured, query_row, query_glass) {
        let dp = new Array(query_row + 1).fill(0);
        dp[0] = poured;

        for (let row = 1; row <= query_row; row++) {
            for (let i = row - 1; i >= 0; i--) {
                let extra = dp[i] - 1;
                if (extra > 0) {
                    dp[i] = 0.5 * extra;
                    dp[i + 1] += 0.5 * extra;
                } else {
                    dp[i] = 0;
                }
            }
        }

        return Math.min(1, dp[query_glass]);
    }
}
```

```csharp
public class Solution {
    public double ChampagneTower(int poured, int query_row, int query_glass) {
        double[] dp = new double[query_row + 1];
        dp[0] = poured;

        for (int row = 1; row <= query_row; row++) {
            for (int i = row - 1; i >= 0; i--) {
                double extra = dp[i] - 1;
                if (extra > 0) {
                    dp[i] = 0.5 * extra;
                    dp[i + 1] += 0.5 * extra;
                } else {
                    dp[i] = 0;
                }
            }
        }

        return Math.Min(1, dp[query_glass]);
    }
}
```

```go
func champagneTower(poured int, query_row int, query_glass int) float64 {
    dp := make([]float64, query_row+1)
    dp[0] = float64(poured)

    for row := 1; row <= query_row; row++ {
        for i := row - 1; i >= 0; i-- {
            extra := dp[i] - 1
            if extra > 0 {
                dp[i] = 0.5 * extra
                dp[i+1] += 0.5 * extra
            } else {
                dp[i] = 0
            }
        }
    }

    if dp[query_glass] < 1.0 {
        return dp[query_glass]
    }
    return 1.0
}
```

```kotlin
class Solution {
    fun champagneTower(poured: Int, query_row: Int, query_glass: Int): Double {
        val dp = DoubleArray(query_row + 1)
        dp[0] = poured.toDouble()

        for (row in 1..query_row) {
            for (i in row - 1 downTo 0) {
                val extra = dp[i] - 1
                if (extra > 0) {
                    dp[i] = 0.5 * extra
                    dp[i + 1] += 0.5 * extra
                } else {
                    dp[i] = 0.0
                }
            }
        }

        return minOf(1.0, dp[query_glass])
    }
}
```

```swift
class Solution {
    func champagneTower(_ poured: Int, _ query_row: Int, _ query_glass: Int) -> Double {
        var dp = [Double](repeating: 0, count: query_row + 1)
        dp[0] = Double(poured)

        for row in 1...query_row {
            for i in stride(from: row - 1, through: 0, by: -1) {
                let extra = dp[i] - 1
                if extra > 0 {
                    dp[i] = 0.5 * extra
                    dp[i + 1] += 0.5 * extra
                } else {
                    dp[i] = 0
                }
            }
        }

        return min(1, dp[query_glass])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$

> Where $n$ is the given $queryRow$ and $m$ is the given $queryGlass$.

---

## Common Pitfalls

### Forgetting to Clamp the Final Result to 1
A glass can receive more champagne than it can hold, but the answer should only report how full it is (max 1.0). Returning the raw flow value without capping it at 1 gives incorrect results for glasses that overflow.
```python
# Wrong: returns overflow amount
return dp[query_row][query_glass]
# Correct: cap at 1.0 (glass can't be more than full)
return min(1, dp[query_row][query_glass])
```

### Distributing Total Flow Instead of Excess
Each glass holds 1 unit before overflowing. A common mistake is distributing the total champagne received to children instead of only the excess (amount - 1). This incorrectly empties glasses that should remain full.
```python
# Wrong: distributes everything
dp[row + 1][glass] += dp[row][glass] / 2
# Correct: only distribute the excess
excess = dp[row][glass] - 1
if excess > 0:
    dp[row + 1][glass] += excess / 2
```

### Incorrect Parent Glass Indices
When computing flow from parent glasses, using wrong indices for left and right parents causes incorrect champagne distribution. The left parent is at (row-1, glass-1) and right parent is at (row-1, glass).
```python
# Wrong: both parents at same index
left_parent = rec(row - 1, glass)
right_parent = rec(row - 1, glass)
# Correct: different parent positions
left_parent = rec(row - 1, glass - 1)
right_parent = rec(row - 1, glass)
```
