## 1. Brute Force

### Intuition

The most direct approach is to examine every possible subarray and check if it satisfies the frequency constraint. For each starting position, we extend the subarray one element at a time, tracking element frequencies as we go. The moment any element appears more than `k` times, we stop extending and move to the next starting position.

### Algorithm

1. Initialize `res` to track the maximum valid subarray length.
2. For each starting index `i`, create a frequency map and iterate through all ending indices `j`.
3. Increment the count for each element as we expand the window.
4. If any element's frequency exceeds `k`, break out of the inner loop.
5. Otherwise, update `res` with the current subarray length `j - i + 1`.
6. Return `res` after checking all subarrays.

::tabs-start

```python
class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            count = defaultdict(int)
            for j in range(i, n):
                count[nums[j]] += 1
                if count[nums[j]] > k:
                    break
                res = max(res, j - i + 1)

        return res
```

```java
public class Solution {
    public int maxSubarrayLength(int[] nums, int k) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            Map<Integer, Integer> count = new HashMap<>();
            for (int j = i; j < n; j++) {
                count.put(nums[j], count.getOrDefault(nums[j], 0) + 1);
                if (count.get(nums[j]) > k) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            unordered_map<int, int> count;
            for (int j = i; j < n; j++) {
                count[nums[j]]++;
                if (count[nums[j]] > k) {
                    break;
                }
                res = max(res, j - i + 1);
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
     * @param {number} k
     * @return {number}
     */
    maxSubarrayLength(nums, k) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let count = new Map();
            for (let j = i; j < n; j++) {
                count.set(nums[j], (count.get(nums[j]) || 0) + 1);
                if (count.get(nums[j]) > k) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarrayLength(int[] nums, int k) {
        int n = nums.Length, res = 0;

        for (int i = 0; i < n; i++) {
            Dictionary<int, int> count = new Dictionary<int, int>();
            for (int j = i; j < n; j++) {
                if (!count.ContainsKey(nums[j])) count[nums[j]] = 0;
                count[nums[j]]++;
                if (count[nums[j]] > k) {
                    break;
                }
                res = Math.Max(res, j - i + 1);
            }
        }
        return res;
    }
}
```

```go
func maxSubarrayLength(nums []int, k int) int {
    n, res := len(nums), 0

    for i := 0; i < n; i++ {
        count := make(map[int]int)
        for j := i; j < n; j++ {
            count[nums[j]]++
            if count[nums[j]] > k {
                break
            }
            if j-i+1 > res {
                res = j - i + 1
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxSubarrayLength(nums: IntArray, k: Int): Int {
        val n = nums.size
        var res = 0

        for (i in 0 until n) {
            val count = HashMap<Int, Int>()
            for (j in i until n) {
                count[nums[j]] = count.getOrDefault(nums[j], 0) + 1
                if (count[nums[j]]!! > k) {
                    break
                }
                res = maxOf(res, j - i + 1)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxSubarrayLength(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var res = 0

        for i in 0..<n {
            var count = [Int: Int]()
            for j in i..<n {
                count[nums[j], default: 0] += 1
                if count[nums[j]]! > k {
                    break
                }
                res = max(res, j - i + 1)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Sliding Window

### Intuition

Instead of restarting from scratch for each position, we can maintain a sliding window that always represents a valid subarray. When adding an element causes a frequency violation, we shrink the window from the left until the constraint is satisfied again. This way, we only process each element twice at most: once when entering and once when leaving the window.

### Algorithm

1. Use two pointers `l` (left) and `r` (right) to define the current window.
2. Maintain a hash map to track the frequency of each element in the window.
3. For each right pointer position, add the current element to the frequency map.
4. While the newly added element's frequency exceeds `k`, shrink the window by incrementing `l` and decrementing the corresponding frequency.
5. Update `res` with the current window size `r - l + 1`.
6. Return the maximum length found.

::tabs-start

```python
class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        res = 0
        count = defaultdict(int)
        l = 0
        for r in range(len(nums)):
            count[nums[r]] += 1
            while count[nums[r]] > k:
                count[nums[l]] -= 1
                l += 1
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int maxSubarrayLength(int[] nums, int k) {
        int res = 0;
        Map<Integer, Integer> count = new HashMap<>();
        int l = 0;

        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);
            while (count.get(nums[r]) > k) {
                count.put(nums[l], count.get(nums[l]) - 1);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarrayLength(vector<int>& nums, int k) {
        int res = 0;
        unordered_map<int, int> count;
        int l = 0;

        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;
            while (count[nums[r]] > k) {
                count[nums[l]]--;
                l++;
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    maxSubarrayLength(nums, k) {
        let res = 0;
        let count = new Map();
        let l = 0;

        for (let r = 0; r < nums.length; r++) {
            count.set(nums[r], (count.get(nums[r]) || 0) + 1);
            while (count.get(nums[r]) > k) {
                count.set(nums[l], count.get(nums[l]) - 1);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarrayLength(int[] nums, int k) {
        int res = 0;
        Dictionary<int, int> count = new Dictionary<int, int>();
        int l = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (!count.ContainsKey(nums[r])) count[nums[r]] = 0;
            count[nums[r]]++;
            while (count[nums[r]] > k) {
                count[nums[l]]--;
                l++;
            }
            res = Math.Max(res, r - l + 1);
        }
        return res;
    }
}
```

```go
func maxSubarrayLength(nums []int, k int) int {
    res := 0
    count := make(map[int]int)
    l := 0

    for r := 0; r < len(nums); r++ {
        count[nums[r]]++
        for count[nums[r]] > k {
            count[nums[l]]--
            l++
        }
        if r-l+1 > res {
            res = r - l + 1
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxSubarrayLength(nums: IntArray, k: Int): Int {
        var res = 0
        val count = HashMap<Int, Int>()
        var l = 0

        for (r in nums.indices) {
            count[nums[r]] = count.getOrDefault(nums[r], 0) + 1
            while (count[nums[r]]!! > k) {
                count[nums[l]] = count[nums[l]]!! - 1
                l++
            }
            res = maxOf(res, r - l + 1)
        }
        return res
    }
}
```

```swift
class Solution {
    func maxSubarrayLength(_ nums: [Int], _ k: Int) -> Int {
        var res = 0
        var count = [Int: Int]()
        var l = 0

        for r in 0..<nums.count {
            count[nums[r], default: 0] += 1
            while count[nums[r]]! > k {
                count[nums[l]]! -= 1
                l += 1
            }
            res = max(res, r - l + 1)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sliding Window (Optimal)

### Intuition

We can optimize further by observing that we only care about finding the maximum window size. Once we find a valid window of size `w`, we never need a smaller one. So instead of shrinking the window completely when invalid, we just slide it: move both left and right pointers by one. The window size either stays the same or grows, never shrinks. This guarantees we find the maximum valid window.

### Algorithm

1. Track `cnt`, the count of elements whose frequency exceeds `k`.
2. For each right pointer, increment the element's frequency and update `cnt` if it just exceeded `k`.
3. If `cnt > 0` (window is invalid), slide the window by moving the left pointer once. Before moving, check if the left element's frequency was above `k` and decrement `cnt` accordingly.
4. The window size never shrinks, so after processing all elements, the answer is `len(nums) - l`.

::tabs-start

```python
class Solution:
    def maxSubarrayLength(self, nums: List[int], k: int) -> int:
        count = defaultdict(int)
        l = res = 0
        cnt = 0  # count of numbers with freq > k
        for r in range(len(nums)):
            count[nums[r]] += 1
            cnt += count[nums[r]] > k
            if cnt > 0:
                cnt -= count[nums[l]] > k
                count[nums[l]] -= 1
                l += 1
        return len(nums) - l
```

```java
public class Solution {
    public int maxSubarrayLength(int[] nums, int k) {
        HashMap<Integer, Integer> count = new HashMap<>();
        int l = 0, cnt = 0; // count of numbers with freq > k
        for (int r = 0; r < nums.length; r++) {
            count.put(nums[r], count.getOrDefault(nums[r], 0) + 1);
            if (count.get(nums[r]) > k) cnt++;
            if (cnt > 0) {
                if (count.get(nums[l]) > k) cnt--;
                count.put(nums[l], count.get(nums[l]) - 1);
                l++;
            }
        }
        return nums.length - l;
    }
}
```

```cpp
class Solution {
public:
    int maxSubarrayLength(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        int l = 0, cnt = 0; // count of numbers with freq > k
        for (int r = 0; r < nums.size(); r++) {
            count[nums[r]]++;
            cnt += count[nums[r]] > k;
            if (cnt > 0) {
                cnt -= count[nums[l]] > k;
                count[nums[l]]--;
                l++;
            }
        }
        return nums.size() - l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number}
     */
    maxSubarrayLength(nums, k) {
        let count = new Map();
        let l = 0,
            cnt = 0; // count of numbers with freq > k
        for (let r = 0; r < nums.length; r++) {
            count.set(nums[r], (count.get(nums[r]) || 0) + 1);
            if (count.get(nums[r]) > k) cnt++;
            if (cnt > 0) {
                if (count.get(nums[l]) > k) cnt--;
                count.set(nums[l], count.get(nums[l]) - 1);
                l++;
            }
        }
        return nums.length - l;
    }
}
```

```csharp
public class Solution {
    public int MaxSubarrayLength(int[] nums, int k) {
        Dictionary<int, int> count = new Dictionary<int, int>();
        int l = 0, cnt = 0; // count of numbers with freq > k
        for (int r = 0; r < nums.Length; r++) {
            if (!count.ContainsKey(nums[r])) count[nums[r]] = 0;
            count[nums[r]]++;
            if (count[nums[r]] > k) cnt++;
            if (cnt > 0) {
                if (count[nums[l]] > k) cnt--;
                count[nums[l]]--;
                l++;
            }
        }
        return nums.Length - l;
    }
}
```

```go
func maxSubarrayLength(nums []int, k int) int {
    count := make(map[int]int)
    l, cnt := 0, 0 // count of numbers with freq > k
    for r := 0; r < len(nums); r++ {
        count[nums[r]]++
        if count[nums[r]] > k {
            cnt++
        }
        if cnt > 0 {
            if count[nums[l]] > k {
                cnt--
            }
            count[nums[l]]--
            l++
        }
    }
    return len(nums) - l
}
```

```kotlin
class Solution {
    fun maxSubarrayLength(nums: IntArray, k: Int): Int {
        val count = HashMap<Int, Int>()
        var l = 0
        var cnt = 0 // count of numbers with freq > k
        for (r in nums.indices) {
            count[nums[r]] = count.getOrDefault(nums[r], 0) + 1
            if (count[nums[r]]!! > k) cnt++
            if (cnt > 0) {
                if (count[nums[l]]!! > k) cnt--
                count[nums[l]] = count[nums[l]]!! - 1
                l++
            }
        }
        return nums.size - l
    }
}
```

```swift
class Solution {
    func maxSubarrayLength(_ nums: [Int], _ k: Int) -> Int {
        var count = [Int: Int]()
        var l = 0
        var cnt = 0 // count of numbers with freq > k
        for r in 0..<nums.count {
            count[nums[r], default: 0] += 1
            if count[nums[r]]! > k {
                cnt += 1
            }
            if cnt > 0 {
                if count[nums[l]]! > k {
                    cnt -= 1
                }
                count[nums[l]]! -= 1
                l += 1
            }
        }
        return nums.count - l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
