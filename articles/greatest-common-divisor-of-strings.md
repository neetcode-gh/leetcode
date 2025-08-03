## 1. Iteration

::tabs-start

```python
class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        len1, len2 = len(str1), len(str2)

        def isDivisor(l):
            if len1 % l != 0 or len2 % l != 0:
                return False
            f1, f2 = len1 // l, len2 // l
            return str1[:l] * f1 == str1 and str1[:l] * f2 == str2

        for l in range(min(len1, len2), 0, -1):
            if isDivisor(l):
                return str1[:l]

        return ""
```

```java
public class Solution {
    public String gcdOfStrings(String str1, String str2) {
        int len1 = str1.length(), len2 = str2.length();

        for (int l = Math.min(len1, len2); l > 0; l--) {
            if (isDivisor(l, len1, len2, str1, str2)) {
                return str1.substring(0, l);
            }
        }

        return "";
    }

    public boolean isDivisor(int l, int len1, int len2, String str1, String str2) {
        if (len1 % l != 0 || len2 % l != 0) {
            return false;
        }
        String sub = str1.substring(0, l);
        int f1 = len1 / l, f2 = len2 / l;
        return sub.repeat(f1).equals(str1) && sub.repeat(f2).equals(str2);
    }
}
```

```cpp
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        int len1 = str1.size(), len2 = str2.size();

        auto isDivisor = [&](int l) {
            if (len1 % l != 0 || len2 % l != 0) {
                return false;
            }
            string sub = str1.substr(0, l);
            int f1 = len1 / l, f2 = len2 / l;
            string repeated1 = "", repeated2 = "";
            for (int i = 0; i < f1; ++i) repeated1 += sub;
            for (int i = 0; i < f2; ++i) repeated2 += sub;
            return repeated1 == str1 && repeated2 == str2;
        };

        for (int l = min(len1, len2); l > 0; l--) {
            if (isDivisor(l)) {
                return str1.substr(0, l);
            }
        }

        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    gcdOfStrings(str1, str2) {
        const len1 = str1.length,
            len2 = str2.length;

        const isDivisor = (l) => {
            if (len1 % l !== 0 || len2 % l !== 0) {
                return false;
            }
            const sub = str1.slice(0, l);
            const f1 = len1 / l,
                f2 = len2 / l;
            return sub.repeat(f1) === str1 && sub.repeat(f2) === str2;
        };

        for (let l = Math.min(len1, len2); l > 0; l--) {
            if (isDivisor(l)) {
                return str1.slice(0, l);
            }
        }

        return '';
    }
}
```

```csharp
public class Solution {
    public string GcdOfStrings(string str1, string str2) {
        int len1 = str1.Length, len2 = str2.Length;

        bool IsDivisor(int l) {
            if (len1 % l != 0 || len2 % l != 0) return false;

            int f1 = len1 / l, f2 = len2 / l;
            string baseStr = str1.Substring(0, l);
            return new StringBuilder().Insert(0, baseStr, f1).ToString() == str1 &&
                   new StringBuilder().Insert(0, baseStr, f2).ToString() == str2;
        }

        for (int l = Math.Min(len1, len2); l >= 1; l--) {
            if (IsDivisor(l)) {
                return str1.Substring(0, l);
            }
        }

        return "";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n) * (m + n))$
- Space complexity: $O(m + n)$

> Where $m$ and $n$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 2. Iteration (Space Optimized)

::tabs-start

```python
class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        m, n = len(str1), len(str2)
        if m < n:
            m, n = n, m
            str1, str2 = str2, str1

        for l in range(n, 0, -1):
            if m % l != 0 or n % l != 0:
                continue

            valid = True
            for i in range(m):
                if str1[i] != str2[i % l]:
                    valid = False
                    break
            if not valid: continue

            for i in range(l, n):
                if str2[i] != str2[i % l]:
                    valid = False
                    break
            if valid: return str2[:l]

        return ""
```

```java
public class Solution {
    public String gcdOfStrings(String str1, String str2) {
        int m = str1.length(), n = str2.length();
        if (m < n) {
            String temp = str1;
            str1 = str2;
            str2 = temp;
            int tempLen = m;
            m = n;
            n = tempLen;
        }

        for (int l = n; l > 0; l--) {
            if (m % l != 0 || n % l != 0) {
                continue;
            }

            boolean valid = true;
            for (int i = 0; i < m; i++) {
                if (str1.charAt(i) != str2.charAt(i % l)) {
                    valid = false;
                    break;
                }
            }
            if (!valid) continue;

            for (int i = l; i < n; i++) {
                if (str2.charAt(i) != str2.charAt(i % l)) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return str2.substring(0, l);
            }
        }

        return "";
    }
}
```

```cpp
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        int m = str1.size(), n = str2.size();
        if (m < n) {
            swap(m, n);
            swap(str1, str2);
        }

        for (int l = n; l > 0; l--) {
            if (m % l != 0 || n % l != 0) {
                continue;
            }

            bool valid = true;
            for (int i = 0; i < m; i++) {
                if (str1[i] != str2[i % l]) {
                    valid = false;
                    break;
                }
            }
            if (!valid) continue;

            for (int i = l; i < n; i++) {
                if (str2[i] != str2[i % l]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return str2.substr(0, l);
            }
        }

        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    gcdOfStrings(str1, str2) {
        let m = str1.length,
            n = str2.length;
        if (m < n) {
            [m, n] = [n, m];
            [str1, str2] = [str2, str1];
        }

        for (let l = n; l > 0; l--) {
            if (m % l !== 0 || n % l !== 0) {
                continue;
            }

            let valid = true;
            for (let i = 0; i < m; i++) {
                if (str1[i] !== str2[i % l]) {
                    valid = false;
                    break;
                }
            }
            if (!valid) continue;

            for (let i = l; i < n; i++) {
                if (str2[i] !== str2[i % l]) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                return str2.slice(0, l);
            }
        }

        return '';
    }
}
```

```csharp
public class Solution {
    public string GcdOfStrings(string str1, string str2) {
        int m = str1.Length, n = str2.Length;
        if (m < n) {
            (str1, str2) = (str2, str1);
            (m, n) = (n, m);
        }

        for (int l = n; l >= 1; l--) {
            if (m % l != 0 || n % l != 0) continue;

            bool valid = true;
            for (int i = 0; i < m; i++) {
                if (str1[i] != str2[i % l]) {
                    valid = false;
                    break;
                }
            }
            if (!valid) continue;

            for (int i = l; i < n; i++) {
                if (str2[i] != str2[i % l]) {
                    valid = false;
                    break;
                }
            }

            if (valid) return str2.Substring(0, l);
        }

        return "";
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(min(m, n) * (m + n))$
- Space complexity: $O(g)$ for the output string.

> Where $m$ is the length of the string $str1$, $n$ is the length of the string $str2$, and $g$ is the length of the output string.

---

## 3. Greatest Common Divisor

::tabs-start

```python
class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        if str1 + str2 != str2 + str1:
            return ""

        g = gcd(len(str1), len(str2))
        return str1[:g]
```

```java
public class Solution {
    public String gcdOfStrings(String str1, String str2) {
        if (!(str1 + str2).equals(str2 + str1)) {
            return "";
        }
        int g = gcd(str1.length(), str2.length());
        return str1.substring(0, g);
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        if (str1 + str2 != str2 + str1) {
            return "";
        }
        int g = __gcd((int)str1.size(), (int)str2.size());
        return str1.substr(0, g);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    gcdOfStrings(str1, str2) {
        if (str1 + str2 !== str2 + str1) {
            return '';
        }
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const g = gcd(str1.length, str2.length);
        return str1.slice(0, g);
    }
}
```

```csharp
public class Solution {
    public string GcdOfStrings(string str1, string str2) {
        if (str1 + str2 != str2 + str1) {
            return "";
        }

        int g = GCD(str1.Length, str2.Length);
        return str1.Substring(0, g);
    }

    private int GCD(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m + n)$.

> Where $m$ and $n$ are the lengths of the strings $str1$ and $str2$ respectively.

---

## 4. Greatest Common Divisor (Space Optimized)

::tabs-start

```python
class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        g = gcd(len(str1), len(str2))

        if all(str1[i] == str1[i % g] for i in range(len(str1))) and \
           all(str2[i] == str1[i % g] for i in range(len(str2))):
            return str1[:g]
        return ""
```

```java
public class Solution {
    public String gcdOfStrings(String str1, String str2) {
        int g = gcd(str1.length(), str2.length());

        for (int i = 0; i < str1.length(); i++) {
            if (str1.charAt(i) != str1.charAt(i % g)) {
                return "";
            }
        }

        for (int i = 0; i < str2.length(); i++) {
            if (str2.charAt(i) != str1.charAt(i % g)) {
                return "";
            }
        }

        return str1.substring(0, g);
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    string gcdOfStrings(string str1, string str2) {
        int g = __gcd((int)str1.size(), (int)str2.size());

        for (int i = 0; i < str1.size(); i++) {
            if (str1[i] != str1[i % g]) {
                return "";
            }
        }

        for (int i = 0; i < str2.size(); i++) {
            if (str2[i] != str1[i % g]) {
                return "";
            }
        }

        return str1.substr(0, g);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} str1
     * @param {string} str2
     * @return {string}
     */
    gcdOfStrings(str1, str2) {
        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
        const g = gcd(str1.length, str2.length);

        for (let i = 0; i < str1.length; i++) {
            if (str1[i] !== str1[i % g]) {
                return '';
            }
        }

        for (let i = 0; i < str2.length; i++) {
            if (str2[i] !== str1[i % g]) {
                return '';
            }
        }

        return str1.slice(0, g);
    }
}
```

```csharp
public class Solution {
    public string GcdOfStrings(string str1, string str2) {
        int g = GCD(str1.Length, str2.Length);

        for (int i = 0; i < str1.Length; i++) {
            if (str1[i] != str1[i % g]) {
                return "";
            }
        }

        for (int i = 0; i < str2.Length; i++) {
            if (str2[i] != str1[i % g]) {
                return "";
            }
        }

        return str1.Substring(0, g);
    }

    private int GCD(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(g)$ for the output string.

> Where $m$ is the length of the string $str1$, $n$ is the length of the string $str2$, and $g$ is the GCD of $m$ and $n$.
