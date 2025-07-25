## 1. Greedy (Hash Set)

::tabs-start

```python
class Solution:
    def partitionString(self, s: str) -> int:
        curSet = set()
        res = 1
        for c in s:
            if c in curSet:
                res += 1
                curSet.clear()
            curSet.add(c)
        return res
```

```java
public class Solution {
    public int partitionString(String s) {
        Set<Character> curSet = new HashSet<>();
        int res = 1;
        for (char c : s.toCharArray()) {
            if (curSet.contains(c)) {
                res++;
                curSet.clear();
            }
            curSet.add(c);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int partitionString(string s) {
        unordered_set<char> curSet;
        int res = 1;
        for (char c : s) {
            if (curSet.count(c)) {
                res++;
                curSet.clear();
            }
            curSet.insert(c);
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
    partitionString(s) {
        let curSet = new Set();
        let res = 1;
        for (let c of s) {
            if (curSet.has(c)) {
                res++;
                curSet.clear();
            }
            curSet.add(c);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 2. Greedy (Array)

::tabs-start

```python
class Solution:
    def partitionString(self, s: str) -> int:
        lastIdx = [-1] * 26
        res = 1
        start = 0
        for i, c in enumerate(s):
            j = ord(c) - ord('a')
            if lastIdx[j] >= start:
                start = i
                res += 1
            lastIdx[j] = i
        return res
```

```java
public class Solution {
    public int partitionString(String s) {
        int[] lastIdx = new int[26];
        Arrays.fill(lastIdx, -1);
        int res = 1, start = 0;
        for (int i = 0; i < s.length(); i++) {
            int j = s.charAt(i) - 'a';
            if (lastIdx[j] >= start) {
                start = i;
                res++;
            }
            lastIdx[j] = i;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int partitionString(string s) {
        vector<int> lastIdx(26, -1);
        int res = 1, start = 0;
        for (int i = 0; i < s.size(); i++) {
            int j = s[i] - 'a';
            if (lastIdx[j] >= start) {
                start = i;
                res++;
            }
            lastIdx[j] = i;
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
    partitionString(s) {
        const lastIdx = Array(26).fill(-1);
        let res = 1,
            start = 0;
        for (let i = 0; i < s.length; i++) {
            const j = s.charCodeAt(i) - 97;
            if (lastIdx[j] >= start) {
                start = i;
                res++;
            }
            lastIdx[j] = i;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we have at most $26$ different characters.

---

## 3. Greedy (Bit Mask)

::tabs-start

```python
class Solution:
    def partitionString(self, s: str) -> int:
        res = 1
        mask = 0
        for c in s:
            i = ord(c) - ord('a')
            if mask & (1 << i):
                mask = 0
                res += 1
            mask |= (1 << i)
        return res
```

```java
public class Solution {
    public int partitionString(String s) {
        int res = 1, mask = 0;
        for (char c : s.toCharArray()) {
            int i = c - 'a';
            if ((mask & (1 << i)) != 0) {
                mask = 0;
                res++;
            }
            mask |= (1 << i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int partitionString(string s) {
        int res = 1, mask = 0;
        for (char c : s) {
            int i = c - 'a';
            if (mask & (1 << i)) {
                mask = 0;
                res++;
            }
            mask |= (1 << i);
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
    partitionString(s) {
        let res = 1,
            mask = 0;
        for (const c of s) {
            const i = c.charCodeAt(0) - 97;
            if (mask & (1 << i)) {
                mask = 0;
                res++;
            }
            mask |= 1 << i;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
