## 1. Depth First Search

::tabs-start

```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        ROWS, COLS = len(board), len(board[0])

        def capture(r, c):
            if (r < 0 or c < 0 or r == ROWS or 
                c == COLS or board[r][c] != "O"
            ):
                return
            board[r][c] = "T"
            capture(r + 1, c)
            capture(r - 1, c)
            capture(r, c + 1)
            capture(r, c - 1)

        for r in range(ROWS):
            if board[r][0] == "O":
                capture(r, 0)
            if board[r][COLS - 1] == "O":
                capture(r, COLS - 1)
        
        for c in range(COLS):
            if board[0][c] == "O":
                capture(0, c)
            if board[ROWS - 1][c] == "O":
                capture(ROWS - 1, c)

        for r in range(ROWS):
            for c in range(COLS):
                if board[r][c] == "O":
                    board[r][c] = "X"
                elif board[r][c] == "T":
                    board[r][c] = "O"
```

```java
public class Solution {
    private int ROWS, COLS;

    public void solve(char[][] board) {
        ROWS = board.length;
        COLS = board[0].length;

        for (int r = 0; r < ROWS; r++) {
            if (board[r][0] == 'O') {
                capture(board, r, 0);
            }
            if (board[r][COLS - 1] == 'O') {
                capture(board, r, COLS - 1);
            }
        }

        for (int c = 0; c < COLS; c++) {
            if (board[0][c] == 'O') {
                capture(board, 0, c);
            }
            if (board[ROWS - 1][c] == 'O') {
                capture(board, ROWS - 1, c);
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }

    private void capture(char[][] board, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || board[r][c] != 'O') {
            return;
        }
        board[r][c] = 'T';
        capture(board, r + 1, c);
        capture(board, r - 1, c);
        capture(board, r, c + 1);
        capture(board, r, c - 1);
    }
}
```

```cpp
class Solution {
    int ROWS, COLS;

public:
    void solve(vector<vector<char>>& board) {
        ROWS = board.size();
        COLS = board[0].size();

        for (int r = 0; r < ROWS; r++) {
            if (board[r][0] == 'O') {
                capture(board, r, 0);
            }
            if (board[r][COLS - 1] == 'O') {
                capture(board, r, COLS - 1);
            }
        }

        for (int c = 0; c < COLS; c++) {
            if (board[0][c] == 'O') {
                capture(board, 0, c);
            }
            if (board[ROWS - 1][c] == 'O') {
                capture(board, ROWS - 1, c);
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }

private:
    void capture(vector<vector<char>>& board, int r, int c) {
        if (r < 0 || c < 0 || r >= ROWS || 
            c >= COLS || board[r][c] != 'O') {
            return;
        }
        board[r][c] = 'T';
        capture(board, r + 1, c);
        capture(board, r - 1, c);
        capture(board, r, c + 1);
        capture(board, r, c - 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solve(board) {
        let ROWS = board.length, COLS = board[0].length;

        const capture = (r, c) => {
            if (r < 0 || c < 0 || r == ROWS || 
                c == COLS || board[r][c] !== 'O') {
                return;
            }
            board[r][c] = 'T';
            capture(r + 1, c);
            capture(r - 1, c);
            capture(r, c + 1);
            capture(r, c - 1);
        }

        for (let r = 0; r < ROWS; r++) {
            if (board[r][0] === 'O') capture(r, 0);
            if (board[r][COLS - 1] === 'O') capture(r, COLS - 1);
        }

        for (let c = 0; c < COLS; c++) {
            if (board[0][c] === 'O') capture(0, c);
            if (board[ROWS - 1][c] === 'O') capture(ROWS - 1, c);
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c] === 'O') board[r][c] = 'X';
                else if (board[r][c] === 'T') board[r][c] = 'O';
            }
        }
    }
}
```

```csharp
public class Solution {
    private int ROWS, COLS;

    public void Solve(char[][] board) {
        ROWS = board.Length;
        COLS = board[0].Length;

        for (int r = 0; r < ROWS; r++) {
            if (board[r][0] == 'O') {
                Capture(board, r, 0);
            }
            if (board[r][COLS - 1] == 'O') {
                Capture(board, r, COLS - 1);
            }
        }

        for (int c = 0; c < COLS; c++) {
            if (board[0][c] == 'O') {
                Capture(board, 0, c);
            }
            if (board[ROWS - 1][c] == 'O') {
                Capture(board, ROWS - 1, c);
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }

    private void Capture(char[][] board, int r, int c) {
        if (r < 0 || c < 0 || r == ROWS || 
            c == COLS || board[r][c] != 'O') {
            return;
        }
        board[r][c] = 'T';
        Capture(board, r + 1, c);
        Capture(board, r - 1, c);
        Capture(board, r, c + 1);
        Capture(board, r, c - 1);
    }
}
```

```go
func solve(board [][]byte) {
    rows, cols := len(board), len(board[0])

    var capture func(r, c int)
    capture = func(r, c int) {
        if r < 0 || c < 0 || r == rows || 
           c == cols || board[r][c] != 'O' {
            return
        }
        board[r][c] = 'T'
        capture(r+1, c)
        capture(r-1, c)
        capture(r, c+1)
        capture(r, c-1)
    }

    for r := 0; r < rows; r++ {
        if board[r][0] == 'O' {
            capture(r, 0)
        }
        if board[r][cols-1] == 'O' {
            capture(r, cols-1)
        }
    }

    for c := 0; c < cols; c++ {
        if board[0][c] == 'O' {
            capture(0, c)
        }
        if board[rows-1][c] == 'O' {
            capture(rows-1, c)
        }
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if board[r][c] == 'O' {
                board[r][c] = 'X'
            } else if board[r][c] == 'T' {
                board[r][c] = 'O'
            }
        }
    }
}
```

```kotlin
class Solution {
    fun solve(board: Array<CharArray>) {
        val rows = board.size
        val cols = board[0].size

        fun capture(r: Int, c: Int) {
            if (r < 0 || c < 0 || r == rows || 
                c == cols || board[r][c] != 'O') {
                return
            }
            board[r][c] = 'T'
            capture(r + 1, c)
            capture(r - 1, c)
            capture(r, c + 1)
            capture(r, c - 1)
        }

        for (r in 0 until rows) {
            if (board[r][0] == 'O') {
                capture(r, 0)
            }
            if (board[r][cols - 1] == 'O') {
                capture(r, cols - 1)
            }
        }

        for (c in 0 until cols) {
            if (board[0][c] == 'O') {
                capture(0, c)
            }
            if (board[rows - 1][c] == 'O') {
                capture(rows - 1, c)
            }
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X'
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O'
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns of the $board$.

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        ROWS, COLS = len(board), len(board[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        def capture():
            q = deque()
            for r in range(ROWS):
                for c in range(COLS):
                    if (r == 0 or r == ROWS - 1 or 
                        c == 0 or c == COLS - 1 and 
                        board[r][c] == "O"
                    ):
                        q.append((r, c))
            while q:
                r, c = q.popleft()
                if board[r][c] == "O":
                    board[r][c] = "T"
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < ROWS and 0 <= nc < COLS:
                            q.append((nr, nc))
        
        capture()
        for r in range(ROWS):
            for c in range(COLS):
                if board[r][c] == "O":
                    board[r][c] = "X"
                elif board[r][c] == "T":
                    board[r][c] = "O"
```

```java
public class Solution {
    private int ROWS, COLS;
    private int[][] directions = new int[][]{
        {1, 0}, {-1, 0}, {0, 1}, {0, -1}
    };

    public void solve(char[][] board) {
        ROWS = board.length;
        COLS = board[0].length;

        capture(board);

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }

    private void capture(char[][] board) {
        Queue<int[]> q = new LinkedList<>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (r == 0 || r == ROWS - 1 || 
                    c == 0 || c == COLS - 1 && 
                    board[r][c] == 'O') {
                    q.offer(new int[]{r, c});
                }
            }
        }
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            int r = cell[0], c = cell[1];
            if (board[r][c] == 'O') {
                board[r][c] = 'T';
                for (int[] direction : directions) {
                    int nr = r + direction[0], nc = c + direction[1];
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
                        q.offer(new int[]{nr, nc});
                    }
                }
            }
        }
    }
}
```

```cpp
class Solution {
    int ROWS, COLS;
    vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, 
                                         {0, 1}, {0, -1}};

public:
    void solve(vector<vector<char>>& board) {
        ROWS = board.size();
        COLS = board[0].size();

        capture(board);

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }

private:
    void capture(vector<vector<char>>& board) {
        queue<pair<int, int>> q;
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (r == 0 || r == ROWS - 1 || 
                    c == 0 || c == COLS - 1 && 
                    board[r][c] == 'O') {
                    q.push({r, c});
                }
            }
        }
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            if (board[r][c] == 'O') {
                board[r][c] = 'T';
                for (auto& direction : directions) {
                    int nr = r + direction.first; 
                    int nc = c + direction.second;
                    if (nr >= 0 && nr < ROWS && 
                        nc >= 0 && nc < COLS) {
                        q.push({nr, nc});
                    }
                }
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solve(board) {
        let ROWS = board.length, COLS = board[0].length;
        let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        
        const capture = () => {
            let q = [];
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (r === 0 || r === ROWS - 1 || 
                        c === 0 || c === COLS - 1 && 
                        board[r][c] === 'O') {
                        q.push([r, c]);
                    }
                }
            }
            while (q.length) {
                let [r, c] = q.shift();
                if (board[r][c] === 'O') {
                    board[r][c] = 'T';
                    for (let [dr, dc] of directions) {
                        let nr = r + dr, nc = c + dc;
                        if (nr >= 0 && nr < ROWS && 
                            nc >= 0 && nc < COLS) {
                            q.push([nr, nc]);
                        }
                    }
                }
            }
        }

        capture();
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c] === 'O') board[r][c] = 'X';
                else if (board[r][c] === 'T') board[r][c] = 'O';
            }
        }
    }
}
```

```csharp
public class Solution {
    private int ROWS, COLS;
    private int[][] directions = new int[][] { 
        new int[] { 1, 0 }, new int[] { -1, 0 }, 
        new int[] { 0, 1 }, new int[] { 0, -1 } 
    };

    public void Solve(char[][] board) {
        ROWS = board.Length;
        COLS = board[0].Length;

        Capture(board);

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X';
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O';
                }
            }
        }
    }

    private void Capture(char[][] board) {
        Queue<int[]> q = new Queue<int[]>();
        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (r == 0 || r == ROWS - 1 || 
                    c == 0 || c == COLS - 1 && 
                    board[r][c] == 'O') {
                    q.Enqueue(new int[] { r, c });
                }
            }
        }
        while (q.Count > 0) {
            int[] cell = q.Dequeue();
            int r = cell[0], c = cell[1];
            if (board[r][c] == 'O') {
                board[r][c] = 'T';
                foreach (var direction in directions) {
                    int nr = r + direction[0];
                    int nc = c + direction[1];
                    if (nr >= 0 && nr < ROWS && 
                        nc >= 0 && nc < COLS) {
                        q.Enqueue(new int[] { nr, nc });
                    }
                }
            }
        }
    }
}
```

```go
func solve(board [][]byte) {
    rows, cols := len(board), len(board[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

    capture := func() {
        q := [][]int{}
        for r := 0; r < rows; r++ {
            for c := 0; c < cols; c++ {
                if r == 0 || r == rows-1 || c == 0 || c == cols-1 {
                    if board[r][c] == 'O' {
                        q = append(q, []int{r, c})
                    }
                }
            }
        }
        for len(q) > 0 {
            // Dequeue
            r, c := q[0][0], q[0][1]
            q = q[1:]
            if board[r][c] == 'O' {
                board[r][c] = 'T'
                for _, dir := range directions {
                    nr, nc := r+dir[0], c+dir[1]
                    if nr >= 0 && nr < rows && nc >= 0 && nc < cols {
                        q = append(q, []int{nr, nc})
                    }
                }
            }
        }
    }

    capture()

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if board[r][c] == 'O' {
                board[r][c] = 'X'
            } else if board[r][c] == 'T' {
                board[r][c] = 'O'
            }
        }
    }
}
```

```kotlin
class Solution {
    fun solve(board: Array<CharArray>) {
        val rows = board.size
        val cols = board[0].size
        val directions = arrayOf(intArrayOf(1, 0), 
                                 intArrayOf(-1, 0), 
                                 intArrayOf(0, 1), 
                                 intArrayOf(0, -1))

        fun capture() {
            val q: LinkedList<IntArray> = LinkedList()
            for (r in 0 until rows) {
                for (c in 0 until cols) {
                    if (r == 0 || r == rows - 1 || c == 0 || c == cols - 1) {
                        if (board[r][c] == 'O') {
                            q.add(intArrayOf(r, c))
                        }
                    }
                }
            }
            while (q.isNotEmpty()) {
                val (r, c) = q.poll()
                if (board[r][c] == 'O') {
                    board[r][c] = 'T'
                    for (dir in directions) {
                        val nr = r + dir[0]
                        val nc = c + dir[1]
                        if (nr in 0 until rows && nc in 0 until cols) {
                            q.add(intArrayOf(nr, nc))
                        }
                    }
                }
            }
        }

        capture()

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (board[r][c] == 'O') {
                    board[r][c] = 'X'
                } else if (board[r][c] == 'T') {
                    board[r][c] = 'O'
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns of the $board$.

---

## 3. Disjoint Set Union

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n + 1))
        self.Size = [1] * (n + 1)

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, u, v):
        pu = self.find(u)
        pv = self.find(v)
        if pu == pv:
            return False
        if self.Size[pu] >= self.Size[pv]:
            self.Size[pu] += self.Size[pv]
            self.Parent[pv] = pu
        else:
            self.Size[pv] += self.Size[pu]
            self.Parent[pu] = pv
        return True
    
    def connected(self, u, v):
        return self.find(u) == self.find(v)

class Solution:
    def solve(self, board: List[List[str]]) -> None:
        ROWS, COLS = len(board), len(board[0])
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        dsu = DSU(ROWS * COLS + 1)

        for r in range(ROWS):
            for c in range(COLS):
                if board[r][c] != "O":
                    continue
                if (r == 0 or c == 0 or 
                    r == (ROWS - 1) or c == (COLS - 1)
                ):
                    dsu.union(ROWS * COLS, r * COLS + c)
                else:
                    for dx, dy in directions:
                        nr, nc = r + dx, c + dy
                        if board[nr][nc] == "O":
                            dsu.union(r * COLS + c, nr * COLS + nc)

        for r in range(ROWS):
            for c in range(COLS):
                if not dsu.connected(ROWS * COLS, r * COLS + c):
                    board[r][c] = "X"
```

```java
public class DSU {
    int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }

    public boolean connected(int u, int v) {
        return find(u) == find(v);
    }
}

public class Solution {
    public void solve(char[][] board) {
        int ROWS = board.length, COLS = board[0].length;
        DSU dsu = new DSU(ROWS * COLS + 1);
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] != 'O') continue;
                if (r == 0 || c == 0 || 
                    r == ROWS - 1 || c == COLS - 1) {
                    dsu.union(ROWS * COLS, r * COLS + c);
                } else {
                    for (int[] dir : directions) {
                        int nr = r + dir[0], nc = c + dir[1];
                        if (board[nr][nc] == 'O') {
                            dsu.union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (!dsu.connected(ROWS * COLS, r * COLS + c)) {
                    board[r][c] = 'X';
                }
            }
        }
    }
}
```

```cpp
class DSU {
    vector<int> Parent, Size;

public:
    DSU(int n) {
        Parent.resize(n + 1);
        Size.resize(n + 1);
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionNodes(int u, int v) {
        int pu = find(u), pv = find(v);
        if (pu == pv) return false;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }

    bool connected(int u, int v) {
        return find(u) == find(v);
    }
};

class Solution {
public:
    void solve(vector<vector<char>>& board) {
        int ROWS = board.size(), COLS = board[0].size();
        DSU dsu(ROWS * COLS + 1);
        vector<vector<int>> directions = {{1, 0}, {-1, 0}, 
                                          {0, 1}, {0, -1}};

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] != 'O') continue;
                if (r == 0 || c == 0 || 
                    r == ROWS - 1 || c == COLS - 1) {
                    dsu.unionNodes(ROWS * COLS, r * COLS + c);
                } else {
                    for (auto& dir : directions) {
                        int nr = r + dir[0], nc = c + dir[1];
                        if (board[nr][nc] == 'O') {
                            dsu.unionNodes(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (!dsu.connected(ROWS * COLS, r * COLS + c)) {
                    board[r][c] = 'X';
                }
            }
        }
    }
};
```

```javascript
class DSU {
    constructor(n) {
        this.Parent = Array.from({ length: n + 1 }, (_, i) => i);
        this.Size = Array(n + 1).fill(1);
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    union(u, v) {
        let pu = this.find(u);
        let pv = this.find(v);
        if (pu === pv) return false;
        if (this.Size[pu] >= this.Size[pv]) {
            this.Size[pu] += this.Size[pv];
            this.Parent[pv] = pu;
        } else {
            this.Size[pv] += this.Size[pu];
            this.Parent[pu] = pv;
        }
        return true;
    }

    /**
     * @param {number} u
     * @param {number} v
     * @return {boolean}
     */
    connected(u, v) {
        return this.find(u) === this.find(v);
    }
}

class Solution {
    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    solve(board) {
        const ROWS = board.length, COLS = board[0].length;
        const dsu = new DSU(ROWS * COLS + 1);
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (board[r][c] !== 'O') continue;
                if (r === 0 || c === 0 || 
                    r === ROWS - 1 || c === COLS - 1) {
                    dsu.union(ROWS * COLS, r * COLS + c);
                } else {
                    for (let [dx, dy] of directions) {
                        const nr = r + dx, nc = c + dy;
                        if (board[nr][nc] === 'O') {
                            dsu.union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!dsu.connected(ROWS * COLS, r * COLS + c)) {
                    board[r][c] = 'X';
                }
            }
        }
    }
}
```

```csharp
public class DSU {
    private int[] Parent, Size;

    public DSU(int n) {
        Parent = new int[n + 1];
        Size = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            Parent[i] = i;
            Size[i] = 1;
        }
    }

    public int Find(int node) {
        if (Parent[node] != node) {
            Parent[node] = Find(Parent[node]);
        }
        return Parent[node];
    }

    public bool Union(int u, int v) {
        int pu = Find(u), pv = Find(v);
        if (pu == pv) return false;
        if (Size[pu] >= Size[pv]) {
            Size[pu] += Size[pv];
            Parent[pv] = pu;
        } else {
            Size[pv] += Size[pu];
            Parent[pu] = pv;
        }
        return true;
    }

    public bool Connected(int u, int v) {
        return Find(u) == Find(v);
    }
}

public class Solution {
    public void Solve(char[][] board) {
        int ROWS = board.Length, COLS = board[0].Length;
        DSU dsu = new DSU(ROWS * COLS + 1);
        int[][] directions = new int[][] { 
            new int[] { 1, 0 }, new int[] { -1, 0 }, 
            new int[] { 0, 1 }, new int[] { 0, -1 } 
        };

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (board[r][c] != 'O') continue;
                if (r == 0 || c == 0 || 
                    r == ROWS - 1 || c == COLS - 1) {
                    dsu.Union(ROWS * COLS, r * COLS + c);
                } else {
                    foreach (var dir in directions) {
                        int nr = r + dir[0], nc = c + dir[1];
                        if (board[nr][nc] == 'O') {
                            dsu.Union(r * COLS + c, nr * COLS + nc);
                        }
                    }
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (!dsu.Connected(ROWS * COLS, r * COLS + c)) {
                    board[r][c] = 'X';
                }
            }
        }
    }
}
```

```go
type DSU struct {
    Parent []int
    Size   []int
}

func NewDSU(n int) *DSU {
    dsu := &DSU{
        Parent: make([]int, n+1),
        Size:   make([]int, n+1),
    }
    for i := 0; i <= n; i++ {
        dsu.Parent[i] = i
        dsu.Size[i] = 1
    }
    return dsu
}

func (dsu *DSU) Find(node int) int {
    if dsu.Parent[node] != node {
        dsu.Parent[node] = dsu.Find(dsu.Parent[node])
    }
    return dsu.Parent[node]
}

func (dsu *DSU) Union(u, v int) bool {
    pu := dsu.Find(u)
    pv := dsu.Find(v)
    if pu == pv {
        return false
    }
    if dsu.Size[pu] >= dsu.Size[pv] {
        dsu.Size[pu] += dsu.Size[pv]
        dsu.Parent[pv] = pu
    } else {
        dsu.Size[pv] += dsu.Size[pu]
        dsu.Parent[pu] = pv
    }
    return true
}

func (dsu *DSU) Connected(u, v int) bool {
    return dsu.Find(u) == dsu.Find(v)
}

func solve(board [][]byte) {
    rows, cols := len(board), len(board[0])
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}
    dsu := NewDSU(rows * cols)

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if board[r][c] != 'O' {
                continue
            }
            if r == 0 || c == 0 || r == rows-1 || c == cols-1 {
                dsu.Union(rows*cols, r*cols+c)
            } else {
                for _, dir := range directions {
                    nr, nc := r+dir[0], c+dir[1]
                    if nr >= 0 && nr < rows && nc >= 0 && 
                       nc < cols && board[nr][nc] == 'O' {
                        dsu.Union(r*cols+c, nr*cols+nc)
                    }
                }
            }
        }
    }

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if !dsu.Connected(rows*cols, r*cols+c) {
                board[r][c] = 'X'
            }
        }
    }
}
```

```kotlin
class DSU(n: Int) {
    val parent: IntArray = IntArray(n + 1) { it }
    val size: IntArray = IntArray(n + 1) { 1 }

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(u: Int, v: Int): Boolean {
        val pu = find(u)
        val pv = find(v)
        if (pu == pv) return false
        if (size[pu] >= size[pv]) {
            size[pu] += size[pv]
            parent[pv] = pu
        } else {
            size[pv] += size[pu]
            parent[pu] = pv
        }
        return true
    }

    fun connected(u: Int, v: Int): Boolean {
        return find(u) == find(v)
    }
}

class Solution {
    fun solve(board: Array<CharArray>) {
        val rows = board.size
        val cols = board[0].size
        val directions = arrayOf(intArrayOf(1, 0), 
                                 intArrayOf(-1, 0), 
                                 intArrayOf(0, 1), 
                                 intArrayOf(0, -1))
        val dsu = DSU(rows * cols)

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (board[r][c] != 'O') continue
                if (r == 0 || c == 0 || r == rows - 1 || c == cols - 1) {
                    dsu.union(rows * cols, r * cols + c)
                } else {
                    for (dir in directions) {
                        val nr = r + dir[0]
                        val nc = c + dir[1]
                        if (nr in 0 until rows && 
                            nc in 0 until cols && board[nr][nc] == 'O') {
                            dsu.union(r * cols + c, nr * cols + nc)
                        }
                    }
                }
            }
        }

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (!dsu.connected(rows * cols, r * cols + c)) {
                    board[r][c] = 'X'
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns of the $board$.