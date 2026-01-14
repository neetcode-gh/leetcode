## 1. Brute Force

### Intuition

The simplest approach is to scan through the mountain array from left to right. Since we need the minimum index, returning the first occurrence guarantees the correct answer. This works because a linear scan naturally encounters smaller indices first.

### Algorithm

1. Get the length of the mountain array.
2. Iterate through each index from `0` to `n - 1`.
3. For each index, call `get(i)` and compare with the target.
4. Return the index immediately upon finding a match.
5. If no match is found after the full scan, return `-1`.

::tabs-start

```python
# """
# This is MountainArray's API interface.
# You should not implement it, or speculate about its implementation
# """
#class MountainArray:
#    def get(self, index: int) -> int:
#    def length(self) -> int:

class Solution:
    def findInMountainArray(self, target: int, mountainArr: 'MountainArray') -> int:
        n = mountainArr.length()

        for i in range(n):
            if mountainArr.get(i) == target:
                return i

        return -1
```

```java
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface MountainArray {
 *     public int get(int index) {}
 *     public int length() {}
 * }
 */

public class Solution {
    public int findInMountainArray(int target, MountainArray mountainArr) {
        int n = mountainArr.length();

        for (int i = 0; i < n; i++) {
            if (mountainArr.get(i) == target) {
                return i;
            }
        }

        return -1;
    }
}
```

```cpp
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *   public:
 *     int get(int index);
 *     int length();
 * };
 */

class Solution {
public:
    int findInMountainArray(int target, MountainArray &mountainArr) {
        int n = mountainArr.length();

        for (int i = 0; i < n; i++) {
            if (mountainArr.get(i) == target) {
                return i;
            }
        }

        return -1;
    }
};
```

```javascript
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     @param {number} index
 *     @return {number}
 *     get(index) {
 *         ...
 *     }
 *
 *     @return {number}
 *     length() {
 *         ...
 *     }
 * }
 */

class Solution {
    /**
     * @param {number} target
     * @param {MountainArray} mountainArr
     * @return {number}
     */
    findInMountainArray(target, mountainArr) {
        let n = mountainArr.length();

        for (let i = 0; i < n; i++) {
            if (mountainArr.get(i) === target) {
                return i;
            }
        }

        return -1;
    }
}
```

```csharp
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     public int Get(int index) {}
 *     public int Length() {}
 * }
 */

class Solution {
    public int FindInMountainArray(int target, MountainArray mountainArr) {
        int n = mountainArr.Length();

        for (int i = 0; i < n; i++) {
            if (mountainArr.Get(i) == target) {
                return i;
            }
        }

        return -1;
    }
}
```

```go
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * type MountainArray struct {
 * }
 * func (this *MountainArray) get(index int) int {}
 * func (this *MountainArray) length() int {}
 */

func findInMountainArray(target int, mountainArr *MountainArray) int {
    n := mountainArr.length()

    for i := 0; i < n; i++ {
        if mountainArr.get(i) == target {
            return i
        }
    }

    return -1
}
```

```kotlin
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     fun get(index: Int): Int {}
 *     fun length(): Int {}
 * }
 */

class Solution {
    fun findInMountainArray(target: Int, mountainArr: MountainArray): Int {
        val n = mountainArr.length()

        for (i in 0 until n) {
            if (mountainArr.get(i) == target) {
                return i
            }
        }

        return -1
    }
}
```

```swift
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     public func get(_ index: Int) -> Int {}
 *     public func length() -> Int {}
 * }
 */

class Solution {
    func findInMountainArray(_ target: Int, _ mountainArr: MountainArray) -> Int {
        let n = mountainArr.length()

        for i in 0..<n {
            if mountainArr.get(i) == target {
                return i
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Binary Search

### Intuition

A mountain array has a peak element with strictly increasing values to its left and strictly decreasing values to its right. This structure allows us to use binary search three times: first to find the peak, then to search the ascending left portion, and finally the descending right portion. We search the left side first because we need the minimum index, and values on the left have smaller indices than equivalent values on the right.

### Algorithm

1. **Find the peak**: Use binary search comparing `mid` with its neighbors. If values are increasing, search right; if decreasing, search left; otherwise, we found the peak.
2. **Search the ascending portion** (indices `0` to `peak`): Standard binary search where smaller values are on the left.
3. If found in step 2, return that index (it will be the minimum index).
4. **Search the descending portion** (indices `peak` to `n - 1`): Modified binary search where smaller values are on the right.
5. Return the result from step 4, or `-1` if not found.

::tabs-start

```python
# """
# This is MountainArray's API interface.
# You should not implement it, or speculate about its implementation
# """
#class MountainArray:
#    def get(self, index: int) -> int:
#    def length(self) -> int:

class Solution:
    def findInMountainArray(self, target: int, mountainArr: 'MountainArray') -> int:
        length = mountainArr.length()

        # Find Peak
        l, r = 1, length - 2
        while l <= r:
            m = (l + r) // 2
            left, mid, right = mountainArr.get(m - 1), mountainArr.get(m), mountainArr.get(m + 1)
            if left < mid < right:
                l = m + 1
            elif left > mid > right:
                r = m - 1
            else:
                break
        peak = m

        # Search left portion
        l, r = 0, peak - 1
        while l <= r:
            m = (l + r) // 2
            val = mountainArr.get(m)
            if val < target:
                l = m + 1
            elif val > target:
                r = m - 1
            else:
                return m

        # Search right portion
        l, r = peak, length - 1
        while l <= r:
            m = (l + r) // 2
            val = mountainArr.get(m)
            if val > target:
                l = m + 1
            elif val < target:
                r = m - 1
            else:
                return m

        return -1
```

```java
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface MountainArray {
 *     public int get(int index) {}
 *     public int length() {}
 * }
 */

public class Solution {
    public int findInMountainArray(int target, MountainArray mountainArr) {
        int length = mountainArr.length();

        // Find Peak
        int l = 1, r = length - 2, peak = 0;
        while (l <= r) {
            int m = (l + r) / 2;
            int left = mountainArr.get(m - 1);
            int mid = mountainArr.get(m);
            int right = mountainArr.get(m + 1);
            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        l = 0;
        r = peak - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            int val = mountainArr.get(m);
            if (val < target) {
                l = m + 1;
            } else if (val > target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        // Search right portion
        l = peak;
        r = length - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            int val = mountainArr.get(m);
            if (val > target) {
                l = m + 1;
            } else if (val < target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        return -1;
    }
}
```

```cpp
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *   public:
 *     int get(int index);
 *     int length();
 * };
 */

class Solution {
public:
    int findInMountainArray(int target, MountainArray &mountainArr) {
        int length = mountainArr.length();

        // Find Peak
        int l = 1, r = length - 2, peak = 0;
        while (l <= r) {
            int m = (l + r) / 2;
            int left = mountainArr.get(m - 1);
            int mid = mountainArr.get(m);
            int right = mountainArr.get(m + 1);
            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        l = 0;
        r = peak - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            int val = mountainArr.get(m);
            if (val < target) {
                l = m + 1;
            } else if (val > target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        // Search right portion
        l = peak;
        r = length - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            int val = mountainArr.get(m);
            if (val > target) {
                l = m + 1;
            } else if (val < target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        return -1;
    }
};
```

```javascript
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     @param {number} index
 *     @return {number}
 *     get(index) {
 *         ...
 *     }
 *
 *     @return {number}
 *     length() {
 *         ...
 *     }
 * }
 */

class Solution {
    /**
     * @param {number} target
     * @param {MountainArray} mountainArr
     * @return {number}
     */
    findInMountainArray(target, mountainArr) {
        const length = mountainArr.length();

        // Find Peak
        let l = 1,
            r = length - 2,
            peak = 0;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            const left = mountainArr.get(m - 1);
            const mid = mountainArr.get(m);
            const right = mountainArr.get(m + 1);
            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        l = 0;
        r = peak - 1;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            const val = mountainArr.get(m);
            if (val < target) {
                l = m + 1;
            } else if (val > target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        // Search right portion
        l = peak;
        r = length - 1;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            const val = mountainArr.get(m);
            if (val > target) {
                l = m + 1;
            } else if (val < target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        return -1;
    }
}
```

```csharp
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     public int Get(int index) {}
 *     public int Length() {}
 * }
 */

class Solution {
    public int FindInMountainArray(int target, MountainArray mountainArr) {
        int length = mountainArr.Length();

        // Find Peak
        int l = 1, r = length - 2, peak = 0;
        while (l <= r) {
            int m = (l + r) / 2;
            int left = mountainArr.Get(m - 1);
            int mid = mountainArr.Get(m);
            int right = mountainArr.Get(m + 1);
            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        l = 0;
        r = peak - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            int val = mountainArr.Get(m);
            if (val < target) {
                l = m + 1;
            } else if (val > target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        // Search right portion
        l = peak;
        r = length - 1;
        while (l <= r) {
            int m = (l + r) / 2;
            int val = mountainArr.Get(m);
            if (val > target) {
                l = m + 1;
            } else if (val < target) {
                r = m - 1;
            } else {
                return m;
            }
        }

        return -1;
    }
}
```

```go
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * type MountainArray struct {
 * }
 * func (this *MountainArray) get(index int) int {}
 * func (this *MountainArray) length() int {}
 */

func findInMountainArray(target int, mountainArr *MountainArray) int {
    length := mountainArr.length()

    // Find Peak
    l, r, peak := 1, length-2, 0
    for l <= r {
        m := (l + r) / 2
        left := mountainArr.get(m - 1)
        mid := mountainArr.get(m)
        right := mountainArr.get(m + 1)
        if left < mid && mid < right {
            l = m + 1
        } else if left > mid && mid > right {
            r = m - 1
        } else {
            peak = m
            break
        }
    }

    // Search left portion
    l, r = 0, peak-1
    for l <= r {
        m := (l + r) / 2
        val := mountainArr.get(m)
        if val < target {
            l = m + 1
        } else if val > target {
            r = m - 1
        } else {
            return m
        }
    }

    // Search right portion
    l, r = peak, length-1
    for l <= r {
        m := (l + r) / 2
        val := mountainArr.get(m)
        if val > target {
            l = m + 1
        } else if val < target {
            r = m - 1
        } else {
            return m
        }
    }

    return -1
}
```

```kotlin
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     fun get(index: Int): Int {}
 *     fun length(): Int {}
 * }
 */

class Solution {
    fun findInMountainArray(target: Int, mountainArr: MountainArray): Int {
        val length = mountainArr.length()

        // Find Peak
        var l = 1
        var r = length - 2
        var peak = 0
        while (l <= r) {
            val m = (l + r) / 2
            val left = mountainArr.get(m - 1)
            val mid = mountainArr.get(m)
            val right = mountainArr.get(m + 1)
            if (left < mid && mid < right) {
                l = m + 1
            } else if (left > mid && mid > right) {
                r = m - 1
            } else {
                peak = m
                break
            }
        }

        // Search left portion
        l = 0
        r = peak - 1
        while (l <= r) {
            val m = (l + r) / 2
            val v = mountainArr.get(m)
            if (v < target) {
                l = m + 1
            } else if (v > target) {
                r = m - 1
            } else {
                return m
            }
        }

        // Search right portion
        l = peak
        r = length - 1
        while (l <= r) {
            val m = (l + r) / 2
            val v = mountainArr.get(m)
            if (v > target) {
                l = m + 1
            } else if (v < target) {
                r = m - 1
            } else {
                return m
            }
        }

        return -1
    }
}
```

```swift
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     public func get(_ index: Int) -> Int {}
 *     public func length() -> Int {}
 * }
 */

class Solution {
    func findInMountainArray(_ target: Int, _ mountainArr: MountainArray) -> Int {
        let length = mountainArr.length()

        // Find Peak
        var l = 1
        var r = length - 2
        var peak = 0
        while l <= r {
            let m = (l + r) / 2
            let left = mountainArr.get(m - 1)
            let mid = mountainArr.get(m)
            let right = mountainArr.get(m + 1)
            if left < mid && mid < right {
                l = m + 1
            } else if left > mid && mid > right {
                r = m - 1
            } else {
                peak = m
                break
            }
        }

        // Search left portion
        l = 0
        r = peak - 1
        while l <= r {
            let m = (l + r) / 2
            let val = mountainArr.get(m)
            if val < target {
                l = m + 1
            } else if val > target {
                r = m - 1
            } else {
                return m
            }
        }

        // Search right portion
        l = peak
        r = length - 1
        while l <= r {
            let m = (l + r) / 2
            let val = mountainArr.get(m)
            if val > target {
                l = m + 1
            } else if val < target {
                r = m - 1
            } else {
                return m
            }
        }

        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Binary Search + Caching

### Intuition

The MountainArray API may have limited calls or expensive operations. During peak-finding, we query values at `mid - 1`, `mid`, and `mid + 1`, and some of these indices may be queried again in subsequent binary searches. By caching previously retrieved values, we avoid redundant API calls. This is particularly useful when the peak-finding phase overlaps with the search regions.

### Algorithm

1. Create a cache (hash map) to store retrieved values.
2. Implement a cached `get` function that checks the cache before calling the API.
3. **Find the peak** using binary search with the cached getter.
4. Implement a generic binary search helper that takes an `ascending` parameter to handle both increasing and decreasing portions.
5. Search the ascending left portion first; if found, return immediately.
6. Search the descending right portion and return the result.

::tabs-start

```python
# """
# This is MountainArray's API interface.
# You should not implement it, or speculate about its implementation
# """
#class MountainArray:
#    def get(self, index: int) -> int:
#    def length(self) -> int:

class Solution:
    def findInMountainArray(self, target: int, mountainArr: 'MountainArray') -> int:
        length = mountainArr.length()
        cache = {}

        def get(i):
            if i not in cache:
                cache[i] = mountainArr.get(i)
            return cache[i]

        # Find Peak
        l, r = 1, length - 2
        while l <= r:
            m = (l + r) >> 1
            left, mid, right = get(m - 1), get(m), get(m + 1)
            if left < mid < right:
                l = m + 1
            elif left > mid > right:
                r = m - 1
            else:
                break
        peak = m

        def binary_search(l, r, ascending):
            while l <= r:
                m = (l + r) >> 1
                val = get(m)
                if val == target:
                    return m
                if ascending == (val < target):
                    l = m + 1
                else:
                    r = m - 1
            return -1

        # Search left portion
        res = binary_search(0, peak, True)
        if res != -1:
            return res

        # Search right portion
        return binary_search(peak, length - 1, False)
```

```java
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface MountainArray {
 *     public int get(int index) {}
 *     public int length() {}
 * }
 */

public class Solution {
    private Map<Integer, Integer> cache = new HashMap<>();

    private int get(int index, MountainArray mountainArr) {
        if (!cache.containsKey(index)) {
            cache.put(index, mountainArr.get(index));
        }
        return cache.get(index);
    }

    private int binarySearch(int l, int r, boolean ascending, MountainArray mountainArr, int target) {
        while (l <= r) {
            int m = (l + r) >> 1;
            int val = get(m, mountainArr);
            if (val == target) {
                return m;
            }
            if (ascending == (val < target)) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return -1;
    }

    public int findInMountainArray(int target, MountainArray mountainArr) {
        int length = mountainArr.length();

        // Find Peak
        int l = 1, r = length - 2, peak = 0;
        while (l <= r) {
            int m = (l + r) >> 1;
            int left = get(m - 1, mountainArr);
            int mid = get(m, mountainArr);
            int right = get(m + 1, mountainArr);
            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        int res = binarySearch(0, peak, true, mountainArr, target);
        if (res != -1) {
            return res;
        }

        // Search right portion
        return binarySearch(peak, length - 1, false, mountainArr, target);
    }
}
```

```cpp
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *   public:
 *     int get(int index);
 *     int length();
 * };
 */

class Solution {
private:
    unordered_map<int, int> cache;

    int get(int index, MountainArray &mountainArr) {
        if (cache.find(index) == cache.end()) {
            cache[index] = mountainArr.get(index);
        }
        return cache[index];
    }

    int binarySearch(int l, int r, bool ascending, int target, MountainArray &mountainArr) {
        while (l <= r) {
            int m = (l + r) >> 1;
            int val = get(m, mountainArr);
            if (val == target) {
                return m;
            }
            if (ascending == (val < target)) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return -1;
    }

public:
    int findInMountainArray(int target, MountainArray &mountainArr) {
        int length = mountainArr.length();

        // Find Peak
        int l = 1, r = length - 2, peak = 0;
        while (l <= r) {
            int m = (l + r) >> 1;
            int left = get(m - 1, mountainArr);
            int mid = get(m, mountainArr);
            int right = get(m + 1, mountainArr);
            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        int res = binarySearch(0, peak, true, target, mountainArr);
        if (res != -1) {
            return res;
        }

        // Search right portion
        return binarySearch(peak, length - 1, false, target, mountainArr);
    }
};
```

```javascript
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     @param {number} index
 *     @return {number}
 *     get(index) {
 *         ...
 *     }
 *
 *     @return {number}
 *     length() {
 *         ...
 *     }
 * }
 */

class Solution {
    /**
     * @param {number} target
     * @param {MountainArray} mountainArr
     * @return {number}
     */
    findInMountainArray(target, mountainArr) {
        const cache = new Map();
        const get = (index) => {
            if (!cache.has(index)) {
                cache.set(index, mountainArr.get(index));
            }
            return cache.get(index);
        };

        const binarySearch = (l, r, ascending) => {
            while (l <= r) {
                const m = Math.floor((l + r) / 2);
                const val = get(m);
                if (val === target) {
                    return m;
                }
                if (ascending === val < target) {
                    l = m + 1;
                } else {
                    r = m - 1;
                }
            }
            return -1;
        };

        const length = mountainArr.length();

        // Find Peak
        let l = 1,
            r = length - 2,
            peak = 0;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            const left = get(m - 1);
            const mid = get(m);
            const right = get(m + 1);
            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        let res = binarySearch(0, peak, true);
        if (res !== -1) {
            return res;
        }

        // Search right portion
        return binarySearch(peak, length - 1, false);
    }
}
```

```csharp
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     public int Get(int index) {}
 *     public int Length() {}
 * }
 */

class Solution {
    private Dictionary<int, int> cache = new Dictionary<int, int>();

    private int Get(int index, MountainArray mountainArr) {
        if (!cache.ContainsKey(index)) {
            cache[index] = mountainArr.Get(index);
        }
        return cache[index];
    }

    private int BinarySearch(int l, int r, bool ascending, MountainArray mountainArr, int target) {
        while (l <= r) {
            int m = (l + r) >> 1;
            int val = Get(m, mountainArr);
            if (val == target) {
                return m;
            }
            if ((ascending && val < target) || (!ascending && val > target)) {
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return -1;
    }

    public int FindInMountainArray(int target, MountainArray mountainArr) {
        int length = mountainArr.Length();

        // Find Peak
        int l = 1, r = length - 2, peak = 0;
        while (l <= r) {
            int m = (l + r) >> 1;
            int left = Get(m - 1, mountainArr);
            int mid = Get(m, mountainArr);
            int right = Get(m + 1, mountainArr);

            if (left < mid && mid < right) {
                l = m + 1;
            } else if (left > mid && mid > right) {
                r = m - 1;
            } else {
                peak = m;
                break;
            }
        }

        // Search left portion
        int res = BinarySearch(0, peak, true, mountainArr, target);
        if (res != -1) return res;

        // Search right portion
        return BinarySearch(peak, length - 1, false, mountainArr, target);
    }
}
```

```go
/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * type MountainArray struct {
 * }
 * func (this *MountainArray) get(index int) int {}
 * func (this *MountainArray) length() int {}
 */

func findInMountainArray(target int, mountainArr *MountainArray) int {
    cache := make(map[int]int)
    length := mountainArr.length()

    get := func(i int) int {
        if _, exists := cache[i]; !exists {
            cache[i] = mountainArr.get(i)
        }
        return cache[i]
    }

    binarySearch := func(l, r int, ascending bool) int {
        for l <= r {
            m := (l + r) >> 1
            val := get(m)
            if val == target {
                return m
            }
            if ascending == (val < target) {
                l = m + 1
            } else {
                r = m - 1
            }
        }
        return -1
    }

    // Find Peak
    l, r, peak := 1, length-2, 0
    for l <= r {
        m := (l + r) >> 1
        left := get(m - 1)
        mid := get(m)
        right := get(m + 1)
        if left < mid && mid < right {
            l = m + 1
        } else if left > mid && mid > right {
            r = m - 1
        } else {
            peak = m
            break
        }
    }

    // Search left portion
    res := binarySearch(0, peak, true)
    if res != -1 {
        return res
    }

    // Search right portion
    return binarySearch(peak, length-1, false)
}
```

```kotlin
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     fun get(index: Int): Int {}
 *     fun length(): Int {}
 * }
 */

class Solution {
    fun findInMountainArray(target: Int, mountainArr: MountainArray): Int {
        val cache = HashMap<Int, Int>()
        val length = mountainArr.length()

        fun get(i: Int): Int {
            if (!cache.containsKey(i)) {
                cache[i] = mountainArr.get(i)
            }
            return cache[i]!!
        }

        fun binarySearch(left: Int, right: Int, ascending: Boolean): Int {
            var l = left
            var r = right
            while (l <= r) {
                val m = (l + r) shr 1
                val v = get(m)
                if (v == target) return m
                if (ascending == (v < target)) {
                    l = m + 1
                } else {
                    r = m - 1
                }
            }
            return -1
        }

        // Find Peak
        var l = 1
        var r = length - 2
        var peak = 0
        while (l <= r) {
            val m = (l + r) shr 1
            val left = get(m - 1)
            val mid = get(m)
            val right = get(m + 1)
            if (left < mid && mid < right) {
                l = m + 1
            } else if (left > mid && mid > right) {
                r = m - 1
            } else {
                peak = m
                break
            }
        }

        // Search left portion
        val res = binarySearch(0, peak, true)
        if (res != -1) return res

        // Search right portion
        return binarySearch(peak, length - 1, false)
    }
}
```

```swift
/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * class MountainArray {
 *     public func get(_ index: Int) -> Int {}
 *     public func length() -> Int {}
 * }
 */

class Solution {
    func findInMountainArray(_ target: Int, _ mountainArr: MountainArray) -> Int {
        var cache = [Int: Int]()
        let length = mountainArr.length()

        func get(_ i: Int) -> Int {
            if cache[i] == nil {
                cache[i] = mountainArr.get(i)
            }
            return cache[i]!
        }

        func binarySearch(_ left: Int, _ right: Int, _ ascending: Bool) -> Int {
            var l = left
            var r = right
            while l <= r {
                let m = (l + r) >> 1
                let val = get(m)
                if val == target { return m }
                if ascending == (val < target) {
                    l = m + 1
                } else {
                    r = m - 1
                }
            }
            return -1
        }

        // Find Peak
        var l = 1
        var r = length - 2
        var peak = 0
        while l <= r {
            let m = (l + r) >> 1
            let left = get(m - 1)
            let mid = get(m)
            let right = get(m + 1)
            if left < mid && mid < right {
                l = m + 1
            } else if left > mid && mid > right {
                r = m - 1
            } else {
                peak = m
                break
            }
        }

        // Search left portion
        let res = binarySearch(0, peak, true)
        if res != -1 { return res }

        // Search right portion
        return binarySearch(peak, length - 1, false)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## Common Pitfalls

### Searching Right Side Before Left Side

Since the problem requires returning the **minimum index** when the target appears multiple times, you must search the ascending (left) portion first. If you search the descending (right) portion first or return the first match found without considering index order, you may return a larger index when a smaller one exists.

### Incorrect Binary Search Direction for Descending Portion

When searching the descending right portion of the mountain, the binary search logic must be reversed. In an ascending array, smaller values are on the left; in a descending array, smaller values are on the right. Forgetting to flip the comparison logic will cause the search to move in the wrong direction.

### Off-by-One Errors in Peak Finding

When finding the peak, the search bounds should be `[1, length - 2]` to ensure safe access to `mid - 1` and `mid + 1`. Using `[0, length - 1]` can cause index out of bounds errors. Additionally, ensure the peak is correctly identified as the element greater than both neighbors, not just one.

### Exceeding API Call Limits

The problem often restricts the number of `get()` calls (e.g., 100 calls). Without caching, you may query the same index multiple times during peak finding and subsequent searches. Implementing a cache to store previously retrieved values prevents exceeding the call limit and avoids time limit issues.

### Not Handling Target at Peak Position

The target might be at the peak itself. If your left portion search excludes the peak and your right portion search also misses it due to boundary conditions, the target at the peak will never be found. Ensure at least one of your searches includes the peak index in its range.
