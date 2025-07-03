## 1. Recursion

::tabs-start

```python
class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        LIS = 0
        res = 0

        def dfs(i, length):
            nonlocal LIS, res
            if LIS < length:
                LIS = length
                res = 1
            elif LIS == length:
                res += 1

            for j in range(i + 1, len(nums)):
                if nums[j] <= nums[i]:
                    continue
                dfs(j, length + 1)

        for i in range(len(nums)):
            dfs(i, 1)
        return res
```

```java
public class Solution {
    private int LIS = 0;
    private int res = 0;

    public int findNumberOfLIS(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            dfs(nums, i, 1);
        }
        return res;
    }

    private void dfs(int[] nums, int i, int length) {
        if (LIS < length) {
            LIS = length;
            res = 1;
        } else if (LIS == length) {
            res++;
        }

        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] <= nums[i]) {
                continue;
            }
            dfs(nums, j, length + 1);
        }
    }
}
```

```cpp
class Solution {
    int LIS = 0;
    int res = 0;

    void dfs(vector<int>& nums, int i, int length) {
        if (LIS < length) {
            LIS = length;
            res = 1;
        } else if (LIS == length) {
            res++;
        }

        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[j] <= nums[i]) {
                continue;
            }
            dfs(nums, j, length + 1);
        }
    }

public:
    int findNumberOfLIS(vector<int>& nums) {
        for (int i = 0; i < nums.size(); i++) {
            dfs(nums, i, 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findNumberOfLIS(nums) {
        let LIS = 0;
        let res = 0;

        const dfs = (i, length) => {
            if (LIS < length) {
                LIS = length;
                res = 1;
            } else if (LIS === length) {
                res++;
            }

            for (let j = i + 1; j < nums.length; j++) {
                if (nums[j] <= nums[i]) continue;
                dfs(j, length + 1);
            }
        };

        for (let i = 0; i < nums.length; i++) {
            dfs(i, 1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        dp = {}

        def dfs(i):
            if i in dp:
                return

            maxLen = maxCnt = 1
            for j in range(i + 1, len(nums)):
                if nums[j] > nums[i]:
                    dfs(j)
                    length, count = dp[j]
                    if 1 + length > maxLen:
                        maxLen = length + 1
                        maxCnt = count
                    elif 1 + length == maxLen:
                        maxCnt += count
            dp[i] = (maxLen, maxCnt)

        lenLIS = res = 0
        for i in range(len(nums)):
            dfs(i)
            maxLen, maxCnt = dp[i]
            if maxLen > lenLIS:
                lenLIS = maxLen
                res = maxCnt
            elif maxLen == lenLIS:
                res += maxCnt

        return res
```

```java
public class Solution {
    private int[][] dp;

    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        dp = new int[n][2]; // dp[i][0] = maxLen, dp[i][1] = maxCnt

        for (int i = 0; i < n; i++) {
            dp[i][0] = dp[i][1] = -1;
        }

        int lenLIS = 0, res = 0;
        for (int i = 0; i < n; i++) {
            dfs(nums, i);
            int[] result = dp[i];
            if (result[0] > lenLIS) {
                lenLIS = result[0];
                res = result[1];
            } else if (result[0] == lenLIS) {
                res += result[1];
            }
        }
        return res;
    }

    private void dfs(int[] nums, int i) {
        if (dp[i][0] != -1) return;

        int maxLen = 1, maxCnt = 1;
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[j] > nums[i]) {
                dfs(nums, j);
                int[] next = dp[j];
                if (1 + next[0] > maxLen) {
                    maxLen = 1 + next[0];
                    maxCnt = next[1];
                } else if (1 + next[0] == maxLen) {
                    maxCnt += next[1];
                }
            }
        }

        dp[i] = new int[]{maxLen, maxCnt};
    }
}
```

```cpp
class Solution {
private:
    vector<vector<int>> dp;

    void dfs(vector<int>& nums, int i) {
        if (dp[i][0] != -1) return;

        int maxLen = 1, maxCnt = 1;
        for (int j = i + 1; j < nums.size(); j++) {
            if (nums[j] > nums[i]) {
                dfs(nums, j);
                int length = dp[j][0];
                int count = dp[j][1];
                if (1 + length > maxLen) {
                    maxLen = 1 + length;
                    maxCnt = count;
                } else if (1 + length == maxLen) {
                    maxCnt += count;
                }
            }
        }
        dp[i] = {maxLen, maxCnt};
    }

public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        dp.assign(n, vector<int>(2, -1));

        int lenLIS = 0, res = 0;
        for (int i = 0; i < n; i++) {
            dfs(nums, i);
            int maxLen = dp[i][0];
            int maxCnt = dp[i][1];
            if (maxLen > lenLIS) {
                lenLIS = maxLen;
                res = maxCnt;
            } else if (maxLen == lenLIS) {
                res += maxCnt;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findNumberOfLIS(nums) {
        const dp = new Map();

        const dfs = (i) => {
            if (dp.has(i)) return;

            let maxLen = 1,
                maxCnt = 1;
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[j] > nums[i]) {
                    dfs(j);
                    const [length, count] = dp.get(j);
                    if (1 + length > maxLen) {
                        maxLen = 1 + length;
                        maxCnt = count;
                    } else if (1 + length === maxLen) {
                        maxCnt += count;
                    }
                }
            }
            dp.set(i, [maxLen, maxCnt]);
        };

        let lenLIS = 0,
            res = 0;
        for (let i = 0; i < nums.length; i++) {
            dfs(i);
            const [maxLen, maxCnt] = dp.get(i);
            if (maxLen > lenLIS) {
                lenLIS = maxLen;
                res = maxCnt;
            } else if (maxLen === lenLIS) {
                res += maxCnt;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [[0, 0] for _ in range(n)]
        lenLIS, res = 0, 0

        for i in range(n - 1, -1, -1):
            maxLen, maxCnt = 1, 1
            for j in range(i + 1, n):
                if nums[j] > nums[i]:
                    length, count = dp[j]
                    if length + 1 > maxLen:
                        maxLen, maxCnt = length + 1, count
                    elif length + 1 == maxLen:
                        maxCnt += count

            if maxLen > lenLIS:
                lenLIS, res = maxLen, maxCnt
            elif maxLen == lenLIS:
                res += maxCnt
            dp[i] = [maxLen, maxCnt]

        return res
```

```java
public class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        int[][] dp = new int[n][2];
        int lenLIS = 0, res = 0;

        for (int i = n - 1; i >= 0; i--) {
            int maxLen = 1, maxCnt = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] > nums[i]) {
                    int length = dp[j][0];
                    int count = dp[j][1];
                    if (length + 1 > maxLen) {
                        maxLen = length + 1;
                        maxCnt = count;
                    } else if (length + 1 == maxLen) {
                        maxCnt += count;
                    }
                }
            }

            if (maxLen > lenLIS) {
                lenLIS = maxLen;
                res = maxCnt;
            } else if (maxLen == lenLIS) {
                res += maxCnt;
            }
            dp[i][0] = maxLen;
            dp[i][1] = maxCnt;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> dp(n, vector<int>(2, 0));
        int lenLIS = 0, res = 0;

        for (int i = n - 1; i >= 0; i--) {
            int maxLen = 1, maxCnt = 1;
            for (int j = i + 1; j < n; j++) {
                if (nums[j] > nums[i]) {
                    int length = dp[j][0];
                    int count = dp[j][1];
                    if (length + 1 > maxLen) {
                        maxLen = length + 1;
                        maxCnt = count;
                    } else if (length + 1 == maxLen) {
                        maxCnt += count;
                    }
                }
            }

            if (maxLen > lenLIS) {
                lenLIS = maxLen;
                res = maxCnt;
            } else if (maxLen == lenLIS) {
                res += maxCnt;
            }
            dp[i][0] = maxLen;
            dp[i][1] = maxCnt;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findNumberOfLIS(nums) {
        const n = nums.length;
        const dp = Array.from({ length: n }, () => [0, 0]);
        let lenLIS = 0,
            res = 0;

        for (let i = n - 1; i >= 0; i--) {
            let maxLen = 1,
                maxCnt = 1;
            for (let j = i + 1; j < n; j++) {
                if (nums[j] > nums[i]) {
                    const [length, count] = dp[j];
                    if (length + 1 > maxLen) {
                        maxLen = length + 1;
                        maxCnt = count;
                    } else if (length + 1 === maxLen) {
                        maxCnt += count;
                    }
                }
            }

            if (maxLen > lenLIS) {
                lenLIS = maxLen;
                res = maxCnt;
            } else if (maxLen === lenLIS) {
                res += maxCnt;
            }
            dp[i] = [maxLen, maxCnt];
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 4. Dynamic Programming (Binary Search + Prefix Sum)

::tabs-start

```python
class Solution:
    def findNumberOfLIS(self, nums: List[int]) -> int:
        n = len(nums)
        dp = [[[0, 0], [nums[0], 1]]]

        def bs1(num):
            l, r = 0, len(dp) - 1
            j = len(dp) - 1
            while l <= r:
                mid = (l + r) // 2
                if dp[mid][-1][0] < num:
                    l = mid + 1
                else:
                    j = mid
                    r = mid - 1
            return j

        def bs2(i, num):
            if i < 0:
                return 1
            l, r = 1, len(dp[i]) - 1
            j = 0
            while l <= r:
                mid = (l + r) // 2
                if dp[i][mid][0] >= num:
                    j = mid
                    l = mid + 1
                else:
                    r = mid - 1
            return dp[i][-1][1] - dp[i][j][1]

        LIS = 1
        for i in range(1, n):
            num = nums[i]
            if num > dp[-1][-1][0]:
                count = bs2(LIS - 1, num)
                dp.append([[0, 0], [num, count]])
                LIS += 1
            else:
                j = bs1(num)
                count = bs2(j - 1, num)
                dp[j].append([num, dp[j][-1][1] + count])

        return dp[-1][-1][1]
```

```java
public class Solution {
    public int findNumberOfLIS(int[] nums) {
        int n = nums.length;
        List<List<int[]>> dp = new ArrayList<>();
        List<int[]> first = new ArrayList<>();
        first.add(new int[]{0, 0});
        first.add(new int[]{nums[0], 1});
        dp.add(first);

        int LIS = 1;

        for (int i = 1; i < n; i++) {
            int num = nums[i];
            if (num > dp.get(dp.size() - 1).get(dp.get(dp.size() - 1).size() - 1)[0]) {
                int count = bs2(dp, LIS - 1, num);
                List<int[]> newList = new ArrayList<>();
                newList.add(new int[]{0, 0});
                newList.add(new int[]{num, count});
                dp.add(newList);
                LIS++;
            } else {
                int j = bs1(dp, num);
                int count = bs2(dp, j - 1, num);
                List<int[]> list = dp.get(j);
                int[] last = list.get(list.size() - 1);
                list.add(new int[]{num, last[1] + count});
            }
        }

        return dp.get(dp.size() - 1).get(dp.get(dp.size() - 1).size() - 1)[1];
    }

    private int bs1(List<List<int[]>> dp, int num) {
        int l = 0, r = dp.size() - 1, j = dp.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (dp.get(mid).get(dp.get(mid).size() - 1)[0] < num) {
                l = mid + 1;
            } else {
                j = mid;
                r = mid - 1;
            }
        }
        return j;
    }

    private int bs2(List<List<int[]>> dp, int i, int num) {
        if (i < 0) return 1;
        int l = 1, r = dp.get(i).size() - 1, j = 0;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (dp.get(i).get(mid)[0] >= num) {
                j = mid;
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return dp.get(i).get(dp.get(i).size() - 1)[1] - dp.get(i).get(j)[1];
    }
}
```

```cpp
class Solution {
public:
    int findNumberOfLIS(vector<int>& nums) {
        vector<vector<pair<int, int>>> dp = {{{0, 0}, {nums[0], 1}}};
        int LIS = 1;

        for (int i = 1; i < nums.size(); i++) {
            int num = nums[i];
            if (num > dp.back().back().first) {
                int count = bs2(dp, LIS - 1, num);
                dp.push_back({{0, 0}, {num, count}});
                LIS++;
            } else {
                int j = bs1(dp, num);
                int count = bs2(dp, j - 1, num);
                dp[j].push_back({num, dp[j].back().second + count});
            }
        }

        return dp.back().back().second;
    }

private:
    int bs1(vector<vector<pair<int, int>>>& dp, int num) {
        int l = 0, r = dp.size() - 1, j = dp.size() - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (dp[mid].back().first < num) {
                l = mid + 1;
            } else {
                j = mid;
                r = mid - 1;
            }
        }
        return j;
    }

    int bs2(vector<vector<pair<int, int>>>& dp, int i, int num) {
        if (i < 0) return 1;
        int l = 1, r = dp[i].size() - 1, j = 0;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (dp[i][mid].first >= num) {
                j = mid;
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return dp[i].back().second - dp[i][j].second;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    findNumberOfLIS(nums) {
        const dp = [
            [
                [0, 0],
                [nums[0], 1],
            ],
        ];
        let LIS = 1;

        const bs1 = (num) => {
            let l = 0,
                r = dp.length - 1,
                j = dp.length - 1;
            while (l <= r) {
                const mid = Math.floor((l + r) / 2);
                if (dp[mid][dp[mid].length - 1][0] < num) {
                    l = mid + 1;
                } else {
                    j = mid;
                    r = mid - 1;
                }
            }
            return j;
        };

        const bs2 = (i, num) => {
            if (i < 0) return 1;
            let l = 1,
                r = dp[i].length - 1,
                j = 0;
            while (l <= r) {
                const mid = Math.floor((l + r) / 2);
                if (dp[i][mid][0] >= num) {
                    j = mid;
                    l = mid + 1;
                } else {
                    r = mid - 1;
                }
            }
            return dp[i][dp[i].length - 1][1] - dp[i][j][1];
        };

        for (let i = 1; i < nums.length; i++) {
            const num = nums[i];
            if (num > dp[dp.length - 1][dp[dp.length - 1].length - 1][0]) {
                const count = bs2(LIS - 1, num);
                dp.push([
                    [0, 0],
                    [num, count],
                ]);
                LIS++;
            } else {
                const j = bs1(num);
                const count = bs2(j - 1, num);
                dp[j].push([num, dp[j][dp[j].length - 1][1] + count]);
            }
        }

        return dp[dp.length - 1][dp[dp.length - 1].length - 1][1];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$
