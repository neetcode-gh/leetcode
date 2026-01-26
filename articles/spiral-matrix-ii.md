## Prerequisites
Before attempting this problem, you should be comfortable with:
- **2D Array Manipulation** - Creating and filling matrices with values
- **Boundary Tracking** - Maintaining and updating top, bottom, left, right boundaries during traversal
- **Direction Vectors** - Using coordinate deltas `(dr, dc)` to control movement direction
- **Simulation** - Following a defined pattern (spiral) to systematically fill cells

---

## 1. Iteration

### Intuition

We fill an n x n matrix with values from 1 to n^2 in spiral order. Think of peeling an onion layer by layer. We maintain four boundaries (top, bottom, left, right) and fill each layer by moving right along the top row, down the right column, left along the bottom row, and up the left column. After completing each direction, we shrink the corresponding boundary inward.

### Algorithm

1. Initialize an `n x n` matrix with zeros and set boundaries: `left = 0`, `right = n - 1`, `top = 0`, `bottom = n - 1`.
2. Start with `val = 1` and continue while `left <= right`:
   - Fill the top row from `left` to `right`, then increment `top`.
   - Fill the right column from `top` to `bottom`, then decrement `right`.
   - Fill the bottom row from `right` to `left`, then decrement `bottom`.
   - Fill the left column from `bottom` to `top`, then increment `left`.
3. Return the filled matrix.

::tabs-start

```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        mat = [[0] * n for _ in range(n)]
        left, right = 0, n - 1
        top, bottom = 0, n - 1
        val = 1

        while left <= right:
            # Fill every val in top row
            for c in range(left, right + 1):
                mat[top][c] = val
                val += 1
            top += 1

            # Fill every val in right col
            for r in range(top, bottom + 1):
                mat[r][right] = val
                val += 1
            right -= 1

            # Fill every val in bottom row (reverse order)
            for c in range(right, left - 1, -1):
                mat[bottom][c] = val
                val += 1
            bottom -= 1

            # Fill every val in the left col (reverse order)
            for r in range(bottom, top - 1, -1):
                mat[r][left] = val
                val += 1
            left += 1

        return mat
```

```java
public class Solution {
    public int[][] generateMatrix(int n) {
        int[][] mat = new int[n][n];
        int left = 0, right = n - 1, top = 0, bottom = n - 1, val = 1;

        while (left <= right) {
            // Fill every val in top row
            for (int c = left; c <= right; c++) {
                mat[top][c] = val++;
            }
            top++;

            // Fill every val in right col
            for (int r = top; r <= bottom; r++) {
                mat[r][right] = val++;
            }
            right--;

            // Fill every val in bottom row (reverse order)
            for (int c = right; c >= left; c--) {
                mat[bottom][c] = val++;
            }
            bottom--;

            // Fill every val in the left col (reverse order)
            for (int r = bottom; r >= top; r--) {
                mat[r][left] = val++;
            }
            left++;
        }

        return mat;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> mat(n, vector<int>(n, 0));
        int left = 0, right = n - 1, top = 0, bottom = n - 1, val = 1;

        while (left <= right) {
            // Fill every val in top row
            for (int c = left; c <= right; c++) {
                mat[top][c] = val++;
            }
            top++;

            // Fill every val in right col
            for (int r = top; r <= bottom; r++) {
                mat[r][right] = val++;
            }
            right--;

            // Fill every val in bottom row (reverse order)
            for (int c = right; c >= left; c--) {
                mat[bottom][c] = val++;
            }
            bottom--;

            // Fill every val in the left col (reverse order)
            for (int r = bottom; r >= top; r--) {
                mat[r][left] = val++;
            }
            left++;
        }

        return mat;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[][]}
     */
    generateMatrix(n) {
        const mat = Array.from({ length: n }, () => Array(n).fill(0));
        let left = 0,
            right = n - 1,
            top = 0,
            bottom = n - 1,
            val = 1;

        while (left <= right) {
            // Fill every val in top row
            for (let c = left; c <= right; c++) {
                mat[top][c] = val++;
            }
            top++;

            // Fill every val in right col
            for (let r = top; r <= bottom; r++) {
                mat[r][right] = val++;
            }
            right--;

            // Fill every val in bottom row (reverse order)
            for (let c = right; c >= left; c--) {
                mat[bottom][c] = val++;
            }
            bottom--;

            // Fill every val in the left col (reverse order)
            for (let r = bottom; r >= top; r--) {
                mat[r][left] = val++;
            }
            left++;
        }

        return mat;
    }
}
```

```csharp
public class Solution {
    public int[][] GenerateMatrix(int n) {
        int[][] mat = new int[n][];
        for (int i = 0; i < n; i++) mat[i] = new int[n];
        int left = 0, right = n - 1;
        int top = 0, bottom = n - 1;
        int val = 1;

        while (left <= right) {
            for (int c = left; c <= right; c++) {
                mat[top][c] = val;
                val++;
            }
            top++;

            for (int r = top; r <= bottom; r++) {
                mat[r][right] = val;
                val++;
            }
            right--;

            for (int c = right; c >= left; c--) {
                mat[bottom][c] = val;
                val++;
            }
            bottom--;

            for (int r = bottom; r >= top; r--) {
                mat[r][left] = val;
                val++;
            }
            left++;
        }

        return mat;
    }
}
```

```go
func generateMatrix(n int) [][]int {
    mat := make([][]int, n)
    for i := range mat {
        mat[i] = make([]int, n)
    }
    left, right := 0, n-1
    top, bottom := 0, n-1
    val := 1

    for left <= right {
        for c := left; c <= right; c++ {
            mat[top][c] = val
            val++
        }
        top++

        for r := top; r <= bottom; r++ {
            mat[r][right] = val
            val++
        }
        right--

        for c := right; c >= left; c-- {
            mat[bottom][c] = val
            val++
        }
        bottom--

        for r := bottom; r >= top; r-- {
            mat[r][left] = val
            val++
        }
        left++
    }

    return mat
}
```

```kotlin
class Solution {
    fun generateMatrix(n: Int): Array<IntArray> {
        val mat = Array(n) { IntArray(n) }
        var left = 0
        var right = n - 1
        var top = 0
        var bottom = n - 1
        var value = 1

        while (left <= right) {
            for (c in left..right) {
                mat[top][c] = value++
            }
            top++

            for (r in top..bottom) {
                mat[r][right] = value++
            }
            right--

            for (c in right downTo left) {
                mat[bottom][c] = value++
            }
            bottom--

            for (r in bottom downTo top) {
                mat[r][left] = value++
            }
            left++
        }

        return mat
    }
}
```

```swift
class Solution {
    func generateMatrix(_ n: Int) -> [[Int]] {
        var mat = Array(repeating: Array(repeating: 0, count: n), count: n)
        var left = 0, right = n - 1
        var top = 0, bottom = n - 1
        var val = 1

        while left <= right {
            for c in left...right {
                mat[top][c] = val
                val += 1
            }
            top += 1

            for r in top...bottom {
                mat[r][right] = val
                val += 1
            }
            right -= 1

            for c in stride(from: right, through: left, by: -1) {
                mat[bottom][c] = val
                val += 1
            }
            bottom -= 1

            for r in stride(from: bottom, through: top, by: -1) {
                mat[r][left] = val
                val += 1
            }
            left += 1
        }

        return mat
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$ for the output matrix.

---

## 2. Recursion

### Intuition

The recursive approach mirrors the iterative one but uses function calls to handle each layer. We fill one complete ring of the spiral (top row, right column, bottom row, left column) and then recursively fill the inner portion. The base case is when the boundaries cross, meaning the entire matrix is filled.

### Algorithm

1. Create a helper function `fill(left, right, top, bottom, val)` that fills one layer.
2. Base case: if `left > right` or `top > bottom`, return.
3. Fill the current layer in four directions (same as iterative approach), updating `val` after each cell.
4. After filling the outer ring, recursively call `fill` with updated boundaries for the inner layer.
5. Start the recursion with `fill(0, n - 1, 0, n - 1, 1)`.

::tabs-start

```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        mat = [[0] * n for _ in range(n)]

        def fill(left, right, top, bottom, val):
            if left > right or top > bottom:
                return

            # Fill every val in top row
            for c in range(left, right + 1):
                mat[top][c] = val
                val += 1
            top += 1

            # Fill every val in right col
            for r in range(top, bottom + 1):
                mat[r][right] = val
                val += 1
            right -= 1

            # Fill every val in bottom row (reverse order)
            for c in range(right, left - 1, -1):
                mat[bottom][c] = val
                val += 1
            bottom -= 1

            # Fill every val in the left col (reverse order)
            for r in range(bottom, top - 1, -1):
                mat[r][left] = val
                val += 1
            left += 1

            # Recur for the inner layer
            fill(left, right, top, bottom, val)

        fill(0, n - 1, 0, n - 1, 1)
        return mat
```

```java
public class Solution {
    public int[][] generateMatrix(int n) {
        int[][] mat = new int[n][n];
        fill(mat, 0, n - 1, 0, n - 1, 1);
        return mat;
    }

    private void fill(int[][] mat, int left, int right, int top, int bottom, int val) {
        if (left > right || top > bottom) return;

        // Fill every val in top row
        for (int c = left; c <= right; c++) {
            mat[top][c] = val++;
        }
        top++;

        // Fill every val in right col
        for (int r = top; r <= bottom; r++) {
            mat[r][right] = val++;
        }
        right--;

        // Fill every val in bottom row (reverse order)
        for (int c = right; c >= left; c--) {
            mat[bottom][c] = val++;
        }
        bottom--;

        // Fill every val in the left col (reverse order)
        for (int r = bottom; r >= top; r--) {
            mat[r][left] = val++;
        }
        left++;

        // Recur for the inner layer
        fill(mat, left, right, top, bottom, val);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> mat(n, vector<int>(n, 0));
        fill(mat, 0, n - 1, 0, n - 1, 1);
        return mat;
    }

private:
    void fill(vector<vector<int>> &mat, int left, int right, int top, int bottom, int val) {
        if (left > right || top > bottom) return;

        // Fill every val in top row
        for (int c = left; c <= right; c++) {
            mat[top][c] = val++;
        }
        top++;

        // Fill every val in right col
        for (int r = top; r <= bottom; r++) {
            mat[r][right] = val++;
        }
        right--;

        // Fill every val in bottom row (reverse order)
        for (int c = right; c >= left; c--) {
            mat[bottom][c] = val++;
        }
        bottom--;

        // Fill every val in the left col (reverse order)
        for (int r = bottom; r >= top; r--) {
            mat[r][left] = val++;
        }
        left++;

        // Recur for the inner layer
        fill(mat, left, right, top, bottom, val);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[][]}
     */
    generateMatrix(n) {
        const mat = Array.from({ length: n }, () => Array(n).fill(0));

        const fill = (left, right, top, bottom, val) => {
            if (left > right || top > bottom) return;

            // Fill every val in top row
            for (let c = left; c <= right; c++) {
                mat[top][c] = val++;
            }
            top++;

            // Fill every val in right col
            for (let r = top; r <= bottom; r++) {
                mat[r][right] = val++;
            }
            right--;

            // Fill every val in bottom row (reverse order)
            for (let c = right; c >= left; c--) {
                mat[bottom][c] = val++;
            }
            bottom--;

            // Fill every val in the left col (reverse order)
            for (let r = bottom; r >= top; r--) {
                mat[r][left] = val++;
            }
            left++;

            // Recur for the inner layer
            fill(left, right, top, bottom, val);
        };

        fill(0, n - 1, 0, n - 1, 1);
        return mat;
    }
}
```

```csharp
public class Solution {
    public int[][] GenerateMatrix(int n) {
        int[][] mat = new int[n][];
        for (int i = 0; i < n; i++) mat[i] = new int[n];

        void Fill(int left, int right, int top, int bottom, int val) {
            if (left > right || top > bottom) return;

            for (int c = left; c <= right; c++) {
                mat[top][c] = val;
                val++;
            }
            top++;

            for (int r = top; r <= bottom; r++) {
                mat[r][right] = val;
                val++;
            }
            right--;

            for (int c = right; c >= left; c--) {
                mat[bottom][c] = val;
                val++;
            }
            bottom--;

            for (int r = bottom; r >= top; r--) {
                mat[r][left] = val;
                val++;
            }
            left++;

            Fill(left, right, top, bottom, val);
        }

        Fill(0, n - 1, 0, n - 1, 1);
        return mat;
    }
}
```

```go
func generateMatrix(n int) [][]int {
    mat := make([][]int, n)
    for i := range mat {
        mat[i] = make([]int, n)
    }

    var fill func(left, right, top, bottom, val int)
    fill = func(left, right, top, bottom, val int) {
        if left > right || top > bottom {
            return
        }

        for c := left; c <= right; c++ {
            mat[top][c] = val
            val++
        }
        top++

        for r := top; r <= bottom; r++ {
            mat[r][right] = val
            val++
        }
        right--

        for c := right; c >= left; c-- {
            mat[bottom][c] = val
            val++
        }
        bottom--

        for r := bottom; r >= top; r-- {
            mat[r][left] = val
            val++
        }
        left++

        fill(left, right, top, bottom, val)
    }

    fill(0, n-1, 0, n-1, 1)
    return mat
}
```

```kotlin
class Solution {
    fun generateMatrix(n: Int): Array<IntArray> {
        val mat = Array(n) { IntArray(n) }

        fun fill(left: Int, right: Int, top: Int, bottom: Int, value: Int) {
            if (left > right || top > bottom) return

            var l = left
            var r = right
            var t = top
            var b = bottom
            var v = value

            for (c in l..r) {
                mat[t][c] = v++
            }
            t++

            for (row in t..b) {
                mat[row][r] = v++
            }
            r--

            for (c in r downTo l) {
                mat[b][c] = v++
            }
            b--

            for (row in b downTo t) {
                mat[row][l] = v++
            }
            l++

            fill(l, r, t, b, v)
        }

        fill(0, n - 1, 0, n - 1, 1)
        return mat
    }
}
```

```swift
class Solution {
    func generateMatrix(_ n: Int) -> [[Int]] {
        var mat = Array(repeating: Array(repeating: 0, count: n), count: n)

        func fill(_ left: Int, _ right: Int, _ top: Int, _ bottom: Int, _ val: Int) {
            if left > right || top > bottom { return }

            var l = left, r = right, t = top, b = bottom, v = val

            for c in l...r {
                mat[t][c] = v
                v += 1
            }
            t += 1

            for row in t...b {
                mat[row][r] = v
                v += 1
            }
            r -= 1

            for c in stride(from: r, through: l, by: -1) {
                mat[b][c] = v
                v += 1
            }
            b -= 1

            for row in stride(from: b, through: t, by: -1) {
                mat[row][l] = v
                v += 1
            }
            l += 1

            fill(l, r, t, b, v)
        }

        fill(0, n - 1, 0, n - 1, 1)
        return mat
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(n)$ space for recursion stack.
    - $O(n ^ 2)$ space for the output matrix.

---

## 3. Iteration (Optimal)

### Intuition

Instead of tracking four boundaries, we can use direction vectors to navigate the spiral. We start moving right and change direction (right -> down -> left -> up -> right...) whenever we hit a boundary or an already-filled cell. The direction change follows the pattern of rotating 90 degrees clockwise, which can be computed mathematically: if current direction is `(dr, dc)`, the next direction is `(dc, -dr)`.

### Algorithm

1. Initialize an `n x n` matrix with zeros. Set starting position `(r, c) = (0, 0)` and direction `(dr, dc) = (0, 1)` (moving right).
2. For each value from `1` to `n^2`:
   - Place the value at position `(r, c)`.
   - Check if the next position (with wraparound) is already filled.
   - If so, rotate direction by setting `(dr, dc) = (dc, -dr)`.
   - Move to the next position: `r += dr`, `c += dc`.
3. Return the filled matrix.

::tabs-start

```python
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        mat = [[0] * n for _ in range(n)]
        r = c = 0
        dr, dc = 0, 1

        for val in range(n * n):
            mat[r][c] = val + 1
            if mat[(r + dr) % n][(c + dc) % n] != 0:
                dr, dc = dc, -dr
            r, c = r + dr, c + dc

        return mat
```

```java
public class Solution {
    public int[][] generateMatrix(int n) {
        int[][] mat = new int[n][n];
        int r = 0, c = 0, dr = 0, dc = 1;

        for (int val = 0; val < n * n; val++) {
            mat[r][c] = val + 1;
            int nextR = (r + dr) % n, nextC = (c + dc) % n;
            if (nextR < 0) nextR += n;
            if (nextC < 0) nextC += n;
            if (mat[nextR][nextC] != 0) {
                int temp = dr;
                dr = dc;
                dc = -temp;
            }
            r += dr;
            c += dc;
        }

        return mat;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> mat(n, vector<int>(n, 0));
        int r = 0, c = 0, dr = 0, dc = 1;

        for (int val = 0; val < n * n; val++) {
            mat[r][c] = val + 1;
            int nextR = (r + dr) % n, nextC = (c + dc) % n;
            if (nextR < 0) nextR += n;
            if (nextC < 0) nextC += n;
            if (mat[nextR][nextC] != 0) {
                int temp = dr;
                dr = dc;
                dc = -temp;
            }
            r += dr;
            c += dc;
        }

        return mat;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[][]}
     */
    generateMatrix(n) {
        const mat = Array.from({ length: n }, () => Array(n).fill(0));
        let r = 0,
            c = 0,
            dr = 0,
            dc = 1;

        for (let val = 0; val < n * n; val++) {
            mat[r][c] = val + 1;
            let nextR = (r + dr) % n,
                nextC = (c + dc) % n;
            if (nextR < 0) nextR += n;
            if (nextC < 0) nextC += n;
            if (mat[nextR][nextC] !== 0) {
                [dr, dc] = [dc, -dr];
            }
            r += dr;
            c += dc;
        }

        return mat;
    }
}
```

```csharp
public class Solution {
    public int[][] GenerateMatrix(int n) {
        int[][] mat = new int[n][];
        for (int i = 0; i < n; i++) mat[i] = new int[n];
        int r = 0, c = 0;
        int dr = 0, dc = 1;

        for (int val = 0; val < n * n; val++) {
            mat[r][c] = val + 1;
            if (mat[(r + dr + n) % n][(c + dc + n) % n] != 0) {
                int temp = dr;
                dr = dc;
                dc = -temp;
            }
            r += dr;
            c += dc;
        }

        return mat;
    }
}
```

```go
func generateMatrix(n int) [][]int {
    mat := make([][]int, n)
    for i := range mat {
        mat[i] = make([]int, n)
    }
    r, c := 0, 0
    dr, dc := 0, 1

    for val := 0; val < n*n; val++ {
        mat[r][c] = val + 1
        nextR := (r + dr + n) % n
        nextC := (c + dc + n) % n
        if mat[nextR][nextC] != 0 {
            dr, dc = dc, -dr
        }
        r += dr
        c += dc
    }

    return mat
}
```

```kotlin
class Solution {
    fun generateMatrix(n: Int): Array<IntArray> {
        val mat = Array(n) { IntArray(n) }
        var r = 0
        var c = 0
        var dr = 0
        var dc = 1

        for (value in 0 until n * n) {
            mat[r][c] = value + 1
            val nextR = (r + dr + n) % n
            val nextC = (c + dc + n) % n
            if (mat[nextR][nextC] != 0) {
                val temp = dr
                dr = dc
                dc = -temp
            }
            r += dr
            c += dc
        }

        return mat
    }
}
```

```swift
class Solution {
    func generateMatrix(_ n: Int) -> [[Int]] {
        var mat = Array(repeating: Array(repeating: 0, count: n), count: n)
        var r = 0, c = 0
        var dr = 0, dc = 1

        for val in 0..<(n * n) {
            mat[r][c] = val + 1
            let nextR = (r + dr + n) % n
            let nextC = (c + dc + n) % n
            if mat[nextR][nextC] != 0 {
                let temp = dr
                dr = dc
                dc = -temp
            }
            r += dr
            c += dc
        }

        return mat
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$ for the output matrix.

---

## Common Pitfalls

### Incorrect Boundary Updates

Failing to update boundaries (top, bottom, left, right) after filling each edge leads to overwriting previously filled cells or skipping cells entirely. Each boundary must be adjusted immediately after its corresponding edge is filled.

### Off-by-One in Range Calculations

When iterating along rows or columns, using inclusive vs exclusive bounds incorrectly causes cells to be missed or written twice. For example, after filling the top row from `left` to `right`, the next column fill should start from `top + 1`, not `top`.

### Forgetting to Handle Odd-Sized Matrices

For odd values of `n`, the center cell requires special attention. If the loop condition or boundary updates are off, the center cell may be skipped or the loop may not terminate correctly. The direction-based approach handles this naturally, but boundary-based approaches need careful loop conditions.
