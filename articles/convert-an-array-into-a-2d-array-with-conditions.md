## 1. Brute Force

::tabs-start

```python
class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        res = []

        for num in nums:
            r = 0
            while r < len(res):
                if num not in res[r]:
                    break
                r += 1
            if r == len(res):
                res.append([])
            res[r].append(num)

        return res
```

```java
public class Solution {
    public List<List<Integer>> findMatrix(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();

        for (int num : nums) {
            int r = 0;
            while (r < res.size()) {
                if (!res.get(r).contains(num)) {
                    break;
                }
                r++;
            }
            if (r == res.size()) {
                res.add(new ArrayList<>());
            }
            res.get(r).add(num);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findMatrix(vector<int>& nums) {
        vector<vector<int>> res;

        for (int num : nums) {
            int r = 0;
            while (r < res.size()) {
                if (find(res[r].begin(), res[r].end(), num) == res[r].end()) {
                    break;
                }
                r++;
            }
            if (r == res.size()) {
                res.push_back({});
            }
            res[r].push_back(num);
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
    findMatrix(nums) {
        const res = [];

        for (const num of nums) {
            let r = 0;
            while (r < res.length) {
                if (!res[r].includes(num)) {
                    break;
                }
                r++;
            }
            if (r === res.length) {
                res.push([]);
            }
            res[r].push(num);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m)$
- Space complexity: $O(n)$ for the output array.

> Where $n$ is the size of the array $nums$ and $m$ is the frequency of the most frequent element in the given array.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        res = []

        i = 0
        while i < len(nums):
            j = i
            r = 0
            while j < len(nums) and nums[i] == nums[j]:
                if r == len(res):
                    res.append([])
                res[r].append(nums[i])
                r += 1
                j += 1
            i = j

        return res
```

```java
public class Solution {
    public List<List<Integer>> findMatrix(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();

        int i = 0;
        while (i < nums.length) {
            int j = i;
            int r = 0;
            while (j < nums.length && nums[i] == nums[j]) {
                if (r == res.size()) {
                    res.add(new ArrayList<>());
                }
                res.get(r).add(nums[i]);
                r++;
                j++;
            }
            i = j;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findMatrix(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;

        int i = 0;
        while (i < nums.size()) {
            int j = i, r = 0;
            while (j < nums.size() && nums[i] == nums[j]) {
                if (r == res.size()) {
                    res.push_back({});
                }
                res[r].push_back(nums[i]);
                r++;
                j++;
            }
            i = j;
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
    findMatrix(nums) {
        nums.sort((a, b) => a - b);
        const res = [];

        let i = 0;
        while (i < nums.length) {
            let j = i;
            let r = 0;
            while (j < nums.length && nums[i] === nums[j]) {
                if (r === res.length) {
                    res.push([]);
                }
                res[r].push(nums[i]);
                r++;
                j++;
            }
            i = j;
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$ for the output array.

---

## 3. Frequency Count

::tabs-start

```python
class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        count = defaultdict(int)
        res = []

        for num in nums:
            row = count[num]
            if len(res) == row:
                res.append([])
            res[row].append(num)
            count[num] += 1

        return res
```

```java
public class Solution {
    public List<List<Integer>> findMatrix(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        List<List<Integer>> res = new ArrayList<>();

        for (int num : nums) {
            int row = count.getOrDefault(num, 0);
            if (res.size() == row) {
                res.add(new ArrayList<>());
            }
            res.get(row).add(num);
            count.put(num, row + 1);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> findMatrix(vector<int>& nums) {
        unordered_map<int, int> count;
        vector<vector<int>> res;

        for (int num : nums) {
            int row = count[num];
            if (res.size() == row) {
                res.push_back({});
            }
            res[row].push_back(num);
            count[num]++;
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
    findMatrix(nums) {
        const count = new Map();
        const res = [];

        for (const num of nums) {
            const row = count.get(num) || 0;
            if (res.length === row) {
                res.push([]);
            }
            res[row].push(num);
            count.set(num, row + 1);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
