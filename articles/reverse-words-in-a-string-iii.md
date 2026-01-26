## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Two Pointers** - Using pointers to identify word boundaries and reverse segments
- **String Manipulation** - Splitting strings and working with character arrays
- **In-place Reversal** - Swapping characters within a word without extra space

---

## 1. Convert To String Array

### Intuition

The most straightforward approach splits the string into individual words, reverses each word separately, then joins them back together. By treating each word as an independent unit, we can use built-in string reversal methods on each one. This approach is simple to understand but requires extra space for the split words.

### Algorithm

1. Split the input string by spaces to get an array of words.
2. For each word in the array, reverse its characters.
3. Join the reversed words back together with spaces between them.
4. Return the resulting string.

::tabs-start

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        return ' '.join([w[::-1] for w in s.split(' ')])
```

```java
public class Solution {
    public String reverseWords(String s) {
        String[] words = s.split(" ");
        for (int i = 0; i < words.length; i++) {
            words[i] = new StringBuilder(words[i]).reverse().toString();
        }
        return String.join(" ", words);
    }
}
```

```cpp
class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        string word, res;
        bool first = true;

        while (ss >> word) {
            reverse(word.begin(), word.end());
            if (first) {
                res += word;
                first = false;
            } else {
                res += " " + word;
            }
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
    reverseWords(s) {
        return s
            .split(' ')
            .map((w) => w.split('').reverse().join(''))
            .join(' ');
    }
}
```

```csharp
public class Solution {
    public string ReverseWords(string s) {
        string[] words = s.Split(' ');
        for (int i = 0; i < words.Length; i++) {
            char[] arr = words[i].ToCharArray();
            Array.Reverse(arr);
            words[i] = new string(arr);
        }
        return string.Join(" ", words);
    }
}
```

```go
func reverseWords(s string) string {
    words := strings.Split(s, " ")
    for i, word := range words {
        runes := []rune(word)
        for l, r := 0, len(runes)-1; l < r; l, r = l+1, r-1 {
            runes[l], runes[r] = runes[r], runes[l]
        }
        words[i] = string(runes)
    }
    return strings.Join(words, " ")
}
```

```kotlin
class Solution {
    fun reverseWords(s: String): String {
        return s.split(" ").joinToString(" ") { it.reversed() }
    }
}
```

```swift
class Solution {
    func reverseWords(_ s: String) -> String {
        return s.split(separator: " ").map { String($0.reversed()) }.joined(separator: " ")
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. String Manipulation

### Intuition

Instead of splitting into an array, we can build the result string character by character. As we scan through the input, we accumulate characters for each word in reverse order by prepending each new character. When we hit a space, we append the reversed word to our result and reset for the next word. This avoids explicit array operations but involves string concatenation.

### Algorithm

1. Initialize an empty temporary string `tmp_str` and an empty result string `res`.
2. Iterate through each character in the input (plus one extra position to handle the last word).
3. If we reach a space or the end of the string:
   - Append `tmp_str` to `res`, then clear `tmp_str`.
   - If not at the end, append a space to `res`.
4. Otherwise, prepend the current character to `tmp_str` (building the word in reverse).
5. Return `res`.

::tabs-start

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        tmp_str = ""
        res = ""

        for r in range(len(s) + 1):
            if r == len(s) or s[r] == ' ':
                res += tmp_str
                tmp_str = ""
                if r != len(s):
                    res += " "
            else:
                tmp_str = s[r] + tmp_str
        return res
```

```java
public class Solution {
    public String reverseWords(String s) {
        String tmpStr = "";
        StringBuilder res = new StringBuilder();

        for (int r = 0; r <= s.length(); r++) {
            if (r == s.length() || s.charAt(r) == ' ') {
                res.append(tmpStr);
                tmpStr = "";
                if (r != s.length()) {
                    res.append(" ");
                }
            } else {
                tmpStr = s.charAt(r) + tmpStr;
            }
        }
        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string reverseWords(string s) {
        string tmpStr = "";
        string res = "";

        for (int r = 0; r <= s.size(); r++) {
            if (r == s.size() || s[r] == ' ') {
                res += tmpStr;
                tmpStr = "";
                if (r != s.size()) {
                    res += " ";
                }
            } else {
                tmpStr = s[r] + tmpStr;
            }
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
    reverseWords(s) {
        let tmpStr = '';
        let res = '';

        for (let r = 0; r <= s.length; r++) {
            if (r === s.length || s[r] === ' ') {
                res += tmpStr;
                tmpStr = '';
                if (r !== s.length) {
                    res += ' ';
                }
            } else {
                tmpStr = s[r] + tmpStr;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public string ReverseWords(string s) {
        string tmpStr = "";
        var res = new System.Text.StringBuilder();

        for (int r = 0; r <= s.Length; r++) {
            if (r == s.Length || s[r] == ' ') {
                res.Append(tmpStr);
                tmpStr = "";
                if (r != s.Length) {
                    res.Append(" ");
                }
            } else {
                tmpStr = s[r] + tmpStr;
            }
        }
        return res.ToString();
    }
}
```

```go
func reverseWords(s string) string {
    tmpStr := ""
    res := ""

    for r := 0; r <= len(s); r++ {
        if r == len(s) || s[r] == ' ' {
            res += tmpStr
            tmpStr = ""
            if r != len(s) {
                res += " "
            }
        } else {
            tmpStr = string(s[r]) + tmpStr
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun reverseWords(s: String): String {
        var tmpStr = ""
        val res = StringBuilder()

        for (r in 0..s.length) {
            if (r == s.length || s[r] == ' ') {
                res.append(tmpStr)
                tmpStr = ""
                if (r != s.length) {
                    res.append(" ")
                }
            } else {
                tmpStr = s[r] + tmpStr
            }
        }
        return res.toString()
    }
}
```

```swift
class Solution {
    func reverseWords(_ s: String) -> String {
        var tmpStr = ""
        var res = ""
        let chars = Array(s)

        for r in 0...chars.count {
            if r == chars.count || chars[r] == " " {
                res += tmpStr
                tmpStr = ""
                if r != chars.count {
                    res += " "
                }
            } else {
                tmpStr = String(chars[r]) + tmpStr
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Two Pointers - I

### Intuition

We can reverse each word in place by identifying word boundaries and using two pointers to swap characters within each word. As we scan through the string, we track where each word starts. When we encounter a space or reach the end, we know the word boundaries and can reverse that segment. This approach modifies a character array copy of the string directly.

### Algorithm

1. Convert the string to a character array.
2. Use pointer `l` to track the start of the current word.
3. Iterate with pointer `r` through the array:
   - When `r` reaches a space or the end of the string, we have found a complete word.
   - Use two temporary pointers to swap characters from both ends of this word toward the center.
   - Update `l` to `r + 1` for the next word.
4. Convert the character array back to a string and return.

::tabs-start

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        s = list(s)
        l = 0
        for r in range(len(s)):
            if s[r] == " " or r == len(s) - 1:
                temp_l, temp_r = l, r - 1 if s[r] == " " else r
                while temp_l < temp_r:
                    s[temp_l], s[temp_r] = s[temp_r], s[temp_l]
                    temp_l += 1
                    temp_r -= 1
                l = r + 1
        return "".join(s)
```

```java
public class Solution {
    public String reverseWords(String s) {
        char[] chars = s.toCharArray();
        int l = 0;
        for (int r = 0; r < chars.length; r++) {
            if (chars[r] == ' ' || r == chars.length - 1) {
                int tempL = l, tempR = (chars[r] == ' ') ? r - 1 : r;
                while (tempL < tempR) {
                    char temp = chars[tempL];
                    chars[tempL] = chars[tempR];
                    chars[tempR] = temp;
                    tempL++;
                    tempR--;
                }
                l = r + 1;
            }
        }
        return new String(chars);
    }
}
```

```cpp
class Solution {
public:
    string reverseWords(string s) {
        int l = 0;
        for (int r = 0; r < s.size(); r++) {
            if (r == s.size() - 1 || s[r] == ' ') {
                int tempL = l, tempR = s[r] == ' ' ? r - 1 : r;
                while (tempL < tempR) {
                    swap(s[tempL], s[tempR]);
                    tempL++;
                    tempR--;
                }
                l = r + 1;
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
     * @return {string}
     */
    reverseWords(s) {
        let chars = s.split('');
        let l = 0;
        for (let r = 0; r <= chars.length; r++) {
            if (r === chars.length || chars[r] === ' ') {
                let tempL = l,
                    tempR = r - 1;
                while (tempL < tempR) {
                    [chars[tempL], chars[tempR]] = [chars[tempR], chars[tempL]];
                    tempL++;
                    tempR--;
                }
                l = r + 1;
            }
        }
        return chars.join('');
    }
}
```

```csharp
public class Solution {
    public string ReverseWords(string s) {
        char[] chars = s.ToCharArray();
        int l = 0;
        for (int r = 0; r <= chars.Length; r++) {
            if (r == chars.Length || chars[r] == ' ') {
                int tempL = l, tempR = r - 1;
                while (tempL < tempR) {
                    char temp = chars[tempL];
                    chars[tempL] = chars[tempR];
                    chars[tempR] = temp;
                    tempL++;
                    tempR--;
                }
                l = r + 1;
            }
        }
        return new string(chars);
    }
}
```

```go
func reverseWords(s string) string {
    chars := []byte(s)
    l := 0
    for r := 0; r <= len(chars); r++ {
        if r == len(chars) || chars[r] == ' ' {
            tempL, tempR := l, r-1
            for tempL < tempR {
                chars[tempL], chars[tempR] = chars[tempR], chars[tempL]
                tempL++
                tempR--
            }
            l = r + 1
        }
    }
    return string(chars)
}
```

```kotlin
class Solution {
    fun reverseWords(s: String): String {
        val chars = s.toCharArray()
        var l = 0
        for (r in 0..chars.size) {
            if (r == chars.size || chars[r] == ' ') {
                var tempL = l
                var tempR = r - 1
                while (tempL < tempR) {
                    val temp = chars[tempL]
                    chars[tempL] = chars[tempR]
                    chars[tempR] = temp
                    tempL++
                    tempR--
                }
                l = r + 1
            }
        }
        return String(chars)
    }
}
```

```swift
class Solution {
    func reverseWords(_ s: String) -> String {
        var chars = Array(s)
        var l = 0
        for r in 0...chars.count {
            if r == chars.count || chars[r] == " " {
                var tempL = l
                var tempR = r - 1
                while tempL < tempR {
                    let temp = chars[tempL]
                    chars[tempL] = chars[tempR]
                    chars[tempR] = temp
                    tempL += 1
                    tempR -= 1
                }
                l = r + 1
            }
        }
        return String(chars)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Two Pointers - II

### Intuition

This is a cleaner variation of the two-pointer approach. Instead of checking for word boundaries at every position, we explicitly find each word by scanning for non-space characters. Once we locate a word's start, we scan to find its end, reverse the word in place, then jump to the next word. This makes the logic more explicit and easier to follow.

### Algorithm

1. Convert the string to a character array.
2. Iterate through the array with index `i`:
   - Skip spaces until finding a non-space character (start of a word).
   - From that position, use index `j` to find where the word ends (next space or end of array).
   - Call a helper function to reverse characters between indices `i` and `j - 1`.
   - Move `i` to `j` to continue with the next word.
3. Return the modified array as a string.

::tabs-start

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        def reverse(i, j):
            while i < j:
                s[i], s[j] = s[j], s[i]
                i += 1
                j -= 1

        s = list(s)
        i = 0
        while i < len(s):
            if s[i] != ' ':
                j = i
                while j < len(s) and s[j] != ' ':
                    j += 1
                reverse(i, j - 1)
                i = j + 1
        return ''.join(s)
```

```java
public class Solution {
    public String reverseWords(String s) {
        char[] arr = s.toCharArray();
        int n = arr.length;

        for (int i = 0; i < n; i++) {
            if (arr[i] != ' ') {
                int j = i;
                while (j < n && arr[j] != ' ') {
                    j++;
                }
                reverse(arr, i, j - 1);
                i = j;
            }
        }
        return new String(arr);
    }

    private void reverse(char[] arr, int i, int j) {
        while (i < j) {
            char temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
}
```

```cpp
class Solution {
public:
    string reverseWords(string s) {
        int n = s.size();
        for (int i = 0; i < n; i++) {
            if (s[i] != ' ') {
                int j = i;
                while (j < n && s[j] != ' ') {
                    j++;
                }
                reverse(s, i, j - 1);
                i = j;
            }
        }
        return s;
    }

private:
    void reverse(string& s, int i, int j) {
        while (i < j) {
            swap(s[i], s[j]);
            i++;
            j--;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {string}
     */
    reverseWords(s) {
        const arr = s.split('');
        const reverse = (i, j) => {
            while (i < j) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
                j--;
            }
        };

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== ' ') {
                let j = i;
                while (j < arr.length && arr[j] !== ' ') {
                    j++;
                }
                reverse(i, j - 1);
                i = j;
            }
        }
        return arr.join('');
    }
}
```

```csharp
public class Solution {
    public string ReverseWords(string s) {
        char[] arr = s.ToCharArray();
        int n = arr.Length;

        for (int i = 0; i < n; i++) {
            if (arr[i] != ' ') {
                int j = i;
                while (j < n && arr[j] != ' ') {
                    j++;
                }
                Reverse(arr, i, j - 1);
                i = j;
            }
        }
        return new string(arr);
    }

    private void Reverse(char[] arr, int i, int j) {
        while (i < j) {
            char temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
}
```

```go
func reverseWords(s string) string {
    arr := []byte(s)
    n := len(arr)

    reverse := func(i, j int) {
        for i < j {
            arr[i], arr[j] = arr[j], arr[i]
            i++
            j--
        }
    }

    for i := 0; i < n; i++ {
        if arr[i] != ' ' {
            j := i
            for j < n && arr[j] != ' ' {
                j++
            }
            reverse(i, j-1)
            i = j
        }
    }
    return string(arr)
}
```

```kotlin
class Solution {
    fun reverseWords(s: String): String {
        val arr = s.toCharArray()
        val n = arr.size

        fun reverse(i: Int, j: Int) {
            var l = i
            var r = j
            while (l < r) {
                val temp = arr[l]
                arr[l] = arr[r]
                arr[r] = temp
                l++
                r--
            }
        }

        var i = 0
        while (i < n) {
            if (arr[i] != ' ') {
                var j = i
                while (j < n && arr[j] != ' ') {
                    j++
                }
                reverse(i, j - 1)
                i = j
            }
            i++
        }
        return String(arr)
    }
}
```

```swift
class Solution {
    func reverseWords(_ s: String) -> String {
        var arr = Array(s)
        let n = arr.count

        func reverse(_ i: Int, _ j: Int) {
            var l = i, r = j
            while l < r {
                let temp = arr[l]
                arr[l] = arr[r]
                arr[r] = temp
                l += 1
                r -= 1
            }
        }

        var i = 0
        while i < n {
            if arr[i] != " " {
                var j = i
                while j < n && arr[j] != " " {
                    j += 1
                }
                reverse(i, j - 1)
                i = j
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

## Common Pitfalls

### Forgetting to Handle the Last Word

When iterating through the string looking for spaces to identify word boundaries, the last word has no trailing space. A common mistake is failing to reverse the final word because the loop only triggers reversal when encountering a space character.

### Modifying Immutable Strings Directly

In languages where strings are immutable (like Python, Java, and JavaScript), attempting to modify the string in place will fail. You must first convert the string to a mutable data structure like a character array, perform the reversals, then convert back to a string.
