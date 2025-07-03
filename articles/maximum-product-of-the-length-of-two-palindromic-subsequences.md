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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 * 2 ^ n)$
- Space complexity: $O(n)$
