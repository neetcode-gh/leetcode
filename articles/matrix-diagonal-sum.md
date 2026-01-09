## 1. Iteration

### Intuition

The matrix has two diagonals: the primary diagonal (top-left to bottom-right) and the secondary diagonal (top-right to bottom-left). We can collect elements from both diagonals by reversing each row after processing the primary diagonal, then processing it again. The center element appears on both diagonals for odd-sized matrices, so we subtract it once to avoid double-counting.

### Algorithm

1. Define a helper function that iterates through the matrix and sums elements where row index equals column index (primary diagonal), then reverses each row.
2. Call the helper twice: first to sum the primary diagonal, then after rows are reversed, to sum what was the secondary diagonal.
3. If the matrix dimension is odd, subtract the center element (which was counted twice).
4. Return the total sum.

::tabs-start

```python
class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        n = len(mat)

        def helper(matrix):
            res = 0
            for i in range(n):
                for j in range(n):
                    if i == j:
                        res += matrix[i][j]
                matrix[i].reverse()
            return res

        return helper(mat) + helper(mat) - (mat[n // 2][n // 2] if n & 1 else 0)
```

```java
public class Solution {
    public int diagonalSum(int[][] mat) {
        int n = mat.length;
        return helper(mat) + helper(mat) - (n % 2 == 1 ? mat[n / 2][n / 2] : 0);
    }

    int helper(int[][] matrix) {
        int res = 0, n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    res += matrix[i][j];
                }
            }
            reverse(matrix[i]);
        }
        return res;
    }

    void reverse(int[] row) {
        int left = 0, right = row.length - 1;
        while (left < right) {
            int temp = row[left];
            row[left++] = row[right];
            row[right--] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    int diagonalSum(vector<vector<int>>& mat) {
        int n = mat.size();
        return helper(mat) + helper(mat) - (n % 2 == 1 ? mat[n / 2][n / 2] : 0);
    }

private:
    int helper(vector<vector<int>>& matrix) {
        int res = 0, n = matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (i == j) {
                    res += matrix[i][j];
                }
            }
            reverse(matrix[i].begin(), matrix[i].end());
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat
     * @return {number}
     */
    diagonalSum(mat) {
        const n = mat.length;

        const helper = (matrix) => {
            let res = 0;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (i === j) {
                        res += matrix[i][j];
                    }
                }
                matrix[i].reverse();
            }
            return res;
        };

        return (
            helper(mat) +
            helper(mat) -
            (n % 2 === 1 ? mat[Math.floor(n / 2)][Math.floor(n / 2)] : 0)
        );
    }
}
```

```csharp
public class Solution {
    public int DiagonalSum(int[][] mat) {
        int n = mat.Length;

        int Helper(int[][] matrix) {
            int res = 0;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (i == j) {
                        res += matrix[i][j];
                    }
                }
                Array.Reverse(matrix[i]);
            }
            return res;
        }

        int sum = Helper(mat) + Helper(mat);
        if ((n & 1) == 1) {
            sum -= mat[n / 2][n / 2];
        }
        return sum;
    }
}
```

```go
func diagonalSum(mat [][]int) int {
    n := len(mat)

    helper := func(matrix [][]int) int {
        res := 0
        for i := 0; i < n; i++ {
            for j := 0; j < n; j++ {
                if i == j {
                    res += matrix[i][j]
                }
            }
            for l, r := 0, len(matrix[i])-1; l < r; l, r = l+1, r-1 {
                matrix[i][l], matrix[i][r] = matrix[i][r], matrix[i][l]
            }
        }
        return res
    }

    sum := helper(mat) + helper(mat)
    if n%2 == 1 {
        sum -= mat[n/2][n/2]
    }
    return sum
}
```

```kotlin
class Solution {
    fun diagonalSum(mat: Array<IntArray>): Int {
        val n = mat.size

        fun helper(matrix: Array<IntArray>): Int {
            var res = 0
            for (i in 0 until n) {
                for (j in 0 until n) {
                    if (i == j) {
                        res += matrix[i][j]
                    }
                }
                matrix[i].reverse()
            }
            return res
        }

        var sum = helper(mat) + helper(mat)
        if (n % 2 == 1) {
            sum -= mat[n / 2][n / 2]
        }
        return sum
    }
}
```

```swift
class Solution {
    func diagonalSum(_ mat: [[Int]]) -> Int {
        var mat = mat
        let n = mat.count

        func helper(_ matrix: inout [[Int]]) -> Int {
            var res = 0
            for i in 0..<n {
                for j in 0..<n {
                    if i == j {
                        res += matrix[i][j]
                    }
                }
                matrix[i].reverse()
            }
            return res
        }

        var sum = helper(&mat) + helper(&mat)
        if n % 2 == 1 {
            sum -= mat[n / 2][n / 2]
        }
        return sum
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Iteration (Optimal)

### Intuition

We can directly compute both diagonal sums in a single pass. For row `r`, the primary diagonal element is at column `r`, and the secondary diagonal element is at column `n - r - 1`. We simply add both for each row. When `n` is odd, the center element (at row `n/2`, column `n/2`) is counted twice, so we subtract it once at the end.

### Algorithm

1. Initialize the result sum to 0.
2. For each row index `r` from 0 to `n - 1`:
   - Add `mat[r][r]` (primary diagonal element).
   - Add `mat[r][n - r - 1]` (secondary diagonal element).
3. If `n` is odd, subtract the center element `mat[n/2][n/2]` to correct for double-counting.
4. Return the result.

::tabs-start

```python
class Solution:
    def diagonalSum(self, mat: List[List[int]]) -> int:
        res, n = 0, len(mat)

        for r in range(n):
            res += mat[r][r]
            res += mat[r][n - r - 1]

        return res - (mat[n // 2][n // 2] if n & 1 else 0)
```

```java
public class Solution {
    public int diagonalSum(int[][] mat) {
        int res = 0, n = mat.length;

        for (int r = 0; r < n; r++) {
            res += mat[r][r];
            res += mat[r][n - r - 1];
        }

        return res - (n % 2 == 1 ? mat[n / 2][n / 2] : 0);
    }
}
```

```cpp
class Solution {
public:
    int diagonalSum(vector<vector<int>>& mat) {
        int res = 0, n = mat.size();

        for (int r = 0; r < n; r++) {
            res += mat[r][r];
            res += mat[r][n - r - 1];
        }

        return res - (n % 2 == 1 ? mat[n / 2][n / 2] : 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat
     * @return {number}
     */
    diagonalSum(mat) {
        let res = 0,
            n = mat.length;

        for (let r = 0; r < n; r++) {
            res += mat[r][r];
            res += mat[r][n - r - 1];
        }

        return (
            res - (n % 2 == 1 ? mat[Math.floor(n / 2)][Math.floor(n / 2)] : 0)
        );
    }
}
```

```csharp
public class Solution {
    public int DiagonalSum(int[][] mat) {
        int res = 0;
        int n = mat.Length;

        for (int r = 0; r < n; r++) {
            res += mat[r][r];
            res += mat[r][n - r - 1];
        }

        if ((n & 1) == 1) {
            res -= mat[n / 2][n / 2];
        }

        return res;
    }
}
```

```go
func diagonalSum(mat [][]int) int {
    res := 0
    n := len(mat)

    for r := 0; r < n; r++ {
        res += mat[r][r]
        res += mat[r][n-r-1]
    }

    if n%2 == 1 {
        res -= mat[n/2][n/2]
    }

    return res
}
```

```kotlin
class Solution {
    fun diagonalSum(mat: Array<IntArray>): Int {
        var res = 0
        val n = mat.size

        for (r in 0 until n) {
            res += mat[r][r]
            res += mat[r][n - r - 1]
        }

        if (n % 2 == 1) {
            res -= mat[n / 2][n / 2]
        }

        return res
    }
}
```

```swift
class Solution {
    func diagonalSum(_ mat: [[Int]]) -> Int {
        var res = 0
        let n = mat.count

        for r in 0..<n {
            res += mat[r][r]
            res += mat[r][n - r - 1]
        }

        if n % 2 == 1 {
            res -= mat[n / 2][n / 2]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
