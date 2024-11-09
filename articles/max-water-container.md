## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Two Pointers

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$