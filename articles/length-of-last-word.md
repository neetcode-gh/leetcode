## 1. Iteration - I

::tabs-start

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        length = i = 0
        while i < len(s):
            if s[i] == ' ':
                while i < len(s) and s[i] == ' ':
                    i += 1
                if i == len(s):
                    return length
                length = 0
            else:
                length += 1
                i += 1
        return length
```

```java
public class Solution {
    public int lengthOfLastWord(String s) {
        int length = 0, i = 0;
        while (i < s.length()) {
            if (s.charAt(i) == ' ') {
                while (i < s.length() && s.charAt(i) == ' ') {
                    i++;
                }
                if (i == s.length()) {
                    return length;
                }
                length = 0;
            } else {
                length++;
                i++;
            }
        }
        return length;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        int length = 0, i = 0;
        while (i < s.length()) {
            if (s[i] == ' ') {
                while (i < s.length() && s[i] == ' ') {
                    i++;
                }
                if (i == s.length()) {
                    return length;
                }
                length = 0;
            } else {
                length++;
                i++;
            }
        }
        return length;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLastWord(s) {
        let length = 0,
            i = 0;
        while (i < s.length) {
            if (s[i] === ' ') {
                while (i < s.length && s[i] === ' ') {
                    i++;
                }
                if (i === s.length) {
                    return length;
                }
                length = 0;
            } else {
                length++;
                i++;
            }
        }
        return length;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLastWord(string s) {
        int length = 0, i = 0;
        while (i < s.Length) {
            if (s[i] == ' ') {
                while (i < s.Length && s[i] == ' ') i++;
                if (i == s.Length) return length;
                length = 0;
            } else {
                length++;
                i++;
            }
        }
        return length;
    }
}
```

```go
func lengthOfLastWord(s string) int {
    length, i := 0, 0
    for i < len(s) {
        if s[i] == ' ' {
            for i < len(s) && s[i] == ' ' {
                i++
            }
            if i == len(s) {
                return length
            }
            length = 0
        } else {
            length++
            i++
        }
    }
    return length
}
```

```kotlin
class Solution {
    fun lengthOfLastWord(s: String): Int {
        var length = 0
        var i = 0
        while (i < s.length) {
            if (s[i] == ' ') {
                while (i < s.length && s[i] == ' ') i++
                if (i == s.length) return length
                length = 0
            } else {
                length++
                i++
            }
        }
        return length
    }
}
```

```swift
class Solution {
    func lengthOfLastWord(_ s: String) -> Int {
        let chars = Array(s)
        var length = 0
        var i = 0
        while i < chars.count {
            if chars[i] == " " {
                while i < chars.count && chars[i] == " " {
                    i += 1
                }
                if i == chars.count {
                    return length
                }
                length = 0
            } else {
                length += 1
                i += 1
            }
        }
        return length
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Iteration - II

::tabs-start

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        i, length = len(s) - 1, 0
        while s[i] == ' ':
            i -= 1
        while i >= 0 and s[i] != ' ':
            i -= 1
            length += 1
        return length
```

```java
public class Solution {
    public int lengthOfLastWord(String s) {
        int n = s.length();
        int i = n - 1, length = 0;
        while (s.charAt(i) == ' ') {
            i--;
        }
        while (i >= 0 && s.charAt(i) != ' ') {
            i--;
            length++;
        }
        return length;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        int n = s.length();
        int i = n - 1, length = 0;
        while (s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') {
            i--;
            length++;
        }
        return length;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLastWord(s) {
        let n = s.length;
        let i = n - 1,
            length = 0;
        while (s.charAt(i) === ' ') {
            i--;
        }
        while (i >= 0 && s.charAt(i) !== ' ') {
            i--;
            length++;
        }
        return length;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLastWord(string s) {
        int i = s.Length - 1, length = 0;
        while (i >= 0 && s[i] == ' ') i--;
        while (i >= 0 && s[i] != ' ') {
            length++;
            i--;
        }
        return length;
    }
}
```

```go
func lengthOfLastWord(s string) int {
    i, length := len(s)-1, 0
    for i >= 0 && s[i] == ' ' {
        i--
    }
    for i >= 0 && s[i] != ' ' {
        i--
        length++
    }
    return length
}
```

```kotlin
class Solution {
    fun lengthOfLastWord(s: String): Int {
        var i = s.length - 1
        var length = 0
        while (i >= 0 && s[i] == ' ') i--
        while (i >= 0 && s[i] != ' ') {
            i--
            length++
        }
        return length
    }
}
```

```swift
class Solution {
    func lengthOfLastWord(_ s: String) -> Int {
        let chars = Array(s)
        var i = chars.count - 1
        var length = 0
        while i >= 0 && chars[i] == " " {
            i -= 1
        }
        while i >= 0 && chars[i] != " " {
            i -= 1
            length += 1
        }
        return length
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Built-In Function

::tabs-start

```python
class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        return len(s.split().pop())
```

```java
public class Solution {
    public int lengthOfLastWord(String s) {
        s = s.trim();
        return s.length() - s.lastIndexOf(" ") - 1;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLastWord(string s) {
        s.erase(s.find_last_not_of(' ') + 1);
        return s.substr(s.find_last_of(' ') + 1).length();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    lengthOfLastWord(s) {
        return s.trim().split(' ').pop().length;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLastWord(string s) {
        var parts = s.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        return parts[^1].Length;
    }
}
```

```go
func lengthOfLastWord(s string) int {
    s = strings.TrimSpace(s)
    lastIndex := strings.LastIndex(s, " ")
    return len(s) - lastIndex - 1
}
```

```kotlin
class Solution {
    fun lengthOfLastWord(s: String): Int {
        return s.trim().split(" ").last().length
    }
}
```

```swift
class Solution {
    func lengthOfLastWord(_ s: String) -> Int {
        return s.split(separator: " ").last?.count ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
