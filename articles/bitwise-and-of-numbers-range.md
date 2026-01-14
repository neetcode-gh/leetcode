## 1. Brute Force

### Intuition
The most straightforward approach is to AND all numbers in the range together. Starting with the left boundary, we iterate through each number up to the right boundary, accumulating the AND result. While simple, this is inefficient for large ranges.

### Algorithm
1. Initialize the result with the `left` boundary value.
2. Iterate from `left + 1` to `right` (inclusive).
3. For each number, perform a bitwise AND with the current result.
4. Return the final result.

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        res = left
        for i in range(left + 1, right + 1):
            res &= i
        return res
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int res = left;
        for (int i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int res = left;
        for (int i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        let res = left;
        for (let i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        int res = left;
        for (int i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
}
```

```go
func rangeBitwiseAnd(left int, right int) int {
    res := left
    for i := left + 1; i <= right; i++ {
        res &= i
    }
    return res
}
```

```kotlin
class Solution {
    fun rangeBitwiseAnd(left: Int, right: Int): Int {
        var res = left
        for (i in left + 1..right) {
            res = res and i
        }
        return res
    }
}
```

```swift
class Solution {
    func rangeBitwiseAnd(_ left: Int, _ right: Int) -> Int {
        var res = left
        for i in (left + 1)...right {
            res &= i
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

## 2. Bit Manipulation - I

### Intuition
For any bit position in the result to be `1`, that bit must be `1` in all numbers from `left` to `right`. If a bit is `1` in `left`, we need to check if it will flip to `0` at some point in the range. A bit at position `i` flips when we reach the next multiple of `2^(i+1)`. So we calculate how far `left` is from that flip point and check if `right` is still before it.

### Algorithm
1. Initialize result to `0`.
2. For each bit position `i` from `0` to `31`:
   - Check if bit `i` is set in `left`. If not, skip (result bit stays `0`).
   - Calculate the remainder of `left` when divided by `2^(i+1)`.
   - Calculate the distance to the next flip: `2^(i+1)` minus the remainder.
   - If `(right - left)` is less than this distance, the bit survives in all numbers, so set bit `i` in the result.
3. Return the result.

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        res = 0
        for i in range(32):
            bit = (left >> i) & 1
            if not bit:
                continue

            remain = left % (1 << (i + 1))
            diff = (1 << (i + 1)) - remain
            if right - left < diff:
                res |= (1 << i)

        return res
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (left >> i) & 1;
            if (bit == 0) {
                continue;
            }

            int remain = left % (1 << (i + 1));
            int diff = (1 << (i + 1)) - remain;
            if (right - left < diff) {
                res |= (1 << i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (left >> i) & 1;
            if (!bit) {
                continue;
            }

            int remain = left % (1 << (i + 1));
            uint diff = (1ul << (i + 1)) - remain;
            if (right - left < diff) {
                res |= (1 << i);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        let res = 0;
        for (let i = 0; i < 32; i++) {
            const bit = (left >> i) & 1;
            if (!bit) {
                continue;
            }
            const next = Math.pow(2, i + 1);
            const remain = left % next;
            const diff = next - remain;
            if (right - left < diff) {
                res |= 1 << i;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (left >> i) & 1;
            if (bit == 0) continue;

            int remain = left % (1 << (i + 1));
            int diff = (1 << (i + 1)) - remain;
            if (right - left < diff) {
                res |= (1 << i);
            }
        }
        return res;
    }
}
```

```go
func rangeBitwiseAnd(left int, right int) int {
    res := 0
    for i := 0; i < 32; i++ {
        bit := (left >> i) & 1
        if bit == 0 {
            continue
        }
        remain := left % (1 << (i + 1))
        diff := (1 << (i + 1)) - remain
        if right-left < diff {
            res |= (1 << i)
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun rangeBitwiseAnd(left: Int, right: Int): Int {
        var res = 0
        for (i in 0 until 32) {
            val bit = (left shr i) and 1
            if (bit == 0) continue

            val remain = left % (1 shl (i + 1))
            val diff = (1 shl (i + 1)) - remain
            if (right - left < diff) {
                res = res or (1 shl i)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func rangeBitwiseAnd(_ left: Int, _ right: Int) -> Int {
        var res = 0
        for i in 0..<32 {
            let bit = (left >> i) & 1
            if bit == 0 {
                continue
            }
            let remain = left % (1 << (i + 1))
            let diff = (1 << (i + 1)) - remain
            if right - left < diff {
                res |= (1 << i)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ since we iterate $32$ times.
- Space complexity: $O(1)$

---

## 3. Bit Manipulation - II

### Intuition
The result is the common prefix of the binary representations of `left` and `right`. When `left` and `right` differ, the differing bits and all bits to the right will become `0` in the AND result (since there will be at least one `0` in each of those positions across the range). We find this common prefix by right-shifting both numbers until they are equal.

### Algorithm
1. Initialize a counter `i` to `0`.
2. While `left` and `right` are not equal:
   - Right-shift both `left` and `right` by `1`.
   - Increment `i`.
3. Left-shift the common value (`left` or `right`) back by `i` positions.
4. Return the result.

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        i = 0
        while left != right:
            left >>= 1
            right >>= 1
            i += 1
        return left << i
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int i = 0;
        while (left != right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int i = 0;
        while (left != right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        let i = 0;
        while (left !== right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        int i = 0;
        while (left != right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
}
```

```go
func rangeBitwiseAnd(left int, right int) int {
    i := 0
    for left != right {
        left >>= 1
        right >>= 1
        i++
    }
    return left << i
}
```

```kotlin
class Solution {
    fun rangeBitwiseAnd(left: Int, right: Int): Int {
        var l = left
        var r = right
        var i = 0
        while (l != r) {
            l = l shr 1
            r = r shr 1
            i++
        }
        return l shl i
    }
}
```

```swift
class Solution {
    func rangeBitwiseAnd(_ left: Int, _ right: Int) -> Int {
        var left = left
        var right = right
        var i = 0
        while left != right {
            left >>= 1
            right >>= 1
            i += 1
        }
        return left << i
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation - III

### Intuition
Instead of shifting both numbers, we can repeatedly clear the rightmost set bit of `right` until `right` becomes less than or equal to `left`. The operation `(n & (n-1))` clears the lowest set bit of `n`. This works because any bit position where `right` has a `1` but needs to flip within the range will be cleared, leaving only the common prefix.

### Algorithm
1. While `left` is less than `right`:
   - Apply the operation `right = right AND (right - 1)` to clear the rightmost set bit of `right`.
2. Return `right` (which now equals the common prefix with trailing zeros).

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        while left < right:
            right &= right - 1
        return right
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        while (left < right) {
            right &= (right - 1);
        }
        return right;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        while (left < right) {
            right &= (right - 1);
        }
        return right;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        while (left < right) {
            right &= right - 1;
        }
        return right;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        while (left < right) {
            right &= (right - 1);
        }
        return right;
    }
}
```

```go
func rangeBitwiseAnd(left int, right int) int {
    for left < right {
        right &= right - 1
    }
    return right
}
```

```kotlin
class Solution {
    fun rangeBitwiseAnd(left: Int, right: Int): Int {
        var r = right
        while (left < r) {
            r = r and (r - 1)
        }
        return r
    }
}
```

```swift
class Solution {
    func rangeBitwiseAnd(_ left: Int, _ right: Int) -> Int {
        var right = right
        while left < right {
            right &= right - 1
        }
        return right
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Iterating Through All Numbers in the Range
The brute force approach of ANDing every number from `left` to `right` will time out for large ranges. For example, when `left = 1` and `right = 2^31 - 1`, this requires billions of operations.

### Misunderstanding the Common Prefix Property
The result is the common binary prefix of `left` and `right` with trailing zeros. A common mistake is trying to AND only `left` and `right` directly, missing that intermediate values determine which bits survive.
```python
# Wrong: only checking left and right
return left & right  # Misses intermediate values that clear bits
```

### Integer Overflow in Bit Calculations
When calculating `(1 << (i + 1))` for bit position 31, the result exceeds 32-bit signed integer range in some languages. Use unsigned types or 64-bit integers to avoid overflow.
```cpp
// Wrong in C++: signed overflow at i=31
int diff = (1 << (i + 1)) - remain;  // Overflow when i=31
// Correct: use unsigned
uint diff = (1ul << (i + 1)) - remain;
```
