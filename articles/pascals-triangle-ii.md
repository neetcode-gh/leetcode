## 1. Dynamic Programming (Top-Down)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Bottom-Up)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Space Optimized - I)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Space Optimized - II)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 5. Combinatorics

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
