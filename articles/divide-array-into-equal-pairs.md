## 1. Sorting

::tabs-start

```python
class Solution:
    def divideArray(self, nums: List[int]) -> bool:
        N = len(nums)
        nums.sort()

        i = 0
        while i < N:
            j = i
            while j < N and nums[i] == nums[j]:
                j += 1

            if (j - i) % 2 != 0:
                return False

            i = j

        return True
```

```java
public class Solution {
    public boolean divideArray(int[] nums) {
        int N = nums.length;
        Arrays.sort(nums);

        int i = 0;
        while (i < N) {
            int j = i;
            while (j < N && nums[i] == nums[j]) {
                j++;
            }

            if ((j - i) % 2 != 0) {
                return false;
            }

            i = j;
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool divideArray(vector<int>& nums) {
        int N = nums.size();
        sort(nums.begin(), nums.end());

        int i = 0;
        while (i < N) {
            int j = i;
            while (j < N && nums[i] == nums[j]) {
                j++;
            }

            if ((j - i) % 2 != 0) {
                return false;
            }

            i = j;
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    divideArray(nums) {
        const N = nums.length;
        nums.sort((a, b) => a - b);

        let i = 0;
        while (i < N) {
            let j = i;
            while (j < N && nums[i] === nums[j]) {
                j++;
            }

            if ((j - i) % 2 !== 0) {
                return false;
            }

            i = j;
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Hash Map

::tabs-start

```python
class Solution:
    def divideArray(self, nums: List[int]) -> bool:
        count = {}
        for num in nums:
            if num not in count:
                count[num] = 0
            count[num] += 1

        for cnt in count.values():
            if cnt % 2 == 1:
                return False

        return True
```

```java
public class Solution {
    public boolean divideArray(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        for (int cnt : count.values()) {
            if (cnt % 2 == 1) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    bool divideArray(vector<int>& nums) {
        unordered_map<int, int> count;
        for (int num : nums) {
            count[num]++;
        }

        for (auto& [key, cnt] : count) {
            if (cnt % 2 == 1) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    divideArray(nums) {
        const count = {};
        for (let num of nums) {
            if (!(num in count)) {
                count[num] = 0;
            }
            count[num]++;
        }

        for (let key in count) {
            if (count[key] % 2 === 1) {
                return false;
            }
        }

        return true;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Hash Set

::tabs-start

```python
class Solution:
    def divideArray(self, nums: List[int]) -> bool:
        odd_set = set()

        for num in nums:
            if num not in odd_set:
                odd_set.add(num)
            else:
                odd_set.remove(num)

        return not len(odd_set)
```

```java
public class Solution {
    public boolean divideArray(int[] nums) {
        Set<Integer> oddSet = new HashSet<>();

        for (int num : nums) {
            if (!oddSet.contains(num)) {
                oddSet.add(num);
            } else {
                oddSet.remove(num);
            }
        }

        return oddSet.isEmpty();
    }
}
```

```cpp
class Solution {
public:
    bool divideArray(vector<int>& nums) {
        unordered_set<int> oddSet;

        for (int num : nums) {
            if (oddSet.count(num)) {
                oddSet.erase(num);
            } else {
                oddSet.insert(num);
            }
        }

        return oddSet.empty();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    divideArray(nums) {
        const oddSet = new Set();

        for (let num of nums) {
            if (oddSet.has(num)) {
                oddSet.delete(num);
            } else {
                oddSet.add(num);
            }
        }

        return oddSet.size === 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
