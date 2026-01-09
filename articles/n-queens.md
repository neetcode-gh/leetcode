## 1. Backtracking

### Intuition
The goal is to place **one queen in each row** such that no two queens attack each other.

Key observations:
- A queen can attack **vertically**, **diagonally left**, and **diagonally right**
- Since we place queens **row by row from top to bottom**, we only need to check rows **above** the current row
- If a position is safe, we place a queen and move to the next row
- If we reach a dead end, we **backtrack** by removing the last queen and trying another column

This is a classic **backtracking + constraint checking** problem.

### Algorithm
1. Create an empty `n x n` board filled with `"."`.
2. Start backtracking from row `0`.
3. For the current `r` (row):
   - Try placing a queen in every `c` (column).
   - Before placing, check if the position is `isSafe`:
     - No queen in the same column above
     - No queen in the upper-left diagonal
     - No queen in the upper-right diagonal
4. If safe:
   - Place the queen (`"Q"`)
   - Recurse to the next row
   - Remove the queen after returning (backtrack)
5. If all `n` rows are filled:
   - Convert the board into a list of strings and store it as one valid solution
6. Continue until all possibilities are explored.

::tabs-start

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        board = [["."] * n for i in range(n)]

        def backtrack(r):
            if r == n:
                copy = ["".join(row) for row in board]
                res.append(copy)
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
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }
        backtrack(0, board, res);
        return res;
    }

    private void backtrack(int r, char[][] board, List<List<String>> res) {
        if (r == board.length) {
            List<String> copy = new ArrayList<>();
            for (char[] row : board) {
                copy.add(new String(row));
            }
            res.add(copy);
            return;
        }
        for (int c = 0; c < board.length; c++) {
            if (isSafe(r, c, board)) {
                board[r][c] = 'Q';
                backtrack(r + 1, board, res);
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
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        backtrack(0, board, res);
        return res;
    }

    void backtrack(int r, vector<string>& board, vector<vector<string>>& res) {
        if (r == board.size()) {
            res.push_back(board);
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
     * @return {string[][]}
     */
    solveNQueens(n) {
        let res = [];
        let board = Array.from({ length: n }, () => Array(n).fill('.'));

        const backtrack = (r) => {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
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
    public List<List<string>> SolveNQueens(int n) {
        var res = new List<List<string>>();
        var board = new char[n][];
        for (int i = 0; i < n; i++) {
            board[i] = new string('.', n).ToCharArray();
        }
        Backtrack(0, board, res);
        return res;
    }

    private void Backtrack(int r, char[][] board, List<List<string>> res) {
        if (r == board.Length) {
            var copy = new List<string>();
            foreach (var row in board) {
                copy.Add(new string(row));
            }
            res.Add(copy);
            return;
        }
        for (int c = 0; c < board.Length; c++) {
            if (IsSafe(r, c, board)) {
                board[r][c] = 'Q';
                Backtrack(r + 1, board, res);
                board[r][c] = '.';
            }
        }
    }

    private bool IsSafe(int r, int c, char[][] board) {
        for (int i = r - 1; i >= 0; i--) {
            if (board[i][c] == 'Q') return false;
        }
        for (int i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') return false;
        }
        for (int i = r - 1, j = c + 1; i >= 0 && j < board.Length; i--, j++) {
            if (board[i][j] == 'Q') return false;
        }
        return true;
    }
}
```

```go
func solveNQueens(n int) [][]string {
    res := [][]string{}
    board := make([][]string, n)
    for i := range board {
        board[i] = make([]string, n)
        for j := range board[i] {
            board[i][j] = "."
        }
    }

    var backtrack func(r int)
    backtrack = func(r int) {
        if r == n {
            copyBoard := make([]string, n)
            for i := range board {
                copyBoard[i] = ""
                for j := range board[i] {
                    copyBoard[i] += board[i][j]
                }
            }
            res = append(res, copyBoard)
            return
        }
        for c := 0; c < n; c++ {
            if isSafe(r, c, board) {
                board[r][c] = "Q"
                backtrack(r + 1)
                board[r][c] = "."
            }
        }
    }

    backtrack(0)
    return res
}

func isSafe(r int, c int, board [][]string) bool {
    for row := r - 1; row >= 0; row-- {
        if board[row][c] == "Q" {
            return false
        }
    }

    for row, col := r-1, c-1; row >= 0 && col >= 0; row, col = row-1, col-1 {
        if board[row][col] == "Q" {
            return false
        }
    }

    for row, col := r-1, c+1; row >= 0 && col < len(board); row, col = row-1, col+1 {
        if board[row][col] == "Q" {
            return false
        }
    }

    return true
}
```

```kotlin
class Solution {
    fun solveNQueens(n: Int): List<List<String>> {
        val res = mutableListOf<List<String>>()
        val board = Array(n) { CharArray(n) { '.' } }

        fun isSafe(r: Int, c: Int): Boolean {
            var row = r - 1
            while (row >= 0) {
                if (board[row][c] == 'Q') return false
                row--
            }
            var col = c - 1
            row = r - 1
            while (row >= 0 && col >= 0) {
                if (board[row][col] == 'Q') return false
                row--
                col--
            }
            col = c + 1
            row = r - 1
            while (row >= 0 && col < n) {
                if (board[row][col] == 'Q') return false
                row--
                col++
            }
            return true
        }

        fun backtrack(r: Int) {
            if (r == n) {
                res.add(board.map { it.joinToString("") })
                return
            }
            for (c in 0 until n) {
                if (isSafe(r, c)) {
                    board[r][c] = 'Q'
                    backtrack(r + 1)
                    board[r][c] = '.'
                }
            }
        }

        backtrack(0)
        return res
    }
}
```

```swift
class Solution {
    func solveNQueens(_ n: Int) -> [[String]] {
        var res = [[String]]()
        var board = Array(repeating: Array(repeating: ".", count: n), count: n)

        func backtrack(_ r: Int) {
            if r == n {
                let copy = board.map { $0.joined() }
                res.append(copy)
                return
            }
            for c in 0..<n {
                if isSafe(r, c, board) {
                    board[r][c] = "Q"
                    backtrack(r + 1)
                    board[r][c] = "."
                }
            }
        }

        backtrack(0)
        return res
    }

    private func isSafe(_ r: Int, _ c: Int, _ board: [[String]]) -> Bool {
        var row = r - 1
        while row >= 0 {
            if board[row][c] == "Q" { return false }
            row -= 1
        }

        var row1 = r - 1, col1 = c - 1
        while row1 >= 0, col1 >= 0 {
            if board[row1][col1] == "Q" { return false }
            row1 -= 1
            col1 -= 1
        }

        var row2 = r - 1, col2 = c + 1
        while row2 >= 0, col2 < board.count {
            if board[row2][col2] == "Q" { return false }
            row2 -= 1
            col2 += 1
        }

        return true
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
Instead of checking the board every time to see if a queen is safe, we **remember the attacked positions** using hash sets.

For any queen at position `(row, col)`:
- **Column conflict** → same `col`
- **Positive diagonal conflict** → same `(row + col)`
- **Negative diagonal conflict** → same `(row - col)`

By storing these in sets, we can check whether a position is safe in **O(1)** time.

We still place **one queen per row**, move row by row, and backtrack when a placement leads to a conflict.

### Algorithm
1. Use three hash sets:
   - `col` → tracks used `c` (columns)
   - `posDiag` → tracks `(row + col)`
   - `negDiag` → tracks `(row - col)`
2. Initialize an empty `n x n` board with `"."`.
3. Start backtracking from row `0`.
4. For the current `r` (row):
   - Try every `c` (column)
   - If `c`, `(r + c)`, or `(r - c)` is already in the sets → skip
5. If safe:
   - Add `c`, `(r + c)`, `(r - c)` to the sets
   - Place `"Q"` on the board
   - Recurse to the next row
6. If all rows are filled:
   - Convert the board into a list of strings and save it
7. Backtrack:
   - Remove the queen from the board
   - Remove entries from all sets
8. Continue until all valid configurations are found.

::tabs-start

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        col = set()
        posDiag = set()
        negDiag = set()

        res = []
        board = [["."] * n for i in range(n)]

        def backtrack(r):
            if r == n:
                copy = ["".join(row) for row in board]
                res.append(copy)
                return

            for c in range(n):
                if c in col or (r + c) in posDiag or (r - c) in negDiag:
                    continue

                col.add(c)
                posDiag.add(r + c)
                negDiag.add(r - c)
                board[r][c] = "Q"

                backtrack(r + 1)

                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
                board[r][c] = "."

        backtrack(0)
        return res
```

```java
public class Solution {
    Set<Integer> col = new HashSet<>();
    Set<Integer> posDiag = new HashSet<>();
    Set<Integer> negDiag = new HashSet<>();
    List<List<String>> res = new ArrayList<>();

    public List<List<String>> solveNQueens(int n) {
        char[][] board = new char[n][n];
        for (char[] row : board) {
            Arrays.fill(row, '.');
        }

        backtrack(0, n, board);
        return res;
    }

    private void backtrack(int r, int n, char[][] board) {
        if (r == n) {
            List<String> copy = new ArrayList<>();
            for (char[] row : board) {
                copy.add(new String(row));
            }
            res.add(copy);
            return;
        }

        for (int c = 0; c < n; c++) {
            if (col.contains(c) || posDiag.contains(r + c)
                || negDiag.contains(r - c)) {
                continue;
            }

            col.add(c);
            posDiag.add(r + c);
            negDiag.add(r - c);
            board[r][c] = 'Q';

            backtrack(r + 1, n, board);

            col.remove(c);
            posDiag.remove(r + c);
            negDiag.remove(r - c);
            board[r][c] = '.';
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
    vector<vector<string>> res;

    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));

        backtrack(0, n, board);
        return res;
    }

private:
    void backtrack(int r, int n, vector<string>& board) {
        if (r == n) {
            res.push_back(board);
            return;
        }

        for (int c = 0; c < n; c++) {
            if (col.count(c) || posDiag.count(r + c) ||
                negDiag.count(r - c)) {
                continue;
            }

            col.insert(c);
            posDiag.insert(r + c);
            negDiag.insert(r - c);
            board[r][c] = 'Q';

            backtrack(r + 1, n, board);

            col.erase(c);
            posDiag.erase(r + c);
            negDiag.erase(r - c);
            board[r][c] = '.';
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        const col = new Set();
        const posDiag = new Set();
        const negDiag = new Set();

        const res = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
                return;
            }

            for (let c = 0; c < n; c++) {
                if (col.has(c) || posDiag.has(r + c) || negDiag.has(r - c)) {
                    continue;
                }

                col.add(c);
                posDiag.add(r + c);
                negDiag.add(r - c);
                board[r][c] = 'Q';

                backtrack(r + 1);

                col.delete(c);
                posDiag.delete(r + c);
                negDiag.delete(r - c);
                board[r][c] = '.';
            }
        }

        backtrack(0);
        return res;
    }
}
```

```csharp
public class Solution {
    HashSet<int> col = new HashSet<int>();
    HashSet<int> posDiag = new HashSet<int>();
    HashSet<int> negDiag = new HashSet<int>();
    List<List<string>> res = new List<List<string>>();

    public List<List<string>> SolveNQueens(int n) {
        char[][] board = new char[n][];
        for (int i = 0; i < n; i++) {
            board[i] = new char[n];
            Array.Fill(board[i], '.');
        }

        Backtrack(0, n, board);
        return res;
    }

    private void Backtrack(int r, int n, char[][] board) {
        if (r == n) {
            List<string> copy = new List<string>();
            foreach (char[] row in board) {
                copy.Add(new string(row));
            }
            res.Add(copy);
            return;
        }

        for (int c = 0; c < n; c++) {
            if (col.Contains(c) || posDiag.Contains(r + c) ||
                negDiag.Contains(r - c)) {
                continue;
            }

            col.Add(c);
            posDiag.Add(r + c);
            negDiag.Add(r - c);
            board[r][c] = 'Q';

            Backtrack(r + 1, n, board);

            col.Remove(c);
            posDiag.Remove(r + c);
            negDiag.Remove(r - c);
            board[r][c] = '.';
        }
    }
}
```

```go
func solveNQueens(n int) [][]string {
    col := make(map[int]bool)
    posDiag := make(map[int]bool)
    negDiag := make(map[int]bool)
    var res [][]string
    board := make([][]rune, n)
    for i := range board {
        board[i] = make([]rune, n)
        for j := range board[i] {
            board[i][j] = '.'
        }
    }

    var backtrack func(r int)
    backtrack = func(r int) {
        if r == n {
            solution := make([]string, n)
            for i := range board {
                solution[i] = string(board[i])
            }
            res = append(res, solution)
            return
        }

        for c := 0; c < n; c++ {
            if col[c] || posDiag[r+c] || negDiag[r-c] {
                continue
            }

            col[c] = true
            posDiag[r+c] = true
            negDiag[r-c] = true
            board[r][c] = 'Q'

            backtrack(r + 1)

            col[c] = false
            posDiag[r+c] = false
            negDiag[r-c] = false
            board[r][c] = '.'
        }
    }

    backtrack(0)
    return res
}
```

```kotlin
class Solution {
    fun solveNQueens(n: Int): List<List<String>> {
        val col = HashSet<Int>()
        val posDiag = HashSet<Int>()
        val negDiag = HashSet<Int>()
        val res = mutableListOf<List<String>>()
        val board = Array(n) { CharArray(n) { '.' } }

        fun backtrack(r: Int) {
            if (r == n) {
                res.add(board.map { it.joinToString("") })
                return
            }

            for (c in 0 until n) {
                if (c in col || (r + c) in posDiag || (r - c) in negDiag) {
                    continue
                }

                col.add(c)
                posDiag.add(r + c)
                negDiag.add(r - c)
                board[r][c] = 'Q'

                backtrack(r + 1)

                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
                board[r][c] = '.'
            }
        }

        backtrack(0)
        return res
    }
}
```

```swift
class Solution {
    func solveNQueens(_ n: Int) -> [[String]] {
        var col = Set<Int>()
        var posDiag = Set<Int>()
        var negDiag = Set<Int>()
        var res = [[String]]()
        var board = Array(repeating: Array(repeating: ".", count: n), count: n)

        func backtrack(_ r: Int) {
            if r == n {
                let copy = board.map { $0.joined() }
                res.append(copy)
                return
            }

            for c in 0..<n {
                if col.contains(c) || posDiag.contains(r + c) || negDiag.contains(r - c) {
                    continue
                }

                col.insert(c)
                posDiag.insert(r + c)
                negDiag.insert(r - c)
                board[r][c] = "Q"

                backtrack(r + 1)

                col.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
                board[r][c] = "."
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

## 3. Backtracking (Visited Array)

### Intuition
This approach is the **array-based version** of the hash-set solution.

Instead of using sets, we use **boolean arrays** to mark whether a column or diagonal is already occupied by a queen.  
This works because:
- Columns are limited to `n`
- Diagonals can be mapped to indices using math

For a queen at position `(row, col)`:
- **Column index** → `col`
- **Positive diagonal ( / )** → `row + col`
- **Negative diagonal ( \ )** → `row - col + n` (shifted to avoid negative index)

If any of these positions are already marked `True`, placing a queen there would cause a conflict.

We place queens **row by row**, and backtrack when no safe column is available.

### Algorithm
1. Create three boolean arrays:
   - `col[n]` → tracks occupied columns
   - `posDiag[2n]` → tracks `row + col`
   - `negDiag[2n]` → tracks `row - col + n`
2. Initialize an empty `n x n` board filled with `"."`.
3. Start backtracking from row `0`.
4. For the current `r` (row):
   - Try every `c` (column)
   - If `col[c]`, `posDiag[r+c]`, or `negDiag[r-c+n]` is `true`, skip
5. If safe:
   - Mark `col[c]`, `posDiag[r+c]`, `negDiag[r-c+n]` as `true`
   - Place `"Q"` on the board at `(r, c)`
   - Recurse to row `r + 1`
6. If `r == n`:
   - Convert the board to strings and store the solution
7. Backtrack:
   - Remove the queen
   - Reset the corresponding boolean entries
8. Continue until all valid boards are generated.

::tabs-start

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        col = [False] * n
        posDiag = [False] * (n * 2)
        negDiag = [False] * (n * 2)
        res = []
        board = [["."] * n for i in range(n)]

        def backtrack(r):
            if r == n:
                copy = ["".join(row) for row in board]
                res.append(copy)
                return
            for c in range(n):
                if col[c] or posDiag[r + c] or negDiag[r - c + n]:
                    continue
                col[c] = True
                posDiag[r + c] = True
                negDiag[r - c + n] = True
                board[r][c] = "Q"

                backtrack(r + 1)

                col[c] = False
                posDiag[r + c] = False
                negDiag[r - c + n] = False
                board[r][c] = "."

        backtrack(0)
        return res
```

```java
public class Solution {
    boolean[] col, posDiag, negDiag;
    List<List<String>> res;
    char[][] board;

    public List<List<String>> solveNQueens(int n) {
        col = new boolean[n];
        posDiag = new boolean[2 * n];
        negDiag = new boolean[2 * n];
        res = new ArrayList<>();
        board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }
        backtrack(0, n);
        return res;
    }

    private void backtrack(int r, int n) {
        if (r == n) {
            List<String> copy = new ArrayList<>();
            for (char[] row : board) {
                copy.add(new String(row));
            }
            res.add(copy);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                continue;
            }
            col[c] = true;
            posDiag[r + c] = true;
            negDiag[r - c + n] = true;
            board[r][c] = 'Q';

            backtrack(r + 1, n);

            col[c] = false;
            posDiag[r + c] = false;
            negDiag[r - c + n] = false;
            board[r][c] = '.';
        }
    }
}
```

```cpp
class Solution {
public:
    vector<string> board;
    vector<bool> col, posDiag, negDiag;
    vector<vector<string>> res;

    vector<vector<string>> solveNQueens(int n) {
        col.resize(n, false);
        posDiag.resize(2 * n, false);
        negDiag.resize(2 * n, false);
        board.resize(n, string(n, '.'));

        backtrack(0, n);
        return res;
    }

    void backtrack(int r, int n) {
        if (r == n) {
            res.push_back(board);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                continue;
            }
            col[c] = true;
            posDiag[r + c] = true;
            negDiag[r - c + n] = true;
            board[r][c] = 'Q';

            backtrack(r + 1, n);

            col[c] = false;
            posDiag[r + c] = false;
            negDiag[r - c + n] = false;
            board[r][c] = '.';
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        const col = Array(n).fill(false);
        const posDiag = Array(2 * n).fill(false);
        const negDiag = Array(2 * n).fill(false);
        const res = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
                return;
            }
            for (let c = 0; c < n; c++) {
                if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                    continue;
                }
                col[c] = true;
                posDiag[r + c] = true;
                negDiag[r - c + n] = true;
                board[r][c] = 'Q';

                backtrack(r + 1);

                col[c] = false;
                posDiag[r + c] = false;
                negDiag[r - c + n] = false;
                board[r][c] = '.';
            }
        }

        backtrack(0);
        return res;
    }
}
```

```csharp
public class Solution {
    bool[] col, posDiag, negDiag;
    List<List<string>> res;
    char[][] board;

    public List<List<string>> SolveNQueens(int n) {
        col = new bool[n];
        posDiag = new bool[2 * n];
        negDiag = new bool[2 * n];
        res = new List<List<string>>();
        board = new char[n][];
        for (int i = 0; i < n; i++) {
            board[i] = new string('.', n).ToCharArray();
        }
        Backtrack(0, n);
        return res;
    }

    private void Backtrack(int r, int n) {
        if (r == n) {
            var copy = new List<string>();
            foreach (var row in board) {
                copy.Add(new string(row));
            }
            res.Add(copy);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (col[c] || posDiag[r + c] || negDiag[r - c + n]) {
                continue;
            }
            col[c] = true;
            posDiag[r + c] = true;
            negDiag[r - c + n] = true;
            board[r][c] = 'Q';

            Backtrack(r + 1, n);

            col[c] = false;
            posDiag[r + c] = false;
            negDiag[r - c + n] = false;
            board[r][c] = '.';
        }
    }
}
```

```go
func solveNQueens(n int) [][]string {
    col := make([]bool, n)
    posDiag := make([]bool, 2*n)
    negDiag := make([]bool, 2*n)
    var res [][]string
    board := make([][]rune, n)
    for i := range board {
        board[i] = make([]rune, n)
        for j := range board[i] {
            board[i][j] = '.'
        }
    }

    var backtrack func(r int)
    backtrack = func(r int) {
        if r == n {
            solution := make([]string, n)
            for i := range board {
                solution[i] = string(board[i])
            }
            res = append(res, solution)
            return
        }

        for c := 0; c < n; c++ {
            if col[c] || posDiag[r+c] || negDiag[r-c+n] {
                continue
            }

            col[c] = true
            posDiag[r+c] = true
            negDiag[r-c+n] = true
            board[r][c] = 'Q'

            backtrack(r + 1)

            col[c] = false
            posDiag[r+c] = false
            negDiag[r-c+n] = false
            board[r][c] = '.'
        }
    }

    backtrack(0)
    return res
}
```

```kotlin
class Solution {
    fun solveNQueens(n: Int): List<List<String>> {
        val col = BooleanArray(n)
        val posDiag = BooleanArray(2 * n)
        val negDiag = BooleanArray(2 * n)
        val res = mutableListOf<List<String>>()
        val board = Array(n) { CharArray(n) { '.' } }

        fun backtrack(r: Int) {
            if (r == n) {
                res.add(board.map { it.joinToString("") })
                return
            }

            for (c in 0 until n) {
                if (col[c] || posDiag[r + c] || negDiag[r - c + n]) continue

                col[c] = true
                posDiag[r + c] = true
                negDiag[r - c + n] = true
                board[r][c] = 'Q'

                backtrack(r + 1)

                col[c] = false
                posDiag[r + c] = false
                negDiag[r - c + n] = false
                board[r][c] = '.'
            }
        }

        backtrack(0)
        return res
    }
}
```

```swift
class Solution {
    func solveNQueens(_ n: Int) -> [[String]] {
        var col = Array(repeating: false, count: n)
        var posDiag = Array(repeating: false, count: 2 * n)
        var negDiag = Array(repeating: false, count: 2 * n)
        var res = [[String]]()
        var board = Array(repeating: Array(repeating: ".", count: n), count: n)

        func backtrack(_ r: Int) {
            if r == n {
                let copy = board.map { $0.joined() }
                res.append(copy)
                return
            }

            for c in 0..<n {
                if col[c] || posDiag[r + c] || negDiag[r - c + n] {
                    continue
                }

                col[c] = true
                posDiag[r + c] = true
                negDiag[r - c + n] = true
                board[r][c] = "Q"

                backtrack(r + 1)

                col[c] = false
                posDiag[r + c] = false
                negDiag[r - c + n] = false
                board[r][c] = "."
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

## 4. Backtracking (Bit Mask)

### Intuition
This is the **most optimized backtracking approach** for the N-Queens problem.

Instead of using arrays or hash sets to track occupied columns and diagonals, we use **bit masks (integers)**.  
Each bit represents whether a column or diagonal is already occupied.

Why this works well:
- Integers allow **O(1)** checks using bitwise operations
- Uses **very little memory**
- Faster than arrays/sets in practice

For a queen placed at position `(row, col)`:
- **Column mask** → bit `col`
- **Positive diagonal (`/`)** → bit `(row + col)`
- **Negative diagonal (`\`)** → bit `(row - col + n)`

If any of these bits are already set, placing a queen there causes a conflict.

We still place queens **row by row**, but conflict checks are done using bitwise AND.

### Algorithm
1. Initialize three integers (bit masks):
   - `col` → tracks used columns
   - `posDiag` → tracks `row + col`
   - `negDiag` → tracks `row - col + n`
2. Initialize an empty `n x n` board filled with `"."`.
3. Start backtracking from row `0`.
4. For each `c` (column) in the current `r` (row):
   - Check conflicts using bitwise AND:
     - `col & (1 << c)`
     - `posDiag & (1 << (r + c))`
     - `negDiag & (1 << (r - c + n))`
   - If any is set → skip
5. If safe:
   - Set bits using XOR (`^=`) to mark column and diagonals
   - Place `"Q"` at `(r, c)`
   - Recurse to row `r + 1`
6. If `r == n`:
   - Convert the board to string format and save it
7. Backtrack:
   - Remove the queen
   - Toggle the same bits back using XOR
8. Continue until all valid boards are generated.

::tabs-start

```python
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        col = 0
        posDiag = 0
        negDiag = 0
        res = []
        board = [["."] * n for i in range(n)]

        def backtrack(r):
            nonlocal col, posDiag, negDiag
            if r == n:
                copy = ["".join(row) for row in board]
                res.append(copy)
                return
            for c in range(n):
                if ((col & (1 << c)) or (posDiag & (1 << (r + c)))
                    or (negDiag & (1 << (r - c + n)))):
                    continue
                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))
                board[r][c] = "Q"

                backtrack(r + 1)

                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))
                board[r][c] = "."

        backtrack(0)
        return res
```

```java
public class Solution {
    int col = 0, posDiag = 0, negDiag = 0;
    List<List<String>> res;
    char[][] board;

    public List<List<String>> solveNQueens(int n) {
        res = new ArrayList<>();
        board = new char[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] = '.';
            }
        }
        backtrack(0, n);
        return res;
    }

    private void backtrack(int r, int n) {
        if (r == n) {
            List<String> copy = new ArrayList<>();
            for (char[] row : board) {
                copy.add(new String(row));
            }
            res.add(copy);
            return;
        }
        for (int c = 0; c < n; c++) {
            if ((col & (1 << c)) > 0 || (posDiag & (1 << (r + c))) > 0
                 || (negDiag & (1 << (r - c + n))) > 0) {
                continue;
            }
            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
            board[r][c] = 'Q';

            backtrack(r + 1, n);

            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
            board[r][c] = '.';
        }
    }
}
```

```cpp
class Solution {
public:
    int col = 0, posDiag = 0, negDiag = 0;
    vector<string> board;
    vector<vector<string>> res;

    vector<vector<string>> solveNQueens(int n) {
        board.resize(n, string(n, '.'));

        backtrack(0, n);
        return res;
    }

    void backtrack(int r, int n) {
        if (r == n) {
            res.push_back(board);
            return;
        }
        for (int c = 0; c < n; c++) {
            if ((col & (1 << c)) || (posDiag & (1 << (r + c)))
                 || (negDiag & (1 << (r - c + n)))) {
                continue;
            }
            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
            board[r][c] = 'Q';

            backtrack(r + 1, n);

            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
            board[r][c] = '.';
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        let col = 0,
            posDiag = 0,
            negDiag = 0;
        const res = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map((row) => row.join('')));
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
                board[r][c] = 'Q';

                backtrack(r + 1);

                col ^= 1 << c;
                posDiag ^= 1 << (r + c);
                negDiag ^= 1 << (r - c + n);
                board[r][c] = '.';
            }
        }

        backtrack(0);
        return res;
    }
}
```

```csharp
public class Solution {
    int col = 0, posDiag = 0, negDiag = 0;
    List<List<string>> res;
    char[][] board;

    public List<List<string>> SolveNQueens(int n) {
        res = new List<List<string>>();
        board = new char[n][];
        for (int i = 0; i < n; i++) {
            board[i] = new string('.', n).ToCharArray();
        }
        Backtrack(0, n);
        return res;
    }

    private void Backtrack(int r, int n) {
        if (r == n) {
            var copy = new List<string>();
            foreach (var row in board) {
                copy.Add(new string(row));
            }
            res.Add(copy);
            return;
        }
        for (int c = 0; c < n; c++) {
            if ((col & (1 << c)) > 0 || (posDiag & (1 << (r + c))) > 0
                 || (negDiag & (1 << (r - c + n))) > 0) {
                continue;
            }
            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
            board[r][c] = 'Q';

            Backtrack(r + 1, n);

            col ^= (1 << c);
            posDiag ^= (1 << (r + c));
            negDiag ^= (1 << (r - c + n));
            board[r][c] = '.';
        }
    }
}
```

```go
func solveNQueens(n int) [][]string {
    var res [][]string
    board := make([][]rune, n)
    for i := range board {
        board[i] = make([]rune, n)
        for j := range board[i] {
            board[i][j] = '.'
        }
    }

    var backtrack func(r, col, posDiag, negDiag int)
    backtrack = func(r, col, posDiag, negDiag int) {
        if r == n {
            solution := make([]string, n)
            for i := range board {
                solution[i] = string(board[i])
            }
            res = append(res, solution)
            return
        }

        for c := 0; c < n; c++ {
            if (col&(1<<c)) != 0 || (posDiag&(1<<(r+c))) != 0 ||
               (negDiag&(1<<(r-c+n))) != 0 {
                continue
            }

            col ^= (1 << c)
            posDiag ^= (1 << (r + c))
            negDiag ^= (1 << (r - c + n))
            board[r][c] = 'Q'

            backtrack(r+1, col, posDiag, negDiag)

            col ^= (1 << c)
            posDiag ^= (1 << (r + c))
            negDiag ^= (1 << (r - c + n))
            board[r][c] = '.'
        }
    }

    backtrack(0, 0, 0, 0)
    return res
}
```

```kotlin
class Solution {
    fun solveNQueens(n: Int): List<List<String>> {
        val res = mutableListOf<List<String>>()
        val board = Array(n) { CharArray(n) { '.' } }

        fun backtrack(r: Int, col: Int, posDiag: Int, negDiag: Int) {
            if (r == n) {
                res.add(board.map { it.joinToString("") })
                return
            }

            for (c in 0 until n) {
                if ((col and (1 shl c)) != 0 || (posDiag and (1 shl (r + c))) != 0 ||
                    (negDiag and (1 shl (r - c + n))) != 0) {
                    continue
                }

                val newCol = col xor (1 shl c)
                val newPosDiag = posDiag xor (1 shl (r + c))
                val newNegDiag = negDiag xor (1 shl (r - c + n))
                board[r][c] = 'Q'

                backtrack(r + 1, newCol, newPosDiag, newNegDiag)

                board[r][c] = '.'
            }
        }

        backtrack(0, 0, 0, 0)
        return res
    }
}
```

```swift
class Solution {
    func solveNQueens(_ n: Int) -> [[String]] {
        var col = 0
        var posDiag = 0
        var negDiag = 0
        var res = [[String]]()
        var board = Array(repeating: Array(repeating: ".", count: n), count: n)

        func backtrack(_ r: Int) {
            if r == n {
                let copy = board.map { $0.joined() }
                res.append(copy)
                return
            }

            for c in 0..<n {
                if ((col & (1 << c)) != 0 || (posDiag & (1 << (r + c))) != 0 ||
                    (negDiag & (1 << (r - c + n))) != 0) {
                    continue
                }

                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))
                board[r][c] = "Q"

                backtrack(r + 1)

                col ^= (1 << c)
                posDiag ^= (1 << (r + c))
                negDiag ^= (1 << (r - c + n))
                board[r][c] = "."
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
