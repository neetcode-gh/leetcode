## 1. Greedy + Two Pointers

### Intuition

We can repeatedly trim matching characters from both ends of the string. The operation requires the prefix and suffix to consist of the same character, and we must remove at least one character from each end.

Using two pointers starting at opposite ends, we check if both point to the same character. If they do, we greedily remove all consecutive occurrences of that character from both ends. This greedy choice is optimal because removing more characters now can only help (or not hurt) future operations.

### Algorithm

1. Initialize two pointers: `l` at the start and `r` at the end of the string.
2. While `l < r` and `s[l] == s[r]`:
   - Store the matching character.
   - Move `l` right past all consecutive occurrences of this character.
   - Move `r` left past all consecutive occurrences of this character.
3. The remaining length is `r - l + 1`.
4. If the pointers cross (`l > r`), the entire string was deleted, returning `0`.

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

```csharp
public class Solution {
    public int MinimumLength(string s) {
        int l = 0, r = s.Length - 1;

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
}
```

```go
func minimumLength(s string) int {
    l, r := 0, len(s)-1

    for l < r && s[l] == s[r] {
        tmp := s[l]
        for l <= r && s[l] == tmp {
            l++
        }
        for l <= r && s[r] == tmp {
            r--
        }
    }
    return r - l + 1
}
```

```kotlin
class Solution {
    fun minimumLength(s: String): Int {
        var l = 0
        var r = s.length - 1

        while (l < r && s[l] == s[r]) {
            val tmp = s[l]
            while (l <= r && s[l] == tmp) {
                l++
            }
            while (l <= r && s[r] == tmp) {
                r--
            }
        }
        return r - l + 1
    }
}
```

```swift
class Solution {
    func minimumLength(_ s: String) -> Int {
        let chars = Array(s)
        var l = 0
        var r = chars.count - 1

        while l < r && chars[l] == chars[r] {
            let tmp = chars[l]
            while l <= r && chars[l] == tmp {
                l += 1
            }
            while l <= r && chars[r] == tmp {
                r -= 1
            }
        }
        return r - l + 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
