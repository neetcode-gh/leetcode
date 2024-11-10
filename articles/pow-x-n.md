## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## 2. Binary Exponentiation (Recursive)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(\log n)$

---

## 3. Binary Exponentiation (Iterative)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(\log n)$
* Space complexity: $O(1)$