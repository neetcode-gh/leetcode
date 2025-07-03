## 1. Brute Force (Recursion)

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = set()

        def rec(i, cur):
            if len(cur) == 3:
                if cur[0] == cur[2]:
                    res.add(cur)
                return
            if i == len(s):
                return
            rec(i + 1, cur)
            rec(i + 1, cur + s[i])

        rec(0, "")
        return len(res)
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        Set<String> res = new HashSet<>();
        rec(s, 0, "", res);
        return res.size();
    }

    private void rec(String s, int i, String cur, Set<String> res) {
        if (cur.length() == 3) {
            if (cur.charAt(0) == cur.charAt(2)) {
                res.add(cur);
            }
            return;
        }
        if (i == s.length()) {
            return;
        }
        rec(s, i + 1, cur, res);
        rec(s, i + 1, cur + s.charAt(i), res);
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        unordered_set<string> res;
        rec(s, 0, "", res);
        return res.size();
    }

private:
    void rec(const string& s, int i, string cur, unordered_set<string>& res) {
        if (cur.length() == 3) {
            if (cur[0] == cur[2]) {
                res.insert(cur);
            }
            return;
        }
        if (i == s.length()) {
            return;
        }
        rec(s, i + 1, cur, res);
        rec(s, i + 1, cur + s[i], res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const res = new Set();

        const rec = (i, cur) => {
            if (cur.length === 3) {
                if (cur[0] === cur[2]) {
                    res.add(cur);
                }
                return;
            }
            if (i === s.length) {
                return;
            }
            rec(i + 1, cur);
            rec(i + 1, cur + s[i]);
        };

        rec(0, '');
        return res.size;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n + m)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 2. Brute Force

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = set()

        for i in range(len(s) - 2):
            for j in range(i + 1, len(s) - 1):
                for k in range(j + 1, len(s)):
                    if s[i] != s[k]:
                        continue
                    res.add(s[i] + s[j] + s[k])
        return len(res)
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        Set<String> res = new HashSet<>();

        for (int i = 0; i < s.length() - 2; i++) {
            for (int j = i + 1; j < s.length() - 1; j++) {
                for (int k = j + 1; k < s.length(); k++) {
                    if (s.charAt(i) != s.charAt(k)) {
                        continue;
                    }
                    res.add("" + s.charAt(i) + s.charAt(j) + s.charAt(k));
                }
            }
        }
        return res.size();
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        unordered_set<string> res;

        for (int i = 0; i < s.length() - 2; i++) {
            for (int j = i + 1; j < s.length() - 1; j++) {
                for (int k = j + 1; k < s.length(); k++) {
                    if (s[i] != s[k]) {
                        continue;
                    }
                    res.insert(string() + s[i] + s[j] + s[k]);
                }
            }
        }
        return res.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const res = new Set();

        for (let i = 0; i < s.length - 2; i++) {
            for (let j = i + 1; j < s.length - 1; j++) {
                for (let k = j + 1; k < s.length; k++) {
                    if (s[i] !== s[k]) {
                        continue;
                    }
                    res.add(s[i] + s[j] + s[k]);
                }
            }
        }
        return res.size;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 3. Sequential Matching for Each Pallindrome

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = 0
        for ends in range(ord('a'), ord('z') + 1):
            for mid in range(ord('a'), ord('z') + 1):
                seq = chr(ends) + chr(mid) + chr(ends)
                idx, found = 0, 0
                for c in s:
                    if seq[idx] == c:
                        idx += 1
                        if idx == 3:
                            found = 1
                            break
                res += found
        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int res = 0;
        for (char ends = 'a'; ends <= 'z'; ends++) {
            for (char mid = 'a'; mid <= 'z'; mid++) {
                String seq = "" + ends + mid + ends;
                int idx = 0, found = 0;
                for (char c : s.toCharArray()) {
                    if (seq.charAt(idx) == c) {
                        idx++;
                        if (idx == 3) {
                            found = 1;
                            break;
                        }
                    }
                }
                res += found;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int res = 0;
        for (char ends = 'a'; ends <= 'z'; ends++) {
            for (char mid = 'a'; mid <= 'z'; mid++) {
                string seq = string() + ends + mid + ends;
                int idx = 0, found = 0;
                for (char& c : s) {
                    if (seq[idx] == c) {
                        idx++;
                        if (idx == 3) {
                            found = 1;
                            break;
                        }
                    }
                }
                res += found;
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
    countPalindromicSubsequence(s) {
        let res = 0;
        for (let ends = 'a'.charCodeAt(0); ends <= 'z'.charCodeAt(0); ends++) {
            for (let mid = 'a'.charCodeAt(0); mid <= 'z'.charCodeAt(0); mid++) {
                const seq =
                    String.fromCharCode(ends) +
                    String.fromCharCode(mid) +
                    String.fromCharCode(ends);
                let idx = 0,
                    found = 0;
                for (const c of s) {
                    if (seq[idx] === c) {
                        idx++;
                        if (idx === 3) {
                            found = 1;
                            break;
                        }
                    }
                }
                res += found;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 4. Iterate On Middle Characters

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = set()
        left = set()
        right = collections.Counter(s)

        for i in range(len(s)):
            right[s[i]] -= 1
            if right[s[i]] == 0:
                right.pop(s[i])

            for j in range(26):
                c = chr(ord('a') + j)
                if c in left and c in right:
                    res.add((s[i], c))
            left.add(s[i])

        return len(res)
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        Set<String> res = new HashSet<>();
        Set<Character> left = new HashSet<>();
        int[] right = new int[26];

        for (char c : s.toCharArray()) {
            right[c - 'a']++;
        }

        for (int i = 0; i < s.length(); i++) {
            right[s.charAt(i) - 'a']--;
            if (right[s.charAt(i) - 'a'] == 0) {
                right[s.charAt(i) - 'a'] = -1;
            }

            for (int j = 0; j < 26; j++) {
                char c = (char) (j + 'a');
                if (left.contains(c) && right[j] > 0) {
                    res.add("" + s.charAt(i) + c);
                }
            }
            left.add(s.charAt(i));
        }

        return res.size();
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        unordered_set<string> res;
        unordered_set<char> left;
        vector<int> right(26, 0);

        for (char c : s) {
            right[c - 'a']++;
        }

        for (int i = 0; i < s.length(); i++) {
            right[s[i] - 'a']--;
            if (right[s[i] - 'a'] == 0) {
                right[s[i] - 'a'] = -1;
            }

            for (int j = 0; j < 26; j++) {
                char c = 'a' + j;
                if (left.count(c) && right[j] > 0) {
                    res.insert(string() + s[i] + c);
                }
            }
            left.insert(s[i]);
        }

        return res.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    countPalindromicSubsequence(s) {
        const res = new Set();
        const left = new Set();
        const right = Array(26).fill(0);

        for (const c of s) {
            right[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }

        for (let i = 0; i < s.length; i++) {
            right[s.charCodeAt(i) - 'a'.charCodeAt(0)]--;
            if (right[s.charCodeAt(i) - 'a'.charCodeAt(0)] === 0) {
                right[s.charCodeAt(i) - 'a'.charCodeAt(0)] = -1;
            }

            for (let j = 0; j < 26; j++) {
                const c = String.fromCharCode('a'.charCodeAt(0) + j);
                if (left.has(c) && right[j] > 0) {
                    res.add(s[i] + c);
                }
            }
            left.add(s[i]);
        }

        return res.size;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the number of unique three length pallindromic subsequences (26 \* 26 = 676).

---

## 5. Prefix Count

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        n = len(s)
        prefix = [[0] * 26 for _ in range(n + 1)]
        firstIndex = [-1] * 26
        lastIndex = [-1] * 26

        for i in range(n):
            j = ord(s[i]) - ord('a')
            if firstIndex[j] == -1:
                firstIndex[j] = i
            lastIndex[j] = i
            prefix[i + 1] = prefix[i][:]
            prefix[i + 1][j] += 1

        res = 0
        for ends in range(26):
            if firstIndex[ends] == -1 or firstIndex[ends] == lastIndex[ends]:
                continue
            l, r = firstIndex[ends], lastIndex[ends]
            for mid in range(26):
                if prefix[r][mid] - prefix[l + 1][mid] > 0:
                    res += 1
        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int n = s.length();
        int[][] prefix = new int[n + 1][26];
        int[] firstIndex = new int[26];
        int[] lastIndex = new int[26];
        Arrays.fill(firstIndex, -1);
        Arrays.fill(lastIndex, -1);

        for (int i = 0; i < n; i++) {
            int j = s.charAt(i) - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
            for (int k = 0; k < 26; k++) {
                prefix[i + 1][k] = prefix[i][k];
            }
            prefix[i + 1][j]++;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            for (int mid = 0; mid < 26; mid++) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int n = s.length();
        vector<vector<int>> prefix(n + 1, vector<int>(26));
        vector<int> firstIndex(26, -1);
        vector<int> lastIndex(26, -1);

        for (int i = 0; i < n; i++) {
            int j = s[i] - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
            prefix[i + 1] = prefix[i];
            prefix[i + 1][j]++;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            for (int mid = 0; mid < 26; mid++) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++;
                }
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
    countPalindromicSubsequence(s) {
        const n = s.length;
        const prefix = Array.from({ length: n + 1 }, () => Array(26).fill(0));
        const firstIndex = Array(26).fill(-1);
        const lastIndex = Array(26).fill(-1);

        for (let i = 0; i < n; i++) {
            const j = s.charCodeAt(i) - 'a'.charCodeAt(0);
            if (firstIndex[j] === -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
            for (let k = 0; k < 26; k++) {
                prefix[i + 1][k] = prefix[i][k];
            }
            prefix[i + 1][j]++;
        }

        let res = 0;
        for (let ends = 0; ends < 26; ends++) {
            if (
                firstIndex[ends] === -1 ||
                firstIndex[ends] === lastIndex[ends]
            ) {
                continue;
            }
            const l = firstIndex[ends],
                r = lastIndex[ends];
            for (let mid = 0; mid < 26; mid++) {
                if (prefix[r][mid] - prefix[l + 1][mid] > 0) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(26 * n)$

---

## 6. First And Last Index

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        res = 0

        for i in range(26):
            c = chr(ord('a') + i)
            l, r = s.find(c), s.rfind(c)
            if l == -1 or l == r:
                continue

            mids = set()
            for j in range(l + 1, r):
                mids.add(s[j])
            res += len(mids)

        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int res = 0;

        for (char c = 'a'; c <= 'z'; c++) {
            int l = s.indexOf(c), r = s.lastIndexOf(c);
            if (l == -1 || l == r) continue;

            Set<Character> mids = new HashSet<>();
            for (int j = l + 1; j < r; j++) {
                mids.add(s.charAt(j));
            }
            res += mids.size();
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        int res = 0;

        for (char c = 'a'; c <= 'z'; c++) {
            int l = s.find(c), r = s.rfind(c);
            if (l == -1 || l == r) continue;

            unordered_set<char> mids;
            for (int j = l + 1; j < r; j++) {
                mids.insert(s[j]);
            }
            res += mids.size();
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
    countPalindromicSubsequence(s) {
        let res = 0;

        for (let i = 0; i < 26; i++) {
            const c = String.fromCharCode('a'.charCodeAt(0) + i);
            const l = s.indexOf(c),
                r = s.lastIndexOf(c);
            if (l === -1 || l === r) continue;

            const mids = new Set();
            for (let j = l + 1; j < r; j++) {
                mids.add(s[j]);
            }
            res += mids.size;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 7. First And Last Index (Optimal)

::tabs-start

```python
class Solution:
    def countPalindromicSubsequence(self, s: str) -> int:
        firstIndex = [-1] * 26
        lastIndex = [-1] * 26

        for i in range(len(s)):
            j = ord(s[i]) - ord('a')
            if firstIndex[j] == -1:
                firstIndex[j] = i
            lastIndex[j] = i

        res = 0
        for ends in range(26):
            if firstIndex[ends] == -1 or firstIndex[ends] == lastIndex[ends]:
                continue
            l, r = firstIndex[ends], lastIndex[ends]
            mask = 0
            for i in range(l + 1, r):
                c = ord(s[i]) - ord('a')
                if mask & (1 << c):
                    continue
                mask |= (1 << c)
                res += 1

        return res
```

```java
public class Solution {
    public int countPalindromicSubsequence(String s) {
        int[] firstIndex = new int[26];
        int[] lastIndex = new int[26];
        Arrays.fill(firstIndex, -1);
        Arrays.fill(lastIndex, -1);

        for (int i = 0; i < s.length(); i++) {
            int j = s.charAt(i) - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            int mask = 0;
            for (int i = l + 1; i < r; i++) {
                int c = s.charAt(i) - 'a';
                if ((mask & (1 << c)) != 0) {
                    continue;
                }
                mask |= (1 << c);
                res++;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int countPalindromicSubsequence(string s) {
        vector<int> firstIndex(26, -1);
        vector<int> lastIndex(26, -1);

        for (int i = 0; i < s.size(); i++) {
            int j = s[i] - 'a';
            if (firstIndex[j] == -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
        }

        int res = 0;
        for (int ends = 0; ends < 26; ends++) {
            if (firstIndex[ends] == -1 || firstIndex[ends] == lastIndex[ends]) {
                continue;
            }
            int l = firstIndex[ends], r = lastIndex[ends];
            int mask = 0;
            for (int i = l + 1; i < r; i++) {
                int c = s[i] - 'a';
                if (mask & (1 << c)) {
                    continue;
                }
                mask |= (1 << c);
                res++;
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
    countPalindromicSubsequence(s) {
        const firstIndex = Array(26).fill(-1);
        const lastIndex = Array(26).fill(-1);

        for (let i = 0; i < s.length; i++) {
            const j = s.charCodeAt(i) - 'a'.charCodeAt(0);
            if (firstIndex[j] === -1) {
                firstIndex[j] = i;
            }
            lastIndex[j] = i;
        }

        let res = 0;
        for (let ends = 0; ends < 26; ends++) {
            if (
                firstIndex[ends] === -1 ||
                firstIndex[ends] === lastIndex[ends]
            ) {
                continue;
            }
            const l = firstIndex[ends],
                r = lastIndex[ends];
            let mask = 0;
            for (let i = l + 1; i < r; i++) {
                const c = s.charCodeAt(i) - 'a'.charCodeAt(0);
                if (mask & (1 << c)) {
                    continue;
                }
                mask |= 1 << c;
                res++;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(26 * n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.
