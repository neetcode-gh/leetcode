## 1. Dynamic Programming (Top-Down)

### Intuition

To get row `n`, we need row `n - 1` first. Each row depends on the previous one, with interior elements being the sum of two adjacent elements from above. Recursion naturally models this dependency: we compute the previous row, then build the current row from it.

### Algorithm

1. Base case: If `rowIndex == 0`, return `[1]`.
2. Recursively get the previous row.
3. Start the current row with `[1]`.
4. For each index from `1` to `rowIndex - 1`:
   - Add `prevRow[i - 1] + prevRow[i]` to the current row.
5. Append `1` to complete the row.
6. Return the current `row`.

::tabs-start

```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        if rowIndex == 0:
            return [1]

        curRow = [1]
        prevRow = self.getRow(rowIndex - 1)

        for i in range(1, rowIndex):
            curRow.append(prevRow[i - 1] + prevRow[i])

        curRow.append(1)
        return curRow
```

```java
public class Solution {
    public List<Integer> getRow(int rowIndex) {
        if (rowIndex == 0) return Arrays.asList(1);

        List<Integer> curRow = new ArrayList<>(Arrays.asList(1));
        List<Integer> prevRow = getRow(rowIndex - 1);

        for (int i = 1; i < rowIndex; i++) {
            curRow.add(prevRow.get(i - 1) + prevRow.get(i));
        }

        curRow.add(1);
        return curRow;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        if (rowIndex == 0) return {1};

        vector<int> curRow = {1};
        vector<int> prevRow = getRow(rowIndex - 1);

        for (int i = 1; i < rowIndex; i++) {
            curRow.push_back(prevRow[i - 1] + prevRow[i]);
        }

        curRow.push_back(1);
        return curRow;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} rowIndex
     * @return {number[]}
     */
    getRow(rowIndex) {
        if (rowIndex === 0) return [1];

        let curRow = [1];
        let prevRow = this.getRow(rowIndex - 1);

        for (let i = 1; i < rowIndex; i++) {
            curRow.push(prevRow[i - 1] + prevRow[i]);
        }

        curRow.push(1);
        return curRow;
    }
}
```

```csharp
public class Solution {
    public IList<int> GetRow(int rowIndex) {
        if (rowIndex == 0) return new List<int> { 1 };

        var curRow = new List<int> { 1 };
        var prevRow = GetRow(rowIndex - 1);

        for (int i = 1; i < rowIndex; i++) {
            curRow.Add(prevRow[i - 1] + prevRow[i]);
        }

        curRow.Add(1);
        return curRow;
    }
}
```

```go
func getRow(rowIndex int) []int {
    if rowIndex == 0 {
        return []int{1}
    }

    curRow := []int{1}
    prevRow := getRow(rowIndex - 1)

    for i := 1; i < rowIndex; i++ {
        curRow = append(curRow, prevRow[i-1]+prevRow[i])
    }

    curRow = append(curRow, 1)
    return curRow
}
```

```kotlin
class Solution {
    fun getRow(rowIndex: Int): List<Int> {
        if (rowIndex == 0) return listOf(1)

        val curRow = mutableListOf(1)
        val prevRow = getRow(rowIndex - 1)

        for (i in 1 until rowIndex) {
            curRow.add(prevRow[i - 1] + prevRow[i])
        }

        curRow.add(1)
        return curRow
    }
}
```

```swift
class Solution {
    func getRow(_ rowIndex: Int) -> [Int] {
        if rowIndex == 0 {
            return [1]
        }

        var curRow = [1]
        let prevRow = getRow(rowIndex - 1)

        for i in 1..<rowIndex {
            curRow.append(prevRow[i - 1] + prevRow[i])
        }

        curRow.append(1)
        return curRow
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

### Intuition

We build the entire triangle iteratively from row 0 up to the target row. Each row is constructed using values from the previous row. Though we store all rows, we only need the last one as our answer.

### Algorithm

1. Create a 2D list where row `i` has `i + 1` elements, all initialized to `1`.
2. For each row from index 2 to `rowIndex`:
   - For each interior position `j`:
     - Set `res[i][j] = res[i - 1][j - 1] + res[i - 1][j]`.
3. Return `res[rowIndex]`.

::tabs-start

```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        res = [[1] * (i + 1) for i in range(rowIndex + 1)]
        for i in range(2, rowIndex + 1):
            for j in range(1, i):
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j]
        return res[rowIndex]
```

```java
public class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i <= rowIndex; i++) {
            List<Integer> row = new ArrayList<>(Collections.nCopies(i + 1, 1));
            for (int j = 1; j < i; j++) {
                row.set(j, res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
            }
            res.add(row);
        }
        return res.get(rowIndex);
    }
}
```

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<vector<int>> res(rowIndex + 1);
        for (int i = 0; i <= rowIndex; i++) {
            res[i] = vector<int>(i + 1, 1);
            for (int j = 1; j < i; j++) {
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
            }
        }
        return res[rowIndex];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} rowIndex
     * @return {number[]}
     */
    getRow(rowIndex) {
        const res = Array.from({ length: rowIndex + 1 }, (_, i) =>
            Array(i + 1).fill(1),
        );
        for (let i = 2; i <= rowIndex; i++) {
            for (let j = 1; j < i; j++) {
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
            }
        }
        return res[rowIndex];
    }
}
```

```csharp
public class Solution {
    public IList<int> GetRow(int rowIndex) {
        var res = new List<int[]>();
        for (int i = 0; i <= rowIndex; i++) {
            int[] row = new int[i + 1];
            Array.Fill(row, 1);
            for (int j = 1; j < i; j++) {
                row[j] = res[i - 1][j - 1] + res[i - 1][j];
            }
            res.Add(row);
        }
        return res[rowIndex].ToList();
    }
}
```

```go
func getRow(rowIndex int) []int {
    res := make([][]int, rowIndex+1)
    for i := 0; i <= rowIndex; i++ {
        res[i] = make([]int, i+1)
        for j := 0; j <= i; j++ {
            res[i][j] = 1
        }
        for j := 1; j < i; j++ {
            res[i][j] = res[i-1][j-1] + res[i-1][j]
        }
    }
    return res[rowIndex]
}
```

```kotlin
class Solution {
    fun getRow(rowIndex: Int): List<Int> {
        val res = mutableListOf<MutableList<Int>>()
        for (i in 0..rowIndex) {
            val row = MutableList(i + 1) { 1 }
            for (j in 1 until i) {
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            }
            res.add(row)
        }
        return res[rowIndex]
    }
}
```

```swift
class Solution {
    func getRow(_ rowIndex: Int) -> [Int] {
        var res = [[Int]]()
        for i in 0...rowIndex {
            var row = [Int](repeating: 1, count: i + 1)
            for j in 1..<i {
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            }
            res.append(row)
        }
        return res[rowIndex]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Space Optimized - I)

### Intuition

We only need the previous row to compute the current row, so we don't need to store the entire triangle. We keep one row at a time and build the next row by adding contributions from adjacent elements.

### Algorithm

1. Start with `res = [1]`.
2. For each iteration from `0` to `rowIndex - 1`:
   - Create `nextRow` of size `len(res) + 1`, filled with `0`.
   - For each element in the current row, add its value to `nextRow[j]` and `nextRow[j + 1]`.
   - Replace `res` with `nextRow`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        res = [1]
        for i in range(rowIndex):
            next_row = [0] * (len(res) + 1)
            for j in range(len(res)):
                next_row[j] += res[j]
                next_row[j + 1] += res[j]
            res = next_row
        return res
```

```java
public class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> res = new ArrayList<>();
        res.add(1);
        for (int i = 0; i < rowIndex; i++) {
            List<Integer> nextRow = new ArrayList<>(Collections.nCopies(res.size() + 1, 0));
            for (int j = 0; j < res.size(); j++) {
                nextRow.set(j, nextRow.get(j) + res.get(j));
                nextRow.set(j + 1, nextRow.get(j + 1) + res.get(j));
            }
            res = nextRow;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> res = {1};
        for (int i = 0; i < rowIndex; i++) {
            vector<int> nextRow(res.size() + 1, 0);
            for (int j = 0; j < res.size(); j++) {
                nextRow[j] += res[j];
                nextRow[j + 1] += res[j];
            }
            res = nextRow;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} rowIndex
     * @return {number[]}
     */
    getRow(rowIndex) {
        let res = [1];
        for (let i = 0; i < rowIndex; i++) {
            const nextRow = Array(res.length + 1).fill(0);
            for (let j = 0; j < res.length; j++) {
                nextRow[j] += res[j];
                nextRow[j + 1] += res[j];
            }
            res = nextRow;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> GetRow(int rowIndex) {
        var res = new List<int> { 1 };
        for (int i = 0; i < rowIndex; i++) {
            var nextRow = new List<int>(new int[res.Count + 1]);
            for (int j = 0; j < res.Count; j++) {
                nextRow[j] += res[j];
                nextRow[j + 1] += res[j];
            }
            res = nextRow;
        }
        return res;
    }
}
```

```go
func getRow(rowIndex int) []int {
    res := []int{1}
    for i := 0; i < rowIndex; i++ {
        nextRow := make([]int, len(res)+1)
        for j := 0; j < len(res); j++ {
            nextRow[j] += res[j]
            nextRow[j+1] += res[j]
        }
        res = nextRow
    }
    return res
}
```

```kotlin
class Solution {
    fun getRow(rowIndex: Int): List<Int> {
        var res = mutableListOf(1)
        for (i in 0 until rowIndex) {
            val nextRow = MutableList(res.size + 1) { 0 }
            for (j in res.indices) {
                nextRow[j] += res[j]
                nextRow[j + 1] += res[j]
            }
            res = nextRow
        }
        return res
    }
}
```

```swift
class Solution {
    func getRow(_ rowIndex: Int) -> [Int] {
        var res = [1]
        for _ in 0..<rowIndex {
            var nextRow = [Int](repeating: 0, count: res.count + 1)
            for j in 0..<res.count {
                nextRow[j] += res[j]
                nextRow[j + 1] += res[j]
            }
            res = nextRow
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized - II)

### Intuition

We can update the row in place by iterating from right to left. This ensures we don't overwrite values we still need. Each element becomes the sum of itself and the element to its left, which matches how Pascal's Triangle is built.

### Algorithm

1. Initialize `row` with `rowIndex + 1` elements, all set to `1`.
2. For each row from `1` to `rowIndex - 1`:
   - Iterate from index `i` down to `1`:
     - Add `row[j - 1]` to `row[j]`.
3. Return `row`.

::tabs-start

```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        row = [1] * (rowIndex + 1)
        for i in range(1, rowIndex):
            for j in range(i, 0, -1):
                row[j] += row[j - 1]
        return row
```

```java
public class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<>(Collections.nCopies(rowIndex + 1, 1));
        for (int i = 1; i < rowIndex; i++) {
            for (int j = i; j > 0; j--) {
                row.set(j, row.get(j) + row.get(j - 1));
            }
        }
        return row;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> row(rowIndex + 1, 1);
        for (int i = 1; i < rowIndex; i++) {
            for (int j = i; j > 0; j--) {
                row[j] += row[j - 1];
            }
        }
        return row;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} rowIndex
     * @return {number[]}
     */
    getRow(rowIndex) {
        const row = Array(rowIndex + 1).fill(1);
        for (let i = 1; i < rowIndex; i++) {
            for (let j = i; j > 0; j--) {
                row[j] += row[j - 1];
            }
        }
        return row;
    }
}
```

```csharp
public class Solution {
    public IList<int> GetRow(int rowIndex) {
        var row = new List<int>(new int[rowIndex + 1]);
        for (int i = 0; i <= rowIndex; i++) row[i] = 1;
        for (int i = 1; i < rowIndex; i++) {
            for (int j = i; j > 0; j--) {
                row[j] += row[j - 1];
            }
        }
        return row;
    }
}
```

```go
func getRow(rowIndex int) []int {
    row := make([]int, rowIndex+1)
    for i := range row {
        row[i] = 1
    }
    for i := 1; i < rowIndex; i++ {
        for j := i; j > 0; j-- {
            row[j] += row[j-1]
        }
    }
    return row
}
```

```kotlin
class Solution {
    fun getRow(rowIndex: Int): List<Int> {
        val row = MutableList(rowIndex + 1) { 1 }
        for (i in 1 until rowIndex) {
            for (j in i downTo 1) {
                row[j] += row[j - 1]
            }
        }
        return row
    }
}
```

```swift
class Solution {
    func getRow(_ rowIndex: Int) -> [Int] {
        var row = [Int](repeating: 1, count: rowIndex + 1)
        for i in 1..<rowIndex {
            for j in stride(from: i, through: 1, by: -1) {
                row[j] += row[j - 1]
            }
        }
        return row
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Combinatorics

### Intuition

The values in row `n` of Pascal's Triangle are the binomial coefficients `C(n, 0)`, `C(n, 1)`, ..., `C(n, n)`. We can compute each coefficient incrementally from the previous one using the formula: `C(n, k) = C(n, k - 1) * (n - k + 1) / k`.

### Algorithm

1. Start with `row = [1]`.
2. For each `i` from `1` to `rowIndex`:
   - Compute the next value as `row[last] * (rowIndex - i + 1) / i`.
   - Append it to the `row`.
3. Return `row`.

::tabs-start

```python
class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        row = [1]
        for i in range(1, rowIndex + 1):
            row.append(row[-1] * (rowIndex - i + 1) // i)
        return row
```

```java
public class Solution {
    public List<Integer> getRow(int rowIndex) {
        List<Integer> row = new ArrayList<>();
        row.add(1);
        for (int i = 1; i <= rowIndex; i++) {
            row.add((int)((long)row.get(row.size() - 1) * (rowIndex - i + 1) / i));
        }
        return row;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getRow(int rowIndex) {
        vector<int> row = {1};
        for (int i = 1; i <= rowIndex; i++) {
            row.push_back(int(row.back() * 1LL * (rowIndex - i + 1) / i));
        }
        return row;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} rowIndex
     * @return {number[]}
     */
    getRow(rowIndex) {
        const row = [1];
        for (let i = 1; i <= rowIndex; i++) {
            row.push(
                Math.floor((row[row.length - 1] * (rowIndex - i + 1)) / i),
            );
        }
        return row;
    }
}
```

```csharp
public class Solution {
    public IList<int> GetRow(int rowIndex) {
        var row = new List<int> { 1 };
        for (int i = 1; i <= rowIndex; i++) {
            row.Add((int)((long)row[row.Count - 1] * (rowIndex - i + 1) / i));
        }
        return row;
    }
}
```

```go
func getRow(rowIndex int) []int {
    row := []int{1}
    for i := 1; i <= rowIndex; i++ {
        row = append(row, row[len(row)-1]*(rowIndex-i+1)/i)
    }
    return row
}
```

```kotlin
class Solution {
    fun getRow(rowIndex: Int): List<Int> {
        val row = mutableListOf(1)
        for (i in 1..rowIndex) {
            row.add((row.last().toLong() * (rowIndex - i + 1) / i).toInt())
        }
        return row
    }
}
```

```swift
class Solution {
    func getRow(_ rowIndex: Int) -> [Int] {
        var row = [1]
        for i in 1...rowIndex {
            row.append(row.last! * (rowIndex - i + 1) / i)
        }
        return row
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
