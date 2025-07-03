## 1. Brute Force

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0:
            return 0

        res = 1
        for i in range(1, x + 1):
            if i * i > x:
                return res
            res = i

        return res
```

```java
public class Solution {
    public int mySqrt(int x) {
        if (x == 0) {
            return 0;
        }

        int res = 1;
        for (int i = 1; i <= x; i++) {
            if ((long) i * i > x) {
                return res;
            }
            res = i;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x == 0) {
            return 0;
        }

        int res = 1;
        for (int i = 1; i <= x; i++) {
            if ((long long) i * i > x) {
                return res;
            }
            res = i;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        if (x === 0) {
            return 0;
        }

        let res = 1;
        for (let i = 1; i <= x; i++) {
            if (i * i > x) {
                return res;
            }
            res = i;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        if (x == 0) return 0;

        int res = 1;
        for (int i = 1; i <= x; i++) {
            if ((long)i * i > x) {
                return res;
            }
            res = i;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 2. In-Built Function

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        return int(sqrt(x))
```

```java
public class Solution {
    public int mySqrt(int x) {
        return (int) Math.sqrt(x);
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        return (int) sqrt(x);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        return Math.floor(Math.sqrt(x));
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        return (int)Math.Sqrt(x);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Binary Search

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        l, r = 0, x
        res = 0

        while l <= r:
            m = l + (r - l) // 2
            if m * m > x:
                r = m - 1
            elif m * m < x:
                l = m + 1
                res = m
            else:
                return m

        return res
```

```java
public class Solution {
    public int mySqrt(int x) {
        int l = 0, r = x;
        int res = 0;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((long) m * m > x) {
                r = m - 1;
            } else if ((long) m * m < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        int l = 0, r = x;
        int res = 0;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((long long) m * m > x) {
                r = m - 1;
            } else if ((long long) m * m < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        let l = 0,
            r = x;
        let res = 0;

        while (l <= r) {
            const m = Math.floor(l + (r - l) / 2);
            if (m * m > x) {
                r = m - 1;
            } else if (m * m < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        int l = 0, r = x;
        int res = 0;

        while (l <= r) {
            int m = l + (r - l) / 2;
            long sq = (long)m * m;

            if (sq > x) {
                r = m - 1;
            } else if (sq < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
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

## 4. Recursion

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        if x < 2:
            return x

        l = self.mySqrt(x >> 2) << 1
        r = l + 1
        return l if r ** 2 > x else r
```

```java
public class Solution {
    public int mySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int l = mySqrt(x >> 2) << 1;
        int r = l + 1;
        return (long) r * r > x ? l : r;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int l = mySqrt(x >> 2) << 1;
        int r = l + 1;
        return (long long) r * r > x ? l : r;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        if (x < 2) {
            return x;
        }

        const l = this.mySqrt(x >> 2) << 1;
        const r = l + 1;
        return r * r > x ? l : r;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int l = MySqrt(x >> 2) << 1;
        int r = l + 1;
        return (long)r * r > x ? l : r;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 5. Newton's Method

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        r = x
        while r * r > x:
            r = (r + x // r) >> 1
        return r
```

```java
public class Solution {
    public int mySqrt(int x) {
        long r = x;
        while (r * r > x) {
            r = (r + x / r) >> 1;
        }
        return (int) r;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        long long r = x;
        while (r * r > x) {
            r = (r + x / r) >> 1;
        }
        return r;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        let r = x;
        while (r * r > x) {
            r = (r + Math.floor(x / r)) >>> 1;
        }
        return r;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        long r = x;
        while (r * r > x) {
            r = (r + x / r) >> 1;
        }
        return (int)r;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
