## 1. Hash Set

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        store = set(range(1, n + 1))

        for num in nums:
            store.discard(num)

        return list(store)
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int n = nums.length;
        Set<Integer> store = new HashSet<>();
        for (int i = 1; i <= n; i++) store.add(i);

        for (int num : nums) {
            store.remove(num);
        }

        return new ArrayList<>(store);
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        unordered_set<int> store;
        for (int i = 1; i <= n; i++) store.insert(i);

        for (int num : nums) {
            store.erase(num);
        }

        vector<int> result(store.begin(), store.end());
        return result;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    findDisappearedNumbers(nums) {
        const n = nums.length;
        const store = new Set();
        for (let i = 1; i <= n; i++) store.add(i);

        for (let num of nums) {
            store.delete(num);
        }

        return Array.from(store);
    }
}
```

```csharp
public class Solution {
    public List<int> FindDisappearedNumbers(int[] nums) {
        int n = nums.Length;
        var store = new HashSet<int>();
        for (int i = 1; i <= n; i++) {
            store.Add(i);
        }

        foreach (int num in nums) {
            store.Remove(num);
        }

        return new List<int>(store);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Boolean Array

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        mark = [False] * n

        for num in nums:
            mark[num - 1] = True

        res = []
        for i in range(1, n + 1):
            if not mark[i - 1]:
                res.append(i)
        return res
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int n = nums.length;
        boolean[] mark = new boolean[n];

        for (int num : nums) {
            mark[num - 1] = true;
        }

        List<Integer> res = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.add(i);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        vector<bool> mark(n, false);

        for (int num : nums) {
            mark[num - 1] = true;
        }

        vector<int> res;
        for (int i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.push_back(i);
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
     * @return {number[]}
     */
    findDisappearedNumbers(nums) {
        const n = nums.length;
        const mark = new Array(n).fill(false);

        for (let num of nums) {
            mark[num - 1] = true;
        }

        const res = [];
        for (let i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.push(i);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public IList<int> FindDisappearedNumbers(int[] nums) {
        int n = nums.Length;
        bool[] mark = new bool[n];

        foreach (int num in nums) {
            mark[num - 1] = true;
        }

        List<int> res = new List<int>();
        for (int i = 1; i <= n; i++) {
            if (!mark[i - 1]) {
                res.Add(i);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Sorting

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        n = len(nums)
        nums.sort()

        res = []
        idx = 0
        for num in range(1, n + 1):
            while idx < n and nums[idx] < num:
                idx += 1
            if idx == n or nums[idx] > num:
                res.append(num)
        return res
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);

        List<Integer> res = new ArrayList<>();
        int idx = 0;
        for (int num = 1; num <= n; num++) {
            while (idx < n && nums[idx] < num) {
                idx++;
            }
            if (idx == n || nums[idx] > num) {
                res.add(num);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        int n = nums.size();
        sort(nums.begin(), nums.end());

        vector<int> res;
        int idx = 0;
        for (int num = 1; num <= n; num++) {
            while (idx < n && nums[idx] < num) {
                idx++;
            }
            if (idx == n || nums[idx] > num) {
                res.push_back(num);
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
     * @return {number[]}
     */
    findDisappearedNumbers(nums) {
        nums.sort((a, b) => a - b);

        const res = [];
        let idx = 0;
        for (let num = 1; num <= nums.length; num++) {
            while (idx < nums.length && nums[idx] < num) {
                idx++;
            }
            if (idx === nums.length || nums[idx] > num) {
                res.push(num);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> FindDisappearedNumbers(int[] nums) {
        int n = nums.Length;
        Array.Sort(nums);

        List<int> res = new List<int>();
        int idx = 0;
        for (int num = 1; num <= n; num++) {
            while (idx < n && nums[idx] < num) {
                idx++;
            }
            if (idx == n || nums[idx] > num) {
                res.Add(num);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 4. Negative Marking

::tabs-start

```python
class Solution:
    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:
        for num in nums:
            i = abs(num) - 1
            nums[i] = -1 * abs(nums[i])

        res = []
        for i, num in enumerate(nums):
            if num > 0:
                res.append(i + 1)
        return res
```

```java
public class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        for (int num : nums) {
            int i = Math.abs(num) - 1;
            nums[i] = -Math.abs(nums[i]);
        }

        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                res.add(i + 1);
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDisappearedNumbers(vector<int>& nums) {
        for (int num : nums) {
            int i = abs(num) - 1;
            nums[i] = -abs(nums[i]);
        }

        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] > 0) {
                res.push_back(i + 1);
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
     * @return {number[]}
     */
    findDisappearedNumbers(nums) {
        for (let num of nums) {
            let i = Math.abs(num) - 1;
            nums[i] = -Math.abs(nums[i]);
        }

        const res = [];
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                res.push(i + 1);
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public List<int> FindDisappearedNumbers(int[] nums) {
        foreach (int num in nums) {
            int i = Math.Abs(num) - 1;
            nums[i] = -1 * Math.Abs(nums[i]);
        }

        List<int> res = new List<int>();
        for (int i = 0; i < nums.Length; i++) {
            if (nums[i] > 0) {
                res.Add(i + 1);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ since we modified the input array without using extra space.
