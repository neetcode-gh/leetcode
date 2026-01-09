## 1. Math (Recursion)

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
