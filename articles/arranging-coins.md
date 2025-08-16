## 1. Brute Force

::tabs-start

```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        row = 0
        while n - row > 0:
            row += 1
            n -= row
        return row
```

```java
public class Solution {
    public int arrangeCoins(int n) {
        int row = 0;
        while (n - row > 0) {
            row++;
            n -= row;
        }
        return row;
    }
}
```

```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        int row = 0;
        while (n - row > 0) {
            row++;
            n -= row;
        }
        return row;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    arrangeCoins(n) {
        let row = 0;
        while (n - row > 0) {
            row++;
            n -= row;
        }
        return row;
    }
}
```

```csharp
public class Solution {
    public int ArrangeCoins(int n) {
        int row = 0;
        while (n - row > 0) {
            row++;
            n -= row;
        }
        return row;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 2. Binary Search

::tabs-start

```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        l, r = 1, n
        res = 0

        while l <= r:
            mid = (l + r) // 2
            coins = (mid * (mid + 1)) // 2
            if coins > n:
                r = mid - 1
            else:
                l = mid + 1
                res = max(res, mid)

        return res
```

```java
public class Solution {
    public int arrangeCoins(int n) {
        int l = 1, r = n, res = 0;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            long coins = (long) mid * (mid + 1) / 2;
            if (coins > n) {
                r = mid - 1;
            } else {
                l = mid + 1;
                res = Math.max(res, mid);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        long long l = 1, r = n, res = 0;

        while (l <= r) {
            long long mid = l + (r - l) / 2;
            long long coins = (mid * (mid + 1)) / 2;
            if (coins > n) {
                r = mid - 1;
            } else {
                l = mid + 1;
                res = max(res, mid);
            }
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
    arrangeCoins(n) {
        let l = 1,
            r = n,
            res = 0;

        while (l <= r) {
            let mid = Math.floor((l + r) / 2);
            let coins = (mid * (mid + 1)) / 2;
            if (coins > n) {
                r = mid - 1;
            } else {
                l = mid + 1;
                res = Math.max(res, mid);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int ArrangeCoins(int n) {
        int l = 1, r = n;
        int res = 0;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            long coins = (long)mid * (mid + 1) / 2;

            if (coins > n) {
                r = mid - 1;
            } else {
                res = Math.Max(res, mid);
                l = mid + 1;
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

## 3. Binary Search (Optimal)

::tabs-start

```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        if n <= 3:
            return n if n == 1 else n - 1

        l, r = 1, (n // 2) + 1
        while l < r:
            mid = (l + r) // 2
            if (mid * (mid + 1)) // 2 <= n:
                l = mid + 1
            else:
                r = mid

        return l - 1
```

```java
public class Solution {
    public int arrangeCoins(int n) {
        if (n <= 3) {
            return n == 1 ? 1 : n - 1;
        }

        int l = 1, r = (n / 2) + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            long coins = (long) mid * (mid + 1) / 2;
            if (coins <= n) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l - 1;
    }
}
```

```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        if (n <= 3) {
            return n == 1 ? 1 : n - 1;
        }

        int l = 1, r = (n / 2) + 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            long long coins = (mid * (mid + 1LL)) / 2;
            if (coins <= n) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    arrangeCoins(n) {
        if (n <= 3) {
            return n == 1 ? 1 : n - 1;
        }

        let l = 1,
            r = n / 2 + 1;
        while (l < r) {
            let mid = Math.floor((l + r) / 2);
            let coins = (mid * (mid + 1)) / 2;
            if (coins <= n) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l - 1;
    }
}
```

```csharp
public class Solution {
    public int ArrangeCoins(int n) {
        if (n <= 3) {
            return n == 1 ? 1 : n - 1;
        }

        int l = 1, r = (n / 2) + 1;
        while (l < r) {
            int mid = (l + r) / 2;
            long coins = (long)mid * (mid + 1) / 2;

            if (coins <= n) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }

        return l - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation

::tabs-start

```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        mask = 1 << 15
        rows = 0
        while mask > 0:
            rows |= mask
            coins = rows * (rows + 1) // 2
            if coins > n:
                rows ^= mask
            mask >>= 1
        return rows
```

```java
public class Solution {
    public int arrangeCoins(int n) {
        int mask = 1 << 15;
        int rows = 0;
        while (mask > 0) {
            rows |= mask;
            long coins = (long) rows * (rows + 1) / 2;
            if (coins > n) {
                rows ^= mask;
            }
            mask >>= 1;
        }
        return rows;
    }
}
```

```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        int mask = 1 << 15;
        int rows = 0;
        while (mask > 0) {
            rows |= mask;
            long long coins = (long long) rows * (rows + 1) / 2;
            if (coins > n) {
                rows ^= mask;
            }
            mask >>= 1;
        }
        return rows;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    arrangeCoins(n) {
        let mask = 1 << 15;
        let rows = 0;
        while (mask > 0) {
            rows |= mask;
            let coins = (rows * (rows + 1)) / 2;
            if (coins > n) {
                rows ^= mask;
            }
            mask >>= 1;
        }
        return rows;
    }
}
```

```csharp
public class Solution {
    public int ArrangeCoins(int n) {
        int mask = 1 << 15;
        int rows = 0;

        while (mask > 0) {
            rows |= mask;
            long coins = (long)rows * (rows + 1) / 2;
            if (coins > n) {
                rows ^= mask;
            }
            mask >>= 1;
        }

        return rows;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ since we iterate $15$ times.
- Space complexity: $O(1)$

---

## 5. Math

::tabs-start

```python
class Solution:
    def arrangeCoins(self, n: int) -> int:
        return int(sqrt(2 * n + 0.25) - 0.5)
```

```java
public class Solution {
    public int arrangeCoins(int n) {
        return (int) (Math.sqrt(2L * n + 0.25) - 0.5);
    }
}
```

```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        return (int)(sqrt(2.0 * n + 0.25) - 0.5);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    arrangeCoins(n) {
        return Math.floor(Math.sqrt(2 * n + 0.25) - 0.5);
    }
}
```

```csharp
public class Solution {
    public int ArrangeCoins(int n) {
        return (int)(Math.Sqrt(2L * n + 0.25) - 0.5);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ or $O(\sqrt {n})$ depending on the language.
- Space complexity: $O(1)$
