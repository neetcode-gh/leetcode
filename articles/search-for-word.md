## 1. Backtracking (Hash Set)

::tabs-start

```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        path = set()

        def dfs(r, c, i):
            if i == len(word):
                return True
            
            if (min(r, c) < 0 or
                r >= ROWS or c >= COLS or
                word[i] != board[r][c] or
                (r, c) in path):
                return False
            
            path.add((r, c))
            res = (dfs(r + 1, c, i + 1) or
                   dfs(r - 1, c, i + 1) or
                   dfs(r, c + 1, i + 1) or
                   dfs(r, c - 1, i + 1))
            path.remove((r, c))
            return res
        
        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0):
                    return True
        return False
```

```java
public class Solution {
    private int ROWS, COLS;
    private Set<Pair<Integer, Integer>> path = new HashSet<>();

    public boolean exist(char[][] board, String word) {
        ROWS = board.length;
        COLS = board[0].length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int r, int c, int i) {
        if (i == word.length()) {
            return true;
        }

        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word.charAt(i) || 
            path.contains(new Pair<>(r, c))) {
            return false;
        }

        path.add(new Pair<>(r, c));
        boolean res = dfs(board, word, r + 1, c, i + 1) || 
                      dfs(board, word, r - 1, c, i + 1) ||
                      dfs(board, word, r, c + 1, i + 1) || 
                      dfs(board, word, r, c - 1, i + 1);
        path.remove(new Pair<>(r, c));

        return res;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    set<pair<int, int>> path;

    bool exist(vector<vector<char>>& board, string word) {
        ROWS = board.size();
        COLS = board[0].size();

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    bool dfs(vector<vector<char>>& board, string word, int r, int c, int i) {
        if (i == word.length()) {
            return true;
        }

        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word[i] || path.count({r, c})) {
            return false;
        }

        path.insert({r, c});
        bool res = dfs(board, word, r + 1, c, i + 1) || 
                   dfs(board, word, r - 1, c, i + 1) ||
                   dfs(board, word, r, c + 1, i + 1) || 
                   dfs(board, word, r, c - 1, i + 1);
        path.erase({r, c});

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        const ROWS = board.length;
        const COLS = board[0].length;
        const path = new Set();

        const dfs = (r, c, i) => {
            if (i === word.length) return true;
            if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
                board[r][c] !== word[i] || path.has(`${r},${c}`)) {
                return false;
            }

            path.add(`${r},${c}`);
            const res = dfs(r + 1, c, i + 1) || 
                        dfs(r - 1, c, i + 1) || 
                        dfs(r, c + 1, i + 1) || 
                        dfs(r, c - 1, i + 1);
            path.delete(`${r},${c}`);
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (dfs(r, c, 0)) return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    private int ROWS, COLS;
    private HashSet<(int, int)> path = new HashSet<(int, int)>();

    public bool Exist(char[][] board, string word) {
        ROWS = board.Length;
        COLS = board[0].Length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (DFS(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private bool DFS(char[][] board, string word, int r, int c, int i) {
        if (i == word.Length) {
            return true;
        }

        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word[i] || path.Contains((r, c))) {
            return false;
        }

        path.Add((r, c));
        bool res = DFS(board, word, r + 1, c, i + 1) || 
                   DFS(board, word, r - 1, c, i + 1) ||
                   DFS(board, word, r, c + 1, i + 1) || 
                   DFS(board, word, r, c - 1, i + 1);
        path.Remove((r, c));

        return res;
    }
}
```

```go
func exist(board [][]byte, word string) bool {
    rows, cols := len(board), len(board[0])
    path := make(map[[2]int]bool)

    var dfs func(r, c, i int) bool
    dfs = func(r, c, i int) bool {
        if i == len(word) {
            return true
        }
        if r < 0 || c < 0 || r >= rows || c >= cols || 
           board[r][c] != word[i] || path[[2]int{r, c}] {
            return false
        }

        path[[2]int{r, c}] = true
        res := dfs(r+1, c, i+1) || 
               dfs(r-1, c, i+1) || 
               dfs(r, c+1, i+1) || 
               dfs(r, c-1, i+1)
        delete(path, [2]int{r, c})

        return res
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if dfs(r, c, 0) {
                return true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun exist(board: Array<CharArray>, word: String): Boolean {
        val rows = board.size
        val cols = board[0].size
        val path = HashSet<Pair<Int, Int>>()

        fun dfs(r: Int, c: Int, i: Int): Boolean {
            if (i == word.length) return true
            if (r < 0 || c < 0 || r >= rows || c >= cols || 
                board[r][c] != word[i] || Pair(r, c) in path) {
                return false
            }

            path.add(Pair(r, c))
            val res = dfs(r + 1, c, i + 1) ||
                      dfs(r - 1, c, i + 1) ||
                      dfs(r, c + 1, i + 1) ||
                      dfs(r, c - 1, i + 1)
            path.remove(Pair(r, c))

            return res
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (dfs(r, c, 0)) {
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

* Time complexity: $O(m * 4 ^ n)$
* Space complexity: $O(n)$

> Where $m$ is the number of cells in the $board$ and $n$ is the length of the $word$.

---

## 2. Backtracking (Visited Array)

::tabs-start

```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])
        visited = [[False for _ in range(COLS)] for _ in range(ROWS)]

        def dfs(r, c, i):
            if i == len(word):
                return True
            if (r < 0 or c < 0 or r >= ROWS or c >= COLS or
                word[i] != board[r][c] or visited[r][c]):
                return False

            visited[r][c] = True
            res = (dfs(r + 1, c, i + 1) or
                   dfs(r - 1, c, i + 1) or
                   dfs(r, c + 1, i + 1) or
                   dfs(r, c - 1, i + 1))
            visited[r][c] = False
            return res

        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0):
                    return True
        return False
```

```java
public class Solution {
    private int ROWS, COLS;
    private boolean[][] visited;

    public boolean exist(char[][] board, String word) {
        ROWS = board.length;
        COLS = board[0].length;
        visited = new boolean[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int r, int c, int i) {
        if (i == word.length()) {
            return true;
        }

        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word.charAt(i) || visited[r][c]) {
            return false;
        }

        visited[r][c] = true;
        boolean res = dfs(board, word, r + 1, c, i + 1) || 
                      dfs(board, word, r - 1, c, i + 1) ||
                      dfs(board, word, r, c + 1, i + 1) || 
                      dfs(board, word, r, c - 1, i + 1);
        visited[r][c] = false;

        return res;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;
    vector<vector<bool>> visited;

    bool exist(vector<vector<char>>& board, string word) {
        ROWS = board.size();
        COLS = board[0].size();
        visited = vector<vector<bool>>(ROWS, vector<bool>(COLS, false));

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    bool dfs(vector<vector<char>>& board, string word, int r, int c, int i) {
        if (i == word.length()) {
            return true;
        }

        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word[i] || visited[r][c]) {
            return false;
        }

        visited[r][c] = true;
        bool res = dfs(board, word, r + 1, c, i + 1) || 
                   dfs(board, word, r - 1, c, i + 1) ||
                   dfs(board, word, r, c + 1, i + 1) || 
                   dfs(board, word, r, c - 1, i + 1);
        visited[r][c] = false;

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        const ROWS = board.length;
        const COLS = board[0].length;
        const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

        const dfs = (r, c, i) => {
            if (i === word.length) return true;
            if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
                board[r][c] !== word[i] || visited[r][c]) {
                return false;
            }

            visited[r][c] = true;
            const res = dfs(r + 1, c, i + 1) || 
                        dfs(r - 1, c, i + 1) ||
                        dfs(r, c + 1, i + 1) || 
                        dfs(r, c - 1, i + 1);
            visited[r][c] = false;
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (dfs(r, c, 0)) return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    private int ROWS, COLS;
    private bool[,] visited;

    public bool Exist(char[][] board, string word) {
        ROWS = board.Length;
        COLS = board[0].Length;
        visited = new bool[ROWS, COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (DFS(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private bool DFS(char[][] board, string word, int r, int c, int i) {
        if (i == word.Length) {
            return true;
        }

        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word[i] || visited[r, c]) {
            return false;
        }

        visited[r, c] = true;
        bool res = DFS(board, word, r + 1, c, i + 1) || 
                   DFS(board, word, r - 1, c, i + 1) ||
                   DFS(board, word, r, c + 1, i + 1) || 
                   DFS(board, word, r, c - 1, i + 1);
        visited[r, c] = false;

        return res;
    }
}
```

```go
func exist(board [][]byte, word string) bool {
    rows, cols := len(board), len(board[0])
    visited := make([][]bool, rows)
    for i := range visited {
        visited[i] = make([]bool, cols)
    }

    var dfs func(r, c, i int) bool
    dfs = func(r, c, i int) bool {
        if i == len(word) {
            return true
        }
        if r < 0 || c < 0 || r >= rows || c >= cols || 
           board[r][c] != word[i] || visited[r][c] {
            return false
        }

        visited[r][c] = true
        res := dfs(r+1, c, i+1) || 
               dfs(r-1, c, i+1) || 
               dfs(r, c+1, i+1) || 
               dfs(r, c-1, i+1)
        visited[r][c] = false

        return res
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if dfs(r, c, 0) {
                return true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun exist(board: Array<CharArray>, word: String): Boolean {
        val rows = board.size
        val cols = board[0].size
        val visited = Array(rows) { BooleanArray(cols) }

        fun dfs(r: Int, c: Int, i: Int): Boolean {
            if (i == word.length) return true
            if (r < 0 || c < 0 || r >= rows || c >= cols || 
                board[r][c] != word[i] || visited[r][c]) {
                return false
            }

            visited[r][c] = true
            val res = dfs(r + 1, c, i + 1) || 
                      dfs(r - 1, c, i + 1) ||
                      dfs(r, c + 1, i + 1) || 
                      dfs(r, c - 1, i + 1)
            visited[r][c] = false

            return res
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (dfs(r, c, 0)) {
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

* Time complexity: $O(m * 4 ^ n)$
* Space complexity: $O(n)$

> Where $m$ is the number of cells in the $board$ and $n$ is the length of the $word$.

---

## 3. Backtracking (Optimal)

::tabs-start

```python
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        ROWS, COLS = len(board), len(board[0])

        def dfs(r, c, i):
            if i == len(word):
                return True
            if (r < 0 or c < 0 or r >= ROWS or c >= COLS or
                word[i] != board[r][c] or board[r][c] == '#'):
                return False

            board[r][c] = '#'
            res = (dfs(r + 1, c, i + 1) or
                   dfs(r - 1, c, i + 1) or
                   dfs(r, c + 1, i + 1) or
                   dfs(r, c - 1, i + 1))
            board[r][c] = word[i]
            return res

        for r in range(ROWS):
            for c in range(COLS):
                if dfs(r, c, 0):
                    return True
        return False
```

```java
public class Solution {
    private int ROWS, COLS;

    public boolean exist(char[][] board, String word) {
        ROWS = board.length;
        COLS = board[0].length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int r, int c, int i) {
        if (i == word.length()) {
            return true;
        }
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word.charAt(i) || board[r][c] == '#') {
            return false;
        }

        board[r][c] = '#';
        boolean res = dfs(board, word, r + 1, c, i + 1) ||
                      dfs(board, word, r - 1, c, i + 1) ||
                      dfs(board, word, r, c + 1, i + 1) ||
                      dfs(board, word, r, c - 1, i + 1);
        board[r][c] = word.charAt(i);
        return res;
    }
}
```

```cpp
class Solution {
public:
    int ROWS, COLS;

    bool exist(vector<vector<char>>& board, string word) {
        ROWS = board.size();
        COLS = board[0].size();

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    bool dfs(vector<vector<char>>& board, string word, int r, int c, int i) {
        if (i == word.size()) {
            return true;
        }
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
            board[r][c] != word[i] || board[r][c] == '#') {
            return false;
        }

        board[r][c] = '#';
        bool res = dfs(board, word, r + 1, c, i + 1) ||
                   dfs(board, word, r - 1, c, i + 1) ||
                   dfs(board, word, r, c + 1, i + 1) ||
                   dfs(board, word, r, c - 1, i + 1);
        board[r][c] = word[i];
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    exist(board, word) {
        const ROWS = board.length;
        const COLS = board[0].length;

        const dfs = (r, c, i) => {
            if (i === word.length) return true;
            if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
                board[r][c] !== word[i] || board[r][c] === '#') {
                return false;
            }

            board[r][c] = '#';
            const res = dfs(r + 1, c, i + 1) ||
                        dfs(r - 1, c, i + 1) ||
                        dfs(r, c + 1, i + 1) ||
                        dfs(r, c - 1, i + 1);
            board[r][c] = word[i];
            return res;
        };

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (dfs(r, c, 0)) return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    private int ROWS, COLS;

    public bool Exist(char[][] board, string word) {
        ROWS = board.Length;
        COLS = board[0].Length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (Dfs(board, word, r, c, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private bool Dfs(char[][] board, string word, int r, int c, int i) {
        if (i == word.Length) {
            return true;
        }
        if (r < 0 || c < 0 || r >= ROWS || c >= COLS || 
        board[r][c] != word[i] || board[r][c] == '#') {
            return false;
        }

        board[r][c] = '#';
        bool res = Dfs(board, word, r + 1, c, i + 1) ||
                   Dfs(board, word, r - 1, c, i + 1) ||
                   Dfs(board, word, r, c + 1, i + 1) ||
                   Dfs(board, word, r, c - 1, i + 1);
        board[r][c] = word[i];
        return res;
    }
}
```

```go
func exist(board [][]byte, word string) bool {
    rows, cols := len(board), len(board[0])

    var dfs func(r, c, i int) bool
    dfs = func(r, c, i int) bool {
        if i == len(word) {
            return true
        }
        if r < 0 || c < 0 || r >= rows || c >= cols || 
           board[r][c] != word[i] || board[r][c] == '#' {
            return false
        }

        temp := board[r][c]
        board[r][c] = '#'
        res := dfs(r+1, c, i+1) || 
               dfs(r-1, c, i+1) || 
               dfs(r, c+1, i+1) || 
               dfs(r, c-1, i+1)
        board[r][c] = temp

        return res
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if dfs(r, c, 0) {
                return true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun exist(board: Array<CharArray>, word: String): Boolean {
        val rows = board.size
        val cols = board[0].size

        fun dfs(r: Int, c: Int, i: Int): Boolean {
            if (i == word.length) return true
            if (r < 0 || c < 0 || r >= rows || c >= cols || 
                board[r][c] != word[i] || board[r][c] == '#') {
                return false
            }

            val temp = board[r][c]
            board[r][c] = '#'
            val res = dfs(r + 1, c, i + 1) || 
                      dfs(r - 1, c, i + 1) ||
                      dfs(r, c + 1, i + 1) || 
                      dfs(r, c - 1, i + 1)
            board[r][c] = temp

            return res
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (dfs(r, c, 0)) {
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

* Time complexity: $O(m * 4 ^ n)$
* Space complexity: $O(n)$

> Where $m$ is the number of cells in the $board$ and $n$ is the length of the $word$.