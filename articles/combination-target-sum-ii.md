## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Backtracking** - Exploring choices by including/excluding elements and undoing decisions when needed
- **Recursion** - Building combinations by making decisions at each index in the array
- **Sorting** - Arranging elements to group duplicates together for efficient skip logic
- **Handling duplicates** - Skipping repeated elements at the same recursion level to avoid duplicate combinations

---

## 1. Brute Force

### Intuition

The brute-force approach tries **every possible subset** of the candidate numbers.

- We sort the array so duplicate combinations appear in the same order.
- At each index, we have two choices:
  1. **Include** the current number.
  2. **Skip** the current number.
- This produces all subsets (like a binary tree of choices).
- Whenever a subset’s sum equals the target, we store it.
- To avoid duplicate combinations, we store each result as a **tuple in a set**.

This method is easy to understand but slow because it explores *all* subsets, even invalid or duplicate ones.

### Algorithm

1. **Sort** the array to keep combinations in consistent order.
2. Use a recursive function
   `dfs(i, currentList, total)`:
   - If `total == target`, add the tuple version of `currentList` to a set.
   - If `total > target` or `i == len(candidates)`, stop exploring.
3. At each index `i`:
   - **Include** the current number:
     - Add it to `currentList`, recurse with `i + 1`, then remove it.
   - **Exclude** the current number:
     - Recurse with `i + 1`.
4. After recursion finishes, convert all unique tuples in the set into lists and return them.

::tabs-start

```python
class Solution:
    def combinationSum2(self, candidates, target):
        res = set()
        candidates.sort()

        def generate_subsets(i, cur, total):
            if total == target:
                res.add(tuple(cur))
                return
            if total > target or i == len(candidates):
                return

            cur.append(candidates[i])
            generate_subsets(i + 1, cur, total + candidates[i])
            cur.pop()

            generate_subsets(i + 1, cur, total)

        generate_subsets(0, [], 0)
        return [list(combination) for combination in res]
```

```java
public class Solution {
    private Set<List<Integer>> res;

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        res = new HashSet<>();
        Arrays.sort(candidates);
        generateSubsets(candidates, target, 0, new ArrayList<>(), 0);
        return new ArrayList<>(res);
    }

    private void generateSubsets(int[] candidates, int target, int i, List<Integer> cur, int total) {
        if (total == target) {
            res.add(new ArrayList<>(cur));
            return;
        }
        if (total > target || i == candidates.length) {
            return;
        }

        cur.add(candidates[i]);
        generateSubsets(candidates, target, i + 1, cur, total + candidates[i]);
        cur.remove(cur.size() - 1);

        generateSubsets(candidates, target, i + 1, cur, total);
    }
}
```

```cpp
class Solution {
public:
    set<vector<int>> res;

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        res.clear();
        sort(candidates.begin(), candidates.end());
        vector<int> cur;
        generateSubsets(candidates, target, 0, cur, 0);
        return vector<vector<int>>(res.begin(), res.end());
    }

private:
    void generateSubsets(vector<int>& candidates, int target, int i, vector<int>& cur, int total) {
        if (total == target) {
            res.insert(cur);
            return;
        }
        if (total > target || i == candidates.size()) {
            return;
        }

        cur.push_back(candidates[i]);
        generateSubsets(candidates, target, i + 1, cur, total + candidates[i]);
        cur.pop_back();

        generateSubsets(candidates, target, i + 1, cur, total);
    }
};
```

```javascript
class Solution {
    constructor() {
        this.res = new Set();
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        this.res.clear();
        candidates.sort((a, b) => a - b);
        this.generateSubsets(candidates, target, 0, [], 0);
        return Array.from(this.res, (subset) => JSON.parse(subset));
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @param {number} i
     * @param {number[]} cur
     * @param {number} total
     * @return {void}
     */
    generateSubsets(candidates, target, i, cur, total) {
        if (total === target) {
            this.res.add(JSON.stringify([...cur]));
            return;
        }
        if (total > target || i === candidates.length) {
            return;
        }

        cur.push(candidates[i]);
        this.generateSubsets(
            candidates,
            target,
            i + 1,
            cur,
            total + candidates[i],
        );
        cur.pop();

        this.generateSubsets(candidates, target, i + 1, cur, total);
    }
}
```

```csharp
public class Solution {
    private HashSet<string> res;

    public List<List<int>> CombinationSum2(int[] candidates, int target) {
        res = new HashSet<string>();
        Array.Sort(candidates);
        GenerateSubsets(candidates, target, 0, new List<int>(), 0);
        return res.Select(s => s.Split(',').Select(int.Parse).ToList()).ToList();
    }

    private void GenerateSubsets(int[] candidates, int target, int i, List<int> cur, int total) {
        if (total == target) {
            res.Add(string.Join(",", cur));
            return;
        }
        if (total > target || i == candidates.Length) {
            return;
        }

        cur.Add(candidates[i]);
        GenerateSubsets(candidates, target, i + 1, cur, total + candidates[i]);
        cur.RemoveAt(cur.Count - 1);

        GenerateSubsets(candidates, target, i + 1, cur, total);
    }
}
```

```go
func combinationSum2(candidates []int, target int) [][]int {
    res := make(map[string][]int)
    var results [][]int
    sort.Ints(candidates)

    var generateSubsets func(int, []int, int)
    generateSubsets = func(i int, cur []int, total int) {
        if total == target {
            key := fmt.Sprint(cur)
            if _, found := res[key]; !found {
                res[key] = append([]int{}, cur...)
                results = append(results, res[key])
            }
            return
        }
        if total > target || i == len(candidates) {
            return
        }

        generateSubsets(i+1, append(cur, candidates[i]), total+candidates[i])
        generateSubsets(i+1, cur, total)
    }

    generateSubsets(0, []int{}, 0)
    return results
}
```

```kotlin
class Solution {
    fun combinationSum2(candidates: IntArray, target: Int): List<List<Int>> {
        val res = HashSet<List<Int>>()
        candidates.sort()

        fun generateSubsets(i: Int, cur: MutableList<Int>, total: Int) {
            if (total == target) {
                res.add(ArrayList(cur))
                return
            }
            if (total > target || i == candidates.size) {
                return
            }

            cur.add(candidates[i])
            generateSubsets(i + 1, cur, total + candidates[i])
            cur.removeAt(cur.size - 1)

            generateSubsets(i + 1, cur, total)
        }

        generateSubsets(0, mutableListOf(), 0)
        return res.toList()
    }
}
```

```swift
class Solution {
    func combinationSum2(_ candidates: [Int], _ target: Int) -> [[Int]] {
        var res = Set<[Int]>()
        let sortedCandidates = candidates.sorted()

        func generateSubsets(_ i: Int, _ cur: inout [Int], _ total: Int) {
            if total == target {
                res.insert(cur)
                return
            }
            if total > target || i == sortedCandidates.count {
                return
            }

            cur.append(sortedCandidates[i])
            generateSubsets(i + 1, &cur, total + sortedCandidates[i])
            cur.removeLast()

            generateSubsets(i + 1, &cur, total)
        }

        var cur: [Int] = []
        generateSubsets(0, &cur, 0)
        return Array(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n * 2 ^ n)$

---

## 2. Backtracking

### Intuition

The goal is to choose numbers that sum to the target, but each number can be used **once**, and the list may contain **duplicates**.  
To avoid generating duplicate combinations, we:

1. **Sort the array** so duplicates appear next to each other.
2. Use **backtracking** to explore choices:
   - Take the current number.
   - Skip the current number.
3. When skipping, we **skip all duplicates in one jump** to avoid creating duplicate combinations like `[1,2,2]` multiple times.
4. If the running total exceeds the target, we stop exploring the current path early.

Sorting + skipping duplicates + backtracking ensures we only build valid and unique combinations.

### Algorithm

1. Sort `candidates`.
2. Use a recursive function `dfs(i, cur, total)`:
   - If `total == target`, add a copy of `cur` to the result.
   - If `total > target` or `i == len(candidates)`, stop exploring.
3. **Include** the current number:
   - Add `candidates[i]` to `cur`.
   - Recurse with next index `i + 1`.
   - Remove the number (backtrack).
4. **Skip duplicates**:
   - Advance index `i` forward while the next number is the same.
5. **Exclude** the current number:
   - Call `dfs(i + 1, cur, total)` after skipping duplicates.
6. Return the result list.

::tabs-start

```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        candidates.sort()

        def dfs(i, cur, total):
            if total == target:
                res.append(cur.copy())
                return
            if total > target or i == len(candidates):
                return

            cur.append(candidates[i])
            dfs(i + 1, cur, total + candidates[i])
            cur.pop()


            while i + 1 < len(candidates) and candidates[i] == candidates[i+1]:
                i += 1
            dfs(i + 1, cur, total)

        dfs(0, [], 0)
        return res
```

```java
public class Solution {
    private List<List<Integer>> res;

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        res = new ArrayList<>();
        Arrays.sort(candidates);
        dfs(candidates, target, 0, new ArrayList<>(), 0);
        return res;
    }

    private void dfs(int[] candidates, int target, int i, List<Integer> cur, int total) {
        if (total == target) {
            res.add(new ArrayList<>(cur));
            return;
        }
        if (total > target || i == candidates.length) {
            return;
        }

        cur.add(candidates[i]);
        dfs(candidates, target, i + 1, cur, total + candidates[i]);
        cur.remove(cur.size() - 1);

        while (i + 1 < candidates.length && candidates[i] == candidates[i + 1]) {
            i++;
        }
        dfs(candidates, target, i + 1, cur, total);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        res.clear();
        sort(candidates.begin(), candidates.end());
        vector<int> cur;
        dfs(candidates, target, 0, cur, 0);
        return res;
    }

private:
    void dfs(vector<int>& candidates, int target, int i, vector<int>& cur, int total) {
        if (total == target) {
            res.push_back(cur);
            return;
        }
        if (total > target || i == candidates.size()) {
            return;
        }

        cur.push_back(candidates[i]);
        dfs(candidates, target, i + 1, cur, total + candidates[i]);
        cur.pop_back();

        while (i + 1 < candidates.size() && candidates[i] == candidates[i + 1]) {
            i++;
        }
        dfs(candidates, target, i + 1, cur, total);
    }
};
```

```javascript
class Solution {
    constructor() {
        this.res = [];
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        this.res = [];
        candidates.sort((a, b) => a - b);
        this.dfs(candidates, target, 0, [], 0);
        return this.res;
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @param {number} i
     * @param {number[]} cur
     * @param {number} total
     * @return {void}
     */
    dfs(candidates, target, i, cur, total) {
        if (total === target) {
            this.res.push([...cur]);
            return;
        }
        if (total > target || i === candidates.length) {
            return;
        }

        cur.push(candidates[i]);
        this.dfs(candidates, target, i + 1, cur, total + candidates[i]);
        cur.pop();

        while (
            i + 1 < candidates.length &&
            candidates[i] === candidates[i + 1]
        ) {
            i++;
        }
        this.dfs(candidates, target, i + 1, cur, total);
    }
}
```

```csharp
public class Solution {
    private List<List<int>> res;

    public List<List<int>> CombinationSum2(int[] candidates, int target) {
        res = new List<List<int>>();
        Array.Sort(candidates);
        Dfs(candidates, target, 0, new List<int>(), 0);
        return res;
    }

    private void Dfs(int[] candidates, int target, int i, List<int> cur, int total) {
        if (total == target) {
            res.Add(new List<int>(cur));
            return;
        }
        if (total > target || i == candidates.Length) {
            return;
        }

        cur.Add(candidates[i]);
        Dfs(candidates, target, i + 1, cur, total + candidates[i]);
        cur.RemoveAt(cur.Count - 1);

        while (i + 1 < candidates.Length && candidates[i] == candidates[i + 1]) {
            i++;
        }
        Dfs(candidates, target, i + 1, cur, total);
    }
}
```

```go
func combinationSum2(candidates []int, target int) [][]int {
    res := [][]int{}
    sort.Ints(candidates)

    var dfs func(int, []int, int)
    dfs = func(i int, cur []int, total int) {
        if total == target {
            temp := make([]int, len(cur))
            copy(temp, cur)
            res = append(res, temp)
            return
        }
        if total > target || i == len(candidates) {
            return
        }

        cur = append(cur, candidates[i])
        dfs(i+1, cur, total+candidates[i])
        cur = cur[:len(cur)-1]

        for i+1 < len(candidates) && candidates[i] == candidates[i+1] {
            i++
        }
        dfs(i+1, cur, total)
    }

    dfs(0, []int{}, 0)
    return res
}
```

```kotlin
class Solution {
    fun combinationSum2(candidates: IntArray, target: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        candidates.sort()

        fun dfs(i: Int, cur: MutableList<Int>, total: Int) {
            if (total == target) {
                res.add(ArrayList(cur))
                return
            }
            if (total > target || i == candidates.size) {
                return
            }

            cur.add(candidates[i])
            dfs(i + 1, cur, total + candidates[i])
            cur.removeAt(cur.size - 1)

            var next = i + 1
            while (next < candidates.size && candidates[next] == candidates[i]) {
                next++
            }
            dfs(next, cur, total)
        }

        dfs(0, mutableListOf(), 0)
        return res
    }
}
```

```swift
class Solution {
    func combinationSum2(_ candidates: [Int], _ target: Int) -> [[Int]] {
        var res = [[Int]]()
        let sortedCandidates = candidates.sorted()

        func dfs(_ i: Int, _ cur: inout [Int], _ total: Int) {
            if total == target {
                res.append(cur)
                return
            }
            if total > target || i == sortedCandidates.count {
                return
            }

            cur.append(sortedCandidates[i])
            dfs(i + 1, &cur, total + sortedCandidates[i])
            cur.removeLast()

            var j = i
            while j + 1 < sortedCandidates.count && sortedCandidates[j] == sortedCandidates[j + 1] {
                j += 1
            }
            dfs(j + 1, &cur, total)
        }

        var cur: [Int] = []
        dfs(0, &cur, 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^n)$
- Space complexity: $O(n)$

---

## 3. Backtracking (Hash Map)

### Intuition

Instead of sorting and skipping duplicates, this method uses a **frequency map** that stores how many times each number appears.  
Example:  
If input is `[1,1,2,2,2,3]`, we convert it into:

- Unique list: `[1, 2, 3]`
- Count map: `{1: 2, 2: 3, 3: 1}`

Now each number can be chosen **up to its allowed count**, and we explore combinations using backtracking.  
This avoids duplicates because we never pick the same number more times than it appears.

At each index `i` (pointing to unique numbers):

- **Option 1: Take the number**  
  If its count is still > 0, we include it and reduce the count.
- **Option 2: Skip the number**  
  Move to next index.

We stop exploring a path when:

- `target == 0` → we found a valid combination
- `target < 0` or `i == len(nums)` → invalid path

This ensures we explore all valid combinations while preventing duplicates naturally.

### Algorithm

1. Build a **frequency map** (`count[num]++`) for all numbers.
2. Build a list of **unique numbers** (`A`).
3. Use backtracking function `backtrack(i, target, cur)`:
   - If `target == 0`, add `cur` to the result.
   - If `target < 0` or `i` is out of bounds, return.
4. **Include `nums[i]`** if available in frequency map:
   - Append number to `cur`
   - Decrease count
   - Recurse with same index `i` (because duplicates allowed up to frequency)
   - Backtrack by restoring count and removing number
5. **Exclude `nums[i]`**:
   - Move to `i + 1`

::tabs-start

```python
class Solution:
    def combinationSum2(self, nums, target):
        self.res = []
        self.count = defaultdict(int)
        cur = []
        A = []

        for num in nums:
            if self.count[num] == 0:
                A.append(num)
            self.count[num] += 1
        self.backtrack(A, target, cur, 0)
        return self.res

    def backtrack(self, nums, target, cur, i):
        if target == 0:
            self.res.append(cur.copy())
            return
        if target < 0 or i >= len(nums):
            return

        if self.count[nums[i]] > 0:
            cur.append(nums[i])
            self.count[nums[i]] -= 1
            self.backtrack(nums, target - nums[i], cur, i)
            self.count[nums[i]] += 1
            cur.pop()

        self.backtrack(nums, target, cur, i + 1)
```

```java
public class Solution {
    List<List<Integer>> res = new ArrayList<>();
    Map<Integer, Integer> count = new HashMap<>();

    public List<List<Integer>> combinationSum2(int[] nums, int target) {
        List<Integer> cur = new ArrayList<>();
        List<Integer> A = new ArrayList<>();

        for (int num : nums) {
            if (!count.containsKey(num)) {
                A.add(num);
            }
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        backtrack(A, target, cur, 0);
        return res;
    }

    private void backtrack(List<Integer> nums, int target, List<Integer> cur, int i) {
        if (target == 0) {
            res.add(new ArrayList<>(cur));
            return;
        }
        if (target < 0 || i >= nums.size()) {
            return;
        }

        if (count.get(nums.get(i)) > 0) {
            cur.add(nums.get(i));
            count.put(nums.get(i), count.get(nums.get(i)) - 1);
            backtrack(nums, target - nums.get(i), cur, i);
            count.put(nums.get(i), count.get(nums.get(i)) + 1);
            cur.remove(cur.size() - 1);
        }

        backtrack(nums, target, cur, i + 1);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;
    unordered_map<int, int> count;
    vector<vector<int>> combinationSum2(vector<int>& nums, int target) {
        vector<int> cur;
        vector<int> A;
        for (int num : nums) {
            if (!count[num]) {
                A.push_back(num);
            }
            count[num]++;
        }
        backtrack(A, target, cur, 0);
        return res;
    }

    void backtrack(vector<int>& nums, int target, vector<int>& cur, int i) {
        if (target == 0) {
            res.push_back(cur);
            return;
        }
        if (target < 0 || i >= nums.size()) {
            return;
        }

        if (count[nums[i]]) {
            cur.push_back(nums[i]);
            count[nums[i]]--;
            backtrack(nums, target - nums[i], cur, i);
            count[nums[i]]++;
            cur.pop_back();
        }

        backtrack(nums, target, cur, i + 1);
    }
};
```

```javascript
class Solution {
    constructor() {
        this.res = [];
        this.count = new Map();
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(nums, target) {
        const cur = [];
        const A = [];

        for (const num of nums) {
            if (!this.count.has(num)) {
                A.push(num);
            }
            this.count.set(num, (this.count.get(num) || 0) + 1);
        }
        this.backtrack(A, target, cur, 0);
        return this.res;
    }

    /**
     * @param {number[]} nums
     * @param {number} target
     * @param {number[]} cur
     * @param {number} i
     * @return {void}
     */
    backtrack(nums, target, cur, i) {
        if (target === 0) {
            this.res.push([...cur]);
            return;
        }
        if (target < 0 || i >= nums.length) {
            return;
        }

        if (this.count.get(nums[i]) > 0) {
            cur.push(nums[i]);
            this.count.set(nums[i], this.count.get(nums[i]) - 1);
            this.backtrack(nums, target - nums[i], cur, i);
            this.count.set(nums[i], this.count.get(nums[i]) + 1);
            cur.pop();
        }

        this.backtrack(nums, target, cur, i + 1);
    }
}
```

```csharp
public class Solution {
    public List<List<int>> res = new List<List<int>>();
    public Dictionary<int, int> count = new Dictionary<int, int>();

    public List<List<int>> CombinationSum2(int[] nums, int target) {
        List<int> cur = new List<int>();
        List<int> A = new List<int>();

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                A.Add(num);
            }
            if (count.ContainsKey(num)) {
                count[num]++;
            } else {
                count[num] = 1;
            }
        }
        Backtrack(A, target, cur, 0);
        return res;
    }

    private void Backtrack(List<int> nums, int target, List<int> cur, int i) {
        if (target == 0) {
            res.Add(new List<int>(cur));
            return;
        }
        if (target < 0 || i >= nums.Count) {
            return;
        }

        if (count[nums[i]] > 0) {
            cur.Add(nums[i]);
            count[nums[i]]--;
            Backtrack(nums, target - nums[i], cur, i);
            count[nums[i]]++;
            cur.RemoveAt(cur.Count - 1);
        }

        Backtrack(nums, target, cur, i + 1);
    }
}
```

```go
func combinationSum2(nums []int, target int) [][]int {
    res := [][]int{}
    count := map[int]int{}
    uniqueNums := []int{}
    for _, num := range nums {
        if count[num] == 0 {
            uniqueNums = append(uniqueNums, num)
        }
        count[num]++
    }
    sort.Ints(uniqueNums)

    var backtrack func(int, int, []int)
    backtrack = func(target int, i int, cur []int) {
        if target == 0 {
            temp := make([]int, len(cur))
            copy(temp, cur)
            res = append(res, temp)
            return
        }
        if target < 0 || i >= len(uniqueNums) {
            return
        }

        if count[uniqueNums[i]] > 0 {
            cur = append(cur, uniqueNums[i])
            count[uniqueNums[i]]--
            backtrack(target-uniqueNums[i], i, cur)
            count[uniqueNums[i]]++
            cur = cur[:len(cur)-1]
        }

        backtrack(target, i+1, cur)
    }

    backtrack(target, 0, []int{})
    return res
}
```

```kotlin
class Solution {
    private val res = mutableListOf<List<Int>>()
    private val count = HashMap<Int, Int>()

    fun combinationSum2(nums: IntArray, target: Int): List<List<Int>> {
        val uniqueNums = mutableListOf<Int>()
        for (num in nums) {
            count[num] = count.getOrDefault(num, 0) + 1
            if (count[num] == 1) {
                uniqueNums.add(num)
            }
        }
        uniqueNums.sort()

        backtrack(uniqueNums, target, mutableListOf(), 0)
        return res
    }

    fun backtrack(nums: List<Int>, target: Int, cur: MutableList<Int>, i: Int) {
        if (target == 0) {
            res.add(ArrayList(cur))
            return
        }
        if (target < 0 || i >= nums.size) {
            return
        }

        if (count[nums[i]] ?: 0 > 0) {
            cur.add(nums[i])
            count[nums[i]] = count[nums[i]]!! - 1
            backtrack(nums, target - nums[i], cur, i)
            count[nums[i]] = count[nums[i]]!! + 1
            cur.removeAt(cur.size - 1)
        }

        backtrack(nums, target, cur, i + 1)
    }
}
```

```swift
class Solution {
    func combinationSum2(_ nums: [Int], _ target: Int) -> [[Int]] {
        var res = [[Int]]()
        var count = [Int: Int]()
        var uniqueNums = [Int]()

        for num in nums {
            if count[num] == nil {
                uniqueNums.append(num)
            }
            count[num, default: 0] += 1
        }

        func backtrack(_ nums: [Int], _ target: Int, _ cur: inout [Int], _ i: Int) {
            if target == 0 {
                res.append(cur)
                return
            }
            if target < 0 || i >= nums.count {
                return
            }

            if count[nums[i], default: 0] > 0 {
                cur.append(nums[i])
                count[nums[i], default: 0] -= 1
                backtrack(nums, target - nums[i], &cur, i)
                count[nums[i], default: 0] += 1
                cur.removeLast()
            }

            backtrack(nums, target, &cur, i + 1)
        }

        var cur: [Int] = []
        backtrack(uniqueNums, target, &cur, 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$

---

## 4. Backtracking (Optimal)

### Intuition

We need all unique combinations where each number can be used **at most once**, and duplicates in the input should not create duplicate combinations.

To handle duplicates safely, we:

1. **Sort the array**
   This groups equal numbers together, which helps us skip duplicates easily.

2. Use **backtracking** where at each index we decide:
   - Take the number
   - Skip the number

3. To avoid duplicate combinations:
   - If `candidates[i] == candidates[i - 1]` and we are still in the same level of recursion (`i > idx`),
     we **skip** that number.

4. We stop early if `current_sum + candidates[i] > target` because the list is sorted.

This approach explores each number only once per combination path and guarantees no repeated results.

### Algorithm

1. Sort the candidates.
2. Define a DFS function `dfs(idx, path, curSum)`:
   - If `curSum == target`, add a copy of `path` to the result.
   - Loop `i` from `idx` to end:
     - If `i > idx` and the current number equals the previous → skip (duplicate control).
     - If adding this number exceeds `target` → break (pruning).
     - Include the number and recurse with `i + 1` (cannot reuse same element).
     - Backtrack by removing the last number.
3. Call `dfs(0, [], 0)` and return the result.

::tabs-start

```python
class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        res = []
        candidates.sort()

        def dfs(idx, path, cur):
            if cur == target:
                res.append(path.copy())
                return
            for i in range(idx, len(candidates)):
                if i > idx and candidates[i] == candidates[i - 1]:
                    continue
                if cur + candidates[i] > target:
                    break

                path.append(candidates[i])
                dfs(i + 1, path, cur + candidates[i])
                path.pop()

        dfs(0, [], 0)
        return res
```

```java
public class Solution {
    private static List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        res.clear();
        Arrays.sort(candidates);
        dfs(0, new ArrayList<>(), 0, candidates, target);
        return res;
    }

    private static void dfs(int idx, List<Integer> path, int cur, int[] candidates, int target) {
        if (cur == target) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = idx; i < candidates.length; i++) {
            if (i > idx && candidates[i] == candidates[i - 1]) {
                continue;
            }
            if (cur + candidates[i] > target) {
                break;
            }

            path.add(candidates[i]);
            dfs(i + 1, path, cur + candidates[i], candidates, target);
            path.remove(path.size() - 1);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        res.clear();
        sort(candidates.begin(), candidates.end());
        dfs(0, {}, 0, candidates, target);
        return res;
    }

private:
    void dfs(int idx, vector<int> path, int cur, vector<int>& candidates, int target) {
        if (cur == target) {
            res.push_back(path);
            return;
        }
        for (int i = idx; i < candidates.size(); i++) {
            if (i > idx && candidates[i] == candidates[i - 1]) {
                continue;
            }
            if (cur + candidates[i] > target) {
                break;
            }

            path.push_back(candidates[i]);
            dfs(i + 1, path, cur + candidates[i], candidates, target);
            path.pop_back();
        }
    }
};
```

```javascript
class Solution {
    constructor() {
        this.res = [];
    }

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2(candidates, target) {
        this.res = [];
        candidates.sort((a, b) => a - b);

        const dfs = (idx, path, cur) => {
            if (cur === target) {
                this.res.push([...path]);
                return;
            }
            for (let i = idx; i < candidates.length; i++) {
                if (i > idx && candidates[i] === candidates[i - 1]) {
                    continue;
                }
                if (cur + candidates[i] > target) {
                    break;
                }

                path.push(candidates[i]);
                dfs(i + 1, path, cur + candidates[i]);
                path.pop();
            }
        };

        dfs(0, [], 0);
        return this.res;
    }
}
```

```csharp
public class Solution {
    private static List<List<int>> res = new List<List<int>>();

    public List<List<int>> CombinationSum2(int[] candidates, int target) {
        res.Clear();
        Array.Sort(candidates);

        dfs(0, new List<int>(), 0, candidates, target);
        return res;
    }

    private void dfs(int idx, List<int> path, int cur, int[] candidates, int target) {
        if (cur == target) {
            res.Add(new List<int>(path));
            return;
        }
        for (int i = idx; i < candidates.Length; i++) {
            if (i > idx && candidates[i] == candidates[i - 1]) {
                continue;
            }
            if (cur + candidates[i] > target) {
                break;
            }

            path.Add(candidates[i]);
            dfs(i + 1, path, cur + candidates[i], candidates, target);
            path.RemoveAt(path.Count - 1);
        }
    }
}
```

```go
func combinationSum2(candidates []int, target int) [][]int {
    var res [][]int
    sort.Ints(candidates)

    var dfs func(int, []int, int)
    dfs = func(idx int, path []int, cur int) {
        if cur == target {
            temp := make([]int, len(path))
            copy(temp, path)
            res = append(res, temp)
            return
        }

        for i := idx; i < len(candidates); i++ {
            if i > idx && candidates[i] == candidates[i-1] {
                continue
            }
            if cur + candidates[i] > target {
                break
            }

            path = append(path, candidates[i])
            dfs(i+1, path, cur + candidates[i])
            path = path[:len(path)-1]
        }
    }

    dfs(0, []int{}, 0)
    return res
}
```

```kotlin
class Solution {
    fun combinationSum2(candidates: IntArray, target: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        candidates.sort()

        fun dfs(idx: Int, path: MutableList<Int>, cur: Int) {
            if (cur == target) {
                res.add(ArrayList(path))
                return
            }

            for (i in idx until candidates.size) {
                if (i > idx && candidates[i] == candidates[i - 1]) continue
                if (cur + candidates[i] > target) break

                path.add(candidates[i])
                dfs(i + 1, path, cur + candidates[i])
                path.removeAt(path.size - 1)
            }
        }

        dfs(0, mutableListOf(), 0)
        return res
    }
}
```

```swift
class Solution {
    func combinationSum2(_ candidates: [Int], _ target: Int) -> [[Int]] {
        var res = [[Int]]()
        let sortedCandidates = candidates.sorted()

        func dfs(_ idx: Int, _ path: inout [Int], _ cur: Int) {
            if cur == target {
                res.append(path)
                return
            }

            for i in idx..<sortedCandidates.count {
                if i > idx && sortedCandidates[i] == sortedCandidates[i - 1] {
                    continue
                }
                if cur + sortedCandidates[i] > target {
                    break
                }

                path.append(sortedCandidates[i])
                dfs(i + 1, &path, cur + sortedCandidates[i])
                path.removeLast()
            }
        }

        var path: [Int] = []
        dfs(0, &path, 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Generating Duplicate Combinations
The input contains duplicates, and each element can only be used once. Without proper duplicate handling, `[1,1,2]` with target `3` might produce `[1,2]` twice. Always sort first and skip consecutive duplicates at the same recursion level.
```python
# Wrong: generates duplicates
for i in range(idx, len(candidates)):
    dfs(i + 1, ...)
# Correct: skip duplicates at same level
for i in range(idx, len(candidates)):
    if i > idx and candidates[i] == candidates[i - 1]:
        continue
    dfs(i + 1, ...)
```

### Reusing Elements (Using i Instead of i + 1)
Unlike Combination Sum I where elements can be reused, this problem requires each element to be used at most once. Recursing with the same index allows reuse.
```python
# Wrong: allows reusing same element
dfs(i, cur, total + candidates[i])
# Correct: move to next element
dfs(i + 1, cur, total + candidates[i])
```

### Forgetting to Sort Before Skipping Duplicates
The duplicate-skipping logic `candidates[i] == candidates[i-1]` only works on a sorted array. Without sorting, duplicates won't be adjacent and the skip logic fails silently, producing duplicate combinations.
