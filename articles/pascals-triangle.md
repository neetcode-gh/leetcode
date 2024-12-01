## 1. Combinatorics

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Dynamic Programming - I

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming - II

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
        let res = Array.from({ length: numRows }, (_, i) => Array(i + 1).fill(1));

        for (let i = 2; i < numRows; i++) {
            for (let j = 1; j < i; j++) {
                res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$