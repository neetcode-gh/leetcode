## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Arrays** - Understanding how to traverse and find maximum elements in an array
- **Sliding Window Technique** - Using two pointers to efficiently process subarrays without recomputing from scratch
- **Subarray Counting** - Recognizing patterns for counting valid subarrays based on window positions

---

## 1. Brute Force

### Intuition

We need to count subarrays where the maximum element of the entire array appears at least `k` times. The simplest approach is to check every possible subarray by trying all starting and ending positions, counting occurrences of the maximum element in each subarray.

### Algorithm

1. Find the maximum element in the array.
2. For each starting index `i` from `0` to `n-1`:
   - Initialize a counter for max element occurrences.
   - For each ending index `j` from `i` to `n-1`:
     - If `nums[j]` equals the max element, increment the counter.
     - If the counter is at least `k`, this subarray is valid; increment the result.
3. Return the total count of valid subarrays.

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        n, res = len(nums), 0
        maxi = max(nums)

        for i in range(n):
            cnt = 0
            for j in range(i, n):
                if nums[j] == maxi:
                    cnt += 1

                if cnt >= k:
                    res += 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int n = nums.length;
        long res = 0;
        int maxi = Integer.MIN_VALUE;

        for (int num : nums) {
            maxi = Math.max(maxi, num);
        }

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
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
    long long countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        long long res = 0;
        int maxi = *max_element(nums.begin(), nums.end());

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
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
     * @param {number} k
     * @return {number}
     */
    countSubarrays(nums, k) {
        let n = nums.length,
            res = 0;
        let maxi = Math.max(...nums);

        for (let i = 0; i < n; i++) {
            let cnt = 0;
            for (let j = i; j < n; j++) {
                if (nums[j] === maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int n = nums.Length;
        long res = 0;
        int maxi = nums.Max();

        for (int i = 0; i < n; i++) {
            int cnt = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == maxi) {
                    cnt++;
                }

                if (cnt >= k) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    n := len(nums)
    var res int64 = 0
    maxi := nums[0]
    for _, num := range nums {
        if num > maxi {
            maxi = num
        }
    }

    for i := 0; i < n; i++ {
        cnt := 0
        for j := i; j < n; j++ {
            if nums[j] == maxi {
                cnt++
            }

            if cnt >= k {
                res++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val n = nums.size
        var res = 0L
        val maxi = nums.max()

        for (i in 0 until n) {
            var cnt = 0
            for (j in i until n) {
                if (nums[j] == maxi) {
                    cnt++
                }

                if (cnt >= k) {
                    res++
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        var res = 0
        let maxi = nums.max()!

        for i in 0..<n {
            var cnt = 0
            for j in i..<n {
                if nums[j] == maxi {
                    cnt += 1
                }

                if cnt >= k {
                    res += 1
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Variable Size Sliding Window

### Intuition

Instead of checking all subarrays, we can use a sliding window. For each right endpoint, we find the smallest left endpoint such that the window contains exactly `k` occurrences of the max element with the max element at position `l`. All positions from `0` to `l` can serve as left endpoints for valid subarrays ending at `r`.

### Algorithm

1. Find the maximum element and initialize counters.
2. Use two pointers `l` and `r`, both starting at `0`.
3. For each right pointer position:
   - If `nums[r]` is the max element, increment the count.
   - Shrink the window from the left while the count exceeds `k`, or while count equals `k` and the left element is not the max (to find the rightmost valid left position).
   - If count equals `k`, add `(l + 1)` to the result, representing all valid starting positions.
4. Return the total count.

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n, max_cnt = max(nums), 0
        l = 0
        res = 0

        for r in range(len(nums)):
            if nums[r] == max_n:
                max_cnt += 1

            while max_cnt > k or (l <= r and max_cnt == k and nums[l] != max_n):
                if nums[l] == max_n:
                    max_cnt -= 1
                l += 1

            if max_cnt == k:
                res += l + 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int maxN = Integer.MIN_VALUE, maxCnt = 0, l = 0;
        long res = 0;
        for (int num : nums) {
            maxN = Math.max(maxN, num);
        }

        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int maxN = *max_element(nums.begin(), nums.end());
        int maxCnt = 0, l = 0;
        long long res = 0;

        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
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
    countSubarrays(nums, k) {
        let maxN = Math.max(...nums);
        let maxCnt = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < nums.length; r++) {
            if (nums[r] === maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt === k && nums[l] !== maxN)) {
                if (nums[l] === maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt === k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int maxN = nums.Max(), maxCnt = 0, l = 0;
        long res = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] == maxN) {
                maxCnt++;
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--;
                }
                l++;
            }

            if (maxCnt == k) {
                res += l + 1;
            }
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxCnt, l := 0, 0
    var res int64 = 0

    for r := 0; r < len(nums); r++ {
        if nums[r] == maxN {
            maxCnt++
        }

        for maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN) {
            if nums[l] == maxN {
                maxCnt--
            }
            l++
        }

        if maxCnt == k {
            res += int64(l + 1)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val maxN = nums.max()
        var maxCnt = 0
        var l = 0
        var res = 0L

        for (r in nums.indices) {
            if (nums[r] == maxN) {
                maxCnt++
            }

            while (maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN)) {
                if (nums[l] == maxN) {
                    maxCnt--
                }
                l++
            }

            if (maxCnt == k) {
                res += l + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let maxN = nums.max()!
        var maxCnt = 0, l = 0
        var res = 0

        for r in 0..<nums.count {
            if nums[r] == maxN {
                maxCnt += 1
            }

            while maxCnt > k || (l <= r && maxCnt == k && nums[l] != maxN) {
                if nums[l] == maxN {
                    maxCnt -= 1
                }
                l += 1
            }

            if maxCnt == k {
                res += l + 1
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

## 3. Variable Size Sliding Window (Optimal)

### Intuition

We can simplify the sliding window by counting subarrays with fewer than `k` occurrences and subtracting from total, or equivalently, counting invalid prefixes. For each right endpoint, we maintain a window that has exactly `k` occurrences of the max element, then shrink it until we have fewer than `k`. The left pointer position tells us how many valid subarrays end at this right position.

### Algorithm

1. Find the maximum element and initialize counters.
2. For each right pointer position:
   - If `nums[r]` is the max element, increment the count.
   - While count equals `k`:
     - If `nums[l]` is the max element, decrement the count.
     - Move `l` to the right.
   - Add `l` to the result (representing all valid starting positions from `0` to `l-1`).
3. Return the total count.

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n, max_cnt = max(nums), 0
        l = res = 0

        for r in range(len(nums)):
            if nums[r] == max_n:
                max_cnt += 1
            while max_cnt == k:
                if nums[l] == max_n:
                    max_cnt -= 1
                l += 1
            res += l

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int max_n = Integer.MIN_VALUE, max_cnt = 0, l = 0;
        long res = 0;
        for (int num : nums) {
            max_n = Math.max(max_n, num);
        }

        for (int r = 0; r < nums.length; r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int max_n = *max_element(nums.begin(), nums.end());
        int max_cnt = 0, l = 0;
        long long res = 0;

        for (int r = 0; r < nums.size(); r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
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
    countSubarrays(nums, k) {
        let max_n = Math.max(...nums),
            max_cnt = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < nums.length; r++) {
            if (nums[r] === max_n) {
                max_cnt++;
            }
            while (max_cnt === k) {
                if (nums[l] === max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int max_n = nums.Max(), max_cnt = 0, l = 0;
        long res = 0;

        for (int r = 0; r < nums.Length; r++) {
            if (nums[r] == max_n) {
                max_cnt++;
            }
            while (max_cnt == k) {
                if (nums[l] == max_n) {
                    max_cnt--;
                }
                l++;
            }
            res += l;
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxCnt, l := 0, 0
    var res int64 = 0

    for r := 0; r < len(nums); r++ {
        if nums[r] == maxN {
            maxCnt++
        }
        for maxCnt == k {
            if nums[l] == maxN {
                maxCnt--
            }
            l++
        }
        res += int64(l)
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val maxN = nums.max()
        var maxCnt = 0
        var l = 0
        var res = 0L

        for (r in nums.indices) {
            if (nums[r] == maxN) {
                maxCnt++
            }
            while (maxCnt == k) {
                if (nums[l] == maxN) {
                    maxCnt--
                }
                l++
            }
            res += l
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let maxN = nums.max()!
        var maxCnt = 0, l = 0
        var res = 0

        for r in 0..<nums.count {
            if nums[r] == maxN {
                maxCnt += 1
            }
            while maxCnt == k {
                if nums[l] == maxN {
                    maxCnt -= 1
                }
                l += 1
            }
            res += l
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

## 4. Fixed Size Sliding Window + Math

### Intuition

We can collect all indices where the max element appears and then use combinatorics. For each window of `k` consecutive max element positions, the number of valid subarrays can be computed by multiplying the number of possible left endpoints (positions before the first max in the window) by the number of possible right endpoints (positions from the last max to the end of the array).

### Algorithm

1. Find the maximum element and collect all indices where it appears.
2. Add `-1` at the beginning of the index list (as a sentinel for computing gaps).
3. For each window of `k` consecutive indices in the list:
   - Calculate left choices: difference between current index and previous index.
   - Calculate right choices: distance from the last index in the window to the end.
   - Multiply these values and add to the result.
4. Return the total count.

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        n = len(nums)
        max_n = max(nums)
        max_indexes = [-1]
        for i, num in enumerate(nums):
            if num == max_n:
                max_indexes.append(i)

        res = 0
        for i in range(1, len(max_indexes) - k + 1):
            cur = (max_indexes[i] - max_indexes[i - 1])
            cur *= (n - max_indexes[i + k - 1])
            res += cur

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int n = nums.length;
        int max_n = Integer.MIN_VALUE;
        for (int num : nums) {
            max_n = Math.max(max_n, num);
        }

        List<Integer> max_indexes = new ArrayList<>();
        max_indexes.add(-1);
        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.add(i);
            }
        }

        long res = 0;
        for (int i = 1; i <= max_indexes.size() - k; i++) {
            long cur = (max_indexes.get(i) - max_indexes.get(i - 1));
            cur *= (n - max_indexes.get(i + k - 1));
            res += cur;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int n = nums.size();
        int max_n = *max_element(nums.begin(), nums.end());
        vector<int> max_indexes = {-1};

        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.push_back(i);
            }
        }

        long long res = 0;
        for (int i = 1; i <= int(max_indexes.size()) - k; i++) {
            long long cur = (max_indexes[i] - max_indexes[i - 1]);
            cur *= (n - max_indexes[i + k - 1]);
            res += cur;
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
    countSubarrays(nums, k) {
        const n = nums.length;
        const max_n = Math.max(...nums);
        const max_indexes = [-1];

        for (let i = 0; i < n; i++) {
            if (nums[i] === max_n) {
                max_indexes.push(i);
            }
        }

        let res = 0;
        for (let i = 1; i <= max_indexes.length - k; i++) {
            res +=
                (max_indexes[i] - max_indexes[i - 1]) *
                (n - max_indexes[i + k - 1]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int n = nums.Length;
        int max_n = nums.Max();
        List<int> max_indexes = new List<int> { -1 };

        for (int i = 0; i < n; i++) {
            if (nums[i] == max_n) {
                max_indexes.Add(i);
            }
        }

        long res = 0;
        for (int i = 1; i <= max_indexes.Count - k; i++) {
            long cur = (max_indexes[i] - max_indexes[i - 1]);
            cur *= (n - max_indexes[i + k - 1]);
            res += cur;
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    n := len(nums)
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxIndexes := []int{-1}

    for i := 0; i < n; i++ {
        if nums[i] == maxN {
            maxIndexes = append(maxIndexes, i)
        }
    }

    var res int64 = 0
    for i := 1; i <= len(maxIndexes)-k; i++ {
        cur := int64(maxIndexes[i] - maxIndexes[i-1])
        cur *= int64(n - maxIndexes[i+k-1])
        res += cur
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val n = nums.size
        val maxN = nums.max()
        val maxIndexes = mutableListOf(-1)

        for (i in 0 until n) {
            if (nums[i] == maxN) {
                maxIndexes.add(i)
            }
        }

        var res = 0L
        for (i in 1..maxIndexes.size - k) {
            val cur = (maxIndexes[i] - maxIndexes[i - 1]).toLong() *
                      (n - maxIndexes[i + k - 1])
            res += cur
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let n = nums.count
        let maxN = nums.max()!
        var maxIndexes = [-1]

        for i in 0..<n {
            if nums[i] == maxN {
                maxIndexes.append(i)
            }
        }

        var res = 0
        for i in 1...(maxIndexes.count - k) {
            let cur = (maxIndexes[i] - maxIndexes[i - 1]) *
                      (n - maxIndexes[i + k - 1])
            res += cur
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

## 5. Fixed Size Sliding Window (Optimal)

### Intuition

We maintain a sliding window containing exactly `k` indices of the max element. As we scan through the array, whenever we encounter the max element, we add its index to a queue. When the queue has more than `k` indices, we remove the oldest one. Whenever we have exactly `k` max element indices in our window, all positions from `0` to the first index in the queue are valid starting points for subarrays ending at the current position.

### Algorithm

1. Find the maximum element and create an empty queue for indices.
2. For each index `i` in the array:
   - If `nums[i]` equals the max element, add `i` to the queue.
   - If the queue size exceeds `k`, remove the front element.
   - If the queue size equals `k`, add `(front index + 1)` to the result.
3. Return the total count.

::tabs-start

```python
class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        max_n = max(nums)
        max_indexes = deque()
        res = 0

        for i, num in enumerate(nums):
            if num == max_n:
                max_indexes.append(i)

            if len(max_indexes) > k:
                max_indexes.popleft()

            if len(max_indexes) == k:
                res += max_indexes[0] + 1

        return res
```

```java
public class Solution {
    public long countSubarrays(int[] nums, int k) {
        int maxN = Integer.MIN_VALUE;
        for (int num : nums) {
            maxN = Math.max(maxN, num);
        }

        Queue<Integer> maxIndexes = new LinkedList<>();
        long res = 0;

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == maxN) {
                maxIndexes.add(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.poll();
            }

            if (maxIndexes.size() == k) {
                res += maxIndexes.peek() + 1;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long countSubarrays(vector<int>& nums, int k) {
        int maxN = *max_element(nums.begin(), nums.end());
        queue<int> maxIndexes;
        long long res = 0;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == maxN) {
                maxIndexes.push(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.pop();
            }

            if (maxIndexes.size() == k) {
                res += maxIndexes.front() + 1;
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
    countSubarrays(nums, k) {
        const maxN = Math.max(...nums);
        const maxIndexes = new Queue();
        let res = 0;

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === maxN) {
                maxIndexes.push(i);
            }

            if (maxIndexes.size() > k) {
                maxIndexes.pop();
            }

            if (maxIndexes.size() === k) {
                res += maxIndexes.front() + 1;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public long CountSubarrays(int[] nums, int k) {
        int maxN = nums.Max();
        Queue<int> maxIndexes = new Queue<int>();
        long res = 0;

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == maxN) {
                maxIndexes.Enqueue(i);
            }

            if (maxIndexes.Count > k) {
                maxIndexes.Dequeue();
            }

            if (maxIndexes.Count == k) {
                res += maxIndexes.Peek() + 1;
            }
        }

        return res;
    }
}
```

```go
func countSubarrays(nums []int, k int) int64 {
    maxN := nums[0]
    for _, num := range nums {
        if num > maxN {
            maxN = num
        }
    }
    maxIndexes := []int{}
    var res int64 = 0

    for i := 0; i < len(nums); i++ {
        if nums[i] == maxN {
            maxIndexes = append(maxIndexes, i)
        }

        if len(maxIndexes) > k {
            maxIndexes = maxIndexes[1:]
        }

        if len(maxIndexes) == k {
            res += int64(maxIndexes[0] + 1)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun countSubarrays(nums: IntArray, k: Int): Long {
        val maxN = nums.max()
        val maxIndexes = ArrayDeque<Int>()
        var res = 0L

        for (i in nums.indices) {
            if (nums[i] == maxN) {
                maxIndexes.addLast(i)
            }

            if (maxIndexes.size > k) {
                maxIndexes.removeFirst()
            }

            if (maxIndexes.size == k) {
                res += maxIndexes.first() + 1
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func countSubarrays(_ nums: [Int], _ k: Int) -> Int {
        let maxN = nums.max()!
        var maxIndexes = [Int]()
        var res = 0

        for i in 0..<nums.count {
            if nums[i] == maxN {
                maxIndexes.append(i)
            }

            if maxIndexes.count > k {
                maxIndexes.removeFirst()
            }

            if maxIndexes.count == k {
                res += maxIndexes[0] + 1
            }
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

## Common Pitfalls

### Using Subarray Maximum Instead of Array Maximum
The problem asks for subarrays where the **array's** maximum element appears at least `k` times, not subarrays where the subarray's maximum appears `k` times. You must first find the global maximum of the entire array, then count its occurrences.

```python
# Wrong: Finding max within each subarray
for i in range(n):
    for j in range(i, n):
        if nums[i:j+1].count(max(nums[i:j+1])) >= k:  # Wrong max

# Correct: Use the global array maximum
maxi = max(nums)  # Find once, use for all subarrays
```

### Off-by-One Error in Counting Valid Subarrays
When using the sliding window approach, a common mistake is miscounting the number of valid left endpoints. If the window `[l, r]` has exactly `k` occurrences of the max element with the max at position `l`, valid starting positions are `0` through `l` (inclusive), giving `l + 1` subarrays, not `l`.

### Integer Overflow with Large Arrays
The result can be very large (up to `n * (n + 1) / 2` for an array of size `n`). Using `int` instead of `long` in languages like Java or C++ will cause overflow for large inputs. Always use `long long` or `long` for the result variable.
