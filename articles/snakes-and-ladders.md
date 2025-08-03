## 1. Breadth First Search - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Breadth First Search - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Breadth First Search - III

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
