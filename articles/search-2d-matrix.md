## 1. Brute Force

### Intuition

The brute force approach simply checks every element in the matrix one by one.  
Since the matrix is sorted but we’re ignoring that structure, we just scan through all rows and all columns until we either find the target or finish searching.

### Algorithm

1. Loop through every row in the matrix.
2. For each row, loop through every column.
3. If the current element equals the target, return `True`.
4. After scanning the entire matrix, return `False` if the target was not found.

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

```swift
class Solution {
    func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {
        for r in 0..<matrix.count {
            for c in 0..<matrix[0].count {
                if matrix[r][c] == target {
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

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.

---

## 2. Staircase Search

### Intuition

Since each row is sorted left-to-right **and** each column is sorted top-to-bottom, we can search smartly instead of checking every cell.

Start at the **top-right corner**:

- If the current value is **greater** than the target → move **left** (values decrease).
- If it is **smaller** than the target → move **down** (values increase).

This works like walking down a staircase—each step eliminates an entire row or column.  
We keep moving until we either find the target or move out of bounds.

### Algorithm

1. Let `r = 0` (first row) and `c = n - 1` (last column).
2. While `r` is within bounds and `c` is within bounds:
   - If `matrix[r][c] == target`, return `True`.
   - If the value is **greater** than the target, move **left** (`c -= 1`).
   - If the value is **smaller**, move **down** (`r += 1`).
3. If we exit the matrix, the target is not found → return `False`.

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
        const m = matrix.length,
            n = matrix[0].length;
        let r = 0,
            c = n - 1;

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

```swift
class Solution {
    func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {
        let m = matrix.count
        let n = matrix[0].count
        var r = 0, c = n - 1

        while r < m && c >= 0 {
            if matrix[r][c] > target {
                c -= 1
            } else if matrix[r][c] < target {
                r += 1
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

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.

---

## 3. Binary Search

### Intuition

Because each row of the matrix is sorted, and the rows themselves are sorted by their first and last elements, we can apply **binary search twice**:

1. **First search over the rows**  
   We find the single row where the target *could* exist by comparing the target with the row’s first and last elements.  
   Binary search helps us quickly narrow down to that one row.

2. **Then search inside that row**  
   Once the correct row is found, we perform a normal binary search within that row to check if the target is present.

This eliminates large portions of the matrix at each step and uses the sorted structure fully.

---

### Algorithm

1. Set `top = 0` and `bot = ROWS - 1`.
2. Binary search over the rows:
   - Let `row = (top + bot) // 2`.
   - If the target is greater than the last element of this row → move down (`top = row + 1`).
   - If the target is smaller than the first element → move up (`bot = row - 1`).
   - Otherwise → the target must be in this row; stop.
3. If no valid row is found, return `False`.
4. Now binary search within the identified row:
   - Use standard binary search to look for the target.
5. Return `True` if found, otherwise `False`.

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

```swift
class Solution {
    func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {
        let ROWS = matrix.count
        let COLS = matrix[0].count

        var top = 0, bot = ROWS - 1
        while top <= bot {
            let row = (top + bot) / 2
            if target > matrix[row][COLS - 1] {
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
        let row = (top + bot) / 2
        var l = 0, r = COLS - 1
        while l <= r {
            let m = (l + r) / 2
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
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log m + \log n)$ (which reduces to $O(\log(m * n))$)
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.

---

## 4. Binary Search (One Pass)

### Intuition

Because the matrix is sorted row-wise and each row is sorted left-to-right, the entire matrix behaves like **one big sorted array**.  
If we imagine flattening the matrix into a single list, the order of elements doesn’t change.

This means we can run **one binary search** from index `0` to `ROWS * COLS - 1`.  
For any mid index `m`, we can map it back to the matrix using:

- `row = m // COLS`
- `col = m % COLS`

This lets us access the correct matrix element without actually flattening the matrix.

---

### Algorithm

1. Treat the matrix as a single sorted array of size `ROWS * COLS`.
2. Set `l = 0` and `r = ROWS * COLS - 1`.
3. While `l <= r`:
   - Compute the middle index `m = (l + r) // 2`.
   - Convert `m` back to matrix coordinates:
     - `row = m // COLS`
     - `col = m % COLS`
   - Compare `matrix[row][col]` with the target:
     - If equal → return `True`.
     - If the value is smaller → search the right half (`l = m + 1`).
     - If larger → search the left half (`r = m - 1`).
4. If the loop ends with no match, return `False`.

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
        let ROWS = matrix.length,
            COLS = matrix[0].length;

        let l = 0,
            r = ROWS * COLS - 1;
        while (l <= r) {
            let m = l + Math.floor((r - l) / 2);
            let row = Math.floor(m / COLS),
                col = m % COLS;
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

```swift
class Solution {
    func searchMatrix(_ matrix: [[Int]], _ target: Int) -> Bool {
        let ROWS = matrix.count
        let COLS = matrix[0].count

        var l = 0, r = ROWS * COLS - 1
        while l <= r {
            let m = l + (r - l) / 2
            let row = m / COLS
            let col = m % COLS

            if target > matrix[row][col] {
                l = m + 1
            } else if target < matrix[row][col] {
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

- Time complexity: $O(\log(m * n))$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns of matrix.
