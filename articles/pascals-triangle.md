## 1. Combinatorics

### Intuition

Each element in Pascal's Triangle corresponds to a binomial coefficient. The value at row `n` and position `k` is `C(n, k)`. Rather than computing each coefficient from scratch using factorials, we can compute them incrementally. Starting from 1, each subsequent value in a row can be derived by multiplying by `(n - k + 1) / k`.

### Algorithm

1. Initialize an empty result list.
2. For each row `n` from `0` to `numRows - 1`:
   - Start the row with `[1]`.
   - Set `val = 1`.
   - For each position `k` from `1` to `n`:
     - Compute `val = val * (n - k + 1) / k`.
     - Append `val` to the row.
   - Add the completed row to the result.
3. Return the result list.

::tabs-start

```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for n in range(numRows):
            row = [1]
            val = 1
            for k in range(1, n + 1):
                val = val * (n - k + 1) // k
                row.append(val)
            res.append(row)
        return res
```

```java
public class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        for (int n = 0; n < numRows; n++) {
            List<Integer> row = new ArrayList<>();
            row.add(1);
            int val = 1;
            for (int k = 1; k <= n; k++) {
                val = val * (n - k + 1) / k;
                row.add(val);
            }
            res.add(row);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res;
        for (int n = 0; n < numRows; n++) {
            vector<int> row;
            row.push_back(1);
            int val = 1;
            for (int k = 1; k <= n; k++) {
                val = val * (n - k + 1) / k;
                row.push_back(val);
            }
            res.push_back(row);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numRows
     * @return {number[][]}
     */
    generate(numRows) {
        let res = [];
        for (let n = 0; n < numRows; n++) {
            let row = [1];
            let val = 1;
            for (let k = 1; k <= n; k++) {
                val = (val * (n - k + 1)) / k;
                row.push(val);
            }
            res.push(row);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Generate(int numRows) {
        var res = new List<List<int>>();
        for (int n = 0; n < numRows; n++) {
            var row = new List<int> { 1 };
            int val = 1;
            for (int k = 1; k <= n; k++) {
                val = val * (n - k + 1) / k;
                row.Add(val);
            }
            res.Add(row);
        }
        return res;
    }
}
```

```go
func generate(numRows int) [][]int {
    res := make([][]int, 0)
    for n := 0; n < numRows; n++ {
        row := []int{1}
        val := 1
        for k := 1; k <= n; k++ {
            val = val * (n - k + 1) / k
            row = append(row, val)
        }
        res = append(res, row)
    }
    return res
}
```

```kotlin
class Solution {
    fun generate(numRows: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        for (n in 0 until numRows) {
            val row = mutableListOf(1)
            var value = 1
            for (k in 1..n) {
                value = value * (n - k + 1) / k
                row.add(value)
            }
            res.add(row)
        }
        return res
    }
}
```

```swift
class Solution {
    func generate(_ numRows: Int) -> [[Int]] {
        var res = [[Int]]()
        for n in 0..<numRows {
            var row = [1]
            var val = 1
            for k in 1...max(1, n) {
                if k > n { break }
                val = val * (n - k + 1) / k
                row.append(val)
            }
            res.append(row)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 2. Dynamic Programming - I

### Intuition

Each element in Pascal's Triangle (except the edges) is the sum of the two elements directly above it. We can simulate this by padding the previous row with zeros on both ends, then summing adjacent pairs to generate the next row.

### Algorithm

1. Start with the first row `[[1]]`.
2. For each subsequent row:
   - Take the last row and pad it with zeros: `[0] + row + [0]`.
   - Create a new row by summing adjacent elements: `temp[j] + temp[j + 1]`.
   - Append the new row to the result.
3. Return the result after generating `numRows` rows.

::tabs-start

```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = [[1]]

        for i in range(numRows - 1):
            temp = [0] + res[-1] + [0]
            row = []
            for j in range(len(res[-1]) + 1):
                row.append(temp[j] + temp[j + 1])
            res.append(row)
        return res
```

```java
public class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());
        res.get(0).add(1);

        for (int i = 1; i < numRows; i++) {
            List<Integer> temp = new ArrayList<>(res.get(i - 1));
            temp.add(0, 0);
            temp.add(0);
            List<Integer> row = new ArrayList<>();

            for (int j = 0; j < res.get(i - 1).size() + 1; j++) {
                row.add(temp.get(j) + temp.get(j + 1));
            }

            res.add(row);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res = {{1}};

        for (int i = 0; i < numRows - 1; i++) {
            vector<int> temp = {0};
            temp.insert(temp.end(), res.back().begin(), res.back().end());
            temp.push_back(0);
            vector<int> row;
            for (size_t j = 0; j < res.back().size() + 1; j++) {
                row.push_back(temp[j] + temp[j + 1]);
            }
            res.push_back(row);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numRows
     * @return {number[][]}
     */
    generate(numRows) {
        let res = [[1]];

        for (let i = 0; i < numRows - 1; i++) {
            let temp = [0, ...res[res.length - 1], 0];
            let row = [];
            for (let j = 0; j < res[res.length - 1].length + 1; j++) {
                row.push(temp[j] + temp[j + 1]);
            }
            res.push(row);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Generate(int numRows) {
        var res = new List<List<int>>();
        if (numRows <= 0) return res;

        res.Add(new List<int> { 1 });

        for (int i = 1; i < numRows; i++) {
            var prev = res[i - 1];
            var temp = new List<int>(prev);
            temp.Insert(0, 0);
            temp.Add(0);

            var row = new List<int>();
            for (int j = 0; j < prev.Count + 1; j++) {
                row.Add(temp[j] + temp[j + 1]);
            }
            res.Add(row);
        }

        return res;
    }
}
```

```go
func generate(numRows int) [][]int {
    res := [][]int{{1}}

    for i := 0; i < numRows-1; i++ {
        temp := make([]int, len(res[len(res)-1])+2)
        copy(temp[1:], res[len(res)-1])
        row := make([]int, len(res[len(res)-1])+1)
        for j := 0; j < len(row); j++ {
            row[j] = temp[j] + temp[j+1]
        }
        res = append(res, row)
    }
    return res
}
```

```kotlin
class Solution {
    fun generate(numRows: Int): List<List<Int>> {
        val res = mutableListOf(listOf(1))

        for (i in 0 until numRows - 1) {
            val temp = listOf(0) + res.last() + listOf(0)
            val row = mutableListOf<Int>()
            for (j in 0 until res.last().size + 1) {
                row.add(temp[j] + temp[j + 1])
            }
            res.add(row)
        }
        return res
    }
}
```

```swift
class Solution {
    func generate(_ numRows: Int) -> [[Int]] {
        var res = [[1]]

        for i in 0..<numRows - 1 {
            let temp = [0] + res.last! + [0]
            var row = [Int]()
            for j in 0..<res.last!.count + 1 {
                row.append(temp[j] + temp[j + 1])
            }
            res.append(row)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming - II

### Intuition

We directly apply the defining property of Pascal's Triangle: each interior element equals the sum of the two elements above it. The first and last elements of every row are always 1. We build row by row, referencing the previous row for the sums.

### Algorithm

1. Initialize a 2D list where row `i` has `i + 1` elements, all set to 1.
2. For each row from index 2 onward:
   - For each interior position `j` (not the first or last):
     - Set `res[i][j] = res[i - 1][j - 1] + res[i - 1][j]`.
3. Return the completed triangle.

::tabs-start

```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = [[1] * (i + 1) for i in range(numRows)]
        for i in range(2, numRows):
            for j in range(1, i):
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j]
        return res
```

```java
public class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> res = new ArrayList<>();

        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.add(1);
                } else {
                    row.add(res.get(i - 1).get(j - 1) + res.get(i - 1).get(j));
                }
            }
            res.add(row);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> res(numRows);

        for (int i = 0; i < numRows; i++) {
            res[i].resize(i + 1);
            res[i][0] = res[i][i] = 1;
            for (int j = 1; j < i; j++){
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} numRows
     * @return {number[][]}
     */
    generate(numRows) {
        let res = Array.from({ length: numRows }, (_, i) =>
            Array(i + 1).fill(1),
        );

        for (let i = 2; i < numRows; i++) {
            for (let j = 1; j < i; j++) {
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Generate(int numRows) {
        var res = new List<List<int>>();
        for (int i = 0; i < numRows; i++) {
            var row = new List<int>();
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    row.Add(1);
                } else {
                    row.Add(res[i - 1][j - 1] + res[i - 1][j]);
                }
            }
            res.Add(row);
        }
        return res;
    }
}
```

```go
func generate(numRows int) [][]int {
    res := make([][]int, numRows)
    for i := 0; i < numRows; i++ {
        res[i] = make([]int, i+1)
        res[i][0], res[i][i] = 1, 1
        for j := 1; j < i; j++ {
            res[i][j] = res[i-1][j-1] + res[i-1][j]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun generate(numRows: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        for (i in 0 until numRows) {
            val row = MutableList(i + 1) { 1 }
            for (j in 1 until i) {
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            }
            res.add(row)
        }
        return res
    }
}
```

```swift
class Solution {
    func generate(_ numRows: Int) -> [[Int]] {
        var res = [[Int]]()
        for i in 0..<numRows {
            var row = [Int](repeating: 1, count: i + 1)
            for j in 1..<i {
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            }
            res.append(row)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$
