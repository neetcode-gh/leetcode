## 1. Optimized Brute Force

### Intuition
In Tic-Tac-Toe, a player wins by filling an entire row, column, or diagonal. After each move, we only need to check if that specific move creates a winning condition. Instead of checking the entire board, we focus on the row and column affected by the move, and check the diagonals only if the move is on one of them.

### Algorithm
1. Initialize an `n x n` board with all cells set to `0`.
2. When a player makes a move at position `(row, col)`, mark that cell with the player's number.
3. Check if the player wins by:
   - Checking if all cells in the current row belong to the player.
   - Checking if all cells in the current column belong to the player.
   - If the move is on the main diagonal (`row == col`), check if all diagonal cells belong to the player.
   - If the move is on the anti-diagonal (`col == n - row - 1`), check if all anti-diagonal cells belong to the player.
4. Return the player number if any winning condition is met, otherwise return `0`.

::tabs-start

```python
class TicTacToe:
    def __init__(self, n: int):
        self.board = [[0] * n for _ in range(n)]
        self.n = n
    
    def move(self, row: int, col: int, player: int) -> int:
        self.board[row][col] = player
        
        # check if the player wins
        if ((self._check_row(row, player)) or
            (self._check_column(col, player)) or
            (row == col and self._check_diagonal(player)) or
            (col == self.n - row - 1 and self._check_anti_diagonal(player))):
            return player
        
        # No one wins
        return 0
    
    def _check_diagonal(self, player: int) -> bool:
        for row in range(self.n):
            if self.board[row][row] != player:
                return False
        return True
    
    def _check_anti_diagonal(self, player: int) -> bool:
        for row in range(self.n):
            if self.board[row][self.n - row - 1] != player:
                return False
        return True
    
    def _check_column(self, col: int, player: int) -> bool:
        for row in range(self.n):
            if self.board[row][col] != player:
                return False
        return True
    
    def _check_row(self, row: int, player: int) -> bool:
        for col in range(self.n):
            if self.board[row][col] != player:
                return False
        return True
```

```java
class TicTacToe {

    private int[][] board;
    private int n;

    public TicTacToe(int n) {
        board = new int[n][n];
        this.n = n;
    }

    public int move(int row, int col, int player) {
        board[row][col] = player;
        // check if the player wins
        if ((checkRow(row, player)) ||
            (checkColumn(col, player)) ||
            (row == col && checkDiagonal(player)) ||
            (col == n - row - 1 && checkAntiDiagonal(player))) {
            return player;
        }
        // No one wins
        return 0;
    }

    private boolean checkDiagonal(int player) {
        for (int row = 0; row < n; row++) {
            if (board[row][row] != player) {
                return false;
            }
        }
        return true;
    }

    private boolean checkAntiDiagonal(int player) {
        for (int row = 0; row < n; row++) {
            if (board[row][n - row - 1] != player) {
                return false;
            }
        }
        return true;
    }

    private boolean checkColumn(int col, int player) {
        for (int row = 0; row < n; row++) {
            if (board[row][col] != player) {
                return false;
            }
        }
        return true;
    }

    private boolean checkRow(int row, int player) {
        for (int col = 0; col < n; col++) {
            if (board[row][col] != player) {
                return false;
            }
        }
        return true;
    }
}
```

```cpp
class TicTacToe {
public:
    vector<vector<int>> board;
    int n;

    TicTacToe(int n) {
        board.assign(n, vector<int>(n, 0));
        this->n = n;
    }

    int move(int row, int col, int player) {
        board[row][col] = player;
        if (checkCol(col, player) ||
            checkRow(row, player) ||
            (row == col && checkDiagonal(player)) ||
            (row == n - col - 1 && checkAntiDiagonal(player))) {
            return player;
        }
        // No one wins
        return 0;
    }

    bool checkDiagonal(int player) {
        for (int row = 0; row < n; row++) {
            if (board[row][row] != player) return false;
        }
        return true;
    }

    bool checkAntiDiagonal(int player) {
        for (int row = 0; row < n; row++) {
            if (board[row][n - row - 1] != player) return false;
        }
        return true;
    }

    bool checkCol(int col, int player) {
        for (int row = 0; row < n; row++) {
            if (board[row][col] != player) return false;
        }
        return true;
    }

    bool checkRow(int row, int player) {
        for (int col = 0; col < n; col++) {
            if (board[row][col] != player) return false;
        }
        return true;
    }
};
```

```javascript
class TicTacToe {
    /**
     * @param {number} n
     */
    constructor(n) {
        this.board = Array.from({length: n}, () => Array(n).fill(0));
        this.n = n;
    }

    /**
     * @param {number} row
     * @param {number} col
     * @param {number} player
     * @return {number}
     */
    move(row, col, player) {
        this.board[row][col] = player;

        // check if the player wins
        if ((this.checkRow(row, player)) ||
            (this.checkColumn(col, player)) ||
            (row === col && this.checkDiagonal(player)) ||
            (col === this.n - row - 1 && this.checkAntiDiagonal(player))) {
            return player;
        }

        // No one wins
        return 0;
    }

    checkDiagonal(player) {
        for (let row = 0; row < this.n; row++) {
            if (this.board[row][row] !== player) {
                return false;
            }
        }
        return true;
    }

    checkAntiDiagonal(player) {
        for (let row = 0; row < this.n; row++) {
            if (this.board[row][this.n - row - 1] !== player) {
                return false;
            }
        }
        return true;
    }

    checkColumn(col, player) {
        for (let row = 0; row < this.n; row++) {
            if (this.board[row][col] !== player) {
                return false;
            }
        }
        return true;
    }

    checkRow(row, player) {
        for (let col = 0; col < this.n; col++) {
            if (this.board[row][col] !== player) {
                return false;
            }
        }
        return true;
    }
}
```

```csharp
public class TicTacToe {
    private int[,] board;
    private int n;

    public TicTacToe(int n) {
        board = new int[n, n];
        this.n = n;
    }

    public int Move(int row, int col, int player) {
        board[row, col] = player;
        if (CheckRow(row, player) ||
            CheckColumn(col, player) ||
            (row == col && CheckDiagonal(player)) ||
            (col == n - row - 1 && CheckAntiDiagonal(player))) {
            return player;
        }
        return 0;
    }

    private bool CheckDiagonal(int player) {
        for (int row = 0; row < n; row++) {
            if (board[row, row] != player) return false;
        }
        return true;
    }

    private bool CheckAntiDiagonal(int player) {
        for (int row = 0; row < n; row++) {
            if (board[row, n - row - 1] != player) return false;
        }
        return true;
    }

    private bool CheckColumn(int col, int player) {
        for (int row = 0; row < n; row++) {
            if (board[row, col] != player) return false;
        }
        return true;
    }

    private bool CheckRow(int row, int player) {
        for (int col = 0; col < n; col++) {
            if (board[row, col] != player) return false;
        }
        return true;
    }
}
```

```go
type TicTacToe struct {
    board [][]int
    n     int
}

func Constructor(n int) TicTacToe {
    board := make([][]int, n)
    for i := range board {
        board[i] = make([]int, n)
    }
    return TicTacToe{board: board, n: n}
}

func (this *TicTacToe) Move(row int, col int, player int) int {
    this.board[row][col] = player
    if this.checkRow(row, player) ||
        this.checkColumn(col, player) ||
        (row == col && this.checkDiagonal(player)) ||
        (col == this.n-row-1 && this.checkAntiDiagonal(player)) {
        return player
    }
    return 0
}

func (this *TicTacToe) checkDiagonal(player int) bool {
    for row := 0; row < this.n; row++ {
        if this.board[row][row] != player {
            return false
        }
    }
    return true
}

func (this *TicTacToe) checkAntiDiagonal(player int) bool {
    for row := 0; row < this.n; row++ {
        if this.board[row][this.n-row-1] != player {
            return false
        }
    }
    return true
}

func (this *TicTacToe) checkColumn(col int, player int) bool {
    for row := 0; row < this.n; row++ {
        if this.board[row][col] != player {
            return false
        }
    }
    return true
}

func (this *TicTacToe) checkRow(row int, player int) bool {
    for col := 0; col < this.n; col++ {
        if this.board[row][col] != player {
            return false
        }
    }
    return true
}
```

```kotlin
class TicTacToe(n: Int) {
    private val board = Array(n) { IntArray(n) }
    private val n = n

    fun move(row: Int, col: Int, player: Int): Int {
        board[row][col] = player
        if (checkRow(row, player) ||
            checkColumn(col, player) ||
            (row == col && checkDiagonal(player)) ||
            (col == n - row - 1 && checkAntiDiagonal(player))) {
            return player
        }
        return 0
    }

    private fun checkDiagonal(player: Int): Boolean {
        for (row in 0 until n) {
            if (board[row][row] != player) return false
        }
        return true
    }

    private fun checkAntiDiagonal(player: Int): Boolean {
        for (row in 0 until n) {
            if (board[row][n - row - 1] != player) return false
        }
        return true
    }

    private fun checkColumn(col: Int, player: Int): Boolean {
        for (row in 0 until n) {
            if (board[row][col] != player) return false
        }
        return true
    }

    private fun checkRow(row: Int, player: Int): Boolean {
        for (col in 0 until n) {
            if (board[row][col] != player) return false
        }
        return true
    }
}
```

```swift
class TicTacToe {
    private var board: [[Int]]
    private var n: Int

    init(_ n: Int) {
        self.board = Array(repeating: Array(repeating: 0, count: n), count: n)
        self.n = n
    }

    func move(_ row: Int, _ col: Int, _ player: Int) -> Int {
        board[row][col] = player
        if checkRow(row, player) ||
            checkColumn(col, player) ||
            (row == col && checkDiagonal(player)) ||
            (col == n - row - 1 && checkAntiDiagonal(player)) {
            return player
        }
        return 0
    }

    private func checkDiagonal(_ player: Int) -> Bool {
        for row in 0..<n {
            if board[row][row] != player { return false }
        }
        return true
    }

    private func checkAntiDiagonal(_ player: Int) -> Bool {
        for row in 0..<n {
            if board[row][n - row - 1] != player { return false }
        }
        return true
    }

    private func checkColumn(_ col: Int, _ player: Int) -> Bool {
        for row in 0..<n {
            if board[row][col] != player { return false }
        }
        return true
    }

    private func checkRow(_ row: Int, _ player: Int) -> Bool {
        for col in 0..<n {
            if board[row][col] != player { return false }
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n^2)$

>  Where $n$ is the size of the Tic-Tac-Toe board.

---

## 2. Optimized Approach

### Intuition
Rather than storing the entire board and checking all cells in a row, column, or diagonal after each move, we can maintain running counts. By using `+1` for player 1 and `-1` for player 2, we can track the cumulative sum for each row, column, and both diagonals. A player wins when any of these sums reaches `+n` or `-n`, indicating that all `n` cells in that line belong to the same player.

### Algorithm
1. Initialize arrays to track the sum of moves for each row and column, plus two variables for the main diagonal and anti-diagonal.
2. When a player makes a move at position `(row, col)`:
   - Convert the player to `+1` (player 1) or `-1` (player 2).
   - Add this value to the corresponding row and column counters.
   - If the move is on the main diagonal (`row == col`), update the diagonal counter.
   - If the move is on the anti-diagonal (`col == n - row - 1`), update the anti-diagonal counter.
3. Check if the absolute value of any counter equals `n`. If so, return the player number.
4. Return `0` if no winner yet.

::tabs-start

```python
class TicTacToe:
    
    def __init__(self, n: int):
        self.rows = [0] * n
        self.cols = [0] * n
        self.diagonal = 0
        self.antiDiagonal = 0

    def move(self, row: int, col: int, player: int) -> int:
        currentPlayer = 1 if player == 1 else -1
        
        # update currentPlayer in rows and cols arrays
        self.rows[row] += currentPlayer
        self.cols[col] += currentPlayer
        
        # update diagonal
        if row == col:
            self.diagonal += currentPlayer
        
        # update anti diagonal
        if col == (len(self.cols) - row - 1):
            self.antiDiagonal += currentPlayer
        
        n = len(self.rows)
        
        # check if the current player wins
        if (abs(self.rows[row]) == n or
            abs(self.cols[col]) == n or
            abs(self.diagonal) == n or
            abs(self.antiDiagonal) == n):
            return player
        
        # No one wins
        return 0
```

```java
class TicTacToe {
    
    int[] rows;
    int[] cols;
    int diagonal;
    int antiDiagonal;

    public TicTacToe(int n) {
        rows = new int[n];
        cols = new int[n];
    }

    public int move(int row, int col, int player) {
        int currentPlayer = (player == 1) ? 1 : -1;

        // update currentPlayer in rows and cols arrays
        rows[row] += currentPlayer;
        cols[col] += currentPlayer;

        // update diagonal
        if (row == col) {
            diagonal += currentPlayer;
        }

        // update anti diagonal
        if (col == (cols.length - row - 1)) {
            antiDiagonal += currentPlayer;
        }

        int n = rows.length;
        // check if the current player wins
        if (Math.abs(rows[row]) == n ||
                Math.abs(cols[col]) == n ||
                Math.abs(diagonal) == n ||
                Math.abs(antiDiagonal) == n) {
            return player;
        }

        // No one wins
        return 0;
    }
}
```

```cpp
class TicTacToe {
public:
    vector<int> rows;
    vector<int> cols;
    int diagonal;
    int antiDiagonal;

    TicTacToe(int n) {
        rows.assign(n, 0);
        cols.assign(n, 0);
        diagonal = 0;
        antiDiagonal = 0;
    }

    int move(int row, int col, int player) {
        int currentPlayer = (player == 1) ? 1 : -1;

        // update currentPlayer in rows and cols arrays
        rows[row] += currentPlayer;
        cols[col] += currentPlayer;

        // update diagonal
        if (row == col) {
            diagonal += currentPlayer;
        }

        // update anti diagonal
        if (col == (cols.size() - row - 1)) {
            antiDiagonal += currentPlayer;
        }
        
        int n = rows.size();
        // check if the current player wins
        if (abs(rows[row]) == n ||
            abs(cols[col]) == n ||
            abs(diagonal) == n ||
            abs(antiDiagonal) == n) {
            return player;
        }

        // No one wins
        return 0;
    }
};
```

```javascript
class TicTacToe {

    /**
     * @param {number} n
     */
    constructor(n) {
        this.rows = new Array(n).fill(0);
        this.cols = new Array(n).fill(0);
        this.diagonal = 0;
        this.antiDiagonal = 0;
    }

    /**
     * @param {number} row
     * @param {number} col
     * @param {number} player
     * @return {number}
     */
    move(row, col, player) {
        let currentPlayer = (player === 1) ? 1 : -1;

        // update currentPlayer in rows and cols arrays
        this.rows[row] += currentPlayer;
        this.cols[col] += currentPlayer;

        // update diagonal
        if (row === col) {
            this.diagonal += currentPlayer;
        }

        // update anti diagonal
        if (col === (this.cols.length - row - 1)) {
            this.antiDiagonal += currentPlayer;
        }

        let n = this.rows.length;

        // check if the current player wins
        if (Math.abs(this.rows[row]) === n ||
            Math.abs(this.cols[col]) === n ||
            Math.abs(this.diagonal) === n ||
            Math.abs(this.antiDiagonal) === n) {
            return player;
        }

        // No one wins
        return 0;
    }
}
```

```csharp
public class TicTacToe {
    private int[] rows;
    private int[] cols;
    private int diagonal;
    private int antiDiagonal;

    public TicTacToe(int n) {
        rows = new int[n];
        cols = new int[n];
    }

    public int Move(int row, int col, int player) {
        int currentPlayer = (player == 1) ? 1 : -1;

        rows[row] += currentPlayer;
        cols[col] += currentPlayer;

        if (row == col) {
            diagonal += currentPlayer;
        }

        if (col == cols.Length - row - 1) {
            antiDiagonal += currentPlayer;
        }

        int n = rows.Length;
        if (Math.Abs(rows[row]) == n ||
            Math.Abs(cols[col]) == n ||
            Math.Abs(diagonal) == n ||
            Math.Abs(antiDiagonal) == n) {
            return player;
        }

        return 0;
    }
}
```

```go
type TicTacToe struct {
    rows         []int
    cols         []int
    diagonal     int
    antiDiagonal int
}

func Constructor(n int) TicTacToe {
    return TicTacToe{
        rows: make([]int, n),
        cols: make([]int, n),
    }
}

func (this *TicTacToe) Move(row int, col int, player int) int {
    currentPlayer := 1
    if player != 1 {
        currentPlayer = -1
    }

    this.rows[row] += currentPlayer
    this.cols[col] += currentPlayer

    if row == col {
        this.diagonal += currentPlayer
    }

    if col == len(this.cols)-row-1 {
        this.antiDiagonal += currentPlayer
    }

    n := len(this.rows)
    if abs(this.rows[row]) == n ||
        abs(this.cols[col]) == n ||
        abs(this.diagonal) == n ||
        abs(this.antiDiagonal) == n {
        return player
    }

    return 0
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class TicTacToe(n: Int) {
    private val rows = IntArray(n)
    private val cols = IntArray(n)
    private var diagonal = 0
    private var antiDiagonal = 0

    fun move(row: Int, col: Int, player: Int): Int {
        val currentPlayer = if (player == 1) 1 else -1

        rows[row] += currentPlayer
        cols[col] += currentPlayer

        if (row == col) {
            diagonal += currentPlayer
        }

        if (col == cols.size - row - 1) {
            antiDiagonal += currentPlayer
        }

        val n = rows.size
        if (kotlin.math.abs(rows[row]) == n ||
            kotlin.math.abs(cols[col]) == n ||
            kotlin.math.abs(diagonal) == n ||
            kotlin.math.abs(antiDiagonal) == n) {
            return player
        }

        return 0
    }
}
```

```swift
class TicTacToe {
    private var rows: [Int]
    private var cols: [Int]
    private var diagonal: Int
    private var antiDiagonal: Int

    init(_ n: Int) {
        rows = [Int](repeating: 0, count: n)
        cols = [Int](repeating: 0, count: n)
        diagonal = 0
        antiDiagonal = 0
    }

    func move(_ row: Int, _ col: Int, _ player: Int) -> Int {
        let currentPlayer = (player == 1) ? 1 : -1

        rows[row] += currentPlayer
        cols[col] += currentPlayer

        if row == col {
            diagonal += currentPlayer
        }

        if col == cols.count - row - 1 {
            antiDiagonal += currentPlayer
        }

        let n = rows.count
        if abs(rows[row]) == n ||
            abs(cols[col]) == n ||
            abs(diagonal) == n ||
            abs(antiDiagonal) == n {
            return player
        }

        return 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(n)$

>  Where $n$ is the size of the Tic-Tac-Toe board.

---

## Common Pitfalls

### Incorrect Anti-Diagonal Check

The anti-diagonal condition is often implemented incorrectly. Remember that for a cell to be on the anti-diagonal, the condition is `col == n - row - 1`, not `row + col == n`.

```python
# Wrong
if row + col == n:  # Off by one error
    self.antiDiagonal += currentPlayer

# Correct
if col == n - row - 1:
    self.antiDiagonal += currentPlayer
```

### Forgetting the Center Cell in Odd-Sized Boards

For odd-sized boards (e.g., 3x3), the center cell lies on both diagonals. Failing to update both diagonal counters when a move is placed at the center will cause incorrect win detection.

```python
# The center cell (1,1) in a 3x3 board satisfies BOTH conditions:
# row == col (main diagonal)
# col == n - row - 1 (anti-diagonal)
# Both counters must be updated
```

### Using Separate Counters Per Player

A common mistake is using separate counters for each player instead of a single counter with +1/-1 encoding. This doubles the space and complicates the win-checking logic.

```python
# Inefficient approach
self.rows_p1 = [0] * n
self.rows_p2 = [0] * n

# Optimal approach - single counter with +1/-1
self.rows = [0] * n
currentPlayer = 1 if player == 1 else -1
self.rows[row] += currentPlayer
```