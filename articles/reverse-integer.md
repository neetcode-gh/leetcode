## 1. Brute Force

::tabs-start

```python
class Solution:
    def reverse(self, x: int) -> int:
        org = x
        x = abs(x)
        res = int(str(x)[::-1])
        if org < 0:
            res *= -1
        if res < -(1 << 31) or res > (1 << 31) - 1:
            return 0
        return res
```

```java
public class Solution {
    public int reverse(int x) {
        int org = x;
        x = Math.abs(x);
        long res = Long.parseLong(new StringBuilder(
                   String.valueOf(x)).reverse().toString()
                );
        if (org < 0) {
            res *= -1;
        }
        if (res < -(1 << 31) || res > (1 << 31) - 1) {
            return 0;
        }
        return (int)res;
    }
}
```

```cpp
class Solution {
public:
    int reverse(int x) {
        int org = x;
        x = abs(x);
        string strX = to_string(x);
        std::reverse(strX.begin(), strX.end());
        long long res = stoll(strX); 
        if (org < 0) {
            res *= -1;
        }
        if (res < -(1LL << 31) || res > (1LL << 31) - 1) {
            return 0;
        }
        return static_cast<int>(res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    reverse(x) {
        const org = x;
        x = Math.abs(x);
        let res = parseInt(x.toString().split('').reverse().join(''));
        if (org < 0) {
            res *= -1;
        }
        if (res < -(2 ** 31) || res > (2 ** 31) - 1) {
            return 0;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int Reverse(int x) {
        int org = x;
        x = Math.Abs(x);
        char[] arr = x.ToString().ToCharArray();
        Array.Reverse(arr);
        
        long res = long.Parse(new string(arr)); 
        if (org < 0) {
            res *= -1; 
        }
        
        if (res < int.MinValue || res > int.MaxValue) {
            return 0; 
        }
        return (int)res; 
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$

---

## 2. Recursion

::tabs-start

```python
class Solution:
    def reverse(self, x: int) -> int:
        def rec(n: int, rev: int) -> int:
            if n == 0:
                return rev
            
            rev = rev * 10 + n % 10
            return rec(n // 10, rev)
        
        sign = -1 if x < 0 else 1
        x = abs(x)        
        reversed_num = rec(x, 0)
        reversed_num *= sign        
        if reversed_num < -(1 << 31) or reversed_num > (1 << 31) - 1:
            return 0
            
        return reversed_num
```

```java
public class Solution {
    public int reverse(int x) {
        long res = rec(Math.abs(x), 0) * (x < 0 ? -1 : 1);
        if (res < Integer.MIN_VALUE || res > Integer.MAX_VALUE) {
            return 0;
        }
        return (int) res;
    }

    private long rec(int n, long rev) {
        if (n == 0) {
            return rev;
        }
        rev = rev * 10 + n % 10;
        return rec(n / 10, rev);
    }
}
```

```cpp
class Solution {
public:
    int reverse(int x) {
        long res = rec(abs(x), 0) * (x < 0 ? -1 : 1);
        if (res < INT_MIN || res > INT_MAX) {
            return 0;
        }
        return (int)res;
    }

private:
    long rec(int n, long rev) {
        if (n == 0) {
            return rev;
        }
        rev = rev * 10 + n % 10;
        return rec(n / 10, rev);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} x
     * @return {number}
     */
    reverse(x) {
        let res = this.rec(Math.abs(x), 0) * (x < 0 ? -1 : 1);
        if (res < -(2 ** 31) || res > (2 ** 31) - 1) {
            return 0;
        }
        return res;
    }

    /**
     * @param {number} n
     * @param {number} rev
     * @return {number}
     */
    rec(n, rev) {
        if (n === 0) {
            return rev;
        }
        rev = rev * 10 + n % 10;
        return this.rec(Math.floor(n / 10), rev);
    }
}
```

```csharp
public class Solution {
    public int Reverse(int x) {
        long res = Rec(Math.Abs(x), 0) * (x < 0 ? -1 : 1);
        if (res < int.MinValue || res > int.MaxValue) {
            return 0;
        }
        return (int)res;
    }

    private long Rec(int n, long rev) {
        if (n == 0) {
            return rev;
        }
        rev = rev * 10 + n % 10;
        return Rec(n / 10, rev);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$

---

## 3. Iteration

::tabs-start

```python
class Solution:
    def reverse(self, x: int) -> int:
        MIN = -2147483648  # -2^31,
        MAX = 2147483647  #  2^31 - 1

        res = 0
        while x:
            digit = int(math.fmod(x, 10))
            x = int(x / 10)

            if res > MAX // 10 or (res == MAX // 10 and digit > MAX % 10):
                return 0
            if res < MIN // 10 or (res == MIN // 10 and digit < MIN % 10):
                return 0
            res = (res * 10) + digit

        return res
```

```java
public class Solution {
    public int reverse(int x) {
        final int MIN = -2147483648; // -2^31
        final int MAX = 2147483647;  // 2^31 - 1

        int res = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;

            if (res > MAX / 10 || (res == MAX / 10 && digit > MAX % 10))
                return 0;
            if (res < MIN / 10 || (res == MIN / 10 && digit < MIN % 10))
                return 0;
            res = (res * 10) + digit;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int reverse(int x) {
        const int MIN = -2147483648; // -2^31
        const int MAX = 2147483647;  // 2^31 - 1

        int res = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;

            if (res > MAX / 10 || (res == MAX / 10 && digit > MAX % 10))
                return 0;
            if (res < MIN / 10 || (res == MIN / 10 && digit < MIN % 10))
                return 0;
            res = (res * 10) + digit;
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
    reverse(x) {
        const MIN = -2147483648; // -2^31
        const MAX = 2147483647; // 2^31 - 1

        let res = 0;
        while (x !== 0) {
            const digit = x % 10;
            x = Math.trunc(x / 10);

            if (res > MAX / 10 || (res === MAX / 10 && digit > MAX % 10))
                return 0;
            if (res < MIN / 10 || (res === MIN / 10 && digit < MIN % 10))
                return 0;
            res = res * 10 + digit;
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int Reverse(int x) {
        const int MIN = -2147483648; // -2^31
        const int MAX = 2147483647;  // 2^31 - 1

        int res = 0;
        while (x != 0) {
            int digit = x % 10;
            x /= 10;

            if (res > MAX / 10 || (res == MAX / 10 && digit > MAX % 10))
                return 0;
            if (res < MIN / 10 || (res == MIN / 10 && digit < MIN % 10))
                return 0;
            res = (res * 10) + digit;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$
* Space complexity: $O(1)$