## 1. Iteration

### Intuition

Adding binary numbers works just like adding decimal numbers by hand, except we only have digits 0 and 1. We start from the rightmost digits (least significant bits) and add corresponding digits along with any carry from the previous position. If the sum is 2 or more, we carry 1 to the next position. We reverse both strings first to make indexing from the right easier, then build the result and reverse it at the end.

### Algorithm

1. Reverse both input strings for easier right-to-left processing.
2. Initialize `carry = 0` and an empty result string.
3. For each position from 0 to the maximum length of the two strings:
   - Get the digit from each string (0 if past the string's length).
   - Calculate `total = digitA + digitB + carry`.
   - Append `total % 2` to the result.
   - Update `carry = total / 2`.
4. If carry remains, append "1".
5. Reverse the result string and return.

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

```go
func addBinary(a string, b string) string {
    res := []byte{}
    carry := 0

    aBytes := []byte(a)
    bBytes := []byte(b)
    for i, j := 0, len(aBytes)-1; i < j; i, j = i+1, j-1 {
        aBytes[i], aBytes[j] = aBytes[j], aBytes[i]
    }
    for i, j := 0, len(bBytes)-1; i < j; i, j = i+1, j-1 {
        bBytes[i], bBytes[j] = bBytes[j], bBytes[i]
    }

    n := len(aBytes)
    if len(bBytes) > n {
        n = len(bBytes)
    }

    for i := 0; i < n; i++ {
        digitA := 0
        digitB := 0
        if i < len(aBytes) {
            digitA = int(aBytes[i] - '0')
        }
        if i < len(bBytes) {
            digitB = int(bBytes[i] - '0')
        }

        total := digitA + digitB + carry
        res = append(res, byte(total%2)+'0')
        carry = total / 2
    }

    if carry > 0 {
        res = append(res, '1')
    }

    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun addBinary(a: String, b: String): String {
        val res = StringBuilder()
        var carry = 0

        val sa = a.reversed()
        val sb = b.reversed()

        for (i in 0 until maxOf(sa.length, sb.length)) {
            val digitA = if (i < sa.length) sa[i] - '0' else 0
            val digitB = if (i < sb.length) sb[i] - '0' else 0

            val total = digitA + digitB + carry
            res.append((total % 2))
            carry = total / 2
        }

        if (carry > 0) {
            res.append('1')
        }

        return res.reverse().toString()
    }
}
```

```swift
class Solution {
    func addBinary(_ a: String, _ b: String) -> String {
        var res = ""
        var carry = 0

        let aArr = Array(a.reversed())
        let bArr = Array(b.reversed())

        for i in 0..<max(aArr.count, bArr.count) {
            let digitA = i < aArr.count ? Int(String(aArr[i]))! : 0
            let digitB = i < bArr.count ? Int(String(bArr[i]))! : 0

            let total = digitA + digitB + carry
            res = String(total % 2) + res
            carry = total / 2
        }

        if carry > 0 {
            res = "1" + res
        }

        return res
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

### Intuition

Instead of reversing the strings upfront, we can use two pointers starting at the end of each string and work backward. This avoids the extra space and time needed to reverse the input strings. We continue until both pointers have moved past the beginning of their strings and no carry remains. The result is built in reverse order, so we reverse it once at the end.

### Algorithm

1. Initialize pointers `i` and `j` at the last index of strings `a` and `b`.
2. Initialize `carry = 0` and an empty result list.
3. While `i >= 0` or `j >= 0` or `carry > 0`:
   - Get the digit at position `i` in `a` (0 if `i < 0`).
   - Get the digit at position `j` in `b` (0 if `j < 0`).
   - Calculate `total = digitA + digitB + carry`.
   - Append `total % 2` to the result.
   - Update `carry = total / 2`.
   - Decrement both `i` and `j`.
4. Reverse the result and return as a string.

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

```go
func addBinary(a string, b string) string {
    res := []byte{}
    carry := 0

    i, j := len(a)-1, len(b)-1
    for i >= 0 || j >= 0 || carry > 0 {
        digitA := 0
        digitB := 0
        if i >= 0 {
            digitA = int(a[i] - '0')
        }
        if j >= 0 {
            digitB = int(b[j] - '0')
        }

        total := digitA + digitB + carry
        res = append(res, byte(total%2)+'0')
        carry = total / 2

        i--
        j--
    }

    for l, r := 0, len(res)-1; l < r; l, r = l+1, r-1 {
        res[l], res[r] = res[r], res[l]
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun addBinary(a: String, b: String): String {
        val res = StringBuilder()
        var carry = 0

        var i = a.length - 1
        var j = b.length - 1
        while (i >= 0 || j >= 0 || carry > 0) {
            val digitA = if (i >= 0) a[i] - '0' else 0
            val digitB = if (j >= 0) b[j] - '0' else 0

            val total = digitA + digitB + carry
            res.append(total % 2)
            carry = total / 2

            i--
            j--
        }

        return res.reverse().toString()
    }
}
```

```swift
class Solution {
    func addBinary(_ a: String, _ b: String) -> String {
        var res = [Character]()
        var carry = 0

        let aArr = Array(a)
        let bArr = Array(b)
        var i = aArr.count - 1
        var j = bArr.count - 1

        while i >= 0 || j >= 0 || carry > 0 {
            let digitA = i >= 0 ? Int(String(aArr[i]))! : 0
            let digitB = j >= 0 ? Int(String(bArr[j]))! : 0

            let total = digitA + digitB + carry
            res.append(Character(String(total % 2)))
            carry = total / 2

            i -= 1
            j -= 1
        }

        return String(res.reversed())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(max(m, n))$
- Space complexity: $O(max(m, n))$

> Where $m$ and $n$ are the lengths of the strings $a$ and $b$ respectively.
