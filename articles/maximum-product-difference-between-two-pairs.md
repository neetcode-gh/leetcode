## 1. Brute Force

### Intuition

The product difference is `(nums[a] * nums[b]) - (nums[c] * nums[d])` where all four indices are distinct. To maximize this, we want the first product as large as possible and the second product as small as possible. The brute force approach tries all valid combinations of four distinct indices.

### Algorithm

1. Use four nested loops to select indices `a`, `b`, `c`, `d`.
2. Skip any iteration where indices overlap.
3. For each valid combination, compute the product difference.
4. Track and return the maximum difference found.

::tabs-start

```python
class Solution:
    def maxProductDifference(self, nums: List[int]) -> int:
        n, res = len(nums), 0
        for a in range(n):
            for b in range(n):
                if a == b: continue
                for c in range(n):
                    if a == c or b == c: continue
                    for d in range(n):
                        if a == d or b == d or c == d: continue
                        res = max(res, nums[a] * nums[b] - nums[c] * nums[d])
        return res
```

```java
public class Solution {
    public int maxProductDifference(int[] nums) {
        int n = nums.length, res = 0;
        for (int a = 0; a < n; a++) {
            for (int b = 0; b < n; b++) {
                if (a == b) continue;
                for (int c = 0; c < n; c++) {
                    if (a == c || b == c) continue;
                    for (int d = 0; d < n; d++) {
                        if (a == d || b == d || c == d) continue;
                        res = Math.max(res, nums[a] * nums[b] - nums[c] * nums[d]);
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
    int maxProductDifference(vector<int>& nums) {
        int n = nums.size(), res = 0;
        for (int a = 0; a < n; a++) {
            for (int b = 0; b < n; b++) {
                if (a == b) continue;
                for (int c = 0; c < n; c++) {
                    if (a == c || b == c) continue;
                    for (int d = 0; d < n; d++) {
                        if (a == d || b == d || c == d) continue;
                        res = max(res, nums[a] * nums[b] - nums[c] * nums[d]);
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
     * @param {number[]} nums
     * @return {number}
     */
    maxProductDifference(nums) {
        const n = nums.length;
        let res = 0;
        for (let a = 0; a < n; a++) {
            for (let b = 0; b < n; b++) {
                if (a === b) continue;
                for (let c = 0; c < n; c++) {
                    if (a === c || b === c) continue;
                    for (let d = 0; d < n; d++) {
                        if (a === d || b === d || c === d) continue;
                        res = Math.max(
                            res,
                            nums[a] * nums[b] - nums[c] * nums[d],
                        );
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
    public int MaxProductDifference(int[] nums) {
        int n = nums.Length, res = 0;
        for (int a = 0; a < n; a++) {
            for (int b = 0; b < n; b++) {
                if (a == b) continue;
                for (int c = 0; c < n; c++) {
                    if (a == c || b == c) continue;
                    for (int d = 0; d < n; d++) {
                        if (a == d || b == d || c == d) continue;
                        res = Math.Max(res, nums[a] * nums[b] - nums[c] * nums[d]);
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func maxProductDifference(nums []int) int {
    n := len(nums)
    res := 0
    for a := 0; a < n; a++ {
        for b := 0; b < n; b++ {
            if a == b {
                continue
            }
            for c := 0; c < n; c++ {
                if a == c || b == c {
                    continue
                }
                for d := 0; d < n; d++ {
                    if a == d || b == d || c == d {
                        continue
                    }
                    if nums[a]*nums[b]-nums[c]*nums[d] > res {
                        res = nums[a]*nums[b] - nums[c]*nums[d]
                    }
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxProductDifference(nums: IntArray): Int {
        val n = nums.size
        var res = 0
        for (a in 0 until n) {
            for (b in 0 until n) {
                if (a == b) continue
                for (c in 0 until n) {
                    if (a == c || b == c) continue
                    for (d in 0 until n) {
                        if (a == d || b == d || c == d) continue
                        res = maxOf(res, nums[a] * nums[b] - nums[c] * nums[d])
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxProductDifference(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0
        for a in 0..<n {
            for b in 0..<n {
                if a == b { continue }
                for c in 0..<n {
                    if a == c || b == c { continue }
                    for d in 0..<n {
                        if a == d || b == d || c == d { continue }
                        res = max(res, nums[a] * nums[b] - nums[c] * nums[d])
                    }
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(1)$

---

## 2. Sorting

### Intuition

To maximize the product difference, we need the two largest numbers for the first product and the two smallest numbers for the second product. After sorting, these are simply the last two and first two elements.

### Algorithm

1. Sort the array in ascending order.
2. The maximum product is `nums[n-1] * nums[n-2]` (two largest).
3. The minimum product is `nums[0] * nums[1]` (two smallest).
4. Return their difference.

::tabs-start

```python
class Solution:
    def maxProductDifference(self, nums: List[int]) -> int:
        nums.sort()
        return nums[-1] * nums[-2] - nums[0] * nums[1]
```

```java
public class Solution {
    public int maxProductDifference(int[] nums) {
        Arrays.sort(nums);
        return nums[nums.length - 1] * nums[nums.length - 2] - nums[0] * nums[1];
    }
}
```

```cpp
class Solution {
public:
    int maxProductDifference(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        return nums[nums.size() - 1] * nums[nums.size() - 2] - nums[0] * nums[1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProductDifference(nums) {
        nums.sort((a, b) => a - b);
        return (
            nums[nums.length - 1] * nums[nums.length - 2] - nums[0] * nums[1]
        );
    }
}
```

```csharp
public class Solution {
    public int MaxProductDifference(int[] nums) {
        Array.Sort(nums);
        return nums[nums.Length - 1] * nums[nums.Length - 2] - nums[0] * nums[1];
    }
}
```

```go
func maxProductDifference(nums []int) int {
    sort.Ints(nums)
    n := len(nums)
    return nums[n-1]*nums[n-2] - nums[0]*nums[1]
}
```

```kotlin
class Solution {
    fun maxProductDifference(nums: IntArray): Int {
        nums.sort()
        val n = nums.size
        return nums[n - 1] * nums[n - 2] - nums[0] * nums[1]
    }
}
```

```swift
class Solution {
    func maxProductDifference(_ nums: [Int]) -> Int {
        let sorted = nums.sorted()
        let n = sorted.count
        return sorted[n - 1] * sorted[n - 2] - sorted[0] * sorted[1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 3. Two Maximums and Two Minimums

### Intuition

We only need the two largest and two smallest values, so we can find them in a single pass without sorting the entire array. By tracking these four values as we iterate, we achieve linear time complexity.

### Algorithm

1. Initialize `max1`, `max2` to 0 (or the smallest possible values) and `min1`, `min2` to infinity (or the largest possible values).
2. For each number in the array:
   - Update `max1` and `max2` if the current number is among the two largest seen so far.
   - Update `min1` and `min2` if the current number is among the two smallest seen so far.
3. Return `(max1 * max2) - (min1 * min2)`.

::tabs-start

```python
class Solution:
    def maxProductDifference(self, nums: List[int]) -> int:
        max1 = max2 = 0
        min1 = min2 = float('inf')

        for num in nums:
            if num > max1:
                max1, max2 = num, max1
            elif num > max2:
                max2 = num
            if num < min1:
                min1, min2 = num, min1
            elif num < min2:
                min2 = num

        return (max1 * max2) - (min1 * min2)
```

```java
public class Solution {
    public int maxProductDifference(int[] nums) {
        int max1 = 0, max2 = 0;
        int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;
        for (int num : nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        return (max1 * max2) - (min1 * min2);
    }
}
```

```cpp
class Solution {
public:
    int maxProductDifference(vector<int>& nums) {
        int max1 = 0, max2 = 0;
        int min1 = INT_MAX, min2 = INT_MAX;
        for (int num : nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        return (max1 * max2) - (min1 * min2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    maxProductDifference(nums) {
        let max1 = 0,
            max2 = 0;
        let min1 = Infinity,
            min2 = Infinity;
        for (const num of nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        return max1 * max2 - min1 * min2;
    }
}
```

```csharp
public class Solution {
    public int MaxProductDifference(int[] nums) {
        int max1 = 0, max2 = 0;
        int min1 = int.MaxValue, min2 = int.MaxValue;
        foreach (int num in nums) {
            if (num > max1) {
                max2 = max1;
                max1 = num;
            } else if (num > max2) {
                max2 = num;
            }
            if (num < min1) {
                min2 = min1;
                min1 = num;
            } else if (num < min2) {
                min2 = num;
            }
        }
        return (max1 * max2) - (min1 * min2);
    }
}
```

```go
func maxProductDifference(nums []int) int {
    max1, max2 := 0, 0
    min1, min2 := math.MaxInt32, math.MaxInt32
    for _, num := range nums {
        if num > max1 {
            max2 = max1
            max1 = num
        } else if num > max2 {
            max2 = num
        }
        if num < min1 {
            min2 = min1
            min1 = num
        } else if num < min2 {
            min2 = num
        }
    }
    return (max1 * max2) - (min1 * min2)
}
```

```kotlin
class Solution {
    fun maxProductDifference(nums: IntArray): Int {
        var max1 = 0
        var max2 = 0
        var min1 = Int.MAX_VALUE
        var min2 = Int.MAX_VALUE
        for (num in nums) {
            if (num > max1) {
                max2 = max1
                max1 = num
            } else if (num > max2) {
                max2 = num
            }
            if (num < min1) {
                min2 = min1
                min1 = num
            } else if (num < min2) {
                min2 = num
            }
        }
        return (max1 * max2) - (min1 * min2)
    }
}
```

```swift
class Solution {
    func maxProductDifference(_ nums: [Int]) -> Int {
        var max1 = 0, max2 = 0
        var min1 = Int.max, min2 = Int.max
        for num in nums {
            if num > max1 {
                max2 = max1
                max1 = num
            } else if num > max2 {
                max2 = num
            }
            if num < min1 {
                min2 = min1
                min1 = num
            } else if num < min2 {
                min2 = num
            }
        }
        return (max1 * max2) - (min1 * min2)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
