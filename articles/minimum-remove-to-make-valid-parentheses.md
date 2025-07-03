## 1. Stack

::tabs-start

```python
class Solution:
    def minRemoveToMakeValid(self, s: str) -> str:
        res = []
        cnt = 0  # extra ( parentheses
        for c in s:
            if c == "(":
                res.append(c)
                cnt += 1
            elif c == ")" and cnt > 0:
                res.append(c)
                cnt -= 1
            elif c != ")":
                res.append(c)

        filtered = []
        for c in reversed(res):
            if c == "(" and cnt > 0:
                cnt -= 1
            else:
                filtered.append(c)
        return "".join(reversed(filtered))
```

```java
public class Solution {
    public String minRemoveToMakeValid(String s) {
        StringBuilder res = new StringBuilder();
        int cnt = 0;

        for (char c : s.toCharArray()) {
            if (c == '(') {
                res.append(c);
                cnt++;
            } else if (c == ')' && cnt > 0) {
                res.append(c);
                cnt--;
            } else if (c != ')') {
                res.append(c);
            }
        }

        StringBuilder filtered = new StringBuilder();
        for (int i = res.length() - 1; i >= 0; i--) {
            char c = res.charAt(i);
            if (c == '(' && cnt > 0) {
                cnt--;
            } else {
                filtered.append(c);
            }
        }
        return filtered.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string minRemoveToMakeValid(string s) {
        string res;
        int cnt = 0;

        for (char c : s) {
            if (c == '(') {
                res.push_back(c);
                cnt++;
            } else if (c == ')' && cnt > 0) {
                res.push_back(c);
                cnt--;
            } else if (c != ')') {
                res.push_back(c);
            }
        }

        string filtered;
        for (int i = res.size() - 1; i >= 0; i--) {
            char c = res[i];
            if (c == '(' && cnt > 0) {
                cnt--;
            } else {
                filtered.push_back(c);
            }
        }
        reverse(filtered.begin(), filtered.end());
        return filtered;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    minRemoveToMakeValid(s) {
        let res = [];
        let cnt = 0;

        for (let c of s) {
            if (c === '(') {
                res.push(c);
                cnt++;
            } else if (c === ')' && cnt > 0) {
                res.push(c);
                cnt--;
            } else if (c !== ')') {
                res.push(c);
            }
        }

        let filtered = [];
        for (let i = res.length - 1; i >= 0; i--) {
            let c = res[i];
            if (c === '(' && cnt > 0) {
                cnt--;
            } else {
                filtered.push(c);
            }
        }
        return filtered.reverse().join('');
    }
}
```

```csharp
public class Solution {
    public string MinRemoveToMakeValid(string s) {
        List<char> res = new List<char>();
        int cnt = 0;

        foreach (char c in s) {
            if (c == '(') {
                res.Add(c);
                cnt++;
            } else if (c == ')' && cnt > 0) {
                res.Add(c);
                cnt--;
            } else if (c != ')') {
                res.Add(c);
            }
        }

        List<char> filtered = new List<char>();
        for (int i = res.Count - 1; i >= 0; i--) {
            if (res[i] == '(' && cnt > 0) {
                cnt--;
            } else {
                filtered.Add(res[i]);
            }
        }

        filtered.Reverse();
        return new string(filtered.ToArray());
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Without Stack

::tabs-start

```python
class Solution:
    def minRemoveToMakeValid(self, s: str) -> str:
        arr = list(s)
        cnt = 0  # extra ( parentheses
        for i, c in enumerate(s):
            if c == "(":
                cnt += 1
            elif c == ")" and cnt > 0:
                cnt -= 1
            elif c == ")":
                arr[i] = ''

        res = []
        for c in reversed(arr):
            if c == '(' and cnt > 0:
                cnt -= 1
            else:
                res.append(c)

        return ''.join(reversed(res))
```

```java
public class Solution {
    public String minRemoveToMakeValid(String s) {
        char[] arr = s.toCharArray();
        int cnt = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(') {
                cnt++;
            } else if (c == ')' && cnt > 0) {
                cnt--;
            } else if (c == ')') {
                arr[i] = '\0';
            }
        }

        StringBuilder res = new StringBuilder();
        for (int i = arr.length - 1; i >= 0; i--) {
            char c = arr[i];
            if (c == '(' && cnt > 0) {
                cnt--;
            } else if (c != '\0') {
                res.append(c);
            }
        }

        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string minRemoveToMakeValid(string s) {
        vector<char> arr(s.begin(), s.end());
        int cnt = 0;

        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '(') {
                cnt++;
            } else if (s[i] == ')' && cnt > 0) {
                cnt--;
            } else if (s[i] == ')') {
                arr[i] = '\0';
            }
        }

        string res;
        for (int i = arr.size() - 1; i >= 0; i--) {
            if (arr[i] == '(' && cnt > 0) {
                cnt--;
            } else if (arr[i] != '\0') {
                res.push_back(arr[i]);
            }
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
    minRemoveToMakeValid(s) {
        let arr = [...s];
        let cnt = 0;

        for (let i = 0; i < s.length; i++) {
            let c = s[i];
            if (c === '(') {
                cnt++;
            } else if (c === ')' && cnt > 0) {
                cnt--;
            } else if (c === ')') {
                arr[i] = '';
            }
        }

        let res = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            let c = arr[i];
            if (c === '(' && cnt > 0) {
                cnt--;
            } else if (c !== '') {
                res.push(c);
            }
        }

        return res.reverse().join('');
    }
}
```

```csharp
public class Solution {
    public string MinRemoveToMakeValid(string s) {
        char[] arr = s.ToCharArray();
        int cnt = 0;

        for (int i = 0; i < s.Length; i++) {
            if (s[i] == '(') {
                cnt++;
            } else if (s[i] == ')' && cnt > 0) {
                cnt--;
            } else if (s[i] == ')') {
                arr[i] = '\0'; // mark invalid ')'
            }
        }

        List<char> res = new List<char>();
        for (int i = arr.Length - 1; i >= 0; i--) {
            if (arr[i] == '(' && cnt > 0) {
                cnt--;
            } else if (arr[i] != '\0') {
                res.Add(arr[i]);
            }
        }

        res.Reverse();
        return new string(res.ToArray());
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Stack (Optimal)

::tabs-start

```python
class Solution:
    def minRemoveToMakeValid(self, s: str) -> str:
        s = list(s)
        stack = []
        for i, c in enumerate(s):
            if c == '(':
                stack.append(i)
            elif c == ')':
                if stack:
                    stack.pop()
                else:
                    s[i] = ''

        while stack:
            s[stack.pop()] = ''
        return ''.join(s)
```

```java
public class Solution {
    public String minRemoveToMakeValid(String s) {
        StringBuilder sb = new StringBuilder(s);
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < sb.length(); i++) {
            if (sb.charAt(i) == '(') {
                stack.push(i);
            } else if (sb.charAt(i) == ')') {
                if (!stack.isEmpty()) {
                    stack.pop();
                } else {
                    sb.setCharAt(i, '\0');
                }
            }
        }

        while (!stack.isEmpty()) {
            sb.setCharAt(stack.pop(), '\0');
        }

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < sb.length(); i++) {
            if (sb.charAt(i) != '\0') {
                result.append(sb.charAt(i));
            }
        }
        return result.toString();
    }
}
```

```cpp
class Solution {
public:
    string minRemoveToMakeValid(string s) {
        stack<int> stack;
        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '(') {
                stack.push(i);
            } else if (s[i] == ')') {
                if (!stack.empty()) {
                    stack.pop();
                } else {
                    s[i] = '\0';
                }
            }
        }

        while (!stack.empty()) {
            s[stack.top()] = '\0';
            stack.pop();
        }

        string result;
        for (char& c : s) {
            if (c != '\0') {
                result += c;
            }
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    minRemoveToMakeValid(s) {
        const arr = [...s];
        const stack = [];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '(') {
                stack.push(i);
            } else if (arr[i] === ')') {
                if (stack.length > 0) {
                    stack.pop();
                } else {
                    arr[i] = '';
                }
            }
        }

        while (stack.length > 0) {
            arr[stack.pop()] = '';
        }

        return arr.join('');
    }
}
```

```csharp
public class Solution {
    public string MinRemoveToMakeValid(string s) {
        char[] arr = s.ToCharArray();
        Stack<int> stack = new Stack<int>();

        for (int i = 0; i < arr.Length; i++) {
            if (arr[i] == '(') {
                stack.Push(i);
            } else if (arr[i] == ')') {
                if (stack.Count > 0) {
                    stack.Pop();
                } else {
                    arr[i] = '\0';
                }
            }
        }

        while (stack.Count > 0) {
            arr[stack.Pop()] = '\0';
        }

        StringBuilder result = new StringBuilder();
        foreach (char c in arr) {
            if (c != '\0') {
                result.Append(c);
            }
        }

        return result.ToString();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Without Stack (Optimal)

::tabs-start

```python
class Solution:
    def minRemoveToMakeValid(self, s: str) -> str:
        openCnt = closeCnt = 0
        for c in s:
            closeCnt += c == ')'

        res = []
        for c in s:
            if c == '(':
                if openCnt == closeCnt:
                    continue
                openCnt += 1
            elif c == ')':
                closeCnt -= 1
                if openCnt == 0:
                    continue
                openCnt -= 1
            res.append(c)

        return ''.join(res)
```

```java
public class Solution {
    public String minRemoveToMakeValid(String s) {
        int openCnt = 0, closeCnt = 0;
        for (char c : s.toCharArray()) {
            if (c == ')') closeCnt++;
        }

        StringBuilder res = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (c == '(') {
                if (openCnt == closeCnt) continue;
                openCnt++;
            } else if (c == ')') {
                closeCnt--;
                if (openCnt == 0) continue;
                openCnt--;
            }
            res.append(c);
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string minRemoveToMakeValid(string s) {
        int openCnt = 0, closeCnt = 0;
        for (char& c : s) {
            if (c == ')') closeCnt++;
        }

        string res;
        for (char& c : s) {
            if (c == '(') {
                if (openCnt == closeCnt) continue;
                openCnt++;
            } else if (c == ')') {
                closeCnt--;
                if (openCnt == 0) continue;
                openCnt--;
            }
            res.push_back(c);
        }

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
    minRemoveToMakeValid(s) {
        let openCnt = 0,
            closeCnt = 0;
        for (const c of s) {
            if (c === ')') closeCnt++;
        }

        let res = [];
        for (const c of s) {
            if (c === '(') {
                if (openCnt === closeCnt) continue;
                openCnt++;
            } else if (c === ')') {
                closeCnt--;
                if (openCnt === 0) continue;
                openCnt--;
            }
            res.push(c);
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string MinRemoveToMakeValid(string s) {
        int openCnt = 0, closeCnt = 0;
        foreach (char c in s) {
            if (c == ')') closeCnt++;
        }

        StringBuilder res = new StringBuilder();
        foreach (char c in s) {
            if (c == '(') {
                if (openCnt == closeCnt) continue;
                openCnt++;
            } else if (c == ')') {
                closeCnt--;
                if (openCnt == 0) continue;
                openCnt--;
            }
            res.Append(c);
        }

        return res.ToString();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.
