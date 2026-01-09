## 1. Brute Force

### Intuition

We want to find the longest substring where the total transformation cost stays within the budget. The transformation cost at each position is the absolute difference between the ASCII values of the corresponding characters. By checking every possible substring and tracking its cost, we can find the maximum valid length.

### Algorithm

1. For each starting index `i`, try extending the substring to the right.
2. Maintain a running cost by adding `|s[j] - t[j]|` for each new character.
3. If the cost exceeds `maxCost`, stop extending from this start.
4. Track the maximum valid substring length found.
5. Return the maximum length.

::tabs-start

```python
class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        n = len(s)
        res = 0

        for i in range(n):
            cur_cost = 0
            for j in range(i, n):
                cur_cost += abs(ord(t[j]) - ord(s[j]))
                if cur_cost > maxCost:
                    break
                res = max(res, j - i + 1)

        return res
```

```java
public class Solution {
    public int equalSubstring(String s, String t, int maxCost) {
        int n = s.length();
        int res = 0;

        for (int i = 0; i < n; i++) {
            int curCost = 0;
            for (int j = i; j < n; j++) {
                curCost += Math.abs(t.charAt(j) - s.charAt(j));
                if (curCost > maxCost) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int n = s.size();
        int res = 0;

        for (int i = 0; i < n; i++) {
            int curCost = 0;
            for (int j = i; j < n; j++) {
                curCost += abs(t[j] - s[j]);
                if (curCost > maxCost) {
                    break;
                }
                res = max(res, j - i + 1);
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
     * @param {number} maxCost
     * @return {number}
     */
    equalSubstring(s, t, maxCost) {
        const n = s.length;
        let res = 0;

        for (let i = 0; i < n; i++) {
            let curCost = 0;
            for (let j = i; j < n; j++) {
                curCost += Math.abs(t.charCodeAt(j) - s.charCodeAt(j));
                if (curCost > maxCost) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int EqualSubstring(string s, string t, int maxCost) {
        int n = s.Length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            int curCost = 0;
            for (int j = i; j < n; j++) {
                curCost += Math.Abs(t[j] - s[j]);
                if (curCost > maxCost) {
                    break;
                }
                res = Math.Max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

```go
func equalSubstring(s string, t string, maxCost int) int {
    n := len(s)
    res := 0

    for i := 0; i < n; i++ {
        curCost := 0
        for j := i; j < n; j++ {
            diff := int(t[j]) - int(s[j])
            if diff < 0 {
                diff = -diff
            }
            curCost += diff
            if curCost > maxCost {
                break
            }
            if j-i+1 > res {
                res = j - i + 1
            }
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun equalSubstring(s: String, t: String, maxCost: Int): Int {
        val n = s.length
        var res = 0

        for (i in 0 until n) {
            var curCost = 0
            for (j in i until n) {
                curCost += kotlin.math.abs(t[j].code - s[j].code)
                if (curCost > maxCost) {
                    break
                }
                res = maxOf(res, j - i + 1)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func equalSubstring(_ s: String, _ t: String, _ maxCost: Int) -> Int {
        let sArr = Array(s)
        let tArr = Array(t)
        let n = sArr.count
        var res = 0

        for i in 0..<n {
            var curCost = 0
            for j in i..<n {
                curCost += abs(Int(tArr[j].asciiValue!) - Int(sArr[j].asciiValue!))
                if curCost > maxCost {
                    break
                }
                res = max(res, j - i + 1)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Sliding Window

### Intuition

Since we want the longest contiguous substring within a cost budget, a sliding window is ideal. We expand the window by moving the right pointer and shrink it from the left when the cost exceeds the budget. This efficiently explores all valid windows in linear time.

### Algorithm

1. Initialize two pointers `l` and `r` at the start, and a running `curCost` of 0.
2. Expand the window by moving `r` and adding `|s[r] - t[r]|` to `curCost`.
3. While `curCost` exceeds `maxCost`, shrink the window by subtracting `|s[l] - t[l]|` and incrementing `l`.
4. Update the result with the current window size `r - l + 1`.
5. Return the maximum window size found.

::tabs-start

```python
class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        curCost = 0
        l = 0
        res = 0

        for r in range(len(s)):
            curCost += abs(ord(s[r]) - ord(t[r]))
            while curCost > maxCost:
                curCost -= abs(ord(s[l]) - ord(t[l]))
                l += 1
            res = max(res, r - l + 1)

        return res
```

```java
public class Solution {
    public int equalSubstring(String s, String t, int maxCost) {
        int curCost = 0, l = 0, res = 0;

        for (int r = 0; r < s.length(); r++) {
            curCost += Math.abs(s.charAt(r) - t.charAt(r));
            while (curCost > maxCost) {
                curCost -= Math.abs(s.charAt(l) - t.charAt(l));
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int curCost = 0, l = 0, res = 0;

        for (int r = 0; r < s.length(); r++) {
            curCost += abs(s[r] - t[r]);
            while (curCost > maxCost) {
                curCost -= abs(s[l] - t[l]);
                l++;
            }
            res = max(res, r - l + 1);
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
     * @param {number} maxCost
     * @return {number}
     */
    equalSubstring(s, t, maxCost) {
        let curCost = 0,
            l = 0,
            res = 0;

        for (let r = 0; r < s.length; r++) {
            curCost += Math.abs(s.charCodeAt(r) - t.charCodeAt(r));
            while (curCost > maxCost) {
                curCost -= Math.abs(s.charCodeAt(l) - t.charCodeAt(l));
                l++;
            }
            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int EqualSubstring(string s, string t, int maxCost) {
        int curCost = 0, l = 0, res = 0;

        for (int r = 0; r < s.Length; r++) {
            curCost += Math.Abs(s[r] - t[r]);
            while (curCost > maxCost) {
                curCost -= Math.Abs(s[l] - t[l]);
                l++;
            }
            res = Math.Max(res, r - l + 1);
        }

        return res;
    }
}
```

```go
func equalSubstring(s string, t string, maxCost int) int {
    curCost, l, res := 0, 0, 0

    for r := 0; r < len(s); r++ {
        diff := int(s[r]) - int(t[r])
        if diff < 0 {
            diff = -diff
        }
        curCost += diff
        for curCost > maxCost {
            diff := int(s[l]) - int(t[l])
            if diff < 0 {
                diff = -diff
            }
            curCost -= diff
            l++
        }
        if r-l+1 > res {
            res = r - l + 1
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun equalSubstring(s: String, t: String, maxCost: Int): Int {
        var curCost = 0
        var l = 0
        var res = 0

        for (r in s.indices) {
            curCost += kotlin.math.abs(s[r].code - t[r].code)
            while (curCost > maxCost) {
                curCost -= kotlin.math.abs(s[l].code - t[l].code)
                l++
            }
            res = maxOf(res, r - l + 1)
        }

        return res
    }
}
```

```swift
class Solution {
    func equalSubstring(_ s: String, _ t: String, _ maxCost: Int) -> Int {
        let sArr = Array(s)
        let tArr = Array(t)
        var curCost = 0
        var l = 0
        var res = 0

        for r in 0..<sArr.count {
            curCost += abs(Int(sArr[r].asciiValue!) - Int(tArr[r].asciiValue!))
            while curCost > maxCost {
                curCost -= abs(Int(sArr[l].asciiValue!) - Int(tArr[l].asciiValue!))
                l += 1
            }
            res = max(res, r - l + 1)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Sliding Window (Optimal)

### Intuition

We can simplify the sliding window by never shrinking it more than one position at a time. Once we find a valid window of size `k`, we only care about finding windows of size `k+1` or larger. If the current window is invalid, we slide both pointers together, maintaining the window size. The final answer is derived from the position of the left pointer.

### Algorithm

1. Start with `l = 0` and iterate `r` from 0 to `n-1`.
2. Subtract `|s[r] - t[r]|` from `maxCost`.
3. If `maxCost` goes negative, add back `|s[l] - t[l]|` and increment `l` by one.
4. The window never shrinks below its maximum valid size.
5. Return `n - l` as the result.

::tabs-start

```python
class Solution:
    def equalSubstring(self, s: str, t: str, maxCost: int) -> int:
        l = 0
        for r in range(len(s)):
            maxCost -= abs(ord(s[r]) - ord(t[r]))
            if maxCost < 0:
                maxCost += abs(ord(s[l]) - ord(t[l]))
                l += 1
        return len(s) - l
```

```java
public class Solution {
    public int equalSubstring(String s, String t, int maxCost) {
        int l = 0;
        for (int r = 0; r < s.length(); r++) {
            maxCost -= Math.abs(s.charAt(r) - t.charAt(r));
            if (maxCost < 0) {
                maxCost += Math.abs(s.charAt(l) - t.charAt(l));
                l++;
            }
        }
        return s.length() - l;
    }
}
```

```cpp
class Solution {
public:
    int equalSubstring(string s, string t, int maxCost) {
        int l = 0;
        for (int r = 0; r < s.length(); r++) {
            maxCost -= abs(s[r] - t[r]);
            if (maxCost < 0) {
                maxCost += abs(s[l] - t[l]);
                l++;
            }
        }
        return s.length() - l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @param {number} maxCost
     * @return {number}
     */
    equalSubstring(s, t, maxCost) {
        let l = 0;
        for (let r = 0; r < s.length; r++) {
            maxCost -= Math.abs(s.charCodeAt(r) - t.charCodeAt(r));
            if (maxCost < 0) {
                maxCost += Math.abs(s.charCodeAt(l) - t.charCodeAt(l));
                l++;
            }
        }
        return s.length - l;
    }
}
```

```csharp
public class Solution {
    public int EqualSubstring(string s, string t, int maxCost) {
        int l = 0;
        for (int r = 0; r < s.Length; r++) {
            maxCost -= Math.Abs(s[r] - t[r]);
            if (maxCost < 0) {
                maxCost += Math.Abs(s[l] - t[l]);
                l++;
            }
        }
        return s.Length - l;
    }
}
```

```go
func equalSubstring(s string, t string, maxCost int) int {
    l := 0
    for r := 0; r < len(s); r++ {
        diff := int(s[r]) - int(t[r])
        if diff < 0 {
            diff = -diff
        }
        maxCost -= diff
        if maxCost < 0 {
            diff := int(s[l]) - int(t[l])
            if diff < 0 {
                diff = -diff
            }
            maxCost += diff
            l++
        }
    }
    return len(s) - l
}
```

```kotlin
class Solution {
    fun equalSubstring(s: String, t: String, maxCost: Int): Int {
        var cost = maxCost
        var l = 0
        for (r in s.indices) {
            cost -= kotlin.math.abs(s[r].code - t[r].code)
            if (cost < 0) {
                cost += kotlin.math.abs(s[l].code - t[l].code)
                l++
            }
        }
        return s.length - l
    }
}
```

```swift
class Solution {
    func equalSubstring(_ s: String, _ t: String, _ maxCost: Int) -> Int {
        let sArr = Array(s)
        let tArr = Array(t)
        var cost = maxCost
        var l = 0

        for r in 0..<sArr.count {
            cost -= abs(Int(sArr[r].asciiValue!) - Int(tArr[r].asciiValue!))
            if cost < 0 {
                cost += abs(Int(sArr[l].asciiValue!) - Int(tArr[l].asciiValue!))
                l += 1
            }
        }
        return sArr.count - l
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
