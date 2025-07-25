## 1. Stack

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 2. Reverse iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(n + m)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 3. Two Pointers - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.

---

## 4. Two Pointers - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(1)$

> Where $n$ is the length of the string $s$ and $m$ is the length of the string $t$.
