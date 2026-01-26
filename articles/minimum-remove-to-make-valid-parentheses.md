## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Stack** - Used to track indices of unmatched opening parentheses for later removal
- **Parentheses Matching** - Understanding when parentheses are balanced and how to identify invalid ones
- **Two-Pass String Processing** - First pass removes invalid closing parens, second pass removes unmatched opening parens
- **String Manipulation** - Building result strings efficiently using arrays or StringBuilder

---

## 1. Stack

### Intuition

A string of parentheses is valid when every opening parenthesis has a matching closing one, and they nest properly. The key insight is that we can process the string in two passes. In the first pass (left to right), we skip any closing parenthesis that doesn't have a matching open one. After this pass, we know exactly how many unmatched opening parentheses remain. In the second pass (right to left), we remove those excess opening parentheses from the end.

### Algorithm

1. Initialize an empty result list and a counter `cnt` to track unmatched opening parentheses.
2. First pass (left to right): For each character:
   - If it's `(`, add it to result and increment `cnt`.
   - If it's `)` and `cnt > 0`, add it and decrement `cnt` (it matches an open paren).
   - If it's `)` and `cnt == 0`, skip it (no matching open paren).
   - If it's any other character, add it to result.
3. Second pass (right to left): Traverse the result and skip the first `cnt` opening parentheses.
4. Reverse and return the filtered result as a string.

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

```go
func minRemoveToMakeValid(s string) string {
    res := []byte{}
    cnt := 0

    for i := 0; i < len(s); i++ {
        c := s[i]
        if c == '(' {
            res = append(res, c)
            cnt++
        } else if c == ')' && cnt > 0 {
            res = append(res, c)
            cnt--
        } else if c != ')' {
            res = append(res, c)
        }
    }

    filtered := []byte{}
    for i := len(res) - 1; i >= 0; i-- {
        c := res[i]
        if c == '(' && cnt > 0 {
            cnt--
        } else {
            filtered = append(filtered, c)
        }
    }

    for i, j := 0, len(filtered)-1; i < j; i, j = i+1, j-1 {
        filtered[i], filtered[j] = filtered[j], filtered[i]
    }
    return string(filtered)
}
```

```kotlin
class Solution {
    fun minRemoveToMakeValid(s: String): String {
        val res = mutableListOf<Char>()
        var cnt = 0

        for (c in s) {
            if (c == '(') {
                res.add(c)
                cnt++
            } else if (c == ')' && cnt > 0) {
                res.add(c)
                cnt--
            } else if (c != ')') {
                res.add(c)
            }
        }

        val filtered = mutableListOf<Char>()
        for (i in res.size - 1 downTo 0) {
            val c = res[i]
            if (c == '(' && cnt > 0) {
                cnt--
            } else {
                filtered.add(c)
            }
        }

        return filtered.reversed().joinToString("")
    }
}
```

```swift
class Solution {
    func minRemoveToMakeValid(_ s: String) -> String {
        var res = [Character]()
        var cnt = 0

        for c in s {
            if c == "(" {
                res.append(c)
                cnt += 1
            } else if c == ")" && cnt > 0 {
                res.append(c)
                cnt -= 1
            } else if c != ")" {
                res.append(c)
            }
        }

        var filtered = [Character]()
        for c in res.reversed() {
            if c == "(" && cnt > 0 {
                cnt -= 1
            } else {
                filtered.append(c)
            }
        }

        return String(filtered.reversed())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Without Stack

### Intuition

This approach follows the same logic as the stack solution but modifies the string in place. Instead of building a new result list during the first pass, we mark invalid closing parentheses directly in the original array. The second pass still removes excess opening parentheses from the right side.

### Algorithm

1. Convert the string to a character array and initialize counter `cnt` for unmatched opening parentheses.
2. First pass: Iterate through the array:
   - If it's `(`, increment `cnt`.
   - If it's `)` and `cnt > 0`, decrement `cnt`.
   - If it's `)` and `cnt == 0`, mark this position as empty (invalid closing paren).
3. Second pass (right to left): Skip the first `cnt` opening parentheses while building the result.
4. Reverse and return the result string.

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

```go
func minRemoveToMakeValid(s string) string {
    arr := []byte(s)
    cnt := 0

    for i := 0; i < len(s); i++ {
        if s[i] == '(' {
            cnt++
        } else if s[i] == ')' && cnt > 0 {
            cnt--
        } else if s[i] == ')' {
            arr[i] = 0
        }
    }

    res := []byte{}
    for i := len(arr) - 1; i >= 0; i-- {
        if arr[i] == '(' && cnt > 0 {
            cnt--
        } else if arr[i] != 0 {
            res = append(res, arr[i])
        }
    }

    for i, j := 0, len(res)-1; i < j; i, j = i+1, j-1 {
        res[i], res[j] = res[j], res[i]
    }
    return string(res)
}
```

```kotlin
class Solution {
    fun minRemoveToMakeValid(s: String): String {
        val arr = s.toCharArray()
        var cnt = 0

        for (i in s.indices) {
            when {
                s[i] == '(' -> cnt++
                s[i] == ')' && cnt > 0 -> cnt--
                s[i] == ')' -> arr[i] = '\u0000'
            }
        }

        val res = StringBuilder()
        for (i in arr.size - 1 downTo 0) {
            if (arr[i] == '(' && cnt > 0) {
                cnt--
            } else if (arr[i] != '\u0000') {
                res.append(arr[i])
            }
        }

        return res.reverse().toString()
    }
}
```

```swift
class Solution {
    func minRemoveToMakeValid(_ s: String) -> String {
        var arr = Array(s)
        var cnt = 0

        for i in 0..<arr.count {
            if arr[i] == "(" {
                cnt += 1
            } else if arr[i] == ")" && cnt > 0 {
                cnt -= 1
            } else if arr[i] == ")" {
                arr[i] = "\0"
            }
        }

        var res = [Character]()
        for i in stride(from: arr.count - 1, through: 0, by: -1) {
            if arr[i] == "(" && cnt > 0 {
                cnt -= 1
            } else if arr[i] != "\0" {
                res.append(arr[i])
            }
        }

        return String(res.reversed())
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Stack (Optimal)

### Intuition

Instead of using a counter, we can use a stack to store the indices of unmatched opening parentheses. When we see a closing parenthesis, we either pop from the stack (if there's a matching open) or mark it as invalid. After the first pass, any indices remaining in the stack are unmatched opening parentheses that need removal.

### Algorithm

1. Convert the string to a character array and initialize an empty `stack`.
2. Iterate through the array:
   - If it's `(`, push its index onto the `stack`.
   - If it's `)` and `stack` is not empty, pop the `stack` (found a match).
   - If it's `)` and `stack` is empty, mark this index as invalid.
3. After iteration, mark all indices remaining in the `stack` as invalid (unmatched opening parens).
4. Build the result by including only characters at valid positions.

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

```go
func minRemoveToMakeValid(s string) string {
    arr := []byte(s)
    stack := []int{}

    for i := 0; i < len(arr); i++ {
        if arr[i] == '(' {
            stack = append(stack, i)
        } else if arr[i] == ')' {
            if len(stack) > 0 {
                stack = stack[:len(stack)-1]
            } else {
                arr[i] = 0
            }
        }
    }

    for len(stack) > 0 {
        arr[stack[len(stack)-1]] = 0
        stack = stack[:len(stack)-1]
    }

    result := []byte{}
    for _, c := range arr {
        if c != 0 {
            result = append(result, c)
        }
    }
    return string(result)
}
```

```kotlin
class Solution {
    fun minRemoveToMakeValid(s: String): String {
        val arr = s.toCharArray()
        val stack = ArrayDeque<Int>()

        for (i in arr.indices) {
            if (arr[i] == '(') {
                stack.addLast(i)
            } else if (arr[i] == ')') {
                if (stack.isNotEmpty()) {
                    stack.removeLast()
                } else {
                    arr[i] = '\u0000'
                }
            }
        }

        while (stack.isNotEmpty()) {
            arr[stack.removeLast()] = '\u0000'
        }

        return arr.filter { it != '\u0000' }.joinToString("")
    }
}
```

```swift
class Solution {
    func minRemoveToMakeValid(_ s: String) -> String {
        var arr = Array(s)
        var stack = [Int]()

        for i in 0..<arr.count {
            if arr[i] == "(" {
                stack.append(i)
            } else if arr[i] == ")" {
                if !stack.isEmpty {
                    stack.removeLast()
                } else {
                    arr[i] = "\0"
                }
            }
        }

        while !stack.isEmpty {
            arr[stack.removeLast()] = "\0"
        }

        return String(arr.filter { $0 != "\0" })
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Without Stack (Optimal)

### Intuition

We can solve this in a single pass by counting closing parentheses upfront. Knowing the total number of `)` characters tells us the maximum number of `(` we can keep. As we iterate, we track how many opening parentheses we've included and use this to decide whether each parenthesis should be kept or skipped.

### Algorithm

1. Count total closing parentheses in the string (`closeCnt`).
2. Initialize `openCnt = 0` and an empty result list.
3. Iterate through each character:
   - If it's `(`: Skip it if `openCnt == closeCnt` (no room for more opens). Otherwise, increment `openCnt` and add it.
   - If it's `)`: Decrement `closeCnt`. Skip if `openCnt == 0` (no matching open). Otherwise, decrement `openCnt` and add it.
   - For other characters, add directly to result.
4. Return the result as a string.

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

```go
func minRemoveToMakeValid(s string) string {
    openCnt, closeCnt := 0, 0
    for i := 0; i < len(s); i++ {
        if s[i] == ')' {
            closeCnt++
        }
    }

    res := []byte{}
    for i := 0; i < len(s); i++ {
        c := s[i]
        if c == '(' {
            if openCnt == closeCnt {
                continue
            }
            openCnt++
        } else if c == ')' {
            closeCnt--
            if openCnt == 0 {
                continue
            }
            openCnt--
        }
        res = append(res, c)
    }

    return string(res)
}
```

```kotlin
class Solution {
    fun minRemoveToMakeValid(s: String): String {
        var openCnt = 0
        var closeCnt = s.count { it == ')' }

        val res = StringBuilder()
        for (c in s) {
            if (c == '(') {
                if (openCnt == closeCnt) continue
                openCnt++
            } else if (c == ')') {
                closeCnt--
                if (openCnt == 0) continue
                openCnt--
            }
            res.append(c)
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func minRemoveToMakeValid(_ s: String) -> String {
        var openCnt = 0
        var closeCnt = s.filter { $0 == ")" }.count

        var res = [Character]()
        for c in s {
            if c == "(" {
                if openCnt == closeCnt { continue }
                openCnt += 1
            } else if c == ")" {
                closeCnt -= 1
                if openCnt == 0 { continue }
                openCnt -= 1
            }
            res.append(c)
        }

        return String(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output string.

---

## Common Pitfalls

### Only Handling One Direction

A common mistake is only removing unmatched closing parentheses in a left-to-right pass and forgetting that opening parentheses can also be unmatched. For example, the string `"(((a"` has three unmatched `(` characters that need removal. You must either use a two-pass approach (first remove invalid `)`, then remove invalid `(`), or track indices of unmatched parentheses explicitly.

### Removing Wrong Opening Parentheses

When there are excess opening parentheses, some solutions incorrectly remove the first occurrences instead of the last ones. Since we process left-to-right to match parentheses, the unmatched `(` characters are always the rightmost ones. Removing from the left can break valid pairs that were already matched.

### Modifying String While Iterating

Attempting to modify the string in place while iterating over it leads to index shifting bugs. For instance, if you delete a character at index 3, all subsequent indices shift left by one. Use a separate result array or mark invalid positions first, then build the final string in a second pass.
