## 1. Brute Force

### Intuition

Since the array is sorted, all occurrences of the target will be consecutive. We can scan through the array once, recording the first and last positions where we encounter the target. The first time we see the target, we set both the start and end to that index. For subsequent matches, we only update the end position.

### Algorithm

1. Initialize result array `res = [-1, -1]`.
2. Iterate through the array with index `i`:
   - If `nums[i]` equals the target:
     - If `res[0]` is still `-1`, set both `res[0]` and `res[1]` to `i`.
     - Otherwise, update `res[1]` to `i`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        res = [-1, -1]

        for i, num in enumerate(nums):
            if num == target:
                if res[0] == -1:
                    res[0] = res[1] = i
                else:
                    res[1] = i

        return res
```

```java
public class Solution {
    public int[] searchRange(int[] nums, int target) {
        int[] res = {-1, -1};

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                if (res[0] == -1) {
                    res[0] = res[1] = i;
                } else {
                    res[1] = i;
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
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> res = {-1, -1};

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == target) {
                if (res[0] == -1) {
                    res[0] = res[1] = i;
                } else {
                    res[1] = i;
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
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    searchRange(nums, target) {
        let res = [-1, -1];

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === target) {
                if (res[0] === -1) {
                    res[0] = res[1] = i;
                } else {
                    res[1] = i;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        int[] res = new int[] { -1, -1 };
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == target) {
                if (res[0] == -1) {
                    res[0] = i;
                    res[1] = i;
                } else {
                    res[1] = i;
                }
            }
        }
        return res;
    }
}
```

```go
func searchRange(nums []int, target int) []int {
    res := []int{-1, -1}

    for i, num := range nums {
        if num == target {
            if res[0] == -1 {
                res[0] = i
                res[1] = i
            } else {
                res[1] = i
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun searchRange(nums: IntArray, target: Int): IntArray {
        val res = intArrayOf(-1, -1)

        for (i in nums.indices) {
            if (nums[i] == target) {
                if (res[0] == -1) {
                    res[0] = i
                    res[1] = i
                } else {
                    res[1] = i
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func searchRange(_ nums: [Int], _ target: Int) -> [Int] {
        var res = [-1, -1]

        for i in 0..<nums.count {
            if nums[i] == target {
                if res[0] == -1 {
                    res[0] = i
                    res[1] = i
                } else {
                    res[1] = i
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Binary Search - I

### Intuition

Binary search can find any occurrence of the target in O(log n) time, but we need both the first and last occurrences. The key insight is that when we find the target, instead of returning immediately, we continue searching. For the leftmost occurrence, we search the left half after finding a match. For the rightmost, we search the right half. This gives us two separate binary searches with a bias parameter.

### Algorithm

1. Implement a binary search helper that takes a `leftBias` parameter.
2. When `nums[m] == target`:
   - Record index `m` as a candidate.
   - If `leftBias` is true, continue searching left (`r = m - 1`).
   - Otherwise, continue searching right (`l = m + 1`).
3. Call the helper twice: once with `leftBias = true` for the start position, and once with `leftBias = false` for the end position.
4. Return `[left, right]`.

::tabs-start

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        left = self.binarySearch(nums, target, True)
        right = self.binarySearch(nums, target, False)
        return [left, right]

    def binarySearch(self, nums, target, leftBias):
        l, r = 0, len(nums) - 1
        i = -1
        while l <= r:
            m = (l + r) // 2
            if target > nums[m]:
                l = m + 1
            elif target < nums[m]:
                r = m - 1
            else:
                i = m
                if leftBias:
                    r = m - 1
                else:
                    l = m + 1
        return i
```

```java
public class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = binarySearch(nums, target, true);
        int right = binarySearch(nums, target, false);
        return new int[]{left, right};
    }

    private int binarySearch(int[] nums, int target, boolean leftBias) {
        int l = 0, r = nums.length - 1, i = -1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (target > nums[m]) {
                l = m + 1;
            } else if (target < nums[m]) {
                r = m - 1;
            } else {
                i = m;
                if (leftBias) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        return i;
    }
}
```

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int left = binarySearch(nums, target, true);
        int right = binarySearch(nums, target, false);
        return {left, right};
    }

private:
    int binarySearch(vector<int>& nums, int target, bool leftBias) {
        int l = 0, r = nums.size() - 1, i = -1;
        while (l <= r) {
            int m = (l + r) / 2;
            if (target > nums[m]) {
                l = m + 1;
            } else if (target < nums[m]) {
                r = m - 1;
            } else {
                i = m;
                if (leftBias) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        return i;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    searchRange(nums, target) {
        let left = this.binarySearch(nums, target, true);
        let right = this.binarySearch(nums, target, false);
        return [left, right];
    }

    /**
     * @param {number[]} nums
     * @param {number} target
     * @param {boolean} leftBias
     * @return {number}
     */
    binarySearch(nums, target, leftBias) {
        let l = 0,
            r = nums.length - 1,
            i = -1;
        while (l <= r) {
            let m = Math.floor((l + r) / 2);
            if (target > nums[m]) {
                l = m + 1;
            } else if (target < nums[m]) {
                r = m - 1;
            } else {
                i = m;
                if (leftBias) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        return i;
    }
}
```

```csharp
public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        int left = BinarySearch(nums, target, true);
        int right = BinarySearch(nums, target, false);
        return new int[] { left, right };
    }

    private int BinarySearch(int[] nums, int target, bool leftBias) {
        int l = 0, r = nums.Length - 1, i = -1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            if (target > nums[m]) {
                l = m + 1;
            } else if (target < nums[m]) {
                r = m - 1;
            } else {
                i = m;
                if (leftBias) {
                    r = m - 1;
                } else {
                    l = m + 1;
                }
            }
        }
        return i;
    }
}
```

```go
func searchRange(nums []int, target int) []int {
    left := binarySearch(nums, target, true)
    right := binarySearch(nums, target, false)
    return []int{left, right}
}

func binarySearch(nums []int, target int, leftBias bool) int {
    l, r, i := 0, len(nums)-1, -1
    for l <= r {
        m := (l + r) / 2
        if target > nums[m] {
            l = m + 1
        } else if target < nums[m] {
            r = m - 1
        } else {
            i = m
            if leftBias {
                r = m - 1
            } else {
                l = m + 1
            }
        }
    }
    return i
}
```

```kotlin
class Solution {
    fun searchRange(nums: IntArray, target: Int): IntArray {
        val left = binarySearch(nums, target, true)
        val right = binarySearch(nums, target, false)
        return intArrayOf(left, right)
    }

    private fun binarySearch(nums: IntArray, target: Int, leftBias: Boolean): Int {
        var l = 0
        var r = nums.size - 1
        var i = -1
        while (l <= r) {
            val m = (l + r) / 2
            if (target > nums[m]) {
                l = m + 1
            } else if (target < nums[m]) {
                r = m - 1
            } else {
                i = m
                if (leftBias) {
                    r = m - 1
                } else {
                    l = m + 1
                }
            }
        }
        return i
    }
}
```

```swift
class Solution {
    func searchRange(_ nums: [Int], _ target: Int) -> [Int] {
        let left = binarySearch(nums, target, true)
        let right = binarySearch(nums, target, false)
        return [left, right]
    }

    private func binarySearch(_ nums: [Int], _ target: Int, _ leftBias: Bool) -> Int {
        var l = 0
        var r = nums.count - 1
        var i = -1
        while l <= r {
            let m = (l + r) / 2
            if target > nums[m] {
                l = m + 1
            } else if target < nums[m] {
                r = m - 1
            } else {
                i = m
                if leftBias {
                    r = m - 1
                } else {
                    l = m + 1
                }
            }
        }
        return i
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Binary Search - II

### Intuition

We can use a single style of binary search that finds the insertion point for a value. The insertion point for `target` gives us the first occurrence (if it exists). The insertion point for `target + 1` gives us one past the last occurrence. This approach uses the standard lower-bound binary search pattern, which finds the smallest index where `nums[index] >= target`.

### Algorithm

1. Implement a binary search that finds the leftmost position where `nums[m] >= target`.
2. Find `start = binarySearch(target)`.
3. If `start` equals the array length or `nums[start] != target`, return `[-1, -1]`.
4. Find `end = binarySearch(target + 1) - 1`.
5. Return `[start, end]`.

::tabs-start

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        n = len(nums)

        def binarySearch(target):
            l, r = 0, n
            while l < r:
                m = l + (r - l) // 2
                if nums[m] >= target:
                    r = m
                else:
                    l = m + 1
            return l

        start = binarySearch(target)
        if start == n or nums[start] != target:
            return [-1, -1]

        return [start, binarySearch(target + 1) - 1]
```

```java
public class Solution {
    public int[] searchRange(int[] nums, int target) {
        int n = nums.length;

        int start = binarySearch(nums, target, n);
        if (start == n || nums[start] != target) {
            return new int[]{-1, -1};
        }

        return new int[]{start, binarySearch(nums, target + 1, n) - 1};
    }

    private int binarySearch(int[] nums, int target, int n) {
        int l = 0, r = n;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int n = nums.size();

        int start = binarySearch(nums, target, n);
        if (start == n || nums[start] != target) {
            return {-1, -1};
        }

        return {start, binarySearch(nums, target + 1, n) - 1};
    }

private:
    int binarySearch(vector<int>& nums, int target, int n) {
        int l = 0, r = n;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (nums[m] >= target) {
                r = m;
            } else {
                l = m + 1;
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    searchRange(nums, target) {
        const n = nums.length;

        const binarySearch = (target) => {
            let l = 0,
                r = n;
            while (l < r) {
                let m = Math.floor(l + (r - l) / 2);
                if (nums[m] >= target) {
                    r = m;
                } else {
                    l = m + 1;
                }
            }
            return l;
        };

        let start = binarySearch(target);
        if (start === n || nums[start] !== target) {
            return [-1, -1];
        }

        return [start, binarySearch(target + 1) - 1];
    }
}
```

```csharp
public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        int n = nums.Length;

        int BinarySearch(int t) {
            int l = 0, r = n;
            while (l < r) {
                int m = l + (r - l) / 2;
                if (nums[m] >= t) {
                    r = m;
                } else {
                    l = m + 1;
                }
            }
            return l;
        }

        int start = BinarySearch(target);
        if (start == n || nums[start] != target) {
            return new int[] { -1, -1 };
        }

        int end = BinarySearch(target + 1) - 1;
        return new int[] { start, end };
    }
}
```

```go
func searchRange(nums []int, target int) []int {
    n := len(nums)

    binarySearch := func(t int) int {
        l, r := 0, n
        for l < r {
            m := l + (r-l)/2
            if nums[m] >= t {
                r = m
            } else {
                l = m + 1
            }
        }
        return l
    }

    start := binarySearch(target)
    if start == n || nums[start] != target {
        return []int{-1, -1}
    }

    return []int{start, binarySearch(target+1) - 1}
}
```

```kotlin
class Solution {
    fun searchRange(nums: IntArray, target: Int): IntArray {
        val n = nums.size

        fun binarySearch(t: Int): Int {
            var l = 0
            var r = n
            while (l < r) {
                val m = l + (r - l) / 2
                if (nums[m] >= t) {
                    r = m
                } else {
                    l = m + 1
                }
            }
            return l
        }

        val start = binarySearch(target)
        if (start == n || nums[start] != target) {
            return intArrayOf(-1, -1)
        }

        return intArrayOf(start, binarySearch(target + 1) - 1)
    }
}
```

```swift
class Solution {
    func searchRange(_ nums: [Int], _ target: Int) -> [Int] {
        let n = nums.count

        func binarySearch(_ t: Int) -> Int {
            var l = 0
            var r = n
            while l < r {
                let m = l + (r - l) / 2
                if nums[m] >= t {
                    r = m
                } else {
                    l = m + 1
                }
            }
            return l
        }

        let start = binarySearch(target)
        if start == n || nums[start] != target {
            return [-1, -1]
        }

        return [start, binarySearch(target + 1) - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. In-Built Function

### Intuition

Most programming languages provide built-in functions for binary search that find lower and upper bounds. These functions are optimized and well-tested, making them a practical choice when available. The lower bound gives the first occurrence, and the upper bound (minus one) gives the last occurrence.

### Algorithm

1. Use the language's built-in lower-bound function to find the first position where the target could be inserted.
2. If this position is out of bounds or doesn't contain the target, return `[-1, -1]`.
3. Use the upper-bound function to find the position just after the last occurrence.
4. Return `[lower_bound, upper_bound - 1]`.

::tabs-start

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        left = bisect.bisect_left(nums, target)
        if left >= len(nums) or nums[left] != target:
            return [-1, -1]

        right = bisect.bisect_right(nums, target) - 1
        return [left, right]
```

```java
public class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = findLeft(nums, target);
        if (left == -1) {
            return new int[]{-1, -1};
        }

        int right = findRight(nums, target);
        return new int[]{left, right};
    }

    private int findLeft(int[] nums, int target) {
        // O(n) time in worst case
        int index = Arrays.binarySearch(nums, target);
        if (index < 0) return -1;

        while (index > 0 && nums[index - 1] == target) {
            index--;
        }
        return index;
    }

    private int findRight(int[] nums, int target) {
        // O(n) time in worst case
        int index = Arrays.binarySearch(nums, target);
        if (index < 0) return -1;

        while (index < nums.length - 1 && nums[index + 1] == target) {
            index++;
        }
        return index;
    }
}
```

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int left = lower_bound(nums.begin(), nums.end(), target) - nums.begin();
        if (left == nums.size() || nums[left] != target) {
            return {-1, -1};
        }

        int right = upper_bound(nums.begin(), nums.end(), target) - nums.begin() - 1;
        return {left, right};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    searchRange(nums, target) {
        let left = nums.indexOf(target);
        let right = nums.lastIndexOf(target);

        return left === -1 ? [-1, -1] : [left, right];
    }
}
```

```csharp
public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        int idx = Array.BinarySearch(nums, target);
        if (idx < 0) {
            return new int[] { -1, -1 };
        }

        int first = idx;
        while (first > 0 && nums[first - 1] == target) {
            first--;
        }

        int last = idx;
        while (last < nums.Length - 1 && nums[last + 1] == target) {
            last++;
        }

        return new int[] { first, last };
    }
}
```

```go
func searchRange(nums []int, target int) []int {
    left := sort.SearchInts(nums, target)
    if left >= len(nums) || nums[left] != target {
        return []int{-1, -1}
    }

    right := sort.SearchInts(nums, target+1) - 1
    return []int{left, right}
}
```

```kotlin
class Solution {
    fun searchRange(nums: IntArray, target: Int): IntArray {
        val left = nums.binarySearch(target).let {
            if (it < 0) return intArrayOf(-1, -1)
            var idx = it
            while (idx > 0 && nums[idx - 1] == target) idx--
            idx
        }

        var right = left
        while (right < nums.size - 1 && nums[right + 1] == target) right++

        return intArrayOf(left, right)
    }
}
```

```swift
class Solution {
    func searchRange(_ nums: [Int], _ target: Int) -> [Int] {
        guard let idx = nums.firstIndex(of: target) else {
            return [-1, -1]
        }
        guard let lastIdx = nums.lastIndex(of: target) else {
            return [-1, -1]
        }
        return [idx, lastIdx]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
