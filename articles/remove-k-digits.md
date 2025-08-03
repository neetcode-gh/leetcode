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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the language.
