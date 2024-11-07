## 1. Recursion

::tabs-start

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        
        def dfs(i, j):
            if i == len(nums):
                return 0
            
            LIS = dfs(i + 1, j) # not include

            if j == -1 or nums[j] < nums[i]:
                LIS = max(LIS, 1 + dfs(i + 1, i)) # include
            
            return LIS

        return dfs(0, -1)
```

```java
public class Solution {
    public int lengthOfLIS(int[] nums) {
        return dfs(nums, 0, -1);
    }

    private int dfs(int[] nums, int i, int j) {
        if (i == nums.length) {
            return 0;
        }

        int LIS = dfs(nums, i + 1, j); // not include

        if (j == -1 || nums[j] < nums[i]) {
            LIS = Math.max(LIS, 1 + dfs(nums, i + 1, i)); // include
        }

        return LIS;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        return dfs(nums, 0, -1);
    }

private:
    int dfs(vector<int>& nums, int i, int j) {
        if (i == nums.size()) {
            return 0;
        }

        int LIS = dfs(nums, i + 1, j); // not include 

        if (j == -1 || nums[j] < nums[i]) {
            LIS = max(LIS, 1 + dfs(nums, i + 1, i)); // include
        }

        return LIS;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    lengthOfLIS(nums) {
        return this.dfs(nums, 0, -1);
    }

    /**
     * @param {number[]} nums
     * @param {number} i
     * @param {number} j
     * @return {number}
     */
    dfs(nums, i, j) {
        if (i === nums.length) {
            return 0;
        }

        let LIS = this.dfs(nums, i + 1, j); // not include 

        if (j === -1 || nums[j] < nums[i]) {
            LIS = Math.max(LIS, 1 + this.dfs(nums, i + 1, i)); // include
        }

        return LIS;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLIS(int[] nums) {
        return Dfs(nums, 0, -1);
    }

    private int Dfs(int[] nums, int i, int j) {
        if (i == nums.Length) {
            return 0;
        }

        int LIS = Dfs(nums, i + 1, j); // not include

        if (j == -1 || nums[j] < nums[i]) {
            LIS = Math.Max(LIS, 1 + Dfs(nums, i + 1, i)); // include
        }

        return LIS;
    }
}
```

```go
func lengthOfLIS(nums []int) int {
    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == len(nums) {
            return 0
        }

        LIS := dfs(i + 1, j) // not include

        if j == -1 || nums[j] < nums[i] {
            LIS = max(LIS, 1 + dfs(i + 1, i)) // include
        }

        return LIS
    }

    return dfs(0, -1)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun lengthOfLIS(nums: IntArray): Int {
        fun dfs(i: Int, j: Int): Int {
            if (i == nums.size) {
                return 0
            }

            var LIS = dfs(i + 1, j) // not include

            if (j == -1 || nums[j] < nums[i]) {
                LIS = maxOf(LIS, 1 + dfs(i + 1, i)) // include
            }

            return LIS
        }

        return dfs(0, -1)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

::tabs-start

```python
class Solution:
    def lengthOfLIS(self, nums):
        n = len(nums)
        memo = [[-1] * (n + 1) for _ in range(n)]  

        def dfs(i, j):
            if i == n:
                return 0
            if memo[i][j + 1] != -1:
                return memo[i][j + 1]

            LIS = dfs(i + 1, j)

            if j == -1 or nums[j] < nums[i]:
                LIS = max(LIS, 1 + dfs(i + 1, i))

            memo[i][j + 1] = LIS
            return LIS

        return dfs(0, -1)
```

```java
public class Solution {
    private int[][] memo;

    private int dfs(int i, int j, int[] nums) {
        if (i == nums.length) {
            return 0;
        }
        if (memo[i][j + 1] != -1) {  
            return memo[i][j + 1];
        }

        int LIS = dfs(i + 1, j, nums);

        if (j == -1 || nums[j] < nums[i]) {
            LIS = Math.max(LIS, 1 + dfs(i + 1, i, nums));
        }

        memo[i][j + 1] = LIS;
        return LIS;
    }

    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        memo = new int[n][n + 1];  
        for (int[] row : memo) {
            Arrays.fill(row, -1);  
        }
        return dfs(0, -1, nums);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> memo;
    
    int dfs(int i, int j, vector<int>& nums) {
        if (i == nums.size()) {
            return 0;
        }
        if (memo[i][j + 1] != -1) {  
            return memo[i][j + 1];
        }

        int LIS = dfs(i + 1, j, nums);

        if (j == -1 || nums[j] < nums[i]) {
            LIS = max(LIS, 1 + dfs(i + 1, i, nums));
        }

        memo[i][j + 1] = LIS;
        return LIS;
    }
    
    int lengthOfLIS(vector<int>& nums) {
        int n = nums.size();
        memo = vector<vector<int>>(n, vector<int>(n + 1, -1)); 
        return dfs(0, -1, nums);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    lengthOfLIS(nums) {
        const n = nums.length;
        const memo = Array.from({ length: n }, () => 
                     Array(n + 2).fill(-1));
        
        return this.dfs(nums, 0, -1, memo);
    }

    /**
     * @param {number[]} nums
     * @param {number} i
     * @param {number} j
     * @param {number[][]} memo
     * @return {number}
     */
    dfs(nums, i, j, memo) {
        if (i === nums.length) return 0; 
        if (memo[i][j + 1] !== -1) 
            return memo[i][j + 1];

        let LIS = this.dfs(nums, i + 1, j, memo);

        if (j === -1 || nums[j] < nums[i]) {
            LIS = Math.max(LIS, 1 + this.dfs(nums, i + 1, i, memo));
        }

        memo[i][j + 1] = LIS;
        return LIS;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLIS(int[] nums) {
        int n = nums.Length;
        int[,] memo = new int[n, n + 1];

        for (int i = 0; i < n; i++)
            for (int j = 0; j <= n; j++)
                memo[i, j] = -1;

        return DFS(nums, 0, -1, memo);
    }

    private int DFS(int[] nums, int i, int j, int[,] memo) {
        if (i == nums.Length) return 0; 
        if (memo[i, j + 1] != -1) {
            return memo[i, j + 1];
        }

        int LIS = DFS(nums, i + 1, j, memo);

        if (j == -1 || nums[j] < nums[i]) {
            LIS = Math.Max(LIS, 1 + DFS(nums, i + 1, i, memo));
        }

        memo[i, j + 1] = LIS;
        return LIS;
    }
}
```

```go
func lengthOfLIS(nums []int) int {
    n := len(nums)
    memo := make([][]int, n)
    for i := range memo {
        memo[i] = make([]int, n+1)  
        for j := range memo[i] {
            memo[i][j] = -1  
        }
    }

    var dfs func(i, j int) int
    dfs = func(i, j int) int {
        if i == n {
            return 0
        }
        if memo[i][j+1] != -1 {
            return memo[i][j+1]
        }

        LIS := dfs(i + 1, j)  

        if j == -1 || nums[j] < nums[i] {
            LIS = max(LIS, 1 + dfs(i + 1, i))  
        }

        memo[i][j+1] = LIS
        return LIS
    }

    return dfs(0, -1)
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    private lateinit var memo: Array<IntArray>

    private fun dfs(i: Int, j: Int, nums: IntArray): Int {
        if (i == nums.size) {
            return 0
        }
        if (memo[i][j + 1] != -1) {
            return memo[i][j + 1]
        }

        var LIS = dfs(i + 1, j, nums)  

        if (j == -1 || nums[j] < nums[i]) {
            LIS = maxOf(LIS, 1 + dfs(i + 1, i, nums))  
        }

        memo[i][j + 1] = LIS
        return LIS
    }

    fun lengthOfLIS(nums: IntArray): Int {
        val n = nums.size
        memo = Array(n) { IntArray(n + 1) { -1 } }  
        return dfs(0, -1, nums)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n ^ 2)$

---

## 3. Dynamic Programming (Bottom-Up)

::tabs-start

```python
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        LIS = [1] * len(nums)

        for i in range(len(nums) - 1, -1, -1):
            for j in range(i + 1, len(nums)):
                if nums[i] < nums[j]:
                    LIS[i] = max(LIS[i], 1 + LIS[j])
        return max(LIS)
```

```java
public class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] LIS = new int[nums.length];
        Arrays.fill(LIS, 1);

        for (int i = nums.length - 1; i >= 0; i--) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] < nums[j]) {
                    LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
                }
            }
        }
        return Arrays.stream(LIS).max().getAsInt();
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> LIS(nums.size(), 1);

        for (int i = nums.size() - 1; i >= 0; i--) {
            for (int j = i + 1; j < nums.size(); j++) {
                if (nums[i] < nums[j]) {
                    LIS[i] = max(LIS[i], 1 + LIS[j]);
                }
            }
        }
        return *max_element(LIS.begin(), LIS.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    lengthOfLIS(nums) {
        const LIS = new Array(nums.length).fill(1);

        for (let i = nums.length - 1; i >= 0; i--) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] < nums[j]) {
                    LIS[i] = Math.max(LIS[i], 1 + LIS[j]);
                }
            }
        }
        return Math.max(...LIS);
    }
}
```

```csharp
public class Solution {
    public int LengthOfLIS(int[] nums) {
        int[] LIS = new int[nums.Length];
        for (int i = 0; i < LIS.Length; i++) LIS[i] = 1;

        for (int i = nums.Length - 1; i >= 0; i--) {
            for (int j = i + 1; j < nums.Length; j++) {
                if (nums[i] < nums[j]) {
                    LIS[i] = Math.Max(LIS[i], 1 + LIS[j]);
                }
            }
        }
        return LIS.Max();
    }
}
```

```go
func lengthOfLIS(nums []int) int {
    LIS := make([]int, len(nums))
    for i := range LIS {
        LIS[i] = 1
    }
    
    for i := len(nums) - 1; i >= 0; i-- {
        for j := i + 1; j < len(nums); j++ {
            if nums[i] < nums[j] {
                if 1 + LIS[j] > LIS[i] {
                    LIS[i] = 1 + LIS[j]
                }
            }
        }
    }
    
    maxLen := 1
    for _, length := range LIS {
        if length > maxLen {
            maxLen = length
        }
    }
    
    return maxLen
}
```

```kotlin
class Solution {
    fun lengthOfLIS(nums: IntArray): Int {
        val LIS = IntArray(nums.size) { 1 }
        
        for (i in nums.size - 1 downTo 0) {
            for (j in (i + 1) until nums.size) {
                if (nums[i] < nums[j]) {
                    LIS[i] = maxOf(LIS[i], 1 + LIS[j])
                }
            }
        }
        
        return LIS.maxOrNull() ?: 1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(n)$

---

## 4. Segment Tree

::tabs-start

```python
from bisect import bisect_left
class SegmentTree:
    def __init__(self, N):
        self.n = N
        while (self.n & (self.n - 1)) != 0:
            self.n += 1
        self.tree = [0] * (2 * self.n)

    def update(self, i, val):
        self.tree[self.n + i] = val
        j = (self.n + i) >> 1
        while j >= 1:
            self.tree[j] = max(self.tree[j << 1], self.tree[j << 1 | 1])
            j >>= 1

    def query(self, l, r):
        if l > r:
            return 0
        res = float('-inf')
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l >>= 1
            r >>= 1
        return res

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        def compress(arr):
            sortedArr = sorted(set(arr))
            order = []
            for num in arr:
                order.append(bisect_left(sortedArr, num))
            return order
        
        nums = compress(nums)
        n = len(nums)
        segTree = SegmentTree(n)

        LIS = 0
        for num in nums:
            curLIS = segTree.query(0, num - 1) + 1
            segTree.update(num, curLIS)
            LIS = max(LIS, curLIS)
        return LIS
```

```java
public class SegmentTree {
    int n;
    int[] tree;

    public SegmentTree(int N) {
        n = N;
        while ((n & (n - 1)) != 0) {
            n++;
        }
        tree = new int[2 * n];
    }

    void update(int i, int val) {
        tree[n + i] = val;
        int j = (n + i) >> 1;
        while (j >= 1) {
            tree[j] = Math.max(tree[j << 1], tree[j << 1 | 1]);
            j >>= 1;
        }
    }

    int query(int l, int r) {
        if (l > r) {
            return 0;
        }
        int res = Integer.MIN_VALUE;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) != 0) {
                res = Math.max(res, tree[l]);
                l++;
            }
            if ((r & 1) != 0) {
                r--;
                res = Math.max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] sortedArr = Arrays.stream(nums).distinct().sorted().toArray();
        int[] order = new int[nums.length];
        for (int i = 0; i < nums.length; i++) {
            order[i] = Arrays.binarySearch(sortedArr, nums[i]);
        }
        int n = sortedArr.length;
        SegmentTree segTree = new SegmentTree(n);

        int LIS = 0;
        for (int num : order) {
            int curLIS = segTree.query(0, num - 1) + 1;
            segTree.update(num, curLIS);
            LIS = Math.max(LIS, curLIS);
        }
        return LIS;
    }
}
```

```cpp
class SegmentTree {
public:
    int n;
    vector<int> tree;

    SegmentTree(int N) {
        n = N;
        while (n & (n - 1)) {
            n++;
        }
        tree.resize(2 * n);
    }

    void update(int i, int val) {
        tree[n + i] = val;
        int j = (n + i) >> 1;
        while (j >= 1) {
            tree[j] = max(tree[j << 1], tree[j << 1 | 1]);
            j >>= 1;
        }
    }

    int query(int l, int r) {
        if (l > r) {
            return 0;
        }
        int res = INT_MIN;
        l += n;
        r += n + 1;
        while (l < r) {
            if (l & 1) {
                res = max(res, tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
};

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> sortedArr = nums;
        sort(sortedArr.begin(), sortedArr.end());
        sortedArr.erase(unique(sortedArr.begin(), 
                        sortedArr.end()), sortedArr.end());

        vector<int> order(nums.size());
        for (int i = 0; i < nums.size(); i++) {
            order[i] = lower_bound(sortedArr.begin(), sortedArr.end(),
                                   nums[i]) - sortedArr.begin();
        }

        int n = sortedArr.size();
        SegmentTree segTree(n);

        int LIS = 0;
        for (int num : order) {
            int curLIS = segTree.query(0, num - 1) + 1;
            segTree.update(num, curLIS);
            LIS = max(LIS, curLIS);
        }
        return LIS;
    }
};
```

```javascript
class SegmentTree {
    constructor(N, a) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.tree = new Array(2 * this.n).fill(0);
    }

    /**
     * @param {number} i
     * @param {number} val
     */
    update(i, val) {
        this.tree[this.n + i] = val;
        let j = (this.n + i) >> 1;
        while (j >= 1) {
            this.tree[j] = Math.max(this.tree[j << 1], this.tree[j << 1 | 1]);
            j >>= 1;
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        if (l > r) {
            return 0;
        }
        let res = -Infinity;
        l += this.n;
        r += this.n + 1;
        while (l < r) {
            if (l & 1) {
                res = Math.max(res, this.tree[l]);
                l++;
            }
            if (r & 1) {
                r--;
                res = Math.max(res, this.tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    lengthOfLIS(nums) {
        const sortedArr = Array.from(new Set(nums)).sort((a, b) => a - b);
        const map = new Map();
        
        sortedArr.forEach((num, index) => {
            map.set(num, index);
        });
        
        const order = nums.map(num => map.get(num));
        const n = sortedArr.length;
        const segTree = new SegmentTree(n, order);

        let LIS = 0;
        for (const num of order) {
            const curLIS = segTree.query(0, num - 1) + 1;
            segTree.update(num, curLIS);
            LIS = Math.max(LIS, curLIS);
        }
        return LIS;
    }
}
```

```csharp
public class SegmentTree {
    private int n;
    private int[] tree;

    public SegmentTree(int N) {
        n = N;
        tree = new int[2 * n];
        Array.Fill(tree, 0);
    }

    public void Update(int i, int val) {
        tree[n + i] = val;
        int j = (n + i) >> 1;
        while (j >= 1) {
            tree[j] = Math.Max(tree[2 * j], tree[2 * j + 1]);
            j >>= 1;
        }
    }

    public int Query(int l, int r) {
        if (l > r) {
            return 0;
        }
        int res = int.MinValue;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) {
                res = Math.Max(res, tree[l]);
                l++;
            }
            if ((r & 1) == 1) {
                r--;
                res = Math.Max(res, tree[r]);
            }
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int LengthOfLIS(int[] nums) {
        var sortedArr = nums.Distinct().OrderBy(x => x).ToArray();
        var map = new Dictionary<int, int>();
        
        for (int i = 0; i < sortedArr.Length; i++) {
            map[sortedArr[i]] = i;
        }
        
        int n = sortedArr.Length;
        var segTree = new SegmentTree(n);
        
        int LIS = 0;
        foreach (var num in nums) {
            int compressedIndex = map[num];
            int curLIS = segTree.Query(0, compressedIndex - 1) + 1;
            segTree.Update(compressedIndex, curLIS);
            LIS = Math.Max(LIS, curLIS);
        }
        return LIS;
    }
}
```

```go
type SegmentTree struct {
	n    int
	tree []int
}

func NewSegmentTree(N int) *SegmentTree {
	n := N
	for (n & (n - 1)) != 0 {
		n++
	}
	tree := make([]int, 2*n)
	return &SegmentTree{n: n, tree: tree}
}

func (seg *SegmentTree) Update(i, val int) {
	seg.tree[seg.n+i] = val
	j := (seg.n + i) >> 1
	for j >= 1 {
		seg.tree[j] = max(seg.tree[j<<1], seg.tree[j<<1|1])
		j >>= 1
	}
}

func (seg *SegmentTree) Query(l, r int) int {
	if l > r {
		return 0
	}
	res := -1 << 63
	l += seg.n
	r += seg.n + 1
	for l < r {
		if l&1 != 0 {
			res = max(res, seg.tree[l])
			l++
		}
		if r&1 != 0 {
			r--
			res = max(res, seg.tree[r])
		}
		l >>= 1
		r >>= 1
	}
	return res
}

func compress(arr []int) []int {
	sortedArr := make([]int, len(arr))
	copy(sortedArr, arr)
	sort.Ints(sortedArr)
	order := make([]int, len(arr))
	for i, num := range arr {
		order[i] = sort.SearchInts(sortedArr, num)
	}
	return order
}

func lengthOfLIS(nums []int) int {
	nums = compress(nums)
	n := len(nums)
	segTree := NewSegmentTree(n)
	LIS := 0
	for _, num := range nums {
		curLIS := segTree.Query(0, num-1) + 1
		segTree.Update(num, curLIS)
		LIS = max(LIS, curLIS)
	}
	return LIS
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}
```

```kotlin
class SegmentTree(N: Int) {
    var n: Int = N
    var tree: IntArray

    init {
        while ((n and (n - 1)) != 0) {
            n++
        }
        tree = IntArray(2 * n)
    }

    fun update(i: Int, value: Int) {
        tree[n + i] = value
        var j = (n + i) / 2
        while (j >= 1) {
            tree[j] = max(tree[j * 2], tree[j * 2 + 1])
            j /= 2
        }
    }

    fun query(l: Int, r: Int): Int {
        if (l > r) return 0
        var res = Int.MIN_VALUE
        var left = l + n
        var right = r + n + 1
        while (left < right) {
            if (left and 1 != 0) {
                res = max(res, tree[left])
                left++
            }
            if (right and 1 != 0) {
                right--
                res = max(res, tree[right])
            }
            left /= 2
            right /= 2
        }
        return res
    }
}

class Solution {
    fun compress(arr: IntArray): IntArray {
        val sortedArr = arr.toSortedSet().toIntArray()
        return arr.map { sortedArr.binarySearch(it) }.toIntArray()
    }

    fun lengthOfLIS(nums: IntArray): Int {
        val compressedNums = compress(nums)
        val n = compressedNums.size
        val segTree = SegmentTree(n)
        var LIS = 0
        for (num in compressedNums) {
            val curLIS = segTree.query(0, num - 1) + 1
            segTree.update(num, curLIS)
            LIS = max(LIS, curLIS)
        }
        return LIS
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$

---

## 5. Binary Search

::tabs-start

```python
from bisect import bisect_left
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        dp = []
        dp.append(nums[0])

        LIS = 1
        for i in range(1, len(nums)):
            if dp[-1] < nums[i]: 
                dp.append(nums[i])
                LIS += 1
                continue

            idx = bisect_left(dp, nums[i])
            dp[idx] = nums[i] 

        return LIS
```

```java
public class Solution {
    public int lengthOfLIS(int[] nums) {
        List<Integer> dp = new ArrayList<>();
        dp.add(nums[0]);

        int LIS = 1;
        for (int i = 1; i < nums.length; i++) {
            if (dp.get(dp.size() - 1) < nums[i]) { 
                dp.add(nums[i]);
                LIS++;
                continue;
            }

            int idx = Collections.binarySearch(dp, nums[i]);
            if (idx < 0) idx = -idx - 1; 
            dp.set(idx, nums[i]); 
        }

        return LIS;
    }
}
```

```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> dp;
        dp.push_back(nums[0]);

        int LIS = 1;
        for (int i = 1; i < nums.size(); i++) {
            if (dp.back() < nums[i]) { 
                dp.push_back(nums[i]);
                LIS++;
                continue;
            }

            int idx = lower_bound(dp.begin(), 
                                  dp.end(), nums[i]) - dp.begin();
            dp[idx] = nums[i]; 
        }

        return LIS;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    lengthOfLIS(nums) {
        const dp = [];
        dp.push(nums[0]);

        let LIS = 1;
        for (let i = 1; i < nums.length; i++) {
            if (dp[dp.length - 1] < nums[i]) { 
                dp.push(nums[i]);
                LIS++;
                continue;
            }

            let left = 0, right = dp.length - 1;
            while (left < right) {
                const mid = Math.floor((left + right) / 2);
                if (dp[mid] < nums[i]) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            dp[left] = nums[i]; 
        }

        return LIS;
    }
}
```

```csharp
public class Solution {
    public int LengthOfLIS(int[] nums) {
        List<int> dp = new List<int>();
        dp.Add(nums[0]);

        int LIS = 1;
        for (int i = 1; i < nums.Length; i++) {
            if (dp[dp.Count - 1] < nums[i]) { 
                dp.Add(nums[i]);
                LIS++;
                continue;
            }

            int idx = dp.BinarySearch(nums[i]);
            if (idx < 0) idx = ~idx; 
            dp[idx] = nums[i]; 
        }

        return LIS;
    }
}
```

```go
func lengthOfLIS(nums []int) int {
	dp := []int{}
	dp = append(dp, nums[0])

	LIS := 1
	for i := 1; i < len(nums); i++ {
		if dp[len(dp)-1] < nums[i] {
			dp = append(dp, nums[i])
			LIS++
			continue
		}

		idx := sort.Search(len(dp), func(j int) bool {
			return dp[j] >= nums[i]
		})
		dp[idx] = nums[i]
	}

	return LIS
}
```

```kotlin
class Solution {
    fun lengthOfLIS(nums: IntArray): Int {
        val dp = mutableListOf<Int>()
        dp.add(nums[0])

        var LIS = 1
        for (i in 1 until nums.size) {
            if (dp[dp.size - 1] < nums[i]) {
                dp.add(nums[i])
                LIS++
                continue
            }

            val idx = dp.binarySearch(nums[i]).let { if (it < 0) -it - 1 else it }
            dp[idx] = nums[i]
        }

        return LIS
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(n)$