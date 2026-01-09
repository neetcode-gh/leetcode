## 1. Two Pointers - I

### Intuition

The goal is to remove consecutive balloons of the same color such that no two adjacent balloons share a color. When we find a group of consecutive same-colored balloons, we need to keep exactly one and remove the rest. To minimize the total removal time, we should keep the balloon with the highest removal cost and remove all others.

### Algorithm

1. Initialize `res = 0` and `i = 0`.
2. While `i < n`:
   - Find all consecutive balloons with the same color starting at `i`.
   - Track the sum of removal times (`curr`) and the maximum removal time (`maxi`) in this group.
   - Add `curr - maxi` to `res` (we keep the most expensive one, remove the rest).
   - Move `i` to the next group.
3. Return `res` as the result.

::tabs-start

```python
class Solution:
    def minCost(self, colors: str, neededTime: List[int]) -> int:
        n = len(neededTime)
        res = i = 0
        while i < n:
            j = i
            maxi = curr = 0
            while j < n and colors[j] == colors[i]:
                maxi = max(maxi, neededTime[j])
                curr += neededTime[j]
                j += 1
            res += curr - maxi
            i = j
        return res
```

```java
public class Solution {
    public int minCost(String colors, int[] neededTime) {
        int n = neededTime.length;
        int res = 0, i = 0;
        while (i < n) {
            int j = i, maxi = 0, curr = 0;
            while (j < n && colors.charAt(j) == colors.charAt(i)) {
                maxi = Math.max(maxi, neededTime[j]);
                curr += neededTime[j];
                j++;
            }
            res += curr - maxi;
            i = j;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minCost(string colors, vector<int>& neededTime) {
        int n = neededTime.size();
        int res = 0, i = 0;
        while (i < n) {
            int j = i, maxi = 0, curr = 0;
            while (j < n && colors[j] == colors[i]) {
                maxi = max(maxi, neededTime[j]);
                curr += neededTime[j];
                j++;
            }
            res += curr - maxi;
            i = j;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[]} neededTime
     * @return {number}
     */
    minCost(colors, neededTime) {
        const n = neededTime.length;
        let res = 0,
            i = 0;
        while (i < n) {
            let j = i,
                maxi = 0,
                curr = 0;
            while (j < n && colors[j] === colors[i]) {
                maxi = Math.max(maxi, neededTime[j]);
                curr += neededTime[j];
                j++;
            }
            res += curr - maxi;
            i = j;
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinCost(string colors, int[] neededTime) {
        int n = neededTime.Length;
        int res = 0, i = 0;
        while (i < n) {
            int j = i, maxi = 0, curr = 0;
            while (j < n && colors[j] == colors[i]) {
                maxi = Math.Max(maxi, neededTime[j]);
                curr += neededTime[j];
                j++;
            }
            res += curr - maxi;
            i = j;
        }
        return res;
    }
}
```

```go
func minCost(colors string, neededTime []int) int {
    n := len(neededTime)
    res, i := 0, 0
    for i < n {
        j := i
        maxi, curr := 0, 0
        for j < n && colors[j] == colors[i] {
            if neededTime[j] > maxi {
                maxi = neededTime[j]
            }
            curr += neededTime[j]
            j++
        }
        res += curr - maxi
        i = j
    }
    return res
}
```

```kotlin
class Solution {
    fun minCost(colors: String, neededTime: IntArray): Int {
        val n = neededTime.size
        var res = 0
        var i = 0
        while (i < n) {
            var j = i
            var maxi = 0
            var curr = 0
            while (j < n && colors[j] == colors[i]) {
                maxi = maxOf(maxi, neededTime[j])
                curr += neededTime[j]
                j++
            }
            res += curr - maxi
            i = j
        }
        return res
    }
}
```

```swift
class Solution {
    func minCost(_ colors: String, _ neededTime: [Int]) -> Int {
        let n = neededTime.count
        let chars = Array(colors)
        var res = 0
        var i = 0
        while i < n {
            var j = i
            var maxi = 0
            var curr = 0
            while j < n && chars[j] == chars[i] {
                maxi = max(maxi, neededTime[j])
                curr += neededTime[j]
                j += 1
            }
            res += curr - maxi
            i = j
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 2. Two Pointers - II

### Intuition

Instead of finding entire groups at once, we can process pairs of adjacent balloons. When two adjacent balloons have the same color, we remove the one with smaller removal time. We keep a pointer `l` to track the balloon we're keeping, and compare it with each new balloon at position `r`.

### Algorithm

1. Initialize `l = 0` and `res = 0`.
2. For each `r` from `1` to `n-1`:
   - If `colors[l] == colors[r]` (same color):
     - If `neededTime[l] < neededTime[r]`: add `neededTime[l]` to `res` and update `l = r`.
     - Otherwise: add `neededTime[r]` to `res` (keep `l` unchanged).
   - If different colors: update `l = r`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def minCost(self, colors: str, neededTime: List[int]) -> int:
        l, res = 0, 0
        for r in range(1, len(colors)):
            if colors[l] == colors[r]:
                if neededTime[l] < neededTime[r]:
                    res += neededTime[l]
                    l = r
                else:
                    res += neededTime[r]
            else:
                l = r
        return res
```

```java
public class Solution {
    public int minCost(String colors, int[] neededTime) {
        int l = 0, res = 0;
        for (int r = 1; r < colors.length(); r++) {
            if (colors.charAt(l) == colors.charAt(r)) {
                if (neededTime[l] < neededTime[r]) {
                    res += neededTime[l];
                    l = r;
                } else {
                    res += neededTime[r];
                }
            } else {
                l = r;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minCost(string colors, vector<int>& neededTime) {
        int l = 0, res = 0;
        for (int r = 1; r < colors.size(); r++) {
            if (colors[l] == colors[r]) {
                if (neededTime[l] < neededTime[r]) {
                    res += neededTime[l];
                    l = r;
                } else {
                    res += neededTime[r];
                }
            } else {
                l = r;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[]} neededTime
     * @return {number}
     */
    minCost(colors, neededTime) {
        let l = 0,
            res = 0;
        for (let r = 1; r < colors.length; r++) {
            if (colors[l] === colors[r]) {
                if (neededTime[l] < neededTime[r]) {
                    res += neededTime[l];
                    l = r;
                } else {
                    res += neededTime[r];
                }
            } else {
                l = r;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinCost(string colors, int[] neededTime) {
        int l = 0, res = 0;
        for (int r = 1; r < colors.Length; r++) {
            if (colors[l] == colors[r]) {
                if (neededTime[l] < neededTime[r]) {
                    res += neededTime[l];
                    l = r;
                } else {
                    res += neededTime[r];
                }
            } else {
                l = r;
            }
        }
        return res;
    }
}
```

```go
func minCost(colors string, neededTime []int) int {
    l, res := 0, 0
    for r := 1; r < len(colors); r++ {
        if colors[l] == colors[r] {
            if neededTime[l] < neededTime[r] {
                res += neededTime[l]
                l = r
            } else {
                res += neededTime[r]
            }
        } else {
            l = r
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minCost(colors: String, neededTime: IntArray): Int {
        var l = 0
        var res = 0
        for (r in 1 until colors.length) {
            if (colors[l] == colors[r]) {
                if (neededTime[l] < neededTime[r]) {
                    res += neededTime[l]
                    l = r
                } else {
                    res += neededTime[r]
                }
            } else {
                l = r
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func minCost(_ colors: String, _ neededTime: [Int]) -> Int {
        let chars = Array(colors)
        var l = 0
        var res = 0
        for r in 1..<chars.count {
            if chars[l] == chars[r] {
                if neededTime[l] < neededTime[r] {
                    res += neededTime[l]
                    l = r
                } else {
                    res += neededTime[r]
                }
            } else {
                l = r
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Two Pointers - III

### Intuition

We can simplify the logic further by tracking the maximum removal time seen so far in the current group of same-colored balloons. For each balloon, we add the minimum of the current maximum and the current balloon's time to the result, then update the maximum. When we encounter a different color, we reset the maximum to `0`.

### Algorithm

1. Initialize `res = 0` and `maxi = 0`.
2. For each index `i`:
   - If `i > 0` and `colors[i] != colors[i-1]`, reset `maxi = 0`.
   - Add `min(maxi, neededTime[i])` to `res`.
   - Update `maxi = max(maxi, neededTime[i])`.
3. Return `res`.

::tabs-start

```python
class Solution:
    def minCost(self, colors: str, neededTime: List[int]) -> int:
        res = maxi = 0
        for i in range(len(colors)):
            if i and colors[i] != colors[i - 1]:
                maxi = 0
            res += min(maxi, neededTime[i])
            maxi = max(maxi, neededTime[i])
        return res
```

```java
public class Solution {
    public int minCost(String colors, int[] neededTime) {
        int res = 0, maxi = 0;
        for (int i = 0; i < colors.length(); i++) {
            if (i > 0 && colors.charAt(i) != colors.charAt(i - 1)) {
                maxi = 0;
            }
            res += Math.min(maxi, neededTime[i]);
            maxi = Math.max(maxi, neededTime[i]);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int minCost(string colors, vector<int>& neededTime) {
        int res = 0, maxi = 0;
        for (int i = 0; i < colors.size(); i++) {
            if (i > 0 && colors[i] != colors[i - 1]) {
                maxi = 0;
            }
            res += min(maxi, neededTime[i]);
            maxi = max(maxi, neededTime[i]);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} colors
     * @param {number[]} neededTime
     * @return {number}
     */
    minCost(colors, neededTime) {
        let res = 0,
            maxi = 0;
        for (let i = 0; i < colors.length; i++) {
            if (i > 0 && colors[i] !== colors[i - 1]) {
                maxi = 0;
            }
            res += Math.min(maxi, neededTime[i]);
            maxi = Math.max(maxi, neededTime[i]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinCost(string colors, int[] neededTime) {
        int res = 0, maxi = 0;
        for (int i = 0; i < colors.Length; i++) {
            if (i > 0 && colors[i] != colors[i - 1]) {
                maxi = 0;
            }
            res += Math.Min(maxi, neededTime[i]);
            maxi = Math.Max(maxi, neededTime[i]);
        }
        return res;
    }
}
```

```go
func minCost(colors string, neededTime []int) int {
    res, maxi := 0, 0
    for i := 0; i < len(colors); i++ {
        if i > 0 && colors[i] != colors[i-1] {
            maxi = 0
        }
        if maxi < neededTime[i] {
            res += maxi
            maxi = neededTime[i]
        } else {
            res += neededTime[i]
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minCost(colors: String, neededTime: IntArray): Int {
        var res = 0
        var maxi = 0
        for (i in colors.indices) {
            if (i > 0 && colors[i] != colors[i - 1]) {
                maxi = 0
            }
            res += minOf(maxi, neededTime[i])
            maxi = maxOf(maxi, neededTime[i])
        }
        return res
    }
}
```

```swift
class Solution {
    func minCost(_ colors: String, _ neededTime: [Int]) -> Int {
        let chars = Array(colors)
        var res = 0
        var maxi = 0
        for i in 0..<chars.count {
            if i > 0 && chars[i] != chars[i - 1] {
                maxi = 0
            }
            res += min(maxi, neededTime[i])
            maxi = max(maxi, neededTime[i])
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
