## 1. Brute Force

### Intuition

The goal is to compute the **sum of two integers**.

In the brute force approach, we rely directly on the language’s built-in arithmetic addition operator. This is the most straightforward and intuitive solution because:

- Addition is a fundamental operation supported natively by all programming languages
- The language runtime already handles all edge cases such as:
  - negative numbers
  - carry propagation
  - integer representation

This approach focuses purely on **correctness and simplicity**, without worrying about implementation details.

### Algorithm

1. Take the two input integers `a` and `b`.
2. Use the built-in addition operation to compute `a + b`.
3. Return the result.

::tabs-start

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        return a + b
```

```java
public class Solution {
    public int getSum(int a, int b) {
        return a + b;
    }
}
```

```cpp
class Solution {
public:
    int getSum(int a, int b) {
        return a + b;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    getSum(a, b) {
        return a + b;
    }
}
```

```csharp
public class Solution {
    public int GetSum(int a, int b) {
        return a + b;
    }
}
```

```go
func getSum(a int, b int) int {
    return a + b
}
```

```kotlin
class Solution {
    fun getSum(a: Int, b: Int): Int {
        return a + b
    }
}
```

```swift
class Solution {
    func getSum(_ a: Int, _ b: Int) -> Int {
        return a + b
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

The problem asks us to compute the **sum of two integers without using the `+` or `-` operators**.

At the bit level, addition works using two simple ideas:
- **XOR (`^`)** gives the sum of two bits *without considering carry*
- **AND (`&`) + left shift** determines where a carry is generated

For example (single bit):
- `0 + 0 → sum = 0, carry = 0`
- `1 + 0 → sum = 1, carry = 0`
- `1 + 1 → sum = 0, carry = 1`

By repeating this logic for all bit positions, we can simulate normal addition exactly as it happens in hardware.

Because integers are stored in **fixed-width (32-bit) two’s complement form**, we also need to:
- limit results to 32 bits
- correctly convert the result back if it represents a negative number

### Algorithm

1. Initialize:
   - `result` to store the final sum
   - `carry = 0`
   - a `mask` to keep numbers within 32 bits
2. For each bit position from `0` to `31`:
   - Extract the `i`-th bit from both numbers
   - Compute the current sum bit using XOR:
     ```
     sum_bit = a_bit XOR b_bit XOR carry
     ```
   - Update the carry:
     ```
     carry = (a_bit + b_bit + carry) ≥ 2
     ```
   - Set the `i`-th bit in the result if `sum_bit` is `1`
3. After processing all bits:
   - If the result represents a negative number in 32-bit two’s complement:
     - Convert it back to a signed integer
4. Return the result

::tabs-start

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        carry = 0
        res = 0
        mask = 0xFFFFFFFF

        for i in range(32):
            a_bit = (a >> i) & 1
            b_bit = (b >> i) & 1
            cur_bit = a_bit ^ b_bit ^ carry
            carry = (a_bit + b_bit + carry) >= 2
            if cur_bit:
                res |= (1 << i)

        if res > 0x7FFFFFFF:
            res = ~(res ^ mask)

        return res
```

```java
public class Solution {
    public int getSum(int a, int b) {
        int carry = 0, res = 0, mask = 0xFFFFFFFF;

        for (int i = 0; i < 32; i++) {
            int a_bit = (a >> i) & 1;
            int b_bit = (b >> i) & 1;
            int cur_bit = a_bit ^ b_bit ^ carry;
            carry = (a_bit + b_bit + carry) >= 2 ? 1 : 0;
            if (cur_bit != 0) {
                res |= (1 << i);
            }
        }

        if (res > 0x7FFFFFFF) {
            res = ~(res ^ mask);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int getSum(int a, int b) {
        int carry = 0, res = 0, mask = 0xFFFFFFFF;

        for (int i = 0; i < 32; i++) {
            int a_bit = (a >> i) & 1;
            int b_bit = (b >> i) & 1;
            int cur_bit = a_bit ^ b_bit ^ carry;
            carry = (a_bit + b_bit + carry) >= 2 ? 1 : 0;
            if (cur_bit) {
                res |= (1 << i);
            }
        }

        if (res > 0x7FFFFFFF) {
            res = ~(res ^ mask);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    getSum(a, b) {
        let carry = 0,
            res = 0,
            mask = 0xffffffff;

        for (let i = 0; i < 32; i++) {
            let a_bit = (a >> i) & 1;
            let b_bit = (b >> i) & 1;
            let cur_bit = a_bit ^ b_bit ^ carry;
            carry = a_bit + b_bit + carry >= 2 ? 1 : 0;
            if (cur_bit) {
                res |= 1 << i;
            }
        }

        if (res > 0x7fffffff) {
            res = ~(res ^ mask);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int GetSum(int a, int b) {
        int carry = 0, res = 0, mask = unchecked((int)0xFFFFFFFF);

        for (int i = 0; i < 32; i++) {
            int a_bit = (a >> i) & 1;
            int b_bit = (b >> i) & 1;
            int cur_bit = a_bit ^ b_bit ^ carry;
            carry = (a_bit + b_bit + carry) >= 2 ? 1 : 0;
            if (cur_bit != 0) {
                res |= (1 << i);
            }
        }

        if (res > Int32.MaxValue) {
            res = ~(res ^ mask);
        }

        return res;
    }
}
```

```go
func getSum(a int, b int) int {
    carry := 0
    res := 0
    mask := 0xFFFFFFFF

    for i := 0; i < 32; i++ {
        aBit := (a >> i) & 1
        bBit := (b >> i) & 1
        curBit := aBit ^ bBit ^ carry
        if (aBit + bBit + carry) >= 2 {
            carry = 1
        } else {
            carry = 0
        }
        if curBit == 1 {
            res |= (1 << i)
        }
    }

    if res > 0x7FFFFFFF {
        res = ^(res ^ mask)
    }

    return res
}
```

```kotlin
class Solution {
    fun getSum(a: Int, b: Int): Int {
        var carry = 0
        var res = 0
        val mask = 0xFFFFFFFF.toInt()

        for (i in 0 until 32) {
            val aBit = (a shr i) and 1
            val bBit = (b shr i) and 1
            val curBit = aBit xor bBit xor carry
            carry = if (aBit + bBit + carry >= 2) 1 else 0
            if (curBit == 1) {
                res = res or (1 shl i)
            }
        }

        if (res > 0x7FFFFFFF) {
            res = res.inv() xor mask
        }

        return res
    }
}
```

```swift
class Solution {
    func getSum(_ a: Int, _ b: Int) -> Int {
        var carry = 0
        var res = 0
        let mask = 0xFFFFFFFF

        for i in 0..<32 {
            let aBit = (a >> i) & 1
            let bBit = (b >> i) & 1
            let curBit = aBit ^ bBit ^ carry
            carry = (aBit + bBit + carry) >= 2 ? 1 : 0
            if curBit == 1 {
                res |= (1 << i)
            }
        }

        if res > 0x7FFFFFFF {
            res = ~(res ^ mask)
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

We need to add two integers **without using `+` or `-`**.  
Binary addition can be built from two operations:

1. **Sum without carry**  
   - `a XOR b` gives the bit-by-bit sum ignoring carry  
     (because `1 XOR 1 = 0`, which matches sum without carry)

2. **Carry information**  
   - `a AND b` tells us where both bits are `1`, which creates a carry  
   - shifting left by 1 (`<< 1`) moves that carry to the next higher bit

So we can repeatedly:
- compute the carry
- update the partial sum using XOR
- add the carry again (by setting `b = carry`)

We keep doing this until there is **no carry left** (`b == 0`).

Because many languages use **fixed-width integers** (like 32-bit signed integers), we use a `mask` to keep only the lower 32 bits at each step. Finally, if the result represents a negative number in 32-bit two’s complement form, we convert it back to a signed integer.

### Algorithm

1. Define constants for 32-bit handling:
   - `mask` to keep only 32 bits
   - `max_int` as the largest 32-bit signed integer
2. While `b` is not zero:
   - Compute carry:
     - `carry = (a AND b) << 1`
   - Compute sum without carry:
     - `a = (a XOR b)`, then apply the 32-bit mask
   - Move carry into `b` (also masked to 32 bits)
3. After the loop, `a` holds the 32-bit result.
4. If `a` is within signed range, return it directly.
5. Otherwise, convert from unsigned 32-bit to a negative signed value and return it.

::tabs-start

```python
class Solution:
    def getSum(self, a: int, b: int) -> int:
        mask = 0xFFFFFFFF
        max_int = 0x7FFFFFFF

        while b != 0:
            carry = (a & b) << 1
            a = (a ^ b) & mask
            b = carry & mask

        return a if a <= max_int else ~(a ^ mask)
```

```java
public class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a ^= b;
            b = carry;
        }
        return a;
    }
}
```

```cpp
class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a ^= b;
            b = carry;
        }
        return a;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    getSum(a, b) {
        while (b !== 0) {
            let carry = (a & b) << 1;
            a ^= b;
            b = carry;
        }
        return a;
    }
}
```

```csharp
public class Solution {
    public int GetSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a ^= b;
            b = carry;
        }
        return a;
    }
}
```

```go
func getSum(a int, b int) int {
    mask := 0xFFFFFFFF
    maxInt := 0x7FFFFFFF

    for b != 0 {
        carry := (a & b) << 1
        a = (a ^ b) & mask
        b = carry & mask
    }

    if a <= maxInt {
        return a
    }
    return ^(a ^ mask)
}
```

```kotlin
class Solution {
    fun getSum(a: Int, b: Int): Int {
        var carry = 0
        var res = 0
        val mask = 0xFFFFFFFF.toInt()

        for (i in 0 until 32) {
            val aBit = (a shr i) and 1
            val bBit = (b shr i) and 1
            val curBit = aBit xor bBit xor carry
            carry = if (aBit + bBit + carry >= 2) 1 else 0
            if (curBit == 1) {
                res = res or (1 shl i)
            }
        }

        if (res > 0x7FFFFFFF) {
            res = res.inv() xor mask
        }

        return res
    }
}
```

```swift
class Solution {
    func getSum(_ a: Int, _ b: Int) -> Int {
        let mask = 0xFFFFFFFF
        let maxInt = 0x7FFFFFFF
        var a = a
        var b = b

        while b != 0 {
            let carry = (a & b) << 1
            a = (a ^ b) & mask
            b = carry & mask
        }

        return a <= maxInt ? a : ~(a ^ mask)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$
