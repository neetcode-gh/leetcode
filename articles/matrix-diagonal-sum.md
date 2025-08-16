## 1. Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Iteration (Optimal)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
