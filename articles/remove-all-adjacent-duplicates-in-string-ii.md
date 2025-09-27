## 1. Brute Force

::tabs-start

```python
class Solution:
    def removeDuplicates(self, s: str, k: int) -> str:
        while s:
            flag = False
            cur = s[0]
            cnt = 1
            for i in range(1, len(s)):
                if cur != s[i]:
                    cnt = 0
                    cur = s[i]
                cnt += 1
                if cnt == k:
                    s = s[:i - cnt + 1] + s[i + 1:]
                    flag = True
                    break

            if not flag:
                break

        return s
```

```java
public class Solution {
    public String removeDuplicates(String s, int k) {
        while (s.length() != 0) {
            boolean flag = false;
            char cur = s.charAt(0);
            int cnt = 1;

            for (int i = 1; i < s.length(); i++) {
                if (cur != s.charAt(i)) {
                    cnt = 0;
                    cur = s.charAt(i);
                }
                cnt++;
                if (cnt == k) {
                    s = s.substring(0, i - cnt + 1) + s.substring(i + 1);
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

```cpp
class Solution {
public:
    string removeDuplicates(string s, int k) {
        while (s.length()) {
            bool flag = false;
            char cur = s[0];
            int cnt = 1;

            for (int i = 1; i < s.size(); i++) {
                if (cur != s[i]) {
                    cnt = 0;
                    cur = s[i];
                }
                cnt++;
                if (cnt == k) {
                    s = s.substr(0, i - cnt + 1) + s.substr(i + 1);
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
     * @param {number} k
     * @return {string}
     */
    removeDuplicates(s, k) {
        while (s) {
            let flag = false;
            let cur = s[0];
            let cnt = 1;

            for (let i = 1; i < s.length; i++) {
                if (cur !== s[i]) {
                    cnt = 0;
                    cur = s[i];
                }
                cnt++;
                if (cnt === k) {
                    s = s.slice(0, i - cnt + 1) + s.slice(i + 1);
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
    public string RemoveDuplicates(string s, int k) {
        while (s.Length != 0) {
            bool flag = false;
            char cur = s[0];
            int cnt = 1;

            for (int i = 1; i < s.Length; i++) {
                if (cur != s[i]) {
                    cnt = 0;
                    cur = s[i];
                }
                cnt++;
                if (cnt == k) {
                    s = s.Substring(0, i - cnt + 1) + s.Substring(i + 1);
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

- Time complexity: $O(\frac {n ^ 2}{k})$
- Space complexity: $O(n)$

---

## 2. Stack

::tabs-start

```python
class Solution:
    def removeDuplicates(self, s: str, k: int) -> str:
        stack = []
        n = len(s)
        i = 0
        s = list(s)

        while i < n:
            if i == 0 or s[i] != s[i - 1]:
                stack.append(1)
            else:
                stack[-1] += 1
                if stack[-1] == k:
                    stack.pop()
                    del s[i - k + 1:i + 1]
                    i -= k
                    n -= k

            i += 1

        return ''.join(s)
```

```java
public class Solution {
    public String removeDuplicates(String s, int k) {
        StringBuilder sb = new StringBuilder(s);
        Stack<Integer> stack = new Stack<>();
        int i = 0;

        while (i < sb.length()) {
            if (i == 0 || sb.charAt(i) != sb.charAt(i - 1)) {
                stack.push(1);
            } else {
                stack.push(stack.pop() + 1);
                if (stack.peek() == k) {
                    stack.pop();
                    sb.delete(i - k + 1, i + 1);
                    i -= k;
                }
            }
            i++;
        }

        return sb.toString();
    }
}
```

```cpp
class Solution {
public:
    string removeDuplicates(string s, int k) {
        vector<int> stack;
        int n = s.length(), i = 0;

        while (i < n) {
            if (i == 0 || s[i] != s[i - 1]) {
                stack.push_back(1);
            } else {
                stack.back()++;
                if (stack.back() == k) {
                    stack.pop_back();
                    s.erase(i - k + 1, k);
                    i -= k;
                    n -= k;
                }
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
     * @param {number} k
     * @return {string}
     */
    removeDuplicates(s, k) {
        let stack = [];
        let arr = s.split('');
        let i = 0;

        while (i < arr.length) {
            if (i === 0 || arr[i] !== arr[i - 1]) {
                stack.push(1);
            } else {
                stack[stack.length - 1]++;
                if (stack[stack.length - 1] === k) {
                    stack.pop();
                    arr.splice(i - k + 1, k);
                    i -= k;
                }
            }
            i++;
        }

        return arr.join('');
    }
}
```

```csharp
public class Solution {
    public string RemoveDuplicates(string s, int k) {
        var stack = new List<int>();
        var chars = new List<char>(s);
        int n = chars.Count;
        int i = 0;

        while (i < n) {
            if (i == 0 || chars[i] != chars[i - 1]) {
                stack.Add(1);
            } else {
                stack[stack.Count - 1]++;
                if (stack[stack.Count - 1] == k) {
                    stack.RemoveAt(stack.Count - 1);
                    chars.RemoveRange(i - k + 1, k);
                    i -= k;
                    n -= k;
                }
            }
            i++;
        }

        return new string(chars.ToArray());
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
    def removeDuplicates(self, s: str, k: int) -> str:
        stack = []  # [char, count]

        for c in s:
            if stack and stack[-1][0] == c:
                stack[-1][1] += 1
            else:
                stack.append([c, 1])
            if stack[-1][1] == k:
                stack.pop()

        return ''.join(char * count for char, count in stack)
```

```java
public class Solution {
    public String removeDuplicates(String s, int k) {
        Stack<int[]> stack = new Stack<>(); // [char, count]

        for (char c : s.toCharArray()) {
            if (!stack.isEmpty() && stack.peek()[0] == c) {
                stack.peek()[1]++;
            } else {
                stack.push(new int[] {c, 1});
            }
            if (stack.peek()[1] == k) {
                stack.pop();
            }
        }

        StringBuilder res = new StringBuilder();
        while (!stack.isEmpty()) {
            int[] top = stack.pop();
            res.append(String.valueOf((char) top[0]).repeat(top[1]));
        }

        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string removeDuplicates(string s, int k) {
        vector<pair<char, int>> stack;

        for (char c : s) {
            if (!stack.empty() && stack.back().first == c) {
                stack.back().second++;
            } else {
                stack.push_back({c, 1});
            }
            if (stack.back().second == k) {
                stack.pop_back();
            }
        }

        string res;
        for (auto& p : stack) {
            res.append(p.second, p.first);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {string}
     */
    removeDuplicates(s, k) {
        const stack = []; // [char, count]

        for (const c of s) {
            if (stack.length && stack[stack.length - 1][0] === c) {
                stack[stack.length - 1][1]++;
            } else {
                stack.push([c, 1]);
            }
            if (stack[stack.length - 1][1] === k) {
                stack.pop();
            }
        }

        let res = '';
        for (const [char, count] of stack) {
            res += char.repeat(count);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public string RemoveDuplicates(string s, int k) {
        var stack = new List<(char ch, int cnt)>();

        foreach (char c in s) {
            if (stack.Count > 0 && stack[stack.Count - 1].ch == c) {
                var top = stack[stack.Count - 1];
                stack[stack.Count - 1] = (top.ch, top.cnt + 1);
            } else {
                stack.Add((c, 1));
            }

            if (stack[stack.Count - 1].cnt == k) {
                stack.RemoveAt(stack.Count - 1);
            }
        }

        var sb = new System.Text.StringBuilder();
        foreach (var (ch, cnt) in stack) {
            sb.Append(new string(ch, cnt));
        }

        return sb.ToString();
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
    def removeDuplicates(self, s: str, k: int) -> str:
        i = 0
        n = len(s)
        count = [0] * n
        s = list(s)
        for j in range(n):
            s[i] = s[j]
            count[i] = 1
            if i > 0 and s[i - 1] == s[j]:
                count[i] += count[i - 1]
            if count[i] == k:
                i -= k
            i += 1
        return ''.join(s[:i])
```

```java
public class Solution {
    public String removeDuplicates(String s, int k) {
        int i = 0, n = s.length();
        char[] str = s.toCharArray();
        int[] count = new int[n];
        for (int j = 0; j < n; j++) {
            str[i] = str[j];
            count[i] = 1;
            if (i > 0 && str[i - 1] == str[j]) {
                count[i] += count[i - 1];
            }
            if (count[i] == k) {
                i -= k;
            }
            i++;
        }
        return new String(str, 0, i);
    }
}
```

```cpp
class Solution {
public:
    string removeDuplicates(string s, int k) {
        int i = 0, n = s.length();
        vector<int> count(n);
        for (int j = 0; j < n; i++, j++) {
            s[i] = s[j];
            count[i] = 1;
            if (i > 0 && s[i - 1] == s[j]) {
                count[i] += count[i - 1];
            }
            if (count[i] == k) i -= k;
        }
        return s.substr(0, i);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} k
     * @return {string}
     */
    removeDuplicates(s, k) {
        let i = 0;
        const n = s.length;
        const count = new Array(n).fill(0);
        s = s.split('');
        for (let j = 0; j < n; j++) {
            s[i] = s[j];
            count[i] = 1;
            if (i > 0 && s[i - 1] === s[j]) {
                count[i] += count[i - 1];
            }
            if (count[i] === k) {
                i -= k;
            }
            i++;
        }
        return s.slice(0, i).join('');
    }
}
```

```csharp
public class Solution {
    public string RemoveDuplicates(string s, int k) {
        int n = s.Length;
        char[] arr = s.ToCharArray();
        int[] count = new int[n];
        int i = 0;

        for (int j = 0; j < n; j++) {
            arr[i] = arr[j];
            count[i] = 1;

            if (i > 0 && arr[i - 1] == arr[j]) {
                count[i] += count[i - 1];
            }

            if (count[i] == k) {
                i -= k;
            }

            i++;
        }

        return new string(arr, 0, i);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
