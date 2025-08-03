## 1. Brute Force

::tabs-start

```python
class Solution:
    def gridGame(self, grid: List[List[int]]) -> int:
        cols = len(grid[0])
        res = float('inf')

        top1 = 0
        for i in range(cols):
            top1 += grid[0][i]
            bottom1 = 0
            for j in range(i, cols):
                bottom1 += grid[1][j]

            top2 = robot2 = 0
            for j in range(cols):
                if j > i:
                    top2 += grid[0][j]

                bottom2 = 0
                for k in range(j, i):
                    bottom2 += grid[1][k]
                robot2 = max(robot2, top2 + bottom2)

            res = min(res, robot2)

        return res
```

```java
public class Solution {
    public long gridGame(int[][] grid) {
        int cols = grid[0].length;
        long res = Long.MAX_VALUE;

        long top1 = 0;
        for (int i = 0; i < cols; i++) {
            top1 += grid[0][i];
            long bottom1 = 0;
            for (int j = i; j < cols; j++) {
                bottom1 += grid[1][j];
            }

            long top2 = 0, robot2 = 0;
            for (int j = 0; j < cols; j++) {
                if (j > i) {
                    top2 += grid[0][j];
                }

                long bottom2 = 0;
                for (int k = j; k < i; k++) {
                    bottom2 += grid[1][k];
                }
                robot2 = Math.max(robot2, top2 + bottom2);
            }

            res = Math.min(res, robot2);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long gridGame(vector<vector<int>>& grid) {
        int cols = grid[0].size();
        long long res = LLONG_MAX;

        long long top1 = 0;
        for (int i = 0; i < cols; i++) {
            top1 += grid[0][i];
            long long bottom1 = 0;
            for (int j = i; j < cols; j++) {
                bottom1 += grid[1][j];
            }

            long long top2 = 0, robot2 = 0;
            for (int j = 0; j < cols; j++) {
                if (j > i) {
                    top2 += grid[0][j];
                }

                long long bottom2 = 0;
                for (int k = j; k < i; k++) {
                    bottom2 += grid[1][k];
                }
                robot2 = max(robot2, top2 + bottom2);
            }

            res = min(res, robot2);
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
    gridGame(grid) {
        let cols = grid[0].length;
        let res = Infinity;

        let top1 = 0;
        for (let i = 0; i < cols; i++) {
            top1 += grid[0][i];
            let bottom1 = 0;
            for (let j = i; j < cols; j++) {
                bottom1 += grid[1][j];
            }

            let top2 = 0,
                robot2 = 0;
            for (let j = 0; j < cols; j++) {
                if (j > i) {
                    top2 += grid[0][j];
                }

                let bottom2 = 0;
                for (let k = j; k < i; k++) {
                    bottom2 += grid[1][k];
                }
                robot2 = Math.max(robot2, top2 + bottom2);
            }

            res = Math.min(res, robot2);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(1)$

---

## 2. Prefix Sum

::tabs-start

```python
class Solution:
    def gridGame(self, grid: List[List[int]]) -> int:
        N = len(grid[0])
        preRow1, preRow2 = grid[0].copy(), grid[1].copy()

        for i in range(1, N):
            preRow1[i] += preRow1[i - 1]
            preRow2[i] += preRow2[i - 1]

        res = float("inf")
        for i in range(N):
            top = preRow1[-1] - preRow1[i]
            bottom = preRow2[i - 1] if i > 0 else 0
            secondRobot = max(top, bottom)
            res = min(res, secondRobot)
        return res
```

```java
class Solution {
    public long gridGame(int[][] grid) {
        int N = grid[0].length;
        long[] preRow1 = new long[N];
        long[] preRow2 = new long[N];
        for (int i = 0; i < N; i++) {
            preRow1[i] = (long)grid[0][i];
            preRow2[i] = (long)grid[1][i];
        }

        for (int i = 1; i < N; i++) {
            preRow1[i] += preRow1[i - 1];
            preRow2[i] += preRow2[i - 1];
        }

        long res = Long.MAX_VALUE;
        for (int i = 0; i < N; i++) {
            long top = preRow1[N - 1] - preRow1[i];
            long bottom = i > 0 ? preRow2[i - 1] : 0;
            long secondRobot = Math.max(top, bottom);
            res = Math.min(res, secondRobot);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long gridGame(vector<vector<int>>& grid) {
        int N = grid[0].size();
        vector<long long> preRow1, preRow2;
        for (int i = 0; i < N; i++) {
            preRow1.push_back((long)grid[0][i]);
            preRow2.push_back((long)grid[1][i]);
        }

        for (int i = 1; i < N; i++) {
            preRow1[i] += preRow1[i - 1];
            preRow2[i] += preRow2[i - 1];
        }

        long long res = LLONG_MAX;
        for (int i = 0; i < N; i++) {
            long long top = preRow1[N - 1] - preRow1[i];
            long long bottom = i > 0 ? preRow2[i - 1] : 0;
            long long secondRobot = max(top, bottom);
            res = min(res, secondRobot);
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
    gridGame(grid) {
        const N = grid[0].length;
        const preRow1 = [...grid[0]];
        const preRow2 = [...grid[1]];

        for (let i = 1; i < N; i++) {
            preRow1[i] += preRow1[i - 1];
            preRow2[i] += preRow2[i - 1];
        }

        let res = Infinity;
        for (let i = 0; i < N; i++) {
            const top = preRow1[N - 1] - preRow1[i];
            const bottom = i > 0 ? preRow2[i - 1] : 0;
            const secondRobot = Math.max(top, bottom);
            res = Math.min(res, secondRobot);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Prefix Sum (Space Optimized)

::tabs-start

```python
class Solution:
    def gridGame(self, grid: List[List[int]]) -> int:
        res = float("inf")
        topSum = sum(grid[0])
        bottomSum = 0

        for i in range(len(grid[0])):
            topSum -= grid[0][i]
            res = min(res, max(topSum, bottomSum))
            bottomSum += grid[1][i]

        return res
```

```java
public class Solution {
    public long gridGame(int[][] grid) {
        long res = Long.MAX_VALUE;
        long topSum = 0, bottomSum = 0;

        for (int i = 0; i < grid[0].length; i++) {
            topSum += grid[0][i];
        }

        for (int i = 0; i < grid[0].length; i++) {
            topSum -= grid[0][i];
            res = Math.min(res, Math.max(topSum, bottomSum));
            bottomSum += grid[1][i];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long gridGame(vector<vector<int>>& grid) {
        long long res = LLONG_MAX;
        long long topSum = accumulate(grid[0].begin(), grid[0].end(), 0LL);
        long long bottomSum = 0;

        for (int i = 0; i < grid[0].size(); i++) {
            topSum -= grid[0][i];
            res = min(res, max(topSum, bottomSum));
            bottomSum += grid[1][i];
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
    gridGame(grid) {
        let res = Infinity;
        let topSum = grid[0].reduce((a, b) => a + b, 0);
        let bottomSum = 0;

        for (let i = 0; i < grid[0].length; i++) {
            topSum -= grid[0][i];
            res = Math.min(res, Math.max(topSum, bottomSum));
            bottomSum += grid[1][i];
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
