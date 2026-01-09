## 1. Brute Force

### Intuition
The most straightforward approach is to check every possible subarray. For each starting index, we extend the subarray one element at a time, keeping track of the running sum. Whenever the sum equals the goal, we count it. Since the array contains only 0s and 1s, the sum can only increase as we extend the subarray.

### Algorithm
1. Initialize a result counter to 0.
2. For each starting index `i` from `0` to `n-1`, initialize a running sum to `0`.
3. For each ending index `j` from `i` to `n-1`, add `nums[j]` to the running sum.
4. If the running sum equals the goal, increment the result counter.
5. Return the total count.

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        n, res = len(nums), 0

        for i in range(n):
            curSum = 0
            for j in range(i, n):
                curSum += nums[j]
                if curSum == goal:
                    res += 1

        return res
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum == goal) {
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
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum == goal) {
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
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        const n = nums.length;
        let res = 0;

        for (let i = 0; i < n; i++) {
            let curSum = 0;
            for (let j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum === goal) {
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
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int n = nums.Length, res = 0;

        for (int i = 0; i < n; i++) {
            int curSum = 0;
            for (int j = i; j < n; j++) {
                curSum += nums[j];
                if (curSum == goal) {
                    res++;
                }
            }
        }

        return res;
    }
}
```

```go
func numSubarraysWithSum(nums []int, goal int) int {
    n, res := len(nums), 0

    for i := 0; i < n; i++ {
        curSum := 0
        for j := i; j < n; j++ {
            curSum += nums[j]
            if curSum == goal {
                res++
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun numSubarraysWithSum(nums: IntArray, goal: Int): Int {
        val n = nums.size
        var res = 0

        for (i in 0 until n) {
            var curSum = 0
            for (j in i until n) {
                curSum += nums[j]
                if (curSum == goal) {
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
    func numSubarraysWithSum(_ nums: [Int], _ goal: Int) -> Int {
        let n = nums.count
        var res = 0

        for i in 0..<n {
            var curSum = 0
            for j in i..<n {
                curSum += nums[j]
                if curSum == goal {
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

## 2. Prefix Sum + Hash Map

### Intuition
For a subarray from index `i+1` to `j` to have sum equal to `goal`, we need `prefixSum[j] - prefixSum[i] = goal`, which means `prefixSum[i] = prefixSum[j] - goal`. As we iterate through the array computing prefix sums, we can use a hash map to count how many times each prefix sum has occurred. For each position, we check how many previous positions had a prefix sum that would give us our target subarray sum.

### Algorithm
1. Initialize a hash map with `{0: 1}` to handle subarrays starting from index `0`.
2. Initialize prefix sum and result counter to `0`.
3. For each element, add it to the prefix sum.
4. Look up `prefixSum - goal` in the hash map and add its count to the result.
5. Increment the count of the current prefix sum in the hash map.
6. Return the total count.

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        prefixSum = 0
        count = { 0 : 1 } # prefixSum -> count
        res = 0

        for num in nums:
            prefixSum += num
            res += count.get(prefixSum - goal, 0)
            count[prefixSum] = count.get(prefixSum, 0) + 1

        return res
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        int prefixSum = 0, res = 0;
        HashMap<Integer, Integer> count = new HashMap<>();
        count.put(0, 1);

        for (int num : nums) {
            prefixSum += num;
            res += count.getOrDefault(prefixSum - goal, 0);
            count.put(prefixSum, count.getOrDefault(prefixSum, 0) + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        int prefixSum = 0, res = 0;
        unordered_map<int, int> count;
        count[0] = 1;

        for (int& num : nums) {
            prefixSum += num;
            res += count[prefixSum - goal];
            count[prefixSum]++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        let prefixSum = 0,
            res = 0;
        const count = new Map();
        count.set(0, 1);

        for (const num of nums) {
            prefixSum += num;
            res += count.get(prefixSum - goal) || 0;
            count.set(prefixSum, (count.get(prefixSum) || 0) + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int prefixSum = 0, res = 0;
        Dictionary<int, int> count = new Dictionary<int, int>();
        count[0] = 1;

        foreach (int num in nums) {
            prefixSum += num;
            if (count.ContainsKey(prefixSum - goal)) {
                res += count[prefixSum - goal];
            }
            if (!count.ContainsKey(prefixSum)) {
                count[prefixSum] = 0;
            }
            count[prefixSum]++;
        }

        return res;
    }
}
```

```go
func numSubarraysWithSum(nums []int, goal int) int {
    prefixSum, res := 0, 0
    count := make(map[int]int)
    count[0] = 1

    for _, num := range nums {
        prefixSum += num
        res += count[prefixSum-goal]
        count[prefixSum]++
    }

    return res
}
```

```kotlin
class Solution {
    fun numSubarraysWithSum(nums: IntArray, goal: Int): Int {
        var prefixSum = 0
        var res = 0
        val count = mutableMapOf(0 to 1)

        for (num in nums) {
            prefixSum += num
            res += count.getOrDefault(prefixSum - goal, 0)
            count[prefixSum] = count.getOrDefault(prefixSum, 0) + 1
        }

        return res
    }
}
```

```swift
class Solution {
    func numSubarraysWithSum(_ nums: [Int], _ goal: Int) -> Int {
        var prefixSum = 0, res = 0
        var count = [0: 1]

        for num in nums {
            prefixSum += num
            res += count[prefixSum - goal, default: 0]
            count[prefixSum, default: 0] += 1
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

## 3. Prefix Sum + Array

### Intuition
Since the array contains only `0`s and `1`s, the prefix sum at any position is at most `n` (the array length). This allows us to use an array instead of a hash map for counting prefix sums. Array access is faster than hash map operations, making this approach more efficient in practice. The logic remains the same as the hash map approach.

### Algorithm
1. Create an array of size `n+1` to count prefix sums, initialized to `0`.
2. Set `count[0] = 1` to handle subarrays starting from index `0`.
3. Initialize prefix sum and result counter to `0`.
4. For each element, add it to the prefix sum.
5. If `prefixSum >= goal`, add `count[prefixSum - goal]` to the result.
6. Increment `count[prefixSum]`.
7. Return the total count.

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        n = len(nums)
        count = [0] * (n + 1)
        count[0] = 1
        prefixSum, res = 0, 0

        for num in nums:
            prefixSum += num
            if prefixSum >= goal:
                res += count[prefixSum - goal]
            count[prefixSum] += 1

        return res
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        int n = nums.length, prefixSum = 0, res = 0;
        int[] count = new int[n + 1];
        count[0] = 1;

        for (int num : nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        int n = nums.size(), prefixSum = 0, res = 0;
        vector<int> count(n + 1, 0);
        count[0] = 1;

        for (int num : nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        const n = nums.length;
        const count = Array(n + 1).fill(0);
        count[0] = 1;
        let prefixSum = 0,
            res = 0;

        for (const num of nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int n = nums.Length;
        int[] count = new int[n + 1];
        count[0] = 1;
        int prefixSum = 0, res = 0;

        foreach (int num in nums) {
            prefixSum += num;
            if (prefixSum >= goal) {
                res += count[prefixSum - goal];
            }
            count[prefixSum]++;
        }

        return res;
    }
}
```

```go
func numSubarraysWithSum(nums []int, goal int) int {
    n := len(nums)
    count := make([]int, n+1)
    count[0] = 1
    prefixSum, res := 0, 0

    for _, num := range nums {
        prefixSum += num
        if prefixSum >= goal {
            res += count[prefixSum-goal]
        }
        count[prefixSum]++
    }

    return res
}
```

```kotlin
class Solution {
    fun numSubarraysWithSum(nums: IntArray, goal: Int): Int {
        val n = nums.size
        val count = IntArray(n + 1)
        count[0] = 1
        var prefixSum = 0
        var res = 0

        for (num in nums) {
            prefixSum += num
            if (prefixSum >= goal) {
                res += count[prefixSum - goal]
            }
            count[prefixSum]++
        }

        return res
    }
}
```

```swift
class Solution {
    func numSubarraysWithSum(_ nums: [Int], _ goal: Int) -> Int {
        let n = nums.count
        var count = [Int](repeating: 0, count: n + 1)
        count[0] = 1
        var prefixSum = 0, res = 0

        for num in nums {
            prefixSum += num
            if prefixSum >= goal {
                res += count[prefixSum - goal]
            }
            count[prefixSum] += 1
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

## 4. Sliding Window

### Intuition
Counting subarrays with exactly `goal` sum is tricky with a sliding window because shrinking the window might skip valid subarrays. However, counting subarrays with sum at most `goal` is straightforward. We can use the identity: `count(exactly goal) = count(at most goal) - count(at most goal-1)`. For each right endpoint, we shrink the left side until the sum is at most the target, and all subarrays ending at `right` with starting points from `left` to `right` are valid.

### Algorithm
1. Define a helper function that counts subarrays with sum at most `x`.
2. In the helper, use two pointers (`left` and `right`) with a running sum.
3. For each `right`, add `nums[right]` to the sum. While `sum > x`, shrink from the left.
4. Add `(right - left + 1)` to the count, representing all valid subarrays ending at `right`.
5. Return `helper(goal) - helper(goal - 1)` as the final answer.

::tabs-start

```python
class Solution:
    def numSubarraysWithSum(self, nums: List[int], goal: int) -> int:
        def helper(x):
            if x < 0:
                return 0
            res = l = cur = 0
            for r in range(len(nums)):
                cur += nums[r]
                while cur > x:
                    cur -= nums[l]
                    l += 1
                res += (r - l + 1)
            return res

        return helper(goal) - helper(goal - 1)
```

```java
public class Solution {
    public int numSubarraysWithSum(int[] nums, int goal) {
        return helper(nums, goal) - helper(nums, goal - 1);
    }

    private int helper(int[] nums, int x) {
        if (x < 0) return 0;
        int res = 0, l = 0, cur = 0;
        for (int r = 0; r < nums.length; r++) {
            cur += nums[r];
            while (cur > x) {
                cur -= nums[l];
                l++;
            }
            res += (r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int numSubarraysWithSum(vector<int>& nums, int goal) {
        return helper(nums, goal) - helper(nums, goal - 1);
    }

private:
    int helper(vector<int>& nums, int x) {
        if (x < 0) return 0;
        int res = 0, l = 0, cur = 0;
        for (int r = 0; r < nums.size(); r++) {
            cur += nums[r];
            while (cur > x) {
                cur -= nums[l];
                l++;
            }
            res += (r - l + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} goal
     * @return {number}
     */
    numSubarraysWithSum(nums, goal) {
        const helper = (x) => {
            if (x < 0) return 0;
            let res = 0,
                l = 0,
                cur = 0;
            for (let r = 0; r < nums.length; r++) {
                cur += nums[r];
                while (cur > x) {
                    cur -= nums[l];
                    l++;
                }
                res += r - l + 1;
            }
            return res;
        };

        return helper(goal) - helper(goal - 1);
    }
}
```

```csharp
public class Solution {
    public int NumSubarraysWithSum(int[] nums, int goal) {
        int Helper(int x) {
            if (x < 0) return 0;
            int res = 0, l = 0, cur = 0;
            for (int r = 0; r < nums.Length; r++) {
                cur += nums[r];
                while (cur > x) {
                    cur -= nums[l];
                    l++;
                }
                res += (r - l + 1);
            }
            return res;
        }

        return Helper(goal) - Helper(goal - 1);
    }
}
```

```go
func numSubarraysWithSum(nums []int, goal int) int {
    helper := func(x int) int {
        if x < 0 {
            return 0
        }
        res, l, cur := 0, 0, 0
        for r := 0; r < len(nums); r++ {
            cur += nums[r]
            for cur > x {
                cur -= nums[l]
                l++
            }
            res += r - l + 1
        }
        return res
    }

    return helper(goal) - helper(goal-1)
}
```

```kotlin
class Solution {
    fun numSubarraysWithSum(nums: IntArray, goal: Int): Int {
        fun helper(x: Int): Int {
            if (x < 0) return 0
            var res = 0
            var l = 0
            var cur = 0
            for (r in nums.indices) {
                cur += nums[r]
                while (cur > x) {
                    cur -= nums[l]
                    l++
                }
                res += r - l + 1
            }
            return res
        }

        return helper(goal) - helper(goal - 1)
    }
}
```

```swift
class Solution {
    func numSubarraysWithSum(_ nums: [Int], _ goal: Int) -> Int {
        func helper(_ x: Int) -> Int {
            if x < 0 { return 0 }
            var res = 0, l = 0, cur = 0
            for r in 0..<nums.count {
                cur += nums[r]
                while cur > x {
                    cur -= nums[l]
                    l += 1
                }
                res += r - l + 1
            }
            return res
        }

        return helper(goal) - helper(goal - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
