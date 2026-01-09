## 1. Greedy (Overwriting the Input)

::tabs-start

```python
class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])

        for r in range(ROWS):
            if grid[r][0] == 0:
                for c in range(COLS):
                    grid[r][c] ^= 1

        for c in range(COLS):
            one_cnt = sum(grid[r][c] for r in range(ROWS))
            if one_cnt < ROWS - one_cnt:
                for r in range(ROWS):
                    grid[r][c] ^= 1

        res = 0
        for r in range(ROWS):
            for c in range(COLS):
                res += grid[r][c] << (COLS - c - 1)

        return res
```

```java
public class Solution {
    public int matrixScore(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int matrixScore(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
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
    matrixScore(grid) {
        let ROWS = grid.length,
            COLS = grid[0].length;

        for (let r = 0; r < ROWS; r++) {
            if (grid[r][0] === 0) {
                for (let c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (let c = 0; c < COLS; c++) {
            let oneCnt = 0;
            for (let r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (let r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        let res = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MatrixScore(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;

        for (int r = 0; r < ROWS; r++) {
            if (grid[r][0] == 0) {
                for (int c = 0; c < COLS; c++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        for (int c = 0; c < COLS; c++) {
            int oneCnt = 0;
            for (int r = 0; r < ROWS; r++) {
                oneCnt += grid[r][c];
            }
            if (oneCnt < ROWS - oneCnt) {
                for (int r = 0; r < ROWS; r++) {
                    grid[r][c] ^= 1;
                }
            }
        }

        int res = 0;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                res += grid[r][c] << (COLS - c - 1);
            }
        }

        return res;
    }
}
```

```go
func matrixScore(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])

    for r := 0; r < ROWS; r++ {
        if grid[r][0] == 0 {
            for c := 0; c < COLS; c++ {
                grid[r][c] ^= 1
            }
        }
    }

    for c := 0; c < COLS; c++ {
        oneCnt := 0
        for r := 0; r < ROWS; r++ {
            oneCnt += grid[r][c]
        }
        if oneCnt < ROWS-oneCnt {
            for r := 0; r < ROWS; r++ {
                grid[r][c] ^= 1
            }
        }
    }

    res := 0
    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            res += grid[r][c] << (COLS - c - 1)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun matrixScore(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size

        for (r in 0 until ROWS) {
            if (grid[r][0] == 0) {
                for (c in 0 until COLS) {
                    grid[r][c] = grid[r][c] xor 1
                }
            }
        }

        for (c in 0 until COLS) {
            var oneCnt = 0
            for (r in 0 until ROWS) {
                oneCnt += grid[r][c]
            }
            if (oneCnt < ROWS - oneCnt) {
                for (r in 0 until ROWS) {
                    grid[r][c] = grid[r][c] xor 1
                }
            }
        }

        var res = 0
        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                res += grid[r][c] shl (COLS - c - 1)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func matrixScore(_ grid: [[Int]]) -> Int {
        var grid = grid
        let ROWS = grid.count
        let COLS = grid[0].count

        for r in 0..<ROWS {
            if grid[r][0] == 0 {
                for c in 0..<COLS {
                    grid[r][c] ^= 1
                }
            }
        }

        for c in 0..<COLS {
            var oneCnt = 0
            for r in 0..<ROWS {
                oneCnt += grid[r][c]
            }
            if oneCnt < ROWS - oneCnt {
                for r in 0..<ROWS {
                    grid[r][c] ^= 1
                }
            }
        }

        var res = 0
        for r in 0..<ROWS {
            for c in 0..<COLS {
                res += grid[r][c] << (COLS - c - 1)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Greedy (Optimal)

::tabs-start

```python
class Solution:
    def matrixScore(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        res = ROWS * (1 << (COLS - 1))

        for c in range(1, COLS):
            cnt = 0
            for r in range(ROWS):
                if grid[r][c] != grid[r][0]:
                    cnt += 1

            cnt = max(cnt, ROWS - cnt)
            res += cnt * (1 << (COLS - c - 1))

        return res
```

```java
public class Solution {
    public int matrixScore(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int matrixScore(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
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
    matrixScore(grid) {
        const ROWS = grid.length,
            COLS = grid[0].length;
        let res = ROWS * (1 << (COLS - 1));

        for (let c = 1; c < COLS; c++) {
            let cnt = 0;
            for (let r = 0; r < ROWS; r++) {
                if (grid[r][c] !== grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MatrixScore(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int res = ROWS * (1 << (COLS - 1));

        for (int c = 1; c < COLS; c++) {
            int cnt = 0;
            for (int r = 0; r < ROWS; r++) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++;
                }
            }
            cnt = Math.Max(cnt, ROWS - cnt);
            res += cnt * (1 << (COLS - c - 1));
        }
        return res;
    }
}
```

```go
func matrixScore(grid [][]int) int {
    ROWS, COLS := len(grid), len(grid[0])
    res := ROWS * (1 << (COLS - 1))

    for c := 1; c < COLS; c++ {
        cnt := 0
        for r := 0; r < ROWS; r++ {
            if grid[r][c] != grid[r][0] {
                cnt++
            }
        }
        if ROWS-cnt > cnt {
            cnt = ROWS - cnt
        }
        res += cnt * (1 << (COLS - c - 1))
    }
    return res
}
```

```kotlin
class Solution {
    fun matrixScore(grid: Array<IntArray>): Int {
        val ROWS = grid.size
        val COLS = grid[0].size
        var res = ROWS * (1 shl (COLS - 1))

        for (c in 1 until COLS) {
            var cnt = 0
            for (r in 0 until ROWS) {
                if (grid[r][c] != grid[r][0]) {
                    cnt++
                }
            }
            cnt = maxOf(cnt, ROWS - cnt)
            res += cnt * (1 shl (COLS - c - 1))
        }
        return res
    }
}
```

```swift
class Solution {
    func matrixScore(_ grid: [[Int]]) -> Int {
        let ROWS = grid.count
        let COLS = grid[0].count
        var res = ROWS * (1 << (COLS - 1))

        for c in 1..<COLS {
            var cnt = 0
            for r in 0..<ROWS {
                if grid[r][c] != grid[r][0] {
                    cnt += 1
                }
            }
            cnt = max(cnt, ROWS - cnt)
            res += cnt * (1 << (COLS - c - 1))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns.
