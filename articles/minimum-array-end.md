## 1. Brute Force

::tabs-start

```python
class Solution:
    def minEnd(self, n: int, x: int) -> int:
        res = x
        for i in range(n - 1):
            res = (res + 1) | x
        return res
```

```java
public class Solution {
    public long minEnd(int n, int x) {
        long res = x;
        for (int i = 0; i < n - 1; i++) {
            res = (res + 1) | x;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minEnd(int n, int x) {
        long long res = x;
        for (int i = 0; i < n - 1; i++) {
            res = (res + 1) | x;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} x
     * @return {number}
     */
    minEnd(n, x) {
        let res = BigInt(x);
        for (let i = 0; i < n - 1; i++) {
            res = (res + BigInt(1)) | BigInt(x);
        }
        return Number(res);
    }
}
```

```csharp
public class Solution {
    public long MinEnd(int n, int x) {
        long res = x;
        for (int i = 0; i < n - 1; i++) {
            res = (res + 1) | x;
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

## 2. Binary Representation And Bit Manipulation

::tabs-start

```python
class Solution:
    def minEnd(self, n: int, x: int) -> int:
        res = 0
        n -= 1

        x_bin = [0] * 64  # Binary representation of x
        n_bin = [0] * 64  # Binary representation of n-1

        for i in range(32):
            x_bin[i] = (x >> i) & 1
            n_bin[i] = (n >> i) & 1

        i_x = 0
        i_n = 0
        while i_x < 63:
            while i_x < 63 and x_bin[i_x] != 0:
                i_x += 1
            x_bin[i_x] = n_bin[i_n]
            i_x += 1
            i_n += 1

        for i in range(64):
            if x_bin[i] == 1:
                res += (1 << i)

        return res
```

```java
public class Solution {
    public long minEnd(int n, int x) {
        long res = 0;
        n -= 1;

        int[] x_bin = new int[64]; // Binary representation of x
        int[] n_bin = new int[64]; // Binary representation of n-1

        for (int i = 0; i < 32; i++) {
            x_bin[i] = (x >> i) & 1;
            n_bin[i] = (n >> i) & 1;
        }

        int i_x = 0;
        int i_n = 0;
        while (i_x < 63) {
            while (i_x < 63 && x_bin[i_x] != 0) {
                i_x++;
            }
            x_bin[i_x] = n_bin[i_n];
            i_x++;
            i_n++;
        }

        for (int i = 0; i < 64; i++) {
            if (x_bin[i] == 1) {
                res += (1L << i);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minEnd(int n, int x) {
        long long res = 0;
        n -= 1;

        vector<int> x_bin(64, 0); // Binary representation of x
        vector<int> n_bin(64, 0); // Binary representation of n-1

        for (int i = 0; i < 32; i++) {
            x_bin[i] = (x >> i) & 1;
            n_bin[i] = (n >> i) & 1;
        }

        int i_x = 0;
        int i_n = 0;
        while (i_x < 63) {
            while (i_x < 63 && x_bin[i_x] != 0) {
                i_x++;
            }
            x_bin[i_x] = n_bin[i_n];
            i_x++;
            i_n++;
        }

        for (int i = 0; i < 64; i++) {
            if (x_bin[i] == 1) {
                res += (1LL << i);
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
     * @param {number} x
     * @return {number}
     */
    minEnd(n, x) {
        let res = 0n;
        n -= 1;

        const x_bin = new Array(64).fill(0); // Binary representation of x
        const n_bin = new Array(64).fill(0); // Binary representation of n-1

        for (let i = 0; i < 32; i++) {
            x_bin[i] = (x >> i) & 1;
            n_bin[i] = (n >> i) & 1;
        }

        let i_x = 0;
        let i_n = 0;
        while (i_x < 63) {
            while (i_x < 63 && x_bin[i_x] !== 0) {
                i_x++;
            }
            x_bin[i_x] = n_bin[i_n];
            i_x++;
            i_n++;
        }

        for (let i = 0; i < 64; i++) {
            if (x_bin[i] === 1) {
                res += BigInt(1) << BigInt(i);
            }
        }

        return Number(res);
    }
}
```

```csharp
public class Solution {
    public long MinEnd(int n, int x) {
        long res = 0;
        n -= 1;

        int[] x_bin = new int[64];
        int[] n_bin = new int[64];

        for (int i = 0; i < 32; i++) {
            x_bin[i] = (x >> i) & 1;
            n_bin[i] = (n >> i) & 1;
        }

        int i_x = 0;
        int i_n = 0;

        while (i_x < 63) {
            while (i_x < 63 && x_bin[i_x] != 0) {
                i_x++;
            }
            x_bin[i_x] = n_bin[i_n];
            i_x++;
            i_n++;
        }

        for (int i = 0; i < 64; i++) {
            if (x_bin[i] == 1) {
                res += 1L << i;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## 3. Bit Manipulation

::tabs-start

```python
class Solution:
    def minEnd(self, n: int, x: int) -> int:
        res = x
        i_x = 1
        i_n = 1  # for n-1

        while i_n <= n - 1:
            if i_x & x == 0:
                if i_n & (n - 1):
                    res = res | i_x
                i_n = i_n << 1
            i_x = i_x << 1

        return res
```

```java
public class Solution {
    public long minEnd(int n, int x) {
        long res = x;
        long i_x = 1;
        long i_n = 1; // for n - 1

        while (i_n <= n - 1) {
            if ((i_x & x) == 0) {
                if ((i_n & (n - 1)) != 0) {
                    res = res | i_x;
                }
                i_n = i_n << 1;
            }
            i_x = i_x << 1;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long minEnd(int n, int x) {
        long long res = x;
        long long i_x = 1;
        long long i_n = 1; // for n - 1

        while (i_n <= n - 1) {
            if ((i_x & x) == 0) {
                if (i_n & (n - 1)) {
                    res = res | i_x;
                }
                i_n = i_n << 1;
            }
            i_x = i_x << 1;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} x
     * @return {number}
     */
    minEnd(n, x) {
        let res = BigInt(x);
        let i_x = 1n;
        let i_n = 1n;
        n = BigInt(n - 1);

        while (i_n <= n) {
            if ((i_x & res) === 0n) {
                if ((i_n & n) !== 0n) {
                    res = res | i_x;
                }
                i_n = i_n << 1n;
            }
            i_x = i_x << 1n;
        }

        return Number(res);
    }
}
```

```csharp
public class Solution {
    public long MinEnd(int n, int x) {
        long res = x;
        long i_x = 1;
        long i_n = 1;
        long n_minus_1 = n - 1;

        while (i_n <= n_minus_1) {
            if ((i_x & x) == 0) {
                if ((i_n & n_minus_1) != 0) {
                    res |= i_x;
                }
                i_n <<= 1;
            }
            i_x <<= 1;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
