## 1. Brute Force

### Intuition

We are asked to compute \( x^n \), where:
- `x` is a floating-point number
- `n` can be **positive, zero, or negative**

The most straightforward way to think about exponentiation is:
- multiplying `x` by itself `n` times

This brute force approach directly follows the mathematical definition of power:
- if `n` is positive → multiply `x` repeatedly
- if `n` is zero → the result is always `1`
- if `n` is negative → compute \( x^{|n|} \) and take its reciprocal

Although this method is not efficient for large `n`, it is very easy to understand and is a good starting point.

### Algorithm

1. Handle edge cases:
   - If `x == 0`, return `0`
   - If `n == 0`, return `1`
2. Initialize `res = 1` to store the result.
3. Repeat `abs(n)` times:
   - multiply `res` by `x`
4. If `n` is positive:
   - return `res`
5. If `n` is negative:
   - return `1 / res`

::tabs-start

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if x == 0:
            return 0
        if n == 0:
            return 1

        res = 1
        for i in range(abs(n)):
            res *= x
        return res if n >= 0 else 1 / res
```

```java
public class Solution {
    public double myPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }

        double res = 1;
        for (int i = 0; i < Math.abs(n); i++) {
            res *= x;
        }
        return n >= 0 ? res : 1 / res;
    }
}
```

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }

        double res = 1;
        for (int i = 0; i < abs(n); i++) {
            res *= x;
        }
        return n >= 0 ? res : 1 / res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @param {number} n
     * @return {number}
     */
    myPow(x, n) {
        if (x === 0) {
            return 0;
        }
        if (n === 0) {
            return 1;
        }

        let res = 1;
        for (let i = 0; i < Math.abs(n); i++) {
            res *= x;
        }
        return n >= 0 ? res : 1 / res;
    }
}
```

```csharp
public class Solution {
    public double MyPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }

        double res = 1;
        for (int i = 0; i < Math.Abs(n); i++) {
            res *= x;
        }
        return n >= 0 ? res : 1 / res;
    }
}
```

```go
func myPow(x float64, n int) float64 {
    if x == 0 {
        return 0
    }
    if n == 0 {
        return 1
    }

    res := 1.0
    for i := 0; i < int(math.Abs(float64(n))); i++ {
        res *= x
    }

    if n >= 0 {
        return res
    }
    return 1 / res
}
```

```kotlin
class Solution {
    fun myPow(x: Double, n: Int): Double {
        if (x == 0.0) {
            return 0.0
        }
        if (n == 0) {
            return 1.0
        }

        var res = 1.0
        for (i in 0 until Math.abs(n)) {
            res *= x
        }

        return if (n >= 0) res else 1 / res
    }
}
```

```swift
class Solution {
    func myPow(_ x: Double, _ n: Int) -> Double {
        if x == 0 {
            return 0
        }
        if n == 0 {
            return 1
        }

        var res: Double = 1
        for _ in 0..<abs(n) {
            res *= x
        }
        return n >= 0 ? res : 1 / res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Binary Exponentiation (Recursive)

### Intuition

Computing \( x^n \) by multiplying `x` repeatedly works, but it becomes very slow when `n` is large.

A much better idea is to use **binary exponentiation**, which is based on these observations:
- If `n` is even:
  - \( x^n = (x^2)^{n/2} \)
- If `n` is odd:
  - \( x^n = x \times (x^2)^{(n-1)/2} \)

This means we can:
- **halve the exponent** at each step
- **square the base** accordingly

By doing this recursively, the number of multiplications reduces from `O(n)` to `O(log n)`.

We also handle negative powers by:
- computing \( x^{|n|} \)
- taking the reciprocal if `n` is negative

### Algorithm

1. Define a recursive helper function `helper(x, n)`:
   - If `x == 0`, return `0`
   - If `n == 0`, return `1`
2. Recursively compute:
   - `res = helper(x * x, n // 2)`
3. If `n` is odd:
   - return `x * res`
4. If `n` is even:
   - return `res`
5. Call `helper(x, abs(n))` to compute the magnitude.
6. If `n` is negative:
   - return `1 / result`
7. Otherwise:
   - return `result`

::tabs-start

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        def helper(x, n):
            if x == 0:
                return 0
            if n == 0:
                return 1

            res = helper(x * x, n // 2)
            return x * res if n % 2 else res

        res = helper(x, abs(n))
        return res if n >= 0 else 1 / res
```

```java
public class Solution {
    public double myPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }

        double res = helper(x, Math.abs((long) n));
        return (n >= 0) ? res : 1 / res;
    }

    private double helper(double x, long n) {
        if (n == 0) {
            return 1;
        }
        double half = helper(x, n / 2);
        return (n % 2 == 0) ? half * half : x * half * half;
    }
}
```

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }

        double res = helper(x, abs(static_cast<long>(n)));
        return (n >= 0) ? res : 1 / res;
    }

private:
    double helper(double x, long n) {
        if (n == 0) {
            return 1;
        }
        double half = helper(x, n / 2);
        return (n % 2 == 0) ? half * half : x * half * half;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @param {number} n
     * @return {number}
     */
    myPow(x, n) {
        /**
         * @param {number} x
         * @param {number} n
         * @return {number}
         */
        function helper(x, n) {
            if (x === 0) {
                return 0;
            }
            if (n === 0) {
                return 1;
            }

            const res = helper(x * x, Math.floor(n / 2));
            return n % 2 === 0 ? res : x * res;
        }

        const res = helper(x, Math.abs(n));
        return n >= 0 ? res : 1 / res;
    }
}
```

```csharp
public class Solution {
    public double MyPow(double x, int n) {
        if (x == 0) {
            return 0;
        }
        if (n == 0) {
            return 1;
        }

        double res = Helper(x, Math.Abs((long) n));
        return (n >= 0) ? res : 1 / res;
    }

    private double Helper(double x, long n) {
        if (n == 0) {
            return 1;
        }
        double half = Helper(x, n / 2);
        return (n % 2 == 0) ? half * half : x * half * half;
    }
}
```

```go
func myPow(x float64, n int) float64 {
    var helper func(x float64, n int) float64
    helper = func(x float64, n int) float64 {
        if x == 0 {
            return 0
        }
        if n == 0 {
            return 1
        }

        res := helper(x*x, n/2)
        if n%2 != 0 {
            return x * res
        }
        return res
    }

    res := helper(x, int(math.Abs(float64(n))))
    if n >= 0 {
        return res
    }
    return 1 / res
}
```

```kotlin
class Solution {
    fun myPow(x: Double, n: Int): Double {
        fun helper(x: Double, n: Int): Double {
            if (x == 0.0) {
                return 0.0
            }
            if (n == 0) {
                return 1.0
            }

            val res = helper(x * x, n / 2)
            return if (n % 2 != 0) x * res else res
        }

        val res = helper(x, Math.abs(n))
        return if (n >= 0) res else 1 / res
    }
}
```

```swift
class Solution {
    func myPow(_ x: Double, _ n: Int) -> Double {
        func helper(_ x: Double, _ n: Int) -> Double {
            if x == 0 {
                return 0
            }
            if n == 0 {
                return 1
            }

            let res = helper(x * x, n / 2)
            return n % 2 == 0 ? res : x * res
        }

        let res = helper(x, abs(n))
        return n >= 0 ? res : 1 / res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 3. Binary Exponentiation (Iterative)

### Intuition

We want to compute \( x^n \) efficiently, even when `n` is very large (positive or negative).

The brute force approach multiplies `x` repeatedly and takes **O(n)** time, which is too slow.
Instead, we use **binary exponentiation**, which reduces the time complexity to **O(log n)**.

The key ideas are:
- Any number `n` can be written in binary
- If the current `power` is **odd**, we must include one extra `x` in the result
- We repeatedly:
  - square the base (`x = x * x`)
  - halve the exponent (`power = power // 2`)

For negative powers:
- \( x^n = \frac{1}{x^{|n|}} \)
- so we compute using `abs(n)` and take the reciprocal at the end if needed

This iterative version avoids recursion and works efficiently with constant extra space.

### Algorithm

1. Handle edge cases:
   - If `x == 0`, return `0`
   - If `n == 0`, return `1`
2. Initialize:
   - `res = 1` (stores the final answer)
   - `power = abs(n)` (work with positive exponent)
3. While `power > 0`:
   - If `power` is odd:
     - multiply `res` by `x`
   - Square the base:
     - `x = x * x`
   - Divide the exponent by 2:
     - `power = power >> 1`
4. If `n` is negative:
   - return `1 / res`
5. Otherwise:
   - return `res`

::tabs-start

```python
class Solution:
    def myPow(self, x: float, n: int) -> float:
        if x == 0:
            return 0
        if n == 0:
            return 1

        res = 1
        power = abs(n)

        while power:
            if power & 1:
                res *= x
            x *= x
            power >>= 1

        return res if n >= 0 else 1 / res
```

```java
public class Solution {
    public double myPow(double x, int n) {
        if (x == 0) return 0;
        if (n == 0) return 1;

        double res = 1;
        long power = Math.abs((long)n);

        while (power > 0) {
            if ((power & 1) == 1) {
                res *= x;
            }
            x *= x;
            power >>= 1;
        }

        return n >= 0 ? res : 1 / res;
    }
}
```

```cpp
class Solution {
public:
    double myPow(double x, int n) {
        if (x == 0) return 0;
        if (n == 0) return 1;

        double res = 1;
        long power = abs((long)n);

        while (power) {
            if (power & 1) {
                res *= x;
            }
            x *= x;
            power >>= 1;
        }

        return n >= 0 ? res : 1 / res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @param {number} n
     * @return {number}
     */
    myPow(x, n) {
        if (x === 0) return 0;
        if (n === 0) return 1;

        let res = 1;
        let power = Math.abs(n);

        while (power > 0) {
            if (power & 1) {
                res *= x;
            }
            x *= x;
            power >>= 1;
        }

        return n >= 0 ? res : 1 / res;
    }
}
```

```csharp
public class Solution {
    public double MyPow(double x, int n) {
        if (x == 0) return 0;
        if (n == 0) return 1;

        double res = 1;
        long power = Math.Abs((long)n);

        while (power > 0) {
            if ((power & 1) == 1) {
                res *= x;
            }
            x *= x;
            power >>= 1;
        }

        return n >= 0 ? res : 1 / res;
    }
}
```

```go
func myPow(x float64, n int) float64 {
    if x == 0 {
        return 0
    }
    if n == 0 {
        return 1
    }

    res := 1.0
    power := int(math.Abs(float64(n)))

    for power > 0 {
        if power&1 != 0 {
            res *= x
        }
        x *= x
        power >>= 1
    }

    if n >= 0 {
        return res
    }
    return 1 / res
}
```

```kotlin
class Solution {
    fun myPow(x: Double, n: Int): Double {
        var x = x
        if (x == 0.0) {
            return 0.0
        }
        if (n == 0) {
            return 1.0
        }

        var res = 1.0
        var power = Math.abs(n.toLong())

        while (power > 0) {
            if (power and 1 != 0L) {
                res *= x
            }
            x *= x
            power = power shr 1
        }

        return if (n >= 0) res else 1.0 / res
    }
}
```

```swift
class Solution {
    func myPow(_ x: Double, _ n: Int) -> Double {
        if x == 0 {
            return 0
        }
        if n == 0 {
            return 1
        }

        var res: Double = 1
        var base = x
        var power = abs(n)

        while power > 0 {
            if power & 1 == 1 {
                res *= base
            }
            base *= base
            power >>= 1
        }

        return n >= 0 ? res : 1 / res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

## Common Pitfalls

### Integer Overflow When Negating n

When `n` is `Integer.MIN_VALUE` (-2147483648), computing `abs(n)` or `-n` overflows because the positive equivalent exceeds `Integer.MAX_VALUE`. Always cast to a `long` before taking the absolute value to avoid this undefined behavior.

### Forgetting to Handle Negative Exponents

A negative exponent means the result is `1 / x^|n|`. Omitting this reciprocal step returns the wrong answer for all negative `n` values. Compute the power using the absolute value, then invert if `n` was negative.

### Using Brute Force for Large Exponents

Multiplying `x` by itself `n` times works but times out for large `n` (e.g., `n = 2^31 - 1`). Binary exponentiation reduces the number of operations from O(n) to O(log n) by squaring the base and halving the exponent at each step.
