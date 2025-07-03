## 1. Brute Force

::tabs-start

```python
class Solution:
    def largestSubmatrix(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        res = 0

        for start_row in range(ROWS):
            ones = deque(list(range(COLS)))

            for r in range(start_row, ROWS):
                if not ones:
                    break
                for _ in range(len(ones)):
                    c = ones.popleft()
                    if matrix[r][c] == 1:
                        ones.append(c)

                res = max(res, len(ones) * (r - start_row + 1))

        return res
```

```java
public class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int res = 0;

        for (int startRow = 0; startRow < ROWS; startRow++) {
            Queue<Integer> ones = new LinkedList<>();
            for (int c = 0; c < COLS; c++) {
                ones.add(c);
            }

            for (int r = startRow; r < ROWS; r++) {
                if (ones.isEmpty()) break;

                for (int i = ones.size(); i > 0; i--) {
                    int c = ones.poll();
                    if (matrix[r][c] == 1) {
                        ones.add(c);
                    }
                }

                res = Math.max(res, ones.size() * (r - startRow + 1));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        int res = 0;

        for (int startRow = 0; startRow < ROWS; startRow++) {
            queue<int> ones;
            for (int c = 0; c < COLS; c++) {
                ones.push(c);
            }

            for (int r = startRow; r < ROWS; r++) {
                if (ones.empty()) break;

                for (int i = ones.size(); i > 0; i--) {
                    int c = ones.front(); ones.pop();
                    if (matrix[r][c] == 1) {
                        ones.push(c);
                    }
                }

                res = max(res, (int)ones.size() * (r - startRow + 1));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    largestSubmatrix(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        let res = 0;

        for (let startRow = 0; startRow < ROWS; startRow++) {
            const ones = new Queue();
            for (let c = 0; c < COLS; c++) {
                ones.push(c);
            }

            for (let r = startRow; r < ROWS; r++) {
                if (ones.isEmpty()) break;

                for (let i = ones.size(); i > 0; i--) {
                    let c = ones.pop();
                    if (matrix[r][c] === 1) {
                        ones.push(c);
                    }
                }

                res = Math.max(res, ones.size() * (r - startRow + 1));
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n ^ 2)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Greedy + Sorting

::tabs-start

```python
class Solution:
    def largestSubmatrix(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        res = 0
        prev_heights = [0] * COLS

        for r in range(ROWS):
            heights = matrix[r][:]
            for c in range(COLS):
                if heights[c] > 0:
                    heights[c] += prev_heights[c]

            sorted_heights = sorted(heights, reverse=True)
            for i in range(COLS):
                res = max(res, (i + 1) * sorted_heights[i])

            prev_heights = heights

        return res
```

```java
public class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int res = 0;
        int[] prevHeights = new int[COLS];

        for (int r = 0; r < ROWS; r++) {
            int[] heights = Arrays.copyOf(matrix[r], COLS);
            int[] sortedHgts = Arrays.copyOf(matrix[r], COLS);

            for (int c = 0; c < COLS; c++) {
                if (heights[c] > 0) {
                    heights[c] += prevHeights[c];
                    sortedHgts[c] = heights[c];
                }
            }

            Arrays.sort(sortedHgts);
            for (int i = COLS - 1; i >= 0; i--) {
                res = Math.max(res, (COLS - i) * sortedHgts[i]);
            }

            prevHeights = heights;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        int res = 0;
        vector<int> prevHeights(COLS);

        for (int r = 0; r < ROWS; r++) {
            vector<int> heights = matrix[r];
            vector<int> sortedHgts = matrix[r];

            for (int c = 0; c < COLS; c++) {
                if (heights[c] > 0) {
                    heights[c] += prevHeights[c];
                    sortedHgts[c] = heights[c];
                }
            }

            sort(sortedHgts.begin(), sortedHgts.end(), greater<int>());
            for (int i = 0; i < COLS; i++) {
                res = max(res, (i + 1) * sortedHgts[i]);
            }

            prevHeights = heights;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    largestSubmatrix(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        let res = 0;
        let prevHeights = new Array(COLS).fill(0);

        for (let r = 0; r < ROWS; r++) {
            let heights = [...matrix[r]];
            let sortedHgts = [...matrix[r]];

            for (let c = 0; c < COLS; c++) {
                if (heights[c] > 0) {
                    heights[c] += prevHeights[c];
                    sortedHgts[c] = heights[c];
                }
            }

            sortedHgts.sort((a, b) => b - a);
            for (let i = 0; i < COLS; i++) {
                res = Math.max(res, (i + 1) * sortedHgts[i]);
            }

            prevHeights = heights;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n \log n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Greedy + Sorting (Overwriting the Input)

::tabs-start

```python
class Solution:
    def largestSubmatrix(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        res = 0

        for r in range(1, ROWS):
            for c in range(COLS):
                if matrix[r][c]:
                    matrix[r][c] += matrix[r - 1][c]

        for r in range(ROWS):
            matrix[r].sort(reverse=True)
            for i in range(COLS):
                res = max(res, (i + 1) * matrix[r][i])

        return res
```

```java
public class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int res = 0;

        for (int r = 1; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] > 0) {
                    matrix[r][c] += matrix[r - 1][c];
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            Arrays.sort(matrix[r]);
            for (int i = 0; i < COLS; i++) {
                res = Math.max(res, (COLS - i) * matrix[r][i]);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        int res = 0;

        for (int r = 1; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] > 0) {
                    matrix[r][c] += matrix[r - 1][c];
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            sort(matrix[r].begin(), matrix[r].end(), greater<int>());
            for (int i = 0; i < COLS; i++) {
                res = max(res, (i + 1) * matrix[r][i]);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    largestSubmatrix(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        let res = 0;

        for (let r = 1; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (matrix[r][c] > 0) {
                    matrix[r][c] += matrix[r - 1][c];
                }
            }
        }

        for (let r = 0; r < ROWS; r++) {
            matrix[r].sort((a, b) => b - a);
            for (let i = 0; i < COLS; i++) {
                res = Math.max(res, (i + 1) * matrix[r][i]);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algoirhtm.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 4. Greedy

::tabs-start

```python
class Solution:
    def largestSubmatrix(self, matrix: List[List[int]]) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        res = 0
        prevHeights = []

        for r in range(ROWS):
            heights = []
            for c in prevHeights:
                if matrix[r][c]:
                    matrix[r][c] += matrix[r - 1][c]
                    heights.append(c)

            for c in range(COLS):
                if matrix[r][c] == 1:
                    heights.append(c)

            for i, c in enumerate(heights):
                res = max(res, (i + 1) * matrix[r][c])

            prevHeights = heights

        return res
```

```java
public class Solution {
    public int largestSubmatrix(int[][] matrix) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int res = 0;
        List<Integer> prevHeights = new ArrayList<>();

        for (int r = 0; r < ROWS; r++) {
            List<Integer> heights = new ArrayList<>();

            for (int c : prevHeights) {
                if (matrix[r][c] == 1) {
                    matrix[r][c] += matrix[r - 1][c];
                    heights.add(c);
                }
            }

            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 1) {
                    heights.add(c);
                }
            }

            for (int i = 0; i < heights.size(); i++) {
                res = Math.max(res, (i + 1) * matrix[r][heights.get(i)]);
            }

            prevHeights = heights;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int largestSubmatrix(vector<vector<int>>& matrix) {
        int ROWS = matrix.size(), COLS = matrix[0].size(), res = 0;
        vector<int> prevHeights;

        for (int r = 0; r < ROWS; r++) {
            vector<int> heights;

            for (int c : prevHeights) {
                if (matrix[r][c] == 1) {
                    matrix[r][c] += matrix[r - 1][c];
                    heights.push_back(c);
                }
            }

            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 1) {
                    heights.push_back(c);
                }
            }

            for (int i = 0; i < heights.size(); i++) {
                res = max(res, (i + 1) * matrix[r][heights[i]]);
            }

            prevHeights = heights;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number}
     */
    largestSubmatrix(matrix) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        let res = 0,
            prevHeights = [];

        for (let r = 0; r < ROWS; r++) {
            let heights = [];

            for (let c of prevHeights) {
                if (matrix[r][c] === 1) {
                    matrix[r][c] += matrix[r - 1][c];
                    heights.push(c);
                }
            }

            for (let c = 0; c < COLS; c++) {
                if (matrix[r][c] === 1) {
                    heights.push(c);
                }
            }

            for (let i = 0; i < heights.length; i++) {
                res = Math.max(res, (i + 1) * matrix[r][heights[i]]);
            }

            prevHeights = heights;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.
