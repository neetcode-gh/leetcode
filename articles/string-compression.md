## 1. Using Extra Space

::tabs-start

```python
class Solution:
    def compress(self, chars: List[str]) -> int:
        n = len(chars)
        s = ""

        i = 0
        while i < n:
            s += chars[i]
            j = i + 1
            while j < n and chars[i] == chars[j]:
                j += 1

            if j - i > 1:
                s += str(j - i)
            i = j

        i = 0
        while i < len(s):
            chars[i] = s[i]
            i += 1
        return i
```

```java
public class Solution {
    public int compress(char[] chars) {
        int n = chars.length;
        StringBuilder s = new StringBuilder();

        int i = 0;
        while (i < n) {
            s.append(chars[i]);
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s.append(String.valueOf(j - i));
            }
            i = j;
        }

        for (i = 0; i < s.length(); i++) {
            chars[i] = s.charAt(i);
        }
        return s.length();
    }
}
```

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int n = chars.size();
        string s = "";

        int i = 0;
        while (i < n) {
            s += chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s += to_string(j - i);
            }
            i = j;
        }

        for (i = 0; i < s.size(); i++) {
            chars[i] = s[i];
        }
        return s.size();
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} chars
     * @return {number}
     */
    compress(chars) {
        const n = chars.length;
        let s = "";

        let i = 0;
        while (i < n) {
            s += chars[i];
            let j = i + 1;
            while (j < n && chars[i] === chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s += String(j - i);
            }
            i = j;
        }

        for (i = 0; i < s.length; i++) {
            chars[i] = s[i];
        }
        return s.length;
    }
}
```

```csharp
public class Solution {
    public int Compress(char[] chars) {
        int n = chars.Length;
        string s = "";

        int i = 0;
        while (i < n) {
            s += chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                s += (j - i).ToString();
            }
            i = j;
        }

        for (i = 0; i < s.Length; i++) {
            chars[i] = s[i];
        }
        return s.Length;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ or $O(n ^ 2)$ depending on the language.
* Space complexity: $O(n)$

---

## 2. Two Pointers

::tabs-start

```python
class Solution:
    def compress(self, chars: List[str]) -> int:
        n = len(chars)
        k = i = 0

        while i < n:
            chars[k] = chars[i]
            k += 1
            j = i + 1
            while j < n and chars[i] == chars[j]:
                j += 1

            if j - i > 1:
                for c in str(j - i):
                    chars[k] = c
                    k += 1
            i = j
        return k
```

```java
public class Solution {
    public int compress(char[] chars) {
        int n = chars.length, k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                String cnt = String.valueOf(j - i);
                for (char c : cnt.toCharArray()) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
}
```

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int n = chars.size(), k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                string cnt = to_string(j - i);
                for (char c : cnt) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
};
```

```javascript
class Solution {
    /**
     * @param {character[]} chars
     * @return {number}
     */
    compress(chars) {
        let n = chars.length, k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            let j = i + 1;
            while (j < n && chars[i] === chars[j]) {
                j++;
            }

            if (j - i > 1) {
                const cnt = String(j - i);
                for (const c of cnt) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
}
```

```csharp
public class Solution {
    public int Compress(char[] chars) {
        int n = chars.Length, k = 0, i = 0;

        while (i < n) {
            chars[k++] = chars[i];
            int j = i + 1;
            while (j < n && chars[i] == chars[j]) {
                j++;
            }

            if (j - i > 1) {
                string cnt = (j - i).ToString();
                foreach (char c in cnt) {
                    chars[k++] = c;
                }
            }
            i = j;
        }

        return k;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$