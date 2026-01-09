## 1. Stack

### Intuition

The backspace character `#` removes the previous character, which is exactly what a stack does well. We can simulate typing each string by pushing regular characters onto a stack and popping when we see a `#`. After processing both strings this way, we just compare the resulting stacks.

### Algorithm

1. Create a helper function that converts a string to its final form using a stack.
2. For each character in the string:
   - If it's `#` and the stack is not empty, pop from the stack.
   - Otherwise, push the character onto the stack.
3. Convert the stack to a string.
4. Compare the converted versions of both input strings.

::tabs-start

```python
class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        def convert(s):
            res = []
            for char in s:
                if char == '#':
                    if res:
                        res.pop()
                else:
                    res.append(char)
            return "".join(res)

        return convert(s) == convert(t)
```

```java
public class Solution {
    public boolean backspaceCompare(String s, String t) {
        return convert(s).equals(convert(t));
    }

    private List<Character> convert(String s) {
        List<Character> res = new ArrayList<>();
        for (char c : s.toCharArray()) {
            if (c == '#') {
                if (!res.isEmpty()) {
                    res.remove(res.size() - 1);
                }
            } else {
                res.add(c);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        return convert(s) == convert(t);
    }

private:
    string convert(const string& s) {
        string res = "";
        for (char c : s) {
            if (c == '#') {
                if (!res.empty()) {
                    res.pop_back();
                }
            } else {
                res += c;
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
     * @param {string} t
     * @return {boolean}
     */
    backspaceCompare(s, t) {
        const convert = (str) => {
            const res = [];
            for (const char of str) {
                if (char === '#') {
                    if (res.length > 0) {
                        res.pop();
                    }
                } else {
                    res.push(char);
                }
            }
            return res.join('');
        };
        return convert(s) === convert(t);
    }
}
```

```csharp
public class Solution {
    public bool BackspaceCompare(string s, string t) {
        return Convert(s) == Convert(t);
    }

    private string Convert(string s) {
        var res = new List<char>();
        foreach (char c in s) {
            if (c == '#') {
                if (res.Count > 0) {
                    res.RemoveAt(res.Count - 1);
                }
            } else {
                res.Add(c);
            }
        }
        return new string(res.ToArray());
    }
}
```

```go
func backspaceCompare(s string, t string) bool {
    convert := func(str string) string {
        res := []byte{}
        for i := 0; i < len(str); i++ {
            if str[i] == '#' {
                if len(res) > 0 {
                    res = res[:len(res)-1]
                }
            } else {
                res = append(res, str[i])
            }
        }
        return string(res)
    }
    return convert(s) == convert(t)
}
```

```kotlin
class Solution {
    fun backspaceCompare(s: String, t: String): Boolean {
        fun convert(str: String): String {
            val res = mutableListOf<Char>()
            for (c in str) {
                if (c == '#') {
                    if (res.isNotEmpty()) {
                        res.removeAt(res.size - 1)
                    }
                } else {
                    res.add(c)
                }
            }
            return res.joinToString("")
        }
        return convert(s) == convert(t)
    }
}
```

```swift
class Solution {
    func backspaceCompare(_ s: String, _ t: String) -> Bool {
        func convert(_ str: String) -> String {
            var res = [Character]()
            for char in str {
                if char == "#" {
                    if !res.isEmpty {
                        res.removeLast()
                    }
                } else {
                    res.append(char)
                }
            }
            return String(res)
        }
        return convert(s) == convert(t)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 2. Reverse iteration

### Intuition

Instead of building the result from the beginning, we can iterate from the end. When we encounter a `#`, we know we need to skip the next valid character. By counting backspaces as we go backward, we can skip the right number of characters before adding one to our result. This still uses extra space for storing the result, but gives us a different perspective on the problem.

### Algorithm

1. Create a helper function that processes a string from right to left.
2. Start from the last character and maintain a backspace counter.
3. For each character going backward:
   - If it's `#`, increment the backspace count.
   - Else if the backspace count is positive, decrement it (skip this character).
   - Otherwise, add the character to the result.
4. Compare the processed versions of both strings.

::tabs-start

```python
class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        def convert(s):
            res = []
            backspace = 0
            for i in range(len(s) - 1, -1, -1):
                if s[i] == '#':
                    backspace += 1
                elif backspace:
                    backspace -= 1
                else:
                    res.append(s[i])
            return res

        return convert(s) == convert(t)
```

```java
public class Solution {
    public boolean backspaceCompare(String s, String t) {
        return convert(s).equals(convert(t));
    }

    private List<Character> convert(String s) {
        List<Character> res = new ArrayList<>();
        int backspace = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            if (s.charAt(i) == '#') {
                backspace++;
            } else if (backspace > 0) {
                backspace--;
            } else {
                res.add(s.charAt(i));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        return convert(s) == convert(t);
    }

private:
    string convert(string s) {
        string res;
        int backspace = 0;
        for (int i = s.size() - 1; i >= 0; i--) {
            if (s[i] == '#') {
                backspace++;
            } else if (backspace > 0) {
                backspace--;
            } else {
                res += s[i];
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
     * @param {string} t
     * @return {boolean}
     */
    backspaceCompare(s, t) {
        const convert = (s) => {
            const res = [];
            let backspace = 0;
            for (let i = s.length - 1; i >= 0; i--) {
                if (s[i] === '#') {
                    backspace++;
                } else if (backspace > 0) {
                    backspace--;
                } else {
                    res.push(s[i]);
                }
            }
            return res.join('');
        };
        return convert(s) === convert(t);
    }
}
```

```csharp
public class Solution {
    public bool BackspaceCompare(string s, string t) {
        return Convert(s) == Convert(t);
    }

    private string Convert(string s) {
        var res = new List<char>();
        int backspace = 0;
        for (int i = s.Length - 1; i >= 0; i--) {
            if (s[i] == '#') {
                backspace++;
            } else if (backspace > 0) {
                backspace--;
            } else {
                res.Add(s[i]);
            }
        }
        return new string(res.ToArray());
    }
}
```

```go
func backspaceCompare(s string, t string) bool {
    convert := func(str string) string {
        res := []byte{}
        backspace := 0
        for i := len(str) - 1; i >= 0; i-- {
            if str[i] == '#' {
                backspace++
            } else if backspace > 0 {
                backspace--
            } else {
                res = append(res, str[i])
            }
        }
        return string(res)
    }
    return convert(s) == convert(t)
}
```

```kotlin
class Solution {
    fun backspaceCompare(s: String, t: String): Boolean {
        fun convert(str: String): String {
            val res = mutableListOf<Char>()
            var backspace = 0
            for (i in str.length - 1 downTo 0) {
                if (str[i] == '#') {
                    backspace++
                } else if (backspace > 0) {
                    backspace--
                } else {
                    res.add(str[i])
                }
            }
            return res.joinToString("")
        }
        return convert(s) == convert(t)
    }
}
```

```swift
class Solution {
    func backspaceCompare(_ s: String, _ t: String) -> Bool {
        func convert(_ str: String) -> String {
            var res = [Character]()
            var backspace = 0
            let chars = Array(str)
            for i in stride(from: chars.count - 1, through: 0, by: -1) {
                if chars[i] == "#" {
                    backspace += 1
                } else if backspace > 0 {
                    backspace -= 1
                } else {
                    res.append(chars[i])
                }
            }
            return String(res)
        }
        return convert(s) == convert(t)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 3. Two Pointers - I

### Intuition

We can compare the strings character by character without building the full result. Starting from the end of both strings, we find the next valid character in each (skipping over characters deleted by backspaces). If at any point these characters differ, the strings are not equal. This approach uses O(1) extra space since we only track pointers and counts.

### Algorithm

1. Initialize two pointers at the end of each string.
2. Create a helper function that finds the next valid character index by:
   - Counting backspaces encountered.
   - Skipping characters that would be deleted.
   - Returning the index of the next valid character (or `-1` if none).
3. While either pointer is valid:
   - Find the next valid character in each string.
   - Compare them (treat out-of-bounds as empty).
   - If they differ, return `false`.
   - Move both pointers left.
4. Return `true` if we finish without finding a mismatch.

::tabs-start

```python
class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        def nextValidChar(string, index):
            backspace = 0
            while index >= 0:
                if string[index] == '#':
                    backspace += 1
                elif backspace > 0:
                    backspace -= 1
                else:
                    break
                index -= 1
            return index

        index_s, index_t = len(s) - 1, len(t) - 1

        while index_s >= 0 or index_t >= 0:
            index_s = nextValidChar(s, index_s)
            index_t = nextValidChar(t, index_t)

            char_s = s[index_s] if index_s >= 0 else ""
            char_t = t[index_t] if index_t >= 0 else ""

            if char_s != char_t:
                return False

            index_s -= 1
            index_t -= 1

        return True
```

```java
public class Solution {
    public boolean backspaceCompare(String s, String t) {
        int indexS = s.length() - 1, indexT = t.length() - 1;

        while (indexS >= 0 || indexT >= 0) {
            indexS = nextValidChar(s, indexS);
            indexT = nextValidChar(t, indexT);

            char charS = indexS >= 0 ? s.charAt(indexS) : '\0';
            char charT = indexT >= 0 ? t.charAt(indexT) : '\0';

            if (charS != charT) return false;

            indexS--;
            indexT--;
        }

        return true;
    }

    private int nextValidChar(String str, int index) {
        int backspace = 0;

        while (index >= 0) {
            if (str.charAt(index) == '#') {
                backspace++;
            } else if (backspace > 0) {
                backspace--;
            } else {
                break;
            }
            index--;
        }

        return index;
    }
}
```

```cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        int indexS = s.size() - 1, indexT = t.size() - 1;

        while (indexS >= 0 || indexT >= 0) {
            indexS = nextValidChar(s, indexS);
            indexT = nextValidChar(t, indexT);

            char charS = indexS >= 0 ? s[indexS] : '\0';
            char charT = indexT >= 0 ? t[indexT] : '\0';

            if (charS != charT) return false;

            indexS--;
            indexT--;
        }

        return true;
    }

private:
    int nextValidChar(string &str, int index) {
        int backspace = 0;

        while (index >= 0) {
            if (str[index] == '#') {
                backspace++;
            } else if (backspace > 0) {
                backspace--;
            } else {
                break;
            }
            index--;
        }

        return index;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    backspaceCompare(s, t) {
        const nextValidChar = (str, index) => {
            let backspace = 0;

            while (index >= 0) {
                if (str[index] === '#') {
                    backspace++;
                } else if (backspace > 0) {
                    backspace--;
                } else {
                    break;
                }
                index--;
            }

            return index;
        };

        let indexS = s.length - 1,
            indexT = t.length - 1;

        while (indexS >= 0 || indexT >= 0) {
            indexS = nextValidChar(s, indexS);
            indexT = nextValidChar(t, indexT);

            const charS = indexS >= 0 ? s[indexS] : '';
            const charT = indexT >= 0 ? t[indexT] : '';

            if (charS !== charT) return false;

            indexS--;
            indexT--;
        }

        return true;
    }
}
```

```csharp
public class Solution {
    public bool BackspaceCompare(string s, string t) {
        int indexS = s.Length - 1, indexT = t.Length - 1;

        while (indexS >= 0 || indexT >= 0) {
            indexS = NextValidChar(s, indexS);
            indexT = NextValidChar(t, indexT);

            char charS = indexS >= 0 ? s[indexS] : '\0';
            char charT = indexT >= 0 ? t[indexT] : '\0';

            if (charS != charT) return false;

            indexS--;
            indexT--;
        }

        return true;
    }

    private int NextValidChar(string str, int index) {
        int backspace = 0;

        while (index >= 0) {
            if (str[index] == '#') {
                backspace++;
            } else if (backspace > 0) {
                backspace--;
            } else {
                break;
            }
            index--;
        }

        return index;
    }
}
```

```go
func backspaceCompare(s string, t string) bool {
    nextValidChar := func(str string, index int) int {
        backspace := 0
        for index >= 0 {
            if str[index] == '#' {
                backspace++
            } else if backspace > 0 {
                backspace--
            } else {
                break
            }
            index--
        }
        return index
    }

    indexS, indexT := len(s)-1, len(t)-1

    for indexS >= 0 || indexT >= 0 {
        indexS = nextValidChar(s, indexS)
        indexT = nextValidChar(t, indexT)

        var charS, charT byte = 0, 0
        if indexS >= 0 {
            charS = s[indexS]
        }
        if indexT >= 0 {
            charT = t[indexT]
        }

        if charS != charT {
            return false
        }

        indexS--
        indexT--
    }

    return true
}
```

```kotlin
class Solution {
    fun backspaceCompare(s: String, t: String): Boolean {
        fun nextValidChar(str: String, idx: Int): Int {
            var index = idx
            var backspace = 0
            while (index >= 0) {
                if (str[index] == '#') {
                    backspace++
                } else if (backspace > 0) {
                    backspace--
                } else {
                    break
                }
                index--
            }
            return index
        }

        var indexS = s.length - 1
        var indexT = t.length - 1

        while (indexS >= 0 || indexT >= 0) {
            indexS = nextValidChar(s, indexS)
            indexT = nextValidChar(t, indexT)

            val charS = if (indexS >= 0) s[indexS] else '\u0000'
            val charT = if (indexT >= 0) t[indexT] else '\u0000'

            if (charS != charT) return false

            indexS--
            indexT--
        }

        return true
    }
}
```

```swift
class Solution {
    func backspaceCompare(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)

        func nextValidChar(_ str: [Character], _ idx: Int) -> Int {
            var index = idx
            var backspace = 0
            while index >= 0 {
                if str[index] == "#" {
                    backspace += 1
                } else if backspace > 0 {
                    backspace -= 1
                } else {
                    break
                }
                index -= 1
            }
            return index
        }

        var indexS = sArr.count - 1
        var indexT = tArr.count - 1

        while indexS >= 0 || indexT >= 0 {
            indexS = nextValidChar(sArr, indexS)
            indexT = nextValidChar(tArr, indexT)

            let charS: Character = indexS >= 0 ? sArr[indexS] : "\0"
            let charT: Character = indexT >= 0 ? tArr[indexT] : "\0"

            if charS != charT { return false }

            indexS -= 1
            indexT -= 1
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 4. Two Pointers - II

### Intuition

This is a more compact version of the two-pointer approach. Instead of using a helper function, we inline the logic for skipping characters. The core idea remains the same: iterate backward through both strings simultaneously, skip characters that would be deleted by backspaces, and compare the remaining characters one by one.

### Algorithm

1. Initialize pointers at the end of both strings and backspace counters for each.
2. Loop until both pointers are exhausted:
   - For each string, skip backward while there are backspaces to apply or `#` characters to count.
   - Compare the current valid characters from both strings.
   - If they don't match, check if both pointers are `-1` (both exhausted). If not, return `false`.
   - Move both pointers left and continue.
3. Return `true` if all comparisons passed.

::tabs-start

```python
class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        index_s, index_t = len(s) - 1, len(t) - 1
        backspace_s = backspace_t = 0

        while True:
            while index_s >= 0 and (backspace_s or s[index_s] == '#'):
                backspace_s += 1 if s[index_s] == '#' else -1
                index_s -= 1

            while index_t >= 0 and (backspace_t or t[index_t] == '#'):
                backspace_t += 1 if t[index_t] == '#' else -1
                index_t -= 1

            if not (index_s >= 0 and index_t >= 0 and s[index_s] == t[index_t]):
                return index_s == index_t == -1
            index_s, index_t = index_s - 1, index_t - 1
```

```java
public class Solution {
    public boolean backspaceCompare(String s, String t) {
        int indexS = s.length() - 1, indexT = t.length() - 1;
        int backspaceS = 0, backspaceT = 0;

        while (true) {
            while (indexS >= 0 && (backspaceS > 0 || s.charAt(indexS) == '#')) {
                backspaceS += s.charAt(indexS) == '#' ? 1 : -1;
                indexS--;
            }

            while (indexT >= 0 && (backspaceT > 0 || t.charAt(indexT) == '#')) {
                backspaceT += t.charAt(indexT) == '#' ? 1 : -1;
                indexT--;
            }

            if (!(indexS >= 0 && indexT >= 0 && s.charAt(indexS) == t.charAt(indexT))) {
                return indexS == -1 && indexT == -1;
            }
            indexS--;
            indexT--;
        }
    }
}
```

```cpp
class Solution {
public:
    bool backspaceCompare(string s, string t) {
        int indexS = s.size() - 1, indexT = t.size() - 1;
        int backspaceS = 0, backspaceT = 0;

        while (true) {

            while (indexS >= 0 && (backspaceS > 0 || s[indexS] == '#')) {
                backspaceS += (s[indexS] == '#') ? 1 : -1;
                indexS--;
            }

            while (indexT >= 0 && (backspaceT > 0 || t[indexT] == '#')) {
                backspaceT += (t[indexT] == '#') ? 1 : -1;
                indexT--;
            }

            if (!(indexS >= 0 && indexT >= 0 && s[indexS] == t[indexT])) {
                return indexS == -1 && indexT == -1;
            }
            indexS--;
            indexT--;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    backspaceCompare(s, t) {
        let indexS = s.length - 1,
            indexT = t.length - 1;
        let backspaceS = 0,
            backspaceT = 0;

        while (true) {
            while (indexS >= 0 && (backspaceS > 0 || s[indexS] === '#')) {
                backspaceS += s[indexS] === '#' ? 1 : -1;
                indexS--;
            }

            while (indexT >= 0 && (backspaceT > 0 || t[indexT] === '#')) {
                backspaceT += t[indexT] === '#' ? 1 : -1;
                indexT--;
            }

            if (
                !(
                    indexS >= 0 &&
                    indexT >= 0 &&
                    s.charAt(indexS) === t.charAt(indexT)
                )
            ) {
                return indexS === -1 && indexT === -1;
            }
            indexS--;
            indexT--;
        }
    }
}
```

```csharp
public class Solution {
    public bool BackspaceCompare(string s, string t) {
        int indexS = s.Length - 1, indexT = t.Length - 1;
        int backspaceS = 0, backspaceT = 0;

        while (true) {
            while (indexS >= 0 && (backspaceS > 0 || s[indexS] == '#')) {
                backspaceS += s[indexS] == '#' ? 1 : -1;
                indexS--;
            }

            while (indexT >= 0 && (backspaceT > 0 || t[indexT] == '#')) {
                backspaceT += t[indexT] == '#' ? 1 : -1;
                indexT--;
            }

            if (!(indexS >= 0 && indexT >= 0 && s[indexS] == t[indexT])) {
                return indexS == -1 && indexT == -1;
            }
            indexS--;
            indexT--;
        }
    }
}
```

```go
func backspaceCompare(s string, t string) bool {
    indexS, indexT := len(s)-1, len(t)-1
    backspaceS, backspaceT := 0, 0

    for {
        for indexS >= 0 && (backspaceS > 0 || s[indexS] == '#') {
            if s[indexS] == '#' {
                backspaceS++
            } else {
                backspaceS--
            }
            indexS--
        }

        for indexT >= 0 && (backspaceT > 0 || t[indexT] == '#') {
            if t[indexT] == '#' {
                backspaceT++
            } else {
                backspaceT--
            }
            indexT--
        }

        if !(indexS >= 0 && indexT >= 0 && s[indexS] == t[indexT]) {
            return indexS == -1 && indexT == -1
        }
        indexS--
        indexT--
    }
}
```

```kotlin
class Solution {
    fun backspaceCompare(s: String, t: String): Boolean {
        var indexS = s.length - 1
        var indexT = t.length - 1
        var backspaceS = 0
        var backspaceT = 0

        while (true) {
            while (indexS >= 0 && (backspaceS > 0 || s[indexS] == '#')) {
                backspaceS += if (s[indexS] == '#') 1 else -1
                indexS--
            }

            while (indexT >= 0 && (backspaceT > 0 || t[indexT] == '#')) {
                backspaceT += if (t[indexT] == '#') 1 else -1
                indexT--
            }

            if (!(indexS >= 0 && indexT >= 0 && s[indexS] == t[indexT])) {
                return indexS == -1 && indexT == -1
            }
            indexS--
            indexT--
        }
    }
}
```

```swift
class Solution {
    func backspaceCompare(_ s: String, _ t: String) -> Bool {
        let sArr = Array(s)
        let tArr = Array(t)
        var indexS = sArr.count - 1
        var indexT = tArr.count - 1
        var backspaceS = 0
        var backspaceT = 0

        while true {
            while indexS >= 0 && (backspaceS > 0 || sArr[indexS] == "#") {
                backspaceS += sArr[indexS] == "#" ? 1 : -1
                indexS -= 1
            }

            while indexT >= 0 && (backspaceT > 0 || tArr[indexT] == "#") {
                backspaceT += tArr[indexT] == "#" ? 1 : -1
                indexT -= 1
            }

            if !(indexS >= 0 && indexT >= 0 && sArr[indexS] == tArr[indexT]) {
                return indexS == -1 && indexT == -1
            }
            indexS -= 1
            indexT -= 1
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.
