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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
