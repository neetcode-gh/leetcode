## 1. Brute Force

### Intuition

The most direct approach is to repeatedly scan the string looking for `k` consecutive identical characters. When found, we remove them and restart the scan from the beginning since the removal might create new groups of `k` adjacent duplicates.

This process continues until a full scan completes without finding any group to remove. While straightforward, this approach is inefficient because each removal requires rescanning from the start.

### Algorithm

1. Convert the string to a mutable format (list or character array).
2. Repeatedly scan the string:
   - Track the current character and count consecutive occurrences.
   - When the count reaches `k`, remove those characters from the string, set a flag, and restart the scan.
3. If a full scan completes without any removal, exit the loop.
4. Return the resulting string.

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

```go
func removeDuplicates(s string, k int) string {
    bytes := []byte(s)
    for len(bytes) > 0 {
        flag := false
        cur := bytes[0]
        cnt := 1

        for i := 1; i < len(bytes); i++ {
            if cur != bytes[i] {
                cnt = 0
                cur = bytes[i]
            }
            cnt++
            if cnt == k {
                bytes = append(bytes[:i-cnt+1], bytes[i+1:]...)
                flag = true
                break
            }
        }

        if !flag {
            break
        }
    }

    return string(bytes)
}
```

```kotlin
class Solution {
    fun removeDuplicates(s: String, k: Int): String {
        var str = StringBuilder(s)
        while (str.isNotEmpty()) {
            var flag = false
            var cur = str[0]
            var cnt = 1

            for (i in 1 until str.length) {
                if (cur != str[i]) {
                    cnt = 0
                    cur = str[i]
                }
                cnt++
                if (cnt == k) {
                    str.delete(i - cnt + 1, i + 1)
                    flag = true
                    break
                }
            }

            if (!flag) {
                break
            }
        }

        return str.toString()
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ s: String, _ k: Int) -> String {
        var arr = Array(s)
        while !arr.isEmpty {
            var flag = false
            var cur = arr[0]
            var cnt = 1

            for i in 1..<arr.count {
                if cur != arr[i] {
                    cnt = 0
                    cur = arr[i]
                }
                cnt += 1
                if cnt == k {
                    arr.removeSubrange((i - cnt + 1)...i)
                    flag = true
                    break
                }
            }

            if !flag {
                break
            }
        }

        return String(arr)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\frac {n ^ 2}{k})$
- Space complexity: $O(n)$

---

## 2. Stack

### Intuition

To avoid rescanning the entire string after each removal, we can use a stack to track consecutive counts as we process each character. When we encounter a character, we check if it matches the previous one. If so, we increment the count; otherwise, we start a new count.

When the count reaches `k`, we remove those `k` characters and continue from where we left off. The stack helps us remember the count before the removal so we can correctly continue counting if the characters before and after the removed segment match.

### Algorithm

1. Convert the string to a mutable list and initialize an empty stack to track counts.
2. Iterate through the string with an index `i`:
   - If the current character differs from the previous, push `1` onto the stack.
   - If it matches, increment the top of the stack.
   - If the count reaches `k`, pop from the stack, delete those `k` characters, and adjust the index.
3. Continue until the end of the string.
4. Return the resulting string.

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

```go
func removeDuplicates(s string, k int) string {
    stack := []int{}
    arr := []byte(s)
    n := len(arr)
    i := 0

    for i < n {
        if i == 0 || arr[i] != arr[i-1] {
            stack = append(stack, 1)
        } else {
            stack[len(stack)-1]++
            if stack[len(stack)-1] == k {
                stack = stack[:len(stack)-1]
                arr = append(arr[:i-k+1], arr[i+1:]...)
                i -= k
                n -= k
            }
        }
        i++
    }

    return string(arr)
}
```

```kotlin
class Solution {
    fun removeDuplicates(s: String, k: Int): String {
        val stack = mutableListOf<Int>()
        val arr = StringBuilder(s)
        var n = arr.length
        var i = 0

        while (i < n) {
            if (i == 0 || arr[i] != arr[i - 1]) {
                stack.add(1)
            } else {
                stack[stack.size - 1]++
                if (stack[stack.size - 1] == k) {
                    stack.removeAt(stack.size - 1)
                    arr.delete(i - k + 1, i + 1)
                    i -= k
                    n -= k
                }
            }
            i++
        }

        return arr.toString()
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ s: String, _ k: Int) -> String {
        var stack = [Int]()
        var arr = Array(s)
        var n = arr.count
        var i = 0

        while i < n {
            if i == 0 || arr[i] != arr[i - 1] {
                stack.append(1)
            } else {
                stack[stack.count - 1] += 1
                if stack[stack.count - 1] == k {
                    stack.removeLast()
                    arr.removeSubrange((i - k + 1)...i)
                    i -= k
                    n -= k
                }
            }
            i += 1
        }

        return String(arr)
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

Instead of modifying the string and tracking counts separately, we can store both the character and its count together in the stack. This eliminates the need for in-place string manipulation and index adjustments.

Each stack entry is a pair of (character, count). When we encounter a new character, we either increment the count of the top entry (if it matches) or push a new entry. When a count reaches `k`, we simply pop that entry. Building the result at the end involves expanding each entry back into its characters.

### Algorithm

1. Initialize a stack where each entry stores a character and its consecutive count.
2. For each character in the string:
   - If the stack is non-empty and the top character matches, increment its count.
   - Otherwise, push a new entry with count `1`.
   - If the count reaches `k`, pop the entry from the stack.
3. Build the result by expanding each stack entry: repeat each character by its count.
4. Return the resulting string.

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

```go
func removeDuplicates(s string, k int) string {
    stack := [][]int{} // [char, count]

    for _, c := range s {
        if len(stack) > 0 && stack[len(stack)-1][0] == int(c) {
            stack[len(stack)-1][1]++
        } else {
            stack = append(stack, []int{int(c), 1})
        }
        if stack[len(stack)-1][1] == k {
            stack = stack[:len(stack)-1]
        }
    }

    var res strings.Builder
    for _, item := range stack {
        for i := 0; i < item[1]; i++ {
            res.WriteByte(byte(item[0]))
        }
    }

    return res.String()
}
```

```kotlin
class Solution {
    fun removeDuplicates(s: String, k: Int): String {
        val stack = mutableListOf<Pair<Char, Int>>()

        for (c in s) {
            if (stack.isNotEmpty() && stack.last().first == c) {
                stack[stack.size - 1] = c to stack.last().second + 1
            } else {
                stack.add(c to 1)
            }
            if (stack.last().second == k) {
                stack.removeLast()
            }
        }

        val res = StringBuilder()
        for ((ch, cnt) in stack) {
            res.append(ch.toString().repeat(cnt))
        }

        return res.toString()
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ s: String, _ k: Int) -> String {
        var stack = [(Character, Int)]()

        for c in s {
            if !stack.isEmpty && stack.last!.0 == c {
                stack[stack.count - 1].1 += 1
            } else {
                stack.append((c, 1))
            }
            if stack.last!.1 == k {
                stack.removeLast()
            }
        }

        var res = ""
        for (ch, cnt) in stack {
            res += String(repeating: String(ch), count: cnt)
        }

        return res
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

This approach uses the input array itself as both the working space and the result, avoiding the need for a separate stack data structure. We use two pointers: `j` reads through the original string while `i` writes the result.

A separate count array tracks consecutive occurrences at each write position. When we write a character, we check if it matches the previous written character to determine its count. If the count reaches `k`, we "rewind" the write pointer by `k` positions, effectively removing those characters.

### Algorithm

1. Convert the string to a mutable character array and create a count array of the same size.
2. Use two pointers: `j` iterates through the original string, `i` tracks the write position.
3. For each character at position `j`:
   - Copy it to position `i`.
   - Set its count to `1`. If the previous character (at `i-1`) is the same, add the previous count to the current count.
   - If the count reaches `k`, move `i` back by `k` positions.
   - Increment `i`.
4. Return the substring from `0` to `i`.

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

```go
func removeDuplicates(s string, k int) string {
    n := len(s)
    arr := []byte(s)
    count := make([]int, n)
    i := 0

    for j := 0; j < n; j++ {
        arr[i] = arr[j]
        count[i] = 1
        if i > 0 && arr[i-1] == arr[j] {
            count[i] += count[i-1]
        }
        if count[i] == k {
            i -= k
        }
        i++
    }

    return string(arr[:i])
}
```

```kotlin
class Solution {
    fun removeDuplicates(s: String, k: Int): String {
        val n = s.length
        val arr = s.toCharArray()
        val count = IntArray(n)
        var i = 0

        for (j in 0 until n) {
            arr[i] = arr[j]
            count[i] = 1
            if (i > 0 && arr[i - 1] == arr[j]) {
                count[i] += count[i - 1]
            }
            if (count[i] == k) {
                i -= k
            }
            i++
        }

        return String(arr, 0, i)
    }
}
```

```swift
class Solution {
    func removeDuplicates(_ s: String, _ k: Int) -> String {
        let n = s.count
        var arr = Array(s)
        var count = [Int](repeating: 0, count: n)
        var i = 0

        for j in 0..<n {
            arr[i] = arr[j]
            count[i] = 1
            if i > 0 && arr[i - 1] == arr[j] {
                count[i] += count[i - 1]
            }
            if count[i] == k {
                i -= k
            }
            i += 1
        }

        return String(arr.prefix(i))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
