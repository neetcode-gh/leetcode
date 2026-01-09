## 1. Iteration - I

::tabs-start

```python
class Solution:
    def checkMove(self, board: List[List[str]], rMove: int, cMove: int, color: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        direction = [[1, 0], [-1, 0], [0, 1], [0, -1],
                     [1, 1], [-1, -1], [1, -1], [-1, 1]]

        board[rMove][cMove] = color

        def legal(row, col, color, direc):
            dr, dc = direc
            row, col = row + dr, col + dc
            length = 1

            while 0 <= row < ROWS and 0 <= col < COLS:
                length += 1
                if board[row][col] == ".":
                    return False
                if board[row][col] == color:
                    return length >= 3
                row, col = row + dr, col + dc
            return False

        for d in direction:
            if legal(rMove, cMove, color, d):
                return True
        return False
```

```java
public class Solution {
    public boolean checkMove(char[][] board, int rMove, int cMove, char color) {
        int ROWS = board.length, COLS = board[0].length;
        int[][] direction = {{1, 0}, {-1, 0}, {0, 1}, {0, -1},
                             {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};

        board[rMove][cMove] = color;

        for (int[] d : direction) {
            if (legal(board, rMove, cMove, color, d)) {
                return true;
            }
        }
        return false;
    }

    private boolean legal(char[][] board, int row, int col, char color, int[] direc) {
        int ROWS = board.length, COLS = board[0].length;
        int dr = direc[0], dc = direc[1];
        row += dr;
        col += dc;
        int length = 1;

        while (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            length++;
            if (board[row][col] == '.') {
                return false;
            }
            if (board[row][col] == color) {
                return length >= 3;
            }
            row += dr;
            col += dc;
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool checkMove(vector<vector<char>>& board, int rMove, int cMove, char color) {
        int ROWS = board.size(), COLS = board[0].size();
        vector<vector<int>> direction = {{1, 0}, {-1, 0}, {0, 1}, {0, -1},
                                         {1, 1}, {-1, -1}, {1, -1}, {-1, 1}};

        board[rMove][cMove] = color;

        for (auto& d : direction) {
            if (legal(board, rMove, cMove, color, d)) {
                return true;
            }
        }
        return false;
    }

private:
    bool legal(vector<vector<char>>& board, int row, int col, char color, vector<int>& direc) {
        int ROWS = board.size(), COLS = board[0].size();
        int dr = direc[0], dc = direc[1];
        row += dr;
        col += dc;
        int length = 1;

        while (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            length++;
            if (board[row][col] == '.') {
                return false;
            }
            if (board[row][col] == color) {
                return length >= 3;
            }
            row += dr;
            col += dc;
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {number} rMove
     * @param {number} cMove
     * @param {character} color
     * @return {boolean}
     */
    checkMove(board, rMove, cMove, color) {
        const ROWS = board.length,
            COLS = board[0].length;
        const direction = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
            [1, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
        ];

        board[rMove][cMove] = color;

        const legal = (row, col, color, [dr, dc]) => {
            row += dr;
            col += dc;
            let length = 1;

            while (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
                length++;
                if (board[row][col] === '.') {
                    return false;
                }
                if (board[row][col] === color) {
                    return length >= 3;
                }
                row += dr;
                col += dc;
            }
            return false;
        };

        for (let d of direction) {
            if (legal(rMove, cMove, color, d)) {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckMove(char[][] board, int rMove, int cMove, char color) {
        int ROWS = board.Length, COLS = board[0].Length;
        int[][] direction = new int[][] {
            new int[] {1, 0}, new int[] {-1, 0}, new int[] {0, 1}, new int[] {0, -1},
            new int[] {1, 1}, new int[] {-1, -1}, new int[] {1, -1}, new int[] {-1, 1}
        };

        board[rMove][cMove] = color;

        foreach (int[] d in direction) {
            if (Legal(board, rMove, cMove, color, d)) {
                return true;
            }
        }
        return false;
    }

    private bool Legal(char[][] board, int row, int col, char color, int[] direc) {
        int ROWS = board.Length, COLS = board[0].Length;
        int dr = direc[0], dc = direc[1];
        row += dr;
        col += dc;
        int length = 1;

        while (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
            length++;
            if (board[row][col] == '.') {
                return false;
            }
            if (board[row][col] == color) {
                return length >= 3;
            }
            row += dr;
            col += dc;
        }
        return false;
    }
}
```

```go
func checkMove(board [][]byte, rMove int, cMove int, color byte) bool {
    ROWS, COLS := len(board), len(board[0])
    direction := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1},
                         {1, 1}, {-1, -1}, {1, -1}, {-1, 1}}

    board[rMove][cMove] = color

    legal := func(row, col int, color byte, direc []int) bool {
        dr, dc := direc[0], direc[1]
        row += dr
        col += dc
        length := 1

        for row >= 0 && row < ROWS && col >= 0 && col < COLS {
            length++
            if board[row][col] == '.' {
                return false
            }
            if board[row][col] == color {
                return length >= 3
            }
            row += dr
            col += dc
        }
        return false
    }

    for _, d := range direction {
        if legal(rMove, cMove, color, d) {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun checkMove(board: Array<CharArray>, rMove: Int, cMove: Int, color: Char): Boolean {
        val ROWS = board.size
        val COLS = board[0].size
        val direction = arrayOf(
            intArrayOf(1, 0), intArrayOf(-1, 0), intArrayOf(0, 1), intArrayOf(0, -1),
            intArrayOf(1, 1), intArrayOf(-1, -1), intArrayOf(1, -1), intArrayOf(-1, 1)
        )

        board[rMove][cMove] = color

        fun legal(row: Int, col: Int, color: Char, direc: IntArray): Boolean {
            var r = row + direc[0]
            var c = col + direc[1]
            var length = 1

            while (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
                length++
                if (board[r][c] == '.') {
                    return false
                }
                if (board[r][c] == color) {
                    return length >= 3
                }
                r += direc[0]
                c += direc[1]
            }
            return false
        }

        for (d in direction) {
            if (legal(rMove, cMove, color, d)) {
                return true
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func checkMove(_ board: inout [[Character]], _ rMove: Int, _ cMove: Int, _ color: Character) -> Bool {
        let ROWS = board.count, COLS = board[0].count
        let direction = [[1, 0], [-1, 0], [0, 1], [0, -1],
                         [1, 1], [-1, -1], [1, -1], [-1, 1]]

        board[rMove][cMove] = color

        func legal(_ row: Int, _ col: Int, _ color: Character, _ direc: [Int]) -> Bool {
            var row = row + direc[0]
            var col = col + direc[1]
            var length = 1

            while row >= 0 && row < ROWS && col >= 0 && col < COLS {
                length += 1
                if board[row][col] == "." {
                    return false
                }
                if board[row][col] == color {
                    return length >= 3
                }
                row += direc[0]
                col += direc[1]
            }
            return false
        }

        for d in direction {
            if legal(rMove, cMove, color, d) {
                return true
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 2. Iteration - II

::tabs-start

```python
class Solution:
    def checkMove(self, board: List[List[str]], rMove: int, cMove: int, color: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        direction = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1]

        board[rMove][cMove] = color

        for d in range(9):
            length = 1
            row, col = rMove, cMove
            while True:
                row += direction[d]
                col += direction[d + 1]

                if row < 0 or col < 0 or row >= ROWS or col >= COLS or board[row][col] == ".":
                    break
                if board[row][col] == color:
                    if length > 1:
                        return True
                    break
                length += 1

        return False
```

```java
public class Solution {
    public boolean checkMove(char[][] board, int rMove, int cMove, char color) {
        int ROWS = board.length, COLS = board[0].length;
        int[] direction = {0, 1, 0, -1, 0, 1, 1, -1, -1, 1};

        board[rMove][cMove] = color;

        for (int d = 0; d < 9; d++) {
            int row = rMove, col = cMove;
            for (int length = 1; ; ++length) {
                row += direction[d];
                col += direction[d + 1];

                if (row < 0 || col < 0 || row >= ROWS || col >= COLS || board[row][col] == '.')
                    break;
                if (board[row][col] == color) {
                    if (length > 1)
                        return true;
                    break;
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
    bool checkMove(vector<vector<char>>& board, int rMove, int cMove, char color) {
        int ROWS = board.size(), COLS = board[0].size();
        int direction[10] = {0, 1, 0, -1, 0, 1, 1, -1, -1, 1};

        board[rMove][cMove] = color;

        for (int d = 0; d < 9; ++d) {
            int row = rMove, col = cMove;
            for (int length = 1; ; ++length) {
                row += direction[d];
                col += direction[d + 1];

                if (row < 0 || col < 0 || row >= ROWS || col >= COLS || board[row][col] == '.')
                    break;
                if (board[row][col] == color) {
                    if (length > 1)
                        return true;
                    break;
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
     * @param {character[][]} board
     * @param {number} rMove
     * @param {number} cMove
     * @param {character} color
     * @return {boolean}
     */
    checkMove(board, rMove, cMove, color) {
        const ROWS = board.length,
            COLS = board[0].length;
        const direction = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1];

        board[rMove][cMove] = color;

        for (let d = 0; d < 9; d++) {
            let row = rMove,
                col = cMove;
            for (let length = 1; ; ++length) {
                row += direction[d];
                col += direction[d + 1];

                if (
                    row < 0 ||
                    col < 0 ||
                    row >= ROWS ||
                    col >= COLS ||
                    board[row][col] === '.'
                )
                    break;
                if (board[row][col] === color) {
                    if (length > 1) return true;
                    break;
                }
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckMove(char[][] board, int rMove, int cMove, char color) {
        int ROWS = board.Length, COLS = board[0].Length;
        int[] direction = {0, 1, 0, -1, 0, 1, 1, -1, -1, 1};

        board[rMove][cMove] = color;

        for (int d = 0; d < 9; d++) {
            int row = rMove, col = cMove;
            for (int length = 1; ; ++length) {
                row += direction[d];
                col += direction[d + 1];

                if (row < 0 || col < 0 || row >= ROWS || col >= COLS || board[row][col] == '.')
                    break;
                if (board[row][col] == color) {
                    if (length > 1)
                        return true;
                    break;
                }
            }
        }
        return false;
    }
}
```

```go
func checkMove(board [][]byte, rMove int, cMove int, color byte) bool {
    ROWS, COLS := len(board), len(board[0])
    direction := []int{0, 1, 0, -1, 0, 1, 1, -1, -1, 1}

    board[rMove][cMove] = color

    for d := 0; d < 9; d++ {
        row, col := rMove, cMove
        for length := 1; ; length++ {
            row += direction[d]
            col += direction[d+1]

            if row < 0 || col < 0 || row >= ROWS || col >= COLS || board[row][col] == '.' {
                break
            }
            if board[row][col] == color {
                if length > 1 {
                    return true
                }
                break
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun checkMove(board: Array<CharArray>, rMove: Int, cMove: Int, color: Char): Boolean {
        val ROWS = board.size
        val COLS = board[0].size
        val direction = intArrayOf(0, 1, 0, -1, 0, 1, 1, -1, -1, 1)

        board[rMove][cMove] = color

        for (d in 0 until 9) {
            var row = rMove
            var col = cMove
            var length = 1
            while (true) {
                row += direction[d]
                col += direction[d + 1]

                if (row < 0 || col < 0 || row >= ROWS || col >= COLS || board[row][col] == '.')
                    break
                if (board[row][col] == color) {
                    if (length > 1)
                        return true
                    break
                }
                length++
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func checkMove(_ board: inout [[Character]], _ rMove: Int, _ cMove: Int, _ color: Character) -> Bool {
        let ROWS = board.count, COLS = board[0].count
        let direction = [0, 1, 0, -1, 0, 1, 1, -1, -1, 1]

        board[rMove][cMove] = color

        for d in 0..<9 {
            var row = rMove, col = cMove
            var length = 1
            while true {
                row += direction[d]
                col += direction[d + 1]

                if row < 0 || col < 0 || row >= ROWS || col >= COLS || board[row][col] == "." {
                    break
                }
                if board[row][col] == color {
                    if length > 1 {
                        return true
                    }
                    break
                }
                length += 1
            }
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
