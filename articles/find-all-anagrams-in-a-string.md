## 1. Brute Force

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n, m = len(s), len(p)
        p = sorted(p)
        res = []
        for i in range(n - m + 1):
            sub = sorted(s[i : i + m])
            if sub == p:
                res.append(i)
        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n = s.length(), m = p.length();
        List<Integer> res = new ArrayList<>();
        char[] pArr = p.toCharArray();
        Arrays.sort(pArr);
        String sortedP = new String(pArr);

        for (int i = 0; i <= n - m; i++) {
            char[] subArr = s.substring(i, i + m).toCharArray();
            Arrays.sort(subArr);
            if (new String(subArr).equals(sortedP)) {
                res.add(i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.size(), m = p.size();
        vector<int> res;
        sort(p.begin(), p.end());

        for (int i = 0; i <= n - m; i++) {
            string sub = s.substr(i, m);
            sort(sub.begin(), sub.end());
            if (sub == p) {
                res.push_back(i);
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
     * @param {string} p
     * @return {number[]}
     */
    findAnagrams(s, p) {
        const n = s.length,
            m = p.length;
        const res = [];
        const sortedP = p.split('').sort().join('');

        for (let i = 0; i <= n - m; i++) {
            const sub = s
                .substring(i, i + m)
                .split('')
                .sort()
                .join('');
            if (sub === sortedP) {
                res.push(i);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m \log m)$
- Space complexity: $O(m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.

---

## 2. Prefix Count + Sliding Window

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n, m = len(s), len(p)
        if m > n:
            return []
        pCount = [0] * 26
        for c in p:
            pCount[ord(c) - ord('a')] += 1

        prefix = [[0] * 26 for _ in range(n + 1)]
        for i in range(1, n + 1):
            for j in range(26):
                prefix[i][j] = prefix[i - 1][j]
            prefix[i][ord(s[i - 1]) - ord('a')] += 1

        i, j = 0, m - 1
        res = []
        while j < n:
            isValid = True
            for c in range(26):
                if prefix[j + 1][c] - prefix[i][c] != pCount[c]:
                    isValid = False
                    break
            if isValid:
                res.append(i)
            i += 1
            j += 1

        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n = s.length(), m = p.length();
        if (m > n) return new ArrayList<>();

        int[] pCount = new int[26];
        for (char c : p.toCharArray()) {
            pCount[c - 'a']++;
        }

        int[][] prefix = new int[n + 1][26];
        for (int i = 1; i <= n; i++) {
            System.arraycopy(prefix[i - 1], 0, prefix[i], 0, 26);
            prefix[i][s.charAt(i - 1) - 'a']++;
        }

        List<Integer> res = new ArrayList<>();
        int i = 0, j = m - 1;
        while (j < n) {
            boolean isValid = true;
            for (int c = 0; c < 26; c++) {
                if (prefix[j + 1][c] - prefix[i][c] != pCount[c]) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) res.add(i);
            i++;
            j++;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.size(), m = p.size();
        if (m > n) return {};

        vector<int> pCount(26, 0);
        for (char c : p) pCount[c - 'a']++;

        vector<vector<int>> prefix(n + 1, vector<int>(26, 0));
        for (int i = 1; i <= n; i++) {
            prefix[i] = prefix[i - 1];
            prefix[i][s[i - 1] - 'a']++;
        }

        vector<int> res;
        int i = 0, j = m - 1;
        while (j < n) {
            bool isValid = true;
            for (int c = 0; c < 26; c++) {
                if (prefix[j + 1][c] - prefix[i][c] != pCount[c]) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) res.push_back(i);
            i++;
            j++;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @return {number[]}
     */
    findAnagrams(s, p) {
        const n = s.length,
            m = p.length;
        if (m > n) return [];

        const pCount = Array(26).fill(0);
        for (const c of p) {
            pCount[c.charCodeAt(0) - 97]++;
        }

        const prefix = Array.from({ length: n + 1 }, () => Array(26).fill(0));
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < 26; j++) {
                prefix[i][j] = prefix[i - 1][j];
            }
            prefix[i][s.charCodeAt(i - 1) - 97]++;
        }

        const res = [];
        let i = 0,
            j = m - 1;
        while (j < n) {
            let isValid = true;
            for (let c = 0; c < 26; c++) {
                if (prefix[j + 1][c] - prefix[i][c] !== pCount[c]) {
                    isValid = false;
                    break;
                }
            }
            if (isValid) res.push(i);
            i++;
            j++;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.

---

## 3. Sliding Window

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(p) > len(s): return []
        pCount, sCount = {}, {}
        for i in range(len(p)):
            pCount[p[i]] = 1 + pCount.get(p[i], 0)
            sCount[s[i]] = 1+ sCount.get(s[i], 0)

        res = [0] if sCount == pCount else []
        l = 0
        for r in range(len(p), len(s)):
            sCount[s[r]] = 1+ sCount.get(s[r], 0)
            sCount[s[l]] -= 1

            if sCount[s[l]] == 0:
                sCount.pop(s[l])
            l += 1
            if sCount == pCount:
                res.append(l)
        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        if (p.length() > s.length()) return new ArrayList<>();

        int[] pCount = new int[26];
        int[] sCount = new int[26];

        for (char c : p.toCharArray()) {
            pCount[c - 'a']++;
        }
        for (int i = 0; i < p.length(); i++) {
            sCount[s.charAt(i) - 'a']++;
        }

        List<Integer> res = new ArrayList<>();
        if (Arrays.equals(pCount, sCount)) res.add(0);

        int l = 0;
        for (int r = p.length(); r < s.length(); r++) {
            sCount[s.charAt(r) - 'a']++;
            sCount[s.charAt(l) - 'a']--;
            l++;
            if (Arrays.equals(pCount, sCount)) {
                res.add(l);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        if (p.size() > s.size()) return {};

        vector<int> pCount(26, 0), sCount(26, 0);
        for (char c : p) {
            pCount[c - 'a']++;
        }
        for (int i = 0; i < p.size(); i++) {
            sCount[s[i] - 'a']++;
        }

        vector<int> res;
        if (pCount == sCount) res.push_back(0);

        int l = 0;
        for (int r = p.size(); r < s.size(); r++) {
            sCount[s[r] - 'a']++;
            sCount[s[l] - 'a']--;
            l++;
            if (pCount == sCount) {
                res.push_back(l);
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
     * @param {string} p
     * @return {number[]}
     */
    findAnagrams(s, p) {
        if (p.length > s.length) return [];

        const pCount = new Array(26).fill(0);
        const sCount = new Array(26).fill(0);

        for (const char of p) {
            pCount[char.charCodeAt(0) - 97]++;
        }
        for (let i = 0; i < p.length; i++) {
            sCount[s.charCodeAt(i) - 97]++;
        }

        const res = [];
        if (pCount.toString() === sCount.toString()) res.push(0);

        let l = 0;
        for (let r = p.length; r < s.length; r++) {
            sCount[s.charCodeAt(r) - 97]++;
            sCount[s.charCodeAt(l) - 97]--;
            l++;
            if (pCount.toString() === sCount.toString()) {
                res.push(l);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.

---

## 4. Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        n, m = len(s), len(p)
        if m > n:
            return []

        pCount = [0] * 26
        sCount = [0] * 26
        for i in range(m):
            pCount[ord(p[i]) - ord('a')] += 1
            sCount[ord(s[i]) - ord('a')] += 1

        match = sum(1 for i in range(26) if pCount[i] == sCount[i])
        res = []
        if match == 26:
            res.append(0)

        l = 0
        for r in range(m, n):
            c = ord(s[l]) - ord('a')
            if sCount[c] == pCount[c]:
                match -= 1
            sCount[c] -= 1
            l += 1
            if sCount[c] == pCount[c]:
                match += 1

            c = ord(s[r]) - ord('a')
            if sCount[c] == pCount[c]:
                match -= 1
            sCount[c] += 1
            if sCount[c] == pCount[c]:
                match += 1

            if match == 26:
                res.append(l)

        return res
```

```java
public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        int n = s.length(), m = p.length();
        if (m > n) return new ArrayList<>();

        int[] pCount = new int[26], sCount = new int[26];
        for (int i = 0; i < m; i++) {
            pCount[p.charAt(i) - 'a']++;
            sCount[s.charAt(i) - 'a']++;
        }

        int match = 0;
        for (int i = 0; i < 26; i++) {
            if (pCount[i] == sCount[i]) match++;
        }

        List<Integer> res = new ArrayList<>();
        if (match == 26) res.add(0);

        int l = 0;
        for (int r = m; r < n; r++) {
            int c = s.charAt(l) - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]--;
            l++;
            if (sCount[c] == pCount[c]) match++;

            c = s.charAt(r) - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]++;
            if (sCount[c] == pCount[c]) match++;

            if (match == 26) res.add(l);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        int n = s.size(), m = p.size();
        if (m > n) return {};

        vector<int> pCount(26, 0), sCount(26, 0);
        for (int i = 0; i < m; i++) {
            pCount[p[i] - 'a']++;
            sCount[s[i] - 'a']++;
        }

        int match = 0;
        for (int i = 0; i < 26; i++) {
            if (pCount[i] == sCount[i]) match++;
        }

        vector<int> res;
        if (match == 26) res.push_back(0);

        int l = 0;
        for (int r = m; r < n; r++) {
            int c = s[l] - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]--;
            l++;
            if (sCount[c] == pCount[c]) match++;

            c = s[r] - 'a';
            if (sCount[c] == pCount[c]) match--;
            sCount[c]++;
            if (sCount[c] == pCount[c]) match++;

            if (match == 26) res.push_back(l);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} p
     * @return {number[]}
     */
    findAnagrams(s, p) {
        const n = s.length,
            m = p.length;
        if (m > n) return [];

        const pCount = new Array(26).fill(0);
        const sCount = new Array(26).fill(0);

        for (let i = 0; i < m; i++) {
            pCount[p.charCodeAt(i) - 97]++;
            sCount[s.charCodeAt(i) - 97]++;
        }

        let match = 0;
        for (let i = 0; i < 26; i++) {
            if (pCount[i] === sCount[i]) match++;
        }

        const res = [];
        if (match === 26) res.push(0);

        let l = 0;
        for (let r = m; r < n; r++) {
            let c = s.charCodeAt(l) - 97;
            if (sCount[c] === pCount[c]) match--;
            sCount[c]--;
            l++;
            if (sCount[c] === pCount[c]) match++;

            c = s.charCodeAt(r) - 97;
            if (sCount[c] === pCount[c]) match--;
            sCount[c]++;
            if (sCount[c] === pCount[c]) match++;

            if (match === 26) res.push(l);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $p$.
