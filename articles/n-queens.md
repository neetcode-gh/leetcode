## 1. Backtracking

::tabs-start

```python
class Solution:
    def solveNQueens(self, n: int):
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
        let board = Array.from({length: n}, () => Array(n).fill('.'));
        
        const backtrack = (r) => {
            if (r === n) {
                res.push(board.map(row => row.join('')));
                return;
            }
            for (let c = 0; c < n; c++) {
                if (this.isSafe(r, c, board)) {
                    board[r][c] = 'Q';
                    backtrack(r + 1);
                    board[r][c] = '.';
                }
            }
        }
        
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n!)$
* Space complexity: $O(n ^ 2)$

---

## 2. Backtracking (Hash Set)

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
        const board = Array.from({ length: n }, 
                      () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map(row => row.join('')));
                return;
            }

            for (let c = 0; c < n; c++) {
                if (col.has(c) || posDiag.has(r + c) ||
                    negDiag.has(r - c)) {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n!)$
* Space complexity: $O(n ^ 2)$

---

## 3. Backtracking (Visited Array)

::tabs-start

```python
class Solution:
    def solveNQueens(self, n: int):
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
        const board = Array.from({ length: n }, 
                      () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map(row => row.join('')));
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

                backtrack(r + 1, n);
                
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n!)$
* Space complexity: $O(n ^ 2)$

---

## 4. Backtracking (Bit Mask)

::tabs-start

```python
class Solution:
    def solveNQueens(self, n: int):
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
        let col = 0, posDiag = 0, negDiag = 0;
        const res = [];
        const board = Array.from({ length: n }, 
                      () => Array(n).fill('.'));

        /**
         * @param {number} r
         * @return {void}
         */
        function backtrack(r) {
            if (r === n) {
                res.push(board.map(row => row.join('')));
                return;
            }
            for (let c = 0; c < n; c++) {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n!)$
* Space complexity: $O(n ^ 2)$