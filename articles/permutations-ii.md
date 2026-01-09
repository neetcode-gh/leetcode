## 1. Backtracking (Hash Set)

### Intuition

Since the input array may contain duplicates, generating all permutations naively would produce duplicate results. One straightforward way to handle this is to generate all permutations using standard backtracking and store them in a hash set, which automatically filters out duplicates.

We mark elements as "used" by temporarily replacing them with a sentinel value, ensuring each element is used exactly once per permutation.

### Algorithm

1. Initialize an empty set to store unique permutations.
2. Use backtracking to build permutations:
   - If the current permutation has the same length as `nums`, add it to the set.
   - Otherwise, iterate through `nums` and for each unused element:
     - Mark it as used (replace with sentinel value).
     - Add it to the current permutation and recurse.
     - Restore the original value and remove it from the permutation.
3. Return all unique permutations from the set.

::tabs-start

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        res = set()

        def backtrack(perm):
            if len(perm) == len(nums):
                res.add(tuple(perm))
                return

            for i in range(len(nums)):
                if nums[i] != float("-inf"):
                    perm.append(nums[i])
                    nums[i] = float("-inf")
                    backtrack(perm)
                    nums[i] = perm[-1]
                    perm.pop()

        backtrack([])
        return list(res)
```

```java
public class Solution {
    private Set<List<Integer>> res;

    public List<List<Integer>> permuteUnique(int[] nums) {
        res = new HashSet<>();
        List<Integer> perm = new ArrayList<>();
        backtrack(nums, perm);
        return new ArrayList<>(res);
    }

    private void backtrack(int[] nums, List<Integer> perm) {
        if (perm.size() == nums.length) {
            res.add(new ArrayList<>(perm));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != Integer.MIN_VALUE) {
                int temp = nums[i];
                perm.add(nums[i]);
                nums[i] = Integer.MIN_VALUE;
                backtrack(nums, perm);
                nums[i] = temp;
                perm.remove(perm.size() - 1);
            }
        }
    }
}
```

```cpp
class Solution {
    set<vector<int>> res;
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        vector<int> perm;
        backtrack(nums, perm);
        return vector<vector<int>>(res.begin(), res.end());
    }

private:
    void backtrack(vector<int>& nums, vector<int>& perm) {
        if (perm.size() == nums.size()) {
            res.insert(perm);
            return;
        }

        for (int i = 0; i < nums.size(); ++i) {
            if (nums[i] != INT_MIN) {
                int temp = nums[i];
                perm.push_back(temp);
                nums[i] = INT_MIN;
                backtrack(nums, perm);
                nums[i] = temp;
                perm.pop_back();
            }
        }

    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permuteUnique(nums) {
        const res = new Set();
        const perm = [];

        const backtrack = () => {
            if (perm.length === nums.length) {
                res.add(JSON.stringify(perm));
                return;
            }

            for (let i = 0; i < nums.length; i++) {
                if (nums[i] !== -Infinity) {
                    let temp = nums[i];
                    perm.push(nums[i]);
                    nums[i] = -Infinity;
                    backtrack();
                    nums[i] = temp;
                    perm.pop();
                }
            }
        };

        backtrack();
        return Array.from(res).map(JSON.parse);
    }
}
```

```csharp
public class Solution {
    public List<List<int>> PermuteUnique(int[] nums) {
        HashSet<string> resSet = new HashSet<string>();
        List<List<int>> result = new List<List<int>>();
        Backtrack(new List<int>(), nums, resSet, result);
        return result;
    }

    private void Backtrack(List<int> perm, int[] nums, HashSet<string> resSet, List<List<int>> result) {
        if (perm.Count == nums.Length) {
            string key = string.Join(",", perm);
            if (resSet.Add(key)) {
                result.Add(new List<int>(perm));
            }
            return;
        }

        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] != int.MinValue) {
                int temp = nums[i];
                perm.Add(temp);
                nums[i] = int.MinValue;
                Backtrack(perm, nums, resSet, result);
                nums[i] = temp;
                perm.RemoveAt(perm.Count - 1);
            }
        }
    }
}
```

```go
func permuteUnique(nums []int) [][]int {
    res := make(map[string][]int)
    perm := []int{}

    var backtrack func()
    backtrack = func() {
        if len(perm) == len(nums) {
            temp := make([]int, len(perm))
            copy(temp, perm)
            key := fmt.Sprint(temp)
            res[key] = temp
            return
        }

        for i := 0; i < len(nums); i++ {
            if nums[i] != -1001 {
                temp := nums[i]
                perm = append(perm, nums[i])
                nums[i] = -1001
                backtrack()
                nums[i] = temp
                perm = perm[:len(perm)-1]
            }
        }
    }

    backtrack()
    result := [][]int{}
    for _, v := range res {
        result = append(result, v)
    }
    return result
}
```

```kotlin
class Solution {
    fun permuteUnique(nums: IntArray): List<List<Int>> {
        val res = mutableSetOf<List<Int>>()
        val perm = mutableListOf<Int>()

        fun backtrack() {
            if (perm.size == nums.size) {
                res.add(perm.toList())
                return
            }

            for (i in nums.indices) {
                if (nums[i] != Int.MIN_VALUE) {
                    val temp = nums[i]
                    perm.add(nums[i])
                    nums[i] = Int.MIN_VALUE
                    backtrack()
                    nums[i] = temp
                    perm.removeAt(perm.size - 1)
                }
            }
        }

        backtrack()
        return res.toList()
    }
}
```

```swift
class Solution {
    func permuteUnique(_ nums: [Int]) -> [[Int]] {
        var res = Set<[Int]>()
        var nums = nums
        var perm = [Int]()

        func backtrack() {
            if perm.count == nums.count {
                res.insert(perm)
                return
            }

            for i in 0..<nums.count {
                if nums[i] != Int.min {
                    let temp = nums[i]
                    perm.append(nums[i])
                    nums[i] = Int.min
                    backtrack()
                    nums[i] = temp
                    perm.removeLast()
                }
            }
        }

        backtrack()
        return Array(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n! * n)$
- Space complexity: $O(n! * n)$ for the hash set.

---

## 2. Backtracking (Hash Map)

### Intuition

Instead of using a set to filter duplicates after the fact, we can prevent duplicates from being generated in the first place. By counting how many times each unique number appears, we only pick each distinct value once per position in the permutation.

When we decrement a count to zero, that number is no longer available for deeper recursion levels. This naturally avoids generating the same permutation multiple times.

### Algorithm

1. Build a frequency map counting occurrences of each number in `nums`.
2. Use backtracking to build permutations:
   - If the current permutation has the same length as `nums`, add a copy to the result.
   - Otherwise, iterate through each unique number in the frequency map:
     - If its count is greater than zero, add it to the permutation and decrement the count.
     - Recurse to fill the next position.
     - Increment the count back and remove the number from the permutation.
3. Return all permutations.

::tabs-start

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        res = []
        perm = []
        count = {n: 0 for n in nums}
        for num in nums:
            count[num] += 1

        def dfs():
            if len(perm) == len(nums):
                res.append(perm.copy())
                return

            for num in count:
                if count[num] > 0:
                    perm.append(num)
                    count[num] -= 1
                    dfs()
                    count[num] += 1
                    perm.pop()

        dfs()
        return res
```

```java
public class Solution {
    private Map<Integer, Integer> count;
    private List<List<Integer>> res;

    public List<List<Integer>> permuteUnique(int[] nums) {
        res = new ArrayList<>();
        count = new HashMap<>();
        List<Integer> perm = new ArrayList<>();

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        dfs(nums, perm);
        return res;
    }

    private void dfs(int[] nums, List<Integer> perm) {
        if (perm.size() == nums.length) {
            res.add(new ArrayList<>(perm));
            return;
        }

        for (int num : count.keySet()) {
            if (count.get(num) > 0) {
                perm.add(num);
                count.put(num, count.get(num) - 1);
                dfs(nums, perm);
                count.put(num, count.get(num) + 1);
                perm.remove(perm.size() - 1);
            }
        }
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
    unordered_map<int, int> count;

public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        for (int& num : nums) {
            count[num]++;
        }
        vector<int> perm;
        dfs(nums, perm);
        return res;
    }

    void dfs(vector<int>& nums, vector<int>& perm) {
        if (perm.size() == nums.size()) {
            res.push_back(perm);
            return;
        }
        for (auto& [num, cnt] : count) {
            if (cnt > 0) {
                perm.push_back(num);
                cnt--;
                dfs(nums, perm);
                cnt++;
                perm.pop_back();
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permuteUnique(nums) {
        const res = [];
        const perm = [];
        const count = {};

        for (const num of nums) {
            count[num] = (count[num] || 0) + 1;
        }

        const dfs = () => {
            if (perm.length === nums.length) {
                res.push([...perm]);
                return;
            }

            for (const num in count) {
                if (count[num] > 0) {
                    perm.push(+num);
                    count[num]--;
                    dfs();
                    count[num]++;
                    perm.pop();
                }
            }
        };

        dfs();
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> PermuteUnique(int[] nums) {
        var res = new List<List<int>>();
        var perm = new List<int>();
        var count = new Dictionary<int, int>();

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;
        }

        void Dfs() {
            if (perm.Count == nums.Length) {
                res.Add(new List<int>(perm));
                return;
            }

            foreach (var kvp in count) {
                int num = kvp.Key;
                if (count[num] > 0) {
                    perm.Add(num);
                    count[num]--;
                    Dfs();
                    count[num]++;
                    perm.RemoveAt(perm.Count - 1);
                }
            }
        }

        Dfs();
        return res;
    }
}
```

```go
func permuteUnique(nums []int) [][]int {
    res := [][]int{}
    perm := []int{}
    count := make(map[int]int)

    for _, num := range nums {
        count[num]++
    }

    var dfs func()
    dfs = func() {
        if len(perm) == len(nums) {
            temp := make([]int, len(perm))
            copy(temp, perm)
            res = append(res, temp)
            return
        }

        for num := range count {
            if count[num] > 0 {
                perm = append(perm, num)
                count[num]--
                dfs()
                count[num]++
                perm = perm[:len(perm)-1]
            }
        }
    }

    dfs()
    return res
}
```

```kotlin
class Solution {
    fun permuteUnique(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        val perm = mutableListOf<Int>()
        val count = mutableMapOf<Int, Int>()

        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
        }

        fun dfs() {
            if (perm.size == nums.size) {
                res.add(perm.toList())
                return
            }

            for (num in count.keys) {
                if (count[num]!! > 0) {
                    perm.add(num)
                    count[num] = count[num]!! - 1
                    dfs()
                    count[num] = count[num]!! + 1
                    perm.removeAt(perm.size - 1)
                }
            }
        }

        dfs()
        return res
    }
}
```

```swift
class Solution {
    func permuteUnique(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()
        var perm = [Int]()
        var count = [Int: Int]()

        for num in nums {
            count[num, default: 0] += 1
        }

        func dfs() {
            if perm.count == nums.count {
                res.append(perm)
                return
            }

            for num in count.keys {
                if count[num]! > 0 {
                    perm.append(num)
                    count[num]! -= 1
                    dfs()
                    count[num]! += 1
                    perm.removeLast()
                }
            }
        }

        dfs()
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n! * n)$
- Space complexity: $O(n! * n)$ for the output list.

---

## 3. Backtracking (Boolean Array)

### Intuition

By sorting the array first, duplicate values become adjacent. This allows us to apply a simple rule: when we encounter a duplicate, only use it if the previous identical element has already been used in the current permutation path. This ensures each unique arrangement is generated exactly once.

A boolean array tracks which indices are currently in use during backtracking.

### Algorithm

1. Sort `nums` so duplicates are adjacent.
2. Create a boolean array `visit` to track used indices.
3. Use backtracking to build permutations:
   - If the current permutation has the same length as `nums`, add a copy to the result.
   - Otherwise, iterate through each index:
     - Skip if already visited.
     - Skip if this element equals the previous one and the previous one is not visited (to avoid duplicates).
     - Mark the index as visited, add the element to the permutation, and recurse.
     - Unmark the index and remove the element from the permutation.
4. Return all permutations.

::tabs-start

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        res, n = [], len(nums)
        visit = [False] * n
        perm = []

        def dfs():
            if len(perm) == n:
                res.append(perm.copy())
                return

            for i in range(n):
                if visit[i]:
                    continue

                if i and nums[i] == nums[i - 1] and not visit[i - 1]:
                    continue
                visit[i] = True
                perm.append(nums[i])
                dfs()
                visit[i] = False
                perm.pop()

        nums.sort()
        dfs()
        return res
```

```java
public class Solution {
    private boolean[] visit;
    private List<List<Integer>> res;

    public List<List<Integer>> permuteUnique(int[] nums) {
        res = new ArrayList<>();
        visit = new boolean[nums.length];
        Arrays.sort(nums);
        List<Integer> perm = new ArrayList<>();
        dfs(nums, perm);
        return res;
    }

    private void dfs(int[] nums, List<Integer> perm) {
        if (perm.size() == nums.length) {
            res.add(new ArrayList<>(perm));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (visit[i] || (i > 0 && nums[i] == nums[i - 1] && !visit[i - 1]))
                continue;

            visit[i] = true;
            perm.add(nums[i]);
            dfs(nums, perm);
            visit[i] = false;
            perm.remove(perm.size() - 1);
        }
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
    vector<bool> visit;

public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        visit.assign(nums.size(), false);
        vector<int> perm;
        sort(nums.begin(), nums.end());
        dfs(nums, perm);
        return res;
    }

    void dfs(vector<int>& nums, vector<int>& perm) {
        if (perm.size() == nums.size()) {
            res.push_back(perm);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (visit[i] || (i > 0 && nums[i] == nums[i - 1] && !visit[i - 1]))
                continue;

            visit[i] = true;
            perm.push_back(nums[i]);
            dfs(nums, perm);
            visit[i] = false;
            perm.pop_back();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permuteUnique(nums) {
        const res = [];
        const visit = new Array(nums.length).fill(false);
        const perm = [];
        nums.sort((a, b) => a - b);

        const dfs = () => {
            if (perm.length === nums.length) {
                res.push([...perm]);
                return;
            }

            for (let i = 0; i < nums.length; i++) {
                if (
                    visit[i] ||
                    (i > 0 && nums[i] === nums[i - 1] && !visit[i - 1])
                )
                    continue;

                visit[i] = true;
                perm.push(nums[i]);
                dfs();
                visit[i] = false;
                perm.pop();
            }
        };

        dfs();
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> PermuteUnique(int[] nums) {
        var res = new List<List<int>>();
        var perm = new List<int>();
        int n = nums.Length;
        bool[] visit = new bool[n];
        Array.Sort(nums);

        void Dfs() {
            if (perm.Count == n) {
                res.Add(new List<int>(perm));
                return;
            }

            for (int i = 0; i < n; i++) {
                if (visit[i]) continue;
                if (i > 0 && nums[i] == nums[i - 1] && !visit[i - 1]) continue;

                visit[i] = true;
                perm.Add(nums[i]);
                Dfs();
                perm.RemoveAt(perm.Count - 1);
                visit[i] = false;
            }
        }

        Dfs();
        return res;
    }
}
```

```go
func permuteUnique(nums []int) [][]int {
    res := [][]int{}
    n := len(nums)
    visit := make([]bool, n)
    perm := []int{}
    sort.Ints(nums)

    var dfs func()
    dfs = func() {
        if len(perm) == n {
            temp := make([]int, len(perm))
            copy(temp, perm)
            res = append(res, temp)
            return
        }

        for i := 0; i < n; i++ {
            if visit[i] {
                continue
            }
            if i > 0 && nums[i] == nums[i-1] && !visit[i-1] {
                continue
            }

            visit[i] = true
            perm = append(perm, nums[i])
            dfs()
            visit[i] = false
            perm = perm[:len(perm)-1]
        }
    }

    dfs()
    return res
}
```

```kotlin
class Solution {
    fun permuteUnique(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        val n = nums.size
        val visit = BooleanArray(n)
        val perm = mutableListOf<Int>()
        nums.sort()

        fun dfs() {
            if (perm.size == n) {
                res.add(perm.toList())
                return
            }

            for (i in 0 until n) {
                if (visit[i]) continue
                if (i > 0 && nums[i] == nums[i - 1] && !visit[i - 1]) continue

                visit[i] = true
                perm.add(nums[i])
                dfs()
                visit[i] = false
                perm.removeAt(perm.size - 1)
            }
        }

        dfs()
        return res
    }
}
```

```swift
class Solution {
    func permuteUnique(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()
        var nums = nums.sorted()
        let n = nums.count
        var visit = [Bool](repeating: false, count: n)
        var perm = [Int]()

        func dfs() {
            if perm.count == n {
                res.append(perm)
                return
            }

            for i in 0..<n {
                if visit[i] {
                    continue
                }
                if i > 0 && nums[i] == nums[i - 1] && !visit[i - 1] {
                    continue
                }

                visit[i] = true
                perm.append(nums[i])
                dfs()
                visit[i] = false
                perm.removeLast()
            }
        }

        dfs()
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n! * n)$
- Space complexity: $O(n! * n)$ for the output list.

---

## 4. Backtracking (Optimal)

### Intuition

This approach generates permutations by swapping elements in place rather than building a separate permutation array. At each position `i`, we try placing each element from index `i` onward. By sorting first and skipping swaps that would place a duplicate value at position `i`, we avoid generating duplicate permutations.

After each recursive call, we restore the array to its sorted state for position `i` by reverse-swapping all elements back.

### Algorithm

1. Sort `nums` so duplicates are adjacent.
2. Use backtracking starting at index 0:
   - If index `i` equals the length of `nums`, add a copy of `nums` to the result.
   - Otherwise, for each index `j` from `i` to the end:
     - Skip if `j > i` and `nums[j]` equals `nums[i]` (duplicate at this position).
     - Swap `nums[i]` and `nums[j]`, then recurse with `i + 1`.
   - After the loop, restore the array by reverse-swapping elements back from the end to `i + 1`.
3. Return all permutations.

::tabs-start

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        res = []

        def dfs(i):
            if i == len(nums):
                res.append(nums.copy())
                return

            for j in range(i, len(nums)):
                if j > i and nums[i] == nums[j]:
                    continue

                nums[i], nums[j] = nums[j], nums[i]
                dfs(i + 1)

            for j in range(len(nums) - 1, i, -1):
                nums[j], nums[i] = nums[i], nums[j]

        nums.sort()
        dfs(0)
        return res
```

```java
public class Solution {
    private List<List<Integer>> res;

    public List<List<Integer>> permuteUnique(int[] nums) {
        res = new ArrayList<>();
        Arrays.sort(nums);
        dfs(0, nums);
        return res;
    }

    private void dfs(int i, int[] nums) {
        if (i == nums.length) {
            List<Integer> temp = new ArrayList<>();
            for (int num : nums) temp.add(num);
            res.add(temp);
            return;
        }

        for (int j = i; j < nums.length; j++) {
            if (j > i && nums[j] == nums[i]) continue;
            swap(nums, i, j);
            dfs(i + 1, nums);
        }

        for (int j = nums.length - 1; j > i; j--) {
            swap(nums, i, j);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;

public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        dfs(0, nums);
        return res;
    }

    void dfs(int i, vector<int>& nums) {
        if (i == nums.size()) {
            res.push_back(nums);
            return;
        }

        for (int j = i; j < nums.size(); ++j) {
            if (j > i && nums[j] == nums[i]) continue;
            swap(nums[i], nums[j]);
            dfs(i + 1, nums);
        }

        for (int j = nums.size() - 1; j > i; --j) {
            swap(nums[i], nums[j]);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permuteUnique(nums) {
        const res = [];
        nums.sort((a, b) => a - b);

        const dfs = (i) => {
            if (i === nums.length) {
                res.push([...nums]);
                return;
            }

            for (let j = i; j < nums.length; j++) {
                if (j > i && nums[j] === nums[i]) continue;
                [nums[i], nums[j]] = [nums[j], nums[i]];
                dfs(i + 1);
            }

            for (let j = nums.length - 1; j > i; j--) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
            }
        };

        dfs(0);
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> PermuteUnique(int[] nums) {
        var res = new List<List<int>>();
        Array.Sort(nums);
        Dfs(0);
        return res;

        void Dfs(int i) {
            if (i == nums.Length) {
                res.Add(new List<int>(nums));
                return;
            }

            for (int j = i; j < nums.Length; j++) {
                if (j > i && nums[j] == nums[i]) continue;

                Swap(i, j);
                Dfs(i + 1);
            }

            for (int j = nums.Length - 1; j > i; j--) {
                Swap(i, j);
            }
        }

        void Swap(int a, int b) {
            int temp = nums[a];
            nums[a] = nums[b];
            nums[b] = temp;
        }
    }
}
```

```go
func permuteUnique(nums []int) [][]int {
    res := [][]int{}
    sort.Ints(nums)

    var dfs func(i int)
    dfs = func(i int) {
        if i == len(nums) {
            temp := make([]int, len(nums))
            copy(temp, nums)
            res = append(res, temp)
            return
        }

        for j := i; j < len(nums); j++ {
            if j > i && nums[j] == nums[i] {
                continue
            }
            nums[i], nums[j] = nums[j], nums[i]
            dfs(i + 1)
        }

        for j := len(nums) - 1; j > i; j-- {
            nums[i], nums[j] = nums[j], nums[i]
        }
    }

    dfs(0)
    return res
}
```

```kotlin
class Solution {
    fun permuteUnique(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        nums.sort()

        fun dfs(i: Int) {
            if (i == nums.size) {
                res.add(nums.toList())
                return
            }

            for (j in i until nums.size) {
                if (j > i && nums[j] == nums[i]) continue
                nums[i] = nums[j].also { nums[j] = nums[i] }
                dfs(i + 1)
            }

            for (j in nums.size - 1 downTo i + 1) {
                nums[i] = nums[j].also { nums[j] = nums[i] }
            }
        }

        dfs(0)
        return res
    }
}
```

```swift
class Solution {
    func permuteUnique(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()
        var nums = nums.sorted()

        func dfs(_ i: Int) {
            if i == nums.count {
                res.append(nums)
                return
            }

            for j in i..<nums.count {
                if j > i && nums[j] == nums[i] {
                    continue
                }
                nums.swapAt(i, j)
                dfs(i + 1)
            }

            for j in stride(from: nums.count - 1, to: i, by: -1) {
                nums.swapAt(i, j)
            }
        }

        dfs(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n! * n)$
- Space complexity: $O(n! * n)$ for the output list.

---

## 5. Iteration

### Intuition

This approach uses the "next permutation" algorithm to iterate through all permutations in lexicographic order. Starting from the smallest permutation (sorted array), we repeatedly find the next lexicographically larger permutation until we cycle back to the beginning.

Since we generate permutations in strict order, duplicates in the input naturally produce unique permutations without extra handling.

### Algorithm

1. Sort `nums` to get the lexicographically smallest permutation.
2. Add a copy of `nums` to the result.
3. Repeat until we return to the starting permutation:
   - Find the largest index `i` such that `nums[i] < nums[i + 1]`. If no such index exists, we have the last permutation.
   - Find the largest index `j` such that `nums[j] > nums[i]`.
   - Swap `nums[i]` and `nums[j]`.
   - Reverse the subarray from `i + 1` to the end.
   - Add a copy of `nums` to the result.
4. Return all permutations.

::tabs-start

```python
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        nums.sort()
        res = [nums.copy()]

        while True:
            i = n - 2
            while i >= 0 and nums[i] >= nums[i + 1]:
                i -= 1

            if i < 0:
                break

            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]

            l, r = i + 1, n - 1
            while l < r:
                nums[l], nums[r] = nums[r], nums[l]
                l, r = l + 1, r - 1

            res.append(nums.copy())

        return res
```

```java
public class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        res.add(toList(nums));

        while (true) {
            int i = n - 2;
            while (i >= 0 && nums[i] >= nums[i + 1]) i--;

            if (i < 0) break;

            int j = n - 1;
            while (nums[j] <= nums[i]) j--;

            swap(nums, i, j);
            reverse(nums, i + 1, n - 1);
            res.add(toList(nums));
        }

        return res;
    }

    private void reverse(int[] nums, int l, int r) {
        while (l < r) {
            swap(nums, l++, r--);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    private List<Integer> toList(int[] nums) {
        List<Integer> list = new ArrayList<>();
        for (int num : nums) list.add(num);
        return list;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        vector<vector<int>> res = {nums};

        while (true) {
            int i = n - 2;
            while (i >= 0 && nums[i] >= nums[i + 1]) i--;

            if (i < 0) break;

            int j = n - 1;
            while (nums[j] <= nums[i]) j--;

            swap(nums[i], nums[j]);
            reverse(nums.begin() + i + 1, nums.end());
            res.push_back(nums);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permuteUnique(nums) {
        const n = nums.length;
        nums.sort((a, b) => a - b);
        const res = [nums.slice()];

        while (true) {
            let i = n - 2;
            while (i >= 0 && nums[i] >= nums[i + 1]) i--;

            if (i < 0) break;

            let j = n - 1;
            while (nums[j] <= nums[i]) j--;

            [nums[i], nums[j]] = [nums[j], nums[i]];

            let l = i + 1,
                r = n - 1;
            while (l < r) {
                [nums[l], nums[r]] = [nums[r], nums[l]];
                l++;
                r--;
            }

            res.push(nums.slice());
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> PermuteUnique(int[] nums) {
        int n = nums.Length;
        Array.Sort(nums);
        var res = new List<List<int>>();
        res.Add(new List<int>(nums));

        while (true) {
            int i = n - 2;
            while (i >= 0 && nums[i] >= nums[i + 1]) {
                i--;
            }

            if (i < 0) break;

            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }

            Swap(nums, i, j);

            int left = i + 1, right = n - 1;
            while (left < right) {
                Swap(nums, left++, right--);
            }

            res.Add(new List<int>(nums));
        }

        return res;
    }

    private void Swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```go
func permuteUnique(nums []int) [][]int {
    n := len(nums)
    sort.Ints(nums)
    res := [][]int{}
    temp := make([]int, n)
    copy(temp, nums)
    res = append(res, temp)

    for {
        i := n - 2
        for i >= 0 && nums[i] >= nums[i+1] {
            i--
        }

        if i < 0 {
            break
        }

        j := n - 1
        for nums[j] <= nums[i] {
            j--
        }

        nums[i], nums[j] = nums[j], nums[i]

        l, r := i+1, n-1
        for l < r {
            nums[l], nums[r] = nums[r], nums[l]
            l++
            r--
        }

        temp := make([]int, n)
        copy(temp, nums)
        res = append(res, temp)
    }

    return res
}
```

```kotlin
class Solution {
    fun permuteUnique(nums: IntArray): List<List<Int>> {
        val n = nums.size
        nums.sort()
        val res = mutableListOf(nums.toList())

        while (true) {
            var i = n - 2
            while (i >= 0 && nums[i] >= nums[i + 1]) {
                i--
            }

            if (i < 0) break

            var j = n - 1
            while (nums[j] <= nums[i]) {
                j--
            }

            nums[i] = nums[j].also { nums[j] = nums[i] }

            var l = i + 1
            var r = n - 1
            while (l < r) {
                nums[l] = nums[r].also { nums[r] = nums[l] }
                l++
                r--
            }

            res.add(nums.toList())
        }

        return res
    }
}
```

```swift
class Solution {
    func permuteUnique(_ nums: [Int]) -> [[Int]] {
        var nums = nums.sorted()
        let n = nums.count
        var res = [nums]

        while true {
            var i = n - 2
            while i >= 0 && nums[i] >= nums[i + 1] {
                i -= 1
            }

            if i < 0 {
                break
            }

            var j = n - 1
            while nums[j] <= nums[i] {
                j -= 1
            }

            nums.swapAt(i, j)

            var l = i + 1
            var r = n - 1
            while l < r {
                nums.swapAt(l, r)
                l += 1
                r -= 1
            }

            res.append(nums)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n! * n)$
- Space complexity: $O(n! * n)$ for the output list.
