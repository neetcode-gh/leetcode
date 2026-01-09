## 1. Iteration - I

### Intuition

We need to find the length of the last word, where words are separated by spaces. Trailing spaces complicate matters since the last word might not be at the very end of the string. By scanning forward, we track the current word's length and reset it when we encounter a new word after spaces.

### Algorithm

1. Initialize `length` to 0 and start at index 0.
2. Iterate through the string:
   - If we hit a space, skip all consecutive spaces.
   - If we've reached the end after skipping spaces, return the current `length`.
   - Otherwise, reset `length` to 0 (we're starting a new word).
   - For non-space characters, increment `length`.
3. Return `length` after the loop completes.

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

### Intuition

Scanning from the end is more direct since we only care about the last word. First skip any trailing spaces, then count characters until we hit a space or the beginning of the string. This avoids processing earlier parts of the string entirely.

### Algorithm

1. Start from the last index of the string.
2. Skip all trailing spaces by decrementing the index.
3. Count non-space characters by decrementing the index and incrementing `length` until a space is found or we reach the start.
4. Return `length`.

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

### Intuition

Most languages provide string manipulation functions that handle splitting and trimming. By splitting the string on spaces and taking the last non-empty segment, we get the last word directly. This trades some efficiency for code simplicity and readability.

### Algorithm

1. Trim trailing spaces from the string (or use split which handles this).
2. Split the string by spaces.
3. Return the length of the last element in the resulting array.

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
