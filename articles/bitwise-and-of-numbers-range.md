## 1. Brute Force

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        res = left
        for i in range(left + 1, right + 1):
            res &= i
        return res
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int res = left;
        for (int i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int res = left;
        for (int i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        let res = left;
        for (let i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        int res = left;
        for (int i = left + 1; i <= right; i++) {
            res &= i;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Bit Manipulation - I

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        res = 0
        for i in range(32):
            bit = (left >> i) & 1
            if not bit:
                continue

            remain = left % (1 << (i + 1))
            diff = (1 << (i + 1)) - remain
            if right - left < diff:
                res |= (1 << i)

        return res
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (left >> i) & 1;
            if (bit == 0) {
                continue;
            }

            int remain = left % (1 << (i + 1));
            int diff = (1 << (i + 1)) - remain;
            if (right - left < diff) {
                res |= (1 << i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (left >> i) & 1;
            if (!bit) {
                continue;
            }

            int remain = left % (1 << (i + 1));
            uint diff = (1ul << (i + 1)) - remain;
            if (right - left < diff) {
                res |= (1 << i);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        let res = 0;
        for (let i = 0; i < 32; i++) {
            const bit = (left >> i) & 1;
            if (!bit) {
                continue;
            }
            const next = Math.pow(2, i + 1);
            const remain = left % next;
            const diff = next - remain;
            if (right - left < diff) {
                res |= 1 << i;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (left >> i) & 1;
            if (bit == 0) continue;

            int remain = left % (1 << (i + 1));
            int diff = (1 << (i + 1)) - remain;
            if (right - left < diff) {
                res |= (1 << i);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ since we iterate $32$ times.
- Space complexity: $O(1)$

---

## 3. Bit Manipulation - II

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        i = 0
        while left != right:
            left >>= 1
            right >>= 1
            i += 1
        return left << i
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        int i = 0;
        while (left != right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int i = 0;
        while (left != right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        let i = 0;
        while (left !== right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        int i = 0;
        while (left != right) {
            left >>= 1;
            right >>= 1;
            i++;
        }
        return left << i;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation - III

::tabs-start

```python
class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        while left < right:
            right &= right - 1
        return right
```

```java
public class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        while (left < right) {
            right &= (right - 1);
        }
        return right;
    }
}
```

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        while (left < right) {
            right &= (right - 1);
        }
        return right;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} left
     * @param {number} right
     * @return {number}
     */
    rangeBitwiseAnd(left, right) {
        while (left < right) {
            right &= right - 1;
        }
        return right;
    }
}
```

```csharp
public class Solution {
    public int RangeBitwiseAnd(int left, int right) {
        while (left < right) {
            right &= (right - 1);
        }
        return right;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
