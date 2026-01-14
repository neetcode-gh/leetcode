## 1. Recursion

### Intuition

We want to print the matrix in **spiral order** (right → down → left → up, repeating).

This solution treats the spiral as a sequence of smaller and smaller “rings”.
Each ring can be described by:
- how many rows are left to cover
- how many columns are left to cover
- a current position `(r, c)`
- a direction `(dr, dc)` that tells us where to move next

At each step, we do two things:
1. **Walk straight** in the current direction and append all elements along that edge.
2. **Shrink the problem** and rotate direction for the next edge.

After moving along one edge, the remaining unvisited area becomes a smaller rectangle, and the next direction is obtained by “turning right” (changing `(dr, dc)`).

### Algorithm

1. Keep an answer list `res`.
2. Define a recursive function that takes:
   - `row` = remaining rows to process
   - `col` = remaining columns to process
   - current position `(r, c)`
   - direction `(dr, dc)`
3. Base case:
   - if `row == 0` or `col == 0`, stop (nothing left to traverse)
4. Move `col` steps in the current direction:
   - each step updates `(r, c)` by `(dr, dc)`
   - append `matrix[r][c]` to `res`
5. Recursively solve the smaller sub-rectangle:
   - swap the roles of `row` and `col` (because after turning, width/height swap)
   - reduce the new width by `1` (one side was fully consumed)
   - rotate the direction to turn right
6. Start the recursion by moving right from just outside the matrix:
   - position `(0, -1)` with direction `(0, 1)`
7. Return `res`.

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
        const m = matrix.length,
            n = matrix[0].length;
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

```go
func spiralOrder(matrix [][]int) []int {
	m, n := len(matrix), len(matrix[0])
	res := []int{}

	// Helper function for DFS traversal
	var dfs func(row, col, r, c, dr, dc int)
	dfs = func(row, col, r, c, dr, dc int) {
		if row == 0 || col == 0 {
			return
		}

		for i := 0; i < col; i++ {
			r += dr
			c += dc
			res = append(res, matrix[r][c])
		}

		// Recursive call with updated direction and dimensions
		dfs(col, row-1, r, c, dc, -dr)
	}

	// Start the DFS by going to the right
	dfs(m, n, 0, -1, 0, 1)
	return res
}
```

```kotlin
class Solution {
    fun spiralOrder(matrix: Array<IntArray>): List<Int> {
        val m = matrix.size
        val n = matrix[0].size
        val res = mutableListOf<Int>()

        // Helper function for DFS traversal
        fun dfs(row: Int, col: Int, r: Int, c: Int, dr: Int, dc: Int) {
            if (row == 0 || col == 0) return

            var newRow = r
            var newCol = c

            for (i in 0 until col) {
                newRow += dr
                newCol += dc
                res.add(matrix[newRow][newCol])
            }

            // Recursive call with updated direction and dimensions
            dfs(col, row - 1, newRow, newCol, dc, -dr)
        }

        // Start the DFS by going to the right
        dfs(m, n, 0, -1, 0, 1)
        return res
    }
}
```

```swift
class Solution {
    func spiralOrder(_ matrix: [[Int]]) -> [Int] {
        var m = matrix.count
        var n = matrix[0].count
        var res: [Int] = []

        // append all the elements in the given direction
        func dfs(_ row: Int, _ col: Int, _ r: inout Int, _ c: inout Int, _ dr: Int, _ dc: Int) {
            if row == 0 || col == 0 {
                return
            }

            for _ in 0..<col {
                r += dr
                c += dc
                res.append(matrix[r][c])
            }

            // sub-problem
            dfs(col, row - 1, &r, &c, dc, -dr)
        }

        var r = 0
        var c = -1

        // start by going to the right
        dfs(m, n, &r, &c, 0, 1)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity:
    - $O(min(m, n))$ space for recursion stack.
    - $O(m * n)$ space for the output list.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 2. Iteration

### Intuition

We want to traverse a matrix in **spiral order**:  
right → down → left → up, repeatedly, moving inward layer by layer.

A clean iterative way to do this is to maintain **four boundaries**:
- `top`    → the topmost unvisited row
- `bottom` → one past the bottommost unvisited row
- `left`   → the leftmost unvisited column
- `right`  → one past the rightmost unvisited column

At each step, we walk along the current outer boundary in four directions:
1. left → right across the top row
2. top → bottom down the right column
3. right → left across the bottom row
4. bottom → top up the left column

After each pass, we shrink the boundaries inward.

### Algorithm

1. Initialize:
   - `res` as an empty list
   - `left = 0`, `right = number of columns`
   - `top = 0`, `bottom = number of rows`
2. While there is still an unvisited rectangle (`left < right` and `top < bottom`):
3. Traverse the **top row** from `left` to `right - 1` and append elements.
   - Increment `top`
4. Traverse the **right column** from `top` to `bottom - 1` and append elements.
   - Decrement `right`
5. If the remaining rectangle is invalid, break (prevents duplicates).
6. Traverse the **bottom row** from `right - 1` down to `left` and append elements.
   - Decrement `bottom`
7. Traverse the **left column** from `bottom - 1` up to `top` and append elements.
   - Increment `left`
8. Continue until all elements are added.
9. Return `res`.

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

```go
func spiralOrder(matrix [][]int) []int {
	res := []int{}
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return res
	}

	left, right := 0, len(matrix[0])
	top, bottom := 0, len(matrix)

	for left < right && top < bottom {
		for i := left; i < right; i++ {
			res = append(res, matrix[top][i])
		}
		top++

		for i := top; i < bottom; i++ {
			res = append(res, matrix[i][right-1])
		}
		right--

		if !(left < right && top < bottom) {
			break
		}

		for i := right - 1; i >= left; i-- {
			res = append(res, matrix[bottom-1][i])
		}
		bottom--

		for i := bottom - 1; i >= top; i-- {
			res = append(res, matrix[i][left])
		}
		left++
	}

	return res
}
```

```kotlin
class Solution {
    fun spiralOrder(matrix: Array<IntArray>): List<Int> {
        val res = mutableListOf<Int>()
        if (matrix.isEmpty() || matrix[0].isEmpty()) return res

        var left = 0
        var right = matrix[0].size
        var top = 0
        var bottom = matrix.size

        while (left < right && top < bottom) {
            for (i in left until right) {
                res.add(matrix[top][i])
            }
            top++

            for (i in top until bottom) {
                res.add(matrix[i][right - 1])
            }
            right--

            if (!(left < right && top < bottom)) break

            for (i in right - 1 downTo left) {
                res.add(matrix[bottom - 1][i])
            }
            bottom--

            for (i in bottom - 1 downTo top) {
                res.add(matrix[i][left])
            }
            left++
        }

        return res
    }
}
```

```swift
class Solution {
    func spiralOrder(_ matrix: [[Int]]) -> [Int] {
        var res: [Int] = []
        var left = 0, right = matrix[0].count
        var top = 0, bottom = matrix.count

        while left < right && top < bottom {
            for i in left..<right {
                res.append(matrix[top][i])
            }
            top += 1
            for i in top..<bottom {
                res.append(matrix[i][right - 1])
            }
            right -= 1
            if !(left < right && top < bottom) {
                break
            }
            for i in stride(from: right - 1, through: left, by: -1) {
                res.append(matrix[bottom - 1][i])
            }
            bottom -= 1
            for i in stride(from: bottom - 1, through: top, by: -1) {
                res.append(matrix[i][left])
            }
            left += 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(m * n)$ space for the output list.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## 3. Iteration (Optimal)

### Intuition

We want to read the matrix in **spiral order**: right → down → left → up, repeating.

Instead of keeping four boundaries (`top`, `bottom`, `left`, `right`), this approach tracks:
- the **current direction** (right, down, left, up)
- how many **steps** we can take in the current direction before turning

Key idea:
- Spiral traversal alternates between moving along a **row length** and a **column length**
  - first we move right `cols` steps
  - then down `rows - 1` steps
  - then left `cols - 1` steps
  - then up `rows - 2` steps
  - and so on...
- After completing a direction, the available steps in that “dimension” shrink by 1.

We store the remaining step counts in an array:
- `steps[0]` = how many moves left in the horizontal direction
- `steps[1]` = how many moves left in the vertical direction

`d & 1` tells us whether the current direction is horizontal (`0`) or vertical (`1`).

### Algorithm

1. Create a list of direction vectors in clockwise order:
   - right `(0, 1)`, down `(1, 0)`, left `(0, -1)`, up `(-1, 0)`
2. Initialize step counts:
   - `steps[0] = number of columns`
   - `steps[1] = number of rows - 1`
3. Start just outside the matrix at `(r, c) = (0, -1)` so the first move goes into `(0, 0)`.
4. Set direction index `d = 0` (start moving right).
5. While the current step count `steps[d & 1]` is greater than `0`:
   - Move `steps[d & 1]` times in direction `d`:
     - update `(r, c)` by the direction vector
     - append `matrix[r][c]` to the result
   - After finishing those moves, shrink the step count for that dimension:
     - `steps[d & 1] -= 1`
   - Turn to the next direction:
     - `d = (d + 1) % 4`
6. Return the result list.

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
        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        const steps = [matrix[0].length, matrix.length - 1];

        let r = 0,
            c = -1,
            d = 0;
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

```go
func spiralOrder(matrix [][]int) []int {
	res := []int{}
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return res
	}

	directions := [4][2]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}
	steps := []int{len(matrix[0]), len(matrix) - 1}

	r, c, d := 0, -1, 0

	for steps[d&1] > 0 {
		for i := 0; i < steps[d&1]; i++ {
			r += directions[d][0]
			c += directions[d][1]
			res = append(res, matrix[r][c])
		}
		steps[d&1]--
		d = (d + 1) % 4
	}

	return res
}
```

```kotlin
class Solution {
    fun spiralOrder(matrix: Array<IntArray>): List<Int> {
        val res = mutableListOf<Int>()
        if (matrix.isEmpty() || matrix[0].isEmpty()) return res

        val directions = arrayOf(
            intArrayOf(0, 1),
            intArrayOf(1, 0),
            intArrayOf(0, -1),
            intArrayOf(-1, 0)
        )
        val steps = mutableListOf(matrix[0].size, matrix.size - 1)

        var r = 0
        var c = -1
        var d = 0

        while (steps[d and 1] > 0) {
            for (i in 0 until steps[d and 1]) {
                r += directions[d][0]
                c += directions[d][1]
                res.add(matrix[r][c])
            }
            steps[d and 1]--
            d = (d + 1) % 4
        }

        return res
    }
}
```

```swift
class Solution {
    func spiralOrder(_ matrix: [[Int]]) -> [Int] {
        var res: [Int] = []
        let directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        var steps = [matrix[0].count, matrix.count - 1]

        var r = 0, c = -1, d = 0
        while steps[d & 1] > 0 {
            for _ in 0..<steps[d & 1] {
                r += directions[d].0
                c += directions[d].1
                res.append(matrix[r][c])
            }
            steps[d & 1] -= 1
            d += 1
            d %= 4
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(m * n)$ space for the output list.

> Where $m$ is the number of rows and $n$ is the number of columns.

---

## Common Pitfalls

### Not Checking Boundaries After Each Direction

After completing a horizontal traversal, the vertical bounds may have crossed (or vice versa). Failing to check `left < right && top < bottom` before the third and fourth directions causes duplicate elements to be added when the matrix reduces to a single row or column.

### Mishandling Non-Square Matrices

Rectangular matrices with significantly different row and column counts can cause issues if the algorithm assumes square behavior. The spiral may terminate early or add extra elements if boundary checks do not account for both dimensions independently.

### Incorrect Direction Rotation

When using direction vectors, rotating incorrectly (e.g., counterclockwise instead of clockwise, or incorrect sign changes) produces a non-spiral traversal pattern. The correct clockwise rotation transforms `(dr, dc)` to `(dc, -dr)`.
