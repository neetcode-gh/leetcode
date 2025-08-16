## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 2. In-Built Function

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Binary Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Math

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 5. Newton's Method

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 6. Bit Manipulation

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ since we iterate at most $15$ times.
- Space complexity: $O(1)$
