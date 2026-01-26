## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Stack Data Structure** - Used to track and remove adjacent "bad" character pairs efficiently
- **ASCII Values** - Understanding character codes to detect case differences (uppercase and lowercase differ by 32)
- **String Manipulation** - Basic operations like character comparison and building result strings

---

## 1. Brute Force

### Intuition

A "bad" pair consists of the same letter in different cases adjacent to each other (like "aA" or "Aa"). We repeatedly scan the string looking for such pairs. When we find one, we remove both characters and restart the scan since removing a pair might create a new bad pair from previously non-adjacent characters.

### Algorithm

1. Start from index `0` and scan through the string.
2. At each position `i`, check if the current character and the previous character form a bad pair (same letter, different cases).
3. If a bad pair is found, remove both characters, decrease `i` by `2` to recheck, and update the string length.
4. Continue until the entire string is scanned without finding any bad pairs.
5. Return the resulting string.

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

### Intuition

A stack naturally handles the "undo" pattern we need. As we process each character, we compare it with the top of the stack. If they form a bad pair (same letter, different cases), we pop the stack, effectively removing both characters. Otherwise, we push the current character. This handles cascading removals automatically.

### Algorithm

1. Initialize an empty stack to build the result.
2. Iterate through each character in the string.
3. For each character, check if the stack is non-empty and the top character forms a bad pair with the current character (same letter when lowercased, but different original characters).
4. If they form a bad pair, pop the stack.
5. Otherwise, push the current character onto the stack.
6. Return the stack contents joined as a string.

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

### Intuition

We can simplify the bad pair check using ASCII values. In ASCII, the difference between a lowercase letter and its uppercase counterpart is exactly `32` (e.g., 'a' is 97 and 'A' is 65). So if the absolute difference between two characters is `32`, they are the same letter in different cases.

### Algorithm

1. Initialize an empty stack.
2. For each character in the string:
   - If the stack is non-empty and the absolute ASCII difference between the current character and the stack top is `32`, pop the stack.
   - Otherwise, push the current character.
3. Return the stack contents as a string.

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

### Intuition

Instead of using extra space for a stack, we can simulate it in-place using two pointers. The left pointer `l` represents the "top" of our virtual stack, while the right pointer `r` scans through the input. Characters before position `l` form our result. When we find a bad pair, we "pop" by decrementing `l`.

### Algorithm

1. Convert the string to a mutable array and initialize `l = 0`.
2. For each position `r` from `0` to the end:
   - If `l > 0` and the character at `r` forms a bad pair with the character at `l - 1` (ASCII difference of `32`), decrement `l` to "pop" the pair.
   - Otherwise, copy the character at `r` to position `l` and increment `l`.
3. Return the substring from index `0` to `l`.

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

---

## Common Pitfalls

### Checking Only for Case Difference Without Same Letter

A "bad" pair requires two conditions: the characters must be the **same letter** AND have **different cases**. Checking only `s[i] != s[i-1]` is insufficient because characters like 'a' and 'B' are different but not a bad pair. You must also verify they are the same letter when case is ignored.

### Off-by-One Errors in Index Management

When removing a bad pair and backtracking, the index must be decremented by 2 (not 1) to recheck the newly adjacent characters. Using `i -= 1` instead of `i -= 2` causes the algorithm to skip potential new bad pairs created by the removal.
