## 1. Iteration - I

::tabs-start

```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1:
            return s

        res = []
        for r in range(numRows):
            increment = 2 * (numRows - 1)
            for i in range(r, len(s), increment):
                res.append(s[i])
                if r > 0 and r < numRows - 1 and i + increment - 2 * r < len(s):
                    res.append(s[i + increment - 2 * r])

        return ''.join(res)
```

```java
public class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) {
            return s;
        }

        StringBuilder res = new StringBuilder();
        int len = s.length();

        for (int r = 0; r < numRows; r++) {
            int increment = 2 * (numRows - 1);
            for (int i = r; i < len; i += increment) {
                res.append(s.charAt(i));
                if (r > 0 && r < numRows - 1 && i + increment - 2 * r < len) {
                    res.append(s.charAt(i + increment - 2 * r));
                }
            }
        }

        return res.toString();
    }
}
```

```cpp
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1) {
            return s;
        }

        string res;
        int len = s.size();

        for (int r = 0; r < numRows; r++) {
            int increment = 2 * (numRows - 1);
            for (int i = r; i < len; i += increment) {
                res += s[i];
                if (r > 0 && r < numRows - 1 && i + increment - 2 * r < len) {
                    res += s[i + increment - 2 * r];
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
     * @param {string} s
     * @param {number} numRows
     * @return {string}
     */
    convert(s, numRows) {
        if (numRows === 1) {
            return s;
        }

        let res = [];
        const len = s.length;

        for (let r = 0; r < numRows; r++) {
            const increment = 2 * (numRows - 1);
            for (let i = r; i < len; i += increment) {
                res.push(s[i]);
                if (r > 0 && r < numRows - 1 && i + increment - 2 * r < len) {
                    res.push(s[i + increment - 2 * r]);
                }
            }
        }

        return res.join('');
    }
}
```

```csharp
public class Solution {
    public string Convert(string s, int numRows) {
        if (numRows == 1) {
            return s;
        }

        var res = new StringBuilder();
        int increment = 2 * (numRows - 1);
        for (int r = 0; r < numRows; r++) {
            for (int i = r; i < s.Length; i += increment) {
                res.Append(s[i]);
                int secondIdx = i + increment - 2 * r;
                if (r > 0 && r < numRows - 1 && secondIdx < s.Length) {
                    res.Append(s[secondIdx]);
                }
            }
        }

        return res.ToString();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the ouput string.

---

## 2. Iteration - II

::tabs-start

```python
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1 or numRows >= len(s):
            return s

        res = [[] for _ in range(numRows)]
        row, dir = 0, 1
        for c in s:
            res[row].append(c)
            row += dir
            if row == 0 or row == (numRows - 1):
                dir *= -1

        return ''.join([''.join(row) for row in res])
```

```java
public class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1 || numRows >= s.length()) {
            return s;
        }

        List<Character>[] res = new ArrayList[numRows];
        for (int i = 0; i < numRows; i++) {
            res[i] = new ArrayList<>();
        }

        int row = 0, dir = 1;
        for (int i = 0; i < s.length(); i++) {
            res[row].add(s.charAt(i));
            row += dir;
            if (row == 0 || row == numRows - 1) {
                dir *= -1;
            }
        }

        StringBuilder result = new StringBuilder();
        for (List<Character> rowList : res) {
            for (char c : rowList) {
                result.append(c);
            }
        }
        return result.toString();
    }
}
```

```cpp
class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1 || numRows >= s.size()) {
            return s;
        }

        vector<string> res(numRows);
        int row = 0, dir = 1;

        for (char& c : s) {
            res[row] += c;
            row += dir;
            if (row == 0 || row == numRows - 1) {
                dir *= -1;
            }
        }

        string result;
        for (string& rowString : res) {
            result += rowString;
        }
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {number} numRows
     * @return {string}
     */
    convert(s, numRows) {
        if (numRows === 1 || numRows >= s.length) {
            return s;
        }

        const res = Array.from({ length: numRows }, () => []);
        let row = 0,
            dir = 1;

        for (const c of s) {
            res[row].push(c);
            row += dir;
            if (row === 0 || row === numRows - 1) {
                dir *= -1;
            }
        }

        return res.map((row) => row.join('')).join('');
    }
}
```

```csharp
public class Solution {
    public string Convert(string s, int numRows) {
        if (numRows == 1 || numRows >= s.Length) {
            return s;
        }

        var res = new List<StringBuilder>(numRows);
        for (int i = 0; i < numRows; i++) {
            res.Add(new StringBuilder());
        }

        int row = 0, dir = 1;
        foreach (char c in s) {
            res[row].Append(c);
            row += dir;
            if (row == 0 || row == numRows - 1) {
                dir = -dir;
            }
        }

        var result = new StringBuilder();
        foreach (var sb in res) {
            result.Append(sb);
        }
        return result.ToString();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for the output string.
