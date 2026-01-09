## 1. Brute Force

### Intuition

We are building a staircase where row 1 needs 1 coin, row 2 needs 2 coins, and so on. The question is: how many complete rows can we build with `n` coins?

The simplest approach is to simulate the process. Keep adding rows one by one, subtracting the required coins from `n` until we cannot complete another row.

### Algorithm

1. Initialize `row = 0`.
2. While we have enough coins for the next row (`n > row`):
   - Increment `row`.
   - Subtract `row` coins from `n`.
3. Return `row` as the number of complete rows.

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

```go
func arrangeCoins(n int) int {
    row := 0
    for n-row > 0 {
        row++
        n -= row
    }
    return row
}
```

```kotlin
class Solution {
    fun arrangeCoins(n: Int): Int {
        var n = n
        var row = 0
        while (n - row > 0) {
            row++
            n -= row
        }
        return row
    }
}
```

```swift
class Solution {
    func arrangeCoins(_ n: Int) -> Int {
        var n = n
        var row = 0
        while n - row > 0 {
            row += 1
            n -= row
        }
        return row
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 2. Binary Search

### Intuition

Building rows one by one is slow for large `n`. Instead, we can use the formula for the sum of first `k` integers: `k * (k + 1) / 2`. If this sum is at most `n`, we can build `k` complete rows.

This creates a monotonic condition perfect for binary search. We search for the largest `k` such that `k * (k + 1) / 2 <= n`.

### Algorithm

1. Set search bounds: `l = 1` and `r = n`.
2. While `l <= r`:
   - Compute `mid` and calculate coins needed for `mid` rows.
   - If coins needed exceeds `n`, search the left half.
   - Otherwise, update the result and search the right half.
3. Return the maximum valid `k`.

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

```go
func arrangeCoins(n int) int {
    l, r := 1, n
    res := 0

    for l <= r {
        mid := l + (r-l)/2
        coins := int64(mid) * int64(mid+1) / 2
        if coins > int64(n) {
            r = mid - 1
        } else {
            l = mid + 1
            if mid > res {
                res = mid
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun arrangeCoins(n: Int): Int {
        var l = 1
        var r = n
        var res = 0

        while (l <= r) {
            val mid = l + (r - l) / 2
            val coins = mid.toLong() * (mid + 1) / 2
            if (coins > n) {
                r = mid - 1
            } else {
                l = mid + 1
                res = maxOf(res, mid)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func arrangeCoins(_ n: Int) -> Int {
        var l = 1
        var r = n
        var res = 0

        while l <= r {
            let mid = l + (r - l) / 2
            let coins = mid * (mid + 1) / 2
            if coins > n {
                r = mid - 1
            } else {
                l = mid + 1
                res = max(res, mid)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Binary Search (Optimal)

### Intuition

We can optimize the binary search by tightening the upper bound. Since `k * (k + 1) / 2 <= n`, we know `k` is roughly `sqrt(2n)`. A safe upper bound is `n / 2 + 1` for `n > 3`, which reduces the search space.

We also simplify the binary search by finding the first `k` where the condition fails, then returning `k - 1`.

### Algorithm

1. Handle small cases: if `n <= 3`, return `1` for `n = 1` and `n - 1` otherwise.
2. Set `l = 1` and `r = n / 2 + 1`.
3. Use binary search to find the smallest `k` where coins exceed `n`.
4. Return `l - 1`.

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

```go
func arrangeCoins(n int) int {
    if n <= 3 {
        if n == 1 {
            return 1
        }
        return n - 1
    }

    l, r := 1, n/2+1
    for l < r {
        mid := (l + r) / 2
        coins := int64(mid) * int64(mid+1) / 2
        if coins <= int64(n) {
            l = mid + 1
        } else {
            r = mid
        }
    }

    return l - 1
}
```

```kotlin
class Solution {
    fun arrangeCoins(n: Int): Int {
        if (n <= 3) {
            return if (n == 1) 1 else n - 1
        }

        var l = 1
        var r = n / 2 + 1
        while (l < r) {
            val mid = (l + r) / 2
            val coins = mid.toLong() * (mid + 1) / 2
            if (coins <= n) {
                l = mid + 1
            } else {
                r = mid
            }
        }

        return l - 1
    }
}
```

```swift
class Solution {
    func arrangeCoins(_ n: Int) -> Int {
        if n <= 3 {
            return n == 1 ? 1 : n - 1
        }

        var l = 1
        var r = n / 2 + 1
        while l < r {
            let mid = (l + r) / 2
            let coins = mid * (mid + 1) / 2
            if coins <= n {
                l = mid + 1
            } else {
                r = mid
            }
        }

        return l - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 4. Bit Manipulation

### Intuition

We can build the answer bit by bit, from the most significant bit down. For each bit position, we tentatively set it and check if the resulting number of rows is valid. If valid, we keep the bit; otherwise, we clear it.

Since `n` fits in 32 bits and `k` is roughly `sqrt(n)`, we only need about 16 bits to represent the answer.

### Algorithm

1. Start with a mask at the highest relevant bit (bit 15).
2. For each bit from high to low:
   - Set the bit in `rows`.
   - Calculate coins needed for `rows` rows.
   - If it exceeds `n`, clear the bit.
   - Shift mask right.
3. Return `rows`.

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

```go
func arrangeCoins(n int) int {
    mask := 1 << 15
    rows := 0
    for mask > 0 {
        rows |= mask
        coins := int64(rows) * int64(rows+1) / 2
        if coins > int64(n) {
            rows ^= mask
        }
        mask >>= 1
    }
    return rows
}
```

```kotlin
class Solution {
    fun arrangeCoins(n: Int): Int {
        var mask = 1 shl 15
        var rows = 0
        while (mask > 0) {
            rows = rows or mask
            val coins = rows.toLong() * (rows + 1) / 2
            if (coins > n) {
                rows = rows xor mask
            }
            mask = mask shr 1
        }
        return rows
    }
}
```

```swift
class Solution {
    func arrangeCoins(_ n: Int) -> Int {
        var mask = 1 << 15
        var rows = 0
        while mask > 0 {
            rows |= mask
            let coins = rows * (rows + 1) / 2
            if coins > n {
                rows ^= mask
            }
            mask >>= 1
        }
        return rows
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ since we iterate $15$ times.
- Space complexity: $O(1)$

---

## 5. Math

### Intuition

We can solve this directly with algebra. We need the largest `k` where `k * (k + 1) / 2 <= n`. Rearranging: `k^2 + k - 2n <= 0`. Using the quadratic formula, `k = (-1 + sqrt(1 + 8n)) / 2`.

Simplifying gives us `k = sqrt(2n + 0.25) - 0.5`. We take the floor of this value to get the answer.

### Algorithm

1. Compute `sqrt(2 * n + 0.25) - 0.5`.
2. Return the integer part.

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

```go
func arrangeCoins(n int) int {
    return int(math.Sqrt(2*float64(n)+0.25) - 0.5)
}
```

```kotlin
class Solution {
    fun arrangeCoins(n: Int): Int {
        return (Math.sqrt(2.0 * n + 0.25) - 0.5).toInt()
    }
}
```

```swift
class Solution {
    func arrangeCoins(_ n: Int) -> Int {
        return Int(sqrt(2.0 * Double(n) + 0.25) - 0.5)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$ or $O(\sqrt {n})$ depending on the language.
- Space complexity: $O(1)$
