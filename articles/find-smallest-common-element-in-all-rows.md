## 1. Count Elements

### Intuition

An element is common to all rows if it appears exactly `n` times across the matrix (once per row, since rows are sorted). We can count occurrences of each element and then scan from smallest to largest to find the first element with count equal to `n`. This works because each row contains distinct elements in sorted order.

### Algorithm

1. Create a count array of size `10001` (given the constraint on element values).
2. Iterate through all elements in the matrix and increment their counts.
3. Scan from `1` to `10000` and return the first element with count equal to `n`.
4. If no such element exists, return `-1`.

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

```csharp
public class Solution {
    public int SmallestCommonElement(int[][] mat) {
        int[] count = new int[10001];
        int n = mat.Length, m = mat[0].Length;

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                count[mat[i][j]]++;
            }
        }

        for (int k = 1; k <= 10000; k++) {
            if (count[k] == n) {
                return k;
            }
        }

        return -1;
    }
}
```

```go
func smallestCommonElement(mat [][]int) int {
    count := make([]int, 10001)
    n, m := len(mat), len(mat[0])

    for i := 0; i < n; i++ {
        for j := 0; j < m; j++ {
            count[mat[i][j]]++
        }
    }

    for k := 1; k <= 10000; k++ {
        if count[k] == n {
            return k
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun smallestCommonElement(mat: Array<IntArray>): Int {
        val count = IntArray(10001)
        val n = mat.size
        val m = mat[0].size

        for (i in 0 until n) {
            for (j in 0 until m) {
                count[mat[i][j]]++
            }
        }

        for (k in 1..10000) {
            if (count[k] == n) {
                return k
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func smallestCommonElement(_ mat: [[Int]]) -> Int {
        var count = [Int](repeating: 0, count: 10001)
        let n = mat.count, m = mat[0].count

        for i in 0..<n {
            for j in 0..<m {
                count[mat[i][j]] += 1
            }
        }

        for k in 1...10000 {
            if count[k] == n {
                return k
            }
        }

        return -1
    }
}
```

::tabs-end

## 1. Count Elements (Improved)

### Intuition

We can improve the average time complexity if we count elements column-by-column. This way, smaller elements will be counted first, and we can exit as soon as we get to an element that repeats `n` times.

### Algorithm

1. Create a count array of size `10001`.
2. Iterate column by column (outer loop), then row by row (inner loop).
3. For each element, increment its count.
4. If the count reaches `n`, return that element immediately.
5. If no common element is found after processing all elements, return `-1`.

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

```csharp
public class Solution {
    public int SmallestCommonElement(int[][] mat) {
        int[] count = new int[10001];
        int n = mat.Length, m = mat[0].Length;

        for (int j = 0; j < m; j++) {
            for (int i = 0; i < n; i++) {
                count[mat[i][j]]++;
                if (count[mat[i][j]] == n) {
                    return mat[i][j];
                }
            }
        }

        return -1;
    }
}
```

```go
func smallestCommonElement(mat [][]int) int {
    count := make([]int, 10001)
    n, m := len(mat), len(mat[0])

    for j := 0; j < m; j++ {
        for i := 0; i < n; i++ {
            count[mat[i][j]]++
            if count[mat[i][j]] == n {
                return mat[i][j]
            }
        }
    }

    return -1
}
```

```kotlin
class Solution {
    fun smallestCommonElement(mat: Array<IntArray>): Int {
        val count = IntArray(10001)
        val n = mat.size
        val m = mat[0].size

        for (j in 0 until m) {
            for (i in 0 until n) {
                count[mat[i][j]]++
                if (count[mat[i][j]] == n) {
                    return mat[i][j]
                }
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func smallestCommonElement(_ mat: [[Int]]) -> Int {
        var count = [Int](repeating: 0, count: 10001)
        let n = mat.count, m = mat[0].count

        for j in 0..<m {
            for i in 0..<n {
                count[mat[i][j]] += 1
                if count[mat[i][j]] == n {
                    return mat[i][j]
                }
            }
        }

        return -1
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

### Intuition

Since each row is sorted, we can use binary search to check if an element exists in a row. We iterate through the first row (which is already sorted from smallest to largest) and for each element, we binary search for it in all other rows. The first element found in all rows is our answer.

### Algorithm

1. Iterate through each element in the first row (from smallest to largest).
2. For each element, use binary search to check if it exists in every other row.
3. If the element is found in all rows, return it.
4. If no common element is found, return `-1`.

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

```csharp
public class Solution {
    public int SmallestCommonElement(int[][] mat) {
        int n = mat.Length, m = mat[0].Length;

        for (int j = 0; j < m; j++) {
            bool found = true;
            for (int i = 1; i < n && found; i++) {
                found = Array.BinarySearch(mat[i], mat[0][j]) >= 0;
            }
            if (found) {
                return mat[0][j];
            }
        }

        return -1;
    }
}
```

```go
func smallestCommonElement(mat [][]int) int {
    n, m := len(mat), len(mat[0])

    for j := 0; j < m; j++ {
        found := true
        for i := 1; i < n && found; i++ {
            found = binarySearch(mat[i], mat[0][j]) >= 0
        }
        if found {
            return mat[0][j]
        }
    }

    return -1
}

func binarySearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    for left <= right {
        mid := (left + right) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}
```

```kotlin
class Solution {
    fun smallestCommonElement(mat: Array<IntArray>): Int {
        val n = mat.size
        val m = mat[0].size

        for (j in 0 until m) {
            var found = true
            var i = 1
            while (i < n && found) {
                found = mat[i].binarySearch(mat[0][j]) >= 0
                i++
            }
            if (found) {
                return mat[0][j]
            }
        }

        return -1
    }
}
```

```swift
class Solution {
    func smallestCommonElement(_ mat: [[Int]]) -> Int {
        let n = mat.count, m = mat[0].count

        for j in 0..<m {
            var found = true
            var i = 1
            while i < n && found {
                found = binarySearch(mat[i], mat[0][j]) >= 0
                i += 1
            }
            if found {
                return mat[0][j]
            }
        }

        return -1
    }

    private func binarySearch(_ arr: [Int], _ target: Int) -> Int {
        var left = 0, right = arr.count - 1
        while left <= right {
            let mid = (left + right) / 2
            if arr[mid] == target {
                return mid
            } else if arr[mid] < target {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return -1
    }
}
```

::tabs-end

## 2. Binary Search (Improved)

### Intuition

In the solution above, we always search the entire row. We can improve the average time complexity if we start the next search from the position returned by the previous search. We can also return `-1` if all elements in the row are smaller than value we searched for.

### Algorithm

1. Maintain a `pos` array to track search starting points for each row.
2. For each element in the first row:
   - Binary search in each other row, starting from the stored position.
   - If not found, update the position to where it would be inserted.
   - If the position exceeds row length, return `-1` (no common element possible).
3. If an element is found in all rows, return it.
4. If no common element is found, return `-1`.

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

```csharp
public class Solution {
    public int SmallestCommonElement(int[][] mat) {
        int n = mat.Length, m = mat[0].Length;
        int[] pos = new int[n];

        for (int j = 0; j < m; j++) {
            bool found = true;
            for (int i = 1; i < n && found; i++) {
                pos[i] = Array.BinarySearch(mat[i], pos[i], m - pos[i], mat[0][j]);
                if (pos[i] < 0) {
                    found = false;
                    pos[i] = ~pos[i];
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

```go
func smallestCommonElement(mat [][]int) int {
    n, m := len(mat), len(mat[0])
    pos := make([]int, n)

    for j := 0; j < m; j++ {
        found := true
        for i := 1; i < n && found; i++ {
            pos[i] = binarySearchRange(mat[i], pos[i], m, mat[0][j])
            if pos[i] < 0 {
                found = false
                pos[i] = -pos[i] - 1
                if pos[i] >= m {
                    return -1
                }
            }
        }
        if found {
            return mat[0][j]
        }
    }

    return -1
}

func binarySearchRange(arr []int, fromIndex, toIndex, target int) int {
    left, right := fromIndex, toIndex-1
    for left <= right {
        mid := (left + right) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -(left + 1)
}
```

```kotlin
class Solution {
    fun smallestCommonElement(mat: Array<IntArray>): Int {
        val n = mat.size
        val m = mat[0].size
        val pos = IntArray(n)

        for (j in 0 until m) {
            var found = true
            var i = 1
            while (i < n && found) {
                pos[i] = binarySearchRange(mat[i], pos[i], m, mat[0][j])
                if (pos[i] < 0) {
                    found = false
                    pos[i] = -pos[i] - 1
                    if (pos[i] >= m) {
                        return -1
                    }
                }
                i++
            }
            if (found) {
                return mat[0][j]
            }
        }

        return -1
    }

    private fun binarySearchRange(arr: IntArray, fromIndex: Int, toIndex: Int, target: Int): Int {
        var left = fromIndex
        var right = toIndex - 1
        while (left <= right) {
            val mid = (left + right) / 2
            if (arr[mid] == target) {
                return mid
            } else if (arr[mid] < target) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return -(left + 1)
    }
}
```

```swift
class Solution {
    func smallestCommonElement(_ mat: [[Int]]) -> Int {
        let n = mat.count, m = mat[0].count
        var pos = [Int](repeating: 0, count: n)

        for j in 0..<m {
            var found = true
            var i = 1
            while i < n && found {
                pos[i] = binarySearchRange(mat[i], pos[i], m, mat[0][j])
                if pos[i] < 0 {
                    found = false
                    pos[i] = -pos[i] - 1
                    if pos[i] >= m {
                        return -1
                    }
                }
                i += 1
            }
            if found {
                return mat[0][j]
            }
        }

        return -1
    }

    private func binarySearchRange(_ arr: [Int], _ fromIndex: Int, _ toIndex: Int, _ target: Int) -> Int {
        var left = fromIndex, right = toIndex - 1
        while left <= right {
            let mid = (left + right) / 2
            if arr[mid] == target {
                return mid
            } else if arr[mid] < target {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return -(left + 1)
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

### Intuition

We can use a two-pointer style approach across all rows. We maintain a `pos` pointer for each row and track the current maximum value seen. When we find a value smaller than the current max, we advance that row's pointer. If all rows have the same value at their current positions, we found our answer. If any row's pointer goes out of bounds, no common element exists.

### Algorithm

1. Initialize a `pos` array with zeros and set `curMax = 0` and `cnt = 0`.
2. Loop through each row:
   - Advance the position while the current element is less than `curMax`.
   - If position exceeds row bounds, return `-1`.
   - If the element differs from `curMax`, reset `cnt = 1` and update `curMax`.
   - Otherwise, increment `cnt`. If `cnt == n`, return `curMax`.
3. Repeat until a common element is found or determined impossible.

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

```csharp
public class Solution {
    public int SmallestCommonElement(int[][] mat) {
        int n = mat.Length, m = mat[0].Length;
        int[] pos = new int[n];
        int curMax = 0, cnt = 0;

        while (true) {
            for (int i = 0; i < n; i++) {
                while (pos[i] < m && mat[i][pos[i]] < curMax) {
                    pos[i]++;
                }
                if (pos[i] >= m) {
                    return -1;
                }
                if (mat[i][pos[i]] != curMax) {
                    cnt = 1;
                    curMax = mat[i][pos[i]];
                } else if (++cnt == n) {
                    return curMax;
                }
            }
        }
    }
}
```

```go
func smallestCommonElement(mat [][]int) int {
    n, m := len(mat), len(mat[0])
    pos := make([]int, n)
    curMax, cnt := 0, 0

    for {
        for i := 0; i < n; i++ {
            for pos[i] < m && mat[i][pos[i]] < curMax {
                pos[i]++
            }
            if pos[i] >= m {
                return -1
            }
            if mat[i][pos[i]] != curMax {
                cnt = 1
                curMax = mat[i][pos[i]]
            } else {
                cnt++
                if cnt == n {
                    return curMax
                }
            }
        }
    }
}
```

```kotlin
class Solution {
    fun smallestCommonElement(mat: Array<IntArray>): Int {
        val n = mat.size
        val m = mat[0].size
        val pos = IntArray(n)
        var curMax = 0
        var cnt = 0

        while (true) {
            for (i in 0 until n) {
                while (pos[i] < m && mat[i][pos[i]] < curMax) {
                    pos[i]++
                }
                if (pos[i] >= m) {
                    return -1
                }
                if (mat[i][pos[i]] != curMax) {
                    cnt = 1
                    curMax = mat[i][pos[i]]
                } else {
                    cnt++
                    if (cnt == n) {
                        return curMax
                    }
                }
            }
        }
    }
}
```

```swift
class Solution {
    func smallestCommonElement(_ mat: [[Int]]) -> Int {
        let n = mat.count, m = mat[0].count
        var pos = [Int](repeating: 0, count: n)
        var curMax = 0, cnt = 0

        while true {
            for i in 0..<n {
                while pos[i] < m && mat[i][pos[i]] < curMax {
                    pos[i] += 1
                }
                if pos[i] >= m {
                    return -1
                }
                if mat[i][pos[i]] != curMax {
                    cnt = 1
                    curMax = mat[i][pos[i]]
                } else {
                    cnt += 1
                    if cnt == n {
                        return curMax
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

---

## Common Pitfalls

### Not Handling Duplicates in Non-Decreasing Arrays

The problem states rows are sorted in strictly increasing order, but if the input contains non-decreasing order (with duplicates), the counting approach breaks. An element appearing twice in one row would be counted twice, potentially reaching the row count `n` without actually being present in all rows.

### Returning the First Element Found Instead of the Smallest

When iterating column-by-column or using binary search, ensure you process elements in order from smallest to largest. If you iterate row-by-row first, you might find a common element that is not the smallest one.

### Off-by-One Errors in Binary Search Bounds

When using the improved binary search with position tracking, be careful with the boundary conditions. Returning `-1` too early when `pos[i] >= m` is correct, but forgetting to update positions properly after a failed search can cause infinite loops or missed elements.
