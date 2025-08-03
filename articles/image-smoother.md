## 1. Iteration (Using Extra Matrix)

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])
        res = [[0] * COLS for _ in range(ROWS)]

        for r in range(ROWS):
            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(r - 1, r + 2):
                    for j in range(c - 1, c + 2):
                        if 0 <= i < ROWS and 0 <= j < COLS:
                            total += img[i][j]
                            cnt += 1
                res[r][c] = total // cnt

        return res
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;
        int[][] res = new int[ROWS][COLS];

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                            total += img[i][j];
                            count++;
                        }
                    }
                }
                res[r][c] = total / count;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();
        vector<vector<int>> res(ROWS, vector<int>(COLS, 0));

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                            total += img[i][j];
                            count++;
                        }
                    }
                }
                res[r][c] = total / count;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;
        const res = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    count = 0;
                for (let i = r - 1; i <= r + 1; i++) {
                    for (let j = c - 1; j <= c + 1; j++) {
                        if (i >= 0 && i < ROWS && j >= 0 && j < COLS) {
                            total += img[i][j];
                            count++;
                        }
                    }
                }
                res[r][c] = Math.floor(total / count);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n * m)$

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.

---

## 2. Iteration (Using Extra Row)

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])
        prev_row = img[0][:]

        for r in range(ROWS):
            curr_row = img[r][:]

            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(max(0, r - 1), min(ROWS, r + 2)):
                    for j in range(max(0, c - 1), min(COLS, c + 2)):
                        if i == r:
                            total += curr_row[j]
                        elif i == r - 1:
                            total += prev_row[j]
                        else:
                            total += img[i][j]
                        cnt += 1
                img[r][c] = total // cnt

            prev_row = curr_row

        return img
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;
        int[] prevRow = img[0].clone();

        for (int r = 0; r < ROWS; r++) {
            int[] currRow = img[r].clone();

            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = Math.max(0, r - 1); i < Math.min(ROWS, r + 2); i++) {
                    for (int j = Math.max(0, c - 1); j < Math.min(COLS, c + 2); j++) {
                        if (i == r) {
                            total += currRow[j];
                        } else if (i == r - 1) {
                            total += prevRow[j];
                        } else {
                            total += img[i][j];
                        }
                        count++;
                    }
                }
                img[r][c] = total / count;
            }

            prevRow = currRow;
        }

        return img;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();
        vector<int> prevRow = img[0];

        for (int r = 0; r < ROWS; r++) {
            vector<int> currRow = img[r];

            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = max(0, r - 1); i < min(ROWS, r + 2); i++) {
                    for (int j = max(0, c - 1); j < min(COLS, c + 2); j++) {
                        if (i == r) {
                            total += currRow[j];
                        } else if (i == r - 1) {
                            total += prevRow[j];
                        } else {
                            total += img[i][j];
                        }
                        count++;
                    }
                }
                img[r][c] = total / count;
            }

            prevRow = currRow;
        }

        return img;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;
        let prevRow = [...img[0]];

        for (let r = 0; r < ROWS; r++) {
            let currRow = [...img[r]];

            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    count = 0;
                for (
                    let i = Math.max(0, r - 1);
                    i < Math.min(ROWS, r + 2);
                    i++
                ) {
                    for (
                        let j = Math.max(0, c - 1);
                        j < Math.min(COLS, c + 2);
                        j++
                    ) {
                        if (i === r) {
                            total += currRow[j];
                        } else if (i === r - 1) {
                            total += prevRow[j];
                        } else {
                            total += img[i][j];
                        }
                        count++;
                    }
                }
                img[r][c] = Math.floor(total / count);
            }

            prevRow = currRow;
        }

        return img;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$ extra space.

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.

---

## 3. Iteration (Without Extra Space)

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])
        LIMIT = 256

        for r in range(ROWS):
            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(max(0, r - 1), min(ROWS, r + 2)):
                    for j in range(max(0, c - 1), min(COLS, c + 2)):
                        total += img[i][j] % LIMIT
                        cnt += 1
                img[r][c] += (total // cnt) * LIMIT

        for r in range(ROWS):
            for c in range(COLS):
                img[r][c] //= LIMIT

        return img
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;
        int LIMIT = 256;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, count = 0;
                for (int i = Math.max(0, r - 1); i < Math.min(ROWS, r + 2); i++) {
                    for (int j = Math.max(0, c - 1); j < Math.min(COLS, c + 2); j++) {
                        total += img[i][j] % LIMIT;
                        count++;
                    }
                }
                img[r][c] += (total / count) * LIMIT;
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                img[r][c] /= LIMIT;
            }
        }

        return img;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();
        int LIMIT = 256;

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                int total = 0, count = 0;
                for (int i = max(0, r - 1); i < min(ROWS, r + 2); ++i) {
                    for (int j = max(0, c - 1); j < min(COLS, c + 2); ++j) {
                        total += img[i][j] % LIMIT;
                        count++;
                    }
                }
                img[r][c] += (total / count) * LIMIT;
            }
        }

        for (int r = 0; r < ROWS; ++r) {
            for (int c = 0; c < COLS; ++c) {
                img[r][c] /= LIMIT;
            }
        }

        return img;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;
        const LIMIT = 256;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    count = 0;
                for (
                    let i = Math.max(0, r - 1);
                    i < Math.min(ROWS, r + 2);
                    i++
                ) {
                    for (
                        let j = Math.max(0, c - 1);
                        j < Math.min(COLS, c + 2);
                        j++
                    ) {
                        total += img[i][j] % LIMIT;
                        count++;
                    }
                }
                img[r][c] += Math.floor(total / count) * LIMIT;
            }
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                img[r][c] = Math.floor(img[r][c] / LIMIT);
            }
        }

        return img;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.

---

## 4. Bit Mask

::tabs-start

```python
class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        ROWS, COLS = len(img), len(img[0])

        for r in range(ROWS):
            for c in range(COLS):
                total, cnt = 0, 0
                for i in range(r - 1, r + 2):
                    for j in range(c - 1, c + 2):
                        if i < 0 or i == ROWS or j < 0 or j == COLS:
                            continue
                        total += img[i][j] % 256
                        cnt += 1
                img[r][c] ^= ((total // cnt) << 8)

        for r in range(ROWS):
            for c in range(COLS):
                img[r][c] >>= 8
        return img
```

```java
public class Solution {
    public int[][] imageSmoother(int[][] img) {
        int ROWS = img.length, COLS = img[0].length;

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, cnt = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i < 0 || i >= ROWS || j < 0 || j >= COLS) {
                            continue;
                        }
                        total += img[i][j] % 256;
                        cnt++;
                    }
                }
                img[r][c] ^= ((total / cnt) << 8);
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                img[r][c] >>= 8;
            }
        }
        return img;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {
        int ROWS = img.size(), COLS = img[0].size();

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                int total = 0, cnt = 0;
                for (int i = r - 1; i <= r + 1; i++) {
                    for (int j = c - 1; j <= c + 1; j++) {
                        if (i < 0 || i >= ROWS || j < 0 || j >= COLS) {
                            continue;
                        }
                        total += img[i][j] % 256;
                        cnt++;
                    }
                }
                img[r][c] ^= ((total / cnt) << 8);
            }
        }

        for (int r = 0; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                img[r][c] >>= 8;
            }
        }
        return img;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} img
     * @return {number[][]}
     */
    imageSmoother(img) {
        const ROWS = img.length,
            COLS = img[0].length;

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                let total = 0,
                    cnt = 0;
                for (let i = r - 1; i <= r + 1; i++) {
                    for (let j = c - 1; j <= c + 1; j++) {
                        if (i < 0 || i >= ROWS || j < 0 || j >= COLS) {
                            continue;
                        }
                        total += img[i][j] % 256;
                        cnt++;
                    }
                }
                img[r][c] ^= (total / cnt) << 8;
            }
        }

        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                img[r][c] >>= 8;
            }
        }
        return img;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the number of rows and $m$ is the number of columns of the matrix.
