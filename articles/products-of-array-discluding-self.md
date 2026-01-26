## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Prefix Sum/Product** - Understanding how to build cumulative products from left-to-right and right-to-left to avoid recomputation
- **Array Traversal** - Making multiple passes through an array to build intermediate results efficiently

---

## 1. Brute Force

### Intuition

For each position in the array, we can compute the product of all other elements by multiplying every value except the one at the current index.
This directly follows the problem statement and is the most straightforward approach:
**for each index, multiply all elements except itself.**
Although simple, this method is inefficient because it repeats a full pass through the array for every element.

### Algorithm

1. Let `n` be the length of the input array and create a result array `res` of size `n`.
2. For each index `i` from `0` to `n - 1`:
   - Initialize a running product `prod = 1`.
   - Loop through all indices `j` from `0` to `n - 1`:
     - If `j` is not equal to `i`, multiply `prod` by `nums[j]`.
   - Store `prod` in `res[i]`.
3. After all indices are processed, return `res`.

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n

        for i in range(n):
            prod = 1
            for j in range(n):
                if i == j:
                    continue
                prod *= nums[j]

            res[i] = prod
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);

        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);

        for (let i = 0; i < n; i++) {
            let prod = 1;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];

        for (int i = 0; i < n; i++) {
            int prod = 1;
            for (int j = 0; j < n; j++) {
                if (i != j) {
                    prod *= nums[j];
                }
            }
            res[i] = prod;
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    n := len(nums)
    res := make([]int, n)

    for i := 0; i < n; i++ {
        prod := 1
        for j := 0; j < n; j++ {
            if i == j {
                continue
            }
            prod *= nums[j]
        }
        res[i] = prod
    }
    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)

        for (i in 0 until n) {
            var prod = 1
            for (j in 0 until n) {
                if (i == j) continue
                prod *= nums[j]
            }
            res[i] = prod
        }
        return res
    }
}
```

```swift
class Solution {
    func productExceptSelf(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)

        for i in 0..<n {
            var prod = 1
            for j in 0..<n {
                if i == j {
                    continue
                }
                prod *= nums[j]
            }
            res[i] = prod
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## 2. Division

### Intuition

This approach works by using a simple idea:
If we know the **product of all non-zero numbers**, we can easily compute the answer for each position using division — as long as there are no division-by-zero issues.

So we first check how many zeros the array has:
- If there are **two or more zeros**, then every product will include at least one zero → the entire `res` is all zeros.
- If there is **exactly one zero**, then only the position containing that zero will get the product of all non-zero numbers. All other positions become `0`.
- If there are **no zeros**, we can safely do:
  **result[i] = total_product // nums[i]**

### Algorithm

1. Traverse the array once:
   - Multiply all **non-zero** numbers to get the `prod`.
   - Count how many zeros appear.
2. If the `zero_cnt` is greater than `1`:
   - Return an array of all zeros.
3. Create a result array of size `n`.
4. Loop through the numbers again:
   - If there is one zero:
     - The index with zero gets the `prod` of all non-zero numbers.
     - All other positions get `0`.
   - If there are no zeros:
     - Set each result value to `prod / nums[i]`.
5. Return the result array.

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        prod, zero_cnt = 1, 0
        for num in nums:
            if num:
                prod *= num
            else:
                zero_cnt +=  1
        if zero_cnt > 1: return [0] * len(nums)

        res = [0] * len(nums)
        for i, c in enumerate(nums):
            if zero_cnt: res[i] = 0 if c else prod
            else: res[i] = prod // c
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int prod = 1, zeroCount = 0;
        for (int num : nums) {
            if (num != 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return new int[nums.length];
        }

        int[] res = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            if (zeroCount > 0) {
                res[i] = (nums[i] == 0) ? prod : 0;
            } else {
                res[i] = prod / nums[i];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int prod = 1, zeroCount = 0;
        for (int num : nums) {
            if (num != 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return vector<int>(nums.size(), 0);
        }

        vector<int> res(nums.size());
        for (size_t i = 0; i < nums.size(); i++) {
            if (zeroCount > 0) {
                res[i] = (nums[i] == 0) ? prod : 0;
            } else {
                res[i] = prod / nums[i];
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
     * @return {number[]}
     */
    productExceptSelf(nums) {
        let prod = 1;
        let zeroCount = 0;
        for (let num of nums) {
            if (num !== 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return Array(nums.length).fill(0);
        }

        const res = new Array(nums.length);
        for (let i = 0; i < nums.length; i++) {
            if (zeroCount > 0) {
                res[i] = nums[i] === 0 ? prod : 0;
            } else {
                res[i] = prod / nums[i];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int prod = 1, zeroCount = 0;
        foreach (int num in nums) {
            if (num != 0) {
                prod *= num;
            } else {
                zeroCount++;
            }
        }

        if (zeroCount > 1) {
            return new int[nums.Length];
        }

        int[] res = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) {
            if (zeroCount > 0) {
                res[i] = (nums[i] == 0) ? prod : 0;
            } else {
                res[i] = prod / nums[i];
            }
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    prod := 1
    zeroCount := 0

    for _, num := range nums {
        if num != 0 {
            prod *= num
        } else {
            zeroCount++
        }
    }

    res := make([]int, len(nums))
    if zeroCount > 1 {
        return res
    }

    for i, num := range nums {
        if zeroCount > 0 {
            if num == 0 {
                res[i] = prod
            } else {
                res[i] = 0
            }
        } else {
            res[i] = prod / num
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        var prod = 1
        var zeroCount = 0

        for (num in nums) {
            if (num != 0) {
                prod *= num
            } else {
                zeroCount++
            }
        }

        val res = IntArray(nums.size)
        if (zeroCount > 1) return res

        for (i in nums.indices) {
            res[i] = if (zeroCount > 0) {
                if (nums[i] == 0) prod else 0
            } else {
                prod / nums[i]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func productExceptSelf(_ nums: [Int]) -> [Int] {
        var prod = 1
        var zeroCount = 0

        for num in nums {
            if num != 0 {
                prod *= num
            } else {
                zeroCount += 1
            }
        }

        if zeroCount > 1 {
            return [Int](repeating: 0, count: nums.count)
        }

        var res = [Int](repeating: 0, count: nums.count)
        for (i, num) in nums.enumerated() {
            if zeroCount > 0 {
                res[i] = num == 0 ? prod : 0
            } else {
                res[i] = prod / num
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## 3. Prefix & Suffix

### Intuition

For each index, we need the product of all elements **before it** and all elements **after it**.
Instead of recomputing the product repeatedly, we can pre-compute two helpful arrays:

- **Prefix product**: `pref[i]` = product of all elements to the left of `i`
- **Suffix product**: `suff[i]` = product of all elements to the right of `i`

Then, the final answer for each index is simply:

**result[i] = pref[i] × suff[i]**

This works because:
- The `pref` handles everything before the index
- The `suff` handles everything after the index

Both pieces together form the product of all numbers except the one at that position.

### Algorithm

1. Let `n` be the length of the array.
   Create three arrays of size `n`:
   - `pref` for prefix products
   - `suff` for suffix products
   - `res` for the final result

2. Set:
   - `pref[0] = 1` (nothing to the left of index `0`)
   - `suff[n - 1] = 1` (nothing to the right of last index)

3. Build the prefix product array:
   - For each `i` from `1` to `n - 1`:
     - `pref[i] = nums[i - 1] × pref[i - 1]`

4. Build the suffix product array:
   - For each `i` from `n - 2` down to `0`:
     - `suff[i] = nums[i + 1] × suff[i + 1]`

5. Build the result:
   - For each index `i`, compute:
     - `res[i] = pref[i] × suff[i]`

6. Return the result array.

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [0] * n
        pref = [0] * n
        suff = [0] * n

        pref[0] = suff[n - 1] = 1
        for i in range(1, n):
            pref[i] = nums[i - 1] * pref[i - 1]
        for i in range(n - 2, -1, -1):
            suff[i] = nums[i + 1] * suff[i + 1]
        for i in range(n):
            res[i] = pref[i] * suff[i]
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int[] pref = new int[n];
        int[] suff = new int[n];

        pref[0] = 1;
        suff[n - 1] = 1;
        for (int i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (int i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (int i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n);
        vector<int> pref(n);
        vector<int> suff(n);

        pref[0] = 1;
        suff[n - 1] = 1;
        for (int i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (int i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (int i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n);
        const pref = new Array(n);
        const suff = new Array(n);

        pref[0] = 1;
        suff[n - 1] = 1;
        for (let i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (let i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (let i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        int[] pref = new int[n];
        int[] suff = new int[n];

        pref[0] = 1;
        suff[n - 1] = 1;
        for (int i = 1; i < n; i++) {
            pref[i] = nums[i - 1] * pref[i - 1];
        }
        for (int i = n - 2; i >= 0; i--) {
            suff[i] = nums[i + 1] * suff[i + 1];
        }
        for (int i = 0; i < n; i++) {
            res[i] = pref[i] * suff[i];
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    pref := make([]int, n)
    suff := make([]int, n)

    pref[0], suff[n-1] = 1, 1
    for i := 1; i < n; i++ {
        pref[i] = nums[i-1] * pref[i-1]
    }
    for i := n - 2; i >= 0; i-- {
        suff[i] = nums[i+1] * suff[i+1]
    }
    for i := 0; i < n; i++ {
        res[i] = pref[i] * suff[i]
    }
    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        val n = nums.size
        val res = IntArray(n)
        val pref = IntArray(n)
        val suff = IntArray(n)

        pref[0] = 1
        suff[n - 1] = 1
        for (i in 1 until n) {
            pref[i] = nums[i - 1] * pref[i - 1]
        }
        for (i in n - 2 downTo 0) {
            suff[i] = nums[i + 1] * suff[i + 1]
        }
        for (i in 0 until n) {
            res[i] = pref[i] * suff[i]
        }
        return res
    }
}
```

```swift
class Solution {
    func productExceptSelf(_ nums: [Int]) -> [Int] {
        let n = nums.count
        var res = [Int](repeating: 0, count: n)
        var pref = [Int](repeating: 0, count: n)
        var suff = [Int](repeating: 0, count: n)

        pref[0] = 1
        suff[n - 1] = 1

        for i in 1..<n {
            pref[i] = nums[i - 1] * pref[i - 1]
        }

        for i in stride(from: n - 2, through: 0, by: -1) {
            suff[i] = nums[i + 1] * suff[i + 1]
        }

        for i in 0..<n {
            res[i] = pref[i] * suff[i]
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

## 4. Prefix & Suffix (Optimal)

### Intuition

We can compute the product of all elements except the current one **without using extra prefix and suffix arrays**.
Instead, we reuse the result array and build the answer in two simple passes:

- In the **first pass**, we fill `res[i]` with the product of all elements to the left of `i` (prefix product).
- In the **second pass**, we multiply each `res[i]` with the product of all elements to the right of `i` (`postfix` product).

By maintaining two running values — `prefix` and `postfix` — we avoid the need for separate `pref` and `suff` arrays.
This gives us the same logic as the previous method, but with **O(1) extra space**.

### Algorithm

1. Initialize the result array `res` with all values set to `1`.
2. Create a variable `prefix = 1`.
3. First pass (left to right):
   - For each index `i`:
     - Set `res[i] = prefix` (product of all elements to the left).
     - Update `prefix *= nums[i]`.
4. Create a variable `postfix = 1`.
5. Second pass (right to left):
   - For each index `i`:
     - Multiply `res[i]` by `postfix` (product of all elements to the right).
     - Update `postfix *= nums[i]`.
6. Return the result array `res`.

::tabs-start

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        res = [1] * (len(nums))

        prefix = 1
        for i in range(len(nums)):
            res[i] = prefix
            prefix *= nums[i]
        postfix = 1
        for i in range(len(nums) - 1, -1, -1):
            res[i] *= postfix
            postfix *= nums[i]
        return res
```

```java
public class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];

        res[0] = 1;
        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);

        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums) {
        const n = nums.length;
        const res = new Array(n).fill(1);

        for (let i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        let postfix = 1;
        for (let i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] ProductExceptSelf(int[] nums) {
        int n = nums.Length;
        int[] res = new int[n];
        Array.Fill(res, 1);

        for (int i = 1; i < n; i++) {
            res[i] = res[i - 1] * nums[i - 1];
        }

        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}
```

```go
func productExceptSelf(nums []int) []int {
    res := make([]int, len(nums))
    for i := range res {
        res[i] = 1
    }

    prefix := 1
    for i := 0; i < len(nums); i++ {
        res[i] = prefix
        prefix *= nums[i]
    }

    postfix := 1
    for i := len(nums) - 1; i >= 0; i-- {
        res[i] *= postfix
        postfix *= nums[i]
    }

    return res
}
```

```kotlin
class Solution {
    fun productExceptSelf(nums: IntArray): IntArray {
        val res = IntArray(nums.size) { 1 }

        var prefix = 1
        for (i in nums.indices) {
            res[i] = prefix
            prefix *= nums[i]
        }

        var postfix = 1
        for (i in nums.size - 1 downTo 0) {
            res[i] *= postfix
            postfix *= nums[i]
        }

        return res
    }
}
```

```swift
class Solution {
    func productExceptSelf(_ nums: [Int]) -> [Int] {
        var res = [Int](repeating: 1, count: nums.count)

        var prefix = 1
        for i in 0..<nums.count {
            res[i] = prefix
            prefix *= nums[i]
        }

        var postfix = 1
        for i in stride(from: nums.count - 1, through: 0, by: -1) {
            res[i] *= postfix
            postfix *= nums[i]
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## Common Pitfalls

### Using Division Without Handling Zeros

The division approach (`totalProduct / nums[i]`) fails when the array contains zeros. Dividing by zero causes runtime errors, and having multiple zeros requires special handling. Always count zeros first: with two or more zeros, the entire result is zeros; with exactly one zero, only the zero's position gets the product of other elements.

### Off-by-One Errors in Prefix/Suffix Array Construction

When building prefix products, `pref[i]` should contain the product of elements **before** index `i`, not including `nums[i]`. A common mistake is including `nums[i]` in the prefix, which double-counts the element. The same applies to suffix arrays: `suff[i]` should exclude `nums[i]`.

### Integer Overflow with Large Products

When the array contains many large numbers, the product can overflow 32-bit integers. In languages with fixed-size integers, consider using `long` or `BigInteger`. The problem constraints usually prevent overflow, but edge cases with many elements near the maximum value should be tested.
