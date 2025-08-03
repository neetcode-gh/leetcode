## 1. Brute Force

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        nums.sort()
        res = set()

        for a in range(n):
            for b in range(a + 1, n):
                for c in range(b + 1, n):
                    for d in range(c + 1, n):
                        if nums[a] + nums[b] + nums[c] + nums[d] == target:
                            res.add((nums[a], nums[b], nums[c], nums[d]))
        return list(res)
```

```java
public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        int n = nums.length;
        Arrays.sort(nums);
        Set<List<Integer>> res = new HashSet<>();

        for (int a = 0; a < n; a++) {
            for (int b = a + 1; b < n; b++) {
                for (int c = b + 1; c < n; c++) {
                    for (int d = c + 1; d < n; d++) {
                        if (nums[a] + nums[b] + 0L + nums[c] + nums[d] == target) {
                            res.add(Arrays.asList(nums[a], nums[b], nums[c], nums[d]));
                        }
                    }
                }
            }
        }

        return new ArrayList<>(res);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        int n = nums.size();
        sort(nums.begin(), nums.end());
        set<vector<int>> res;

        for (int a = 0; a < n; a++) {
            for (int b = a + 1; b < n; b++) {
                for (int c = b + 1; c < n; c++) {
                    for (int d = c + 1; d < n; d++) {
                        if (nums[a] + nums[b] + 0LL + nums[c] + nums[d] == target) {
                            res.insert({nums[a], nums[b], nums[c], nums[d]});
                        }
                    }
                }
            }
        }

        return vector<vector<int>>(res.begin(), res.end());
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        let n = nums.length;
        nums.sort((a, b) => a - b);
        let res = new Set();

        for (let a = 0; a < n; a++) {
            for (let b = a + 1; b < n; b++) {
                for (let c = b + 1; c < n; c++) {
                    for (let d = c + 1; d < n; d++) {
                        if (nums[a] + nums[b] + nums[c] + nums[d] === target) {
                            res.add(
                                JSON.stringify([
                                    nums[a],
                                    nums[b],
                                    nums[c],
                                    nums[d],
                                ]),
                            );
                        }
                    }
                }
            }
        }

        return Array.from(res).map(JSON.parse);
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FourSum(int[] nums, int target) {
        int n = nums.Length;
        Array.Sort(nums);
        HashSet<(int, int, int, int)> res = new HashSet<(int, int, int, int)>();

        for (int a = 0; a < n; a++) {
            for (int b = a + 1; b < n; b++) {
                for (int c = b + 1; c < n; c++) {
                    for (int d = c + 1; d < n; d++) {
                        long sum = (long)nums[a] + nums[b] + nums[c] + nums[d];
                        if (sum == target) {
                            res.Add((nums[a], nums[b], nums[c], nums[d]));
                        }
                    }
                }
            }
        }

        var result = new List<List<int>>();
        foreach (var quad in res) {
            result.Add(new List<int> { quad.Item1, quad.Item2, quad.Item3, quad.Item4 });
        }
        return result;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(m)$

> Where $n$ is the size of the array $nums$ and $m$ is the number of quadruplets.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        count = defaultdict(int)
        for num in nums:
            count[num] += 1

        res = []
        for i in range(len(nums)):
            count[nums[i]] -= 1
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            for j in range(i + 1, len(nums)):
                count[nums[j]] -= 1
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue

                for k in range(j + 1, len(nums)):
                    count[nums[k]] -= 1
                    if k > j + 1 and nums[k] == nums[k - 1]:
                        continue

                    fourth = target - (nums[i] + nums[j] + nums[k])
                    if count[fourth] > 0:
                        res.append([nums[i], nums[j], nums[k], fourth])

                for k in range(j + 1, len(nums)):
                    count[nums[k]] += 1

            for j in range(i + 1, len(nums)):
                count[nums[j]] += 1

        return res
```

```java
public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        List<List<Integer>> res = new ArrayList<>();

        for (int i = 0; i < nums.length; i++) {
            count.put(nums[i], count.get(nums[i]) - 1);
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < nums.length; j++) {
                count.put(nums[j], count.get(nums[j]) - 1);
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                for (int k = j + 1; k < nums.length; k++) {
                    count.put(nums[k], count.get(nums[k]) - 1);
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;

                    long fourth = target - (nums[i] + nums[j] + 0L + nums[k]);
                    if (fourth > Integer.MAX_VALUE || fourth < Integer.MIN_VALUE) {
                        continue;
                    }
                    if (count.getOrDefault((int) fourth, 0) > 0) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[k], (int) fourth));
                    }
                }

                for (int k = j + 1; k < nums.length; k++) {
                    count.put(nums[k], count.get(nums[k]) + 1);
                }
            }

            for (int j = i + 1; j < nums.length; j++) {
                count.put(nums[j], count.get(nums[j]) + 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }
        vector<vector<int>> res;

        for (int i = 0; i < nums.size(); i++) {
            count[nums[i]]--;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < nums.size(); j++) {
                count[nums[j]]--;
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                for (int k = j + 1; k < nums.size(); k++) {
                    count[nums[k]]--;
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;

                    long long fourth = target - (nums[i] + nums[j] + 0LL + nums[k]);
                    if (fourth < INT_MIN || fourth > INT_MAX) continue;
                    if (count[fourth] > 0) {
                        res.push_back({nums[i], nums[j], nums[k], int(fourth)});
                    }
                }

                for (int k = j + 1; k < nums.size(); k++) {
                    count[nums[k]]++;
                }
            }

            for (int j = i + 1; j < nums.size(); j++) {
                count[nums[j]]++;
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
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const count = new Map();
        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }
        const res = [];

        for (let i = 0; i < nums.length; i++) {
            count.set(nums[i], count.get(nums[i]) - 1);
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) - 1);
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                for (let k = j + 1; k < nums.length; k++) {
                    count.set(nums[k], count.get(nums[k]) - 1);
                    if (k > j + 1 && nums[k] === nums[k - 1]) continue;

                    const fourth = target - (nums[i] + nums[j] + nums[k]);
                    if ((count.get(fourth) || 0) > 0) {
                        res.push([nums[i], nums[j], nums[k], fourth]);
                    }
                }

                for (let k = j + 1; k < nums.length; k++) {
                    count.set(nums[k], count.get(nums[k]) + 1);
                }
            }

            for (let j = i + 1; j < nums.length; j++) {
                count.set(nums[j], count.get(nums[j]) + 1);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FourSum(int[] nums, int target) {
        Array.Sort(nums);
        Dictionary<int, int> count = new Dictionary<int, int>();

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) {
                count[num] = 0;
            }
            count[num]++;
        }

        List<List<int>> res = new List<List<int>>();

        for (int i = 0; i < nums.Length; i++) {
            count[nums[i]]--;
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < nums.Length; j++) {
                count[nums[j]]--;
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                for (int k = j + 1; k < nums.Length; k++) {
                    count[nums[k]]--;
                    if (k > j + 1 && nums[k] == nums[k - 1]) continue;

                    long fourth = (long)target - (long)nums[i] - (long)nums[j] - (long)nums[k];
                    if (fourth > int.MaxValue || fourth < int.MinValue) {
                        continue;
                    }

                    if (count.ContainsKey((int)fourth) && count[(int)fourth] > 0) {
                        res.Add(new List<int> { nums[i], nums[j], nums[k], (int)fourth });
                    }
                }

                for (int k = j + 1; k < nums.Length; k++) {
                    count[nums[k]]++;
                }
            }

            for (int j = i + 1; j < nums.Length; j++) {
                count[nums[j]]++;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity:
    - $O(n)$ space for the hash map.
    - $O(m)$ space for the output array.

> Where $n$ is the size of the array $nums$ and $m$ is the number of quadruplets.

---

## 3. Two Pointers

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        res = []

        for i in range(n):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            for j in range(i + 1, n):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                left, right = j + 1, n - 1
                while left < right:
                    total = nums[i] + nums[j] + nums[left] + nums[right]
                    if total == target:
                        res.append([nums[i], nums[j], nums[left], nums[right]])
                        left += 1
                        right -= 1
                        while left < right and nums[left] == nums[left - 1]:
                            left += 1
                        while left < right and nums[right] == nums[right + 1]:
                            right -= 1
                    elif total < target:
                        left += 1
                    else:
                        right -= 1

        return res
```

```java
public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        int n = nums.length;

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long sum = (long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.add(Arrays.asList(nums[i], nums[j], nums[left], nums[right]));
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> res;
        int n = nums.size();
        sort(nums.begin(), nums.end());

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long long sum = (long long) nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.push_back({nums[i], nums[j], nums[left], nums[right]});
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
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
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const res = [];
        const n = nums.length;

        for (let i = 0; i < n; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] === nums[j - 1]) continue;

                let left = j + 1,
                    right = n - 1;
                while (left < right) {
                    const sum = nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum === target) {
                        res.push([nums[i], nums[j], nums[left], nums[right]]);
                        left++;
                        right--;
                        while (left < right && nums[left] === nums[left - 1])
                            left++;
                        while (left < right && nums[right] === nums[right + 1])
                            right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public List<List<int>> FourSum(int[] nums, int target) {
        Array.Sort(nums);
        List<List<int>> res = new List<List<int>>();
        int n = nums.Length;

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            for (int j = i + 1; j < n; j++) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;

                int left = j + 1, right = n - 1;
                while (left < right) {
                    long sum = (long)nums[i] + nums[j] + nums[left] + nums[right];
                    if (sum == target) {
                        res.Add(new List<int> { nums[i], nums[j], nums[left], nums[right] });
                        left++;
                        right--;
                        while (left < right && nums[left] == nums[left - 1]) left++;
                        while (left < right && nums[right] == nums[right + 1]) right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(m)$ space for the output array.

---

## 4. K-Sum + Two Pointers

::tabs-start

```python
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        nums.sort()
        res, quad = [], []

        def kSum(k, start, target):
            if k == 2:
                l, r = start, len(nums) - 1
                while l < r:
                    if nums[l] + nums[r] < target:
                        l += 1
                    elif nums[l] + nums[r] > target:
                        r -= 1
                    else:
                        res.append(quad + [nums[l], nums[r]])
                        l += 1
                        r -= 1
                        while l < r and nums[l] == nums[l - 1]:
                            l += 1
                        while l < r and nums[r] == nums[r + 1]:
                            r -= 1
                return

            for i in range(start, len(nums) - k + 1):
                if i > start and nums[i] == nums[i - 1]:
                    continue
                quad.append(nums[i])
                kSum(k - 1, i + 1, target - nums[i])
                quad.pop()

        kSum(4, 0, target)
        return res
```

```java
public class Solution {
    private List<List<Integer>> res;
    private List<Integer> quad;

    public List<List<Integer>> fourSum(int[] nums, int target) {
        Arrays.sort(nums);
        res = new ArrayList<>();
        quad = new ArrayList<>();
        kSum(nums, 4, 0, target);
        return res;
    }

    private void kSum(int[] nums, int k, int start, long target) {
        if (k == 2) {
            int l = start, r = nums.length - 1;
            while (l < r) {
                long sum = nums[l] + nums[r];
                if (sum < target) {
                    l++;
                } else if (sum > target) {
                    r--;
                } else {
                    res.add(new ArrayList<>(quad));
                    res.get(res.size() - 1).add(nums[l]);
                    res.get(res.size() - 1).add(nums[r]);
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                    while (l < r && nums[r] == nums[r + 1]) r--;
                }
            }
            return;
        }

        for (int i = start; i < nums.length - k + 1; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            quad.add(nums[i]);
            kSum(nums, k - 1, i + 1, target - nums[i]);
            quad.remove(quad.size() - 1);
        }
    }
}
```

```cpp
class Solution {
    vector<vector<int>> res;
    vector<int> quad;

public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        if (nums.size() < 4) return {};
        sort(nums.begin(), nums.end());
        kSum(nums, 4, 0, (long long) target);
        return res;
    }

private:
    void kSum(vector<int>& nums, int k, int start, long long target) {
        if (k == 2) {
            int l = start, r = nums.size() - 1;
            while (l < r) {
                long long sum = (long long) nums[l] + nums[r];
                if (sum < target) {
                    l++;
                } else if (sum > target) {
                    r--;
                } else {
                    quad.push_back(nums[l]);
                    quad.push_back(nums[r]);
                    res.push_back(quad);
                    quad.pop_back();
                    quad.pop_back();
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                    while (l < r && nums[r] == nums[r + 1]) r--;
                }
            }
            return;
        }

        for (int i = start; i < nums.size() - k + 1; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            quad.push_back(nums[i]);
            kSum(nums, k - 1, i + 1, target - nums[i]);
            quad.pop_back();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const res = [];
        const quad = [];

        const kSum = (k, start, target) => {
            if (k === 2) {
                let l = start,
                    r = nums.length - 1;
                while (l < r) {
                    const sum = nums[l] + nums[r];
                    if (sum < target) {
                        l++;
                    } else if (sum > target) {
                        r--;
                    } else {
                        res.push([...quad, nums[l], nums[r]]);
                        l++;
                        r--;
                        while (l < r && nums[l] === nums[l - 1]) l++;
                        while (l < r && nums[r] === nums[r + 1]) r--;
                    }
                }
                return;
            }

            for (let i = start; i < nums.length - k + 1; i++) {
                if (i > start && nums[i] === nums[i - 1]) continue;
                quad.push(nums[i]);
                kSum(k - 1, i + 1, target - nums[i]);
                quad.pop();
            }
        };

        kSum(4, 0, target);
        return res;
    }
}
```

```csharp
public class Solution {
    private List<List<int>> res;
    private List<int> quad;

    public List<List<int>> FourSum(int[] nums, int target) {
        Array.Sort(nums);
        res = new List<List<int>>();
        quad = new List<int>();
        KSum(nums, 4, 0, target);
        return res;
    }

    private void KSum(int[] nums, int k, int start, long target) {
        if (k == 2) {
            int l = start, r = nums.Length - 1;
            while (l < r) {
                long sum = (long)nums[l] + nums[r];
                if (sum < target) {
                    l++;
                } else if (sum > target) {
                    r--;
                } else {
                    List<int> newQuad = new List<int>(quad);
                    newQuad.Add(nums[l]);
                    newQuad.Add(nums[r]);
                    res.Add(newQuad);
                    l++;
                    r--;
                    while (l < r && nums[l] == nums[l - 1]) l++;
                    while (l < r && nums[r] == nums[r + 1]) r--;
                }
            }
            return;
        }

        for (int i = start; i < nums.Length - k + 1; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            quad.Add(nums[i]);
            KSum(nums, k - 1, i + 1, target - nums[i]);
            quad.RemoveAt(quad.Count - 1);
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity:
    - $O(1)$ or $O(n)$ space depending on the sorting algorithm.
    - $O(m)$ space for the output array.
