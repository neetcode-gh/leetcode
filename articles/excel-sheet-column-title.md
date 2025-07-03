## 1. Recursion

::tabs-start

```python
class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        if columnNumber == 0:
            return ""

        n = columnNumber - 1
        return self.convertToTitle(n // 26) + chr(n % 26 + ord('A'))
```

```java
public class Solution {
    public String convertToTitle(int columnNumber) {
        if (columnNumber == 0) {
            return "";
        }
        int n = columnNumber - 1;
        return convertToTitle(n / 26) + (char) ('A' + n % 26);
    }
}
```

```cpp
class Solution {
public:
    string convertToTitle(int columnNumber) {
        if (columnNumber == 0) {
            return "";
        }
        int n = columnNumber - 1;
        return convertToTitle(n / 26) + char('A' + n % 26);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} columnNumber
     * @return {string}
     */
    convertToTitle(columnNumber) {
        if (columnNumber === 0) {
            return '';
        }
        const n = columnNumber - 1;
        return (
            this.convertToTitle(Math.floor(n / 26)) +
            String.fromCharCode('A'.charCodeAt(0) + (n % 26))
        );
    }
}
```

```csharp
public class Solution {
    public string ConvertToTitle(int columnNumber) {
        if (columnNumber == 0) {
            return "";
        }

        columnNumber--;
        return ConvertToTitle(columnNumber / 26) + (char)('A' + columnNumber % 26);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(\log n)$ for recursion stack.

> Where $n$ is the given column number.

---

## 2. Iteration

::tabs-start

```python
class Solution:
    def convertToTitle(self, columnNumber: int) -> str:
        res = []
        while columnNumber > 0:
            columnNumber -= 1
            offset = columnNumber % 26
            res += chr(ord('A') + offset)
            columnNumber //= 26

        return ''.join(reversed(res))
```

```java
public class Solution {
    public String convertToTitle(int columnNumber) {
        StringBuilder res = new StringBuilder();
        while (columnNumber > 0) {
            columnNumber--;
            int offset = columnNumber % 26;
            res.append((char) ('A' + offset));
            columnNumber /= 26;
        }
        return res.reverse().toString();
    }
}
```

```cpp
class Solution {
public:
    string convertToTitle(int columnNumber) {
        string res;
        while (columnNumber > 0) {
            columnNumber--;
            int offset = columnNumber % 26;
            res += ('A' + offset);
            columnNumber /= 26;
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} columnNumber
     * @return {string}
     */
    convertToTitle(columnNumber) {
        let res = [];
        while (columnNumber > 0) {
            columnNumber--;
            const offset = columnNumber % 26;
            res.push(String.fromCharCode('A'.charCodeAt(0) + offset));
            columnNumber = Math.floor(columnNumber / 26);
        }
        return res.reverse().join('');
    }
}
```

```csharp
public class Solution {
    public string ConvertToTitle(int columnNumber) {
        var res = new List<char>();
        while (columnNumber > 0) {
            columnNumber--;
            int offset = columnNumber % 26;
            res.Add((char)('A' + offset));
            columnNumber /= 26;
        }
        res.Reverse();
        return new string(res.ToArray());
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$
- Space complexity: $O(1)$ extra space.

> Where $n$ is the given column number.
