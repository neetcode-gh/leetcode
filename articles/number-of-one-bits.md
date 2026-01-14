## 1. Bit Mask - I

### Intuition

We are asked to count how many **`1` bits** are present in the binary representation of an integer `n`.  
This value is also known as the **Hamming Weight** or **population count**.

A straightforward way to do this is to:
- check each bit position one by one
- see whether that bit is set (`1`) or not (`0`)

Since integers are typically represented using **32 bits**, we can safely check all 32 bit positions.

At each position:
- create a mask with a single `1` at that position using `1 << i`
- use bitwise AND (`&`) to test whether that bit is set in `n`

### Algorithm

1. Initialize a counter `res = 0`.
2. For each bit position `i` from `0` to `31`:
3. Create a mask with only the `i`-th bit set:
   - `mask = 1 << i`
4. Check if this bit is set in `n`:
   - If `(mask & n) != 0`, increment `res`
5. After checking all 32 bits, return `res`.

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

```go
func hammingWeight(n int) int {
	res := 0
	for i := 0; i < 32; i++ {
		if (1<<i)&n != 0 {
			res++
		}
	}
	return res
}
```

```kotlin
class Solution {
    fun hammingWeight(n: Int): Int {
        var res = 0
        for (i in 0 until 32) {
            if ((1 shl i) and n != 0) {
                res++
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func hammingWeight(_ n: Int) -> Int {
        var res = 0
        for i in 0..<32 {
            if (1 << i) & n != 0 {
                res += 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 2. Bit Mask - II

### Intuition

We want to count the number of `1` bits in the binary representation of an integer `n`.

Instead of checking every bit position explicitly, we can:
- look at the **least significant bit** of `n`
- then **shift the number right** to bring the next bit into that position

At each step:
- `n & 1` tells us whether the current least significant bit is `1`
- shifting `n` right by one (`n >>= 1`) moves us to the next bit

We repeat this until `n` becomes `0`.

### Algorithm

1. Initialize a counter `res = 0`.
2. While `n > 0`:
   - If the least significant bit is `1` (`n & 1`):
     - increment `res`
   - Shift `n` one bit to the right (`n >>= 1`)
3. When `n` becomes `0`, all bits have been processed.
4. Return `res`.

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

```go
func hammingWeight(n int) int {
	res := 0
	for n != 0 {
		if n&1 != 0 {
			res++
		}
		n >>= 1
	}
	return res
}
```

```kotlin
class Solution {
    fun hammingWeight(n: Int): Int {
        var res = 0
        var num = n
        while (num != 0) {
            if ((num and 1) != 0) {
                res++
            }
            num = num shr 1
        }
        return res
    }
}
```

```swift
class Solution {
    func hammingWeight(_ n: Int) -> Int {
        var n = n
        var res = 0
        while n != 0 {
            res += (n & 1) != 0 ? 1 : 0
            n >>= 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Bit Mask (Optimal)

### Intuition

We want to count the number of `1` bits in the binary representation of an integer `n` (Hamming Weight).

A very efficient trick comes from this key observation:

- Subtracting `1` from a number **flips the rightmost `1` bit to `0`** and turns all bits to its right into `1`
- Performing `n & (n - 1)` **removes the rightmost `1` bit** from `n`

So every time we do:
`n = n & (n - 1)` we eliminate exactly **one `1` bit**.

This means:
- the number of iterations equals the number of `1` bits
- we don’t waste time checking bits that are `0`

That’s why this approach is considered optimal.

### Algorithm

1. Initialize a counter `res = 0`.
2. While `n` is not zero:
   - Update `n = n & (n - 1)` to remove the rightmost `1` bit
   - Increment `res` by `1`
3. When `n` becomes `0`, all `1` bits have been removed.
4. Return `res`.

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

```go
func hammingWeight(n int) int {
	res := 0
	for n != 0 {
		n &= n - 1
        res++
	}
	return res
}
```

```kotlin
class Solution {
    fun hammingWeight(n: Int): Int {
        var res = 0
        var num = n
        while (num != 0) {
            num = num and (num - 1)
            res++
        }
        return res
    }
}
```

```swift
class Solution {
    func hammingWeight(_ n: Int) -> Int {
        var n = n
        var res = 0
        while n != 0 {
            n &= (n - 1)
            res += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 4. Built-In Function

### Intuition

We want to find the **Hamming Weight** of a number, which means counting how many `1` bits are present in its binary representation.

Most programming languages provide:
- a way to convert a number into **binary form**, or
- a built-in utility to **count set bits**

Instead of manually checking each bit using bit manipulation, we can rely on these built-in features. This makes the solution **short, easy to understand, and less error-prone**, especially for beginners.

This approach focuses on **clarity and simplicity**, not on low-level optimizations.

### Algorithm

1. Convert the given number `n` into its binary representation
   (using a built-in binary conversion or bit-count utility provided by the language).
2. Count the number of `1` bits in that representation.
3. Return the count.

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

```go
func hammingWeight(n int) int {
	return bits.OnesCount(uint(n))
}
```

```kotlin
class Solution {
    fun hammingWeight(n: Int): Int {
        return n.countOneBits()
    }
}
```

```swift
class Solution {
    func hammingWeight(_ n: Int) -> Int {
        return n.nonzeroBitCount
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

## Common Pitfalls

### Signed vs Unsigned Integer Handling

In some languages, right-shifting a signed negative integer fills with 1s (arithmetic shift) instead of 0s (logical shift). This can cause infinite loops when using `while (n != 0)` with negative inputs. Use unsigned types or the `>>>` operator in languages that support it.

### Using Division Instead of Bit Shift

While `n / 2` and `n >> 1` produce the same result for positive integers, division can behave differently for negative numbers and is generally slower. Stick to bitwise operations for clarity and consistency with the problem's intent.
