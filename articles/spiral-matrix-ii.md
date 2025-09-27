## 1. Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$ for the output matrix.

---

## 2. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(n)$ space for recursion stack.
    - $O(n ^ 2)$ space for the output matrix.

---

## 3. Iteration (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$ for the output matrix.
