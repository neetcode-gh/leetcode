## 1. Brute Force

### Intuition

We can generate all powers of two by starting from 1 and repeatedly multiplying by 2. If we reach exactly `n`, then `n` is a power of two. If we exceed `n` without matching it, then it's not.

### Algorithm

1. If `n` is less than or equal to 0, return false.
2. Start with `x = 1`.
3. While `x` is less than `n`, multiply `x` by 2.
4. Return true if `x` equals `n`, false otherwise.

::tabs-start

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        if n <= 0:
            return False

        x = 1
        while x < n:
            x *= 2
        return x == n
```

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;

        long x = 1;
        while (x < n) {
            x *= 2;
        }
        return x == n;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        if (n <= 0) return false;

        long long x = 1;
        while (x < n) {
            x *= 2;
        }
        return x == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfTwo(n) {
        if (n <= 0) return false;

        let x = 1;
        while (x < n) {
            x *= 2;
        }
        return x === n;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfTwo(int n) {
        if (n <= 0) {
            return false;
        }

        int x = 1;
        while (x < n) {
            x *= 2;
        }
        return x == n;
    }
}
```

```go
func isPowerOfTwo(n int) bool {
    if n <= 0 {
        return false
    }

    x := 1
    for x < n {
        x *= 2
    }
    return x == n
}
```

```kotlin
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        if (n <= 0) return false

        var x = 1L
        while (x < n) {
            x *= 2
        }
        return x == n.toLong()
    }
}
```

```swift
class Solution {
    func isPowerOfTwo(_ n: Int) -> Bool {
        if n <= 0 {
            return false
        }

        var x = 1
        while x < n {
            x *= 2
        }
        return x == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 2. Recursion

### Intuition

A number is a power of two if we can repeatedly divide it by 2 until we reach 1. If at any point the number is odd (and not 1), it cannot be a power of two.

This recursive approach reduces the problem by half at each step.

### Algorithm

1. If `n` equals 1, return true (2^0 = 1).
2. If `n` is less than or equal to 0, or `n` is odd, return false.
3. Recursively check if `n / 2` is a power of two.

::tabs-start

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        if n == 1:
            return True
        if n <= 0 or n % 2 == 1:
            return False
        return self.isPowerOfTwo(n // 2)
```

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 2 == 1) {
            return false;
        }
        return isPowerOfTwo(n / 2);
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 2 == 1) {
            return false;
        }
        return isPowerOfTwo(n / 2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfTwo(n) {
        if (n === 1) {
            return true;
        }
        if (n <= 0 || n % 2 === 1) {
            return false;
        }
        return this.isPowerOfTwo(Math.floor(n / 2));
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfTwo(int n) {
        if (n == 1) {
            return true;
        }
        if (n <= 0 || n % 2 == 1) {
            return false;
        }
        return IsPowerOfTwo(n / 2);
    }
}
```

```go
func isPowerOfTwo(n int) bool {
    if n == 1 {
        return true
    }
    if n <= 0 || n%2 == 1 {
        return false
    }
    return isPowerOfTwo(n / 2)
}
```

```kotlin
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        if (n == 1) {
            return true
        }
        if (n <= 0 || n % 2 == 1) {
            return false
        }
        return isPowerOfTwo(n / 2)
    }
}
```

```swift
class Solution {
    func isPowerOfTwo(_ n: Int) -> Bool {
        if n == 1 {
            return true
        }
        if n <= 0 || n % 2 == 1 {
            return false
        }
        return isPowerOfTwo(n / 2)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 3. Iteration

### Intuition

The same logic as recursion, but implemented with a loop. We keep dividing by 2 (or right-shifting by 1) as long as the number is even. If we end up with 1, the original number was a power of two.

### Algorithm

1. If `n` is less than or equal to 0, return false.
2. While `n` is even (divisible by 2), right-shift `n` by 1.
3. Return true if `n` equals 1, false otherwise.

::tabs-start

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        if n <= 0:
            return False

        while n % 2 == 0:
            n >>= 1
        return n == 1
```

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;

        while (n % 2 == 0) {
            n >>= 1;
        }
        return n == 1;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        if (n <= 0) return false;

        while (n % 2 == 0) {
            n >>= 1;
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
    isPowerOfTwo(n) {
        if (n <= 0) return 0;

        while (n % 2 === 0) {
            n >>= 1;
        }
        return n === 1;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfTwo(int n) {
        if (n <= 0) {
            return false;
        }
        while (n % 2 == 0) {
            n >>= 1;
        }
        return n == 1;
    }
}
```

```go
func isPowerOfTwo(n int) bool {
    if n <= 0 {
        return false
    }

    for n%2 == 0 {
        n >>= 1
    }
    return n == 1
}
```

```kotlin
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        if (n <= 0) return false

        var num = n
        while (num % 2 == 0) {
            num = num shr 1
        }
        return num == 1
    }
}
```

```swift
class Solution {
    func isPowerOfTwo(_ n: Int) -> Bool {
        if n <= 0 {
            return false
        }

        var num = n
        while num % 2 == 0 {
            num >>= 1
        }
        return num == 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation - I

### Intuition

In two's complement representation, `-n` flips all bits of `n` and adds 1. For a power of two (which has exactly one set bit), `n & (-n)` isolates the lowest set bit. If `n` is a power of two, this equals `n` itself since there's only one bit set.

### Algorithm

1. Check that `n` is positive.
2. Compute `n & (-n)` to isolate the lowest set bit.
3. Return true if this equals `n`, meaning `n` has exactly one set bit.

::tabs-start

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (-n)) == n
```

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (-n)) == n;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (-n)) == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfTwo(n) {
        return n > 0 && (n & -n) === n;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfTwo(int n) {
        return n > 0 && (n & -n) == n;
    }
}
```

```go
func isPowerOfTwo(n int) bool {
    return n > 0 && (n&(-n)) == n
}
```

```kotlin
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        return n > 0 && (n and (-n)) == n
    }
}
```

```swift
class Solution {
    func isPowerOfTwo(_ n: Int) -> Bool {
        return n > 0 && (n & (-n)) == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 5. Bit Manipulation - II

### Intuition

Powers of two in binary have exactly one bit set (1, 10, 100, 1000, ...). Subtracting 1 from such a number flips all bits from the rightmost set bit onward. For example, 8 (1000) minus 1 equals 7 (0111).

ANDing `n` with `n - 1` clears the lowest set bit. If `n` is a power of two, this results in 0 since there was only one bit to clear.

### Algorithm

1. Check that `n` is positive.
2. Compute `n & (n - 1)` to clear the lowest set bit.
3. Return true if the result is 0, meaning `n` had exactly one set bit.

::tabs-start

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and (n & (n - 1)) == 0
```

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfTwo(n) {
        return n > 0 && (n & (n - 1)) === 0;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```

```go
func isPowerOfTwo(n int) bool {
    return n > 0 && (n&(n-1)) == 0
}
```

```kotlin
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        return n > 0 && (n and (n - 1)) == 0
    }
}
```

```swift
class Solution {
    func isPowerOfTwo(_ n: Int) -> Bool {
        return n > 0 && (n & (n - 1)) == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 6. Math

### Intuition

The largest power of two that fits in a 32-bit signed integer is 2^30 (since 2^31 exceeds the positive range). Any smaller power of two must divide evenly into 2^30.

If `n` is a power of two, then 2^30 mod `n` equals 0. If `n` is not a power of two, the division will have a remainder.

### Algorithm

1. Check that `n` is positive.
2. Compute `(1 << 30) % n` (i.e., 2^30 mod n).
3. Return true if the result is 0.

::tabs-start

```python
class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        return n > 0 and ((1 << 30) % n) == 0
```

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        return n > 0 && ((1 << 30) % n) == 0;
    }
}
```

```cpp
class Solution {
public:
    bool isPowerOfTwo(int n) {
        return n > 0 && ((1 << 30) % n) == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {boolean}
     */
    isPowerOfTwo(n) {
        return n > 0 && (1 << 30) % n === 0;
    }
}
```

```csharp
public class Solution {
    public bool IsPowerOfTwo(int n) {
        return n > 0 && ((1 << 30) % n) == 0;
    }
}
```

```go
func isPowerOfTwo(n int) bool {
    return n > 0 && (1<<30)%n == 0
}
```

```kotlin
class Solution {
    fun isPowerOfTwo(n: Int): Boolean {
        return n > 0 && ((1 shl 30) % n) == 0
    }
}
```

```swift
class Solution {
    func isPowerOfTwo(_ n: Int) -> Bool {
        return n > 0 && ((1 << 30) % n) == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
