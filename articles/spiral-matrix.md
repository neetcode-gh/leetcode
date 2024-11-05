## 1. Recursion

::tabs-start

```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        m, n = len(matrix), len(matrix[0])
        res = []

        # append all the elements in the given direction
        def dfs(row, col, r, c, dr, dc):
            if row == 0 or col == 0:
                return
            
            for i in range(col):
                r += dr
                c += dc
                res.append(matrix[r][c])

            # sub-problem
            dfs(col, row - 1, r, c, dc, -dr)
        
        # start by going to the right
        dfs(m, n, 0, -1, 0, 1)
        return res
```

```java
public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        List<Integer> res = new ArrayList<>();

        // append all the elements in the given direction
        dfs(m, n, 0, -1, 0, 1, matrix, res);
        return res;
    }

    private void dfs(int row, int col, int r, int c, 
                     int dr, int dc, int[][] matrix, List<Integer> res) {
        if (row == 0 || col == 0) return;
        
        for (int i = 0; i < col; i++) {
            r += dr;
            c += dc;
            res.add(matrix[r][c]);
        }

        // sub-problem
        dfs(col, row - 1, r, c, dc, -dr, matrix, res);
    }
}
```

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> res;

        // append all the elements in the given direction
        dfs(m, n, 0, -1, 0, 1, matrix, res);
        return res;
    }

    void dfs(int row, int col, int r, int c, int dr, int dc, 
             vector<vector<int>>& matrix, vector<int>& res) {
        if (row == 0 || col == 0) return;
        
        for (int i = 0; i < col; i++) {
            r += dr;
            c += dc;
            res.push_back(matrix[r][c]);
        }

        // sub-problem
        dfs(col, row - 1, r, c, dc, -dr, matrix, res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number[]}
     */
    spiralOrder(matrix) {
        const m = matrix.length, n = matrix[0].length;
        const res = [];

        // append all the elements in the given direction
        const dfs = (row, col, r, c, dr, dc) => {
            if (row === 0 || col === 0) return;

            for (let i = 0; i < col; i++) {
                r += dr;
                c += dc;
                res.push(matrix[r][c]);
            }

            // sub-problem
            dfs(col, row - 1, r, c, dc, -dr);
        };

        // start by going to the right
        dfs(m, n, 0, -1, 0, 1);
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> SpiralOrder(int[][] matrix) {
        int m = matrix.Length, n = matrix[0].Length;
        List<int> res = new List<int>();

        // append all the elements in the given direction
        Dfs(m, n, 0, -1, 0, 1, matrix, res);
        return res;
    }

    private void Dfs(int row, int col, int r, int c, int dr, 
                     int dc, int[][] matrix, List<int> res) {
        if (row == 0 || col == 0) return;
        
        for (int i = 0; i < col; i++) {
            r += dr;
            c += dc;
            res.Add(matrix[r][c]);
        }

        // sub-problem
        Dfs(col, row - 1, r, c, dc, -dr, matrix, res);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(min(m, n))$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        left, right = 0, len(matrix[0])
        top, bottom = 0, len(matrix)

        while left < right and top < bottom:
            for i in range(left, right):
                res.append(matrix[top][i])
            top += 1
            for i in range(top, bottom):
                res.append(matrix[i][right - 1])
            right -= 1
            if not (left < right and top < bottom):
                break
            for i in range(right - 1, left - 1, -1):
                res.append(matrix[bottom - 1][i])
            bottom -= 1
            for i in range(bottom - 1, top - 1, -1):
                res.append(matrix[i][left])
            left += 1

        return res
```

```java
public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int left = 0, right = matrix[0].length;
        int top = 0, bottom = matrix.length;

        while (left < right && top < bottom) {
            for (int i = left; i < right; i++) {
                res.add(matrix[top][i]);
            }
            top++;
            for (int i = top; i < bottom; i++) {
                res.add(matrix[i][right - 1]);
            }
            right--;
            if (!(left < right && top < bottom)) {
                break;
            }
            for (int i = right - 1; i >= left; i--) {
                res.add(matrix[bottom - 1][i]);
            }
            bottom--;
            for (int i = bottom - 1; i >= top; i--) {
                res.add(matrix[i][left]);
            }
            left++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int left = 0, right = matrix[0].size();
        int top = 0, bottom = matrix.size();

        while (left < right && top < bottom) {
            for (int i = left; i < right; i++) {
                res.push_back(matrix[top][i]);
            }
            top++;
            for (int i = top; i < bottom; i++) {
                res.push_back(matrix[i][right - 1]);
            }
            right--;
            if (!(left < right && top < bottom)) {
                break;
            }
            for (int i = right - 1; i >= left; i--) {
                res.push_back(matrix[bottom - 1][i]);
            }
            bottom--;
            for (int i = bottom - 1; i >= top; i--) {
                res.push_back(matrix[i][left]);
            }
            left++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number[]}
     */
    spiralOrder(matrix) {
        const res = [];
        let left = 0;
            let right = matrix[0].length;
        let top = 0;
            let bottom = matrix.length;

        while (left < right && top < bottom) {
            for (let i = left; i < right; i++) {
                res.push(matrix[top][i]);
            }
            top++;
            for (let i = top; i < bottom; i++) {
                res.push(matrix[i][right - 1]);
            }
            right--;
            if (!(left < right && top < bottom)) {
                break;
            }
            for (let i = right - 1; i >= left; i--) {
                res.push(matrix[bottom - 1][i]);
            }
            bottom--;
            for (let i = bottom - 1; i >= top; i--) {
                res.push(matrix[i][left]);
            }
            left++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> SpiralOrder(int[][] matrix) {
        List<int> res = new List<int>();
        int left = 0, right = matrix[0].Length;
        int top = 0, bottom = matrix.Length;

        while (left < right && top < bottom) {
            for (int i = left; i < right; i++) {
                res.Add(matrix[top][i]);
            }
            top++;
            for (int i = top; i < bottom; i++) {
                res.Add(matrix[i][right - 1]);
            }
            right--;
            if (!(left < right && top < bottom)) {
                break;
            }
            for (int i = right - 1; i >= left; i--) {
                res.Add(matrix[bottom - 1][i]);
            }
            bottom--;
            for (int i = bottom - 1; i >= top; i--) {
                res.Add(matrix[i][left]);
            }
            left++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Iteration (Optimal)

::tabs-start

```python
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        res = []
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        steps = [len(matrix[0]), len(matrix) - 1]

        r, c, d = 0, -1, 0
        while steps[d & 1]:
            for i in range(steps[d & 1]):
                r += directions[d][0]
                c += directions[d][1]
                res.append(matrix[r][c])
            steps[d & 1] -= 1
            d += 1
            d %= 4
        return res
```

```java
public class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int[] steps = {matrix[0].length, matrix.length - 1};

        int r = 0, c = -1, d = 0;
        while (steps[d % 2] > 0) {
            for (int i = 0; i < steps[d % 2]; i++) {
                r += directions[d][0];
                c += directions[d][1];
                res.add(matrix[r][c]);
            }
            steps[d % 2]--;
            d = (d + 1) % 4;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        vector<pair<int, int>> directions = {{0, 1}, {1, 0}, 
                                             {0, -1}, {-1, 0}};
        vector<int> steps = {matrix[0].size(), matrix.size() - 1};

        int r = 0, c = -1, d = 0;
        while (steps[d % 2]) {
            for (int i = 0; i < steps[d % 2]; i++) {
                r += directions[d].first;
                c += directions[d].second;
                res.push_back(matrix[r][c]);
            }
            steps[d % 2]--;
            d = (d + 1) % 4;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} matrix
     * @return {number[]}
     */
    spiralOrder(matrix) {
        const res = [];
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const steps = [matrix[0].length, matrix.length - 1];

        let r = 0, c = -1, d = 0;
        while (steps[d % 2]) {
            for (let i = 0; i < steps[d % 2]; i++) {
                r += directions[d][0];
                c += directions[d][1];
                res.push(matrix[r][c]);
            }
            steps[d % 2]--;
            d = (d + 1) % 4;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> SpiralOrder(int[][] matrix) {
        var res = new List<int>();
        var directions = new (int, int)[] { (0, 1), (1, 0), 
                                            (0, -1), (-1, 0) };
        var steps = new int[] { matrix[0].Length, matrix.Length - 1 };

        int r = 0, c = -1, d = 0;
        while (steps[d % 2] > 0) {
            for (int i = 0; i < steps[d % 2]; i++) {
                r += directions[d].Item1;
                c += directions[d].Item2;
                res.Add(matrix[r][c]);
            }
            steps[d % 2]--;
            d = (d + 1) % 4;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(m * n)$
* Space complexity: $O(1)$

> Where $m$ is the number of rows and $n$ is the number of columns.