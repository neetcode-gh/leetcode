## 1. Simulation (Extra Space)

### Intuition

Shifting a 2D grid is like rotating all elements forward by one position. Each element moves to the next column, and elements at the end of a row wrap around to the start of the next row. The last element of the grid wraps to position (0, 0).

By simulating this process k times, we can achieve the desired result. For each shift, we copy each element to its new position in a fresh grid.

### Algorithm

1. For each shift iteration (k times):
   - Create a new grid `cur` filled with zeros.
   - Copy each element from column `c` to column `c + 1` in the same row.
   - Handle the last column separately: element at `(r, n-1)` wraps to `((r + 1) % m, 0)`.
   - Replace the original grid with `cur`.
2. Return the final grid after all shifts.

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

```csharp
public class Solution {
    public IList<IList<int>> ShiftGrid(int[][] grid, int k) {
        int m = grid.Length, n = grid[0].Length;

        while (k > 0) {
            int[][] cur = new int[m][];
            for (int i = 0; i < m; i++) {
                cur[i] = new int[n];
            }

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

        IList<IList<int>> res = new List<IList<int>>();
        for (int r = 0; r < m; r++) {
            res.Add(new List<int>(grid[r]));
        }
        return res;
    }
}
```

```go
func shiftGrid(grid [][]int, k int) [][]int {
    m, n := len(grid), len(grid[0])

    for k > 0 {
        cur := make([][]int, m)
        for i := range cur {
            cur[i] = make([]int, n)
        }

        for r := 0; r < m; r++ {
            for c := 0; c < n-1; c++ {
                cur[r][c+1] = grid[r][c]
            }
        }

        for r := 0; r < m; r++ {
            cur[(r+1)%m][0] = grid[r][n-1]
        }

        grid = cur
        k--
    }

    return grid
}
```

```kotlin
class Solution {
    fun shiftGrid(grid: Array<IntArray>, k: Int): List<List<Int>> {
        var grid = grid
        var k = k
        val m = grid.size
        val n = grid[0].size

        while (k > 0) {
            val cur = Array(m) { IntArray(n) }

            for (r in 0 until m) {
                for (c in 0 until n - 1) {
                    cur[r][c + 1] = grid[r][c]
                }
            }

            for (r in 0 until m) {
                cur[(r + 1) % m][0] = grid[r][n - 1]
            }

            grid = cur
            k--
        }

        return grid.map { it.toList() }
    }
}
```

```swift
class Solution {
    func shiftGrid(_ grid: [[Int]], _ k: Int) -> [[Int]] {
        var grid = grid
        var k = k
        let m = grid.count
        let n = grid[0].count

        while k > 0 {
            var cur = [[Int]](repeating: [Int](repeating: 0, count: n), count: m)

            for r in 0..<m {
                for c in 0..<(n - 1) {
                    cur[r][c + 1] = grid[r][c]
                }
            }

            for r in 0..<m {
                cur[(r + 1) % m][0] = grid[r][n - 1]
            }

            grid = cur
            k -= 1
        }

        return grid
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

### Intuition

Instead of creating a new grid each time, we can shift elements in place. The key insight is that shifting works like a rotation: each element takes the place of the previous one. By keeping track of the last element (which wraps to the first position), we can propagate values through the entire grid in a single pass.

### Algorithm

1. For each shift iteration (k times):
   - Store the last element `grid[m-1][n-1]` as `prev`.
   - Traverse the grid row by row, column by column.
   - At each cell, swap the current element with `prev`.
   - This naturally propagates each element to the next position.
2. Return the grid after all shifts.

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

```csharp
public class Solution {
    public IList<IList<int>> ShiftGrid(int[][] grid, int k) {
        int m = grid.Length, n = grid[0].Length;

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

        IList<IList<int>> res = new List<IList<int>>();
        for (int r = 0; r < m; r++) {
            res.Add(new List<int>(grid[r]));
        }
        return res;
    }
}
```

```go
func shiftGrid(grid [][]int, k int) [][]int {
    m, n := len(grid), len(grid[0])

    for k > 0 {
        prev := grid[m-1][n-1]
        for r := 0; r < m; r++ {
            for c := 0; c < n; c++ {
                grid[r][c], prev = prev, grid[r][c]
            }
        }
        k--
    }

    return grid
}
```

```kotlin
class Solution {
    fun shiftGrid(grid: Array<IntArray>, k: Int): List<List<Int>> {
        var k = k
        val m = grid.size
        val n = grid[0].size

        while (k > 0) {
            var prev = grid[m - 1][n - 1]
            for (r in 0 until m) {
                for (c in 0 until n) {
                    val temp = grid[r][c]
                    grid[r][c] = prev
                    prev = temp
                }
            }
            k--
        }

        return grid.map { it.toList() }
    }
}
```

```swift
class Solution {
    func shiftGrid(_ grid: [[Int]], _ k: Int) -> [[Int]] {
        var grid = grid
        var k = k
        let m = grid.count
        let n = grid[0].count

        while k > 0 {
            var prev = grid[m - 1][n - 1]
            for r in 0..<m {
                for c in 0..<n {
                    let temp = grid[r][c]
                    grid[r][c] = prev
                    prev = temp
                }
            }
            k -= 1
        }

        return grid
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

### Intuition

A 2D grid can be viewed as a 1D array if we flatten it row by row. Shifting in a 1D array is simply rotating elements to the right. The classic way to rotate an array by k positions is to use three reversals: reverse the entire array, then reverse the first k elements, then reverse the remaining elements.

### Algorithm

1. Flatten the 2D grid into a 1D array `arr` where `arr[r * n + c] = grid[r][c]`.
2. Reduce `k` by taking `k % N` (where `N = m * n`) to avoid unnecessary full rotations.
3. Reverse the entire array.
4. Reverse the first `k` elements.
5. Reverse the remaining elements from index `k` to `N-1`.
6. Map the 1D array back to the 2D grid.
7. Return the result.

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

```csharp
public class Solution {
    public IList<IList<int>> ShiftGrid(int[][] grid, int k) {
        int m = grid.Length, n = grid[0].Length;
        int N = m * n;
        k %= N;

        int[] arr = new int[N];
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                arr[r * n + c] = grid[r][c];
            }
        }

        Reverse(arr, 0, N - 1);
        Reverse(arr, 0, k - 1);
        Reverse(arr, k, N - 1);

        IList<IList<int>> res = new List<IList<int>>();
        for (int r = 0; r < m; r++) {
            List<int> row = new List<int>();
            for (int c = 0; c < n; c++) {
                row.Add(arr[r * n + c]);
            }
            res.Add(row);
        }
        return res;
    }

    private void Reverse(int[] arr, int l, int r) {
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

```go
func shiftGrid(grid [][]int, k int) [][]int {
    m, n := len(grid), len(grid[0])
    N := m * n
    k %= N

    arr := make([]int, N)
    for r := 0; r < m; r++ {
        for c := 0; c < n; c++ {
            arr[r*n+c] = grid[r][c]
        }
    }

    reverse := func(l, r int) {
        for l < r {
            arr[l], arr[r] = arr[r], arr[l]
            l++
            r--
        }
    }

    reverse(0, N-1)
    reverse(0, k-1)
    reverse(k, N-1)

    for r := 0; r < m; r++ {
        for c := 0; c < n; c++ {
            grid[r][c] = arr[r*n+c]
        }
    }

    return grid
}
```

```kotlin
class Solution {
    fun shiftGrid(grid: Array<IntArray>, k: Int): List<List<Int>> {
        val m = grid.size
        val n = grid[0].size
        val N = m * n
        var k = k % N

        val arr = IntArray(N)
        for (r in 0 until m) {
            for (c in 0 until n) {
                arr[r * n + c] = grid[r][c]
            }
        }

        fun reverse(l: Int, r: Int) {
            var left = l
            var right = r
            while (left < right) {
                val temp = arr[left]
                arr[left] = arr[right]
                arr[right] = temp
                left++
                right--
            }
        }

        reverse(0, N - 1)
        reverse(0, k - 1)
        reverse(k, N - 1)

        for (r in 0 until m) {
            for (c in 0 until n) {
                grid[r][c] = arr[r * n + c]
            }
        }

        return grid.map { it.toList() }
    }
}
```

```swift
class Solution {
    func shiftGrid(_ grid: [[Int]], _ k: Int) -> [[Int]] {
        var grid = grid
        let m = grid.count
        let n = grid[0].count
        let N = m * n
        let k = k % N

        var arr = [Int](repeating: 0, count: N)
        for r in 0..<m {
            for c in 0..<n {
                arr[r * n + c] = grid[r][c]
            }
        }

        func reverse(_ l: Int, _ r: Int) {
            var l = l, r = r
            while l < r {
                arr.swapAt(l, r)
                l += 1
                r -= 1
            }
        }

        reverse(0, N - 1)
        reverse(0, k - 1)
        reverse(k, N - 1)

        for r in 0..<m {
            for c in 0..<n {
                grid[r][c] = arr[r * n + c]
            }
        }

        return grid
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

### Intuition

Instead of actually shifting elements, we can compute where each element should go after k shifts. The position of an element in a flattened grid is `r * n + c`. After k shifts, this becomes `(r * n + c + k) % (m * n)`. We can then convert this back to 2D coordinates.

This approach processes each element exactly once, computing its final position directly.

### Algorithm

1. Create a result grid of the same dimensions.
2. For each cell `(r, c)`:
   - Compute the new flattened position: `newVal = (r * n + c + k) % (m * n)`.
   - Convert back to 2D: `newR = newVal / n`, `newC = newVal % n`.
   - Place the original value at the new position: `res[newR][newC] = grid[r][c]`.
3. Return the result grid.

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

```csharp
public class Solution {
    public IList<IList<int>> ShiftGrid(int[][] grid, int k) {
        int M = grid.Length, N = grid[0].Length;
        int[][] arr = new int[M][];
        for (int i = 0; i < M; i++) {
            arr[i] = new int[N];
        }

        for (int r = 0; r < M; r++) {
            for (int c = 0; c < N; c++) {
                int newVal = (r * N + c + k) % (M * N);
                int newR = newVal / N, newC = newVal % N;
                arr[newR][newC] = grid[r][c];
            }
        }

        IList<IList<int>> res = new List<IList<int>>();
        for (int r = 0; r < M; r++) {
            res.Add(new List<int>(arr[r]));
        }
        return res;
    }
}
```

```go
func shiftGrid(grid [][]int, k int) [][]int {
    M, N := len(grid), len(grid[0])

    res := make([][]int, M)
    for i := range res {
        res[i] = make([]int, N)
    }

    for r := 0; r < M; r++ {
        for c := 0; c < N; c++ {
            newVal := (r*N + c + k) % (M * N)
            newR, newC := newVal/N, newVal%N
            res[newR][newC] = grid[r][c]
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun shiftGrid(grid: Array<IntArray>, k: Int): List<List<Int>> {
        val M = grid.size
        val N = grid[0].size

        val res = Array(M) { IntArray(N) }
        for (r in 0 until M) {
            for (c in 0 until N) {
                val newVal = (r * N + c + k) % (M * N)
                val newR = newVal / N
                val newC = newVal % N
                res[newR][newC] = grid[r][c]
            }
        }

        return res.map { it.toList() }
    }
}
```

```swift
class Solution {
    func shiftGrid(_ grid: [[Int]], _ k: Int) -> [[Int]] {
        let M = grid.count
        let N = grid[0].count

        var res = [[Int]](repeating: [Int](repeating: 0, count: N), count: M)
        for r in 0..<M {
            for c in 0..<N {
                let newVal = (r * N + c + k) % (M * N)
                let newR = newVal / N
                let newC = newVal % N
                res[newR][newC] = grid[r][c]
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows in the grid and $n$ is the number of columns in the grid.
