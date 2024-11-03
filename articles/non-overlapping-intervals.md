## 1. Recursion

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        
        def dfs(i, prev):
            if i == len(intervals):
                return 0
            res = dfs(i + 1, prev)
            if prev == -1 or intervals[prev][1] <= intervals[i][0]:
                res = max(res, 1 + dfs(i + 1, i))
            return res
        
        return len(intervals) - dfs(0, -1)
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        return intervals.length - dfs(intervals, 0, -1);
    }

    private int dfs(int[][] intervals, int i, int prev) {
        if (i == intervals.length) return 0;
        int res = dfs(intervals, i + 1, prev);
        if (prev == -1 || intervals[prev][1] <= intervals[i][0]) {
            res = Math.max(res, 1 + dfs(intervals, i + 1, i));
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        return intervals.size() - dfs(intervals, 0, -1);
    }

private:
    int dfs(const vector<vector<int>>& intervals, int i, int prev) {
        if (i == intervals.size()) return 0;
        int res = dfs(intervals, i + 1, prev);
        if (prev == -1 || intervals[prev][1] <= intervals[i][0]) {
            res = max(res, 1 + dfs(intervals, i + 1, i));
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        
        const dfs = (i, prev) => {
            if (i === intervals.length) return 0;
            let res = dfs(i + 1, prev);
            if (prev === -1 || intervals[prev][1] <= intervals[i][0]) {
                res = Math.max(res, 1 + dfs(i + 1, i));
            }
            return res;
        };

        return intervals.length - dfs(0, -1);
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        return intervals.Length - Dfs(intervals, 0, -1);
    }

    private int Dfs(int[][] intervals, int i, int prev) {
        if (i == intervals.Length) return 0;
        int res = Dfs(intervals, i + 1, prev);
        if (prev == -1 || intervals[prev][1] <= intervals[i][0]) {
            res = Math.Max(res, 1 + Dfs(intervals, i + 1, i));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key = lambda x: x[1])
        n = len(intervals)
        memo = {}

        def dfs(i):
            if i in memo:
                return memo[i]

            res = 1
            for j in range(i + 1, n):
                if intervals[i][1] <= intervals[j][0]:
                    res = max(res, 1 + dfs(j))
            memo[i] = res
            return res

        return n - dfs(0)
```

```java
public class Solution {
    private int[] memo;

    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int n = intervals.length;
        memo = new int[n];  
        Arrays.fill(memo, -1);
        
        int maxNonOverlapping = dfs(intervals, 0);
        return n - maxNonOverlapping;
    }

    private int dfs(int[][] intervals, int i) {
        if (i >= intervals.length) return 0;
        if (memo[i] != -1) return memo[i];

        int res = 1;
        for (int j = i + 1; j < intervals.length; j++) {
            if (intervals[i][1] <= intervals[j][0]) {
                res = Math.max(res, 1 + dfs(intervals, j));
            }
        }
        memo[i] = res;
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int n = intervals.size();
        vector<int> memo(n, -1);  

        int maxNonOverlapping = dfs(intervals, 0, memo);
        return n - maxNonOverlapping;
    }

private:
    int dfs(const vector<vector<int>>& intervals, int i, vector<int>& memo) {
        if (i >= intervals.size()) return 0;
        if (memo[i] != -1) return memo[i];

        int res = 1;
        for (int j = i + 1; j < intervals.size(); j++) {
            if (intervals[i][1] <= intervals[j][0]) {
                res = max(res, 1 + dfs(intervals, j, memo));
            }
        }
        memo[i] = res;
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        let memo = new Array(n).fill(-1);  

        const dfs = (i) => {
            if (i >= n) return 0;
            if (memo[i] !== -1) return memo[i];

            let res = 1;
            for (let j = i + 1; j < n; j++) {
                if (intervals[i][1] <= intervals[j][0]) {
                    res = Math.max(res, 1 + dfs(j));
                }
            }
            memo[i] = res;
            return res;
        };

        const maxNonOverlapping = dfs(0);
        return n - maxNonOverlapping;
    }
}
```

```csharp
public class Solution {
    private int[] memo;

    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int n = intervals.Length;
        memo = new int[n];  
        Array.Fill(memo, -1);

        int maxNonOverlapping = Dfs(intervals, 0);
        return n - maxNonOverlapping;
    }

    private int Dfs(int[][] intervals, int i) {
        if (i >= intervals.Length) return 0;
        if (memo[i] != -1) return memo[i];

        int res = 1;
        for (int j = i + 1; j < intervals.Length; j++) {
            if (intervals[i][1] <= intervals[j][0]) {
                res = Math.Max(res, 1 + Dfs(intervals, j));
            }
        }
        memo[i] = res;
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        n = len(intervals)
        dp = [0] * n  

        for i in range(n):
            dp[i] = 1 
            for j in range(i):
                if intervals[j][1] <= intervals[i][0]:  
                    dp[i] = max(dp[i], 1 + dp[j])

        max_non_overlapping = max(dp)  
        return n - max_non_overlapping
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int n = intervals.length;
        int[] dp = new int[n];  

        for (int i = 0; i < n; i++) {
            dp[i] = 1;  
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {  
                    dp[i] = Math.max(dp[i], 1 + dp[j]);
                }
            }
        }

        int maxNonOverlapping = Arrays.stream(dp).max().getAsInt();  
        return n - maxNonOverlapping;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int n = intervals.size();
        vector<int> dp(n, 0);  

        for (int i = 0; i < n; i++) {
            dp[i] = 1;  
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {  
                    dp[i] = max(dp[i], 1 + dp[j]);
                }
            }
        }

        int maxNonOverlapping = *max_element(dp.begin(), dp.end());  
        return n - maxNonOverlapping;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        const dp = new Array(n).fill(0);  

        for (let i = 0; i < n; i++) {
            dp[i] = 1;  
            for (let j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {  
                    dp[i] = Math.max(dp[i], 1 + dp[j]);
                }
            }
        }

        const maxNonOverlapping = Math.max(...dp);  
        return n - maxNonOverlapping;
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int n = intervals.Length;
        int[] dp = new int[n];  

        for (int i = 0; i < n; i++) {
            dp[i] = 1;  
            for (int j = 0; j < i; j++) {
                if (intervals[j][1] <= intervals[i][0]) {  
                    dp[i] = Math.Max(dp[i], 1 + dp[j]);
                }
            }
        }

        int maxNonOverlapping = 0;
        foreach (var count in dp) {
            maxNonOverlapping = Math.Max(maxNonOverlapping, count);
        }  
        return n - maxNonOverlapping;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Binary Search)

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[1])
        n = len(intervals)
        dp = [0] * n
        dp[0] = 1

        def bs(r, target):
            l = 0
            while l < r:
                m = (l + r) >> 1
                if intervals[m][1] <= target:
                    l = m + 1
                else:
                    r = m
            return l

        for i in range(1, n):
            idx = bs(i, intervals[i][0])
            if idx == 0:
                dp[i] = dp[i - 1]
            else:
                dp[i] = max(dp[i - 1], 1 + dp[idx - 1])
        return n - dp[n - 1]
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int n = intervals.length;
        int[] dp = new int[n];
        dp[0] = 1;

        for (int i = 1; i < n; i++) {
            int idx = bs(i, intervals[i][0], intervals);
            if (idx == 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = Math.max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }

    private int bs(int r, int target, int[][] intervals) {
        int l = 0;
        while (l < r) {
            int m = (l + r) >> 1;
            if (intervals[m][1] <= target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int n = intervals.size();
        vector<int> dp(n);
        dp[0] = 1;

        for (int i = 1; i < n; i++) {
            int idx = bs(i, intervals[i][0], intervals);
            if (idx == 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }

    int bs(int r, int target, vector<vector<int>>& intervals) {
        int l = 0;
        while (l < r) {
            int m = (l + r) >> 1;
            if (intervals[m][1] <= target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        const n = intervals.length;
        const dp = new Array(n).fill(0);
        dp[0] = 1;

        const bs = (r, target) => {
            let l = 0;
            while (l < r) {
                const m = (l + r) >> 1;
                if (intervals[m][1] <= target) {
                    l = m + 1;
                } else {
                    r = m;
                }
            }
            return l;
        }

        for (let i = 1; i < n; i++) {
            const idx = bs(i, intervals[i][0]);
            if (idx === 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = Math.max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int n = intervals.Length;
        int[] dp = new int[n];
        dp[0] = 1;

        for (int i = 1; i < n; i++) {
            int idx = Bs(i, intervals[i][0], intervals);
            if (idx == 0) {
                dp[i] = dp[i - 1];
            } else {
                dp[i] = Math.Max(dp[i - 1], 1 + dp[idx - 1]);
            }
        }
        return n - dp[n - 1];
    }

    private int Bs(int r, int target, int[][] intervals) {
        int l = 0;
        while (l < r) {
            int m = (l + r) >> 1;
            if (intervals[m][1] <= target) {
                l = m + 1;
            } else {
                r = m;
            }
        }
        return l;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 5. Greedy (Sort By Start)

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort()
        res = 0
        prevEnd = intervals[0][1]
        
        for start, end in intervals[1:]:
            if start >= prevEnd:
                prevEnd = end
            else:
                res += 1
                prevEnd = min(end, prevEnd)
        return res
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        int res = 0;
        int prevEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = Math.min(end, prevEnd);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = min(end, prevEnd);
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        let res = 0;
        let prevEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start = intervals[i][0];
            const end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = Math.min(end, prevEnd);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));
        int res = 0;
        int prevEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.Length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                res++;
                prevEnd = Math.Min(end, prevEnd);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 6. Greedy (Sort By End)

::tabs-start

```python
class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        intervals.sort(key = lambda pair: pair[1])
        prevEnd = intervals[0][1]
        res = 0

        for i in range(1, len(intervals)):
            if prevEnd > intervals[i][0]:
                res += 1
            else:
                prevEnd = intervals[i][1]

        
        return res
```

```java
public class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int res = 0;
        int prevEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) {
            return a[1] < b[1];
        });
        int res = 0;
        int prevEnd = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        let res = 0;
        let prevEnd = intervals[0][1];

        for (let i = 1; i < intervals.length; i++) {
            const start = intervals[i][0];
            const end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));
        int res = 0;
        int prevEnd = intervals[0][1];
        
        for (int i = 1; i < intervals.Length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];
            if (start < prevEnd) {
                res++;
            } else {
                prevEnd = end;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.