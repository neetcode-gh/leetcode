## 1. Linear Search

### Intuition

The simplest approach is to try every number from `1` to `n` until we find the correct one. Each guess tells us whether we hit the target. While guaranteed to work, this method is slow for large `n` since we might need to check every single number.

### Algorithm

1. Iterate through numbers from `1` to `n`.
2. For each number, call the `guess` API.
3. If `guess` returns `0`, the current number is correct; return it.
4. Continue until the answer is found.

::tabs-start

```python
# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num: int) -> int:

class Solution:
    def guessNumber(self, n: int) -> int:
        for num in range(1, n + 1):
            if guess(num) == 0:
                return num
```

```java
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

public class Solution extends GuessGame {
    public int guessNumber(int n) {
        for (int num = 1; num <= n; num++) {
            if (guess(num) == 0) return num;
        }
        return n;
    }
}
```

```cpp
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

class Solution {
public:
    int guessNumber(int n) {
        for (int num = 1; num <= n; num++) {
            if (guess(num) == 0) return num;
        }
        return n;
    }
};
```

```javascript
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * function guess(num) {}
 */

class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    guessNumber(n) {
        for (let num = 1; num <= n; num++) {
            if (guess(num) === 0) return num;
        }
        return n;
    }
}
```

```csharp
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

public class Solution : GuessGame {
    public int GuessNumber(int n) {
        for (int num = 1; num <= n; num++) {
            if (guess(num) == 0) return num;
        }
        return n;
    }
}
```

```go
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * func guess(num int) int;
 */

func guessNumber(n int) int {
    for num := 1; num <= n; num++ {
        if guess(num) == 0 {
            return num
        }
    }
    return n
}
```

```kotlin
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * fun guess(num: Int): Int {}
 */

class Solution : GuessGame() {
    override fun guessNumber(n: Int): Int {
        for (num in 1..n) {
            if (guess(num) == 0) return num
        }
        return n
    }
}
```

```swift
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * func guess(_ num: Int) -> Int
 */

class Solution : GuessGame {
    func guessNumber(_ n: Int) -> Int {
        for num in 1...n {
            if guess(num) == 0 {
                return num
            }
        }
        return n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Binary Search

### Intuition

Since the numbers from `1` to `n` are sorted, we can use binary search to find the target efficiently. The `guess` API tells us whether to search higher or lower, which is exactly the feedback binary search needs to halve the search space with each guess.

### Algorithm

1. Initialize two pointers: `l = 1` and `r = n`.
2. Calculate the middle value `m = (l + r) / 2`.
3. Call `guess(m)`:
   - If it returns `0`, we found the number; return `m`.
   - If it returns `1` (number is higher), set `l = m + 1`.
   - If it returns `-1` (number is lower), set `r = m - 1`.
4. Repeat until the number is found.

::tabs-start

```python
# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num: int) -> int:

class Solution:
    def guessNumber(self, n: int) -> int:
        l, r = 1, n
        while True:
            m = (l + r) // 2
            res = guess(m)
            if res > 0:
                l = m + 1
            elif res < 0:
                r = m - 1
            else:
                return m
```

```java
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

public class Solution extends GuessGame {
    public int guessNumber(int n) {
        int l = 1, r = n;
        while (true) {
            int m = l + (r - l) / 2;
            int res = guess(m);
            if (res > 0) {
                l = m + 1;
            } else if (res < 0) {
                r = m - 1;
            } else {
                return m;
            }
        }
    }
}
```

```cpp
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

class Solution {
public:
    int guessNumber(int n) {
        int l = 1, r = n;
        while (true) {
            int m = l + (r - l) / 2;
            int res = guess(m);
            if (res > 0) {
                l = m + 1;
            } else if (res < 0) {
                r = m - 1;
            } else {
                return m;
            }
        }
    }
};
```

```javascript
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * function guess(num) {}
 */

class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    guessNumber(n) {
        let l = 1,
            r = n;
        while (true) {
            let m = Math.floor((l + r) / 2);
            let res = guess(m);
            if (res > 0) {
                l = m + 1;
            } else if (res < 0) {
                r = m - 1;
            } else {
                return m;
            }
        }
    }
}
```

```csharp
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

public class Solution : GuessGame {
    public int GuessNumber(int n) {
        int l = 1, r = n;
        while (true) {
            int m = l + (r - l) / 2;
            int res = guess(m);
            if (res > 0) {
                l = m + 1;
            }
            else if (res < 0) {
                r = m - 1;
            }
            else {
                return m;
            }
        }
    }
}
```

```go
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * func guess(num int) int;
 */

func guessNumber(n int) int {
    l, r := 1, n
    for {
        m := l + (r-l)/2
        res := guess(m)
        if res > 0 {
            l = m + 1
        } else if res < 0 {
            r = m - 1
        } else {
            return m
        }
    }
}
```

```kotlin
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * fun guess(num: Int): Int {}
 */

class Solution : GuessGame() {
    override fun guessNumber(n: Int): Int {
        var l = 1
        var r = n
        while (true) {
            val m = l + (r - l) / 2
            val res = guess(m)
            if (res > 0) {
                l = m + 1
            } else if (res < 0) {
                r = m - 1
            } else {
                return m
            }
        }
    }
}
```

```swift
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * func guess(_ num: Int) -> Int
 */

class Solution : GuessGame {
    func guessNumber(_ n: Int) -> Int {
        var l = 1
        var r = n
        while true {
            let m = l + (r - l) / 2
            let res = guess(m)
            if res > 0 {
                l = m + 1
            } else if res < 0 {
                r = m - 1
            } else {
                return m
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Ternary Search

### Intuition

Ternary search divides the search space into three parts instead of two. We pick two midpoints and use the `guess` API on both. Based on the results, we can eliminate either one-third or two-thirds of the search space. While this approach works, it does not improve on binary search for this problem since we need more API calls per iteration.

### Algorithm

1. Initialize two pointers: `l = 1` and `r = n`.
2. Calculate two midpoints: `m1 = l + (r - l) / 3` and `m2 = r - (r - l) / 3`.
3. Check `guess(m1)` and `guess(m2)`:
   - If either returns `0`, return that midpoint.
   - If both results sum to `0` (one is `1`, other is `-1`), the answer lies between `m1` and `m2`; update both bounds.
   - If `guess(m1)` is `-1`, the answer is below `m1`; set `r = m1 - 1`.
   - Otherwise, the answer is above `m2`; set `l = m2 + 1`.
4. Repeat until the number is found.

::tabs-start

```python
# The guess API is already defined for you.
# @param num, your guess
# @return -1 if num is higher than the picked number
#          1 if num is lower than the picked number
#          otherwise return 0
# def guess(num: int) -> int:

class Solution:
    def guessNumber(self, n: int) -> int:
        l, r = 1, n
        while True:
            m1 = l + (r - l) // 3
            m2 = r - (r - l) // 3
            if guess(m1) == 0:
                return m1
            if guess(m2) == 0:
                return m2
            if guess(m1) + guess(m2) == 0:
                l = m1 + 1
                r = m2 - 1
            elif guess(m1) == -1:
                r = m1 - 1
            else:
                l = m2 + 1
```

```java
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

public class Solution extends GuessGame {
    public int guessNumber(int n) {
        int l = 1, r = n;
        while (true) {
            int m1 = l + (r - l) / 3;
            int m2 = r - (r - l) / 3;
            if (guess(m1) == 0) return m1;
            if (guess(m2) == 0) return m2;
            if (guess(m1) + guess(m2) == 0) {
                l = m1 + 1;
                r = m2 - 1;
            } else if (guess(m1) == -1) {
                r = m1 - 1;
            } else {
                l = m2 + 1;
            }
        }
    }
}
```

```cpp
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

class Solution {
public:
    int guessNumber(int n) {
        int l = 1, r = n;
        while (true) {
            int m1 = l + (r - l) / 3;
            int m2 = r - (r - l) / 3;
            if (guess(m1) == 0) return m1;
            if (guess(m2) == 0) return m2;
            if (guess(m1) + guess(m2) == 0) {
                l = m1 + 1;
                r = m2 - 1;
            } else if (guess(m1) == -1) {
                r = m1 - 1;
            } else {
                l = m2 + 1;
            }
        }
    }
};
```

```javascript
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * function guess(num) {}
 */

class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    guessNumber(n) {
        let l = 1,
            r = n;
        while (true) {
            let m1 = l + Math.floor((r - l) / 3);
            let m2 = r - Math.floor((r - l) / 3);
            if (guess(m1) === 0) return m1;
            if (guess(m2) === 0) return m2;
            if (guess(m1) + guess(m2) === 0) {
                l = m1 + 1;
                r = m2 - 1;
            } else if (guess(m1) === -1) {
                r = m1 - 1;
            } else {
                l = m2 + 1;
            }
        }
    }
}
```

```csharp
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * int guess(int num);
 */

public class Solution : GuessGame {
    public int GuessNumber(int n) {
        int l = 1, r = n;
        while (true) {
            int m1 = l + (r - l) / 3;
            int m2 = r - (r - l) / 3;

            if (guess(m1) == 0) return m1;
            if (guess(m2) == 0) return m2;

            if (guess(m1) + guess(m2) == 0) {
                l = m1 + 1;
                r = m2 - 1;
            }
            else if (guess(m1) == -1) {
                r = m1 - 1;
            }
            else {
                l = m2 + 1;
            }
        }
    }
}
```

```go
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * func guess(num int) int;
 */

func guessNumber(n int) int {
    l, r := 1, n
    for {
        m1 := l + (r-l)/3
        m2 := r - (r-l)/3
        if guess(m1) == 0 {
            return m1
        }
        if guess(m2) == 0 {
            return m2
        }
        if guess(m1)+guess(m2) == 0 {
            l = m1 + 1
            r = m2 - 1
        } else if guess(m1) == -1 {
            r = m1 - 1
        } else {
            l = m2 + 1
        }
    }
}
```

```kotlin
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * fun guess(num: Int): Int {}
 */

class Solution : GuessGame() {
    override fun guessNumber(n: Int): Int {
        var l = 1
        var r = n
        while (true) {
            val m1 = l + (r - l) / 3
            val m2 = r - (r - l) / 3
            if (guess(m1) == 0) return m1
            if (guess(m2) == 0) return m2
            if (guess(m1) + guess(m2) == 0) {
                l = m1 + 1
                r = m2 - 1
            } else if (guess(m1) == -1) {
                r = m1 - 1
            } else {
                l = m2 + 1
            }
        }
    }
}
```

```swift
/**
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * func guess(_ num: Int) -> Int
 */

class Solution : GuessGame {
    func guessNumber(_ n: Int) -> Int {
        var l = 1
        var r = n
        while true {
            let m1 = l + (r - l) / 3
            let m2 = r - (r - l) / 3
            if guess(m1) == 0 { return m1 }
            if guess(m2) == 0 { return m2 }
            if guess(m1) + guess(m2) == 0 {
                l = m1 + 1
                r = m2 - 1
            } else if guess(m1) == -1 {
                r = m1 - 1
            } else {
                l = m2 + 1
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log_3 n)$
- Space complexity: $O(1)$
