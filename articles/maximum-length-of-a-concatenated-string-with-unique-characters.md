## 1. Backtracking (Hash Set)

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        charSet = set()

        def overlap(charSet, s):
            prev = set()
            for c in s:
                if c in charSet or c in prev:
                    return True
                prev.add(c)
            return False

        def backtrack(i):
            if i == len(arr):
                return len(charSet)

            res = 0
            if not overlap(charSet, arr[i]):
                for c in arr[i]:
                    charSet.add(c)
                res = backtrack(i + 1)
                for c in arr[i]:
                    charSet.remove(c)

            return max(res, backtrack(i + 1))

        return backtrack(0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        Set<Character> charSet = new HashSet<>();
        return backtrack(0, arr, charSet);
    }

    private boolean overlap(Set<Character> charSet, String s) {
        Set<Character> prev = new HashSet<>();
        for (char c : s.toCharArray()) {
            if (charSet.contains(c) || prev.contains(c)) {
                return true;
            }
            prev.add(c);
        }
        return false;
    }

    private int backtrack(int i, List<String> arr, Set<Character> charSet) {
        if (i == arr.size()) {
            return charSet.size();
        }

        int res = 0;
        if (!overlap(charSet, arr.get(i))) {
            for (char c : arr.get(i).toCharArray()) {
                charSet.add(c);
            }
            res = backtrack(i + 1, arr, charSet);
            for (char c : arr.get(i).toCharArray()) {
                charSet.remove(c);
            }
        }

        return Math.max(res, backtrack(i + 1, arr, charSet));
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        unordered_set<char> charSet;
        return backtrack(0, arr, charSet);
    }

private:
    bool overlap(unordered_set<char>& charSet, const string& s) {
        unordered_set<char> prev;
        for (char c : s) {
            if (charSet.count(c) || prev.count(c)) {
                return true;
            }
            prev.insert(c);
        }
        return false;
    }

    int backtrack(int i, vector<string>& arr, unordered_set<char>& charSet) {
        if (i == arr.size()) {
            return charSet.size();
        }

        int res = 0;
        if (!overlap(charSet, arr[i])) {
            for (char c : arr[i]) {
                charSet.insert(c);
            }
            res = backtrack(i + 1, arr, charSet);
            for (char c : arr[i]) {
                charSet.erase(c);
            }
        }

        return max(res, backtrack(i + 1, arr, charSet));
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let charSet = new Set();

        const overlap = (charSet, s) => {
            let prev = new Set();
            for (const c of s) {
                if (charSet.has(c) || prev.has(c)) {
                    return true;
                }
                prev.add(c);
            }
            return false;
        };

        const backtrack = (i) => {
            if (i === arr.length) {
                return charSet.size;
            }

            let res = 0;
            if (!overlap(charSet, arr[i])) {
                for (const c of arr[i]) {
                    charSet.add(c);
                }
                res = backtrack(i + 1);
                for (const c of arr[i]) {
                    charSet.delete(c);
                }
            }

            return Math.max(res, backtrack(i + 1));
        };

        return backtrack(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 2. Backtracking (Boolean Array)

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        charSet = [False] * 26

        def getIdx(c):
            return ord(c) - ord('a')

        def overlap(charSet, s):
            for i in range(len(s)):
                c = getIdx(s[i])
                if charSet[c]:
                    for j in range(i):
                        charSet[getIdx(s[j])] = False
                    return True
                charSet[c] = True
            return False

        def backtrack(i):
            if i == len(arr):
                return 0

            res = 0
            if not overlap(charSet, arr[i]):
                res = len(arr[i]) + backtrack(i + 1)
                for c in arr[i]:
                    charSet[getIdx(c)] = False
            return max(res, backtrack(i + 1))

        return backtrack(0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        boolean[] charSet = new boolean[26];
        return backtrack(0, arr, charSet);
    }

    private int getIdx(char c) {
        return c - 'a';
    }

    private boolean overlap(boolean[] charSet, String s) {
        for (int i = 0; i < s.length(); i++) {
            int c = getIdx(s.charAt(i));
            if (charSet[c]) {
                for (int j = 0; j < i; j++) {
                    charSet[getIdx(s.charAt(j))] = false;
                }
                return true;
            }
            charSet[c] = true;
        }
        return false;
    }

    private int backtrack(int i, List<String> arr, boolean[] charSet) {
        if (i == arr.size()) {
            return 0;
        }

        int res = 0;
        if (!overlap(charSet, arr.get(i))) {
            res = arr.get(i).length() + backtrack(i + 1, arr, charSet);
            for (char c : arr.get(i).toCharArray()) {
                charSet[getIdx(c)] = false;
            }
        }
        return Math.max(res, backtrack(i + 1, arr, charSet));
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        bool charSet[26] = {false};
        return backtrack(0, arr, charSet);
    }

private:
    int getIdx(char c) {
        return c - 'a';
    }

    bool overlap(bool charSet[], const string& s) {
        for (int i = 0; i < s.length(); i++) {
            int c = getIdx(s[i]);
            if (charSet[c]) {
                for (int j = 0; j < i; j++) {
                    charSet[getIdx(s[j])] = false;
                }
                return true;
            }
            charSet[c] = true;
        }
        return false;
    }

    int backtrack(int i, vector<string>& arr, bool charSet[]) {
        if (i == arr.size()) {
            return 0;
        }

        int res = 0;
        if (!overlap(charSet, arr[i])) {
            res = arr[i].length() + backtrack(i + 1, arr, charSet);
            for (char c : arr[i]) {
                charSet[getIdx(c)] = false;
            }
        }
        return max(res, backtrack(i + 1, arr, charSet));
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let charSet = new Array(26).fill(false);

        const getIdx = (c) => c.charCodeAt(0) - 'a'.charCodeAt(0);

        const overlap = (charSet, s) => {
            for (let i = 0; i < s.length; i++) {
                let c = getIdx(s[i]);
                if (charSet[c]) {
                    for (let j = 0; j < i; j++) {
                        charSet[getIdx(s[j])] = false;
                    }
                    return true;
                }
                charSet[c] = true;
            }
            return false;
        };

        const backtrack = (i) => {
            if (i === arr.length) {
                return 0;
            }

            let res = 0;
            if (!overlap(charSet, arr[i])) {
                res = arr[i].length + backtrack(i + 1);
                for (const c of arr[i]) {
                    charSet[getIdx(c)] = false;
                }
            }
            return Math.max(res, backtrack(i + 1));
        };

        return backtrack(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * 2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 3. Recursion (Bit Mask) - I

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        def getIdx(c):
            return ord(c) - ord('a')

        A = []
        for s in arr:
            cur = 0
            valid = True
            for c in s:
                if cur & (1 << getIdx(c)):
                    valid = False
                    break
                cur |= (1 << getIdx(c))

            if valid:
                A.append([cur, len(s)])

        def dfs(i, subSeq):
            if i == len(A):
                return 0

            res = dfs(i + 1, subSeq)

            curSeq, length = A[i][0], A[i][1]
            if (subSeq & curSeq) == 0:
                res = max(res, length + dfs(i + 1, subSeq | curSeq))
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        List<int[]> A = new ArrayList<>();

        for (String s : arr) {
            int cur = 0;
            boolean valid = true;

            for (char c : s.toCharArray()) {
                if ((cur & (1 << (c - 'a'))) != 0) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.add(new int[]{cur, s.length()});
            }
        }

        return dfs(0, 0, A);
    }

    private int dfs(int i, int subSeq, List<int[]> A) {
        if (i == A.size()) {
            return 0;
        }

        int res = dfs(i + 1, subSeq, A);

        int curSeq = A.get(i)[0], length = A.get(i)[1];
        if ((subSeq & curSeq) == 0) {
            res = Math.max(res, length + dfs(i + 1, subSeq | curSeq, A));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        vector<pair<int, int>> A;

        for (const string& s : arr) {
            int cur = 0;
            bool valid = true;

            for (char c : s) {
                if (cur & (1 << (c - 'a'))) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.emplace_back(cur, s.length());
            }
        }

        return dfs(0, 0, A);
    }

private:
    int dfs(int i, int subSeq, vector<pair<int, int>>& A) {
        if (i == A.size()) {
            return 0;
        }

        int res = dfs(i + 1, subSeq, A);

        int curSeq = A[i].first, length = A[i].second;
        if ((subSeq & curSeq) == 0) {
            res = max(res, length + dfs(i + 1, subSeq | curSeq, A));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let A = [];

        for (const s of arr) {
            let cur = 0;
            let valid = true;

            for (const c of s) {
                if (cur & (1 << (c.charCodeAt(0) - 97))) {
                    valid = false;
                    break;
                }
                cur |= 1 << (c.charCodeAt(0) - 97);
            }

            if (valid) {
                A.push([cur, s.length]);
            }
        }

        const dfs = (i, subSeq) => {
            if (i === A.length) {
                return 0;
            }

            let res = dfs(i + 1, subSeq);

            let [curSeq, length] = A[i];
            if ((subSeq & curSeq) === 0) {
                res = Math.max(res, length + dfs(i + 1, subSeq | curSeq));
            }
            return res;
        };

        return dfs(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n + 2 ^ n)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 4. Recursion (Bit Mask) - II

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        def getIdx(c):
            return ord(c) - ord('a')

        A = []
        for s in arr:
            cur = 0
            valid = True
            for c in s:
                if cur & (1 << getIdx(c)):
                    valid = False
                    break
                cur |= (1 << getIdx(c))

            if valid:
                A.append([cur, len(s)])

        def dfs(i, subSeq):
            res = 0
            for j in range(i, len(A)):
                curSeq, length = A[j][0], A[j][1]
                if (subSeq & curSeq) == 0:
                    res = max(res, length + dfs(j + 1, subSeq | curSeq))
            return res

        return dfs(0, 0)
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        List<int[]> A = new ArrayList<>();

        for (String s : arr) {
            int cur = 0;
            boolean valid = true;

            for (char c : s.toCharArray()) {
                if ((cur & (1 << (c - 'a'))) != 0) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.add(new int[]{cur, s.length()});
            }
        }

        return dfs(0, 0, A);
    }

    private int dfs(int i, int subSeq, List<int[]> A) {
        int res = 0;
        for (int j = i; j < A.size(); j++) {
            int curSeq = A.get(j)[0], length = A.get(j)[1];
            if ((subSeq & curSeq) == 0) {
                res = Math.max(res, length + dfs(j + 1, subSeq | curSeq, A));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        vector<pair<int, int>> A;

        for (const string& s : arr) {
            int cur = 0;
            bool valid = true;

            for (char c : s) {
                if (cur & (1 << (c - 'a'))) {
                    valid = false;
                    break;
                }
                cur |= (1 << (c - 'a'));
            }

            if (valid) {
                A.emplace_back(cur, s.length());
            }
        }

        return dfs(0, 0, A);
    }

private:
    int dfs(int i, int subSeq, vector<pair<int, int>>& A) {
        int res = 0;
        for (int j = i; j < A.size(); j++) {
            int curSeq = A[j].first, length = A[j].second;
            if ((subSeq & curSeq) == 0) {
                res = max(res, length + dfs(j + 1, subSeq | curSeq, A));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let A = [];

        for (const s of arr) {
            let cur = 0;
            let valid = true;

            for (const c of s) {
                if (cur & (1 << (c.charCodeAt(0) - 97))) {
                    valid = false;
                    break;
                }
                cur |= 1 << (c.charCodeAt(0) - 97);
            }

            if (valid) {
                A.push([cur, s.length]);
            }
        }

        const dfs = (i, subSeq) => {
            let res = 0;
            for (let j = i; j < A.length; j++) {
                let [curSeq, length] = A[j];
                if ((subSeq & curSeq) === 0) {
                    res = Math.max(res, length + dfs(j + 1, subSeq | curSeq));
                }
            }
            return res;
        };

        return dfs(0, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (m  + 2 ^ n))$
- Space complexity: $O(n)$

> Where $n$ is the number of strings and $m$ is the maximum length of a string.

---

## 5. Dynamic Programming

::tabs-start

```python
class Solution:
    def maxLength(self, arr: List[str]) -> int:
        dp = {0}
        res = 0

        for s in arr:
            cur = 0
            valid = True

            for c in s:
                bit = 1 << (ord(c) - ord('a'))
                if cur & bit:
                    valid = False
                    break
                cur |= bit

            if not valid:
                continue

            next_dp = dp.copy()
            for seq in dp:
                if (seq & cur) or (seq | cur) in dp:
                    continue
                next_dp.add(seq | cur)
                res = max(res, bin(seq | cur).count('1'))
            dp = next_dp

        return res
```

```java
public class Solution {
    public int maxLength(List<String> arr) {
        Set<Integer> dp = new HashSet<>();
        dp.add(0);
        int res = 0;

        for (String s : arr) {
            int cur = 0;
            boolean valid = true;

            for (char c : s.toCharArray()) {
                int bit = 1 << (c - 'a');
                if ((cur & bit) != 0) {
                    valid = false;
                    break;
                }
                cur |= bit;
            }

            if (!valid) {
                continue;
            }

            Set<Integer> next_dp = new HashSet<>(dp);
            for (int seq : dp) {
                if ((seq & cur) != 0 || next_dp.contains(seq | cur)) {
                    continue;
                }
                next_dp.add(seq | cur);
                res = Math.max(res, Integer.bitCount(seq | cur));
            }
            dp = next_dp;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxLength(vector<string>& arr) {
        unordered_set<int> dp;
        dp.insert(0);
        int res = 0;

        for (const string& s : arr) {
            int cur = 0;
            bool valid = true;

            for (char c : s) {
                int bit = 1 << (c - 'a');
                if (cur & bit) {
                    valid = false;
                    break;
                }
                cur |= bit;
            }

            if (!valid) {
                continue;
            }

            unordered_set<int> next_dp(dp);
            for (int seq : dp) {
                if ((seq & cur) || next_dp.count(seq | cur)) {
                    continue;
                }
                next_dp.insert(seq | cur);
                res = max(res, __builtin_popcount(seq | cur));
            }
            dp = next_dp;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} arr
     * @return {number}
     */
    maxLength(arr) {
        let dp = new Set();
        dp.add(0);
        let res = 0;

        for (const s of arr) {
            let cur = 0;
            let valid = true;

            for (const c of s) {
                let bit = 1 << (c.charCodeAt(0) - 97);
                if (cur & bit) {
                    valid = false;
                    break;
                }
                cur |= bit;
            }

            if (!valid) {
                continue;
            }

            let next_dp = new Set(dp);
            for (let seq of dp) {
                if (seq & cur || next_dp.has(seq | cur)) {
                    continue;
                }
                next_dp.add(seq | cur);
                res = Math.max(
                    res,
                    (seq | cur).toString(2).split('0').join('').length,
                );
            }
            dp = next_dp;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (m  + 2 ^ n))$
- Space complexity: $O(2 ^ n)$

> Where $n$ is the number of strings and $m$ is the maximum length of a string.
