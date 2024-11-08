## 1. Bit Mask - I

::tabs-start

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        for i in range(32):
            if (1 << i) & n:
                res += 1
        return res
```

```java
public class Solution {
    public int hammingWeight(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            if ((1 << i & n) != 0) {
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            if ((1 << i) & n) {
                res++;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number}
     */
    hammingWeight(n) {
        let res = 0;
        for (let i = 0; i < 32; i++) {
            if ((1 << i) & n) {
                res++;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int HammingWeight(uint n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            if ((1 << i & n) != 0) {
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$

---

## 2. Bit Mask - II

::tabs-start

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            res += 1 if n & 1 else 0
            n >>= 1
        return res
```

```java
public class Solution {
    public int hammingWeight(int n) {
        int res = 0;
        while (n != 0) {
            res += (n & 1) == 1 ? 1 : 0;
            n >>= 1;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int res = 0;
        while (n != 0) {
            res += (n & 1) ? 1 : 0;
            n >>= 1;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number}
     */
    hammingWeight(n) {
        let res = 0;
        while (n !== 0) {
            res += (n & 1) === 1 ? 1 : 0;
            n >>= 1;  
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int HammingWeight(uint n) {
        int res = 0;
        while (n != 0) {
            res += (n & 1) == 1 ? 1 : 0;
            n >>= 1;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$

---

## 3. Bit Mask (Optimal)

::tabs-start

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        res = 0
        while n:
            n &= n - 1
            res += 1
        return res
```

```java
public class Solution {
    public int hammingWeight(int n) {
        int res = 0;
        while (n != 0) {
            n &= n - 1;
            res++;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int res = 0;
        while (n) {
            n &= n - 1;
            res++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number}
     */
    hammingWeight(n) {
        let res = 0;
        while (n !== 0) {
            n &= n - 1;
            res++;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int HammingWeight(uint n) {
        int res = 0;
        while (n != 0) {
            n = n & (n - 1);
            res++;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$

---

## 4. Built-In Function

::tabs-start

```python
class Solution:
    def hammingWeight(self, n: int) -> int:
        return bin(n).count('1')
```

```java
public class Solution {
    public int hammingWeight(int n) {
        return Integer.bitCount(n);
    }
}
```

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        return __builtin_popcount(n);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number}
     */
    hammingWeight(n) {
        return n.toString(2).split('0').join('').length;
    }
}
```

```csharp
public class Solution {
    public int HammingWeight(uint n) {
        return System.Numerics.BitOperations.PopCount(n);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$