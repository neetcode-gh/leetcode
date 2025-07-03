## 1. Greedy + Two Pointers

::tabs-start

```python
class Solution:
    def minimumLength(self, s: str) -> int:
        l, r = 0, len(s) - 1

        while l < r and s[l] == s[r]:
            tmp = s[l]
            while l <= r and s[l] == tmp:
                l += 1
            while l <= r and s[r] == tmp:
                r -= 1
        return r - l + 1
```

```java
public class Solution {
    public int minimumLength(String s) {
        int l = 0, r = s.length() - 1;

        while (l < r && s.charAt(l) == s.charAt(r)) {
            char tmp = s.charAt(l);
            while (l <= r && s.charAt(l) == tmp) {
                l++;
            }
            while (l <= r && s.charAt(r) == tmp) {
                r--;
            }
        }
        return r - l + 1;
    }
}
```

```cpp
class Solution {
public:
    int minimumLength(string s) {
        int l = 0, r = s.length() - 1;

        while (l < r && s[l] == s[r]) {
            char tmp = s[l];
            while (l <= r && s[l] == tmp) {
                l++;
            }
            while (l <= r && s[r] == tmp) {
                r--;
            }
        }
        return r - l + 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minimumLength(s) {
        let l = 0,
            r = s.length - 1;

        while (l < r && s[l] === s[r]) {
            const tmp = s[l];
            while (l <= r && s[l] === tmp) {
                l++;
            }
            while (l <= r && s[r] === tmp) {
                r--;
            }
        }
        return r - l + 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
