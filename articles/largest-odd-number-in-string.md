## 1. Brute Force

::tabs-start

```python
class Solution:
    def largestOddNumber(self, num: str) -> str:
        res = ""
        for i in range(len(num)):
            for j in range(i, len(num)):
                ones_digit = ord(num[j]) - ord('0')
                if ones_digit & 1:
                    cur = num[i:j + 1]
                    if len(res) < len(cur) or (len(cur) == len(res) and res < cur):
                        res = cur
        return res
```

```java
public class Solution {
    public String largestOddNumber(String num) {
        String res = "";
        int n = num.length();

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int onesDigit = num.charAt(j) - '0';
                if ((onesDigit & 1) == 1) {
                    String cur = num.substring(i, j + 1);
                    if (res.length() < cur.length() ||
                       (res.length() == cur.length() && res.compareTo(cur) < 0)) {
                        res = cur;
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    string largestOddNumber(string num) {
        string res = "";
        int n = num.size();

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int onesDigit = num[j] - '0';
                if (onesDigit & 1) {
                    string cur = num.substr(i, j - i + 1);
                    if (res.size() < cur.size() ||
                       (res.size() == cur.size() && res < cur)) {
                        res = cur;
                    }
                }
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    largestOddNumber(num) {
        let res = '';
        const n = num.length;

        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                const onesDigit = num[j].charCodeAt(0) - '0'.charCodeAt(0);
                if (onesDigit & 1) {
                    const cur = num.slice(i, j + 1);
                    if (
                        res.length < cur.length ||
                        (res.length === cur.length && res < cur)
                    ) {
                        res = cur;
                    }
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(n)$

---

## 2. Find The Rightmost Odd Digit

::tabs-start

```python
class Solution:
    def largestOddNumber(self, num: str) -> str:
        for i in range(len(num) - 1, -1, -1):
            if int(num[i]) % 2:
                return num[:i + 1]
        return ""
```

```java
public class Solution {
    public String largestOddNumber(String num) {
        for (int i = num.length() - 1; i >= 0; i--) {
            if ((num.charAt(i) - '0') % 2 == 1) {
                return num.substring(0, i + 1);
            }
        }
        return "";
    }
}
```

```cpp
class Solution {
public:
    string largestOddNumber(string num) {
        for (int i = num.size() - 1; i >= 0; i--) {
            if ((num[i] - '0') % 2 == 1) {
                return num.substr(0, i + 1);
            }
        }
        return "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    largestOddNumber(num) {
        for (let i = num.length - 1; i >= 0; i--) {
            if (parseInt(num[i]) % 2 === 1) {
                return num.slice(0, i + 1);
            }
        }
        return '';
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ for the output string.
