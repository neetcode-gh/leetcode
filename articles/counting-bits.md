## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Bit Manipulation** - Understanding binary representation and bitwise operations (AND, OR, shifts)
- **Dynamic Programming** - Building solutions incrementally using previously computed results
- **Binary Number System** - Understanding how integers are represented in binary and counting set bits

---

## 1. Bit Manipulation - I

### Intuition

For every number from `0` to `n`, we want to compute how many `1` bits appear in its binary representation.

This **bit manipulation** approach checks each bit position individually:
- Integers are typically represented using **32 bits**
- For each number, we test whether the bit at position `i` is set using a bit mask

Although this solution is not optimal, it clearly demonstrates how bitwise operations work at a low level.

### Algorithm

1. Initialize an empty list `res` to store results.
2. For every number `num` from `0` to `n`:
   - Initialize a counter `one = 0`
   - For each bit position `i` from `0` to `31`:
     - Check if the `i`-th bit is set using `(1 << i) & num`
     - If yes, increment `one`
   - Append `one` to `res`
3. Return the list `res`

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        res = []
        for num in range(n + 1):
            one = 0
            for i in range(32):
                if num & (1 << i):
                    one += 1
            res.append(one)
        return res
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n + 1];
        for (int num = 1; num <= n; num++) {
            for (int i = 0; i < 32; i++) {
                if ((num & (1 << i)) != 0) {
                    res[num]++;
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
    vector<int> countBits(int n) {
        vector<int> res(n + 1);
        for (int num = 1; num <= n; num++) {
            for (int i = 0; i < 32; i++) {
                if (num & (1 << i)) {
                    res[num]++;
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
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let res = [];
        for (let num = 0; num <= n; num++) {
            let one = 0;
            for (let i = 0; i < 32; i++) {
                if ((num & (1 << i)) != 0) {
                    one++;
                }
            }
            res.push(one);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] res = new int[n + 1];
        for (int num = 1; num <= n; num++) {
            for (int i = 0; i < 32; i++) {
                if ((num & (1 << i)) != 0) {
                    res[num]++;
                }
            }
        }
        return res;
    }
}
```

```go
func countBits(n int) []int {
    res := make([]int, n+1)
    for num := 0; num <= n; num++ {
        one := 0
        for i := 0; i < 32; i++ {
            if num&(1<<i) != 0 {
                one++
            }
        }
        res[num] = one
    }
    return res
}
```

```kotlin
class Solution {
    fun countBits(n: Int): IntArray {
        val res = IntArray(n + 1)
        for (num in 0..n) {
            var one = 0
            for (i in 0 until 32) {
                if (num and (1 shl i) != 0) {
                    one++
                }
            }
            res[num] = one
        }
        return res
    }
}
```

```swift
class Solution {
    func countBits(_ n: Int) -> [Int] {
        var res = [Int]()
        for num in 0...n {
            var one = 0
            for i in 0..<32 {
                if num & (1 << i) != 0 {
                    one += 1
                }
            }
            res.append(one)
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## 2. Bit Manipulation - II

### Intuition

To count the number of `1` bits efficiently, we can use **Brian Kernighan’s Algorithm**.

The key observation:
- The operation `n & (n - 1)` **removes the lowest set bit** from `n`
- Repeating this until `n` becomes `0` counts how many `1` bits are present

This avoids checking all 32 bits for every number.

### Algorithm

1. Create an array `res` of size `n + 1` initialized with `0`.
2. For each number `i` from `1` to `n`:
   - Set `num = i`
   - While `num != 0`:
     - Increment `res[i]`
     - Remove the lowest set bit using `num &= (num - 1)`
3. Return `res`.

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        res = [0] * (n + 1)
        for i in range(1, n + 1):
            num = i
            while num != 0:
                res[i] += 1
                num &= (num - 1)
        return res
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int num = i;
            while (num != 0) {
                res[i]++;
                num &= (num - 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> res(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            int num = i;
            while (num != 0) {
                res[i]++;
                num &= (num - 1);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let res = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            let num = i;
            while (num !== 0) {
                res[i]++;
                num &= num - 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            int num = i;
            while (num != 0) {
                res[i]++;
                num &= (num - 1);
            }
        }
        return res;
    }
}
```

```go
func countBits(n int) []int {
    res := make([]int, n+1)
    for i := 1; i <= n; i++ {
        num := i
        for num != 0 {
            res[i]++
            num &= (num - 1)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun countBits(n: Int): IntArray {
        val res = IntArray(n + 1)
        for (i in 1..n) {
            var num = i
            while (num != 0) {
                res[i]++
                num = num and (num - 1)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func countBits(_ n: Int) -> [Int] {
        var res = [Int](repeating: 0, count: n + 1)
        for i in 1..<(n + 1) {
            var num = i
            while num != 0 {
                res[i] += 1
                num &= (num - 1)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## 3. In-Built Function

### Intuition

We need to compute the number of set bits (`1`s) in the binary representation of **every number from `0` to `n`**.

Instead of manually counting bits using bit manipulation or dynamic programming, many programming languages provide **built-in ways to convert numbers to binary or directly count set bits**. Using these built-in features allows us to write a very concise and readable solution.

This approach is especially useful when:
- `n` is small to moderate
- clarity is more important than optimal performance
- we want a quick and reliable implementation

### Algorithm

1. Initialize an empty result list.
2. For each number `i` from `0` to `n`:
   - Convert `i` to its binary representation using a built-in utility.
   - Count the number of `1` bits in that representation.
   - Append the count to the result list.
3. Return the result list.

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        return [bin(i).count('1') for i in range(n + 1)]
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            res[i] = Integer.bitCount(i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> res(n + 1, 0);
        for (int i = 0; i <= n; i++) {
            res[i] = __builtin_popcount(i);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let res = [];
        for (let i = 0; i <= n; i++) {
            res.push(i.toString(2).split('1').length - 1);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] res = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            res[i] = Convert.ToString(i, 2).Count(c => c == '1');
        }
        return res;
    }
}
```

```go
func countBits(n int) []int {
    res := make([]int, n+1)
    for i := 0; i <= n; i++ {
        res[i] = bits.OnesCount(uint(i))
    }
    return res
}
```

```kotlin
class Solution {
    fun countBits(n: Int): IntArray {
        return IntArray(n + 1) { it.countOneBits() }
    }
}
```

```swift
class Solution {
    func countBits(_ n: Int) -> [Int] {
        var res = [Int](repeating: 0, count: n + 1)
        for num in 1..<(n + 1) {
            res[num] = num.nonzeroBitCount
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.

---

## 4. Bit Manipulation (DP)

### Intuition

We want to compute the number of set bits (`1`s) for **all numbers from `0` to `n`** efficiently.

A key observation from binary representation is:

- Numbers repeat their bit patterns every time we reach a **power of two**
- When a number is a power of two, it has **exactly one `1` bit**
- Any number `i` can be written as:
  **`i = highestPowerOfTwo ≤ i + remainder`**

So, the number of set bits in `i` is:
> **1 (for the highest power of two) + number of set bits in the remainder**

This allows us to build the solution incrementally using **Dynamic Programming**, reusing results we have already computed.

### Algorithm

1. Create a DP array `dp` of size `n + 1`
   - `dp[i]` will store the number of set bits in `i`
2. Initialize:
   - `dp[0] = 0`
   - `offset = 1` (tracks the most recent power of two)
3. For each number `i` from `1` to `n`:
   - If `i` reaches the next power of two (`i == 2 * offset`):
     - Update `offset = i`
   - Compute:
     ```
     dp[i] = 1 + dp[i - offset]
     ```
4. Return the DP array.

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        offset = 1

        for i in range(1, n + 1):
            if offset * 2 == i:
                offset = i
            dp[i] = 1 + dp[i - offset]
        return dp
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        int offset = 1;

        for (int i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        int offset = 1;

        for (int i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        const dp = new Array(n + 1).fill(0);
        let offset = 1;

        for (let i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] dp = new int[n + 1];
        int offset = 1;

        for (int i = 1; i <= n; i++) {
            if (offset * 2 == i) {
                offset = i;
            }
            dp[i] = 1 + dp[i - offset];
        }
        return dp;
    }
}
```

```go
func countBits(n int) []int {
    dp := make([]int, n+1)
    offset := 1

    for i := 1; i <= n; i++ {
        if offset*2 == i {
            offset = i
        }
        dp[i] = 1 + dp[i - offset]
    }
    return dp
}
```

```kotlin
class Solution {
    fun countBits(n: Int): IntArray {
        val dp = IntArray(n + 1)
        var offset = 1

        for (i in 1..n) {
            if (offset * 2 == i) {
                offset = i
            }
            dp[i] = 1 + dp[i - offset]
        }
        return dp
    }
}
```

```swift
class Solution {
    func countBits(_ n: Int) -> [Int] {
        var dp = [Int](repeating: 0, count: n + 1)
        var offset = 1

        for i in 1..<(n + 1) {
            if offset * 2 == i {
                offset = i
            }
            dp[i] = 1 + dp[i - offset]
        }
        return dp
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

## 5. Bit Manipulation (Optimal)

### Intuition

We want to find the number of set bits (`1`s) in every number from `0` to `n`.

A very important observation from binary representation is:

- Right-shifting a number by 1 (`i >> 1`) removes the **least significant bit**
- `(i & 1)` tells us whether the last bit of `i` is `1` or `0`

So, the number of set bits in `i` can be built from a **smaller number**:

> **setBits(i) = setBits(i >> 1) + (i & 1)**

This means each result depends only on a previously computed value, making it a perfect fit for **Dynamic Programming**.

### Algorithm

1. Create a DP array `dp` of size `n + 1`
   - `dp[i]` stores the number of set bits in `i`
2. Initialize `dp[0] = 0`
3. For every number `i` from `1` to `n`:
   - Right shift `i` by 1 to get `i >> 1`
   - Check the last bit using `(i & 1)`
   - Compute:
     ```
     dp[i] = dp[i >> 1] + (i & 1)
     ```
4. Return the DP array

::tabs-start

```python
class Solution:
    def countBits(self, n: int) -> List[int]:
        dp = [0] * (n + 1)
        for i in range(n + 1):
            dp[i] = dp[i >> 1] + (i & 1)
        return dp
```

```java
public class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}
```

```cpp
class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number[]}
     */
    countBits(n) {
        let dp = new Array(n + 1).fill(0);
        for (let i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}
```

```csharp
public class Solution {
    public int[] CountBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}
```

```go
func countBits(n int) []int {
    dp := make([]int, n+1)
    for i := 1; i <= n; i++ {
        dp[i] = dp[i >> 1] + (i&1);
    }
    return dp
}
```

```kotlin
class Solution {
    fun countBits(n: Int): IntArray {
        val dp = IntArray(n + 1)
        for (i in 1..n) {
            dp[i] = dp[i shr 1] + (i and 1)
        }
        return dp
    }
}
```

```swift
class Solution {
    func countBits(_ n: Int) -> [Int] {
        var dp = [Int](repeating: 0, count: n + 1)
        for i in 0..<(n + 1) {
            dp[i] = dp[i >> 1] + (i & 1)
        }
        return dp
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

### Incorrect Bit Shift Operator

When using the DP recurrence `dp[i] = dp[i >> 1] + (i & 1)`, a common mistake is using left shift instead of right shift, or confusing the operator precedence.

```python
# Wrong: Using left shift instead of right shift
dp[i] = dp[i << 1] + (i & 1)  # This accesses invalid indices

# Wrong: Operator precedence issue in some languages
dp[i] = dp[i >> 1 + (i & 1)]  # Addition happens before shift

# Correct
dp[i] = dp[i >> 1] + (i & 1)
```

### Off-by-One in Loop Bounds

The problem asks for bits count from `0` to `n` inclusive, meaning the result array should have `n + 1` elements. A common mistake is creating an array of size `n` or iterating up to `n - 1`.

```python
# Wrong: Array too small
dp = [0] * n  # Missing dp[n]

# Wrong: Loop doesn't include n
for i in range(n):  # Should be range(n + 1)

# Correct
dp = [0] * (n + 1)
for i in range(n + 1):
    # process
```
