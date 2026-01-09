## 1. Brute Force

### Intuition

We can rearrange columns in any order, so the key is to find which columns can form a rectangle of all `1`s. For each starting row, we track which columns have continuous `1`s from that row downward. As we extend the rectangle row by row, columns with a `0` are eliminated. The area at each step is the number of surviving columns multiplied by the current height.

### Algorithm

1. For each starting row, initialize a set containing all column indices.
2. Iterate through each subsequent row:
   - Remove columns that have a `0` in the current row.
   - Calculate the area as `(remaining columns) * (current height)`.
   - Update the maximum area found.
3. Return the maximum area.

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

```csharp
public class Solution {
    public int LargestSubmatrix(int[][] matrix) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;
        int res = 0;

        for (int startRow = 0; startRow < ROWS; startRow++) {
            Queue<int> ones = new Queue<int>();
            for (int i = 0; i < COLS; i++) {
                ones.Enqueue(i);
            }

            for (int r = startRow; r < ROWS; r++) {
                if (ones.Count == 0) break;

                int size = ones.Count;
                for (int k = 0; k < size; k++) {
                    int c = ones.Dequeue();
                    if (matrix[r][c] == 1) {
                        ones.Enqueue(c);
                    }
                }

                res = Math.Max(res, ones.Count * (r - startRow + 1));
            }
        }

        return res;
    }
}
```

```go
func largestSubmatrix(matrix [][]int) int {
    ROWS, COLS := len(matrix), len(matrix[0])
    res := 0

    for startRow := 0; startRow < ROWS; startRow++ {
        ones := make([]int, 0, COLS)
        for c := 0; c < COLS; c++ {
            ones = append(ones, c)
        }

        for r := startRow; r < ROWS; r++ {
            if len(ones) == 0 {
                break
            }

            newOnes := make([]int, 0)
            for _, c := range ones {
                if matrix[r][c] == 1 {
                    newOnes = append(newOnes, c)
                }
            }
            ones = newOnes

            if len(ones)*(r-startRow+1) > res {
                res = len(ones) * (r - startRow + 1)
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun largestSubmatrix(matrix: Array<IntArray>): Int {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        var res = 0

        for (startRow in 0 until ROWS) {
            val ones = ArrayDeque<Int>()
            for (c in 0 until COLS) {
                ones.addLast(c)
            }

            for (r in startRow until ROWS) {
                if (ones.isEmpty()) break

                repeat(ones.size) {
                    val c = ones.removeFirst()
                    if (matrix[r][c] == 1) {
                        ones.addLast(c)
                    }
                }

                res = maxOf(res, ones.size * (r - startRow + 1))
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func largestSubmatrix(_ matrix: [[Int]]) -> Int {
        let ROWS = matrix.count, COLS = matrix[0].count
        var res = 0

        for startRow in 0..<ROWS {
            var ones = Array(0..<COLS)

            for r in startRow..<ROWS {
                if ones.isEmpty { break }

                var newOnes = [Int]()
                for c in ones {
                    if matrix[r][c] == 1 {
                        newOnes.append(c)
                    }
                }
                ones = newOnes

                res = max(res, ones.count * (r - startRow + 1))
            }
        }
        return res
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

### Intuition

Think of each cell as the height of a bar extending upward through consecutive `1`s. For each row, compute these heights based on the previous row. Since we can rearrange columns, sort the heights in descending order. Then greedily compute the largest rectangle: the first column can use its full height, the first two columns are limited by the second height, and so on.

### Algorithm

1. Maintain a `heights` array tracking consecutive `1`s above each cell.
2. For each row:
   - Update heights: if the cell is `1`, add the previous height; otherwise reset to `0`.
   - Sort heights in descending order.
   - For each position `i`, compute area as `(i + 1) * heights[i]` and track the maximum.
3. Return the maximum area found.

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

```csharp
public class Solution {
    public int LargestSubmatrix(int[][] matrix) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;
        int res = 0;
        int[] prevHeights = new int[COLS];

        for (int r = 0; r < ROWS; r++) {
            int[] heights = new int[COLS];
            Array.Copy(matrix[r], heights, COLS);

            for (int c = 0; c < COLS; c++) {
                if (heights[c] > 0) {
                    heights[c] += prevHeights[c];
                }
            }

            int[] sortedHeights = (int[])heights.Clone();
            Array.Sort(sortedHeights);
            Array.Reverse(sortedHeights);

            for (int i = 0; i < COLS; i++) {
                res = Math.Max(res, (i + 1) * sortedHeights[i]);
            }

            prevHeights = heights;
        }

        return res;
    }
}
```

```go
func largestSubmatrix(matrix [][]int) int {
    ROWS, COLS := len(matrix), len(matrix[0])
    res := 0
    prevHeights := make([]int, COLS)

    for r := 0; r < ROWS; r++ {
        heights := make([]int, COLS)
        copy(heights, matrix[r])

        for c := 0; c < COLS; c++ {
            if heights[c] > 0 {
                heights[c] += prevHeights[c]
            }
        }

        sortedHgts := make([]int, COLS)
        copy(sortedHgts, heights)
        sort.Sort(sort.Reverse(sort.IntSlice(sortedHgts)))

        for i := 0; i < COLS; i++ {
            if (i+1)*sortedHgts[i] > res {
                res = (i + 1) * sortedHgts[i]
            }
        }

        prevHeights = heights
    }
    return res
}
```

```kotlin
class Solution {
    fun largestSubmatrix(matrix: Array<IntArray>): Int {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        var res = 0
        var prevHeights = IntArray(COLS)

        for (r in 0 until ROWS) {
            val heights = matrix[r].copyOf()

            for (c in 0 until COLS) {
                if (heights[c] > 0) {
                    heights[c] += prevHeights[c]
                }
            }

            val sortedHgts = heights.sortedDescending()
            for (i in 0 until COLS) {
                res = maxOf(res, (i + 1) * sortedHgts[i])
            }

            prevHeights = heights
        }
        return res
    }
}
```

```swift
class Solution {
    func largestSubmatrix(_ matrix: [[Int]]) -> Int {
        let ROWS = matrix.count, COLS = matrix[0].count
        var res = 0
        var prevHeights = [Int](repeating: 0, count: COLS)

        for r in 0..<ROWS {
            var heights = matrix[r]

            for c in 0..<COLS {
                if heights[c] > 0 {
                    heights[c] += prevHeights[c]
                }
            }

            let sortedHgts = heights.sorted(by: >)
            for i in 0..<COLS {
                res = max(res, (i + 1) * sortedHgts[i])
            }

            prevHeights = heights
        }
        return res
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

### Intuition

This is the same approach as above but optimizes space by modifying the input matrix directly. Each cell stores the cumulative height of consecutive `1`s ending at that cell. This eliminates the need for a separate heights array.

### Algorithm

1. For each row starting from the second:
   - If a cell is `1`, add the value from the cell directly above it.
2. For each row:
   - Sort the row in descending order.
   - Compute the maximum area using the greedy formula.
3. Return the maximum area.

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

```csharp
public class Solution {
    public int LargestSubmatrix(int[][] matrix) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;
        int res = 0;

        for (int r = 1; r < ROWS; r++) {
            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] > 0) {
                    matrix[r][c] += matrix[r - 1][c];
                }
            }
        }

        for (int r = 0; r < ROWS; r++) {
            int[] row = (int[])matrix[r].Clone();
            Array.Sort(row);
            Array.Reverse(row);
            for (int i = 0; i < COLS; i++) {
                res = Math.Max(res, (i + 1) * row[i]);
            }
        }

        return res;
    }
}
```

```go
func largestSubmatrix(matrix [][]int) int {
    ROWS, COLS := len(matrix), len(matrix[0])
    res := 0

    for r := 1; r < ROWS; r++ {
        for c := 0; c < COLS; c++ {
            if matrix[r][c] > 0 {
                matrix[r][c] += matrix[r-1][c]
            }
        }
    }

    for r := 0; r < ROWS; r++ {
        row := make([]int, COLS)
        copy(row, matrix[r])
        sort.Sort(sort.Reverse(sort.IntSlice(row)))
        for i := 0; i < COLS; i++ {
            if (i+1)*row[i] > res {
                res = (i + 1) * row[i]
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun largestSubmatrix(matrix: Array<IntArray>): Int {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        var res = 0

        for (r in 1 until ROWS) {
            for (c in 0 until COLS) {
                if (matrix[r][c] > 0) {
                    matrix[r][c] += matrix[r - 1][c]
                }
            }
        }

        for (r in 0 until ROWS) {
            val row = matrix[r].sortedDescending()
            for (i in 0 until COLS) {
                res = maxOf(res, (i + 1) * row[i])
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func largestSubmatrix(_ matrix: [[Int]]) -> Int {
        var matrix = matrix
        let ROWS = matrix.count, COLS = matrix[0].count
        var res = 0

        for r in 1..<ROWS {
            for c in 0..<COLS {
                if matrix[r][c] > 0 {
                    matrix[r][c] += matrix[r - 1][c]
                }
            }
        }

        for r in 0..<ROWS {
            let row = matrix[r].sorted(by: >)
            for i in 0..<COLS {
                res = max(res, (i + 1) * row[i])
            }
        }
        return res
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

### Intuition

We can avoid sorting entirely by maintaining a sorted order implicitly. Track the column indices that had continuous `1`s from the previous row. For the current row, first process columns from the previous list (they have taller heights), then add new columns that just started with a `1`. This naturally keeps columns ordered by height in descending order.

### Algorithm

1. Maintain a list of column indices from the previous row that had continuous `1`s.
2. For each row:
   - Create a new list starting with columns from the previous list that still have a `1` (incrementing their height in the matrix).
   - Append columns where the current cell is `1` but was `0` before (new columns starting at height `1`).
   - Compute the maximum area: position `i` gives area `(i + 1) * matrix[r][heights[i]]`.
3. Return the maximum area.

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

```csharp
public class Solution {
    public int LargestSubmatrix(int[][] matrix) {
        int ROWS = matrix.Length;
        int COLS = matrix[0].Length;
        int res = 0;
        List<int> prevHeights = new List<int>();

        for (int r = 0; r < ROWS; r++) {
            List<int> heights = new List<int>();

            foreach (int c in prevHeights) {
                if (matrix[r][c] > 0) {
                    matrix[r][c] += matrix[r - 1][c];
                    heights.Add(c);
                }
            }

            for (int c = 0; c < COLS; c++) {
                if (matrix[r][c] == 1) {
                    heights.Add(c);
                }
            }

            for (int i = 0; i < heights.Count; i++) {
                int c = heights[i];
                res = Math.Max(res, (i + 1) * matrix[r][c]);
            }

            prevHeights = heights;
        }

        return res;
    }
}
```

```go
func largestSubmatrix(matrix [][]int) int {
    ROWS, COLS := len(matrix), len(matrix[0])
    res := 0
    prevHeights := []int{}

    for r := 0; r < ROWS; r++ {
        heights := []int{}

        for _, c := range prevHeights {
            if matrix[r][c] == 1 {
                matrix[r][c] += matrix[r-1][c]
                heights = append(heights, c)
            }
        }

        for c := 0; c < COLS; c++ {
            if matrix[r][c] == 1 {
                heights = append(heights, c)
            }
        }

        for i, c := range heights {
            if (i+1)*matrix[r][c] > res {
                res = (i + 1) * matrix[r][c]
            }
        }

        prevHeights = heights
    }
    return res
}
```

```kotlin
class Solution {
    fun largestSubmatrix(matrix: Array<IntArray>): Int {
        val ROWS = matrix.size
        val COLS = matrix[0].size
        var res = 0
        var prevHeights = mutableListOf<Int>()

        for (r in 0 until ROWS) {
            val heights = mutableListOf<Int>()

            for (c in prevHeights) {
                if (matrix[r][c] == 1) {
                    matrix[r][c] += matrix[r - 1][c]
                    heights.add(c)
                }
            }

            for (c in 0 until COLS) {
                if (matrix[r][c] == 1) {
                    heights.add(c)
                }
            }

            for ((i, c) in heights.withIndex()) {
                res = maxOf(res, (i + 1) * matrix[r][c])
            }

            prevHeights = heights
        }
        return res
    }
}
```

```swift
class Solution {
    func largestSubmatrix(_ matrix: [[Int]]) -> Int {
        var matrix = matrix
        let ROWS = matrix.count, COLS = matrix[0].count
        var res = 0
        var prevHeights = [Int]()

        for r in 0..<ROWS {
            var heights = [Int]()

            for c in prevHeights {
                if matrix[r][c] == 1 {
                    matrix[r][c] += matrix[r - 1][c]
                    heights.append(c)
                }
            }

            for c in 0..<COLS {
                if matrix[r][c] == 1 {
                    heights.append(c)
                }
            }

            for (i, c) in heights.enumerated() {
                res = max(res, (i + 1) * matrix[r][c])
            }

            prevHeights = heights
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(n)$

> Where $m$ is the number of rows and $n$ is the number of columns.
