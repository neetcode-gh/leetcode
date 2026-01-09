## 1. Brute Force

::tabs-start

```python
class Solution:
    def makeGood(self, s: str) -> str:
        n = len(s)
        i = 0
        while i < n:
            if i and s[i] != s[i - 1] and s[i].lower() == s[i - 1].lower():
                s = s[:i - 1] + s[i + 1:]
                n -= 2
                i -= 2
            i += 1
        return s
```

```java
public class Solution {
    public String makeGood(String s) {
        int n = s.length();
        int i = 0;
        while (i < n) {
            if (i > 0 && s.charAt(i) != s.charAt(i - 1) &&
                Character.toLowerCase(s.charAt(i)) == Character.toLowerCase(s.charAt(i - 1))) {
                s = s.substring(0, i - 1) + s.substring(i + 1);
                n -= 2;
                i -= 2;
            }
            i++;
        }
        return s;
    }
}
```

```cpp
class Solution {
public:
    string makeGood(string s) {
        int n = s.length();
        int i = 0;
        while (i < n) {
            if (i > 0 && s[i] != s[i - 1] && tolower(s[i]) == tolower(s[i - 1])) {
                s = s.substr(0, i - 1) + s.substr(i + 1);
                n -= 2;
                i -= 2;
            }
            i++;
        }
        return s;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    makeGood(s) {
        let n = s.length;
        let i = 0;
        while (i < n) {
            if (
                i > 0 &&
                s[i] !== s[i - 1] &&
                s[i].toLowerCase() === s[i - 1].toLowerCase()
            ) {
                s = s.slice(0, i - 1) + s.slice(i + 1);
                n -= 2;
                i -= 2;
            }
            i++;
        }
        return s;
    }
}
```

```csharp
public class Solution {
    public string MakeGood(string s) {
        int n = s.Length;
        int i = 0;
        while (i < n) {
            if (i > 0 && s[i] != s[i - 1] &&
                char.ToLower(s[i]) == char.ToLower(s[i - 1])) {
                s = s.Substring(0, i - 1) + s.Substring(i + 1);
                n -= 2;
                i -= 2;
            }
            i++;
        }
        return s;
    }
}
```

```go
func makeGood(s string) string {
    n := len(s)
    i := 0
    for i < n {
        if i > 0 && s[i] != s[i-1] &&
            strings.ToLower(string(s[i])) == strings.ToLower(string(s[i-1])) {
            s = s[:i-1] + s[i+1:]
            n -= 2
            i -= 2
        }
        i++
    }
    return s
}
```

```kotlin
class Solution {
    fun makeGood(s: String): String {
        var str = s
        var n = str.length
        var i = 0
        while (i < n) {
            if (i > 0 && str[i] != str[i - 1] &&
                str[i].lowercaseChar() == str[i - 1].lowercaseChar()) {
                str = str.substring(0, i - 1) + str.substring(i + 1)
                n -= 2
                i -= 2
            }
            i++
        }
        return str
    }
}
```

```swift
class Solution {
    func makeGood(_ s: String) -> String {
        var chars = Array(s)
        var i = 0
        while i < chars.count {
            if i > 0 && chars[i] != chars[i - 1] &&
                chars[i].lowercased() == chars[i - 1].lowercased() {
                chars.remove(at: i)
                chars.remove(at: i - 1)
                i -= 2
            }
            i += 1
        }
        return String(chars)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Stack - I

::tabs-start

```python
class Solution:
    def makeGood(self, s: str) -> str:
        def lower(c):
            if ord(c) < ord('a'):
                return chr(ord('a') + ord(c) - ord('A'))
            return c

        stack = []
        i = 0
        while i < len(s):
            if stack and stack[-1] != s[i] and lower(stack[-1]) == lower(s[i]):
                stack.pop()
            else:
                stack.append(s[i])
            i += 1
        return "".join(stack)
```

```java
public class Solution {
    public String makeGood(String s) {
        StringBuilder stack = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (stack.length() > 0 && stack.charAt(stack.length() - 1) != c &&
                Character.toLowerCase(stack.charAt(stack.length() - 1)) == Character.toLowerCase(c)) {
                stack.deleteCharAt(stack.length() - 1);
            } else {
                stack.append(c);
            }
        }
        return stack.toString();
    }
}
```

```cpp
class Solution {
public:
    string makeGood(string s) {
        string stack;
        for (char c : s) {
            if (!stack.empty() && stack.back() != c &&
                tolower(stack.back()) == tolower(c)) {
                stack.pop_back();
            } else {
                stack.push_back(c);
            }
        }
        return stack;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    makeGood(s) {
        const stack = [];
        for (const c of s) {
            if (
                stack.length > 0 &&
                stack[stack.length - 1] !== c &&
                stack[stack.length - 1].toLowerCase() === c.toLowerCase()
            ) {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        return stack.join('');
    }
}
```

```csharp
public class Solution {
    public string MakeGood(string s) {
        var stack = new StringBuilder();
        foreach (char c in s) {
            if (stack.Length > 0 && stack[stack.Length - 1] != c &&
                char.ToLower(stack[stack.Length - 1]) == char.ToLower(c)) {
                stack.Remove(stack.Length - 1, 1);
            } else {
                stack.Append(c);
            }
        }
        return stack.ToString();
    }
}
```

```go
func makeGood(s string) string {
    stack := []rune{}
    for _, c := range s {
        if len(stack) > 0 && stack[len(stack)-1] != c &&
            unicode.ToLower(stack[len(stack)-1]) == unicode.ToLower(c) {
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, c)
        }
    }
    return string(stack)
}
```

```kotlin
class Solution {
    fun makeGood(s: String): String {
        val stack = StringBuilder()
        for (c in s) {
            if (stack.isNotEmpty() && stack.last() != c &&
                stack.last().lowercaseChar() == c.lowercaseChar()) {
                stack.deleteCharAt(stack.length - 1)
            } else {
                stack.append(c)
            }
        }
        return stack.toString()
    }
}
```

```swift
class Solution {
    func makeGood(_ s: String) -> String {
        var stack = [Character]()
        for c in s {
            if !stack.isEmpty && stack.last! != c &&
                stack.last!.lowercased() == c.lowercased() {
                stack.removeLast()
            } else {
                stack.append(c)
            }
        }
        return String(stack)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Stack - II

::tabs-start

```python
class Solution:
    def makeGood(self, s: str) -> str:
        stack = []
        for i in range(len(s)):
            if stack and abs(ord(s[i]) - ord(stack[-1])) == 32:
                stack.pop()
            else:
                stack.append(s[i])
        return "".join(stack)
```

```java
public class Solution {
    public String makeGood(String s) {
        StringBuilder stack = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            if (stack.length() > 0 &&
                Math.abs(stack.charAt(stack.length() - 1) - s.charAt(i)) == 32) {
                stack.deleteCharAt(stack.length() - 1);
            } else {
                stack.append(s.charAt(i));
            }
        }
        return stack.toString();
    }
}
```

```cpp
class Solution {
public:
    string makeGood(string s) {
        string stack;
        for (char& c : s) {
            if (!stack.empty() && abs(stack.back() - c) == 32) {
                stack.pop_back();
            } else {
                stack.push_back(c);
            }
        }
        return stack;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    makeGood(s) {
        const stack = [];
        for (const c of s) {
            if (
                stack.length > 0 &&
                Math.abs(
                    stack[stack.length - 1].charCodeAt(0) - c.charCodeAt(0),
                ) === 32
            ) {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
        return stack.join('');
    }
}
```

```csharp
public class Solution {
    public string MakeGood(string s) {
        var stack = new StringBuilder();
        foreach (char c in s) {
            if (stack.Length > 0 &&
                Math.Abs(stack[stack.Length - 1] - c) == 32) {
                stack.Remove(stack.Length - 1, 1);
            } else {
                stack.Append(c);
            }
        }
        return stack.ToString();
    }
}
```

```go
func makeGood(s string) string {
    stack := []byte{}
    for i := 0; i < len(s); i++ {
        if len(stack) > 0 && abs(int(stack[len(stack)-1])-int(s[i])) == 32 {
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, s[i])
        }
    }
    return string(stack)
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun makeGood(s: String): String {
        val stack = StringBuilder()
        for (c in s) {
            if (stack.isNotEmpty() &&
                kotlin.math.abs(stack.last().code - c.code) == 32) {
                stack.deleteCharAt(stack.length - 1)
            } else {
                stack.append(c)
            }
        }
        return stack.toString()
    }
}
```

```swift
class Solution {
    func makeGood(_ s: String) -> String {
        var stack = [Character]()
        for c in s {
            if !stack.isEmpty &&
                abs(Int(stack.last!.asciiValue!) - Int(c.asciiValue!)) == 32 {
                stack.removeLast()
            } else {
                stack.append(c)
            }
        }
        return String(stack)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Two Pointers

::tabs-start

```python
class Solution:
    def makeGood(self, s: str) -> str:
        l = 0
        s = list(s)
        for r in range(len(s)):
            if l > 0 and abs(ord(s[r]) - ord(s[l - 1])) == 32:
                l -= 1
            else:
                s[l] = s[r]
                l += 1
        return ''.join(s[:l])
```

```java
public class Solution {
    public String makeGood(String s) {
        int l = 0;
        char[] arr = s.toCharArray();
        for (int r = 0; r < arr.length; r++) {
            if (l > 0 && Math.abs(arr[r] - arr[l - 1]) == 32) {
                l--;
            } else {
                arr[l++] = arr[r];
            }
        }
        return new String(arr, 0, l);
    }
}
```

```cpp
class Solution {
public:
    string makeGood(string s) {
        int l = 0;
        for (int r = 0; r < s.length(); r++) {
            if (l > 0 && abs(s[r] - s[l - 1]) == 32) {
                l--;
            } else {
                s[l++] = s[r];
            }
        }
        return s.substr(0, l);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    makeGood(s) {
        let l = 0;
        let arr = s.split('');
        for (let r = 0; r < arr.length; r++) {
            if (
                l > 0 &&
                Math.abs(arr[r].charCodeAt(0) - arr[l - 1].charCodeAt(0)) === 32
            ) {
                l--;
            } else {
                arr[l++] = arr[r];
            }
        }
        return arr.slice(0, l).join('');
    }
}
```

```csharp
public class Solution {
    public string MakeGood(string s) {
        int l = 0;
        char[] arr = s.ToCharArray();
        for (int r = 0; r < arr.Length; r++) {
            if (l > 0 && Math.Abs(arr[r] - arr[l - 1]) == 32) {
                l--;
            } else {
                arr[l++] = arr[r];
            }
        }
        return new string(arr, 0, l);
    }
}
```

```go
func makeGood(s string) string {
    arr := []byte(s)
    l := 0
    for r := 0; r < len(arr); r++ {
        if l > 0 && abs(int(arr[r])-int(arr[l-1])) == 32 {
            l--
        } else {
            arr[l] = arr[r]
            l++
        }
    }
    return string(arr[:l])
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun makeGood(s: String): String {
        val arr = s.toCharArray()
        var l = 0
        for (r in arr.indices) {
            if (l > 0 && kotlin.math.abs(arr[r].code - arr[l - 1].code) == 32) {
                l--
            } else {
                arr[l++] = arr[r]
            }
        }
        return String(arr, 0, l)
    }
}
```

```swift
class Solution {
    func makeGood(_ s: String) -> String {
        var arr = Array(s)
        var l = 0
        for r in 0..<arr.count {
            if l > 0 && abs(Int(arr[r].asciiValue!) - Int(arr[l - 1].asciiValue!)) == 32 {
                l -= 1
            } else {
                arr[l] = arr[r]
                l += 1
            }
        }
        return String(arr[0..<l])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.
