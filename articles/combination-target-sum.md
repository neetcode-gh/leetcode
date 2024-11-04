## 1. Backtracking

::tabs-start

```python
class Solution:
    def combinationSum(self, nums: List[int], target: int) -> List[List[int]]:
        res = []

        def dfs(i, cur, total):
            if total == target:
                res.append(cur.copy())
                return
            if i >= len(nums) or total > target:
                return

            cur.append(nums[i])
            dfs(i, cur, total + nums[i])
            cur.pop()
            dfs(i + 1, cur, total)

        dfs(0, [], 0)
        return res
```

```java
public class Solution {
    List<List<Integer>> res;
    public List<List<Integer>> combinationSum(int[] nums, int target) {
        res = new ArrayList<List<Integer>>();
        List<Integer> cur = new ArrayList();
        backtrack(nums, target, cur, 0);
        return res;
    }

    public void backtrack(int[] nums, int target, List<Integer> cur, int i) {
        if (target == 0) {
            res.add(new ArrayList(cur));
            return;
        }
        if (target < 0 || i >= nums.length) {
            return;
        }

        cur.add(nums[i]);
        backtrack(nums, target - nums[i], cur, i);
        cur.remove(cur.size() - 1);
        backtrack(nums, target, cur, i + 1);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;
    vector<vector<int>> combinationSum(vector<int>& nums, int target) {
        vector<int> cur;
        backtrack(nums, target, cur, 0);
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

        cur.push_back(nums[i]);
        backtrack(nums, target - nums[i], cur, i);
        cur.pop_back();
        backtrack(nums, target, cur, i + 1);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        let ans = [];
        let cur = [];
        this.backtrack(nums, target, ans, cur, 0);
        return ans;
    }

    /**
     * @param {number[]} nums
     * @param {number} target
     * @param {number[][]} ans
     * @param {number[]} cur
     * @param {number} index
     */
    backtrack(nums, target, ans, cur, index) {
        if (target === 0) {
            ans.push([...cur]);
        } else if (target < 0 || index >= nums.length) {
            return;
        } else {
            cur.push(nums[index]);
            this.backtrack(nums, target - nums[index], ans, cur, index);

            cur.pop();
            this.backtrack(nums, target, ans, cur, index + 1);
        }
    }
}
```

```csharp
public class Solution {
    
    List<List<int>> res = new List<List<int>>();

    public void backtrack(int i, List<int> cur, int total, int[] nums, int target) {
        if(total == target) {
            res.Add(cur.ToList());
            return;
        }
        
        if(total > target || i >= nums.Length) return;
        
        cur.Add(nums[i]);
        backtrack(i, cur, total + nums[i], nums, target);
        cur.Remove(cur.Last());

        backtrack(i + 1, cur, total, nums, target);
        
    }
    public List<List<int>> CombinationSum(int[] nums, int target) {
        backtrack(0, new List<int>(), 0, nums, target);
        return res;
    }
}
```

```go
func combinationSum(nums []int, target int) [][]int {
    res := [][]int{}

    var dfs func(int, []int, int)
    dfs = func(i int, cur []int, total int) {
        if total == target {
            temp := make([]int, len(cur))
            copy(temp, cur)
            res = append(res, temp)
            return
        }
        if i >= len(nums) || total > target {
            return
        }

        cur = append(cur, nums[i])
        dfs(i, cur, total + nums[i])
        cur = cur[:len(cur)-1]
        dfs(i+1, cur, total)
    }

    dfs(0, []int{}, 0)
    return res
}
```

```kotlin
class Solution {
    fun combinationSum(nums: IntArray, target: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()

        fun dfs(i: Int, cur: MutableList<Int>, total: Int) {
            if (total == target) {
                res.add(ArrayList(cur))
                return
            }
            if (i >= nums.size || total > target) {
                return
            }

            cur.add(nums[i])
            dfs(i, cur, total + nums[i])
            cur.removeAt(cur.size - 1)
            dfs(i + 1, cur, total)
        }

        dfs(0, mutableListOf(), 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ \frac{t}{m})$
* Space complexity: $O(\frac{t}{m})$

> Where $t$ is the given $target$ and $m$ is the minimum value in $nums$.

---

## 2. Backtracking (Optimal)

::tabs-start

```python
class Solution:
    def combinationSum(self, nums: List[int], target: int) -> List[List[int]]:
        res = []
        nums.sort()

        def dfs(i, cur, total):
            if total == target:
                res.append(cur.copy())
                return
            
            for j in range(i, len(nums)):
                if total + nums[j] > target:
                    return
                cur.append(nums[j])
                dfs(j, cur, total + nums[j])
                cur.pop()
        
        dfs(0, [], 0)
        return res
```

```java
public class Solution {
    List<List<Integer>> res;
    public List<List<Integer>> combinationSum(int[] nums, int target) {
        res = new ArrayList<>();
        Arrays.sort(nums);
        
        dfs(0, new ArrayList<>(), 0, nums, target);
        return res;
    }

    private void dfs(int i, List<Integer> cur, int total, int[] nums, int target) {
        if (total == target) {
            res.add(new ArrayList<>(cur));
            return;
        }
        
        for (int j = i; j < nums.length; j++) {
            if (total + nums[j] > target) {
                return;
            }
            cur.add(nums[j]);
            dfs(j, cur, total + nums[j], nums, target);
            cur.remove(cur.size() - 1);
        }
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> res;
    vector<vector<int>> combinationSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        dfs(0, {}, 0, nums, target);
        return res;
    }

    void dfs(int i, vector<int> cur, int total, vector<int>& nums, int target) {
        if (total == target) {
            res.push_back(cur);
            return;
        }
        
        for (int j = i; j < nums.size(); j++) {
            if (total + nums[j] > target) {
                return;
            }
            cur.push_back(nums[j]);
            dfs(j, cur, total + nums[j], nums, target);
            cur.pop_back();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        const res = [];
        nums.sort((a, b) => a - b);
        
        const dfs = (i, cur, total) => {
            if (total === target) {
                res.push([...cur]);
                return;
            }
            
            for (let j = i; j < nums.length; j++) {
                if (total + nums[j] > target) {
                    return;
                }
                cur.push(nums[j]);
                dfs(j, cur, total + nums[j]);
                cur.pop();
            }
        };
        
        dfs(0, [], 0);
        return res;
    }
}
```

```csharp
public class Solution {
    List<List<int>> res;
    public List<List<int>> CombinationSum(int[] nums, int target) {
        res = new List<List<int>>();
        Array.Sort(nums);
        dfs(0, new List<int>(), 0, nums, target);
        return res;
    }

    private void dfs(int i, List<int> cur, int total, int[] nums, int target) {
        if (total == target) {
            res.Add(new List<int>(cur));
            return;
        }
        
        for (int j = i; j < nums.Length; j++) {
            if (total + nums[j] > target) {
                return;
            }
            cur.Add(nums[j]);
            dfs(j, cur, total + nums[j], nums, target);
            cur.RemoveAt(cur.Count - 1);
        }
    }
}
```

```go
func combinationSum(nums []int, target int) [][]int {
    res := [][]int{}
    sort.Ints(nums)

    var dfs func(int, []int, int)
    dfs = func(i int, cur []int, total int) {
        if total == target {
            temp := make([]int, len(cur))
            copy(temp, cur)
            res = append(res, temp)
            return
        }
        
        for j := i; j < len(nums); j++ {
            if total + nums[j] > target {
                return
            }
            cur = append(cur, nums[j])
            dfs(j, cur, total + nums[j])
            cur = cur[:len(cur)-1]
        }
    }

    dfs(0, []int{}, 0)
    return res
}
```

```kotlin
class Solution {
    fun combinationSum(nums: IntArray, target: Int): List<List<Int>> {
        val res = mutableListOf<List<Int>>()
        nums.sort()

        fun dfs(i: Int, cur: MutableList<Int>, total: Int) {
            if (total == target) {
                res.add(ArrayList(cur))
                return
            }
            
            for (j in i until nums.size) {
                if (total + nums[j] > target) {
                    return
                }
                cur.add(nums[j])
                dfs(j, cur, total + nums[j])
                cur.removeAt(cur.size - 1)
            }
        }

        dfs(0, mutableListOf(), 0)
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(2 ^ \frac{t}{m})$
* Space complexity: $O(\frac{t}{m})$

> Where $t$ is the given $target$ and $m$ is the minimum value in $nums$.