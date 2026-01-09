## 1. Brute Force

### Intuition

We need to build an array of `n` elements where the AND of all elements equals `x`, and the array is strictly increasing. The smallest such array starts with `x` as the first element. Each subsequent element must be greater than the previous one and still have `x` as a subset of its bits (so the AND remains `x`).

To find the next valid number after `res`, we add 1 and then OR with `x`. Adding 1 ensures the number increases, and ORing with `x` ensures all bits of `x` are set (preserving the AND property).

### Algorithm

1. Initialize `res = x`.
2. Repeat `n - 1` times:
   - Set `res = (res + 1) | x`.
3. Return `res`.

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

```go
func minEnd(n int, x int) int64 {
    res := int64(x)
    for i := 0; i < n-1; i++ {
        res = (res + 1) | int64(x)
    }
    return res
}
```

```kotlin
class Solution {
    fun minEnd(n: Int, x: Int): Long {
        var res = x.toLong()
        for (i in 0 until n - 1) {
            res = (res + 1) or x.toLong()
        }
        return res
    }
}
```

```swift
class Solution {
    func minEnd(_ n: Int, _ x: Int) -> Int {
        var res = x
        for _ in 0..<(n - 1) {
            res = (res + 1) | x
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Binary Representation And Bit Manipulation

### Intuition

The brute force iterates `n - 1` times, which is too slow for large `n`. Instead, we can directly compute the answer using bit manipulation. The key insight is that the answer must have all bits of `x` set, and we need to "count" to `n - 1` using only the bit positions where `x` has 0s.

Think of it as embedding the binary representation of `n - 1` into the zero-bit positions of `x`. The bits of `x` stay fixed at 1, while the zero positions of `x` are filled with the bits of `n - 1` in order.

### Algorithm

1. Convert `x` and `n - 1` to binary arrays.
2. Iterate through bit positions of `x`:
   - Skip positions where `x` has a `1`.
   - For positions where `x` has a `0`, fill in the next bit from `n - 1`.
3. Convert the resulting binary array back to an integer.
4. Return the result.

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

```go
func minEnd(n int, x int) int64 {
    var res int64 = 0
    n -= 1

    xBin := make([]int, 64)
    nBin := make([]int, 64)

    for i := 0; i < 32; i++ {
        xBin[i] = (x >> i) & 1
        nBin[i] = (n >> i) & 1
    }

    iX, iN := 0, 0
    for iX < 63 {
        for iX < 63 && xBin[iX] != 0 {
            iX++
        }
        xBin[iX] = nBin[iN]
        iX++
        iN++
    }

    for i := 0; i < 64; i++ {
        if xBin[i] == 1 {
            res += int64(1) << i
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minEnd(n: Int, x: Int): Long {
        var res: Long = 0
        var nVal = n - 1

        val xBin = IntArray(64)
        val nBin = IntArray(64)

        for (i in 0 until 32) {
            xBin[i] = (x shr i) and 1
            nBin[i] = (nVal shr i) and 1
        }

        var iX = 0
        var iN = 0
        while (iX < 63) {
            while (iX < 63 && xBin[iX] != 0) {
                iX++
            }
            xBin[iX] = nBin[iN]
            iX++
            iN++
        }

        for (i in 0 until 64) {
            if (xBin[i] == 1) {
                res += 1L shl i
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minEnd(_ n: Int, _ x: Int) -> Int {
        var res: Int64 = 0
        var nVal = n - 1

        var xBin = [Int](repeating: 0, count: 64)
        var nBin = [Int](repeating: 0, count: 64)

        for i in 0..<32 {
            xBin[i] = (x >> i) & 1
            nBin[i] = (nVal >> i) & 1
        }

        var iX = 0
        var iN = 0
        while iX < 63 {
            while iX < 63 && xBin[iX] != 0 {
                iX += 1
            }
            xBin[iX] = nBin[iN]
            iX += 1
            iN += 1
        }

        for i in 0..<64 {
            if xBin[i] == 1 {
                res += Int64(1) << i
            }
        }

        return Int(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$

---

## 3. Bit Manipulation

### Intuition

We can optimize further by avoiding explicit binary arrays. Using bit masks, we iterate through bit positions. For each zero-bit position in `x`, we check if the corresponding bit in `n - 1` is set, and if so, set that bit in our result.

We use two pointers: one for positions in the result (`i_x`) and one for bits of `n - 1` (`i_n`). Whenever we find a zero-bit in `x`, we potentially copy a bit from `n - 1` to the result.

### Algorithm

1. Initialize `res = x`.
2. Use two bit masks: `i_x` iterates through bit positions of the result, `i_n` iterates through bits of `n - 1`.
3. While `i_n <= n - 1`:
   - If bit position `i_x` in `x` is `0`:
     - If the current bit of `n - 1` (checked via `i_n & (n-1)`) is set, set this bit in `res`.
     - Shift `i_n` left (move to next bit of `n - 1`).
   - Shift `i_x` left (move to next bit position).
4. Return `res`.

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

```go
func minEnd(n int, x int) int64 {
    res := int64(x)
    var iX int64 = 1
    var iN int64 = 1
    nMinus1 := int64(n - 1)

    for iN <= nMinus1 {
        if iX&int64(x) == 0 {
            if iN&nMinus1 != 0 {
                res |= iX
            }
            iN <<= 1
        }
        iX <<= 1
    }

    return res
}
```

```kotlin
class Solution {
    fun minEnd(n: Int, x: Int): Long {
        var res = x.toLong()
        var iX: Long = 1
        var iN: Long = 1
        val nMinus1 = (n - 1).toLong()

        while (iN <= nMinus1) {
            if ((iX and x.toLong()) == 0L) {
                if ((iN and nMinus1) != 0L) {
                    res = res or iX
                }
                iN = iN shl 1
            }
            iX = iX shl 1
        }

        return res
    }
}
```

```swift
class Solution {
    func minEnd(_ n: Int, _ x: Int) -> Int {
        var res = Int64(x)
        var iX: Int64 = 1
        var iN: Int64 = 1
        let nMinus1 = Int64(n - 1)

        while iN <= nMinus1 {
            if iX & Int64(x) == 0 {
                if iN & nMinus1 != 0 {
                    res |= iX
                }
                iN <<= 1
            }
            iX <<= 1
        }

        return Int(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$
