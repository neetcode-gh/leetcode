## 1. Brute Force

::tabs-start

```python
class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        res = 0

        for r1 in range(ROWS):
            for r2 in range(r1, ROWS):
                for c1 in range(COLS):
                    for c2 in range(c1, COLS):
                        subSum = 0
                        for r in range(r1, r2 + 1):
                            for c in range(c1, c2 + 1):
                                subSum += matrix[r][c]

                        if subSum == target:
                            res += 1

        return res
```

```java
public class Solution {
    public int numSubmatrixSumTarget(int[][] matrix, int target) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int res = 0;

        for (int r1 = 0; r1 < ROWS; r1++) {
            for (int r2 = r1; r2 < ROWS; r2++) {
                for (int c1 = 0; c1 < COLS; c1++) {
                    for (int c2 = c1; c2 < COLS; c2++) {
                        int subSum = 0;
                        for (int r = r1; r <= r2; r++) {
                            for (int c = c1; c <= c2; c++) {
                                subSum += matrix[r][c];
                            }
                        }
                        if (subSum == target) {
                            res++;
                        }
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
    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        int res = 0;

        for (int r1 = 0; r1 < ROWS; r1++) {
            for (int r2 = r1; r2 < ROWS; r2++) {
                for (int c1 = 0; c1 < COLS; c1++) {
                    for (int c2 = c1; c2 < COLS; c2++) {
                        int subSum = 0;
                        for (int r = r1; r <= r2; r++) {
                            for (int c = c1; c <= c2; c++) {
                                subSum += matrix[r][c];
                            }
                        }
                        if (subSum == target) {
                            res++;
                        }
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
     * @param {number[][]} matrix
     * @param {number} target
     * @return {number}
     */
    numSubmatrixSumTarget(matrix, target) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        let res = 0;

        for (let r1 = 0; r1 < ROWS; r1++) {
            for (let r2 = r1; r2 < ROWS; r2++) {
                for (let c1 = 0; c1 < COLS; c1++) {
                    for (let c2 = c1; c2 < COLS; c2++) {
                        let subSum = 0;
                        for (let r = r1; r <= r2; r++) {
                            for (let c = c1; c <= c2; c++) {
                                subSum += matrix[r][c];
                            }
                        }
                        if (subSum === target) {
                            res++;
                        }
                    }
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ 3 * n ^ 3)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix.

---

## 2. Two Dimensional Prefix Sum

::tabs-start

```python
class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        sub_sum = [[0] * COLS for _ in range(ROWS)]

        for r in range(ROWS):
            for c in range(COLS):
                top = sub_sum[r - 1][c] if r > 0 else 0
                left = sub_sum[r][c - 1] if c > 0 else 0
                top_left = sub_sum[r - 1][c - 1] if min(r, c) > 0 else 0
                sub_sum[r][c] = matrix[r][c] + top + left - top_left

        res = 0
        for r1 in range(ROWS):
            for r2 in range(r1, ROWS):
                for c1 in range(COLS):
                    for c2 in range(c1, COLS):
                        top = sub_sum[r1 - 1][c2] if r1 > 0 else 0
                        left = sub_sum[r2][c1 - 1] if c1 > 0 else 0
                        top_left = sub_sum[r1 - 1][c1 - 1] if min(r1, c1) > 0 else 0
                        cur_sum = sub_sum[r2][c2] - top - left + top_left
                        if cur_sum == target:
                            res += 1
        return res
```

```java
public class Solution {
    public int numSubmatrixSumTarget(int[][] matrix, int target) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int[][] subSum = new int[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int top = (r > 0) ? subSum[r - 1][c] : 0;
                int left = (c > 0) ? subSum[r][c - 1] : 0;
                int topLeft = (Math.min(r, c) > 0) ? subSum[r - 1][c - 1] : 0;
                subSum[r][c] = matrix[r][c] + top + left - topLeft;
            }
        }

        int res = 0;
        for (int r1 = 0; r1 < ROWS; r1++) {
            for (int r2 = r1; r2 < ROWS; r2++) {
                for (int c1 = 0; c1 < COLS; c1++) {
                    for (int c2 = c1; c2 < COLS; c2++) {
                        int top = (r1 > 0) ? subSum[r1 - 1][c2] : 0;
                        int left = (c1 > 0) ? subSum[r2][c1 - 1] : 0;
                        int topLeft = (Math.min(r1, c1) > 0) ? subSum[r1 - 1][c1 - 1] : 0;
                        int curSum = subSum[r2][c2] - top - left + topLeft;
                        if (curSum == target) {
                            res++;
                        }
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
    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        vector<vector<int>> subSum(ROWS, vector<int>(COLS, 0));

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int top = (r > 0) ? subSum[r - 1][c] : 0;
                int left = (c > 0) ? subSum[r][c - 1] : 0;
                int topLeft = (min(r, c) > 0) ? subSum[r - 1][c - 1] : 0;
                subSum[r][c] = matrix[r][c] + top + left - topLeft;
            }
        }

        int res = 0;
        for (int r1 = 0; r1 < ROWS; r1++) {
            for (int r2 = r1; r2 < ROWS; r2++) {
                for (int c1 = 0; c1 < COLS; c1++) {
                    for (int c2 = c1; c2 < COLS; c2++) {
                        int top = (r1 > 0) ? subSum[r1 - 1][c2] : 0;
                        int left = (c1 > 0) ? subSum[r2][c1 - 1] : 0;
                        int topLeft = (min(r1, c1) > 0) ? subSum[r1 - 1][c1 - 1] : 0;
                        int curSum = subSum[r2][c2] - top - left + topLeft;
                        if (curSum == target) {
                            res++;
                        }
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
     * @param {number[][]} matrix
     * @param {number} target
     * @return {number}
     */
    numSubmatrixSumTarget(matrix, target) {
        const ROWS = matrix.length,
            COLS = matrix[0].length;
        const subSum = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let top = r > 0 ? subSum[r - 1][c] : 0;
                let left = c > 0 ? subSum[r][c - 1] : 0;
                let topLeft = Math.min(r, c) > 0 ? subSum[r - 1][c - 1] : 0;
                subSum[r][c] = matrix[r][c] + top + left - topLeft;
            }
        }

        let res = 0;
        for (let r1 = 0; r1 < ROWS; r1++) {
            for (let r2 = r1; r2 < ROWS; r2++) {
                for (let c1 = 0; c1 < COLS; c1++) {
                    for (let c2 = c1; c2 < COLS; c2++) {
                        let top = r1 > 0 ? subSum[r1 - 1][c2] : 0;
                        let left = c1 > 0 ? subSum[r2][c1 - 1] : 0;
                        let topLeft =
                            Math.min(r1, c1) > 0 ? subSum[r1 - 1][c1 - 1] : 0;
                        let curSum = subSum[r2][c2] - top - left + topLeft;
                        if (curSum === target) {
                            res++;
                        }
                    }
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ 2 * n ^ 2)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix.

---

## 3. Horizontal 1D Prefix Sum

::tabs-start

```python
class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        sub_sum = [[0] * COLS for _ in range(ROWS)]

        for r in range(ROWS):
            for c in range(COLS):
                top = sub_sum[r - 1][c] if r > 0 else 0
                left = sub_sum[r][c - 1] if c > 0 else 0
                top_left = sub_sum[r - 1][c - 1] if min(r, c) > 0 else 0
                sub_sum[r][c] = matrix[r][c] + top + left - top_left

        res = 0
        for r1 in range(ROWS):
            for r2 in range(r1, ROWS):
                count = defaultdict(int)
                count[0] = 1
                for c in range(COLS):
                    cur_sum = sub_sum[r2][c] - (sub_sum[r1 - 1][c] if r1 > 0 else 0)
                    res += count[cur_sum - target]
                    count[cur_sum] += 1

        return res
```

```java
public class Solution {
    public int numSubmatrixSumTarget(int[][] matrix, int target) {
        int ROWS = matrix.length, COLS = matrix[0].length;
        int[][] subSum = new int[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int top = (r > 0) ? subSum[r - 1][c] : 0;
                int left = (c > 0) ? subSum[r][c - 1] : 0;
                int topLeft = (Math.min(r, c) > 0) ? subSum[r - 1][c - 1] : 0;
                subSum[r][c] = matrix[r][c] + top + left - topLeft;
            }
        }

        int res = 0;
        for (int r1 = 0; r1 < ROWS; r1++) {
            for (int r2 = r1; r2 < ROWS; r2++) {
                Map<Integer, Integer> count = new HashMap<>();
                count.put(0, 1);
                for (int c = 0; c < COLS; c++) {
                    int curSum = subSum[r2][c] - (r1 > 0 ? subSum[r1 - 1][c] : 0);
                    res += count.getOrDefault(curSum - target, 0);
                    count.put(curSum, count.getOrDefault(curSum, 0) + 1);
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
    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int ROWS = matrix.size(), COLS = matrix[0].size();
        vector<vector<int>> subSum(ROWS, vector<int>(COLS, 0));

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int top = (r > 0) ? subSum[r - 1][c] : 0;
                int left = (c > 0) ? subSum[r][c - 1] : 0;
                int topLeft = (min(r, c) > 0) ? subSum[r - 1][c - 1] : 0;
                subSum[r][c] = matrix[r][c] + top + left - topLeft;
            }
        }

        int res = 0;
        for (int r1 = 0; r1 < ROWS; r1++) {
            for (int r2 = r1; r2 < ROWS; r2++) {
                unordered_map<int, int> count;
                count[0] = 1;
                for (int c = 0; c < COLS; c++) {
                    int curSum = subSum[r2][c] - (r1 > 0 ? subSum[r1 - 1][c] : 0);
                    res += count[curSum - target];
                    count[curSum]++;
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
     * @param {number[][]} matrix
     * @param {number} target
     * @return {number}
     */
    numSubmatrixSumTarget(matrix, target) {
        let ROWS = matrix.length,
            COLS = matrix[0].length;
        let subSum = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let top = r > 0 ? subSum[r - 1][c] : 0;
                let left = c > 0 ? subSum[r][c - 1] : 0;
                let topLeft = Math.min(r, c) > 0 ? subSum[r - 1][c - 1] : 0;
                subSum[r][c] = matrix[r][c] + top + left - topLeft;
            }
        }

        let res = 0;
        for (let r1 = 0; r1 < ROWS; r1++) {
            for (let r2 = r1; r2 < ROWS; r2++) {
                let count = new Map();
                count.set(0, 1);
                for (let c = 0; c < COLS; c++) {
                    let curSum =
                        subSum[r2][c] - (r1 > 0 ? subSum[r1 - 1][c] : 0);
                    res += count.get(curSum - target) || 0;
                    count.set(curSum, (count.get(curSum) || 0) + 1);
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m ^ 2 * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix.

---

## 4. Vertical 1D Prefix Sum

::tabs-start

```python
class Solution:
    def numSubmatrixSumTarget(self, matrix: List[List[int]], target: int) -> int:
        ROWS, COLS = len(matrix), len(matrix[0])
        res = 0

        for c1 in range(COLS):
            row_prefix = [0] * ROWS
            for c2 in range(c1, COLS):
                for r in range(ROWS):
                    row_prefix[r] += matrix[r][c2]

                count = defaultdict(int)
                count[0] = 1
                cur_sum = 0
                for r in range(ROWS):
                    cur_sum += row_prefix[r]
                    res += count[cur_sum - target]
                    count[cur_sum] += 1

        return res
```

```java
public class Solution {
    public int numSubmatrixSumTarget(int[][] matrix, int target) {
        int ROWS = matrix.length, COLS = matrix[0].length, res = 0;

        for (int c1 = 0; c1 < COLS; c1++) {
            int[] rowPrefix = new int[ROWS];
            for (int c2 = c1; c2 < COLS; c2++) {
                for (int r = 0; r < ROWS; r++) {
                    rowPrefix[r] += matrix[r][c2];
                }

                Map<Integer, Integer> count = new HashMap<>();
                count.put(0, 1);
                int curSum = 0;

                for (int r = 0; r < ROWS; r++) {
                    curSum += rowPrefix[r];
                    res += count.getOrDefault(curSum - target, 0);
                    count.put(curSum, count.getOrDefault(curSum, 0) + 1);
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
    int numSubmatrixSumTarget(vector<vector<int>>& matrix, int target) {
        int ROWS = matrix.size(), COLS = matrix[0].size(), res = 0;

        for (int c1 = 0; c1 < COLS; c1++) {
            vector<int> rowPrefix(ROWS, 0);
            for (int c2 = c1; c2 < COLS; c2++) {
                for (int r = 0; r < ROWS; r++) {
                    rowPrefix[r] += matrix[r][c2];
                }

                unordered_map<int, int> count;
                count[0] = 1;
                int curSum = 0;
                for (int r = 0; r < ROWS; r++) {
                    curSum += rowPrefix[r];
                    res += count[curSum - target];
                    count[curSum]++;
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
     * @param {number[][]} matrix
     * @param {number} target
     * @return {number}
     */
    numSubmatrixSumTarget(matrix, target) {
        let ROWS = matrix.length,
            COLS = matrix[0].length,
            res = 0;

        for (let c1 = 0; c1 < COLS; c1++) {
            let rowPrefix = new Array(ROWS).fill(0);
            for (let c2 = c1; c2 < COLS; c2++) {
                for (let r = 0; r < ROWS; r++) {
                    rowPrefix[r] += matrix[r][c2];
                }

                let count = new Map();
                count.set(0, 1);
                let curSum = 0;

                for (let r = 0; r < ROWS; r++) {
                    curSum += rowPrefix[r];
                    res += count.get(curSum - target) || 0;
                    count.set(curSum, (count.get(curSum) || 0) + 1);
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n ^ 2)$
- Space complexity: $O(m)$

> Where $m$ is the number of rows and $n$ is the number of columns of the given matrix.
