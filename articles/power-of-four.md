## 1. Recursion

### Intuition

A number is a power of four if we can repeatedly divide it by 4 until we reach 1. If at any point the number is not divisible by 4 (or becomes zero or negative), it cannot be a power of four.

This naturally leads to a recursive solution where we reduce the problem size by dividing by 4 at each step.

### Algorithm

1. If `n` equals `1`, return `true` (`4^0 = 1`).
2. If `n` is less than or equal to `0`, or `n` is not divisible by `4`, return `false`.
3. Recursively check if `n / 4` is a power of four.

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        if n == 1:
            return True
        if n <= 0 or n % 4:
            return False
        return self.isPowerOfFour(n // 4)
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 4 != 0) {
            return false;
        }
        return isPowerOfFour(n / 4);
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 4 != 0) {
            return false;
        }
        return isPowerOfFour(n / 4);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        if (n === 1) {
            return true;
        }
        if (n <= 0 || n % 4 !== 0) {
            return false;
        }
        return this.isPowerOfFour(Math.floor(n / 4));
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 4 != 0) {
            return false;
        }
        return IsPowerOfFour(n / 4);
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n == 1 {
        return true
    }
    if n <= 0 || n%4 != 0 {
        return false
    }
    return isPowerOfFour(n / 4)
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        if (n == 1) {
            return true
        }
        if (n <= 0 || n % 4 != 0) {
            return false
        }
        return isPowerOfFour(n / 4)
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        if n == 1 {
            return true
        }
        if n <= 0 || n % 4 != 0 {
            return false
        }
        return isPowerOfFour(n / 4)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 2. Iteration

### Intuition

The same logic as recursion applies here, but we use a loop instead. We keep dividing `n` by 4 as long as it remains divisible. If we end up with `1`, the original number was a power of four.

### Algorithm

1. If `n` is negative, return `false`.
2. While `n` is greater than `1`:
   - If `n` is not divisible by `4`, return `false`.
   - Divide `n` by `4`.
3. Return `true` if `n` equals `1`, `false` otherwise.

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        if n < 0:
            return False

        while n > 1:
            if n % 4:
                return False
            n //= 4

        return n == 1
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 != 0) return false;
            n /= 4;
        }

        return n == 1;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 != 0) return false;
            n /= 4;
        }

        return n == 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 !== 0) return false;
            n = Math.floor(n / 4);
        }

        return n === 1;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        if (n < 0) return false;

        while (n > 1) {
            if (n % 4 != 0) return false;
            n /= 4;
        }

        return n == 1;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n < 0 {
        return false
    }

    for n > 1 {
        if n%4 != 0 {
            return false
        }
        n /= 4
    }

    return n == 1
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        if (n < 0) return false

        var num = n
        while (num > 1) {
            if (num % 4 != 0) return false
            num /= 4
        }

        return num == 1
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        if n < 0 {
            return false
        }

        var num = n
        while num > 1 {
            if num % 4 != 0 {
                return false
            }
            num /= 4
        }

        return num == 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Math

### Intuition

If `n` is a power of 4, then `n = 4^k` for some integer `k`. Taking the logarithm base 4 of both sides gives `k = log4(n)`. If this result is an integer, then `n` is a power of four.

We check if the logarithm yields a whole number by verifying the remainder when divided by 1 is zero.

### Algorithm

1. If `n` is less than or equal to `0`, return `false`.
2. Compute `log(n) / log(4)` to get the base-4 logarithm.
3. Return `true` if this value has no fractional part (i.e., modulo 1 equals `0`).

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and log(n, 4) % 1 == 0
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && Math.log(n) / Math.log(4) % 1 == 0;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && fmod(log(n) / log(4), 1) == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        return n > 0 && (Math.log(n) / Math.log(4)) % 1 === 0;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        return n > 0 && Math.Log(n) / Math.Log(4) % 1 == 0;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n <= 0 {
        return false
    }
    logVal := math.Log(float64(n)) / math.Log(4)
    return math.Mod(logVal, 1) == 0
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        return n > 0 && Math.log(n.toDouble()) / Math.log(4.0) % 1 == 0.0
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        return n > 0 && log(Double(n)) / log(4.0).truncatingRemainder(dividingBy: 1) == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation

### Intuition

Powers of four in binary are `1`, `100`, `10000`, `1000000`, etc. They have exactly one set bit, and that bit is always at an even position (`0`, `2`, `4`, ...).

We can check all even bit positions (`0`, `2`, `4`, ..., `30`) and see if `n` equals exactly one of these values: `1`, `4`, `16`, `64`, and so on.

### Algorithm

1. If `n` is negative, return `false`.
2. Iterate through even bit positions from `0` to `30` (step by `2`):
   - If `n` equals `1 << i` (which is `4^(i/2)`), return `true`.
3. If no match is found, return `false`.

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        if n < 0:
            return False

        for i in range(0, 32, 2):
            if n == (1 << i):
                return True

        return False
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        if (n < 0) return false;

        for (int i = 0; i < 32; i += 2) {
            if (n == (1 << i)) {
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
    bool isPowerOfFour(int n) {
        if (n < 0) return false;

        for (int i = 0; i < 32; i += 2) {
            if (n == (1 << i)) {
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
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        if (n < 0) return false;

        for (let i = 0; i < 32; i += 2) {
            if (n === 1 << i) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        if (n < 0) return false;

        for (int i = 0; i < 32; i += 2) {
            if (n == (1 << i)) {
                return true;
            }
        }

        return false;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    if n < 0 {
        return false
    }

    for i := 0; i < 32; i += 2 {
        if n == (1 << i) {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        if (n < 0) return false

        for (i in 0 until 32 step 2) {
            if (n == (1 shl i)) {
                return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        if n < 0 {
            return false
        }

        for i in stride(from: 0, to: 32, by: 2) {
            if n == (1 << i) {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 5. Bit Mask - I

### Intuition

A power of four must first be a power of two (exactly one bit set). We verify this using `n & (n - 1) == 0`. But not all powers of two are powers of four (e.g., `2` and `8` are not).

Powers of four have their single set bit at even positions. The mask `0x55555555` (binary: `01010101...`) has `1`s at all even positions. ANDing with this mask confirms the bit is at a valid position.

### Algorithm

1. Check that `n` is positive.
2. Check that `n` is a power of two: `(n & (n - 1)) == 0`.
3. Check that the set bit is at an even position: `(n & 0x55555555) == n`.
4. Return `true` if all conditions are met.

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) == n
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) === n;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n;
    }
}
```

```go
func isPowerOfFour(n int) bool {
    return n > 0 && (n&(n-1)) == 0 && (n&0x55555555) == n
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        return n > 0 && (n and (n - 1)) == 0 && (n and 0x55555555) == n
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 6. Bit Mask - II

### Intuition

Powers of four follow a pattern when divided by 3: `4^k mod 3 = 1` for all non-negative `k`. This is because `4 = 3 + 1`, so `4^k = (3+1)^k`, which when expanded always leaves remainder `1`.

Powers of two that are not powers of four (like `2`, `8`, `32`) give remainder `2` when divided by `3`. This gives us a simple way to distinguish between them.

### Algorithm

1. Check that `n` is positive.
2. Check that `n` is a power of two: `(n & (n - 1)) == 0`.
3. Check that `n % 3 == 1` to confirm it's specifically a power of four.
4. Return `true` if all conditions are met.

::tabs-start

```python
class Solution:
    def isPowerOfFour(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0 and (n % 3 == 1)
```

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n % 3 == 1);
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n % 3 == 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfFour(n) {
        return n > 0 && (n & (n - 1)) === 0 && n % 3 == 1;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfFour(int n) {
        return n > 0 && (n & (n - 1)) == 0 && (n % 3 == 1);
    }
}
```

```go
func isPowerOfFour(n int) bool {
    return n > 0 && (n&(n-1)) == 0 && n%3 == 1
}
```

```kotlin
class Solution {
    fun isPowerOfFour(n: Int): Boolean {
        return n > 0 && (n and (n - 1)) == 0 && n % 3 == 1
    }
}
```

```swift
class Solution {
    func isPowerOfFour(_ n: Int) -> Bool {
        return n > 0 && (n & (n - 1)) == 0 && n % 3 == 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
