## 1. Brute Force

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = []

        for i in range(n):
            for j in range(i + 1, n):
                if nums[i] == nums[j]:
                    res.append(nums[i])
                    break

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        int n = nums.length;
        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) {
                    res.add(nums[i]);
                    break;
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
    vector<int> findDuplicates(vector<int>& nums) {
        int n = nums.size();
        vector<int> res;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (nums[i] == nums[j]) {
                    res.push_back(nums[i]);
                    break;
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
     * @return {number[]}
     */
    findDuplicates(nums) {
        const n = nums.length;
        const res = [];

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (nums[i] === nums[j]) {
                    res.push(nums[i]);
                    break;
                }
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$ extra space.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        nums.sort()
        res = []

        for i in range(len(nums) - 1):
            if nums[i] == nums[i + 1]:
                res.append(nums[i])

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        Arrays.sort(nums);
        List<Integer> res = new ArrayList<>();

        for (int i = 0; i < nums.length - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                res.add(nums[i]);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<int> res;

        for (int i = 0; i < nums.size() - 1; i++) {
            if (nums[i] == nums[i + 1]) {
                res.push_back(nums[i]);
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
    findDuplicates(nums) {
        nums.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < nums.length - 1; i++) {
            if (nums[i] === nums[i + 1]) {
                res.push(nums[i]);
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

## 3. Hash Set

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        seen = set()
        res = []
        for num in nums:
            if num in seen:
                res.append(num)
            else:
                seen.add(num)
        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        List<Integer> res = new ArrayList<>();

        for (int num : nums) {
            if (seen.contains(num)) {
                res.add(num);
            } else {
                seen.add(num);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        unordered_set<int> seen;
        vector<int> res;

        for (int num : nums) {
            if (seen.count(num)) {
                res.push_back(num);
            } else {
                seen.insert(num);
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
    findDuplicates(nums) {
        const seen = new Set();
        const res = [];

        for (const num of nums) {
            if (seen.has(num)) {
                res.push(num);
            } else {
                seen.add(num);
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

## 4. Hash Map

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        count = Counter(nums)
        res = []

        for num in count:
            if count[num] == 2:
                res.append(num)

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        List<Integer> res = new ArrayList<>();

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        for (int num : count.keySet()) {
            if (count.get(num) == 2) {
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
    vector<int> findDuplicates(vector<int>& nums) {
        unordered_map<int, int> count;
        vector<int> res;

        for (int num : nums) {
            count[num]++;
        }

        for (auto& [num, freq] : count) {
            if (freq == 2) {
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
    findDuplicates(nums) {
        const count = new Map();
        const res = [];

        for (const num of nums) {
            count.set(num, (count.get(num) || 0) + 1);
        }

        for (const [num, freq] of count.entries()) {
            if (freq === 2) {
                res.push(num);
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

## 5. Negative Marking

::tabs-start

```python
class Solution:
    def findDuplicates(self, nums: List[int]) -> List[int]:
        res = []

        for num in nums:
            idx = abs(num) - 1
            if nums[idx] < 0:
                res.append(abs(num))
            nums[idx] = -nums[idx]

        return res
```

```java
public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        List<Integer> res = new ArrayList<>();

        for (int num : nums) {
            int idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                res.add(Math.abs(num));
            }
            nums[idx] = -nums[idx];
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findDuplicates(vector<int>& nums) {
        vector<int> res;

        for (int num : nums) {
            int idx = abs(num) - 1;
            if (nums[idx] < 0) {
                res.push_back(abs(num));
            }
            nums[idx] = -nums[idx];
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
    findDuplicates(nums) {
        const res = [];

        for (let num of nums) {
            const idx = Math.abs(num) - 1;
            if (nums[idx] < 0) {
                res.push(Math.abs(num));
            }
            nums[idx] = -nums[idx];
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
