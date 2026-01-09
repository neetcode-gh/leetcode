## 1. BFS (Breadth-First Search)

### Intuition

Finding the minimum moves for a knight is a classic shortest path problem on an unweighted graph. Each cell is a node, and knight moves define the edges. BFS naturally finds the shortest path because it explores all positions at distance k before any position at distance k+1.

Starting from the origin (0, 0), we expand outward level by level. The first time we reach the target coordinates, we've found the minimum number of moves.

### Algorithm

1. Define the eight possible knight move offsets.
2. Initialize a queue with the starting position (0, 0) and a visited set.
3. Process the queue level by level, tracking the current step count.
4. For each position, check if it matches the target; if so, return the step count.
5. Otherwise, add all unvisited positions reachable by one knight move to the queue.
6. Mark each new position as visited to avoid revisiting.

::tabs-start

```python
class Solution:
    def minKnightMoves(self, x: int, y: int) -> int:
        # the offsets in the eight directions
        offsets = [(1, 2), (2, 1), (2, -1), (1, -2),
                   (-1, -2), (-2, -1), (-2, 1), (-1, 2)]

        def bfs(x, y):
            visited = set()
            queue = deque([(0, 0)])
            steps = 0

            while queue:
                curr_level_cnt = len(queue)
                # iterate through the current level
                for i in range(curr_level_cnt):
                    curr_x, curr_y = queue.popleft()
                    if (curr_x, curr_y) == (x, y):
                        return steps

                    for offset_x, offset_y in offsets:
                        next_x, next_y = curr_x + offset_x, curr_y + offset_y
                        if (next_x, next_y) not in visited:
                            visited.add((next_x, next_y))
                            queue.append((next_x, next_y))

                # move on to the next level
                steps += 1

        return bfs(x, y)
```

```java
class Solution {
    public int minKnightMoves(int x, int y) {
        // the offsets in the eight directions
        int[][] offsets = {{1, 2}, {2, 1}, {2, -1}, {1, -2},
                {-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}};

        // - Rather than using the inefficient HashSet, we use the bitmap
        //     otherwise we would run out of time for the test cases.
        // - We create a bitmap that is sufficient to cover all the possible
        //     inputs, according to the description of the problem.
        boolean[][] visited = new boolean[607][607];

        Deque<int[]> queue = new LinkedList<>();
        queue.addLast(new int[]{0, 0});
        int steps = 0;

        while (queue.size() > 0) {
            int currLevelSize = queue.size();
            // iterate through the current level
            for (int i = 0; i < currLevelSize; i++) {
                int[] curr = queue.removeFirst();
                if (curr[0] == x && curr[1] == y) {
                    return steps;
                }

                for (int[] offset : offsets) {
                    int[] next = new int[]{curr[0] + offset[0], curr[1] + offset[1]};
                    // align the coordinate to the bitmap
                    if (!visited[next[0] + 302][next[1] + 302]) {
                        visited[next[0] + 302][next[1] + 302] = true;
                        queue.addLast(next);
                    }
                }
            }
            steps++;
        }
        // move on to the next level
        return steps;
    }
}
```

```csharp
public class Solution {
    public int MinKnightMoves(int x, int y) {
        // the offsets in the eight directions
        int[][] offsets = new int[][] {
            new int[]{1, 2}, new int[]{2, 1}, new int[]{2, -1}, new int[]{1, -2},
            new int[]{-1, -2}, new int[]{-2, -1}, new int[]{-2, 1}, new int[]{-1, 2}
        };

        bool[,] visited = new bool[607, 607];
        Queue<int[]> queue = new Queue<int[]>();
        queue.Enqueue(new int[]{0, 0});
        int steps = 0;

        while (queue.Count > 0) {
            int currLevelSize = queue.Count;
            for (int i = 0; i < currLevelSize; i++) {
                int[] curr = queue.Dequeue();
                if (curr[0] == x && curr[1] == y) {
                    return steps;
                }

                foreach (int[] offset in offsets) {
                    int[] next = new int[]{curr[0] + offset[0], curr[1] + offset[1]};
                    if (!visited[next[0] + 302, next[1] + 302]) {
                        visited[next[0] + 302, next[1] + 302] = true;
                        queue.Enqueue(next);
                    }
                }
            }
            steps++;
        }
        return steps;
    }
}
```

```go
func minKnightMoves(x int, y int) int {
    // the offsets in the eight directions
    offsets := [][]int{{1, 2}, {2, 1}, {2, -1}, {1, -2},
                       {-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}}

    visited := make([][]bool, 607)
    for i := range visited {
        visited[i] = make([]bool, 607)
    }

    queue := [][]int{{0, 0}}
    steps := 0

    for len(queue) > 0 {
        currLevelSize := len(queue)
        for i := 0; i < currLevelSize; i++ {
            curr := queue[0]
            queue = queue[1:]
            if curr[0] == x && curr[1] == y {
                return steps
            }

            for _, offset := range offsets {
                next := []int{curr[0] + offset[0], curr[1] + offset[1]}
                if !visited[next[0]+302][next[1]+302] {
                    visited[next[0]+302][next[1]+302] = true
                    queue = append(queue, next)
                }
            }
        }
        steps++
    }
    return steps
}
```

```kotlin
class Solution {
    fun minKnightMoves(x: Int, y: Int): Int {
        // the offsets in the eight directions
        val offsets = arrayOf(
            intArrayOf(1, 2), intArrayOf(2, 1), intArrayOf(2, -1), intArrayOf(1, -2),
            intArrayOf(-1, -2), intArrayOf(-2, -1), intArrayOf(-2, 1), intArrayOf(-1, 2)
        )

        val visited = Array(607) { BooleanArray(607) }
        val queue = ArrayDeque<IntArray>()
        queue.addLast(intArrayOf(0, 0))
        var steps = 0

        while (queue.isNotEmpty()) {
            val currLevelSize = queue.size
            repeat(currLevelSize) {
                val curr = queue.removeFirst()
                if (curr[0] == x && curr[1] == y) {
                    return steps
                }

                for (offset in offsets) {
                    val next = intArrayOf(curr[0] + offset[0], curr[1] + offset[1])
                    if (!visited[next[0] + 302][next[1] + 302]) {
                        visited[next[0] + 302][next[1] + 302] = true
                        queue.addLast(next)
                    }
                }
            }
            steps++
        }
        return steps
    }
}
```

```swift
class Solution {
    func minKnightMoves(_ x: Int, _ y: Int) -> Int {
        // the offsets in the eight directions
        let offsets = [(1, 2), (2, 1), (2, -1), (1, -2),
                       (-1, -2), (-2, -1), (-2, 1), (-1, 2)]

        var visited = Array(repeating: Array(repeating: false, count: 607), count: 607)
        var queue = [(0, 0)]
        var steps = 0

        while !queue.isEmpty {
            let currLevelSize = queue.count
            for _ in 0..<currLevelSize {
                let curr = queue.removeFirst()
                if curr.0 == x && curr.1 == y {
                    return steps
                }

                for offset in offsets {
                    let next = (curr.0 + offset.0, curr.1 + offset.1)
                    if !visited[next.0 + 302][next.1 + 302] {
                        visited[next.0 + 302][next.1 + 302] = true
                        queue.append(next)
                    }
                }
            }
            steps += 1
        }
        return steps
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O\left(\left(\max(|x|, |y|)\right)^2\right)$
- Space complexity: $O\left(\left(\max(|x|, |y|)\right)^2\right)$

>  Where $(x,y)$ is the coordinate of the target.

---

## 2. Bidirectional BFS

### Intuition

Standard BFS explores an ever-growing circle from the origin. Bidirectional BFS reduces the search space by expanding from both the origin and the target simultaneously. When the two search frontiers meet, we've found the shortest path.

This optimization works well because the area explored grows quadratically with distance. By meeting in the middle, each search only needs to cover roughly half the distance, significantly reducing the total positions explored.

### Algorithm

1. Initialize two queues and two distance maps: one starting from (0, 0), one from (x, y).
2. Alternate expanding from both ends, one position at a time.
3. After processing a position from one side, check if it exists in the other side's distance map.
4. If found, the answer is the sum of distances from both directions.
5. For each position, add all unvisited knight moves to the respective queue and distance map.

::tabs-start

```python
class Solution:
    def minKnightMoves(self, x: int, y: int) -> int:
        # the offsets in the eight directions
        offsets = [(1, 2), (2, 1), (2, -1), (1, -2),
                   (-1, -2), (-2, -1), (-2, 1), (-1, 2)]

        # data structures needed to move from the origin point
        origin_queue = deque([(0, 0, 0)])
        origin_distance = {(0, 0): 0}

        # data structures needed to move from the target point
        target_queue = deque([(x, y, 0)])
        target_distance = {(x, y): 0}

        while True:
            # check if we reach the circle of target
            origin_x, origin_y, origin_steps = origin_queue.popleft()
            if (origin_x, origin_y) in target_distance:
                return origin_steps + target_distance[(origin_x, origin_y)]

            # check if we reach the circle of origin
            target_x, target_y, target_steps = target_queue.popleft()
            if (target_x, target_y) in origin_distance:
                return target_steps + origin_distance[(target_x, target_y)]

            for offset_x, offset_y in offsets:
                # expand the circle of origin
                next_origin_x, next_origin_y = origin_x + offset_x, origin_y + offset_y
                if (next_origin_x, next_origin_y) not in origin_distance:
                    origin_queue.append((next_origin_x, next_origin_y, origin_steps + 1))
                    origin_distance[(next_origin_x, next_origin_y)] = origin_steps + 1

                # expand the circle of target
                next_target_x, next_target_y = target_x + offset_x, target_y + offset_y
                if (next_target_x, next_target_y) not in target_distance:
                    target_queue.append((next_target_x, next_target_y, target_steps + 1))
                    target_distance[(next_target_x, next_target_y)] = target_steps + 1
```

```java
class Solution {
    public int minKnightMoves(int x, int y) {
        // the offsets in the eight directions
        int[][] offsets = {{1, 2}, {2, 1}, {2, -1}, {1, -2},
                {-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}};

        // data structures needed to move from the origin point
        Deque<int[]> originQueue = new LinkedList<>();
        originQueue.addLast(new int[]{0, 0, 0});
        Map<String, Integer> originDistance = new HashMap<>();
        originDistance.put("0,0", 0);

        // data structures needed to move from the target point
        Deque<int[]> targetQueue = new LinkedList<>();
        targetQueue.addLast(new int[]{x, y, 0});
        Map<String, Integer> targetDistance = new HashMap<>();
        targetDistance.put(x + "," + y, 0);

        while (true) {
            // check if we reach the circle of target
            int[] origin = originQueue.removeFirst();
            String originXY = origin[0] + "," + origin[1];
            if (targetDistance.containsKey(originXY)) {
                return origin[2] + targetDistance.get(originXY);
            }

            // check if we reach the circle of origin
            int[] target = targetQueue.removeFirst();
            String targetXY = target[0] + "," + target[1];
            if (originDistance.containsKey(targetXY)) {
                return target[2] + originDistance.get(targetXY);
            }

            for (int[] offset : offsets) {
                // expand the circle of origin
                int[] nextOrigin = new int[]{origin[0] + offset[0], origin[1] + offset[1]};
                String nextOriginXY = nextOrigin[0] + "," + nextOrigin[1];
                if (!originDistance.containsKey(nextOriginXY)) {
                    originQueue.addLast(new int[]{nextOrigin[0], nextOrigin[1], origin[2] + 1});
                    originDistance.put(nextOriginXY, origin[2] + 1);
                }

                // expand the circle of target
                int[] nextTarget = new int[]{target[0] + offset[0], target[1] + offset[1]};
                String nextTargetXY = nextTarget[0] + "," + nextTarget[1];
                if (!targetDistance.containsKey(nextTargetXY)) {
                    targetQueue.addLast(new int[]{nextTarget[0], nextTarget[1], target[2] + 1});
                    targetDistance.put(nextTargetXY, target[2] + 1);
                }
            }
        }
    }
}
```

```csharp
public class Solution {
    public int MinKnightMoves(int x, int y) {
        // the offsets in the eight directions
        int[][] offsets = new int[][] {
            new int[]{1, 2}, new int[]{2, 1}, new int[]{2, -1}, new int[]{1, -2},
            new int[]{-1, -2}, new int[]{-2, -1}, new int[]{-2, 1}, new int[]{-1, 2}
        };

        // data structures needed to move from the origin point
        Queue<int[]> originQueue = new Queue<int[]>();
        originQueue.Enqueue(new int[]{0, 0, 0});
        Dictionary<string, int> originDistance = new Dictionary<string, int>();
        originDistance["0,0"] = 0;

        // data structures needed to move from the target point
        Queue<int[]> targetQueue = new Queue<int[]>();
        targetQueue.Enqueue(new int[]{x, y, 0});
        Dictionary<string, int> targetDistance = new Dictionary<string, int>();
        targetDistance[$"{x},{y}"] = 0;

        while (true) {
            // check if we reach the circle of target
            int[] origin = originQueue.Dequeue();
            string originXY = $"{origin[0]},{origin[1]}";
            if (targetDistance.ContainsKey(originXY)) {
                return origin[2] + targetDistance[originXY];
            }

            // check if we reach the circle of origin
            int[] target = targetQueue.Dequeue();
            string targetXY = $"{target[0]},{target[1]}";
            if (originDistance.ContainsKey(targetXY)) {
                return target[2] + originDistance[targetXY];
            }

            foreach (int[] offset in offsets) {
                // expand the circle of origin
                int[] nextOrigin = new int[]{origin[0] + offset[0], origin[1] + offset[1]};
                string nextOriginXY = $"{nextOrigin[0]},{nextOrigin[1]}";
                if (!originDistance.ContainsKey(nextOriginXY)) {
                    originQueue.Enqueue(new int[]{nextOrigin[0], nextOrigin[1], origin[2] + 1});
                    originDistance[nextOriginXY] = origin[2] + 1;
                }

                // expand the circle of target
                int[] nextTarget = new int[]{target[0] + offset[0], target[1] + offset[1]};
                string nextTargetXY = $"{nextTarget[0]},{nextTarget[1]}";
                if (!targetDistance.ContainsKey(nextTargetXY)) {
                    targetQueue.Enqueue(new int[]{nextTarget[0], nextTarget[1], target[2] + 1});
                    targetDistance[nextTargetXY] = target[2] + 1;
                }
            }
        }
    }
}
```

```go
func minKnightMoves(x int, y int) int {
    // the offsets in the eight directions
    offsets := [][]int{{1, 2}, {2, 1}, {2, -1}, {1, -2},
                       {-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}}

    // data structures needed to move from the origin point
    originQueue := [][]int{{0, 0, 0}}
    originDistance := make(map[string]int)
    originDistance["0,0"] = 0

    // data structures needed to move from the target point
    targetQueue := [][]int{{x, y, 0}}
    targetDistance := make(map[string]int)
    targetDistance[fmt.Sprintf("%d,%d", x, y)] = 0

    for {
        // check if we reach the circle of target
        origin := originQueue[0]
        originQueue = originQueue[1:]
        originXY := fmt.Sprintf("%d,%d", origin[0], origin[1])
        if dist, ok := targetDistance[originXY]; ok {
            return origin[2] + dist
        }

        // check if we reach the circle of origin
        target := targetQueue[0]
        targetQueue = targetQueue[1:]
        targetXY := fmt.Sprintf("%d,%d", target[0], target[1])
        if dist, ok := originDistance[targetXY]; ok {
            return target[2] + dist
        }

        for _, offset := range offsets {
            // expand the circle of origin
            nextOrigin := []int{origin[0] + offset[0], origin[1] + offset[1]}
            nextOriginXY := fmt.Sprintf("%d,%d", nextOrigin[0], nextOrigin[1])
            if _, ok := originDistance[nextOriginXY]; !ok {
                originQueue = append(originQueue, []int{nextOrigin[0], nextOrigin[1], origin[2] + 1})
                originDistance[nextOriginXY] = origin[2] + 1
            }

            // expand the circle of target
            nextTarget := []int{target[0] + offset[0], target[1] + offset[1]}
            nextTargetXY := fmt.Sprintf("%d,%d", nextTarget[0], nextTarget[1])
            if _, ok := targetDistance[nextTargetXY]; !ok {
                targetQueue = append(targetQueue, []int{nextTarget[0], nextTarget[1], target[2] + 1})
                targetDistance[nextTargetXY] = target[2] + 1
            }
        }
    }
}
```

```kotlin
class Solution {
    fun minKnightMoves(x: Int, y: Int): Int {
        // the offsets in the eight directions
        val offsets = arrayOf(
            intArrayOf(1, 2), intArrayOf(2, 1), intArrayOf(2, -1), intArrayOf(1, -2),
            intArrayOf(-1, -2), intArrayOf(-2, -1), intArrayOf(-2, 1), intArrayOf(-1, 2)
        )

        // data structures needed to move from the origin point
        val originQueue = ArrayDeque<IntArray>()
        originQueue.addLast(intArrayOf(0, 0, 0))
        val originDistance = hashMapOf("0,0" to 0)

        // data structures needed to move from the target point
        val targetQueue = ArrayDeque<IntArray>()
        targetQueue.addLast(intArrayOf(x, y, 0))
        val targetDistance = hashMapOf("$x,$y" to 0)

        while (true) {
            // check if we reach the circle of target
            val origin = originQueue.removeFirst()
            val originXY = "${origin[0]},${origin[1]}"
            if (originXY in targetDistance) {
                return origin[2] + targetDistance[originXY]!!
            }

            // check if we reach the circle of origin
            val target = targetQueue.removeFirst()
            val targetXY = "${target[0]},${target[1]}"
            if (targetXY in originDistance) {
                return target[2] + originDistance[targetXY]!!
            }

            for (offset in offsets) {
                // expand the circle of origin
                val nextOrigin = intArrayOf(origin[0] + offset[0], origin[1] + offset[1])
                val nextOriginXY = "${nextOrigin[0]},${nextOrigin[1]}"
                if (nextOriginXY !in originDistance) {
                    originQueue.addLast(intArrayOf(nextOrigin[0], nextOrigin[1], origin[2] + 1))
                    originDistance[nextOriginXY] = origin[2] + 1
                }

                // expand the circle of target
                val nextTarget = intArrayOf(target[0] + offset[0], target[1] + offset[1])
                val nextTargetXY = "${nextTarget[0]},${nextTarget[1]}"
                if (nextTargetXY !in targetDistance) {
                    targetQueue.addLast(intArrayOf(nextTarget[0], nextTarget[1], target[2] + 1))
                    targetDistance[nextTargetXY] = target[2] + 1
                }
            }
        }
    }
}
```

```swift
class Solution {
    func minKnightMoves(_ x: Int, _ y: Int) -> Int {
        // the offsets in the eight directions
        let offsets = [(1, 2), (2, 1), (2, -1), (1, -2),
                       (-1, -2), (-2, -1), (-2, 1), (-1, 2)]

        // data structures needed to move from the origin point
        var originQueue = [(0, 0, 0)]
        var originDistance = ["0,0": 0]

        // data structures needed to move from the target point
        var targetQueue = [(x, y, 0)]
        var targetDistance = ["\(x),\(y)": 0]

        while true {
            // check if we reach the circle of target
            let origin = originQueue.removeFirst()
            let originXY = "\(origin.0),\(origin.1)"
            if let dist = targetDistance[originXY] {
                return origin.2 + dist
            }

            // check if we reach the circle of origin
            let target = targetQueue.removeFirst()
            let targetXY = "\(target.0),\(target.1)"
            if let dist = originDistance[targetXY] {
                return target.2 + dist
            }

            for offset in offsets {
                // expand the circle of origin
                let nextOrigin = (origin.0 + offset.0, origin.1 + offset.1)
                let nextOriginXY = "\(nextOrigin.0),\(nextOrigin.1)"
                if originDistance[nextOriginXY] == nil {
                    originQueue.append((nextOrigin.0, nextOrigin.1, origin.2 + 1))
                    originDistance[nextOriginXY] = origin.2 + 1
                }

                // expand the circle of target
                let nextTarget = (target.0 + offset.0, target.1 + offset.1)
                let nextTargetXY = "\(nextTarget.0),\(nextTarget.1)"
                if targetDistance[nextTargetXY] == nil {
                    targetQueue.append((nextTarget.0, nextTarget.1, target.2 + 1))
                    targetDistance[nextTargetXY] = target.2 + 1
                }
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O\left(\left(\max(|x|, |y|)\right)^2\right)$
- Space complexity: $O\left(\left(\max(|x|, |y|)\right)^2\right)$

>  Where $(x,y)$ is the coordinate of the target.

---

## 3. DFS (Depth-First Search) with Memoization

### Intuition

Due to the knight's movement symmetry, we only need to consider the first quadrant (positive x and y). The minimum moves to reach (-x, y), (x, -y), or (-x, -y) are the same as reaching (x, y).

We can define a recursive relation: the minimum moves to reach (x, y) equals 1 plus the minimum of reaching (|x-1|, |y-2|) or (|x-2|, |y-1|). The absolute values keep us in the first quadrant, and memoization prevents redundant calculations.

### Algorithm

1. Take absolute values of x and y to work in the first quadrant.
2. Define base cases: (0, 0) requires 0 moves; positions where x+y = 2 require 2 moves.
3. For other positions, recursively compute: `min(dfs(|x-1|, |y-2|), dfs(|x-2|, |y-1|)) + 1`.
4. Use memoization to cache results for each (x, y) pair.
5. Return the computed minimum moves.

::tabs-start

```python
class Solution:
    def minKnightMoves(self, x: int, y: int) -> int:

        @lru_cache(maxsize=None)
        def dfs(x, y):
            if x + y == 0:
                # base case: (0, 0)
                return 0
            elif x + y == 2:
                # base case: (1, 1), (0, 2), (2, 0)
                return 2
            else:
                return min(dfs(abs(x - 1), abs(y - 2)), dfs(abs(x - 2), abs(y - 1))) + 1

        return dfs(abs(x), abs(y))
```

```java
class Solution {
    
    private Map<String, Integer> memo = new HashMap<>();

    private int dfs(int x, int y) {
        String key = x + "," + y;
        if (memo.containsKey(key)) {
            return memo.get(key);
        }

        if (x + y == 0) {
            return 0;
        } else if (x + y == 2) {
            return 2;
        } else {
            Integer ret = Math.min(dfs(Math.abs(x - 1), Math.abs(y - 2)),
                    dfs(Math.abs(x - 2), Math.abs(y - 1))) + 1;
            memo.put(key, ret);
            return ret;
        }
    }

    public int minKnightMoves(int x, int y) {
        return dfs(Math.abs(x), Math.abs(y));
    }
}
```

```cpp
class Solution {
private:
    unordered_map<string, int> memo;
    
    int dfs(int x, int y) {
        string key = to_string(x) + "," + to_string(y);
        if (memo.find(key) != memo.end()) {
            return memo[key];
        }
        
        if (x + y == 0) {
            return 0;
        } else if (x + y == 2) {
            return 2;
        } else {
            int ret = min(dfs(abs(x - 1), abs(y - 2)),
                         dfs(abs(x - 2), abs(y - 1))) + 1;
            memo[key] = ret;
            return ret;
        }
    }
    
public:
    int minKnightMoves(int x, int y) {
        return dfs(abs(x), abs(y));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @param {number} y
     * @return {number}
     */
    minKnightMoves(x, y) {
        const memo = new Map();

        const dfs = (x, y) => {
            const key = `${x},${y}`;
            if (memo.has(key)) {
                return memo.get(key);
            }

            if (x + y === 0) {
                return 0;
            } else if (x + y === 2) {
                return 2;
            } else {
                const ret = Math.min(dfs(Math.abs(x - 1), Math.abs(y - 2)),
                                    dfs(Math.abs(x - 2), Math.abs(y - 1))) + 1;
                memo.set(key, ret);
                return ret;
            }
        };

        return dfs(Math.abs(x), Math.abs(y));
    }
}
```

```csharp
public class Solution {
    private Dictionary<string, int> memo = new Dictionary<string, int>();

    public int MinKnightMoves(int x, int y) {
        return Dfs(Math.Abs(x), Math.Abs(y));
    }

    private int Dfs(int x, int y) {
        string key = $"{x},{y}";
        if (memo.ContainsKey(key)) {
            return memo[key];
        }

        if (x + y == 0) {
            return 0;
        } else if (x + y == 2) {
            return 2;
        } else {
            int ret = Math.Min(Dfs(Math.Abs(x - 1), Math.Abs(y - 2)),
                              Dfs(Math.Abs(x - 2), Math.Abs(y - 1))) + 1;
            memo[key] = ret;
            return ret;
        }
    }
}
```

```go
func minKnightMoves(x int, y int) int {
    memo := make(map[string]int)

    var dfs func(x, y int) int
    dfs = func(x, y int) int {
        key := fmt.Sprintf("%d,%d", x, y)
        if val, ok := memo[key]; ok {
            return val
        }

        if x+y == 0 {
            return 0
        } else if x+y == 2 {
            return 2
        } else {
            ret := min(dfs(abs(x-1), abs(y-2)), dfs(abs(x-2), abs(y-1))) + 1
            memo[key] = ret
            return ret
        }
    }

    return dfs(abs(x), abs(y))
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
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
    private val memo = hashMapOf<String, Int>()

    fun minKnightMoves(x: Int, y: Int): Int {
        return dfs(kotlin.math.abs(x), kotlin.math.abs(y))
    }

    private fun dfs(x: Int, y: Int): Int {
        val key = "$x,$y"
        if (key in memo) {
            return memo[key]!!
        }

        if (x + y == 0) {
            return 0
        } else if (x + y == 2) {
            return 2
        } else {
            val ret = minOf(
                dfs(kotlin.math.abs(x - 1), kotlin.math.abs(y - 2)),
                dfs(kotlin.math.abs(x - 2), kotlin.math.abs(y - 1))
            ) + 1
            memo[key] = ret
            return ret
        }
    }
}
```

```swift
class Solution {
    private var memo = [String: Int]()

    func minKnightMoves(_ x: Int, _ y: Int) -> Int {
        return dfs(abs(x), abs(y))
    }

    private func dfs(_ x: Int, _ y: Int) -> Int {
        let key = "\(x),\(y)"
        if let val = memo[key] {
            return val
        }

        if x + y == 0 {
            return 0
        } else if x + y == 2 {
            return 2
        } else {
            let ret = min(dfs(abs(x - 1), abs(y - 2)),
                         dfs(abs(x - 2), abs(y - 1))) + 1
            memo[key] = ret
            return ret
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(|x \cdot y|)$
- Space complexity: $O(|x \cdot y|)$

>  Where $(x,y)$ is the coordinate of the target.
