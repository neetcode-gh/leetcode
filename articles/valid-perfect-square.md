## 1. Brute Force

### Intuition

The most straightforward approach is to try every integer starting from 1 and check if its square equals the input number. We keep incrementing until either we find a match (perfect square) or the square exceeds the input (not a perfect square). Since we only need to check up to the square root of the number, this terminates reasonably quickly.

### Algorithm

1. Start with `i = 1`.
2. Compute `sq = i * i`.
3. If `sq > num`, the number is not a perfect square. Return `false`.
4. If `sq == num`, we found the square root. Return `true`.
5. Increment `i` and repeat.

::tabs-start

```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        for i in range(1, num + 1):
            sq = i * i
            if sq > num:
                return False
            if sq == num:
                return True
```

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        for (long i = 1; i <= num; i++) {
            long sq = i * i;
            if (sq > num) {
                return false;
            }
            if (sq == num) {
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
    bool isPerfectSquare(int num) {
        for (long long i = 1; i <= num; i++) {
            long long sq = i * i;
            if (sq > num) {
                return false;
            }
            if (sq == num) {
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
     * @param {number} num
     * @return {boolean}
     */
    isPerfectSquare(num) {
        for (let i = 1; i <= num; i++) {
            let sq = i * i;
            if (sq > num) {
                return false;
            }
            if (sq === num) {
                return true;
            }
        }
        return false;
    }
}
```

```csharp
public class Solution {
    public bool IsPerfectSquare(int num) {
        for (long i = 1; i <= num; i++) {
            long sq = i * i;
            if (sq > num) {
                return false;
            }
            if (sq == num) {
                return true;
            }
        }
        return false;
    }
}
```

```go
func isPerfectSquare(num int) bool {
    for i := 1; i <= num; i++ {
        sq := i * i
        if sq > num {
            return false
        }
        if sq == num {
            return true
        }
    }
    return false
}
```

```kotlin
class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        var i: Long = 1
        while (i <= num) {
            val sq = i * i
            if (sq > num) {
                return false
            }
            if (sq == num.toLong()) {
                return true
            }
            i++
        }
        return false
    }
}
```

```swift
class Solution {
    func isPerfectSquare(_ num: Int) -> Bool {
        var i = 1
        while i <= num {
            let sq = i * i
            if sq > num {
                return false
            }
            if sq == num {
                return true
            }
            i += 1
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 2. In-Built Function

### Intuition

Most programming languages provide a built-in square root function. We can use it to compute the square root, truncate it to an integer, and then verify by squaring it back. If the squared result equals the original number, it is a perfect square. This leverages optimized library implementations for a quick solution.

### Algorithm

1. Compute the integer square root: `sqRoot = floor(sqrt(num))`.
2. Check if `sqRoot * sqRoot == num`.
3. Return `true` if they are equal, `false` otherwise.

::tabs-start

```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        sqRoot = int(sqrt(num))
        return sqRoot * sqRoot == num
```

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        int sqRoot = (int) Math.sqrt(num);
        return sqRoot * sqRoot == num;
    }
}
```

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        int sqRoot = (int) sqrt(num);
        return sqRoot * sqRoot == num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} num
     * @return {boolean}
     */
    isPerfectSquare(num) {
        let sqRoot = Math.floor(Math.sqrt(num));
        return sqRoot * sqRoot === num;
    }
}
```

```csharp
public class Solution {
    public bool IsPerfectSquare(int num) {
        int sqRoot = (int)Math.Sqrt(num);
        return sqRoot * sqRoot == num;
    }
}
```

```go
func isPerfectSquare(num int) bool {
    sqRoot := int(math.Sqrt(float64(num)))
    return sqRoot*sqRoot == num
}
```

```kotlin
class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        val sqRoot = Math.sqrt(num.toDouble()).toInt()
        return sqRoot * sqRoot == num
    }
}
```

```swift
class Solution {
    func isPerfectSquare(_ num: Int) -> Bool {
        let sqRoot = Int(Double(num).squareRoot())
        return sqRoot * sqRoot == num
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Binary Search

### Intuition

Instead of checking every number sequentially, we can use binary search to find the square root more efficiently. The search space is from 1 to num. For each midpoint, we compute its square: if it is too large, search the left half; if too small, search the right half; if equal, we found a perfect square. This reduces the number of checks from O(sqrt(n)) to O(log n).

### Algorithm

1. Initialize `l = 1` and `r = num`.
2. While `l <= r`:
   - Compute the midpoint `m = l + (r - l) / 2`.
   - Compute `sq = m * m`.
   - If `sq > num`, search left: `r = m - 1`.
   - If `sq < num`, search right: `l = m + 1`.
   - If `sq == num`, return `true`.
3. If the loop ends without finding a match, return `false`.

::tabs-start

```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        l, r = 1, num

        while l <= r:
            m = l + (r - l) // 2
            sq = m * m
            if sq > num:
                r = m - 1
            elif sq < num:
                l = m + 1
            else:
                return True

        return False
```

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        long l = 1, r = num;

        while (l <= r) {
            long m = l + (r - l) / 2;
            long sq = m * m;
            if (sq > num) {
                r = m - 1;
            } else if (sq < num) {
                l = m + 1;
            } else {
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
    bool isPerfectSquare(int num) {
        long long l = 1, r = num;

        while (l <= r) {
            long long m = l + (r - l) / 2;
            long long sq = m * m;
            if (sq > num) {
                r = m - 1;
            } else if (sq < num) {
                l = m + 1;
            } else {
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
     * @param {number} num
     * @return {boolean}
     */
    isPerfectSquare(num) {
        let l = 1,
            r = num;

        while (l <= r) {
            let m = Math.floor(l + (r - l) / 2);
            let sq = m * m;
            if (sq > num) {
                r = m - 1;
            } else if (sq < num) {
                l = m + 1;
            } else {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool IsPerfectSquare(int num) {
        long l = 1, r = num;

        while (l <= r) {
            long m = l + (r - l) / 2;
            long sq = m * m;
            if (sq > num) {
                r = m - 1;
            } else if (sq < num) {
                l = m + 1;
            } else {
                return true;
            }
        }

        return false;
    }
}
```

```go
func isPerfectSquare(num int) bool {
    l, r := 1, num

    for l <= r {
        m := l + (r-l)/2
        sq := m * m
        if sq > num {
            r = m - 1
        } else if sq < num {
            l = m + 1
        } else {
            return true
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        var l: Long = 1
        var r: Long = num.toLong()

        while (l <= r) {
            val m = l + (r - l) / 2
            val sq = m * m
            if (sq > num) {
                r = m - 1
            } else if (sq < num) {
                l = m + 1
            } else {
                return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func isPerfectSquare(_ num: Int) -> Bool {
        var l = 1
        var r = num

        while l <= r {
            let m = l + (r - l) / 2
            let sq = m * m
            if sq > num {
                r = m - 1
            } else if sq < num {
                l = m + 1
            } else {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Math

### Intuition

There is a beautiful mathematical property: perfect squares can be expressed as the sum of consecutive odd numbers. For example, 1 = 1, 4 = 1+3, 9 = 1+3+5, 16 = 1+3+5+7, and so on. We can repeatedly subtract consecutive odd numbers from the input. If we eventually reach exactly zero, the number is a perfect square.

### Algorithm

1. Initialize `i = 1` (the first odd number).
2. While `num > 0`:
   - Subtract `i` from `num`.
   - Increment `i` by `2` to get the next odd number.
3. If `num == 0`, the original number was a perfect square. Return `true`.
4. Otherwise, return `false`.

::tabs-start

```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        i = 1
        while num > 0:
            num -= i
            i += 2
        return num == 0
```

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        int i = 1;
        while (num > 0) {
            num -= i;
            i += 2;
        }
        return num == 0;
    }
}
```

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        int i = 1;
        while (num > 0) {
            num -= i;
            i += 2;
        }
        return num == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} num
     * @return {boolean}
     */
    isPerfectSquare(num) {
        let i = 1;
        while (num > 0) {
            num -= i;
            i += 2;
        }
        return num === 0;
    }
}
```

```csharp
public class Solution {
    public bool IsPerfectSquare(int num) {
        int i = 1;
        while (num > 0) {
            num -= i;
            i += 2;
        }
        return num == 0;
    }
}
```

```go
func isPerfectSquare(num int) bool {
    i := 1
    for num > 0 {
        num -= i
        i += 2
    }
    return num == 0
}
```

```kotlin
class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        var n = num
        var i = 1
        while (n > 0) {
            n -= i
            i += 2
        }
        return n == 0
    }
}
```

```swift
class Solution {
    func isPerfectSquare(_ num: Int) -> Bool {
        var num = num
        var i = 1
        while num > 0 {
            num -= i
            i += 2
        }
        return num == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 5. Newton's Method

### Intuition

Newton's method is a fast iterative technique for finding roots of equations. To find the square root of num, we want to solve x^2 = num, or equivalently find the root of f(x) = x^2 - num. Newton's method gives us the iteration formula: x_new = (x + num/x) / 2. Starting from an initial guess (the number itself), each iteration brings us closer to the actual square root. Once converged, we check if the result squared equals the input.

### Algorithm

1. Initialize `r = num` as the initial guess.
2. While `r * r > num`:
   - Update `r = (r + num / r) / 2`.
3. After convergence, check if `r * r == num`.
4. Return `true` if equal, `false` otherwise.

::tabs-start

```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        r = num
        while r * r > num:
            r = (r + (num // r)) // 2
        return r * r == num
```

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        long r = num;
        while (r * r > num) {
            r = (r + num / r) / 2;
        }
        return r * r == num;
    }
}
```

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        long long r = num;
        while (r * r > num) {
            r = (r + num / r) / 2;
        }
        return r * r == num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} num
     * @return {boolean}
     */
    isPerfectSquare(num) {
        let r = num;
        while (r * r > num) {
            r = Math.floor((r + Math.floor(num / r)) / 2);
        }
        return r * r === num;
    }
}
```

```csharp
public class Solution {
    public bool IsPerfectSquare(int num) {
        long r = num;
        while (r * r > num) {
            r = (r + num / r) / 2;
        }
        return r * r == num;
    }
}
```

```go
func isPerfectSquare(num int) bool {
    r := num
    for r*r > num {
        r = (r + num/r) / 2
    }
    return r*r == num
}
```

```kotlin
class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        var r: Long = num.toLong()
        while (r * r > num) {
            r = (r + num / r) / 2
        }
        return r * r == num.toLong()
    }
}
```

```swift
class Solution {
    func isPerfectSquare(_ num: Int) -> Bool {
        var r = num
        while r * r > num {
            r = (r + num / r) / 2
        }
        return r * r == num
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 6. Bit Manipulation

### Intuition

We can construct the square root bit by bit, from the most significant bit to the least significant. For a 32-bit integer, the square root fits in at most 16 bits. We try setting each bit position and check if the resulting number squared is still within bounds. If setting a bit makes the square too large, we clear that bit; otherwise, we keep it. This builds the largest integer whose square does not exceed the input.

### Algorithm

1. Initialize `r = 0` and `mask = 1 << 15` (starting from the highest possible bit).
2. While `mask > 0`:
   - Set the current bit: `r |= mask`.
   - If `r > num / r` (meaning `r^2` would exceed `num`), clear the bit: `r ^= mask`.
   - Shift the mask right: `mask >>= 1`.
3. After processing all bits, check if `r * r == num`.
4. Return `true` if equal, `false` otherwise.

::tabs-start

```python
class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        r, mask = 0, 1 << 15

        while mask > 0:
            r |= mask
            if r > (num // r):
                r ^= mask
            mask >>= 1

        return r * r == num
```

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        int r = 0, mask = 1 << 15;

        while (mask > 0) {
            r |= mask;
            if (r > (num / r)) {
                r ^= mask;
            }
            mask >>= 1;
        }

        return r * r == num;
    }
}
```

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        int r = 0, mask = 1 << 15;

        while (mask > 0) {
            r |= mask;
            if (r > (num / r)) {
                r ^= mask;
            }
            mask >>= 1;
        }

        return r * r == num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} num
     * @return {boolean}
     */
    isPerfectSquare(num) {
        let r = 0,
            mask = 1 << 15;

        while (mask > 0) {
            r |= mask;
            if (r > Math.floor(num / r)) {
                r ^= mask;
            }
            mask >>= 1;
        }

        return r * r === num;
    }
}
```

```csharp
public class Solution {
    public bool IsPerfectSquare(int num) {
        int r = 0, mask = 1 << 15;

        while (mask > 0) {
            r |= mask;
            if (r > (num / r)) {
                r ^= mask;
            }
            mask >>= 1;
        }

        return r * r == num;
    }
}
```

```go
func isPerfectSquare(num int) bool {
    r, mask := 0, 1<<15

    for mask > 0 {
        r |= mask
        if r > num/r {
            r ^= mask
        }
        mask >>= 1
    }

    return r*r == num
}
```

```kotlin
class Solution {
    fun isPerfectSquare(num: Int): Boolean {
        var r = 0
        var mask = 1 shl 15

        while (mask > 0) {
            r = r or mask
            if (r > num / r) {
                r = r xor mask
            }
            mask = mask shr 1
        }

        return r * r == num
    }
}
```

```swift
class Solution {
    func isPerfectSquare(_ num: Int) -> Bool {
        var r = 0
        var mask = 1 << 15

        while mask > 0 {
            r |= mask
            if r > num / r {
                r ^= mask
            }
            mask >>= 1
        }

        return r * r == num
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ since we iterate at most $15$ times.
- Space complexity: $O(1)$

---

## Common Pitfalls

### Integer Overflow When Squaring

When computing `m * m` in binary search or brute force approaches, the result can overflow if using 32-bit integers. For example, if `m = 46341`, then `m * m = 2147488281` which exceeds the maximum 32-bit signed integer. Always use `long` or `long long` for the squared value, or use division (`m > num / m`) to avoid overflow.

### Floating-Point Precision Issues

When using the built-in `sqrt()` function, floating-point precision can cause incorrect results. For example, `sqrt(2147395600)` might return `46339.999989...` which truncates to `46339` instead of `46340`. Always verify by squaring the integer result and comparing with the original number, rather than relying solely on the floating-point square root.
