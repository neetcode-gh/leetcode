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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.
