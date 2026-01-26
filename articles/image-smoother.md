## Prerequisites
Before attempting this problem, you should be comfortable with:
- **2D Array/Matrix Traversal** - Iterating through rows and columns of a matrix
- **Boundary Checking** - Handling edge cases when accessing neighbors near matrix boundaries
- **Sliding Window (2D)** - Processing fixed-size windows centered at each cell
- **Bit Manipulation (Optional)** - For space-optimized solutions that encode values in-place

---

## 1. Iteration (Using Extra Matrix)

### Intuition

For each cell, we need to compute the average of all valid neighbors (including itself) within a 3x3 window.
We check all 9 potential neighbors, skip those outside the matrix bounds, sum the valid values, and divide by the count.
Since we need the original values to compute neighbors, we store results in a separate matrix.

### Algorithm

1. Create a result matrix of the same dimensions.
2. For each cell `(r, c)`, iterate through the 3x3 window centered at that cell.
3. For each position `(i, j)` in the window, check if it is within bounds.
4. If valid, add the value to the total and increment the count.
5. Set the result cell to `total / count` (integer division).
6. Return the result matrix.

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])
        res = [[0] * COLS for _ in range(ROWS)]

        for r in range(ROWS):
            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(r - 1, r + 2):
                    for j in range(c - 1, c + 2):
                        if 0 <= i < ROWS and 0 <= j < COLS:
                            total += img[i][j]
                            cnt += 1
                res[r][c] = total // cnt

        return res
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;
        int[][] res = new int[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                            total += img[i][j];
                            count++;
                        }
                    }
                }
                res[r][c] = total / count;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();
        vector<vector<int>> res(ROWS, vector<int>(COLS, 0));

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                            total += img[i][j];
                            count++;
                        }
                    }
                }
                res[r][c] = total / count;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;
        const res = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    count = 0;
                for (let i = r - 1; i <= r + 1; i++) {
                    for (let j = c - 1; j <= c + 1; j++) {
                        if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                            total += img[i][j];
                            count++;
                        }
                    }
                }
                res[r][c] = Math.floor(total / count);
            }
        }

        return res;
    }
}
```

```go
func imageSmoother(img [][]int) [][]int {
    ROWS, COLS := len(img), len(img[0])
    res := make([][]int, ROWS)
    for i := range res {
        res[i] = make([]int, COLS)
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            total, count := 0, 0
            for i := r - 1; i <= r+1; i++ {
                for j := c - 1; j <= c+1; j++ {
                    if i >= 0 && i < ROWS && j >= 0 && j < COLS {
                        total += img[i][j]
                        count++
                    }
                }
            }
            res[r][c] = total / count
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun imageSmoother(img: Array<IntArray>): Array<IntArray> {
        val ROWS = img.size
        val COLS = img[0].size
        val res = Array(ROWS) { IntArray(COLS) }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                var total = 0
                var count = 0
                for (i in r - 1..r + 1) {
                    for (j in c - 1..c + 1) {
                        if (i in 0 until ROWS && j in 0 until COLS) {
                            total += img[i][j]
                            count++
                        }
                    }
                }
                res[r][c] = total / count
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func imageSmoother(_ img: [[Int]]) -> [[Int]] {
        let ROWS = img.count, COLS = img[0].count
        var res = [[Int]](repeating: [Int](repeating: 0, count: COLS), count: ROWS)

        for r in 0..<ROWS {
            for c in 0..<COLS {
                var total = 0, count = 0
                for i in (r - 1)...(r + 1) {
                    for j in (c - 1)...(c + 1) {
                        if i >= 0 && i < ROWS && j >= 0 && j < COLS {
                            total += img[i][j]
                            count += 1
                        }
                    }
                }
                res[r][c] = total / count
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.

---

## 2. Iteration (Using Extra Row)

### Intuition

We can reduce space by only keeping track of the previous row's original values.
As we process row by row, we modify cells in place.
For neighbors in the current row, we use a copy saved before modification.
For the previous row, we use the saved copy.
For the next row, we use the original matrix values (not yet modified).

### Algorithm

1. Save a copy of the first row as `prevRow`.
2. For each row, save a copy of the current row as `currRow` before processing.
3. For each cell, compute the average using: `prevRow` for the row above, `currRow` for the current row, and the original matrix for the row below.
4. Update the cell in place with the computed average.
5. After processing the row, set `prevRow = currRow` for the next iteration.
6. Return the modified matrix.

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])
        prev_row = img[0][:]

        for r in range(ROWS):
            curr_row = img[r][:]

            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(max(0, r - 1), min(ROWS, r + 2)):
                    for j in range(max(0, c - 1), min(COLS, c + 2)):
                        if i == r:
                            total += curr_row[j]
                        elif i == r - 1:
                            total += prev_row[j]
                        else:
                            total += img[i][j]
                        cnt += 1
                img[r][c] = total // cnt

            prev_row = curr_row

        return img
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;
        int[] prevRow = img[0].clone();

        for (int r = 0; r < ROWS; r++) {
            int[] currRow = img[r].clone();

            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = Math.max(0, r - 1); i < Math.min(ROWS, r + 2); i++) {
                    for (int j = Math.max(0, c - 1); j < Math.min(COLS, c + 2); j++) {
                        if (i == r) {
                            total += currRow[j];
                        } else if (i == r - 1) {
                            total += prevRow[j];
                        } else {
                            total += img[i][j];
                        }
                        count++;
                    }
                }
                img[r][c] = total / count;
            }

            prevRow = currRow;
        }

        return img;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();
        vector<int> prevRow = img[0];

        for (int r = 0; r < ROWS; r++) {
            vector<int> currRow = img[r];

            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = max(0, r - 1); i < min(ROWS, r + 2); i++) {
                    for (int j = max(0, c - 1); j < min(COLS, c + 2); j++) {
                        if (i == r) {
                            total += currRow[j];
                        } else if (i == r - 1) {
                            total += prevRow[j];
                        } else {
                            total += img[i][j];
                        }
                        count++;
                    }
                }
                img[r][c] = total / count;
            }

            prevRow = currRow;
        }

        return img;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;
        let prevRow = [...img[0]];

        for (let r = 0; r < ROWS; r++) {
            let currRow = [...img[r]];

            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    count = 0;
                for (
                    let i = Math.max(0, r - 1);
                    i < Math.min(ROWS, r + 2);
                    i++
                ) {
                    for (
                        let j = Math.max(0, c - 1);
                        j < Math.min(COLS, c + 2);
                        j++
                    ) {
                        if (i === r) {
                            total += currRow[j];
                        } else if (i === r - 1) {
                            total += prevRow[j];
                        } else {
                            total += img[i][j];
                        }
                        count++;
                    }
                }
                img[r][c] = Math.floor(total / count);
            }

            prevRow = currRow;
        }

        return img;
    }
}
```

```go
func imageSmoother(img [][]int) [][]int {
    ROWS, COLS := len(img), len(img[0])
    prevRow := make([]int, COLS)
    copy(prevRow, img[0])

    for r := 0; r < ROWS; r++ {
        currRow := make([]int, COLS)
        copy(currRow, img[r])

        for c := 0; c < COLS; c++ {
            total, count := 0, 0
            for i := max(0, r-1); i < min(ROWS, r+2); i++ {
                for j := max(0, c-1); j < min(COLS, c+2); j++ {
                    if i == r {
                        total += currRow[j]
                    } else if i == r-1 {
                        total += prevRow[j]
                    } else {
                        total += img[i][j]
                    }
                    count++
                }
            }
            img[r][c] = total / count
        }

        prevRow = currRow
    }

    return img
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    fun imageSmoother(img: Array<IntArray>): Array<IntArray> {
        val ROWS = img.size
        val COLS = img[0].size
        var prevRow = img[0].clone()

        for (r in 0 until ROWS) {
            val currRow = img[r].clone()

            for (c in 0 until COLS) {
                var total = 0
                var count = 0
                for (i in maxOf(0, r - 1) until minOf(ROWS, r + 2)) {
                    for (j in maxOf(0, c - 1) until minOf(COLS, c + 2)) {
                        total += when (i) {
                            r -> currRow[j]
                            r - 1 -> prevRow[j]
                            else -> img[i][j]
                        }
                        count++
                    }
                }
                img[r][c] = total / count
            }

            prevRow = currRow
        }

        return img
    }
}
```

```swift
class Solution {
    func imageSmoother(_ img: [[Int]]) -> [[Int]] {
        var img = img
        let ROWS = img.count, COLS = img[0].count
        var prevRow = img[0]

        for r in 0..<ROWS {
            let currRow = img[r]

            for c in 0..<COLS {
                var total = 0, count = 0
                for i in max(0, r - 1)..<min(ROWS, r + 2) {
                    for j in max(0, c - 1)..<min(COLS, c + 2) {
                        if i == r {
                            total += currRow[j]
                        } else if i == r - 1 {
                            total += prevRow[j]
                        } else {
                            total += img[i][j]
                        }
                        count += 1
                    }
                }
                img[r][c] = total / count
            }

            prevRow = currRow
        }

        return img
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$ extra space.

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.

---

## 3. Iteration (Without Extra Space)

### Intuition

Since pixel values are at most 255, we can encode both the original value and the new average in a single integer.
We store the new average in the upper bits (by multiplying by 256) and keep the original in the lower bits.
During computation, we extract the original value using modulo 256.
After processing all cells, we extract the new values by dividing by 256.

### Algorithm

1. For each cell, compute the average using `img[i][j] % 256` to get original values.
2. Add the new average to the cell by: `img[r][c] += (average) * 256`.
3. After processing all cells, do a second pass to extract the new values.
4. For each cell, set `img[r][c] = img[r][c] / 256`.
5. Return the modified matrix.

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])
        LIMIT = 256

        for r in range(ROWS):
            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(max(0, r - 1), min(ROWS, r + 2)):
                    for j in range(max(0, c - 1), min(COLS, c + 2)):
                        total += img[i][j] % LIMIT
                        cnt += 1
                img[r][c] += (total // cnt) * LIMIT

        for r in range(ROWS):
            for c in range(COLS):
                img[r][c] //= LIMIT

        return img
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;
        int LIMIT = 256;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = Math.max(0, r - 1); i < Math.min(ROWS, r + 2); i++) {
                    for (int j = Math.max(0, c - 1); j < Math.min(COLS, c + 2); j++) {
                        total += img[i][j] % LIMIT;
                        count++;
                    }
                }
                img[r][c] += (total / count) * LIMIT;
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                img[r][c] /= LIMIT;
            }
        }

        return img;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();
        int LIMIT = 256;

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                int total = 0, count = 0;
                for (int i = max(0, r - 1); i < min(ROWS, r + 2); ++i) {
                    for (int j = max(0, c - 1); j < min(COLS, c + 2); ++j) {
                        total += img[i][j] % LIMIT;
                        count++;
                    }
                }
                img[r][c] += (total / count) * LIMIT;
            }
        }

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                img[r][c] /= LIMIT;
            }
        }

        return img;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;
        const LIMIT = 256;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    count = 0;
                for (
                    let i = Math.max(0, r - 1);
                    i < Math.min(ROWS, r + 2);
                    i++
                ) {
                    for (
                        let j = Math.max(0, c - 1);
                        j < Math.min(COLS, c + 2);
                        j++
                    ) {
                        total += img[i][j] % LIMIT;
                        count++;
                    }
                }
                img[r][c] += Math.floor(total / count) * LIMIT;
            }
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                img[r][c] = Math.floor(img[r][c] / LIMIT);
            }
        }

        return img;
    }
}
```

```go
func imageSmoother(img [][]int) [][]int {
    ROWS, COLS := len(img), len(img[0])
    LIMIT := 256

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            total, count := 0, 0
            for i := max(0, r-1); i < min(ROWS, r+2); i++ {
                for j := max(0, c-1); j < min(COLS, c+2); j++ {
                    total += img[i][j] % LIMIT
                    count++
                }
            }
            img[r][c] += (total / count) * LIMIT
        }
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            img[r][c] /= LIMIT
        }
    }

    return img
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
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
    fun imageSmoother(img: Array<IntArray>): Array<IntArray> {
        val ROWS = img.size
        val COLS = img[0].size
        val LIMIT = 256

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                var total = 0
                var count = 0
                for (i in maxOf(0, r - 1) until minOf(ROWS, r + 2)) {
                    for (j in maxOf(0, c - 1) until minOf(COLS, c + 2)) {
                        total += img[i][j] % LIMIT
                        count++
                    }
                }
                img[r][c] += (total / count) * LIMIT
            }
        }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                img[r][c] /= LIMIT
            }
        }

        return img
    }
}
```

```swift
class Solution {
    func imageSmoother(_ img: [[Int]]) -> [[Int]] {
        var img = img
        let ROWS = img.count, COLS = img[0].count
        let LIMIT = 256

        for r in 0..<ROWS {
            for c in 0..<COLS {
                var total = 0, count = 0
                for i in max(0, r - 1)..<min(ROWS, r + 2) {
                    for j in max(0, c - 1)..<min(COLS, c + 2) {
                        total += img[i][j] % LIMIT
                        count += 1
                    }
                }
                img[r][c] += (total / count) * LIMIT
            }
        }

        for r in 0..<ROWS {
            for c in 0..<COLS {
                img[r][c] /= LIMIT
            }
        }

        return img
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.

---

## 4. Bit Mask

### Intuition

This approach is similar to the previous one but uses bit manipulation instead of multiplication and division.
We use XOR and bit shifting to store the new average in the upper 8 bits.
The original value occupies the lower 8 bits (since values are 0 to 255).
This is slightly more efficient as bit operations are faster than arithmetic operations.

### Algorithm

1. For each cell, compute the average using `img[i][j] % 256` (or `& 255`) to get original values.
2. Store the new average in the upper bits using XOR and left shift: `img[r][c] ^= (average << 8)`.
3. After processing all cells, do a second pass.
4. For each cell, right shift by 8 bits to extract the new value: `img[r][c] >>= 8`.
5. Return the modified matrix.

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])

        for r in range(ROWS):
            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(r - 1, r + 2):
                    for j in range(c - 1, c + 2):
                        if i < 0 or i == ROWS or j < 0 or j == COLS:
                            continue
                        total += img[i][j] % 256
                        cnt += 1
                img[r][c] ^= ((total // cnt) << 8)

        for r in range(ROWS):
            for c in range(COLS):
                img[r][c] >>= 8
        return img
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, cnt = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i < 0 || i >= ROWS || j < 0 || j >= COLS) {
                            continue;
                        }
                        total += img[i][j] % 256;
                        cnt++;
                    }
                }
                img[r][c] ^= ((total / cnt) << 8);
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                img[r][c] >>= 8;
            }
        }
        return img;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, cnt = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i < 0 || i >= ROWS || j < 0 || j >= COLS) {
                            continue;
                        }
                        total += img[i][j] % 256;
                        cnt++;
                    }
                }
                img[r][c] ^= ((total / cnt) << 8);
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                img[r][c] >>= 8;
            }
        }
        return img;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    cnt = 0;
                for (let i = r - 1; i <= r + 1; i++) {
                    for (let j = c - 1; j <= c + 1; j++) {
                        if (i < 0 || i >= ROWS || j < 0 || j >= COLS) {
                            continue;
                        }
                        total += img[i][j] % 256;
                        cnt++;
                    }
                }
                img[r][c] ^= (total / cnt) << 8;
            }
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                img[r][c] >>= 8;
            }
        }
        return img;
    }
}
```

```go
func imageSmoother(img [][]int) [][]int {
    ROWS, COLS := len(img), len(img[0])

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            total, cnt := 0, 0
            for i := r - 1; i <= r+1; i++ {
                for j := c - 1; j <= c+1; j++ {
                    if i < 0 || i >= ROWS || j < 0 || j >= COLS {
                        continue
                    }
                    total += img[i][j] % 256
                    cnt++
                }
            }
            img[r][c] ^= ((total / cnt) << 8)
        }
    }

    for r := 0; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            img[r][c] >>= 8
        }
    }
    return img
}
```

```kotlin
class Solution {
    fun imageSmoother(img: Array<IntArray>): Array<IntArray> {
        val ROWS = img.size
        val COLS = img[0].size

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                var total = 0
                var cnt = 0
                for (i in r - 1..r + 1) {
                    for (j in c - 1..c + 1) {
                        if (i < 0 || i >= ROWS || j < 0 || j >= COLS) {
                            continue
                        }
                        total += img[i][j] % 256
                        cnt++
                    }
                }
                img[r][c] = img[r][c] xor ((total / cnt) shl 8)
            }
        }

        for (r in 0 until ROWS) {
            for (c in 0 until COLS) {
                img[r][c] = img[r][c] shr 8
            }
        }
        return img
    }
}
```

```swift
class Solution {
    func imageSmoother(_ img: [[Int]]) -> [[Int]] {
        var img = img
        let ROWS = img.count, COLS = img[0].count

        for r in 0..<ROWS {
            for c in 0..<COLS {
                var total = 0, cnt = 0
                for i in (r - 1)...(r + 1) {
                    for j in (c - 1)...(c + 1) {
                        if i < 0 || i >= ROWS || j < 0 || j >= COLS {
                            continue
                        }
                        total += img[i][j] % 256
                        cnt += 1
                    }
                }
                img[r][c] ^= ((total / cnt) << 8)
            }
        }

        for r in 0..<ROWS {
            for c in 0..<COLS {
                img[r][c] >>= 8
            }
        }
        return img
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.

---

## Common Pitfalls

### Off-by-One Errors in Neighbor Iteration

When iterating through the 3x3 window centered at cell `(r, c)`, it is easy to make off-by-one errors with the loop bounds. For example, using `range(r - 1, r + 1)` only covers two rows instead of three. The correct bounds are `range(r - 1, r + 2)` to include `r - 1`, `r`, and `r + 1`. Similarly, forgetting to check boundary conditions like `0 <= i < ROWS` can cause index out of bounds errors.

### Using Modified Values Instead of Original Values

When modifying the matrix in place without extra space, a common mistake is reading already-modified values when computing neighbors. If cell `(i, j)` has been updated before processing cell `(r, c)`, using `img[i][j]` directly gives the wrong result. The in-place solutions address this by encoding both original and new values in the same cell using bit manipulation or arithmetic (multiplying/dividing by 256), ensuring original values can always be extracted during computation.
