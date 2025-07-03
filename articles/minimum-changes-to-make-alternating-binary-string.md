## 1. Start with Zero and One

::tabs-start

```python
class Solution:
    def minOperations(self, s: str) -> int:
        cur = cnt1 = 0
        for c in s:
            if int(c) != cur:
                cnt1 += 1
            cur ^= 1

        cur = 1
        cnt2 = 0
        for c in s:
            if int(c) != cur:
                cnt2 += 1
            cur ^= 1

        return min(cnt1, cnt2)
```

```java
public class Solution {
    public int minOperations(String s) {
        int cur = 0, cnt1 = 0;
        for (char c : s.toCharArray()) {
            if (c - '0' != cur) {
                cnt1++;
            }
            cur ^= 1;
        }

        cur = 1;
        int cnt2 = 0;
        for (char c : s.toCharArray()) {
            if (c - '0' != cur) {
                cnt2++;
            }
            cur ^= 1;
        }

        return Math.min(cnt1, cnt2);
    }
}
```

```cpp
class Solution {
public:
    int minOperations(string s) {
        int cur = 0, cnt1 = 0;
        for (char c : s) {
            if (c - '0' != cur) {
                cnt1++;
            }
            cur ^= 1;
        }

        cur = 1;
        int cnt2 = 0;
        for (char c : s) {
            if (c - '0' != cur) {
                cnt2++;
            }
            cur ^= 1;
        }

        return min(cnt1, cnt2);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minOperations(s) {
        let cur = 0,
            cnt1 = 0;
        for (let c of s) {
            if (parseInt(c) !== cur) {
                cnt1++;
            }
            cur ^= 1;
        }

        cur = 1;
        let cnt2 = 0;
        for (let c of s) {
            if (parseInt(c) !== cur) {
                cnt2++;
            }
            cur ^= 1;
        }

        return Math.min(cnt1, cnt2);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Start with Zero or One

::tabs-start

```python
class Solution:
    def minOperations(self, s: str) -> int:
        count = 0

        for i in range(len(s)):
            if i % 2 == 0:
                count += 1 if s[i] == '0' else 0
            else:
                count += 1 if s[i] == '1' else 0

        return min(count, len(s) - count)
```

```java
public class Solution {
    public int minOperations(String s) {
        int count = 0;

        for (int i = 0; i < s.length(); i++) {
            if (i % 2 == 0) {
                if (s.charAt(i) == '0') {
                    count++;
                }
            } else {
                if (s.charAt(i) == '1') {
                    count++;
                }
            }
        }

        return Math.min(count, s.length() - count);
    }
}
```

```cpp
class Solution {
public:
    int minOperations(string s) {
        int count = 0;

        for (int i = 0; i < s.size(); i++) {
            if (i % 2 == 0) {
                if (s[i] == '0') {
                    count++;
                }
            } else {
                if (s[i] == '1') {
                    count++;
                }
            }
        }

        return min(count, (int)s.size() - count);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minOperations(s) {
        let count = 0;

        for (let i = 0; i < s.length; i++) {
            if (i % 2 === 0) {
                if (s[i] === '0') {
                    count++;
                }
            } else {
                if (s[i] === '1') {
                    count++;
                }
            }
        }

        return Math.min(count, s.length - count);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
