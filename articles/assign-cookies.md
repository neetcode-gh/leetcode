## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting** - Required to process children and cookies in order of greed/size
- **Two Pointers** - Efficiently matching sorted children with sorted cookies
- **Greedy Algorithms** - Understanding why assigning the smallest sufficient cookie maximizes satisfaction

---

## 1. Brute Force

### Intuition

For each child, we want to find the smallest cookie that can satisfy them. Using the smallest sufficient cookie for each child leaves larger cookies available for greedier children. We iterate through children, and for each one, scan all cookies to find the smallest one that works. Once a cookie is used, we mark it as unavailable.

### Algorithm

1. Sort the cookies array.
2. For each child's greed factor, search through all cookies to find the smallest one that satisfies them (cookie size >= greed).
3. If found, mark that cookie as used (set to `-1`) and increment the count.
4. Return the total count of satisfied children.

::tabs-start

```python
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        s.sort()
        res = 0

        for i in g:
            minIdx = -1
            for j in range(len(s)):
                if s[j] < i:
                    continue

                if minIdx == -1 or s[minIdx] > s[j]:
                    minIdx = j

            if minIdx != -1:
                s[minIdx] = -1
                res += 1

        return res
```

```java
public class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(s);
        int res = 0;

        for (int i : g) {
            int minIdx = -1;
            for (int j = 0; j < s.length; j++) {
                if (s[j] < i) continue;

                if (minIdx == -1 || s[minIdx] > s[j]) {
                    minIdx = j;
                }
            }

            if (minIdx != -1) {
                s[minIdx] = -1;
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(s.begin(), s.end());
        int res = 0;

        for (int i : g) {
            int minIdx = -1;
            for (int j = 0; j < s.size(); j++) {
                if (s[j] < i) continue;

                if (minIdx == -1 || s[minIdx] > s[j]) {
                    minIdx = j;
                }
            }

            if (minIdx != -1) {
                s[minIdx] = -1;
                res++;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} g
     * @param {number[]} s
     * @return {number}
     */
    findContentChildren(g, s) {
        s.sort((a, b) => a - b);
        let res = 0;

        for (let i of g) {
            let minIdx = -1;
            for (let j = 0; j < s.length; j++) {
                if (s[j] < i) continue;

                if (minIdx === -1 || s[minIdx] > s[j]) {
                    minIdx = j;
                }
            }

            if (minIdx !== -1) {
                s[minIdx] = -1;
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindContentChildren(int[] g, int[] s) {
        Array.Sort(s);
        int res = 0;

        foreach (int i in g) {
            int minIdx = -1;
            for (int j = 0; j < s.Length; j++) {
                if (s[j] < i) continue;

                if (minIdx == -1 || s[minIdx] > s[j]) {
                    minIdx = j;
                }
            }

            if (minIdx != -1) {
                s[minIdx] = -1;
                res++;
            }
        }

        return res;
    }
}
```

```go
func findContentChildren(g []int, s []int) int {
    sort.Ints(s)
    res := 0

    for _, greed := range g {
        minIdx := -1
        for j := 0; j < len(s); j++ {
            if s[j] < greed {
                continue
            }
            if minIdx == -1 || s[minIdx] > s[j] {
                minIdx = j
            }
        }
        if minIdx != -1 {
            s[minIdx] = -1
            res++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findContentChildren(g: IntArray, s: IntArray): Int {
        s.sort()
        var res = 0

        for (greed in g) {
            var minIdx = -1
            for (j in s.indices) {
                if (s[j] < greed) continue
                if (minIdx == -1 || s[minIdx] > s[j]) {
                    minIdx = j
                }
            }
            if (minIdx != -1) {
                s[minIdx] = -1
                res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findContentChildren(_ g: [Int], _ s: [Int]) -> Int {
        var s = s.sorted()
        var res = 0

        for greed in g {
            var minIdx = -1
            for j in 0..<s.count {
                if s[j] < greed { continue }
                if minIdx == -1 || s[minIdx] > s[j] {
                    minIdx = j
                }
            }
            if minIdx != -1 {
                s[minIdx] = -1
                res += 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m + m \log m)$
- Space complexity: $O(1)$ or $O(m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $g$ and $m$ is the size of the array $s$.

---

## 2. Two Pointers - I

### Intuition

If both arrays are sorted, we can use two pointers to match children with cookies efficiently. Start with the least greedy child. If the current cookie is too small, move to the next larger cookie. Once we find a cookie that works, both pointers advance. This greedy matching ensures we never waste a cookie on a child who could be satisfied with a smaller one.

### Algorithm

1. Sort both the greed array and the cookie array.
2. Use pointer `i` for children and `j` for cookies, both starting at 0.
3. For each child, skip cookies that are too small (increment `j`).
4. If a suitable cookie is found, increment both pointers.
5. Return `i`, which represents the count of satisfied children.

::tabs-start

```python
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort()
        s.sort()

        i = j = 0
        while i < len(g):
            while j < len(s) and g[i] > s[j]:
                j += 1
            if j == len(s):
                break
            i += 1
            j += 1
        return i
```

```java
public class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);

        int i = 0, j = 0;
        while (i < g.length) {
            while (j < s.length && g[i] > s[j]) {
                j++;
            }
            if (j == s.length) break;
            i++;
            j++;
        }
        return i;
    }
}
```

```cpp
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());

        int i = 0, j = 0;
        while (i < g.size()) {
            while (j < s.size() && g[i] > s[j]) {
                j++;
            }
            if (j == s.size()) break;
            i++;
            j++;
        }
        return i;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} g
     * @param {number[]} s
     * @return {number}
     */
    findContentChildren(g, s) {
        g.sort((a, b) => a - b);
        s.sort((a, b) => a - b);

        let i = 0,
            j = 0;
        while (i < g.length) {
            while (j < s.length && g[i] > s[j]) {
                j++;
            }
            if (j === s.length) break;
            i++;
            j++;
        }
        return i;
    }
}
```

```csharp
public class Solution {
    public int FindContentChildren(int[] g, int[] s) {
        Array.Sort(g);
        Array.Sort(s);

        int i = 0, j = 0;
        while (i < g.Length) {
            while (j < s.Length && g[i] > s[j]) {
                j++;
            }
            if (j == s.Length) {
                break;
            }
            i++;
            j++;
        }
        return i;
    }
}
```

```go
func findContentChildren(g []int, s []int) int {
    sort.Ints(g)
    sort.Ints(s)

    i, j := 0, 0
    for i < len(g) {
        for j < len(s) && g[i] > s[j] {
            j++
        }
        if j == len(s) {
            break
        }
        i++
        j++
    }
    return i
}
```

```kotlin
class Solution {
    fun findContentChildren(g: IntArray, s: IntArray): Int {
        g.sort()
        s.sort()

        var i = 0
        var j = 0
        while (i < g.size) {
            while (j < s.size && g[i] > s[j]) {
                j++
            }
            if (j == s.size) break
            i++
            j++
        }
        return i
    }
}
```

```swift
class Solution {
    func findContentChildren(_ g: [Int], _ s: [Int]) -> Int {
        let g = g.sorted()
        let s = s.sorted()

        var i = 0, j = 0
        while i < g.count {
            while j < s.count && g[i] > s[j] {
                j += 1
            }
            if j == s.count { break }
            i += 1
            j += 1
        }
        return i
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(1)$ or $O(n + m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $g$ and $m$ is the size of the array $s$.

---

## 3. Two Pointers - II

### Intuition

This is a cleaner version of the two-pointer approach. We iterate through cookies one by one. For each cookie, if it can satisfy the current child, we move to the next child. Either way, we move to the next cookie. The key insight is that once a child is satisfied, we never revisit them, and we never skip a potentially useful cookie.

### Algorithm

1. Sort both the greed array and the cookie array.
2. Use pointer `i` for children (starting at 0) and iterate through cookies with `j`.
3. If the current cookie satisfies the current child (`cookie >= greed`), increment `i`.
4. Always increment `j` to move to the next cookie.
5. Return `i`, the count of satisfied children.

::tabs-start

```python
class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        g.sort()
        s.sort()

        i = j = 0
        while i < len(g) and j < len(s):
            if g[i] <= s[j]:
                i += 1
            j += 1

        return i
```

```java
public class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);

        int i = 0;
        for (int j = 0; i < g.length && j < s.length; j++) {
            if (g[i] <= s[j]) i++;
        }
        return i;
    }
}
```

```cpp
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end());
        sort(s.begin(), s.end());

        int i = 0;
        for (int j = 0; i < g.size() && j < s.size(); j++) {
            if (g[i] <= s[j]) i++;
        }
        return i;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} g
     * @param {number[]} s
     * @return {number}
     */
    findContentChildren(g, s) {
        g.sort((a, b) => a - b);
        s.sort((a, b) => a - b);

        let i = 0;
        for (let j = 0; i < g.length && j < s.length; j++) {
            if (g[i] <= s[j]) i++;
        }
        return i;
    }
}
```

```csharp
public class Solution {
    public int FindContentChildren(int[] g, int[] s) {
        Array.Sort(g);
        Array.Sort(s);

        int i = 0, j = 0;
        while (i < g.Length && j < s.Length) {
            if (g[i] <= s[j]) {
                i++;
            }
            j++;
        }

        return i;
    }
}
```

```go
func findContentChildren(g []int, s []int) int {
    sort.Ints(g)
    sort.Ints(s)

    i := 0
    for j := 0; i < len(g) && j < len(s); j++ {
        if g[i] <= s[j] {
            i++
        }
    }
    return i
}
```

```kotlin
class Solution {
    fun findContentChildren(g: IntArray, s: IntArray): Int {
        g.sort()
        s.sort()

        var i = 0
        var j = 0
        while (i < g.size && j < s.size) {
            if (g[i] <= s[j]) {
                i++
            }
            j++
        }
        return i
    }
}
```

```swift
class Solution {
    func findContentChildren(_ g: [Int], _ s: [Int]) -> Int {
        let g = g.sorted()
        let s = s.sorted()

        var i = 0, j = 0
        while i < g.count && j < s.count {
            if g[i] <= s[j] {
                i += 1
            }
            j += 1
        }
        return i
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(1)$ or $O(n + m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $g$ and $m$ is the size of the array $s$.

---

## Common Pitfalls

### Forgetting to Sort Both Arrays
The two-pointer greedy approach only works when both the greed factors and cookie sizes are sorted. Forgetting to sort one of them leads to suboptimal assignments.
```python
# Wrong: only sorting cookies, not greed factors
s.sort()
# g is not sorted, so greedy matching fails
```

### Using the Wrong Comparison Operator
A child is satisfied when the cookie size is greater than or equal to the greed factor. Using strict greater-than misses valid matches where the cookie exactly equals the greed.
```python
# Wrong: should be >= not >
if s[j] > g[i]:  # Misses case where s[j] == g[i]
    i += 1
```
