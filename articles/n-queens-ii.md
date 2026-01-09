## 1. Backtracking

### Intuition

We place queens row by row, ensuring each placement is valid before moving to the next row. For each column in the current row, we check if placing a queen there would conflict with any queen already placed above. A queen attacks along its column and both diagonals, so we scan upward in those three directions. If no conflict exists, we place the queen and recurse to the next row. When we successfully place queens in all rows, we have found a valid configuration.

### Algorithm

1. Initialize a `res` counter for valid solutions and create an empty board.
2. Define a backtracking function that takes the current `r` (row):
   - If `r` equals `n`, increment the solution count and return.
   - For each `c` (column) in the row:
     - Check if the position is `isSafe` by scanning the column above, the upper-left diagonal, and the upper-right diagonal for existing queens.
     - If safe, place a queen at this position.
     - Recursively call backtrack for the next row.
     - Remove the queen (backtrack) to try other columns.
3. Start backtracking from row `0` and return the final count.

::tabs-start

```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        res = 0
        board = [["."] * n for i in range(n)]

        def backtrack(r):
            nonlocal res
            if r == n:
                res += 1
                return
            for c in range(n):
                if self.isSafe(r, c, board):
                    board[r][c] = "Q"
                    backtrack(r + 1)
                    board[r][c] = "."

        backtrack(0)
        return res

    def isSafe(self, r: int, c: int, board):
        row = r - 1
        while row >= 0:
            if board[row][c] == "Q":
                return False
            row -= 1

        row, col = r - 1, c - 1
        while row >= 0 and col >= 0:
            if board[row][col] == "Q":
                return False
            row -= 1
            col -= 1

        row, col = r - 1, c + 1
        while row >= 0 and col < len(board):
            if board[row][col] == "Q":
                return False
            row -= 1
            col += 1
        return True
```

```java
public class Solution {
    private int res;

    public int totalNQueens(int n) {
        res = 0;
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }
        backtrack(0, board);
        return res;
    }

    private void backtrack(int r, char[][] board) {
        if (r == board.length) {
            res++;
            return;
        }
        for (int c = 0; c < board.length; c++) {
            if (isSafe(r, c, board)) {
                board[r][c] = 'Q';
                backtrack(r + 1, board);
                board[r][c] = '.';
            }
        }
    }

    private boolean isSafe(int r, int c, char[][] board) {
        for (int i = r - 1; i >= 0; i--) {
            if (board[i][c] == 'Q') return false;
        }
        for (int i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') return false;
        }
        for (int i = r - 1, j = c + 1; i >= 0 && j < board.length; i--, j++) {
            if (board[i][j] == 'Q') return false;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int totalNQueens(int n) {
        int res = 0;
        vector<string> board(n, string(n, '.'));
        backtrack(0, board, res);
        return res;
    }

    void backtrack(int r, vector<string>& board, int& res) {
        if (r == board.size()) {
            res++;
            return;
        }
        for (int c = 0; c < board.size(); c++) {
            if (isSafe(r, c, board)) {
                board[r][c] = 'Q';
                backtrack(r + 1, board, res);
                board[r][c] = '.';
            }
        }
    }

    bool isSafe(int r, int c, vector<string>& board) {
        for (int i = r - 1; i >= 0; i--) {
            if (board[i][c] == 'Q') return false;
        }
        for (int i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') return false;
        }
        for (int i = r - 1, j = c + 1; i >= 0 && j < board.size(); i--, j++) {
            if (board[i][j] == 'Q') return false;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    totalNQueens(n) {
        let res = 0;
        let board = Array.from({ length: n }, () => Array(n).fill('.'));

        const backtrack = (r) => {
            if (r === n) {
                res++;
                return;
            }
            for (let c = 0; c < n; c++) {
                if (this.isSafe(r, c, board)) {
                    board[r][c] = 'Q';
                    backtrack(r + 1);
                    board[r][c] = '.';
                }
            }
        };

        backtrack(0);
        return res;
    }

    /**
     * @param {number} r
     * @param {number} c
     * @param {string[][]} board
     * @return {boolean}
     */
    isSafe(r, c, board) {
        for (let i = r - 1; i >= 0; i--) {
            if (board[i][c] === 'Q') return false;
        }
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        for (let i = r - 1, j = c + 1; i >= 0 && j < board.length; i--, j++) {
            if (board[i][j] === 'Q') return false;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    private int res = 0;

    public int TotalNQueens(int n) {
        res = 0;
        char[][] board = new char[n][];
        for (int i = 0; i < n; i++) {
            board[i] = Enumerable.Repeat('.', n).ToArray();
        }

        Backtrack(0, board, n);
        return res;
    }

    private void Backtrack(int r, char[][] board, int n) {
        if (r == n) {
            res++;
            return;
        }

        for (int c = 0; c < n; c++) {
            if (IsSafe(r, c, board)) {
                board[r][c] = 'Q';
                Backtrack(r + 1, board, n);
                board[r][c] = '.';
            }
        }
    }

    private bool IsSafe(int r, int c, char[][] board) {
        // Check column
        for (int row = r - 1; row >= 0; row--) {
            if (board[row][c] == 'Q') return false;
        }

        // Check top-left diagonal
        for (int row = r - 1, col = c - 1; row >= 0 && col >= 0; row--, col--) {
            if (board[row][col] == 'Q') return false;
        }

        // Check top-right diagonal
        for (int row = r - 1, col = c + 1; row >= 0 && col < board.Length; row--, col++) {
            if (board[row][col] == 'Q') return false;
        }

        return true;
    }
}
```

```go
func totalNQueens(n int) int {
    res := 0
    board := make([][]byte, n)
    for i := range board {
        board[i] = make([]byte, n)
        for j := range board[i] {
            board[i][j] = '.'
        }
    }

    var isSafe func(r, c int) bool
    isSafe = func(r, c int) bool {
        for i := r - 1; i >= 0; i-- {
            if board[i][c] == 'Q' {
                return false
            }
        }
        for i, j := r-1, c-1; i >= 0 && j >= 0; i, j = i-1, j-1 {
            if board[i][j] == 'Q' {
                return false
            }
        }
        for i, j := r-1, c+1; i >= 0 && j < n; i, j = i-1, j+1 {
            if board[i][j] == 'Q' {
                return false
            }
        }
        return true
    }

    var backtrack func(r int)
    backtrack = func(r int) {
        if r == n {
            res++
            return
        }
        for c := 0; c < n; c++ {
            if isSafe(r, c) {
                board[r][c] = 'Q'
                backtrack(r + 1)
                board[r][c] = '.'
            }
        }
    }

    backtrack(0)
    return res
}
```

```kotlin
class Solution {
    private var res = 0

    fun totalNQueens(n: Int): Int {
        res = 0
        val board = Array(n) { CharArray(n) { '.' } }
        backtrack(0, board, n)
        return res
    }

    private fun backtrack(r: Int, board: Array<CharArray>, n: Int) {
        if (r == n) {
            res++
            return
        }
        for (c in 0 until n) {
            if (isSafe(r, c, board)) {
                board[r][c] = 'Q'
                backtrack(r + 1, board, n)
                board[r][c] = '.'
            }
        }
    }

    private fun isSafe(r: Int, c: Int, board: Array<CharArray>): Boolean {
        for (i in r - 1 downTo 0) {
            if (board[i][c] == 'Q') return false
        }
        var i = r - 1
        var j = c - 1
        while (i >= 0 && j >= 0) {
            if (board[i][j] == 'Q') return false
            i--
            j--
        }
        i = r - 1
        j = c + 1
        while (i >= 0 && j < board.size) {
            if (board[i][j] == 'Q') return false
            i--
            j++
        }
        return true
    }
}
```

```swift
class Solution {
    func totalNQueens(_ n: Int) -> Int {
        var res = 0
        var board = [[Character]](repeating: [Character](repeating: ".", count: n), count: n)

        func isSafe(_ r: Int, _ c: Int) -> Bool {
            for i in stride(from: r - 1, through: 0, by: -1) {
                if board[i][c] == "Q" { return false }
            }
            var i = r - 1, j = c - 1
            while i >= 0 && j >= 0 {
                if board[i][j] == "Q" { return false }
                i -= 1
                j -= 1
            }
            i = r - 1
            j = c + 1
            while i >= 0 && j < n {
                if board[i][j] == "Q" { return false }
                i -= 1
                j += 1
            }
            return true
        }

        func backtrack(_ r: Int) {
            if r == n {
                res += 1
                return
            }
            for c in 0..<n {
                if isSafe(r, c) {
                    board[r][c] = "Q"
                    backtrack(r + 1)
                    board[r][c] = "."
                }
            }
        }

        backtrack(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n ^ 2)$

---

## 2. Backtracking (Hash Set)

### Intuition

Instead of scanning the board to check for conflicts, we can track which columns and diagonals are already occupied using hash sets. Each column has a unique index. For diagonals, cells on the same positive diagonal (bottom-left to top-right) share the same value of `row + col`, while cells on the same negative diagonal (top-left to bottom-right) share the same value of `row - col`. By checking set membership, we determine in constant time whether a position is under attack.

### Algorithm

1. Create three hash sets: one for `col` (columns), one for `posDiag` (positive diagonals with `row + col`), and one for `negDiag` (negative diagonals with `row - col`).
2. Define a backtracking function that takes the current `r` (row):
   - If `r` equals `n`, increment the solution count and return.
   - For each `c` (column) in the row:
     - If `c` or either diagonal is already in the corresponding set, skip this column.
     - Add `c` and both diagonal identifiers to their respective sets.
     - Recursively call backtrack for the next row.
     - Remove `c` and diagonal identifiers from the sets (backtrack).
3. Start backtracking from row `0` and return the final count.

::tabs-start

```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        col = set()
        posDiag = set()
        negDiag = set()

        res = 0
        def backtrack(r):
            nonlocal res
            if r == n:
                res += 1
                return

            for c in range(n):
                if c in col or (r + c) in posDiag or (r - c) in negDiag:
                    continue

                col.add(c)
                posDiag.add(r + c)
                negDiag.add(r - c)

                backtrack(r + 1)

                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)

        backtrack(0)
        return res
```

```java
public class Solution {
    Set<Integer> col = new HashSet<>();
    Set<Integer> posDiag = new HashSet<>();
    Set<Integer> negDiag = new HashSet<>();
    int res;

    public int totalNQueens(int n) {
        res = 0;
        backtrack(0, n);
        return res;
    }

    private void backtrack(int r, int n) {
        if (r == n) {
            res++;
            return;
        }

        for (int c = 0; c < n; c++) {
            if (col.contains(c) || posDiag.contains(r + c) || negDiag.contains(r - c)) {
                continue;
            }

            col.add(c);
            posDiag.add(r + c);
            negDiag.add(r - c);

            backtrack(r + 1, n);

            col.remove(c);
            posDiag.remove(r + c);
            negDiag.remove(r - c);
        }
    }
}
```

```cpp
class Solution {
public:
    unordered_set<int> col;
    unordered_set<int> posDiag;
    unordered_set<int> negDiag;

    int totalNQueens(int n) {
        int res = 0;
        backtrack(0, n, res);
        return res;
    }

private:
    void backtrack(int r, int n, int& res) {
        if (r == n) {
            res++;
            return;
        }

        for (int c = 0; c < n; c++) {
            if (col.count(c) || posDiag.count(r + c) || negDiag.count(r - c)) {
                continue;
            }

            col.insert(c);
            posDiag.insert(r + c);
            negDiag.insert(r - c);

            backtrack(r + 1, n, res);

            col.erase(c);
            posDiag.erase(r + c);
            negDiag.erase(r - c);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    totalNQueens(n) {
        const col = new Set();
        const posDiag = new Set();
        const negDiag = new Set();
        let res = 0;

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res++;
                return;
            }

            for (let c = 0; c < n; c++) {
                if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
                    continue;
                }

                col.add(c);
                posDiag.add(r + c);
                negDiag.add(r - c);

                backtrack(r + 1);

                col.delete(c);
                posDiag.delete(r + c);
                negDiag.delete(r - c);
            }
        }

        backtrack(0);
        return res;
    }
}
```

```csharp
public class Solution {
    private HashSet<int> col = new HashSet<int>();
    private HashSet<int> posDiag = new HashSet<int>();  // r + c
    private HashSet<int> negDiag = new HashSet<int>();  // r - c
    private int res = 0;

    public int TotalNQueens(int n) {
        res = 0;
        Backtrack(0, n);
        return res;
    }

    private void Backtrack(int r, int n) {
        if (r == n) {
            res++;
            return;
        }

        for (int c = 0; c < n; c++) {
            if (col.Contains(c) || posDiag.Contains(r + c) || negDiag.Contains(r - c))
                continue;

            col.Add(c);
            posDiag.Add(r + c);
            negDiag.Add(r - c);

            Backtrack(r + 1, n);

            col.Remove(c);
            posDiag.Remove(r + c);
            negDiag.Remove(r - c);
        }
    }
}
```

```go
func totalNQueens(n int) int {
    col := make(map[int]bool)
    posDiag := make(map[int]bool)
    negDiag := make(map[int]bool)
    res := 0

    var backtrack func(r int)
    backtrack = func(r int) {
        if r == n {
            res++
            return
        }

        for c := 0; c < n; c++ {
            if col[c] || posDiag[r+c] || negDiag[r-c] {
                continue
            }

            col[c] = true
            posDiag[r+c] = true
            negDiag[r-c] = true

            backtrack(r + 1)

            delete(col, c)
            delete(posDiag, r+c)
            delete(negDiag, r-c)
        }
    }

    backtrack(0)
    return res
}
```

```kotlin
class Solution {
    fun totalNQueens(n: Int): Int {
        val col = HashSet<Int>()
        val posDiag = HashSet<Int>()
        val negDiag = HashSet<Int>()
        var res = 0

        fun backtrack(r: Int) {
            if (r == n) {
                res++
                return
            }

            for (c in 0 until n) {
                if (c in col || (r + c) in posDiag || (r - c) in negDiag) {
                    continue
                }

                col.add(c)
                posDiag.add(r + c)
                negDiag.add(r - c)

                backtrack(r + 1)

                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
            }
        }

        backtrack(0)
        return res
    }
}
```

```swift
class Solution {
    func totalNQueens(_ n: Int) -> Int {
        var col = Set<Int>()
        var posDiag = Set<Int>()
        var negDiag = Set<Int>()
        var res = 0

        func backtrack(_ r: Int) {
            if r == n {
                res += 1
                return
            }

            for c in 0..<n {
                if col.contains(c) || posDiag.contains(r + c) || negDiag.contains(r - c) {
                    continue
                }

                col.insert(c)
                posDiag.insert(r + c)
                negDiag.insert(r - c)

                backtrack(r + 1)

                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
            }
        }

        backtrack(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n)$

---

## 3. Backtracking (Boolean Array)

### Intuition

Hash sets have some overhead for insertions and lookups. Since the board size is fixed and the range of diagonal indices is bounded, we can use boolean arrays instead. An array of size `n` tracks occupied columns, and arrays of size `2n` track the positive and negative diagonals. For negative diagonals, we add `n` to the index to ensure non-negative array indices. This gives us the same constant-time conflict checking with lower overhead.

### Algorithm

1. Create three boolean arrays: `col[n]`, `posDiag[2n]`, and `negDiag[2n]`.
2. Define a backtracking function that takes the current `r` (row):
   - If `r` equals `n`, increment the solution count and return.
   - For each `c` (column) in the row:
     - Check `col[c]`, `posDiag[r + c]`, and `negDiag[r - c + n]`. If any is `true`, skip this column.
     - Set all three to `true`.
     - Recursively call backtrack for the next row.
     - Set all three back to `false` (backtrack).
3. Start backtracking from row `0` and return the final count.

::tabs-start

```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        col = [False] * n
        posDiag = [False] * (n * 2)
        negDiag = [False] * (n * 2)
        res = 0

        def backtrack(r):
            nonlocal res
            if r == n:
                res += 1
                return
            for c in range(n):
                if col[c] or posDiag[r + c] or negDiag[r - c + n]:
                    continue
                col[c] = True
                posDiag[r + c] = True
                negDiag[r - c + n] = True

                backtrack(r + 1)

                col[c] = False
                posDiag[r + c] = False
                negDiag[r - c + n] = False

        backtrack(0)
        return res
```

```java
public class Solution {
    boolean[] col, posDiag, negDiag;
    int res;

    public int totalNQueens(int n) {
        col = new boolean[n];
        posDiag = new boolean[2 * n];
        negDiag = new boolean[2 * n];
        res = 0;

        backtrack(0, n);
        return res;
    }

    private void backtrack(int r, int n) {
        if (r == n) {
            res++;
            return;
        }
        for (int c = 0; c < n; c++) {
            if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                continue;
            }
            col[c] = true;
            posDiag[r + c] = true;
            negDiag[r - c + n] = true;

            backtrack(r + 1, n);

            col[c] = false;
            posDiag[r + c] = false;
            negDiag[r - c + n] = false;
        }
    }
}
```

```cpp
class Solution {
public:
    vector<string> board;
    vector<bool> col, posDiag, negDiag;

    int totalNQueens(int n) {
        col.resize(n, false);
        posDiag.resize(2 * n, false);
        negDiag.resize(2 * n, false);

        int res = 0;
        backtrack(0, n, res);
        return res;
    }

    void backtrack(int r, int n, int& res) {
        if (r == n) {
            res++;
            return;
        }
        for (int c = 0; c < n; c++) {
            if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                continue;
            }
            col[c] = true;
            posDiag[r + c] = true;
            negDiag[r - c + n] = true;

            backtrack(r + 1, n, res);

            col[c] = false;
            posDiag[r + c] = false;
            negDiag[r - c + n] = false;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    totalNQueens(n) {
        const col = Array(n).fill(false);
        const posDiag = Array(2 * n).fill(false);
        const negDiag = Array(2 * n).fill(false);
        let res = 0;

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res++;
                return;
            }
            for (let c = 0; c < n; c++) {
                if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                    continue;
                }
                col[c] = true;
                posDiag[r + c] = true;
                negDiag[r - c + n] = true;

                backtrack(r + 1);

                col[c] = false;
                posDiag[r + c] = false;
                negDiag[r - c + n] = false;
            }
        }

        backtrack(0);
        return res;
    }
}
```

```csharp
public class Solution {
    public int TotalNQueens(int n) {
        bool[] col = new bool[n];
        bool[] posDiag = new bool[2 * n];
        bool[] negDiag = new bool[2 * n];
        int res = 0;

        void Backtrack(int r) {
            if (r == n) {
                res++;
                return;
            }

            for (int c = 0; c < n; c++) {
                if (col[c] || posDiag[r + c] || negDiag[r - c + n])
                    continue;

                col[c] = true;
                posDiag[r + c] = true;
                negDiag[r - c + n] = true;

                Backtrack(r + 1);

                col[c] = false;
                posDiag[r + c] = false;
                negDiag[r - c + n] = false;
            }
        }

        Backtrack(0);
        return res;
    }
}
```

```go
func totalNQueens(n int) int {
    col := make([]bool, n)
    posDiag := make([]bool, 2*n)
    negDiag := make([]bool, 2*n)
    res := 0

    var backtrack func(r int)
    backtrack = func(r int) {
        if r == n {
            res++
            return
        }
        for c := 0; c < n; c++ {
            if col[c] || posDiag[r+c] || negDiag[r-c+n] {
                continue
            }
            col[c] = true
            posDiag[r+c] = true
            negDiag[r-c+n] = true

            backtrack(r + 1)

            col[c] = false
            posDiag[r+c] = false
            negDiag[r-c+n] = false
        }
    }

    backtrack(0)
    return res
}
```

```kotlin
class Solution {
    fun totalNQueens(n: Int): Int {
        val col = BooleanArray(n)
        val posDiag = BooleanArray(2 * n)
        val negDiag = BooleanArray(2 * n)
        var res = 0

        fun backtrack(r: Int) {
            if (r == n) {
                res++
                return
            }
            for (c in 0 until n) {
                if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                    continue
                }
                col[c] = true
                posDiag[r + c] = true
                negDiag[r - c + n] = true

                backtrack(r + 1)

                col[c] = false
                posDiag[r + c] = false
                negDiag[r - c + n] = false
            }
        }

        backtrack(0)
        return res
    }
}
```

```swift
class Solution {
    func totalNQueens(_ n: Int) -> Int {
        var col = [Bool](repeating: false, count: n)
        var posDiag = [Bool](repeating: false, count: 2 * n)
        var negDiag = [Bool](repeating: false, count: 2 * n)
        var res = 0

        func backtrack(_ r: Int) {
            if r == n {
                res += 1
                return
            }
            for c in 0..<n {
                if col[c] || posDiag[r + c] || negDiag[r - c + n] {
                    continue
                }
                col[c] = true
                posDiag[r + c] = true
                negDiag[r - c + n] = true

                backtrack(r + 1)

                col[c] = false
                posDiag[r + c] = false
                negDiag[r - c + n] = false
            }
        }

        backtrack(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n)$

---

## 4. Backtracking (Bit Mask)

### Intuition

Bit manipulation offers the most compact representation for tracking occupied columns and diagonals. We use three integers as bitmasks: each bit in `col` represents whether that column is occupied, and similarly for the two diagonal masks. Checking if a position is attacked becomes a single bitwise AND operation. Setting and unsetting bits is done with XOR. This approach is both space-efficient and cache-friendly.

### Algorithm

1. Initialize three integers `col`, `posDiag`, and `negDiag` to `0`.
2. Define a backtracking function that takes the current `r` (row):
   - If `r` equals `n`, increment the solution count and return.
   - For each `c` (column) in the row:
     - Check if the bit at position `c` in `col`, position `r + c` in `posDiag`, or position `r - c + n` in `negDiag` is set. If any is set, skip this column.
     - Toggle the corresponding bits using XOR.
     - Recursively call backtrack for the next row.
     - Toggle the bits again to restore the previous state (backtrack).
3. Start backtracking from row `0` and return the final count.

::tabs-start

```python
class Solution:
    def totalNQueens(self, n: int) -> int:
        col = 0
        posDiag = 0
        negDiag = 0
        res = 0

        def backtrack(r):
            nonlocal col, posDiag, negDiag, res
            if r == n:
                res += 1
                return
            for c in range(n):
                if ((col & (1 << c)) or (posDiag & (1 << (r + c)))
                    or (negDiag & (1 << (r - c + n)))):
                    continue
                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))

                backtrack(r + 1)

                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))

        backtrack(0)
        return res
```

```java
public class Solution {
    private int col = 0, posDiag = 0, negDiag = 0, res = 0;

    public int totalNQueens(int n) {
        res = 0;
        backtrack(0, n);
        return res;
    }

    private void backtrack(int r, int n) {
        if (r == n) {
            res++;
            return;
        }
        for (int c = 0; c < n; c++) {
            if ((col & (1 << c)) > 0 || (posDiag & (1 << (r + c))) > 0 ||
                (negDiag & (1 << (r - c + n))) > 0) {
                continue;
            }
            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));

            backtrack(r + 1, n);

            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
        }
    }
}
```

```cpp
class Solution {
public:
    int col = 0, posDiag = 0, negDiag = 0;
    vector<string> board;

    int totalNQueens(int n) {
        int res = 0;
        backtrack(0, n, res);
        return res;
    }

    void backtrack(int r, int n, int& res) {
        if (r == n) {
            res++;
            return;
        }
        for (int c = 0; c < n; c++) {
            if ((col & (1 << c)) || (posDiag & (1 << (r + c))) ||
                (negDiag & (1 << (r - c + n)))) {
                continue;
            }
            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));

            backtrack(r + 1, n, res);

            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    totalNQueens(n) {
        let col = 0,
            posDiag = 0,
            negDiag = 0,
            res = 0;

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res++;
                return;
            }
            for (let c = 0; c < n; c++) {
                if (
                    (col & (1 << c)) > 0 ||
                    (posDiag & (1 << (r + c))) > 0 ||
                    (negDiag & (1 << (r - c + n))) > 0
                ) {
                    continue;
                }
                col ^= 1 << c;
                posDiag ^= 1 << (r + c);
                negDiag ^= 1 << (r - c + n);

                backtrack(r + 1);

                col ^= 1 << c;
                posDiag ^= 1 << (r + c);
                negDiag ^= 1 << (r - c + n);
            }
        }

        backtrack(0);
        return res;
    }
}
```

```csharp
public class Solution {
    public int TotalNQueens(int n) {
        int col = 0;
        int posDiag = 0;
        int negDiag = 0;
        int res = 0;

        void Backtrack(int r) {
            if (r == n) {
                res++;
                return;
            }

            for (int c = 0; c < n; c++) {
                if (((col & (1 << c)) != 0) ||
                    ((posDiag & (1 << (r + c))) != 0) ||
                    ((negDiag & (1 << (r - c + n))) != 0))
                    continue;

                col ^= (1 << c);
                posDiag ^= (1 << (r + c));
                negDiag ^= (1 << (r - c + n));

                Backtrack(r + 1);

                col ^= (1 << c);
                posDiag ^= (1 << (r + c));
                negDiag ^= (1 << (r - c + n));
            }
        }

        Backtrack(0);
        return res;
    }
}
```

```go
func totalNQueens(n int) int {
    col := 0
    posDiag := 0
    negDiag := 0
    res := 0

    var backtrack func(r int)
    backtrack = func(r int) {
        if r == n {
            res++
            return
        }
        for c := 0; c < n; c++ {
            if (col&(1<<c)) != 0 || (posDiag&(1<<(r+c))) != 0 || (negDiag&(1<<(r-c+n))) != 0 {
                continue
            }
            col ^= (1 << c)
            posDiag ^= (1 << (r + c))
            negDiag ^= (1 << (r - c + n))

            backtrack(r + 1)

            col ^= (1 << c)
            posDiag ^= (1 << (r + c))
            negDiag ^= (1 << (r - c + n))
        }
    }

    backtrack(0)
    return res
}
```

```kotlin
class Solution {
    fun totalNQueens(n: Int): Int {
        var col = 0
        var posDiag = 0
        var negDiag = 0
        var res = 0

        fun backtrack(r: Int) {
            if (r == n) {
                res++
                return
            }
            for (c in 0 until n) {
                if ((col and (1 shl c)) != 0 ||
                    (posDiag and (1 shl (r + c))) != 0 ||
                    (negDiag and (1 shl (r - c + n))) != 0) {
                    continue
                }
                col = col xor (1 shl c)
                posDiag = posDiag xor (1 shl (r + c))
                negDiag = negDiag xor (1 shl (r - c + n))

                backtrack(r + 1)

                col = col xor (1 shl c)
                posDiag = posDiag xor (1 shl (r + c))
                negDiag = negDiag xor (1 shl (r - c + n))
            }
        }

        backtrack(0)
        return res
    }
}
```

```swift
class Solution {
    func totalNQueens(_ n: Int) -> Int {
        var col = 0
        var posDiag = 0
        var negDiag = 0
        var res = 0

        func backtrack(_ r: Int) {
            if r == n {
                res += 1
                return
            }
            for c in 0..<n {
                if (col & (1 << c)) != 0 ||
                   (posDiag & (1 << (r + c))) != 0 ||
                   (negDiag & (1 << (r - c + n))) != 0 {
                    continue
                }
                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))

                backtrack(r + 1)

                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))
            }
        }

        backtrack(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n)$ for recursion stack.
