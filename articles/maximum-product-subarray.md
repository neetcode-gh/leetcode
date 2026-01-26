## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming (Kadane's Algorithm)** - Understanding how to track optimal subarray values while iterating through an array
- **Handling Negative Numbers in Products** - Recognizing that a negative times a negative becomes positive, requiring tracking of both min and max
- **Prefix/Suffix Products** - Using cumulative products from both directions to find optimal subarrays

---

## 1. Brute Force

### Intuition
A **subarray product** can change drastically because of:
- **Negative numbers** → can flip max to min and vice-versa
- **Zero** → resets the product

In brute force, we:
- Fix a starting index
- Keep multiplying elements to the right
- Track the maximum product seen

This works because every possible contiguous subarray is explicitly evaluated.

### Algorithm
1. Initialize `res` with the first element.
2. For each starting index `i`:
   - Set `cur = nums[i]`.
   - Update `res`.
   - For every `j > i`:
     - Multiply `cur *= nums[j]`.
     - Update `res`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        res = nums[0]

        for i in range(len(nums)):
            cur = nums[i]
            res = max(res, cur)
            for j in range(i + 1, len(nums)):
                cur *= nums[j]
                res = max(res, cur)

        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];

        for (int i = 0; i < nums.length; i++) {
            int cur = nums[i];
            res = Math.max(res, cur);
            for (int j = i + 1; j < nums.length; j++) {
                cur *= nums[j];
                res = Math.max(res, cur);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];

        for (int i = 0; i < nums.size(); i++) {
            int cur = nums[i];
            res = max(res, cur);
            for (int j = i + 1; j < nums.size(); j++) {
                cur *= nums[j];
                res = max(res, cur);
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
    maxProduct(nums) {
        let res = nums[0];

        for (let i = 0; i < nums.length; i++) {
            let cur = nums[i];
            res = Math.max(res, cur);
            for (let j = i + 1; j < nums.length; j++) {
                cur *= nums[j];
                res = Math.max(res, cur);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        int res = nums[0];

        for (int i = 0; i < nums.Length; i++) {
            int cur = nums[i];
            res = Math.Max(res, cur);
            for (int j = i + 1; j < nums.Length; j++) {
                cur *= nums[j];
                res = Math.Max(res, cur);
            }
        }

        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    res := nums[0]
    for i := 0; i < len(nums); i++ {
        cur := nums[i]
        res = max(res, cur)
        for j := i + 1; j < len(nums); j++ {
            cur *= nums[j]
            res = max(res, cur)
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        var res = nums[0]
        for (i in nums.indices) {
            var cur = nums[i]
            res = maxOf(res, cur)
            for (j in i + 1 until nums.size) {
                cur *= nums[j]
                res = maxOf(res, cur)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxProduct(_ nums: [Int]) -> Int {
        var res = nums[0]

        for i in 0..<nums.count {
            var cur = nums[i]
            res = max(res, cur)
            for j in (i + 1)..<nums.count {
                cur *= nums[j]
                res = max(res, cur)
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

## 2. Sliding Window

### Intuition
The maximum-product subarray problem is tricky because:
- A **negative** number flips the sign (a very small negative can become a very large positive after another negative).
- A **zero** breaks any product (anything crossing a zero becomes 0).

So we can treat the array as **separate segments split by zeros**.  
Inside one zero-free segment:
- If the count of negative numbers is **even**, the product of the whole segment is positive → usually the best.
- If the count is **odd**, we must **drop either the prefix up to the first negative** or **the suffix after the last negative** to make the remaining product have an even number of negatives.

This “sliding window” idea maintains a window that contains an allowed number of negatives (even), shrinking from the left when we exceed that.

### Algorithm
1. Initialize `res` as the maximum element seen so far (important for cases like all negatives or zeros).
2. Split `nums` into zero-free subarrays (segments). Each zero ends a segment.
3. For each segment:
   - Count how many negatives it has.
   - Decide how many negatives the best window should contain:
     - If negatives are even, keep all (`need = negs`).
     - If negatives are odd, keep one less (`need = negs - 1`).
   - Use two pointers `j..i` with a running product:
     - Extend `i` to the right multiplying into `prod`.
     - Track how many negatives are in the window.
     - If negatives exceed `need`, move `j` right, dividing out elements, until valid again.
     - Update `res` with `prod` whenever the window is valid.
4. Return `res`.

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        A = []
        cur = []
        res = float('-inf')

        for num in nums:
            res = max(res, num)
            if num == 0:
                if cur:
                    A.append(cur)
                cur = []
            else:
                cur.append(num)

        if cur:
            A.append(cur)

        for sub in A:
            negs = sum(1 for i in sub if i < 0)
            prod = 1
            need = negs if negs % 2 == 0 else negs - 1
            negs = 0
            j = 0

            for i in range(len(sub)):
                prod *= sub[i]
                if sub[i] < 0:
                    negs += 1
                    while negs > need:
                        prod //= sub[j]
                        if sub[j] < 0:
                            negs -= 1
                        j += 1
                if j <= i:
                    res = max(res, prod)

        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        List<List<Integer>> A = new ArrayList<>();
        List<Integer> cur = new ArrayList<>();
        int res = Integer.MIN_VALUE;

        for (int num : nums) {
            res = Math.max(res, num);
            if (num == 0) {
                if (!cur.isEmpty()) A.add(cur);
                cur = new ArrayList<>();
            } else cur.add(num);
        }
        if (!cur.isEmpty()) A.add(cur);

        for (List<Integer> sub : A) {
            int negs = 0;
            for (int i : sub) {
                if (i < 0) negs++;
            }

            int prod = 1;
            int need = (negs % 2 == 0) ? negs : (negs - 1);
            negs = 0;
            for (int i = 0, j = 0; i < sub.size(); i++) {
                prod *= sub.get(i);
                if (sub.get(i) < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub.get(j);
                        if (sub.get(j) < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = Math.max(res, prod);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        vector<vector<int>> A;
        vector<int> cur;
        int res = INT_MIN;
        for (auto& num : nums) {
            res = max(res, num);
            if (num == 0) {
                if (!cur.empty()) A.push_back(cur);
                cur.clear();
            } else cur.push_back(num);
        }
        if (!cur.empty()) {
            A.push_back(cur);
        }

        for (auto& sub : A) {
            int negs = 0;
            for (auto& i : sub) {
                if (i < 0) negs++;
            }

            int prod = 1;
            int need = (negs % 2 == 0) ? negs : (negs - 1);
            negs = 0;
            for (int i = 0, j = 0; i < sub.size(); i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = max(res, prod);
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
    maxProduct(nums) {
        let A = [];
        let cur = [];
        let res = -Infinity;

        nums.forEach((num) => {
            res = Math.max(res, num);
            if (num === 0) {
                if (cur.length) A.push(cur);
                cur = [];
            } else {
                cur.push(num);
            }
        });
        if (cur.length) A.push(cur);

        A.forEach((sub) => {
            let negs = 0;
            sub.forEach((i) => {
                if (i < 0) negs++;
            });

            let prod = 1;
            let need = negs % 2 === 0 ? negs : negs - 1;
            negs = 0;
            for (let i = 0, j = 0; i < sub.length; i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = Math.max(res, prod);
            }
        });

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        List<List<int>> A = new List<List<int>>();
        List<int> cur = new List<int>();
        int res = int.MinValue;

        foreach (int num in nums) {
            res = Math.Max(res, num);
            if (num == 0) {
                if (cur.Count > 0) {
                    A.Add(new List<int>(cur));
                }
                cur.Clear();
            } else cur.Add(num);
        }
        if (cur.Count > 0) A.Add(new List<int>(cur));

        foreach (var sub in A) {
            int negs = 0;
            foreach (var i in sub) {
                if (i < 0) negs++;
            }

            int prod = 1;
            int need = (negs % 2 == 0) ? negs : (negs - 1);
            negs = 0;
            for (int i = 0, j = 0; i < sub.Count; i++) {
                prod *= sub[i];
                if (sub[i] < 0) {
                    negs++;
                    while (negs > need) {
                        prod /= sub[j];
                        if (sub[j] < 0) negs--;
                        j++;
                    }
                }
                if (j <= i) res = Math.Max(res, prod);
            }
        }
        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    res := math.MinInt32
    for _, num := range nums {
        res = max(res, num)
    }

    var A [][]int
    var cur []int
    for _, num := range nums {
        if num == 0 {
            if len(cur) > 0 {
                A = append(A, cur)
            }
            cur = nil
        } else {
            cur = append(cur, num)
        }
    }
    if len(cur) > 0 {
        A = append(A, cur)
    }

    for _, sub := range A {
        negs := 0
        for _, i := range sub {
            if i < 0 {
                negs++
            }
        }
        prod := 1
        need := negs
        if negs%2 != 0 {
            need = negs - 1
        }
        negs = 0
        j := 0
        for i := range sub {
            prod *= sub[i]
            if sub[i] < 0 {
                negs++
                for negs > need {
                    prod /= sub[j]
                    if sub[j] < 0 {
                        negs--
                    }
                    j++
                }
            }
            if j <= i {
                res = max(res, prod)
            }
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        var res = Int.MIN_VALUE
        for (num in nums) {
            res = maxOf(res, num)
        }

        val A = mutableListOf<MutableList<Int>>()
        var cur = mutableListOf<Int>()
        for (num in nums) {
            if (num == 0) {
                if (cur.isNotEmpty()) {
                    A.add(cur.toMutableList())
                }
                cur.clear()
            } else {
                cur.add(num)
            }
        }
        if (cur.isNotEmpty()) {
            A.add(cur.toMutableList())
        }

        for (sub in A) {
            var negs = 0
            for (i in sub) {
                if (i < 0) {
                    negs++
                }
            }
            var prod = 1
            var need = if (negs % 2 == 0) negs else negs - 1
            negs = 0
            var j = 0
            for (i in sub.indices) {
                prod *= sub[i]
                if (sub[i] < 0) {
                    negs++
                    while (negs > need) {
                        prod /= sub[j]
                        if (sub[j] < 0) {
                            negs--
                        }
                        j++
                    }
                }
                if (j <= i) {
                    res = maxOf(res, prod)
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxProduct(_ nums: [Int]) -> Int {
        var A = [[Int]]()
        var cur = [Int]()
        var res = Int.min

        for num in nums {
            res = max(res, num)
            if num == 0 {
                if !cur.isEmpty {
                    A.append(cur)
                }
                cur = []
            } else {
                cur.append(num)
            }
        }

        if !cur.isEmpty {
            A.append(cur)
        }

        for sub in A {
            let negsCount = sub.filter { $0 < 0 }.count
            var prod = 1
            var need = negsCount % 2 == 0 ? negsCount : negsCount - 1
            var negs = 0
            var j = 0

            for i in 0..<sub.count {
                prod *= sub[i]
                if sub[i] < 0 {
                    negs += 1
                    while negs > need {
                        prod /= sub[j]
                        if sub[j] < 0 {
                            negs -= 1
                        }
                        j += 1
                    }
                }
                if j <= i {
                    res = max(res, prod)
                }
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

## 3. Kadane's Algorithm

### Intuition
This is the **Kadane-style solution adapted for products**.

In the classic maximum-sum subarray, we only track one value (current max sum).  
For products, that’s **not enough** because:

- A **negative × negative = positive**
- A very small (negative) product can suddenly become the **maximum** after multiplying by another negative.

So at every index, we must track **two values**:
- `curMax`: maximum product ending at this index.
- `curMin`: minimum product ending at this index.

Why `curMin` matters:
- If the current number is negative, multiplying it with `curMin` might produce a new maximum.

Zeros are naturally handled because choosing `num` alone can reset the product.

### Algorithm
1. Initialize:
   - `res` = first element (answer so far).
   - `curMax = 1`, `curMin = 1`.
2. For each number `num` in the array:
   - Temporarily store `curMax * num` (because `curMax` will be updated).
   - Update `curMax` as the **maximum** of:
     - `num` (start new subarray).
     - `num * curMax` (extend previous max).
     - `num * curMin` (negative flip case).
   - Update `curMin` as the **minimum** of:
     - `num`.
     - previous `curMax * num`.
     - `num * curMin`.
   - Update `res = max(res, curMax)`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        res = nums[0]
        curMin, curMax = 1, 1

        for num in nums:
            tmp = curMax * num
            curMax = max(num * curMax, num * curMin, num)
            curMin = min(tmp, num * curMin, num)
            res = max(res, curMax)
        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        for (int num : nums) {
            int tmp = curMax * num;
            curMax = Math.max(Math.max(num * curMax, num * curMin), num);
            curMin = Math.min(Math.min(tmp, num * curMin), num);
            res = Math.max(res, curMax);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        for (int num : nums) {
            int tmp = curMax * num;
            curMax = max(max(num * curMax, num * curMin), num);
            curMin = min(min(tmp, num * curMin), num);
            res = max(res, curMax);
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
    maxProduct(nums) {
        let res = nums[0];
        let curMin = 1;
        let curMax = 1;

        for (const num of nums) {
            const tmp = curMax * num;
            curMax = Math.max(Math.max(num * curMax, num * curMin), num);
            curMin = Math.min(Math.min(tmp, num * curMin), num);
            res = Math.max(res, curMax);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        int res = nums[0];
        int curMin = 1, curMax = 1;

        foreach (int num in nums) {
            int tmp = curMax * num;
            curMax = Math.Max(Math.Max(num * curMax, num * curMin), num);
            curMin = Math.Min(Math.Min(tmp, num * curMin), num);
            res = Math.Max(res, curMax);
        }
        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    res := nums[0]
    curMin, curMax := 1, 1
    for _, num := range nums {
        tmp := curMax * num
        curMax = max(num*curMax, max(num*curMin, num))
        curMin = min(tmp, min(num*curMin, num))
        res = max(res, curMax)
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        var res = nums[0]
        var curMin = 1
        var curMax = 1
        for (num in nums) {
            val tmp = curMax * num
            curMax = maxOf(num * curMax, maxOf(num * curMin, num))
            curMin = minOf(tmp, minOf(num * curMin, num))
            res = maxOf(res, curMax)
        }
        return res
    }
}
```

```swift
class Solution {
    func maxProduct(_ nums: [Int]) -> Int {
        var res = nums[0]
        var curMin = 1, curMax = 1

        for num in nums {
            let tmp = curMax * num
            curMax = max(num * curMax, num * curMin, num)
            curMin = min(tmp, num * curMin, num)
            res = max(res, curMax)
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

## 4. Prefix & Suffix

### Intuition
The key idea is that the **maximum product subarray must appear as either**:
- a **prefix product** of some segment, or
- a **suffix product** of some segment.

Why this works:
- Negative numbers flip signs. If a subarray has an **even number of negatives**, the full product is positive.
- If it has an **odd number of negatives**, removing either:
  - the prefix up to the first negative, or
  - the suffix after the last negative  
  will give the maximum product.
- Zeros break subarrays completely, so products must restart after a zero.

By scanning:
- once from **left to right** (prefix)
- once from **right to left** (suffix)

we implicitly consider all valid subarrays without explicitly tracking negatives.

The `(prefix or 1)` trick resets the product after encountering `0`.

### Algorithm
1. Initialize:
   - `res` as the first element.
   - `prefix = 0`, `suffix = 0`.
2. For `i` from `0` to `n - 1`:
   - Update prefix product:
     - `prefix = nums[i] * (prefix if prefix != 0 else 1)`.
   - Update suffix product:
     - `suffix = nums[n - 1 - i] * (suffix if suffix != 0 else 1)`.
   - Update result:
     - `res = max(res, prefix, suffix)`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        n, res = len(nums), nums[0]
        prefix = suffix = 0

        for i in range(n):
            prefix = nums[i] * (prefix or 1)
            suffix = nums[n - 1 - i] * (suffix or 1)
            res = max(res, max(prefix, suffix))
        return res
```

```java
public class Solution {
    public int maxProduct(int[] nums) {
        int n = nums.length;
        int res = nums[0];
        int prefix = 0, suffix = 0;

        for (int i = 0; i < n; i++) {
            prefix = nums[i] * (prefix == 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix == 0 ? 1 : suffix);
            res = Math.max(res, Math.max(prefix, suffix));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int n = nums.size(), res = nums[0];
        int prefix = 0, suffix = 0;

        for (int i = 0; i < n; i++) {
            prefix = nums[i] * (prefix == 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix == 0 ? 1 : suffix);
            res = max(res, max(prefix, suffix));
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
    maxProduct(nums) {
        let n = nums.length,
            res = nums[0];
        let prefix = 0,
            suffix = 0;

        for (let i = 0; i < n; i++) {
            prefix = nums[i] * (prefix === 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix === 0 ? 1 : suffix);
            res = Math.max(res, Math.max(prefix, suffix));
        }
        return res === -0 ? 0 : res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(int[] nums) {
        int n = nums.Length;
        int res = nums[0];
        int prefix = 0, suffix = 0;

        for (int i = 0; i < n; i++) {
            prefix = nums[i] * (prefix == 0 ? 1 : prefix);
            suffix = nums[n - 1 - i] * (suffix == 0 ? 1 : suffix);
            res = Math.Max(res, Math.Max(prefix, suffix));
        }
        return res;
    }
}
```

```go
func maxProduct(nums []int) int {
    n := len(nums)
    res := nums[0]
    prefix, suffix := 0, 0

    for i := 0; i < n; i++ {
        if prefix == 0 {
            prefix = 1
        }
        if suffix == 0 {
            suffix = 1
        }

        prefix *= nums[i]
        suffix *= nums[n-1-i]
        res = max(res, max(prefix, suffix))
    }

    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxProduct(nums: IntArray): Int {
        val n = nums.size
        var res = nums[0]
        var prefix = 0
        var suffix = 0

        for (i in 0 until n) {
            if (prefix == 0) prefix = 1
            if (suffix == 0) suffix = 1

            prefix *= nums[i]
            suffix *= nums[n - 1 - i]
            res = maxOf(res, prefix, suffix)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxProduct(_ nums: [Int]) -> Int {
        let n = nums.count
        var res = nums[0]
        var prefix = 0, suffix = 0

        for i in 0..<n {
            prefix = nums[i] * (prefix != 0 ? prefix : 1)
            suffix = nums[n - 1 - i] * (suffix != 0 ? suffix : 1)
            res = max(res, max(prefix, suffix))
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

## Common Pitfalls

### Ignoring Negative Numbers Can Become Positive

Unlike maximum sum subarray, a very negative product can become the maximum after multiplying by another negative number. Tracking only the current maximum is insufficient. You must track both `curMax` and `curMin` because multiplying `curMin` by a negative number might produce the new maximum.

### Forgetting to Handle Zeros

A zero in the array resets the product to zero and effectively splits the array. After encountering a zero, the subarray must restart fresh. Failing to handle this case causes the algorithm to carry forward zero products incorrectly.

### Not Saving the Previous Maximum Before Updating

When computing the new `curMax` and `curMin`, the calculation for `curMin` may depend on the old value of `curMax`. Updating `curMax` first and then using the new value to compute `curMin` produces wrong results. Always store `curMax * num` in a temporary variable before updating either value.