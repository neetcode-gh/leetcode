## 1. Brute Force

### Intuition

We try every possible pair of lines and compute the area they form.  
For each pair `(i, j)`, the height of the container is the shorter of the two lines, and the width is the distance between them.  
By checking all pairs, we are guaranteed to find the maximum area.

### Algorithm

1. Initialize `res = 0` to track the maximum area found.
2. Use two nested loops:
   - Outer loop picks the left line `i`.
   - Inner loop picks the right line `j > i`.
3. For each pair `(i, j)`:
   - Compute the height as `min(heights[i], heights[j])`.
   - Compute the width as `j - i`.
   - Update `res` with the maximum of its current value and the new area.
4. After checking all pairs, return `res`.

::tabs-start

```python
class Solution:
    def maxArea(self, heights: List[int]) -> int:
        res = 0
        for i in range(len(heights)):
            for j in range(i + 1, len(heights)):
                res = max(res, min(heights[i], heights[j]) * (j - i))
        return res
```

```java
public class Solution {
    public int maxArea(int[] heights) {
        int res = 0;
        for (int i = 0; i < heights.length; i++) {
            for (int j = i + 1; j < heights.length; j++) {
                res = Math.max(res, Math.min(heights[i], heights[j]) * (j - i));
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxArea(vector<int>& heights) {
        int res = 0;
        for (int i = 0; i < heights.size(); i++) {
            for (int j = i + 1; j < heights.size(); j++) {
                res = max(res, min(heights[i], heights[j]) * (j - i));
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let res = 0;
        for (let i = 0; i < heights.length; i++) {
            for (let j = i + 1; j < heights.length; j++) {
                res = Math.max(res, Math.min(heights[i], heights[j]) * (j - i));
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxArea(int[] heights) {
        int res = 0;
        for (int i = 0; i < heights.Length; i++) {
            for (int j = i + 1; j < heights.Length; j++) {
                res = Math.Max(res, Math.Min(heights[i], heights[j]) * (j - i));
            }
        }
        return res;
    }
}
```

```go
func maxArea(heights []int) int {
    res := 0
    for i := 0; i < len(heights); i++ {
        for j := i + 1; j < len(heights); j++ {
            area := min(heights[i], heights[j]) * (j - i)
            if area > res {
                res = area
            }
        }
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxArea(heights: IntArray): Int {
        var res = 0
        for (i in heights.indices) {
            for (j in i + 1 until heights.size) {
                val area = minOf(heights[i], heights[j]) * (j - i)
                res = maxOf(res, area)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxArea(_ heights: [Int]) -> Int {
        var res = 0
        for i in 0..<heights.count {
            for j in (i + 1)..<heights.count {
                res = max(res, min(heights[i], heights[j]) * (j - i))
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

## 2. Two Pointers

### Intuition

Using two pointers lets us efficiently search for the maximum area without checking every pair.  
We start with the widest container (left at start, right at end).  
The height is limited by the shorter line, so to potentially increase the area, we must move the pointer at the shorter line inward.  
Moving the taller line never helps because it keeps the height the same but reduces the width.  
By always moving the shorter side, we explore all meaningful possibilities.

### Algorithm

1. Initialize two pointers:
   - `l = 0`  
   - `r = len(heights) - 1`
2. Set `res = 0` to store the maximum area.
3. While `l < r`:
   - Compute the current area:  
     `area = min(heights[l], heights[r]) * (r - l)`
   - Update `res` with the maximum area so far.
   - Move the pointer at the shorter height:
     - If `heights[l] <= heights[r]`, move `l` right.
     - Otherwise, move `r` left.
4. Return `res` after the pointers meet.

::tabs-start

```python
class Solution:
    def maxArea(self, heights: List[int]) -> int:
        l, r = 0, len(heights) - 1
        res = 0

        while l < r:
            area = min(heights[l], heights[r]) * (r - l)
            res = max(res, area)
            if heights[l] <= heights[r]:
                l += 1
            else:
                r -= 1
        return res
```

```java
public class Solution {
    public int maxArea(int[] heights) {
        int l = 0;
        int r = heights.length - 1;
        int res = 0;

        while (l < r) {
            int area = Math.min(heights[l], heights[r]) * (r - l);
            res = Math.max(res, area);
            if (heights[l] <= heights[r]) {
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxArea(vector<int>& heights) {
        int l = 0;
        int r = heights.size() - 1;
        int res = 0;

        while (l < r) {
            int area = min(heights[l], heights[r]) * (r - l);
            res = max(res, area);

            if (heights[l] <= heights[r]) {
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    maxArea(heights) {
        let l = 0;
        let r = heights.length - 1;
        let res = 0;

        while (l < r) {
            const area = Math.min(heights[l], heights[r]) * (r - l);
            res = Math.max(res, area);
            if (heights[l] <= heights[r]) {
                l++;
            } else {
                r--;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxArea(int[] heights) {
        int res = 0;
        int l = 0, r = heights.Length-1;

        while (l < r){
            int area = (Math.Min(heights[l], heights[r])) * (r - l);
            res = Math.Max(area, res);

            if (heights[l] <= heights[r]){
                l++;
            } else{
                r--;
            }
        }
        return res;
    }
}
```

```go
func maxArea(heights []int) int {
    l, r := 0, len(heights) - 1
    res := 0

    for l < r {
        area := min(heights[l], heights[r]) * (r - l)
        if area > res {
            res = area
        }
        if heights[l] <= heights[r] {
            l++
        } else {
            r--
        }
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun maxArea(heights: IntArray): Int {
        var l = 0
        var r = heights.size - 1
        var res = 0

        while (l < r) {
            val area = minOf(heights[l], heights[r]) * (r - l)
            res = maxOf(res, area)
            if (heights[l] <= heights[r]) {
                l++
            } else {
                r--
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxArea(_ heights: [Int]) -> Int {
        var l = 0, r = heights.count - 1
        var res = 0

        while l < r {
            let area = min(heights[l], heights[r]) * (r - l)
            res = max(res, area)
            if heights[l] <= heights[r] {
                l += 1
            } else {
                r -= 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
