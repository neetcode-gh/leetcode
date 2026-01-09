## 1. Math (Recursion)

### Intuition

The key insight is understanding what it takes to flip the highest set bit to zero. To clear a bit at position `k`, we need to first set up a specific pattern where the bit at position `k-1` is 1 and all lower bits are 0. This requires `2^k - 1` operations to go from 0 to that pattern. Once we have that setup, clearing the highest bit leaves us with a smaller number, and we recursively solve for that remainder. The operations alternate between adding and subtracting because each recursive step either builds toward or tears down from the target pattern.

### Algorithm

1. Base case: if `n` is 0, return 0 since no operations are needed.
2. Find `k`, the highest power of 2 that is less than or equal to `n`. This represents the position of the highest set bit.
3. The number of operations to clear just the highest bit from a power of 2 is `2*k - 1` (e.g., clearing bit position 3 requires 7 operations: `2^3 * 2 - 1`).
4. After clearing the highest bit, we have a remainder `k XOR n`. The operations needed for this remainder are subtracted because the setup steps overlap.
5. Return `(k * 2) - 1 - recursiveCall(k XOR n)`.

::tabs-start

```python
class Solution:
    def minimumOneBitOperations(self, n: int) -> int:
        if n == 0:
            return 0

        k = 1
        while (k << 1) <= n:
            k <<= 1

        return (k << 1) - 1 - self.minimumOneBitOperations(k ^ n)
```

```java
public class Solution {
    public int minimumOneBitOperations(int n) {
        if (n == 0) {
            return 0;
        }

        int k = 1;
        while ((k << 1) <= n) {
            k <<= 1;
        }

        return (k << 1) - 1 - minimumOneBitOperations(k ^ n);
    }
}
```

```cpp
class Solution {
public:
    int minimumOneBitOperations(int n) {
        if (n == 0) {
            return 0;
        }

        int k = 1;
        while ((k << 1) <= n) {
            k <<= 1;
        }

        return (k << 1) - 1 - minimumOneBitOperations(k ^ n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    minimumOneBitOperations(n) {
        if (n === 0) {
            return 0;
        }

        let k = 1;
        while (k << 1 <= n) {
            k <<= 1;
        }

        return (k << 1) - 1 - this.minimumOneBitOperations(k ^ n);
    }
}
```

```csharp
public class Solution {
    public int MinimumOneBitOperations(int n) {
        if (n == 0) {
            return 0;
        }

        int k = 1;
        while ((k << 1) <= n) {
            k <<= 1;
        }

        return (k << 1) - 1 - MinimumOneBitOperations(k ^ n);
    }
}
```

```go
func minimumOneBitOperations(n int) int {
    if n == 0 {
        return 0
    }

    k := 1
    for (k << 1) <= n {
        k <<= 1
    }

    return (k << 1) - 1 - minimumOneBitOperations(k^n)
}
```

```kotlin
class Solution {
    fun minimumOneBitOperations(n: Int): Int {
        if (n == 0) {
            return 0
        }

        var k = 1
        while ((k shl 1) <= n) {
            k = k shl 1
        }

        return (k shl 1) - 1 - minimumOneBitOperations(k xor n)
    }
}
```

```swift
class Solution {
    func minimumOneBitOperations(_ n: Int) -> Int {
        if n == 0 {
            return 0
        }

        var k = 1
        while (k << 1) <= n {
            k <<= 1
        }

        return (k << 1) - 1 - minimumOneBitOperations(k ^ n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 2. Math (Iteration) - I

### Intuition

This approach converts the recursive solution into an iterative one. We process each set bit from highest to lowest, alternating between adding and subtracting the cost. The first (highest) bit contributes positively, the next contributes negatively, and so on. This alternation happens because clearing one bit creates a pattern that partially overlaps with the work needed for the next bit.

### Algorithm

1. Initialize `res = 0`, `k = 2^30` (starting from the highest possible bit), and `sign = 1`.
2. While `n` is not zero:
   - Find the highest set bit by shifting `k` right until `k <= n`.
   - Add `sign * (2*k - 1)` to the result.
   - Flip the sign for the next iteration.
   - Remove this bit from `n` using XOR: `n ^= k`.
3. Return the result.

::tabs-start

```python
class Solution:
    def minimumOneBitOperations(self, n: int) -> int:
        res = 0
        k = 1 << 30
        sign = 1

        while n:
            while k > n:
                k >>= 1

            res += (sign * ((k << 1) - 1))
            sign *= -1
            n ^= k

        return res
```

```java
public class Solution {
    public int minimumOneBitOperations(int n) {
        int res = 0, k = 1 << 30, sign = 1;

        while (n != 0) {
            while (k > n) {
                k >>= 1;
            }

            res += (sign * ((k << 1) - 1));
            sign *= -1;
            n ^= k;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumOneBitOperations(int n) {
        int res = 0, k = 1 << 30, sign = 1;

        while (n != 0) {
            while (k > n) {
                k >>= 1;
            }

            res += sign * ((k << 1) - 1);
            sign *= -1;
            n ^= k;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    minimumOneBitOperations(n) {
        let res = 0,
            k = 1 << 30,
            sign = 1;

        while (n !== 0) {
            while (k > n) {
                k >>= 1;
            }

            res += sign * ((k << 1) - 1);
            sign *= -1;
            n ^= k;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumOneBitOperations(int n) {
        int res = 0, k = 1 << 30, sign = 1;

        while (n != 0) {
            while (k > n) {
                k >>= 1;
            }

            res += (sign * ((k << 1) - 1));
            sign *= -1;
            n ^= k;
        }

        return res;
    }
}
```

```go
func minimumOneBitOperations(n int) int {
    res, k, sign := 0, 1<<30, 1

    for n != 0 {
        for k > n {
            k >>= 1
        }

        res += sign * ((k << 1) - 1)
        sign *= -1
        n ^= k
    }

    return res
}
```

```kotlin
class Solution {
    fun minimumOneBitOperations(n: Int): Int {
        var num = n
        var res = 0
        var k = 1 shl 30
        var sign = 1

        while (num != 0) {
            while (k > num) {
                k = k shr 1
            }

            res += sign * ((k shl 1) - 1)
            sign *= -1
            num = num xor k
        }

        return res
    }
}
```

```swift
class Solution {
    func minimumOneBitOperations(_ n: Int) -> Int {
        var n = n
        var res = 0
        var k = 1 << 30
        var sign = 1

        while n != 0 {
            while k > n {
                k >>= 1
            }

            res += sign * ((k << 1) - 1)
            sign *= -1
            n ^= k
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Math (Iteration) - II

### Intuition

This variant uses a clever bit manipulation trick. The expression `n XOR (n-1)` isolates the rightmost set bit and all bits to its right (as a mask of 1s). By processing bits from right to left and alternating signs, we compute the same result as the previous approaches. The absolute value at the end handles the case where the sign ends up negative.

### Algorithm

1. Initialize `res = 0` and `sign = 1`.
2. While `n` is not zero:
   - Compute `n XOR (n-1)`, which gives a mask from the lowest set bit to bit 0.
   - Add `sign * (n XOR (n-1))` to the result.
   - Clear the lowest set bit using `n &= (n-1)`.
   - Flip the sign.
3. Return the absolute value of the result.

::tabs-start

```python
class Solution:
    def minimumOneBitOperations(self, n: int) -> int:
        res, sign = 0, 1
        while n:
            res += sign * (n ^ (n - 1))
            n &= (n - 1)
            sign *= -1
        return abs(res)
```

```java
public class Solution {
    public int minimumOneBitOperations(int n) {
        int res = 0, sign = 1;
        while (n != 0) {
            res += sign * (n ^ (n - 1));
            n &= (n - 1);
            sign *= -1;
        }
        return Math.abs(res);
    }
}
```

```cpp
class Solution {
public:
    int minimumOneBitOperations(int n) {
        int res = 0, sign = 1;
        while (n != 0) {
            res += sign * (n ^ (n - 1));
            n &= (n - 1);
            sign *= -1;
        }
        return abs(res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    minimumOneBitOperations(n) {
        let res = 0,
            sign = 1;
        while (n !== 0) {
            res += sign * (n ^ (n - 1));
            n &= n - 1;
            sign *= -1;
        }
        return Math.abs(res);
    }
}
```

```csharp
public class Solution {
    public int MinimumOneBitOperations(int n) {
        int res = 0, sign = 1;
        while (n != 0) {
            res += sign * (n ^ (n - 1));
            n &= (n - 1);
            sign *= -1;
        }
        return Math.Abs(res);
    }
}
```

```go
func minimumOneBitOperations(n int) int {
    res, sign := 0, 1
    for n != 0 {
        res += sign * (n ^ (n - 1))
        n &= (n - 1)
        sign *= -1
    }
    if res < 0 {
        return -res
    }
    return res
}
```

```kotlin
class Solution {
    fun minimumOneBitOperations(n: Int): Int {
        var num = n
        var res = 0
        var sign = 1
        while (num != 0) {
            res += sign * (num xor (num - 1))
            num = num and (num - 1)
            sign *= -1
        }
        return kotlin.math.abs(res)
    }
}
```

```swift
class Solution {
    func minimumOneBitOperations(_ n: Int) -> Int {
        var n = n
        var res = 0
        var sign = 1
        while n != 0 {
            res += sign * (n ^ (n - 1))
            n &= (n - 1)
            sign *= -1
        }
        return abs(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Math (Grey Code)

### Intuition

This problem has a direct connection to Gray codes. A Gray code is a binary sequence where consecutive numbers differ by exactly one bit. The allowed operations in this problem exactly match how Gray codes transition between values. Converting a Gray code back to its binary index tells us how many steps away it is from zero. The conversion formula involves XORing `n` with all its right-shifted versions.

### Algorithm

1. Initialize `res = n`.
2. While `n` is not zero:
   - Right shift `n` by 1.
   - XOR the result into `res`.
3. Return `res`, which represents the position of the original number in the Gray code sequence.

::tabs-start

```python
class Solution:
    def minimumOneBitOperations(self, n: int) -> int:
        res = n
        while n:
            n >>= 1
            res ^= n
        return res
```

```java
public class Solution {
    public int minimumOneBitOperations(int n) {
        int res = n;
        while (n != 0) {
            n >>= 1;
            res ^= n;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumOneBitOperations(int n) {
        int res = n;
        while (n != 0) {
            n >>= 1;
            res ^= n;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    minimumOneBitOperations(n) {
        let res = n;
        while (n !== 0) {
            n >>= 1;
            res ^= n;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumOneBitOperations(int n) {
        int res = n;
        while (n != 0) {
            n >>= 1;
            res ^= n;
        }
        return res;
    }
}
```

```go
func minimumOneBitOperations(n int) int {
    res := n
    for n != 0 {
        n >>= 1
        res ^= n
    }
    return res
}
```

```kotlin
class Solution {
    fun minimumOneBitOperations(n: Int): Int {
        var num = n
        var res = n
        while (num != 0) {
            num = num shr 1
            res = res xor num
        }
        return res
    }
}
```

```swift
class Solution {
    func minimumOneBitOperations(_ n: Int) -> Int {
        var n = n
        var res = n
        while n != 0 {
            n >>= 1
            res ^= n
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
