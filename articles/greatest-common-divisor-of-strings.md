## Prerequisites
Before attempting this problem, you should be comfortable with:
- **GCD (Greatest Common Divisor)** - Understanding and implementing the Euclidean algorithm
- **String Manipulation** - Working with substrings, concatenation, and repetition
- **Modular Arithmetic** - Using modulo operations for cyclic indexing and divisibility checks

---

## 1. Iteration

### Intuition

A string `t` divides both `str1` and `str2` only if its length divides both string lengths and repeating `t` the appropriate number of times reconstructs each string. We search for the longest such divisor by checking all possible lengths from the minimum length down to `1`.

### Algorithm

1. For each possible length `l` from `min(len1, len2)` down to `1`:
   - Check if `l` divides both `len1` and `len2`.
   - Extract the prefix `str1[:l]` as the candidate divisor.
   - Check if repeating this prefix `len1/l` times equals `str1` and `len2/l` times equals `str2`.
2. Return the first valid prefix found.
3. If no valid divisor exists, return an empty string.

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

```go
func gcdOfStrings(str1 string, str2 string) string {
    len1, len2 := len(str1), len(str2)

    isDivisor := func(l int) bool {
        if len1%l != 0 || len2%l != 0 {
            return false
        }
        f1, f2 := len1/l, len2/l
        sub := str1[:l]
        repeated1, repeated2 := "", ""
        for i := 0; i < f1; i++ {
            repeated1 += sub
        }
        for i := 0; i < f2; i++ {
            repeated2 += sub
        }
        return repeated1 == str1 && repeated2 == str2
    }

    minLen := len1
    if len2 < minLen {
        minLen = len2
    }
    for l := minLen; l > 0; l-- {
        if isDivisor(l) {
            return str1[:l]
        }
    }

    return ""
}
```

```kotlin
class Solution {
    fun gcdOfStrings(str1: String, str2: String): String {
        val len1 = str1.length
        val len2 = str2.length

        fun isDivisor(l: Int): Boolean {
            if (len1 % l != 0 || len2 % l != 0) return false
            val f1 = len1 / l
            val f2 = len2 / l
            val sub = str1.substring(0, l)
            return sub.repeat(f1) == str1 && sub.repeat(f2) == str2
        }

        for (l in minOf(len1, len2) downTo 1) {
            if (isDivisor(l)) {
                return str1.substring(0, l)
            }
        }

        return ""
    }
}
```

```swift
class Solution {
    func gcdOfStrings(_ str1: String, _ str2: String) -> String {
        let len1 = str1.count
        let len2 = str2.count
        let arr1 = Array(str1)
        let arr2 = Array(str2)

        func isDivisor(_ l: Int) -> Bool {
            if len1 % l != 0 || len2 % l != 0 { return false }
            let f1 = len1 / l
            let f2 = len2 / l
            let sub = String(arr1[0..<l])
            return String(repeating: sub, count: f1) == str1 &&
                   String(repeating: sub, count: f2) == str2
        }

        for l in stride(from: min(len1, len2), through: 1, by: -1) {
            if isDivisor(l) {
                return String(arr1[0..<l])
            }
        }

        return ""
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

### Intuition

Instead of constructing repeated strings and comparing them (which uses extra space), we can validate a candidate divisor by checking character-by-character using modular indexing. Each character at position `i` should match the character at position `i % l` in the candidate prefix.

### Algorithm

1. Ensure `str1` is the longer string by swapping if necessary.
2. For each possible length `l` from `n` down to `1`:
   - Check if `l` divides both lengths.
   - Verify that `str1[i] == str2[i % l]` for all positions in `str1`.
   - Verify that `str2[i] == str2[i % l]` for positions from `l` to `n`.
3. Return the prefix `str2[:l]` if all checks pass.
4. Return an empty string if no valid divisor exists.

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

```go
func gcdOfStrings(str1 string, str2 string) string {
    m, n := len(str1), len(str2)
    if m < n {
        m, n = n, m
        str1, str2 = str2, str1
    }

    for l := n; l > 0; l-- {
        if m%l != 0 || n%l != 0 {
            continue
        }

        valid := true
        for i := 0; i < m; i++ {
            if str1[i] != str2[i%l] {
                valid = false
                break
            }
        }
        if !valid {
            continue
        }

        for i := l; i < n; i++ {
            if str2[i] != str2[i%l] {
                valid = false
                break
            }
        }

        if valid {
            return str2[:l]
        }
    }

    return ""
}
```

```kotlin
class Solution {
    fun gcdOfStrings(str1: String, str2: String): String {
        var s1 = str1
        var s2 = str2
        var m = s1.length
        var n = s2.length
        if (m < n) {
            s1 = str2.also { s2 = str1 }
            m = n.also { n = m }
        }

        for (l in n downTo 1) {
            if (m % l != 0 || n % l != 0) continue

            var valid = true
            for (i in 0 until m) {
                if (s1[i] != s2[i % l]) {
                    valid = false
                    break
                }
            }
            if (!valid) continue

            for (i in l until n) {
                if (s2[i] != s2[i % l]) {
                    valid = false
                    break
                }
            }

            if (valid) return s2.substring(0, l)
        }

        return ""
    }
}
```

```swift
class Solution {
    func gcdOfStrings(_ str1: String, _ str2: String) -> String {
        var s1 = Array(str1)
        var s2 = Array(str2)
        var m = s1.count
        var n = s2.count
        if m < n {
            swap(&s1, &s2)
            swap(&m, &n)
        }

        for l in stride(from: n, through: 1, by: -1) {
            if m % l != 0 || n % l != 0 { continue }

            var valid = true
            for i in 0..<m {
                if s1[i] != s2[i % l] {
                    valid = false
                    break
                }
            }
            if !valid { continue }

            for i in l..<n {
                if s2[i] != s2[i % l] {
                    valid = false
                    break
                }
            }

            if valid { return String(s2[0..<l]) }
        }

        return ""
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

### Intuition

If a common divisor string exists, then concatenating the two strings in either order must produce the same result: `str1 + str2 == str2 + str1`. This is because both strings are built from the same repeating pattern. Once verified, the GCD of the two string lengths gives us the length of the largest common divisor.

### Algorithm

1. Check if `str1 + str2 == str2 + str1`. If not, return an empty string.
2. Compute `g = gcd(len(str1), len(str2))`.
3. Return the prefix `str1[:g]`.

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

```go
func gcdOfStrings(str1 string, str2 string) string {
    if str1+str2 != str2+str1 {
        return ""
    }
    var gcd func(a, b int) int
    gcd = func(a, b int) int {
        if b == 0 {
            return a
        }
        return gcd(b, a%b)
    }
    return str1[:gcd(len(str1), len(str2))]
}
```

```kotlin
class Solution {
    fun gcdOfStrings(str1: String, str2: String): String {
        if (str1 + str2 != str2 + str1) {
            return ""
        }
        fun gcd(a: Int, b: Int): Int = if (b == 0) a else gcd(b, a % b)
        return str1.substring(0, gcd(str1.length, str2.length))
    }
}
```

```swift
class Solution {
    func gcdOfStrings(_ str1: String, _ str2: String) -> String {
        if str1 + str2 != str2 + str1 {
            return ""
        }
        func gcd(_ a: Int, _ b: Int) -> Int {
            return b == 0 ? a : gcd(b, a % b)
        }
        let g = gcd(str1.count, str2.count)
        return String(str1.prefix(g))
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

### Intuition

We can avoid the concatenation check (which requires O(m+n) space) by directly validating the divisor property. Compute the GCD of the lengths, then verify that every character in both strings matches the corresponding character in the first `g` characters, using modular indexing.

### Algorithm

1. Compute `g = gcd(len(str1), len(str2))`.
2. For each index `i` in `str1`, verify `str1[i] == str1[i % g]`.
3. For each index `i` in `str2`, verify `str2[i] == str1[i % g]`.
4. If all checks pass, return `str1[:g]`.
5. Otherwise, return an empty string.

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

```go
func gcdOfStrings(str1 string, str2 string) string {
    var gcd func(a, b int) int
    gcd = func(a, b int) int {
        if b == 0 {
            return a
        }
        return gcd(b, a%b)
    }
    g := gcd(len(str1), len(str2))

    for i := 0; i < len(str1); i++ {
        if str1[i] != str1[i%g] {
            return ""
        }
    }

    for i := 0; i < len(str2); i++ {
        if str2[i] != str1[i%g] {
            return ""
        }
    }

    return str1[:g]
}
```

```kotlin
class Solution {
    fun gcdOfStrings(str1: String, str2: String): String {
        fun gcd(a: Int, b: Int): Int = if (b == 0) a else gcd(b, a % b)
        val g = gcd(str1.length, str2.length)

        for (i in str1.indices) {
            if (str1[i] != str1[i % g]) {
                return ""
            }
        }

        for (i in str2.indices) {
            if (str2[i] != str1[i % g]) {
                return ""
            }
        }

        return str1.substring(0, g)
    }
}
```

```swift
class Solution {
    func gcdOfStrings(_ str1: String, _ str2: String) -> String {
        func gcd(_ a: Int, _ b: Int) -> Int {
            return b == 0 ? a : gcd(b, a % b)
        }
        let g = gcd(str1.count, str2.count)
        let s1 = Array(str1)
        let s2 = Array(str2)

        for i in 0..<s1.count {
            if s1[i] != s1[i % g] {
                return ""
            }
        }

        for i in 0..<s2.count {
            if s2[i] != s1[i % g] {
                return ""
            }
        }

        return String(s1[0..<g])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(g)$ for the output string.

> Where $m$ is the length of the string $str1$, $n$ is the length of the string $str2$, and $g$ is the GCD of $m$ and $n$.

---

## Common Pitfalls

### Skipping the Concatenation Check

The key insight is that if a common divisor string exists, then `str1 + str2` must equal `str2 + str1`. Skipping this check and directly returning `str1[:gcd(len1, len2)]` will produce wrong answers for cases where no valid divisor exists, such as `str1 = "LEET"` and `str2 = "CODE"`.

### Confusing GCD of Lengths with GCD of Strings

The GCD of the string lengths tells you the candidate divisor length, but it does not guarantee that the prefix of that length actually divides both strings. You must verify that the candidate pattern repeats correctly to form both original strings, either through the concatenation check or by explicitly validating the pattern.
