## 1. Backtracking

### Intuition

We need to check if we can partition the array into two non-empty groups with equal averages. The naive approach is to try all possible ways to assign each element to group A or group B. For each complete assignment, we verify if both groups are non-empty and have the same average. Two groups have equal averages when `sum(A) * len(B) == sum(B) * len(A)`.

### Algorithm

1. Define `backtrack(i, A, B)` to assign element at index `i` to either group `A` or `B`.
2. Base case: when `i == n`, check if both groups are non-empty and have equal averages.
3. For each element, first try adding it to `A` and recurse. If that fails, remove it from `A`, add it to `B`, and recurse.
4. Return `true` if any assignment works, `false` otherwise.

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        def backtrack(i, A, B):
            if i == len(nums):
                if not A or not B:
                    return False
                return sum(A) * len(B) == sum(B) * len(A)

            A.append(nums[i])
            if backtrack(i + 1, A, B):
                return True
            B.append(nums[i])
            A.pop()
            res = backtrack(i + 1, A, B)
            B.pop()
            return res

        return backtrack(0, [], [])
```

```java
public class Solution {
    public boolean splitArraySameAverage(int[] nums) {
        return backtrack(nums, 0, new ArrayList<>(), new ArrayList<>());
    }

    private boolean backtrack(int[] nums, int i, List<Integer> A, List<Integer> B) {
        if (i == nums.length) {
            if (A.isEmpty() || B.isEmpty()) return false;
            int sumA = A.stream().mapToInt(x -> x).sum();
            int sumB = B.stream().mapToInt(x -> x).sum();
            return sumA * B.size() == sumB * A.size();
        }

        A.add(nums[i]);
        if (backtrack(nums, i + 1, A, B)) return true;
        A.remove(A.size() - 1);

        B.add(nums[i]);
        boolean res = backtrack(nums, i + 1, A, B);
        B.remove(B.size() - 1);

        return res;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        vector<int> A, B;
        return backtrack(nums, 0, A, B);
    }

    bool backtrack(vector<int>& nums, int i, vector<int>& A, vector<int>& B) {
        if (i == nums.size()) {
            if (A.empty() || B.empty()) return false;
            int sumA = accumulate(A.begin(), A.end(), 0);
            int sumB = accumulate(B.begin(), B.end(), 0);
            return sumA * B.size() == sumB * A.size();
        }

        A.push_back(nums[i]);
        if (backtrack(nums, i + 1, A, B)) return true;
        A.pop_back();

        B.push_back(nums[i]);
        bool res = backtrack(nums, i + 1, A, B);
        B.pop_back();

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    splitArraySameAverage(nums) {
        const backtrack = (i, A, B) => {
            if (i === nums.length) {
                if (A.length === 0 || B.length === 0) return false;
                const sumA = A.reduce((a, b) => a + b, 0);
                const sumB = B.reduce((a, b) => a + b, 0);
                return sumA * B.length === sumB * A.length;
            }

            A.push(nums[i]);
            if (backtrack(i + 1, A, B)) return true;
            A.pop();

            B.push(nums[i]);
            const res = backtrack(i + 1, A, B);
            B.pop();

            return res;
        };

        return backtrack(0, [], []);
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        return Backtrack(nums, 0, new List<int>(), new List<int>());
    }

    private bool Backtrack(int[] nums, int i, List<int> A, List<int> B) {
        if (i == nums.Length) {
            if (A.Count == 0 || B.Count == 0) return false;
            int sumA = A.Sum();
            int sumB = B.Sum();
            return sumA * B.Count == sumB * A.Count;
        }

        A.Add(nums[i]);
        if (Backtrack(nums, i + 1, A, B)) return true;
        A.RemoveAt(A.Count - 1);

        B.Add(nums[i]);
        bool res = Backtrack(nums, i + 1, A, B);
        B.RemoveAt(B.Count - 1);

        return res;
    }
}
```

```go
func splitArraySameAverage(nums []int) bool {
    var backtrack func(i int, A, B []int) bool
    backtrack = func(i int, A, B []int) bool {
        if i == len(nums) {
            if len(A) == 0 || len(B) == 0 {
                return false
            }
            sumA, sumB := 0, 0
            for _, v := range A {
                sumA += v
            }
            for _, v := range B {
                sumB += v
            }
            return sumA*len(B) == sumB*len(A)
        }

        A = append(A, nums[i])
        if backtrack(i+1, A, B) {
            return true
        }
        A = A[:len(A)-1]

        B = append(B, nums[i])
        res := backtrack(i+1, A, B)
        B = B[:len(B)-1]

        return res
    }

    return backtrack(0, []int{}, []int{})
}
```

```kotlin
class Solution {
    fun splitArraySameAverage(nums: IntArray): Boolean {
        fun backtrack(i: Int, A: MutableList<Int>, B: MutableList<Int>): Boolean {
            if (i == nums.size) {
                if (A.isEmpty() || B.isEmpty()) return false
                val sumA = A.sum()
                val sumB = B.sum()
                return sumA * B.size == sumB * A.size
            }

            A.add(nums[i])
            if (backtrack(i + 1, A, B)) return true
            A.removeAt(A.size - 1)

            B.add(nums[i])
            val res = backtrack(i + 1, A, B)
            B.removeAt(B.size - 1)

            return res
        }

        return backtrack(0, mutableListOf(), mutableListOf())
    }
}
```

```swift
class Solution {
    func splitArraySameAverage(_ nums: [Int]) -> Bool {
        func backtrack(_ i: Int, _ A: inout [Int], _ B: inout [Int]) -> Bool {
            if i == nums.count {
                if A.isEmpty || B.isEmpty { return false }
                let sumA = A.reduce(0, +)
                let sumB = B.reduce(0, +)
                return sumA * B.count == sumB * A.count
            }

            A.append(nums[i])
            if backtrack(i + 1, &A, &B) { return true }
            A.removeLast()

            B.append(nums[i])
            let res = backtrack(i + 1, &A, &B)
            B.removeLast()

            return res
        }

        var A: [Int] = []
        var B: [Int] = []
        return backtrack(0, &A, &B)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Memoization (Brute Force)

### Intuition

The backtracking solution recomputes many states. We can track the state as `(index, size of A, sum of A)` since B is determined by what remains. If A has size `s` and sum `curSum`, then B has size `n - s` and sum `total - curSum`. We check the equal average condition at each step and memoize to avoid redundant work.

### Algorithm

1. Calculate the total sum of the array.
2. Define `dfs(i, size, currSum)` where `size` and `currSum` refer to the current subset.
3. If `size > 0` and `size < n`, check if `currSum * (n - size) == (total - currSum) * size`.
4. At each index, try including or excluding the element in the current subset.
5. Memoize results keyed by `(i, size, currSum)`.

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        total = sum(nums)
        n = len(nums)
        memo = {}

        def dfs(i, size, curr_sum):
            if (i, size, curr_sum) in memo:
                return memo[(i, size, curr_sum)]

            if size > 0 and size < n and curr_sum * (n - size) == (total - curr_sum) * size:
                return True

            if i == n:
                return False

            # include nums[i] in A
            if dfs(i + 1, size + 1, curr_sum + nums[i]):
                memo[(i, size, curr_sum)] = True
                return True

            # include nums[i] in B
            if dfs(i + 1, size, curr_sum):
                memo[(i, size, curr_sum)] = True
                return True

            memo[(i, size, curr_sum)] = False
            return False

        return dfs(0, 0, 0)
```

```java
public class Solution {
    public boolean splitArraySameAverage(int[] nums) {
        int total = 0, n = nums.length;
        for (int num : nums) total += num;
        Map<String, Boolean> memo = new HashMap<>();

        return dfs(0, 0, 0, nums, total, n, memo);
    }

    private boolean dfs(int i, int size, int currSum, int[] nums, int total, int n, Map<String, Boolean> memo) {
        String key = i + "," + size + "," + currSum;
        if (memo.containsKey(key)) return memo.get(key);

        if (size > 0 && size < n && currSum * (n - size) == (total - currSum) * size)
            return true;
        if (i == n) return false;

        if (dfs(i + 1, size + 1, currSum + nums[i], nums, total, n, memo) ||
            dfs(i + 1, size, currSum, nums, total, n, memo)) {
            memo.put(key, true);
            return true;
        }

        memo.put(key, false);
        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        int n = nums.size();
        unordered_map<string, bool> memo;

        function<bool(int, int, int)> dfs = [&](int i, int size, int currSum) {
            string key = to_string(i) + "," + to_string(size) + "," + to_string(currSum);
            if (memo.count(key)) return memo[key];

            if (size > 0 && size < n && currSum * (n - size) == (total - currSum) * size)
                return true;
            if (i == n) return false;

            if (dfs(i + 1, size + 1, currSum + nums[i]) || dfs(i + 1, size, currSum))
                return memo[key] = true;

            return memo[key] = false;
        };

        return dfs(0, 0, 0);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    splitArraySameAverage(nums) {
        const total = nums.reduce((a, b) => a + b, 0);
        const n = nums.length;
        const memo = new Map();

        const dfs = (i, size, currSum) => {
        const key = `${i},${size},${currSum}`;
            if (memo.has(key)) return memo.get(key);

            if (size > 0 && size < n && currSum * (n - size) === (total - currSum) * size)
                return true;
            if (i === n) return false;

            if (dfs(i + 1, size + 1, currSum + nums[i]) || dfs(i + 1, size, currSum)) {
                memo.set(key, true);
                return true;
            }

            memo.set(key, false);
            return false;
        };

        return dfs(0, 0, 0);
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        int total = nums.Sum(), n = nums.Length;
        var memo = new Dictionary<string, bool>();

        bool Dfs(int i, int size, int currSum) {
            string key = $"{i},{size},{currSum}";
            if (memo.ContainsKey(key)) return memo[key];

            if (size > 0 && size < n && currSum * (n - size) == (total - currSum) * size)
                return true;
            if (i == n) return false;

            if (Dfs(i + 1, size + 1, currSum + nums[i]) || Dfs(i + 1, size, currSum)) {
                memo[key] = true;
                return true;
            }

            memo[key] = false;
            return false;
        }

        return Dfs(0, 0, 0);
    }
}
```

```go
func splitArraySameAverage(nums []int) bool {
    total := 0
    for _, num := range nums {
        total += num
    }
    n := len(nums)
    memo := make(map[string]bool)

    var dfs func(i, size, currSum int) bool
    dfs = func(i, size, currSum int) bool {
        key := fmt.Sprintf("%d,%d,%d", i, size, currSum)
        if val, ok := memo[key]; ok {
            return val
        }

        if size > 0 && size < n && currSum*(n-size) == (total-currSum)*size {
            return true
        }
        if i == n {
            return false
        }

        if dfs(i+1, size+1, currSum+nums[i]) || dfs(i+1, size, currSum) {
            memo[key] = true
            return true
        }

        memo[key] = false
        return false
    }

    return dfs(0, 0, 0)
}
```

```kotlin
class Solution {
    fun splitArraySameAverage(nums: IntArray): Boolean {
        val total = nums.sum()
        val n = nums.size
        val memo = mutableMapOf<String, Boolean>()

        fun dfs(i: Int, size: Int, currSum: Int): Boolean {
            val key = "$i,$size,$currSum"
            if (memo.containsKey(key)) return memo[key]!!

            if (size > 0 && size < n && currSum * (n - size) == (total - currSum) * size)
                return true
            if (i == n) return false

            if (dfs(i + 1, size + 1, currSum + nums[i]) || dfs(i + 1, size, currSum)) {
                memo[key] = true
                return true
            }

            memo[key] = false
            return false
        }

        return dfs(0, 0, 0)
    }
}
```

```swift
class Solution {
    func splitArraySameAverage(_ nums: [Int]) -> Bool {
        let total = nums.reduce(0, +)
        let n = nums.count
        var memo: [String: Bool] = [:]

        func dfs(_ i: Int, _ size: Int, _ currSum: Int) -> Bool {
            let key = "\(i),\(size),\(currSum)"
            if let val = memo[key] {
                return val
            }

            if size > 0 && size < n && currSum * (n - size) == (total - currSum) * size {
                return true
            }
            if i == n { return false }

            if dfs(i + 1, size + 1, currSum + nums[i]) || dfs(i + 1, size, currSum) {
                memo[key] = true
                return true
            }

            memo[key] = false
            return false
        }

        return dfs(0, 0, 0)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * s)$
* Space complexity: $O(n ^ 2 * s)$

> Where $n$ is the size of the input array $nums$, and $s$ is the sum of the elements of the array.

---

## 3. Memoization (Optimal)

### Intuition

For two groups to have the same average as the whole array, we need: `sum(A) / len(A) = total / n`. This means `sum(A) = len(A) * total / n`. We only need to find a subset `A` of size `a` (where `1 <= a <= n/2`) with sum exactly `a * total / n`. This sum must be an integer, so we only check sizes where `a * total` is divisible by `n`.

### Algorithm

1. For each valid subset size `a` from `1` to `n/2` where `a * total % n == 0`:
   - Calculate target sum = `a * total / n`.
   - Use memoized DFS to check if any subset of size `a` has this exact sum.
2. The DFS tries including or excluding each element, tracking remaining size and sum needed.
3. Return `true` if any valid subset is found.

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n, total = len(nums), sum(nums)
        # len(A) = a, len(B) = b, let a <= b
        # avg(A) = avg(B)
        # sum(A) / a = sum(B) / b = sum(nums) / n
        # sum(A) / a = avg => sum(A) = a * avg
        # sum(A) = a * sum(nums) / n
        # Find if any subset exists with a * sum(nums) / n
        # a is in the range [1, (n//2)]

        memo = {}
        def dfs(i, a, s):
            if (i, a, s) in memo:
                return memo[(i, a, s)]
            if a == 0:
                return s == 0
            if i == n or a < 0:
                return False
            memo[(i, a, s)] = dfs(i + 1, a, s) or dfs(i + 1, a - 1, s - nums[i])
            return memo[(i, a, s)]

        for a in range(1, n // 2 + 1):
            if total * a % n == 0:
                if dfs(0, a, total * a // n):
                    return True

        return False
```

```java
public class Solution {
    int[] nums;
    int n, total;
    Map<String, Boolean> memo;

    public boolean splitArraySameAverage(int[] nums) {
        this.nums = nums;
        this.n = nums.length;
        this.total = 0;
        for (int num : nums) total += num;
        this.memo = new HashMap<>();

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        for (int a = 1; a <= n / 2; a++) {
            if ((total * a) % n == 0) {
                if (dfs(0, a, (total * a) / n)) return true;
            }
        }
        return false;
    }

    private boolean dfs(int i, int a, int s) {
        String key = i + "," + a + "," + s;
        if (memo.containsKey(key)) return memo.get(key);
        if (a == 0) return s == 0;
        if (i == n || a < 0 || s < 0) return false;
        boolean res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i]);
        memo.put(key, res);
        return res;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        int n = nums.size();
        int total = accumulate(nums.begin(), nums.end(), 0);

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        vector<vector<vector<int>>> memo(n + 1,
            vector<vector<int>>(n / 2 + 1, vector<int>(total + 1, -1)));

        function<bool(int, int, int)> dfs = [&](int i, int a, int s) -> bool {
            if (a == 0) return s == 0;
            if (i == n || s < 0 || a < 0) return false;
            if (memo[i][a][s] != -1) return memo[i][a][s];

            bool res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i]);
            memo[i][a][s] = res;
            return res;
        };

        for (int a = 1; a <= n / 2; ++a) {
            if ((total * a) % n == 0) {
                int target = (total * a) / n;
                if (dfs(0, a, target)) return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    splitArraySameAverage(nums) {
        const n = nums.length, total = nums.reduce((a, b) => a + b, 0);

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        const memo = new Map();

        const dfs = (i, a, s) => {
            const key = `${i},${a},${s}`;
            if (memo.has(key)) return memo.get(key);
            if (a === 0) return s === 0;
            if (i === n || a < 0) return false;
            const res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i]);
            memo.set(key, res);
            return res;
        };

        for (let a = 1; a <= Math.floor(n / 2); a++) {
            if ((total * a) % n === 0) {
                if (dfs(0, a, Math.floor((total * a) / n))) return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        int n = nums.Length;
        int total = nums.Sum();

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int[,,] memo = new int[n + 1, n / 2 + 1, total + 1];
        for (int i = 0; i <= n; i++)
            for (int j = 0; j <= n / 2; j++)
                for (int k = 0; k <= total; k++)
                    memo[i, j, k] = -1;

        for (int a = 1; a <= n / 2; a++) {
            if ((total * a) % n == 0) {
                int target = (total * a) / n;
                if (Dfs(0, a, target, nums, memo)) return true;
            }
        }

        return false;
    }

    private bool Dfs(int i, int a, int s, int[] nums, int[,,] memo) {
        if (a == 0) return s == 0;
        if (i == nums.Length || a < 0 || s < 0) return false;
        if (memo[i, a, s] != -1) return memo[i, a, s] == 1;

        bool res = Dfs(i + 1, a, s, nums, memo) || Dfs(i + 1, a - 1, s - nums[i], nums, memo);
        memo[i, a, s] = res ? 1 : 0;
        return res;
    }
}
```

```go
func splitArraySameAverage(nums []int) bool {
    n := len(nums)
    total := 0
    for _, num := range nums {
        total += num
    }

    memo := make([][][]int, n+1)
    for i := range memo {
        memo[i] = make([][]int, n/2+1)
        for j := range memo[i] {
            memo[i][j] = make([]int, total+1)
            for k := range memo[i][j] {
                memo[i][j][k] = -1
            }
        }
    }

    var dfs func(i, a, s int) bool
    dfs = func(i, a, s int) bool {
        if a == 0 {
            return s == 0
        }
        if i == n || a < 0 || s < 0 {
            return false
        }
        if memo[i][a][s] != -1 {
            return memo[i][a][s] == 1
        }

        res := dfs(i+1, a, s) || dfs(i+1, a-1, s-nums[i])
        if res {
            memo[i][a][s] = 1
        } else {
            memo[i][a][s] = 0
        }
        return res
    }

    for a := 1; a <= n/2; a++ {
        if (total*a)%n == 0 {
            target := (total * a) / n
            if dfs(0, a, target) {
                return true
            }
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun splitArraySameAverage(nums: IntArray): Boolean {
        val n = nums.size
        val total = nums.sum()

        val memo = Array(n + 1) { Array(n / 2 + 1) { IntArray(total + 1) { -1 } } }

        fun dfs(i: Int, a: Int, s: Int): Boolean {
            if (a == 0) return s == 0
            if (i == n || a < 0 || s < 0) return false
            if (memo[i][a][s] != -1) return memo[i][a][s] == 1

            val res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i])
            memo[i][a][s] = if (res) 1 else 0
            return res
        }

        for (a in 1..n / 2) {
            if ((total * a) % n == 0) {
                val target = (total * a) / n
                if (dfs(0, a, target)) return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func splitArraySameAverage(_ nums: [Int]) -> Bool {
        let n = nums.count
        let total = nums.reduce(0, +)

        var memo = [[[Int]]](repeating: [[Int]](repeating: [Int](repeating: -1, count: total + 1), count: n / 2 + 1), count: n + 1)

        func dfs(_ i: Int, _ a: Int, _ s: Int) -> Bool {
            if a == 0 { return s == 0 }
            if i == n || a < 0 || s < 0 { return false }
            if memo[i][a][s] != -1 { return memo[i][a][s] == 1 }

            let res = dfs(i + 1, a, s) || dfs(i + 1, a - 1, s - nums[i])
            memo[i][a][s] = res ? 1 : 0
            return res
        }

        for a in 1...(n / 2) {
            if (total * a) % n == 0 {
                let target = (total * a) / n
                if dfs(0, a, target) { return true }
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * s)$
* Space complexity: $O(n ^ 2 * s)$

> Where $n$ is the size of the input array $nums$, and $s$ is the sum of the elements of the array.

---

## 4. Dynamic Programming (Bottom-Up)

### Intuition

We can build all achievable sums for each subset size using dynamic programming. For each element, we update what sums are achievable for each size. We iterate backwards through sizes to avoid using the same element twice. Finally, we check if any valid target sum exists for sizes 1 through n/2.

### Algorithm

1. Create `dp[a]` as a set of achievable sums for subsets of size `a`. Initialize `dp[0] = {0}`.
2. For each number in the array:
   - For sizes from `n/2` down to `1`:
     - For each previously achievable sum in `dp[a-1]`, add `sum + num` to `dp[a]`.
3. After processing all numbers, check each size `a` from `1` to `n/2`:
   - If `a * total % n == 0` and the target sum `a * total / n` exists in `dp[a]`, return `true`.
4. Return `false` if no valid partition exists.

::tabs-start

```python
class Solution:
    def splitArraySameAverage(self, nums: List[int]) -> bool:
        n = len(nums)
        # len(A) = a, len(B) = b, let a <= b
        # avg(A) = avg(B)
        # sum(A) / a = sum(B) / b = sum(nums) / n
        # sum(A) / a = avg => sum(A) = a * avg
        # sum(A) = a * sum(nums) / n
        # Find if any subset exists with a * sum(nums) / n
        # a is in the range [1, (n//2)]

        total = sum(nums)
        dp = [set() for _ in range(n // 2 + 1)]

        dp[0].add(0)
        for num in nums:
            for a in range(n // 2, 0, -1):
                for prev in dp[a - 1]:
                    dp[a].add(prev + num)

        for a in range(1, n // 2 + 1):
            if (a * total % n == 0) and (a * total // n) in dp[a]:
                return True

        return False
```

```java
public class Solution {
    public boolean splitArraySameAverage(int[] nums) {
        int n = nums.length;

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int total = 0;
        for (int num : nums) total += num;

        List<Set<Integer>> dp = new ArrayList<>();
        for (int i = 0; i <= n / 2; i++) {
            dp.add(new HashSet<>());
        }
        dp.get(0).add(0);

        for (int num : nums) {
            for (int a = n / 2; a >= 1; a--) {
                for (int prev : dp.get(a - 1)) {
                    dp.get(a).add(prev + num);
                }
            }
        }

        for (int a = 1; a <= n / 2; a++) {
            if ((a * total) % n == 0 && dp.get(a).contains((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool splitArraySameAverage(vector<int>& nums) {
        int n = nums.size();

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int total = accumulate(nums.begin(), nums.end(), 0);
        vector<unordered_set<int>> dp(n / 2 + 1);
        dp[0].insert(0);

        for (int num : nums) {
            for (int a = n / 2; a >= 1; a--) {
                for (int prev : dp[a - 1]) {
                    dp[a].insert(prev + num);
                }
            }
        }

        for (int a = 1; a <= n / 2; ++a) {
            if ((a * total) % n == 0 && dp[a].count((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    splitArraySameAverage(nums) {
        const n = nums.length;

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        const total = nums.reduce((a, b) => a + b, 0);
        const dp = Array.from({ length: Math.floor(n / 2) + 1 }, () => new Set());
        dp[0].add(0);

        for (const num of nums) {
            for (let a = Math.floor(n / 2); a >= 1; a--) {
                for (const prev of dp[a - 1]) {
                    dp[a].add(prev + num);
                }
            }
        }

        for (let a = 1; a <= Math.floor(n / 2); a++) {
            if ((a * total) % n === 0 && dp[a].has((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool SplitArraySameAverage(int[] nums) {
        int n = nums.Length;

        // len(A) = a, len(B) = b, let a <= b
        // avg(A) = avg(B)
        // sum(A) / a = sum(B) / b = sum(nums) / n
        // sum(A) / a = avg => sum(A) = a * avg
        // sum(A) = a * sum(nums) / n
        // Find if any subset exists with a * sum(nums) / n
        // a is in the range [1, (n//2)]

        int total = nums.Sum();
        List<HashSet<int>> dp = new List<HashSet<int>>();
        for (int i = 0; i <= n / 2; i++) {
            dp.Add(new HashSet<int>());
        }
        dp[0].Add(0);

        foreach (int num in nums) {
            for (int a = n / 2; a >= 1; a--) {
                foreach (int prev in dp[a - 1]) {
                    dp[a].Add(prev + num);
                }
            }
        }

        for (int a = 1; a <= n / 2; a++) {
            if ((a * total) % n == 0 && dp[a].Contains((a * total) / n)) {
                return true;
            }
        }

        return false;
    }
}
```

```go
func splitArraySameAverage(nums []int) bool {
    n := len(nums)
    total := 0
    for _, num := range nums {
        total += num
    }

    dp := make([]map[int]bool, n/2+1)
    for i := range dp {
        dp[i] = make(map[int]bool)
    }
    dp[0][0] = true

    for _, num := range nums {
        for a := n / 2; a >= 1; a-- {
            for prev := range dp[a-1] {
                dp[a][prev+num] = true
            }
        }
    }

    for a := 1; a <= n/2; a++ {
        if (a*total)%n == 0 {
            if dp[a][(a*total)/n] {
                return true
            }
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun splitArraySameAverage(nums: IntArray): Boolean {
        val n = nums.size
        val total = nums.sum()

        val dp = Array(n / 2 + 1) { mutableSetOf<Int>() }
        dp[0].add(0)

        for (num in nums) {
            for (a in n / 2 downTo 1) {
                for (prev in dp[a - 1]) {
                    dp[a].add(prev + num)
                }
            }
        }

        for (a in 1..n / 2) {
            if ((a * total) % n == 0 && dp[a].contains((a * total) / n)) {
                return true
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func splitArraySameAverage(_ nums: [Int]) -> Bool {
        let n = nums.count
        let total = nums.reduce(0, +)

        var dp = [Set<Int>](repeating: Set<Int>(), count: n / 2 + 1)
        dp[0].insert(0)

        for num in nums {
            for a in stride(from: n / 2, through: 1, by: -1) {
                for prev in dp[a - 1] {
                    dp[a].insert(prev + num)
                }
            }
        }

        for a in 1...(n / 2) {
            if (a * total) % n == 0 && dp[a].contains((a * total) / n) {
                return true
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2 * s)$
* Space complexity: $O(n ^ 2 * s)$

> Where $n$ is the size of the input array $nums$, and $s$ is the sum of the elements of the array.