## 1. Brute Force

::tabs-start

```python
class Solution:
    def maxDistance(self, arrays: list[list[int]]) -> int:
        res = 0
        n = len(arrays)
        for i in range(n - 1):
            for j in range(len(arrays[i])):
                for k in range(i + 1, n):
                    for l in range(len(arrays[k])):
                        res = max(res, abs(arrays[i][j] - arrays[k][l]))
        return res
```

```java
class Solution {
    public int maxDistance(List<List<Integer>> arrays) {
        int res = 0;
        int n = arrays.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < arrays.get(i).size(); j++) {
                for (int k = i + 1; k < n; k++) {
                    for (int l = 0; l < arrays.get(k).size(); l++) {
                        res = Math.max(res, Math.abs(arrays.get(i).get(j) - arrays.get(k).get(l)));
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
    int maxDistance(std::vector<std::vector<int>>& arrays) {
        int res = 0;
        int n = arrays.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < arrays[i].size(); j++) {
                for (int k = i + 1; k < n; k++) {
                    for (int l = 0; l < arrays[k].size(); l++) {
                        res = std::max(res, std::abs(arrays[i][j] - arrays[k][l]));
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
     * @param {number[][]} arrays
     * @return {number}
     */
    maxDistance(arrays) {
        let res = 0;
        const n = arrays.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < arrays[i].length; j++) {
                for (let k = i + 1; k < n; k++) {
                    for (let l = 0; l < arrays[k].length; l++) {
                        res = Math.max(res, Math.abs(arrays[i][j] - arrays[k][l]));
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxDistance(List<List<int>> arrays) {
        int res = 0;
        int n = arrays.Count;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < arrays[i].Count; j++) {
                for (int k = i + 1; k < n; k++) {
                    for (int l = 0; l < arrays[k].Count; l++) {
                        res = Math.Max(res, Math.Abs(arrays[i][j] - arrays[k][l]));
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func maxDistance(arrays [][]int) int {
    res := 0
    n := len(arrays)
    for i := 0; i < n-1; i++ {
        for j := 0; j < len(arrays[i]); j++ {
            for k := i + 1; k < n; k++ {
                for l := 0; l < len(arrays[k]); l++ {
                    diff := arrays[i][j] - arrays[k][l]
                    if diff < 0 {
                        diff = -diff
                    }
                    if diff > res {
                        res = diff
                    }
                }
            }
        }
    }
    return res
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n * x)^2)$
- Space complexity: $O(1)$ extra space used

>  Where $n$ refers to the number of arrays in $arrays$ and $x$ refers to the average number of elements in each array in $arrays$.

---

## 2. Better Brute Force

::tabs-start

```python
class Solution:
    def maxDistance(self, arrays: list[list[int]]) -> int:
        res = 0
        n = len(arrays)
        for i in range(n - 1):
            for j in range(i + 1, n):
                array1 = arrays[i]
                array2 = arrays[j]
                res = max(res, abs(array1[0] - array2[-1]))
                res = max(res, abs(array2[0] - array1[-1]))
        return res
```

```java
class Solution {
    public int maxDistance(List<List<Integer>> arrays) {
        List<Integer> array1, array2;
        int res = 0;
        int n = arrays.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                array1 = arrays.get(i);
                array2 = arrays.get(j);
                res = Math.max(res, Math.abs(array1.get(0) - array2.get(array2.size() - 1)));
                res = Math.max(res, Math.abs(array2.get(0) - array1.get(array1.size() - 1)));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxDistance(std::vector<std::vector<int>>& arrays) {
        std::vector<int> array1, array2;
        int res = 0;
        int n = arrays.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                array1 = arrays[i];
                array2 = arrays[j];
                res = std::max(res, std::abs(array1[0] - array2[array2.size() - 1]));
                res = std::max(res, std::abs(array2[0] - array1[array1.size() - 1]));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} arrays
     * @return {number}
     */
    maxDistance(arrays) {
        let array1, array2;
        let res = 0;
        const n = arrays.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = i + 1; j < n; j++) {
                array1 = arrays[i];
                array2 = arrays[j];
                res = Math.max(res, Math.abs(array1[0] - array2[array2.length - 1]));
                res = Math.max(res, Math.abs(array2[0] - array1[array1.length - 1]));
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxDistance(List<List<int>> arrays) {
        List<int> array1, array2;
        int res = 0;
        int n = arrays.Count;
        for (int i = 0; i < n - 1; i++) {
            for (int j = i + 1; j < n; j++) {
                array1 = arrays[i];
                array2 = arrays[j];
                res = Math.Max(res, Math.Abs(array1[0] - array2[array2.Count - 1]));
                res = Math.Max(res, Math.Abs(array2[0] - array1[array1.Count - 1]));
            }
        }
        return res;
    }
}
```

```go
func maxDistance(arrays [][]int) int {
    var array1, array2 []int
    res := 0
    n := len(arrays)
    for i := 0; i < n-1; i++ {
        for j := i + 1; j < n; j++ {
            array1 = arrays[i]
            array2 = arrays[j]
            res = max(res, abs(array1[0] - array2[len(array2)-1]))
            res = max(res, abs(array2[0] - array1[len(array1)-1]))
        }
    }
    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^2)$
- Space complexity: $O(1)$ extra space used

> Where $n$ is the number of arrays in $arrays$

---

## 3. Single Scan

::tabs-start

```python
class Solution:
    def maxDistance(self, arrays: list[list[int]]) -> int:
        res = 0
        n = len(arrays[0])
        min_val = arrays[0][0]
        max_val = arrays[0][-1]
        for i in range(1, len(arrays)):
            n = len(arrays[i])
            res = max(res, max(abs(arrays[i][n - 1] - min_val), 
                               abs(max_val - arrays[i][0])))
            min_val = min(min_val, arrays[i][0])
            max_val = max(max_val, arrays[i][n - 1])
        return res
```

```java
class Solution {
    public int maxDistance(List<List<Integer>> arrays) {
        int res = 0;
        int n = arrays.get(0).size();
        int min_val = arrays.get(0).get(0);
        int max_val = arrays.get(0).get(arrays.get(0).size() - 1);
        for (int i = 1; i < arrays.size(); i++) {
            n = arrays.get(i).size();
            res = Math.max(res, Math.max(Math.abs(arrays.get(i).get(n - 1) - min_val), 
                                         Math.abs(max_val - arrays.get(i).get(0))));
            min_val = Math.min(min_val, arrays.get(i).get(0));
            max_val = Math.max(max_val, arrays.get(i).get(n - 1));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxDistance(std::vector<std::vector<int>>& arrays) {
        int res = 0;
        int n = arrays[0].size();
        int min_val = arrays[0][0];
        int max_val = arrays[0][arrays[0].size() - 1];
        for (int i = 1; i < arrays.size(); i++) {
            n = arrays[i].size();
            res = std::max(res, std::max(std::abs(arrays[i][n - 1] - min_val), 
                                         std::abs(max_val - arrays[i][0])));
            min_val = std::min(min_val, arrays[i][0]);
            max_val = std::max(max_val, arrays[i][n - 1]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} arrays
     * @return {number}
     */
    maxDistance(arrays) {
        let res = 0;
        let n = arrays[0].length;
        let min_val = arrays[0][0];
        let max_val = arrays[0][arrays[0].length - 1];
        for (let i = 1; i < arrays.length; i++) {
            n = arrays[i].length;
            res = Math.max(res, Math.max(Math.abs(arrays[i][n - 1] - min_val), 
                                         Math.abs(max_val - arrays[i][0])));
            min_val = Math.min(min_val, arrays[i][0]);
            max_val = Math.max(max_val, arrays[i][n - 1]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxDistance(List<List<int>> arrays) {
        int res = 0;
        int n = arrays[0].Count;
        int min_val = arrays[0][0];
        int max_val = arrays[0][arrays[0].Count - 1];
        for (int i = 1; i < arrays.Count; i++) {
            n = arrays[i].Count;
            res = Math.Max(res, Math.Max(Math.Abs(arrays[i][n - 1] - min_val), 
                                         Math.Abs(max_val - arrays[i][0])));
            min_val = Math.Min(min_val, arrays[i][0]);
            max_val = Math.Max(max_val, arrays[i][n - 1]);
        }
        return res;
    }
}
```

```go
func maxDistance(arrays [][]int) int {
    res := 0
    n := len(arrays[0])
    min_val := arrays[0][0]
    max_val := arrays[0][n-1]
    for i := 1; i < len(arrays); i++ {
        n = len(arrays[i])
        res = max(res, max(abs(arrays[i][n-1]-min_val), 
                           abs(max_val-arrays[i][0])))
        min_val = min(min_val, arrays[i][0])
        max_val = max(max_val, arrays[i][n-1])
    }
    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space used

> Where $n$ is the number of arrays in $arrays$
