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

```csharp
public class Solution {
    private int LIS = 0;
    private int res = 0;

    public int FindNumberOfLIS(int[] nums) {
        for (int i = 0; i < nums.Length; i++) {
            Dfs(nums, i, 1);
        }
        return res;
    }

    private void Dfs(int[] nums, int i, int length) {
        if (LIS < length) {
            LIS = length;
            res = 1;
        } else if (LIS == length) {
            res++;
        }

        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[j] <= nums[i]) {
                continue;
            }
            Dfs(nums, j, length + 1);
        }
    }
}
```

```go
func findNumberOfLIS(nums []int) int {
    LIS := 0
    res := 0

    var dfs func(i, length int)
    dfs = func(i, length int) {
        if LIS < length {
            LIS = length
            res = 1
        } else if LIS == length {
            res++
        }

        for j := i + 1; j < len(nums); j++ {
            if nums[j] <= nums[i] {
                continue
            }
            dfs(j, length+1)
        }
    }

    for i := 0; i < len(nums); i++ {
        dfs(i, 1)
    }
    return res
}
```

```kotlin
class Solution {
    private var LIS = 0
    private var res = 0

    fun findNumberOfLIS(nums: IntArray): Int {
        LIS = 0
        res = 0
        for (i in nums.indices) {
            dfs(nums, i, 1)
        }
        return res
    }

    private fun dfs(nums: IntArray, i: Int, length: Int) {
        if (LIS < length) {
            LIS = length
            res = 1
        } else if (LIS == length) {
            res++
        }

        for (j in i + 1 until nums.size) {
            if (nums[j] <= nums[i]) {
                continue
            }
            dfs(nums, j, length + 1)
        }
    }
}
```

```swift
class Solution {
    private var LIS = 0
    private var res = 0

    func findNumberOfLIS(_ nums: [Int]) -> Int {
        LIS = 0
        res = 0
        for i in 0..<nums.count {
            dfs(nums, i, 1)
        }
        return res
    }

    private func dfs(_ nums: [Int], _ i: Int, _ length: Int) {
        if LIS < length {
            LIS = length
            res = 1
        } else if LIS == length {
            res += 1
        }

        for j in (i + 1)..<nums.count {
            if nums[j] <= nums[i] {
                continue
            }
            dfs(nums, j, length + 1)
        }
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

```csharp
public class Solution {
    private int[][] dp;

    public int FindNumberOfLIS(int[] nums) {
        int n = nums.Length;
        dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[] { -1, -1 };
        }

        int lenLIS = 0, res = 0;
        for (int i = 0; i < n; i++) {
            Dfs(nums, i);
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

    private void Dfs(int[] nums, int i) {
        if (dp[i][0] != -1) return;

        int maxLen = 1, maxCnt = 1;
        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[j] > nums[i]) {
                Dfs(nums, j);
                int[] next = dp[j];
                if (1 + next[0] > maxLen) {
                    maxLen = 1 + next[0];
                    maxCnt = next[1];
                } else if (1 + next[0] == maxLen) {
                    maxCnt += next[1];
                }
            }
        }

        dp[i] = new int[] { maxLen, maxCnt };
    }
}
```

```go
func findNumberOfLIS(nums []int) int {
    n := len(nums)
    dp := make([][2]int, n)
    for i := range dp {
        dp[i] = [2]int{-1, -1}
    }

    var dfs func(i int)
    dfs = func(i int) {
        if dp[i][0] != -1 {
            return
        }

        maxLen, maxCnt := 1, 1
        for j := i + 1; j < n; j++ {
            if nums[j] > nums[i] {
                dfs(j)
                length, count := dp[j][0], dp[j][1]
                if 1+length > maxLen {
                    maxLen = 1 + length
                    maxCnt = count
                } else if 1+length == maxLen {
                    maxCnt += count
                }
            }
        }
        dp[i] = [2]int{maxLen, maxCnt}
    }

    lenLIS, res := 0, 0
    for i := 0; i < n; i++ {
        dfs(i)
        maxLen, maxCnt := dp[i][0], dp[i][1]
        if maxLen > lenLIS {
            lenLIS = maxLen
            res = maxCnt
        } else if maxLen == lenLIS {
            res += maxCnt
        }
    }
    return res
}
```

```kotlin
class Solution {
    private lateinit var dp: Array<IntArray>

    fun findNumberOfLIS(nums: IntArray): Int {
        val n = nums.size
        dp = Array(n) { intArrayOf(-1, -1) }

        var lenLIS = 0
        var res = 0
        for (i in 0 until n) {
            dfs(nums, i)
            val (maxLen, maxCnt) = dp[i]
            if (maxLen > lenLIS) {
                lenLIS = maxLen
                res = maxCnt
            } else if (maxLen == lenLIS) {
                res += maxCnt
            }
        }
        return res
    }

    private fun dfs(nums: IntArray, i: Int) {
        if (dp[i][0] != -1) return

        var maxLen = 1
        var maxCnt = 1
        for (j in i + 1 until nums.size) {
            if (nums[j] > nums[i]) {
                dfs(nums, j)
                val (length, count) = dp[j]
                if (1 + length > maxLen) {
                    maxLen = 1 + length
                    maxCnt = count
                } else if (1 + length == maxLen) {
                    maxCnt += count
                }
            }
        }

        dp[i] = intArrayOf(maxLen, maxCnt)
    }
}
```

```swift
class Solution {
    private var dp: [[Int]] = []

    func findNumberOfLIS(_ nums: [Int]) -> Int {
        let n = nums.count
        dp = Array(repeating: [-1, -1], count: n)

        var lenLIS = 0
        var res = 0
        for i in 0..<n {
            dfs(nums, i)
            let maxLen = dp[i][0]
            let maxCnt = dp[i][1]
            if maxLen > lenLIS {
                lenLIS = maxLen
                res = maxCnt
            } else if maxLen == lenLIS {
                res += maxCnt
            }
        }
        return res
    }

    private func dfs(_ nums: [Int], _ i: Int) {
        if dp[i][0] != -1 { return }

        var maxLen = 1
        var maxCnt = 1
        for j in (i + 1)..<nums.count {
            if nums[j] > nums[i] {
                dfs(nums, j)
                let length = dp[j][0]
                let count = dp[j][1]
                if 1 + length > maxLen {
                    maxLen = 1 + length
                    maxCnt = count
                } else if 1 + length == maxLen {
                    maxCnt += count
                }
            }
        }

        dp[i] = [maxLen, maxCnt]
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

```csharp
public class Solution {
    public int FindNumberOfLIS(int[] nums) {
        int n = nums.Length;
        int[][] dp = new int[n][];
        for (int i = 0; i < n; i++) {
            dp[i] = new int[2];
        }
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

```go
func findNumberOfLIS(nums []int) int {
    n := len(nums)
    dp := make([][2]int, n)
    lenLIS, res := 0, 0

    for i := n - 1; i >= 0; i-- {
        maxLen, maxCnt := 1, 1
        for j := i + 1; j < n; j++ {
            if nums[j] > nums[i] {
                length, count := dp[j][0], dp[j][1]
                if length+1 > maxLen {
                    maxLen = length + 1
                    maxCnt = count
                } else if length+1 == maxLen {
                    maxCnt += count
                }
            }
        }

        if maxLen > lenLIS {
            lenLIS = maxLen
            res = maxCnt
        } else if maxLen == lenLIS {
            res += maxCnt
        }
        dp[i][0] = maxLen
        dp[i][1] = maxCnt
    }
    return res
}
```

```kotlin
class Solution {
    fun findNumberOfLIS(nums: IntArray): Int {
        val n = nums.size
        val dp = Array(n) { IntArray(2) }
        var lenLIS = 0
        var res = 0

        for (i in n - 1 downTo 0) {
            var maxLen = 1
            var maxCnt = 1
            for (j in i + 1 until n) {
                if (nums[j] > nums[i]) {
                    val length = dp[j][0]
                    val count = dp[j][1]
                    if (length + 1 > maxLen) {
                        maxLen = length + 1
                        maxCnt = count
                    } else if (length + 1 == maxLen) {
                        maxCnt += count
                    }
                }
            }

            if (maxLen > lenLIS) {
                lenLIS = maxLen
                res = maxCnt
            } else if (maxLen == lenLIS) {
                res += maxCnt
            }
            dp[i][0] = maxLen
            dp[i][1] = maxCnt
        }
        return res
    }
}
```

```swift
class Solution {
    func findNumberOfLIS(_ nums: [Int]) -> Int {
        let n = nums.count
        var dp = Array(repeating: [0, 0], count: n)
        var lenLIS = 0
        var res = 0

        for i in stride(from: n - 1, through: 0, by: -1) {
            var maxLen = 1
            var maxCnt = 1
            for j in (i + 1)..<n {
                if nums[j] > nums[i] {
                    let length = dp[j][0]
                    let count = dp[j][1]
                    if length + 1 > maxLen {
                        maxLen = length + 1
                        maxCnt = count
                    } else if length + 1 == maxLen {
                        maxCnt += count
                    }
                }
            }

            if maxLen > lenLIS {
                lenLIS = maxLen
                res = maxCnt
            } else if maxLen == lenLIS {
                res += maxCnt
            }
            dp[i][0] = maxLen
            dp[i][1] = maxCnt
        }
        return res
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

```csharp
public class Solution {
    private List<List<int[]>> dp;

    public int FindNumberOfLIS(int[] nums) {
        dp = new List<List<int[]>>();
        var first = new List<int[]> {
            new int[] { 0, 0 },
            new int[] { nums[0], 1 }
        };
        dp.Add(first);

        int LIS = 1;

        for (int i = 1; i < nums.Length; i++) {
            int num = nums[i];
            if (num > dp[dp.Count - 1][dp[dp.Count - 1].Count - 1][0]) {
                int count = Bs2(LIS - 1, num);
                var newList = new List<int[]> {
                    new int[] { 0, 0 },
                    new int[] { num, count }
                };
                dp.Add(newList);
                LIS++;
            } else {
                int j = Bs1(num);
                int count = Bs2(j - 1, num);
                var list = dp[j];
                int[] last = list[list.Count - 1];
                list.Add(new int[] { num, last[1] + count });
            }
        }

        return dp[dp.Count - 1][dp[dp.Count - 1].Count - 1][1];
    }

    private int Bs1(int num) {
        int l = 0, r = dp.Count - 1, j = dp.Count - 1;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (dp[mid][dp[mid].Count - 1][0] < num) {
                l = mid + 1;
            } else {
                j = mid;
                r = mid - 1;
            }
        }
        return j;
    }

    private int Bs2(int i, int num) {
        if (i < 0) return 1;
        int l = 1, r = dp[i].Count - 1, j = 0;
        while (l <= r) {
            int mid = (l + r) / 2;
            if (dp[i][mid][0] >= num) {
                j = mid;
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return dp[i][dp[i].Count - 1][1] - dp[i][j][1];
    }
}
```

```go
func findNumberOfLIS(nums []int) int {
    dp := [][][2]int{{{0, 0}, {nums[0], 1}}}
    LIS := 1

    bs1 := func(num int) int {
        l, r, j := 0, len(dp)-1, len(dp)-1
        for l <= r {
            mid := (l + r) / 2
            if dp[mid][len(dp[mid])-1][0] < num {
                l = mid + 1
            } else {
                j = mid
                r = mid - 1
            }
        }
        return j
    }

    bs2 := func(i, num int) int {
        if i < 0 {
            return 1
        }
        l, r, j := 1, len(dp[i])-1, 0
        for l <= r {
            mid := (l + r) / 2
            if dp[i][mid][0] >= num {
                j = mid
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return dp[i][len(dp[i])-1][1] - dp[i][j][1]
    }

    for i := 1; i < len(nums); i++ {
        num := nums[i]
        if num > dp[len(dp)-1][len(dp[len(dp)-1])-1][0] {
            count := bs2(LIS-1, num)
            dp = append(dp, [][2]int{{0, 0}, {num, count}})
            LIS++
        } else {
            j := bs1(num)
            count := bs2(j-1, num)
            dp[j] = append(dp[j], [2]int{num, dp[j][len(dp[j])-1][1] + count})
        }
    }

    return dp[len(dp)-1][len(dp[len(dp)-1])-1][1]
}
```

```kotlin
class Solution {
    private lateinit var dp: MutableList<MutableList<IntArray>>

    fun findNumberOfLIS(nums: IntArray): Int {
        dp = mutableListOf(
            mutableListOf(intArrayOf(0, 0), intArrayOf(nums[0], 1))
        )
        var LIS = 1

        for (i in 1 until nums.size) {
            val num = nums[i]
            if (num > dp.last().last()[0]) {
                val count = bs2(LIS - 1, num)
                dp.add(mutableListOf(intArrayOf(0, 0), intArrayOf(num, count)))
                LIS++
            } else {
                val j = bs1(num)
                val count = bs2(j - 1, num)
                val list = dp[j]
                val last = list.last()
                list.add(intArrayOf(num, last[1] + count))
            }
        }

        return dp.last().last()[1]
    }

    private fun bs1(num: Int): Int {
        var l = 0
        var r = dp.size - 1
        var j = dp.size - 1
        while (l <= r) {
            val mid = (l + r) / 2
            if (dp[mid].last()[0] < num) {
                l = mid + 1
            } else {
                j = mid
                r = mid - 1
            }
        }
        return j
    }

    private fun bs2(i: Int, num: Int): Int {
        if (i < 0) return 1
        var l = 1
        var r = dp[i].size - 1
        var j = 0
        while (l <= r) {
            val mid = (l + r) / 2
            if (dp[i][mid][0] >= num) {
                j = mid
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return dp[i].last()[1] - dp[i][j][1]
    }
}
```

```swift
class Solution {
    private var dp: [[[Int]]] = []

    func findNumberOfLIS(_ nums: [Int]) -> Int {
        dp = [[[0, 0], [nums[0], 1]]]
        var LIS = 1

        for i in 1..<nums.count {
            let num = nums[i]
            if num > dp[dp.count - 1][dp[dp.count - 1].count - 1][0] {
                let count = bs2(LIS - 1, num)
                dp.append([[0, 0], [num, count]])
                LIS += 1
            } else {
                let j = bs1(num)
                let count = bs2(j - 1, num)
                let last = dp[j][dp[j].count - 1]
                dp[j].append([num, last[1] + count])
            }
        }

        return dp[dp.count - 1][dp[dp.count - 1].count - 1][1]
    }

    private func bs1(_ num: Int) -> Int {
        var l = 0
        var r = dp.count - 1
        var j = dp.count - 1
        while l <= r {
            let mid = (l + r) / 2
            if dp[mid][dp[mid].count - 1][0] < num {
                l = mid + 1
            } else {
                j = mid
                r = mid - 1
            }
        }
        return j
    }

    private func bs2(_ i: Int, _ num: Int) -> Int {
        if i < 0 { return 1 }
        var l = 1
        var r = dp[i].count - 1
        var j = 0
        while l <= r {
            let mid = (l + r) / 2
            if dp[i][mid][0] >= num {
                j = mid
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return dp[i][dp[i].count - 1][1] - dp[i][j][1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n\log n)$
- Space complexity: $O(n)$
