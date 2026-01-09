## 1. Multi Source BFS + Dijkstra's Algorithm

### Intuition

The safeness factor of a path is the minimum distance to any thief along that path. We want to maximize this minimum. First, we need to know the distance from every cell to the nearest thief, which we can compute using multi-source BFS from all thief positions. Then, finding the safest path becomes a modified shortest path problem where we maximize the minimum edge weight along the path, which Dijkstra's algorithm with a max-heap handles well.

### Algorithm

1. Run multi-source BFS from all cells containing thieves to compute `minDist[r][c]` for every cell.
2. Use a max-heap starting from `(0, 0)` with priority equal to `minDist[0][0]`.
3. Maintain a visited set to avoid reprocessing cells.
4. For each cell popped from the heap:
   - If it is the destination `(N-1, N-1)`, return the current safeness factor.
   - For each unvisited neighbor, compute the new safeness as `min(current safeness, minDist[neighbor])`.
   - Push the neighbor with this new safeness value.
5. Return the safeness when reaching the destination.

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid: List[List[int]]) -> int:
        N = len(grid)

        def in_bounds(r, c):
            return min(r, c) >= 0 and max(r, c) < N

        def precompute():
            q = deque()
            min_dist = {}
            for r in range(N):
                for c in range(N):
                    if grid[r][c]:
                        q.append([r, c, 0])
                        min_dist[(r, c)] = 0
            while q:
                r, c, dist = q.popleft()
                nei = [[r+1, c], [r-1, c], [r, c+1], [r, c-1]]
                for r2, c2 in nei:
                    if in_bounds(r2, c2) and (r2, c2) not in min_dist:
                        min_dist[(r2, c2)] = dist + 1
                        q.append([r2, c2, dist + 1])
            return min_dist

        min_dist = precompute()
        maxHeap = [(-min_dist[(0, 0)], 0, 0)]  # (dist, r, c)
        visit = set()
        visit.add((0, 0))

        while maxHeap:
            dist, r, c = heapq.heappop(maxHeap)
            dist = -dist
            if (r, c) == (N-1, N-1):
                return dist
            nei = [[r+1, c], [r-1, c], [r, c+1], [r, c-1]]
            for r2, c2 in nei:
                if in_bounds(r2, c2) and (r2, c2) not in visit:
                    visit.add((r2, c2))
                    dist2 = min(dist, min_dist[(r2, c2)])
                    heapq.heappush(maxHeap, (-dist2, r2, c2))
```

```java
public class Solution {
    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = precompute(grid, N);
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> b[0] - a[0]);
        boolean[][] visit = new boolean[N][N];

        maxHeap.offer(new int[]{minDist[0][0], 0, 0});
        visit[0][0] = true;

        while (!maxHeap.isEmpty()) {
            int[] curr = maxHeap.poll();
            int dist = curr[0], r = curr[1], c = curr[2];

            if (r == N - 1 && c == N - 1) {
                return dist;
            }

            for (int[] dir : new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && !visit[r2][c2]) {
                    visit[r2][c2] = true;
                    int dist2 = Math.min(dist, minDist[r2][c2]);
                    maxHeap.offer(new int[]{dist2, r2, c2});
                }
            }
        }
        return 0;
    }

    private int[][] precompute(List<List<Integer>> grid, int N) {
        int[][] minDist = new int[N][N];
        for (int[] row : minDist) Arrays.fill(row, -1);
        Queue<int[]> q = new LinkedList<>();

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offer(new int[]{r, c, 0});
                    minDist[r][c] = 0;
                }
            }
        }

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int r = curr[0], c = curr[1], dist = curr[2];

            for (int[] dir : new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = dist + 1;
                    q.offer(new int[]{r2, c2, dist + 1});
                }
            }
        }
        return minDist;
    }

    private boolean inBounds(int r, int c, int N) {
        return r >= 0 && c >= 0 && r < N && c < N;
    }
}
```

```cpp
class Solution {
    static constexpr int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>> minDist = precompute(grid, N);
        priority_queue<vector<int>> maxHeap;
        vector<vector<bool>> visit(N, vector<bool>(N, false));

        maxHeap.push({minDist[0][0], 0, 0});
        visit[0][0] = true;

        while (!maxHeap.empty()) {
            vector<int> cur = maxHeap.top(); maxHeap.pop();
            int dist = cur[0], r = cur[1], c = cur[2];

            if (r == N - 1 && c == N - 1) {
                return dist;
            }

            for (const auto& dir : directions) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && !visit[r2][c2]) {
                    visit[r2][c2] = true;
                    int dist2 = min(dist, minDist[r2][c2]);
                    maxHeap.push({dist2, r2, c2});
                }
            }
        }
        return 0;
    }

private:
    vector<vector<int>> precompute(vector<vector<int>>& grid, int N) {
        vector<vector<int>> minDist(N, vector<int>(N, -1));
        queue<vector<int>> q;

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push({r, c, 0});
                    minDist[r][c] = 0;
                }
            }
        }

        while (!q.empty()) {
            vector<int> cur = q.front();
            q.pop();
            int r = cur[0], c = cur[1], dist = cur[2];

            for (const auto& dir : directions) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (inBounds(r2, c2, N) && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = dist + 1;
                    q.push({r2, c2, dist + 1});
                }
            }
        }
        return minDist;
    }

    bool inBounds(int r, int c, int N) {
        return r >= 0 && c >= 0 && r < N && c < N;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];

        const inBounds = (r, c) => {
            return r >= 0 && c >= 0 && r < N && c < N;
        };

        const precompute = () => {
            const q = new Queue();
            const minDist = Array.from({ length: N }, () => Array(N).fill(-1));

            for (let r = 0; r < N; r++) {
                for (let c = 0; c < N; c++) {
                    if (grid[r][c] === 1) {
                        q.push([r, c, 0]);
                        minDist[r][c] = 0;
                    }
                }
            }

            while (!q.isEmpty()) {
                let [r, c, dist] = q.pop();

                for (let [dr, dc] of directions) {
                    let r2 = r + dr,
                        c2 = c + dc;
                    if (inBounds(r2, c2) && minDist[r2][c2] === -1) {
                        minDist[r2][c2] = dist + 1;
                        q.push([r2, c2, dist + 1]);
                    }
                }
            }
            return minDist;
        };

        const minDist = precompute();
        const maxHeap = new MaxPriorityQueue({ priority: (x) => x[0] });
        const visit = Array.from({ length: N }, () => Array(N).fill(false));

        maxHeap.enqueue([minDist[0][0], 0, 0]);
        visit[0][0] = true;

        while (!maxHeap.isEmpty()) {
            let [dist, r, c] = maxHeap.dequeue().element;

            if (r === N - 1 && c === N - 1) {
                return dist;
            }

            for (let [dr, dc] of directions) {
                let r2 = r + dr,
                    c2 = c + dc;
                if (inBounds(r2, c2) && !visit[r2][c2]) {
                    visit[r2][c2] = true;
                    let dist2 = Math.min(dist, minDist[r2][c2]);
                    maxHeap.enqueue([dist2, r2, c2]);
                }
            }
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    private static readonly int[][] directions = new int[][] {
        new int[] {1, 0}, new int[] {-1, 0},
        new int[] {0, 1}, new int[] {0, -1}
    };

    public int MaximumSafenessFactor(IList<IList<int>> grid) {
        int N = grid.Count;
        int[,] minDist = Precompute(grid, N);
        var maxHeap = new PriorityQueue<int[], int>(Comparer<int>.Create((a, b) => b - a));
        bool[,] visit = new bool[N, N];

        maxHeap.Enqueue(new int[] { minDist[0, 0], 0, 0 }, minDist[0, 0]);
        visit[0, 0] = true;

        while (maxHeap.Count > 0) {
            int[] curr = maxHeap.Dequeue();
            int dist = curr[0], r = curr[1], c = curr[2];

            if (r == N - 1 && c == N - 1) {
                return dist;
            }

            foreach (var dir in directions) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (InBounds(r2, c2, N) && !visit[r2, c2]) {
                    visit[r2, c2] = true;
                    int dist2 = Math.Min(dist, minDist[r2, c2]);
                    maxHeap.Enqueue(new int[] { dist2, r2, c2 }, dist2);
                }
            }
        }
        return 0;
    }

    private int[,] Precompute(IList<IList<int>> grid, int N) {
        int[,] minDist = new int[N, N];
        for (int i = 0; i < N; i++)
            for (int j = 0; j < N; j++)
                minDist[i, j] = -1;

        Queue<int[]> q = new Queue<int[]>();

        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.Enqueue(new int[] { r, c, 0 });
                    minDist[r, c] = 0;
                }
            }
        }

        while (q.Count > 0) {
            int[] curr = q.Dequeue();
            int r = curr[0], c = curr[1], dist = curr[2];

            foreach (var dir in directions) {
                int r2 = r + dir[0], c2 = c + dir[1];
                if (InBounds(r2, c2, N) && minDist[r2, c2] == -1) {
                    minDist[r2, c2] = dist + 1;
                    q.Enqueue(new int[] { r2, c2, dist + 1 });
                }
            }
        }
        return minDist;
    }

    private bool InBounds(int r, int c, int N) {
        return r >= 0 && c >= 0 && r < N && c < N;
    }
}
```

```go
func maximumSafenessFactor(grid [][]int) int {
    n := len(grid)
    directions := [][]int{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}

    inBounds := func(r, c int) bool {
        return r >= 0 && c >= 0 && r < n && c < n
    }

    minDist := make([][]int, n)
    for i := range minDist {
        minDist[i] = make([]int, n)
        for j := range minDist[i] {
            minDist[i][j] = -1
        }
    }

    queue := [][]int{}
    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 1 {
                queue = append(queue, []int{r, c, 0})
                minDist[r][c] = 0
            }
        }
    }

    for len(queue) > 0 {
        curr := queue[0]
        queue = queue[1:]
        r, c, dist := curr[0], curr[1], curr[2]

        for _, dir := range directions {
            r2, c2 := r+dir[0], c+dir[1]
            if inBounds(r2, c2) && minDist[r2][c2] == -1 {
                minDist[r2][c2] = dist + 1
                queue = append(queue, []int{r2, c2, dist + 1})
            }
        }
    }

    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)
    visit := make([][]bool, n)
    for i := range visit {
        visit[i] = make([]bool, n)
    }

    heap.Push(maxHeap, []int{minDist[0][0], 0, 0})
    visit[0][0] = true

    for maxHeap.Len() > 0 {
        curr := heap.Pop(maxHeap).([]int)
        dist, r, c := curr[0], curr[1], curr[2]

        if r == n-1 && c == n-1 {
            return dist
        }

        for _, dir := range directions {
            r2, c2 := r+dir[0], c+dir[1]
            if inBounds(r2, c2) && !visit[r2][c2] {
                visit[r2][c2] = true
                dist2 := min(dist, minDist[r2][c2])
                heap.Push(maxHeap, []int{dist2, r2, c2})
            }
        }
    }
    return 0
}

type MaxHeap [][]int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i][0] > h[j][0] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x any)        { *h = append(*h, x.([]int)) }
func (h *MaxHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private val directions = arrayOf(intArrayOf(1, 0), intArrayOf(-1, 0),
                                      intArrayOf(0, 1), intArrayOf(0, -1))

    fun maximumSafenessFactor(grid: List<List<Int>>): Int {
        val n = grid.size
        val minDist = precompute(grid, n)
        val maxHeap = PriorityQueue<IntArray>(compareByDescending { it[0] })
        val visit = Array(n) { BooleanArray(n) }

        maxHeap.offer(intArrayOf(minDist[0][0], 0, 0))
        visit[0][0] = true

        while (maxHeap.isNotEmpty()) {
            val (dist, r, c) = maxHeap.poll()

            if (r == n - 1 && c == n - 1) {
                return dist
            }

            for (dir in directions) {
                val r2 = r + dir[0]
                val c2 = c + dir[1]
                if (inBounds(r2, c2, n) && !visit[r2][c2]) {
                    visit[r2][c2] = true
                    val dist2 = minOf(dist, minDist[r2][c2])
                    maxHeap.offer(intArrayOf(dist2, r2, c2))
                }
            }
        }
        return 0
    }

    private fun precompute(grid: List<List<Int>>, n: Int): Array<IntArray> {
        val minDist = Array(n) { IntArray(n) { -1 } }
        val queue: Queue<IntArray> = LinkedList()

        for (r in 0 until n) {
            for (c in 0 until n) {
                if (grid[r][c] == 1) {
                    queue.offer(intArrayOf(r, c, 0))
                    minDist[r][c] = 0
                }
            }
        }

        while (queue.isNotEmpty()) {
            val (r, c, dist) = queue.poll()

            for (dir in directions) {
                val r2 = r + dir[0]
                val c2 = c + dir[1]
                if (inBounds(r2, c2, n) && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = dist + 1
                    queue.offer(intArrayOf(r2, c2, dist + 1))
                }
            }
        }
        return minDist
    }

    private fun inBounds(r: Int, c: Int, n: Int): Boolean {
        return r >= 0 && c >= 0 && r < n && c < n
    }
}
```

```swift
class Solution {
    func maximumSafenessFactor(_ grid: [[Int]]) -> Int {
        let n = grid.count
        let directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        func inBounds(_ r: Int, _ c: Int) -> Bool {
            return r >= 0 && c >= 0 && r < n && c < n
        }

        var minDist = [[Int]](repeating: [Int](repeating: -1, count: n), count: n)
        var queue = [(Int, Int, Int)]()

        for r in 0..<n {
            for c in 0..<n {
                if grid[r][c] == 1 {
                    queue.append((r, c, 0))
                    minDist[r][c] = 0
                }
            }
        }

        var idx = 0
        while idx < queue.count {
            let (r, c, dist) = queue[idx]
            idx += 1

            for (dr, dc) in directions {
                let r2 = r + dr, c2 = c + dc
                if inBounds(r2, c2) && minDist[r2][c2] == -1 {
                    minDist[r2][c2] = dist + 1
                    queue.append((r2, c2, dist + 1))
                }
            }
        }

        var maxHeap = Heap<(Int, Int, Int)>(comparator: { $0.0 > $1.0 })
        var visit = [[Bool]](repeating: [Bool](repeating: false, count: n), count: n)

        maxHeap.insert((minDist[0][0], 0, 0))
        visit[0][0] = true

        while !maxHeap.isEmpty {
            let (dist, r, c) = maxHeap.remove()!

            if r == n - 1 && c == n - 1 {
                return dist
            }

            for (dr, dc) in directions {
                let r2 = r + dr, c2 = c + dc
                if inBounds(r2, c2) && !visit[r2][c2] {
                    visit[r2][c2] = true
                    let dist2 = min(dist, minDist[r2][c2])
                    maxHeap.insert((dist2, r2, c2))
                }
            }
        }
        return 0
    }
}

struct Heap<T> {
    var elements: [T] = []
    let comparator: (T, T) -> Bool

    var isEmpty: Bool { elements.isEmpty }

    init(comparator: @escaping (T, T) -> Bool) {
        self.comparator = comparator
    }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        if elements.count == 1 { return elements.removeLast() }
        let first = elements[0]
        elements[0] = elements.removeLast()
        siftDown(from: 0)
        return first
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && comparator(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1
            let right = 2 * parent + 2
            var candidate = parent
            if left < elements.count && comparator(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && comparator(elements[right], elements[candidate]) {
                candidate = right
            }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n ^ 2)$

---

## 2. Multi Source BFS + Dijkstra's Algorithm (Overwriting the Input)

### Intuition

This approach is identical to the previous one but optimizes space by reusing the input grid to store the precomputed minimum distances. Additionally, it uses a `safeFactor` array to track the best safeness factor found so far for each cell, allowing us to skip cells if we have already found a better path to them.

### Algorithm

1. Overwrite the input grid: set thief cells to 0 and others to -1.
2. Run multi-source BFS to fill each cell with its distance to the nearest thief.
3. Initialize a `safeFactor` array to track the best safeness to each cell.
4. Use a max-heap starting from cell 0 with initial safeness `minDist[0][0]`.
5. For each cell popped:
   - Skip if we already have a better safeness for this cell.
   - If it is the destination, return the safeness.
   - Update neighbors if we can improve their safeness factor.
6. Return 0 if no path exists.

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid):
        N = len(grid)
        minDist = grid
        directions = [0, 1, 0, -1, 0]

        q = deque()
        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    q.append(r * N + c)
                    minDist[r][c] = 0
                else:
                    minDist[r][c] = -1

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                if 0 <= r2 < N and 0 <= c2 < N and minDist[r2][c2] == -1:
                    minDist[r2][c2] = minDist[r][c] + 1
                    q.append(r2 * N + c2)

        maxHeap = [(-minDist[0][0], 0)]
        safeFactor = [0] * (N * N)
        safeFactor[0] = minDist[0][0]

        while maxHeap:
            dist, node = heapq.heappop(maxHeap)
            dist = -dist
            r, c = divmod(node, N)
            if r == N - 1 and c == N - 1:
                return dist
            if safeFactor[node] > dist:
                continue

            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                node2 = r2 * N + c2
                if 0 <= r2 < N and 0 <= c2 < N:
                    dist2 = min(dist, minDist[r2][c2])
                    if dist2 > safeFactor[node2]:
                        safeFactor[node2] = dist2
                        heapq.heappush(maxHeap, (-dist2, node2))

        return 0
```

```java
public class Solution {
    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = new int[N][N];
        int[] directions = {0, 1, 0, -1, 0};

        Queue<Integer> q = new LinkedList<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offer(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.offer(r2 * N + c2);
                }
            }
        }

        PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> Integer.compare(b[0], a[0]));
        int[] safeFactor = new int[N * N];
        Arrays.fill(safeFactor, -1);
        safeFactor[0] = minDist[0][0];
        maxHeap.offer(new int[]{safeFactor[0], 0});

        while (!maxHeap.isEmpty()) {
            int[] top = maxHeap.poll();
            int dist = top[0], node = top[1];
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return dist;
            }
            if (safeFactor[node] > dist) {
                continue;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                int node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N) {
                    int dist2 = Math.min(dist, minDist[r2][c2]);
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2;
                        maxHeap.offer(new int[]{dist2, node2});
                    }
                }
            }
        }
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<int> directions = {0, 1, 0, -1, 0};
        vector<vector<int>>& minDist = grid;

        queue<int> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        priority_queue<pair<int, int>> maxHeap;
        vector<int> safeFactor(N * N, 0);
        safeFactor[0] = minDist[0][0];
        maxHeap.push({safeFactor[0], 0});

        while (!maxHeap.empty()) {
            auto [dist, node] = maxHeap.top(); maxHeap.pop();
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return dist;
            }
            if (safeFactor[node] > dist) {
                continue;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N) {
                    int dist2 = min(dist, minDist[r2][c2]);
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2;
                        maxHeap.push({dist2, node2});
                    }
                }
            }
        }
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const directions = [0, 1, 0, -1, 0];
        const minDist = grid;

        const q = new Queue();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            let node = q.pop();
            let r = Math.floor(node / N),
                c = node % N;
            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1];
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    minDist[r2][c2] === -1
                ) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        let maxHeap = new MaxPriorityQueue({ priority: (x) => x[0] });
        let safeFactor = new Array(N * N).fill(0);
        safeFactor[0] = minDist[0][0];
        maxHeap.enqueue([safeFactor[0], 0]);

        while (!maxHeap.isEmpty()) {
            let [dist, node] = maxHeap.dequeue().element;
            let r = Math.floor(node / N),
                c = node % N;
            if (r === N - 1 && c === N - 1) {
                return dist;
            }
            if (safeFactor[node] > dist) {
                continue;
            }

            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1],
                    node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N) {
                    let dist2 = Math.min(dist, minDist[r2][c2]);
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2;
                        maxHeap.enqueue([dist2, node2]);
                    }
                }
            }
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    public int MaximumSafenessFactor(IList<IList<int>> grid) {
        int N = grid.Count;
        int[] directions = { 0, 1, 0, -1, 0 };
        int[,] minDist = new int[N, N];

        Queue<int> q = new Queue<int>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.Enqueue(r * N + c);
                    minDist[r, c] = 0;
                } else {
                    minDist[r, c] = -1;
                }
            }
        }

        while (q.Count > 0) {
            int node = q.Dequeue();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2, c2] == -1) {
                    minDist[r2, c2] = minDist[r, c] + 1;
                    q.Enqueue(r2 * N + c2);
                }
            }
        }

        var maxHeap = new PriorityQueue<int[], int>(Comparer<int>.Create((a, b) => b - a));
        int[] safeFactor = new int[N * N];
        Array.Fill(safeFactor, -1);
        safeFactor[0] = minDist[0, 0];
        maxHeap.Enqueue(new int[] { safeFactor[0], 0 }, safeFactor[0]);

        while (maxHeap.Count > 0) {
            int[] top = maxHeap.Dequeue();
            int dist = top[0], node = top[1];
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return dist;
            }
            if (safeFactor[node] > dist) {
                continue;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                int node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N) {
                    int dist2 = Math.Min(dist, minDist[r2, c2]);
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2;
                        maxHeap.Enqueue(new int[] { dist2, node2 }, dist2);
                    }
                }
            }
        }
        return 0;
    }
}
```

```go
func maximumSafenessFactor(grid [][]int) int {
    n := len(grid)
    directions := []int{0, 1, 0, -1, 0}
    minDist := grid

    queue := []int{}
    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 1 {
                queue = append(queue, r*n+c)
                minDist[r][c] = 0
            } else {
                minDist[r][c] = -1
            }
        }
    }

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        r, c := node/n, node%n
        for i := 0; i < 4; i++ {
            r2, c2 := r+directions[i], c+directions[i+1]
            if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1 {
                minDist[r2][c2] = minDist[r][c] + 1
                queue = append(queue, r2*n+c2)
            }
        }
    }

    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)
    safeFactor := make([]int, n*n)
    safeFactor[0] = minDist[0][0]
    heap.Push(maxHeap, []int{safeFactor[0], 0})

    for maxHeap.Len() > 0 {
        top := heap.Pop(maxHeap).([]int)
        dist, node := top[0], top[1]
        r, c := node/n, node%n
        if r == n-1 && c == n-1 {
            return dist
        }
        if safeFactor[node] > dist {
            continue
        }

        for i := 0; i < 4; i++ {
            r2, c2 := r+directions[i], c+directions[i+1]
            node2 := r2*n + c2
            if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n {
                dist2 := min(dist, minDist[r2][c2])
                if dist2 > safeFactor[node2] {
                    safeFactor[node2] = dist2
                    heap.Push(maxHeap, []int{dist2, node2})
                }
            }
        }
    }
    return 0
}

type MaxHeap [][]int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i][0] > h[j][0] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x any)        { *h = append(*h, x.([]int)) }
func (h *MaxHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maximumSafenessFactor(grid: List<List<Int>>): Int {
        val n = grid.size
        val directions = intArrayOf(0, 1, 0, -1, 0)
        val minDist = Array(n) { IntArray(n) }

        val queue: Queue<Int> = LinkedList()
        for (r in 0 until n) {
            for (c in 0 until n) {
                if (grid[r][c] == 1) {
                    queue.offer(r * n + c)
                    minDist[r][c] = 0
                } else {
                    minDist[r][c] = -1
                }
            }
        }

        while (queue.isNotEmpty()) {
            val node = queue.poll()
            val r = node / n
            val c = node % n
            for (i in 0 until 4) {
                val r2 = r + directions[i]
                val c2 = c + directions[i + 1]
                if (r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1
                    queue.offer(r2 * n + c2)
                }
            }
        }

        val maxHeap = PriorityQueue<IntArray>(compareByDescending { it[0] })
        val safeFactor = IntArray(n * n) { -1 }
        safeFactor[0] = minDist[0][0]
        maxHeap.offer(intArrayOf(safeFactor[0], 0))

        while (maxHeap.isNotEmpty()) {
            val (dist, node) = maxHeap.poll()
            val r = node / n
            val c = node % n
            if (r == n - 1 && c == n - 1) {
                return dist
            }
            if (safeFactor[node] > dist) {
                continue
            }

            for (i in 0 until 4) {
                val r2 = r + directions[i]
                val c2 = c + directions[i + 1]
                val node2 = r2 * n + c2
                if (r2 >= 0 && c2 >= 0 && r2 < n && c2 < n) {
                    val dist2 = minOf(dist, minDist[r2][c2])
                    if (dist2 > safeFactor[node2]) {
                        safeFactor[node2] = dist2
                        maxHeap.offer(intArrayOf(dist2, node2))
                    }
                }
            }
        }
        return 0
    }
}
```

```swift
class Solution {
    func maximumSafenessFactor(_ grid: [[Int]]) -> Int {
        let n = grid.count
        let directions = [0, 1, 0, -1, 0]
        var minDist = grid

        var queue = [Int]()
        for r in 0..<n {
            for c in 0..<n {
                if grid[r][c] == 1 {
                    queue.append(r * n + c)
                    minDist[r][c] = 0
                } else {
                    minDist[r][c] = -1
                }
            }
        }

        var idx = 0
        while idx < queue.count {
            let node = queue[idx]
            idx += 1
            let r = node / n, c = node % n
            for i in 0..<4 {
                let r2 = r + directions[i], c2 = c + directions[i + 1]
                if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1 {
                    minDist[r2][c2] = minDist[r][c] + 1
                    queue.append(r2 * n + c2)
                }
            }
        }

        var maxHeap = Heap<(Int, Int)>(comparator: { $0.0 > $1.0 })
        var safeFactor = [Int](repeating: 0, count: n * n)
        safeFactor[0] = minDist[0][0]
        maxHeap.insert((safeFactor[0], 0))

        while !maxHeap.isEmpty {
            let (dist, node) = maxHeap.remove()!
            let r = node / n, c = node % n
            if r == n - 1 && c == n - 1 {
                return dist
            }
            if safeFactor[node] > dist {
                continue
            }

            for i in 0..<4 {
                let r2 = r + directions[i], c2 = c + directions[i + 1]
                let node2 = r2 * n + c2
                if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n {
                    let dist2 = min(dist, minDist[r2][c2])
                    if dist2 > safeFactor[node2] {
                        safeFactor[node2] = dist2
                        maxHeap.insert((dist2, node2))
                    }
                }
            }
        }
        return 0
    }
}

struct Heap<T> {
    var elements: [T] = []
    let comparator: (T, T) -> Bool

    var isEmpty: Bool { elements.isEmpty }

    init(comparator: @escaping (T, T) -> Bool) {
        self.comparator = comparator
    }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        if elements.count == 1 { return elements.removeLast() }
        let first = elements[0]
        elements[0] = elements.removeLast()
        siftDown(from: 0)
        return first
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && comparator(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1
            let right = 2 * parent + 2
            var candidate = parent
            if left < elements.count && comparator(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && comparator(elements[right], elements[candidate]) {
                candidate = right
            }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n ^ 2)$

---

## 3. Multi Source BFS + Binary Search

### Intuition

Instead of using Dijkstra to find the optimal safeness, we can binary search on the answer. For a given safeness threshold, we check if there exists a path from start to end using only cells with `minDist >= threshold`. This check is a simple BFS or DFS. The maximum valid threshold is our answer.

### Algorithm

1. Precompute `minDist` for all cells using multi-source BFS from thieves.
2. Binary search on the safeness factor in range `[0, min(minDist[0][0], minDist[N-1][N-1])]`.
3. For each candidate `mid`:
   - Run BFS/DFS to check if we can reach `(N-1, N-1)` from `(0, 0)` using only cells with `minDist >= mid`.
   - If reachable, try a higher threshold (`l = mid + 1`).
   - Otherwise, try a lower threshold (`r = mid - 1`).
4. Return the highest valid threshold found.

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid):
        N = len(grid)
        minDist = grid
        directions = [0, 1, 0, -1, 0]

        q = deque()
        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    q.append(r * N + c)
                    minDist[r][c] = 0
                else:
                    minDist[r][c] = -1

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                if 0 <= r2 < N and 0 <= c2 < N and minDist[r2][c2] == -1:
                    minDist[r2][c2] = minDist[r][c] + 1
                    q.append(r2 * N + c2)

        def canReach(threshold):
            q = deque([0])
            visited = [False] * (N * N)
            visited[0] = True

            while q:
                node = q.popleft()
                r, c = divmod(node, N)
                if r == N - 1 and c == N - 1:
                    return True

                for i in range(4):
                    r2, c2 = r + directions[i], c + directions[i + 1]
                    node2 = r2 * N + c2
                    if (0 <= r2 < N and 0 <= c2 < N and not visited[node2] and
                        minDist[r2][c2] >= threshold
                    ):
                        visited[node2] = True
                        q.append(node2)

            return False

        l, r = 0, min(minDist[0][0], minDist[N - 1][N - 1])
        while l <= r:
            mid = (l + r) // 2
            if canReach(mid):
                l = mid + 1
            else:
                r = mid - 1

        return l - 1
```

```java
public class Solution {
    private static int[] directions = {0, 1, 0, -1, 0};

    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = new int[N][N];

        Queue<Integer> q = new LinkedList<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offer(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            int node = q.poll();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.offer(r2 * N + c2);
                }
            }
        }

        int l = 0, r = Math.min(minDist[0][0], minDist[N - 1][N - 1]);
        while (l <= r) {
            int mid = (l + r) / 2;
            if (canReach(minDist, N, mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l - 1;
    }

    private boolean canReach(int[][] minDist, int N, int threshold) {
        Queue<Integer> q = new LinkedList<>();
        boolean[] visited = new boolean[N * N];
        q.offer(0);
        visited[0] = true;

        while (!q.isEmpty()) {
            int node = q.poll();
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return true;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                int node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && !visited[node2] &&
                    minDist[r2][c2] >= threshold) {
                    visited[node2] = true;
                    q.offer(node2);
                }
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
    static constexpr int directions[5] = {0, 1, 0, -1, 0};

public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>>& minDist = grid;

        queue<int> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.empty()) {
            int node = q.front(); q.pop();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        int l = 0, r = min(minDist[0][0], minDist[N - 1][N - 1]);
        while (l <= r) {
            int mid = (l + r) / 2;
            if (canReach(minDist, N, mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l - 1;
    }

private:
    bool canReach(vector<vector<int>>& minDist, int N, int threshold) {
        queue<int> q;
        vector<bool> visited(N * N, false);
        q.push(0);
        visited[0] = true;

        while (!q.empty()) {
            int node = q.front(); q.pop();
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return true;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && !visited[node2] &&
                    minDist[r2][c2] >= threshold) {
                    visited[node2] = true;
                    q.push(node2);
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
     * @param {number[][]} grid
     * @return {number}
     */
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const minDist = grid;
        const directions = [0, 1, 0, -1, 0];

        let q = new Queue();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    q.push(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            let node = q.pop();
            let r = Math.floor(node / N),
                c = node % N;
            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1];
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    minDist[r2][c2] === -1
                ) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push(r2 * N + c2);
                }
            }
        }

        const canReach = (threshold) => {
            q = new Queue([0]);
            let visited = new Array(N * N).fill(false);
            visited[0] = true;

            while (!q.isEmpty()) {
                let node = q.pop();
                let r = Math.floor(node / N),
                    c = node % N;
                if (r === N - 1 && c === N - 1) return true;

                for (let i = 0; i < 4; i++) {
                    let r2 = r + directions[i],
                        c2 = c + directions[i + 1],
                        node2 = r2 * N + c2;
                    if (
                        r2 >= 0 &&
                        c2 >= 0 &&
                        r2 < N &&
                        c2 < N &&
                        !visited[node2] &&
                        minDist[r2][c2] >= threshold
                    ) {
                        visited[node2] = true;
                        q.push(node2);
                    }
                }
            }
            return false;
        };

        let l = 0,
            r = Math.min(minDist[0][0], minDist[N - 1][N - 1]);
        while (l <= r) {
            let mid = Math.floor((l + r) / 2);
            if (canReach(mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return l - 1;
    }
}
```

```csharp
public class Solution {
    private static int[] directions = { 0, 1, 0, -1, 0 };

    public int MaximumSafenessFactor(IList<IList<int>> grid) {
        int N = grid.Count;
        int[,] minDist = new int[N, N];

        Queue<int> q = new Queue<int>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.Enqueue(r * N + c);
                    minDist[r, c] = 0;
                } else {
                    minDist[r, c] = -1;
                }
            }
        }

        while (q.Count > 0) {
            int node = q.Dequeue();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2, c2] == -1) {
                    minDist[r2, c2] = minDist[r, c] + 1;
                    q.Enqueue(r2 * N + c2);
                }
            }
        }

        int l = 0, right = Math.Min(minDist[0, 0], minDist[N - 1, N - 1]);
        while (l <= right) {
            int mid = (l + right) / 2;
            if (CanReach(minDist, N, mid)) {
                l = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return l - 1;
    }

    private bool CanReach(int[,] minDist, int N, int threshold) {
        Queue<int> q = new Queue<int>();
        bool[] visited = new bool[N * N];
        q.Enqueue(0);
        visited[0] = true;

        while (q.Count > 0) {
            int node = q.Dequeue();
            int r = node / N, c = node % N;
            if (r == N - 1 && c == N - 1) {
                return true;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                int node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && !visited[node2] &&
                    minDist[r2, c2] >= threshold) {
                    visited[node2] = true;
                    q.Enqueue(node2);
                }
            }
        }
        return false;
    }
}
```

```go
func maximumSafenessFactor(grid [][]int) int {
    n := len(grid)
    directions := []int{0, 1, 0, -1, 0}
    minDist := grid

    queue := []int{}
    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 1 {
                queue = append(queue, r*n+c)
                minDist[r][c] = 0
            } else {
                minDist[r][c] = -1
            }
        }
    }

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        r, c := node/n, node%n
        for i := 0; i < 4; i++ {
            r2, c2 := r+directions[i], c+directions[i+1]
            if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1 {
                minDist[r2][c2] = minDist[r][c] + 1
                queue = append(queue, r2*n+c2)
            }
        }
    }

    canReach := func(threshold int) bool {
        q := []int{0}
        visited := make([]bool, n*n)
        visited[0] = true

        for len(q) > 0 {
            node := q[0]
            q = q[1:]
            r, c := node/n, node%n
            if r == n-1 && c == n-1 {
                return true
            }

            for i := 0; i < 4; i++ {
                r2, c2 := r+directions[i], c+directions[i+1]
                node2 := r2*n + c2
                if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && !visited[node2] &&
                    minDist[r2][c2] >= threshold {
                    visited[node2] = true
                    q = append(q, node2)
                }
            }
        }
        return false
    }

    l, r := 0, min(minDist[0][0], minDist[n-1][n-1])
    for l <= r {
        mid := (l + r) / 2
        if canReach(mid) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    return l - 1
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private val directions = intArrayOf(0, 1, 0, -1, 0)

    fun maximumSafenessFactor(grid: List<List<Int>>): Int {
        val n = grid.size
        val minDist = Array(n) { IntArray(n) }

        val queue: Queue<Int> = LinkedList()
        for (r in 0 until n) {
            for (c in 0 until n) {
                if (grid[r][c] == 1) {
                    queue.offer(r * n + c)
                    minDist[r][c] = 0
                } else {
                    minDist[r][c] = -1
                }
            }
        }

        while (queue.isNotEmpty()) {
            val node = queue.poll()
            val r = node / n
            val c = node % n
            for (i in 0 until 4) {
                val r2 = r + directions[i]
                val c2 = c + directions[i + 1]
                if (r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1
                    queue.offer(r2 * n + c2)
                }
            }
        }

        var l = 0
        var right = minOf(minDist[0][0], minDist[n - 1][n - 1])
        while (l <= right) {
            val mid = (l + right) / 2
            if (canReach(minDist, n, mid)) {
                l = mid + 1
            } else {
                right = mid - 1
            }
        }
        return l - 1
    }

    private fun canReach(minDist: Array<IntArray>, n: Int, threshold: Int): Boolean {
        val queue: Queue<Int> = LinkedList()
        val visited = BooleanArray(n * n)
        queue.offer(0)
        visited[0] = true

        while (queue.isNotEmpty()) {
            val node = queue.poll()
            val r = node / n
            val c = node % n
            if (r == n - 1 && c == n - 1) {
                return true
            }

            for (i in 0 until 4) {
                val r2 = r + directions[i]
                val c2 = c + directions[i + 1]
                val node2 = r2 * n + c2
                if (r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && !visited[node2] &&
                    minDist[r2][c2] >= threshold) {
                    visited[node2] = true
                    queue.offer(node2)
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func maximumSafenessFactor(_ grid: [[Int]]) -> Int {
        let n = grid.count
        let directions = [0, 1, 0, -1, 0]
        var minDist = grid

        var queue = [Int]()
        for r in 0..<n {
            for c in 0..<n {
                if grid[r][c] == 1 {
                    queue.append(r * n + c)
                    minDist[r][c] = 0
                } else {
                    minDist[r][c] = -1
                }
            }
        }

        var idx = 0
        while idx < queue.count {
            let node = queue[idx]
            idx += 1
            let r = node / n, c = node % n
            for i in 0..<4 {
                let r2 = r + directions[i], c2 = c + directions[i + 1]
                if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1 {
                    minDist[r2][c2] = minDist[r][c] + 1
                    queue.append(r2 * n + c2)
                }
            }
        }

        func canReach(_ threshold: Int) -> Bool {
            var q = [0]
            var visited = [Bool](repeating: false, count: n * n)
            visited[0] = true
            var i = 0

            while i < q.count {
                let node = q[i]
                i += 1
                let r = node / n, c = node % n
                if r == n - 1 && c == n - 1 {
                    return true
                }

                for j in 0..<4 {
                    let r2 = r + directions[j], c2 = c + directions[j + 1]
                    let node2 = r2 * n + c2
                    if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && !visited[node2] &&
                        minDist[r2][c2] >= threshold {
                        visited[node2] = true
                        q.append(node2)
                    }
                }
            }
            return false
        }

        var l = 0
        var r = min(minDist[0][0], minDist[n - 1][n - 1])
        while l <= r {
            let mid = (l + r) / 2
            if canReach(mid) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return l - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n ^ 2)$

---

## 4. Breadth First Search (0-1 BFS)

### Intuition

0-1 BFS is an optimization when edge weights are only 0 or 1. Here we adapt it: moving to a neighbor with the same or better safeness has cost 0, while moving to a neighbor with worse safeness has cost 1 (we are forced to accept a lower minimum). By adding zero-cost moves to the front and cost-1 moves to the back of a deque, we process cells in order of decreasing safeness factor.

### Algorithm

1. Precompute `minDist` using multi-source BFS.
2. Initialize `safeFactor[0] = min(minDist[0][0], minDist[N-1][N-1])` and track the running result `res`.
3. Use a deque starting with cell 0.
4. For each cell popped:
   - Update `res = min(res, safeFactor[node])`.
   - If destination reached, break.
   - For each unvisited neighbor:
     - Compute its safeness as `min(safeFactor[current], minDist[neighbor])`.
     - If it maintains the current result, add to front (zero cost); otherwise add to back.
5. Return `res`.

::tabs-start

```python
class Solution:
    def maximumSafenessFactor(self, grid):
        N = len(grid)
        minDist = grid
        directions = [0, 1, 0, -1, 0]

        q = deque()
        for r in range(N):
            for c in range(N):
                if grid[r][c] == 1:
                    q.append(r * N + c)
                    minDist[r][c] = 0
                else:
                    minDist[r][c] = -1

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                if 0 <= r2 < N and 0 <= c2 < N and minDist[r2][c2] == -1:
                    minDist[r2][c2] = minDist[r][c] + 1
                    q.append(r2 * N + c2)

        safeFactor = [-1] * (N * N)
        res = safeFactor[0] = min(minDist[N - 1][N - 1], minDist[0][0])
        q.append(0)

        while q:
            node = q.popleft()
            r, c = divmod(node, N)
            res = min(res, safeFactor[node])
            if r == N - 1 and c == N - 1:
                break

            for i in range(4):
                r2, c2 = r + directions[i], c + directions[i + 1]
                node2 = r2 * N + c2
                if 0 <= r2 < N and 0 <= c2 < N and safeFactor[node2] == -1:
                    safeFactor[node2] = min(safeFactor[node], minDist[r2][c2])
                    if safeFactor[node2] < res:
                        q.append(node2)
                    else:
                        q.appendleft(node2)

        return res
```

```java
public class Solution {
    private static final int[] directions = {0, 1, 0, -1, 0};

    public int maximumSafenessFactor(List<List<Integer>> grid) {
        int N = grid.size();
        int[][] minDist = new int[N][N];

        Deque<Integer> q = new ArrayDeque<>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid.get(r).get(c) == 1) {
                    q.offerLast(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            int node = q.pollFirst();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.offerLast(r2 * N + c2);
                }
            }
        }

        int[] safeFactor = new int[N * N];
        Arrays.fill(safeFactor, -1);
        int res = safeFactor[0] = Math.min(minDist[N - 1][N - 1], minDist[0][0]);
        q.offerLast(0);

        while (!q.isEmpty()) {
            int node = q.pollFirst();
            int r = node / N, c = node % N;
            res = Math.min(res, safeFactor[node]);
            if (r == N - 1 && c == N - 1) {
                break;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && safeFactor[node2] == -1) {
                    safeFactor[node2] = Math.min(safeFactor[node], minDist[r2][c2]);
                    if (safeFactor[node2] < res) {
                        q.offerLast(node2);
                    } else {
                        q.offerFirst(node2);
                    }
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maximumSafenessFactor(vector<vector<int>>& grid) {
        int N = grid.size();
        vector<vector<int>>& minDist = grid;
        constexpr int directions[5] = {0, 1, 0, -1, 0};

        deque<int> q;
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.push_back(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.empty()) {
            int node = q.front(); q.pop_front();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.push_back(r2 * N + c2);
                }
            }
        }

        vector<int> safeFactor(N * N, -1);
        int res = safeFactor[0] = min(minDist[N - 1][N - 1], minDist[0][0]);
        q.push_back(0);

        while (!q.empty()) {
            int node = q.front(); q.pop_front();
            int r = node / N, c = node % N;
            res = min(res, safeFactor[node]);
            if (r == N - 1 && c == N - 1) {
                break;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1], node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && safeFactor[node2] == -1) {
                    safeFactor[node2] = min(safeFactor[node], minDist[r2][c2]);
                    if (safeFactor[node2] < res) {
                        q.push_back(node2);
                    } else {
                        q.push_front(node2);
                    }
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maximumSafenessFactor(grid) {
        const N = grid.length;
        const minDist = grid;
        const directions = [0, 1, 0, -1, 0];

        const q = new Deque();
        for (let r = 0; r < N; r++) {
            for (let c = 0; c < N; c++) {
                if (grid[r][c] === 1) {
                    q.pushBack(r * N + c);
                    minDist[r][c] = 0;
                } else {
                    minDist[r][c] = -1;
                }
            }
        }

        while (!q.isEmpty()) {
            let node = q.popFront();
            let r = Math.floor(node / N),
                c = node % N;
            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1];
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    minDist[r2][c2] === -1
                ) {
                    minDist[r2][c2] = minDist[r][c] + 1;
                    q.pushBack(r2 * N + c2);
                }
            }
        }

        let safeFactor = new Array(N * N).fill(-1);
        let res = (safeFactor[0] = Math.min(
            minDist[N - 1][N - 1],
            minDist[0][0],
        ));
        q.pushBack(0);

        while (!q.isEmpty()) {
            let node = q.popFront();
            let r = Math.floor(node / N),
                c = node % N;
            res = Math.min(res, safeFactor[node]);
            if (r === N - 1 && c === N - 1) {
                break;
            }

            for (let i = 0; i < 4; i++) {
                let r2 = r + directions[i],
                    c2 = c + directions[i + 1],
                    node2 = r2 * N + c2;
                if (
                    r2 >= 0 &&
                    c2 >= 0 &&
                    r2 < N &&
                    c2 < N &&
                    safeFactor[node2] === -1
                ) {
                    safeFactor[node2] = Math.min(
                        safeFactor[node],
                        minDist[r2][c2],
                    );
                    if (safeFactor[node2] < res) {
                        q.pushBack(node2);
                    } else {
                        q.pushFront(node2);
                    }
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    private static readonly int[] directions = { 0, 1, 0, -1, 0 };

    public int MaximumSafenessFactor(IList<IList<int>> grid) {
        int N = grid.Count;
        int[,] minDist = new int[N, N];

        LinkedList<int> q = new LinkedList<int>();
        for (int r = 0; r < N; r++) {
            for (int c = 0; c < N; c++) {
                if (grid[r][c] == 1) {
                    q.AddLast(r * N + c);
                    minDist[r, c] = 0;
                } else {
                    minDist[r, c] = -1;
                }
            }
        }

        while (q.Count > 0) {
            int node = q.First.Value;
            q.RemoveFirst();
            int r = node / N, c = node % N;
            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && minDist[r2, c2] == -1) {
                    minDist[r2, c2] = minDist[r, c] + 1;
                    q.AddLast(r2 * N + c2);
                }
            }
        }

        int[] safeFactor = new int[N * N];
        Array.Fill(safeFactor, -1);
        int res = safeFactor[0] = Math.Min(minDist[N - 1, N - 1], minDist[0, 0]);
        q.AddLast(0);

        while (q.Count > 0) {
            int node = q.First.Value;
            q.RemoveFirst();
            int r = node / N, c = node % N;
            res = Math.Min(res, safeFactor[node]);
            if (r == N - 1 && c == N - 1) {
                break;
            }

            for (int i = 0; i < 4; i++) {
                int r2 = r + directions[i], c2 = c + directions[i + 1];
                int node2 = r2 * N + c2;
                if (r2 >= 0 && c2 >= 0 && r2 < N && c2 < N && safeFactor[node2] == -1) {
                    safeFactor[node2] = Math.Min(safeFactor[node], minDist[r2, c2]);
                    if (safeFactor[node2] < res) {
                        q.AddLast(node2);
                    } else {
                        q.AddFirst(node2);
                    }
                }
            }
        }

        return res;
    }
}
```

```go
func maximumSafenessFactor(grid [][]int) int {
    n := len(grid)
    directions := []int{0, 1, 0, -1, 0}
    minDist := grid

    deque := []int{}
    for r := 0; r < n; r++ {
        for c := 0; c < n; c++ {
            if grid[r][c] == 1 {
                deque = append(deque, r*n+c)
                minDist[r][c] = 0
            } else {
                minDist[r][c] = -1
            }
        }
    }

    for len(deque) > 0 {
        node := deque[0]
        deque = deque[1:]
        r, c := node/n, node%n
        for i := 0; i < 4; i++ {
            r2, c2 := r+directions[i], c+directions[i+1]
            if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1 {
                minDist[r2][c2] = minDist[r][c] + 1
                deque = append(deque, r2*n+c2)
            }
        }
    }

    safeFactor := make([]int, n*n)
    for i := range safeFactor {
        safeFactor[i] = -1
    }
    res := min(minDist[n-1][n-1], minDist[0][0])
    safeFactor[0] = res
    deque = append(deque, 0)

    for len(deque) > 0 {
        node := deque[0]
        deque = deque[1:]
        r, c := node/n, node%n
        res = min(res, safeFactor[node])
        if r == n-1 && c == n-1 {
            break
        }

        for i := 0; i < 4; i++ {
            r2, c2 := r+directions[i], c+directions[i+1]
            node2 := r2*n + c2
            if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && safeFactor[node2] == -1 {
                safeFactor[node2] = min(safeFactor[node], minDist[r2][c2])
                if safeFactor[node2] < res {
                    deque = append(deque, node2)
                } else {
                    deque = append([]int{node2}, deque...)
                }
            }
        }
    }

    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private val directions = intArrayOf(0, 1, 0, -1, 0)

    fun maximumSafenessFactor(grid: List<List<Int>>): Int {
        val n = grid.size
        val minDist = Array(n) { IntArray(n) }

        val deque = ArrayDeque<Int>()
        for (r in 0 until n) {
            for (c in 0 until n) {
                if (grid[r][c] == 1) {
                    deque.addLast(r * n + c)
                    minDist[r][c] = 0
                } else {
                    minDist[r][c] = -1
                }
            }
        }

        while (deque.isNotEmpty()) {
            val node = deque.removeFirst()
            val r = node / n
            val c = node % n
            for (i in 0 until 4) {
                val r2 = r + directions[i]
                val c2 = c + directions[i + 1]
                if (r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1) {
                    minDist[r2][c2] = minDist[r][c] + 1
                    deque.addLast(r2 * n + c2)
                }
            }
        }

        val safeFactor = IntArray(n * n) { -1 }
        var res = minOf(minDist[n - 1][n - 1], minDist[0][0])
        safeFactor[0] = res
        deque.addLast(0)

        while (deque.isNotEmpty()) {
            val node = deque.removeFirst()
            val r = node / n
            val c = node % n
            res = minOf(res, safeFactor[node])
            if (r == n - 1 && c == n - 1) {
                break
            }

            for (i in 0 until 4) {
                val r2 = r + directions[i]
                val c2 = c + directions[i + 1]
                val node2 = r2 * n + c2
                if (r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && safeFactor[node2] == -1) {
                    safeFactor[node2] = minOf(safeFactor[node], minDist[r2][c2])
                    if (safeFactor[node2] < res) {
                        deque.addLast(node2)
                    } else {
                        deque.addFirst(node2)
                    }
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maximumSafenessFactor(_ grid: [[Int]]) -> Int {
        let n = grid.count
        let directions = [0, 1, 0, -1, 0]
        var minDist = grid

        var deque = Deque<Int>()
        for r in 0..<n {
            for c in 0..<n {
                if grid[r][c] == 1 {
                    deque.append(r * n + c)
                    minDist[r][c] = 0
                } else {
                    minDist[r][c] = -1
                }
            }
        }

        while !deque.isEmpty {
            let node = deque.removeFirst()
            let r = node / n, c = node % n
            for i in 0..<4 {
                let r2 = r + directions[i], c2 = c + directions[i + 1]
                if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && minDist[r2][c2] == -1 {
                    minDist[r2][c2] = minDist[r][c] + 1
                    deque.append(r2 * n + c2)
                }
            }
        }

        var safeFactor = [Int](repeating: -1, count: n * n)
        var res = min(minDist[n - 1][n - 1], minDist[0][0])
        safeFactor[0] = res
        deque.append(0)

        while !deque.isEmpty {
            let node = deque.removeFirst()
            let r = node / n, c = node % n
            res = min(res, safeFactor[node])
            if r == n - 1 && c == n - 1 {
                break
            }

            for i in 0..<4 {
                let r2 = r + directions[i], c2 = c + directions[i + 1]
                let node2 = r2 * n + c2
                if r2 >= 0 && c2 >= 0 && r2 < n && c2 < n && safeFactor[node2] == -1 {
                    safeFactor[node2] = min(safeFactor[node], minDist[r2][c2])
                    if safeFactor[node2] < res {
                        deque.append(node2)
                    } else {
                        deque.prepend(node2)
                    }
                }
            }
        }

        return res
    }
}

struct Deque<T> {
    private var array: [T] = []

    var isEmpty: Bool { array.isEmpty }

    mutating func append(_ element: T) {
        array.append(element)
    }

    mutating func prepend(_ element: T) {
        array.insert(element, at: 0)
    }

    mutating func removeFirst() -> T {
        return array.removeFirst()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
