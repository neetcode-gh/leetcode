## 1. Brute Force

::tabs-start

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        for r in range(len(matrix)):
            for c in range(len(matrix[0])):
                if matrix[r][c] == target:
                    return True
        return False
```

```java
public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        for (int r = 0; r < matrix.length; r++) {
            for (int c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == target) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        for (int r = 0; r < matrix.size(); r++) {
            for (int c = 0; c < matrix[r].size(); c++) {
                if (matrix[r][c] == target) {
                    return true;
                }
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        for (let r = 0; r < matrix.length; r++) {
            for (let c = 0; c < matrix[r].length; c++) {
                if (matrix[r][c] == target) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool SearchMatrix(int[][] matrix, int target) {
        for (int r = 0; r < matrix.Length; r++) {
            for (int c = 0; c < matrix[r].Length; c++) {
                if (matrix[r][c] == target) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func searchMatrix(matrix [][]int, target int) bool {
    for _, row := range matrix {
        for _, value := range row {
            if value == target {
                return true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun searchMatrix(matrix: Array<IntArray>, target: Int): Boolean {
        for (row in matrix) {
            for (value in row) {
                if (value == target) {
                    return true
                }
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.

---

## 2. Staircase Search

::tabs-start

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        m, n = len(matrix), len(matrix[0])
        r, c = 0, n - 1

        while r < m and c >= 0:
            if matrix[r][c] > target:
                c -= 1
            elif matrix[r][c] < target:
                r += 1
            else:
                return True
        return False
```

```java
public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int r = 0, c = n - 1;

        while (r < m && c >= 0) {
            if (matrix[r][c] > target) {
                c--;
            } else if (matrix[r][c] < target) {
                r++;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int r = 0, c = n - 1;

        while (r < m && c >= 0) {
            if (matrix[r][c] > target) {
                c--;
            } else if (matrix[r][c] < target) {
                r++;
            } else {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        const m = matrix.length, n = matrix[0].length;
        let r = 0, c = n - 1;

        while (r < m && c >= 0) {
            if (matrix[r][c] > target) {
                c--;
            } else if (matrix[r][c] < target) {
                r++;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool SearchMatrix(int[][] matrix, int target) {
        int m = matrix.Length, n = matrix[0].Length;
        int r = 0, c = n - 1;

        while (r < m && c >= 0) {
            if (matrix[r][c] > target) {
                c--;
            } else if (matrix[r][c] < target) {
                r++;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```go
func searchMatrix(matrix [][]int, target int) bool {
    m, n := len(matrix), len(matrix[0])
    r, c := 0, n - 1

    for r < m && c >= 0 {
        if matrix[r][c] > target {
            c--
        } else if matrix[r][c] < target {
            r++
        } else {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun searchMatrix(matrix: Array<IntArray>, target: Int): Boolean {
        val m = matrix.size
        val n = matrix[0].size
        var r = 0
        var c = n - 1

        while (r < m && c >= 0) {
            if (matrix[r][c] > target) {
                c--
            } else if (matrix[r][c] < target) {
                r++
            } else {
                return true
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m + n)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.

---

## 3. Binary Search

::tabs-start

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        ROWS, COLS = len(matrix), len(matrix[0])

        top, bot = 0, ROWS - 1
        while top <= bot:
            row = (top + bot) // 2
            if target > matrix[row][-1]:
                top = row + 1
            elif target < matrix[row][0]:
                bot = row - 1
            else:
                break

        if not (top <= bot):
            return False
        row = (top + bot) // 2
        l, r = 0, COLS - 1
        while l <= r:
            m = (l + r) // 2
            if target > matrix[row][m]:
                l = m + 1
            elif target < matrix[row][m]:
                r = m - 1
            else:
                return True
        return False
```

```java
public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int ROWS = matrix.length;
        int COLS = matrix[0].length;

        int top = 0, bot = ROWS - 1;
        while (top <= bot) {
            int row = (top + bot) / 2;
            if (target > matrix[row][COLS - 1]) {
                top = row + 1;
            } else if (target < matrix[row][0]) {
                bot = row - 1;
            } else {
                break;
            }
        }

        if (!(top <= bot)) {
            return false;
        }
        int row = (top + bot) / 2;
        int l = 0, r = COLS - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (target > matrix[row][m]) {
                l = m + 1;
            } else if (target < matrix[row][m]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int ROWS = matrix.size();
        int COLS = matrix[0].size();

        int top = 0, bot = ROWS - 1;
        while (top <= bot) {
            int row = (top + bot) / 2;
            if (target > matrix[row][COLS - 1]) {
                top = row + 1;
            } else if (target < matrix[row][0]) {
                bot = row - 1;
            } else {
                break;
            }
        }

        if (!(top <= bot)) {
            return false;
        }
        int row = (top + bot) / 2;
        int l = 0, r = COLS - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (target > matrix[row][m]) {
                l = m + 1;
            } else if (target < matrix[row][m]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        const ROWS = matrix.length;
        const COLS = matrix[0].length;

        let top = 0;
        let bot = ROWS - 1;
        while (top <= bot) {
            const row = Math.floor((top + bot) / 2);
            if (target > matrix[row][COLS - 1]) {
                top = row + 1;
            } else if (target < matrix[row][0]) {
                bot = row - 1;
            } else {
                break;
            }
        }

        if (!(top <= bot)) {
            return false;
        }
        const row = Math.floor((top + bot) / 2);
        let l = 0;
        let r = COLS - 1;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            if (target > matrix[row][m]) {
                l = m + 1;
            } else if (target < matrix[row][m]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool SearchMatrix(int[][] matrix, int target) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;

        int top = 0, bot = ROWS - 1;
        int row = 0;
        while (top <= bot) {
            row = (top + bot) / 2;
            if (target > matrix[row][COLS - 1]) {
                top = row + 1;
            }
            else if (target < matrix[row][0]) {
                bot = row - 1;
            }
            else {
                break;
            }
        }

        if (!(top <= bot)) {
            return false;
        }

        int l = 0, r = COLS - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (target > matrix[row][m]) {
                l = m + 1;
            }
            else if (target < matrix[row][m]) {
                r = m - 1;
            }
            else {
                return true;
            }
        }
        return false;
    }
}
```

```go
func searchMatrix(matrix [][]int, target int) bool {
    rows, cols := len(matrix), len(matrix[0])
    top, bot := 0, rows - 1

    for top <= bot {
        row := (top + bot) / 2
        if target > matrix[row][cols-1] {
            top = row + 1
        } else if target < matrix[row][0] {
            bot = row - 1
        } else {
            break
        }
    }

    if !(top <= bot) {
        return false
    }
    row := (top + bot) / 2
    l, r := 0, cols - 1
    for l <= r {
        m := (l + r) / 2
        if target > matrix[row][m] {
            l = m + 1
        } else if target < matrix[row][m] {
            r = m - 1
        } else {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun searchMatrix(matrix: Array<IntArray>, target: Int): Boolean {
        val rows = matrix.size
        val cols = matrix[0].size
        var top = 0
        var bot = rows - 1

        while (top <= bot) {
            val row = (top + bot) / 2
            if (target > matrix[row][cols - 1]) {
                top = row + 1
            } else if (target < matrix[row][0]) {
                bot = row - 1
            } else {
                break
            }
        }

        if (!(top <= bot)) return false
        val row = (top + bot) / 2
        var l = 0
        var r = cols - 1
        while (l <= r) {
            val m = (l + r) / 2
            if (target > matrix[row][m]) {
                l = m + 1
            } else if (target < matrix[row][m]) {
                r = m - 1
            } else {
                return true
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log m + \log n)$ (which reduces to $O(\log(m * n))$)
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.

---

## 4. Binary Search (One Pass)

::tabs-start

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        ROWS, COLS = len(matrix), len(matrix[0])

        l, r = 0, ROWS * COLS - 1
        while l <= r:
            m = l + (r - l) // 2
            row, col = m // COLS, m % COLS
            if target > matrix[row][col]:
                l = m + 1
            elif target < matrix[row][col]:
                r = m - 1
            else:
                return True
        return False
```

```java
public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int ROWS = matrix.length, COLS = matrix[0].length;

        int l = 0, r = ROWS * COLS - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            int row = m / COLS, col = m % COLS;
            if (target > matrix[row][col]) {
                l = m + 1;
            } else if (target < matrix[row][col]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int ROWS = matrix.size(), COLS = matrix[0].size();

        int l = 0, r = ROWS * COLS - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            int row = m / COLS, col = m % COLS;
            if (target > matrix[row][col]) {
                l = m + 1;
            } else if (target < matrix[row][col]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    searchMatrix(matrix, target) {
        let ROWS = matrix.length, COLS = matrix[0].length;

        let l = 0, r = ROWS * COLS - 1;
        while (l <= r) {
            let m = l + Math.floor((r - l) / 2);
            let row = Math.floor(m / COLS), col = m % COLS;
            if (target > matrix[row][col]) {
                l = m + 1;
            } else if (target < matrix[row][col]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool SearchMatrix(int[][] matrix, int target) {
        int ROWS = matrix.Length, COLS = matrix[0].Length;

        int l = 0, r = ROWS * COLS - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            int row = m / COLS, col = m % COLS;
            if (target > matrix[row][col]) {
                l = m + 1;
            } else if (target < matrix[row][col]) {
                r = m - 1;
            } else {
                return true;
            }
        }
        return false;
    }
}
```

```go
func searchMatrix(matrix [][]int, target int) bool {
    rows, cols := len(matrix), len(matrix[0])
    l, r := 0, rows*cols-1

    for l <= r {
        m := l + (r-l)/2
        row, col := m / cols, m % cols
        if matrix[row][col] == target {
            return true
        } else if matrix[row][col] < target {
            l = m + 1
        } else {
            r = m - 1
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun searchMatrix(matrix: Array<IntArray>, target: Int): Boolean {
        val rows = matrix.size
        val cols = matrix[0].size
        var l = 0
        var r = rows * cols - 1

        while (l <= r) {
            val m = l + (r - l) / 2
            val row = m / cols
            val col = m % cols
            if (matrix[row][col] == target) {
                return true
            } else if (matrix[row][col] < target) {
                l = m + 1
            } else {
                r = m - 1
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log(m * n))$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.