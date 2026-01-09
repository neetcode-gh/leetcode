## 1. Brute Force

::tabs-start

```python
class Solution:
    def largestGoodInteger(self, num: str) -> str:
        res = ""
        val = 0

        for i in range(len(num) - 2):
            if num[i] == num[i + 1] == num[i + 2]:
                tmp = num[i : i + 3]
                if val <= int(tmp):
                    val = int(tmp)
                    res = tmp

        return res
```

```java
public class Solution {
    public String largestGoodInteger(String num) {
        String res = "";
        int val = 0;

        for (int i = 0; i < num.length() - 2; i++) {
            if (num.charAt(i) == num.charAt(i + 1) &&
                num.charAt(i) == num.charAt(i + 2)) {
                String tmp = num.substring(i, i + 3);
                if (val <= Integer.parseInt(tmp)) {
                    val = Integer.parseInt(tmp);
                    res = tmp;
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
    string largestGoodInteger(string num) {
        string res = "";
        int val = 0;

        for (int i = 0; i < num.length() - 2; i++) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                string tmp = num.substr(i, 3);
                if (val <= stoi(tmp)) {
                    val = stoi(tmp);
                    res = tmp;
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
    largestGoodInteger(num) {
        let res = '';
        let val = 0;

        for (let i = 0; i < num.length - 2; i++) {
            if (num[i] === num[i + 1] && num[i] === num[i + 2]) {
                const tmp = num.slice(i, i + 3);
                if (val <= parseInt(tmp)) {
                    val = parseInt(tmp);
                    res = tmp;
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public string LargestGoodInteger(string num) {
        string res = "";
        int val = 0;

        for (int i = 0; i < num.Length - 2; i++) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                string tmp = num.Substring(i, 3);
                int tmpVal = int.Parse(tmp);
                if (val <= tmpVal) {
                    val = tmpVal;
                    res = tmp;
                }
            }
        }

        return res;
    }
}
```

```go
func largestGoodInteger(num string) string {
    res := ""
    val := 0

    for i := 0; i < len(num)-2; i++ {
        if num[i] == num[i+1] && num[i] == num[i+2] {
            tmp := num[i : i+3]
            tmpVal, _ := strconv.Atoi(tmp)
            if val <= tmpVal {
                val = tmpVal
                res = tmp
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun largestGoodInteger(num: String): String {
        var res = ""
        var value = 0

        for (i in 0 until num.length - 2) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                val tmp = num.substring(i, i + 3)
                val tmpVal = tmp.toInt()
                if (value <= tmpVal) {
                    value = tmpVal
                    res = tmp
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func largestGoodInteger(_ num: String) -> String {
        var res = ""
        var val = 0
        let chars = Array(num)

        for i in 0..<(chars.count - 2) {
            if chars[i] == chars[i + 1] && chars[i] == chars[i + 2] {
                let tmp = String(chars[i..<(i + 3)])
                let tmpVal = Int(tmp)!
                if val <= tmpVal {
                    val = tmpVal
                    res = tmp
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def largestGoodInteger(self, num: str) -> str:
        res = "0"

        for i in range(len(num) - 2):
            if num[i] == num[i + 1] == num[i + 2]:
                res = max(res, num[i : i + 3])

        return "" if res == "0" else res
```

```java
public class Solution {
    public String largestGoodInteger(String num) {
        String res = "";

        for (int i = 0; i < num.length() - 2; i++) {
            if (num.charAt(i) == num.charAt(i + 1) &&
                num.charAt(i) == num.charAt(i + 2)) {
                String curr = num.substring(i, i + 3);
                if (curr.compareTo(res) > 0) {
                    res = curr;
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
    string largestGoodInteger(string num) {
        string res = "0";

        for (int i = 0; i < num.length() - 2; i++) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                res = max(res, num.substr(i, 3));
            }
        }

        return res == "0" ? "" : res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    largestGoodInteger(num) {
        let res = '0';

        for (let i = 0; i < num.length - 2; i++) {
            if (num[i] === num[i + 1] && num[i] === num[i + 2]) {
                res = res > num.slice(i, i + 3) ? res : num.slice(i, i + 3);
            }
        }

        return res === '0' ? '' : res;
    }
}
```

```csharp
public class Solution {
    public string LargestGoodInteger(string num) {
        string res = "0";

        for (int i = 0; i < num.Length - 2; i++) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                string tmp = num.Substring(i, 3);
                if (string.Compare(tmp, res) > 0) {
                    res = tmp;
                }
            }
        }

        return res == "0" ? "" : res;
    }
}
```

```go
func largestGoodInteger(num string) string {
    res := "0"

    for i := 0; i < len(num)-2; i++ {
        if num[i] == num[i+1] && num[i] == num[i+2] {
            tmp := num[i : i+3]
            if tmp > res {
                res = tmp
            }
        }
    }

    if res == "0" {
        return ""
    }
    return res
}
```

```kotlin
class Solution {
    fun largestGoodInteger(num: String): String {
        var res = "0"

        for (i in 0 until num.length - 2) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                val tmp = num.substring(i, i + 3)
                if (tmp > res) {
                    res = tmp
                }
            }
        }

        return if (res == "0") "" else res
    }
}
```

```swift
class Solution {
    func largestGoodInteger(_ num: String) -> String {
        var res = "0"
        let chars = Array(num)

        for i in 0..<(chars.count - 2) {
            if chars[i] == chars[i + 1] && chars[i] == chars[i + 2] {
                let tmp = String(chars[i..<(i + 3)])
                if tmp > res {
                    res = tmp
                }
            }
        }

        return res == "0" ? "" : res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Iteration (Optimal)

::tabs-start

```python
class Solution:
    def largestGoodInteger(self, num: str) -> str:
        res = -1

        for i in range(len(num) - 2):
            if num[i] == num[i + 1] == num[i + 2]:
                res = max(res, int(num[i]))
        return str(res) * 3 if res != -1 else ""
```

```java
public class Solution {
    public String largestGoodInteger(String num) {
        int res = -1;

        for (int i = 0; i < num.length() - 2; i++) {
            if (num.charAt(i) == num.charAt(i + 1) &&
                num.charAt(i) == num.charAt(i + 2)) {
                res = Math.max(res, num.charAt(i) - '0');
            }
        }

        return res != -1 ? String.valueOf(res).repeat(3) : "";
    }
}
```

```cpp
class Solution {
public:
    string largestGoodInteger(string num) {
        int res = -1;

        for (int i = 0; i < num.length() - 2; i++) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                res = max(res, num[i] - '0');
            }
        }

        return res != -1 ? string(3, res + '0') : "";
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} num
     * @return {string}
     */
    largestGoodInteger(num) {
        let res = -1;

        for (let i = 0; i < num.length - 2; i++) {
            if (num[i] === num[i + 1] && num[i] === num[i + 2]) {
                res = Math.max(res, Number(num[i]));
            }
        }

        return res !== -1 ? String(res).repeat(3) : '';
    }
}
```

```csharp
public class Solution {
    public string LargestGoodInteger(string num) {
        int res = -1;

        for (int i = 0; i < num.Length - 2; i++) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                res = Math.Max(res, num[i] - '0');
            }
        }

        return res == -1 ? "" : new string((char)(res + '0'), 3);
    }
}
```

```go
func largestGoodInteger(num string) string {
    res := -1

    for i := 0; i < len(num)-2; i++ {
        if num[i] == num[i+1] && num[i] == num[i+2] {
            digit := int(num[i] - '0')
            if digit > res {
                res = digit
            }
        }
    }

    if res == -1 {
        return ""
    }
    return strings.Repeat(string(rune(res+'0')), 3)
}
```

```kotlin
class Solution {
    fun largestGoodInteger(num: String): String {
        var res = -1

        for (i in 0 until num.length - 2) {
            if (num[i] == num[i + 1] && num[i] == num[i + 2]) {
                res = maxOf(res, num[i] - '0')
            }
        }

        return if (res == -1) "" else res.toString().repeat(3)
    }
}
```

```swift
class Solution {
    func largestGoodInteger(_ num: String) -> String {
        var res = -1
        let chars = Array(num)

        for i in 0..<(chars.count - 2) {
            if chars[i] == chars[i + 1] && chars[i] == chars[i + 2] {
                let digit = Int(String(chars[i]))!
                res = max(res, digit)
            }
        }

        return res == -1 ? "" : String(repeating: String(res), count: 3)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
