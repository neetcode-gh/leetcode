## 1. Brute Force

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(limit + 1):
            for b in range(limit + 1):
                for c in range(limit + 1):
                    if a + b + c == n:
                        res += 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        for (int a = 0; a <= limit; a++) {
            for (int b = 0; b <= limit; b++) {
                for (int c = 0; c <= limit; c++) {
                    if (a + b + c == n) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        for (int a = 0; a <= limit; a++) {
            for (int b = 0; b <= limit; b++) {
                for (int c = 0; c <= limit; c++) {
                    if (a + b + c == n) {
                        res++;
                    }
                }
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        for (let a = 0; a <= limit; a++) {
            for (let b = 0; b <= limit; b++) {
                for (let c = 0; c <= limit; c++) {
                    if (a + b + c === n) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        for (int a = 0; a <= limit; a++) {
            for (int b = 0; b <= limit; b++) {
                for (int c = 0; c <= limit; c++) {
                    if (a + b + c == n) {
                        res++;
                    }
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(l ^ 3)$
- Space complexity: $O(1)$

> Where $l$ is the given limit.

---

## 2. Better Approach

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(min(n, limit) + 1):
            for b in range(min(n - a, limit) + 1):
                if n - a - b <= limit:
                    res += 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int maxB = Math.min(n - a, limit);
            for (int b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        int maxA = min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int maxB = min(n - a, limit);
            for (int b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
                }
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        const maxA = Math.min(n, limit);
        for (let a = 0; a <= maxA; a++) {
            const maxB = Math.min(n - a, limit);
            for (let b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.Min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int maxB = Math.Min(n - a, limit);
            for (int b = 0; b <= maxB; b++) {
                if (n - a - b <= limit) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(n, limit) ^ 2)$
- Space complexity: $O(1)$

---

## 3. Enumeration - I

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(min(n, limit) + 1):
            b_max = min(n - a, limit)
            b_min = max(0, n - a - limit)
            if b_max >= b_min:
                res += b_max - b_min + 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        for (int a = 0, aMax = Math.min(n, limit); a <= aMax; a++) {
            int bMax = Math.min(n - a, limit);
            int bMin = Math.max(0, n - a - limit);
            if (bMax >= bMin) {
                res += (long)(bMax - bMin + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        int aMax = min(n, limit);
        for (int a = 0; a <= aMax; ++a) {
            int bMax = min(n - a, limit);
            int bMin = max(0, n - a - limit);
            if (bMax >= bMin) {
                res += (long long)(bMax - bMin + 1);
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        const aMax = Math.min(n, limit);
        for (let a = 0; a <= aMax; a++) {
            const bMax = Math.min(n - a, limit);
            const bMin = Math.max(0, n - a - limit);
            if (bMax >= bMin) {
                res += bMax - bMin + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        int aMax = Math.Min(n, limit);
        for (int a = 0; a <= aMax; a++) {
            int bMax = Math.Min(n - a, limit);
            int bMin = Math.Max(0, n - a - limit);
            if (bMax >= bMin) {
                res += (long)(bMax - bMin + 1);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(n, limit))$
- Space complexity: $O(1)$

---

## 4. Enumeration - II

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        res = 0
        for a in range(min(n, limit) + 1):
            if n - a <= 2 * limit:
                res += min(n - a, limit) - max(0, n - a - limit) + 1
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int rem = n - a;
            if (rem <= 2L * limit) {
                int hi = Math.min(rem, limit);
                int lo = Math.max(0, rem - limit);
                res += (hi - lo + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        long long res = 0;
        int maxA = min(n, limit);
        for (int a = 0; a <= maxA; ++a) {
            int rem = n - a;
            if (rem <= 2 * limit) {
                int hi = min(rem, limit);
                int lo = max(0, rem - limit);
                res += (long long)(hi - lo + 1);
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
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        let res = 0;
        const maxA = Math.min(n, limit);
        for (let a = 0; a <= maxA; a++) {
            const rem = n - a;
            if (rem <= 2 * limit) {
                const hi = Math.min(rem, limit);
                const lo = Math.max(0, rem - limit);
                res += hi - lo + 1;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        long res = 0;
        int maxA = Math.Min(n, limit);
        for (int a = 0; a <= maxA; a++) {
            int rem = n - a;
            if (rem <= 2 * limit) {
                int hi = Math.Min(rem, limit);
                int lo = Math.Max(0, rem - limit);
                res += (hi - lo + 1);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(n, limit))$
- Space complexity: $O(1)$

---

## 5. Inclusion-Exclusion Principle

::tabs-start

```python
class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        C3 = [1, 3, 3, 1]
        res = 0
        for j in range(4):
            m = n - j * (limit + 1)
            if m < 0:
                continue
            ways = (m + 2) * (m + 1) // 2
            sign = -1 if j % 2 else 1
            res += sign * C3[j] * ways
        return res
```

```java
public class Solution {
    public long distributeCandies(int n, int limit) {
        int[] C3 = {1, 3, 3, 1};
        long res = 0;
        for (int j = 0; j < 4; j++) {
            long m = n - j * (limit + 1);
            if (m < 0) continue;
            long ways = (m + 2) * (m + 1) / 2;
            int sign = (j % 2 == 0) ? 1 : -1;
            res += sign * C3[j] * ways;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long distributeCandies(int n, int limit) {
        int C3[4] = {1, 3, 3, 1};
        long long res = 0;
        for (int j = 0; j < 4; j++) {
            long long m = n - j * (limit + 1);
            if (m < 0) continue;
            long long ways = (m + 2) * (m + 1) / 2;
            int sign = (j % 2 == 0 ? 1 : -1);
            res += sign * C3[j] * ways;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} limit
     * @return {number}
     */
    distributeCandies(n, limit) {
        const C3 = [1, 3, 3, 1];
        let res = 0;
        for (let j = 0; j < 4; j++) {
            const m = n - j * (limit + 1);
            if (m < 0) continue;
            const ways = ((m + 2) * (m + 1)) / 2;
            const sign = j % 2 === 0 ? 1 : -1;
            res += sign * C3[j] * ways;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public long DistributeCandies(int n, int limit) {
        int[] C3 = {1, 3, 3, 1};
        long res = 0;
        for (int j = 0; j < 4; j++) {
            long m = n - j * (limit + 1);
            if (m < 0) continue;
            long ways = (m + 2) * (m + 1) / 2;
            int sign = (j % 2 == 0 ? 1 : -1);
            res += sign * C3[j] * ways;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
