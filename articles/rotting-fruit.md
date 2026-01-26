## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Breadth-First Search (BFS)** - The core algorithm for level-by-level traversal, essential for tracking time units
- **Multi-source BFS** - Starting BFS from multiple sources simultaneously rather than a single source
- **Queue data structure** - Used to process cells in FIFO order during BFS traversal
- **2D grid traversal** - Navigating a matrix using directional vectors (up, down, left, right)

---

## 1. Breadth First Search

### Intuition
This is a **multi-source BFS** problem.

All **rotten oranges (2)** start spreading rot **at the same time** to their neighboring fresh oranges (1).
Each BFS level represents **1 minute**.
If a fresh orange is reached, it becomes rotten in the next minute.

Key ideas:
- Start BFS from **all rotten oranges together**
- Count how many **fresh oranges** exist
- Each BFS layer = one unit of time
- If any fresh orange is left at the end → answer is `-1`

### Algorithm
1. Initialize a queue with positions of all **rotten oranges**.
2. Count total number of **fresh oranges**.
3. While the queue is not empty **and** fresh oranges exist:
   - Process all nodes in the queue (one BFS level).
   - For each rotten orange:
     - Check its 4 neighbors.
     - If a neighbor is fresh:
       - Make it rotten.
       - Decrease `fresh` count.
       - Add it to the queue.
   - Increment `time` by 1.
4. If `fresh` count becomes `0`, return `time`.
5. Otherwise, return `-1` (some oranges never rot).

::tabs-start

```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        q = collections.deque()
        fresh = 0
        time = 0

        for r in range(len(grid)):
            for c in range(len(grid[0])):
                if grid[r][c] == 1:
                    fresh += 1
                if grid[r][c] == 2:
                    q.append((r, c))

        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
        while fresh > 0 and q:
            length = len(q)
            for i in range(length):
                r, c = q.popleft()

                for dr, dc in directions:
                    row, col = r + dr, c + dc
                    if (row in range(len(grid))
                        and col in range(len(grid[0]))
                        and grid[row][col] == 1
                    ):
                        grid[row][col] = 2
                        q.append((row, col))
                        fresh -= 1
            time += 1
        return time if fresh == 0 else -1
```

```java
public class Solution {
    public int orangesRotting(int[][] grid) {
        Queue<int[]> q = new ArrayDeque<>();
        int fresh = 0;
        int time = 0;

        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == 1) {
                    fresh++;
                }
                if (grid[r][c] == 2) {
                    q.offer(new int[]{r, c});
                }
            }
        }

        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        while (fresh > 0 && !q.isEmpty()) {
            int length = q.size();
            for (int i = 0; i < length; i++) {
                int[] curr = q.poll();
                int r = curr[0];
                int c = curr[1];

                for (int[] dir : directions) {
                    int row = r + dir[0];
                    int col = c + dir[1];
                    if (row >= 0 && row < grid.length &&
                        col >= 0 && col < grid[0].length &&
                        grid[row][col] == 1) {
                        grid[row][col] = 2;
                        q.offer(new int[]{row, col});
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
}
```

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        queue<pair<int, int>> q;
        int fresh = 0;
        int time = 0;

        for (int r = 0; r < grid.size(); r++) {
            for (int c = 0; c < grid[0].size(); c++) {
                if (grid[r][c] == 1) {
                    fresh++;
                }
                if (grid[r][c] == 2) {
                    q.push({r, c});
                }
            }
        }

        vector<pair<int, int>> directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        while (fresh > 0 && !q.empty()) {
            int length = q.size();
            for (int i = 0; i < length; i++) {
                auto curr = q.front();
                q.pop();
                int r = curr.first;
                int c = curr.second;

                for (const auto& dir : directions) {
                    int row = r + dir.first;
                    int col = c + dir.second;
                    if (row >= 0 && row < grid.size() &&
                        col >= 0 && col < grid[0].size() &&
                        grid[row][col] == 1) {
                        grid[row][col] = 2;
                        q.push({row, col});
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        const q = [];
        let fresh = 0;
        let time = 0;

        for (let r = 0; r < grid.length; r++) {
            for (let c = 0; c < grid[0].length; c++) {
                if (grid[r][c] === 1) {
                    fresh++;
                }
                if (grid[r][c] === 2) {
                    q.push([r, c]);
                }
            }
        }

        const directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        while (fresh > 0 && q.length > 0) {
            const length = q.length;
            for (let i = 0; i < length; i++) {
                const [currR, currC] = q.shift();

                for (const [dr, dc] of directions) {
                    const row = currR + dr;
                    const col = currC + dc;
                    if (
                        row >= 0 &&
                        row < grid.length &&
                        col >= 0 &&
                        col < grid[0].length &&
                        grid[row][col] === 1
                    ) {
                        grid[row][col] = 2;
                        q.push([row, col]);
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh === 0 ? time : -1;
    }
}
```

```csharp
public class Solution {
    public int OrangesRotting(int[][] grid) {
        Queue<int[]> q = new Queue<int[]>();
        int fresh = 0;
        int time = 0;

        for (int r = 0; r < grid.Length; r++) {
            for (int c = 0; c < grid[0].Length; c++) {
                if (grid[r][c] == 1) {
                    fresh++;
                }
                if (grid[r][c] == 2) {
                    q.Enqueue(new int[] { r, c });
                }
            }
        }

        int[][] directions = { new int[] { 0, 1 }, new int[] { 0, -1 }, new int[] { 1, 0 }, new int[] { -1, 0 } };
        while (fresh > 0 && q.Count > 0) {
            int length = q.Count;
            for (int i = 0; i < length; i++) {
                int[] curr = q.Dequeue();
                int r = curr[0];
                int c = curr[1];

                foreach (int[] dir in directions) {
                    int row = r + dir[0];
                    int col = c + dir[1];
                    if (row >= 0 && row < grid.Length &&
                        col >= 0 && col < grid[0].Length &&
                        grid[row][col] == 1) {
                        grid[row][col] = 2;
                        q.Enqueue(new int[] { row, col });
                        fresh--;
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
}
```

```go
type Pair struct {
    row, col int
}

func orangesRotting(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    queue := make([]Pair, 0)
    fresh := 0
    time := 0

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                fresh++
            }
            if grid[r][c] == 2 {
                queue = append(queue, Pair{r, c})
            }
        }
    }

    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    for fresh > 0 && len(queue) > 0 {
        length := len(queue)

        for i := 0; i < length; i++ {
            current := queue[0]
            queue = queue[1:]

            for _, dir := range directions {
                newRow := current.row + dir[0]
                newCol := current.col + dir[1]

                if newRow >= 0 && newRow < rows &&
                   newCol >= 0 && newCol < cols &&
                   grid[newRow][newCol] == 1 {
                    grid[newRow][newCol] = 2
                    queue = append(queue, Pair{newRow, newCol})
                    fresh--
                }
            }
        }
        time++
    }

    if fresh == 0 {
        return time
    }
    return -1
}
```

```kotlin
class Solution {
    data class Pair(val row: Int, val col: Int)

    fun orangesRotting(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        val queue = ArrayDeque<Pair>()
        var fresh = 0
        var time = 0

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == 1) {
                    fresh++
                }
                if (grid[r][c] == 2) {
                    queue.addLast(Pair(r, c))
                }
            }
        }

        val directions = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0)
        )

        while (fresh > 0 && queue.isNotEmpty()) {
            val length = queue.size

            repeat(length) {
                val current = queue.removeFirst()

                for (dir in directions) {
                    val newRow = current.row + dir[0]
                    val newCol = current.col + dir[1]

                    if (newRow in 0 until rows &&
                        newCol in 0 until cols &&
                        grid[newRow][newCol] == 1) {
                        grid[newRow][newCol] = 2
                        queue.addLast(Pair(newRow, newCol))
                        fresh--
                    }
                }
            }
            time++
        }

        return if (fresh == 0) time else -1
    }
}
```

```swift
class Solution {
    func orangesRotting(_ grid: [[Int]]) -> Int {
        var grid = grid
        var queue = Deque<(Int, Int)>()
        var fresh = 0
        var time = 0

        let ROWS = grid.count
        let COLS = grid[0].count

        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 1 {
                    fresh += 1
                }
                if grid[r][c] == 2 {
                    queue.append((r, c))
                }
            }
        }

        let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        while fresh > 0 && !queue.isEmpty {
            let length = queue.count
            for _ in 0..<length {
                let (r, c) = queue.popFirst()!

                for dir in directions {
                    let row = r + dir[0]
                    let col = c + dir[1]

                    if row >= 0 && row < ROWS && col >= 0 && col < COLS && grid[row][col] == 1 {
                        grid[row][col] = 2
                        queue.append((row, col))
                        fresh -= 1
                    }
                }
            }
            time += 1
        }

        return fresh == 0 ? time : -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.

---

## 2. Breadth First Search (No Queue)

### Intuition
This is still **BFS by levels**, but instead of using a queue, we simulate "minutes" with **grid marking**.

Think of each loop iteration as **1 minute**:
- Cells with value **2** are the oranges that are rotten *at the start of this minute*.
- Any fresh neighbor they rot during this minute is temporarily marked as **3** (meaning "will become rotten next minute").
- After scanning the whole grid, we convert all **3 → 2** to prepare for the next minute.

Why use `3`?
- To prevent a newly rotted orange from spreading in the **same minute** (which would incorrectly speed up time).

If during a minute **no fresh orange becomes 3**, but `fresh` still exists, then rot can't spread anymore → return `-1`.

### Algorithm
1. Count `fresh` oranges (value `1`).
2. Repeat while `fresh > 0`:
   - Set `flag = false` (did we rot anything this minute?).
   - Scan every cell:
     - If cell is `2`, check 4 neighbors.
     - For each neighbor that is `1`, mark it `3`, decrement `fresh`, set `flag = true`.
   - If `flag` is `false` → no progress → return `-1`.
   - Scan again and convert all `3` to `2` (commit the next BFS layer).
   - Increment `time`.
3. When `fresh == 0`, return `time`.

::tabs-start

```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        ROWS, COLS = len(grid), len(grid[0])
        fresh = 0
        time = 0

        for r in range(ROWS):
            for c in range(COLS):
                if grid[r][c] == 1:
                    fresh += 1

        directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        while fresh > 0:
            flag = False
            for r in range(ROWS):
                for c in range(COLS):
                    if grid[r][c] == 2:
                        for dr, dc in directions:
                            row, col = r + dr, c + dc
                            if (row in range(ROWS) and
                                col in range(COLS) and
                                grid[row][col] == 1):
                                grid[row][col] = 3
                                fresh -= 1
                                flag = True

            if not flag:
                return -1

            for r in range(ROWS):
                for c in range(COLS):
                    if grid[r][c] == 3:
                        grid[r][c] = 2

            time += 1

        return time
```

```java
public class Solution {
    public int orangesRotting(int[][] grid) {
        int ROWS = grid.length, COLS = grid[0].length;
        int fresh = 0, time = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) fresh++;
            }
        }

        int[][] directions = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

        while (fresh > 0) {
            boolean flag = false;
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 2) {
                        for (int[] d : directions) {
                            int row = r + d[0], col = c + d[1];
                            if (row >= 0 && col >= 0 &&
                                row < ROWS && col < COLS &&
                                grid[row][col] == 1) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
}
```

```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int ROWS = grid.size(), COLS = grid[0].size();
        int fresh = 0, time = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) fresh++;
            }
        }

        vector<vector<int>> directions = {{0, 1}, {0, -1},
                                          {1, 0}, {-1, 0}};

        while (fresh > 0) {
            bool flag = false;
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 2) {
                        for (auto& d : directions) {
                            int row = r + d[0], col = c + d[1];
                            if (row >= 0 && col >= 0 &&
                                row < ROWS && col < COLS &&
                                grid[row][col] == 1) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        let ROWS = grid.length,
            COLS = grid[0].length;
        let fresh = 0,
            time = 0;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (grid[r][c] === 1) fresh++;
            }
        }

        let directions = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];

        while (fresh > 0) {
            let flag = false;
            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (grid[r][c] === 2) {
                        for (let [dr, dc] of directions) {
                            let row = r + dr,
                                col = c + dc;
                            if (
                                row >= 0 &&
                                col >= 0 &&
                                row < ROWS &&
                                col < COLS &&
                                grid[row][col] === 1
                            ) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (let r = 0; r < ROWS; r++) {
                for (let c = 0; c < COLS; c++) {
                    if (grid[r][c] === 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
}
```

```csharp
public class Solution {
    public int OrangesRotting(int[][] grid) {
        int ROWS = grid.Length, COLS = grid[0].Length;
        int fresh = 0, time = 0;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (grid[r][c] == 1) fresh++;
            }
        }

        int[][] directions = new int[][] {
            new int[] {0, 1}, new int[] {0, -1},
            new int[] {1, 0}, new int[] {-1, 0}
        };

        while (fresh > 0) {
            bool flag = false;
            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 2) {
                        foreach (var d in directions) {
                            int row = r + d[0], col = c + d[1];
                            if (row >= 0 && col >= 0 &&
                                row < ROWS && col < COLS &&
                                grid[row][col] == 1) {
                                grid[row][col] = 3;
                                fresh--;
                                flag = true;
                            }
                        }
                    }
                }
            }

            if (!flag) return -1;

            for (int r = 0; r < ROWS; r++) {
                for (int c = 0; c < COLS; c++) {
                    if (grid[r][c] == 3) grid[r][c] = 2;
                }
            }

            time++;
        }

        return time;
    }
}
```

```go
func orangesRotting(grid [][]int) int {
    rows, cols := len(grid), len(grid[0])
    fresh := 0
    time := 0

    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if grid[r][c] == 1 {
                fresh++
            }
        }
    }

    directions := [][]int{{0, 1}, {0, -1}, {1, 0}, {-1, 0}}

    for fresh > 0 {
        flag := false
        for r := 0; r < rows; r++ {
            for c := 0; c < cols; c++ {
                if grid[r][c] == 2 {
                    for _, d := range directions {
                        row, col := r+d[0], c+d[1]
                        if row >= 0 && row < rows &&
                           col >= 0 && col < cols &&
                           grid[row][col] == 1 {
                            grid[row][col] = 3
                            fresh--
                            flag = true
                        }
                    }
                }
            }
        }

        if !flag {
            return -1
        }

        for r := 0; r < rows; r++ {
            for c := 0; c < cols; c++ {
                if grid[r][c] == 3 {
                    grid[r][c] = 2
                }
            }
        }
        time++
    }

    return time
}
```

```kotlin
class Solution {
    fun orangesRotting(grid: Array<IntArray>): Int {
        val rows = grid.size
        val cols = grid[0].size
        var fresh = 0
        var time = 0

        for (r in 0 until rows) {
            for (c in 0 until cols) {
                if (grid[r][c] == 1) fresh++
            }
        }

        val directions = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(-1, 0)
        )

        while (fresh > 0) {
            var flag = false
            for (r in 0 until rows) {
                for (c in 0 until cols) {
                    if (grid[r][c] == 2) {
                        for (d in directions) {
                            val row = r + d[0]
                            val col = c + d[1]
                            if (row in 0 until rows &&
                                col in 0 until cols &&
                                grid[row][col] == 1) {
                                grid[row][col] = 3
                                fresh--
                                flag = true
                            }
                        }
                    }
                }
            }

            if (!flag) return -1

            for (r in 0 until rows) {
                for (c in 0 until cols) {
                    if (grid[r][c] == 3) grid[r][c] = 2
                }
            }
            time++
        }

        return time
    }
}
```

```swift
class Solution {
    func orangesRotting(_ grid: [[Int]]) -> Int {
        var grid = grid
        let ROWS = grid.count
        let COLS = grid[0].count
        var fresh = 0
        var time = 0

        for r in 0..<ROWS {
            for c in 0..<COLS {
                if grid[r][c] == 1 {
                    fresh += 1
                }
            }
        }

        let directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]

        while fresh > 0 {
            var flag = false
            for r in 0..<ROWS {
                for c in 0..<COLS {
                    if grid[r][c] == 2 {
                        for dir in directions {
                            let row = r + dir[0]
                            let col = c + dir[1]
                            if (row >= 0 && row < ROWS && col >= 0 &&
                                col < COLS && grid[row][col] == 1) {
                                grid[row][col] = 3
                                fresh -= 1
                                flag = true
                            }
                        }
                    }
                }
            }

            if !flag {
                return -1
            }

            for r in 0..<ROWS {
                for c in 0..<COLS {
                    if grid[r][c] == 3 {
                        grid[r][c] = 2
                    }
                }
            }

            time += 1
        }

        return time
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((m * n) ^ 2)$
- Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns in the $grid$.

## Common Pitfalls

### Starting BFS from a Single Rotten Orange

A common mistake is initializing BFS with only one rotten orange instead of all of them simultaneously. Since all rotten oranges spread rot at the same time, you must add every cell with value `2` to the queue before starting BFS. Starting from just one source gives incorrect time calculations.

### Forgetting to Track Fresh Orange Count

Some solutions forget to count fresh oranges initially and check if any remain unreachable. Without tracking the `fresh` count, you cannot determine whether all oranges can be rotted or if some are isolated. Always decrement `fresh` when an orange rots and return `-1` if `fresh > 0` after BFS completes.

### Incrementing Time Incorrectly

A subtle bug occurs when incrementing time after processing each individual orange rather than after each BFS level. Each level represents one minute, so you must process all oranges at the current level before incrementing time. Use a loop that processes `len(queue)` elements per iteration to correctly track levels.
