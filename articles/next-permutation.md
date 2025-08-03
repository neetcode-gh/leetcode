## 1. Brute Force

::tabs-start

```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        permutations = self.permute(nums[:])
        permutations.sort()
        for i, p in enumerate(permutations):
            if p == nums:
                nextP = permutations[(i + 1) % len(permutations)]
                for j in range(len(nums)):
                    nums[j] = nextP[j]
                break


    def permute(self, nums: List[int]) -> List[List[int]]:
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
    public void nextPermutation(int[] nums) {
        List<List<Integer>> perms = permute(nums.clone());
        Collections.sort(perms, (a, b) -> {
            for (int i = 0; i < a.size(); i++) {
                int diff = a.get(i) - b.get(i);
                if (diff != 0) return diff;
            }
            return 0;
        });
        for (int i = 0; i < perms.size(); i++) {
            List<Integer> p = perms.get(i);
            boolean match = true;
            for (int j = 0; j < nums.length; j++) {
                if (p.get(j) != nums[j]) { match = false; break; }
            }
            if (match) {
                List<Integer> next = perms.get((i + 1) % perms.size());
                for (int j = 0; j < nums.length; j++) {
                    nums[j] = next.get(j);
                }
                return;
            }
        }
    }

    private List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);
        boolean[] used = new boolean[nums.length];
        List<Integer> path = new ArrayList<>();
        dfs(nums, used, path, res);
        return res;
    }

    private void dfs(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
            used[i] = true;
            path.add(nums[i]);
            dfs(nums, used, path, res);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}
```

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        auto perms = permute(nums);
        sort(perms.begin(), perms.end());
        for (int i = 0; i < perms.size(); i++) {
            if (perms[i] == nums) {
                auto& next = perms[(i + 1) % perms.size()];
                nums = next;
                return;
            }
        }
    }

private:
    vector<vector<int>> permute(vector<int> nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        function<void()> dfs = [&]() {
            if (path.size() == nums.size()) {
                res.push_back(path);
                return;
            }
            for (int i = 0; i < nums.size(); i++) {
                if (used[i]) continue;
                if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
                used[i] = true;
                path.push_back(nums[i]);
                dfs();
                path.pop_back();
                used[i] = false;
            }
        };
        dfs();
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    nextPermutation(nums) {
        const permute = (arr) => {
            const res = [];
            arr.sort((a, b) => a - b);
            const used = Array(arr.length).fill(false);
            const path = [];
            const dfs = () => {
                if (path.length === arr.length) {
                    res.push([...path]);
                    return;
                }
                for (let i = 0; i < arr.length; i++) {
                    if (used[i]) continue;
                    if (i > 0 && arr[i] === arr[i - 1] && !used[i - 1])
                        continue;
                    used[i] = true;
                    path.push(arr[i]);
                    dfs();
                    path.pop();
                    used[i] = false;
                }
            };
            dfs();
            return res;
        };

        const perms = permute([...nums]);
        perms.sort((a, b) => {
            for (let i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) return a[i] - b[i];
            }
            return 0;
        });

        for (let i = 0; i < perms.length; i++) {
            const p = perms[i];
            if (p.every((v, j) => v === nums[j])) {
                const next = perms[(i + 1) % perms.length];
                for (let j = 0; j < nums.length; j++) {
                    nums[j] = next[j];
                }
                break;
            }
        }
    }
}
```

```csharp
public class Solution {
    public void NextPermutation(int[] nums) {
        var perms = Permute((int[])nums.Clone());
        perms.Sort((a, b) => {
            for (int i = 0; i < a.Count; i++) {
                int diff = a[i] - b[i];
                if (diff != 0) return diff;
            }
            return 0;
        });
        for (int i = 0; i < perms.Count; i++) {
            var p = perms[i];
            bool match = true;
            for (int j = 0; j < nums.Length; j++) {
                if (p[j] != nums[j]) { match = false; break; }
            }
            if (match) {
                var next = perms[(i + 1) % perms.Count];
                for (int j = 0; j < nums.Length; j++) {
                    nums[j] = next[j];
                }
                return;
            }
        }
    }

    private List<List<int>> Permute(int[] nums) {
        Array.Sort(nums);
        var res = new List<List<int>>();
        var used = new bool[nums.Length];
        var path = new List<int>();
        void Dfs() {
            if (path.Count == nums.Length) {
                res.Add(new List<int>(path));
                return;
            }
            for (int i = 0; i < nums.Length; i++) {
                if (used[i]) continue;
                if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue;
                used[i] = true;
                path.Add(nums[i]);
                Dfs();
                path.RemoveAt(path.Count - 1);
                used[i] = false;
            }
        }
        Dfs();
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n! * n)$
- Space complexity: $O(n! * n)$

---

## 2. Greedy

::tabs-start

```python
class Solution:
    def nextPermutation(self, nums: list[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1

        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]

        l, r = i + 1, n - 1
        while l < r:
            nums[l], nums[r] = nums[r], nums[l]
            l += 1
            r -= 1
```

```java
public class Solution {
    public void nextPermutation(int[] nums) {
        int n = nums.length;
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums, i, j);
        }
        int l = i + 1, r = n - 1;
        while (l < r) {
            swap(nums, l++, r--);
        }
    }

    private void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        int l = i + 1, r = n - 1;
        while (l < r) {
            swap(nums[l++], nums[r--]);
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    nextPermutation(nums) {
        const n = nums.length;
        let i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            let j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }
        let l = i + 1,
            r = n - 1;
        while (l < r) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            l++;
            r--;
        }
    }
}
```

```csharp
public class Solution {
    public void NextPermutation(int[] nums) {
        int n = nums.Length;
        int i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            Swap(nums, i, j);
        }
        int l = i + 1, r = n - 1;
        while (l < r) {
            Swap(nums, l++, r--);
        }
    }

    private void Swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
