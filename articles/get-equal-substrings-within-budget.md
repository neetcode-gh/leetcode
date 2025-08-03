## 1. Brute Force

::tabs-start

```python
class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        n = len(s)
        res = 0

        for i in range(n):
            cur_cost = 0
            for j in range(i, n):
                cur_cost += abs(ord(t[j]) - ord(s[j]))
                if cur_cost > maxCost:
                    break
                res = max(res, j - i + 1)

        return res
```

```java
public class Solution {
    public int equalSubstring(String s, String t, int maxCost) {
        int n = s.length();
        int res = 0;

        for (int i = 0; i < n; i++) {
            int curCost = 0;
            for (int j = i; j < n; j++) {
                curCost += Math.abs(t.charAt(j) - s.charAt(j));
                if (curCost > maxCost) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int n = s.size();
        int res = 0;

        for (int i = 0; i < n; i++) {
            int curCost = 0;
            for (int j = i; j < n; j++) {
                curCost += abs(t[j] - s[j]);
                if (curCost > maxCost) {
                    break;
                }
                res = max(res, j - i + 1);
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
     * @param {string} t
     * @param {number} maxCost
     * @return {number}
     */
    equalSubstring(s, t, maxCost) {
        const n = s.length;
        let res = 0;

        for (let i = 0; i < n; i++) {
            let curCost = 0;
            for (let j = i; j < n; j++) {
                curCost += Math.abs(t.charCodeAt(j) - s.charCodeAt(j));
                if (curCost > maxCost) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Sliding Window

::tabs-start

```python
class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        curCost = 0
        l = 0
        res = 0

        for r in range(len(s)):
            curCost += abs(ord(s[r]) - ord(t[r]))
            while curCost > maxCost:
                curCost -= abs(ord(s[l]) - ord(t[l]))
                l += 1
            res = max(res, r - l + 1)

        return res
```

```java
public class Solution {
    public int equalSubstring(String s, String t, int maxCost) {
        int curCost = 0, l = 0, res = 0;

        for (int r = 0; r < s.length(); r++) {
            curCost += Math.abs(s.charAt(r) - t.charAt(r));
            while (curCost > maxCost) {
                curCost -= Math.abs(s.charAt(l) - t.charAt(l));
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int curCost = 0, l = 0, res = 0;

        for (int r = 0; r < s.length(); r++) {
            curCost += abs(s[r] - t[r]);
            while (curCost > maxCost) {
                curCost -= abs(s[l] - t[l]);
                l++;
            }
            res = max(res, r - l + 1);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @param {number} maxCost
     * @return {number}
     */
    equalSubstring(s, t, maxCost) {
        let curCost = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < s.length; r++) {
            curCost += Math.abs(s.charCodeAt(r) - t.charCodeAt(r));
            while (curCost > maxCost) {
                curCost -= Math.abs(s.charCodeAt(l) - t.charCodeAt(l));
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Sliding Window (Optimal)

::tabs-start

```python
class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        l = 0
        for r in range(len(s)):
            maxCost -= abs(ord(s[r]) - ord(t[r]))
            if maxCost < 0:
                maxCost += abs(ord(s[l]) - ord(t[l]))
                l += 1
        return len(s) - l
```

```java
public class Solution {
    public int equalSubstring(String s, String t, int maxCost) {
        int l = 0;
        for (int r = 0; r < s.length(); r++) {
            maxCost -= Math.abs(s.charAt(r) - t.charAt(r));
            if (maxCost < 0) {
                maxCost += Math.abs(s.charAt(l) - t.charAt(l));
                l++;
            }
        }
        return s.length() - l;
    }
}
```

```cpp
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int l = 0;
        for (int r = 0; r < s.length(); r++) {
            maxCost -= abs(s[r] - t[r]);
            if (maxCost < 0) {
                maxCost += abs(s[l] - t[l]);
                l++;
            }
        }
        return s.length() - l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @param {number} maxCost
     * @return {number}
     */
    equalSubstring(s, t, maxCost) {
        let l = 0;
        for (let r = 0; r < s.length; r++) {
            maxCost -= Math.abs(s.charCodeAt(r) - t.charCodeAt(r));
            if (maxCost < 0) {
                maxCost += Math.abs(s.charCodeAt(l) - t.charCodeAt(l));
                l++;
            }
        }
        return s.length - l;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
