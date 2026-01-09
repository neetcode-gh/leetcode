## 1. Brute Force

::tabs-start

```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        num = list(num)
        while k:
            i = 1
            while i < len(num) and num[i] >= num[i - 1]:
                i += 1
            num.pop(i - 1)
            k -= 1

        i = 0
        while i < len(num) and num[i] == '0':
            i += 1

        num = num[i:]
        return ''.join(num) if num else '0'
```

```java
public class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder sb = new StringBuilder(num);
        while (k > 0) {
            int i = 1;
            while (i < sb.length() && sb.charAt(i) >= sb.charAt(i - 1)) {
                i++;
            }
            sb.deleteCharAt(i - 1);
            k--;
        }

        int i = 0;
        while (i < sb.length() && sb.charAt(i) == '0') {
            i++;
        }

        sb = new StringBuilder(sb.substring(i));
        return sb.length() == 0 ? "0" : sb.toString();
    }
}
```

```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        while (k > 0) {
            int i = 1;
            while (i < num.size() && num[i] >= num[i - 1]) {
                i++;
            }
            num.erase(i - 1, 1);
            k--;
        }

        int i = 0;
        while (i < num.size() && num[i] == '0') {
            i++;
        }

        num = num.substr(i);
        return num.empty() ? "0" : num;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @param {number} k
     * @return {string}
     */
    removeKdigits(num, k) {
        num = num.split('');
        while (k > 0) {
            let i = 1;
            while (i < num.length && num[i] >= num[i - 1]) {
                i++;
            }
            num.splice(i - 1, 1);
            k--;
        }

        let i = 0;
        while (i < num.length && num[i] === '0') {
            i++;
        }

        num = num.slice(i);
        return num.length === 0 ? '0' : num.join('');
    }
}
```

```csharp
public class Solution {
    public string RemoveKdigits(string num, int k) {
        var sb = new System.Text.StringBuilder(num);
        while (k > 0) {
            int i = 1;
            while (i < sb.Length && sb[i] >= sb[i - 1]) {
                i++;
            }
            sb.Remove(i - 1, 1);
            k--;
        }

        int j = 0;
        while (j < sb.Length && sb[j] == '0') {
            j++;
        }

        string result = sb.ToString().Substring(j);
        return result.Length == 0 ? "0" : result;
    }
}
```

```go
func removeKdigits(num string, k int) string {
    numArr := []byte(num)
    for k > 0 {
        i := 1
        for i < len(numArr) && numArr[i] >= numArr[i-1] {
            i++
        }
        numArr = append(numArr[:i-1], numArr[i:]...)
        k--
    }

    i := 0
    for i < len(numArr) && numArr[i] == '0' {
        i++
    }

    numArr = numArr[i:]
    if len(numArr) == 0 {
        return "0"
    }
    return string(numArr)
}
```

```kotlin
class Solution {
    fun removeKdigits(num: String, k: Int): String {
        var k = k
        val sb = StringBuilder(num)
        while (k > 0) {
            var i = 1
            while (i < sb.length && sb[i] >= sb[i - 1]) {
                i++
            }
            sb.deleteCharAt(i - 1)
            k--
        }

        var i = 0
        while (i < sb.length && sb[i] == '0') {
            i++
        }

        val result = sb.substring(i)
        return if (result.isEmpty()) "0" else result
    }
}
```

```swift
class Solution {
    func removeKdigits(_ num: String, _ k: Int) -> String {
        var k = k
        var numArr = Array(num)
        while k > 0 {
            var i = 1
            while i < numArr.count && numArr[i] >= numArr[i - 1] {
                i += 1
            }
            numArr.remove(at: i - 1)
            k -= 1
        }

        var i = 0
        while i < numArr.count && numArr[i] == "0" {
            i += 1
        }

        numArr = Array(numArr[i...])
        return numArr.isEmpty ? "0" : String(numArr)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.

---

## 2. Greedy + Stack

::tabs-start

```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        stack = []
        for c in num:
            while k > 0 and stack and stack[-1] > c:
                k -= 1
                stack.pop()
            stack.append(c)

        while stack and k:
            stack.pop()
            k -= 1

        i = 0
        while i < len(stack) and stack[i] == '0':
            i += 1

        res = stack[i:]
        return ''.join(res) if res else "0"
```

```java
public class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder stack = new StringBuilder();
        for (char c : num.toCharArray()) {
            while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > c) {
                stack.deleteCharAt(stack.length() - 1);
                k--;
            }
            stack.append(c);
        }

        while (k > 0 && stack.length() > 0) {
            stack.deleteCharAt(stack.length() - 1);
            k--;
        }

        int i = 0;
        while (i < stack.length() && stack.charAt(i) == '0') {
            i++;
        }

        String res = stack.substring(i);
        return res.isEmpty() ? "0" : res;
    }
}
```

```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        string stack;
        for (char c : num) {
            while (k > 0 && !stack.empty() && stack.back() > c) {
                stack.pop_back();
                k--;
            }
            stack.push_back(c);
        }

        while (k > 0 && !stack.empty()) {
            stack.pop_back();
            k--;
        }

        int i = 0;
        while (i < stack.size() && stack[i] == '0') {
            i++;
        }

        string res = stack.substr(i);
        return res.empty() ? "0" : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @param {number} k
     * @return {string}
     */
    removeKdigits(num, k) {
        let stack = [];
        for (let c of num) {
            while (k > 0 && stack.length > 0 && stack[stack.length - 1] > c) {
                stack.pop();
                k--;
            }
            stack.push(c);
        }

        while (k > 0 && stack.length > 0) {
            stack.pop();
            k--;
        }

        let i = 0;
        while (i < stack.length && stack[i] === '0') {
            i++;
        }

        let res = stack.slice(i).join('');
        return res === '' ? '0' : res;
    }
}
```

```csharp
public class Solution {
    public string RemoveKdigits(string num, int k) {
        var stack = new System.Text.StringBuilder();
        foreach (char c in num) {
            while (k > 0 && stack.Length > 0 && stack[stack.Length - 1] > c) {
                stack.Remove(stack.Length - 1, 1);
                k--;
            }
            stack.Append(c);
        }

        while (k > 0 && stack.Length > 0) {
            stack.Remove(stack.Length - 1, 1);
            k--;
        }

        int i = 0;
        while (i < stack.Length && stack[i] == '0') {
            i++;
        }

        string res = stack.ToString().Substring(i);
        return res.Length == 0 ? "0" : res;
    }
}
```

```go
func removeKdigits(num string, k int) string {
    stack := []byte{}
    for i := 0; i < len(num); i++ {
        c := num[i]
        for k > 0 && len(stack) > 0 && stack[len(stack)-1] > c {
            stack = stack[:len(stack)-1]
            k--
        }
        stack = append(stack, c)
    }

    for k > 0 && len(stack) > 0 {
        stack = stack[:len(stack)-1]
        k--
    }

    i := 0
    for i < len(stack) && stack[i] == '0' {
        i++
    }

    res := string(stack[i:])
    if res == "" {
        return "0"
    }
    return res
}
```

```kotlin
class Solution {
    fun removeKdigits(num: String, k: Int): String {
        var k = k
        val stack = StringBuilder()
        for (c in num) {
            while (k > 0 && stack.isNotEmpty() && stack.last() > c) {
                stack.deleteCharAt(stack.length - 1)
                k--
            }
            stack.append(c)
        }

        while (k > 0 && stack.isNotEmpty()) {
            stack.deleteCharAt(stack.length - 1)
            k--
        }

        var i = 0
        while (i < stack.length && stack[i] == '0') {
            i++
        }

        val res = stack.substring(i)
        return if (res.isEmpty()) "0" else res
    }
}
```

```swift
class Solution {
    func removeKdigits(_ num: String, _ k: Int) -> String {
        var k = k
        var stack = [Character]()
        for c in num {
            while k > 0 && !stack.isEmpty && stack.last! > c {
                stack.removeLast()
                k -= 1
            }
            stack.append(c)
        }

        while k > 0 && !stack.isEmpty {
            stack.removeLast()
            k -= 1
        }

        var i = 0
        while i < stack.count && stack[i] == "0" {
            i += 1
        }

        let res = String(stack[i...])
        return res.isEmpty ? "0" : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        l = 0
        num = list(num)

        for r in range(len(num)):
            while l > 0 and k > 0 and num[l - 1] > num[r]:
                l -= 1
                k -= 1
            num[l] = num[r]
            l += 1

        l -= k
        i = 0
        while i < l and num[i] == '0':
            i += 1
        res = ''.join(num[i:l])
        return res if res else '0'
```

```java
public class Solution {
    public String removeKdigits(String num, int k) {
        char[] numArray = num.toCharArray();
        int l = 0;

        for (int r = 0; r < numArray.length; r++) {
            while (l > 0 && k > 0 && numArray[l - 1] > numArray[r]) {
                l--;
                k--;
            }
            numArray[l++] = numArray[r];
        }

        l -= k;
        int i = 0;
        while (i < l && numArray[i] == '0') {
            i++;
        }
        String res = new String(numArray, i, l - i);
        return res.isEmpty() ? "0" : res;
    }
}
```

```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        int l = 0;
        for (int r = 0; r < num.size(); r++) {
            while (l > 0 && k > 0 && num[l - 1] > num[r]) {
                l--;
                k--;
            }
            num[l++] = num[r];
        }

        l -= k;
        int i = 0;
        while (i < l && num[i] == '0') {
            i++;
        }
        if (i == l) return "0";
        return num.substr(i, l - i);
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @param {number} k
     * @return {string}
     */
    removeKdigits(num, k) {
        let numArray = num.split('');
        let l = 0;

        for (let r = 0; r < numArray.length; r++) {
            while (l > 0 && k > 0 && numArray[l - 1] > numArray[r]) {
                l--;
                k--;
            }
            numArray[l++] = numArray[r];
        }

        l -= k;
        let i = 0;
        while (i < l && numArray[i] === '0') {
            i++;
        }
        let res = numArray.slice(i, l).join('');
        return res.length === 0 ? '0' : res;
    }
}
```

```csharp
public class Solution {
    public string RemoveKdigits(string num, int k) {
        char[] numArray = num.ToCharArray();
        int l = 0;

        for (int r = 0; r < numArray.Length; r++) {
            while (l > 0 && k > 0 && numArray[l - 1] > numArray[r]) {
                l--;
                k--;
            }
            numArray[l++] = numArray[r];
        }

        l -= k;
        int i = 0;
        while (i < l && numArray[i] == '0') {
            i++;
        }
        if (i == l) return "0";
        return new string(numArray, i, l - i);
    }
}
```

```go
func removeKdigits(num string, k int) string {
    numArr := []byte(num)
    l := 0

    for r := 0; r < len(numArr); r++ {
        for l > 0 && k > 0 && numArr[l-1] > numArr[r] {
            l--
            k--
        }
        numArr[l] = numArr[r]
        l++
    }

    l -= k
    i := 0
    for i < l && numArr[i] == '0' {
        i++
    }
    if i == l {
        return "0"
    }
    return string(numArr[i:l])
}
```

```kotlin
class Solution {
    fun removeKdigits(num: String, k: Int): String {
        var k = k
        val numArray = num.toCharArray()
        var l = 0

        for (r in numArray.indices) {
            while (l > 0 && k > 0 && numArray[l - 1] > numArray[r]) {
                l--
                k--
            }
            numArray[l++] = numArray[r]
        }

        l -= k
        var i = 0
        while (i < l && numArray[i] == '0') {
            i++
        }
        if (i == l) return "0"
        return String(numArray, i, l - i)
    }
}
```

```swift
class Solution {
    func removeKdigits(_ num: String, _ k: Int) -> String {
        var k = k
        var numArr = Array(num)
        var l = 0

        for r in 0..<numArr.count {
            while l > 0 && k > 0 && numArr[l - 1] > numArr[r] {
                l -= 1
                k -= 1
            }
            numArr[l] = numArr[r]
            l += 1
        }

        l -= k
        var i = 0
        while i < l && numArr[i] == "0" {
            i += 1
        }
        if i == l { return "0" }
        return String(numArr[i..<l])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.
