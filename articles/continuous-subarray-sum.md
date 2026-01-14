## 1. Brute Force

### Intuition
The straightforward approach is to check every possible subarray of size at least 2 and see if its sum is a multiple of `k`. A number is a multiple of `k` if dividing it by `k` leaves no remainder. We iterate through all starting and ending positions to examine every valid subarray.

### Algorithm
1. Iterate through all possible starting indices `i` from `0` to `n-2` (we need at least 2 elements).
2. For each starting index, maintain a running sum starting with `nums[i]`.
3. Extend the subarray by iterating through ending indices `j` from `i+1` to `n-1`, adding each element to the running sum.
4. After adding each element, check if the sum is divisible by `k` (`sum % k == 0`).
5. If we find such a subarray, return `true` immediately.
6. If no valid subarray is found after checking all possibilities, return `false`.

::tabs-start

```python
class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        for i in range(len(nums) - 1):
            sum = nums[i]
            for j in range(i + 1, len(nums)):
                sum += nums[j]
                if sum % k == 0:
                    return True
        return False
```

```java
public class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        for (int i = 0; i < nums.length - 1; i++) {
            int sum = nums[i];
            for (int j = i + 1; j < nums.length; j++) {
                sum += nums[j];
                if (sum % k == 0) return true;
            }
        }
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        for (int i = 0; i < nums.size() - 1; i++) {
            int sum = nums[i];
            for (int j = i + 1; j < nums.size(); j++) {
                sum += nums[j];
                if (sum % k == 0) return true;
            }
        }
        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    checkSubarraySum(nums, k) {
        for (let i = 0; i < nums.length - 1; i++) {
            let sum = nums[i];
            for (let j = i + 1; j < nums.length; j++) {
                sum += nums[j];
                if (sum % k == 0) return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        for (int i = 0; i < nums.Length - 1; i++) {
            int sum = nums[i];
            for (int j = i + 1; j < nums.Length; j++) {
                sum += nums[j];
                if (sum % k == 0) {
                    return true;
                }
            }
        }
        return false;
    }
}
```

```go
func checkSubarraySum(nums []int, k int) bool {
    for i := 0; i < len(nums)-1; i++ {
        sum := nums[i]
        for j := i + 1; j < len(nums); j++ {
            sum += nums[j]
            if sum%k == 0 {
                return true
            }
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun checkSubarraySum(nums: IntArray, k: Int): Boolean {
        for (i in 0 until nums.size - 1) {
            var sum = nums[i]
            for (j in i + 1 until nums.size) {
                sum += nums[j]
                if (sum % k == 0) {
                    return true
                }
            }
        }
        return false
    }
}
```

```swift
class Solution {
    func checkSubarraySum(_ nums: [Int], _ k: Int) -> Bool {
        for i in 0..<(nums.count - 1) {
            var sum = nums[i]
            for j in (i + 1)..<nums.count {
                sum += nums[j]
                if sum % k == 0 {
                    return true
                }
            }
        }
        return false
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
The key insight is based on modular arithmetic. If the prefix sum up to index `i` has remainder `r` when divided by `k`, and the prefix sum up to index `j` also has remainder `r`, then the subarray from `i+1` to `j` has a sum that is a multiple of `k`. This is because `(prefixSum[j] - prefixSum[i]) % k = 0` when both have the same remainder. We use a hash map to store the first index where each remainder was seen.

### Algorithm
1. Create a hash map to store remainder values and their first occurrence index. Initialize it with `{0: -1}` to handle cases where the prefix sum itself is divisible by `k`.
2. Maintain a running total as we iterate through the array.
3. For each element, add it to the total and compute the remainder (`total % k`).
4. If this remainder exists in the map and the subarray length is at least 2 (current index minus stored index > 1), return `true`.
5. If the remainder is not in the map, store it with the current index.
6. Return `false` if no valid subarray is found.

::tabs-start

```python
class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        remainder = {0: -1}  # remainder -> end index
        total = 0

        for i, num in enumerate(nums):
            total += num
            r = total % k
            if r not in remainder:
                remainder[r] = i
            elif i - remainder[r] > 1:
                return True

        return False
```

```java
public class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        HashMap<Integer, Integer> remainder = new HashMap<>();
        remainder.put(0, -1);
        int total = 0;

        for (int i = 0; i < nums.length; i++) {
            total += nums[i];
            int r = total % k;
            if (!remainder.containsKey(r)) {
                remainder.put(r, i);
            } else if (i - remainder.get(r) > 1) {
                return true;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> remainder;
        remainder[0] = -1;
        int total = 0;

        for (int i = 0; i < nums.size(); i++) {
            total += nums[i];
            int r = total % k;
            if (remainder.find(r) == remainder.end()) {
                remainder[r] = i;
            } else if (i - remainder[r] > 1) {
                return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {boolean}
     */
    checkSubarraySum(nums, k) {
        const remainder = new Map();
        remainder.set(0, -1);
        let total = 0;

        for (let i = 0; i < nums.length; i++) {
            total += nums[i];
            let r = total % k;
            if (!remainder.has(r)) {
                remainder.set(r, i);
            } else if (i - remainder.get(r) > 1) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool CheckSubarraySum(int[] nums, int k) {
        Dictionary<int, int> remainder = new Dictionary<int, int>();
        remainder[0] = -1;
        int total = 0;

        for (int i = 0; i < nums.Length; i++) {
            total += nums[i];
            int r = total % k;
            if (!remainder.ContainsKey(r)) {
                remainder[r] = i;
            } else if (i - remainder[r] > 1) {
                return true;
            }
        }

        return false;
    }
}
```

```go
func checkSubarraySum(nums []int, k int) bool {
    remainder := map[int]int{0: -1}
    total := 0

    for i, num := range nums {
        total += num
        r := total % k
        if idx, ok := remainder[r]; !ok {
            remainder[r] = i
        } else if i-idx > 1 {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun checkSubarraySum(nums: IntArray, k: Int): Boolean {
        val remainder = mutableMapOf(0 to -1)
        var total = 0

        for (i in nums.indices) {
            total += nums[i]
            val r = total % k
            if (r !in remainder) {
                remainder[r] = i
            } else if (i - remainder[r]!! > 1) {
                return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func checkSubarraySum(_ nums: [Int], _ k: Int) -> Bool {
        var remainder: [Int: Int] = [0: -1]
        var total = 0

        for i in 0..<nums.count {
            total += nums[i]
            let r = total % k
            if let idx = remainder[r] {
                if i - idx > 1 {
                    return true
                }
            } else {
                remainder[r] = i
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(k)$

> Where $n$ is the size of the array $nums$ and $k$ is the number that a subarray sum needs to be multiple of.

---

## Common Pitfalls

### Forgetting to Initialize Hash Map with `{0: -1}`
The hash map must be initialized with remainder `0` at index `-1` to handle cases where the prefix sum itself (from index 0 to current) is divisible by `k`. Without this, you miss valid subarrays that start from index 0.

```python
# Wrong - misses subarrays starting at index 0
remainder = {}

# Correct
remainder = {0: -1}
```

### Not Enforcing Minimum Subarray Length of 2
The problem requires the subarray to have at least 2 elements. A common mistake is checking `i - remainder[r] >= 1` instead of `> 1`, which would accept single-element subarrays.

```python
# Wrong - accepts single-element subarrays
elif i - remainder[r] >= 1:

# Correct - ensures at least 2 elements
elif i - remainder[r] > 1:
```

### Updating the Hash Map When Remainder Already Exists
When the same remainder is seen again, you should NOT update its index. We need the earliest index for each remainder to maximize the subarray length and correctly detect valid subarrays. Updating would shrink the window and potentially miss valid answers.
