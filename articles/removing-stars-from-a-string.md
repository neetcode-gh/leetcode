## 1. Brute Force

::tabs-start

```python
class Solution:
    def removeStars(self, s: str) -> str:
        while True:
            flag = False
            for i in range(1, len(s)):
                if s[i] == '*' and s[i - 1] != '*':
                    s = s[:i - 1] + s[i + 1:]
                    flag = True
                    break
            if not flag:
                break
        return s
```

```java
public class Solution {
    public String removeStars(String s) {
        while (true) {
            boolean flag = false;
            StringBuilder sb = new StringBuilder(s);
            for (int i = 1; i < sb.length(); i++) {
                if (sb.charAt(i) == '*' && sb.charAt(i - 1) != '*') {
                    sb.delete(i - 1, i + 1);
                    flag = true;
                    break;
                }
            }
            s = sb.toString();
            if (!flag) {
                break;
            }
        }
        return s;
    }
}
```

```cpp
class Solution {
public:
    string removeStars(string s) {
        while (true) {
            bool flag = false;
            for (int i = 1; i < s.size(); ++i) {
                if (s[i] == '*' && s[i - 1] != '*') {
                    s = s.substr(0, i - 1) + s.substr(i + 1);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                break;
            }
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
    removeStars(s) {
        while (true) {
            let flag = false;
            for (let i = 1; i < s.length; i++) {
                if (s[i] === '*' && s[i - 1] !== '*') {
                    s = s.slice(0, i - 1) + s.slice(i + 1);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                break;
            }
        }
        return s;
    }
}
```

```csharp
public class Solution {
    public string RemoveStars(string s) {
        while (true) {
            bool flag = false;
            for (int i = 1; i < s.Length; i++) {
                if (s[i] == '*' && s[i - 1] != '*') {
                    s = s.Substring(0, i - 1) + s.Substring(i + 1);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                break;
            }
        }
        return s;
    }
}
```

```go
func removeStars(s string) string {
    for {
        flag := false
        for i := 1; i < len(s); i++ {
            if s[i] == '*' && s[i-1] != '*' {
                s = s[:i-1] + s[i+1:]
                flag = true
                break
            }
        }
        if !flag {
            break
        }
    }
    return s
}
```

```kotlin
class Solution {
    fun removeStars(s: String): String {
        var str = s
        while (true) {
            var flag = false
            for (i in 1 until str.length) {
                if (str[i] == '*' && str[i - 1] != '*') {
                    str = str.substring(0, i - 1) + str.substring(i + 1)
                    flag = true
                    break
                }
            }
            if (!flag) break
        }
        return str
    }
}
```

```swift
class Solution {
    func removeStars(_ s: String) -> String {
        var str = s
        while true {
            var flag = false
            var arr = Array(str)
            for i in 1..<arr.count {
                if arr[i] == "*" && arr[i - 1] != "*" {
                    arr.remove(at: i)
                    arr.remove(at: i - 1)
                    str = String(arr)
                    flag = true
                    break
                }
            }
            if !flag { break }
        }
        return str
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 2. Brute Force (Optimized)

::tabs-start

```python
class Solution:
    def removeStars(self, s: str) -> str:
        n = len(s)
        i = 0
        while i < n:
            if i and s[i] == '*' and s[i - 1] != '*':
                s = s[:i - 1] + s[i + 1:]
                n -= 2
                i -= 2
            i += 1
        return s
```

```java
public class Solution {
    public String removeStars(String s) {
        int n = s.length();
        int i = 0;
        while (i < n) {
            if (i > 0 && s.charAt(i) == '*' && s.charAt(i - 1) != '*') {
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
    string removeStars(string s) {
        int n = s.length();
        int i = 0;
        while (i < n) {
            if (i > 0 && s[i] == '*' && s[i - 1] != '*') {
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
    removeStars(s) {
        let n = s.length;
        let i = 0;
        while (i < n) {
            if (i > 0 && s[i] === '*' && s[i - 1] !== '*') {
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
    public string RemoveStars(string s) {
        int n = s.Length;
        int i = 0;
        while (i < n) {
            if (i > 0 && s[i] == '*' && s[i - 1] != '*') {
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
func removeStars(s string) string {
    n := len(s)
    i := 0
    for i < n {
        if i > 0 && s[i] == '*' && s[i-1] != '*' {
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
    fun removeStars(s: String): String {
        var str = s
        var n = str.length
        var i = 0
        while (i < n) {
            if (i > 0 && str[i] == '*' && str[i - 1] != '*') {
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
    func removeStars(_ s: String) -> String {
        var str = Array(s)
        var i = 0
        while i < str.count {
            if i > 0 && str[i] == "*" && str[i - 1] != "*" {
                str.remove(at: i)
                str.remove(at: i - 1)
                i -= 2
            }
            i += 1
        }
        return String(str)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Stack

::tabs-start

```python
class Solution:
    def removeStars(self, s: str) -> str:
        stack = []
        for c in s:
            if c == "*":
                stack and stack.pop()
            else:
                stack.append(c)
        return "".join(stack)
```

```java
public class Solution {
    public String removeStars(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '*') {
                if (!stack.isEmpty()) stack.pop();
            } else {
                stack.push(c);
            }
        }
        StringBuilder res = new StringBuilder();
        for (char c : stack) res.append(c);
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string removeStars(string s) {
        stack<char> stack;
        for (char c : s) {
            if (c == '*') {
                if (!stack.empty()) stack.pop();
            } else {
                stack.push(c);
            }
        }
        string res;
        while (!stack.empty()) {
            res += stack.top();
            stack.pop();
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    removeStars(s) {
        const stack = [];
        for (const c of s) {
            if (c === '*') {
                if (stack.length > 0) stack.pop();
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
    public string RemoveStars(string s) {
        var stack = new System.Text.StringBuilder();
        foreach (char c in s) {
            if (c == '*') {
                if (stack.Length > 0) stack.Remove(stack.Length - 1, 1);
            } else {
                stack.Append(c);
            }
        }
        return stack.ToString();
    }
}
```

```go
func removeStars(s string) string {
    stack := []byte{}
    for i := 0; i < len(s); i++ {
        if s[i] == '*' {
            if len(stack) > 0 {
                stack = stack[:len(stack)-1]
            }
        } else {
            stack = append(stack, s[i])
        }
    }
    return string(stack)
}
```

```kotlin
class Solution {
    fun removeStars(s: String): String {
        val stack = StringBuilder()
        for (c in s) {
            if (c == '*') {
                if (stack.isNotEmpty()) stack.deleteCharAt(stack.length - 1)
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
    func removeStars(_ s: String) -> String {
        var stack = [Character]()
        for c in s {
            if c == "*" {
                if !stack.isEmpty { stack.removeLast() }
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
    def removeStars(self, s: str) -> str:
        l = 0
        s = list(s)

        for r in range(len(s)):
            if s[r] == '*':
                l -= 1
            else:
                s[l] = s[r]
                l += 1

        return ''.join(s[:l])
```

```java
public class Solution {
    public String removeStars(String s) {
        char[] arr = s.toCharArray();
        int l = 0;

        for (int r = 0; r < arr.length; r++) {
            if (arr[r] == '*') {
                l--;
            } else {
                arr[l] = arr[r];
                l++;
            }
        }
        return new String(arr, 0, l);
    }
}
```

```cpp
class Solution {
public:
    string removeStars(string s) {
        int l = 0;

        for (int r = 0; r < s.size(); r++) {
            if (s[r] == '*') {
                l--;
            } else {
                s[l] = s[r];
                l++;
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
    removeStars(s) {
        const arr = s.split('');
        let l = 0;

        for (let r = 0; r < arr.length; r++) {
            if (arr[r] === '*') {
                l--;
            } else {
                arr[l] = arr[r];
                l++;
            }
        }
        return arr.slice(0, l).join('');
    }
}
```

```csharp
public class Solution {
    public string RemoveStars(string s) {
        char[] arr = s.ToCharArray();
        int l = 0;

        for (int r = 0; r < arr.Length; r++) {
            if (arr[r] == '*') {
                l--;
            } else {
                arr[l] = arr[r];
                l++;
            }
        }
        return new string(arr, 0, l);
    }
}
```

```go
func removeStars(s string) string {
    arr := []byte(s)
    l := 0

    for r := 0; r < len(arr); r++ {
        if arr[r] == '*' {
            l--
        } else {
            arr[l] = arr[r]
            l++
        }
    }
    return string(arr[:l])
}
```

```kotlin
class Solution {
    fun removeStars(s: String): String {
        val arr = s.toCharArray()
        var l = 0

        for (r in arr.indices) {
            if (arr[r] == '*') {
                l--
            } else {
                arr[l] = arr[r]
                l++
            }
        }
        return String(arr, 0, l)
    }
}
```

```swift
class Solution {
    func removeStars(_ s: String) -> String {
        var arr = Array(s)
        var l = 0

        for r in 0..<arr.count {
            if arr[r] == "*" {
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
