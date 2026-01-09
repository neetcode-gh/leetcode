## 1. Breadth First Search - I

### Intuition

This is a shortest path problem on an implicit graph where each square connects to the next 1 to 6 squares (simulating a dice roll). BFS naturally finds the shortest path in an unweighted graph. The tricky part is converting between square numbers and board coordinates, since the board uses a boustrophedon (zigzag) pattern starting from the bottom-left.

### Algorithm

1. Create a helper function to convert a square number to board coordinates, accounting for the alternating row directions.
2. Initialize a queue with square 1 and 0 moves, along with a visited set.
3. While the queue is not empty:
   - Dequeue the current square and move count.
   - For each dice roll (1 to 6), calculate the next square.
   - Convert to board coordinates and check for snakes/ladders (non -1 values).
   - If the destination is the final square, return moves + 1.
   - If not visited, mark as visited and enqueue with incremented move count.
4. Return -1 if the final square is unreachable.

::tabs-start

```python
class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)

        def intToPos(square):
            r = (square - 1) // n
            c = (square - 1) % n
            if r % 2 == 1:
                c = n - 1 - c
            r = n - 1 - r
            return r, c

        q = deque([(1, 0)])
        visit = set()

        while q:
            square, moves = q.popleft()

            for i in range(1, 7):
                nextSquare = square + i
                r, c = intToPos(nextSquare)
                if board[r][c] != -1:
                    nextSquare = board[r][c]

                if nextSquare == n * n:
                    return moves + 1

                if nextSquare not in visit:
                    visit.add(nextSquare)
                    q.append((nextSquare, moves + 1))

        return -1
```

```java
public class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{1, 0});
        Set<Integer> visit = new HashSet<>();

        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int square = cur[0], moves = cur[1];

            for (int i = 1; i <= 6; i++) {
                int nextSquare = square + i;
                int[] pos = intToPos(nextSquare, n);
                int r = pos[0], c = pos[1];
                if (board[r][c] != -1) {
                    nextSquare = board[r][c];
                }
                if (nextSquare == n * n) return moves + 1;
                if (!visit.contains(nextSquare)) {
                    visit.add(nextSquare);
                    q.offer(new int[]{nextSquare, moves + 1});
                }
            }
        }
        return -1;
    }

    private int[] intToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) c = n - 1 - c;
        r = n - 1 - r;
        return new int[]{r, c};
    }
}
```

```cpp
class Solution {
public:
    int snakesAndLadders(vector<vector<int>>& board) {
        int n = board.size();
        queue<pair<int, int>> q;
        q.push({1, 0});
        unordered_set<int> visit;

        while (!q.empty()) {
            auto [square, moves] = q.front(); q.pop();

            for (int i = 1; i <= 6; i++) {
                int nextSquare = square + i;
                auto [r, c] = intToPos(nextSquare, n);
                if (board[r][c] != -1) {
                    nextSquare = board[r][c];
                }
                if (nextSquare == n * n) return moves + 1;
                if (!visit.count(nextSquare)) {
                    visit.insert(nextSquare);
                    q.push({nextSquare, moves + 1});
                }
            }
        }
        return -1;
    }

private:
    pair<int, int> intToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) c = n - 1 - c;
        r = n - 1 - r;
        return {r, c};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} board
     * @return {number}
     */
    snakesAndLadders(board) {
        const n = board.length;
        const queue = new Queue([[1, 0]]);
        const visit = new Set();

        const intToPos = (square) => {
            let r = Math.floor((square - 1) / n);
            let c = (square - 1) % n;
            if (r % 2 === 1) c = n - 1 - c;
            r = n - 1 - r;
            return [r, c];
        };

        while (!queue.isEmpty()) {
            const [square, moves] = queue.pop();

            for (let i = 1; i <= 6; i++) {
                let nextSquare = square + i;
                const [r, c] = intToPos(nextSquare);
                if (board[r][c] !== -1) {
                    nextSquare = board[r][c];
                }
                if (nextSquare === n * n) return moves + 1;
                if (!visit.has(nextSquare)) {
                    visit.add(nextSquare);
                    queue.push([nextSquare, moves + 1]);
                }
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    public int SnakesAndLadders(int[][] board) {
        int n = board.Length;
        var queue = new Queue<int[]>();
        queue.Enqueue(new int[] { 1, 0 });
        var visit = new HashSet<int>();

        while (queue.Count > 0) {
            var cur = queue.Dequeue();
            int square = cur[0], moves = cur[1];

            for (int i = 1; i <= 6; i++) {
                int nextSquare = square + i;
                int[] pos = IntToPos(nextSquare, n);
                int r = pos[0], c = pos[1];
                if (board[r][c] != -1) {
                    nextSquare = board[r][c];
                }
                if (nextSquare == n * n) return moves + 1;
                if (!visit.Contains(nextSquare)) {
                    visit.Add(nextSquare);
                    queue.Enqueue(new int[] { nextSquare, moves + 1 });
                }
            }
        }
        return -1;
    }

    private int[] IntToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) c = n - 1 - c;
        r = n - 1 - r;
        return new int[] { r, c };
    }
}
```

```go
func snakesAndLadders(board [][]int) int {
    n := len(board)

    intToPos := func(square int) (int, int) {
        r := (square - 1) / n
        c := (square - 1) % n
        if r % 2 == 1 {
            c = n - 1 - c
        }
        r = n - 1 - r
        return r, c
    }

    queue := [][2]int{{1, 0}}
    visit := make(map[int]bool)

    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        square, moves := cur[0], cur[1]

        for i := 1; i <= 6; i++ {
            nextSquare := square + i
            r, c := intToPos(nextSquare)
            if board[r][c] != -1 {
                nextSquare = board[r][c]
            }
            if nextSquare == n * n {
                return moves + 1
            }
            if !visit[nextSquare] {
                visit[nextSquare] = true
                queue = append(queue, [2]int{nextSquare, moves + 1})
            }
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun snakesAndLadders(board: Array<IntArray>): Int {
        val n = board.size

        fun intToPos(square: Int): Pair<Int, Int> {
            var r = (square - 1) / n
            var c = (square - 1) % n
            if (r % 2 == 1) c = n - 1 - c
            r = n - 1 - r
            return Pair(r, c)
        }

        val queue = ArrayDeque<Pair<Int, Int>>()
        queue.add(Pair(1, 0))
        val visit = HashSet<Int>()

        while (queue.isNotEmpty()) {
            val (square, moves) = queue.removeFirst()

            for (i in 1..6) {
                var nextSquare = square + i
                val (r, c) = intToPos(nextSquare)
                if (board[r][c] != -1) {
                    nextSquare = board[r][c]
                }
                if (nextSquare == n * n) return moves + 1
                if (nextSquare !in visit) {
                    visit.add(nextSquare)
                    queue.add(Pair(nextSquare, moves + 1))
                }
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    func snakesAndLadders(_ board: [[Int]]) -> Int {
        let n = board.count

        func intToPos(_ square: Int) -> (Int, Int) {
            var r = (square - 1) / n
            var c = (square - 1) % n
            if r % 2 == 1 {
                c = n - 1 - c
            }
            r = n - 1 - r
            return (r, c)
        }

        var queue = [(1, 0)]
        var visit = Set<Int>()
        var index = 0

        while index < queue.count {
            let (square, moves) = queue[index]
            index += 1

            for i in 1...6 {
                var nextSquare = square + i
                let (r, c) = intToPos(nextSquare)
                if board[r][c] != -1 {
                    nextSquare = board[r][c]
                }
                if nextSquare == n * n {
                    return moves + 1
                }
                if !visit.contains(nextSquare) {
                    visit.insert(nextSquare)
                    queue.append((nextSquare, moves + 1))
                }
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Breadth First Search - II

### Intuition

This variation uses a distance array instead of a visited set, storing the minimum moves to reach each square. This approach is slightly more explicit about tracking distances and allows for early termination once we reach the destination. The core BFS logic remains the same.

### Algorithm

1. Initialize a distance array with -1 for all squares except square 1 (set to 0).
2. Start BFS from square 1.
3. For each square processed:
   - Try all dice rolls (1 to 6).
   - Skip if the next square exceeds the board.
   - Apply any snake or ladder at the landing position.
   - If this square has not been visited (distance is -1), set its distance and check if it is the destination.
   - Enqueue the square for further exploration.
4. Return the distance to the final square, or -1 if unreachable.

::tabs-start

```python
class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)

        def intToPos(square):
            r = (square - 1) // n
            c = (square - 1) % n
            if r % 2 == 1:
                c = n - 1 - c
            r = n - 1 - r
            return r, c

        dist = [-1] * (n * n + 1)
        q = deque([1])
        dist[1] = 0

        while q:
            square = q.popleft()

            for i in range(1, 7):
                nextSquare = square + i
                if nextSquare > n * n:
                    break

                r, c = intToPos(nextSquare)
                if board[r][c] != -1:
                    nextSquare = board[r][c]

                if dist[nextSquare] == -1:
                    dist[nextSquare] = dist[square] + 1
                    if nextSquare == n * n:
                        return dist[nextSquare]
                    q.append(nextSquare)

        return -1
```

```java
public class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        int[] dist = new int[n * n + 1];
        Arrays.fill(dist, -1);
        Queue<Integer> q = new LinkedList<>();
        q.add(1);
        dist[1] = 0;

        while (!q.isEmpty()) {
            int square = q.poll();

            for (int i = 1; i <= 6; i++) {
                int nextSquare = square + i;
                if (nextSquare > n * n) {
                    break;
                }

                int[] pos = intToPos(nextSquare, n);
                int r = pos[0], c = pos[1];

                if (board[r][c] != -1) {
                    nextSquare = board[r][c];
                }

                if (dist[nextSquare] == -1) {
                    dist[nextSquare] = dist[square] + 1;
                    if (nextSquare == n * n) {
                        return dist[nextSquare];
                    }
                    q.add(nextSquare);
                }
            }
        }

        return -1;
    }

    private int[] intToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) {
            c = n - 1 - c;
        }
        r = n - 1 - r;
        return new int[]{r, c};
    }
}
```

```cpp
class Solution {
public:
    int snakesAndLadders(vector<vector<int>>& board) {
        int n = board.size();
        vector<int> dist(n * n + 1, -1);
        queue<int> q;
        q.push(1);
        dist[1] = 0;

        while (!q.empty()) {
            int square = q.front();
            q.pop();

            for (int i = 1; i <= 6; i++) {
                int nextSquare = square + i;
                if (nextSquare > n * n) {
                    break;
                }

                auto [r, c] = intToPos(nextSquare, n);
                if (board[r][c] != -1) {
                    nextSquare = board[r][c];
                }

                if (dist[nextSquare] == -1) {
                    dist[nextSquare] = dist[square] + 1;
                    if (nextSquare == n * n) {
                        return dist[nextSquare];
                    }
                    q.push(nextSquare);
                }
            }
        }

        return -1;
    }

private:
    pair<int, int> intToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) {
            c = n - 1 - c;
        }
        r = n - 1 - r;
        return {r, c};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} board
     * @return {number}
     */
    snakesAndLadders(board) {
        const n = board.length;
        const dist = new Array(n * n + 1).fill(-1);
        const queue = new Queue([1]);
        dist[1] = 0;

        const intToPos = (square) => {
            let r = Math.floor((square - 1) / n);
            let c = (square - 1) % n;
            if (r % 2 === 1) c = n - 1 - c;
            r = n - 1 - r;
            return [r, c];
        };

        while (!queue.isEmpty()) {
            const square = queue.pop();

            for (let i = 1; i <= 6; i++) {
                let nextSquare = square + i;
                if (nextSquare > n * n) break;

                const [r, c] = intToPos(nextSquare, n);
                if (board[r][c] !== -1) {
                    nextSquare = board[r][c];
                }

                if (dist[nextSquare] === -1) {
                    dist[nextSquare] = dist[square] + 1;
                    if (nextSquare === n * n) {
                        return dist[nextSquare];
                    }
                    queue.push(nextSquare);
                }
            }
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int SnakesAndLadders(int[][] board) {
        int n = board.Length;
        int[] dist = new int[n * n + 1];
        Array.Fill(dist, -1);
        var queue = new Queue<int>();
        queue.Enqueue(1);
        dist[1] = 0;

        while (queue.Count > 0) {
            int square = queue.Dequeue();

            for (int i = 1; i <= 6; i++) {
                int nextSquare = square + i;
                if (nextSquare > n * n) break;

                int[] pos = IntToPos(nextSquare, n);
                int r = pos[0], c = pos[1];

                if (board[r][c] != -1) {
                    nextSquare = board[r][c];
                }

                if (dist[nextSquare] == -1) {
                    dist[nextSquare] = dist[square] + 1;
                    if (nextSquare == n * n) {
                        return dist[nextSquare];
                    }
                    queue.Enqueue(nextSquare);
                }
            }
        }

        return -1;
    }

    private int[] IntToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) c = n - 1 - c;
        r = n - 1 - r;
        return new int[] { r, c };
    }
}
```

```go
func snakesAndLadders(board [][]int) int {
    n := len(board)
    dist := make([]int, n*n+1)
    for i := range dist {
        dist[i] = -1
    }
    queue := []int{1}
    dist[1] = 0

    intToPos := func(square int) (int, int) {
        r := (square - 1) / n
        c := (square - 1) % n
        if r % 2 == 1 {
            c = n - 1 - c
        }
        r = n - 1 - r
        return r, c
    }

    for len(queue) > 0 {
        square := queue[0]
        queue = queue[1:]

        for i := 1; i <= 6; i++ {
            nextSquare := square + i
            if nextSquare > n*n {
                break
            }

            r, c := intToPos(nextSquare)
            if board[r][c] != -1 {
                nextSquare = board[r][c]
            }

            if dist[nextSquare] == -1 {
                dist[nextSquare] = dist[square] + 1
                if nextSquare == n*n {
                    return dist[nextSquare]
                }
                queue = append(queue, nextSquare)
            }
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun snakesAndLadders(board: Array<IntArray>): Int {
        val n = board.size
        val dist = IntArray(n * n + 1) { -1 }
        val queue = ArrayDeque<Int>()
        queue.add(1)
        dist[1] = 0

        fun intToPos(square: Int): Pair<Int, Int> {
            var r = (square - 1) / n
            var c = (square - 1) % n
            if (r % 2 == 1) c = n - 1 - c
            r = n - 1 - r
            return Pair(r, c)
        }

        while (queue.isNotEmpty()) {
            val square = queue.removeFirst()

            for (i in 1..6) {
                var nextSquare = square + i
                if (nextSquare > n * n) break

                val (r, c) = intToPos(nextSquare)
                if (board[r][c] != -1) {
                    nextSquare = board[r][c]
                }

                if (dist[nextSquare] == -1) {
                    dist[nextSquare] = dist[square] + 1
                    if (nextSquare == n * n) {
                        return dist[nextSquare]
                    }
                    queue.add(nextSquare)
                }
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func snakesAndLadders(_ board: [[Int]]) -> Int {
        let n = board.count
        var dist = [Int](repeating: -1, count: n * n + 1)
        var queue = [1]
        dist[1] = 0
        var index = 0

        func intToPos(_ square: Int) -> (Int, Int) {
            var r = (square - 1) / n
            var c = (square - 1) % n
            if r % 2 == 1 {
                c = n - 1 - c
            }
            r = n - 1 - r
            return (r, c)
        }

        while index < queue.count {
            let square = queue[index]
            index += 1

            for i in 1...6 {
                var nextSquare = square + i
                if nextSquare > n * n { break }

                let (r, c) = intToPos(nextSquare)
                if board[r][c] != -1 {
                    nextSquare = board[r][c]
                }

                if dist[nextSquare] == -1 {
                    dist[nextSquare] = dist[square] + 1
                    if nextSquare == n * n {
                        return dist[nextSquare]
                    }
                    queue.append(nextSquare)
                }
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Breadth First Search - III

### Intuition

This optimization modifies the board in place to track visited squares, eliminating the need for a separate visited set or distance array. By marking visited positions directly on the board with a special value (0), we reduce memory overhead while maintaining the same BFS traversal logic.

### Algorithm

1. Initialize a queue with square 1 and mark the starting position on the board as visited (set to 0).
2. Process the queue level by level, tracking the current move count.
3. For each square in the current level:
   - Try all dice rolls (1 to 6).
   - Skip if the next square exceeds the board.
   - Apply any snake or ladder at the landing position.
   - If the board position is not marked as visited (not 0), check for destination and enqueue.
   - Mark the position as visited by setting it to 0.
4. Increment moves after processing each level and return -1 if unreachable.

::tabs-start

```python
class Solution:
    def snakesAndLadders(self, board: List[List[int]]) -> int:
        n = len(board)

        def intToPos(square):
            r = (square - 1) // n
            c = (square - 1) % n
            if r % 2 == 1:
                c = n - 1 - c
            r = n - 1 - r
            return r, c

        q = deque([1])
        board[n - 1][0] = 0
        moves = 0

        while q:
            for _ in range(len(q)):
                square = q.popleft()

                for i in range(1, 7):
                    nextSquare = square + i
                    if nextSquare > n * n:
                        break

                    r, c = intToPos(nextSquare)
                    if board[r][c] != -1:
                        nextSquare = board[r][c]

                    if board[r][c] != 0:
                        if nextSquare == n * n:
                            return moves + 1
                        q.append(nextSquare)
                        board[r][c] = 0
            moves += 1

        return -1
```

```java
public class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;
        Queue<Integer> q = new LinkedList<>();
        q.add(1);
        board[n - 1][0] = 0;
        int moves = 0;

        while (!q.isEmpty()) {
            for (int it = q.size(); it > 0; it--) {
                int square = q.poll();
                for (int i = 1; i <= 6; i++) {
                    int nextSquare = square + i;
                    if (nextSquare > n * n) {
                        break;
                    }

                    int[] pos = intToPos(nextSquare, n);
                    int r = pos[0], c = pos[1];

                    if (board[r][c] != -1) {
                        nextSquare = board[r][c];
                    }

                    if (board[r][c] != 0) {
                        if (nextSquare == n * n) {
                            return moves + 1;
                        }

                        board[r][c] = 0;
                        q.add(nextSquare);
                    }
                }
            }
            moves++;
        }

        return -1;
    }

    private int[] intToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) {
            c = n - 1 - c;
        }
        r = n - 1 - r;
        return new int[]{r, c};
    }
}
```

```cpp
class Solution {
public:
    int snakesAndLadders(vector<vector<int>>& board) {
        int n = board.size();
        queue<int> q;
        q.push(1);
        board[n - 1][0] = 0;
        int moves = 0;

        while (!q.empty()) {
            for (int it = q.size(); it > 0; it--) {
                int square = q.front(); q.pop();
                for (int i = 1; i <= 6; i++) {
                    int nextSquare = square + i;
                    if (nextSquare > n * n) {
                        break;
                    }

                    auto [r, c] = intToPos(nextSquare, n);
                    if (board[r][c] != -1) {
                        nextSquare = board[r][c];
                    }

                    if (board[r][c] != 0) {
                        if (nextSquare == n * n) {
                            return moves + 1;
                        }

                        board[r][c] = 0;
                        q.push(nextSquare);
                    }
                }
            }
            moves++;
        }

        return -1;
    }

private:
    pair<int, int> intToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) {
            c = n - 1 - c;
        }
        r = n - 1 - r;
        return {r, c};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} board
     * @return {number}
     */
    snakesAndLadders(board) {
        const n = board.length;
        const queue = new Queue([1]);
        board[n - 1][0] = 0;

        const intToPos = (square) => {
            let r = Math.floor((square - 1) / n);
            let c = (square - 1) % n;
            if (r % 2 === 1) c = n - 1 - c;
            r = n - 1 - r;
            return [r, c];
        };

        let moves = 0;
        while (!queue.isEmpty()) {
            for (let it = queue.size(); it > 0; it--) {
                const square = queue.pop();
                for (let i = 1; i <= 6; i++) {
                    let nextSquare = square + i;
                    if (nextSquare > n * n) break;

                    const [r, c] = intToPos(nextSquare, n);
                    if (board[r][c] !== -1) {
                        nextSquare = board[r][c];
                    }

                    if (board[r][c] !== 0) {
                        if (nextSquare === n * n) {
                            return moves + 1;
                        }

                        board[r][c] = 0;
                        queue.push(nextSquare);
                    }
                }
            }
            moves++;
        }

        return -1;
    }
}
```

```csharp
public class Solution {
    public int SnakesAndLadders(int[][] board) {
        int n = board.Length;
        var queue = new Queue<int>();
        queue.Enqueue(1);
        board[n - 1][0] = 0;
        int moves = 0;

        while (queue.Count > 0) {
            for (int it = queue.Count; it > 0; it--) {
                int square = queue.Dequeue();
                for (int i = 1; i <= 6; i++) {
                    int nextSquare = square + i;
                    if (nextSquare > n * n) break;

                    int[] pos = IntToPos(nextSquare, n);
                    int r = pos[0], c = pos[1];

                    if (board[r][c] != -1) {
                        nextSquare = board[r][c];
                    }

                    if (board[r][c] != 0) {
                        if (nextSquare == n * n) {
                            return moves + 1;
                        }

                        board[r][c] = 0;
                        queue.Enqueue(nextSquare);
                    }
                }
            }
            moves++;
        }

        return -1;
    }

    private int[] IntToPos(int square, int n) {
        int r = (square - 1) / n;
        int c = (square - 1) % n;
        if (r % 2 == 1) c = n - 1 - c;
        r = n - 1 - r;
        return new int[] { r, c };
    }
}
```

```go
func snakesAndLadders(board [][]int) int {
    n := len(board)
    queue := []int{1}
    board[n-1][0] = 0
    moves := 0

    intToPos := func(square int) (int, int) {
        r := (square - 1) / n
        c := (square - 1) % n
        if r % 2 == 1 {
            c = n - 1 - c
        }
        r = n - 1 - r
        return r, c
    }

    for len(queue) > 0 {
        size := len(queue)
        for it := 0; it < size; it++ {
            square := queue[0]
            queue = queue[1:]
            for i := 1; i <= 6; i++ {
                nextSquare := square + i
                if nextSquare > n*n {
                    break
                }

                r, c := intToPos(nextSquare)
                if board[r][c] != -1 {
                    nextSquare = board[r][c]
                }

                if board[r][c] != 0 {
                    if nextSquare == n*n {
                        return moves + 1
                    }

                    board[r][c] = 0
                    queue = append(queue, nextSquare)
                }
            }
        }
        moves++
    }

    return -1
}
```

```kotlin
class Solution {
    fun snakesAndLadders(board: Array<IntArray>): Int {
        val n = board.size
        val queue = ArrayDeque<Int>()
        queue.add(1)
        board[n - 1][0] = 0
        var moves = 0

        fun intToPos(square: Int): Pair<Int, Int> {
            var r = (square - 1) / n
            var c = (square - 1) % n
            if (r % 2 == 1) c = n - 1 - c
            r = n - 1 - r
            return Pair(r, c)
        }

        while (queue.isNotEmpty()) {
            repeat(queue.size) {
                val square = queue.removeFirst()
                for (i in 1..6) {
                    var nextSquare = square + i
                    if (nextSquare > n * n) break

                    val (r, c) = intToPos(nextSquare)
                    if (board[r][c] != -1) {
                        nextSquare = board[r][c]
                    }

                    if (board[r][c] != 0) {
                        if (nextSquare == n * n) {
                            return moves + 1
                        }

                        board[r][c] = 0
                        queue.add(nextSquare)
                    }
                }
            }
            moves++
        }

        return -1
    }
}
```

```swift
class Solution {
    func snakesAndLadders(_ board: [[Int]]) -> Int {
        var board = board
        let n = board.count
        var queue = [1]
        board[n - 1][0] = 0
        var moves = 0
        var index = 0

        func intToPos(_ square: Int) -> (Int, Int) {
            var r = (square - 1) / n
            var c = (square - 1) % n
            if r % 2 == 1 {
                c = n - 1 - c
            }
            r = n - 1 - r
            return (r, c)
        }

        while index < queue.count {
            let size = queue.count - index
            for _ in 0..<size {
                let square = queue[index]
                index += 1
                for i in 1...6 {
                    var nextSquare = square + i
                    if nextSquare > n * n { break }

                    let (r, c) = intToPos(nextSquare)
                    if board[r][c] != -1 {
                        nextSquare = board[r][c]
                    }

                    if board[r][c] != 0 {
                        if nextSquare == n * n {
                            return moves + 1
                        }

                        board[r][c] = 0
                        queue.append(nextSquare)
                    }
                }
            }
            moves += 1
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
