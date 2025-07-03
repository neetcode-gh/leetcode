## 1. Two Pointers - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 2. Two Pointers - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Two Pointers - III

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
