## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Backtracking** - The core technique for exploring all possible subsets through recursive inclusion/exclusion decisions
- **Sorting** - Required to group duplicate elements together so they can be properly skipped
- **Recursion** - Understanding how to build solutions incrementally and backtrack when needed

---

## 1. Brute Force

### Intuition

This brute-force method generates **every possible subset** by making a binary choice at each index:
- **Include** the current number, or  
- **Skip** the current number.

Since duplicates exist, many generated subsets may look identical.  
To avoid returning duplicates, we:

1. **Sort the array first**, so duplicates are next to each other.
2. **Store each subset as a tuple inside a set**, because:
   - Sets automatically remove duplicates.
   - Tuples are hashable (lists are not).

In the end, we convert the set of tuples back to a list of lists.

### Algorithm

1. Sort the input list.
2. Use a recursive function:
   - If we processed all numbers → add the subset (as a tuple) to a set.
   - Otherwise:
     - Include the current number → recurse.
     - Exclude the current number → recurse.
3. After exploring all possibilities, convert the set of tuples into lists.
4. Return the final list of unique subsets.

::tabs-start

```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        res = set()

        def backtrack(i, subset):
            if i == len(nums):
                res.add(tuple(subset))
                return

            subset.append(nums[i])
            backtrack(i + 1, subset)
            subset.pop()
            backtrack(i + 1, subset)

        nums.sort()
        backtrack(0, [])
        return [list(s) for s in res]
```

```java
public class Solution {
    Set<List<Integer>> res = new HashSet<>();

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        backtrack(nums, 0, new ArrayList<>());
        return new ArrayList<>(res);
    }

    private void backtrack(int[] nums, int i, List<Integer> subset) {
        if (i == nums.length) {
            res.add(new ArrayList<>(subset));
            return;
        }

        subset.add(nums[i]);
        backtrack(nums, i + 1, subset);
        subset.remove(subset.size() - 1);
        backtrack(nums, i + 1, subset);
    }
}
```

```cpp
class Solution {
    set<vector<int>> res;
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        backtrack(nums, 0, {});
        return vector<vector<int>>(res.begin(), res.end());
    }

    void backtrack(vector<int>& nums, int i, vector<int> subset) {
        if (i == nums.size()) {
            res.insert(subset);
            return;
        }

        subset.push_back(nums[i]);
        backtrack(nums, i + 1, subset);
        subset.pop_back();
        backtrack(nums, i + 1, subset);
    }
};
```

```javascript
class Solution {
    constructor() {
        this.res = new Set();
    }

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        this.backtrack(nums, 0, []);
        return Array.from(this.res).map((subset) => JSON.parse(subset));
    }

    /**
     * @param {number[]} nums
     * @param {number[]} subset
     * @return {void}
     */
    backtrack(nums, i, subset) {
        if (i === nums.length) {
            this.res.add(JSON.stringify(subset));
            return;
        }

        subset.push(nums[i]);
        this.backtrack(nums, i + 1, subset);
        subset.pop();
        this.backtrack(nums, i + 1, subset);
    }
}
```

```csharp
public class Solution {
    HashSet<string> res = new HashSet<string>();

    public List<List<int>> SubsetsWithDup(int[] nums) {
        Array.Sort(nums);
        Backtrack(nums, 0, new List<int>());
        List<List<int>> result = new List<List<int>>();
        result.Add(new List<int>());
        res.Remove("");
        foreach (string str in res) {
            List<int> subset = new List<int>();
            string[] arr = str.Split(',');
            foreach (string num in arr) {
                subset.Add(int.Parse(num));
            }
            result.Add(subset);
        }
        return result;
    }

    private void Backtrack(int[] nums, int i, List<int> subset) {
        if (i == nums.Length) {
            res.Add(string.Join(",", subset));
            return;
        }

        subset.Add(nums[i]);
        Backtrack(nums, i + 1, subset);
        subset.RemoveAt(subset.Count - 1);
        Backtrack(nums, i + 1, subset);
    }
}
```

```go
func subsetsWithDup(nums []int) [][]int {
    sort.Ints(nums)
    res := make(map[string][]int)

    var backtrack func(int, []int)
    backtrack = func(i int, subset []int) {
        if i == len(nums) {
            key := fmt.Sprint(subset)
            res[key] = append([]int{}, subset...)
            return
        }

        subset = append(subset, nums[i])
        backtrack(i+1, subset)
        subset = subset[:len(subset)-1]
        backtrack(i+1, subset)
    }

    backtrack(0, []int{})

    var result [][]int
    for _, v := range res {
        result = append(result, v)
    }
    return result
}
```

```kotlin
class Solution {
    fun subsetsWithDup(nums: IntArray): List<List<Int>> {
        nums.sort()
        val res = HashSet<List<Int>>()

        fun backtrack(i: Int, subset: MutableList<Int>) {
            if (i == nums.size) {
                res.add(ArrayList(subset))
                return
            }

            subset.add(nums[i])
            backtrack(i + 1, subset)
            subset.removeAt(subset.size - 1)
            backtrack(i + 1, subset)
        }

        backtrack(0, mutableListOf())
        return res.toList()
    }
}
```

```swift
class Solution {
    func subsetsWithDup(_ nums: [Int]) -> [[Int]] {
        var res = Set<[Int]>()
        var subset = [Int]()
        let nums = nums.sorted()

        func backtrack(_ i: Int) {
            if i == nums.count {
                res.insert(subset)
                return
            }

            subset.append(nums[i])
            backtrack(i + 1)
            subset.removeLast()
            backtrack(i + 1)
        }

        backtrack(0)
        return Array(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^n)$
- Space complexity: $O(2 ^ n)$

---

## 2. Backtracking - I

### Intuition

We want all subsets, but the array may contain duplicates.
If we blindly generate all subsets, we will produce repeated ones.
So we must **avoid picking the same value in the same decision level** more than once.

Key idea:

- At each index `i`, we make two choices:
  1. **Include** `nums[i]`
  2. **Exclude** `nums[i]`

But when excluding, if the next number is the same (`nums[i] == nums[i+1]`), then skipping it now and skipping it later produce the same subset.
So after exploring the "exclude" branch, we **skip over all duplicate values** to avoid generating duplicate subsets.

We also **sort the array first**, so duplicates become consecutive and easy to skip.

### Algorithm

1. Sort the input list.
2. Use a recursive `backtrack(i, subset)`:
   - If `i` reaches the end → add a copy of `subset` to the result.
   - Otherwise:
     - **Include** `nums[i]` → recurse on `i+1`.
     - **Exclude** `nums[i]`:
       - Move `i` forward while the next value is the same (skip duplicates).
       - Recurse on the next unique index.
3. Return the result list.

::tabs-start

```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()

        def backtrack(i, subset):
            if i == len(nums):
                res.append(subset[::])
                return

            subset.append(nums[i])
            backtrack(i + 1, subset)
            subset.pop()

            while i + 1 < len(nums) and nums[i] == nums[i + 1]:
                i += 1
            backtrack(i + 1, subset)

        backtrack(0, [])
        return res
```

```java
public class Solution {
    List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        backtrack(0, new ArrayList<>(), nums);
        return res;
    }

    private void backtrack(int i, List<Integer> subset, int[] nums) {
        if (i == nums.length) {
            res.add(new ArrayList<>(subset));
            return;
        }

        subset.add(nums[i]);
        backtrack(i + 1, subset, nums);
        subset.remove(subset.size() - 1);

        while (i + 1 < nums.length && nums[i] == nums[i + 1]) {
            i++;
        }
        backtrack(i + 1, subset, nums);
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        backtrack(0, {}, nums);
        return res;
    }

    void backtrack(int i, vector<int> subset, vector<int>& nums) {
        if (i == nums.size()) {
            res.push_back(subset);
            return;
        }

        subset.push_back(nums[i]);
        backtrack(i + 1, subset, nums);
        subset.pop_back();

        while (i + 1 < nums.size() && nums[i] == nums[i + 1]) {
            i++;
        }
        backtrack(i + 1, subset, nums);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        const res = [];
        nums.sort((a, b) => a - b);
        this.backtrack(0, [], nums, res);
        return res;
    }

    /**
     * @param {number} start
     * @param {number[]} subset
     * @param {number[]} nums
     * @param {number[][]} res
     * @return {void}
     */
    backtrack(start, subset, nums, res) {
        res.push([...subset]);
        for (let i = start; i < nums.length; i++) {
            if (i > start && nums[i] === nums[i - 1]) {
                continue;
            }
            subset.push(nums[i]);
            this.backtrack(i + 1, subset, nums, res);
            subset.pop();
        }
    }
}
```

```csharp
public class Solution {
    List<List<int>> res = new List<List<int>>();

    public List<List<int>> SubsetsWithDup(int[] nums) {
        Array.Sort(nums);
        Backtrack(0, new List<int>(), nums);
        return res;
    }

    private void Backtrack(int i, List<int> subset, int[] nums) {
        if (i == nums.Length) {
            res.Add(new List<int>(subset));
            return;
        }

        subset.Add(nums[i]);
        Backtrack(i + 1, subset, nums);
        subset.RemoveAt(subset.Count - 1);

        while (i + 1 < nums.Length && nums[i] == nums[i + 1]) {
            i++;
        }
        Backtrack(i + 1, subset, nums);
    }
}
```

```go
func subsetsWithDup(nums []int) [][]int {
    var res [][]int
    sort.Ints(nums)

    var backtrack func(int, []int)
    backtrack = func(i int, subset []int) {
        if i == len(nums) {
            res = append(res, append([]int{}, subset...))
            return
        }

        subset = append(subset, nums[i])
        backtrack(i+1, subset)
        subset = subset[:len(subset)-1]

        for i+1 < len(nums) && nums[i] == nums[i+1] {
            i++
        }

        backtrack(i+1, subset)
    }

    backtrack(0, []int{})
    return res
}
```

```kotlin
class Solution {
    fun subsetsWithDup(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        nums.sort()

        fun backtrack(i: Int, subset: MutableList<Int>) {
            if (i == nums.size) {
                res.add(ArrayList(subset))
                return
            }

            subset.add(nums[i])
            backtrack(i + 1, subset)
            subset.removeAt(subset.size - 1)

            var j = i
            while (j + 1 < nums.size && nums[j] == nums[j + 1]) {
                j++
            }

            backtrack(j + 1, subset)
        }

        backtrack(0, mutableListOf())
        return res
    }
}
```

```swift
class Solution {
    func subsetsWithDup(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()
        var subset = [Int]()
        let nums = nums.sorted()

        func backtrack(_ i: Int) {
            if i == nums.count {
                res.append(subset)
                return
            }

            subset.append(nums[i])
            backtrack(i + 1)
            subset.removeLast()

            var j = i
            while j + 1 < nums.count && nums[j] == nums[j + 1] {
                j += 1
            }
            backtrack(j + 1)
        }

        backtrack(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(2 ^ n)$ space for the output list.

---

## 3. Backtracking - II

### Intuition

We want to generate all subsets, but duplicates in the input can create repeated subsets.
To avoid duplicates cleanly, instead of making "pick / not pick" decisions, this approach builds subsets by **choosing each possible next element**—but **only once per unique value** at each recursion level.

Key idea:

- Sort the array so identical numbers are next to each other.
- At each recursion level, we loop `j` from the current index to the end.
- If `nums[j]` is the same as `nums[j-1]` and `j > i`, we skip it.
  This prevents generating the same subset starting with the same prefix.
- Every time we enter `backtrack`, we push the current subset into `res`.

This ensures:
- Each subset is generated exactly once.
- All valid subsets are included.
- No need for sets or extra data structures.

### Algorithm

1. Sort the input list to group duplicates.
2. Use a recursive function `backtrack(i, subset)`:
   - Add the current subset to the result.
   - For each index `j` from `i` to the end:
     - If `j > i` and `nums[j] == nums[j-1]`: skip duplicate choices.
     - Include `nums[j]` into the subset.
     - Recursively call `backtrack(j + 1, subset)`.
     - Remove the element to backtrack.
3. Start with `backtrack(0, [])`.
4. Return the result.

::tabs-start

```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []
        def backtrack(i, subset):
            res.append(subset[::])

            for j in range(i, len(nums)):
                if j > i and nums[j] == nums[j - 1]:
                    continue
                subset.append(nums[j])
                backtrack(j + 1, subset)
                subset.pop()

        backtrack(0, [])
        return res
```

```java
public class Solution {
    List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        backtrack(0, new ArrayList<>(), nums);
        return res;
    }

    private void backtrack(int i, List<Integer> subset, int[] nums) {
        res.add(new ArrayList<>(subset));
        for (int j = i; j < nums.length; j++) {
            if (j > i && nums[j] == nums[j - 1]) {
                continue;
            }
            subset.add(nums[j]);
            backtrack(j + 1, subset, nums);
            subset.remove(subset.size() - 1);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;

    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        backtrack(0, {}, nums);
        return res;
    }

    void backtrack(int i, vector<int> subset, vector<int>& nums) {
        res.push_back(subset);
        for (int j = i; j < nums.size(); j++) {
            if (j > i && nums[j] == nums[j - 1]) {
                continue;
            }
            subset.push_back(nums[j]);
            backtrack(j + 1, subset, nums);
            subset.pop_back();
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
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        this.backtrack(0, [], nums);
        return this.res;
    }

    /**
     * @param {number} i
     * @param {number[]} subset
     * @param {number[]} nums
     * @return {void}
     */
    backtrack(i, subset, nums) {
        this.res.push([...subset]);
        for (let j = i; j < nums.length; j++) {
            if (j > i && nums[j] === nums[j - 1]) {
                continue;
            }
            subset.push(nums[j]);
            this.backtrack(j + 1, subset, nums);
            subset.pop();
        }
    }
}
```

```csharp
public class Solution {
    private List<List<int>> res = new List<List<int>>();

    public List<List<int>> SubsetsWithDup(int[] nums) {
        Array.Sort(nums);
        Backtrack(0, new List<int>(), nums);
        return res;
    }

    private void Backtrack(int i, List<int> subset, int[] nums) {
        res.Add(new List<int>(subset));
        for (int j = i; j < nums.Length; j++) {
            if (j > i && nums[j] == nums[j - 1]) {
                continue;
            }
            subset.Add(nums[j]);
            Backtrack(j + 1, subset, nums);
            subset.RemoveAt(subset.Count - 1);
        }
    }
}
```

```go
func subsetsWithDup(nums []int) [][]int {
    var res [][]int
    sort.Ints(nums)

    var backtrack func(int, []int)
    backtrack = func(i int, subset []int) {
        res = append(res, append([]int{}, subset...))

        for j := i; j < len(nums); j++ {
            if j > i && nums[j] == nums[j-1] {
                continue
            }
            subset = append(subset, nums[j])
            backtrack(j+1, subset)
            subset = subset[:len(subset)-1]
        }
    }

    backtrack(0, []int{})
    return res
}
```

```kotlin
class Solution {
    fun subsetsWithDup(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        nums.sort()

        fun backtrack(i: Int, subset: MutableList<Int>) {
            res.add(ArrayList(subset))

            for (j in i until nums.size) {
                if (j > i && nums[j] == nums[j - 1]) {
                    continue
                }
                subset.add(nums[j])
                backtrack(j + 1, subset)
                subset.removeAt(subset.size - 1)
            }
        }

        backtrack(0, mutableListOf())
        return res
    }
}
```

```swift
class Solution {
    func subsetsWithDup(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()
        var subset = [Int]()
        let nums = nums.sorted()

        func backtrack(_ i: Int) {
            res.append(subset)

            for j in i..<nums.count {
                if j > i && nums[j] == nums[j - 1] {
                    continue
                }
                subset.append(nums[j])
                backtrack(j + 1)
                subset.removeLast()
            }
        }

        backtrack(0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(2 ^ n)$ space for the output list.

---

## 4. Iteration

### Intuition

This iterative method builds subsets step by step.
Normally, for each new number, we **add it to every existing subset**.
But duplicates cause repeated subsets — so we must avoid recombining duplicates with all previous subsets.

Key idea:

- Sort the array so duplicates are next to each other.
- Maintain two indices:
  - `idx`: start point for generating new subsets.
  - `prev_idx`: end point (previous size of result list before adding this number).
- If the current number is **not a duplicate**, we start from the beginning (`idx = 0`).
- If it **is a duplicate**, we only combine it with subsets created in the **last round**.
  This prevents duplicate subsets from being generated.

Example:
For input `[1,2,2]`
- First `2` extends all subsets.
- Second `2` extends only the subsets added when first `2` was processed → no duplicates.

### Algorithm

1. Sort `nums` so duplicates are adjacent.
2. Initialize `res = [[]]`.
3. For each index `i`:
   - If `nums[i]` is the same as `nums[i-1]` → set `idx` to the previous end (`prev_idx`).
   - Otherwise → set `idx = 0`.
   - Set `prev_idx = len(res)` (the boundary of old subsets).
   - For every subset `res[j]` where `j` ranges from `idx` to `prev_idx - 1`:
     - Create a new subset by appending `nums[i]`.
     - Add it to `res`.
4. Return `res`.

::tabs-start

```python
class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = [[]]
        prev_Idx = idx = 0

        for i in range(len(nums)):
            idx = prev_idx if i >= 1 and nums[i] == nums[i - 1] else 0
            prev_idx = len(res)
            for j in range(idx, prev_idx):
                tmp = res[j].copy()
                tmp.append(nums[i])
                res.append(tmp)

        return res
```

```java
public class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());
        int prevIdx = 0;
        int idx = 0;

        for (int i = 0; i < nums.length; i++) {
            idx = (i >= 1 && nums[i] == nums[i - 1]) ? prevIdx : 0;
            prevIdx = res.size();
            for (int j = idx; j < prevIdx; j++) {
                List<Integer> tmp = new ArrayList<>(res.get(j));
                tmp.add(nums[i]);
                res.add(tmp);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res = {{}};
        int prevIdx = 0;
        int idx = 0;

        for (int i = 0; i < nums.size(); i++) {
            idx = (i >= 1 && nums[i] == nums[i - 1]) ? prevIdx : 0;
            prevIdx = res.size();
            for (int j = idx; j < prevIdx; j++) {
                std::vector<int> tmp = res[j];
                tmp.push_back(nums[i]);
                res.push_back(tmp);
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
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        const res = [[]];
        let prevIdx = 0;
        let idx = 0;

        for (let i = 0; i < nums.length; i++) {
            idx = i >= 1 && nums[i] === nums[i - 1] ? prevIdx : 0;
            prevIdx = res.length;
            for (let j = idx; j < prevIdx; j++) {
                const tmp = [...res[j]];
                tmp.push(nums[i]);
                res.push(tmp);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> SubsetsWithDup(int[] nums) {
        Array.Sort(nums);
        var res = new List<List<int>> { new List<int>() };
        int prevIdx = 0;
        int idx = 0;

        for (int i = 0; i < nums.Length; i++) {
            idx = (i >= 1 && nums[i] == nums[i - 1]) ? prevIdx : 0;
            prevIdx = res.Count;
            for (int j = idx; j < prevIdx; j++) {
                var tmp = new List<int>(res[j]);
                tmp.Add(nums[i]);
                res.Add(tmp);
            }
        }

        return res;
    }
}
```

```go
func subsetsWithDup(nums []int) [][]int {
    sort.Ints(nums)
    res := [][]int{{}}
    prevIdx, idx := 0, 0

    for i := 0; i < len(nums); i++ {
        if i > 0 && nums[i] == nums[i-1] {
            idx = prevIdx
        } else {
            idx = 0
        }
        prevIdx = len(res)
        for j := idx; j < prevIdx; j++ {
            tmp := append([]int{}, res[j]...)
            tmp = append(tmp, nums[i])
            res = append(res, tmp)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun subsetsWithDup(nums: IntArray): List<List<Int>> {
        nums.sort()
        val res = mutableListOf(listOf<Int>())
        var prevIdx = 0
        var idx = 0

        for (i in nums.indices) {
            idx = if (i > 0 && nums[i] == nums[i - 1]) prevIdx else 0
            prevIdx = res.size
            for (j in idx until prevIdx) {
                val tmp = ArrayList(res[j])
                tmp.add(nums[i])
                res.add(tmp)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func subsetsWithDup(_ nums: [Int]) -> [[Int]] {
        let nums = nums.sorted()
        var res: [[Int]] = [[]]
        var prevIdx = 0
        var idx = 0

        for i in 0..<nums.count {
            idx = (i >= 1 && nums[i] == nums[i - 1]) ? prevIdx : 0
            prevIdx = res.count

            for j in idx..<prevIdx {
                var temp = res[j]
                temp.append(nums[i])
                res.append(temp)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(2 ^ n)$ space for the output list.

---

## Common Pitfalls

### Forgetting to Sort the Array First

Sorting is essential because it groups duplicate elements together, enabling the skip logic to work correctly. Without sorting, duplicates scattered throughout the array cannot be detected and skipped, resulting in duplicate subsets.

### Incorrect Duplicate Skipping Condition

The condition `j > i && nums[j] == nums[j-1]` must use `j > i`, not `j > 0` or `j >= i`. Using `j > 0` would skip the first occurrence of a duplicate at each recursion level, missing valid subsets. The check ensures we only skip duplicates after the first one at the current decision level.

### Modifying the Subset Reference Incorrectly

When adding subsets to the result, you must copy the current subset (e.g., `subset[:]` in Python or `new ArrayList<>(subset)` in Java). Adding the reference directly means all entries in the result will point to the same list, which gets modified during backtracking.
