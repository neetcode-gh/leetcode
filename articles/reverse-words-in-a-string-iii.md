## 1. Convert To String Array

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. String Manipulation

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Two Pointers - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Two Pointers - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
