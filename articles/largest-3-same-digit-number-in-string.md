## 1. Brute Force

### Intuition

We need to find the largest "good integer" in the string, where a good integer is a substring of length 3 consisting of the same digit repeated three times (like "111", "222", etc.). The straightforward approach is to scan through the string, check every window of size 3, and whenever we find three consecutive identical digits, we compare its numeric value to our current best and keep the larger one.

### Algorithm

1. Initialize `res` as an empty string and `val` as `0` to track the largest good integer found.
2. Iterate through the string from index `0` to `len(num) - 2`:
   - Check if the current character equals the next two characters.
   - If so, extract the 3-character substring and convert it to an integer.
   - If this value is greater than or equal to `val`, update both `val` and `res`.
3. Return `res`.

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

### Intuition

Instead of tracking both the numeric value and the string separately, we can simplify by using string comparison. Since all good integers have the same length (3 characters), lexicographic comparison works correctly for finding the maximum. For example, "999" > "888" > "777" when compared as strings. We just need to handle the edge case where "000" is a valid result but we need to distinguish it from "no good integer found."

### Algorithm

1. Initialize `res` to `"0"` as a baseline for comparison.
2. Iterate through the string, checking each window of size 3:
   - If three consecutive characters are the same, compare the substring with `res` and keep the larger one.
3. If `res` is still `"0"` and `"000"` was never found, return an empty string. Otherwise, return `res`.

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

### Intuition

We can optimize further by observing that we only need to track the digit itself, not the entire 3-character substring. Since all good integers are formed by repeating a single digit three times, we just need to find the largest digit that appears three times consecutively. At the end, we can construct the result by repeating that digit three times.

### Algorithm

1. Initialize `res` to `-1` to indicate no good integer found yet.
2. Iterate through the string, checking each window of size 3:
   - If three consecutive characters are the same, extract the digit value and update `res` if it is larger.
3. If `res` is still `-1`, return an empty string. Otherwise, return the digit repeated three times.

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
