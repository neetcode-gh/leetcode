## 1. One Pass Algorithm

::tabs-start

```python
class Solution:
    def isOneEditDistance(self, s: "str", t: "str") -> "bool":
        ns, nt = len(s), len(t)

        # Ensure that s is shorter than t.
        if ns > nt:
            return self.isOneEditDistance(t, s)

        # The strings are NOT one edit away from distance
        # if the length diff is more than 1.
        if nt - ns > 1:
            return False

        for i in range(ns):
            if s[i] != t[i]:
                # If strings have the same length
                if ns == nt:
                    return s[i + 1 :] == t[i + 1 :]
                # If strings have different lengths
                else:
                    return s[i:] == t[i + 1 :]

        # If there are no diffs in ns distance
        # The strings are one edit away only if
        # t has one more character.
        return ns + 1 == nt
```

```java
class Solution {
    public boolean isOneEditDistance(String s, String t) {
        int ns = s.length();
        int nt = t.length();

        // Ensure that s is shorter than t.
        if (ns > nt) return isOneEditDistance(t, s);

        // The strings are NOT one edit away distance
        // if the length diff is more than 1.
        if (nt - ns > 1) return false;

        for (int i = 0; i < ns; i++) {
            if (s.charAt(i) != t.charAt(i)) {
                if (ns == nt) {
                    // if strings have the same length
                    return s.substring(i + 1).equals(t.substring(i + 1));
                } else {
                    // If strings have different lengths
                    return s.substring(i).equals(t.substring(i + 1));
                }
            }
        }

        // If there are no diffs in ns distance
        // The strings are one edit away only if
        // t has one more character.
        return (ns + 1 == nt);
    }
}
```

```cpp
class Solution {
public:
    bool isOneEditDistance(string s, string t) {
        int ns = s.size();
        int nt = t.size();

        // Ensure that s is shorter than t.
        if (ns > nt) return isOneEditDistance(t, s);

        // The strings are NOT one edit away distance
        // if the length diff is more than 1.
        if (nt - ns > 1) return false;

        for (int i = 0; i < ns; i++)
            if (s[i] != t[i])
                // if strings have the same length
                if (ns == nt) return s.substr(i + 1) == t.substr(i + 1);
                // If strings have different lengths
                else
                    return s.substr(i) == t.substr(i + 1);

        // If there are no diffs in ns distance
        // The strings are one edit away only if
        // t has one more character.
        return (ns + 1 == nt);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    isOneEditDistance(s, t) {
        let ns = s.length;
        let nt = t.length;

        // Ensure that s is shorter than t.
        if (ns > nt) return isOneEditDistance(t, s);

        // The strings are NOT one edit away distance
        // if the length diff is more than 1.
        if (nt - ns > 1) return false;

        for (let i = 0; i < ns; i++)
            if (s[i] != t[i])
                if (ns == nt)
                    // if strings have the same length
                    return s.slice(i + 1) === t.slice(i + 1);
                // If strings have different lengths
                else return s.slice(i) === t.slice(i + 1);

        // If there are no diffs in ns distance
        // The strings are one edit away only if
        // t has one more character.
        return ns + 1 === nt;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$ in the worst case when string lengths are close enough `abs(ns - nt) <= 1`. $O(1)$ in the best case when `abs(ns - nt) > 1`
- Space complexity: $O(N)$ extra space used

>  where $N$ is the number of characters in the longest string
