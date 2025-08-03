## 1. Brute Force

::tabs-start

```python
class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[List[str]]:
        ROWS, COLS = len(boxGrid), len(boxGrid[0])

        for r in range(ROWS - 1, -1, -1):
            for c1 in range(COLS - 1, -1, -1):
                if boxGrid[r][c1] == '#':
                    c2 = c1 + 1
                    while c2 < COLS and boxGrid[r][c2] == '.':
                        c2 += 1

                    boxGrid[r][c1] = '.'
                    boxGrid[r][c2 - 1] = '#'


        res = []
        for c in range(COLS):
            col = []
            for r in range(ROWS - 1, -1, -1):
                col.append(boxGrid[r][c])
            res.append(col)
        return res
```

```java
public class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.length, COLS = boxGrid[0].length;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = COLS - 1; c1 >= 0; c1--) {
                if (boxGrid[r][c1] == '#') {
                    int c2 = c1 + 1;
                    while (c2 < COLS && boxGrid[r][c2] == '.') {
                        c2++;
                    }
                    boxGrid[r][c1] = '.';
                    boxGrid[r][c2 - 1] = '#';
                }
            }
        }

        char[][] res = new char[COLS][ROWS];
        for (int c = 0; c < COLS; c++) {
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& boxGrid) {
        int ROWS = boxGrid.size(), COLS = boxGrid[0].size();

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = COLS - 1; c1 >= 0; c1--) {
                if (boxGrid[r][c1] == '#') {
                    int c2 = c1 + 1;
                    while (c2 < COLS && boxGrid[r][c2] == '.') {
                        c2++;
                    }
                    boxGrid[r][c1] = '.';
                    boxGrid[r][c2 - 1] = '#';
                }
            }
        }

        vector<vector<char>> res(COLS, vector<char>(ROWS));
        for (int c = 0; c < COLS; c++) {
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} boxGrid
     * @return {character[][]}
     */
    rotateTheBox(boxGrid) {
        const ROWS = boxGrid.length,
            COLS = boxGrid[0].length;
        const res = Array.from({ length: COLS }, () => Array(ROWS).fill('.'));
        for (let r = 0; r < ROWS; r++) {
            let i = COLS - 1;
            for (let c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] === '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] === '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public char[][] RotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.Length, COLS = boxGrid[0].Length;

        for (int r = ROWS - 1; r >= 0; r--) {
            for (int c1 = COLS - 1; c1 >= 0; c1--) {
                if (boxGrid[r][c1] == '#') {
                    int c2 = c1 + 1;
                    while (c2 < COLS && boxGrid[r][c2] == '.') {
                        c2++;
                    }
                    boxGrid[r][c1] = '.';
                    boxGrid[r][c2 - 1] = '#';
                }
            }
        }

        char[][] res = new char[COLS][];
        for (int c = 0; c < COLS; c++) {
            res[c] = new char[ROWS];
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n ^ 2)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Two Pointers - I

::tabs-start

```python
class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[List[str]]:
        ROWS, COLS = len(boxGrid), len(boxGrid[0])

        for r in range(ROWS):
            i = COLS - 1
            for c in reversed(range(COLS)):
                if boxGrid[r][c] == "#":
                    boxGrid[r][c], boxGrid[r][i] = boxGrid[r][i], boxGrid[r][c]
                    i -= 1
                elif boxGrid[r][c] == "*":
                    i = c - 1

        res = []
        for c in range(COLS):
            col = []  # this is a row after rotation
            for r in reversed(range(ROWS)):
                col.append(boxGrid[r][c])
            res.append(col)

        return res
```

```java
public class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.length, COLS = boxGrid[0].length;
        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    char tmp = boxGrid[r][c];
                    boxGrid[r][c] = boxGrid[r][i];
                    boxGrid[r][i] = tmp;
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    i = c - 1;
                }
            }
        }
        char[][] res = new char[COLS][ROWS];
        for (int c = 0; c < COLS; c++) {
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<char>> rotateTheBox(vector<vector<char>>& boxGrid) {
        int ROWS = boxGrid.size(), COLS = boxGrid[0].size();
        for (int r = 0; r < ROWS; ++r) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; --c) {
                if (boxGrid[r][c] == '#') {
                    swap(boxGrid[r][c], boxGrid[r][i]);
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    i = c - 1;
                }
            }
        }
        vector<vector<char>> res(COLS, vector<char>(ROWS));
        for (int c = 0; c < COLS; ++c) {
            for (int r = ROWS - 1; r >= 0; --r) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[][]} boxGrid
     * @return {character[][]}
     */
    rotateTheBox(boxGrid) {
        const ROWS = boxGrid.length,
            COLS = boxGrid[0].length;
        for (let r = 0; r < ROWS; r++) {
            let i = COLS - 1;
            for (let c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] === '#') {
                    [boxGrid[r][c], boxGrid[r][i]] = [
                        boxGrid[r][i],
                        boxGrid[r][c],
                    ];
                    i--;
                } else if (boxGrid[r][c] === '*') {
                    i = c - 1;
                }
            }
        }
        const res = [];
        for (let c = 0; c < COLS; c++) {
            const row = [];
            for (let r = ROWS - 1; r >= 0; r--) {
                row.push(boxGrid[r][c]);
            }
            res.push(row);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public char[][] RotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.Length, COLS = boxGrid[0].Length;
        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    char tmp = boxGrid[r][c];
                    boxGrid[r][c] = boxGrid[r][i];
                    boxGrid[r][i] = tmp;
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    i = c - 1;
                }
            }
        }
        char[][] res = new char[COLS][];
        for (int c = 0; c < COLS; c++) {
            res[c] = new char[ROWS];
            for (int r = ROWS - 1; r >= 0; r--) {
                res[c][ROWS - 1 - r] = boxGrid[r][c];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Two Pointers - II

::tabs-start

```python
class Solution:
    def rotateTheBox(self, boxGrid: List[List[str]]) -> List[List[str]]:
        ROWS, COLS = len(boxGrid), len(boxGrid[0])

        res = [["."] * ROWS for _ in range(COLS)]

        for r in range(ROWS):
            i = COLS - 1
            for c in reversed(range(COLS)):
                if boxGrid[r][c] == "#":
                    res[i][ROWS - r - 1] = "#"
                    i -= 1
                elif boxGrid[r][c] == "*":
                    res[c][ROWS - r - 1] = "*"
                    i = c - 1

        return res
```

```java
public class Solution {
    public char[][] rotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.length, COLS = boxGrid[0].length;
        char[][] res = new char[COLS][ROWS];
        for (int c = 0; c < COLS; c++) {
            for (int r = 0; r < ROWS; r++) {
                res[c][r] = '.';
            }
        }

        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
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
    vector<vector<char>> rotateTheBox(vector<vector<char>>& boxGrid) {
        int ROWS = boxGrid.size(), COLS = boxGrid[0].size();
        vector<vector<char>> res(COLS, vector<char>(ROWS, '.'));
        for (int r = 0; r < ROWS; ++r) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; --c) {
                if (boxGrid[r][c] == '#') {
                    res[i][ROWS - r - 1] = '#';
                    --i;
                } else if (boxGrid[r][c] == '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
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
     * @param {character[][]} boxGrid
     * @return {character[][]}
     */
    rotateTheBox(boxGrid) {
        const ROWS = boxGrid.length,
            COLS = boxGrid[0].length;
        const res = Array.from({ length: COLS }, () => Array(ROWS).fill('.'));
        for (let r = 0; r < ROWS; r++) {
            let i = COLS - 1;
            for (let c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] === '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] === '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public char[][] RotateTheBox(char[][] boxGrid) {
        int ROWS = boxGrid.Length, COLS = boxGrid[0].Length;
        var res = new char[COLS][];
        for (int c = 0; c < COLS; c++) {
            res[c] = new char[ROWS];
            for (int r = 0; r < ROWS; r++) {
                res[c][r] = '.';
            }
        }

        for (int r = 0; r < ROWS; r++) {
            int i = COLS - 1;
            for (int c = COLS - 1; c >= 0; c--) {
                if (boxGrid[r][c] == '#') {
                    res[i][ROWS - r - 1] = '#';
                    i--;
                } else if (boxGrid[r][c] == '*') {
                    res[c][ROWS - r - 1] = '*';
                    i = c - 1;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(m * n)$

> Where $m$ is the number of rows and $n$ is the number of columns.
