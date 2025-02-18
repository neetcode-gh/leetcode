## 1. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        intervals = sorted(zip(startTime, endTime, profit))
        cache = {}

        def dfs(i):
            if i == len(intervals):
                return 0
            if i in cache:
                return cache[i]

            # don't include
            res = dfs(i + 1)

            # include
            j = i + 1
            while j < len(intervals):
                if intervals[i][1] <= intervals[j][0]:
                    break
                j += 1

            cache[i] = res = max(res, intervals[i][2] + dfs(j))
            return res

        return dfs(0)
```

```java
public class Solution {
    private int[][] intervals;
    private int[] cache;

    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        intervals = new int[n][3];
        cache = new int[n];
        Arrays.fill(cache, -1);

        for (int i = 0; i < n; i++) {
            intervals[i] = new int[]{startTime[i], endTime[i], profit[i]};
        }
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));

        return dfs(0);
    }

    private int dfs(int i) {
        if (i == intervals.length) {
            return 0;
        }
        if (cache[i] != -1) {
            return cache[i];
        }

        // Don't include
        int res = dfs(i + 1);

        // Include
        int j = i + 1;
        while (j < intervals.length && intervals[i][1] > intervals[j][0]) {
            j++;
        }

        return cache[i] = Math.max(res, intervals[i][2] + dfs(j));
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> intervals;
    vector<int> cache;

    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
        int n = startTime.size();
        intervals.resize(n, vector<int>(3));
        cache.assign(n, -1);

        for (int i = 0; i < n; i++) {
            intervals[i] = {startTime[i], endTime[i], profit[i]};
        }
        sort(intervals.begin(), intervals.end());

        return dfs(0);
    }

private:
    int dfs(int i) {
        if (i == intervals.size()) {
            return 0;
        }
        if (cache[i] != -1) {
            return cache[i];
        }

        // Don't include
        int res = dfs(i + 1);

        // Include
        int j = i + 1;
        while (j < intervals.size() && intervals[i][1] > intervals[j][0]) {
            j++;
        }

        return cache[i] = max(res, intervals[i][2] + dfs(j));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} startTime
     * @param {number[]} endTime
     * @param {number[]} profit
     * @return {number}
     */
    jobScheduling(startTime, endTime, profit) {
        let n = startTime.length;
        let intervals = new Array(n).fill(null).map((_, i) => 
            [startTime[i], endTime[i], profit[i]]
        );
        intervals.sort((a, b) => a[0] - b[0]);

        let cache = new Array(n).fill(-1);

        const dfs = (i) => {
            if (i === n) {
                return 0;
            }
            if (cache[i] !== -1) {
                return cache[i];
            }

            // Don't include
            let res = dfs(i + 1);

            // Include
            let j = i + 1;
            while (j < n && intervals[i][1] > intervals[j][0]) {
                j++;
            }

            return (cache[i] = Math.max(res, intervals[i][2] + dfs(j)));
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down) + Binary Search

::tabs-start

```python
class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        intervals = sorted(zip(startTime, endTime, profit))
        cache = {}

        def dfs(i):
            if i == len(intervals):
                return 0
            if i in cache:
                return cache[i]

            # don't include
            res = dfs(i + 1)

            # include
            j = bisect.bisect(intervals, (intervals[i][1], -1, -1))
            cache[i] = res = max(res, intervals[i][2] + dfs(j))
            return res

        return dfs(0)
```

```java
public class Solution {
    private int[][] intervals;
    private int[] cache;
    
    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        intervals = new int[n][3];
        cache = new int[n];
        Arrays.fill(cache, -1);

        for (int i = 0; i < n; i++) {
            intervals[i] = new int[]{startTime[i], endTime[i], profit[i]};
        }
        Arrays.sort(intervals, Comparator.comparingInt(a -> a[0]));

        return dfs(0);
    }

    private int dfs(int i) {
        if (i == intervals.length) {
            return 0;
        }
        if (cache[i] != -1) {
            return cache[i];
        }

        int res = dfs(i + 1);

        int left = i + 1, right = intervals.length, j = intervals.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (intervals[mid][0] >= intervals[i][1]) {
                j = mid;
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return cache[i] = Math.max(res, intervals[i][2] + dfs(j));
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> intervals;
    vector<int> cache;

    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
        int n = startTime.size();
        intervals.resize(n, vector<int>(3));
        cache.assign(n, -1);

        for (int i = 0; i < n; i++) {
            intervals[i] = {startTime[i], endTime[i], profit[i]};
        }
        sort(intervals.begin(), intervals.end());

        return dfs(0);
    }

private:
    int dfs(int i) {
        if (i == intervals.size()) {
            return 0;
        }
        if (cache[i] != -1) {
            return cache[i];
        }

        int res = dfs(i + 1);

        int left = i + 1, right = intervals.size(), j = intervals.size();
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (intervals[mid][0] >= intervals[i][1]) {
                j = mid;
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return cache[i] = max(res, intervals[i][2] + dfs(j));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} startTime
     * @param {number[]} endTime
     * @param {number[]} profit
     * @return {number}
     */
    jobScheduling(startTime, endTime, profit) {
        let n = startTime.length;
        let intervals = new Array(n).fill(null).map((_, i) => 
            [startTime[i], endTime[i], profit[i]]
        );
        intervals.sort((a, b) => a[0] - b[0]);

        let cache = new Array(n).fill(-1);

        const dfs = (i) => {
            if (i === n) {
                return 0;
            }
            if (cache[i] !== -1) {
                return cache[i];
            }

            let res = dfs(i + 1);

            let left = i + 1, right = n, j = n;
            while (left < right) {
                let mid = Math.floor((left + right) / 2);
                if (intervals[mid][0] >= intervals[i][1]) {
                    j = mid;
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }

            return (cache[i] = Math.max(res, intervals[i][2] + dfs(j)));
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 3. Dynamic Programming (Top-Down) + Binary Search (Optimal)

::tabs-start

```python
class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        n = len(startTime)
        index = list(range(n))
        index.sort(key=lambda i: startTime[i])

        cache = [-1] * n

        def dfs(i):
            if i == n:
                return 0
            if cache[i] != -1:
                return cache[i]

            res = dfs(i + 1)

            left, right, j = i + 1, n, n
            while left < right:
                mid = (left + right) // 2
                if startTime[index[mid]] >= endTime[index[i]]:
                    j = mid
                    right = mid
                else:
                    left = mid + 1

            cache[i] = res = max(res, profit[index[i]] + dfs(j))
            return res

        return dfs(0)
```

```java
public class Solution {
    private int[] startTime, endTime, profit, cache;
    private Integer[] index;
    private int n;

    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        this.n = startTime.length;
        this.startTime = startTime;
        this.endTime = endTime;
        this.profit = profit;
        this.index = new Integer[n];
        this.cache = new int[n];
        Arrays.fill(cache, -1);

        for (int i = 0; i < n; i++) {
            index[i] = i;
        }
        Arrays.sort(index, Comparator.comparingInt(i -> startTime[i]));

        return dfs(0);
    }

    private int dfs(int i) {
        if (i == n) {
            return 0;
        }
        if (cache[i] != -1) {
            return cache[i];
        }

        int res = dfs(i + 1);

        int left = i + 1, right = n, j = n;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (startTime[index[mid]] >= endTime[index[i]]) {
                j = mid;
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return cache[i] = Math.max(res, profit[index[i]] + dfs(j));
    }
}
```

```cpp
class Solution {
public:
    vector<int> startTime, endTime, profit, index, cache;
    int n;

    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
        this->n = startTime.size();
        this->startTime = startTime;
        this->endTime = endTime;
        this->profit = profit;
        this->index.resize(n);
        this->cache.assign(n, -1);

        for (int i = 0; i < n; i++) {
            index[i] = i;
        }
        sort(index.begin(), index.end(), [&](int i, int j) {
            return startTime[i] < startTime[j];
        });

        return dfs(0);
    }

private:
    int dfs(int i) {
        if (i == n) {
            return 0;
        }
        if (cache[i] != -1) {
            return cache[i];
        }

        int res = dfs(i + 1);

        int left = i + 1, right = n, j = n;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (startTime[index[mid]] >= endTime[index[i]]) {
                j = mid;
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        return cache[i] = max(res, profit[index[i]] + dfs(j));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} startTime
     * @param {number[]} endTime
     * @param {number[]} profit
     * @return {number}
     */
    jobScheduling(startTime, endTime, profit) {
        let n = startTime.length;
        let index = Array.from({ length: n }, (_, i) => i);
        index.sort((a, b) => startTime[a] - startTime[b]);

        let cache = new Array(n).fill(-1);

        const dfs = (i) => {
            if (i === n) {
                return 0;
            }
            if (cache[i] !== -1) {
                return cache[i];
            }

            let res = dfs(i + 1);

            let left = i + 1, right = n, j = n;
            while (left < right) {
                let mid = Math.floor((left + right) / 2);
                if (startTime[index[mid]] >= endTime[index[i]]) {
                    j = mid;
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }

            return (cache[i] = Math.max(res, profit[index[i]] + dfs(j)));
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 4. Dynamic Programming (Bottom-Up) + Binary Search

::tabs-start

```python
class Solution:
    def jobScheduling(self, startTime: List[int], endTime: List[int], profit: List[int]) -> int:
        n = len(startTime)
        index = list(range(n))
        index.sort(key=lambda i: startTime[i])

        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            left, right, j = i + 1, n, n
            while left < right:
                mid = (left + right) // 2
                if startTime[index[mid]] >= endTime[index[i]]:
                    j = mid
                    right = mid
                else:
                    left = mid + 1

            dp[i] = max(dp[i + 1], profit[index[i]] + dp[j])

        return dp[0]
```

```java
public class Solution {
    public int jobScheduling(int[] startTime, int[] endTime, int[] profit) {
        int n = startTime.length;
        Integer[] index = new Integer[n];
        for (int i = 0; i < n; i++) index[i] = i;
        Arrays.sort(index, Comparator.comparingInt(i -> startTime[i]));

        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            int left = i + 1, right = n, j = n;
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (startTime[index[mid]] >= endTime[index[i]]) {
                    j = mid;
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            dp[i] = Math.max(dp[i + 1], profit[index[i]] + dp[j]);
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
        int n = startTime.size();
        vector<int> index(n), dp(n + 1, 0);
        for (int i = 0; i < n; i++) index[i] = i;
        sort(index.begin(), index.end(), [&](int i, int j) {
            return startTime[i] < startTime[j];
        });

        for (int i = n - 1; i >= 0; i--) {
            int left = i + 1, right = n, j = n;
            while (left < right) {
                int mid = left + (right - left) / 2;
                if (startTime[index[mid]] >= endTime[index[i]]) {
                    j = mid;
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            dp[i] = max(dp[i + 1], profit[index[i]] + dp[j]);
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} startTime
     * @param {number[]} endTime
     * @param {number[]} profit
     * @return {number}
     */
    jobScheduling(startTime, endTime, profit) {
        let n = startTime.length;
        let index = Array.from({ length: n }, (_, i) => i);
        index.sort((a, b) => startTime[a] - startTime[b]);

        let dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            let left = i + 1, right = n, j = n;
            while (left < right) {
                let mid = Math.floor((left + right) / 2);
                if (startTime[index[mid]] >= endTime[index[i]]) {
                    j = mid;
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            dp[i] = Math.max(dp[i + 1], profit[index[i]] + dp[j]);
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$