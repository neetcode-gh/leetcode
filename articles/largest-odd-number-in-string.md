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

```csharp
public class Solution {
    public string LargestOddNumber(string num) {
        string res = "";
        int n = num.Length;

        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int onesDigit = num[j] - '0';
                if ((onesDigit & 1) == 1) {
                    string cur = num.Substring(i, j - i + 1);
                    if (res.Length < cur.Length ||
                       (res.Length == cur.Length && string.Compare(res, cur) < 0)) {
                        res = cur;
                    }
                }
            }
        }
        return res;
    }
}
```

```go
func largestOddNumber(num string) string {
    res := ""
    n := len(num)

    for i := 0; i < n; i++ {
        for j := i; j < n; j++ {
            onesDigit := int(num[j] - '0')
            if onesDigit&1 == 1 {
                cur := num[i : j+1]
                if len(res) < len(cur) || (len(res) == len(cur) && res < cur) {
                    res = cur
                }
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun largestOddNumber(num: String): String {
        var res = ""
        val n = num.length

        for (i in 0 until n) {
            for (j in i until n) {
                val onesDigit = num[j] - '0'
                if (onesDigit and 1 == 1) {
                    val cur = num.substring(i, j + 1)
                    if (res.length < cur.length ||
                       (res.length == cur.length && res < cur)) {
                        res = cur
                    }
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func largestOddNumber(_ num: String) -> String {
        var res = ""
        let chars = Array(num)
        let n = chars.count

        for i in 0..<n {
            for j in i..<n {
                let onesDigit = Int(String(chars[j]))!
                if onesDigit & 1 == 1 {
                    let cur = String(chars[i...j])
                    if res.count < cur.count ||
                       (res.count == cur.count && res < cur) {
                        res = cur
                    }
                }
            }
        }
        return res
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

```csharp
public class Solution {
    public string LargestOddNumber(string num) {
        for (int i = num.Length - 1; i >= 0; i--) {
            if ((num[i] - '0') % 2 == 1) {
                return num.Substring(0, i + 1);
            }
        }
        return "";
    }
}
```

```go
func largestOddNumber(num string) string {
    for i := len(num) - 1; i >= 0; i-- {
        if (num[i]-'0')%2 == 1 {
            return num[:i+1]
        }
    }
    return ""
}
```

```kotlin
class Solution {
    fun largestOddNumber(num: String): String {
        for (i in num.length - 1 downTo 0) {
            if ((num[i] - '0') % 2 == 1) {
                return num.substring(0, i + 1)
            }
        }
        return ""
    }
}
```

```swift
class Solution {
    func largestOddNumber(_ num: String) -> String {
        let chars = Array(num)
        for i in stride(from: chars.count - 1, through: 0, by: -1) {
            if Int(String(chars[i]))! % 2 == 1 {
                return String(chars[0...i])
            }
        }
        return ""
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ for the output string.
