## 1. Brute Force

::tabs-start

```python
class Solution:
    def minFlips(self, s: str) -> int:
        res = n = len(s)
        alt1, alt2 = [], []
        for i in range(n):
            alt1.append("0" if i % 2 == 0 else "1")
            alt2.append("1" if i % 2 == 0 else "0")

        def diff(A, B):
            cnt = 0
            for i in range(n):
                cnt += 1 if (A[i] != B[i]) else 0
            return cnt

        for i in range(n):
            newS = s[i:] + s[:i]
            res = min(res, min(diff(alt1, newS), diff(alt2, newS)))
        return res
```

```java
public class Solution {
    public int minFlips(String s) {
        int n = s.length(), res = n;
        StringBuilder alt1 = new StringBuilder();
        StringBuilder alt2 = new StringBuilder();

        for (int i = 0; i < n; i++) {
            alt1.append(i % 2 == 0 ? '0' : '1');
            alt2.append(i % 2 == 0 ? '1' : '0');
        }

        for (int i = 0; i < n; i++) {
            String newS = s.substring(i) + s.substring(0, i);
            res = Math.min(res, Math.min(diff(alt1, newS), diff(alt2, newS)));
        }

        return res;
    }

    private int diff(StringBuilder a, String b) {
        int cnt = 0;
        for (int i = 0; i < a.length(); i++) {
            if (a.charAt(i) != b.charAt(i)) cnt++;
        }
        return cnt;
    }
}
```

```cpp
class Solution {
public:
    int minFlips(string s) {
        int n = s.size(), res = n;
        string alt1, alt2;

        for (int i = 0; i < n; i++) {
            alt1 += (i % 2 == 0) ? '0' : '1';
            alt2 += (i % 2 == 0) ? '1' : '0';
        }

        for (int i = 0; i < n; i++) {
            string newS = s.substr(i) + s.substr(0, i);
            res = min(res, min(diff(alt1, newS), diff(alt2, newS)));
        }

        return res;
    }

private:
    int diff(const string &a, const string &b) {
        int cnt = 0;
        for (int i = 0; i < a.size(); i++) {
            if (a[i] != b[i]) cnt++;
        }
        return cnt;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlips(s) {
        const n = s.length;
        let res = n;
        let alt1 = '',
            alt2 = '';

        for (let i = 0; i < n; i++) {
            alt1 += i % 2 === 0 ? '0' : '1';
            alt2 += i % 2 === 0 ? '1' : '0';
        }

        const diff = (a, b) => {
            let cnt = 0;
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) cnt++;
            }
            return cnt;
        };

        for (let i = 0; i < n; i++) {
            const newS = s.slice(i) + s.slice(0, i);
            res = Math.min(res, Math.min(diff(alt1, newS), diff(alt2, newS)));
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFlips(string s) {
        int n = s.Length, res = n;
        string alt1 = "", alt2 = "";

        for (int i = 0; i < n; i++) {
            alt1 += i % 2 == 0 ? '0' : '1';
            alt2 += i % 2 == 0 ? '1' : '0';
        }

        for (int i = 0; i < n; i++) {
            string newS = s.Substring(i) + s.Substring(0, i);
            res = Math.Min(res, Math.Min(Diff(alt1, newS), Diff(alt2, newS)));
        }

        return res;
    }

    private int Diff(string a, string b) {
        int cnt = 0;
        for (int i = 0; i < a.Length; i++) {
            if (a[i] != b[i]) cnt++;
        }
        return cnt;
    }
}
```

```go
func minFlips(s string) int {
    n := len(s)
    res := n
    alt1, alt2 := "", ""

    for i := 0; i < n; i++ {
        if i%2 == 0 {
            alt1 += "0"
            alt2 += "1"
        } else {
            alt1 += "1"
            alt2 += "0"
        }
    }

    diff := func(a, b string) int {
        cnt := 0
        for i := 0; i < len(a); i++ {
            if a[i] != b[i] {
                cnt++
            }
        }
        return cnt
    }

    for i := 0; i < n; i++ {
        newS := s[i:] + s[:i]
        res = min(res, min(diff(alt1, newS), diff(alt2, newS)))
    }

    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minFlips(s: String): Int {
        val n = s.length
        var res = n
        var alt1 = StringBuilder()
        var alt2 = StringBuilder()

        for (i in 0 until n) {
            alt1.append(if (i % 2 == 0) '0' else '1')
            alt2.append(if (i % 2 == 0) '1' else '0')
        }

        fun diff(a: String, b: String): Int {
            var cnt = 0
            for (i in a.indices) {
                if (a[i] != b[i]) cnt++
            }
            return cnt
        }

        for (i in 0 until n) {
            val newS = s.substring(i) + s.substring(0, i)
            res = minOf(res, minOf(diff(alt1.toString(), newS), diff(alt2.toString(), newS)))
        }

        return res
    }
}
```

```swift
class Solution {
    func minFlips(_ s: String) -> Int {
        let n = s.count
        var res = n
        var alt1 = ""
        var alt2 = ""
        let chars = Array(s)

        for i in 0..<n {
            alt1 += i % 2 == 0 ? "0" : "1"
            alt2 += i % 2 == 0 ? "1" : "0"
        }

        func diff(_ a: String, _ b: String) -> Int {
            var cnt = 0
            let aArr = Array(a)
            let bArr = Array(b)
            for i in 0..<aArr.count {
                if aArr[i] != bArr[i] { cnt += 1 }
            }
            return cnt
        }

        for i in 0..<n {
            let newS = String(chars[i...]) + String(chars[..<i])
            res = min(res, min(diff(alt1, newS), diff(alt2, newS)))
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Brute Force (Space Optimized)

::tabs-start

```python
class Solution:
    def minFlips(self, s: str) -> int:
        n = res = len(s)

        for i in range(n):
            start_0 = 1 if s[i] != '0' else 0
            start_1 = 1 if s[i] != '1' else 0
            c = '0'
            j = (i + 1) % n
            while j != i:
                start_1 += 1 if s[j] != c else 0
                start_0 += 1 if s[j] == c else 0
                c = '0' if c == '1' else '1'
                j = (j + 1) % n

            res = min(res, min(start_1, start_0))
        return res
```

```java
public class Solution {
    public int minFlips(String s) {
        int n = s.length();
        int res = n;

        for (int i = 0; i < n; i++) {
            int start0 = s.charAt(i) != '0' ? 1 : 0;
            int start1 = s.charAt(i) != '1' ? 1 : 0;
            char c = '0';
            int j = (i + 1) % n;

            while (j != i) {
                start1 += s.charAt(j) != c ? 1 : 0;
                start0 += s.charAt(j) == c ? 1 : 0;
                c = c == '1' ? '0' : '1';
                j = (j + 1) % n;
            }

            res = Math.min(res, Math.min(start1, start0));
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFlips(string s) {
        int n = s.size(), res = n;

        for (int i = 0; i < n; i++) {
            int start0 = (s[i] != '0') ? 1 : 0;
            int start1 = (s[i] != '1') ? 1 : 0;
            char c = '0';
            int j = (i + 1) % n;

            while (j != i) {
                start1 += (s[j] != c) ? 1 : 0;
                start0 += (s[j] == c) ? 1 : 0;
                c = (c == '1') ? '0' : '1';
                j = (j + 1) % n;
            }

            res = min(res, min(start1, start0));
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlips(s) {
        const n = s.length;
        let res = n;

        for (let i = 0; i < n; i++) {
            let start0 = s[i] !== '0' ? 1 : 0;
            let start1 = s[i] !== '1' ? 1 : 0;
            let c = '0';
            let j = (i + 1) % n;

            while (j !== i) {
                start1 += s[j] !== c ? 1 : 0;
                start0 += s[j] === c ? 1 : 0;
                c = c === '1' ? '0' : '1';
                j = (j + 1) % n;
            }

            res = Math.min(res, Math.min(start1, start0));
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFlips(string s) {
        int n = s.Length;
        int res = n;

        for (int i = 0; i < n; i++) {
            int start0 = s[i] != '0' ? 1 : 0;
            int start1 = s[i] != '1' ? 1 : 0;
            char c = '0';
            int j = (i + 1) % n;

            while (j != i) {
                start1 += s[j] != c ? 1 : 0;
                start0 += s[j] == c ? 1 : 0;
                c = c == '1' ? '0' : '1';
                j = (j + 1) % n;
            }

            res = Math.Min(res, Math.Min(start1, start0));
        }

        return res;
    }
}
```

```go
func minFlips(s string) int {
    n := len(s)
    res := n

    for i := 0; i < n; i++ {
        start0, start1 := 0, 0
        if s[i] != '0' {
            start0 = 1
        }
        if s[i] != '1' {
            start1 = 1
        }
        c := byte('0')
        j := (i + 1) % n

        for j != i {
            if s[j] != c {
                start1++
            }
            if s[j] == c {
                start0++
            }
            if c == '1' {
                c = '0'
            } else {
                c = '1'
            }
            j = (j + 1) % n
        }

        res = min(res, min(start1, start0))
    }

    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minFlips(s: String): Int {
        val n = s.length
        var res = n

        for (i in 0 until n) {
            var start0 = if (s[i] != '0') 1 else 0
            var start1 = if (s[i] != '1') 1 else 0
            var c = '0'
            var j = (i + 1) % n

            while (j != i) {
                start1 += if (s[j] != c) 1 else 0
                start0 += if (s[j] == c) 1 else 0
                c = if (c == '1') '0' else '1'
                j = (j + 1) % n
            }

            res = minOf(res, minOf(start1, start0))
        }

        return res
    }
}
```

```swift
class Solution {
    func minFlips(_ s: String) -> Int {
        let n = s.count
        var res = n
        let chars = Array(s)

        for i in 0..<n {
            var start0 = chars[i] != Character("0") ? 1 : 0
            var start1 = chars[i] != Character("1") ? 1 : 0
            var c: Character = "0"
            var j = (i + 1) % n

            while j != i {
                start1 += chars[j] != c ? 1 : 0
                start0 += chars[j] == c ? 1 : 0
                c = c == "1" ? "0" : "1"
                j = (j + 1) % n
            }

            res = min(res, min(start1, start0))
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 3. Sliding Window

::tabs-start

```python
class Solution:
    def minFlips(self, s: str) -> int:
        n = len(s)
        s = s + s
        alt1, alt2 = [], []
        for i in range(len(s)):
            alt1.append("0" if i % 2 == 0 else "1")
            alt2.append("1" if i % 2 == 0 else "0")

        res = len(s)
        diff1, diff2 = 0, 0
        l = 0

        for r in range(len(s)):
            if s[r] != alt1[r]:
                diff1 += 1
            if s[r] != alt2[r]:
                diff2 += 1

            if r - l + 1 > n:
                if s[l] != alt1[l]:
                    diff1 -= 1
                if s[l] != alt2[l]:
                    diff2 -= 1
                l += 1

            if r - l + 1 == n:
                res = min(res, diff1, diff2)

        return res
```

```java
public class Solution {
    public int minFlips(String s) {
        int n = s.length();
        s = s + s;
        StringBuilder alt1 = new StringBuilder();
        StringBuilder alt2 = new StringBuilder();

        for (int i = 0; i < s.length(); i++) {
            alt1.append(i % 2 == 0 ? '0' : '1');
            alt2.append(i % 2 == 0 ? '1' : '0');
        }

        int res = n, diff1 = 0, diff2 = 0, l = 0;

        for (int r = 0; r < s.length(); r++) {
            if (s.charAt(r) != alt1.charAt(r)) diff1++;
            if (s.charAt(r) != alt2.charAt(r)) diff2++;

            if (r - l + 1 > n) {
                if (s.charAt(l) != alt1.charAt(l)) diff1--;
                if (s.charAt(l) != alt2.charAt(l)) diff2--;
                l++;
            }

            if (r - l + 1 == n) {
                res = Math.min(res, Math.min(diff1, diff2));
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFlips(string s) {
        int n = s.size();
        s += s;
        string alt1, alt2;
        for (int i = 0; i < s.size(); i++) {
            alt1 += (i % 2 == 0) ? '0' : '1';
            alt2 += (i % 2 == 0) ? '1' : '0';
        }

        int res = n, diff1 = 0, diff2 = 0, l = 0;

        for (int r = 0; r < s.size(); r++) {
            if (s[r] != alt1[r]) diff1++;
            if (s[r] != alt2[r]) diff2++;

            if (r - l + 1 > n) {
                if (s[l] != alt1[l]) diff1--;
                if (s[l] != alt2[l]) diff2--;
                l++;
            }

            if (r - l + 1 == n) {
                res = min(res, min(diff1, diff2));
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlips(s) {
        const n = s.length;
        s = s + s;
        let alt1 = [],
            alt2 = [];

        for (let i = 0; i < s.length; i++) {
            alt1.push(i % 2 === 0 ? '0' : '1');
            alt2.push(i % 2 === 0 ? '1' : '0');
        }

        let res = n,
            diff1 = 0,
            diff2 = 0,
            l = 0;

        for (let r = 0; r < s.length; r++) {
            if (s[r] !== alt1[r]) diff1++;
            if (s[r] !== alt2[r]) diff2++;

            if (r - l + 1 > n) {
                if (s[l] !== alt1[l]) diff1--;
                if (s[l] !== alt2[l]) diff2--;
                l++;
            }

            if (r - l + 1 === n) {
                res = Math.min(res, diff1, diff2);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFlips(string s) {
        int n = s.Length;
        s = s + s;
        var alt1 = new char[s.Length];
        var alt2 = new char[s.Length];

        for (int i = 0; i < s.Length; i++) {
            alt1[i] = i % 2 == 0 ? '0' : '1';
            alt2[i] = i % 2 == 0 ? '1' : '0';
        }

        int res = n, diff1 = 0, diff2 = 0, l = 0;

        for (int r = 0; r < s.Length; r++) {
            if (s[r] != alt1[r]) diff1++;
            if (s[r] != alt2[r]) diff2++;

            if (r - l + 1 > n) {
                if (s[l] != alt1[l]) diff1--;
                if (s[l] != alt2[l]) diff2--;
                l++;
            }

            if (r - l + 1 == n) {
                res = Math.Min(res, Math.Min(diff1, diff2));
            }
        }

        return res;
    }
}
```

```go
func minFlips(s string) int {
    n := len(s)
    s = s + s
    alt1 := make([]byte, len(s))
    alt2 := make([]byte, len(s))

    for i := 0; i < len(s); i++ {
        if i%2 == 0 {
            alt1[i] = '0'
            alt2[i] = '1'
        } else {
            alt1[i] = '1'
            alt2[i] = '0'
        }
    }

    res, diff1, diff2, l := n, 0, 0, 0

    for r := 0; r < len(s); r++ {
        if s[r] != alt1[r] {
            diff1++
        }
        if s[r] != alt2[r] {
            diff2++
        }

        if r-l+1 > n {
            if s[l] != alt1[l] {
                diff1--
            }
            if s[l] != alt2[l] {
                diff2--
            }
            l++
        }

        if r-l+1 == n {
            res = min(res, min(diff1, diff2))
        }
    }

    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minFlips(s: String): Int {
        val n = s.length
        val doubled = s + s
        val alt1 = CharArray(doubled.length)
        val alt2 = CharArray(doubled.length)

        for (i in doubled.indices) {
            alt1[i] = if (i % 2 == 0) '0' else '1'
            alt2[i] = if (i % 2 == 0) '1' else '0'
        }

        var res = n
        var diff1 = 0
        var diff2 = 0
        var l = 0

        for (r in doubled.indices) {
            if (doubled[r] != alt1[r]) diff1++
            if (doubled[r] != alt2[r]) diff2++

            if (r - l + 1 > n) {
                if (doubled[l] != alt1[l]) diff1--
                if (doubled[l] != alt2[l]) diff2--
                l++
            }

            if (r - l + 1 == n) {
                res = minOf(res, minOf(diff1, diff2))
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minFlips(_ s: String) -> Int {
        let n = s.count
        let doubled = s + s
        let chars = Array(doubled)
        var alt1 = [Character](repeating: "0", count: chars.count)
        var alt2 = [Character](repeating: "0", count: chars.count)

        for i in 0..<chars.count {
            alt1[i] = i % 2 == 0 ? "0" : "1"
            alt2[i] = i % 2 == 0 ? "1" : "0"
        }

        var res = n, diff1 = 0, diff2 = 0, l = 0

        for r in 0..<chars.count {
            if chars[r] != alt1[r] { diff1 += 1 }
            if chars[r] != alt2[r] { diff2 += 1 }

            if r - l + 1 > n {
                if chars[l] != alt1[l] { diff1 -= 1 }
                if chars[l] != alt2[l] { diff2 -= 1 }
                l += 1
            }

            if r - l + 1 == n {
                res = min(res, min(diff1, diff2))
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Sliding Window (Space Optimized)

::tabs-start

```python
class Solution:
    def minFlips(self, s: str) -> int:
        res = n = len(s)
        diff1 = diff2 = l = 0

        rstart_0 = lstart_0 = '0'

        for r in range(2 * n):
            if s[r % n] != rstart_0:
                diff1 += 1
            if s[r % n] == rstart_0:
                diff2 += 1

            if r - l + 1 > n:
                if s[l] != lstart_0:
                    diff1 -= 1
                if s[l] == lstart_0:
                    diff2 -= 1
                l += 1
                lstart_0 = '1' if lstart_0 == '0' else '0'

            if r - l + 1 == n:
                res = min(res, diff1, diff2)

            rstart_0 = '1' if rstart_0 == '0' else '0'

        return res
```

```java
public class Solution {
    public int minFlips(String s) {
        int n = s.length();
        int res = n, diff1 = 0, diff2 = 0, l = 0;

        char rstart_0 = '0', lstart_0 = '0';

        for (int r = 0; r < 2 * n; r++) {
            if (s.charAt(r % n) != rstart_0) diff1++;
            if (s.charAt(r % n) == rstart_0) diff2++;

            if (r - l + 1 > n) {
                if (s.charAt(l) != lstart_0) diff1--;
                if (s.charAt(l) == lstart_0) diff2--;
                l++;
                lstart_0 = (lstart_0 == '0') ? '1' : '0';
            }

            if (r - l + 1 == n) {
                res = Math.min(res, Math.min(diff1, diff2));
            }

            rstart_0 = (rstart_0 == '0') ? '1' : '0';
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minFlips(string s) {
        int n = s.size();
        int res = n, diff1 = 0, diff2 = 0, l = 0;

        char rstart_0 = '0', lstart_0 = '0';

        for (int r = 0; r < 2 * n; r++) {
            if (s[r % n] != rstart_0) diff1++;
            if (s[r % n] == rstart_0) diff2++;

            if (r - l + 1 > n) {
                if (s[l] != lstart_0) diff1--;
                if (s[l] == lstart_0) diff2--;
                l++;
                lstart_0 = (lstart_0 == '0') ? '1' : '0';
            }

            if (r - l + 1 == n) {
                res = min(res, min(diff1, diff2));
            }

            rstart_0 = (rstart_0 == '0') ? '1' : '0';
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlips(s) {
        const n = s.length;
        let res = n,
            diff1 = 0,
            diff2 = 0,
            l = 0;

        let rstart_0 = '0',
            lstart_0 = '0';

        for (let r = 0; r < 2 * n; r++) {
            if (s[r % n] !== rstart_0) diff1++;
            if (s[r % n] === rstart_0) diff2++;

            if (r - l + 1 > n) {
                if (s[l] !== lstart_0) diff1--;
                if (s[l] === lstart_0) diff2--;
                l++;
                lstart_0 = lstart_0 === '0' ? '1' : '0';
            }

            if (r - l + 1 === n) {
                res = Math.min(res, Math.min(diff1, diff2));
            }

            rstart_0 = rstart_0 === '0' ? '1' : '0';
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinFlips(string s) {
        int n = s.Length;
        int res = n, diff1 = 0, diff2 = 0, l = 0;

        char rstart_0 = '0', lstart_0 = '0';

        for (int r = 0; r < 2 * n; r++) {
            if (s[r % n] != rstart_0) diff1++;
            if (s[r % n] == rstart_0) diff2++;

            if (r - l + 1 > n) {
                if (s[l] != lstart_0) diff1--;
                if (s[l] == lstart_0) diff2--;
                l++;
                lstart_0 = lstart_0 == '0' ? '1' : '0';
            }

            if (r - l + 1 == n) {
                res = Math.Min(res, Math.Min(diff1, diff2));
            }

            rstart_0 = rstart_0 == '0' ? '1' : '0';
        }

        return res;
    }
}
```

```go
func minFlips(s string) int {
    n := len(s)
    res, diff1, diff2, l := n, 0, 0, 0

    rstart_0, lstart_0 := byte('0'), byte('0')

    for r := 0; r < 2*n; r++ {
        if s[r%n] != rstart_0 {
            diff1++
        }
        if s[r%n] == rstart_0 {
            diff2++
        }

        if r-l+1 > n {
            if s[l] != lstart_0 {
                diff1--
            }
            if s[l] == lstart_0 {
                diff2--
            }
            l++
            if lstart_0 == '0' {
                lstart_0 = '1'
            } else {
                lstart_0 = '0'
            }
        }

        if r-l+1 == n {
            res = min(res, min(diff1, diff2))
        }

        if rstart_0 == '0' {
            rstart_0 = '1'
        } else {
            rstart_0 = '0'
        }
    }

    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minFlips(s: String): Int {
        val n = s.length
        var res = n
        var diff1 = 0
        var diff2 = 0
        var l = 0

        var rstart_0 = '0'
        var lstart_0 = '0'

        for (r in 0 until 2 * n) {
            if (s[r % n] != rstart_0) diff1++
            if (s[r % n] == rstart_0) diff2++

            if (r - l + 1 > n) {
                if (s[l] != lstart_0) diff1--
                if (s[l] == lstart_0) diff2--
                l++
                lstart_0 = if (lstart_0 == '0') '1' else '0'
            }

            if (r - l + 1 == n) {
                res = minOf(res, minOf(diff1, diff2))
            }

            rstart_0 = if (rstart_0 == '0') '1' else '0'
        }

        return res
    }
}
```

```swift
class Solution {
    func minFlips(_ s: String) -> Int {
        let n = s.count
        var res = n, diff1 = 0, diff2 = 0, l = 0
        let chars = Array(s)

        var rstart_0: Character = "0"
        var lstart_0: Character = "0"

        for r in 0..<(2 * n) {
            if chars[r % n] != rstart_0 { diff1 += 1 }
            if chars[r % n] == rstart_0 { diff2 += 1 }

            if r - l + 1 > n {
                if chars[l] != lstart_0 { diff1 -= 1 }
                if chars[l] == lstart_0 { diff2 -= 1 }
                l += 1
                lstart_0 = lstart_0 == "0" ? "1" : "0"
            }

            if r - l + 1 == n {
                res = min(res, min(diff1, diff2))
            }

            rstart_0 = rstart_0 == "0" ? "1" : "0"
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 5. Dynamic Programming

::tabs-start

```python
class Solution:
    def minFlips(self, s: str) -> int:
        start_1 = 0
        for i in range(len(s)):
            if i & 1:
                start_1 += s[i] == "1"
            else:
                start_1 += s[i] == "0"

        start_0 = len(s) - start_1
        ans = min(start_0, start_1)
        if len(s) % 2 == 0:
            return ans

        dp0, dp1 = start_0, start_1
        for c in s:
            dp0, dp1 = dp1, dp0
            if c == "1":
                dp0 += 1
                dp1 -= 1
            else:
                dp0 -= 1
                dp1 += 1
            ans = min(dp0, dp1, ans)
        return ans
```

```java
public class Solution {
    public int minFlips(String s) {
        int start_1 = 0;
        int n = s.length();

        for (int i = 0; i < n; i++) {
            if ((i & 1) == 1) {
                start_1 += s.charAt(i) == '1' ? 1 : 0;
            } else {
                start_1 += s.charAt(i) == '0' ? 1 : 0;
            }
        }

        int start_0 = n - start_1;
        int ans = Math.min(start_0, start_1);
        if (n % 2 == 0) {
            return ans;
        }

        int dp0 = start_0, dp1 = start_1;
        for (char c : s.toCharArray()) {
            int temp = dp0;
            dp0 = dp1;
            dp1 = temp;
            if (c == '1') {
                dp0++;
                dp1--;
            } else {
                dp0--;
                dp1++;
            }
            ans = Math.min(ans, Math.min(dp0, dp1));
        }

        return ans;
    }
}
```

```cpp
class Solution {
public:
    int minFlips(string s) {
        int start_1 = 0, n = s.size();

        for (int i = 0; i < n; i++) {
            if (i & 1) {
                start_1 += (s[i] == '1');
            } else {
                start_1 += (s[i] == '0');
            }
        }

        int start_0 = n - start_1;
        int ans = min(start_0, start_1);
        if (n % 2 == 0) {
            return ans;
        }

        int dp0 = start_0, dp1 = start_1;
        for (char c : s) {
            int temp = dp0;
            dp0 = dp1;
            dp1 = temp;
            if (c == '1') {
                dp0++;
                dp1--;
            } else {
                dp0--;
                dp1++;
            }
            ans = min({ans, dp0, dp1});
        }

        return ans;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minFlips(s) {
        let start_1 = 0;
        const n = s.length;

        for (let i = 0; i < n; i++) {
            if (i & 1) {
                start_1 += s[i] === '1' ? 1 : 0;
            } else {
                start_1 += s[i] === '0' ? 1 : 0;
            }
        }

        let start_0 = n - start_1;
        let ans = Math.min(start_0, start_1);
        if (n % 2 === 0) {
            return ans;
        }

        let dp0 = start_0,
            dp1 = start_1;
        for (const c of s) {
            [dp0, dp1] = [dp1, dp0];
            if (c === '1') {
                dp0++;
                dp1--;
            } else {
                dp0--;
                dp1++;
            }
            ans = Math.min(ans, dp0, dp1);
        }

        return ans;
    }
}
```

```csharp
public class Solution {
    public int MinFlips(string s) {
        int start_1 = 0;
        int n = s.Length;

        for (int i = 0; i < n; i++) {
            if ((i & 1) == 1) {
                start_1 += s[i] == '1' ? 1 : 0;
            } else {
                start_1 += s[i] == '0' ? 1 : 0;
            }
        }

        int start_0 = n - start_1;
        int ans = Math.Min(start_0, start_1);
        if (n % 2 == 0) {
            return ans;
        }

        int dp0 = start_0, dp1 = start_1;
        foreach (char c in s) {
            int temp = dp0;
            dp0 = dp1;
            dp1 = temp;
            if (c == '1') {
                dp0++;
                dp1--;
            } else {
                dp0--;
                dp1++;
            }
            ans = Math.Min(ans, Math.Min(dp0, dp1));
        }

        return ans;
    }
}
```

```go
func minFlips(s string) int {
    start_1 := 0
    n := len(s)

    for i := 0; i < n; i++ {
        if i&1 == 1 {
            if s[i] == '1' {
                start_1++
            }
        } else {
            if s[i] == '0' {
                start_1++
            }
        }
    }

    start_0 := n - start_1
    ans := min(start_0, start_1)
    if n%2 == 0 {
        return ans
    }

    dp0, dp1 := start_0, start_1
    for i := 0; i < n; i++ {
        dp0, dp1 = dp1, dp0
        if s[i] == '1' {
            dp0++
            dp1--
        } else {
            dp0--
            dp1++
        }
        ans = min(ans, min(dp0, dp1))
    }

    return ans
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun minFlips(s: String): Int {
        var start_1 = 0
        val n = s.length

        for (i in 0 until n) {
            if (i and 1 == 1) {
                start_1 += if (s[i] == '1') 1 else 0
            } else {
                start_1 += if (s[i] == '0') 1 else 0
            }
        }

        var start_0 = n - start_1
        var ans = minOf(start_0, start_1)
        if (n % 2 == 0) {
            return ans
        }

        var dp0 = start_0
        var dp1 = start_1
        for (c in s) {
            val temp = dp0
            dp0 = dp1
            dp1 = temp
            if (c == '1') {
                dp0++
                dp1--
            } else {
                dp0--
                dp1++
            }
            ans = minOf(ans, minOf(dp0, dp1))
        }

        return ans
    }
}
```

```swift
class Solution {
    func minFlips(_ s: String) -> Int {
        var start_1 = 0
        let n = s.count
        let chars = Array(s)

        for i in 0..<n {
            if i & 1 == 1 {
                start_1 += chars[i] == "1" ? 1 : 0
            } else {
                start_1 += chars[i] == "0" ? 1 : 0
            }
        }

        var start_0 = n - start_1
        var ans = min(start_0, start_1)
        if n % 2 == 0 {
            return ans
        }

        var dp0 = start_0, dp1 = start_1
        for c in chars {
            let temp = dp0
            dp0 = dp1
            dp1 = temp
            if c == "1" {
                dp0 += 1
                dp1 -= 1
            } else {
                dp0 -= 1
                dp1 += 1
            }
            ans = min(ans, min(dp0, dp1))
        }

        return ans
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
