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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.
