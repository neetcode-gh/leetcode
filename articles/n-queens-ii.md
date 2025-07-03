## 1. Backtracking

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n ^ 2)$

---

## 2. Backtracking (Hash Set)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n)$

---

## 3. Backtracking (Boolean Array)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n)$

---

## 4. Backtracking (Bit Mask)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n!)$
- Space complexity: $O(n)$ for recursion stack.
