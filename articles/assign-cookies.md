## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m + m \log m)$
- Space complexity: $O(1)$ or $O(m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $g$ and $m$ is the size of the array $s$.

---

## 2. Two Pointers - I

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(1)$ or $O(n + m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $g$ and $m$ is the size of the array $s$.

---

## 3. Two Pointers - II

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n + m \log m)$
- Space complexity: $O(1)$ or $O(n + m)$ depending on the sorting algorithm.

> Where $n$ is the size of the array $g$ and $m$ is the size of the array $s$.
