## 1. One Pass Algorithm

### Intuition

Two strings are one edit distance apart if we can transform one into the other with exactly one operation: insert, delete, or replace a single character. The key insight is that the length difference between the strings tells us which operation is possible.

If the lengths differ by more than 1, it is impossible to make them equal with one edit. If they have the same length, we need exactly one replacement. If they differ by 1, we need exactly one insertion or deletion.

We scan both strings in parallel. When we find the first mismatch, we check if the remaining portions match according to the appropriate rule.

### Algorithm

1. Ensure `s` is the shorter string by swapping if necessary.
2. If the length difference is greater than 1, return false.
3. Iterate through the shorter string character by character:
   - When we find a mismatch at position `i`:
     - If lengths are equal, check if `s[i+1:]` equals `t[i+1:]` (one replacement).
     - If lengths differ, check if `s[i:]` equals `t[i+1:]` (one deletion from `t`).
4. If no mismatch is found, return true only if `t` has exactly one more character (the edit is appending to `s`).

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
        if (ns > nt) return this.isOneEditDistance(t, s);

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

```csharp
public class Solution {
    public bool IsOneEditDistance(string s, string t) {
        int ns = s.Length;
        int nt = t.Length;

        // Ensure that s is shorter than t.
        if (ns > nt) return IsOneEditDistance(t, s);

        // The strings are NOT one edit away distance
        // if the length diff is more than 1.
        if (nt - ns > 1) return false;

        for (int i = 0; i < ns; i++) {
            if (s[i] != t[i]) {
                if (ns == nt) {
                    // if strings have the same length
                    return s.Substring(i + 1) == t.Substring(i + 1);
                } else {
                    // If strings have different lengths
                    return s.Substring(i) == t.Substring(i + 1);
                }
            }
        }

        // If there are no diffs in ns distance
        // The strings are one edit away only if
        // t has one more character.
        return ns + 1 == nt;
    }
}
```

```go
func isOneEditDistance(s string, t string) bool {
    ns, nt := len(s), len(t)

    // Ensure that s is shorter than t.
    if ns > nt {
        return isOneEditDistance(t, s)
    }

    // The strings are NOT one edit away distance
    // if the length diff is more than 1.
    if nt-ns > 1 {
        return false
    }

    for i := 0; i < ns; i++ {
        if s[i] != t[i] {
            if ns == nt {
                // if strings have the same length
                return s[i+1:] == t[i+1:]
            } else {
                // If strings have different lengths
                return s[i:] == t[i+1:]
            }
        }
    }

    // If there are no diffs in ns distance
    // The strings are one edit away only if
    // t has one more character.
    return ns+1 == nt
}
```

```kotlin
class Solution {
    fun isOneEditDistance(s: String, t: String): Boolean {
        val ns = s.length
        val nt = t.length

        // Ensure that s is shorter than t.
        if (ns > nt) return isOneEditDistance(t, s)

        // The strings are NOT one edit away distance
        // if the length diff is more than 1.
        if (nt - ns > 1) return false

        for (i in 0 until ns) {
            if (s[i] != t[i]) {
                return if (ns == nt) {
                    // if strings have the same length
                    s.substring(i + 1) == t.substring(i + 1)
                } else {
                    // If strings have different lengths
                    s.substring(i) == t.substring(i + 1)
                }
            }
        }

        // If there are no diffs in ns distance
        // The strings are one edit away only if
        // t has one more character.
        return ns + 1 == nt
    }
}
```

```swift
class Solution {
    func isOneEditDistance(_ s: String, _ t: String) -> Bool {
        let ns = s.count
        let nt = t.count

        // Ensure that s is shorter than t.
        if ns > nt { return isOneEditDistance(t, s) }

        // The strings are NOT one edit away distance
        // if the length diff is more than 1.
        if nt - ns > 1 { return false }

        let sArr = Array(s)
        let tArr = Array(t)

        for i in 0..<ns {
            if sArr[i] != tArr[i] {
                if ns == nt {
                    // if strings have the same length
                    return String(sArr[(i + 1)...]) == String(tArr[(i + 1)...])
                } else {
                    // If strings have different lengths
                    return String(sArr[i...]) == String(tArr[(i + 1)...])
                }
            }
        }

        // If there are no diffs in ns distance
        // The strings are one edit away only if
        // t has one more character.
        return ns + 1 == nt
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$ in the worst case when string lengths are close enough `abs(ns - nt) <= 1`. $O(1)$ in the best case when `abs(ns - nt) > 1`
- Space complexity: $O(N)$ extra space used

>  where $N$ is the number of characters in the longest string
