## 1. Recursion (Backtracking)

::tabs-start

```python
class Solution:
    def maxProduct(self, s: str) -> int:
        def isPal(s):
            i, j = 0, len(s) - 1
            while i < j:
                if s[i] != s[j]:
                    return False
                i += 1
                j -= 1
            return True

        res = 0
        def rec(i, seq1, seq2):
            nonlocal res
            if i == len(s):
                if isPal(seq1) and isPal(seq2):
                    res = max(res, len(seq1) * len(seq2))
                return

            rec(i + 1, seq1, seq2)
            rec(i + 1, seq1 + s[i], seq2)
            rec(i + 1, seq1, seq2 + s[i])

        rec(0, "", "")
        return res
```

```java
public class Solution {
    private boolean isPal(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) return false;
            i++;
            j--;
        }
        return true;
    }

    public void rec(int i, String s, StringBuilder seq1, StringBuilder seq2, int[] res) {
        if (i == s.length()) {
            if (isPal(seq1.toString()) && isPal(seq2.toString())) {
                res[0] = Math.max(res[0], seq1.length() * seq2.length());
            }
            return;
        }

        rec(i + 1, s, seq1, seq2, res);
        seq1.append(s.charAt(i));
        rec(i + 1, s, seq1, seq2, res);
        seq1.deleteCharAt(seq1.length() - 1);

        seq2.append(s.charAt(i));
        rec(i + 1, s, seq1, seq2, res);
        seq2.deleteCharAt(seq2.length() - 1);
    }

    public int maxProduct(String s) {
        int[] res = new int[1];
        rec(0, s, new StringBuilder(), new StringBuilder(), res);
        return res[0];
    }
}
```

```cpp
class Solution {
public:
    bool isPal(const string &s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s[i] != s[j]) return false;
            i++;
            j--;
        }
        return true;
    }

    void rec(int i, string& s, string& seq1, string& seq2, int &res) {
        if (i == s.length()) {
            if (isPal(seq1) && isPal(seq2)) {
                res = max(res, (int)seq1.length() * (int)seq2.length());
            }
            return;
        }

        rec(i + 1, s, seq1, seq2, res);
        seq1.push_back(s[i]);
        rec(i + 1, s, seq1, seq2, res);
        seq1.pop_back();
        seq2.push_back(s[i]);
        rec(i + 1, s, seq1, seq2, res);
        seq2.pop_back();
    }

    int maxProduct(string s) {
        int res = 0;
        string seq1 = "", seq2 = "";
        rec(0, s, seq1, seq2, res);
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
    maxProduct(s) {
        const isPal = (str) => {
            let i = 0,
                j = str.length - 1;
            while (i < j) {
                if (str[i] !== str[j]) return false;
                i++;
                j--;
            }
            return true;
        };

        let res = 0;

        const rec = (i, seq1, seq2) => {
            if (i === s.length) {
                if (isPal(seq1) && isPal(seq2)) {
                    res = Math.max(res, seq1.length * seq2.length);
                }
                return;
            }

            rec(i + 1, seq1, seq2);
            rec(i + 1, seq1 + s[i], seq2);
            rec(i + 1, seq1, seq2 + s[i]);
        };

        rec(0, '', '');
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(string s) {
        int res = 0;
        Rec(0, s, "", "", ref res);
        return res;
    }

    private void Rec(int i, string s, string seq1, string seq2, ref int res) {
        if (i == s.Length) {
            if (IsPal(seq1) && IsPal(seq2)) {
                res = Math.Max(res, seq1.Length * seq2.Length);
            }
            return;
        }

        Rec(i + 1, s, seq1, seq2, ref res);
        Rec(i + 1, s, seq1 + s[i], seq2, ref res);
        Rec(i + 1, s, seq1, seq2 + s[i], ref res);
    }

    private bool IsPal(string s) {
        int i = 0, j = s.Length - 1;
        while (i < j) {
            if (s[i] != s[j]) return false;
            i++;
            j--;
        }
        return true;
    }
}
```

```go
func maxProduct(s string) int {
    res := 0

    var isPal func(str string) bool
    isPal = func(str string) bool {
        i, j := 0, len(str)-1
        for i < j {
            if str[i] != str[j] {
                return false
            }
            i++
            j--
        }
        return true
    }

    var rec func(i int, seq1, seq2 string)
    rec = func(i int, seq1, seq2 string) {
        if i == len(s) {
            if isPal(seq1) && isPal(seq2) {
                if len(seq1)*len(seq2) > res {
                    res = len(seq1) * len(seq2)
                }
            }
            return
        }

        rec(i+1, seq1, seq2)
        rec(i+1, seq1+string(s[i]), seq2)
        rec(i+1, seq1, seq2+string(s[i]))
    }

    rec(0, "", "")
    return res
}
```

```kotlin
class Solution {
    fun maxProduct(s: String): Int {
        var res = 0

        fun isPal(str: String): Boolean {
            var i = 0
            var j = str.length - 1
            while (i < j) {
                if (str[i] != str[j]) return false
                i++
                j--
            }
            return true
        }

        fun rec(i: Int, seq1: String, seq2: String) {
            if (i == s.length) {
                if (isPal(seq1) && isPal(seq2)) {
                    res = maxOf(res, seq1.length * seq2.length)
                }
                return
            }

            rec(i + 1, seq1, seq2)
            rec(i + 1, seq1 + s[i], seq2)
            rec(i + 1, seq1, seq2 + s[i])
        }

        rec(0, "", "")
        return res
    }
}
```

```swift
class Solution {
    func maxProduct(_ s: String) -> Int {
        let chars = Array(s)
        var res = 0

        func isPal(_ str: [Character]) -> Bool {
            var i = 0, j = str.count - 1
            while i < j {
                if str[i] != str[j] { return false }
                i += 1
                j -= 1
            }
            return true
        }

        func rec(_ i: Int, _ seq1: [Character], _ seq2: [Character]) {
            if i == chars.count {
                if isPal(seq1) && isPal(seq2) {
                    res = max(res, seq1.count * seq2.count)
                }
                return
            }

            rec(i + 1, seq1, seq2)
            rec(i + 1, seq1 + [chars[i]], seq2)
            rec(i + 1, seq1, seq2 + [chars[i]])
        }

        rec(0, [], [])
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 3 ^ n)$
- Space complexity: $O(n)$

---

## 2. Bit Mask

::tabs-start

```python
class Solution:
    def maxProduct(self, s: str) -> int:
        def isPal(s):
            i, j = 0, len(s) - 1
            while i < j:
                if s[i] != s[j]:
                    return False
                i += 1
                j -= 1
            return True

        N, pali = len(s), {}

        for mask in range(1, 1 << N):
            subseq = ""
            for i in range(N):
                if mask & (1 << i):
                    subseq += s[i]

            if isPal(subseq):
                pali[mask] = len(subseq)

        res = 0
        for m1 in pali:
            for m2 in pali:
                if m1 & m2 == 0:
                    res = max(res, pali[m1] * pali[m2])

        return res
```

```java
public class Solution {
    public int maxProduct(String s) {
        int N = s.length();
        int res = 0;
        Map<Integer, Integer> pali = new HashMap<>();

        for (int mask = 1; mask < (1 << N); mask++) {
            StringBuilder subseq = new StringBuilder();
            for (int i = 0; i < N; i++) {
                if ((mask & (1 << i)) != 0) {
                    subseq.append(s.charAt(i));
                }
            }

            if (isPal(subseq.toString())) {
                pali.put(mask, subseq.length());
            }
        }

        for (int m1 : pali.keySet()) {
            for (int m2 : pali.keySet()) {
                if ((m1 & m2) == 0) {
                    res = Math.max(res, pali.get(m1) * pali.get(m2));
                }
            }
        }

        return res;
    }

    private boolean isPal(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int maxProduct(string s) {
        int N = s.length();
        int res = 0;
        unordered_map<int, int> pali;

        for (int mask = 1; mask < (1 << N); mask++) {
            string subseq = "";
            for (int i = 0; i < N; i++) {
                if (mask & (1 << i)) {
                    subseq += s[i];
                }
            }

            if (isPal(subseq)) {
                pali[mask] = subseq.length();
            }
        }

        for (auto& m1 : pali) {
            for (auto& m2 : pali) {
                if ((m1.first & m2.first) == 0) {
                    res = max(res, m1.second * m2.second);
                }
            }
        }

        return res;
    }

private:
    bool isPal(const string& s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s[i] != s[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    maxProduct(s) {
        const isPal = (str) => {
            let i = 0,
                j = str.length - 1;
            while (i < j) {
                if (str[i] !== str[j]) return false;
                i++;
                j--;
            }
            return true;
        };

        const N = s.length;
        let res = 0;
        const pali = new Map();

        for (let mask = 1; mask < 1 << N; mask++) {
            let subseq = '';
            for (let i = 0; i < N; i++) {
                if ((mask & (1 << i)) !== 0) {
                    subseq += s[i];
                }
            }

            if (isPal(subseq)) {
                pali.set(mask, subseq.length);
            }
        }

        for (let [m1, len1] of pali) {
            for (let [m2, len2] of pali) {
                if ((m1 & m2) === 0) {
                    res = Math.max(res, len1 * len2);
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxProduct(string s) {
        int N = s.Length;
        int res = 0;
        var pali = new Dictionary<int, int>();

        for (int mask = 1; mask < (1 << N); mask++) {
            var subseq = new System.Text.StringBuilder();
            for (int i = 0; i < N; i++) {
                if ((mask & (1 << i)) != 0) {
                    subseq.Append(s[i]);
                }
            }

            if (IsPal(subseq.ToString())) {
                pali[mask] = subseq.Length;
            }
        }

        foreach (var m1 in pali) {
            foreach (var m2 in pali) {
                if ((m1.Key & m2.Key) == 0) {
                    res = Math.Max(res, m1.Value * m2.Value);
                }
            }
        }

        return res;
    }

    private bool IsPal(string s) {
        int i = 0, j = s.Length - 1;
        while (i < j) {
            if (s[i] != s[j]) return false;
            i++;
            j--;
        }
        return true;
    }
}
```

```go
func maxProduct(s string) int {
    isPal := func(str string) bool {
        i, j := 0, len(str)-1
        for i < j {
            if str[i] != str[j] {
                return false
            }
            i++
            j--
        }
        return true
    }

    N := len(s)
    res := 0
    pali := make(map[int]int)

    for mask := 1; mask < (1 << N); mask++ {
        subseq := ""
        for i := 0; i < N; i++ {
            if mask&(1<<i) != 0 {
                subseq += string(s[i])
            }
        }

        if isPal(subseq) {
            pali[mask] = len(subseq)
        }
    }

    for m1, len1 := range pali {
        for m2, len2 := range pali {
            if m1&m2 == 0 {
                if len1*len2 > res {
                    res = len1 * len2
                }
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxProduct(s: String): Int {
        fun isPal(str: String): Boolean {
            var i = 0
            var j = str.length - 1
            while (i < j) {
                if (str[i] != str[j]) return false
                i++
                j--
            }
            return true
        }

        val N = s.length
        var res = 0
        val pali = mutableMapOf<Int, Int>()

        for (mask in 1 until (1 shl N)) {
            val subseq = StringBuilder()
            for (i in 0 until N) {
                if ((mask and (1 shl i)) != 0) {
                    subseq.append(s[i])
                }
            }

            if (isPal(subseq.toString())) {
                pali[mask] = subseq.length
            }
        }

        for ((m1, len1) in pali) {
            for ((m2, len2) in pali) {
                if ((m1 and m2) == 0) {
                    res = maxOf(res, len1 * len2)
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxProduct(_ s: String) -> Int {
        func isPal(_ str: String) -> Bool {
            let chars = Array(str)
            var i = 0, j = chars.count - 1
            while i < j {
                if chars[i] != chars[j] { return false }
                i += 1
                j -= 1
            }
            return true
        }

        let chars = Array(s)
        let N = chars.count
        var res = 0
        var pali = [Int: Int]()

        for mask in 1..<(1 << N) {
            var subseq = ""
            for i in 0..<N {
                if (mask & (1 << i)) != 0 {
                    subseq.append(chars[i])
                }
            }

            if isPal(subseq) {
                pali[mask] = subseq.count
            }
        }

        for (m1, len1) in pali {
            for (m2, len2) in pali {
                if (m1 & m2) == 0 {
                    res = max(res, len1 * len2)
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ n)$
- Space complexity: $O(2 ^ n)$

---

## 3. Bit Mask + Longest Pallindromic Subsequence

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str) -> int:
        n = len(s)
        if n == 0:
            return 0

        dp = [1] * n
        for i in range(n - 1, -1, -1):
            prev = 0
            for j in range(i + 1, n):
                tmp = dp[j]
                if s[i] == s[j]:
                    dp[j] = 2 + prev
                else:
                    dp[j] = max(dp[j - 1], dp[j])
                prev = tmp
        return dp[n - 1]

    def maxProduct(self, s: str) -> int:
        n = len(s)
        res = 0

        for i in range(1, 1 << n):
            seq1, seq2 = [], []

            for j in range(n):
                if (i & (1 << j)) != 0:
                    seq1.append(s[j])
                else:
                    seq2.append(s[j])

            if not self.isPal(seq1):
                continue

            lps = self.longestPalindromeSubseq(''.join(seq2))
            res = max(res, len(seq1) * lps)

        return res

    def isPal(self, s: str) -> bool:
        i, j = 0, len(s) - 1
        while i < j:
            if s[i] != s[j]:
                return False
            i += 1
            j -= 1
        return True
```

```java
public class Solution {
    public int longestPalindromeSubseq(String s) {
        int n = s.length();
        if (n == 0) return 0;

        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = n - 1; i >= 0; i--) {
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int tmp = dp[j];
                if (s.charAt(i) == s.charAt(j)) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = Math.max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    public int maxProduct(String s) {
        int n = s.length();
        int res = 0;

        for (int i = 1; i < (1 << n); i++) {
            StringBuilder seq1 = new StringBuilder(), seq2 = new StringBuilder();

            for (int j = 0; j < n; j++) {
                char c = s.charAt(j);
                if ((i & (1 << j)) != 0) seq1.append(c);
                else seq2.append(c);
            }

            if (!isPal(seq1.toString())) continue;
            int lps = longestPalindromeSubseq(seq2.toString());
            res = Math.max(res, seq1.length() * lps);
        }

        return res;
    }

    private boolean isPal(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string& s) {
        int n = s.length();
        if (n == 0) return 0;

        vector<int> dp(n, 1);
        for (int i = n - 1; i >= 0; i--) {
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int tmp = dp[j];
                if (s[i] == s[j]) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    int maxProduct(string s) {
        int n = s.length();
        int res = 0;

        for (int i = 1; i < (1 << n); i++) {
            string seq1 = "", seq2 = "";

            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) != 0) seq1 += s[j];
                else seq2 += s[j];
            }

            if (!isPal(seq1)) continue;

            int lps = longestPalindromeSubseq(seq2);
            res = max(res, int(seq1.length()) * lps);
        }

        return res;
    }

    bool isPal(string& s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s[i] != s[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    longestPalindromeSubseq(s) {
        const n = s.length;
        if (n === 0) return 0;

        const dp = new Array(n).fill(1);
        for (let i = n - 1; i >= 0; i--) {
            let prev = 0;
            for (let j = i + 1; j < n; j++) {
                let tmp = dp[j];
                if (s[i] === s[j]) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = Math.max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    /**
     * @param {string} s
     * @return {number}
     */
    maxProduct(s) {
        const n = s.length;
        let res = 0;

        for (let i = 1; i < 1 << n; i++) {
            let seq1 = '',
                seq2 = '';

            for (let j = 0; j < n; j++) {
                if ((i & (1 << j)) !== 0) seq1 += s[j];
                else seq2 += s[j];
            }

            if (!this.isPal(seq1)) continue;

            const lps = this.longestPalindromeSubseq(seq2);
            res = Math.max(res, seq1.length * lps);
        }

        return res;
    }

    /**
     * @param {string} s
     * @return {boolean}
     */
    isPal(s) {
        let i = 0,
            j = s.length - 1;
        while (i < j) {
            if (s[i] !== s[j]) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
```

```csharp
public class Solution {
    public int LongestPalindromeSubseq(string s) {
        int n = s.Length;
        if (n == 0) return 0;

        int[] dp = new int[n];
        Array.Fill(dp, 1);
        for (int i = n - 1; i >= 0; i--) {
            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int tmp = dp[j];
                if (s[i] == s[j]) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = Math.Max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    public int MaxProduct(string s) {
        int n = s.Length;
        int res = 0;

        for (int i = 1; i < (1 << n); i++) {
            var seq1 = new System.Text.StringBuilder();
            var seq2 = new System.Text.StringBuilder();

            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) != 0) seq1.Append(s[j]);
                else seq2.Append(s[j]);
            }

            if (!IsPal(seq1.ToString())) continue;
            int lps = LongestPalindromeSubseq(seq2.ToString());
            res = Math.Max(res, seq1.Length * lps);
        }

        return res;
    }

    private bool IsPal(string s) {
        int i = 0, j = s.Length - 1;
        while (i < j) {
            if (s[i] != s[j]) return false;
            i++;
            j--;
        }
        return true;
    }
}
```

```go
func maxProduct(s string) int {
    longestPalindromeSubseq := func(str string) int {
        n := len(str)
        if n == 0 {
            return 0
        }

        dp := make([]int, n)
        for i := range dp {
            dp[i] = 1
        }
        for i := n - 1; i >= 0; i-- {
            prev := 0
            for j := i + 1; j < n; j++ {
                tmp := dp[j]
                if str[i] == str[j] {
                    dp[j] = 2 + prev
                } else {
                    dp[j] = max(dp[j-1], dp[j])
                }
                prev = tmp
            }
        }
        return dp[n-1]
    }

    isPal := func(str string) bool {
        i, j := 0, len(str)-1
        for i < j {
            if str[i] != str[j] {
                return false
            }
            i++
            j--
        }
        return true
    }

    n := len(s)
    res := 0

    for i := 1; i < (1 << n); i++ {
        seq1, seq2 := "", ""

        for j := 0; j < n; j++ {
            if i&(1<<j) != 0 {
                seq1 += string(s[j])
            } else {
                seq2 += string(s[j])
            }
        }

        if !isPal(seq1) {
            continue
        }

        lps := longestPalindromeSubseq(seq2)
        res = max(res, len(seq1)*lps)
    }

    return res
}
```

```kotlin
class Solution {
    fun longestPalindromeSubseq(s: String): Int {
        val n = s.length
        if (n == 0) return 0

        val dp = IntArray(n) { 1 }
        for (i in n - 1 downTo 0) {
            var prev = 0
            for (j in i + 1 until n) {
                val tmp = dp[j]
                if (s[i] == s[j]) {
                    dp[j] = 2 + prev
                } else {
                    dp[j] = maxOf(dp[j - 1], dp[j])
                }
                prev = tmp
            }
        }
        return dp[n - 1]
    }

    fun maxProduct(s: String): Int {
        val n = s.length
        var res = 0

        for (i in 1 until (1 shl n)) {
            val seq1 = StringBuilder()
            val seq2 = StringBuilder()

            for (j in 0 until n) {
                if ((i and (1 shl j)) != 0) seq1.append(s[j])
                else seq2.append(s[j])
            }

            if (!isPal(seq1.toString())) continue
            val lps = longestPalindromeSubseq(seq2.toString())
            res = maxOf(res, seq1.length * lps)
        }

        return res
    }

    private fun isPal(s: String): Boolean {
        var i = 0
        var j = s.length - 1
        while (i < j) {
            if (s[i] != s[j]) return false
            i++
            j--
        }
        return true
    }
}
```

```swift
class Solution {
    func longestPalindromeSubseq(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        if n == 0 { return 0 }

        var dp = [Int](repeating: 1, count: n)
        for i in stride(from: n - 1, through: 0, by: -1) {
            var prev = 0
            for j in (i + 1)..<n {
                let tmp = dp[j]
                if chars[i] == chars[j] {
                    dp[j] = 2 + prev
                } else {
                    dp[j] = max(dp[j - 1], dp[j])
                }
                prev = tmp
            }
        }
        return dp[n - 1]
    }

    func maxProduct(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var res = 0

        for i in 1..<(1 << n) {
            var seq1 = ""
            var seq2 = ""

            for j in 0..<n {
                if (i & (1 << j)) != 0 {
                    seq1.append(chars[j])
                } else {
                    seq2.append(chars[j])
                }
            }

            if !isPal(seq1) { continue }
            let lps = longestPalindromeSubseq(seq2)
            res = max(res, seq1.count * lps)
        }

        return res
    }

    private func isPal(_ s: String) -> Bool {
        let chars = Array(s)
        var i = 0, j = chars.count - 1
        while i < j {
            if chars[i] != chars[j] { return false }
            i += 1
            j -= 1
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * 2 ^ n)$
- Space complexity: $O(n)$

---

## 4. Bit Mask + LPS (Optimal)

::tabs-start

```python
class Solution:
    def longestPalindromeSubseq(self, s: str, mask: int, dp: List[int]) -> int:
        n = len(s)
        for i in range(n - 1, -1, -1):
            if (mask & (1 << i)) != 0:
                continue

            prev = 0
            for j in range(i + 1, n):
                tmp = dp[j]
                if (mask & (1 << j)) == 0 and s[i] == s[j]:
                    dp[j] = 2 + prev
                else:
                    dp[j] = max(dp[j - 1], dp[j])
                prev = tmp
        return dp[-1]

    def maxProduct(self, s: str) -> int:
        n = len(s)
        res = 0
        dp = [1] * n

        for i in range(1, 1 << n):
            m1 = self.palsize(s, i)
            if m1 == 0:
                continue

            for j in range(n):
                if (i & (1 << j)) == 0:
                    dp[j] = 1
                else:
                    dp[j] = 0

            m2 = self.longestPalindromeSubseq(s, i, dp)
            res = max(res, m1 * m2)

        return res

    def palsize(self, s: str, mask: int) -> int:
        i, j = 0, len(s) - 1
        res = 0
        while i <= j:
            if (mask & (1 << i)) == 0:
                i += 1
            elif (mask & (1 << j)) == 0:
                j -= 1
            else:
                if s[i] != s[j]:
                    return 0
                res += 1 if i == j else 2
                i += 1
                j -= 1
        return res
```

```java
public class Solution {
    public int longestPalindromeSubseq(String s, int mask, int[] dp) {
        int n = s.length();
        for (int i = n - 1; i >= 0; i--) {
            if ((mask & (1 << i)) != 0) continue;

            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int tmp = dp[j];
                if ((mask & (1 << j)) == 0 && s.charAt(i) == s.charAt(j)) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = Math.max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    public int maxProduct(String s) {
        int n = s.length();
        int res = 0;
        int[] dp = new int[n];

        for (int i = 1; i < (1 << n); i++) {
            int m1 = palsize(s, i);
            if (m1 == 0) continue;

            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) == 0) {
                    dp[j] = 1;
                } else {
                    dp[j] = 0;
                }
            }
            int m2 = longestPalindromeSubseq(s, i, dp);
            res = Math.max(res, m1 * m2);
        }
        return res;
    }

    public int palsize(String s, int mask) {
        int i = 0, j = s.length() - 1;
        int res = 0;
        while (i <= j) {
            if ((mask & (1 << i)) == 0) i++;
            else if ((mask & (1 << j)) == 0) j--;
            else {
                if (s.charAt(i) != s.charAt(j)) return 0;
                res += (i == j) ? 1 : 2;
                i++;
                j--;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestPalindromeSubseq(string& s, int mask, vector<int>& dp) {
        int n = s.length();
        for (int i = n - 1; i >= 0; i--) {
            if ((mask & (1 << i)) != 0) continue;

            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int tmp = dp[j];
                if ((mask & (1 << j)) == 0 && s[i] == s[j]) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    int maxProduct(string s) {
        int n = s.length();
        int res = 0;
        vector<int> dp(n, 1);

        for (int i = 1; i < (1 << n); i++) {
            int m1 = palsize(s, i);
            if (m1 == 0) continue;

            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) == 0) {
                    dp[j] = 1;
                } else {
                    dp[j] = 0;
                }
            }
            int m2 = longestPalindromeSubseq(s, i, dp);
            res = max(res, m1 * m2);
        }

        return res;
    }

    int palsize(string& s, int mask) {
        int i = 0, j = s.length() - 1;
        int res = 0;
        while (i <= j) {
            if ((mask & (1 << i)) == 0) i++;
            else if ((mask & (1 << j)) == 0) j--;
            else {
                if (s[i] != s[j]) return 0;
                res += (i == j) ? 1 : 2;
                i++;
                j--;
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
     * @param {number} mask
     * @param {number[]} dp
     * @return {number}
     */
    longestPalindromeSubseq(s, mask, dp) {
        const n = s.length;
        for (let i = n - 1; i >= 0; i--) {
            if ((mask & (1 << i)) !== 0) continue;

            let prev = 0;
            for (let j = i + 1; j < n; j++) {
                const tmp = dp[j];
                if ((mask & (1 << j)) === 0 && s[i] === s[j]) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = Math.max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    /**
     * @param {string} s
     * @return {boolean}
     */
    maxProduct(s) {
        const n = s.length;
        let res = 0;
        const dp = Array(n).fill(1);

        for (let i = 1; i < 1 << n; i++) {
            const m1 = this.palsize(s, i);
            if (m1 === 0) continue;

            for (let j = 0; j < n; j++) {
                if ((i & (1 << j)) === 0) {
                    dp[j] = 1;
                } else {
                    dp[j] = 0;
                }
            }
            const m2 = this.longestPalindromeSubseq(s, i, dp);
            res = Math.max(res, m1 * m2);
        }
        return res;
    }

    /**
     * @param {string} s
     * @param {number} mask
     * @return {number}
     */
    palsize(s, mask) {
        let i = 0,
            j = s.length - 1;
        let res = 0;
        while (i <= j) {
            if ((mask & (1 << i)) === 0) i++;
            else if ((mask & (1 << j)) === 0) j--;
            else {
                if (s[i] !== s[j]) return 0;
                res += i === j ? 1 : 2;
                i++;
                j--;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestPalindromeSubseq(string s, int mask, int[] dp) {
        int n = s.Length;
        for (int i = n - 1; i >= 0; i--) {
            if ((mask & (1 << i)) != 0) continue;

            int prev = 0;
            for (int j = i + 1; j < n; j++) {
                int tmp = dp[j];
                if ((mask & (1 << j)) == 0 && s[i] == s[j]) {
                    dp[j] = 2 + prev;
                } else {
                    dp[j] = Math.Max(dp[j - 1], dp[j]);
                }
                prev = tmp;
            }
        }
        return dp[n - 1];
    }

    public int MaxProduct(string s) {
        int n = s.Length;
        int res = 0;
        int[] dp = new int[n];

        for (int i = 1; i < (1 << n); i++) {
            int m1 = Palsize(s, i);
            if (m1 == 0) continue;

            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) == 0) {
                    dp[j] = 1;
                } else {
                    dp[j] = 0;
                }
            }
            int m2 = LongestPalindromeSubseq(s, i, dp);
            res = Math.Max(res, m1 * m2);
        }
        return res;
    }

    public int Palsize(string s, int mask) {
        int i = 0, j = s.Length - 1;
        int res = 0;
        while (i <= j) {
            if ((mask & (1 << i)) == 0) i++;
            else if ((mask & (1 << j)) == 0) j--;
            else {
                if (s[i] != s[j]) return 0;
                res += (i == j) ? 1 : 2;
                i++;
                j--;
            }
        }
        return res;
    }
}
```

```go
func maxProduct(s string) int {
    n := len(s)
    res := 0
    dp := make([]int, n)

    longestPalindromeSubseq := func(mask int) int {
        for i := n - 1; i >= 0; i-- {
            if (mask & (1 << i)) != 0 {
                continue
            }

            prev := 0
            for j := i + 1; j < n; j++ {
                tmp := dp[j]
                if (mask&(1<<j)) == 0 && s[i] == s[j] {
                    dp[j] = 2 + prev
                } else {
                    dp[j] = max(dp[j-1], dp[j])
                }
                prev = tmp
            }
        }
        return dp[n-1]
    }

    palsize := func(mask int) int {
        i, j := 0, n-1
        res := 0
        for i <= j {
            if (mask & (1 << i)) == 0 {
                i++
            } else if (mask & (1 << j)) == 0 {
                j--
            } else {
                if s[i] != s[j] {
                    return 0
                }
                if i == j {
                    res += 1
                } else {
                    res += 2
                }
                i++
                j--
            }
        }
        return res
    }

    for i := 1; i < (1 << n); i++ {
        m1 := palsize(i)
        if m1 == 0 {
            continue
        }

        for j := 0; j < n; j++ {
            if (i & (1 << j)) == 0 {
                dp[j] = 1
            } else {
                dp[j] = 0
            }
        }
        m2 := longestPalindromeSubseq(i)
        res = max(res, m1*m2)
    }

    return res
}
```

```kotlin
class Solution {
    fun longestPalindromeSubseq(s: String, mask: Int, dp: IntArray): Int {
        val n = s.length
        for (i in n - 1 downTo 0) {
            if ((mask and (1 shl i)) != 0) continue

            var prev = 0
            for (j in i + 1 until n) {
                val tmp = dp[j]
                if ((mask and (1 shl j)) == 0 && s[i] == s[j]) {
                    dp[j] = 2 + prev
                } else {
                    dp[j] = maxOf(dp[j - 1], dp[j])
                }
                prev = tmp
            }
        }
        return dp[n - 1]
    }

    fun maxProduct(s: String): Int {
        val n = s.length
        var res = 0
        val dp = IntArray(n) { 1 }

        for (i in 1 until (1 shl n)) {
            val m1 = palsize(s, i)
            if (m1 == 0) continue

            for (j in 0 until n) {
                if ((i and (1 shl j)) == 0) {
                    dp[j] = 1
                } else {
                    dp[j] = 0
                }
            }
            val m2 = longestPalindromeSubseq(s, i, dp)
            res = maxOf(res, m1 * m2)
        }
        return res
    }

    fun palsize(s: String, mask: Int): Int {
        var i = 0
        var j = s.length - 1
        var res = 0
        while (i <= j) {
            if ((mask and (1 shl i)) == 0) i++
            else if ((mask and (1 shl j)) == 0) j--
            else {
                if (s[i] != s[j]) return 0
                res += if (i == j) 1 else 2
                i++
                j--
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func longestPalindromeSubseq(_ s: [Character], _ mask: Int, _ dp: inout [Int]) -> Int {
        let n = s.count
        for i in stride(from: n - 1, through: 0, by: -1) {
            if (mask & (1 << i)) != 0 { continue }

            var prev = 0
            for j in (i + 1)..<n {
                let tmp = dp[j]
                if (mask & (1 << j)) == 0 && s[i] == s[j] {
                    dp[j] = 2 + prev
                } else {
                    dp[j] = max(dp[j - 1], dp[j])
                }
                prev = tmp
            }
        }
        return dp[n - 1]
    }

    func maxProduct(_ s: String) -> Int {
        let chars = Array(s)
        let n = chars.count
        var res = 0
        var dp = [Int](repeating: 1, count: n)

        for i in 1..<(1 << n) {
            let m1 = palsize(chars, i)
            if m1 == 0 { continue }

            for j in 0..<n {
                if (i & (1 << j)) == 0 {
                    dp[j] = 1
                } else {
                    dp[j] = 0
                }
            }
            let m2 = longestPalindromeSubseq(chars, i, &dp)
            res = max(res, m1 * m2)
        }
        return res
    }

    func palsize(_ s: [Character], _ mask: Int) -> Int {
        var i = 0, j = s.count - 1
        var res = 0
        while i <= j {
            if (mask & (1 << i)) == 0 { i += 1 }
            else if (mask & (1 << j)) == 0 { j -= 1 }
            else {
                if s[i] != s[j] { return 0 }
                res += (i == j) ? 1 : 2
                i += 1
                j -= 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * 2 ^ n)$
- Space complexity: $O(n)$
