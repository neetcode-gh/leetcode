## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Binary Search** - Efficiently narrows down the search space by halving it each iteration
- **Integer Overflow Handling** - Squaring large numbers can overflow; use 64-bit types for intermediate calculations
- **Bit Manipulation** - Used in the recursive approach with right/left shifts to divide/multiply by powers of 2
- **Newton's Method** - An iterative numerical technique that converges quickly to the square root

---

## 1. Brute Force

### Intuition

The square root of a number `x` is the largest integer `i` such that `i * i <= x`. We can find this by simply checking each integer starting from `1` until squaring it exceeds `x`. The answer is the last integer whose square did not exceed `x`.

### Algorithm

1. Handle the edge case where `x` is `0` by returning `0`.
2. Initialize `res` to `1` to track the potential answer.
3. Iterate from `1` to `x`. For each integer `i`, check if `i * i > x`.
4. If `i * i > x`, return the previous valid result `res`.
5. Otherwise, update `res = i` and continue.
6. Return `res` after the loop.

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 0:
            return 0

        res = 1
        for i in range(1, x + 1):
            if i * i > x:
                return res
            res = i

        return res
```

```java
public class Solution {
    public int mySqrt(int x) {
        if (x == 0) {
            return 0;
        }

        int res = 1;
        for (int i = 1; i <= x; i++) {
            if ((long) i * i > x) {
                return res;
            }
            res = i;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x == 0) {
            return 0;
        }

        int res = 1;
        for (int i = 1; i <= x; i++) {
            if ((long long) i * i > x) {
                return res;
            }
            res = i;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        if (x === 0) {
            return 0;
        }

        let res = 1;
        for (let i = 1; i <= x; i++) {
            if (i * i > x) {
                return res;
            }
            res = i;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        if (x == 0) return 0;

        int res = 1;
        for (int i = 1; i <= x; i++) {
            if ((long)i * i > x) {
                return res;
            }
            res = i;
        }
        return res;
    }
}
```

```go
func mySqrt(x int) int {
    if x == 0 {
        return 0
    }

    res := 1
    for i := 1; i <= x; i++ {
        if int64(i)*int64(i) > int64(x) {
            return res
        }
        res = i
    }

    return res
}
```

```kotlin
class Solution {
    fun mySqrt(x: Int): Int {
        if (x == 0) return 0

        var res = 1
        for (i in 1..x) {
            if (i.toLong() * i > x) {
                return res
            }
            res = i
        }

        return res
    }
}
```

```swift
class Solution {
    func mySqrt(_ x: Int) -> Int {
        if x == 0 {
            return 0
        }

        var res = 1
        for i in 1...x {
            if i * i > x {
                return res
            }
            res = i
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\sqrt {n})$
- Space complexity: $O(1)$

---

## 2. In-Built Function

### Intuition

Most programming languages provide a built-in square root function that computes the result efficiently using optimized mathematical algorithms (often Newton's method or similar). We can leverage this and simply truncate the result to get the integer floor of the square root.

### Algorithm

1. Call the language's built-in square root function on `x`.
2. Convert the result to an integer (truncating any decimal part).
3. Return the integer result.

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        return int(sqrt(x))
```

```java
public class Solution {
    public int mySqrt(int x) {
        return (int) Math.sqrt(x);
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        return (int) sqrt(x);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        return Math.floor(Math.sqrt(x));
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        return (int)Math.Sqrt(x);
    }
}
```

```go
func mySqrt(x int) int {
    return int(math.Sqrt(float64(x)))
}
```

```kotlin
class Solution {
    fun mySqrt(x: Int): Int {
        return kotlin.math.sqrt(x.toDouble()).toInt()
    }
}
```

```swift
class Solution {
    func mySqrt(_ x: Int) -> Int {
        return Int(Double(x).squareRoot())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(1)$
- Space complexity: $O(1)$

---

## 3. Binary Search

### Intuition

Since we are looking for the largest integer whose square is at most `x`, and the squares of integers are monotonically increasing, we can use binary search. The search space is `[0, x]`, and we narrow it down by checking if the middle value squared is less than, greater than, or equal to `x`.

### Algorithm

1. Initialize `l = 0`, `r = x`, and `res = 0` to store the answer.
2. While `l <= r`:
   - Compute middle `m = l + (r - l) / 2`.
   - If `m * m > x`, the answer must be smaller, so set `r = m - 1`.
   - If `m * m < x`, `m` is a valid candidate. Store it in `res` and search for a larger value by setting `l = m + 1`.
   - If `m * m == x`, we found the exact square root, so return `m`.
3. Return `res` after the loop.

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        l, r = 0, x
        res = 0

        while l <= r:
            m = l + (r - l) // 2
            if m * m > x:
                r = m - 1
            elif m * m < x:
                l = m + 1
                res = m
            else:
                return m

        return res
```

```java
public class Solution {
    public int mySqrt(int x) {
        int l = 0, r = x;
        int res = 0;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((long) m * m > x) {
                r = m - 1;
            } else if ((long) m * m < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        int l = 0, r = x;
        int res = 0;

        while (l <= r) {
            int m = l + (r - l) / 2;
            if ((long long) m * m > x) {
                r = m - 1;
            } else if ((long long) m * m < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        let l = 0,
            r = x;
        let res = 0;

        while (l <= r) {
            const m = Math.floor(l + (r - l) / 2);
            if (m * m > x) {
                r = m - 1;
            } else if (m * m < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        int l = 0, r = x;
        int res = 0;

        while (l <= r) {
            int m = l + (r - l) / 2;
            long sq = (long)m * m;

            if (sq > x) {
                r = m - 1;
            } else if (sq < x) {
                l = m + 1;
                res = m;
            } else {
                return m;
            }
        }

        return res;
    }
}
```

```go
func mySqrt(x int) int {
    l, r := 0, x
    res := 0

    for l <= r {
        m := l + (r-l)/2
        if int64(m)*int64(m) > int64(x) {
            r = m - 1
        } else if int64(m)*int64(m) < int64(x) {
            l = m + 1
            res = m
        } else {
            return m
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun mySqrt(x: Int): Int {
        var l = 0
        var r = x
        var res = 0

        while (l <= r) {
            val m = l + (r - l) / 2
            val sq = m.toLong() * m

            when {
                sq > x -> r = m - 1
                sq < x -> {
                    l = m + 1
                    res = m
                }
                else -> return m
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func mySqrt(_ x: Int) -> Int {
        var l = 0
        var r = x
        var res = 0

        while l <= r {
            let m = l + (r - l) / 2
            if m * m > x {
                r = m - 1
            } else if m * m < x {
                l = m + 1
                res = m
            } else {
                return m
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

## 4. Recursion

### Intuition

We can exploit a mathematical property: `sqrt(x) = 2 * sqrt(x / 4)`. By right-shifting `x` by 2 bits (dividing by 4), we recursively compute the square root of a smaller number. Then we left-shift the result by 1 (multiply by 2) to scale it back up. Finally, we check if incrementing by 1 still gives a valid square root.

### Algorithm

1. Base case: if `x < 2`, return `x` (since `sqrt(0) = 0` and `sqrt(1) = 1`).
2. Recursively compute `l = mySqrt(x >> 2) << 1`. This gets an approximate lower bound.
3. Compute `r = l + 1` as the candidate one larger.
4. If `r * r > x`, return `l`. Otherwise, return `r`.

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        if x < 2:
            return x

        l = self.mySqrt(x >> 2) << 1
        r = l + 1
        return l if r ** 2 > x else r
```

```java
public class Solution {
    public int mySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int l = mySqrt(x >> 2) << 1;
        int r = l + 1;
        return (long) r * r > x ? l : r;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int l = mySqrt(x >> 2) << 1;
        int r = l + 1;
        return (long long) r * r > x ? l : r;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        if (x < 2) {
            return x;
        }

        const l = this.mySqrt(x >> 2) << 1;
        const r = l + 1;
        return r * r > x ? l : r;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        if (x < 2) {
            return x;
        }

        int l = MySqrt(x >> 2) << 1;
        int r = l + 1;
        return (long)r * r > x ? l : r;
    }
}
```

```go
func mySqrt(x int) int {
    if x < 2 {
        return x
    }

    l := mySqrt(x>>2) << 1
    r := l + 1
    if int64(r)*int64(r) > int64(x) {
        return l
    }
    return r
}
```

```kotlin
class Solution {
    fun mySqrt(x: Int): Int {
        if (x < 2) {
            return x
        }

        val l = mySqrt(x shr 2) shl 1
        val r = l + 1
        return if (r.toLong() * r > x) l else r
    }
}
```

```swift
class Solution {
    func mySqrt(_ x: Int) -> Int {
        if x < 2 {
            return x
        }

        let l = mySqrt(x >> 2) << 1
        let r = l + 1
        return r * r > x ? l : r
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 5. Newton's Method

### Intuition

Newton's method is a numerical technique for finding roots of equations. To find `sqrt(x)`, we solve `r^2 = x`, or equivalently find the root of `f(r) = r^2 - x`. Newton's iteration formula gives us `r_new = (r + x/r) / 2`. Starting with an initial guess of `x`, we repeatedly apply this formula until `r^2 <= x`, which converges quickly to the answer.

### Algorithm

1. Initialize `r = x` as the starting guess.
2. While `r * r > x`, update `r = (r + x / r) / 2` (using integer division, or right shift by 1).
3. The loop converges when `r^2 <= x`.
4. Return `r` as the integer square root.

::tabs-start

```python
class Solution:
    def mySqrt(self, x: int) -> int:
        r = x
        while r * r > x:
            r = (r + x // r) >> 1
        return r
```

```java
public class Solution {
    public int mySqrt(int x) {
        long r = x;
        while (r * r > x) {
            r = (r + x / r) >> 1;
        }
        return (int) r;
    }
}
```

```cpp
class Solution {
public:
    int mySqrt(int x) {
        long long r = x;
        while (r * r > x) {
            r = (r + x / r) >> 1;
        }
        return r;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    mySqrt(x) {
        let r = x;
        while (r * r > x) {
            r = (r + Math.floor(x / r)) >>> 1;
        }
        return r;
    }
}
```

```csharp
public class Solution {
    public int MySqrt(int x) {
        long r = x;
        while (r * r > x) {
            r = (r + x / r) >> 1;
        }
        return (int)r;
    }
}
```

```go
func mySqrt(x int) int {
    r := int64(x)
    for r*r > int64(x) {
        r = (r + int64(x)/r) >> 1
    }
    return int(r)
}
```

```kotlin
class Solution {
    fun mySqrt(x: Int): Int {
        var r = x.toLong()
        while (r * r > x) {
            r = (r + x / r) shr 1
        }
        return r.toInt()
    }
}
```

```swift
class Solution {
    func mySqrt(_ x: Int) -> Int {
        var r = x
        while r * r > x {
            r = (r + x / r) >> 1
        }
        return r
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Integer Overflow When Squaring

When computing `m * m` during binary search, the result can overflow if `m` is large (e.g., close to 46340 for 32-bit integers). Always cast to a 64-bit type before multiplication, such as `(long)m * m` in Java or `(long long)m * m` in C++, to prevent incorrect comparisons.

### Off-by-One Errors in Binary Search

A subtle mistake is returning `m` when `m * m < x` instead of tracking it as a candidate and continuing to search for a larger valid value. The correct approach is to store `m` in a result variable when `m * m <= x` and keep searching, returning the stored result when the loop ends.
