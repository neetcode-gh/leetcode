## 1. Brute Force

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
        return Array.from(this.res).map(subset => JSON.parse(subset));
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^n)$
* Space complexity: $O(2 ^ n)$

---

## 2. Backtracking (Pick / Not Pick)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 3. Backtracking

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 4. Iteration

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
            idx = (i >= 1 && nums[i] === nums[i - 1]) ? prevIdx : 0;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(1)$