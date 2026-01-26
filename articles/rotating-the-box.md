## Prerequisites
Before attempting this problem, you should be comfortable with:
- **2D Array Manipulation** - Working with grids, understanding row and column indexing
- **Two Pointers Technique** - Using a pointer to track the next available position while iterating through elements
- **Gravity Simulation** - Moving elements (stones) toward a direction until they hit an obstacle or boundary
- **Matrix Rotation** - Transforming coordinates from original position (r,c) to rotated position for 90-degree clockwise rotation

---

## 1. Brute Force

### Intuition

When the `box` is rotated 90 degrees clockwise, gravity pulls stones downward in the new orientation. Before rotation, rows become columns, so stones in each row should fall to the right (toward the end of the row). We simulate gravity by moving each stone as far right as possible until it hits another stone, an obstacle, or the boundary. After simulating gravity, we perform the rotation by transposing and reversing the row order.

### Algorithm

1. For each row, iterate from right to left.
2. When a stone `#` is found, scan rightward to find the farthest empty cell `.` before hitting an obstacle `*` or boundary.
3. Move the stone to that position.
4. After processing all rows, create the rotated `grid`:
   - The new `grid` has `COLS` rows and `ROWS` columns.
   - For each column `c` in the original `grid`, the new row at index `c` contains elements from bottom to top of that column.
5. Return the rotated `grid`.

::tabs-start

```python
class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[List[str]]:
        ROWS, COLS = len(boxGrid), len(boxGrid[0])

        for r in range(ROWS - 1, -1, -1):
            for c1 in range(COLS - 1, -1, -1):
                if boxGrid[r][c1] == '#':
                    c2 = c1 + 1
                    while c2 < COLS and boxGrid[r][c2] == '.':
                        c2 += 1

                    boxGrid[r][c1] = '.'
                    boxGrid[r][c2 - 1] = '#'


        res = []
        for c in range(COLS):
            col = []
            for r in range(ROWS - 1, -1, -1):
                col.append(boxGrid[r][c])
            res.append(col)
        return res
```

```java
public class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.length, COLS = boxGrid[0].length;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = COLS - 1; c1 >= 0; c1--) {
                if (boxGrid[r][c1] == '#') {
                    int c2 = c1 + 1;
                    while (c2 < COLS && boxGrid[r][c2] == '.') {
                        c2++;
                    }
                    boxGrid[r][c1] = '.';
                    boxGrid[r][c2 - 1] = '#';
                }
            }
        }

        char[][] res = new char[COLS][ROWS];
        for (int c = 0; c < COLS; c++) {
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& boxGrid) {
        int ROWS = boxGrid.size(), COLS = boxGrid[0].size();

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = COLS - 1; c1 >= 0; c1--) {
                if (boxGrid[r][c1] == '#') {
                    int c2 = c1 + 1;
                    while (c2 < COLS && boxGrid[r][c2] == '.') {
                        c2++;
                    }
                    boxGrid[r][c1] = '.';
                    boxGrid[r][c2 - 1] = '#';
                }
            }
        }

        vector<vector<char>> res(COLS, vector<char>(ROWS));
        for (int c = 0; c < COLS; c++) {
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} boxGrid
     * @return {character[][]}
     */
    rotateTheBox(boxGrid) {
        const ROWS = boxGrid.length,
            COLS = boxGrid[0].length;
        const res = Array.from({ length: COLS }, () => Array(ROWS).fill('.'));
        for (let r = 0; r < ROWS; r++) {
            let i = COLS - 1;
            for (let c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] === '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] === '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public char[][] RotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.Length, COLS = boxGrid[0].Length;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = COLS - 1; c1 >= 0; c1--) {
                if (boxGrid[r][c1] == '#') {
                    int c2 = c1 + 1;
                    while (c2 < COLS && boxGrid[r][c2] == '.') {
                        c2++;
                    }
                    boxGrid[r][c1] = '.';
                    boxGrid[r][c2 - 1] = '#';
                }
            }
        }

        char[][] res = new char[COLS][];
        for (int c = 0; c < COLS; c++) {
            res[c] = new char[ROWS];
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

```go
func rotateTheBox(boxGrid [][]byte) [][]byte {
    ROWS, COLS := len(boxGrid), len(boxGrid[0])

    for r := ROWS - 1; r >= 0; r-- {
        for c1 := COLS - 1; c1 >= 0; c1-- {
            if boxGrid[r][c1] == '#' {
                c2 := c1 + 1
                for c2 < COLS && boxGrid[r][c2] == '.' {
                    c2++
                }
                boxGrid[r][c1] = '.'
                boxGrid[r][c2-1] = '#'
            }
        }
    }

    res := make([][]byte, COLS)
    for c := 0; c < COLS; c++ {
        res[c] = make([]byte, ROWS)
        for r := ROWS - 1; r >= 0; r-- {
            res[c][ROWS-1-r] = boxGrid[r][c]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun rotateTheBox(boxGrid: Array<CharArray>): Array<CharArray> {
        val ROWS = boxGrid.size
        val COLS = boxGrid[0].size

        for (r in ROWS - 1 downTo 0) {
            for (c1 in COLS - 1 downTo 0) {
                if (boxGrid[r][c1] == '#') {
                    var c2 = c1 + 1
                    while (c2 < COLS && boxGrid[r][c2] == '.') {
                        c2++
                    }
                    boxGrid[r][c1] = '.'
                    boxGrid[r][c2 - 1] = '#'
                }
            }
        }

        val res = Array(COLS) { CharArray(ROWS) }
        for (c in 0 until COLS) {
            for (r in ROWS - 1 downTo 0) {
                res[c][ROWS - 1 - r] = boxGrid[r][c]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func rotateTheBox(_ box: [[Character]]) -> [[Character]] {
        var boxGrid = box
        let ROWS = boxGrid.count
        let COLS = boxGrid[0].count

        for r in stride(from: ROWS - 1, through: 0, by: -1) {
            for c1 in stride(from: COLS - 1, through: 0, by: -1) {
                if boxGrid[r][c1] == "#" {
                    var c2 = c1 + 1
                    while c2 < COLS && boxGrid[r][c2] == "." {
                        c2 += 1
                    }
                    boxGrid[r][c1] = "."
                    boxGrid[r][c2 - 1] = "#"
                }
            }
        }

        var res = [[Character]](repeating: [Character](repeating: ".", count: ROWS), count: COLS)
        for c in 0..<COLS {
            for r in stride(from: ROWS - 1, through: 0, by: -1) {
                res[c][ROWS - 1 - r] = boxGrid[r][c]
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n ^ 2)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Two Pointers - I

### Intuition

Instead of scanning rightward for each stone, we can use a two-pointer technique. Maintain a pointer `i` that tracks the rightmost available position for a stone. Scan from right to left: when we see a stone, swap it with position `i` and decrement `i`. When we see an obstacle, reset `i` to just before the obstacle. This avoids redundant scanning and processes each cell at most twice.

### Algorithm

1. For each row, initialize pointer `i` to `COLS - 1` (rightmost position).
2. Iterate from right to left through the row:
   - If the cell is a stone `#`, swap it with position `i`, then decrement `i`.
   - If the cell is an obstacle `*`, reset `i` to `c - 1` (just before the obstacle).
3. After processing all rows, construct the rotated `grid` by mapping each column of the original to a row in the result (reading bottom to top).
4. Return the rotated `grid`.

::tabs-start

```python
class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[List[str]]:
        ROWS, COLS = len(boxGrid), len(boxGrid[0])

        for r in range(ROWS):
            i = COLS - 1
            for c in reversed(range(COLS)):
                if boxGrid[r][c] == "#":
                    boxGrid[r][c], boxGrid[r][i] = boxGrid[r][i], boxGrid[r][c]
                    i -= 1
                elif boxGrid[r][c] == "*":
                    i = c - 1

        res = []
        for c in range(COLS):
            col = []  # this is a row after rotation
            for r in reversed(range(ROWS)):
                col.append(boxGrid[r][c])
            res.append(col)

        return res
```

```java
public class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.length, COLS = boxGrid[0].length;
        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    char tmp = boxGrid[r][c];
                    boxGrid[r][c] = boxGrid[r][i];
                    boxGrid[r][i] = tmp;
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    i = c - 1;
                }
            }
        }
        char[][] res = new char[COLS][ROWS];
        for (int c = 0; c < COLS; c++) {
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& boxGrid) {
        int ROWS = boxGrid.size(), COLS = boxGrid[0].size();
        for (int r = 0; r < ROWS; ++r) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; --c) {
                if (boxGrid[r][c] == '#') {
                    swap(boxGrid[r][c], boxGrid[r][i]);
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    i = c - 1;
                }
            }
        }
        vector<vector<char>> res(COLS, vector<char>(ROWS));
        for (int c = 0; c < COLS; ++c) {
            for (int r = ROWS - 1; r >= 0; --r) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} boxGrid
     * @return {character[][]}
     */
    rotateTheBox(boxGrid) {
        const ROWS = boxGrid.length,
            COLS = boxGrid[0].length;
        for (let r = 0; r < ROWS; r++) {
            let i = COLS - 1;
            for (let c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] === '#') {
                    [boxGrid[r][c], boxGrid[r][i]] = [
                        boxGrid[r][i],
                        boxGrid[r][c],
                    ];
                    i--;
                } else if (boxGrid[r][c] === '*') {
                    i = c - 1;
                }
            }
        }
        const res = [];
        for (let c = 0; c < COLS; c++) {
            const row = [];
            for (let r = ROWS - 1; r >= 0; r--) {
                row.push(boxGrid[r][c]);
            }
            res.push(row);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public char[][] RotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.Length, COLS = boxGrid[0].Length;
        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    char tmp = boxGrid[r][c];
                    boxGrid[r][c] = boxGrid[r][i];
                    boxGrid[r][i] = tmp;
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    i = c - 1;
                }
            }
        }
        char[][] res = new char[COLS][];
        for (int c = 0; c < COLS; c++) {
            res[c] = new char[ROWS];
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

```go
func rotateTheBox(boxGrid [][]byte) [][]byte {
    ROWS, COLS := len(boxGrid), len(boxGrid[0])
    for r := 0; r < ROWS; r++ {
        i := COLS - 1
        for c := COLS - 1; c >= 0; c-- {
            if boxGrid[r][c] == '#' {
                boxGrid[r][c], boxGrid[r][i] = boxGrid[r][i], boxGrid[r][c]
                i--
            } else if boxGrid[r][c] == '*' {
                i = c - 1
            }
        }
    }
    res := make([][]byte, COLS)
    for c := 0; c < COLS; c++ {
        res[c] = make([]byte, ROWS)
        for r := ROWS - 1; r >= 0; r-- {
            res[c][ROWS-1-r] = boxGrid[r][c]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun rotateTheBox(boxGrid: Array<CharArray>): Array<CharArray> {
        val ROWS = boxGrid.size
        val COLS = boxGrid[0].size
        for (r in 0 until ROWS) {
            var i = COLS - 1
            for (c in COLS - 1 downTo 0) {
                if (boxGrid[r][c] == '#') {
                    val tmp = boxGrid[r][c]
                    boxGrid[r][c] = boxGrid[r][i]
                    boxGrid[r][i] = tmp
                    i--
                } else if (boxGrid[r][c] == '*') {
                    i = c - 1
                }
            }
        }
        val res = Array(COLS) { CharArray(ROWS) }
        for (c in 0 until COLS) {
            for (r in ROWS - 1 downTo 0) {
                res[c][ROWS - 1 - r] = boxGrid[r][c]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func rotateTheBox(_ box: [[Character]]) -> [[Character]] {
        var boxGrid = box
        let ROWS = boxGrid.count
        let COLS = boxGrid[0].count
        for r in 0..<ROWS {
            var i = COLS - 1
            for c in stride(from: COLS - 1, through: 0, by: -1) {
                if boxGrid[r][c] == "#" {
                    let tmp = boxGrid[r][c]
                    boxGrid[r][c] = boxGrid[r][i]
                    boxGrid[r][i] = tmp
                    i -= 1
                } else if boxGrid[r][c] == "*" {
                    i = c - 1
                }
            }
        }
        var res = [[Character]]()
        for c in 0..<COLS {
            var row = [Character]()
            for r in stride(from: ROWS - 1, through: 0, by: -1) {
                row.append(boxGrid[r][c])
            }
            res.append(row)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Two Pointers - II

### Intuition

We can combine the gravity simulation and rotation into a single pass. Instead of modifying the original `grid` and then rotating, we directly write stones and obstacles to their final positions in the rotated result `grid`. This eliminates the need to modify the input and performs both operations simultaneously.

### Algorithm

1. Create a result `grid` of size `COLS x ROWS`, filled with empty cells `.`.
2. For each row in the original `grid`, initialize pointer `i` to `COLS - 1`.
3. Iterate from right to left:
   - If the cell is a stone `#`, place it at the rotated position corresponding to `i`, then decrement `i`.
   - If the cell is an obstacle `*`, place it at its rotated position and reset `i` to `c - 1`.
4. The rotated position for original `(r, c)` is `(c, ROWS - r - 1)` for obstacles, and `(i, ROWS - r - 1)` for stones.
5. Return the result `grid`.

::tabs-start

```python
class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[List[str]]:
        ROWS, COLS = len(boxGrid), len(boxGrid[0])

        res = [["."] * ROWS for _ in range(COLS)]

        for r in range(ROWS):
            i = COLS - 1
            for c in reversed(range(COLS)):
                if boxGrid[r][c] == "#":
                    res[i][ROWS - r - 1] = "#"
                    i -= 1
                elif boxGrid[r][c] == "*":
                    res[c][ROWS - r - 1] = "*"
                    i = c - 1

        return res
```

```java
public class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.length, COLS = boxGrid[0].length;
        char[][] res = new char[COLS][ROWS];
        for (int c = 0; c < COLS; c++) {
            for (int r = 0; r < ROWS; r++) {
                res[c][r] = '.';
            }
        }

        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& boxGrid) {
        int ROWS = boxGrid.size(), COLS = boxGrid[0].size();
        vector<vector<char>> res(COLS, vector<char>(ROWS, '.'));
        for (int r = 0; r < ROWS; ++r) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; --c) {
                if (boxGrid[r][c] == '#') {
                    res[i][ROWS - r - 1] = '#';
                    --i;
                } else if (boxGrid[r][c] == '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} boxGrid
     * @return {character[][]}
     */
    rotateTheBox(boxGrid) {
        const ROWS = boxGrid.length,
            COLS = boxGrid[0].length;
        const res = Array.from({ length: COLS }, () => Array(ROWS).fill('.'));
        for (let r = 0; r < ROWS; r++) {
            let i = COLS - 1;
            for (let c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] === '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] === '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public char[][] RotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.Length, COLS = boxGrid[0].Length;
        var res = new char[COLS][];
        for (int c = 0; c < COLS; c++) {
            res[c] = new char[ROWS];
            for (int r = 0; r < ROWS; r++) {
                res[c][r] = '.';
            }
        }

        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
}
```

```go
func rotateTheBox(boxGrid [][]byte) [][]byte {
    ROWS, COLS := len(boxGrid), len(boxGrid[0])

    res := make([][]byte, COLS)
    for c := 0; c < COLS; c++ {
        res[c] = make([]byte, ROWS)
        for r := 0; r < ROWS; r++ {
            res[c][r] = '.'
        }
    }

    for r := 0; r < ROWS; r++ {
        i := COLS - 1
        for c := COLS - 1; c >= 0; c-- {
            if boxGrid[r][c] == '#' {
                res[i][ROWS-r-1] = '#'
                i--
            } else if boxGrid[r][c] == '*' {
                res[c][ROWS-r-1] = '*'
                i = c - 1
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun rotateTheBox(boxGrid: Array<CharArray>): Array<CharArray> {
        val ROWS = boxGrid.size
        val COLS = boxGrid[0].size

        val res = Array(COLS) { CharArray(ROWS) { '.' } }

        for (r in 0 until ROWS) {
            var i = COLS - 1
            for (c in COLS - 1 downTo 0) {
                if (boxGrid[r][c] == '#') {
                    res[i][ROWS - r - 1] = '#'
                    i--
                } else if (boxGrid[r][c] == '*') {
                    res[c][ROWS - r - 1] = '*'
                    i = c - 1
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func rotateTheBox(_ boxGrid: [[Character]]) -> [[Character]] {
        let ROWS = boxGrid.count
        let COLS = boxGrid[0].count

        var res = [[Character]](repeating: [Character](repeating: ".", count: ROWS), count: COLS)

        for r in 0..<ROWS {
            var i = COLS - 1
            for c in stride(from: COLS - 1, through: 0, by: -1) {
                if boxGrid[r][c] == "#" {
                    res[i][ROWS - r - 1] = "#"
                    i -= 1
                } else if boxGrid[r][c] == "*" {
                    res[c][ROWS - r - 1] = "*"
                    i = c - 1
                }
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

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## Common Pitfalls

### Applying Gravity in the Wrong Direction

After rotation, gravity pulls stones downward, but before rotation stones should fall to the right (toward higher column indices). Processing stones left-to-right instead of right-to-left causes stones to fall incorrectly, as earlier stones block the path for later ones.

### Forgetting to Reset the Drop Position After Obstacles

When an obstacle `*` is encountered, the drop position pointer must reset to just before the obstacle (`c - 1`). Failing to reset this pointer causes stones to incorrectly pass through or stack on top of obstacles.

### Incorrect Rotation Index Mapping

The rotation transforms position `(r, c)` to `(c, ROWS - 1 - r)` for a 90-degree clockwise rotation. Using incorrect formulas like `(c, r)` or `(ROWS - 1 - r, c)` results in a transposed or incorrectly flipped matrix instead of a proper rotation.
