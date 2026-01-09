## 1. Backtracking

### Intuition

The idea is to build all possible subsets by making a choice at each step:
for every number, we have two options — **include it** or **exclude it**.
This naturally forms a decision tree.

Backtracking helps us explore both choices:
- Add the current number → explore further
- Remove it (undo) → explore without it

Whenever we reach the end of the array, the current list represents one
complete subset, so we store it.

This systematically generates all 2ⁿ subsets.

### Algorithm

1. Maintain:
   - `res` → final list of all subsets
   - `subset` → current subset being built
2. Define a recursive function `dfs(i)`:
   - If `i` equals the length of the input:
     - Add a copy of `subset` to `res`  
     - Return
   - **Choice 1: include `nums[i]`**
     - Append number to `subset`
     - Recurse to next index
     - Remove the number (backtrack)
   - **Choice 2: skip `nums[i]`**
     - Recurse to next index
3. Start recursion with `dfs(0)`
4. Return `res`

::tabs-start

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = []
        subset = []

        def dfs(i):
            if i >= len(nums):
                res.append(subset.copy())
                return
            subset.append(nums[i])
            dfs(i + 1)
            subset.pop()
            dfs(i + 1)

        dfs(0)
        return res
```

```java
public class Solution {

    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> subset = new ArrayList<>();
        dfs(nums, 0, subset, res);
        return res;
    }

    private void dfs(int[] nums, int i, List<Integer> subset, List<List<Integer>> res) {
        if (i >= nums.length) {
            res.add(new ArrayList<>(subset));
            return;
        }
        subset.add(nums[i]);
        dfs(nums, i + 1, subset, res);
        subset.remove(subset.size() - 1);
        dfs(nums, i + 1, subset, res);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> subset;
        dfs(nums, 0, subset, res);
        return res;
    }

private:
    void dfs(const vector<int>& nums, int i, vector<int>& subset, vector<vector<int>>& res) {
        if (i >= nums.size()) {
            res.push_back(subset);
            return;
        }
        subset.push_back(nums[i]);
        dfs(nums, i + 1, subset, res);
        subset.pop_back();
        dfs(nums, i + 1, subset, res);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsets(nums) {
        const res = [];
        const subset = [];
        this.dfs(nums, 0, subset, res);
        return res;
    }

    /**
     * @param {number[]} nums
     * @param {number} i
     * @param {number[]} subset
     * @param {number[][]} res
     * @return {void}
     */
    dfs(nums, i, subset, res) {
        if (i >= nums.length) {
            res.push([...subset]);
            return;
        }
        subset.push(nums[i]);
        this.dfs(nums, i + 1, subset, res);
        subset.pop();
        this.dfs(nums, i + 1, subset, res);
    }
}
```

```csharp
public class Solution {

    public List<List<int>> Subsets(int[] nums) {
        var res = new List<List<int>>();
        var subset = new List<int>();
        Dfs(nums, 0, subset, res);
        return res;
    }

    private void Dfs(int[] nums, int i, List<int> subset, List<List<int>> res) {
        if (i >= nums.Length) {
            res.Add(new List<int>(subset));
            return;
        }
        subset.Add(nums[i]);
        Dfs(nums, i + 1, subset, res);
        subset.RemoveAt(subset.Count - 1);
        Dfs(nums, i + 1, subset, res);
    }
}
```

```go
func subsets(nums []int) [][]int {
    res := [][]int{}
    subset := []int{}

    var dfs func(int)
    dfs = func(i int) {
        if i >= len(nums) {
            temp := make([]int, len(subset))
            copy(temp, subset)
            res = append(res, temp)
            return
        }
        subset = append(subset, nums[i])
        dfs(i + 1)
        subset = subset[:len(subset)-1]
        dfs(i + 1)
    }

    dfs(0)
    return res
}
```

```kotlin
class Solution {
    fun subsets(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        val subset = mutableListOf<Int>()

        fun dfs(i: Int) {
            if (i >= nums.size) {
                res.add(subset.toList())
                return
            }
            subset.add(nums[i])
            dfs(i + 1)
            subset.removeAt(subset.size - 1)
            dfs(i + 1)
        }

        dfs(0)
        return res
    }
}
```

```swift
class Solution {
    func subsets(_ nums: [Int]) -> [[Int]] {
        var res = [[Int]]()
        var subset = [Int]()

        func dfs(_ i: Int) {
            if i >= nums.count {
                res.append(subset)
                return
            }
            subset.append(nums[i])
            dfs(i + 1)
            subset.removeLast()
            dfs(i + 1)
        }

        dfs(0)
        return res
    }
}
```

::tabs-end

<details>
<summary>Example - Dry Run</summary>

```
Input: nums = [1, 2, 3]

Decision Tree (Include / Exclude):
                        []
                       /  \
                 [1]        []
                /   \      /   \
           [1,2]   [1]   [2]    []
           /  \    / \   / \    / \
      [1,2,3][1,2][1,3][1][2,3][2][3][]

Step-by-step walkthrough:

dfs(0): Consider nums[0] = 1
├── Include 1: subset = [1]
│   dfs(1): Consider nums[1] = 2
│   ├── Include 2: subset = [1, 2]
│   │   dfs(2): Consider nums[2] = 3
│   │   ├── Include 3: subset = [1, 2, 3]
│   │   │   dfs(3): i >= len(nums), add [1, 2, 3] to result
│   │   │   Result: [[1, 2, 3]]
│   │   └── Exclude 3: subset = [1, 2] (backtrack)
│   │       dfs(3): i >= len(nums), add [1, 2] to result
│   │       Result: [[1, 2, 3], [1, 2]]
│   └── Exclude 2: subset = [1] (backtrack)
│       dfs(2): Consider nums[2] = 3
│       ├── Include 3: subset = [1, 3]
│       │   dfs(3): add [1, 3] to result
│       │   Result: [[1, 2, 3], [1, 2], [1, 3]]
│       └── Exclude 3: subset = [1] (backtrack)
│           dfs(3): add [1] to result
│           Result: [[1, 2, 3], [1, 2], [1, 3], [1]]
└── Exclude 1: subset = [] (backtrack)
    dfs(1): Consider nums[1] = 2
    ├── Include 2: subset = [2]
    │   dfs(2): Consider nums[2] = 3
    │   ├── Include 3: subset = [2, 3]
    │   │   dfs(3): add [2, 3] to result
    │   │   Result: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3]]
    │   └── Exclude 3: subset = [2] (backtrack)
    │       dfs(3): add [2] to result
    │       Result: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2]]
    └── Exclude 2: subset = [] (backtrack)
        dfs(2): Consider nums[2] = 3
        ├── Include 3: subset = [3]
        │   dfs(3): add [3] to result
        │   Result: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3]]
        └── Exclude 3: subset = [] (backtrack)
            dfs(3): add [] to result
            Result: [[1, 2, 3], [1, 2], [1, 3], [1], [2, 3], [2], [3], []]

Final Result: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
(order may vary based on implementation)
```

</details>

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(2 ^ n)$ for the output list.

---

## 2. Iteration

### Intuition

Start with just one subset: the empty set `[]`.

For every number in the array, we take all the subsets we have so far and
create **new subsets by adding the current number to each of them**.

Example:
- Start: `[[]]`
- Add `1` → `[[], [1]]`
- Add `2` → `[[], [1], [2], [1,2]]`
- Add `3` → `[[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]`

Each step doubles the number of subsets.

### Algorithm

1. Initialize `res = [[]]` (start with empty subset).
2. For each number `num` in the input array:
   - For every subset already in `res`:
     - Create a new subset that includes `num`
   - Append all these newly created subsets to `res`.
3. Return `res` after processing all numbers.

::tabs-start

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res = [[]]

        for num in nums:
            res += [subset + [num] for subset in res]

        return res
```

```java
public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());

        for (int num : nums) {
            int size = res.size();
            for (int i = 0; i < size; i++) {
                List<Integer> subset = new ArrayList<>(res.get(i));
                subset.add(num);
                res.add(subset);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res = {{}};

        for (int num : nums) {
            int size = res.size();
            for (int i = 0; i < size; i++) {
                vector<int> subset = res[i];
                subset.push_back(num);
                res.push_back(subset);
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
    subsets(nums) {
        let res = [[]];

        for (let num of nums) {
            let size = res.length;
            for (let i = 0; i < size; i++) {
                let subset = res[i].slice();
                subset.push(num);
                res.push(subset);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Subsets(int[] nums) {
        List<List<int>> res = new List<List<int>>();
        res.Add(new List<int>());

        foreach (int num in nums) {
            int size = res.Count;
            for (int i = 0; i < size; i++) {
                List<int> subset = new List<int>(res[i]);
                subset.Add(num);
                res.Add(subset);
            }
        }

        return res;
    }
}
```

```go
func subsets(nums []int) [][]int {
    res := [][]int{{}}

    for _, num := range nums {
        n := len(res)
        for i := 0; i < n; i++ {
            newSubset := make([]int, len(res[i]))
            copy(newSubset, res[i])
            newSubset = append(newSubset, num)
            res = append(res, newSubset)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun subsets(nums: IntArray): List<List<Int>> {
        val res = mutableListOf<List<Int>>(listOf())

        for (num in nums) {
            val n = res.size
            for (i in 0 until n) {
                val newSubset = res[i].toMutableList()
                newSubset.add(num)
                res.add(newSubset)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func subsets(_ nums: [Int]) -> [[Int]] {
        var res: [[Int]] = [[]]

        for num in nums {
            res += res.map { $0 + [num] }
        }

        return res
    }
}
```

::tabs-end

<details>
<summary>Example - Dry Run</summary>

```
Input: nums = [1, 2, 3]

Initial State:
res = [[]]

Iteration Visualization:
+--------------------------------------------------+
|  For each number, duplicate existing subsets     |
|  and add the current number to each copy         |
+--------------------------------------------------+

Step 1: Process num = 1
┌─────────────────────────────────────────────────┐
│ Current res: [[]]                               │
│                                                 │
│ Take each existing subset and add 1:            │
│   [] + [1] = [1]                                │
│                                                 │
│ Append new subsets to res                       │
└─────────────────────────────────────────────────┘
res = [[], [1]]

Step 2: Process num = 2
┌─────────────────────────────────────────────────┐
│ Current res: [[], [1]]                          │
│                                                 │
│ Take each existing subset and add 2:            │
│   [] + [2] = [2]                                │
│   [1] + [2] = [1, 2]                            │
│                                                 │
│ Append new subsets to res                       │
└─────────────────────────────────────────────────┘
res = [[], [1], [2], [1, 2]]

Step 3: Process num = 3
┌─────────────────────────────────────────────────┐
│ Current res: [[], [1], [2], [1, 2]]             │
│                                                 │
│ Take each existing subset and add 3:            │
│   [] + [3] = [3]                                │
│   [1] + [3] = [1, 3]                            │
│   [2] + [3] = [2, 3]                            │
│   [1, 2] + [3] = [1, 2, 3]                      │
│                                                 │
│ Append new subsets to res                       │
└─────────────────────────────────────────────────┘
res = [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]

Growth Pattern:
┌───────────────────────────────────────┐
│ After processing:     # of subsets    │
├───────────────────────────────────────┤
│ Initial (empty)       1   = 2^0       │
│ After num=1           2   = 2^1       │
│ After num=2           4   = 2^2       │
│ After num=3           8   = 2^3       │
└───────────────────────────────────────┘

Final Result: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

</details>

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(2 ^ n)$ for the output list.

---

## 3. Bit Manipulation

## Intuition

Every subset can be represented using bits.

For an array of length `n`, there are `2^n` possible subsets.  
Each subset corresponds to a number from `0` to `2^n - 1`.

Example for `nums = [a, b, c]`:

- `000` → choose nothing → `[]`
- `001` → choose `c`
- `010` → choose `b`
- `011` → choose `b, c`
- `100` → choose `a`
- ...and so on.

Each bit tells us whether to *include* the corresponding element.

So for every integer `i` from `0` to `(1 << n) - 1`:
- Check each bit `j` of `i`
- If bit `j` is `1`, include `nums[j]` in the current subset.

## Algorithm

1. Let `n` be the length of `nums`.
2. Loop `i` from `0` to `(1 << n) - 1` (this generates all bitmasks).
3. For each `i`, build a subset:
   - For each position `j` from `0` to `n - 1`:
     - If the `j`-th bit of `i` is set, include `nums[j]` in the subset.
4. Add the subset to the result list.
5. Return all subsets.

::tabs-start

```python
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        res = []
        for i in range(1 << n):
            subset = [nums[j] for j in range(n) if (i & (1 << j))]
            res.append(subset)
        return res
```

```java
public class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        int n = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < (1 << n); i++) {
            List<Integer> subset = new ArrayList<>();
            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) != 0) {
                    subset.add(nums[j]);
                }
            }
            res.add(subset);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> res;
        for (int i = 0; i < (1 << n); i++) {
            vector<int> subset;
            for (int j = 0; j < n; j++) {
                if (i & (1 << j)) {
                    subset.push_back(nums[j]);
                }
            }
            res.push_back(subset);
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
    subsets(nums) {
        let res = [];
        let n = nums.length;
        for (let i = 0; i < 1 << n; i++) {
            let subset = [];
            for (let j = 0; j < n; j++) {
                if (i & (1 << j)) {
                    subset.push(nums[j]);
                }
            }
            res.push(subset);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> Subsets(int[] nums) {
        int n = nums.Length;
        List<List<int>> res = new List<List<int>>();
        for (int i = 0; i < (1 << n); i++) {
            List<int> subset = new List<int>();
            for (int j = 0; j < n; j++) {
                if ((i & (1 << j)) != 0) {
                    subset.Add(nums[j]);
                }
            }
            res.Add(subset);
        }
        return res;
    }
}
```

```go
func subsets(nums []int) [][]int {
    n := len(nums)
    res := [][]int{}

    for i := 0; i < (1 << n); i++ {
        subset := []int{}
        for j := 0; j < n; j++ {
            if (i & (1 << j)) != 0 {
                subset = append(subset, nums[j])
            }
        }
        res = append(res, subset)
    }

    return res
}
```

```kotlin
class Solution {
    fun subsets(nums: IntArray): List<List<Int>> {
        val n = nums.size
        val res = mutableListOf<List<Int>>()

        for (i in 0 until (1 shl n)) {
            val subset = mutableListOf<Int>()
            for (j in 0 until n) {
                if (i and (1 shl j) != 0) {
                    subset.add(nums[j])
                }
            }
            res.add(subset)
        }

        return res
    }
}
```

```swift
class Solution {
    func subsets(_ nums: [Int]) -> [[Int]] {
        let n = nums.count
        var res: [[Int]] = []

        for i in 0..<(1 << n) {
            var subset: [Int] = []
            for j in 0..<n {
                if (i & (1 << j)) != 0 {
                    subset.append(nums[j])
                }
            }
            res.append(subset)
        }

        return res
    }
}
```

::tabs-end

<details>
<summary>Example - Dry Run</summary>

```
Input: nums = [1, 2, 3]
n = 3, so we iterate i from 0 to 7 (2^3 - 1)

Bitmask Representation:
┌─────────────────────────────────────────────────────────────┐
│  Each bit position corresponds to an element in nums        │
│  Bit 0 (rightmost) -> nums[0] = 1                          │
│  Bit 1             -> nums[1] = 2                          │
│  Bit 2             -> nums[2] = 3                          │
└─────────────────────────────────────────────────────────────┘

Step-by-step iteration:

i = 0 (binary: 000)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   0      0      0             │
│   3      2      1   <- nums   │
│   -      -      -   <- include│
└───────────────────────────────┘
Subset: []

i = 1 (binary: 001)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   0      0      1             │
│   3      2      1   <- nums   │
│   -      -      *   <- include│
└───────────────────────────────┘
Subset: [1]

i = 2 (binary: 010)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   0      1      0             │
│   3      2      1   <- nums   │
│   -      *      -   <- include│
└───────────────────────────────┘
Subset: [2]

i = 3 (binary: 011)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   0      1      1             │
│   3      2      1   <- nums   │
│   -      *      *   <- include│
└───────────────────────────────┘
Subset: [1, 2]

i = 4 (binary: 100)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   1      0      0             │
│   3      2      1   <- nums   │
│   *      -      -   <- include│
└───────────────────────────────┘
Subset: [3]

i = 5 (binary: 101)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   1      0      1             │
│   3      2      1   <- nums   │
│   *      -      *   <- include│
└───────────────────────────────┘
Subset: [1, 3]

i = 6 (binary: 110)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   1      1      0             │
│   3      2      1   <- nums   │
│   *      *      -   <- include│
└───────────────────────────────┘
Subset: [2, 3]

i = 7 (binary: 111)
┌───────────────────────────────┐
│ Bit 2  Bit 1  Bit 0           │
│   1      1      1             │
│   3      2      1   <- nums   │
│   *      *      *   <- include│
└───────────────────────────────┘
Subset: [1, 2, 3]

Summary Table:
┌─────┬────────┬─────────────┐
│  i  │ Binary │   Subset    │
├─────┼────────┼─────────────┤
│  0  │  000   │    []       │
│  1  │  001   │    [1]      │
│  2  │  010   │    [2]      │
│  3  │  011   │    [1,2]    │
│  4  │  100   │    [3]      │
│  5  │  101   │    [1,3]    │
│  6  │  110   │    [2,3]    │
│  7  │  111   │    [1,2,3]  │
└─────┴────────┴─────────────┘

Final Result: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

</details>

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(2 ^ n)$ for the output list.
