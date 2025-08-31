## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 2. Recursion

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 3. Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 5. Bit Manipulation - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 6. Math

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
