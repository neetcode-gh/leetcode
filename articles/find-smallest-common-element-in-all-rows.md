## 1. Count Elements

::tabs-start

```python
class Solution:
    def smallestCommonElement(self, mat: List[List[int]]) -> int:
        count = [0] * 10001
        n, m = len(mat), len(mat[0])
        
        for i in range(n):
            for j in range(m):
                count[mat[i][j]] += 1
        
        for k in range(1, 10001):
            if count[k] == n:
                return k
        
        return -1
```

```java
class Solution {
    public int smallestCommonElement(int[][] mat) {
        int count[] = new int[10001];
        int n = mat.length, m = mat[0].length;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                ++count[mat[i][j]];
            }
        }
        for (int k = 1; k <= 10000; ++k) {
            if (count[k] == n) {
                return k;
            }
        } 
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int smallestCommonElement(vector<vector<int>>& mat) {
        int count[10001] = {};
        int n = mat.size(), m = mat[0].size();
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < m; ++j) {
                ++count[mat[i][j]];
            }
        }
        for (int k = 1; k <= 10000; ++k) {
            if (count[k] == n) {
                return k;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat
     * @return {number}
     */
    smallestCommonElement(mat) {
        const count = new Array(10001).fill(0);
        const n = mat.length, m = mat[0].length;
        
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                count[mat[i][j]]++;
            }
        }
        
        for (let k = 1; k <= 10000; k++) {
            if (count[k] === n) {
                return k;
            }
        }
        
        return -1;
    }
}
```

::tabs-end

## 1. Count Elements (Improved)

We can improve the average time complexity if we count elements column-by-column. This way, smaller elements will be counted first, and we can exit as soon as we get to an element that repeats `n` times.

::tabs-start

```python
class Solution:
    def smallestCommonElement(self, mat: List[List[int]]) -> int:
        count = [0] * 10001
        n, m = len(mat), len(mat[0])
        
        for j in range(m):
            for i in range(n):
                count[mat[i][j]] += 1
                if count[mat[i][j]] == n:
                    return mat[i][j]
        
        return -1
```

```java
class Solution {
    public int smallestCommonElement(int[][] mat) {
        int count[] = new int[10001];
        int n = mat.length, m = mat[0].length;
        for (int j = 0; j < m; ++j) {
            for (int i = 0; i < n; ++i) {
                if (++count[mat[i][j]] == n) {
                    return mat[i][j];
                }
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    int smallestCommonElement(vector<vector<int>>& mat) {
        int count[10001] = {};
        int n = mat.size(), m = mat[0].size();
        for (int j = 0; j < m; ++j) {
            for (int i = 0; i < n; ++i) {
                if (++count[mat[i][j]] == n) {
                    return mat[i][j];
                }
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat
     * @return {number}
     */
    smallestCommonElement(mat) {
        const count = new Array(10001).fill(0);
        const n = mat.length, m = mat[0].length;
        
        for (let j = 0; j < m; j++) {
            for (let i = 0; i < n; i++) {
                count[mat[i][j]]++;
                if (count[mat[i][j]] === n) {
                    return mat[i][j];
                }
            }
        }
        
        return -1;
    }
}
```

::tabs-end

## Handling Duplicates

If elements are in non-decreasing order, we'll need to modify these solutions to properly handle duplicates. For example, we return `4` (initial solution) and `7` (improved solution) instead of `5` for this test case:

`[[1,2,3,4,5],[5,7,7,7,7],[5,7,7,7,7],[1,2,4,4,5],[1,2,4,4,5]]`

It's easy to modify these solutions to handle duplicates. Since elements in a row are sorted, we can skip the current element if it's equal to the previous one.

### Time & Space Complexity
- Time complexity: $O(nm)$
- Space complexity:
    - Constrained problem: $O(10000) = O(1)$ constant space.
    - Unconstrained problem: $O(k)$, where $k$ is the number of unique elements.

>  where $m$ is the number of rows and $n$ is the number of columns

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def smallestCommonElement(self, mat: List[List[int]]) -> int:
        n, m = len(mat), len(mat[0])
        
        for j in range(m):
            found = True
            i = 1
            while i < n and found:
                found = self.binarySearch(mat[i], mat[0][j]) >= 0
                i += 1
            
            if found:
                return mat[0][j]
        
        return -1
    

    def binarySearch(self, arr, target):
        left, right = 0, len(arr) - 1
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1 
```

```java
class Solution {
    public int smallestCommonElement(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        for (int j = 0; j < m; ++j) {
            boolean found = true;
            for (int i = 1; i < n && found; ++i) {
                found = Arrays.binarySearch(mat[i], mat[0][j]) >= 0;
            }
            if (found) {
                return mat[0][j];
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
    int smallestCommonElement(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        for (int j = 0; j < m; ++j) {
            bool found = true;
            for (int i = 1; i < n && found; ++i) {
                found = binary_search(begin(mat[i]), end(mat[i]), mat[0][j]);
            }
            if (found) {
                return mat[0][j];
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat
     * @return {number}
     */
    smallestCommonElement(mat) {
        const n = mat.length, m = mat[0].length;
        
        for (let j = 0; j < m; j++) {
            let found = true;
            for (let i = 1; i < n && found; i++) {
                found = this.binarySearch(mat[i], mat[0][j]) >= 0;
            }
            if (found) {
                return mat[0][j];
            }
        }
        
        return -1;
    }
    
    /**
     * @param {number[]} arr
     * @param {number} target
     * @return {number}
     */
    binarySearch(arr, target) {
        let left = 0, right = arr.length - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}
```

::tabs-end

## 2. Binary Search (Improved)

In the solution above, we always search the entire row. We can improve the average time complexity if we start the next search from the position returned by the previous search. We can also return `-1` if all elements in the row are smaller than value we searched for.

::tabs-start

```python
class Solution:
    def smallestCommonElement(self, mat: List[List[int]]) -> int:
        n, m = len(mat), len(mat[0])
        pos = [0] * n
        
        for j in range(m):
            found = True
            i = 1
            while i < n and found:
                pos[i] = self.binarySearch(mat[i], pos[i], m, mat[0][j])
                if pos[i] < 0:
                    found = False
                    pos[i] = -pos[i] - 1
                    if pos[i] >= m:
                        return -1
                i += 1
            
            if found:
                return mat[0][j]
        
        return -1
    

    def binarySearch(self, arr, fromIndex, toIndex, target):
        left, right = fromIndex, toIndex - 1
        while left <= right:
            mid = (left + right) // 2
            if arr[mid] == target:
                return mid
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -(left + 1)  
```

```java
class Solution {
    public int smallestCommonElement(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        int pos[] = new int[n];
        for (int j = 0; j < m; ++j) {
            boolean found = true;
            for (int i = 1; i < n && found; ++i) {
                pos[i] = Arrays.binarySearch(mat[i], pos[i], m, mat[0][j]);
                if (pos[i] < 0) {
                    found = false;
                    pos[i] = -pos[i] - 1;
                    if (pos[i] >= m) {
                        return -1;
                    }
                }
            }
            if (found) {
                return mat[0][j];
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
    int smallestCommonElement(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        vector<int> pos(n);
        for (int j = 0; j < m; ++j) {
            bool found = true;
            for (int i = 1; i < n && found; ++i) {
                pos[i] = lower_bound(begin(mat[i]) + pos[i], end(mat[i]), mat[0][j]) - begin(mat[i]);
                if (pos[i] >= m) {
                    return -1;
                }
                found = mat[i][pos[i]] == mat[0][j];
            }
            if (found) {
                return mat[0][j];
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat
     * @return {number}
     */
    smallestCommonElement(mat) {
        const n = mat.length, m = mat[0].length;
        const pos = new Array(n).fill(0);
        
        for (let j = 0; j < m; j++) {
            let found = true;
            for (let i = 1; i < n && found; i++) {
                pos[i] = this.binarySearch(mat[i], pos[i], m, mat[0][j]);
                if (pos[i] < 0) {
                    found = false;
                    pos[i] = -pos[i] - 1;
                    if (pos[i] >= m) {
                        return -1;
                    }
                }
            }
            if (found) {
                return mat[0][j];
            }
        }
        
        return -1;
    }
    
    /**
     * @param {number[]} arr
     * @param {number} fromIndex
     * @param {number} toIndex
     * @param {number} target
     * @return {number}
     */
    binarySearch(arr, fromIndex, toIndex, target) {
        let left = fromIndex, right = toIndex - 1;
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -(left + 1);
    }
}
```

::tabs-end

## Handling Duplicates

Since we search for an element in each row, this approach works correctly if there are duplicates.

### Time & Space Complexity

- Time complexity: $O(m n \log m)$
- Space complexity:
    - Original Solution: $O(1)$ constant space.
    - Improved Solution: $O(n)$

>  where $m$ is the number of rows and $n$ is the number of columns

---

## 3. Row Positions

::tabs-start

```python
class Solution:
    def smallestCommonElement(self, mat: List[List[int]]) -> int:
        
```

```java
class Solution {
    public int smallestCommonElement(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        int pos[] = new int[n], cur_max = 0, cnt = 0;
        while (true) {
            for (int i = 0; i < n; ++i) {
                while (pos[i] < m && mat[i][pos[i]] < cur_max) {
                    ++pos[i];
                }
                if (pos[i] >= m) {
                    return -1;
                }
                if (mat[i][pos[i]] != cur_max) {
                    cnt = 1;
                    cur_max = mat[i][pos[i]];
                } else if (++cnt == n) {
                    return cur_max;
                }
            }
        }
    }
}
```

```cpp
class Solution {
public:
    int smallestCommonElement(vector<vector<int>>& mat) {
        int n = mat.size(), m = mat[0].size();
        int cur_max = 0, cnt = 0;
        vector<int> pos(n);
        while (true) {
            for (int i = 0; i < n; ++i) {
                while (pos[i] < m && mat[i][pos[i]] < cur_max) {
                    ++pos[i];
                }
                if (pos[i] >= m) {
                    return -1;
                }
                if (cur_max != mat[i][pos[i]]) {
                    cnt = 1;
                    cur_max = mat[i][pos[i]];
                } else if (++cnt == n) {
                    return cur_max;
                }
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} mat
     * @return {number}
     */
    smallestCommonElement(mat) {
        const n = mat.length, m = mat[0].length;
        const pos = new Array(n).fill(0);
        let cur_max = 0, cnt = 0;
        
        while (true) {
            for (let i = 0; i < n; i++) {
                while (pos[i] < m && mat[i][pos[i]] < cur_max) {
                    pos[i]++;
                }
                if (pos[i] >= m) {
                    return -1;
                }
                if (mat[i][pos[i]] !== cur_max) {
                    cnt = 1;
                    cur_max = mat[i][pos[i]];
                } else {
                    cnt++;
                    if (cnt === n) {
                        return cur_max;
                    }
                }
            }
        }
    }
}
```

::tabs-end

## Handling Duplicates

Since we take one element from each row, this approach works correctly if there are duplicates.

### Time & Space Complexity

- Time complexity: $O(nm)$
- Space complexity: $O(n)$

>  where $m$ is the number of rows and $n$ is the number of columns
