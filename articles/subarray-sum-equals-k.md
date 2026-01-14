## 1. Brute Force

### Intuition

The simplest approach is to consider every possible subarray and check if its sum equals `k`. For each starting index, we extend the subarray element by element, maintaining a running sum. Whenever the sum equals `k`, we count it.

### Algorithm

1. Initialize `res = 0`.
2. For each starting index `i`:
   - Set `sum = 0`.
   - For each ending index `j` from `i` to `n - 1`:
     - Add `nums[j]` to `sum`.
     - If `sum == k`, increment `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        res = 0
        for i in range(len(nums)):
            sum = 0
            for j in range(i, len(nums)):
                sum += nums[j]
                if sum == k:
                    res += 1
        return res
```

```java
public class Solution {
    public int subarraySum(int[] nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.length; i++) {
            int sum = 0;
            for (int j = i; j < nums.length; j++) {
                sum += nums[j];
                if (sum == k) res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.size(); i++) {
            int sum = 0;
            for (int j = i; j < nums.size(); j++) {
                sum += nums[j];
                if (sum == k) res++;
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
    subarraySum(nums, k) {
        let res = 0;
        for (let i = 0; i < nums.length; i++) {
            let sum = 0;
            for (let j = i; j < nums.length; j++) {
                sum += nums[j];
                if (sum == k) res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraySum(int[] nums, int k) {
        int res = 0;
        for (int i = 0; i < nums.Length; i++) {
            int sum = 0;
            for (int j = i; j < nums.Length; j++) {
                sum += nums[j];
                if (sum == k) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func subarraySum(nums []int, k int) int {
    res := 0
    for i := 0; i < len(nums); i++ {
        sum := 0
        for j := i; j < len(nums); j++ {
            sum += nums[j]
            if sum == k {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun subarraySum(nums: IntArray, k: Int): Int {
        var res = 0
        for (i in nums.indices) {
            var sum = 0
            for (j in i until nums.size) {
                sum += nums[j]
                if (sum == k) res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func subarraySum(_ nums: [Int], _ k: Int) -> Int {
        var res = 0
        for i in 0..<nums.count {
            var sum = 0
            for j in i..<nums.count {
                sum += nums[j]
                if sum == k {
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

## 2. Hash Map

### Intuition

The key insight is that if `prefixSum[j] - prefixSum[i] = k`, then the subarray from index `i+1` to `j` has sum `k`. This transforms the problem: for each position, we want to count how many earlier positions have a prefix sum equal to `currentPrefixSum - k`. A hash map lets us track prefix sum frequencies as we iterate, giving O(1) lookups.

### Algorithm

1. Initialize `res = 0`, `curSum = 0`, and a hash map `prefixSums` with `{0: 1}` (representing the empty prefix).
2. For each number in the array:
   - Add it to `curSum`.
   - Compute `diff = curSum - k`.
   - Add `prefixSums[diff]` to `res` (counts subarrays ending here with sum `k`).
   - Increment `prefixSums[curSum]` by `1`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        res = curSum = 0
        prefixSums = { 0 : 1 }

        for num in nums:
            curSum += num
            diff = curSum - k

            res += prefixSums.get(diff, 0)
            prefixSums[curSum] = 1 + prefixSums.get(curSum, 0)

        return res
```

```java
public class Solution {
    public int subarraySum(int[] nums, int k) {
        int res = 0, curSum = 0;
        Map<Integer, Integer> prefixSums = new HashMap<>();
        prefixSums.put(0, 1);

        for (int num : nums) {
            curSum += num;
            int diff = curSum - k;
            res += prefixSums.getOrDefault(diff, 0);
            prefixSums.put(curSum, prefixSums.getOrDefault(curSum, 0) + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        int res = 0, curSum = 0;
        unordered_map<int, int> prefixSums;
        prefixSums[0] = 1;

        for (int num : nums) {
            curSum += num;
            int diff = curSum - k;
            res += prefixSums[diff];
            prefixSums[curSum]++;
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
    subarraySum(nums, k) {
        let res = 0,
            curSum = 0;
        const prefixSums = new Map();
        prefixSums.set(0, 1);

        for (let num of nums) {
            curSum += num;
            let diff = curSum - k;
            res += prefixSums.get(diff) || 0;
            prefixSums.set(curSum, (prefixSums.get(curSum) || 0) + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubarraySum(int[] nums, int k) {
        int res = 0, curSum = 0;
        Dictionary<int, int> prefixSums = new Dictionary<int, int>();
        prefixSums[0] = 1;

        foreach (int num in nums) {
            curSum += num;
            int diff = curSum - k;

            if (prefixSums.ContainsKey(diff)) {
                res += prefixSums[diff];
            }

            if (!prefixSums.ContainsKey(curSum)) {
                prefixSums[curSum] = 0;
            }
            prefixSums[curSum]++;
        }

        return res;
    }
}
```

```go
func subarraySum(nums []int, k int) int {
    res, curSum := 0, 0
    prefixSums := map[int]int{0: 1}

    for _, num := range nums {
        curSum += num
        diff := curSum - k
        res += prefixSums[diff]
        prefixSums[curSum]++
    }

    return res
}
```

```kotlin
class Solution {
    fun subarraySum(nums: IntArray, k: Int): Int {
        var res = 0
        var curSum = 0
        val prefixSums = hashMapOf(0 to 1)

        for (num in nums) {
            curSum += num
            val diff = curSum - k
            res += prefixSums.getOrDefault(diff, 0)
            prefixSums[curSum] = prefixSums.getOrDefault(curSum, 0) + 1
        }

        return res
    }
}
```

```swift
class Solution {
    func subarraySum(_ nums: [Int], _ k: Int) -> Int {
        var res = 0
        var curSum = 0
        var prefixSums = [0: 1]

        for num in nums {
            curSum += num
            let diff = curSum - k
            res += prefixSums[diff] ?? 0
            prefixSums[curSum, default: 0] += 1
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

### Forgetting to Initialize the Hash Map with Zero

The hash map must start with `{0: 1}` to handle subarrays that start from index `0`. Without this initialization, subarrays where `prefixSum == k` from the beginning will not be counted.

### Attempting to Use Sliding Window

Unlike the product variant, this problem allows negative numbers, which means the running sum is non-monotonic. Sliding window does not work here because shrinking the window might increase or decrease the sum unpredictably. The prefix sum + hash map approach is required.

### Updating the Hash Map Before Checking

The order of operations matters. You must first check if `curSum - k` exists in the hash map, then add `curSum` to the map. Reversing this order would incorrectly count the current element as a valid "previous" prefix sum, leading to wrong results.
