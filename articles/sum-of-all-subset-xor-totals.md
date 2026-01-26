## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Recursion/Backtracking** - Used to generate all possible subsets by making include/exclude decisions for each element
- **XOR Operation** - Understanding that XOR is self-inverse (a ^ a = 0) and its bit-level behavior
- **Bit Manipulation** - Bitmasks can represent subsets, and the optimal solution uses OR and bit shifting

---

## 1. Backtracking

### Intuition

We need to generate all possible subsets and compute the XOR total of each. The standard backtracking approach builds subsets by deciding for each element whether to include it or not. At each step, we compute the XOR of the current subset and add it to our running total.

### Algorithm

1. Initialize `res = 0` to accumulate the sum of XOR totals.
2. Define a backtracking function that takes the current `index` and the current `subset`:
   - Compute the XOR of all elements in the `subset` and add it to `res`.
   - For each remaining element starting from the current `index`:
     - Add the element to the `subset`.
     - Recursively call `backtrack` with the next `index`.
     - Remove the element from the `subset`.
3. Call the backtracking function starting at `index` `0` with an empty `subset`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        res = 0

        def backtrack(i, subset):
            nonlocal res
            xorr = 0
            for num in subset:
                xorr ^= num
            res += xorr

            for j in range(i, len(nums)):
                subset.append(nums[j])
                backtrack(j + 1, subset)
                subset.pop()

        backtrack(0, [])
        return res
```

```java
public class Solution {
    int res = 0;

    public int subsetXORSum(int[] nums) {
        backtrack(0, nums, new ArrayList<>());
        return res;
    }

    private void backtrack(int i, int[] nums, List<Integer> subset) {
        int xorr = 0;
        for (int num : subset) xorr ^= num;
        res += xorr;

        for (int j = i; j < nums.length; j++) {
            subset.add(nums[j]);
            backtrack(j + 1, nums, subset);
            subset.remove(subset.size() - 1);
        }
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int res = 0;
        vector<int> subset;

        function<void(int)> backtrack = [&](int i) {
            int xorr = 0;
            for (int num : subset) xorr ^= num;
            res += xorr;

            for (int j = i; j < nums.size(); ++j) {
                subset.push_back(nums[j]);
                backtrack(j + 1);
                subset.pop_back();
            }
        };

        backtrack(0);
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
    subsetXORSum(nums) {
        let res = 0;

        const backtrack = (i, subset) => {
            let xorr = 0;
            for (let num of subset) xorr ^= num;
            res += xorr;

            for (let j = i; j < nums.length; j++) {
                subset.push(nums[j]);
                backtrack(j + 1, subset);
                subset.pop();
            }
        };

        backtrack(0, []);
        return res;
    }
}
```

```csharp
public class Solution {
    private int res = 0;

    public int SubsetXORSum(int[] nums) {
        Backtrack(0, new List<int>(), nums);
        return res;
    }

    private void Backtrack(int i, List<int> subset, int[] nums) {
        int xorr = 0;
        foreach (int num in subset) {
            xorr ^= num;
        }
        res += xorr;

        for (int j = i; j < nums.Length; j++) {
            subset.Add(nums[j]);
            Backtrack(j + 1, subset, nums);
            subset.RemoveAt(subset.Count - 1);
        }
    }
}
```

```go
func subsetXORSum(nums []int) int {
    res := 0

    var backtrack func(i int, subset []int)
    backtrack = func(i int, subset []int) {
        xorr := 0
        for _, num := range subset {
            xorr ^= num
        }
        res += xorr

        for j := i; j < len(nums); j++ {
            subset = append(subset, nums[j])
            backtrack(j+1, subset)
            subset = subset[:len(subset)-1]
        }
    }

    backtrack(0, []int{})
    return res
}
```

```kotlin
class Solution {
    private var res = 0

    fun subsetXORSum(nums: IntArray): Int {
        backtrack(0, mutableListOf(), nums)
        return res
    }

    private fun backtrack(i: Int, subset: MutableList<Int>, nums: IntArray) {
        var xorr = 0
        for (num in subset) {
            xorr = xorr xor num
        }
        res += xorr

        for (j in i until nums.size) {
            subset.add(nums[j])
            backtrack(j + 1, subset, nums)
            subset.removeAt(subset.size - 1)
        }
    }
}
```

```swift
class Solution {
    func subsetXORSum(_ nums: [Int]) -> Int {
        var res = 0

        func backtrack(_ i: Int, _ subset: inout [Int]) {
            var xorr = 0
            for num in subset {
                xorr ^= num
            }
            res += xorr

            for j in i..<nums.count {
                subset.append(nums[j])
                backtrack(j + 1, &subset)
                subset.removeLast()
            }
        }

        var subset = [Int]()
        backtrack(0, &subset)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Recursion

### Intuition

A cleaner recursive approach avoids explicitly building subsets. For each element, we make a binary choice: include it in the XOR or skip it. We pass the running XOR total down the recursion tree. When we reach the end of the array, we return the accumulated XOR value. The sum of all returned values gives us the total.

### Algorithm

1. Define a recursive function `dfs(i, total)` where `i` is the current `index` and `total` is the running XOR:
   - Base case: If `i == len(nums)`, return `total`.
   - Recursive case: Return `dfs(i + 1, total ^ nums[i]) + dfs(i + 1, total)`.
     - The first call includes `nums[i]` in the XOR.
     - The second call excludes `nums[i]`.
2. Call `dfs(0, 0)` and return the `result`.

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        def dfs(i, total):
            if i == len(nums):
                return total
            return dfs(i + 1, total ^ nums[i]) + dfs(i + 1, total)

        return dfs(0, 0)
```

```java
public class Solution {
    public int subsetXORSum(int[] nums) {
        return dfs(nums, 0, 0);
    }

    private int dfs(int[] nums, int i, int total) {
        if (i == nums.length) {
            return total;
        }
        return dfs(nums, i + 1, total ^ nums[i]) + dfs(nums, i + 1, total);
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        return dfs(nums, 0, 0);
    }

private:
    int dfs(vector<int>& nums, int i, int total) {
        if (i == nums.size()) {
            return total;
        }
        return dfs(nums, i + 1, total ^ nums[i]) + dfs(nums, i + 1, total);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    subsetXORSum(nums) {
        const dfs = (i, total) => {
            if (i === nums.length) {
                return total;
            }
            return dfs(i + 1, total ^ nums[i]) + dfs(i + 1, total);
        };

        return dfs(0, 0);
    }
}
```

```csharp
public class Solution {
    public int SubsetXORSum(int[] nums) {
        return Dfs(0, 0, nums);
    }

    private int Dfs(int i, int total, int[] nums) {
        if (i == nums.Length) {
            return total;
        }
        return Dfs(i + 1, total ^ nums[i], nums) + Dfs(i + 1, total, nums);
    }
}
```

```go
func subsetXORSum(nums []int) int {
    var dfs func(i, total int) int
    dfs = func(i, total int) int {
        if i == len(nums) {
            return total
        }
        return dfs(i+1, total^nums[i]) + dfs(i+1, total)
    }

    return dfs(0, 0)
}
```

```kotlin
class Solution {
    fun subsetXORSum(nums: IntArray): Int {
        fun dfs(i: Int, total: Int): Int {
            if (i == nums.size) {
                return total
            }
            return dfs(i + 1, total xor nums[i]) + dfs(i + 1, total)
        }

        return dfs(0, 0)
    }
}
```

```swift
class Solution {
    func subsetXORSum(_ nums: [Int]) -> Int {
        func dfs(_ i: Int, _ total: Int) -> Int {
            if i == nums.count {
                return total
            }
            return dfs(i + 1, total ^ nums[i]) + dfs(i + 1, total)
        }

        return dfs(0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Bit Manipulation

### Intuition

Every subset can be represented by a bitmask where bit `i` indicates whether element `i` is included. With `n` elements, there are `2^n` subsets corresponding to masks from `0` to `2^n - 1`. We iterate through all masks, compute the XOR of selected elements for each mask, and sum them up.

### Algorithm

1. Initialize `res = 0`.
2. For each `mask` from `0` to `2^n - 1`:
   - Initialize `xorr = 0`.
   - For each bit position `i` from `0` to `n - 1`:
     - If bit `i` is set in the `mask`, XOR `nums[i]` into `xorr`.
   - Add `xorr` to `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0

        for mask in range(1 << n):
            xorr = 0
            for i in range(n):
                if mask & (1 << i):
                    xorr ^= nums[i]
            res += xorr

        return res
```

```java
public class Solution {
    public int subsetXORSum(int[] nums) {
        int n = nums.length;
        int res = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            int xorr = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & ( 1 << i)) != 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int n = nums.size();
        int res = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            int xorr = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & ( 1 << i)) != 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
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
    subsetXORSum(nums) {
        const n = nums.length;
        let res = 0;

        for (let mask = 0; mask < 1 << n; mask++) {
            let xorr = 0;
            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) !== 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int SubsetXORSum(int[] nums) {
        int n = nums.Length;
        int res = 0;

        for (int mask = 0; mask < (1 << n); mask++) {
            int xorr = 0;
            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    xorr ^= nums[i];
                }
            }
            res += xorr;
        }

        return res;
    }
}
```

```go
func subsetXORSum(nums []int) int {
    n := len(nums)
    res := 0

    for mask := 0; mask < (1 << n); mask++ {
        xorr := 0
        for i := 0; i < n; i++ {
            if mask&(1<<i) != 0 {
                xorr ^= nums[i]
            }
        }
        res += xorr
    }

    return res
}
```

```kotlin
class Solution {
    fun subsetXORSum(nums: IntArray): Int {
        val n = nums.size
        var res = 0

        for (mask in 0 until (1 shl n)) {
            var xorr = 0
            for (i in 0 until n) {
                if (mask and (1 shl i) != 0) {
                    xorr = xorr xor nums[i]
                }
            }
            res += xorr
        }

        return res
    }
}
```

```swift
class Solution {
    func subsetXORSum(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = 0

        for mask in 0..<(1 << n) {
            var xorr = 0
            for i in 0..<n {
                if mask & (1 << i) != 0 {
                    xorr ^= nums[i]
                }
            }
            res += xorr
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(1)$ extra space.

---

## 4. Bit Manipulation (Optimal)

### Intuition

Each bit position in any number contributes independently to the XOR totals. For any bit that is set in at least one number, exactly half of all subsets will have that bit set in their XOR result (because each element either flips the bit or not, and the combinations balance out). The OR of all numbers gives us all bits that appear in at least one element. Each such bit contributes its value multiplied by `2^(n-1)` subsets.

### Algorithm

1. Compute the OR of all elements in `nums`. This gives a number where each `bit` is set if and only if that `bit` is set in at least one element.
2. Left shift the `result` by `n - 1` positions (multiply by `2^(n-1)`).
3. Return the `result`.

::tabs-start

```python
class Solution:
    def subsetXORSum(self, nums: List[int]) -> int:
        res = 0
        for num in nums:
            res |= num
        return res << (len(nums) - 1)
```

```java
public class Solution {
    public int subsetXORSum(int[] nums) {
        int res = 0;
        for (int num : nums) {
            res |= num;
        }
        return res << (nums.length - 1);
    }
}
```

```cpp
class Solution {
public:
    int subsetXORSum(vector<int>& nums) {
        int res = 0;
        for (int& num : nums) {
            res |= num;
        }
        return res << (nums.size() - 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    subsetXORSum(nums) {
        let res = 0;
        for (let num of nums) {
            res |= num;
        }
        return res << (nums.length - 1);
    }
}
```

```csharp
public class Solution {
    public int SubsetXORSum(int[] nums) {
        int res = 0;
        foreach (int num in nums) {
            res |= num;
        }
        return res << (nums.Length - 1);
    }
}
```

```go
func subsetXORSum(nums []int) int {
    res := 0
    for _, num := range nums {
        res |= num
    }
    return res << (len(nums) - 1)
}
```

```kotlin
class Solution {
    fun subsetXORSum(nums: IntArray): Int {
        var res = 0
        for (num in nums) {
            res = res or num
        }
        return res shl (nums.size - 1)
    }
}
```

```swift
class Solution {
    func subsetXORSum(_ nums: [Int]) -> Int {
        var res = 0
        for num in nums {
            res |= num
        }
        return res << (nums.count - 1)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Forgetting the Empty Subset

The problem includes all subsets, including the empty subset which has an XOR value of 0. While this does not affect the sum, a common conceptual error is starting the subset generation from size 1 instead of size 0, or incorrectly counting the total number of subsets as `2^n - 1` instead of `2^n`. This can lead to off-by-one issues in verification.

### Misunderstanding XOR Properties

A frequent mistake is confusing XOR with addition or other operations. XOR has the property that `a ^ a = 0` and `a ^ 0 = a`. When computing subset XOR totals, some assume that duplicate elements cancel out across all subsets, but each subset is computed independently. Also, the optimal solution relies on understanding that each bit appears in exactly half of all subsets, which requires grasping XOR's bit-level behavior.
