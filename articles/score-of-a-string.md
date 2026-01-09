## 1. Iteration

### Intuition

The score of a string is defined as the sum of absolute differences between adjacent characters' ASCII values. Since we need to compare each character with its neighbor, we simply walk through the string once, computing the difference between consecutive characters and accumulating the result.

### Algorithm

1. Initialize a variable `res` to store the running total.
2. Iterate through the string from index `0` to `n - 2`:
   - For each position `i`, compute the absolute difference between the ASCII values of `s[i]` and `s[i + 1]`.
   - Add this difference to `res`.
3. Return `res`.

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

```go
func scoreOfString(s string) int {
    res := 0
    for i := 0; i < len(s)-1; i++ {
        diff := int(s[i]) - int(s[i+1])
        if diff < 0 {
            diff = -diff
        }
        res += diff
    }
    return res
}
```

```kotlin
class Solution {
    fun scoreOfString(s: String): Int {
        var res = 0
        for (i in 0 until s.length - 1) {
            res += kotlin.math.abs(s[i].code - s[i + 1].code)
        }
        return res
    }
}
```

```swift
class Solution {
    func scoreOfString(_ s: String) -> Int {
        let chars = Array(s)
        var res = 0
        for i in 0..<chars.count - 1 {
            res += abs(Int(chars[i].asciiValue!) - Int(chars[i + 1].asciiValue!))
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
