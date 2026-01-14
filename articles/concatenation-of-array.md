## 1. Iteration (Two Pass)

### Intuition

To concatenate an array with itself, we need to create a new array that contains all elements of the original array twice, maintaining the same order. The elements at indices $0$ to $n - 1$ are followed by the same elements at indices $n$ to $2n - 1$.

For example, if `nums = [1, 2, 3]`:
- The first three elements of `ans` will be `nums[0]`, `nums[1]`, `nums[2]` -> `[1, 2, 3]`
- The next three elements of `ans` will also be `nums[0]`, `nums[1]`, `nums[2]` -> `[1, 2, 3]`
- Result: `[1, 2, 3, 1, 2, 3]`

### Algorithm

1. Initialize an empty result list or an array `ans` of size `2n`, where `n` is the length of the input array.
2. Use a loop that runs twice.
3. Inside that loop, iterate through every element `num` in the input array `nums`.
4. Append `num` to the result list or assign it to the next available index in the result array.
5. Return the resulting array.

::tabs-start

```python
class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        ans = []
        for i in range(2):
            for num in nums:
                ans.append(num)
        return ans
```

```java
public class Solution {
    public int[] getConcatenation(int[] nums) {
        int[] ans = new int[2 * nums.length];
        int idx = 0;
        for (int i = 0; i < 2; i++) {
            for (int num : nums) {
                ans[idx++] = num;
            }
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        vector<int> ans;
        for (int i = 0; i < 2; ++i) {
            for (int num : nums) {
                ans.push_back(num);
            }
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getConcatenation(nums) {
        let ans = [];
        for (let i = 0; i < 2; i++) {
            for (let num of nums) {
                ans.push(num);
            }
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    public int[] GetConcatenation(int[] nums) {
        int[] ans = new int[2 * nums.Length];
        int idx = 0;
        for (int i = 0; i < 2; i++) {
            foreach (int num in nums) {
                ans[idx++] = num;
            }
        }
        return ans;
    }
}
```

```go
func getConcatenation(nums []int) []int {
    ans := make([]int, 0, 2*len(nums))
    for i := 0; i < 2; i++ {
        for _, num := range nums {
            ans = append(ans, num)
        }
    }
    return ans
}
```

```kotlin
class Solution {
    fun getConcatenation(nums: IntArray): IntArray {
        val ans = IntArray(2 * nums.size)
        var idx = 0
        for (i in 0 until 2) {
            for (num in nums) {
                ans[idx++] = num
            }
        }
        return ans
    }
}
```

```swift
class Solution {
    func getConcatenation(_ nums: [Int]) -> [Int] {
        var ans = [Int]()
        for _ in 0..<2 {
            for num in nums {
                ans.append(num)
            }
        }
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ where $n$ is the length of the input array. We iterate through the array twice, performing $2n$ operations.
- Space complexity: $O(n)$ if we consider the space required for the output array of size $2n$.

---

## 2. Iteration (One Pass)

### Intuition

The problem defines the result array `ans` such that `ans[i] == nums[i]` and `ans[i + n] == nums[i]` for `0 <= i < n`. Instead of looping through the input twice, we can fill both required positions in the result array simultaneously while iterating through the input array just once. This utilizes the index mapping `i` and `i + n` directly.

### Algorithm

1. Determine the length `n` of the input array.
2. Initialize a result array `ans` of size `2n`.
3. Iterate through the input array `nums` using an index `i` from `0` to `n - 1`.
4. For each element at index `i`:
    - Set `ans[i] = nums[i]`.
    - Set `ans[i + n] = nums[i]`.
5. Return the resulting array.

::tabs-start

```python
class Solution:
    def getConcatenation(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [0] * (2 * n)
        for i, num in enumerate(nums):
            ans[i] = ans[i + n] = num
        return ans
```

```java
public class Solution {
    public int[] getConcatenation(int[] nums) {
        int n = nums.length;
        int[] ans = new int[2 * n];
        for (int i = 0; i < n; i++) {
            ans[i] = ans[i + n] = nums[i];
        }
        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(2 * n);
        for (int i = 0; i < n; ++i) {
            ans[i] = ans[i + n] = nums[i];
        }
        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    getConcatenation(nums) {
        let n = nums.length;
        let ans = new Array(2 * n);
        for (let i = 0; i < n; i++) {
            ans[i] = ans[i + n] = nums[i];
        }
        return ans;
    }
}
```

```csharp
public class Solution {
    public int[] GetConcatenation(int[] nums) {
        int n = nums.Length;
        int[] ans = new int[2 * n];
        for (int i = 0; i < n; i++) {
            ans[i] = ans[i + n] = nums[i];
        }
        return ans;
    }
}
```

```go
func getConcatenation(nums []int) []int {
    n := len(nums)
    ans := make([]int, 2*n)
    for i, num := range nums {
        ans[i] = num
        ans[i+n] = num
    }
    return ans
}
```

```kotlin
class Solution {
    fun getConcatenation(nums: IntArray): IntArray {
        val n = nums.size
        val ans = IntArray(2 * n)
        for (i in nums.indices) {
            ans[i] = nums[i]
            ans[i + n] = nums[i]
        }
        return ans
    }
}
```

```swift
class Solution {
    func getConcatenation(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var ans = [Int](repeating: 0, count: 2 * n)
        for i in 0..<n {
            ans[i] = nums[i]
            ans[i + n] = nums[i]
        }
        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ where $n$ is the length of the input array. Although we iterate through the input once, we still perform $2n$ total writes to the output array.
- Space complexity: $O(n)$ as we must allocate an array of size $2n$ for the output.

---

## Common Pitfalls

### Incorrect Result Array Size
Allocating an array of size `n` instead of `2n` causes an index out of bounds error when writing to the second half.

```python
# Wrong
ans = [0] * n

# Correct
ans = [0] * (2 * n)
```

### Off-by-One When Using Index Offset
When using the one-pass approach with `ans[i + n] = nums[i]`, forgetting that indices are zero-based or miscalculating the offset leads to incorrect placement of elements in the second half.
