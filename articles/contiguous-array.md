## 1. Brute Force

### Intuition
The simplest approach is to check every possible subarray and count the number of zeros and ones in each. When we find a subarray where the count of zeros equals the count of ones, we have found a valid contiguous array. We keep track of the maximum length among all valid subarrays.

### Algorithm
1. Iterate through all possible starting indices `i` from `0` to `n-1`.
2. For each starting index, iterate through all possible ending indices `j` from `i` to `n-1`.
3. Maintain counts of zeros and ones as we extend the subarray.
4. Whenever the count of zeros equals the count of ones, update the result if this subarray is longer than the current maximum.
5. Return the maximum length found.

::tabs-start

```python
class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        n, res = len(nums), 0

        for i in range(n):
            zeros = ones = 0
            for j in range(i, n):
                if nums[j] == 1:
                    ones += 1
                else:
                    zeros += 1

                if ones == zeros and res < (j - i + 1):
                    res = j - i + 1

        return res
```

```java
public class Solution {
    public int findMaxLength(int[] nums) {
        int n = nums.length, res = 0;

        for (int i = 0; i < n; i++) {
            int zeros = 0, ones = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 1) {
                    ones++;
                } else {
                    zeros++;
                }
                if (ones == zeros && res < (j - i + 1)) {
                    res = j - i + 1;
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
    int findMaxLength(vector<int>& nums) {
        int n = nums.size(), res = 0;

        for (int i = 0; i < n; i++) {
            int zeros = 0, ones = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 1) {
                    ones++;
                } else {
                    zeros++;
                }
                if (ones == zeros && res < (j - i + 1)) {
                    res = j - i + 1;
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
    findMaxLength(nums) {
        let n = nums.length,
            res = 0;

        for (let i = 0; i < n; i++) {
            let zeros = 0,
                ones = 0;
            for (let j = i; j < n; j++) {
                if (nums[j] === 1) {
                    ones++;
                } else {
                    zeros++;
                }
                if (ones === zeros && res < j - i + 1) {
                    res = j - i + 1;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMaxLength(int[] nums) {
        int n = nums.Length, res = 0;

        for (int i = 0; i < n; i++) {
            int zeros = 0, ones = 0;
            for (int j = i; j < n; j++) {
                if (nums[j] == 1) {
                    ones++;
                } else {
                    zeros++;
                }
                if (ones == zeros && res < (j - i + 1)) {
                    res = j - i + 1;
                }
            }
        }

        return res;
    }
}
```

```go
func findMaxLength(nums []int) int {
    n := len(nums)
    res := 0

    for i := 0; i < n; i++ {
        zeros, ones := 0, 0
        for j := i; j < n; j++ {
            if nums[j] == 1 {
                ones++
            } else {
                zeros++
            }
            if ones == zeros && res < j-i+1 {
                res = j - i + 1
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findMaxLength(nums: IntArray): Int {
        val n = nums.size
        var res = 0

        for (i in 0 until n) {
            var zeros = 0
            var ones = 0
            for (j in i until n) {
                if (nums[j] == 1) {
                    ones++
                } else {
                    zeros++
                }
                if (ones == zeros && res < j - i + 1) {
                    res = j - i + 1
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findMaxLength(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0

        for i in 0..<n {
            var zeros = 0
            var ones = 0
            for j in i..<n {
                if nums[j] == 1 {
                    ones += 1
                } else {
                    zeros += 1
                }
                if ones == zeros && res < j - i + 1 {
                    res = j - i + 1
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

## 2. Array

### Intuition
Instead of counting zeros and ones separately, we can treat zeros as `-1` and ones as `+1`. When we compute a running sum, any subarray with equal zeros and ones will have a sum of `0`. More importantly, if the running sum at index `i` equals the running sum at index `j`, then the subarray from `i+1` to `j` has equal zeros and ones. We use an array to store the first occurrence of each possible running sum value.

### Algorithm
1. Create an array `diffIndex` of size `2n+1` to store indices (the sum can range from `-n` to `+n`).
2. Initialize a running count starting at `0`.
3. For each element, add `+1` if it's `1`, or `-1` if it's `0`.
4. If count equals `0`, the entire subarray from the start to the current index is valid.
5. If we've seen this count value before, the subarray between the first occurrence and the current index has equal zeros and ones. Update the result accordingly.
6. If this is the first time seeing this count, store the current index.
7. Return the maximum length found.

::tabs-start

```python
class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        diff_index = [None] * (2 * n + 1)
        count = 0

        for i in range(n):
            count += 1 if nums[i] == 1 else -1
            if count == 0:
                res = i + 1
            if diff_index[count + n] is not None:
                res = max(res, i - diff_index[count + n])
            else:
                diff_index[count + n] = i

        return res
```

```java
public class Solution {
    public int findMaxLength(int[] nums) {
        int n = nums.length, res = 0, count = 0;
        int[] diffIndex = new int[2 * n + 1];
        Arrays.fill(diffIndex, -2);
        diffIndex[n] = -1;

        for (int i = 0; i < n; i++) {
            count += nums[i] == 1 ? 1 : -1;
            if (diffIndex[count + n] != -2) {
                res = Math.max(res, i - diffIndex[count + n]);
            } else {
                diffIndex[count + n] = i;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        int n = nums.size(), res = 0, count = 0;
        vector<int> diffIndex(2 * n + 1, -2);
        diffIndex[n] = -1;

        for (int i = 0; i < n; i++) {
            count += nums[i] == 1 ? 1 : -1;
            if (diffIndex[count + n] != -2) {
                res = max(res, i - diffIndex[count + n]);
            } else {
                diffIndex[count + n] = i;
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
    findMaxLength(nums) {
        const n = nums.length;
        let res = 0,
            count = 0;
        const diffIndex = new Array(2 * n + 1).fill(-2);
        diffIndex[n] = -1;

        for (let i = 0; i < n; i++) {
            count += nums[i] === 1 ? 1 : -1;
            if (diffIndex[count + n] !== -2) {
                res = Math.max(res, i - diffIndex[count + n]);
            } else {
                diffIndex[count + n] = i;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMaxLength(int[] nums) {
        int n = nums.Length, res = 0, count = 0;
        int[] diffIndex = new int[2 * n + 1];
        Array.Fill(diffIndex, -2);
        diffIndex[n] = -1;

        for (int i = 0; i < n; i++) {
            count += nums[i] == 1 ? 1 : -1;
            if (diffIndex[count + n] != -2) {
                res = Math.Max(res, i - diffIndex[count + n]);
            } else {
                diffIndex[count + n] = i;
            }
        }

        return res;
    }
}
```

```go
func findMaxLength(nums []int) int {
    n := len(nums)
    res, count := 0, 0
    diffIndex := make([]int, 2*n+1)
    for i := range diffIndex {
        diffIndex[i] = -2
    }
    diffIndex[n] = -1

    for i := 0; i < n; i++ {
        if nums[i] == 1 {
            count++
        } else {
            count--
        }
        if diffIndex[count+n] != -2 {
            if res < i-diffIndex[count+n] {
                res = i - diffIndex[count+n]
            }
        } else {
            diffIndex[count+n] = i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findMaxLength(nums: IntArray): Int {
        val n = nums.size
        var res = 0
        var count = 0
        val diffIndex = IntArray(2 * n + 1) { -2 }
        diffIndex[n] = -1

        for (i in 0 until n) {
            count += if (nums[i] == 1) 1 else -1
            if (diffIndex[count + n] != -2) {
                res = maxOf(res, i - diffIndex[count + n])
            } else {
                diffIndex[count + n] = i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findMaxLength(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0
        var count = 0
        var diffIndex = Array(repeating: -2, count: 2 * n + 1)
        diffIndex[n] = -1

        for i in 0..<n {
            count += nums[i] == 1 ? 1 : -1
            if diffIndex[count + n] != -2 {
                res = max(res, i - diffIndex[count + n])
            } else {
                diffIndex[count + n] = i
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

## 3. Hash Map

### Intuition
This approach uses the same logic as the array solution but replaces the fixed-size array with a hash map. The key insight remains the same: if the difference between ones and zeros at two different indices is the same, the subarray between them contains equal zeros and ones. A hash map provides more flexibility and can be more memory-efficient when the array is sparse or when we want cleaner code.

### Algorithm
1. Initialize counters for zeros and ones, and create a hash map to store the first index where each difference value (`ones - zeros`) occurred.
2. Iterate through the array, incrementing the appropriate counter for each element.
3. If `zeros` equals `ones`, the entire prefix is valid, so update the result.
4. Otherwise, check if we've seen the current difference before. If yes, the subarray from that previous index to the current position has equal zeros and ones.
5. Store the difference and its index in the hash map only if it hasn't been stored before (we want the earliest occurrence to maximize length).
6. Return the maximum length found.

::tabs-start

```python
class Solution:
    def findMaxLength(self, nums: List[int]) -> int:
        zero = one = res = 0
        diff_index = {}

        for i, n in enumerate(nums):
            if n == 0:
                zero += 1
            else:
                one += 1

            if one - zero not in diff_index:
                diff_index[one - zero] = i

            if one == zero:
                res = one + zero
            else:
                idx = diff_index[one - zero]
                res = max(res, i - idx)

        return res
```

```java
public class Solution {
    public int findMaxLength(int[] nums) {
        int zero = 0, one = 0, res = 0;
        HashMap<Integer, Integer> diffIndex = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) {
                zero++;
            } else {
                one++;
            }

            int diff = one - zero;
            if (!diffIndex.containsKey(diff)) {
                diffIndex.put(diff, i);
            }

            if (one == zero) {
                res = one + zero;
            } else {
                res = Math.max(res, i - diffIndex.get(diff));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        int zero = 0, one = 0, res = 0;
        unordered_map<int, int> diffIndex;

        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 0) {
                zero++;
            } else {
                one++;
            }

            int diff = one - zero;
            if (diffIndex.find(diff) == diffIndex.end()) {
                diffIndex[diff] = i;
            }

            if (one == zero) {
                res = one + zero;
            } else {
                res = max(res, i - diffIndex[diff]);
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
    findMaxLength(nums) {
        let zero = 0,
            one = 0,
            res = 0;
        const diffIndex = new Map();

        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === 0) {
                zero++;
            } else {
                one++;
            }

            const diff = one - zero;
            if (!diffIndex.has(diff)) {
                diffIndex.set(diff, i);
            }

            if (one === zero) {
                res = one + zero;
            } else {
                res = Math.max(res, i - diffIndex.get(diff));
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMaxLength(int[] nums) {
        int zero = 0, one = 0, res = 0;
        Dictionary<int, int> diffIndex = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] == 0) {
                zero++;
            } else {
                one++;
            }

            int diff = one - zero;
            if (!diffIndex.ContainsKey(diff)) {
                diffIndex[diff] = i;
            }

            if (one == zero) {
                res = one + zero;
            } else {
                res = Math.Max(res, i - diffIndex[diff]);
            }
        }

        return res;
    }
}
```

```go
func findMaxLength(nums []int) int {
    zero, one, res := 0, 0, 0
    diffIndex := make(map[int]int)

    for i, n := range nums {
        if n == 0 {
            zero++
        } else {
            one++
        }

        diff := one - zero
        if _, ok := diffIndex[diff]; !ok {
            diffIndex[diff] = i
        }

        if one == zero {
            res = one + zero
        } else {
            if res < i-diffIndex[diff] {
                res = i - diffIndex[diff]
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findMaxLength(nums: IntArray): Int {
        var zero = 0
        var one = 0
        var res = 0
        val diffIndex = mutableMapOf<Int, Int>()

        for (i in nums.indices) {
            if (nums[i] == 0) {
                zero++
            } else {
                one++
            }

            val diff = one - zero
            if (diff !in diffIndex) {
                diffIndex[diff] = i
            }

            res = if (one == zero) {
                one + zero
            } else {
                maxOf(res, i - diffIndex[diff]!!)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findMaxLength(_ nums: [Int]) -> Int {
        var zero = 0
        var one = 0
        var res = 0
        var diffIndex = [Int: Int]()

        for i in 0..<nums.count {
            if nums[i] == 0 {
                zero += 1
            } else {
                one += 1
            }

            let diff = one - zero
            if diffIndex[diff] == nil {
                diffIndex[diff] = i
            }

            if one == zero {
                res = one + zero
            } else {
                res = max(res, i - diffIndex[diff]!)
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

### Forgetting to Initialize the Hash Map with Zero Difference
When the running sum (ones - zeros) becomes zero, the entire prefix from index 0 is valid. To handle this case uniformly, you must initialize the map with `{0: -1}` or handle it separately. Missing this causes incorrect results for subarrays starting at index 0.
```python
# Wrong: No initialization for diff == 0
diff_index = {}  # Misses subarrays starting from index 0

# Correct: Initialize with base case
diff_index = {0: -1}  # or handle diff == 0 separately
```

### Updating Hash Map Before Checking for Duplicates
You must check if the current difference already exists in the map BEFORE storing the current index. Storing first will overwrite the earlier index, and you want the earliest occurrence to maximize subarray length.
```python
# Wrong: Store before check overwrites earlier index
diff_index[diff] = i
if diff in diff_index:
    res = max(res, i - diff_index[diff])  # Always 0!

# Correct: Check first, then store only if new
if diff not in diff_index:
    diff_index[diff] = i
```

### Using Count of Ones Minus Zeros Without the Conversion Trick
The key insight is treating 0s as -1s so that equal counts yield a sum of 0. If you track ones and zeros separately without using this transformation, you cannot efficiently detect when a subarray has equal counts using the hash map approach.
