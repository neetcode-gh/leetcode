## 1. Iteration

::tabs-start

```python
class Solution:
    def scoreOfString(self, s: str) -> int:
        res = 0
        for i in range(len(s) - 1):
            res += abs(ord(s[i]) - ord(s[i + 1]))
        return res
```

```java
public class Solution {
    public int scoreOfString(String s) {
        int res = 0;
        for (int i = 0; i < s.length() - 1; i++) {
            res += Math.abs(s.charAt(i) - s.charAt(i + 1));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int scoreOfString(string s) {
        int res = 0;
        for (int i = 0; i < s.length() - 1; i++) {
            res += abs(s[i] - s[i + 1]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    scoreOfString(s) {
        let res = 0;
        for (let i = 0; i < s.length - 1; i++) {
            res += Math.abs(s.charCodeAt(i) - s.charCodeAt(i + 1));
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int ScoreOfString(string s) {
        int res = 0;
        for (int i = 0; i < s.Length - 1; i++) {
            res += Math.Abs(s[i] - s[i + 1]);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
