## 1. Brute Force

### Intuition

A number is odd if and only if its last digit is odd (1, 3, 5, 7, or 9). To find the largest odd substring, we could check every possible substring. However, since we want the largest value, we need to consider both length (longer is generally larger) and numeric value (for equal lengths, compare digit by digit).

The brute force approach generates all substrings ending with an odd digit and tracks the maximum one found.

### Algorithm

1. Iterate through all possible starting indices `i`.
2. For each start, iterate through all possible ending indices `j`.
3. Check if the character at position `j` is an odd digit.
4. If so, extract the substring and compare it with the current result:
   - A longer substring is larger.
   - For equal lengths, compare lexicographically.
5. Return the largest odd substring found, or an empty string if none exists.

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

### Intuition

The largest odd substring must start from the beginning of the string (to maximize length and leading digits) and end at the rightmost odd digit. Why? Because starting from index 0 gives us the largest possible prefix, and we just need to find where to cut it off to make it odd.

By scanning from right to left, we find the first (rightmost) odd digit and return the prefix up to and including that position.

### Algorithm

1. Traverse the string from the last character to the first.
2. At each position, check if the digit is odd (using modulo `2`).
3. When an odd digit is found, return the substring from the beginning up to and including this position.
4. If no odd digit is found, return an empty string.

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

---

## Common Pitfalls

### Starting the Search from the Wrong End

To find the largest odd number, you must keep the prefix as long as possible and only trim even digits from the end. Searching from the left or trying to find substrings that don't start at index 0 will miss the optimal answer. The largest odd substring always starts at the beginning of the string and extends to the rightmost odd digit.

### Incorrectly Checking for Odd Digits

A digit is odd if it is 1, 3, 5, 7, or 9. A common mistake is checking the wrong character or using incorrect modulo logic. Remember that `num[i]` is a character, so you need to convert it to its numeric value (e.g., `num[i] - '0'`) before checking if it's odd with `% 2 == 1` or `& 1`.
