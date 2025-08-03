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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
