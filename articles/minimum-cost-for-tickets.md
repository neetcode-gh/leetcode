## 1. Recursion

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        n = len(days)

        def dfs(i):
            if i == n:
                return 0

            res = costs[0] + dfs(i + 1)
            j = i
            while j < n and days[j] < days[i] + 7:
                j += 1
            res = min(res, costs[1] + dfs(j))

            j = i
            while j < n and days[j] < days[i] + 30:
                j += 1
            res = min(res, costs[2] + dfs(j))

            return res

        return dfs(0)
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        return dfs(0, days.length, days, costs);
    }

    private int dfs(int i, int n, int[] days, int[] costs) {
        if (i == n) return 0;

        int res = costs[0] + dfs(i + 1, n, days, costs);
        int j = i;
        while (j < n && days[j] < days[i] + 7) {
            j++;
        }
        res = Math.min(res, costs[1] + dfs(j, n, days, costs));

        j = i;
        while (j < n && days[j] < days[i] + 30) {
            j++;
        }
        res = Math.min(res, costs[2] + dfs(j, n, days, costs));

        return res;
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int n = days.size();

        function<int(int)> dfs = [&](int i) -> int {
            if (i == n) return 0;

            int res = costs[0] + dfs(i + 1);

            int j = i;
            while (j < n && days[j] < days[i] + 7) {
                j++;
            }
            res = min(res, costs[1] + dfs(j));

            j = i;
            while (j < n && days[j] < days[i] + 30) {
                j++;
            }
            res = min(res, costs[2] + dfs(j));

            return res;
        };

        return dfs(0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const n = days.length;

        const dfs = (i) => {
            if (i === n) return 0;

            let res = costs[0] + dfs(i + 1);

            let j = i;
            while (j < n && days[j] < days[i] + 7) {
                j++;
            }
            res = Math.min(res, costs[1] + dfs(j));

            j = i;
            while (j < n && days[j] < days[i] + 30) {
                j++;
            }
            res = Math.min(res, costs[2] + dfs(j));

            return res;
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(3 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp = {}

        def dfs(i):
            if i == len(days):
                return 0
            if i in dp:
                return dp[i]

            dp[i] = float("inf")
            j = i
            for d, c in zip([1, 7, 30], costs):
                while j < len(days) and days[j] < days[i] + d:
                    j += 1
                dp[i] = min(dp[i], c + dfs(j))

            return dp[i]

        return dfs(0)
```

```java
public class Solution {
    private int[] dp;

    public int mincostTickets(int[] days, int[] costs) {
        dp = new int[days.length];
        Arrays.fill(dp, -1);
        return dfs(0, days, costs);
    }

    private int dfs(int i, int[] days, int[] costs) {
        if (i == days.length) {
            return 0;
        }
        if (dp[i] != -1) {
            return dp[i];
        }

        dp[i] = Integer.MAX_VALUE;
        int idx = 0, j = i;
        for (int d : new int[]{1, 7, 30}) {
            while (j < days.length && days[j] < days[i] + d) {
                j++;
            }
            dp[i] = Math.min(dp[i], costs[idx] + dfs(j, days, costs));
            idx++;
        }
        return dp[i];
    }
}
```

```cpp
class Solution {
private:
    vector<int> dp;

    int dfs(int i, const vector<int>& days, const vector<int>& costs) {
        if (i == days.size()) return 0;
        if (dp[i] != -1) return dp[i];

        dp[i] = INT_MAX;
        int idx = 0, j = i;
        for (int d : {1, 7, 30}) {
            while (j < days.size() && days[j] < days[i] + d) {
                j++;
            }
            dp[i] = min(dp[i], costs[idx] + dfs(j, days, costs));
            idx++;
        }
        return dp[i];
    }

public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        dp = vector<int>(days.size(), -1);
        return dfs(0, days, costs);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp = new Array(days.length).fill(-1);

        const dfs = (i) => {
            if (i === days.length) return 0;
            if (dp[i] !== -1) return dp[i];

            dp[i] = Infinity;
            let j = i;
            [1, 7, 30].forEach((d, idx) => {
                while (j < days.length && days[j] < days[i] + d) {
                    j++;
                }
                dp[i] = Math.min(dp[i], costs[idx] + dfs(j));
            });

            return dp[i];
        };

        return dfs(0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        n = len(days)
        dp = [0] * (n + 1)

        for i in range(n - 1, -1, -1):
            dp[i] = float('inf')
            j = i
            for d, c in zip([1, 7, 30], costs):
                while j < n and days[j] < days[i] + d:
                    j += 1
                dp[i] = min(dp[i], c + dp[j])

        return dp[0]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int n = days.length;
        int[] dp = new int[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = Integer.MAX_VALUE;
            int idx = 0, j = i;
            for (int d : new int[]{1, 7, 30}) {
                while (j < n && days[j] < days[i] + d) {
                    j++;
                }
                dp[i] = Math.min(dp[i], costs[idx] + dp[j]);
                idx++;
            }
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        int n = days.size();
        vector<int> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = INT_MAX;
            int j = i;
            for (int k = 0; k < 3; ++k) {
                while (j < n && days[j] < days[i] + (k == 0 ? 1 : k == 1 ? 7 : 30)) {
                    j++;
                }
                dp[i] = min(dp[i], costs[k] + dp[j]);
            }
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const n = days.length;
        const dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = Infinity;
            let j = i;
            [1, 7, 30].forEach((d, idx) => {
                while (j < n && days[j] < days[i] + d) {
                    j++;
                }
                dp[i] = Math.min(dp[i], costs[idx] + dp[j]);
            });
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Bottom-Up) + Two Pointers

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        days.append(days[-1] + 30)
        n = len(days)
        dp = [0] * n
        last7 = last30 = n

        for i in range(n - 2, -1, -1):
            dp[i] = dp[i + 1] + costs[0]

            while last7 > i + 1 and days[last7 - 1] >= days[i] + 7:
                last7 -= 1
            dp[i] = min(dp[i], costs[1] + dp[last7])

            while last30 > i + 1 and days[last30 - 1] >= days[i] + 30:
                last30 -= 1
            dp[i] = min(dp[i], costs[2] + dp[last30])

        return dp[0]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int n = days.length;
        int[] dp = new int[n + 1];
        int last7 = n, last30 = n;
        int[] extendedDays = Arrays.copyOf(days, n + 1);
        extendedDays[n] = days[n - 1] + 30;

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = dp[i + 1] + costs[0];

            while (last7 > i + 1 && extendedDays[last7 - 1] >= days[i] + 7) {
                last7--;
            }
            dp[i] = Math.min(dp[i], costs[1] + dp[last7]);

            while (last30 > i + 1 && extendedDays[last30 - 1] >= days[i] + 30) {
                last30--;
            }
            dp[i] = Math.min(dp[i], costs[2] + dp[last30]);
        }

        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        days.push_back(days.back() + 30);
        int n = days.size();
        vector<int> dp(n, 0);
        int last7 = n, last30 = n;

        for (int i = n - 2; i >= 0; --i) {
            dp[i] = dp[i + 1] + costs[0];

            while (last7 > i + 1 && days[last7 - 1] >= days[i] + 7) {
                --last7;
            }
            dp[i] = min(dp[i], costs[1] + dp[last7]);

            while (last30 > i + 1 && days[last30 - 1] >= days[i] + 30) {
                --last30;
            }
            dp[i] = min(dp[i], costs[2] + dp[last30]);
        }

        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        days.push(days[days.length - 1] + 30);
        const n = days.length;
        const dp = new Array(n).fill(0);
        let last7 = n,
            last30 = n;

        for (let i = n - 2; i >= 0; i--) {
            dp[i] = dp[i + 1] + costs[0];

            while (last7 > i + 1 && days[last7 - 1] >= days[i] + 7) {
                last7--;
            }
            dp[i] = Math.min(dp[i], costs[1] + dp[last7]);

            while (last30 > i + 1 && days[last30 - 1] >= days[i] + 30) {
                last30--;
            }
            dp[i] = Math.min(dp[i], costs[2] + dp[last30]);
        }

        return dp[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Dynamic Programming (Space Optimized) - I

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp7, dp30 = deque(), deque()
        dp = 0

        for d in days:
            while dp7 and dp7[0][0] + 7 <= d:
                dp7.popleft()

            while dp30 and dp30[0][0] + 30 <= d:
                dp30.popleft()

            dp7.append([d, dp + costs[1]])
            dp30.append([d, dp + costs[2]])
            dp = min(dp + costs[0], dp7[0][1], dp30[0][1])

        return dp
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        Queue<int[]> dp7 = new LinkedList<>();
        Queue<int[]> dp30 = new LinkedList<>();
        int dp = 0;

        for (int d : days) {
            while (!dp7.isEmpty() && dp7.peek()[0] + 7 <= d) {
                dp7.poll();
            }

            while (!dp30.isEmpty() && dp30.peek()[0] + 30 <= d) {
                dp30.poll();
            }

            dp7.offer(new int[]{d, dp + costs[1]});
            dp30.offer(new int[]{d, dp + costs[2]});
            dp = Math.min(dp + costs[0], Math.min(dp7.peek()[1], dp30.peek()[1]));
        }

        return dp;
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        queue<pair<int, int>> dp7, dp30;
        int dp = 0;

        for (int& d : days) {
            while (!dp7.empty() && dp7.front().first + 7 <= d) {
                dp7.pop();
            }

            while (!dp30.empty() && dp30.front().first + 30 <= d) {
                dp30.pop();
            }

            dp7.emplace(d, dp + costs[1]);
            dp30.emplace(d, dp + costs[2]);
            dp = min({dp + costs[0], dp7.front().second, dp30.front().second});
        }

        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp7 = new Queue();
        const dp30 = new Queue();
        let dp = 0;

        for (const d of days) {
            while (!dp7.isEmpty() && dp7.front()[0] + 7 <= d) {
                dp7.pop();
            }

            while (!dp30.isEmpty() && dp30.front()[0] + 30 <= d) {
                dp30.pop();
            }

            dp7.push([d, dp + costs[1]]);
            dp30.push([d, dp + costs[2]]);

            dp = Math.min(dp + costs[0], dp7.front()[1], dp30.front()[1]);
        }

        return dp;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we keep at most $30$ values in the queue.

---

## 6. Dynamic Programming (Space Optimized) - II

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp7, dp30 = deque(), deque()
        dp = 0

        last7 = last30 = 0
        for i in range(len(days) - 1, -1, -1):
            dp += costs[0]
            while dp7 and dp7[-1][0] >= days[i] + 7:
                last7 = dp7.pop()[1]
            dp = min(dp, costs[1] + last7)

            while dp30 and dp30[-1][0] >= days[i] + 30:
                last30 = dp30.pop()[1]
            dp = min(dp, costs[2] + last30)

            dp7.appendleft([days[i], dp])
            dp30.appendleft([days[i], dp])

        return dp
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        Deque<int[]> dp7 = new ArrayDeque<>();
        Deque<int[]> dp30 = new ArrayDeque<>();
        int dp = 0, last7 = 0, last30 = 0;

        for (int i = days.length - 1; i >= 0; i--) {
            dp += costs[0];

            while (!dp7.isEmpty() && dp7.peekLast()[0] >= days[i] + 7) {
                last7 = dp7.pollLast()[1];
            }
            dp = Math.min(dp, costs[1] + last7);

            while (!dp30.isEmpty() && dp30.peekLast()[0] >= days[i] + 30) {
                last30 = dp30.pollLast()[1];
            }
            dp = Math.min(dp, costs[2] + last30);

            dp7.offerFirst(new int[]{days[i], dp});
            dp30.offerFirst(new int[]{days[i], dp});
        }
        return dp;
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        deque<pair<int, int>> dp7, dp30;
        int dp = 0, last7 = 0, last30 = 0;

        for (int i = days.size() - 1; i >= 0; --i) {
            dp += costs[0];

            while (!dp7.empty() && dp7.back().first >= days[i] + 7) {
                last7 = dp7.back().second;
                dp7.pop_back();
            }
            dp = min(dp, costs[1] + last7);

            while (!dp30.empty() && dp30.back().first >= days[i] + 30) {
                last30 = dp30.back().second;
                dp30.pop_back();
            }
            dp = min(dp, costs[2] + last30);

            dp7.push_front({days[i], dp});
            dp30.push_front({days[i], dp});
        }
        return dp;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp7 = new Deque();
        const dp30 = new Deque();
        let dp = 0,
            last7 = 0,
            last30 = 0;

        for (let i = days.length - 1; i >= 0; i--) {
            dp += costs[0];

            while (!dp7.isEmpty() && dp7.back()[0] >= days[i] + 7) {
                last7 = dp7.popBack()[1];
            }
            dp = Math.min(dp, costs[1] + last7);

            while (!dp30.isEmpty() && dp30.back()[0] >= days[i] + 30) {
                last30 = dp30.popBack()[1];
            }
            dp = Math.min(dp, costs[2] + last30);

            dp7.pushFront([days[i], dp]);
            dp30.pushFront([days[i], dp]);
        }
        return dp;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we keep at most $30$ values in the deque.

---

## 7. Dynamic Programming (Space Optimized) - III

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp = [0] * 366
        i = 0

        for d in range(1, 366):
            dp[d] = dp[d - 1]
            if i == len(days):
                return dp[d]

            if d == days[i]:
                dp[d] += costs[0]
                dp[d] = min(dp[d], costs[1] + dp[max(0, d - 7)])
                dp[d] = min(dp[d], costs[2] + dp[max(0, d - 30)])
                i += 1

        return dp[365]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int[] dp = new int[366];
        int i = 0;

        for (int d = 1; d < 366; d++) {
            dp[d] = dp[d - 1];

            if (i == days.length) {
                return dp[d];
            }

            if (d == days[i]) {
                dp[d] += costs[0];
                dp[d] = Math.min(dp[d], costs[1] + dp[Math.max(0, d - 7)]);
                dp[d] = Math.min(dp[d], costs[2] + dp[Math.max(0, d - 30)]);
                i++;
            }
        }
        return dp[365];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        vector<int> dp(366, 0);
        int i = 0;

        for (int d = 1; d < 366; d++) {
            dp[d] = dp[d - 1];

            if (i == days.size()) {
                return dp[d];
            }

            if (d == days[i]) {
                dp[d] += costs[0];
                dp[d] = min(dp[d], costs[1] + dp[max(0, d - 7)]);
                dp[d] = min(dp[d], costs[2] + dp[max(0, d - 30)]);
                i++;
            }
        }
        return dp[365];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp = new Array(366).fill(0);
        let i = 0;

        for (let d = 1; d < 366; d++) {
            dp[d] = dp[d - 1];

            if (i === days.length) {
                return dp[d];
            }

            if (d === days[i]) {
                dp[d] += costs[0];
                dp[d] = Math.min(dp[d], costs[1] + dp[Math.max(0, d - 7)]);
                dp[d] = Math.min(dp[d], costs[2] + dp[Math.max(0, d - 30)]);
                i++;
            }
        }
        return dp[365];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since the size of the $dp$ array is $366$.

---

## 8. Dynamic Programming (Space Optimized) - IV

::tabs-start

```python
class Solution:
    def mincostTickets(self, days: List[int], costs: List[int]) -> int:
        dp = [0] * 31
        i = 0

        for d in range(1, 366):
            if i >= len(days):
                break

            dp[d % 31] = dp[(d - 1) % 31]

            if d == days[i]:
                dp[d % 31] += costs[0]
                dp[d % 31] = min(dp[d % 31], costs[1] + dp[max(0, d - 7) % 31])
                dp[d % 31] = min(dp[d % 31], costs[2] + dp[max(0, d - 30) % 31])
                i += 1

        return dp[days[-1] % 31]
```

```java
public class Solution {
    public int mincostTickets(int[] days, int[] costs) {
        int[] dp = new int[31];
        int i = 0;

        for (int d = 1; d <= 365; d++) {
            if (i >= days.length) break;

            dp[d % 31] = dp[(d - 1) % 31];

            if (d == days[i]) {
                dp[d % 31] += costs[0];
                dp[d % 31] = Math.min(dp[d % 31], costs[1] + dp[Math.max(0, d - 7) % 31]);
                dp[d % 31] = Math.min(dp[d % 31], costs[2] + dp[Math.max(0, d - 30) % 31]);
                i++;
            }
        }

        return dp[days[days.length - 1] % 31];
    }
}
```

```cpp
class Solution {
public:
    int mincostTickets(vector<int>& days, vector<int>& costs) {
        vector<int> dp(31, 0);
        int i = 0;

        for (int d = 1; d <= 365; d++) {
            if (i >= days.size()) break;

            dp[d % 31] = dp[(d - 1) % 31];

            if (d == days[i]) {
                dp[d % 31] += costs[0];
                dp[d % 31] = min(dp[d % 31], costs[1] + dp[max(0, d - 7) % 31]);
                dp[d % 31] = min(dp[d % 31], costs[2] + dp[max(0, d - 30) % 31]);
                i++;
            }
        }

        return dp[days.back() % 31];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} days
     * @param {number[]} costs
     * @return {number}
     */
    mincostTickets(days, costs) {
        const dp = new Array(31).fill(0);
        let i = 0;

        for (let d = 1; d <= 365; d++) {
            if (i >= days.length) break;

            dp[d % 31] = dp[(d - 1) % 31];

            if (d === days[i]) {
                dp[d % 31] += costs[0];
                dp[d % 31] = Math.min(
                    dp[d % 31],
                    costs[1] + dp[Math.max(0, d - 7) % 31],
                );
                dp[d % 31] = Math.min(
                    dp[d % 31],
                    costs[2] + dp[Math.max(0, d - 30) % 31],
                );
                i++;
            }
        }

        return dp[days[days.length - 1] % 31];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since the size of the $dp$ array is $31$.
