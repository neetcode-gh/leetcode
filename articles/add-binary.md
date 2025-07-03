## 1. Iteration

::tabs-start

```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        res = ""
        carry = 0

        a, b = a[::-1], b[::-1]
        for i in range(max(len(a), len(b))):
            digitA = ord(a[i]) - ord("0") if i < len(a) else 0
            digitB = ord(b[i]) - ord("0") if i < len(b) else 0

            total = digitA + digitB + carry
            char = str(total % 2)
            res = char + res
            carry = total // 2

        if carry:
            res = "1" + res

        return res
```

```java
public class Solution {
    public String addBinary(String a, String b) {
        StringBuilder res = new StringBuilder();
        int carry = 0;

        StringBuilder sa = new StringBuilder(a).reverse();
        StringBuilder sb = new StringBuilder(b).reverse();

        for (int i = 0; i < Math.max(sa.length(), sb.length()); i++) {
            int digitA = i < sa.length() ? sa.charAt(i) - '0' : 0;
            int digitB = i < sb.length() ? sb.charAt(i) - '0' : 0;

            int total = digitA + digitB + carry;
            char c = (char)((total % 2) + '0');
            res.append(c);
            carry = total / 2;
        }

        if (carry > 0) {
            res.append('1');
        }

        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string addBinary(string a, string b) {
        string res = "";
        int carry = 0;

        reverse(a.begin(), a.end());
        reverse(b.begin(), b.end());

        for (int i = 0; i < max(a.length(), b.length()); i++) {
            int digitA = i < a.length() ? a[i] - '0' : 0;
            int digitB = i < b.length() ? b[i] - '0' : 0;

            int total = digitA + digitB + carry;
            char c = (total % 2) + '0';
            res += c;
            carry = total / 2;
        }

        if (carry) {
            res += '1';
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} a
     * @param {string} b
     * @return {string}
     */
    addBinary(a, b) {
        let res = [];
        let carry = 0;

        a = a.split('').reverse().join('');
        b = b.split('').reverse().join('');

        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            const digitA = i < a.length ? a[i] - '0' : 0;
            const digitB = i < b.length ? b[i] - '0' : 0;

            const total = digitA + digitB + carry;
            const char = (total % 2).toString();
            res.push(char);
            carry = Math.floor(total / 2);
        }

        if (carry) {
            res.push('1');
        }
        res.reverse();
        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string AddBinary(string a, string b) {
        StringBuilder res = new StringBuilder();
        int carry = 0;

        char[] sa = a.ToCharArray();
        char[] sb = b.ToCharArray();
        Array.Reverse(sa);
        Array.Reverse(sb);

        int n = Math.Max(sa.Length, sb.Length);

        for (int i = 0; i < n; i++) {
            int digitA = i < sa.Length ? sa[i] - '0' : 0;
            int digitB = i < sb.Length ? sb[i] - '0' : 0;

            int total = digitA + digitB + carry;
            res.Append((char)((total % 2) + '0'));
            carry = total / 2;
        }

        if (carry > 0) {
            res.Append('1');
        }

        char[] resultArray = res.ToString().ToCharArray();
        Array.Reverse(resultArray);
        return new string(resultArray);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(max(m, n))$
- Space complexity: $O(m + n)$

> Where $m$ and $n$ are the lengths of the strings $a$ and $b$ respectively.

---

## 2. Iteration (Optimal)

::tabs-start

```python
class Solution:
    def addBinary(self, a: str, b: str) -> str:
        res = []
        carry = 0

        i, j = len(a) - 1, len(b) - 1
        while i >= 0 or j >= 0 or carry > 0:
            digitA = int(a[i]) if i >= 0 else 0
            digitB = int(b[j]) if j >= 0 else 0

            total = digitA + digitB + carry
            res.append(total % 2)
            carry = total // 2

            i -= 1
            j -= 1

        res.reverse()
        return ''.join(map(str, res))
```

```java
public class Solution {
    public String addBinary(String a, String b) {
        StringBuilder res = new StringBuilder();
        int carry = 0;

        int i = a.length() - 1, j = b.length() - 1;
        while (i >= 0 || j >= 0 || carry > 0) {
            int digitA = i >= 0 ? a.charAt(i) - '0' : 0;
            int digitB = j >= 0 ? b.charAt(j) - '0' : 0;

            int total = digitA + digitB + carry;
            res.append(total % 2);
            carry = total / 2;

            i--;
            j--;
        }

        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string addBinary(string a, string b) {
        string res = "";
        int carry = 0;

        int i = a.size() - 1, j = b.size() - 1;
        while (i >= 0 || j >= 0 || carry > 0) {
            int digitA = i >= 0 ? a[i] - '0' : 0;
            int digitB = j >= 0 ? b[j] - '0' : 0;

            int total = digitA + digitB + carry;
            res += (total % 2) + '0';
            carry = total / 2;

            i--;
            j--;
        }

        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} a
     * @param {string} b
     * @return {string}
     */
    addBinary(a, b) {
        let res = [];
        let carry = 0;

        let i = a.length - 1,
            j = b.length - 1;
        while (i >= 0 || j >= 0 || carry > 0) {
            const digitA = i >= 0 ? a[i] - '0' : 0;
            const digitB = j >= 0 ? b[j] - '0' : 0;

            const total = digitA + digitB + carry;
            res.push(total % 2);
            carry = Math.floor(total / 2);

            i--;
            j--;
        }
        res.reverse();
        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string AddBinary(string a, string b) {
        StringBuilder res = new StringBuilder();
        int carry = 0;

        int i = a.Length - 1, j = b.Length - 1;
        while (i >= 0 || j >= 0 || carry > 0) {
            int digitA = i >= 0 ? a[i] - '0' : 0;
            int digitB = j >= 0 ? b[j] - '0' : 0;

            int total = digitA + digitB + carry;
            res.Append(total % 2);
            carry = total / 2;

            i--;
            j--;
        }

        char[] resultArray = res.ToString().ToCharArray();
        Array.Reverse(resultArray);
        return new string(resultArray);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(max(m, n))$
- Space complexity: $O(max(m, n))$

> Where $m$ and $n$ are the lengths of the strings $a$ and $b$ respectively.
