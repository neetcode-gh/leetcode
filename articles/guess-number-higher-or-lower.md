## 1. Linear Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Binary Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$

---

## 3. Ternary Search

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log_3 n)$
- Space complexity: $O(1)$
