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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
