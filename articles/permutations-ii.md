## 1. Backtracking (Hash Set)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n! * n)$ for the hash set.

---

## 2. Backtracking (Hash Map)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n! * n)$ for the output list.

---

## 3. Backtracking (Boolean Array)

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
                if (visit[i] || (i > 0 && nums[i] === nums[i - 1] && !visit[i - 1]))
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n! * n)$ for the output list.

---

## 4. Backtracking (Optimal)

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n! * n)$ for the output list.

---

## 5. Iteration

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

            let l = i + 1, r = n - 1;
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n! * n)$
* Space complexity: $O(n! * n)$ for the output list.