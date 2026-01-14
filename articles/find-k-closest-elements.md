## 1. Sorting (Custom Comparator)

### Intuition

The problem asks for the `k` elements closest to `x`. A straightforward approach is to sort all elements by their distance to `x`. If two elements have the same distance, we prefer the smaller one. After sorting, we simply take the first `k` elements and return them in sorted order.

### Algorithm

1. Sort the array using a custom comparator that compares elements by their absolute difference from `x`. If two elements have the same distance, the smaller element comes first.
2. Take the first `k` elements from the sorted array.
3. Sort these `k` elements in ascending order (since the output must be sorted).
4. Return the result.

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        arr.sort(key=lambda num: (abs(num - x), num))
        return sorted(arr[:k])
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        List<Integer> list = new ArrayList<>();
        for (int num : arr) {
            list.add(num);
        }

        list.sort((a, b) -> {
            int diff = Math.abs(a - x) - Math.abs(b - x);
            return diff == 0 ? Integer.compare(a, b) : diff;
        });

        List<Integer> result = list.subList(0, k);
        Collections.sort(result);
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        sort(arr.begin(), arr.end(), [x](int a, int b) {
            int diff = abs(a - x) - abs(b - x);
            return diff == 0 ? a < b : diff < 0;
        });
        vector<int> result(arr.begin(), arr.begin() + k);
        sort(result.begin(), result.end());
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        arr.sort((a, b) => {
            const diff = Math.abs(a - x) - Math.abs(b - x);
            return diff === 0 ? a - b : diff;
        });
        const result = arr.slice(0, k);
        return result.sort((a, b) => a - b);
    }
}
```

```csharp
public class Solution {
    public IList<int> FindClosestElements(int[] arr, int k, int x) {
        var list = arr.ToList();
        list.Sort((a, b) => {
            int diff = Math.Abs(a - x) - Math.Abs(b - x);
            return diff == 0 ? a.CompareTo(b) : diff;
        });
        var result = list.Take(k).ToList();
        result.Sort();
        return result;
    }
}
```

```go
func findClosestElements(arr []int, k int, x int) []int {
    sort.Slice(arr, func(i, j int) bool {
        diffI := abs(arr[i] - x)
        diffJ := abs(arr[j] - x)
        if diffI == diffJ {
            return arr[i] < arr[j]
        }
        return diffI < diffJ
    })
    result := arr[:k]
    sort.Ints(result)
    return result
}

func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
}
```

```kotlin
class Solution {
    fun findClosestElements(arr: IntArray, k: Int, x: Int): List<Int> {
        val sorted = arr.sortedWith(compareBy(
            { kotlin.math.abs(it - x) },
            { it }
        ))
        return sorted.take(k).sorted()
    }
}
```

```swift
class Solution {
    func findClosestElements(_ arr: [Int], _ k: Int, _ x: Int) -> [Int] {
        let sorted = arr.sorted { a, b in
            let diffA = abs(a - x)
            let diffB = abs(b - x)
            if diffA == diffB {
                return a < b
            }
            return diffA < diffB
        }
        return Array(sorted.prefix(k)).sorted()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + k \log k)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(k)$ space for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 2. Linear Scan + Two Pointers

### Intuition

Since we need elements closest to `x`, we can first find the element nearest to `x` using a linear scan. Once we have this starting point, we expand outward using two pointers, picking the closer element at each step until we have `k` elements.

### Algorithm

1. Scan through the array to find the index of the element closest to `x`.
2. Initialize the result with that element.
3. Set two pointers: `l` pointing to the index before the closest element, and `r` pointing to the index after.
4. While we have fewer than `k` elements:
   - If both pointers are valid, compare distances and add the closer element.
   - If only the left pointer is valid, add from the left.
   - If only the right pointer is valid, add from the right.
5. Sort the result and return it.

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        n = len(arr)
        idx = 0
        for i in range(1, n):
            if abs(x - arr[idx]) > abs(x - arr[i]):
                idx = i

        res = [arr[idx]]
        l, r = idx - 1, idx + 1

        while len(res) < k:
            if l >= 0 and r < n:
                if abs(x - arr[l]) <= abs(x - arr[r]):
                    res.append(arr[l])
                    l -= 1
                else:
                    res.append(arr[r])
                    r += 1
            elif l >= 0:
                res.append(arr[l])
                l -= 1
            elif r < n:
                res.append(arr[r])
                r += 1

        return sorted(res)
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int n = arr.length;
        int idx = 0;
        for (int i = 1; i < n; i++) {
            if (Math.abs(x - arr[idx]) > Math.abs(x - arr[i])) {
                idx = i;
            }
        }

        List<Integer> res = new ArrayList<>();
        res.add(arr[idx]);
        int l = idx - 1, r = idx + 1;

        while (res.size() < k) {
            if (l >= 0 && r < n) {
                if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                    res.add(arr[l--]);
                } else {
                    res.add(arr[r++]);
                }
            } else if (l >= 0) {
                res.add(arr[l--]);
            } else if (r < n) {
                res.add(arr[r++]);
            }
        }

        Collections.sort(res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int n = arr.size();
        int idx = 0;
        for (int i = 1; i < n; i++) {
            if (abs(x - arr[idx]) > abs(x - arr[i])) {
                idx = i;
            }
        }

        vector<int> res = {arr[idx]};
        int l = idx - 1, r = idx + 1;

        while (res.size() < k) {
            if (l >= 0 && r < n) {
                if (abs(x - arr[l]) <= abs(x - arr[r])) {
                    res.push_back(arr[l--]);
                } else {
                    res.push_back(arr[r++]);
                }
            } else if (l >= 0) {
                res.push_back(arr[l--]);
            } else if (r < n) {
                res.push_back(arr[r++]);
            }
        }

        sort(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        const n = arr.length;
        let idx = 0;
        for (let i = 1; i < n; i++) {
            if (Math.abs(x - arr[idx]) > Math.abs(x - arr[i])) {
                idx = i;
            }
        }

        const res = [arr[idx]];
        let l = idx - 1,
            r = idx + 1;

        while (res.length < k) {
            if (l >= 0 && r < n) {
                if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                    res.push(arr[l--]);
                } else {
                    res.push(arr[r++]);
                }
            } else if (l >= 0) {
                res.push(arr[l--]);
            } else if (r < n) {
                res.push(arr[r++]);
            }
        }

        return res.sort((a, b) => a - b);
    }
}
```

```csharp
public class Solution {
    public IList<int> FindClosestElements(int[] arr, int k, int x) {
        int n = arr.Length;
        int idx = 0;
        for (int i = 1; i < n; i++) {
            if (Math.Abs(x - arr[idx]) > Math.Abs(x - arr[i])) {
                idx = i;
            }
        }

        var res = new List<int> { arr[idx] };
        int l = idx - 1, r = idx + 1;

        while (res.Count < k) {
            if (l >= 0 && r < n) {
                if (Math.Abs(x - arr[l]) <= Math.Abs(x - arr[r])) {
                    res.Add(arr[l--]);
                } else {
                    res.Add(arr[r++]);
                }
            } else if (l >= 0) {
                res.Add(arr[l--]);
            } else if (r < n) {
                res.Add(arr[r++]);
            }
        }

        res.Sort();
        return res;
    }
}
```

```go
func findClosestElements(arr []int, k int, x int) []int {
    n := len(arr)
    idx := 0
    for i := 1; i < n; i++ {
        if abs(x-arr[idx]) > abs(x-arr[i]) {
            idx = i
        }
    }

    res := []int{arr[idx]}
    l, r := idx-1, idx+1

    for len(res) < k {
        if l >= 0 && r < n {
            if abs(x-arr[l]) <= abs(x-arr[r]) {
                res = append(res, arr[l])
                l--
            } else {
                res = append(res, arr[r])
                r++
            }
        } else if l >= 0 {
            res = append(res, arr[l])
            l--
        } else if r < n {
            res = append(res, arr[r])
            r++
        }
    }

    sort.Ints(res)
    return res
}

func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
}
```

```kotlin
class Solution {
    fun findClosestElements(arr: IntArray, k: Int, x: Int): List<Int> {
        val n = arr.size
        var idx = 0
        for (i in 1 until n) {
            if (kotlin.math.abs(x - arr[idx]) > kotlin.math.abs(x - arr[i])) {
                idx = i
            }
        }

        val res = mutableListOf(arr[idx])
        var l = idx - 1
        var r = idx + 1

        while (res.size < k) {
            when {
                l >= 0 && r < n -> {
                    if (kotlin.math.abs(x - arr[l]) <= kotlin.math.abs(x - arr[r])) {
                        res.add(arr[l--])
                    } else {
                        res.add(arr[r++])
                    }
                }
                l >= 0 -> res.add(arr[l--])
                r < n -> res.add(arr[r++])
            }
        }

        return res.sorted()
    }
}
```

```swift
class Solution {
    func findClosestElements(_ arr: [Int], _ k: Int, _ x: Int) -> [Int] {
        let n = arr.count
        var idx = 0
        for i in 1..<n {
            if abs(x - arr[idx]) > abs(x - arr[i]) {
                idx = i
            }
        }

        var res = [arr[idx]]
        var l = idx - 1
        var r = idx + 1

        while res.count < k {
            if l >= 0 && r < n {
                if abs(x - arr[l]) <= abs(x - arr[r]) {
                    res.append(arr[l])
                    l -= 1
                } else {
                    res.append(arr[r])
                    r += 1
                }
            } else if l >= 0 {
                res.append(arr[l])
                l -= 1
            } else if r < n {
                res.append(arr[r])
                r += 1
            }
        }

        return res.sorted()
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + k \log k)$
- Space complexity:
    - $O(1)$ or $O(k)$ space depending on the sorting algorithm.
    - $O(k)$ space for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 3. Two Pointers

### Intuition

Since the array is already sorted, the `k` closest elements must form a contiguous subarray. We can use two pointers starting at the ends of the array and shrink the window by removing the element that is farther from `x` until only `k` elements remain.

### Algorithm

1. Initialize `l = 0` and `r = n - 1`.
2. While `r - l >= k`:
   - Compare the distances of `arr[l]` and `arr[r]` from `x`.
   - Remove the element that is farther by moving the corresponding pointer inward.
   - If distances are equal, prefer the left element (smaller value), so move `r` inward.
3. Return the subarray from index `l` to `r` (inclusive).

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr) - 1
        while r - l >= k:
            if abs(x - arr[l]) <= abs(x - arr[r]):
                r -= 1
            else:
                l += 1

        return arr[l: r + 1]
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.length - 1;
        while (r - l >= k) {
            if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                r--;
            } else {
                l++;
            }
        }
        List<Integer> result = new ArrayList<>();
        for (int i = l; i <= r; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size() - 1;
        while (r - l >= k) {
            if (abs(x - arr[l]) <= abs(x - arr[r])) {
                r--;
            } else {
                l++;
            }
        }
        return vector<int>(arr.begin() + l, arr.begin() + r + 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        let l = 0,
            r = arr.length - 1;
        while (r - l >= k) {
            if (Math.abs(x - arr[l]) <= Math.abs(x - arr[r])) {
                r--;
            } else {
                l++;
            }
        }
        return arr.slice(l, r + 1);
    }
}
```

```csharp
public class Solution {
    public IList<int> FindClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.Length - 1;
        while (r - l >= k) {
            if (Math.Abs(x - arr[l]) <= Math.Abs(x - arr[r])) {
                r--;
            } else {
                l++;
            }
        }
        var result = new List<int>();
        for (int i = l; i <= r; i++) {
            result.Add(arr[i]);
        }
        return result;
    }
}
```

```go
func findClosestElements(arr []int, k int, x int) []int {
    l, r := 0, len(arr)-1
    for r-l >= k {
        if abs(x-arr[l]) <= abs(x-arr[r]) {
            r--
        } else {
            l++
        }
    }
    return arr[l : r+1]
}

func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
}
```

```kotlin
class Solution {
    fun findClosestElements(arr: IntArray, k: Int, x: Int): List<Int> {
        var l = 0
        var r = arr.size - 1
        while (r - l >= k) {
            if (kotlin.math.abs(x - arr[l]) <= kotlin.math.abs(x - arr[r])) {
                r--
            } else {
                l++
            }
        }
        return arr.slice(l..r)
    }
}
```

```swift
class Solution {
    func findClosestElements(_ arr: [Int], _ k: Int, _ x: Int) -> [Int] {
        var l = 0
        var r = arr.count - 1
        while r - l >= k {
            if abs(x - arr[l]) <= abs(x - arr[r]) {
                r -= 1
            } else {
                l += 1
            }
        }
        return Array(arr[l...r])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n - k)$
- Space complexity: $O(k)$ for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 4. Binary Search + Two Pointers

### Intuition

Instead of scanning linearly to find the starting point, we can use binary search to quickly locate where `x` would fit in the sorted array. From that position, we expand outward with two pointers to collect `k` closest elements.

### Algorithm

1. Use binary search to find the leftmost position where `arr[mid] >= x`.
2. Initialize two pointers: `l` pointing one position to the left of this index, and `r` at this index.
3. While we have fewer than `k` elements (i.e., `r - l - 1 < k`):
   - If `l < 0`, expand right.
   - If `r >= n`, expand left.
   - Otherwise, compare distances and expand toward the closer element.
4. Return the subarray from index `l + 1` to `r - 1` (exclusive bounds).

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr) - 1
        while l < r:
            mid = (l + r) // 2
            if arr[mid] < x:
                l = mid + 1
            else:
                r = mid

        l, r = l - 1, l
        while r - l - 1 < k:
            if l < 0:
                r += 1
            elif r >= len(arr):
                l -= 1
            elif abs(arr[l] - x) <= abs(arr[r] - x):
                l -= 1
            else:
                r += 1

        return arr[l + 1:r]
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.length - 1;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        l = l - 1;
        r = l + 1;
        while (r - l - 1 < k) {
            if (l < 0) {
                r++;
            } else if (r >= arr.length) {
                l--;
            } else if (Math.abs(arr[l] - x) <= Math.abs(arr[r] - x)) {
                l--;
            } else {
                r++;
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = l + 1; i < r; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size() - 1;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        l = l - 1;
        r = l + 1;
        while (r - l - 1 < k) {
            if (l < 0) {
                r++;
            } else if (r >= arr.size()) {
                l--;
            } else if (abs(arr[l] - x) <= abs(arr[r] - x)) {
                l--;
            } else {
                r++;
            }
        }

        return vector<int>(arr.begin() + l + 1, arr.begin() + r);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        let l = 0,
            r = arr.length - 1;
        while (l < r) {
            const mid = Math.floor((l + r) / 2);
            if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        l = l - 1;
        r = l + 1;
        while (r - l - 1 < k) {
            if (l < 0) {
                r++;
            } else if (r >= arr.length) {
                l--;
            } else if (Math.abs(arr[l] - x) <= Math.abs(arr[r] - x)) {
                l--;
            } else {
                r++;
            }
        }

        return arr.slice(l + 1, r);
    }
}
```

```csharp
public class Solution {
    public IList<int> FindClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.Length - 1;
        while (l < r) {
            int mid = (l + r) / 2;
            if (arr[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        l = l - 1;
        r = l + 1;
        while (r - l - 1 < k) {
            if (l < 0) {
                r++;
            } else if (r >= arr.Length) {
                l--;
            } else if (Math.Abs(arr[l] - x) <= Math.Abs(arr[r] - x)) {
                l--;
            } else {
                r++;
            }
        }

        var result = new List<int>();
        for (int i = l + 1; i < r; i++) {
            result.Add(arr[i]);
        }
        return result;
    }
}
```

```go
func findClosestElements(arr []int, k int, x int) []int {
    l, r := 0, len(arr)-1
    for l < r {
        mid := (l + r) / 2
        if arr[mid] < x {
            l = mid + 1
        } else {
            r = mid
        }
    }

    l = l - 1
    r = l + 1
    for r-l-1 < k {
        if l < 0 {
            r++
        } else if r >= len(arr) {
            l--
        } else if abs(arr[l]-x) <= abs(arr[r]-x) {
            l--
        } else {
            r++
        }
    }

    return arr[l+1 : r]
}

func abs(a int) int {
    if a < 0 {
        return -a
    }
    return a
}
```

```kotlin
class Solution {
    fun findClosestElements(arr: IntArray, k: Int, x: Int): List<Int> {
        var l = 0
        var r = arr.size - 1
        while (l < r) {
            val mid = (l + r) / 2
            if (arr[mid] < x) {
                l = mid + 1
            } else {
                r = mid
            }
        }

        l = l - 1
        r = l + 1
        while (r - l - 1 < k) {
            when {
                l < 0 -> r++
                r >= arr.size -> l--
                kotlin.math.abs(arr[l] - x) <= kotlin.math.abs(arr[r] - x) -> l--
                else -> r++
            }
        }

        return arr.slice(l + 1 until r)
    }
}
```

```swift
class Solution {
    func findClosestElements(_ arr: [Int], _ k: Int, _ x: Int) -> [Int] {
        var l = 0
        var r = arr.count - 1
        while l < r {
            let mid = (l + r) / 2
            if arr[mid] < x {
                l = mid + 1
            } else {
                r = mid
            }
        }

        l = l - 1
        r = l + 1
        while r - l - 1 < k {
            if l < 0 {
                r += 1
            } else if r >= arr.count {
                l -= 1
            } else if abs(arr[l] - x) <= abs(arr[r] - x) {
                l -= 1
            } else {
                r += 1
            }
        }

        return Array(arr[(l + 1)..<r])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n + k)$
- Space complexity: $O(k)$ for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## 5. Binary Search

### Intuition

We can binary search directly for the starting index of the `k`-length window. For any starting index `m`, we compare the distances of `arr[m]` and `arr[m + k]` to `x`. If `arr[m + k]` is closer, the window should shift right; otherwise, it should stay or shift left. This narrows down the optimal starting position.

### Algorithm

1. Set `l = 0` and `r = n - k` (the rightmost valid starting index).
2. While `l < r`:
   - Compute `m = (l + r) / 2`.
   - Compare `x - arr[m]` with `arr[m + k] - x`.
   - If `x - arr[m] > arr[m + k] - x`, the window is too far left, so set `l = m + 1`.
   - Otherwise, set `r = m`.
3. Return the subarray starting at index `l` with length `k`.

::tabs-start

```python
class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        l, r = 0, len(arr) - k
        while l < r:
            m = (l + r) // 2
            if x - arr[m] > arr[m + k] - x:
                l = m + 1
            else:
                r = m
        return arr[l:l + k]
```

```java
public class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.length - k;
        while (l < r) {
            int m = (l + r) / 2;
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        List<Integer> result = new ArrayList<>();
        for (int i = l; i < l + k; i++) {
            result.add(arr[i]);
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findClosestElements(vector<int>& arr, int k, int x) {
        int l = 0, r = arr.size() - k;
        while (l < r) {
            int m = (l + r) / 2;
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return vector<int>(arr.begin() + l, arr.begin() + l + k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @param {number} x
     * @return {number[]}
     */
    findClosestElements(arr, k, x) {
        let l = 0,
            r = arr.length - k;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return arr.slice(l, l + k);
    }
}
```

```csharp
public class Solution {
    public IList<int> FindClosestElements(int[] arr, int k, int x) {
        int l = 0, r = arr.Length - k;
        while (l < r) {
            int m = (l + r) / 2;
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        var result = new List<int>();
        for (int i = l; i < l + k; i++) {
            result.Add(arr[i]);
        }
        return result;
    }
}
```

```go
func findClosestElements(arr []int, k int, x int) []int {
    l, r := 0, len(arr)-k
    for l < r {
        m := (l + r) / 2
        if x-arr[m] > arr[m+k]-x {
            l = m + 1
        } else {
            r = m
        }
    }
    return arr[l : l+k]
}
```

```kotlin
class Solution {
    fun findClosestElements(arr: IntArray, k: Int, x: Int): List<Int> {
        var l = 0
        var r = arr.size - k
        while (l < r) {
            val m = (l + r) / 2
            if (x - arr[m] > arr[m + k] - x) {
                l = m + 1
            } else {
                r = m
            }
        }
        return arr.slice(l until l + k)
    }
}
```

```swift
class Solution {
    func findClosestElements(_ arr: [Int], _ k: Int, _ x: Int) -> [Int] {
        var l = 0
        var r = arr.count - k
        while l < r {
            let m = (l + r) / 2
            if x - arr[m] > arr[m + k] - x {
                l = m + 1
            } else {
                r = m
            }
        }
        return Array(arr[l..<(l + k)])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log (n - k) + k)$
- Space complexity: $O(k)$ for the output array.

> Where $n$ is the size of the input array and $k$ is the number of closest elements to find.

---

## Common Pitfalls

### Forgetting the Tie-Breaking Rule

When two elements have the same distance to `x`, the problem requires preferring the **smaller** element. A common mistake is treating equal distances arbitrarily or preferring the larger element. This affects both the custom comparator approach and the two-pointer shrinking logic where you should shrink from the right (larger values) when distances are equal.

### Not Returning Results in Sorted Order

The output must be sorted in ascending order. When using approaches that collect elements based on distance (like sorting by distance or expanding from a center point), the collected elements may not be in sorted order. Forgetting to sort the final result before returning leads to incorrect output.

### Incorrect Binary Search Bounds

In the optimized binary search approach, the search range should be `[0, n - k]` for the starting index of the window, not `[0, n - 1]`. Using incorrect bounds can cause the window to extend past the array end or miss valid starting positions, leading to index out of bounds errors or wrong answers.
