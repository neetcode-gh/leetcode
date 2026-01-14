## 1. Brute Force

### Intuition

We are given a **32-bit unsigned integer**, and we need to **reverse its bits**.

The most straightforward way to think about this problem is:
- Read the bits of the number from **right to left**
- Build a new number by placing those bits from **left to right**

In simpler terms:
- Extract each bit one by one
- Reverse their order
- Reconstruct the number from the reversed bits

This brute force approach closely follows how humans would solve the problem manually, making it **easy to understand**, though not the most optimal.

### Algorithm

1. Initialize an empty sequence `binary` to store bits.
2. For each position `i` from `0` to `31` (since the number is 32-bit):
   - Check if the bit at that position is `1` or `0`
   - Append the bit to the sequence
3. Reverse the sequence of bits.
4. Initialize a result number `res` as `0`.
5. For each bit in the reversed sequence:
   - If the bit is `1`, set the corresponding bit in `res` using bit shifting.
6. Return the result.

::tabs-start

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        binary = ""
        for i in range(32):
            if n & (1 << i):
                binary += "1"
            else:
                binary += "0"

        res = 0
        for i, bit in enumerate(binary[::-1]):
            if bit == "1":
                res |= (1 << i)

        return res
```

```java
public class Solution {
    public int reverseBits(int n) {
        StringBuilder binary = new StringBuilder();
        for (int i = 0; i < 32; i++) {
            if ((n & (1 << i)) != 0) {
                binary.append("1");
            } else {
                binary.append("0");
            }
        }

        int res = 0;
        String reversedBinary = binary.reverse().toString();
        for (int i = 0; i < 32; i++) {
            if (reversedBinary.charAt(i) == '1') {
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
    uint32_t reverseBits(uint32_t n) {
        string binary = "";
        for (int i = 0; i < 32; i++) {
            if (n & (1 << i)) {
                binary += '1';
            } else {
                binary += '0';
            }
        }

        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            if (binary[31 - i] == '1') {
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
     * @param {number} n - a positive integer
     * @return {number} - a positive integer
     */
    reverseBits(n) {
        let binary = '';
        for (let i = 0; i < 32; i++) {
            if (n & (1 << i)) {
                binary += '1';
            } else {
                binary += '0';
            }
        }

        let res = 0;
        for (let i = 0; i < 32; i++) {
            if (binary[31 - i] === '1') {
                res |= 1 << i;
            }
        }

        return res >>> 0;
    }
}
```

```csharp
public class Solution {
    public uint ReverseBits(uint n) {
        string binary = "";
        for (int i = 0; i < 32; i++) {
            if ((n & (1 << i)) != 0) {
                binary += "1";
            } else {
                binary += "0";
            }
        }

        uint res = 0;
        for (int i = 0; i < 32; i++) {
            if (binary[31 - i] == '1') {
                res |= (1u << i);
            }
        }

        return res;
    }
}
```

```go
func reverseBits(n uint32) uint32 {
	binary := ""
	for i := 0; i < 32; i++ {
		if n&(1<<i) != 0 {
			binary += "1"
		} else {
			binary += "0"
		}
	}

	var res uint32 = 0
	for i, bit := range binary {
		if bit == '1' {
			res |= (1 << (31 - i))
		}
	}
	return res
}
```

```kotlin
class Solution {
    fun reverseBits(n: Int): Int {
        var binary = ""
        for (i in 0 until 32) {
            binary += if ((n and (1 shl i)) != 0) "1" else "0"
        }

        var res = 0
        for ((i, bit) in binary.reversed().withIndex()) {
            if (bit == '1') {
                res = res or (1 shl i)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func reverseBits(_ n: Int) -> Int {
        var binary = ""
        for i in 0..<32 {
            if (n & (1 << i)) != 0 {
                binary += "1"
            } else {
                binary += "0"
            }
        }

        var res = 0
        for (i, bit) in binary.reversed().enumerated() {
            if bit == "1" {
                res |= (1 << i)
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

## 2. Bit Manipulation

### Intuition

We are given a **32-bit unsigned integer** and need to **reverse all its bits**.

Instead of storing bits in a string or array, we can do this directly using **bit manipulation**:

- Extract each bit from the original number starting from the least significant bit
- Place that bit into the correct reversed position in the result
- Repeat this for all 32 bits

This approach avoids extra memory and works directly at the **bit level**, making it both clean and efficient.

### Algorithm

1. Initialize a variable `res = 0` to store the reversed number.
2. For each bit position `i` from `0` to `31`:
   - Extract the `i`-th `bit` of `n`
   - Shift this `bit` to position `(31 - i)`
   - Add it to `res`
3. After processing all 32 bits, return `res`.

::tabs-start

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = 0
        for i in range(32):
            bit = (n >> i) & 1
            res += (bit << (31 - i))
        return res
```

```java
public class Solution {
    public int reverseBits(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            int bit = (n >> i) & 1;
            res += (bit << (31 - i));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            uint32_t bit = (n >> i) & 1;
            res += (bit << (31 - i));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number} - a positive integer
     */
    reverseBits(n) {
        let res = 0;
        for (let i = 0; i < 32; i++) {
            const bit = (n >>> i) & 1;
            res += bit << (31 - i);
        }
        return res >>> 0;
    }
}
```

```csharp
public class Solution {
    public uint ReverseBits(uint n) {
        uint res = 0;
        for (int i = 0; i < 32; i++) {
            uint bit = (n >> i) & 1;
            res += (bit << (31 - i));
        }
        return res;
    }
}
```

```go
func reverseBits(n uint32) uint32 {
	var res uint32 = 0
	for i := 0; i < 32; i++ {
		bit := (n >> i) & 1
		res |= (bit << (31 - i))
	}
	return res
}
```

```kotlin
class Solution {
    fun reverseBits(n: Int): Int {
        var res = 0
        for (i in 0 until 32) {
            val bit = (n shr i) and 1
            res = res or (bit shl (31 - i))
        }
        return res
    }
}
```

```swift
class Solution {
    func reverseBits(_ n: Int) -> Int {
        var res = 0
        var num = n
        for i in 0..<32 {
            let bit = (num >> i) & 1
            res |= (bit << (31 - i))
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

## 3. Bit Manipulation (Optimal)

### Intuition

We are given a **32-bit unsigned integer** and need to **reverse its bits**.

Instead of reversing bits one-by-one, we can do this **much faster** by using a classic bit-manipulation trick called **bitwise divide and conquer**.

The key idea is:
- Reverse bits in **large blocks first**
- Then gradually reverse **smaller and smaller blocks**
- Until all individual bits are reversed

This works because reversing bits is equivalent to:
- swapping the left half with the right half
- then swapping bytes
- then nibbles (4 bits)
- then pairs
- finally single bits

Each step rearranges bits closer to their final reversed positions.

### Algorithm

1. Start with the original number `n` stored in `res`.
2. Swap the **left 16 bits** with the **right 16 bits**.
3. Swap bits in blocks of:
   - 8 bits (bytes)
   - 4 bits
   - 2 bits
   - 1 bit
4. After each step, use **bit masks** to isolate groups of bits and shift them to their new positions.
5. Ensure the final result stays within **32 bits**.
6. Return the reversed number.

::tabs-start

```python
class Solution:
    def reverseBits(self, n: int) -> int:
        res = n
        res = (res >> 16) | (res << 16) & 0xFFFFFFFF
        res = ((res & 0xff00ff00) >> 8) | ((res & 0x00ff00ff) << 8)
        res = ((res & 0xf0f0f0f0) >> 4) | ((res & 0x0f0f0f0f) << 4)
        res = ((res & 0xcccccccc) >> 2) | ((res & 0x33333333) << 2)
        res = ((res & 0xaaaaaaaa) >> 1) | ((res & 0x55555555) << 1)
        return res & 0xFFFFFFFF
```

```java
public class Solution {
    public int reverseBits(int n) {
        int ret = n;
        ret = ret >>> 16 | ret << 16;
        ret = (ret & 0xff00ff00) >>> 8 | (ret & 0x00ff00ff) << 8;
        ret = (ret & 0xf0f0f0f0) >>> 4 | (ret & 0x0f0f0f0f) << 4;
        ret = (ret & 0xcccccccc) >>> 2 | (ret & 0x33333333) << 2;
        ret = (ret & 0xaaaaaaaa) >>> 1 | (ret & 0x55555555) << 1;
        return ret;
    }
}
```

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t ret = n;
        ret = (ret >> 16) | (ret << 16);
        ret = ((ret & 0xff00ff00) >> 8) | ((ret & 0x00ff00ff) << 8);
        ret = ((ret & 0xf0f0f0f0) >> 4) | ((ret & 0x0f0f0f0f) << 4);
        ret = ((ret & 0xcccccccc) >> 2) | ((ret & 0x33333333) << 2);
        ret = ((ret & 0xaaaaaaaa) >> 1) | ((ret & 0x55555555) << 1);
        return ret;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n - a positive integer
     * @return {number} - a positive integer
     */
    reverseBits(n) {
        let ret = n >>> 0;
        ret = (ret >>> 16) | (ret << 16);
        ret = ((ret & 0xff00ff00) >>> 8) | ((ret & 0x00ff00ff) << 8);
        ret = ((ret & 0xf0f0f0f0) >>> 4) | ((ret & 0x0f0f0f0f) << 4);
        ret = ((ret & 0xcccccccc) >>> 2) | ((ret & 0x33333333) << 2);
        ret = ((ret & 0xaaaaaaaa) >>> 1) | ((ret & 0x55555555) << 1);
        return ret >>> 0;
    }
}
```

```csharp
public class Solution {
    public uint ReverseBits(uint n) {
        uint ret = n;
        ret = (ret >> 16) | (ret << 16);
        ret = ((ret & 0xff00ff00) >> 8) | ((ret & 0x00ff00ff) << 8);
        ret = ((ret & 0xf0f0f0f0) >> 4) | ((ret & 0x0f0f0f0f) << 4);
        ret = ((ret & 0xcccccccc) >> 2) | ((ret & 0x33333333) << 2);
        ret = ((ret & 0xaaaaaaaa) >> 1) | ((ret & 0x55555555) << 1);
        return ret;
    }
}
```

```go
func reverseBits(n uint32) uint32 {
	res := n
	res = (res >> 16) | (res << 16)
	res = ((res & 0xff00ff00) >> 8) | ((res & 0x00ff00ff) << 8)
	res = ((res & 0xf0f0f0f0) >> 4) | ((res & 0x0f0f0f0f) << 4)
	res = ((res & 0xcccccccc) >> 2) | ((res & 0x33333333) << 2)
	res = ((res & 0xaaaaaaaa) >> 1) | ((res & 0x55555555) << 1)
	return res
}
```

```kotlin
class Solution {
    fun reverseBits(n: Int): Int {
        var res = n
        res = (res ushr 16) or (res shl 16)
        res = ((res and 0xff00ff00.toInt()) ushr 8) or ((res and 0x00ff00ff) shl 8)
        res = ((res and 0xf0f0f0f0.toInt()) ushr 4) or ((res and 0x0f0f0f0f) shl 4)
        res = ((res and 0xcccccccc.toInt()) ushr 2) or ((res and 0x33333333) shl 2)
        res = ((res and 0xaaaaaaaa.toInt()) ushr 1) or ((res and 0x55555555) shl 1)
        return res
    }
}
```

```swift
class Solution {
    func reverseBits(_ n: Int) -> Int {
        var res = n
        res = (res >> 16) | (res << 16) & 0xFFFFFFFF
        res = ((res & 0xff00ff00) >> 8) | ((res & 0x00ff00ff) << 8)
        res = ((res & 0xf0f0f0f0) >> 4) | ((res & 0x0f0f0f0f) << 4)
        res = ((res & 0xcccccccc) >> 2) | ((res & 0x33333333) << 2)
        res = ((res & 0xaaaaaaaa) >> 1) | ((res & 0x55555555) << 1)
        return res & 0xFFFFFFFF
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Using Signed Right Shift Instead of Unsigned

In languages like Java and JavaScript, using `>>` (signed right shift) instead of `>>>` (unsigned right shift) can cause incorrect results. The signed shift preserves the sign bit, which leads to unexpected behavior when the most significant bit is set. Always use unsigned right shift for bit reversal operations.

### Hardcoding the Wrong Bit Width

The problem specifies a 32-bit unsigned integer, so all operations must process exactly 32 bits. A common mistake is iterating fewer than 32 times or not accounting for leading zeros. Every bit position matters in reversal, so the loop must always run for all 32 bits regardless of the input value.
