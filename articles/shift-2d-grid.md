## 1. Simulation (Extra Space)

::tabs-start

```python
class Solution:
    def shiftGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])

        while k:
            cur = [[0] * n for _ in range(m)]

            for r in range(m):
                for c in range(n - 1):
                    cur[r][c + 1] = grid[r][c]

            for r in range(m):
                cur[(r + 1) % m][0] = grid[r][n - 1]

            grid = cur
            k -= 1

        return grid
```

```java
public class Solution {
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;

        while (k > 0) {
            int[][] cur = new int[m][n];

            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n - 1; c++) {
                    cur[r][c + 1] = grid[r][c];
                }
            }

            for (int r = 0; r < m; r++) {
                cur[(r + 1) % m][0] = grid[r][n - 1];
            }

            grid = cur;
            k--;
        }

        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            List<Integer> tmp = new ArrayList<>();
            for (int c = 0; c < n; c++) {
                tmp.add(grid[r][c]);
            }
            res.add(tmp);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();

        while (k > 0) {
            vector<vector<int>> cur(m, vector<int>(n, 0));

            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n - 1; c++) {
                    cur[r][c + 1] = grid[r][c];
                }
            }

            for (int r = 0; r < m; r++) {
                cur[(r + 1) % m][0] = grid[r][n - 1];
            }

            grid = cur;
            k--;
        }

        return grid;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @param {number} k
     * @return {number[][]}
     */
    shiftGrid(grid, k) {
        const m = grid.length,
            n = grid[0].length;

        while (k > 0) {
            const cur = Array.from({ length: m }, () => Array(n).fill(0));

            for (let r = 0; r < m; r++) {
                for (let c = 0; c < n - 1; c++) {
                    cur[r][c + 1] = grid[r][c];
                }
            }

            for (let r = 0; r < m; r++) {
                cur[(r + 1) % m][0] = grid[r][n - 1];
            }

            grid = cur;
            k--;
        }

        return grid;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows in the grid, $n$ is the number of columns in the grid, and $k$ is the shift count.

---

## 2. Simulation

::tabs-start

```python
class Solution:
    def shiftGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])

        while k:
            prev = grid[m - 1][n - 1]
            for r in range(m):
                for c in range(n):
                    grid[r][c], prev = prev, grid[r][c]
            k -= 1

        return grid
```

```java
public class Solution {
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;

        while (k > 0) {
            int prev = grid[m - 1][n - 1];
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    int temp = grid[r][c];
                    grid[r][c] = prev;
                    prev = temp;
                }
            }
            k--;
        }

        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            List<Integer> tmp = new ArrayList<>();
            for (int c = 0; c < n; c++) {
                tmp.add(grid[r][c]);
            }
            res.add(tmp);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();

        while (k > 0) {
            int prev = grid[m - 1][n - 1];
            for (int r = 0; r < m; r++) {
                for (int c = 0; c < n; c++) {
                    swap(grid[r][c], prev);
                }
            }
            k--;
        }

        return grid;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @param {number} k
     * @return {number[][]}
     */
    shiftGrid(grid, k) {
        const m = grid.length,
            n = grid[0].length;

        while (k > 0) {
            let prev = grid[m - 1][n - 1];
            for (let r = 0; r < m; r++) {
                for (let c = 0; c < n; c++) {
                    [prev, grid[r][c]] = [grid[r][c], prev];
                }
            }
            k--;
        }

        return grid;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(k * m * n)$
- Space complexity: $O(m * n)$ for the output matrix.

> Where $m$ is the number of rows in the grid, $n$ is the number of columns in the grid, and $k$ is the shift count.

---

## 3. Convert to One Dimensional Array

::tabs-start

```python
class Solution:
    def shiftGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        m, n = len(grid), len(grid[0])
        N = m * n
        k %= N

        arr = [0] * N
        for r in range(m):
            for c in range(n):
                arr[r * n + c] = grid[r][c]

        def reverse(l, r):
            while l < r:
                arr[l], arr[r] = arr[r], arr[l]
                l += 1
                r -= 1

        reverse(0, N - 1)
        reverse(0, k - 1)
        reverse(k, N - 1)

        for r in range(m):
            for c in range(n):
                grid[r][c] = arr[r * n + c]

        return grid
```

```java
public class Solution {
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        int m = grid.length, n = grid[0].length;
        int N = m * n;
        k %= N;

        int[] arr = new int[N];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                arr[r * n + c] = grid[r][c];
            }
        }

        reverse(arr, 0, N - 1);
        reverse(arr, 0, k - 1);
        reverse(arr, k, N - 1);

        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < m; r++) {
            List<Integer> tmp = new ArrayList<>();
            for (int c = 0; c < n; c++) {
                tmp.add(arr[r * n + c]);
            }
            res.add(tmp);
        }
        return res;
    }

    private void reverse(int[] arr, int l, int r) {
        while (l < r) {
            int temp = arr[l];
            arr[l] = arr[r];
            arr[r] = temp;
            l++;
            r--;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        int N = m * n;
        k %= N;

        vector<int> arr(N);
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                arr[r * n + c] = grid[r][c];
            }
        }

        reverse(arr.begin(), arr.end());
        reverse(arr.begin(), arr.begin() + k);
        reverse(arr.begin() + k, arr.end());

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                grid[r][c] = arr[r * n + c];
            }
        }

        return grid;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @param {number} k
     * @return {number[][]}
     */
    shiftGrid(grid, k) {
        const m = grid.length,
            n = grid[0].length;
        const N = m * n;
        k %= N;

        const arr = new Array(N);
        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                arr[r * n + c] = grid[r][c];
            }
        }

        const reverse = (l, r) => {
            while (l < r) {
                [arr[l], arr[r]] = [arr[r], arr[l]];
                l++;
                r--;
            }
        };

        reverse(0, N - 1);
        reverse(0, k - 1);
        reverse(k, N - 1);

        for (let r = 0; r < m; r++) {
            for (let c = 0; c < n; c++) {
                grid[r][c] = arr[r * n + c];
            }
        }

        return grid;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows in the grid and $n$ is the number of columns in the grid.

---

## 4. Iteration

::tabs-start

```python
class Solution:
    def shiftGrid(self, grid: List[List[int]], k: int) -> List[List[int]]:
        M, N = len(grid), len(grid[0])

        def posToVal(r, c):
            return r * N + c

        def valToPos(v):
            return [v // N, v % N]

        res = [[0] * N for _ in range(M)]
        for r in range(M):
            for c in range(N):
                newVal = (posToVal(r, c) + k) % (M * N)
                newR, newC = valToPos(newVal)
                res[newR][newC] = grid[r][c]

        return res
```

```java
public class Solution {
    public List<List<Integer>> shiftGrid(int[][] grid, int k) {
        int M = grid.length, N = grid[0].length;
        int[][] arr = new int[M][N];

        for (int r = 0; r < M; r++) {
            for (int c = 0; c < N; c++) {
                int newVal = (r * N + c + k) % (M * N);
                int newR = newVal / N, newC = newVal % N;
                arr[newR][newC] = grid[r][c];
            }
        }

        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < M; r++) {
            List<Integer> tmp = new ArrayList<>();
            for (int c = 0; c < N; c++) {
                tmp.add(arr[r][c]);
            }
            res.add(tmp);
        }
        return res;
    }

}
```

```cpp
class Solution {
public:
    vector<vector<int>> shiftGrid(vector<vector<int>>& grid, int k) {
        int M = grid.size(), N = grid[0].size();
        vector<vector<int>> res(M, vector<int>(N));

        for (int r = 0; r < M; r++) {
            for (int c = 0; c < N; c++) {
                int newVal = (r * N + c + k) % (M * N);
                int newR = newVal / N, newC = newVal % N;
                res[newR][newC] = grid[r][c];
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
     * @param {number} k
     * @return {number[][]}
     */
    shiftGrid(grid, k) {
        const M = grid.length,
            N = grid[0].length;

        const posToVal = (r, c) => r * N + c;
        const valToPos = (v) => [Math.floor(v / N), v % N];

        const res = Array.from({ length: M }, () => Array(N).fill(0));
        for (let r = 0; r < M; r++) {
            for (let c = 0; c < N; c++) {
                const newVal = (posToVal(r, c) + k) % (M * N);
                const [newR, newC] = valToPos(newVal);
                res[newR][newC] = grid[r][c];
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows in the grid and $n$ is the number of columns in the grid.
