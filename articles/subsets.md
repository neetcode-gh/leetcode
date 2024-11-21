## 1. Backtracking

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 2. Iteration

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$

---

## 3. Bit Manipulation

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
        for (let i = 0; i < (1 << n); i++) {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * 2 ^ n)$
* Space complexity: $O(n)$