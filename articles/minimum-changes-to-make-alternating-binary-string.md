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

```csharp
public class Solution {
    public int MinOperations(string s) {
        int cur = 0, cnt1 = 0;
        foreach (char c in s) {
            if (c - '0' != cur) {
                cnt1++;
            }
            cur ^= 1;
        }

        cur = 1;
        int cnt2 = 0;
        foreach (char c in s) {
            if (c - '0' != cur) {
                cnt2++;
            }
            cur ^= 1;
        }

        return Math.Min(cnt1, cnt2);
    }
}
```

```go
func minOperations(s string) int {
    cur, cnt1 := 0, 0
    for _, c := range s {
        if int(c-'0') != cur {
            cnt1++
        }
        cur ^= 1
    }

    cur = 1
    cnt2 := 0
    for _, c := range s {
        if int(c-'0') != cur {
            cnt2++
        }
        cur ^= 1
    }

    if cnt1 < cnt2 {
        return cnt1
    }
    return cnt2
}
```

```kotlin
class Solution {
    fun minOperations(s: String): Int {
        var cur = 0
        var cnt1 = 0
        for (c in s) {
            if (c - '0' != cur) {
                cnt1++
            }
            cur = cur xor 1
        }

        cur = 1
        var cnt2 = 0
        for (c in s) {
            if (c - '0' != cur) {
                cnt2++
            }
            cur = cur xor 1
        }

        return minOf(cnt1, cnt2)
    }
}
```

```swift
class Solution {
    func minOperations(_ s: String) -> Int {
        var cur = 0
        var cnt1 = 0
        for c in s {
            if Int(String(c))! != cur {
                cnt1 += 1
            }
            cur ^= 1
        }

        cur = 1
        var cnt2 = 0
        for c in s {
            if Int(String(c))! != cur {
                cnt2 += 1
            }
            cur ^= 1
        }

        return min(cnt1, cnt2)
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

```csharp
public class Solution {
    public int MinOperations(string s) {
        int count = 0;

        for (int i = 0; i < s.Length; i++) {
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

        return Math.Min(count, s.Length - count);
    }
}
```

```go
func minOperations(s string) int {
    count := 0

    for i := 0; i < len(s); i++ {
        if i%2 == 0 {
            if s[i] == '0' {
                count++
            }
        } else {
            if s[i] == '1' {
                count++
            }
        }
    }

    if count < len(s)-count {
        return count
    }
    return len(s) - count
}
```

```kotlin
class Solution {
    fun minOperations(s: String): Int {
        var count = 0

        for (i in s.indices) {
            if (i % 2 == 0) {
                if (s[i] == '0') {
                    count++
                }
            } else {
                if (s[i] == '1') {
                    count++
                }
            }
        }

        return minOf(count, s.length - count)
    }
}
```

```swift
class Solution {
    func minOperations(_ s: String) -> Int {
        var count = 0
        let chars = Array(s)

        for i in 0..<chars.count {
            if i % 2 == 0 {
                if chars[i] == "0" {
                    count += 1
                }
            } else {
                if chars[i] == "1" {
                    count += 1
                }
            }
        }

        return min(count, chars.count - count)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
